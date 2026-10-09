import jsPDF from "jspdf";

export type ReviewPurposeId =
  | "existing_policy"
  | "renewal"
  | "property_purchase"
  | "vehicle"
  | "life_health"
  | "business_liability"
  | "private_client"
  | "incident_loss";

export type DocItemStatus = "available" | "to_obtain" | "not_applicable" | "needs_clarification";

export interface DocChecklistItem {
  id: string;
  purposeId: ReviewPurposeId;
  titleRo: string;
  titleEn: string;
  descriptionRo: string;
  descriptionEn: string;
  status: DocItemStatus;
  notes?: string;
}

export interface ReviewDossierData {
  title: string;
  purposes: ReviewPurposeId[];
  lang: "ro" | "en";
  items: DocChecklistItem[];
  advisorQuestions: string[];
  userNotes?: string;
  createdAt: string;
}

export const REVIEW_PURPOSES = [
  {
    id: "existing_policy" as ReviewPurposeId,
    titleRo: "Audit Poliță Existentă",
    titleEn: "Existing Policy Audit",
    descRo: "Verificarea condițiilor, franșizelor și excluderilor dintr-un contract în vigoare",
    descEn: "Review conditions, deductibles, and exclusions of an active policy",
  },
  {
    id: "renewal" as ReviewPurposeId,
    titleRo: "Pregătire Reînnoire Contract",
    titleEn: "Policy Renewal Preparation",
    descRo: "Analiza ofertei de reînnoire și compararea cu alternative din piață",
    descEn: "Evaluate renewal notices and compare market alternatives",
  },
  {
    id: "property_purchase" as ReviewPurposeId,
    titleRo: "Achiziție Imobil / Asigurare Locuință",
    titleEn: "Home Purchase & Property",
    descRo: "Documente necesare pentru PAD, asigurare facultativă sau credit ipotecar",
    descEn: "Documents for mandatory PAD, comprehensive home, or mortgage requirements",
  },
  {
    id: "vehicle" as ReviewPurposeId,
    titleRo: "Asigurare Auto (CASCO / RCA)",
    titleEn: "Vehicle Insurance (CASCO / RCA)",
    descRo: "Inspecție de risc, carte de identitate vehicul și istoric daune",
    descEn: "Risk survey, vehicle registration, and claim history",
  },
  {
    id: "life_health" as ReviewPurposeId,
    titleRo: "Protecție Viață & Sănătate Familie",
    titleEn: "Life & Health Protection",
    descRo: "Evaluarea veniturilor de protejat, credite bancare și opțiuni medicale",
    descEn: "Income protection assessment, bank debts, and medical options",
  },
  {
    id: "business_liability" as ReviewPurposeId,
    titleRo: "Business & Răspundere Profesională",
    titleEn: "Business & Professional Liability",
    descRo: "Active companie, cifră de afaceri, contracte clienți și răspundere D&O",
    descEn: "Commercial assets, revenue, client contracts, and D&O liability",
  },
  {
    id: "private_client" as ReviewPurposeId,
    titleRo: "Private Client & Bunuri de Lux",
    titleEn: "Private Client & Luxury Assets",
    descRo: "Rapoarte de evaluare pentru artă, ceasuri, supercars sau proprietăți exclusiviste",
    descEn: "Appraisals for art, watches, supercars, and high-value properties",
  },
  {
    id: "incident_loss" as ReviewPurposeId,
    titleRo: "Pregătire Dosar după un Sinistru",
    titleEn: "Post-Incident / Claim Preparation",
    descRo: "Cronologie eveniment, fotografii, proces-verbal și cerere de despăgubire",
    descEn: "Incident chronology, photos, official reports, and claim registration",
  },
];

