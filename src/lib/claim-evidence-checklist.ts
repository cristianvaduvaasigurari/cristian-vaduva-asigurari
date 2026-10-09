import { jsPDF } from "jspdf";

export type ClaimCategory =
  | "auto_casco"
  | "auto_rca"
  | "home_property"
  | "health_medical"
  | "travel_emergency"
  | "liability_general"
  | "business_property"
  | "other";

export type DocCategory =
  | "identification_policy"
  | "notification_forms"
  | "incident_evidence"
  | "inspection_photos"
  | "estimates_invoices"
  | "ownership_value"
  | "insurer_correspondence"
  | "technical_reports"
  | "other";

export type RequirementSource =
  | "insurer_request"
  | "policy_terms"
  | "adviser_recommendation"
  | "legal_statutory"
  | "user_preparation"
  | "other";

export type RequirementType =
  | "mandatory_per_source"
  | "requested_additional"
  | "suggested_preparation"
  | "to_verify_applicability";

export type DocumentAvailability =
  | "available"
  | "obtained_and_submitted"
  | "in_progress"
  | "missing_needed"
  | "not_applicable";

export interface ClaimDocumentItem {
  id: string;
  title: string;
  docCategory: DocCategory;
  requirementSource: RequirementSource;
  requirementSourceDetail?: string; // e.g. "Adresă solicitare completare din 12.10"
  requirementType: RequirementType;
  availability: DocumentAvailability;
  dateRequested?: string; // YYYY-MM-DD
  dateObtained?: string; // YYYY-MM-DD
  dateSubmitted?: string; // YYYY-MM-DD
  dateConfirmed?: string; // YYYY-MM-DD
  hasInsurerReceiptConfirmation: boolean;
  notes?: string;
  missingDetails?: string;
  followUpRequired: boolean;
  followUpTargetDate?: string; // YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
}

export interface ClaimEvidenceChecklistData {
  schemaVersion: "1.0";
  claimReference: string;
  claimNickname: string;
  claimCategory: ClaimCategory;
  insurerName?: string;
  claimFileNumber?: string; // Insurer's internal file number
  incidentDate?: string;
  firstNotificationDate?: string;
  generalNotes?: string;
  items: ClaimDocumentItem[];
  createdAt: string;
  updatedAt: string;
}

export const CLAIM_CATEGORY_LABELS: Record<ClaimCategory, { ro: string; en: string }> = {
  auto_casco: { ro: "Auto CASCO", en: "Auto CASCO" },
  auto_rca: { ro: "Auto RCA (Răspundere)", en: "Auto Third-Party (RCA)" },
  home_property: { ro: "Locuință & Bunuri", en: "Home & Property" },
  health_medical: { ro: "Sănătate & Medical", en: "Health & Medical" },
  travel_emergency: { ro: "Călătorie & Urgențe", en: "Travel & Emergency" },
  liability_general: { ro: "Răspundere Civilă / Profesională", en: "General / Professional Liability" },
  business_property: { ro: "Bunuri & Întrerupere Business", en: "Business Property & Interruption" },
  other: { ro: "Altă Categorie Daună", en: "Other Claim Category" },
};

export const DOC_CATEGORY_LABELS: Record<DocCategory, { ro: string; en: string }> = {
  identification_policy: { ro: "Identificare & Poliță", en: "Identification & Policy" },
  notification_forms: { ro: "Notificare & Formulare Daună", en: "Claim Forms & Notice" },
  incident_evidence: { ro: "Dovadă Incident & Constatare", en: "Incident Proof & Police/Report" },
  inspection_photos: { ro: "Fotografii & Notă Constatare", en: "Photos & Damage Assessment" },
  estimates_invoices: { ro: "Devize, Facturi & Plăți", en: "Estimates, Invoices & Receipts" },
  ownership_value: { ro: "Titlu Proprietate & Valoare", en: "Ownership & Valuation" },
  insurer_correspondence: { ro: "Corespondență & Cereri Asigurător", en: "Insurer Communications" },
  technical_reports: { ro: "Expertize & Rapoarte Tehnice", en: "Technical Reports" },
  other: { ro: "Alte Documente", en: "Other Documents" },
};

