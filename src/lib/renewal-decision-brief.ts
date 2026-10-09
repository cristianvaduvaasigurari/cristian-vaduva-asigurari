import { jsPDF } from "jspdf";

export type RenewalCategory =
  | "rca"
  | "casco"
  | "home"
  | "life"
  | "health"
  | "travel"
  | "business"
  | "professional_liability"
  | "private_client"
  | "other";

export type CurrencyCode = "RON" | "EUR" | "USD" | "GBP" | "OTHER";

export type PaymentFrequency =
  | "annual"
  | "semiannual"
  | "quarterly"
  | "monthly"
  | "single_premium"
  | "other";

export type InfoSourceType =
  | "policy_document"
  | "renewal_offer"
  | "insurer_communication"
  | "adviser_communication"
  | "user_note"
  | "other";

export type ChangeDisclosureStatus =
  | "disclosed"
  | "not_disclosed"
  | "in_progress"
  | "not_applicable";

export type DecisionStatus =
  | "not_decided"
  | "awaiting_clarification"
  | "awaiting_revised_offer"
  | "intend_to_renew"
  | "intend_to_consider_alternative"
  | "decision_recorded"
  | "custom_status";

export type AgendaCategory =
  | "coverage_exclusions"
  | "limits_deductibles"
  | "premium_payment"
  | "changes_exposure"
  | "claims_procedures"
  | "renewal_cancellation"
  | "missing_info_confirmation";

export interface RecordedChange {
  id: string;
  description: string;
  changeType:
    | "asset_changes"
    | "occupancy_use"
    | "estimated_values"
    | "new_claims"
    | "financial_priorities"
    | "other";
  dateOrPeriod?: string;
  disclosureStatus: ChangeDisclosureStatus;
  evidenceSource?: string;
  clarificationNeeded: boolean;
  notes?: string;
}

export interface UnresolvedItem {
  id: string;
  topicOrQuestion: string;
  responsibleParty?: string;
  status: "pending" | "in_progress" | "resolved";
  targetDate?: string;
  recordedAnswer?: string;
}

export interface RenewalOption {
  id: string;
  label: string; // e.g. "Polița actuală", "Oferta de reînnoire", "Ofertă alternativă"
  premiumAmount?: number;
  currency: CurrencyCode;
  paymentFrequency?: PaymentFrequency;
  statedDeductible?: string;
  coverageLimits?: string;
  importantExclusions?: string;
  sourceAndDate?: string;
  missingInformation?: string;
  userNotes?: string;
}

export interface DiscussionAgendaItem {
  id: string;
  category: AgendaCategory;
  topic: string;
  suggested?: boolean;
  notes?: string;
  resolved?: boolean;
}

export interface OutstandingAction {
  id: string;
  actionTitle: string;
  responsiblePerson?: string;
  targetDate?: string;
  completed: boolean;
  writtenConfirmationReceived: "yes" | "no" | "not_applicable";
  documentReceived: "yes" | "no" | "not_applicable";
}

export interface RenewalDecisionBriefData {
  schemaVersion: "1.0";
  exportedAt: string;
  // Step A: Policy and context
  policyReference: string;
  category: RenewalCategory;
  expiryDate?: string;
  offerReceivedDate?: string;
  intendedDecisionDate?: string;
  currency: CurrencyCode;
  currentPolicySummary?: string;
  renewalOfferSummary?: string;
  infoSource?: InfoSourceType;

  // Step B: Changes & Unresolved items
  changes: RecordedChange[];
  unresolvedItems: UnresolvedItem[];

  // Step C: Options & Agenda
  options: RenewalOption[];
  agendaItems: DiscussionAgendaItem[];

  // Step D: Decision & Actions
  decisionStatus: DecisionStatus;
  customDecisionStatusText?: string;
  decisionRationale?: string;
  informationConsidered?: string;
  remainingUncertainties?: string;
  actualDecisionDate?: string;
  contactParty?: string;
  actions: OutstandingAction[];
  userNotes?: string;
}

export const CATEGORY_INFO: Record<
  RenewalCategory,
  { labelRo: string; labelEn: string; iconName: string }
