import { jsPDF } from "jspdf";

export type PortfolioCategory =
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

export type PortfolioReviewStatus =
  | "needs_review"
  | "info_requested"
  | "reviewed_by_user"
  | "advisor_pending";

export interface PortfolioPolicy {
  id: string;
  nickname: string; // required
  category: PortfolioCategory; // required
  insurer?: string;
  productName?: string;
  startDate?: string; // YYYY-MM-DD
  expiryDate?: string; // YYYY-MM-DD
  premiumAmount?: number;
  currency?: CurrencyCode;
  paymentFrequency?: PaymentFrequency;
  coverageLimit?: number;
  limitCurrency?: CurrencyCode;
  limitBasis?: string;
  deductible?: number;
  deductibleCurrency?: CurrencyCode;
  deductibleBasis?: string;
  declaredProtection?: string;
  exclusions?: string;
  notes?: string;
  reviewStatus: PortfolioReviewStatus;
  reviewNote?: string;
  lastReviewedDate?: string; // YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioMapExportData {
  schemaVersion: "1.0";
  exportedAt: string;
  userNotes?: string;
  policies: PortfolioPolicy[];
}

export const CATEGORY_INFO: Record<
  PortfolioCategory,
  {
    labelRo: string;
    labelEn: string;
    descriptionRo: string;
    descriptionEn: string;
    iconName: string;
  }
> = {
  rca: {
    labelRo: "RCA (Răspundere Auto)",
    labelEn: "RCA (Motor Third Party)",
    descriptionRo: "Acoperire obligatorie pentru daune cauzate terților.",
    descriptionEn: "Mandatory third-party auto liability cover.",
    iconName: "ShieldAlert",
  },
  casco: {
    labelRo: "CASCO Auto",
    labelEn: "CASCO Auto",
    descriptionRo: "Protecție completă avarii proprii, furt și vandalism.",
    descriptionEn: "Comprehensive own-damage, theft and vandalism cover.",
    iconName: "Car",
  },
  home: {
    labelRo: "Locuință & PAD",
    labelEn: "Home & PAD",
    descriptionRo: "Imobil, bunuri, riscuri catastrofice și răspundere civilă.",
    descriptionEn: "Property, contents, catastrophe risks and civil liability.",
    iconName: "Home",
  },
  life: {
    labelRo: "Viață & Finanțe",
    labelEn: "Life & Financial Protection",
    descriptionRo: "Protecție financiară a familiei, investiții sau economisire.",
    descriptionEn: "Family financial security, savings, and income protection.",
    iconName: "HeartPulse",
  },
  health: {
    labelRo: "Sănătate Privată",
    labelEn: "Private Health Insurance",
    descriptionRo: "Clinici private, spitalizare, intervenții chirurgicale.",
    descriptionEn: "Private clinics, hospitalization, second medical opinions.",
    iconName: "Activity",
  },
  travel: {
    labelRo: "Călătorii & Asistență",
    labelEn: "Travel & Assistance",
    descriptionRo: "Urgențe medicale internaționale, storno, bagaje.",
    descriptionEn: "International emergency medical, trip cancellation, luggage.",
    iconName: "Plane",
  },
  business: {
    labelRo: "Business & Clădiri B2B",
    labelEn: "Business & Commercial",
    descriptionRo: "Clădiri comerciale, stocuri, utilaje, întrerupere activitate.",
    descriptionEn: "Commercial buildings, stock, machinery, business interruption.",
    iconName: "Building2",
  },
  professional_liability: {
    labelRo: "Răspundere Profesională / D&O",
    labelEn: "Professional Indemnity / D&O",
    descriptionRo: "Erori profesionale, malpraxis, directori și administratori.",
    descriptionEn: "Professional indemnity, errors & omissions, director liability.",
    iconName: "Briefcase",
  },
  private_client: {
    labelRo: "Private Client & Luxury Assets",
    labelEn: "Private Client & High-Value",
    descriptionRo: "Supercaruri, yachturi, artă, ceasuri, conace, colecții.",
    descriptionEn: "Supercars, yachts, fine art, luxury homes, collections.",
    iconName: "Sparkles",
  },
  other: {
    labelRo: "Altă Asigurare",
    labelEn: "Other Insurance",
    descriptionRo: "Polițe speciale, garanții sau riscuri specifice.",
    descriptionEn: "Specialty lines, surety bonds, custom covers.",
    iconName: "Layers",
  },
};

