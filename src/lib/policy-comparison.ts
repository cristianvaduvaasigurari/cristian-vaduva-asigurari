import jsPDF from "jspdf";
import { PolicyCategory, CATEGORY_LABELS_RO, CATEGORY_LABELS_EN } from "./portfolio-calendar";

export interface PolicyComparisonData {
  label: string;
  category: PolicyCategory;
  insurer: string;
  productName?: string;
  coverageDescription?: string;
  coverageLimit?: number;
  limitCurrency?: "RON" | "EUR" | "USD";
  limitBasis?: string; // e.g. "per event", "annual aggregate"
  deductible?: number;
  deductibleCurrency?: "RON" | "EUR" | "USD";
  deductibleBasis?: string; // e.g. "per claim", "10% min 150 EUR"
  exclusions?: string;
  waitingPeriod?: string;
  territorialScope?: string;
  effectiveDates?: string;
  specialConditions?: string;
  pastedText?: string;
}

export type FieldStatus = "provided" | "missing" | "unclear" | "user_difference" | "requires_review";

export interface ComparisonRow {
  fieldId: string;
  labelRo: string;
  labelEn: string;
  valA: string;
  valB: string;
  statusA: FieldStatus;
  statusB: FieldStatus;
  notes?: string;
}

export interface ReviewSubject {
  id: string;
  titleRo: string;
  titleEn: string;
  descriptionRo: string;
  descriptionEn: string;
  statusA: "reviewed" | "clarify" | "not_applicable" | "not_found";
  statusB: "reviewed" | "clarify" | "not_applicable" | "not_found";
}

export const DEFAULT_REVIEW_SUBJECTS: Omit<ReviewSubject, "statusA" | "statusB">[] = [
  {
    id: "main_events",
    titleRo: "1. Evenimente asigurate principale",
    titleEn: "1. Main insured events & perils",
    descriptionRo: "Verifică riscurile acoperite explicit (incendiu, furt, avarii accidentale, răspundere civilă, invaliditate etc.).",
    descriptionEn: "Check covered perils (fire, theft, accidental damage, liability, disability, etc.).",
  },
  {
    id: "exclusions",
    titleRo: "2. Excluderi majore și clauze restrictive",
    titleEn: "2. Major exclusions & restrictive conditions",
    descriptionRo: "Excluderi generale (război, neglijență gravă, uzură) și excluderi specifice produsului.",
    descriptionEn: "General exclusions (war, gross negligence, wear & tear) and product-specific exclusions.",
  },
  {
    id: "sublimits",
    titleRo: "3. Sublimite de despăgubire",
    titleEn: "3. Sub-limits of indemnity",
    descriptionRo: "Limite specifice pentru bunuri de valoare, asistență juridică, cheltuieli de curățenie sau cazare temporară.",
    descriptionEn: "Caps for high-value items, legal expenses, debris removal, or temporary accommodation.",
  },
  {
    id: "deductibles",
    titleRo: "4. Franșize și sume deductibile (Excess)",
    titleEn: "4. Deductibles and policy excess",
    descriptionRo: "Valoarea suportată de asigurat la fiecare daună (fixă sau procentuală din daună/sumă asigurată).",
    descriptionEn: "Amount paid by insured per loss (fixed amount or percentage of loss/sum insured).",
  },
  {
    id: "waiting_periods",
    titleRo: "5. Perioade de așteptare (Carență)",
    titleEn: "5. Waiting periods / moratoriums",
    descriptionRo: "Intervalul de la intrarea în vigoare până la acoperirea efectivă a anumitor evenimente/boli.",
    descriptionEn: "Timeframe from inception before specific illnesses or perils are covered.",
  },
  {
    id: "pre_existing",
    titleRo: "6. Afecțiuni preexistente sau daune anterioare",
    titleEn: "6. Pre-existing conditions or prior damage",
    descriptionRo: "Declarații de sănătate sau inspecții de risc ale bunurilor existente la momentul încheierii.",
    descriptionEn: "Medical history or pre-inception risk surveys on properties/vehicles.",
  },
  {
    id: "notification_deadlines",
    titleRo: "7. Termene și cerințe de notificare a daunei",
    titleEn: "7. Claim notification deadlines & requirements",
    descriptionRo: "Termenul contractual de avizare a daunei (ex: 24h, 48h, 5 zile lucrătoare) și documentele solicitate.",
    descriptionEn: "Contractual claim notice window (e.g. 24h, 48h, 5 days) and mandatory documents.",
  },
  {
    id: "territorial_scope",
    titleRo: "8. Aria teritorială de acoperire",
    titleEn: "8. Territorial scope & jurisdiction",
    descriptionRo: "Valabilitate în România, Uniunea Europeană, Spațiul Economic European sau nivel Global.",
    descriptionEn: "Coverage validity in Romania, EU, EEA, or Worldwide.",
  },
  {
    id: "indemnity_basis",
    titleRo: "9. Baza de evaluare și despăgubire",
    titleEn: "9. Valuation & indemnity basis",
    descriptionRo: "Valoare de nou (reconstrucție/înlocuire) vs. Valoare reală (cu scăderea uzurii).",
    descriptionEn: "New replacement value vs. Actual cash value (depreciation deducted).",
  },
  {
    id: "underinsurance",
    titleRo: "10. Regula proporțională (Subasigurare)",
    titleEn: "10. Underinsurance / Average clause",
    descriptionRo: "Dacă suma asigurată este sub valoarea reală, despăgubirea se reduce proporțional.",
    descriptionEn: "Whether payouts are reduced proportionally if insured sum is below real value.",
  },
  {
    id: "cancellation_terms",
    titleRo: "11. Clauze de reînnoire, reziliere și denunțare",
    titleEn: "11. Renewal, cancellation & termination",
    descriptionRo: "Condiții de reziliere anticipată, returnare a primei și notificări obligatorii.",
    descriptionEn: "Early termination rights, premium refunds, and notice periods.",
  },
  {
    id: "special_conditions",
    titleRo: "12. Condiții speciale și clauze adiționale",
    titleEn: "12. Special conditions & endorsements",
    descriptionRo: "Clauze specifice negociate (vandalism, greve, extindere teritorială, asistență extinsă).",
    descriptionEn: "Negotiated endorsements (vandalism, strikes, geographical extensions, extra assistance).",
  },
  {
    id: "claims_assistance",
    titleRo: "13. Servicii de asistență și asistență juridică",
    titleEn: "13. Assistance services & legal expenses",
    descriptionRo: "Tractare 24/7, mașină la schimb, decontare directă, asistență la domiciliu.",
    descriptionEn: "24/7 roadside assistance, replacement vehicle, direct settlement, home emergency repair.",
  },
];

