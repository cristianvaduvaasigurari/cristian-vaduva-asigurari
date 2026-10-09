import { jsPDF } from "jspdf";

export type ClaimCategory =
  | "motor"
  | "property_water"
  | "theft"
  | "health"
  | "travel"
  | "business"
  | "professional_liability"
  | "private_client"
  | "other";

export type CurrencyCode = "RON" | "EUR" | "GBP" | "USD" | "OTHER";

export type ClaimReviewStatus =
  | "initial_review"
  | "reconciliation_in_progress"
  | "clarifications_requested"
  | "negotiation_in_progress"
  | "accepted_by_user"
  | "disputed_by_user"
  | "closed";

export type ValuationBasis =
  | "vat_inclusive"
  | "vat_exclusive"
  | "repair_estimate"
  | "replacement_value"
  | "indemnity_market_value"
  | "other";

export type LineItemCategory =
  | "labor"
  | "parts"
  | "materials"
  | "transport"
  | "accommodation"
  | "professional_fees"
  | "replacement"
  | "other";

export type EvidenceStatus =
  | "available"
  | "requested"
  | "missing"
  | "needs_clarification";

export type ItemReviewStatus =
  | "explained"
  | "unresolved"
  | "requires_clarification"
  | "not_applicable";

export interface ClaimLineItem {
  id: string;
  description: string;
  category: LineItemCategory;
  amountClaimed?: number;
  amountOffered?: number;
  currency: CurrencyCode;
  basis?: ValuationBasis;
  evidenceStatus: EvidenceStatus;
  reviewStatus: ItemReviewStatus;
  notes?: string;
}

export interface SettlementQuestionAction {
  id: string;
  question: string;
  suggested?: boolean;
  answer?: string;
  responsibleParty?: string;
  followUpDate?: string; // YYYY-MM-DD
  status: "pending" | "in_progress" | "resolved";
}

export interface ClaimFinancials {
  currency: CurrencyCode;
  basisInsurer?: ValuationBasis;
  basisUser?: ValuationBasis;
  insurerGrossOffer?: number;
  deductibleShown?: number;
  depreciationAdjustment?: number;
  salvageDeduction?: number;
  otherDeductions?: number;
  otherDeductionsDescription?: string;
  additionalAmountsIncluded?: number;
  insurerStatedNetOffer?: number; // The official net payout proposed
  userEstimate?: number; // User's own repair / replacement estimate
  amountAlreadyPaid?: number; // Advance or partial payment
}

export interface ClaimSettlementData {
  schemaVersion: "1.0";
  exportedAt: string;
  claimReference: string; // User-defined claim nickname / ref
  category: ClaimCategory;
  incidentDate?: string;
  offerReceivedDate?: string;
  reviewStatus: ClaimReviewStatus;
  description?: string;
  insurerExplanationNotes?: string;
  userNotes?: string;
  financials: ClaimFinancials;
  lineItems: ClaimLineItem[];
  questionsActions: SettlementQuestionAction[];
}

export const CLAIM_CATEGORY_INFO: Record<
  ClaimCategory,
  { labelRo: string; labelEn: string; iconName: string }
> = {
  motor: {
    labelRo: "Auto (CASCO / RCA / Flote)",
    labelEn: "Motor (Own Damage / Third Party)",
    iconName: "Car",
  },
  property_water: {
    labelRo: "Locuință & Clădiri (Incendiu / Apă)",
    labelEn: "Property & Buildings (Fire / Water)",
    iconName: "Home",
  },
  theft: {
    labelRo: "Furt, Tâlhărie & Vandalism",
    labelEn: "Theft & Vandalism",
    iconName: "ShieldAlert",
  },
  health: {
    labelRo: "Sănătate & Spitalizare",
    labelEn: "Health & Medical",
    iconName: "Activity",
  },
  travel: {
    labelRo: "Călătorii & Repatriere",
    labelEn: "Travel & Assistance",
    iconName: "Plane",
  },
  business: {
    labelRo: "Comercial & Întrerupere Activitate",
    labelEn: "Commercial & Business Interruption",
    iconName: "Building2",
  },
  professional_liability: {
    labelRo: "Răspundere Profesională / Malpraxis",
    labelEn: "Professional Liability",
    iconName: "Briefcase",
  },
  private_client: {
    labelRo: "Private Client (Artă / Ceasuri / Luxury)",
    labelEn: "Private Client & High-Value Assets",
    iconName: "Sparkles",
  },
  other: {
    labelRo: "Altă Categorie Daună",
    labelEn: "Other Claim Category",
    iconName: "Layers",
  },
};