export const REVIEW_STATUS_INFO: Record<
  PortfolioReviewStatus,
  { labelRo: string; labelEn: string; color: string }
> = {
  needs_review: {
    labelRo: "Necesită revizuire",
    labelEn: "Needs review",
    color: "amber",
  },
  info_requested: {
    labelRo: "Informații solicitate",
    labelEn: "Information requested",
    color: "blue",
  },
  reviewed_by_user: {
    labelRo: "Revizuit de utilizator",
    labelEn: "Reviewed by user",
    color: "emerald",
  },
  advisor_pending: {
    labelRo: "Clarificare consilier în așteptare",
    labelEn: "Advisor clarification pending",
    color: "purple",
  },
};

export interface MissingFieldInfo {
  key: string;
  labelRo: string;
  labelEn: string;
}

export function getMissingPolicyFields(policy: PortfolioPolicy): MissingFieldInfo[] {
  const missing: MissingFieldInfo[] = [];

  if (!policy.insurer || !policy.insurer.trim()) {
    missing.push({ key: "insurer", labelRo: "Asigurator", labelEn: "Insurer" });
  }
  if (!policy.startDate) {
    missing.push({ key: "startDate", labelRo: "Data de început", labelEn: "Start date" });
  }
  if (!policy.expiryDate) {
    missing.push({ key: "expiryDate", labelRo: "Data expirării", labelEn: "Expiry date" });
  }
  if (policy.premiumAmount === undefined || policy.premiumAmount === null || isNaN(policy.premiumAmount)) {
    missing.push({ key: "premiumAmount", labelRo: "Valoare primă", labelEn: "Premium amount" });
  }
  if (!policy.currency) {
    missing.push({ key: "currency", labelRo: "Monedă primă", labelEn: "Currency" });
  }
  if (!policy.coverageLimit && !policy.limitBasis) {
    missing.push({ key: "coverageLimit", labelRo: "Limită de despăgubire / Bază", labelEn: "Coverage limit / Basis" });
  }
  if (policy.deductible === undefined && !policy.deductibleBasis) {
    missing.push({ key: "deductible", labelRo: "Franșiză / Condiție", labelEn: "Deductible / Basis" });
  }
  if (!policy.exclusions || !policy.exclusions.trim()) {
    missing.push({ key: "exclusions", labelRo: "Excluderi notate", labelEn: "Recorded exclusions" });
  }

  return missing;
}

export type ExpiryStatus =
  | "expired"
  | "urgent_7_days"
  | "upcoming_30_days"
  | "upcoming_60_days"
  | "active"
  | "insufficient_info";

export function getPolicyExpiryStatus(expiryDateStr?: string): {
  status: ExpiryStatus;
  daysLeft: number | null;
  labelRo: string;
  labelEn: string;
} {
  if (!expiryDateStr) {
    return {
      status: "insufficient_info",
      daysLeft: null,
      labelRo: "Dată nespecificată",
      labelEn: "Date not specified",
    };
  }

  const parts = expiryDateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return {
      status: "insufficient_info",
      daysLeft: null,
      labelRo: "Dată invalidă",
      labelEn: "Invalid date",
    };
  }

  const [year, month, day] = parts;
  const expiryDate = new Date(year, month - 1, day, 23, 59, 59);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffMs = expiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      status: "expired",
      daysLeft: diffDays,
      labelRo: `Expirată (${Math.abs(diffDays)} zile)`,
      labelEn: `Expired (${Math.abs(diffDays)} days ago)`,
    };
  }
  if (diffDays <= 7) {
    return {
      status: "urgent_7_days",
      daysLeft: diffDays,
      labelRo: `Expiră în ${diffDays} ${diffDays === 1 ? "zi" : "zile"} (Urgent)`,
      labelEn: `Expires in ${diffDays} ${diffDays === 1 ? "day" : "days"} (Urgent)`,
    };
  }
  if (diffDays <= 30) {
    return {
      status: "upcoming_30_days",
      daysLeft: diffDays,
      labelRo: `Expiră în ${diffDays} zile (< 30 zile)`,
      labelEn: `Expires in ${diffDays} days (< 30 days)`,
    };
  }
  if (diffDays <= 60) {
    return {
      status: "upcoming_60_days",
      daysLeft: diffDays,
      labelRo: `Expiră în ${diffDays} zile (< 60 zile)`,
      labelEn: `Expires in ${diffDays} days (< 60 days)`,
    };
  }

  return {
    status: "active",
    daysLeft: diffDays,
    labelRo: `Activă (${diffDays} zile rămase)`,
    labelEn: `Active (${diffDays} days left)`,
  };
}