/**
 * Builds deterministic side-by-side comparison rows.
 */
export function buildComparisonRows(
  polA: PolicyComparisonData,
  polB: PolicyComparisonData,
  lang: "ro" | "en" = "ro"
): ComparisonRow[] {
  const isRo = lang === "ro";

  const rows: ComparisonRow[] = [
    {
      fieldId: "label",
      labelRo: "Denumire Poliță",
      labelEn: "Policy Label",
      valA: polA.label || "Polița A",
      valB: polB.label || "Polița B",
      statusA: polA.label ? "provided" : "missing",
      statusB: polB.label ? "provided" : "missing",
    },
    {
      fieldId: "category",
      labelRo: "Categorie Asigurare",
      labelEn: "Insurance Category",
      valA: isRo ? CATEGORY_LABELS_RO[polA.category] : CATEGORY_LABELS_EN[polA.category],
      valB: isRo ? CATEGORY_LABELS_RO[polB.category] : CATEGORY_LABELS_EN[polB.category],
      statusA: "provided",
      statusB: "provided",
      notes: polA.category !== polB.category ? (isRo ? "Atenție: Categoriile selectate diferă." : "Note: Categories differ.") : undefined,
    },
    {
      fieldId: "insurer",
      labelRo: "Companie Asigurare (Insurer)",
      labelEn: "Insurer / Carrier",
      valA: polA.insurer || (isRo ? "Nespecificat" : "Not specified"),
      valB: polB.insurer || (isRo ? "Nespecificat" : "Not specified"),
      statusA: polA.insurer ? "provided" : "missing",
      statusB: polB.insurer ? "provided" : "missing",
    },
    {
      fieldId: "productName",
      labelRo: "Produs / Nivel Acoperire",
      labelEn: "Product / Plan Level",
      valA: polA.productName || "—",
      valB: polB.productName || "—",
      statusA: polA.productName ? "provided" : "missing",
      statusB: polB.productName ? "provided" : "missing",
    },
    {
      fieldId: "coverageLimit",
      labelRo: "Limită Răspundere / Sumă Asigurată",
      labelEn: "Limit of Liability / Sum Insured",
      valA: polA.coverageLimit !== undefined
        ? `${polA.coverageLimit.toLocaleString(isRo ? "ro-RO" : "en-US")} ${polA.limitCurrency || "RON"}${polA.limitBasis ? ` (${polA.limitBasis})` : ""}`
        : "—",
      valB: polB.coverageLimit !== undefined
        ? `${polB.coverageLimit.toLocaleString(isRo ? "ro-RO" : "en-US")} ${polB.limitCurrency || "RON"}${polB.limitBasis ? ` (${polB.limitBasis})` : ""}`
        : "—",
      statusA: polA.coverageLimit !== undefined ? "provided" : "missing",
      statusB: polB.coverageLimit !== undefined ? "provided" : "missing",
      notes:
        polA.coverageLimit !== undefined && polB.coverageLimit !== undefined && polA.limitCurrency !== polB.limitCurrency
          ? (isRo ? "Valute diferite (conversia depinde de cursul BNR)." : "Different currencies.")
          : undefined,
    },
    {
      fieldId: "deductible",
      labelRo: "Franșiză / Deductibilă (Excess)",
      labelEn: "Deductible / Excess",
      valA: polA.deductible !== undefined
        ? `${polA.deductible.toLocaleString(isRo ? "ro-RO" : "en-US")} ${polA.deductibleCurrency || "RON"}${polA.deductibleBasis ? ` (${polA.deductibleBasis})` : ""}`
        : polA.deductibleBasis || "—",
      valB: polB.deductible !== undefined
        ? `${polB.deductible.toLocaleString(isRo ? "ro-RO" : "en-US")} ${polB.deductibleCurrency || "RON"}${polB.deductibleBasis ? ` (${polB.deductibleBasis})` : ""}`
        : polB.deductibleBasis || "—",
      statusA: polA.deductible !== undefined || polA.deductibleBasis ? "provided" : "missing",
      statusB: polB.deductible !== undefined || polB.deductibleBasis ? "provided" : "missing",
    },
    {
      fieldId: "exclusions",
      labelRo: "Excluderi Specifice Menționate",
      labelEn: "Specific Exclusions Noted",
      valA: polA.exclusions || "—",
      valB: polB.exclusions || "—",
      statusA: polA.exclusions ? "provided" : "requires_review",
      statusB: polB.exclusions ? "provided" : "requires_review",
      notes: isRo ? "Verifică întotdeauna lista completă din Condițiile Generale." : "Always review full exclusions in Policy Terms.",
    },
    {
      fieldId: "waitingPeriod",
      labelRo: "Perioadă de Așteptare (Carență)",
      labelEn: "Waiting Period / Moratorium",
      valA: polA.waitingPeriod || "—",
      valB: polB.waitingPeriod || "—",
      statusA: polA.waitingPeriod ? "provided" : "missing",
      statusB: polB.waitingPeriod ? "provided" : "missing",
    },
    {
      fieldId: "territorialScope",
      labelRo: "Acoperire Teritorială",
      labelEn: "Territorial Scope",
      valA: polA.territorialScope || "—",
      valB: polB.territorialScope || "—",
      statusA: polA.territorialScope ? "provided" : "missing",
      statusB: polB.territorialScope ? "provided" : "missing",
    },
    {
      fieldId: "effectiveDates",
      labelRo: "Perioadă Asigurată / Valabilitate",
      labelEn: "Effective Period / Validity",
      valA: polA.effectiveDates || "—",
      valB: polB.effectiveDates || "—",
      statusA: polA.effectiveDates ? "provided" : "missing",
      statusB: polB.effectiveDates ? "provided" : "missing",
    },
    {
      fieldId: "specialConditions",
      labelRo: "Condiții Speciale / Clauze Adiționale",
      labelEn: "Special Conditions / Endorsements",
      valA: polA.specialConditions || "—",
      valB: polB.specialConditions || "—",
      statusA: polA.specialConditions ? "provided" : "missing",
      statusB: polB.specialConditions ? "provided" : "missing",
    },
  ];

  return rows;
}

