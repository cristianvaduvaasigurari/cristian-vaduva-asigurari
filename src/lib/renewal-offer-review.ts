import jsPDF from "jspdf";
import { PolicyCategory, CATEGORY_LABELS_RO, CATEGORY_LABELS_EN } from "./portfolio-calendar";

export type CurrencyCode = "RON" | "EUR" | "USD" | "GBP" | "OTHER";
export type PaymentFrequency = "annual" | "semiannual" | "quarterly" | "monthly" | "other";

export type TermComparisonStatus =
  | "different"
  | "unchanged"
  | "missing_current"
  | "missing_renewal"
  | "needs_clarification"
  | "not_applicable";

export interface PolicySideData {
  premium?: number;
  currency: CurrencyCode;
  paymentFrequency: PaymentFrequency;
  coverageLimit?: number;
  limitBasis?: string;
  deductible?: number;
  deductibleBasis?: string;
  exclusions?: string;
  territorialScope?: string;
  waitingPeriod?: string;
  valuationBasis?: string;
  assistanceBenefits?: string;
  startDate?: string;
  expiryDate?: string;
  notes?: string;
}

export interface TermComparisonRow {
  id: string;
  labelRo: string;
  labelEn: string;
  currentVal?: string;
  renewalVal?: string;
  status: TermComparisonStatus;
  notes?: string;
}

export interface RenewalOfferReviewData {
  title: string;
  category: PolicyCategory;
  current: PolicySideData;
  renewal: PolicySideData;
  terms: TermComparisonRow[];
  questions: string[];
  userNotes?: string;
  lang: "ro" | "en";
  createdAt: string;
  updatedAt: string;
}

export const CURRENCY_LABELS: Record<CurrencyCode, string> = {
  RON: "RON",
  EUR: "EUR",
  USD: "USD",
  GBP: "GBP",
  OTHER: "Altă valută",
};

export const FREQUENCY_LABELS_RO: Record<PaymentFrequency, string> = {
  annual: "Anuală (1 rată)",
  semiannual: "Semestrială (2 rate)",
  quarterly: "Trimestrială (4 rate)",
  monthly: "Lunară (12 rate)",
  other: "Altă frecvență",
};

export const FREQUENCY_LABELS_EN: Record<PaymentFrequency, string> = {
  annual: "Annual (1 payment)",
  semiannual: "Semi-Annual (2 payments)",
  quarterly: "Quarterly (4 payments)",
  monthly: "Monthly (12 payments)",
  other: "Other Frequency",
};

export const TERM_STATUS_LABELS_RO: Record<TermComparisonStatus, string> = {
  different: "Diferență Detectată",
  unchanged: "Apare Neschimbat",
  missing_current: "Lipsește din Polița Curentă",
  missing_renewal: "Lipsește din Oferta de Reînnoire",
  needs_clarification: "Necesită Clarificare",
  not_applicable: "Neaplicabil",
};

export const TERM_STATUS_LABELS_EN: Record<TermComparisonStatus, string> = {
  different: "Difference Detected",
  unchanged: "Appears Unchanged",
  missing_current: "Missing from Current Policy",
  missing_renewal: "Missing from Renewal Offer",
  needs_clarification: "Needs Clarification",
  not_applicable: "Not Applicable",
};