export const TEMPLATE_ITEMS: Omit<DocChecklistItem, "status">[] = [
  // Existing Policy
  {
    id: "doc_policy_schedule",
    purposeId: "existing_policy",
    titleRo: "Polița de Asigurare Curentă (Contract + Condiții Generale)",
    titleEn: "Current Insurance Policy (Schedule + General Terms)",
    descriptionRo: "Documentul complet care conține sumele asigurate, anexele și clauzele restrictive.",
    descriptionEn: "Complete policy schedule including insured sums, endorsements, and exclusions.",
  },
  {
    id: "doc_premium_receipt",
    purposeId: "existing_policy",
    titleRo: "Dovada Plății Primei / Ratelor Scadente",
    titleEn: "Proof of Premium Payment",
    descriptionRo: "Chitanță sau extras de cont care atestă valabilitatea acoperirii financiare.",
    descriptionEn: "Receipt or bank statement proving active coverage status.",
  },

  // Renewal
  {
    id: "doc_renewal_notice",
    purposeId: "renewal",
    titleRo: "Oferta / Notificarea de Reînnoire de la Asigurator",
    titleEn: "Insurer Renewal Notice / Proposal",
    descriptionRo: "Oferta primită care conține noile cote de primă și eventuale modificări de clauze.",
    descriptionEn: "Renewal notice stating updated premium rates and any altered terms.",
  },
  {
    id: "doc_declared_values_update",
    purposeId: "renewal",
    titleRo: "Lista Modificărilor sau Îmbunătățirilor Recente",
    titleEn: "Summary of Recent Asset Renovations or Value Changes",
    descriptionRo: "Renovări, dotări noi sau modificări de activitate ce necesită ajustarea sumelor asigurate.",
    descriptionEn: "Renovations, equipment upgrades, or altered business activities.",
  },

  // Property Purchase
  {
    id: "doc_property_cadastru",
    purposeId: "property_purchase",
    titleRo: "Releveu Cadastral & Suprafață Construită Desfășurată",
    titleEn: "Cadastral Survey & Total Floor Area",
    descriptionRo: "Document tehnic util pentru calcularea exactă a costului de reconstrucție de nou.",
    descriptionEn: "Technical drawing used for accurate reconstruction cost calculation.",
  },
  {
    id: "doc_bank_mortgage_req",
    purposeId: "property_purchase",
    titleRo: "Cerințele Specifice ale Băncii Creditare (Cesionare)",
    titleEn: "Mortgage Bank Insurance Requirements",
    descriptionRo: "Suma minimă solicitată de bancă și clauza obligatorie de cesiune în favoarea băncii.",
    descriptionEn: "Minimum sum insured requested by lender and bank assignment clause.",
  },

  // Vehicle
  {
    id: "doc_vehicle_talon",
    purposeId: "vehicle",
    titleRo: "Certificat de Înmatriculare (Talon) & Carte de Identitate Vehicul",
    titleEn: "Vehicle Registration Certificate (Talon & CIV)",
    descriptionRo: "Datele tehnice, seria de șasiu (VIN) și capacitatea cilindrică a autovehiculului.",
    descriptionEn: "Technical specifications, VIN number, and engine details.",
  },
  {
    id: "doc_risk_inspection_photos",
    purposeId: "vehicle",
    titleRo: "Fotografii Inspecție de Risc (pentru CASCO)",
    titleEn: "Pre-Insurance Inspection Photos (for CASCO)",
    descriptionRo: "Fotografii pe cele 4 laturi, bord (kilometraj), serii anvelope și parbriz.",
    descriptionEn: "Photographs from 4 angles, odometer reading, tires, and windshield.",
  },

  // Life & Health
  {
    id: "doc_life_financial_goal",
    purposeId: "life_health",
    titleRo: "Estimare Cheltuieli Familiale & Sold Credite",
    titleEn: "Estimate of Family Living Costs & Loan Balances",
    descriptionRo: "Suma necesară pentru susținerea familiei pe o perioadă de 3–5 ani în caz de eveniment neprevăzut.",
    descriptionEn: "Target capital to protect family living expenses for 3–5 years.",
  },

  // Business & Liability
  {
    id: "doc_biz_revenue_payroll",
    purposeId: "business_liability",
    titleRo: "Cifră de Afaceri, Fond Salarii & Cheltuieli Fixe",
    titleEn: "Annual Revenue, Payroll & Fixed Operational Costs",
    descriptionRo: "Date necesare pentru calibrarea răspunderii civile și a pierderilor din întreruperea activității.",
    descriptionEn: "Financial figures needed for liability and business interruption limits.",
  },
  {
    id: "doc_biz_client_contracts",
    purposeId: "business_liability",
    titleRo: "Clauze de Asigurare din Contractele Comerciale cu Clienții",
    titleEn: "Insurance Clauses from Client Service Agreements",
    descriptionRo: "Limite minime de răspundere profesională cerute contractual de beneficiari.",
    descriptionEn: "Minimum professional indemnity limits mandated by client contracts.",
  },

  // Private Client
  {
    id: "doc_luxury_appraisal",
    purposeId: "private_client",
    titleRo: "Raport de Evaluare Autorizat (Artă / Ceasuri / Bijuterii)",
    titleEn: "Certified Appraisal Report (Art / Watches / Jewellery)",
    descriptionRo: "Certificat emis de un evaluator autorizat necesar pentru activarea clauzei de Valoare Agreată.",
    descriptionEn: "Appraisal certificate required for the Agreed Value clause without depreciation.",
  },

  // Incident Loss
  {
    id: "doc_incident_report",
    purposeId: "incident_loss",
    titleRo: "Proces-Verbal Constatare (Poliție / Pompieri / Asociație de Proprietari)",
    titleEn: "Official Incident Report (Police / Fire Dept / Building Admin)",
    descriptionRo: "Documentul oficial care consemnează data, ora și cauza probabilă a evenimentului.",
    descriptionEn: "Official document stating date, time, and probable cause of the incident.",
  },
  {
    id: "doc_damage_photos",
    purposeId: "incident_loss",
    titleRo: "Fotografii de Ansamblu și Detaliu ale Avariilor",
    titleEn: "Comprehensive Photos of Damaged Property & Scene",
    descriptionRo: "Fotografii realizate înainte de orice reparație sau degajare a bunurilor afectate.",
    descriptionEn: "Photos taken prior to any repair or removal of damaged contents.",
  },
];