/**
 * Deterministic advisor questions generator.
 */
export function generateAdvisorQuestions(
  polA: PolicyComparisonData,
  polB: PolicyComparisonData,
  subjects: ReviewSubject[],
  lang: "ro" | "en" = "ro"
): string[] {
  const isRo = lang === "ro";
  const questions: string[] = [];

  // Limit questions
  if (polA.coverageLimit === undefined || polB.coverageLimit === undefined) {
    questions.push(
      isRo
        ? "Care este limita maximă de răspundere per eveniment și per întregul an de asigurare (agregat anual)?"
        : "What is the maximum limit of indemnity per single claim and in the annual aggregate?"
    );
  }

  // Deductible questions
  if (polA.deductible !== undefined || polB.deductible !== undefined) {
    questions.push(
      isRo
        ? "Franșiza se aplică la fiecare daună independentă sau per eveniment agregat cu daune multiple?"
        : "Does the deductible apply per individual claim or per single aggregate event with multiple damages?"
    );
  } else {
    questions.push(
      isRo
        ? "Există vreo franșiză ascunsă sau participare obligatorie a asiguratului la daune parțiale ori totale?"
        : "Are there any hidden deductibles or co-insurance percentages applicable to partial or total losses?"
    );
  }

  // Exclusions & Endorsements
  if (!polA.exclusions || !polB.exclusions) {
    questions.push(
      isRo
        ? "Ce excluderi specifice sau clauze restrictive există în Condițiile Generale care nu apar pe cererea-ofertă?"
        : "What specific exclusions or restrictive conditions exist in the General Policy Wording that are not highlighted on the quote sheet?"
    );
  }

  // Subjects requiring clarification
  const needsClarification = subjects.filter((s) => s.statusA === "clarify" || s.statusB === "clarify");
  if (needsClarification.length > 0) {
    needsClarification.forEach((s) => {
      questions.push(
        isRo
          ? `Cum este reglementat contractual capitolul: "${s.titleRo}" și ce impact practic are în caz de daună?`
          : `How is the clause "${s.titleEn}" contractually defined and what is its practical impact upon a loss?`
      );
    });
  }

  // Defence costs / Assistance
  questions.push(
    isRo
      ? "Costurile de apărare juridică și onorariile experților tehnici sunt incluse în limita poliței sau peste limită?"
      : "Are legal defence costs and independent surveyor fees included within the policy limit or payable in addition to it?"
  );

  questions.push(
    isRo
      ? "Care sunt termenele stricte de avizare a daunei (termen limită în ore/zile) pentru a nu risca respingerea dosarului?"
      : "What are the strict notification deadlines (in hours/days) to prevent potential claim repudiation?"
  );

  return questions;
}

