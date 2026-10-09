import jsPDF from "jspdf";

export type ReviewType =
  | "annual_review"
  | "upcoming_renewal"
  | "major_life_change"
  | "property_purchase_renovation"
  | "vehicle_purchase_fleet"
  | "business_growth_operational"
  | "new_high_value_asset"
  | "existing_coverage_questions"
  | "other";

export type DiscussionArea =
  | "home_property"
  | "vehicle_mobility"
  | "life_family"
  | "health_travel"
  | "business_liability"
  | "private_client"
  | "existing_policies_renewals"
  | "claims_service_experience"
  | "beneficiaries_ownership"
  | "other";

export type ChangeStatus = "to_discuss" | "clarification_needed" | "discussed" | "no_longer_applicable";
export type AgendaPriority = "low" | "normal" | "high";
export type AgendaStatus = "open" | "discussed" | "answer_pending" | "resolved" | "not_applicable";
export type DecisionOutcome = "agreed" | "further_info_required" | "deferred" | "not_proceeding" | "not_applicable";
export type ResponsibleParty = "user" | "advisor" | "insurer" | "other";

export interface ChangeEntry {
  id: string;
  category: DiscussionArea;
  description: string;
  changeDate?: string; // YYYY-MM-DD
  status: ChangeStatus;
}

export interface AgendaItem {
  id: string;
  title: string;
  questionDetails?: string;
  area: DiscussionArea;
  priority: AgendaPriority;
  status: AgendaStatus;
  advisorNotes?: string;
}

export interface DecisionRecord {
  id: string;
  decisionText: string;
  outcome: DecisionOutcome;
  date?: string; // YYYY-MM-DD
  supportingContext?: string;
  followUpAction?: string;
  responsibleParty: ResponsibleParty;
  targetFollowUpDate?: string; // YYYY-MM-DD
  isCompleted: boolean;
}

export interface ClientReviewPlannerData {
  title: string;
  reviewType: ReviewType;
  plannedDate?: string; // YYYY-MM-DD
  participants?: string;
  generalContext?: string;
  selectedAreas: DiscussionArea[];
  changes: ChangeEntry[];
  agenda: AgendaItem[];
  decisions: DecisionRecord[];
  lang: "ro" | "en";
  createdAt: string;
  updatedAt: string;
}

export const REVIEW_TYPE_LABELS_RO: Record<ReviewType, string> = {
  annual_review: "Revizuire Anuală de Asigurare (Portfolio Check)",
  upcoming_renewal: "Pregătire Reînnoire Poliță / Scadență",
  major_life_change: "Schimbare Familială / Situație Personală",
  property_purchase_renovation: "Achiziție Imobil / Renovare Clădire",
  vehicle_purchase_fleet: "Achiziție Auto / Modificare Flotă",
  business_growth_operational: "Creștere Afacere / Modificări Operaționale",
  new_high_value_asset: "Achiziție Bun de Valoare Mare / Luxury Asset",
  existing_coverage_questions: "Clarificări & Întrebări despre Acoperirile Curente",
  other: "Alt Motiv de Revizuire",
};

export const REVIEW_TYPE_LABELS_EN: Record<ReviewType, string> = {
  annual_review: "Annual Insurance Review (Portfolio Check)",
  upcoming_renewal: "Upcoming Renewal Preparation",
  major_life_change: "Major Life or Family Circumstance Change",
  property_purchase_renovation: "Property Purchase or Major Renovation",
  vehicle_purchase_fleet: "Vehicle Purchase or Fleet Change",
  business_growth_operational: "Business Expansion or Operational Shift",
  new_high_value_asset: "New High-Value Asset Acquisition",
  existing_coverage_questions: "Existing Policy Coverage Clarifications",
  other: "Other Review Purpose",
};

export const DISCUSSION_AREA_LABELS_RO: Record<DiscussionArea, string> = {
  home_property: "Locuință & Patrimoniu Imobiliar",
  vehicle_mobility: "Auto, CASCO & Mobilitate",
  life_family: "Viață & Protecția Familiei",
  health_travel: "Sănătate Privată & Călătorii",
  business_liability: "Business & Răspundere Profesională",
  private_client: "Private Client & Bunuri de Lux",
  existing_policies_renewals: "Polițe Active & Scadențe",
  claims_service_experience: "Experiență Daune & Calitate Servicii",
  beneficiaries_ownership: "Beneficiari & Structură Proprietate",
  other: "Alte Teme Discutate",
};