> = {
  rca: { labelRo: "RCA (Răspundere Auto)", labelEn: "Motor Third Party Liability", iconName: "ShieldAlert" },
  casco: { labelRo: "CASCO Auto", labelEn: "Comprehensive Motor (CASCO)", iconName: "Car" },
  home: { labelRo: "Locuință & Imobil / PAD", labelEn: "Home & Property", iconName: "Home" },
  life: { labelRo: "Viață & Planificare Financiară", labelEn: "Life & Financial Security", iconName: "HeartPulse" },
  health: { labelRo: "Sănătate Privată", labelEn: "Private Health", iconName: "Activity" },
  travel: { labelRo: "Călătorii & Asistență Medicală", labelEn: "Travel & Medical", iconName: "Plane" },
  business: { labelRo: "Comercial & Clădiri B2B", labelEn: "Commercial Property", iconName: "Building2" },
  professional_liability: { labelRo: "Răspundere Profesională / D&O", labelEn: "Professional Indemnity / D&O", iconName: "Briefcase" },
  private_client: { labelRo: "Private Client & Luxury Assets", labelEn: "Private Client & High Value", iconName: "Sparkles" },
  other: { labelRo: "Altă Asigurare", labelEn: "Other Insurance", iconName: "Layers" },
};

export const DECISION_STATUS_INFO: Record<
  DecisionStatus,
  { labelRo: string; labelEn: string; color: string }
> = {
  not_decided: { labelRo: "Nedecis / În evaluare", labelEn: "Not decided", color: "zinc" },
  awaiting_clarification: { labelRo: "În așteptare clarificări", labelEn: "Awaiting clarification", color: "purple" },
  awaiting_revised_offer: { labelRo: "În așteptare ofertă revizuită", labelEn: "Awaiting revised offer", color: "amber" },
  intend_to_renew: { labelRo: "Intenționez să reînnoiesc oferta primită", labelEn: "Intend to renew", color: "blue" },
  intend_to_consider_alternative: { labelRo: "Intenționez să aleg o ofertă alternativă", labelEn: "Intend to consider alternative", color: "cyan" },
  decision_recorded: { labelRo: "Decizie finală asumată", labelEn: "Decision recorded", color: "emerald" },
  custom_status: { labelRo: "Alt status definit de utilizator", labelEn: "Custom status", color: "slate" },
};

export const AGENDA_CATEGORY_INFO: Record<
  AgendaCategory,
  { labelRo: string; labelEn: string }
> = {
  coverage_exclusions: { labelRo: "Acoperiri & Excluderi Noi", labelEn: "Coverage & Exclusions" },
  limits_deductibles: { labelRo: "Limite, Franșize & Condiții Speciale", labelEn: "Limits & Deductibles" },
  premium_payment: { labelRo: "Primă, Rate & Frecvență Plată", labelEn: "Premium & Payment Terms" },
  changes_exposure: { labelRo: "Modificări de Risc & Bunuri", labelEn: "Changes in Risk / Exposure" },
  claims_procedures: { labelRo: "Proceduri Daune & Documente", labelEn: "Claims Procedures" },
  renewal_cancellation: { labelRo: "Termene de Reînnoire & Notificare", labelEn: "Deadlines & Cancellation" },
  missing_info_confirmation: { labelRo: "Informații Lipsă & Confirmare Scrisă", labelEn: "Missing Info & Written Confirmation" },
};

export const FREQUENCY_LABELS: Record<PaymentFrequency, string> = {
  annual: "Anual (1 rată)",
  semiannual: "Semestrial (2 rate)",
  quarterly: "Trimestrial (4 rate)",
  monthly: "Lunar (12 rate)",
  single_premium: "Primă unică",
  other: "Altă frecvență",
};

export interface DecisionBriefSummary {
  hasExpiryPassed: boolean;
  daysUntilExpiry: number | null;
  recordedChangesCount: number;
  unresolvedQuestionsCount: number;
  optionsCount: number;
  outstandingActionsCount: number;
  warnings: string[];
}