export const REQUIREMENT_SOURCE_LABELS: Record<RequirementSource, { ro: string; en: string }> = {
  insurer_request: { ro: "Solicitare Scrisă Asigurător", en: "Written Insurer Request" },
  policy_terms: { ro: "Condiții Contractuale Poliță", en: "Policy Wording / Terms" },
  adviser_recommendation: { ro: "Recomandare Consultant / Broker", en: "Adviser / Broker Suggestion" },
  legal_statutory: { ro: "Prevedere Legală / Normă ASF", en: "Legal / Regulatory Requirement" },
  user_preparation: { ro: "Pregătire Proactivă Asigurat", en: "Proactive Insured Prep" },
  other: { ro: "Altă Sursă", en: "Other Source" },
};

export const REQUIREMENT_TYPE_LABELS: Record<RequirementType, { ro: string; en: string; badgeClass: string }> = {
  mandatory_per_source: {
    ro: "Obligatoriu conform sursei",
    en: "Mandatory per source",
    badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  },
  requested_additional: {
    ro: "Solicitat suplimentar de asigurător",
    en: "Requested as additional",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  },
  suggested_preparation: {
    ro: "Recomandat pentru dosar complet",
    en: "Suggested preparation",
    badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  },
  to_verify_applicability: {
    ro: "De verificat dacă este aplicabil",
    en: "To verify applicability",
    badgeClass: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  },
};