export const DISCUSSION_AREA_LABELS_EN: Record<DiscussionArea, string> = {
  home_property: "Home & Property Assets",
  vehicle_mobility: "Motor, CASCO & Mobility",
  life_family: "Life & Family Financial Protection",
  health_travel: "Private Healthcare & Travel",
  business_liability: "Business & Professional Liability",
  private_client: "Private Client & High-Value Assets",
  existing_policies_renewals: "Active Policies & Renewals",
  claims_service_experience: "Claims Experience & Service Quality",
  beneficiaries_ownership: "Beneficiaries & Asset Ownership",
  other: "Other Topics",
};

export const CHANGE_STATUS_LABELS_RO: Record<ChangeStatus, string> = {
  to_discuss: "De Discutat",
  clarification_needed: "Necesită Clarificare",
  discussed: "Discutat",
  no_longer_applicable: "Nu se mai aplică",
};

export const CHANGE_STATUS_LABELS_EN: Record<ChangeStatus, string> = {
  to_discuss: "To Discuss",
  clarification_needed: "Clarification Needed",
  discussed: "Discussed",
  no_longer_applicable: "No Longer Applicable",
};

export const AGENDA_STATUS_LABELS_RO: Record<AgendaStatus, string> = {
  open: "Deschis",
  discussed: "Discutat",
  answer_pending: "În Așteptare Răspuns",
  resolved: "Rezolvat / Concluzionat",
  not_applicable: "Neaplicabil",
};

export const AGENDA_STATUS_LABELS_EN: Record<AgendaStatus, string> = {
  open: "Open",
  discussed: "Discussed",
  answer_pending: "Answer Pending",
  resolved: "Resolved / Concluded",
  not_applicable: "Not Applicable",
};

export const DECISION_OUTCOME_LABELS_RO: Record<DecisionOutcome, string> = {
  agreed: "Agreat / Decis",
  further_info_required: "Informații Suplimentare Necesare",
  deferred: "Amânat pentru Următoarea Ședință",
  not_proceeding: "Nu se Continuă (Respins)",
  not_applicable: "Neaplicabil",
};

export const DECISION_OUTCOME_LABELS_EN: Record<DecisionOutcome, string> = {
  agreed: "Agreed / Decided",
  further_info_required: "Further Info Required",
  deferred: "Deferred to Next Review",
  not_proceeding: "Not Proceeding",
  not_applicable: "Not Applicable",
};

export const RESPONSIBLE_PARTY_LABELS_RO: Record<ResponsibleParty, string> = {
  user: "Client (Utilizator)",
  advisor: "Consultant / Broker",
  insurer: "Companie Asigurare",
  other: "Altă Parte",
};

export const RESPONSIBLE_PARTY_LABELS_EN: Record<ResponsibleParty, string> = {
  user: "Client (User)",
  advisor: "Advisor / Broker",
  insurer: "Insurer / Carrier",
  other: "Other Party",
};

/**
 * Deterministic suggestion generator for discussion agenda questions.
 */