/**
 * Builds checklist items based on selected review purposes.
 */
export function buildDossierItems(purposes: ReviewPurposeId[]): DocChecklistItem[] {
  return TEMPLATE_ITEMS.filter((item) => purposes.includes(item.purposeId)).map((item) => ({
    ...item,
    status: "to_obtain",
  }));
}

/**
 * Generates dynamic suggested advisor questions.
 */
export function generateSuggestedQuestions(
  purposes: ReviewPurposeId[],
  items: DocChecklistItem[],
  lang: "ro" | "en" = "ro"
): string[] {
  const isRo = lang === "ro";
  const questions: string[] = [];

  if (purposes.includes("existing_policy")) {
    questions.push(
      isRo
        ? "Care sunt excluderile specifice din Condițiile Generale care pot limita despăgubirea?"
        : "What specific policy exclusions could limit claim indemnity?"
    );
    questions.push(
      isRo
        ? "Franșizele prevăzute în contract se aplică per eveniment sau per daună individuală?"
        : "Do deductibles apply per single event or per individual loss?"
    );
  }

  if (purposes.includes("renewal")) {
    questions.push(
      isRo
        ? "Noua ofertă de reînnoire include modificări de franșize sau clauze restrictive față de anul trecut?"
        : "Does the renewal proposal introduce altered deductibles or more restrictive clauses?"
    );
    questions.push(
      isRo
        ? "Există alternative de la alți asiguratori de top cu un raport cost/acoperire mai eficient?"
        : "Are alternative quotes available from top-tier carriers with better terms?"
    );
  }

  if (purposes.includes("property_purchase")) {
    questions.push(
      isRo
        ? "Suma asigurată pe clădire este stabilită la valoarea de reconstrucție de nou sau cu scăderea uzurii?"
        : "Is building sum insured calculated on full new replacement cost or actual cash value?"
    );
    questions.push(
      isRo
        ? "Polița acoperă avariile accidentale ale conductelor interioare și răspunderea civilă față de vecini?"
        : "Does coverage include accidental water pipe damage and third-party neighbor liability?"
    );
  }

  if (purposes.includes("vehicle")) {
    questions.push(
      isRo
        ? "Polița CASCO include clauză de reparație exclusivă în reprezentanțe autorizate și mașină la schimb?"
        : "Does CASCO include authorized dealership repairs and courtesy replacement vehicle?"
    );
  }

  if (purposes.includes("business_liability")) {
    questions.push(
      isRo
        ? "Limita de răspundere profesională acoperă și cheltuielile de apărare juridică și onorariile de avocat?"
        : "Does the professional liability limit cover legal defence expenses in addition to claims?"
    );
  }

  if (purposes.includes("private_client")) {
    questions.push(
      isRo
        ? "Cum se aplică clauza de Valoare Agreată în caz de daune parțiale la bunurile de colecție?"
        : "How does the Agreed Value endorsement apply to partial losses on collectible assets?"
    );
  }

  if (purposes.includes("incident_loss")) {
    questions.push(
      isRo
        ? "Care este termenul limită exact în ore/zile pentru transmiterea dosarului de daună complet?"
        : "What is the exact deadline in hours/days to submit all required claim documentation?"
    );
  }

  // Generic fallback
  questions.push(
    isRo
      ? "Care sunt documentele strict obligatorii ce trebuie transmise pentru finalizarea dosarului?"
      : "What are the strictly mandatory documents required to finalize the submission?"
  );

  return Array.from(new Set(questions));
}

