"use server";
export const runtime = "nodejs";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { sendTelegramAlert } from "@/lib/telegram";
console.info(`BUILD_ID: ${process.env.BUILD_ID}`);
console.info(`VERCEL_GIT_COMMIT_SHA: ${process.env.VERCEL_GIT_COMMIT_SHA}`);
console.info(`VERCEL_URL: ${process.env.VERCEL_URL}`);
export type ActionResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

/**
 * Saves a generic lead into the `leads` table in Supabase.
 * Maps service -> service_type for database compatibility.
 * Safely defaults email/phone to prevent null constraint violations.
 */
export async function submitLead(formData: FormData): Promise<ActionResponse> {
  // Generate a unique identifier for this submission to trace its lifecycle
  const submissionId = crypto.randomUUID();
  console.info(`[Lead ${submissionId}] 🎯 Received server action invocation`);

  try {
    const supabase = await createClient();

    const name = (formData.get("name") as string) || "Anonim";
    const email = (formData.get("email") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const service = (formData.get("service") as string) || "Website Lead";
    const message = (formData.get("message") as string) || "";
    const source = (formData.get("source") as string) || "Website Lead";
    
    // Extract metadata if present
    const metadataStr = formData.get("metadata") as string;
    const metadata = metadataStr ? JSON.parse(metadataStr) : null;

    // Combine source and metadata into the message field to preserve them in db
    const formattedMessage = [
      message,
      source ? `Sursă: ${source}` : null,
      metadata ? `Detalii: ${JSON.stringify(metadata, null, 2)}` : null
    ].filter(Boolean).join("\n\n");

    const leadData = {
      name,
      email,
      phone,
      service_type: service, // Map service to service_type column
      message: formattedMessage
    };

    const { error } = await supabase.from("leads").insert([{ ...leadData, submission_id: submissionId }]);
  if (!error) {
    console.info(`[Lead ${submissionId}] ✅ Supabase insert succeeded`);
    // Direct fetch to Telegram (bypass abstraction) for debugging
    const directToken = process.env.TELEGRAM_BOT_TOKEN;
    const directChatId = process.env.TELEGRAM_CHAT_ID;
    if (directToken && directChatId) {
      const directUrl = `https://api.telegram.org/bot${directToken}/sendMessage`;
      const directPayload = {
        chat_id: directChatId,
        text: formattedMessage,
        parse_mode: "HTML",
      };
      console.info(`[Lead ${submissionId}] 🔧 Direct Telegram fetch start`);
      try {
        const resp = await fetch(directUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(directPayload),
        });
        console.info(`[Lead ${submissionId}] 🔧 Direct Telegram fetch finished with status ${resp.status}`);
      } catch (e) {
        console.error(`[Lead ${submissionId}] 🔧 Direct Telegram fetch error`, e);
      }
    } else {
      console.warn(`[Lead ${submissionId}] 🔧 Direct Telegram fetch skipped – missing token or chat id`);
    }
  }

    if (error) {
      console.error("Supabase Error saving lead:", error);
      return { success: false, error: "Eroare la salvarea datelor. Te rugăm să încerci din nou." };
    }

    // Extract request metadata
    const headersList = await headers();
    const pageUrl = headersList.get("referer") || "N/A";
    const timestamp = new Date().toLocaleString("ro-RO", {
      timeZone: "Europe/Bucharest",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // No further Telegram alert; response will be returned
    console.info(`[Lead ${submissionId}] ✅ Direct Telegram fetch completed`);

    console.info(`[Lead] Telegram alert completed`);
    // Return success response
    return { success: true, message: "Cererea ta a fost trimisă cu succes!" };
  } catch (err) {
    console.error("Server Action Error:", err);
    return { success: false, error: "A apărut o eroare neașteptată." };
  }
}

/**
 * Saves a complex assessment (e.g. Financial Twin, Gap Analysis) and generates a unique ID.
 * Maps to database columns and triggers Telegram alerts.
 */
export async function saveAssessment(
  assessmentType: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; id?: string; error?: string }> {
  // Generate a unique identifier for this assessment submission
  const submissionId = crypto.randomUUID();
  console.info(`[Assessment ${submissionId}] 🎯 Received server action invocation`);

  try {
    const supabase = await createClient();
    const uniqueId = `aix_${assessmentType
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")}_${Math.random().toString(36).substr(2, 9)}`;

    const name = typeof data === 'object' && data && 'name' in data && typeof (data as Record<string, unknown>)['name'] === 'string'
      ? (data as Record<string, unknown>)['name'] as string
      : 'Anonymous Assessment';
    const email = typeof data === 'object' && data && 'email' in data && typeof (data as Record<string, unknown>)['email'] === 'string'
      ? (data as Record<string, unknown>)['email'] as string
      : '';
    const phone = typeof data === 'object' && data && 'phone' in data && typeof (data as Record<string, unknown>)['phone'] === 'string'
      ? (data as Record<string, unknown>)['phone'] as string
      : '';
    const service_type = `Assessment: ${assessmentType}`;
    const messageText = typeof data === 'object' && data && 'message' in data && typeof (data as Record<string, unknown>)['message'] === 'string'
      ? (data as Record<string, unknown>)['message'] as string
      : '';
    const formattedMessage = [
      messageText,
      `Assessment ID: ${uniqueId}`,
      `Sursă: Platform Assessment`,
      `Detalii: ${JSON.stringify(data, null, 2)}`
    ].filter(Boolean).join("\n\n");

    const payload = { name, email, phone, service_type, message: formattedMessage };

    const { error } = await supabase.from("leads").insert([{ ...payload, submission_id: submissionId }]);
    if (error) {
      console.error("Error saving assessment:", error);
      return { success: false, error: "Nu am putut salva evaluarea." };
    }

    const headersList = await headers();
    const pageUrl = headersList.get("referer") || "N/A";
    const timestamp = new Date().toLocaleString("ro-RO", {
      timeZone: "Europe/Bucharest",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    console.info(`[Assessment] Received ${assessmentType} for ${name} (${phone})`);
    console.info(`[Assessment] Starting Telegram alert`);
    console.info(`[Assessment ${submissionId}] 🚀 Starting Telegram alert`);
    await sendTelegramAlert({
      name,
      phone,
      email,
      service: service_type,
      message: formattedMessage,
      pageUrl,
      timestamp,
      submissionId
    });
    console.info(`[Assessment ${submissionId}] ✅ Telegram alert completed`);
    console.info(`[Assessment] Telegram alert completed`);

    return { success: true, id: uniqueId };
  } catch (err) {
    console.error("Save assessment error:", err);
    return { success: false, error: "Eroare la procesarea evaluării." };
  }
}
export { submitLead, saveAssessment };