export function generateSuggestedAgendaQuestions(
  reviewType: ReviewType,
  areas: DiscussionArea[],
  lang: "ro" | "en" = "ro"
): AgendaItem[] {
  const isRo = lang === "ro";
  const items: AgendaItem[] = [];

  if (areas.includes("home_property")) {
    items.push({
      id: "q_home_sum",
      title: isRo ? "Valoare Reconstrucție Imobil" : "Property Reconstruction Value",
      questionDetails: isRo
        ? "Care este suma asigurată corectă pentru a reflecta costul actual de reconstrucție de nou, fără riscul de subasigurare?"
        : "What is the accurate sum insured to reflect full new replacement cost without underinsurance?",
      area: "home_property",
      priority: "high",
      status: "open",
    });
  }

  if (areas.includes("vehicle_mobility")) {
    items.push({
      id: "q_vehicle_casco",
      title: isRo ? "Condiții Reparație & Franșize CASCO" : "CASCO Repair Terms & Excess",
      questionDetails: isRo
        ? "Polița actuală garantează reparația exclusivă în reprezentanțe autorizate și include mașină la schimb?"
        : "Does the current policy guarantee authorized dealer repairs and courtesy replacement vehicle?",
      area: "vehicle_mobility",
      priority: "normal",
      status: "open",
    });
  }

  if (areas.includes("life_family")) {
    items.push({
      id: "q_life_cover",
      title: isRo ? "Protecție Financiară Familie & Credite" : "Family Financial Protection & Debt",
      questionDetails: isRo
        ? "Suma asigurată la polița de viață acoperă integral soldul creditelor ipotecare și cheltuielile familiei pe 3–5 ani?"
        : "Does the life sum insured fully cover mortgages and 3-5 years of family expenses?",
      area: "life_family",
      priority: "high",
      status: "open",
    });
  }

  if (areas.includes("business_liability")) {
    items.push({
      id: "q_biz_liability",
      title: isRo ? "Răspundere Profesională & Cheltuieli Juridice" : "Professional Liability & Defence Costs",
      questionDetails: isRo
        ? "Limita de răspundere include costurile avocaților și onorariile de apărare în instanță peste limita contractuală?"
        : "Does the professional indemnity limit include legal defence costs and barrister fees?",
      area: "business_liability",
      priority: "normal",
      status: "open",
    });
  }

  if (areas.includes("private_client")) {
    items.push({
      id: "q_luxury_valuation",
      title: isRo ? "Clauză Valoare Agreată (Agreed Value)" : "Agreed Value Endorsement",
      questionDetails: isRo
        ? "Cum este reglementată despăgubirea pentru bunuri de lux (artă, ceasuri, supercars) fără scăderea deprecierii?"
        : "How is claims settlement structured for luxury assets without market depreciation deduction?",
      area: "private_client",
      priority: "high",
      status: "open",
    });
  }

  if (reviewType === "upcoming_renewal" || areas.includes("existing_policies_renewals")) {
    items.push({
      id: "q_renewal_terms",
      title: isRo ? "Modificări de Clauze la Reînnoire" : "Renewal Clause Changes",
      questionDetails: isRo
        ? "Există modificări de franșize, excluderi noi sau diferențe de preț în oferta de reînnoire comparativ cu contractul anterior?"
        : "Are there any changed deductibles, new exclusions, or rate adjustments in the renewal proposal?",
      area: "existing_policies_renewals",
      priority: "normal",
      status: "open",
    });
  }

  // Fallback if no specific questions
  if (items.length === 0) {
    items.push({
      id: "q_general_review",
      title: isRo ? "Revizuire Condiții Generale & Excluderi" : "General Terms & Exclusion Review",
      questionDetails: isRo
        ? "Care sunt principalele clauze restrictive sau documente obligatorii în caz de daună?"
        : "What are the primary restrictive clauses and mandatory documents in a claim event?",
      area: "other",
      priority: "normal",
      status: "open",
    });
  }

  return items;
}

/**
 * Checks local calendar date comparison.
 */