/**
 * PDF Generator for Insurance Review Dossier.
 */
export function generateDossierPdf(dossier: ReviewDossierData): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const isRo = dossier.lang === "ro";
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("CRISTIAN VADUVA — ASIGURARI PREMIUM", margin, 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text("Dosar de Pregatire & Checklist Documente | Insurance.CristianVaduva.com", margin, 18);

  const dateStr = new Date().toLocaleDateString(isRo ? "ro-RO" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`${isRo ? "Data intocmirii" : "Date Created"}: ${dateStr}`, pageWidth - margin, 18, { align: "right" });

  y = 36;

  // Title
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(dossier.title || (isRo ? "DOSAR DE PREGATIRE ASIGURARE" : "INSURANCE REVIEW DOSSIER"), margin, y);

  y += 7;

  // Purpose summary box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentWidth, 14, "FD");

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 41, 59);

  const purposeLabels = dossier.purposes
    .map((p) => {
      const found = REVIEW_PURPOSES.find((rp) => rp.id === p);
      return isRo ? found?.titleRo : found?.titleEn;
    })
    .join(" • ");

  doc.text(`${isRo ? "Obiective Dosar" : "Review Scope"}: ${purposeLabels}`, margin + 4, y + 9);

  y += 20;

  // Section 1: Checklist of Documents & Current Statuses
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(isRo ? "1. CHECKLIST DOCUMENTE & SITUATIE ACTUALA" : "1. DOCUMENT CHECKLIST & CURRENT STATUS", margin, y);

  y += 6;

  dossier.items.slice(0, 8).forEach((item) => {
    // Checkbox box
    doc.setDrawColor(100, 116, 139);
    doc.rect(margin, y, 3.5, 3.5);

    if (item.status === "available") {
      doc.setFillColor(34, 197, 94); // emerald-500
      doc.rect(margin + 0.5, y + 0.5, 2.5, 2.5, "F");
    }

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text(isRo ? item.titleRo : item.titleEn, margin + 6, y + 2.8);

    const statusBadgeText =
      item.status === "available"
        ? isRo ? "[DISPONIBIL]" : "[AVAILABLE]"
        : item.status === "to_obtain"
        ? isRo ? "[DE OBTINUT]" : "[TO OBTAIN]"
        : item.status === "needs_clarification"
        ? isRo ? "[CLARIFICARE]" : "[CLARIFY]"
        : isRo ? "[N/A]" : "[N/A]";

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(
      item.status === "available" ? 34 : item.status === "to_obtain" ? 234 : 100,
      item.status === "available" ? 197 : item.status === "to_obtain" ? 88 : 116,
      item.status === "available" ? 94 : item.status === "to_obtain" ? 12 : 139
    );
    doc.text(statusBadgeText, pageWidth - margin, y + 2.8, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    const splitDesc = doc.splitTextToSize(isRo ? item.descriptionRo : item.descriptionEn, contentWidth - 6);
    doc.text(splitDesc, margin + 6, y + 6.5);

    y += 7.5 + splitDesc.length * 3.2;
  });

  y += 2;

  // Section 2: Questions for Insurance Advisor
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(isRo ? "2. INTREBARI PENTRU CONSULTANTUL DE ASIGURARI" : "2. QUESTIONS FOR INSURANCE ADVISOR", margin, y);

  y += 6;

  dossier.advisorQuestions.slice(0, 4).forEach((q) => {
    doc.setDrawColor(100, 116, 139);
    doc.rect(margin, y, 3, 3);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    const splitQ = doc.splitTextToSize(q, contentWidth - 6);
    doc.text(splitQ, margin + 6, y + 2.5);

    y += 4 + splitQ.length * 3.5;
  });

  y += 2;

  // Optional User Notes Section
  if (dossier.userNotes && dossier.userNotes.trim().length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(isRo ? "3. NOTITE SPECIALE & CONTEXT UTILIZATOR" : "3. USER NOTES & CONTEXT", margin, y);

    y += 5;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 14, "FD");

    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const splitNotes = doc.splitTextToSize(dossier.userNotes, contentWidth - 4);
    doc.text(splitNotes, margin + 2, y + 4.5);

    y += 18;
  }

  // Footer Disclaimers & Contact
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, 22, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text(isRo ? "CONSULTANTA SI AUDIT POLITE (CRISTIAN VADUVA):" : "INSURANCE ADVISORY & AUDIT (CRISTIAN VADUVA):", margin + 3, y + 4.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    isRo
      ? "Telefon: 0767 110 439 | Website: https://insurance.cristianvaduva.com/verifica-polita\nAcest dosar are rol pur organizatoric de pregatire si nu reprezinta o cerere oficiala de dauna sau o confirmare de acoperire din partea asiguratorului."
      : "Phone: 0767 110 439 | Website: https://insurance.cristianvaduva.com/verifica-polita\nThis dossier is an organizational aid and does not constitute a formal insurer claim or binding underwriting submission.",
    margin + 3,
    y + 9.5
  );

  return doc;
}

