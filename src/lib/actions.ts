"use server";
import { createClient } from "@/lib/supabase/server";

import { sendTelegramAlert } from "@/lib/telegram";



export type ActionResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

/**
 * Saves a generic lead into the `leads` table in our platform.
 * Maps service -> service_type for database compatibility.
 * Safely defaults email/phone to prevent null constraint violations.
 */
export async function submitLead(formData: FormData): Promise<ActionResponse> {
  // Generate a unique identifier for this submission to trace its lifecycle
  const submissionId = crypto.randomUUID();
  

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
      
      try {
        await fetch(directUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(directPayload),
        });
        
      } catch {
        // console.error(`[Lead ${submissionId}] 🔧 Direct Telegram fetch error`, e);
      }
    } else {
      // console.warn(`[Lead ${submissionId}] 🔧 Direct Telegram fetch skipped – missing token or chat id`);
    }
  }

    if (error) {
      console.error("our platform Error saving lead:", error);
      return { success: false, error: "Eroare la salvarea datelor. Te rugăm să încerci din nou." };
    }


    

    
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
  // Generate a unique identifier for this assessment submission
  const submissionId = crypto.randomUUID();
  

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

    const { error } = await supabase.from("leads").insert([{ ...payload, submission_id: submissionId }]);
  if (!error) {
    
  }

    if (error) {
      console.error("Error saving assessment:", error);
      return { success: false, error: "Nu am putut salva evaluarea." };
    }



    // Log assessment receipt
    
    
        await sendTelegramAlert({
        name,
        phone,
        email,
        service: service_type,
        message: formattedMessage,
        submissionId,
      });
    

    
    // Return success response
    return { success: true, id: uniqueId };

  } catch (err) {
    console.error("Save assessment error:", err);
    return { success: false, error: "Eroare la procesarea evaluării." };
  }
}