/**
 * Basic deterministic text comparison between two pasted policy wordings.
 */
export function comparePastedTexts(
  textA: string,
  textB: string,
  lang: "ro" | "en" = "ro"
): {
  hasComparison: boolean;
  lengthA: number;
  lengthB: number;
  uniqueLinesA: string[];
  uniqueLinesB: string[];
  commonKeywords: string[];
} {
  const isRo = lang === "ro";
  const cleanA = (textA || "").trim();
  const cleanB = (textB || "").trim();

  if (!cleanA || !cleanB) {
    return {
      hasComparison: false,
      lengthA: cleanA.length,
      lengthB: cleanB.length,
      uniqueLinesA: [],
      uniqueLinesB: [],
      commonKeywords: [],
    };
  }

  const linesA = cleanA
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 10);
  const linesB = cleanB
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 10);

  const setB = new Set(linesB.map((l) => l.toLowerCase()));
  const setA = new Set(linesA.map((l) => l.toLowerCase()));

  const uniqueLinesA = linesA.filter((l) => !setB.has(l.toLowerCase())).slice(0, 10);
  const uniqueLinesB = linesB.filter((l) => !setA.has(l.toLowerCase())).slice(0, 10);

  // Common insurance terms
  const targetKeywords = isRo
    ? ["excludere", "franșiză", "carență", "despăgubire", "răspundere", "reziliere", "notificare", "vandalism", "reconstrucție", "agregat"]
    : ["exclusion", "deductible", "waiting period", "indemnity", "liability", "cancellation", "notification", "vandalism", "replacement", "aggregate"];

  const commonKeywords = targetKeywords.filter(
    (kw) => cleanA.toLowerCase().includes(kw) && cleanB.toLowerCase().includes(kw)
  );

  return {
    hasComparison: true,
    lengthA: cleanA.length,
    lengthB: cleanB.length,
    uniqueLinesA,
    uniqueLinesB,
    commonKeywords,
  };
}

/**
 * Generates downloadable PDF Comparison Report.
 */