export const DEFAULT_TERMS_ROWS: Omit<TermComparisonRow, "currentVal" | "renewalVal" | "status" | "notes">[] = [
  { id: "coverage_limit", labelRo: "Limită Răspundere / Sumă Asigurată", labelEn: "Limit of Liability / Sum Insured" },
  { id: "limit_basis", labelRo: "Bază Limită (per eveniment / agregat)", labelEn: "Limit Basis (per claim / aggregate)" },
  { id: "deductible", labelRo: "Franșiză / Deductibilă (Excess)", labelEn: "Deductible / Policy Excess" },
  { id: "deductible_basis", labelRo: "Bază Aplicare Franșiză", labelEn: "Deductible Application Basis" },
  { id: "exclusions", labelRo: "Excluderi & Restricții Menționate", labelEn: "Specific Exclusions & Restrictions" },
  { id: "territorial_scope", labelRo: "Arie Teritorială de Acoperire", labelEn: "Territorial Scope & Jurisdiction" },
  { id: "waiting_period", labelRo: "Perioadă de Așteptare (Carență)", labelEn: "Waiting Period / Moratorium" },
  { id: "valuation_basis", labelRo: "Bază de Evaluare (Nou vs. Real)", labelEn: "Valuation Basis (Replacement vs. Actual)" },
  { id: "assistance_benefits", labelRo: "Asistență & Servicii Adiționale", labelEn: "Assistance & Ancillary Benefits" },
  { id: "policy_dates", labelRo: "Perioadă de Valabilitate Contract", labelEn: "Policy Period & Dates" },
  { id: "payment_frequency", labelRo: "Frecvență & Rate de Plată", labelEn: "Payment Frequency & Installments" },
];

/**
 * Deterministic premium comparison logic.
 */
export function calculatePremiumDifference(
  current: PolicySideData,
  renewal: PolicySideData,
  lang: "ro" | "en" = "ro"
): {
  isComparable: boolean;
  reason?: string;
  difference?: number;
  percentageChange?: number;
  direction?: "increase" | "decrease" | "no_change";
} {
  const isRo = lang === "ro";

  if (current.premium === undefined || renewal.premium === undefined) {
    return {
      isComparable: false,
      reason: isRo
        ? "Una sau ambele valori de primă lipsesc."
        : "One or both premium values are missing.",
    };
  }

  if (current.currency !== renewal.currency) {
    return {
      isComparable: false,
      reason: isRo
        ? `Valute diferite (${current.currency} vs. ${renewal.currency}). Conversia necesită curs BNR oficial.`
        : `Different currencies (${current.currency} vs. ${renewal.currency}).`,
    };
  }

  if (current.paymentFrequency !== renewal.paymentFrequency) {
    return {
      isComparable: false,
      reason: isRo
        ? `Frecvențe de plată diferite (${FREQUENCY_LABELS_RO[current.paymentFrequency]} vs. ${FREQUENCY_LABELS_RO[renewal.paymentFrequency]}).`
        : `Different payment frequencies.`,
    };
  }

  const diff = renewal.premium - current.premium;
  let pct: number | undefined = undefined;

  if (current.premium > 0) {
    pct = (diff / current.premium) * 100;
  }

  const direction = diff > 0.01 ? "increase" : diff < -0.01 ? "decrease" : "no_change";

  return {
    isComparable: true,
    difference: Math.round(diff * 100) / 100,
    percentageChange: pct !== undefined ? Math.round(pct * 10) / 10 : undefined,
    direction,
  };
}

/**
 * Deterministic suggested questions generator.
 */
export function generateSuggestedRenewalQuestions(
  data: RenewalOfferReviewData,
  lang: "ro" | "en" = "ro"
): string[] {
  const isRo = lang === "ro";
  const questions: string[] = [];

  const premDiff = calculatePremiumDifference(data.current, data.renewal, lang);

  if (premDiff.isComparable && premDiff.direction === "increase") {
    questions.push(
      isRo
        ? `Care sunt factorii care justifică creșterea de primă cu ${premDiff.percentageChange}% (indexare inflație, daunalitate generală de piață, sau modificări de sume asigurate)?`
        : `What factors justify the ${premDiff.percentageChange}% premium increase (inflation indexation, market claims loss ratio, or altered sums)?`
    );
  }

  if (premDiff.isComparable && premDiff.direction === "decrease") {
    questions.push(
      isRo
        ? "Scăderea de primă este însoțită de introducerea unor franșize mai mari sau restrângerea limitelor de despăgubire?"
        : "Does the premium decrease involve higher deductibles or narrower sub-limits?"
    );
  }

  if (data.current.currency !== data.renewal.currency) {
    questions.push(
      isRo
        ? "Oferta de reînnoire poate fi emisă în aceeași valută ca polița anterioară pentru a evita riscul valutar?"
        : "Can the renewal proposal be quoted in the original currency to avoid exchange rate risk?"
    );
  }

  questions.push(
    isRo
      ? "Există clauze modificate, franșize noi sau excluderi adăugate în noile Condiții Generale față de contractul precedent?"
      : "Are there altered endorsements, newly added deductibles, or revised exclusions in the General Terms?"
  );

  questions.push(
    isRo
      ? "Data intrării în vigoare a noii polițe asigură continuitate exactă din secunda expirării contractului vechi?"
      : "Does the renewal inception date provide seamless continuity from the exact second the prior policy lapses?"
  );

  questions.push(
    isRo
      ? "Suma asigurată propusă reflectă valoarea actuală de reconstrucție / de piață a bunului asigurat?"
      : "Does the proposed limit reflect current replacement value without risking underinsurance?"
  );

  return questions;
}