export function generateDecisionBriefSummary(data: RenewalDecisionBriefData): DecisionBriefSummary {
  const warnings: string[] = [];
  let hasExpiryPassed = false;
  let daysUntilExpiry: number | null = null;

  if (data.expiryDate) {
    const parts = data.expiryDate.split("-").map(Number);
    if (parts.length === 3 && !parts.some(isNaN)) {
      const expDate = new Date(parts[0], parts[1] - 1, parts[2], 23, 59, 59);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const diffMs = expDate.getTime() - today.getTime();
      daysUntilExpiry = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      if (daysUntilExpiry < 0) {
        hasExpiryPassed = true;
        warnings.push(
          `Data notată de expirare (${data.expiryDate}) a trecut. Verificați direct cu asiguratorul sau consilierul statusul actual al contractului.`
        );
      } else if (daysUntilExpiry <= 7) {
        warnings.push(
          `Polița expiră în ${daysUntilExpiry} ${daysUntilExpiry === 1 ? "zi" : "zile"}. Finalizați clarificările necesare.`
        );
      }
    }
  } else {
    warnings.push("Data de expirare a poliței nu a fost specificată.");
  }

  // Check unresolved items
  const unresolvedQuestionsCount = data.unresolvedItems.filter((i) => i.status !== "resolved").length;
  if (unresolvedQuestionsCount > 0) {
    warnings.push(
      `Există ${unresolvedQuestionsCount} întrebări / clarificări nerezolvate înainte de decizia de reînnoire.`
    );
  }

  // Check recorded changes needing clarification
  const changesNeedingClarification = data.changes.filter((c) => c.clarificationNeeded).length;
  if (changesNeedingClarification > 0) {
    warnings.push(
      `Au fost notate ${changesNeedingClarification} modificări de risc care necesită clarificare cu privire la declararea către asigurator.`
    );
  }

  // Check options
  if (data.options.length === 0) {
    warnings.push("Nu a fost înregistrată nicio opțiune de ofertă pentru comparare.");
  }

  // Check decision vs actions
  const outstandingActionsCount = data.actions.filter((a) => !a.completed).length;

  return {
    hasExpiryPassed,
    daysUntilExpiry,
    recordedChangesCount: data.changes.length,
    unresolvedQuestionsCount,
    optionsCount: data.options.length,
    outstandingActionsCount,
    warnings,
  };
}

export function generateSuggestedAgendaQuestions(data: RenewalDecisionBriefData): DiscussionAgendaItem[] {
  const suggested: DiscussionAgendaItem[] = [];

  // 1. Changes in exposure
  if (data.changes.length > 0) {
    suggested.push({
      id: "ag_changes",
      category: "changes_exposure",
      topic: "Cum influențează modificările de bunuri/utilizare notate condițiile de acoperire din noua ofertă?",
      suggested: true,
    });
  }

  // 2. Limits & Deductibles
  suggested.push({
    id: "ag_limits",
    category: "limits_deductibles",
    topic: "Sunt limitele de răspundere și franșizele din noua ofertă identice cu cele din contractul anterior?",
    suggested: true,
  });

  // 3. Exclusions
  suggested.push({
    id: "ag_exclusions",
    category: "coverage_exclusions",
    topic: "Au fost introduse clauze restrictive sau excluderi noi în ediția actuală a condițiilor de asigurare?",
    suggested: true,
  });

  // 4. Premium & Taxes
  suggested.push({
    id: "ag_premium",
    category: "premium_payment",
    topic: "Ce taxe, comisioane de rate sau franșize ascunse sunt incluse în prima cotată?",
    suggested: true,
  });

  // 5. Written confirmation
  suggested.push({
    id: "ag_confirmation",
    category: "missing_info_confirmation",
    topic: "Care este procedura și documentația scrisă necesară pentru confirmarea oficială a reînnoirii?",
    suggested: true,
  });

  return suggested;
}