export const REVIEW_STATUS_INFO: Record<
  ClaimReviewStatus,
  { labelRo: string; labelEn: string; color: string }
> = {
  initial_review: {
    labelRo: "Analiză inițială a ofertei",
    labelEn: "Initial review",
    color: "zinc",
  },
  reconciliation_in_progress: {
    labelRo: "Reconciliere cifre în curs",
    labelEn: "Reconciliation in progress",
    color: "blue",
  },
  clarifications_requested: {
    labelRo: "Clarificări solicitate asiguratorului",
    labelEn: "Clarifications requested",
    color: "purple",
  },
  negotiation_in_progress: {
    labelRo: "Discuții suplimentare / Negociere",
    labelEn: "Discussions in progress",
    color: "amber",
  },
  accepted_by_user: {
    labelRo: "Ofertă acceptată de utilizator",
    labelEn: "Accepted by user",
    color: "emerald",
  },
  disputed_by_user: {
    labelRo: "Ofertă contestată de utilizator",
    labelEn: "Disputed by user",
    color: "rose",
  },
  closed: {
    labelRo: "Dosar închis",
    labelEn: "Closed",
    color: "slate",
  },
};

export const VALUATION_BASIS_INFO: Record<
  ValuationBasis,
  { labelRo: string; labelEn: string }
> = {
  vat_inclusive: { labelRo: "Inclusiv TVA (brut)", labelEn: "VAT Inclusive" },
  vat_exclusive: { labelRo: "Exclusiv TVA (net)", labelEn: "VAT Exclusive" },
  repair_estimate: { labelRo: "Deviz reparație / manoperă", labelEn: "Repair Estimate" },
  replacement_value: { labelRo: "Valoare de înlocuire de nou", labelEn: "Replacement Value" },
  indemnity_market_value: { labelRo: "Valoare de piață / despăgubire", labelEn: "Market / Indemnity Value" },
  other: { labelRo: "Altă bază de evaluare", labelEn: "Other Basis" },
};

export const LINE_ITEM_CATEGORY_INFO: Record<
  LineItemCategory,
  { labelRo: string; labelEn: string }
> = {
  labor: { labelRo: "Manoperă / Lucrări", labelEn: "Labor / Work" },
  parts: { labelRo: "Piese de schimb", labelEn: "Spare parts" },
  materials: { labelRo: "Materiale / Consumabile", labelEn: "Materials" },
  transport: { labelRo: "Transport / Tractare", labelEn: "Towing / Transport" },
  accommodation: { labelRo: "Cazare temporară / Relocare", labelEn: "Temporary accommodation" },
  professional_fees: { labelRo: "Onorarii experți / Evaluare", labelEn: "Expert / Professional fees" },
  replacement: { labelRo: "Bunuri înlocuite", labelEn: "Replacement items" },
  other: { labelRo: "Alte costuri documentate", labelEn: "Other documented costs" },
};

export const EVIDENCE_STATUS_INFO: Record<
  EvidenceStatus,
  { labelRo: string; labelEn: string; color: string }
> = {
  available: { labelRo: "Document doveditor disponibil", labelEn: "Evidence available", color: "emerald" },
  requested: { labelRo: "Document solicitat", labelEn: "Evidence requested", color: "blue" },
  missing: { labelRo: "Document lipsă", labelEn: "Evidence missing", color: "rose" },
  needs_clarification: { labelRo: "Necesită clarificare", labelEn: "Needs clarification", color: "amber" },
};