/**
 * PDF Generator for Renewal Offer Review.
 */
export function generateRenewalOfferPdf(data: RenewalOfferReviewData): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const isRo = data.lang === "ro";
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
  doc.text("Analiza Comparativa Oferta Reinnoire | Insurance.CristianVaduva.com", margin, 18);

  const dateStr = new Date().toLocaleDateString(isRo ? "ro-RO" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`${isRo ? "Data analizei" : "Analysis Date"}: ${dateStr}`, pageWidth - margin, 18, { align: "right" });

  y = 36;

  // Title
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(`${isRo ? "ANALIZA OFERTA REINNOIRE" : "RENEWAL OFFER REVIEW"}: ${data.title}`, margin, y);

  y += 7;

  // Category & Premium Summary Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentWidth, 24, "FD");

  const catLabel = isRo ? CATEGORY_LABELS_RO[data.category] : CATEGORY_LABELS_EN[data.category];
  const premDiff = calculatePremiumDifference(data.current, data.renewal, data.lang);

  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);

  doc.setFont("helvetica", "bold");
  doc.text(`${isRo ? "Categorie" : "Category"}:`, margin + 4, y + 6);
  doc.setFont("helvetica", "normal");
  doc.text(catLabel, margin + 26, y + 6);

  doc.setFont("helvetica", "bold");
  doc.text(`${isRo ? "Prima Curenta" : "Current Premium"}:`, margin + 4, y + 11);
  doc.setFont("helvetica", "normal");
  doc.text(
    data.current.premium !== undefined
      ? `${data.current.premium.toLocaleString()} ${data.current.currency} (${isRo ? FREQUENCY_LABELS_RO[data.current.paymentFrequency] : FREQUENCY_LABELS_EN[data.current.paymentFrequency]})`
      : isRo ? "Nespecificat" : "Not specified",
    margin + 26,
    y + 11
  );

  doc.setFont("helvetica", "bold");
  doc.text(`${isRo ? "Oferta Noua" : "Renewal Quote"}:`, margin + 4, y + 16);
  doc.setFont("helvetica", "normal");
  doc.text(
    data.renewal.premium !== undefined
      ? `${data.renewal.premium.toLocaleString()} ${data.renewal.currency} (${isRo ? FREQUENCY_LABELS_RO[data.renewal.paymentFrequency] : FREQUENCY_LABELS_EN[data.renewal.paymentFrequency]})`
      : isRo ? "Nespecificat" : "Not specified",
    margin + 26,
    y + 16
  );

  const col2X = margin + contentWidth / 2 + 4;
  doc.setFont("helvetica", "bold");
  doc.text(`${isRo ? "Diferenta Prima" : "Premium Delta"}:`, col2X, y + 6);
  doc.setFont("helvetica", "normal");
  if (premDiff.isComparable && premDiff.difference !== undefined) {
    const sign = premDiff.difference > 0 ? "+" : "";
    const pctStr = premDiff.percentageChange !== undefined ? ` (${sign}${premDiff.percentageChange}%)` : "";
    doc.setTextColor(premDiff.direction === "increase" ? 225 : 34, premDiff.direction === "increase" ? 29 : 197, premDiff.direction === "increase" ? 72 : 94);
    doc.text(`${sign}${premDiff.difference} ${data.current.currency}${pctStr}`, col2X + 28, y + 6);
  } else {
    doc.setTextColor(100, 116, 139);
    doc.text(premDiff.reason || "—", col2X + 28, y + 6, { maxWidth: contentWidth / 2 - 32 });
  }

  y += 30;

  // Section 1: Terms Comparison Matrix
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(isRo ? "1. MATRICE COMPARATIVA TERMENI CONTRACTUALI" : "1. CONTRACTUAL TERMS COMPARISON MATRIX", margin, y);

  y += 6;

  data.terms.slice(0, 6).forEach((row) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 14, "FD");

    const statusLabel = isRo ? TERM_STATUS_LABELS_RO[row.status] : TERM_STATUS_LABELS_EN[row.status];

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text(isRo ? row.labelRo : row.labelEn, margin + 3, y + 5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(row.status === "different" ? 225 : 100, row.status === "different" ? 29 : 116, row.status === "different" ? 72 : 139);
    doc.text(`[${statusLabel}]`, pageWidth - margin - 3, y + 5, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const cText = row.currentVal || "—";
    const rText = row.renewalVal || "—";
    doc.text(`Polita Curenta: ${cText}  |  Oferta Reinnoire: ${rText}`, margin + 3, y + 9.5);

    y += 16;
  });

  y += 2;

  // Section 2: Questions for Insurance Advisor
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(isRo ? "2. INTREBARI RECOMANDATE PENTRU CONSULTANTUL DE ASIGURARI" : "2. QUESTIONS FOR INSURANCE ADVISOR", margin, y);

  y += 6;

  data.questions.slice(0, 4).forEach((q) => {
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

  // Section 3: General User Notes
  if (data.userNotes && data.userNotes.trim().length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(isRo ? "3. NOTITE PERSONALE & PREFERINTE" : "3. PERSONAL NOTES", margin, y);

    y += 5;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 12, "FD");

    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const splitNotes = doc.splitTextToSize(data.userNotes, contentWidth - 4);
    doc.text(splitNotes[0] || "", margin + 2, y + 4.5);

    y += 15;
  }

  // Footer Disclaimer & Advisory Contact
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, 22, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text(isRo ? "CONSULTANTA SI AUDIT REINNOIRE (CRISTIAN VADUVA):" : "RENEWAL ADVISORY & AUDIT (CRISTIAN VADUVA):", margin + 3, y + 4.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    isRo
      ? "Telefon: 0767 110 439 | Website: https://insurance.cristianvaduva.com/verifica-polita\nAcest raport are caracter informativ si educational. Nu constituie o recomandare automata de reinnoire sau refuz a ofertei."
      : "Phone: 0767 110 439 | Website: https://insurance.cristianvaduva.com/verifica-polita\nThis report is an informational worksheet and does not constitute a binding insurance recommendation.",
    margin + 3,
    y + 9.5
  );

  return doc;
}

