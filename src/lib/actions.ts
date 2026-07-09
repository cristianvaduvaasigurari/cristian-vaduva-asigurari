"use server";

import { createClient } from "@/lib/supabase/server";

export type ActionResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

/**
 * Saves a generic lead into the `leads` table in Supabase.
 * Ensure your `leads` table has columns:
 * name (text), email (text), phone (text), service (text), message (text), source (text)
 */
export async function submitLead(formData: FormData): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const service = formData.get("service") as string;
    const message = formData.get("message") as string;
    const source = formData.get("source") as string || "Website Lead";
    
    // Extragem date suplimentare trimise sub formă de JSON
    const metadataStr = formData.get("metadata") as string;
    const metadata = metadataStr ? JSON.parse(metadataStr) : null;

    const leadData = {
      name,
      email,
      phone,
      service,
      message,
      source,
      metadata
    };

    const { error } = await supabase.from("leads").insert([leadData]);

    if (error) {
      console.error("Supabase Error saving lead:", error);
      return { success: false, error: "Eroare la salvarea datelor. Te rugăm să încerci din nou." };
    }

    return { success: true, message: "Cererea ta a fost trimisă cu succes!" };
  } catch (err) {
    console.error("Server Action Error:", err);
    return { success: false, error: "A apărut o eroare neașteptată." };
  }
}

/**
 * Saves a complex assessment (e.g. Financial Twin, Gap Analysis) and generates a unique ID.
 * Falls back to `leads` table if a dedicated `assessments` table is not yet configured.
 */
export async function saveAssessment(assessmentType: string, data: Record<string, unknown>): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const supabase = await createClient();
    const uniqueId = `aix_${assessmentType.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Math.random().toString(36).substr(2, 9)}`;

    const payload = {
      name: data.name || "Anonymous Assessment",
      email: data.email || "",
      phone: data.phone || "",
      service: `Assessment: ${assessmentType}`,
      source: "Platform Assessment",
      message: `Assessment ID: ${uniqueId}`,
      metadata: { assessmentId: uniqueId, ...data }
    };

    const { error } = await supabase.from("leads").insert([payload]);

    if (error) {
      console.error("Error saving assessment:", error);
      return { success: false, error: "Nu am putut salva evaluarea." };
    }

    return { success: true, id: uniqueId };
  } catch (err) {
    console.error("Save assessment error:", err);
    return { success: false, error: "Eroare la procesarea evaluării." };
  }
}