export const ITEM_REVIEW_STATUS_INFO: Record<
  ItemReviewStatus,
  { labelRo: string; labelEn: string; color: string }
> = {
  explained: { labelRo: "Explicat / Înțeles", labelEn: "Explained", color: "emerald" },
  unresolved: { labelRo: "Nerezolvat / În dispută", labelEn: "Unresolved", color: "rose" },
  requires_clarification: { labelRo: "Necesită clarificare", labelEn: "Requires clarification", color: "amber" },
  not_applicable: { labelRo: "Nu se aplică", labelEn: "Not applicable", color: "zinc" },
};

export interface ReconciliationResults {
  isReconciliationPossible: boolean;
  reconstructedOffer?: number;
  reconciliationDiscrepancy?: number; // statedNetOffer - reconstructedOffer
  hasReconciliationDiscrepancy: boolean;
  isComparisonPossible: boolean;
  estimateVsOfferDifference?: number; // userEstimate - statedNetOffer
  isEstimateHigher: boolean;
  isEstimateLower: boolean;
  isEqual: boolean;
  remainingPayable?: number; // statedNetOffer - amountAlreadyPaid
  warnings: string[];
}

export function calculateSettlementReconciliation(financials: ClaimFinancials): ReconciliationResults {
  const warnings: string[] = [];

  // Check if currencies / bases differ
  if (financials.basisInsurer && financials.basisUser && financials.basisInsurer !== financials.basisUser) {
    warnings.push(
      `Baza de evaluare diferă: Oferta asiguratorului este marcată ca "${VALUATION_BASIS_INFO[financials.basisInsurer]?.labelRo}", iar devizul utilizatorului ca "${VALUATION_BASIS_INFO[financials.basisUser]?.labelRo}". Comparația poate fi influențată de regimul TVA sau tipul de deviz.`
    );
  }

  // 1. Insurer Offer Internal Reconciliation
  let isReconciliationPossible = false;
  let reconstructedOffer: number | undefined = undefined;
  let reconciliationDiscrepancy: number | undefined = undefined;
  let hasReconciliationDiscrepancy = false;

  if (financials.insurerGrossOffer !== undefined) {
    const gross = financials.insurerGrossOffer;
    const ded = financials.deductibleShown || 0;
    const dep = financials.depreciationAdjustment || 0;
    const sal = financials.salvageDeduction || 0;
    const oth = financials.otherDeductions || 0;
    const add = financials.additionalAmountsIncluded || 0;

    reconstructedOffer = gross - ded - dep - sal - oth + add;
    isReconciliationPossible = true;

    if (financials.insurerStatedNetOffer !== undefined) {
      reconciliationDiscrepancy = Math.round((financials.insurerStatedNetOffer - reconstructedOffer) * 100) / 100;
      if (Math.abs(reconciliationDiscrepancy) > 0.01) {
        hasReconciliationDiscrepancy = true;
        warnings.push(
          `Discrepanță aritmetică notată: Suma calculată din componente (${reconstructedOffer.toLocaleString("ro-RO")} ${financials.currency}) diferă de oferta netă comunicată (${financials.insurerStatedNetOffer.toLocaleString("ro-RO")} ${financials.currency}) cu ${Math.abs(reconciliationDiscrepancy).toLocaleString("ro-RO")} ${financials.currency}.`
        );
      }
    }
  }

  // 2. User Estimate vs Insurer Stated Offer
  let isComparisonPossible = false;
  let estimateVsOfferDifference: number | undefined = undefined;
  let isEstimateHigher = false;
  let isEstimateLower = false;
  let isEqual = false;

  if (financials.userEstimate !== undefined && financials.insurerStatedNetOffer !== undefined) {
    isComparisonPossible = true;
    estimateVsOfferDifference = Math.round((financials.userEstimate - financials.insurerStatedNetOffer) * 100) / 100;

    if (estimateVsOfferDifference > 0.01) {
      isEstimateHigher = true;
    } else if (estimateVsOfferDifference < -0.01) {
      isEstimateLower = true;
    } else {
      isEqual = true;
    }
  } else {
    if (financials.userEstimate === undefined && financials.insurerStatedNetOffer !== undefined) {
      warnings.push("Pentru a compara cu devizul propriu, introduceți estimarea proprie / devizul de reparație.");
    } else if (financials.insurerStatedNetOffer === undefined && financials.userEstimate !== undefined) {
      warnings.push("Pentru a calcula diferența, introduceți oferta netă comunicată de asigurator.");
    }
  }

  // 3. Remaining Payable
  let remainingPayable: number | undefined = undefined;
  if (financials.insurerStatedNetOffer !== undefined && financials.amountAlreadyPaid !== undefined) {
    remainingPayable = Math.round((financials.insurerStatedNetOffer - financials.amountAlreadyPaid) * 100) / 100;
  }

  return {
    isReconciliationPossible,
    reconstructedOffer,
    reconciliationDiscrepancy,
    hasReconciliationDiscrepancy,
    isComparisonPossible,
    estimateVsOfferDifference,
    isEstimateHigher,
    isEstimateLower,
    isEqual,
    remainingPayable,
    warnings,
  };
}

