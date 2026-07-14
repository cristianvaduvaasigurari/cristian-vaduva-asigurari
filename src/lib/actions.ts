"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { sendTelegramAlert } from "@/lib/telegram";

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

    const { error } = await supabase.from("leads").insert([leadData]);

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

    // Log lead receipt
    console.info(`[Lead] Received lead for service "${service}" from ${name} (${phone})`);
    // Await Telegram alert
    console.info(`[Lead] Starting Telegram alert`);
    await sendTelegramAlert({
      name,
      phone,
      email,
      service,
      message: formattedMessage,
      pageUrl,
      timestamp,
    });
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
export async function saveAssessment(assessmentType: string, data: Record<string, unknown>): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const supabase = await createClient();
    const uniqueId = `aix_${assessmentType.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Math.random().toString(36).substr(2, 9)}`;

    const name = (data.name as string) || "Anonymous Assessment";
    const email = (data.email as string) || "";
    const phone = (data.phone as string) || "";
    const service_type = `Assessment: ${assessmentType}`;

    const formattedMessage = [
      (data.message as string) || "",
      `Assessment ID: ${uniqueId}`,
      `Sursă: Platform Assessment`,
      `Detalii: ${JSON.stringify(data, null, 2)}`
    ].filter(Boolean).join("\n\n");

    const payload = {
      name,
      email,
      phone,
      service_type,
      message: formattedMessage
    };

    const { error } = await supabase.from("leads").insert([payload]);

    if (error) {
      console.error("Error saving assessment:", error);
      return { success: false, error: "Nu am putut salva evaluarea." };
    }

    // Extract request metadata for assessment
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

    // Log assessment receipt
    console.info(`[Assessment] Received ${assessmentType} for ${name} (${phone})`);
    console.info(`[Assessment] Starting Telegram alert`);
    await sendTelegramAlert({
      name,
      phone,
      email,
      service: service_type,
      message: formattedMessage,
      pageUrl,
      timestamp,
    });
    console.info(`[Assessment] Telegram alert completed`);
    // Return success response
    return { success: true, id: uniqueId };

  } catch (err) {
    console.error("Save assessment error:", err);
    return { success: false, error: "Eroare la procesarea evaluării." };
  }
}
