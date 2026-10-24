"use server";

import { sendTelegramAlert } from "@/lib/telegram";
import { logger, sanitizeObject } from "@/lib/logger";
import { captureException } from "@/lib/sentry";

export type ActionResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

function getSupabaseConfig(): { supabaseUrl: string; supabaseKey: string } | null {
  const supabaseUrl = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.trim();
  const supabaseKey = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )?.trim();

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }
  return { supabaseUrl, supabaseKey };
}

async function insertLeadRecord(payload: {
  name: string;
  phone: string;
  email?: string;
  service_type: string;
  message: string;
}): Promise<boolean> {
  const config = getSupabaseConfig();
  if (!config) {
    logger.error("Supabase environment configuration missing in Server Action");
    return false;
  }
  try {
    const restRes = await fetch(`${config.supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: config.supabaseKey,
        Authorization: `Bearer ${config.supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    return restRes.ok || restRes.status === 201 || restRes.status === 200 || restRes.status === 204;
  } catch (err) {
    logger.error("Supabase lead insertion error in Server Action", err);
    return false;
  }
}

function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

function isHoneypotTriggered(val: string): boolean {
  return Boolean(val && val.trim().length > 0);
}

function validatePhone(phone: string): { isValid: boolean; sanitizedValue?: string; error?: string } {
  const sanitized = phone.replace(/[^\d+]/g, "").trim();
  const digitsOnly = sanitized.replace(/\D/g, "");
  if (!digitsOnly || digitsOnly.length < 9) {
    return { isValid: false, error: "Te rugăm să introduci un număr de telefon valid." };
  }
  return { isValid: true, sanitizedValue: sanitized };
}

function validateEmail(email: string, isRequired = false): { isValid: boolean; sanitizedValue?: string; error?: string } {
  const sanitized = email.trim().toLowerCase();
  if (!sanitized) {
    if (isRequired) return { isValid: false, error: "Adresa de email este obligatorie." };
    return { isValid: true, sanitizedValue: "" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized)) {
    return { isValid: false, error: "Te rugăm să introduci o adresă de email validă." };
  }
  return { isValid: true, sanitizedValue: sanitized };
}

function validateName(name: string, isRequired = false): { isValid: boolean; sanitizedValue?: string; error?: string } {
  const sanitized = sanitizeText(name);
  if (!sanitized || sanitized === "Anonim") {
    if (isRequired) return { isValid: false, error: "Numele este obligatoriu." };
    return { isValid: true, sanitizedValue: "Anonim" };
  }
  return { isValid: true, sanitizedValue: sanitized };
}

function validateMessage(message: string, maxLen = 2000): { isValid: boolean; sanitizedValue?: string; error?: string } {
  const sanitized = sanitizeText(message).slice(0, maxLen);
  return { isValid: true, sanitizedValue: sanitized };
}

/**
 * Saves a generic lead into the `leads` table in our platform.
 */
export async function submitLead(formData: FormData): Promise<ActionResponse> {
  const correlationId = crypto.randomUUID();

  try {
    // 1. Anti-spam Honeypot Check
    const hp = (formData.get("website_hp") as string) || (formData.get("hp") as string) || "";
    if (isHoneypotTriggered(hp)) {
      logger.info("Spam bot trapped by honeypot in submitLead", { correlationId });
      return { success: true, message: "Cererea ta a fost trimisă cu succes!" };
    }

    const nameRaw = (formData.get("name") as string) || "Anonim";
    const emailRaw = (formData.get("email") as string) || "";
    const phoneRaw = (formData.get("phone") as string) || "";
    const serviceRaw = (formData.get("service") as string) || "Website Lead";
    const messageRaw = (formData.get("message") as string) || "";
    const sourceRaw = (formData.get("source") as string) || "Website Lead";

    // 2. Strict Input Validation
    const phoneVal = validatePhone(phoneRaw);
    if (!phoneVal.isValid) {
      return { success: false, error: phoneVal.error };
    }

    const emailVal = validateEmail(emailRaw, false);
    if (!emailVal.isValid) {
      return { success: false, error: emailVal.error };
    }

    const nameVal = validateName(nameRaw, false);
    if (!nameVal.isValid) {
      return { success: false, error: nameVal.error };
    }

    const messageVal = validateMessage(messageRaw, 2000);
    if (!messageVal.isValid) {
      return { success: false, error: messageVal.error };
    }

    const rawLeadConsent =
      formData.get("agreePrivacy") ??
      formData.get("consent") ??
      formData.get("agreeGDPR") ??
      formData.get("privacyConsent") ??
      formData.get("privacy");
    const leadConsentGiven =
      rawLeadConsent === "true" ||
      rawLeadConsent === "on" ||
      rawLeadConsent === "1" ||
      rawLeadConsent === "yes";

    if (!leadConsentGiven) {
      return {
        success: false,
        error: "Este necesar să confirmați acordul privind politica de confidențialitate pentru a trimite solicitarea.",
      };
    }

    const metadataStr = formData.get("metadata") as string;
    let metadata = null;
    if (metadataStr) {
      try {
        metadata = JSON.parse(metadataStr);
      } catch {
        metadata = { raw: sanitizeText(metadataStr) };
      }
    }

    const cleanName = nameVal.sanitizedValue || "Anonim";
    const cleanPhone = phoneVal.sanitizedValue!;
    const cleanEmail = emailVal.sanitizedValue || "";
    const cleanService = sanitizeText(serviceRaw) || "Website Lead";
    const cleanMessage = messageVal.sanitizedValue || "";
    const cleanSource = sanitizeText(sourceRaw) || "insurance.cristianvaduva.com";

    const formattedMessage = [
      cleanMessage,
      cleanSource ? `Sursă: ${cleanSource}` : null,
      metadata ? `Context: ${JSON.stringify(sanitizeObject(metadata))}` : null,
      `ID Corelare: ${correlationId}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    const leadData = {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      service_type: cleanService,
      message: formattedMessage,
    };

    const isSaved = await insertLeadRecord(leadData);
    if (!isSaved) {
      logger.error(`[submitLead] Supabase REST insert failed`, undefined, {
        correlationId,
      });
      return { success: false, error: "Eroare la salvarea datelor. Te rugăm să încerci din nou." };
    }

    await sendTelegramAlert({
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      service: cleanService,
      message: formattedMessage,
      pageUrl: "Website Lead Action",
      timestamp: new Date().toISOString(),
    });

    logger.info("submitLead completed successfully", { correlationId, service: cleanService });
    return { success: true, message: "Cererea ta a fost trimisă cu succes!" };
  } catch (err) {
    captureException(err, { correlationId, action: "submitLead" });
    logger.error("submitLead exception", err, { correlationId });
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

    const isSaved = await insertLeadRecord(leadData);
    if (!isSaved) {
      console.error("[saveAssessment] Supabase insert failed");
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
      consent:
        formData.get("consent") === "true" ||
        formData.get("consent") === "on" ||
        formData.get("agreePrivacy") === "true" ||
        formData.get("privacyConsent") === "true",
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

    const isSaved = await insertLeadRecord(leadData);
    if (!isSaved) {
      console.error("[submitPolicyReview] Supabase insert failed");
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
    const rawHpConsent =
      formData.get("consent") ??
      formData.get("agreePrivacy") ??
      formData.get("agreeGDPR") ??
      formData.get("privacyConsent") ??
      formData.get("privacy");
    const consent =
      rawHpConsent === "true" ||
      rawHpConsent === "on" ||
      rawHpConsent === "1" ||
      rawHpConsent === "yes";

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

    const isSaved = await insertLeadRecord(leadData);
    if (!isSaved) {
      console.error("[submitHomePurchaseLead] Supabase insert failed");
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
    const rawRpConsent =
      formData.get("consent") ??
      formData.get("agreePrivacy") ??
      formData.get("agreeGDPR") ??
      formData.get("privacyConsent") ??
      formData.get("privacy");
    const consent =
      rawRpConsent === "true" ||
      rawRpConsent === "on" ||
      rawRpConsent === "1" ||
      rawRpConsent === "yes";

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

    const isSaved = await insertLeadRecord(leadData);
    if (!isSaved) {
      console.error("[submitRentalProtectionLead] Supabase insert failed");
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

    const rawSmeConsent =
      formData.get("agreePrivacy") ??
      formData.get("consent") ??
      formData.get("agreeGDPR") ??
      formData.get("privacyConsent") ??
      formData.get("privacy");
    const smeConsentGiven =
      rawSmeConsent === "true" ||
      rawSmeConsent === "on" ||
      rawSmeConsent === "1" ||
      rawSmeConsent === "yes";

    if (!smeConsentGiven) {
      return {
        success: false,
        error: "Este necesar acordul privind politica de confidențialitate pentru a trimite solicitarea.",
      };
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

    const isSaved = await insertLeadRecord(leadData);
    if (!isSaved) {
      console.error("[submitSmeRiskAuditLead] Supabase insert failed");
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

    const rawCorpConsent =
      formData.get("agreePrivacy") ??
      formData.get("consent") ??
      formData.get("agreeGDPR") ??
      formData.get("privacyConsent") ??
      formData.get("privacy");
    const corpConsentGiven =
      rawCorpConsent === "true" ||
      rawCorpConsent === "on" ||
      rawCorpConsent === "1" ||
      rawCorpConsent === "yes";

    if (!corpConsentGiven) {
      return {
        success: false,
        error: "Este necesar acordul privind politica de confidențialitate pentru a trimite solicitarea.",
      };
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

    const isSaved = await insertLeadRecord(leadData);
    if (!isSaved) {
      console.error("[submitCorporateHealthLead] Supabase insert failed");
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

    const rawSeismicConsent =
      formData.get("agreePrivacy") ??
      formData.get("consent") ??
      formData.get("agreeGDPR") ??
      formData.get("privacyConsent") ??
      formData.get("privacy");
    const seismicConsentGiven =
      rawSeismicConsent === "true" ||
      rawSeismicConsent === "on" ||
      rawSeismicConsent === "1" ||
      rawSeismicConsent === "yes";

    if (!seismicConsentGiven) {
      return {
        success: false,
        error: "Este necesar acordul privind politica de confidențialitate pentru a trimite solicitarea.",
      };
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

    const isSaved = await insertLeadRecord(leadData);
    if (!isSaved) {
      console.error("[submitSeismicPropertyReviewLead] Supabase insert failed");
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




