"use server";

import { sendTelegramAlert } from "@/lib/telegram";

export type ActionResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

const DEFAULT_SUPABASE_URL = "https://fcpsafjgjnecdlyqfcid.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjcHNhZmpnam5lY2RseXFmY2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MzAyMTksImV4cCI6MjA5ODMwNjIxOX0.n-Obp-2j284umEvkKHBiTmmTfYARKvGrx3dUDhvcGPY";

/**
 * Saves a generic lead into the `leads` table in our platform.
 */
export async function submitLead(formData: FormData): Promise<ActionResponse> {
  try {
    const name = (formData.get("name") as string) || "Anonim";
    const email = (formData.get("email") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const service = (formData.get("service") as string) || "Website Lead";
    const message = (formData.get("message") as string) || "";
    const source = (formData.get("source") as string) || "Website Lead";

    if (!phone) {
      return { success: false, error: "Numărul de telefon este obligatoriu." };
    }

    const metadataStr = formData.get("metadata") as string;
    let metadata = null;
    if (metadataStr) {
      try {
        metadata = JSON.parse(metadataStr);
      } catch {
        metadata = { raw: metadataStr };
      }
    }

    const formattedMessage = [
      message,
      source ? `Sursă: ${source}` : null,
      metadata ? `Detalii: ${JSON.stringify(metadata, null, 2)}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    const leadData = {
      name,
      email,
      phone,
      service_type: service,
      message: formattedMessage,
    };

    const supabaseUrl = (
      process.env.SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      DEFAULT_SUPABASE_URL
    ).trim();

    const supabaseKey = (
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      DEFAULT_SUPABASE_ANON_KEY
    ).trim();

    const restRes = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
      },
      body: JSON.stringify(leadData),
      cache: "no-store",
    });

    if (!restRes.ok && restRes.status !== 201 && restRes.status !== 200 && restRes.status !== 204) {
      const errText = await restRes.text().catch(() => "");
      console.error("[submitLead] Supabase REST error:", restRes.status, errText);
      return { success: false, error: "Eroare la salvarea datelor. Te rugăm să încerci din nou." };
    }

    await sendTelegramAlert({
      name,
      phone,
      email,
      service,
      message: formattedMessage,
      pageUrl: "Website Lead Action",
      timestamp: new Date().toISOString(),
    });

    return { success: true, message: "Cererea ta a fost trimisă cu succes!" };
  } catch (err) {
    console.error("Server Action Error:", err);
    return { success: false, error: "A apărut o eroare neașteptată." };
  }
}

/**
 * Saves a complex assessment (e.g. Financial Twin, Gap Analysis) and generates a unique ID.
 */
export async function saveAssessment(
  assessmentType: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const uniqueId = `aix_${assessmentType.toLowerCase().replace(/[^a-z0-9]/g, "")}_${Math.random().toString(36).substr(2, 9)}`;

    const name = (data.name as string) || "Anonymous Assessment";
    const email = (data.email as string) || "";
    const phone = (data.phone as string) || "";
    const service_type = `Assessment: ${assessmentType}`;

    const formattedMessage = `[Assessment: ${assessmentType}]\nID: ${uniqueId}\nData: ${JSON.stringify(data, null, 2)}`;

    const leadData = {
      name,
      email,
      phone,
      service_type,
      message: formattedMessage,
    };

    const supabaseUrl = (
      process.env.SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      DEFAULT_SUPABASE_URL
    ).trim();

    const supabaseKey = (
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      DEFAULT_SUPABASE_ANON_KEY
    ).trim();

    const restRes = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
      },
      body: JSON.stringify(leadData),
      cache: "no-store",
    });

    if (!restRes.ok && restRes.status !== 201 && restRes.status !== 200 && restRes.status !== 204) {
      console.error("[saveAssessment] Supabase error:", restRes.status);
      return { success: false, error: "Eroare la salvarea evaluării." };
    }

    await sendTelegramAlert({
      name,
      phone,
      email,
      service: service_type,
      message: formattedMessage,
      pageUrl: `Assessment ${assessmentType}`,
      timestamp: new Date().toISOString(),
    });

    return { success: true, id: uniqueId };
  } catch (err) {
    console.error("Save Assessment Error:", err);
    return { success: false, error: "A apărut o eroare la salvarea evaluării." };
  }
}