export function validateImportedDecisionBrief(json: unknown): {
  valid: boolean;
  data?: RenewalDecisionBriefData;
  error?: string;
} {
  if (!json || typeof json !== "object") {
    return { valid: false, error: "Fișierul JSON este gol sau invalid." };
  }

  const obj = json as Record<string, unknown>;

  if (obj.schemaVersion !== "1.0") {
    return { valid: false, error: "Versiunea schemei JSON nu este suportată (este necesară versiunea 1.0)." };
  }

  if (typeof obj.policyReference !== "string" || !obj.policyReference.trim()) {
    return { valid: false, error: "Câmpul 'policyReference' este obligatoriu." };
  }

  const validCategories: RenewalCategory[] = [
    "rca",
    "casco",
    "home",
    "life",
    "health",
    "travel",
    "business",
    "professional_liability",
    "private_client",
    "other",
  ];

  const category =
    typeof obj.category === "string" && validCategories.includes(obj.category as RenewalCategory)
      ? (obj.category as RenewalCategory)
      : "other";

  const validDecisionStatuses: DecisionStatus[] = [
    "not_decided",
    "awaiting_clarification",
    "awaiting_revised_offer",
    "intend_to_renew",
    "intend_to_consider_alternative",
    "decision_recorded",
    "custom_status",
  ];

  const decisionStatus =
    typeof obj.decisionStatus === "string" && validDecisionStatuses.includes(obj.decisionStatus as DecisionStatus)
      ? (obj.decisionStatus as DecisionStatus)
      : "not_decided";

  // Sanitize changes
  const rawChanges = Array.isArray(obj.changes) ? obj.changes : [];
  const sanitizedChanges: RecordedChange[] = [];
  for (let i = 0; i < Math.min(rawChanges.length, 50); i++) {
    const c = rawChanges[i] as Record<string, unknown>;
    if (!c || typeof c !== "object") continue;
    sanitizedChanges.push({
      id: typeof c.id === "string" && c.id.trim() ? c.id.slice(0, 50) : `chg_${Date.now()}_${i}`,
      description: typeof c.description === "string" && c.description.trim() ? c.description.trim().slice(0, 300) : "Modificare notată",
      changeType: ["asset_changes", "occupancy_use", "estimated_values", "new_claims", "financial_priorities", "other"].includes(String(c.changeType))
        ? (c.changeType as RecordedChange["changeType"])
        : "other",
      dateOrPeriod: typeof c.dateOrPeriod === "string" ? c.dateOrPeriod.trim().slice(0, 50) : undefined,
      disclosureStatus: typeof c.disclosureStatus === "string" ? (c.disclosureStatus as ChangeDisclosureStatus) : "not_applicable",
      evidenceSource: typeof c.evidenceSource === "string" ? c.evidenceSource.trim().slice(0, 100) : undefined,
      clarificationNeeded: Boolean(c.clarificationNeeded),
      notes: typeof c.notes === "string" ? c.notes.trim().slice(0, 500) : undefined,
    });
  }

  // Sanitize unresolved items
  const rawUnresolved = Array.isArray(obj.unresolvedItems) ? obj.unresolvedItems : [];
  const sanitizedUnresolved: UnresolvedItem[] = [];
  for (let i = 0; i < Math.min(rawUnresolved.length, 50); i++) {
    const u = rawUnresolved[i] as Record<string, unknown>;
    if (!u || typeof u !== "object") continue;
    sanitizedUnresolved.push({
      id: typeof u.id === "string" && u.id.trim() ? u.id.slice(0, 50) : `unres_${Date.now()}_${i}`,
      topicOrQuestion: typeof u.topicOrQuestion === "string" && u.topicOrQuestion.trim() ? u.topicOrQuestion.trim().slice(0, 300) : "Întrebare nerezolvată",
      responsibleParty: typeof u.responsibleParty === "string" ? u.responsibleParty.trim().slice(0, 100) : undefined,
      status: u.status === "resolved" || u.status === "in_progress" ? u.status : "pending",
      targetDate: typeof u.targetDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(u.targetDate) ? u.targetDate : undefined,
      recordedAnswer: typeof u.recordedAnswer === "string" ? u.recordedAnswer.trim().slice(0, 500) : undefined,
    });
  }

  // Sanitize options
  const rawOptions = Array.isArray(obj.options) ? obj.options : [];
  const sanitizedOptions: RenewalOption[] = [];
  for (let i = 0; i < Math.min(rawOptions.length, 20); i++) {
    const o = rawOptions[i] as Record<string, unknown>;
    if (!o || typeof o !== "object") continue;
    sanitizedOptions.push({
      id: typeof o.id === "string" && o.id.trim() ? o.id.slice(0, 50) : `opt_${Date.now()}_${i}`,
      label: typeof o.label === "string" && o.label.trim() ? o.label.trim().slice(0, 100) : `Opțiune #${i + 1}`,
      premiumAmount: typeof o.premiumAmount === "number" && !isNaN(o.premiumAmount) && o.premiumAmount >= 0 ? o.premiumAmount : undefined,
      currency: typeof o.currency === "string" ? (o.currency as CurrencyCode) : "RON",
      paymentFrequency: typeof o.paymentFrequency === "string" ? (o.paymentFrequency as PaymentFrequency) : undefined,
      statedDeductible: typeof o.statedDeductible === "string" ? o.statedDeductible.trim().slice(0, 150) : undefined,
      coverageLimits: typeof o.coverageLimits === "string" ? o.coverageLimits.trim().slice(0, 200) : undefined,
      importantExclusions: typeof o.importantExclusions === "string" ? o.importantExclusions.trim().slice(0, 500) : undefined,
      sourceAndDate: typeof o.sourceAndDate === "string" ? o.sourceAndDate.trim().slice(0, 150) : undefined,
      missingInformation: typeof o.missingInformation === "string" ? o.missingInformation.trim().slice(0, 200) : undefined,
      userNotes: typeof o.userNotes === "string" ? o.userNotes.trim().slice(0, 500) : undefined,
    });
  }

  // Sanitize agenda
  const rawAgenda = Array.isArray(obj.agendaItems) ? obj.agendaItems : [];
  const sanitizedAgenda: DiscussionAgendaItem[] = [];
  for (let i = 0; i < Math.min(rawAgenda.length, 50); i++) {
    const ag = rawAgenda[i] as Record<string, unknown>;
    if (!ag || typeof ag !== "object") continue;
    sanitizedAgenda.push({
      id: typeof ag.id === "string" && ag.id.trim() ? ag.id.slice(0, 50) : `ag_${Date.now()}_${i}`,
      category: typeof ag.category === "string" ? (ag.category as AgendaCategory) : "coverage_exclusions",
      topic: typeof ag.topic === "string" && ag.topic.trim() ? ag.topic.trim().slice(0, 300) : "Subiect discuție",
      suggested: Boolean(ag.suggested),
      notes: typeof ag.notes === "string" ? ag.notes.trim().slice(0, 500) : undefined,
      resolved: Boolean(ag.resolved),
    });
  }

  // Sanitize actions
  const rawActions = Array.isArray(obj.actions) ? obj.actions : [];
  const sanitizedActions: OutstandingAction[] = [];
  for (let i = 0; i < Math.min(rawActions.length, 50); i++) {
    const ac = rawActions[i] as Record<string, unknown>;
    if (!ac || typeof ac !== "object") continue;
    sanitizedActions.push({
      id: typeof ac.id === "string" && ac.id.trim() ? ac.id.slice(0, 50) : `act_${Date.now()}_${i}`,
      actionTitle: typeof ac.actionTitle === "string" && ac.actionTitle.trim() ? ac.actionTitle.trim().slice(0, 200) : "Acțiune",
      responsiblePerson: typeof ac.responsiblePerson === "string" ? ac.responsiblePerson.trim().slice(0, 100) : undefined,
      targetDate: typeof ac.targetDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(ac.targetDate) ? ac.targetDate : undefined,
      completed: Boolean(ac.completed),
      writtenConfirmationReceived: ["confirmed", "pending", "not_applicable"].includes(String(ac.writtenConfirmationReceived))
        ? (ac.writtenConfirmationReceived as OutstandingAction["writtenConfirmationReceived"])
        : "not_applicable",
      documentReceived: ["received", "pending", "not_applicable"].includes(String(ac.documentReceived))
        ? (ac.documentReceived as OutstandingAction["documentReceived"])
        : "not_applicable",
    });
  }

  return {
    valid: true,
    data: {
      schemaVersion: "1.0",
      exportedAt: typeof obj.exportedAt === "string" ? obj.exportedAt : new Date().toISOString(),
      policyReference: String(obj.policyReference).trim().slice(0, 150),
      category,
      expiryDate: typeof obj.expiryDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(obj.expiryDate) ? obj.expiryDate : undefined,
      offerReceivedDate: typeof obj.offerReceivedDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(obj.offerReceivedDate) ? obj.offerReceivedDate : undefined,
      intendedDecisionDate: typeof obj.intendedDecisionDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(obj.intendedDecisionDate) ? obj.intendedDecisionDate : undefined,
      currency: typeof obj.currency === "string" ? (obj.currency as CurrencyCode) : "RON",
      currentPolicySummary: typeof obj.currentPolicySummary === "string" ? obj.currentPolicySummary.trim().slice(0, 1000) : undefined,
      renewalOfferSummary: typeof obj.renewalOfferSummary === "string" ? obj.renewalOfferSummary.trim().slice(0, 1000) : undefined,
      infoSource: typeof obj.infoSource === "string" ? (obj.infoSource as InfoSourceType) : undefined,
      changes: sanitizedChanges,
      unresolvedItems: sanitizedUnresolved,
      options: sanitizedOptions,
      agendaItems: sanitizedAgenda,
      decisionStatus,
      customDecisionStatusText: typeof obj.customDecisionStatusText === "string" ? obj.customDecisionStatusText.trim().slice(0, 150) : undefined,
      decisionRationale: typeof obj.decisionRationale === "string" ? obj.decisionRationale.trim().slice(0, 1000) : undefined,
      informationConsidered: typeof obj.informationConsidered === "string" ? obj.informationConsidered.trim().slice(0, 1000) : undefined,
      remainingUncertainties: typeof obj.remainingUncertainties === "string" ? obj.remainingUncertainties.trim().slice(0, 1000) : undefined,
      actualDecisionDate: typeof obj.actualDecisionDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(obj.actualDecisionDate) ? obj.actualDecisionDate : undefined,
      contactParty: typeof obj.contactParty === "string" ? obj.contactParty.trim().slice(0, 100) : undefined,
      actions: sanitizedActions,
      userNotes: typeof obj.userNotes === "string" ? obj.userNotes.trim().slice(0, 1000) : undefined,
    },
  };
}