export function getPlannerFollowUpStatus(targetDateStr?: string): "overdue" | "today" | "upcoming" | "none" {
  if (!targetDateStr) return "none";
  const parts = targetDateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return "none";

  const [y, m, d] = parts;
  const target = new Date(y, m - 1, d, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "overdue";
  if (diffDays === 0) return "today";
  return "upcoming";
}

/**
 * PDF Review Planner Summary Generator.
 */
export function generateReviewPlannerPdf(plan: ClientReviewPlannerData): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const isRo = plan.lang === "ro";
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
  doc.text("Planificator Sedinta Revizuire & Follow-up | Insurance.CristianVaduva.com", margin, 18);

  const dateStr = new Date().toLocaleDateString(isRo ? "ro-RO" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`${isRo ? "Generat la" : "Generated on"}: ${dateStr}`, pageWidth - margin, 18, { align: "right" });

  y = 36;

  // Title
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(`${isRo ? "PLAN REVIZUIRE ASIGURARI" : "INSURANCE REVIEW PLAN"}: ${plan.title}`, margin, y);

  y += 7;

  // Scope Summary Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentWidth, 20, "FD");

  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);

  const typeLabel = isRo ? REVIEW_TYPE_LABELS_RO[plan.reviewType] : REVIEW_TYPE_LABELS_EN[plan.reviewType];

  doc.setFont("helvetica", "bold");
  doc.text(`${isRo ? "Tip Revizuire" : "Review Type"}:`, margin + 4, y + 6);
  doc.setFont("helvetica", "normal");
  doc.text(typeLabel, margin + 28, y + 6);

  if (plan.plannedDate) {
    doc.setFont("helvetica", "bold");
    doc.text(`${isRo ? "Data Planificata" : "Planned Date"}:`, margin + 4, y + 11);
    doc.setFont("helvetica", "normal");
    doc.text(plan.plannedDate, margin + 28, y + 11);
  }

  if (plan.participants) {
    doc.setFont("helvetica", "bold");
    doc.text(`${isRo ? "Participanti" : "Participants"}:`, margin + 4, y + 16);
    doc.setFont("helvetica", "normal");
    doc.text(plan.participants, margin + 28, y + 16);
  }

  y += 26;

  // Section 1: Discussion Agenda Questions
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(isRo ? "1. AGENDA DE DISCUTIE & INTREBARI CHEIE" : "1. DISCUSSION AGENDA & KEY QUESTIONS", margin, y);

  y += 6;

  plan.agenda.slice(0, 5).forEach((item) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 14, "FD");

    const areaLabel = isRo ? DISCUSSION_AREA_LABELS_RO[item.area] : DISCUSSION_AREA_LABELS_EN[item.area];
    const statusLabel = isRo ? AGENDA_STATUS_LABELS_RO[item.status] : AGENDA_STATUS_LABELS_EN[item.status];

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text(`• [${areaLabel}] ${item.title}`, margin + 3, y + 5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(59, 130, 246);
    doc.text(`Status: ${statusLabel}`, pageWidth - margin - 3, y + 5, { align: "right" });

    if (item.questionDetails) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      const splitQ = doc.splitTextToSize(item.questionDetails, contentWidth - 6);
      doc.text(splitQ[0] || "", margin + 3, y + 9.5);
    }

    y += 16;
  });

  y += 2;

  // Section 2: Decision Register & Actions
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(isRo ? "2. DECIZII CONSEMNATE & URMATORII PASI" : "2. DECISION REGISTER & NEXT ACTIONS", margin, y);

  y += 6;

  if (plan.decisions.length === 0) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(isRo ? "Nicio decizie consemnată încă." : "No decisions recorded yet.", margin, y);
    y += 8;
  } else {
    plan.decisions.slice(0, 4).forEach((dec) => {
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(51, 65, 85);
      doc.text(`• ${dec.decisionText}`, margin + 2, y);

      const outcomeLabel = isRo ? DECISION_OUTCOME_LABELS_RO[dec.outcome] : DECISION_OUTCOME_LABELS_EN[dec.outcome];
      const respLabel = isRo ? RESPONSIBLE_PARTY_LABELS_RO[dec.responsibleParty] : RESPONSIBLE_PARTY_LABELS_EN[dec.responsibleParty];

      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text(
        `Decizie: ${outcomeLabel} | Resp: ${respLabel}${dec.targetFollowUpDate ? ` | Scadenta: ${dec.targetFollowUpDate}` : ""}`,
        pageWidth - margin,
        y,
        { align: "right" }
      );

      y += 5.5;
    });
  }

  y += 3;

  // Section 3: General Context & Notes
  if (plan.generalContext && plan.generalContext.trim().length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(isRo ? "3. CONTEXT GENERAL & OBSERVATII" : "3. GENERAL CONTEXT & NOTES", margin, y);

    y += 5;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 12, "FD");

    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const splitNotes = doc.splitTextToSize(plan.generalContext, contentWidth - 4);
    doc.text(splitNotes[0] || "", margin + 2, y + 4.5);

    y += 15;
  }

  // Footer Disclaimers & Contact
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, 22, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text(isRo ? "CONSULTANTA SI AUDIT ASIGURARI (CRISTIAN VADUVA):" : "INSURANCE ADVISORY & AUDIT (CRISTIAN VADUVA):", margin + 3, y + 4.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    isRo
      ? "Telefon: 0767 110 439 | Website: https://insurance.cristianvaduva.com/verifica-polita\nAcest plan are rol de pregatire si follow-up. Nu constituie o emitere sau o modificare oficiala a contractului de asigurare."
      : "Phone: 0767 110 439 | Website: https://insurance.cristianvaduva.com/verifica-polita\nThis plan is a meeting preparation tool. It does not constitute formal policy issuance or contractual amendment.",
    margin + 3,
    y + 9.5
  );

  return doc;
}

/**
 * Validates a JSON imported review plan.
 */