export function generateSuggestedClaimQuestions(data: ClaimSettlementData): SettlementQuestionAction[] {
  const suggested: SettlementQuestionAction[] = [];
  const fin = data.financials;

  // 1. General itemized explanation
  suggested.push({
    id: "q_itemized",
    question: "Puteți furniza o notă de calcul detaliată / proces-verbal de evaluare pe fiecare poziție din dosar?",
    suggested: true,
    status: "pending",
  });

  // 2. Discrepancy question
  if (fin.insurerGrossOffer !== undefined && fin.insurerStatedNetOffer !== undefined) {
    const recon = calculateSettlementReconciliation(fin);
    if (recon.hasReconciliationDiscrepancy) {
      suggested.push({
        id: "q_discrepancy",
        question: "Cum a fost calculată trecerea de la valoarea brută la oferta netă, având în vedere diferența de calcul notată?",
        suggested: true,
        status: "pending",
      });
    }
  }

  // 3. Deductible or Depreciation
  if (fin.depreciationAdjustment && fin.depreciationAdjustment > 0) {
    suggested.push({
      id: "q_depreciation",
      question: "Care este baza contractuală și formula conform căreia a fost aplicată uzura / deprecierea pieselor?",
      suggested: true,
      status: "pending",
    });
  }

  if (fin.salvageDeduction && fin.salvageDeduction > 0) {
    suggested.push({
      id: "q_salvage",
      question: "Cum a fost determinată valoarea epavei / a resturilor reținute și care este opțiunea de preluare de către asigurator?",
      suggested: true,
      status: "pending",
    });
  }

  // 4. VAT Treatment
  suggested.push({
    id: "q_vat",
    question: "Suma propusă conține TVA sau despăgubirea TVA este condiționată de prezentarea facturilor fiscale de reparație?",
    suggested: true,
    status: "pending",
  });

  // 5. Unresolved line items
  const unresolvedCount = data.lineItems.filter((i) => i.reviewStatus === "unresolved" || i.reviewStatus === "requires_clarification").length;
  if (unresolvedCount > 0) {
    suggested.push({
      id: "q_unresolved_items",
      question: `Care este motivul diminuării sau omiterii pozițiilor semnalate în deviz (${unresolvedCount} poziții în dispută / neclarificate)?`,
      suggested: true,
      status: "pending",
    });
  }

  // 6. Procedure and deadline for dispute
  suggested.push({
    id: "q_dispute_procedure",
    question: "Care este procedura internă și termenul aplicabil pentru reanalizarea dosarului în cazul în care nu sunt de acord cu oferta?",
    suggested: true,
    status: "pending",
  });

  return suggested;
}