export function generateRenewalDecisionBriefPdf(data: RenewalDecisionBriefData): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let currentY = 18;

  function ensureSpace(neededHeight: number) {
    if (currentY + neededHeight > pageHeight - 20) {
      doc.addPage();
      currentY = 18;
      drawHeader(true);
    }
  }

  function drawHeader(isContinuation = false) {
    doc.setFillColor(11, 13, 16);
    doc.rect(0, 0, pageWidth, 28, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("CRISTIAN VĂDUVA — INSURANCE ADVISORY", margin, 12);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 160, 175);
    doc.text("Fișă de Decizie Reînnoire & Agendă de Pregătire", margin, 18);

    doc.setFontSize(8);
    doc.setTextColor(120, 135, 150);
    const dateStr = new Date(data.exportedAt || Date.now()).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.text(`Generat: ${dateStr}${isContinuation ? " (Continuare)" : ""}`, pageWidth - margin, 18, { align: "right" });

    currentY = 34;
  }

  drawHeader(false);

  // Summary box
  const summary = generateDecisionBriefSummary(data);
  const catInfo = CATEGORY_INFO[data.category];
  const decStatusInfo = DECISION_STATUS_INFO[data.decisionStatus];

  doc.setFillColor(245, 247, 250);
  doc.setDrawColor(220, 225, 230);
  doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2, "FD");

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`POLIȚĂ / DOSAR: ${data.policyReference.toUpperCase()}`, margin + 4, currentY + 7);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`• Categorie: ${catInfo.labelRo}`, margin + 4, currentY + 13);
  doc.text(`• Expirare poliță: ${data.expiryDate || "Nespecificată"}`, margin + 4, currentY + 18);

  doc.text(`• Status decizie: ${decStatusInfo.labelRo}`, margin + 80, currentY + 13);
  doc.text(`• Opțiuni notate: ${data.options.length} | Acțiuni deschise: ${summary.outstandingActionsCount}`, margin + 80, currentY + 18);

  currentY += 30;

  // Warnings if any
  if (summary.warnings.length > 0) {
    ensureSpace(10 + summary.warnings.length * 5);
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(245, 158, 11);
    doc.roundedRect(margin, currentY, contentWidth, 6 + summary.warnings.length * 5, 2, 2, "FD");

    doc.setTextColor(146, 64, 14);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("AVERTIZĂRI & REMARCI PROCEDURALE", margin + 4, currentY + 5);

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    let wY = currentY + 9.5;
    for (const w of summary.warnings) {
      doc.text(`• ${doc.splitTextToSize(w, contentWidth - 10)[0]}`, margin + 4, wY);
      wY += 4.5;
    }
    currentY = wY + 3;
  }

  // Section 1: Options Recorded
  if (data.options.length > 0) {
    ensureSpace(20);
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("1. OPȚIUNI DE REÎNNOIRE / OFERTE NOTATE", margin, currentY);
    currentY += 6;

    for (const opt of data.options) {
      const rowHeight = 22 + (opt.importantExclusions ? 5 : 0) + (opt.userNotes ? 5 : 0);
      ensureSpace(rowHeight);

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, currentY, contentWidth, rowHeight - 2, 1, 1, "FD");

      doc.setTextColor(15, 23, 42);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text(opt.label, margin + 3, currentY + 5);

      const premStr =
        opt.premiumAmount !== undefined
          ? `${opt.premiumAmount.toLocaleString("ro-RO")} ${opt.currency} (${opt.paymentFrequency ? FREQUENCY_LABELS[opt.paymentFrequency] : "frecvență nespecificată"})`
          : "Primă nespecificată";

      doc.setFontSize(7.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      doc.text(`Primă: ${premStr} | Franșiză: ${opt.statedDeductible || "Nespecificată"} | Limite: ${opt.coverageLimits || "Nespecificate"}`, margin + 3, currentY + 10);

      let subY = currentY + 14.5;
      if (opt.importantExclusions) {
        doc.setTextColor(180, 83, 9);
        doc.setFontSize(7);
        doc.text(`Excluderi notate: ${opt.importantExclusions.slice(0, 110)}`, margin + 3, subY);
        subY += 4.5;
      }

      if (opt.userNotes) {
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(7);
        doc.text(`Observații: ${opt.userNotes.slice(0, 110)}`, margin + 3, subY);
      }

      currentY += rowHeight;
    }
    currentY += 2;
  }

  // Section 2: Discussion Agenda & Questions
  if (data.agendaItems.length > 0) {
    ensureSpace(20);
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("2. AGENDĂ DE DISCUȚIE & ÎNTREBĂRI PENTRU CONSILIER", margin, currentY);
    currentY += 6;

    for (const ag of data.agendaItems) {
      ensureSpace(14);
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, currentY, contentWidth, 12, 1, 1, "FD");

      const catLabel = AGENDA_CATEGORY_INFO[ag.category]?.labelRo || ag.category;
      doc.setTextColor(37, 99, 235);
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.text(`[${catLabel}]`, margin + 3, currentY + 4);

      doc.setTextColor(15, 23, 42);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "normal");
      doc.text(doc.splitTextToSize(ag.topic, contentWidth - 10)[0], margin + 3, currentY + 8.5);

      currentY += 14;
    }
    currentY += 2;
  }

  // Section 3: Decision Record & Actions
  ensureSpace(26);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("3. DECIZIE CONSEMNATĂ & PLAN DE ACȚIUNE", margin, currentY);
  currentY += 6;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, contentWidth, 18, 1, 1, "FD");

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text(`Status decizie: ${decStatusInfo.labelRo}`, margin + 3, currentY + 5);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Motivație: ${data.decisionRationale ? data.decisionRationale.slice(0, 110) : "Nespecificată"}`,
    margin + 3,
    currentY + 10
  );
  doc.text(
    `Dată decizie: ${data.actualDecisionDate || "Nespecificată"} | Contact: ${data.contactParty || "Nespecificat"}`,
    margin + 3,
    currentY + 14.5
  );

  currentY += 22;

  // Actions list
  if (data.actions.length > 0) {
    for (const act of data.actions) {
      ensureSpace(14);
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, currentY, contentWidth, 12, 1, 1, "FD");

      doc.setTextColor(15, 23, 42);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text(act.actionTitle, margin + 3, currentY + 4.5);

      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text(
        `Responsabil: ${act.responsiblePerson || "Nespecificat"} | Termen: ${act.targetDate || "N/A"} | Status: ${act.completed ? "Finalizat" : "În așteptare"}`,
        margin + 3,
        currentY + 9
      );

      currentY += 14;
    }
  }

  // Legal Disclaimer
  ensureSpace(28);
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, currentY, contentWidth, 22, 1, 1, "FD");

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text(
    "NOTĂ LEGALĂ: Acest document reflectă exclusiv intențiile și datele consemnate manual de către utilizator.",
    margin + 3,
    currentY + 5
  );
  doc.text(
    "Nu constituie o recomandare de cumpărare, decizie automată de subscriere sau confirmare că polița este reînnoită.",
    margin + 3,
    currentY + 9
  );
  doc.text(
    "Validitatea contractuală și acoperirea depind exclusiv de emiterea oficială a contractului de către asigurator.",
    margin + 3,
    currentY + 13
  );
  doc.text(
    "Consultanță specializată: Cristian Văduva | Telefon / WhatsApp: 0767 110 439 | Email: contact@cristianvaduva.com",
    margin + 3,
    currentY + 18
  );

  doc.save(`decizie-reinnoire-${data.policyReference.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`);
}