/**
 * Validates a JSON imported renewal review worksheet.
 */
export function validateImportedRenewalReview(jsonStr: string): {
  isValid: boolean;
  error?: string;
  review?: RenewalOfferReviewData;
} {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== "object") {
      return { isValid: false, error: "Fișier JSON invalid sau corupt." };
    }

    if (!parsed.title || typeof parsed.title !== "string") {
      return { isValid: false, error: "Titlul analizei lipsește." };
    }

    const current: PolicySideData = {
      premium: typeof parsed.current?.premium === "number" ? parsed.current.premium : undefined,
      currency: ["RON", "EUR", "USD", "GBP", "OTHER"].includes(parsed.current?.currency) ? parsed.current.currency : "RON",
      paymentFrequency: ["annual", "semiannual", "quarterly", "monthly", "other"].includes(parsed.current?.paymentFrequency)
        ? parsed.current.paymentFrequency
        : "annual",
      coverageLimit: typeof parsed.current?.coverageLimit === "number" ? parsed.current.coverageLimit : undefined,
      limitBasis: parsed.current?.limitBasis ? String(parsed.current.limitBasis).slice(0, 100) : undefined,
      deductible: typeof parsed.current?.deductible === "number" ? parsed.current.deductible : undefined,
      deductibleBasis: parsed.current?.deductibleBasis ? String(parsed.current.deductibleBasis).slice(0, 100) : undefined,
      exclusions: parsed.current?.exclusions ? String(parsed.current.exclusions).slice(0, 500) : undefined,
      startDate: parsed.current?.startDate ? String(parsed.current.startDate).slice(0, 10) : undefined,
      expiryDate: parsed.current?.expiryDate ? String(parsed.current.expiryDate).slice(0, 10) : undefined,
      notes: parsed.current?.notes ? String(parsed.current.notes).slice(0, 500) : undefined,
    };

    const renewal: PolicySideData = {
      premium: typeof parsed.renewal?.premium === "number" ? parsed.renewal.premium : undefined,
      currency: ["RON", "EUR", "USD", "GBP", "OTHER"].includes(parsed.renewal?.currency) ? parsed.renewal.currency : "RON",
      paymentFrequency: ["annual", "semiannual", "quarterly", "monthly", "other"].includes(parsed.renewal?.paymentFrequency)
        ? parsed.renewal.paymentFrequency
        : "annual",
      coverageLimit: typeof parsed.renewal?.coverageLimit === "number" ? parsed.renewal.coverageLimit : undefined,
      limitBasis: parsed.renewal?.limitBasis ? String(parsed.renewal.limitBasis).slice(0, 100) : undefined,
      deductible: typeof parsed.renewal?.deductible === "number" ? parsed.renewal.deductible : undefined,
      deductibleBasis: parsed.renewal?.deductibleBasis ? String(parsed.renewal.deductibleBasis).slice(0, 100) : undefined,
      exclusions: parsed.renewal?.exclusions ? String(parsed.renewal.exclusions).slice(0, 500) : undefined,
      startDate: parsed.renewal?.startDate ? String(parsed.renewal.startDate).slice(0, 10) : undefined,
      expiryDate: parsed.renewal?.expiryDate ? String(parsed.renewal.expiryDate).slice(0, 10) : undefined,
      notes: parsed.renewal?.notes ? String(parsed.renewal.notes).slice(0, 500) : undefined,
    };

    const terms: TermComparisonRow[] = Array.isArray(parsed.terms)
      ? (parsed.terms as Record<string, unknown>[]).slice(0, 30).map((t) => ({
          id: String(t.id || Math.random().toString(36).substring(2, 9)),
          labelRo: String(t.labelRo || "Termen"),
          labelEn: String(t.labelEn || "Term"),
          currentVal: t.currentVal ? String(t.currentVal).slice(0, 200) : undefined,
          renewalVal: t.renewalVal ? String(t.renewalVal).slice(0, 200) : undefined,
          status: [
            "different",
            "unchanged",
            "missing_current",
            "missing_renewal",
            "needs_clarification",
            "not_applicable",
          ].includes(String(t.status))
            ? (t.status as TermComparisonStatus)
            : "needs_clarification",
          notes: t.notes ? String(t.notes).slice(0, 300) : undefined,
        }))
      : [];

    const review: RenewalOfferReviewData = {
      title: String(parsed.title).slice(0, 100),
      category: [
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
      ].includes(parsed.category)
        ? parsed.category
        : "casco",
      current,
      renewal,
      terms,
      questions: Array.isArray(parsed.questions) ? (parsed.questions as unknown[]).map((q) => String(q).slice(0, 200)) : [],
      userNotes: parsed.userNotes ? String(parsed.userNotes).slice(0, 1000) : undefined,
      lang: parsed.lang === "en" ? "en" : "ro",
      createdAt: parsed.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return { isValid: true, review };
  } catch {
    return { isValid: false, error: "Eroare la parsarea structurii JSON." };
  }
}