/**
 * Validates a JSON imported dossier backup.
 */
export function validateImportedDossier(jsonStr: string): {
  isValid: boolean;
  error?: string;
  dossier?: ReviewDossierData;
} {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== "object") {
      return { isValid: false, error: "Format JSON neconform sau corupt." };
    }

    if (!Array.isArray(parsed.purposes) || !Array.isArray(parsed.items)) {
      return { isValid: false, error: "Fișierul nu conține o structură validă de dosar." };
    }

    const dossier: ReviewDossierData = {
      title: String(parsed.title || "Dosar Asigurare").slice(0, 100),
      purposes: parsed.purposes,
      lang: parsed.lang === "en" ? "en" : "ro",
      items: (parsed.items as Record<string, unknown>[]).map((it) => ({
        id: String(it.id),
        purposeId: it.purposeId as ReviewPurposeId,
        titleRo: String(it.titleRo || ""),
        titleEn: String(it.titleEn || ""),
        descriptionRo: String(it.descriptionRo || ""),
        descriptionEn: String(it.descriptionEn || ""),
        status: ["available", "to_obtain", "not_applicable", "needs_clarification"].includes(String(it.status))
          ? (it.status as DocItemStatus)
          : "to_obtain",
        notes: it.notes ? String(it.notes).slice(0, 300) : undefined,
      })),
      advisorQuestions: Array.isArray(parsed.advisorQuestions)
        ? (parsed.advisorQuestions as unknown[]).map((q) => String(q).slice(0, 200))
        : [],
      userNotes: parsed.userNotes ? String(parsed.userNotes).slice(0, 500) : undefined,
      createdAt: parsed.createdAt || new Date().toISOString(),
    };

    return { isValid: true, dossier };
  } catch {
    return { isValid: false, error: "Eroare la parsarea fișierului JSON." };
  }
}