export function generateComparisonPdf(
  polA: PolicyComparisonData,
  polB: PolicyComparisonData,
  subjects: ReviewSubject[],
  advisorQuestions: string[],
  lang: "ro" | "en" = "ro"
): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const isRo = lang === "ro";
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
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text("Raport Comparativ Polite & Verificare Excluderi | Insurance.CristianVaduva.com", margin, 18);

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
  doc.text(
    isRo ? "RAPORT COMPARATIV: POLITA A vs. POLITA B" : "POLICY COMPARISON REPORT: POLICY A vs. POLICY B",
    margin,
    y
  );

  y += 7;

  // Overview box
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.rect(margin, y, contentWidth, 20, "FD");

  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);

  doc.setFont("helvetica", "bold");
  doc.text(`Polita A: ${polA.label || "Optiunea A"}`, margin + 4, y + 6);
  doc.setFont("helvetica", "normal");
  doc.text(`Asigurator: ${polA.insurer || "Nespecificat"} | Plan: ${polA.productName || "—"}`, margin + 4, y + 11);
  if (polA.coverageLimit !== undefined) {
    doc.text(`Limita: ${polA.coverageLimit.toLocaleString()} ${polA.limitCurrency || "RON"} | Fransiza: ${polA.deductible !== undefined ? `${polA.deductible} ${polA.deductibleCurrency || "RON"}` : "—"}`, margin + 4, y + 16);
  }

  const col2X = margin + contentWidth / 2 + 2;
  doc.setFont("helvetica", "bold");
  doc.text(`Polita B: ${polB.label || "Optiunea B"}`, col2X, y + 6);
  doc.setFont("helvetica", "normal");
  doc.text(`Asigurator: ${polB.insurer || "Nespecificat"} | Plan: ${polB.productName || "—"}`, col2X, y + 11);
  if (polB.coverageLimit !== undefined) {
    doc.text(`Limita: ${polB.coverageLimit.toLocaleString()} ${polB.limitCurrency || "RON"} | Fransiza: ${polB.deductible !== undefined ? `${polB.deductible} ${polB.deductibleCurrency || "RON"}` : "—"}`, col2X, y + 16);
  }

  y += 26;

  // Section: Checklist of Clauses & Review Subjects
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(isRo ? "1. VERIFICARE CLAUZE CONTRACTUALE & EXCLUDERI" : "1. CONTRACTUAL CLAUSES & EXCLUSION CHECKLIST", margin, y);

  y += 6;

  doc.setFontSize(8);
  subjects.slice(0, 8).forEach((s) => {
    const statusTextA = s.statusA === "reviewed" ? "[OK]" : s.statusA === "clarify" ? "[Clarificare]" : s.statusA === "not_found" ? "[Negasit]" : "[N/A]";
    const statusTextB = s.statusB === "reviewed" ? "[OK]" : s.statusB === "clarify" ? "[Clarificare]" : s.statusB === "not_found" ? "[Negasit]" : "[N/A]";

    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text(isRo ? s.titleRo : s.titleEn, margin, y);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(`A: ${statusTextA} | B: ${statusTextB}`, pageWidth - margin, y, { align: "right" });

    y += 5.5;
  });

  y += 4;

  // Section: Advisor Questions
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(isRo ? "2. INTREBARI RECOMANDATE PENTRU CONSULTANTUL DE ASIGURARI" : "2. RECOMMENDED QUESTIONS FOR INSURANCE ADVISOR", margin, y);

  y += 6;

  doc.setFontSize(8);
  advisorQuestions.slice(0, 5).forEach((q) => {
    doc.setDrawColor(100, 116, 139);
    doc.rect(margin, y, 3, 3);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    const splitQ = doc.splitTextToSize(q, contentWidth - 6);
    doc.text(splitQ, margin + 6, y + 2.5);

    y += 4 + splitQ.length * 3.5;
  });

  y += 4;

  // Footer Disclaimers & Contact
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, 24, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text(isRo ? "CONSULTANTA SI AUDIT POLITA:" : "INSURANCE ADVISORY & AUDIT:", margin + 3, y + 4.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    isRo
      ? "Telefon: 0767 110 439 | Website: https://insurance.cristianvaduva.com/verifica-polita\nAcest raport are rol exclusiv de organizare si comparatie preliminara. Nu reprezinta o opinie juridica sau o confirmare de acoperire."
      : "Phone: 0767 110 439 | Website: https://insurance.cristianvaduva.com/verifica-polita\nThis comparison report is an organizational aid. It does not constitute a legal opinion or a binding coverage determination.",
    margin + 3,
    y + 9.5
  );

  return doc;
}
