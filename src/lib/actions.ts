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

/**
 * Validates and records a Policy Review ("Verifică polița / Review My Policy") request.
 * Generates an unpredictable reference ID and logs metadata in a privacy-safe manner.
 */
export async function submitPolicyReview(formData: FormData): Promise<{
  success: boolean;
  referenceId?: string;
  error?: string;
  validationErrors?: Record<string, string>;
}> {
  try {
    const rawData = {
      category: formData.get("category"),
      reviewGoal: formData.get("reviewGoal"),
      currentInsurer: formData.get("currentInsurer"),
      expiryTimeline: formData.get("expiryTimeline"),
      clientNotes: formData.get("clientNotes"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      preferredContact: formData.get("preferredContact"),
      language: formData.get("language"),
      consent: formData.get("consent") === "true" || formData.get("consent") === "on",
    };

    const { validatePolicyReviewInput, generatePolicyReviewReference } = await import("@/lib/policy-review");
    const validation = validatePolicyReviewInput(rawData);

    if (!validation.isValid || !validation.sanitizedData) {
      return {
        success: false,
        error: "Formularul conține erori de validare.",
        validationErrors: validation.errors,
      };
    }

    const valid = validation.sanitizedData;
    const referenceId = generatePolicyReviewReference();
    const timestamp = new Date().toISOString();

    const categoryLabels: Record<string, string> = {
      auto: "Auto (CASCO / RCA / Fleet)",
      home: "Locuință & Patrimoniu Imobiliar",
      health: "Sănătate & Viață",
      business: "Business & Corporate Liability",
      "private-client": "Private Client & High-Value Assets",
    };

    const readableCategory = categoryLabels[valid.category] || valid.category;
    const service_type = `Policy Review: ${valid.category.toUpperCase()}`;

    const formattedMessage = [
      `[CERERE VERIFICARE POLIȚĂ]`,
      `ID Referință: ${referenceId}`,
      `Categorie: ${readableCategory}`,
      `Obiectiv Verificare: ${valid.reviewGoal}`,
      valid.currentInsurer ? `Asigurator curent: ${valid.currentInsurer}` : null,
      valid.expiryTimeline ? `Data / Orizont Expirare: ${valid.expiryTimeline}` : null,
      valid.clientNotes ? `Note client / Întrebări: ${valid.clientNotes}` : null,
      `Canal preferat: ${valid.preferredContact.toUpperCase()}`,
      `Limbă: ${valid.language.toUpperCase()}`,
      `Data înregistrării: ${timestamp}`,
    ]
      .filter(Boolean)
      .join("\n");

    const leadData = {
      name: valid.name,
      phone: valid.phone,
      email: valid.email || "",
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
      console.error("[submitPolicyReview] Supabase insert status:", restRes.status);
      return { success: false, error: "A apărut o problemă la salvarea solicitării. Te rugăm să încerci din nou." };
    }

    // Send privacy-safe operational alert to Telegram (zero PII, zero policy text)
    const { sendOperationalTelegramAlert } = await import("@/lib/telegram");
    await sendOperationalTelegramAlert({
      referenceId,
      category: readableCategory,
      reviewGoal: valid.reviewGoal,
      preferredContact: valid.preferredContact,
      language: valid.language,
      timestamp,
      pageUrl: "/verifica-polita",
    });

    return {
      success: true,
      referenceId,
    };
  } catch (err) {
    console.error("Policy Review Action Error:", err);
    return { success: false, error: "A apărut o eroare neașteptată la procesare." };
  }
}

/**
 * Submits a Home Purchase Protection inquiry (/cumpar-casa).
 * Stores structured lead data into public.leads without schema modifications.
 */
export async function submitHomePurchaseLead(formData: FormData): Promise<{
  success: boolean;
  referenceId?: string;
  error?: string;
}> {
  try {
    const name = (formData.get("name") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const email = (formData.get("email") as string)?.trim() || "";
    const propertyLocation = (formData.get("propertyLocation") as string)?.trim() || "Nemenționată";
    const propertyType = (formData.get("propertyType") as string)?.trim() || "Apartament";
    const surfaceArea = (formData.get("surfaceArea") as string)?.trim() || "";
    const purchaseStage = (formData.get("purchaseStage") as string)?.trim() || "Explorare";
    const hasMortgage = (formData.get("hasMortgage") as string)?.trim() || "Nedecis";
    const bankName = (formData.get("bankName") as string)?.trim() || "";
    const estimatedSigningDate = (formData.get("estimatedSigningDate") as string)?.trim() || "";
    const requestedAssistance = (formData.getAll("requestedAssistance") as string[]) || [];
    const source = (formData.get("source") as string)?.trim() || "Direct";
    const listingId = (formData.get("listingId") as string)?.trim() || "";
    const consent = formData.get("consent") === "true" || formData.get("consent") === "on";

    if (!name || name.length < 2) {
      return { success: false, error: "Te rugăm să introduci numele complet." };
    }

    if (!phone || phone.replace(/\D/g, "").length < 9) {
      return { success: false, error: "Te rugăm să introduci un număr de telefon valid." };
    }

    if (!consent) {
      return { success: false, error: "Este necesar acordul pentru prelucrarea datelor de contact." };
    }

    const referenceId = `HP-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const formattedMessage = [
      `[CERERE PROTECȚIE ACHIZIȚIE IMOBIL — CUMPAR-CASA]`,
      `ID Referință: ${referenceId}`,
      `Sursă / Canal: ${source}${listingId ? ` (Listing ID: ${listingId})` : ""}`,
      `Locație imobil: ${propertyLocation}`,
      `Tip imobil: ${propertyType}${surfaceArea ? ` (${surfaceArea} mp)` : ""}`,
      `Stadiu achiziție: ${purchaseStage}`,
      `Finanțare ipotecară: ${hasMortgage}${bankName ? ` (Banca: ${bankName})` : ""}`,
      estimatedSigningDate ? `Data estimată semnare: ${estimatedSigningDate}` : null,
      `Pachete solicitate: ${requestedAssistance.length > 0 ? requestedAssistance.join(", ") : "Consultanță Generală"}`,
      `Data înregistrării: ${timestamp}`,
    ]
      .filter(Boolean)
      .join("\n");

    const leadData = {
      name,
      phone,
      email,
      service_type: "Home Purchase: CUMPAR-CASA",
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
      console.error("[submitHomePurchaseLead] Supabase error status:", restRes.status);
      return { success: false, error: "A apărut o problemă la salvarea solicitării. Te rugăm să încerci din nou." };
    }

    const { sendOperationalTelegramAlert } = await import("@/lib/telegram");
    await sendOperationalTelegramAlert({
      referenceId,
      category: "Home Purchase Protection",
      reviewGoal: `Stadiu: ${purchaseStage} | ${hasMortgage}`,
      preferredContact: "Telefon",
      language: "RO",
      timestamp,
      pageUrl: `/cumpar-casa${source !== "Direct" ? `?source=${source}` : ""}`,
    });

    return { success: true, referenceId };
  } catch (err) {
    console.error("Home Purchase Action Error:", err);
    return { success: false, error: "A apărut o eroare neașteptată." };
  }
}

/**
 * Submits a Rental Property Protection inquiry (/proprietari-inchirieri).
 * Handles individual landlords and portfolio investors.
 */
export async function submitRentalProtectionLead(formData: FormData): Promise<{
  success: boolean;
  referenceId?: string;
  error?: string;
}> {
  try {
    const name = (formData.get("name") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const email = (formData.get("email") as string)?.trim() || "";
    const propertyLocation = (formData.get("propertyLocation") as string)?.trim() || "Nemenționată";
    const propertyType = (formData.get("propertyType") as string)?.trim() || "Apartament";
    const unitsCount = (formData.get("unitsCount") as string)?.trim() || "1 proprietate";
    const surfaceArea = (formData.get("surfaceArea") as string)?.trim() || "";
    const occupancyStatus = (formData.get("occupancyStatus") as string)?.trim() || "Ocupată de chiriaș";
    const rentalModel = (formData.get("rentalModel") as string)?.trim() || "Termen lung";
    const estimatedValue = (formData.get("estimatedValue") as string)?.trim() || "";
    const requestedAssistance = (formData.getAll("requestedAssistance") as string[]) || [];
    const source = (formData.get("source") as string)?.trim() || "Direct";
    const consent = formData.get("consent") === "true" || formData.get("consent") === "on";

    if (!name || name.length < 2) {
      return { success: false, error: "Te rugăm să introduci numele complet." };
    }

    if (!phone || phone.replace(/\D/g, "").length < 9) {
      return { success: false, error: "Te rugăm să introduci un număr de telefon valid." };
    }

    if (!consent) {
      return { success: false, error: "Este necesar acordul pentru prelucrarea datelor de contact." };
    }

    const referenceId = `RP-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const formattedMessage = [
      `[CERERE ASIGURARE PROPRIETATE ÎNCHIRIATĂ — PROPRIETARI-INCHIRIERI]`,
      `ID Referință: ${referenceId}`,
      `Sursă / Canal: ${source}`,
      `Număr unități: ${unitsCount}`,
      `Locație: ${propertyLocation}`,
      `Tip imobil: ${propertyType}${surfaceArea ? ` (${surfaceArea} mp)` : ""}`,
      `Model închiriere: ${rentalModel}`,
      `Status ocupare: ${occupancyStatus}`,
      estimatedValue ? `Valoare estimată: ${estimatedValue}` : null,
      `Pachete solicitate: ${requestedAssistance.length > 0 ? requestedAssistance.join(", ") : "Evaluare Risc Închiriere"}`,
      `Data înregistrării: ${timestamp}`,
    ]
      .filter(Boolean)
      .join("\n");

    const leadData = {
      name,
      phone,
      email,
      service_type: "Rental Protection: PROPRIETARI-INCHIRIERI",
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
      console.error("[submitRentalProtectionLead] Supabase error status:", restRes.status);
      return { success: false, error: "A apărut o problemă la salvarea solicitării. Te rugăm să încerci din nou." };
    }

    const { sendOperationalTelegramAlert } = await import("@/lib/telegram");
    await sendOperationalTelegramAlert({
      referenceId,
      category: "Rental Property Protection",
      reviewGoal: `Model: ${rentalModel} | Unități: ${unitsCount}`,
      preferredContact: "Telefon",
      language: "RO",
      timestamp,
      pageUrl: `/proprietari-inchirieri${source !== "Direct" ? `?source=${source}` : ""}`,
    });

    return { success: true, referenceId };
  } catch (err) {
    console.error("Rental Protection Action Error:", err);
    return { success: false, error: "A apărut o eroare neașteptată." };
  }
}

/**
 * Saves an SME Risk Audit consultation request (Initiative C)
 * Stores full deterministic summary in database, sends minimal operational notification to Telegram
 */
export async function submitSmeRiskAuditLead(formData: FormData): Promise<{ success: boolean; referenceId?: string; error?: string }> {
  try {
    const companyName = (formData.get("companyName") as string)?.trim() || "Companie Nespecificată";
    const industry = (formData.get("industry") as string)?.trim() || "Nespecificat";
    const employeeCount = (formData.get("employeeCount") as string)?.trim() || "Nespecificat";
    const locationsCount = (formData.get("locationsCount") as string)?.trim() || "1";
    const contactName = (formData.get("contactName") as string)?.trim() || "Anonim";
    const contactRole = (formData.get("contactRole") as string)?.trim() || "Reprezentant";
    const phone = (formData.get("phone") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const preferredMethod = (formData.get("preferredMethod") as string)?.trim() || "Telefon";
    const preferredTime = (formData.get("preferredTime") as string)?.trim() || "Oricând în intervalul 09:00 - 18:00";
    const userLanguage = (formData.get("language") as string)?.trim() || "RO";
    const summaryDataJson = (formData.get("auditSummary") as string)?.trim() || "{}";

    if (!phone) {
      return { success: false, error: "Numărul de telefon este obligatoriu pentru programarea auditului." };
    }
    if (!companyName || companyName === "Companie Nespecificată") {
      return { success: false, error: "Numele companiei este obligatoriu." };
    }

    const referenceId = `SME-AUDIT-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    let parsedSummary: Record<string, unknown> = {};
    try {
      parsedSummary = JSON.parse(summaryDataJson);
    } catch {
      parsedSummary = { raw: summaryDataJson };
    }

    const formattedMessage = [
      `[SOLICITARE AUDIT RISCURI SME / COMPANII — 30 MINUTE]`,
      `ID Referință: ${referenceId}`,
      `Companie: ${companyName}`,
      `Domeniu activitate: ${industry}`,
      `Număr angajați: ${employeeCount}`,
      `Locații operaționale: ${locationsCount}`,
      `Persoană contact: ${contactName} (${contactRole})`,
      `Metodă contact: ${preferredMethod} | Interval: ${preferredTime}`,
      `Limbă preferată: ${userLanguage}`,
      `Data înregistrării: ${timestamp}`,
      `\n--- REZUMAT AUDIT DETERMINISTIC RISCURI ---`,
      JSON.stringify(parsedSummary, null, 2),
    ].join("\n");

    const leadData = {
      name: `${contactName} (${companyName})`,
      phone,
      email,
      service_type: "SME Risk Audit 30 Min: AUDIT-RISCURI-COMPANII",
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
      console.error("[submitSmeRiskAuditLead] Supabase error status:", restRes.status);
      return { success: false, error: "A apărut o problemă la salvarea solicitării de audit. Te rugăm să încerci din nou." };
    }

    // Privacy safeguard: Send only high-level operational notification to Telegram
    const { sendOperationalTelegramAlert } = await import("@/lib/telegram");
    await sendOperationalTelegramAlert({
      referenceId,
      category: "SME Risk Audit 30 Min",
      reviewGoal: `${companyName} (${industry}, ${employeeCount} angajați)`,
      preferredContact: preferredMethod,
      language: userLanguage,
      timestamp,
      pageUrl: `/audit-riscuri-companii`,
    });

    return { success: true, referenceId };
  } catch (err) {
    console.error("SME Risk Audit Action Error:", err);
    return { success: false, error: "A apărut o eroare neașteptată." };
  }
}

/**
 * Saves an Employee Corporate Health quotation & advisory request (Initiative D)
 */
export async function submitCorporateHealthLead(formData: FormData): Promise<{ success: boolean; referenceId?: string; error?: string }> {
  try {
    const companyName = (formData.get("companyName") as string)?.trim() || "Companie Nespecificată";
    const industry = (formData.get("industry") as string)?.trim() || "Nespecificat";
    const employeeCount = (formData.get("employeeCount") as string)?.trim() || "Nespecificat";
    const locations = (formData.get("locations") as string)?.trim() || "Nespecificat";
    const desiredDate = (formData.get("desiredDate") as string)?.trim() || "Cât mai curând";
    const currentBenefits = (formData.get("currentBenefits") as string)?.trim() || "Nu deține în prezent";
    const priorities = (formData.get("priorities") as string)?.trim() || "Spitalizare și analize";
    const budget = (formData.get("budget") as string)?.trim() || "Nespecificat";
    const contactName = (formData.get("contactName") as string)?.trim() || "Anonim";
    const contactRole = (formData.get("contactRole") as string)?.trim() || "HR / Manager";
    const phone = (formData.get("phone") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const notes = (formData.get("notes") as string)?.trim() || "";
    const userLanguage = (formData.get("language") as string)?.trim() || "RO";

    if (!phone) {
      return { success: false, error: "Numărul de telefon este obligatoriu." };
    }
    if (!companyName || companyName === "Companie Nespecificată") {
      return { success: false, error: "Numele companiei este obligatoriu." };
    }

    const referenceId = `CORP-HEALTH-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const formattedMessage = [
      `[SOLICITARE OFERTĂ ASIGURARE SĂNĂTATE ANGAJAȚI — CORPORATE HEALTH]`,
      `ID Referință: ${referenceId}`,
      `Companie: ${companyName}`,
      `Domeniu activitate: ${industry}`,
      `Număr angajați: ${employeeCount}`,
      `Locații/Orașe: ${locations}`,
      `Orizont implementare: ${desiredDate}`,
      `Beneficii curente: ${currentBenefits}`,
      `Priorități acoperire: ${priorities}`,
      `Buget orientativ: ${budget}`,
      `Persoană contact: ${contactName} (${contactRole})`,
      `Limbă preferată: ${userLanguage}`,
      notes ? `Mențiuni suplimentare: ${notes}` : null,
      `Data înregistrării: ${timestamp}`,
    ]
      .filter(Boolean)
      .join("\n");

    const leadData = {
      name: `${contactName} (${companyName})`,
      phone,
      email,
      service_type: "Corporate Health: ASIGURARE-SANATATE-ANGAJATI",
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
      console.error("[submitCorporateHealthLead] Supabase error status:", restRes.status);
      return { success: false, error: "A apărut o problemă la salvarea solicitării. Te rugăm să încerci din nou." };
    }

    // Privacy-preserving Telegram notification
    const { sendOperationalTelegramAlert } = await import("@/lib/telegram");
    await sendOperationalTelegramAlert({
      referenceId,
      category: "Corporate Employee Health",
      reviewGoal: `${companyName} (${employeeCount} angajați | ${locations})`,
      preferredContact: "Email/Telefon",
      language: userLanguage,
      timestamp,
      pageUrl: `/asigurare-sanatate-angajati`,
    });

    return { success: true, referenceId };
  } catch (err) {
    console.error("Corporate Health Action Error:", err);
    return { success: false, error: "A apărut o eroare neașteptată." };
  }
}

/**
 * Saves a Bucharest Seismic Risk Property & Insurance Review Request
 */
export async function submitSeismicPropertyReviewLead(formData: FormData): Promise<{ success: boolean; referenceId?: string; error?: string }> {
  try {
    const propertyAddress = (formData.get("propertyAddress") as string)?.trim() || "";
    const sector = (formData.get("sector") as string)?.trim() || "București";
    const interestType = (formData.get("interestType") as string)?.trim() || "Cumpărător / Evaluare Achiziție";
    let homefindUrl = (formData.get("homefindUrl") as string)?.trim() || "";
    if (homefindUrl) {
      if (!homefindUrl.startsWith("http://") && !homefindUrl.startsWith("https://")) {
        homefindUrl = `https://${homefindUrl}`;
      }
      try {
        const parsed = new URL(homefindUrl);
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
          homefindUrl = "";
        }
      } catch {
        homefindUrl = "";
      }
    }
    const contactName = (formData.get("contactName") as string)?.trim() || "Anonim";
    const phone = (formData.get("phone") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const notes = (formData.get("notes") as string)?.trim() || "";
    const userLanguage = (formData.get("language") as string)?.trim() || "RO";

    if (!phone) {
      return { success: false, error: "Numărul de telefon este obligatoriu pentru transmiterea analizei de asigurare." };
    }
    if (!propertyAddress) {
      return { success: false, error: "Adresa imobilului este obligatorie." };
    }

    const referenceId = `SEISMIC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const formattedMessage = [
      `[SOLICITARE ANALIZĂ ASIGURARE IMOBIL & DUE DILIGENCE SEISMIC BUCUREȘTI]`,
      `ID Referință: ${referenceId}`,
      `Adresă imobil: ${propertyAddress} (Sector ${sector})`,
      `Statut solicitant: ${interestType}`,
      homefindUrl ? `Link proprietate HomeFind / Referință: ${homefindUrl}` : null,
      `Persoană contact: ${contactName}`,
      `Limbă preferată: ${userLanguage}`,
      notes ? `Mențiuni suplimentare: ${notes}` : null,
      `Data înregistrării: ${timestamp}`,
    ]
      .filter(Boolean)
      .join("\n");

    const leadData = {
      name: `${contactName} — Imobil: ${propertyAddress}`,
      phone,
      email,
      service_type: "Seismic Due Diligence: HARTA-RISC-SEISMIC",
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
      console.error("[submitSeismicPropertyReviewLead] Supabase error status:", restRes.status);
      return { success: false, error: "A apărut o problemă la salvarea solicitării. Te rugăm să încerci din nou." };
    }

    // Operational alert to Telegram without sensitive inspection files
    const { sendOperationalTelegramAlert } = await import("@/lib/telegram");
    await sendOperationalTelegramAlert({
      referenceId,
      category: "Bucharest Seismic Due Diligence",
      reviewGoal: `Sector ${sector} — ${interestType}`,
      preferredContact: "Telefon",
      language: userLanguage,
      timestamp,
      pageUrl: `/harta-risc-seismic-bucuresti`,
    });

    return { success: true, referenceId };
  } catch (err) {
    console.error("Seismic Property Review Action Error:", err);
    return { success: false, error: "A apărut o eroare neașteptată." };
  }
}