export function validateImportedReviewPlan(jsonStr: string): {
  isValid: boolean;
  error?: string;
  plan?: ClientReviewPlannerData;
} {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== "object") {
      return { isValid: false, error: "Fișier JSON invalid sau corupt." };
    }

    if (!parsed.title || typeof parsed.title !== "string") {
      return { isValid: false, error: "Titlul planului de revizuire lipsește." };
    }

    const validTypes: ReviewType[] = [
      "annual_review",
      "upcoming_renewal",
      "major_life_change",
      "property_purchase_renovation",
      "vehicle_purchase_fleet",
      "business_growth_operational",
      "new_high_value_asset",
      "existing_coverage_questions",
      "other",
    ];

    const reviewType = validTypes.includes(parsed.reviewType) ? parsed.reviewType : "annual_review";

    const changes: ChangeEntry[] = Array.isArray(parsed.changes)
      ? (parsed.changes as Record<string, unknown>[]).slice(0, 50).map((c) => ({
          id: String(c.id || Math.random().toString(36).substring(2, 9)),
          category: (c.category as DiscussionArea) || "home_property",
          description: String(c.description || "Modificare").slice(0, 300),
          changeDate: c.changeDate ? String(c.changeDate).slice(0, 10) : undefined,
          status: ["to_discuss", "clarification_needed", "discussed", "no_longer_applicable"].includes(String(c.status))
            ? (c.status as ChangeStatus)
            : "to_discuss",
        }))
      : [];

    const agenda: AgendaItem[] = Array.isArray(parsed.agenda)
      ? (parsed.agenda as Record<string, unknown>[]).slice(0, 50).map((a) => ({
          id: String(a.id || Math.random().toString(36).substring(2, 9)),
          title: String(a.title || "Întrebare").slice(0, 150),
          questionDetails: a.questionDetails ? String(a.questionDetails).slice(0, 500) : undefined,
          area: (a.area as DiscussionArea) || "home_property",
          priority: ["low", "normal", "high"].includes(String(a.priority)) ? (a.priority as AgendaPriority) : "normal",
          status: ["open", "discussed", "answer_pending", "resolved", "not_applicable"].includes(String(a.status))
            ? (a.status as AgendaStatus)
            : "open",
          advisorNotes: a.advisorNotes ? String(a.advisorNotes).slice(0, 500) : undefined,
        }))
      : [];

    const decisions: DecisionRecord[] = Array.isArray(parsed.decisions)
      ? (parsed.decisions as Record<string, unknown>[]).slice(0, 50).map((d) => ({
          id: String(d.id || Math.random().toString(36).substring(2, 9)),
          decisionText: String(d.decisionText || "Decizie").slice(0, 200),
          outcome: ["agreed", "further_info_required", "deferred", "not_proceeding", "not_applicable"].includes(String(d.outcome))
            ? (d.outcome as DecisionOutcome)
            : "agreed",
          date: d.date ? String(d.date).slice(0, 10) : undefined,
          supportingContext: d.supportingContext ? String(d.supportingContext).slice(0, 300) : undefined,
          followUpAction: d.followUpAction ? String(d.followUpAction).slice(0, 200) : undefined,
          responsibleParty: ["user", "advisor", "insurer", "other"].includes(String(d.responsibleParty))
            ? (d.responsibleParty as ResponsibleParty)
            : "user",
          targetFollowUpDate: d.targetFollowUpDate ? String(d.targetFollowUpDate).slice(0, 10) : undefined,
          isCompleted: Boolean(d.isCompleted),
        }))
      : [];

    const plan: ClientReviewPlannerData = {
      title: String(parsed.title).slice(0, 100),
      reviewType,
      plannedDate: parsed.plannedDate ? String(parsed.plannedDate).slice(0, 10) : undefined,
      participants: parsed.participants ? String(parsed.participants).slice(0, 100) : undefined,
      generalContext: parsed.generalContext ? String(parsed.generalContext).slice(0, 1000) : undefined,
      selectedAreas: Array.isArray(parsed.selectedAreas) ? parsed.selectedAreas : ["home_property"],
      changes,
      agenda,
      decisions,
      lang: parsed.lang === "en" ? "en" : "ro",
      createdAt: parsed.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return { isValid: true, plan };
  } catch {
    return { isValid: false, error: "Eroare la parsarea structurii JSON." };
  }
}