export interface OverlapWarning {
  category: PortfolioCategory;
  policy1: PortfolioPolicy;
  policy2: PortfolioPolicy;
  overlapPeriod: string;
}

export function detectCategoryOverlaps(policies: PortfolioPolicy[]): OverlapWarning[] {
  const warnings: OverlapWarning[] = [];

  for (let i = 0; i < policies.length; i++) {
    for (let j = i + 1; j < policies.length; j++) {
      const p1 = policies[i];
      const p2 = policies[j];

      if (p1.category !== p2.category) continue;
      if (!p1.startDate || !p1.expiryDate || !p2.startDate || !p2.expiryDate) continue;

      const p1Start = new Date(p1.startDate).getTime();
      const p1End = new Date(p1.expiryDate).getTime();
      const p2Start = new Date(p2.startDate).getTime();
      const p2End = new Date(p2.expiryDate).getTime();

      if (isNaN(p1Start) || isNaN(p1End) || isNaN(p2Start) || isNaN(p2End)) continue;
      if (p1Start > p1End || p2Start > p2End) continue;

      // Overlap condition: max(start1, start2) <= min(end1, end2)
      const overlapStart = Math.max(p1Start, p2Start);
      const overlapEnd = Math.min(p1End, p2End);

      if (overlapStart <= overlapEnd) {
        const startStr = new Date(overlapStart).toISOString().split("T")[0];
        const endStr = new Date(overlapEnd).toISOString().split("T")[0];
        warnings.push({
          category: p1.category,
          policy1: p1,
          policy2: p2,
          overlapPeriod: `${startStr} → ${endStr}`,
        });
      }
    }
  }

  return warnings;
}

export interface PortfolioSummaryStats {
  totalPolicies: number;
  categoryCounts: Record<PortfolioCategory, number>;
  policiesWithMissingInfo: number;
  expiringSoonCount: number; // <= 30 days
  expiredCount: number;
  needsReviewCount: number;
  overlapCount: number;
}

export function generatePortfolioSummaryStats(policies: PortfolioPolicy[]): PortfolioSummaryStats {
  const categoryCounts: Record<PortfolioCategory, number> = {
    rca: 0,
    casco: 0,
    home: 0,
    life: 0,
    health: 0,
    travel: 0,
    business: 0,
    professional_liability: 0,
    private_client: 0,
    other: 0,
  };

  let policiesWithMissingInfo = 0;
  let expiringSoonCount = 0;
  let expiredCount = 0;
  let needsReviewCount = 0;

  for (const policy of policies) {
    categoryCounts[policy.category] = (categoryCounts[policy.category] || 0) + 1;

    const missing = getMissingPolicyFields(policy);
    if (missing.length > 0) {
      policiesWithMissingInfo++;
    }

    const expiry = getPolicyExpiryStatus(policy.expiryDate);
    if (expiry.status === "expired") {
      expiredCount++;
    } else if (expiry.status === "urgent_7_days" || expiry.status === "upcoming_30_days") {
      expiringSoonCount++;
    }

    if (
      policy.reviewStatus === "needs_review" ||
      policy.reviewStatus === "info_requested" ||
      policy.reviewStatus === "advisor_pending"
    ) {
      needsReviewCount++;
    }
  }

  const overlaps = detectCategoryOverlaps(policies);

  return {
    totalPolicies: policies.length,
    categoryCounts,
    policiesWithMissingInfo,
    expiringSoonCount,
    expiredCount,
    needsReviewCount,
    overlapCount: overlaps.length,
  };
}