export function validateImportedClaimSettlementData(json: unknown): {
  valid: boolean;
  data?: ClaimSettlementData;
  error?: string;
} {
  if (!json || typeof json !== "object") {
    return { valid: false, error: "Fișierul JSON este gol sau invalid." };
  }

  const obj = json as Record<string, unknown>;

  if (obj.schemaVersion !== "1.0") {
    return { valid: false, error: "Versiunea schemei JSON nu este compatibilă (este necesară versiunea 1.0)." };
  }

  if (typeof obj.claimReference !== "string" || !obj.claimReference.trim()) {
    return { valid: false, error: "Câmpul 'claimReference' este obligatoriu." };
  }

  const validCategories: ClaimCategory[] = [
    "motor",
    "property_water",
    "theft",
    "health",
    "travel",
    "business",
    "professional_liability",
    "private_client",
    "other",
  ];

  const category =
    typeof obj.category === "string" && validCategories.includes(obj.category as ClaimCategory)
      ? (obj.category as ClaimCategory)
      : "other";

  const rawFin = (obj.financials || {}) as Record<string, unknown>;
  const financials: ClaimFinancials = {
    currency: typeof rawFin.currency === "string" ? (rawFin.currency as CurrencyCode) : "RON",
    basisInsurer: typeof rawFin.basisInsurer === "string" ? (rawFin.basisInsurer as ValuationBasis) : undefined,
    basisUser: typeof rawFin.basisUser === "string" ? (rawFin.basisUser as ValuationBasis) : undefined,
    insurerGrossOffer: typeof rawFin.insurerGrossOffer === "number" && !isNaN(rawFin.insurerGrossOffer) && rawFin.insurerGrossOffer >= 0 ? rawFin.insurerGrossOffer : undefined,
    deductibleShown: typeof rawFin.deductibleShown === "number" && !isNaN(rawFin.deductibleShown) && rawFin.deductibleShown >= 0 ? rawFin.deductibleShown : undefined,
    depreciationAdjustment: typeof rawFin.depreciationAdjustment === "number" && !isNaN(rawFin.depreciationAdjustment) && rawFin.depreciationAdjustment >= 0 ? rawFin.depreciationAdjustment : undefined,
    salvageDeduction: typeof rawFin.salvageDeduction === "number" && !isNaN(rawFin.salvageDeduction) && rawFin.salvageDeduction >= 0 ? rawFin.salvageDeduction : undefined,
    otherDeductions: typeof rawFin.otherDeductions === "number" && !isNaN(rawFin.otherDeductions) && rawFin.otherDeductions >= 0 ? rawFin.otherDeductions : undefined,
    otherDeductionsDescription: typeof rawFin.otherDeductionsDescription === "string" ? rawFin.otherDeductionsDescription.trim().slice(0, 200) : undefined,
    additionalAmountsIncluded: typeof rawFin.additionalAmountsIncluded === "number" && !isNaN(rawFin.additionalAmountsIncluded) && rawFin.additionalAmountsIncluded >= 0 ? rawFin.additionalAmountsIncluded : undefined,
    insurerStatedNetOffer: typeof rawFin.insurerStatedNetOffer === "number" && !isNaN(rawFin.insurerStatedNetOffer) && rawFin.insurerStatedNetOffer >= 0 ? rawFin.insurerStatedNetOffer : undefined,
    userEstimate: typeof rawFin.userEstimate === "number" && !isNaN(rawFin.userEstimate) && rawFin.userEstimate >= 0 ? rawFin.userEstimate : undefined,
    amountAlreadyPaid: typeof rawFin.amountAlreadyPaid === "number" && !isNaN(rawFin.amountAlreadyPaid) && rawFin.amountAlreadyPaid >= 0 ? rawFin.amountAlreadyPaid : undefined,
  };

  // Line items
  const rawItems = Array.isArray(obj.lineItems) ? obj.lineItems : [];
  const sanitizedItems: ClaimLineItem[] = [];

  for (let i = 0; i < Math.min(rawItems.length, 200); i++) {
    const it = rawItems[i] as Record<string, unknown>;
    if (!it || typeof it !== "object") continue;

    sanitizedItems.push({
      id: typeof it.id === "string" && it.id.trim() ? it.id.slice(0, 50) : `item_${Date.now()}_${i}`,
      description: typeof it.description === "string" && it.description.trim() ? it.description.trim().slice(0, 250) : `Poziție #${i + 1}`,
      category: typeof it.category === "string" ? (it.category as LineItemCategory) : "other",
      amountClaimed: typeof it.amountClaimed === "number" && !isNaN(it.amountClaimed) && it.amountClaimed >= 0 ? it.amountClaimed : undefined,
      amountOffered: typeof it.amountOffered === "number" && !isNaN(it.amountOffered) && it.amountOffered >= 0 ? it.amountOffered : undefined,
      currency: typeof it.currency === "string" ? (it.currency as CurrencyCode) : financials.currency,
      basis: typeof it.basis === "string" ? (it.basis as ValuationBasis) : undefined,
      evidenceStatus: typeof it.evidenceStatus === "string" ? (it.evidenceStatus as EvidenceStatus) : "missing",
      reviewStatus: typeof it.reviewStatus === "string" ? (it.reviewStatus as ItemReviewStatus) : "unresolved",
      notes: typeof it.notes === "string" ? it.notes.trim().slice(0, 500) : undefined,
    });
  }

  // Questions & Actions
  const rawQuestions = Array.isArray(obj.questionsActions) ? obj.questionsActions : [];
  const sanitizedQuestions: SettlementQuestionAction[] = [];

  for (let i = 0; i < Math.min(rawQuestions.length, 100); i++) {
    const q = rawQuestions[i] as Record<string, unknown>;
    if (!q || typeof q !== "object") continue;

    sanitizedQuestions.push({
      id: typeof q.id === "string" && q.id.trim() ? q.id.slice(0, 50) : `q_${Date.now()}_${i}`,
      question: typeof q.question === "string" && q.question.trim() ? q.question.trim().slice(0, 500) : "Întrebare",
      suggested: Boolean(q.suggested),
      answer: typeof q.answer === "string" ? q.answer.trim().slice(0, 500) : undefined,
      responsibleParty: typeof q.responsibleParty === "string" ? q.responsibleParty.trim().slice(0, 100) : undefined,
      followUpDate: typeof q.followUpDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(q.followUpDate) ? q.followUpDate : undefined,
      status: q.status === "resolved" || q.status === "in_progress" ? q.status : "pending",
    });
  }

  return {
    valid: true,
    data: {
      schemaVersion: "1.0",
      exportedAt: typeof obj.exportedAt === "string" ? obj.exportedAt : new Date().toISOString(),
      claimReference: String(obj.claimReference).trim().slice(0, 150),
      category,
      incidentDate: typeof obj.incidentDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(obj.incidentDate) ? obj.incidentDate : undefined,
      offerReceivedDate: typeof obj.offerReceivedDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(obj.offerReceivedDate) ? obj.offerReceivedDate : undefined,
      reviewStatus: typeof obj.reviewStatus === "string" ? (obj.reviewStatus as ClaimReviewStatus) : "initial_review",
      description: typeof obj.description === "string" ? obj.description.trim().slice(0, 1000) : undefined,
      insurerExplanationNotes: typeof obj.insurerExplanationNotes === "string" ? obj.insurerExplanationNotes.trim().slice(0, 1000) : undefined,
      userNotes: typeof obj.userNotes === "string" ? obj.userNotes.trim().slice(0, 1000) : undefined,
      financials,
      lineItems: sanitizedItems,
      questionsActions: sanitizedQuestions,
    },
  };
}