export const AVAILABILITY_LABELS: Record<DocumentAvailability, { ro: string; en: string; badgeClass: string }> = {
  available: {
    ro: "Disponibil / Pregătit",
    en: "Available / Ready",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  obtained_and_submitted: {
    ro: "Transmis asigurătorului",
    en: "Submitted to insurer",
    badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  },
  in_progress: {
    ro: "În curs de obținere",
    en: "In progress",
    badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  },
  missing_needed: {
    ro: "Lipsă — Necesar",
    en: "Missing / Needed",
    badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  },
  not_applicable: {
    ro: "Nu se aplică",
    en: "Not applicable",
    badgeClass: "bg-zinc-500/10 text-zinc-400 border-zinc-500/30",
  },
};

export function parseLocalDate(dateStr?: string): Date | null {
  if (!dateStr || typeof dateStr !== "string") return null;
  const parts = dateStr.trim().split("-");
  if (parts.length !== 3) return null;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  const d = new Date(year, month, day);
  return isNaN(d.getTime()) ? null : d;
}

export function formatLocalDateRo(dateStr?: string): string {
  if (!dateStr) return "—";
  const d = parseLocalDate(dateStr);
  if (!d) return dateStr;
  return d.toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function isDatePast(dateStr?: string): boolean {
  if (!dateStr) return false;
  const d = parseLocalDate(dateStr);
  if (!d) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d.getTime() < today.getTime();
}

export const STARTER_TEMPLATES_BY_CATEGORY: Record<ClaimCategory, Array<Omit<ClaimDocumentItem, "id" | "createdAt" | "updatedAt">>> = {
  auto_casco: [
    {
      title: "Copie Poliță CASCO & Dovadă Plată Rată",
      docCategory: "identification_policy",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: false,
      notes: "Verifică valabilitatea la data producerii evenimentului.",
    },
    {
      title: "Formular Notificare / Avizare Daună Completat",
      docCategory: "notification_forms",
      requirementSource: "insurer_request",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
      notes: "Număr înregistrare sau confirmare email primire avizare.",
    },
    {
      title: "Documente Șofer: CI, Permis Conducere, Certificat Înmatriculare",
      docCategory: "identification_policy",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: false,
    },
    {
      title: "Constatare Amiabilă de Accident sau Proces Verbal Poliție",
      docCategory: "incident_evidence",
      requirementSource: "legal_statutory",
      requirementType: "mandatory_per_source",
      availability: "in_progress",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
      notes: "Original sau copie lizibilă cu ambele semnături.",
    },
    {
      title: "Fotografii Avarii, Poză Număr Înmatriculare & Loc Eveniment",
      docCategory: "inspection_photos",
      requirementSource: "user_preparation",
      requirementType: "suggested_preparation",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: false,
    },
    {
      title: "Proces Verbal de Constatare Daune (emis de inspectorul asigurătorului)",
      docCategory: "inspection_photos",
      requirementSource: "insurer_request",
      requirementType: "mandatory_per_source",
      availability: "in_progress",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
      notes: "Verifică dacă toate piesele avariate sunt consemnate explicit.",
    },
    {
      title: "Deviz Estimativ de Reparație / Ofertă Service Partener",
      docCategory: "estimates_invoices",
      requirementSource: "insurer_request",
      requirementType: "mandatory_per_source",
      availability: "in_progress",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
    },
  ],
  auto_rca: [
    {
      title: "Copie Poliță RCA a Vinovatului & Copie Poliță Proprie",
      docCategory: "identification_policy",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: false,
    },
    {
      title: "Constatare Amiabilă / Proces Verbal Poliție cu Indicarea Vinovăției",
      docCategory: "incident_evidence",
      requirementSource: "legal_statutory",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
    },
    {
      title: "Acte Identitate Păgubit, Certificat Înmatriculare & Carte Identitate Vehicul",
      docCategory: "identification_policy",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: false,
    },
    {
      title: "Notă Constatare Daune Emisă de Inspectorul RCA",
      docCategory: "inspection_photos",
      requirementSource: "insurer_request",
      requirementType: "mandatory_per_source",
      availability: "in_progress",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
    },
    {
      title: "Cerere de Despăgubire Formală & Cont IBAN Despăgubire",
      docCategory: "notification_forms",
      requirementSource: "insurer_request",
      requirementType: "mandatory_per_source",
      availability: "in_progress",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
    },
  ],
  home_property: [
    {
      title: "Poliță Asigurare Facultativă Locuință & Poliță Obligatorie PAD",
      docCategory: "identification_policy",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: false,
    },
    {
      title: "Act de Proprietate (Contract Vânzare / Extras Carte Funciară)",
      docCategory: "ownership_value",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: false,
    },
    {
      title: "Proces Verbal / Adeverință Asociație Proprietari sau Raport ISU / Pompieri",
      docCategory: "incident_evidence",
      requirementSource: "insurer_request",
      requirementType: "mandatory_per_source",
      availability: "in_progress",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
    },
    {
      title: "Fotografii Detaliate Pagube, Bunuri Avariate & Sursa Avariei",
      docCategory: "inspection_photos",
      requirementSource: "user_preparation",
      requirementType: "suggested_preparation",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: false,
    },
    {
      title: "Deviz Estimativ de Reconstrucție / Reparație & Facturi Materiale",
      docCategory: "estimates_invoices",
      requirementSource: "insurer_request",
      requirementType: "mandatory_per_source",
      availability: "in_progress",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
    },
  ],
  health_medical: [
    {
      title: "Card Asigurat / Copie Poliță Sănătate",
      docCategory: "identification_policy",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: false,
    },
    {
      title: "Scrisoare Medicală / Bilet Ieșire din Spital / Diagnostic",
      docCategory: "incident_evidence",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
    },
    {
      title: "Facturi Fiscale & Chitanțe / Extrase Plată Clinica Medicală",
      docCategory: "estimates_invoices",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "in_progress",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
    },
    {
      title: "Rețete & Prescripții Medicale Asociate Tratamentului",
      docCategory: "technical_reports",
      requirementSource: "insurer_request",
      requirementType: "suggested_preparation",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: false,
    },
  ],
  travel_emergency: [
    {
      title: "Poliță Asigurare Călătorie & Voucher Asistență 24/7",
      docCategory: "identification_policy",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: false,
    },
    {
      title: "Raport Medical de Urgență Emis în Străinătate",
      docCategory: "incident_evidence",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
    },
    {
      title: "Facturi Originale Plătite & Dovadă Monedă Plată",
      docCategory: "estimates_invoices",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
    },
    {
      title: "Bilete Avion / Rezervări / Dovadă Deplasare în Perioada Asigurată",
      docCategory: "ownership_value",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: false,
    },
  ],
  liability_general: [
    {
      title: "Poliță Răspundere Civilă & Condiții Speciale",
      docCategory: "identification_policy",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: false,
    },
    {
      title: "Notificare Pretenție / Notificare Formală Primite de la Terțul Prejudiciat",
      docCategory: "notification_forms",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
    },
    {
      title: "Contracte & Documente Prestație / Faptă Cauzatoare",
      docCategory: "incident_evidence",
      requirementSource: "insurer_request",
      requirementType: "mandatory_per_source",
      availability: "in_progress",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
    },
  ],
  business_property: [
    {
      title: "Poliță Property & Business Interruption",
      docCategory: "identification_policy",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: false,
    },
    {
      title: "Registru Inventar Bunuri Avariate & Valori Contabile",
      docCategory: "ownership_value",
      requirementSource: "insurer_request",
      requirementType: "mandatory_per_source",
      availability: "in_progress",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
    },
  ],
  other: [
    {
      title: "Contract / Poliță de Asigurare În Vigoare",
      docCategory: "identification_policy",
      requirementSource: "policy_terms",
      requirementType: "mandatory_per_source",
      availability: "available",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: false,
    },
    {
      title: "Formular Notificare Daună Transmis Scris",
      docCategory: "notification_forms",
      requirementSource: "insurer_request",
      requirementType: "mandatory_per_source",
      availability: "in_progress",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: true,
    },
  ],
};

export interface ClaimEvidenceSummaryStats {
  totalItems: number;
  availableCount: number;
  submittedCount: number;
  inProgressCount: number;
  missingNeededCount: number;
  notApplicableCount: number;
  confirmedReceiptCount: number;
  followUpOverdueCount: number;
  mandatoryCount: number;
  completenessPercent: number;
}

export function generateClaimEvidenceSummaryStats(
  items: ClaimDocumentItem[]
): ClaimEvidenceSummaryStats {
  let availableCount = 0;
  let submittedCount = 0;
  let inProgressCount = 0;
  let missingNeededCount = 0;
  let notApplicableCount = 0;
  let confirmedReceiptCount = 0;
  let followUpOverdueCount = 0;
  let mandatoryCount = 0;

  for (const item of items) {
    if (item.availability === "available") availableCount++;
    else if (item.availability === "obtained_and_submitted") submittedCount++;
    else if (item.availability === "in_progress") inProgressCount++;
    else if (item.availability === "missing_needed") missingNeededCount++;
    else if (item.availability === "not_applicable") notApplicableCount++;

    if (item.hasInsurerReceiptConfirmation) confirmedReceiptCount++;

    if (item.requirementType === "mandatory_per_source") mandatoryCount++;

    if (
      item.followUpRequired &&
      item.followUpTargetDate &&
      isDatePast(item.followUpTargetDate) &&
      item.availability !== "obtained_and_submitted" &&
      item.availability !== "not_applicable"
    ) {
      followUpOverdueCount++;
    }
  }

  const applicableItems = items.filter((i) => i.availability !== "not_applicable");
  const readyOrSubmitted = items.filter(
    (i) => i.availability === "available" || i.availability === "obtained_and_submitted"
  );

  const completenessPercent =
    applicableItems.length > 0
      ? Math.round((readyOrSubmitted.length / applicableItems.length) * 100)
      : 0;

  return {
    totalItems: items.length,
    availableCount,
    submittedCount,
    inProgressCount,
    missingNeededCount,
    notApplicableCount,
    confirmedReceiptCount,
    followUpOverdueCount,
    mandatoryCount,
    completenessPercent,
  };
}

export const INITIAL_CLAIM_EVIDENCE_DATA: ClaimEvidenceChecklistData = {
  schemaVersion: "1.0",
  claimReference: "DOSAR-DAUNA-2026-01",
  claimNickname: "Daună CASCO / Locuință Exemplu",
  claimCategory: "auto_casco",
  insurerName: "Compania de Asigurări",
  claimFileNumber: "DOS-987654",
  incidentDate: "2026-10-01",
  firstNotificationDate: "2026-10-02",
  generalNotes: "Checklist orientativ pentru verificarea completitudinii dosarului de daună înainte de transmiterea către asigurător.",
  items: STARTER_TEMPLATES_BY_CATEGORY.auto_casco.map((tmpl, idx) => ({
    ...tmpl,
    id: `doc-${Date.now()}-${idx}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function validateImportedClaimEvidenceData(
  jsonStr: string
): { success: true; data: ClaimEvidenceChecklistData } | { success: false; error: string } {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== "object") {
      return { success: false, error: "Fișierul JSON nu este un obiect valid." };
    }

    if (parsed.schemaVersion !== "1.0") {
      return { success: false, error: "Versiunea schemei nu este compatibilă (trebuie să fie 1.0)." };
    }

    if (typeof parsed.claimReference !== "string" || !parsed.claimReference.trim()) {
      return { success: false, error: "Lipsește referința dosarului de daună." };
    }

    if (!Array.isArray(parsed.items)) {
      return { success: false, error: "Lista de documente este invalidă (trebuie să fie un tablou)." };
    }

    if (parsed.items.length > 200) {
      return { success: false, error: "Numărul de documente depășește limita de 200." };
    }

    const validatedItems: ClaimDocumentItem[] = [];

    for (let i = 0; i < parsed.items.length; i++) {
      const it = parsed.items[i];
      if (!it || typeof it !== "object") {
        return { success: false, error: `Documentul ${i + 1} este invalid.` };
      }

      if (!it.title || typeof it.title !== "string" || it.title.length > 250) {
        return { success: false, error: `Titlul documentului ${i + 1} este invalid sau depășește limita de caractere.` };
      }

      const validDocCat: DocCategory[] = [
        "identification_policy",
        "notification_forms",
        "incident_evidence",
        "inspection_photos",
        "estimates_invoices",
        "ownership_value",
        "insurer_correspondence",
        "technical_reports",
        "other",
      ];
      const docCategory: DocCategory = validDocCat.includes(it.docCategory) ? it.docCategory : "other";

      const validReqSource: RequirementSource[] = [
        "insurer_request",
        "policy_terms",
        "adviser_recommendation",
        "legal_statutory",
        "user_preparation",
        "other",
      ];
      const requirementSource: RequirementSource = validReqSource.includes(it.requirementSource)
        ? it.requirementSource
        : "user_preparation";

      const validReqType: RequirementType[] = [
        "mandatory_per_source",
        "requested_additional",
        "suggested_preparation",
        "to_verify_applicability",
      ];
      const requirementType: RequirementType = validReqType.includes(it.requirementType)
        ? it.requirementType
        : "suggested_preparation";

      const validAvail: DocumentAvailability[] = [
        "available",
        "obtained_and_submitted",
        "in_progress",
        "missing_needed",
        "not_applicable",
      ];
      const availability: DocumentAvailability = validAvail.includes(it.availability)
        ? it.availability
        : "in_progress";

      validatedItems.push({
        id: String(it.id || `doc-imp-${Date.now()}-${i}`).slice(0, 50),
        title: String(it.title).slice(0, 250),
        docCategory,
        requirementSource,
        requirementSourceDetail: it.requirementSourceDetail ? String(it.requirementSourceDetail).slice(0, 200) : undefined,
        requirementType,
        availability,
        dateRequested: it.dateRequested ? String(it.dateRequested).slice(0, 10) : undefined,
        dateObtained: it.dateObtained ? String(it.dateObtained).slice(0, 10) : undefined,
        dateSubmitted: it.dateSubmitted ? String(it.dateSubmitted).slice(0, 10) : undefined,
        dateConfirmed: it.dateConfirmed ? String(it.dateConfirmed).slice(0, 10) : undefined,
        hasInsurerReceiptConfirmation: Boolean(it.hasInsurerReceiptConfirmation),
        notes: it.notes ? String(it.notes).slice(0, 1000) : undefined,
        missingDetails: it.missingDetails ? String(it.missingDetails).slice(0, 500) : undefined,
        followUpRequired: Boolean(it.followUpRequired),
        followUpTargetDate: it.followUpTargetDate ? String(it.followUpTargetDate).slice(0, 10) : undefined,
        createdAt: it.createdAt || new Date().toISOString(),
        updatedAt: it.updatedAt || new Date().toISOString(),
      });
    }

    const cleanData: ClaimEvidenceChecklistData = {
      schemaVersion: "1.0",
      claimReference: String(parsed.claimReference).slice(0, 100),
      claimNickname: String(parsed.claimNickname || parsed.claimReference).slice(0, 100),
      claimCategory: CLAIM_CATEGORY_LABELS[parsed.claimCategory as ClaimCategory] ? parsed.claimCategory : "other",
      insurerName: parsed.insurerName ? String(parsed.insurerName).slice(0, 100) : undefined,
      claimFileNumber: parsed.claimFileNumber ? String(parsed.claimFileNumber).slice(0, 100) : undefined,
      incidentDate: parsed.incidentDate ? String(parsed.incidentDate).slice(0, 10) : undefined,
      firstNotificationDate: parsed.firstNotificationDate ? String(parsed.firstNotificationDate).slice(0, 10) : undefined,
      generalNotes: parsed.generalNotes ? String(parsed.generalNotes).slice(0, 2000) : undefined,
      items: validatedItems,
      createdAt: parsed.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return { success: true, data: cleanData };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Fișier corupt";
    return { success: false, error: `Eroare parsare JSON: ${msg}` };
  }
}

export function generateClaimEvidencePdf(data: ClaimEvidenceChecklistData): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let currentY = margin;

  const ensureSpace = (needed: number) => {
    if (currentY + needed > pageHeight - margin - 15) {
      doc.addPage();
      currentY = margin;
      drawSmallHeader();
    }
  };

  const drawSmallHeader = () => {
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 12, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("CRISTIAN VĂDUVA — INSURANCE ADVISORY | VERIFICARE DOCUMENTE DAUNĂ", margin, 8);
    doc.setFont("helvetica", "normal");
    doc.text(`Ref: ${data.claimReference}`, pageWidth - margin - 40, 8);
    currentY = margin + 4;
  };

  // Main Banner
  doc.setFillColor(11, 13, 16);
  doc.rect(0, 0, pageWidth, 32, "F");

  // Accent Line
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 32, pageWidth, 1.5, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("BORDEROU & VERIFICARE DOCUMENTE DAUNĂ", margin, 13);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  const catLabel = CLAIM_CATEGORY_LABELS[data.claimCategory]?.ro || data.claimCategory;
  doc.text(
    `Dosar: ${data.claimNickname} | Nr. Dosar Asigurător: ${data.claimFileNumber || "Nespecificat"} | Tip: ${catLabel}`,
    margin,
    19
  );
  doc.text(
    `Asigurător: ${data.insurerName || "Nespecificat"} | Dată Eveniment: ${formatLocalDateRo(data.incidentDate)} | Generat: ${new Date().toLocaleDateString("ro-RO")}`,
    margin,
    25
  );

  currentY = 40;

  // Stats Box
  const stats = generateClaimEvidenceSummaryStats(data.items);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, contentWidth, 20, 2, 2, "FD");

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(`GRAD DE PREGĂTIRE / COMPLETITUDINE: ${stats.completenessPercent}%`, margin + 4, currentY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);

  const colWidth = contentWidth / 4;
  doc.text(`Total documente: ${stats.totalItems}`, margin + 4, currentY + 12);
  doc.text(`Disponibile: ${stats.availableCount}`, margin + 4 + colWidth, currentY + 12);
  doc.text(`Transmise asigurătorului: ${stats.submittedCount}`, margin + 4 + colWidth * 2, currentY + 12);
  doc.text(`În curs de obținere: ${stats.inProgressCount}`, margin + 4 + colWidth * 3, currentY + 12);

  doc.text(`Lipsă (necesare): ${stats.missingNeededCount}`, margin + 4, currentY + 16.5);
  doc.text(`Confirmate primite: ${stats.confirmedReceiptCount}`, margin + 4 + colWidth, currentY + 16.5);
  doc.text(`Follow-up depășit: ${stats.followUpOverdueCount}`, margin + 4 + colWidth * 2, currentY + 16.5);
  doc.text(`Obligatorii sursă: ${stats.mandatoryCount}`, margin + 4 + colWidth * 3, currentY + 16.5);

  currentY += 26;

  // Notes if any
  if (data.generalNotes) {
    ensureSpace(16);
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, currentY, contentWidth, 12, 1, 1, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text("Note generale dosar:", margin + 3, currentY + 4.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text(doc.splitTextToSize(data.generalNotes, contentWidth - 10)[0], margin + 3, currentY + 8.5);

    currentY += 16;
  }

  // Documents Section
  ensureSpace(16);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("LISTA DOCUMENTELOR & STATUTUL PROBATORIU", margin, currentY);
  currentY += 6;

  for (let idx = 0; idx < data.items.length; idx++) {
    const item = data.items[idx];
    const docCatLabel = DOC_CATEGORY_LABELS[item.docCategory]?.ro || item.docCategory;
    const reqSourceLabel = REQUIREMENT_SOURCE_LABELS[item.requirementSource]?.ro || item.requirementSource;
    const reqTypeLabel = REQUIREMENT_TYPE_LABELS[item.requirementType]?.ro || item.requirementType;
    const availLabel = AVAILABILITY_LABELS[item.availability]?.ro || item.availability;

    let cardHeight = 22;
    if (item.notes) cardHeight += 4;
    if (item.missingDetails) cardHeight += 4;

    ensureSpace(cardHeight + 4);

    doc.setFillColor(255, 255, 255);
    if (item.availability === "missing_needed") {
      doc.setDrawColor(244, 63, 94); // rose
    } else if (item.availability === "obtained_and_submitted") {
      doc.setDrawColor(16, 185, 129); // emerald
    } else {
      doc.setDrawColor(226, 232, 240);
    }
    doc.roundedRect(margin, currentY, contentWidth, cardHeight, 1.5, 1.5, "FD");

    // Indicator bar
    if (item.availability === "missing_needed") {
      doc.setFillColor(244, 63, 94);
    } else if (item.availability === "obtained_and_submitted") {
      doc.setFillColor(16, 185, 129);
    } else {
      doc.setFillColor(37, 99, 235);
    }
    doc.rect(margin, currentY, 2.5, cardHeight, "F");

    // Title
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(`${idx + 1}. ${item.title}`, margin + 5, currentY + 5);

    // Metadata line
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text(
      `Categorie: ${docCatLabel} | Statut: ${availLabel} | Tip: ${reqTypeLabel}`,
      margin + 5,
      currentY + 9.5
    );

    // Source & Dates
    doc.text(
      `Sursă cerință: ${reqSourceLabel} ${item.requirementSourceDetail ? `(${item.requirementSourceDetail})` : ""} | Confirmat primire: ${item.hasInsurerReceiptConfirmation ? "DA" : "NU"}`,
      margin + 5,
      currentY + 13.5
    );

    let subY = currentY + 17.5;

    if (item.followUpRequired && item.followUpTargetDate) {
      doc.setTextColor(217, 119, 6);
      doc.setFontSize(6.5);
      doc.text(`Follow-up limită: ${formatLocalDateRo(item.followUpTargetDate)}`, margin + 5, subY);
      subY += 3.5;
    }

    if (item.notes) {
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(6.5);
      doc.text(`Note: ${item.notes.slice(0, 95)}`, margin + 5, subY);
      subY += 3.5;
    }

    if (item.missingDetails) {
      doc.setTextColor(225, 29, 72);
      doc.setFontSize(6.5);
      doc.text(`Detalii lipsă: ${item.missingDetails.slice(0, 95)}`, margin + 5, subY);
    }

    currentY += cardHeight + 3.5;
  }

  // Legal Disclaimer
  ensureSpace(28);
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, currentY, contentWidth, 22, 1, 1, "FD");

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "normal");
  doc.text(
    "NOTĂ ȘI PRECIZĂRI METODOLOGICE: Acest borderou reflectă exclusiv organizarea internă a asiguratului.",
    margin + 3,
    currentY + 4.5
  );
  doc.text(
    "Prezența sau bifarea unui document nu constituie o confirmare că asigurătorul va accepta dosarul ca fiind complet sau că dauna este aprobată.",
    margin + 3,
    currentY + 8.5
  );
  doc.text(
    "Obligațiile de probațiune și decizia de plată a despăgubirii aparțin exclusiv asigurătorului conform legii și contractului de asigurare.",
    margin + 3,
    currentY + 12.5
  );
  doc.text(
    "Consultanță dosare complexe: Cristian Văduva | Telefon / WhatsApp: 0767 110 439 | Email: contact@cristianvaduva.com",
    margin + 3,
    currentY + 16.5
  );

  const cleanRef = (data.claimReference || "dosar-dauna").toLowerCase().replace(/[^a-z0-9]/g, "-");
  doc.save(`borderou-documente-dauna-${cleanRef}-${new Date().toISOString().split("T")[0]}.pdf`);
}