export function validateImportedPortfolio(json: unknown): {
  valid: boolean;
  data?: PortfolioMapExportData;
  error?: string;
} {
  if (!json || typeof json !== "object") {
    return { valid: false, error: "Fișierul JSON este invalid sau gol." };
  }

  const obj = json as Record<string, unknown>;

  if (obj.schemaVersion !== "1.0") {
    return { valid: false, error: "Versiunea schemei JSON nu este suportată (este necesară 1.0)." };
  }

  if (!Array.isArray(obj.policies)) {
    return { valid: false, error: "Câmpul 'policies' lipsește sau nu este o listă." };
  }

  if (obj.policies.length > 200) {
    return { valid: false, error: "Numărul de polițe depășește limita permisă de siguranță (200)." };
  }

  const validCategories: PortfolioCategory[] = [
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

  const validStatuses: PortfolioReviewStatus[] = [
    "needs_review",
    "info_requested",
    "reviewed_by_user",
    "advisor_pending",
  ];

  const sanitizedPolicies: PortfolioPolicy[] = [];

  for (let i = 0; i < obj.policies.length; i++) {
    const p = obj.policies[i] as Record<string, unknown>;
    if (!p || typeof p !== "object") {
      return { valid: false, error: `Polița la indexul ${i} nu are o structură validă.` };
    }

    if (typeof p.nickname !== "string" || !p.nickname.trim()) {
      return { valid: false, error: `Polița la indexul ${i} nu are o denumire (nickname) validă.` };
    }

    if (typeof p.category !== "string" || !validCategories.includes(p.category as PortfolioCategory)) {
      return { valid: false, error: `Polița "${p.nickname}" are o categorie invalidă.` };
    }

    const reviewStatus =
      typeof p.reviewStatus === "string" && validStatuses.includes(p.reviewStatus as PortfolioReviewStatus)
        ? (p.reviewStatus as PortfolioReviewStatus)
        : "needs_review";

    sanitizedPolicies.push({
      id: typeof p.id === "string" && p.id.trim() ? p.id.slice(0, 50) : `pol_${Date.now()}_${i}`,
      nickname: String(p.nickname).trim().slice(0, 100),
      category: p.category as PortfolioCategory,
      insurer: typeof p.insurer === "string" ? p.insurer.trim().slice(0, 100) : undefined,
      productName: typeof p.productName === "string" ? p.productName.trim().slice(0, 100) : undefined,
      startDate: typeof p.startDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(p.startDate) ? p.startDate : undefined,
      expiryDate: typeof p.expiryDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(p.expiryDate) ? p.expiryDate : undefined,
      premiumAmount: typeof p.premiumAmount === "number" && !isNaN(p.premiumAmount) && p.premiumAmount >= 0 ? p.premiumAmount : undefined,
      currency: typeof p.currency === "string" ? (p.currency as CurrencyCode) : undefined,
      paymentFrequency: typeof p.paymentFrequency === "string" ? (p.paymentFrequency as PaymentFrequency) : undefined,
      coverageLimit: typeof p.coverageLimit === "number" && !isNaN(p.coverageLimit) && p.coverageLimit >= 0 ? p.coverageLimit : undefined,
      limitCurrency: typeof p.limitCurrency === "string" ? (p.limitCurrency as CurrencyCode) : undefined,
      limitBasis: typeof p.limitBasis === "string" ? p.limitBasis.trim().slice(0, 200) : undefined,
      deductible: typeof p.deductible === "number" && !isNaN(p.deductible) && p.deductible >= 0 ? p.deductible : undefined,
      deductibleCurrency: typeof p.deductibleCurrency === "string" ? (p.deductibleCurrency as CurrencyCode) : undefined,
      deductibleBasis: typeof p.deductibleBasis === "string" ? p.deductibleBasis.trim().slice(0, 200) : undefined,
      declaredProtection: typeof p.declaredProtection === "string" ? p.declaredProtection.trim().slice(0, 500) : undefined,
      exclusions: typeof p.exclusions === "string" ? p.exclusions.trim().slice(0, 1000) : undefined,
      notes: typeof p.notes === "string" ? p.notes.trim().slice(0, 1000) : undefined,
      reviewStatus,
      reviewNote: typeof p.reviewNote === "string" ? p.reviewNote.trim().slice(0, 500) : undefined,
      lastReviewedDate: typeof p.lastReviewedDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(p.lastReviewedDate) ? p.lastReviewedDate : undefined,
      createdAt: typeof p.createdAt === "string" ? p.createdAt : new Date().toISOString(),
      updatedAt: typeof p.updatedAt === "string" ? p.updatedAt : new Date().toISOString(),
    });
  }

  return {
    valid: true,
    data: {
      schemaVersion: "1.0",
      exportedAt: typeof obj.exportedAt === "string" ? obj.exportedAt : new Date().toISOString(),
      userNotes: typeof obj.userNotes === "string" ? obj.userNotes.trim().slice(0, 1000) : undefined,
      policies: sanitizedPolicies,
    },
  };
}

export function generatePortfolioMapPdf(exportData: PortfolioMapExportData): void {
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
    doc.text("Harta Portofoliului & Inventar Acoperiri Declaraționale", margin, 18);

    doc.setFontSize(8);
    doc.setTextColor(120, 135, 150);
    const dateStr = new Date(exportData.exportedAt || Date.now()).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.text(`Generat: ${dateStr}${isContinuation ? " (Continuare)" : ""}`, pageWidth - margin, 18, { align: "right" });

    currentY = 34;
  }

  drawHeader(false);

  // Stats Box
  const stats = generatePortfolioSummaryStats(exportData.policies);
  doc.setFillColor(245, 247, 250);
  doc.setDrawColor(220, 225, 230);
  doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2, "FD");

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("SUMAR PORTOFOLIU DECLARAT", margin + 4, currentY + 7);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`• Total polițe înregistrate: ${stats.totalPolicies}`, margin + 4, currentY + 13);
  doc.text(`• Polițe cu detalii lipsă: ${stats.policiesWithMissingInfo}`, margin + 4, currentY + 18);

  doc.text(`• Expiră în < 30 zile: ${stats.expiringSoonCount}`, margin + 65, currentY + 13);
  doc.text(`• Polițe expirate: ${stats.expiredCount}`, margin + 65, currentY + 18);

  doc.text(`• Necesită revizuire: ${stats.needsReviewCount}`, margin + 125, currentY + 13);
  doc.text(`• Suprapuneri identificate: ${stats.overlapCount}`, margin + 125, currentY + 18);

  currentY += 30;

  // Overlap warnings if any
  const overlaps = detectCategoryOverlaps(exportData.policies);
  if (overlaps.length > 0) {
    ensureSpace(20 + overlaps.length * 8);
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(245, 158, 11);
    doc.roundedRect(margin, currentY, contentWidth, 12 + overlaps.length * 6, 2, 2, "FD");

    doc.setTextColor(146, 64, 14);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("AVERTIZĂRI DE SUPRAPUNERE ÎN INTERVALUL DECLARAT", margin + 4, currentY + 6);

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    let oY = currentY + 11;
    for (const o of overlaps) {
      const catLabel = CATEGORY_INFO[o.category]?.labelRo || o.category;
      doc.text(
        `• Categorie ${catLabel}: "${o.policy1.nickname}" și "${o.policy2.nickname}" (${o.overlapPeriod})`,
        margin + 4,
        oY
      );
      oY += 5;
    }
    currentY = oY + 4;
  }

  // Policies grouped by Category
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("INVENTAR DETALIAT POLIȚE", margin, currentY);
  currentY += 6;

  const categoriesOrder: PortfolioCategory[] = [
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

  for (const cat of categoriesOrder) {
    const catPolicies = exportData.policies.filter((p) => p.category === cat);
    if (catPolicies.length === 0) continue;

    ensureSpace(20);

    const catInfo = CATEGORY_INFO[cat];
    doc.setFillColor(230, 240, 255);
    doc.rect(margin, currentY, contentWidth, 6, "F");
    doc.setTextColor(29, 78, 216);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(`${catInfo.labelRo.toUpperCase()} (${catPolicies.length} ${catPolicies.length === 1 ? "înregistrare" : "înregistrări"})`, margin + 2, currentY + 4.5);
    currentY += 9;

    for (const policy of catPolicies) {
      const missing = getMissingPolicyFields(policy);
      const expiry = getPolicyExpiryStatus(policy.expiryDate);
      const statusInfo = REVIEW_STATUS_INFO[policy.reviewStatus];

      const rowHeight = 24 + (missing.length > 0 ? 5 : 0) + (policy.notes ? 5 : 0);
      ensureSpace(rowHeight);

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, currentY, contentWidth, rowHeight - 2, 1, 1, "FD");

      // Title & Insurer
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text(policy.nickname, margin + 3, currentY + 5);

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text(`Asigurator: ${policy.insurer || "Nespecificat"} | Produs: ${policy.productName || "Nespecificat"}`, margin + 3, currentY + 9.5);

      // Financials & Dates
      const premiumStr =
        policy.premiumAmount !== undefined
          ? `${policy.premiumAmount.toLocaleString("ro-RO")} ${policy.currency || ""}`
          : "Nespecificată";
      const limitStr = policy.coverageLimit
        ? `${policy.coverageLimit.toLocaleString("ro-RO")} ${policy.limitCurrency || ""}`
        : policy.limitBasis || "Nespecificată";
      const dedStr =
        policy.deductible !== undefined
          ? `${policy.deductible.toLocaleString("ro-RO")} ${policy.deductibleCurrency || ""}`
          : policy.deductibleBasis || "Nespecificată";

      doc.setTextColor(51, 65, 85);
      doc.setFontSize(7.5);
      doc.text(`Primă: ${premiumStr} (${policy.paymentFrequency || "frecvență nespecificată"}) | Limită: ${limitStr} | Franșiză: ${dedStr}`, margin + 3, currentY + 14);

      const datesStr = `Perioadă: ${policy.startDate || "Nedefinit"} → ${policy.expiryDate || "Nedefinit"} [${expiry.labelRo}]`;
      doc.text(datesStr, margin + 3, currentY + 18.5);

      // Status badge & Missing info
      let subY = currentY + 23;
      if (missing.length > 0) {
        doc.setTextColor(180, 83, 9);
        doc.setFontSize(7);
        doc.text(`Atenție detalii lipsă: ${missing.map((m) => m.labelRo).join(", ")}`, margin + 3, subY);
        subY += 4.5;
      }

      if (policy.notes) {
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(7);
        doc.text(`Notă: ${policy.notes.slice(0, 110)}`, margin + 3, subY);
      }

      // Review status on right
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(`Status: ${statusInfo.labelRo}`, pageWidth - margin - 3, currentY + 5, { align: "right" });

      currentY += rowHeight;
    }

    currentY += 3;
  }

  // Disclaimer and Footer
  ensureSpace(28);
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, currentY, contentWidth, 22, 1, 1, "FD");

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text(
    "NOTĂ LEGALĂ: Acest document reprezintă un inventar structurat bazat exclusiv pe datele introduse manual de către utilizator.",
    margin + 3,
    currentY + 5
  );
  doc.text(
    "Nu constituie o verificare de către asigurator, audit juridic sau confirmare oficială a valabilității acoperirii.",
    margin + 3,
    currentY + 9
  );
  doc.text(
    "Pentru confirmarea drepturilor la despăgubire și a termenilor contractuali, consultați textul oficial al polițelor emise.",
    margin + 3,
    currentY + 13
  );
  doc.text(
    "Consultanță specializată: Cristian Văduva | Telefon / WhatsApp: 0767 110 439 | Email: contact@cristianvaduva.com",
    margin + 3,
    currentY + 18
  );

  doc.save(`harta-portofoliu-asigurari-${new Date().toISOString().split("T")[0]}.pdf`);
}