export function generateSettlementAnalyzerPdf(data: ClaimSettlementData): void {
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
    doc.text("Analiză Despăgubire Daună & Reconciliere Ofertă Asigurator", margin, 18);

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

  // Claim Header Details
  const catInfo = CLAIM_CATEGORY_INFO[data.category];
  const revStatusInfo = REVIEW_STATUS_INFO[data.reviewStatus];
  const recon = calculateSettlementReconciliation(data.financials);

  doc.setFillColor(245, 247, 250);
  doc.setDrawColor(220, 225, 230);
  doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2, "FD");

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`DOSAR / REFERINȚĂ: ${data.claimReference.toUpperCase()}`, margin + 4, currentY + 7);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`• Categorie: ${catInfo.labelRo}`, margin + 4, currentY + 13);
  doc.text(`• Status revizuire: ${revStatusInfo.labelRo}`, margin + 4, currentY + 18);

  const incDate = data.incidentDate || "Nespecificată";
  const offDate = data.offerReceivedDate || "Nespecificată";
  doc.text(`• Dată eveniment: ${incDate}`, margin + 80, currentY + 13);
  doc.text(`• Dată ofertă asigurator: ${offDate}`, margin + 80, currentY + 18);

  currentY += 30;

  // Amount Reconciliation Summary Box
  const fin = data.financials;
  const curr = fin.currency;

  ensureSpace(42);
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(margin, currentY, contentWidth, 36, 2, 2, "FD");

  doc.setTextColor(30, 58, 138);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("RECONCILIERE SUME & DEVAIZE (CALCUL TRANSPARENT)", margin + 4, currentY + 7);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);

  const grossStr = fin.insurerGrossOffer !== undefined ? `${fin.insurerGrossOffer.toLocaleString("ro-RO")} ${curr}` : "Nespecificat";
  const netStr = fin.insurerStatedNetOffer !== undefined ? `${fin.insurerStatedNetOffer.toLocaleString("ro-RO")} ${curr}` : "Nespecificat";
  const userEstStr = fin.userEstimate !== undefined ? `${fin.userEstimate.toLocaleString("ro-RO")} ${curr}` : "Nespecificat";

  doc.text(`• Ofertă brută asigurator: ${grossStr}`, margin + 4, currentY + 14);
  doc.text(`• Ofertă netă comunicată: ${netStr}`, margin + 4, currentY + 19);
  doc.text(`• Estimare / deviz propriu utilizator: ${userEstStr}`, margin + 4, currentY + 24);

  // Signed Difference
  if (recon.isComparisonPossible && recon.estimateVsOfferDifference !== undefined) {
    const diff = recon.estimateVsOfferDifference;
    const diffSign = diff > 0 ? "+" : "";
    doc.setFont("helvetica", "bold");
    if (diff > 0) {
      doc.setTextColor(180, 83, 9);
      doc.text(`• Diferență (Deviz propriu − Ofertă netă): ${diffSign}${diff.toLocaleString("ro-RO")} ${curr} (Deviz propriu mai mare)`, margin + 4, currentY + 30);
    } else if (diff < 0) {
      doc.setTextColor(22, 101, 52);
      doc.text(`• Diferență (Deviz propriu − Ofertă netă): ${diffSign}${diff.toLocaleString("ro-RO")} ${curr} (Ofertă asigurator mai mare)`, margin + 4, currentY + 30);
    } else {
      doc.setTextColor(71, 85, 105);
      doc.text(`• Diferență (Deviz propriu − Ofertă netă): 0 ${curr} (Sume egale)`, margin + 4, currentY + 30);
    }
  } else {
    doc.setTextColor(100, 116, 139);
    doc.text("• Comparație deviz vs ofertă: Date incomplete pentru calculul diferenței.", margin + 4, currentY + 30);
  }

  currentY += 42;

  // Warnings Callouts if any
  if (recon.warnings.length > 0) {
    ensureSpace(12 + recon.warnings.length * 5);
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(245, 158, 11);
    doc.roundedRect(margin, currentY, contentWidth, 8 + recon.warnings.length * 5, 2, 2, "FD");

    doc.setTextColor(146, 64, 14);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("AVERTIZĂRI PRIVIND DATELE INTRODUSE", margin + 4, currentY + 5.5);

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    let wY = currentY + 10;
    for (const w of recon.warnings) {
      doc.text(`• ${doc.splitTextToSize(w, contentWidth - 10)[0]}`, margin + 4, wY);
      wY += 5;
    }
    currentY = wY + 3;
  }

  // Section: Itemized Line Items
  if (data.lineItems.length > 0) {
    ensureSpace(20);
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("POZIȚII DETALIATE DIN DEVIZ & OFERTĂ", margin, currentY);
    currentY += 6;

    for (const item of data.lineItems) {
      const cat = LINE_ITEM_CATEGORY_INFO[item.category]?.labelRo || item.category;
      const evStatus = EVIDENCE_STATUS_INFO[item.evidenceStatus]?.labelRo || item.evidenceStatus;
      const revStatus = ITEM_REVIEW_STATUS_INFO[item.reviewStatus]?.labelRo || item.reviewStatus;

      const rowHeight = 18 + (item.notes ? 5 : 0);
      ensureSpace(rowHeight);

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, currentY, contentWidth, rowHeight - 2, 1, 1, "FD");

      doc.setTextColor(15, 23, 42);
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "bold");
      doc.text(item.description, margin + 3, currentY + 5);

      doc.setFontSize(7.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text(`Categorie: ${cat} | Dovadă: ${evStatus} | Stadiu: ${revStatus}`, margin + 3, currentY + 9.5);

      const claimedStr = item.amountClaimed !== undefined ? `${item.amountClaimed.toLocaleString("ro-RO")} ${item.currency}` : "Nespecificat";
      const offeredStr = item.amountOffered !== undefined ? `${item.amountOffered.toLocaleString("ro-RO")} ${item.currency}` : "Nespecificat";
      doc.setTextColor(51, 65, 85);
      doc.text(`Sumă cerută: ${claimedStr} | Sumă inclusă în ofertă: ${offeredStr}`, margin + 3, currentY + 14);

      if (item.notes) {
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(7);
        doc.text(`Notă: ${item.notes.slice(0, 110)}`, margin + 3, currentY + 18);
      }

      currentY += rowHeight;
    }
    currentY += 2;
  }

  // Section: Questions and Clarifications
  if (data.questionsActions.length > 0) {
    ensureSpace(20);
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("ÎNTREBĂRI & CLARIFICĂRI PENTRU ASIGURATOR", margin, currentY);
    currentY += 6;

    for (const q of data.questionsActions) {
      const rowHeight = 16 + (q.answer ? 5 : 0);
      ensureSpace(rowHeight);

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, currentY, contentWidth, rowHeight - 2, 1, 1, "FD");

      doc.setTextColor(15, 23, 42);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text(`Q: ${doc.splitTextToSize(q.question, contentWidth - 10)[0]}`, margin + 3, currentY + 5);

      doc.setFontSize(7.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text(`Status: ${q.status === "resolved" ? "Clarificat" : "În așteptare"} | Follow-up: ${q.followUpDate || "Nespecificat"}`, margin + 3, currentY + 9.5);

      if (q.answer) {
        doc.setTextColor(22, 101, 52);
        doc.setFontSize(7);
        doc.text(`Răspuns notat: ${q.answer.slice(0, 110)}`, margin + 3, currentY + 14);
      }

      currentY += rowHeight;
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
    "NOTĂ LEGALĂ: Acest raport reprezintă o fișă de calcul și organizare documentară bazată exclusiv pe cifrele introduse de utilizator.",
    margin + 3,
    currentY + 5
  );
  doc.text(
    "Nu constituie o decizie de daună, audit de acoperire juridică sau garanție că asiguratorul este obligat legal la plata sumelor calculate.",
    margin + 3,
    currentY + 9
  );
  doc.text(
    "Pentru soluționarea contestațiilor, adresați-vă în scris asiguratorului sau consultați un consilier specializat.",
    margin + 3,
    currentY + 13
  );
  doc.text(
    "Consultanță specializată: Cristian Văduva | Telefon / WhatsApp: 0767 110 439 | Email: contact@cristianvaduva.com",
    margin + 3,
    currentY + 18
  );

  doc.save(`analiza-despagubire-${data.claimReference.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`);
}
