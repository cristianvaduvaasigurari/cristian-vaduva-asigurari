export type PolicyCategory =
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

export interface PolicyEntry {
  id: string;
  nickname: string;
  category: PolicyCategory;
  insurer: string;
  policyNumber?: string;
  startDate?: string; // YYYY-MM-DD
  expiryDate: string; // YYYY-MM-DD
  premiumAmount?: number;
  currency?: "RON" | "EUR";
  paymentFrequency?: "annual" | "semiannual" | "quarterly" | "monthly";
  notes?: string;
  requestReview?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type RenewalWindow =
  | "expired"
  | "urgent_7_days"
  | "upcoming_30_days"
  | "upcoming_60_days"
  | "future_60_plus"
  | "no_date";

export function getRenewalWindow(expiryDateStr?: string): RenewalWindow {
  if (!expiryDateStr) return "no_date";

  const parts = expiryDateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return "no_date";

  const [year, month, day] = parts;
  const expiryDate = new Date(year, month - 1, day, 23, 59, 59);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffMs = expiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "expired";
  if (diffDays <= 7) return "urgent_7_days";
  if (diffDays <= 30) return "upcoming_30_days";
  if (diffDays <= 60) return "upcoming_60_days";
  return "future_60_plus";
}

export function getDaysUntilExpiry(expiryDateStr?: string): number | null {
  if (!expiryDateStr) return null;
  const parts = expiryDateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;

  const [year, month, day] = parts;
  const expiryDate = new Date(year, month - 1, day, 23, 59, 59);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffMs = expiryDate.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export const CATEGORY_LABELS_RO: Record<PolicyCategory, string> = {
  rca: "RCA (Răspundere Auto)",
  casco: "CASCO Auto",
  home: "Locuință & PAD",
  life: "Viață & Planificare",
  health: "Sănătate Privată",
  travel: "Călătorii & Asistență",
  business: "Business & Clădiri B2B",
  professional_liability: "Răspundere Profesională / D&O",
  private_client: "Private Client & Luxury Assets",
  other: "Altă Asigurare",
};

export const CATEGORY_LABELS_EN: Record<PolicyCategory, string> = {
  rca: "RCA (Motor Third Party)",
  casco: "CASCO Comprehensive Auto",
  home: "Home & Property / PAD",
  life: "Life & Financial Protection",
  health: "Private Health Insurance",
  travel: "Travel & Medical Assistance",
  business: "Commercial Property & B2B",
  professional_liability: "Professional Indemnity / D&O",
  private_client: "Private Client & Luxury Assets",
  other: "Other Insurance",
};

/**
 * Generates standard RFC 5545 iCalendar (.ics) format string.
 */
export function generateIcsCalendar(policies: PolicyEntry[], lang: "ro" | "en" = "ro"): string {
  const isRo = lang === "ro";
  const now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const events = policies
    .filter((p) => p.expiryDate)
    .map((p) => {
      const parts = p.expiryDate.split("-").map(Number);
      if (parts.length !== 3) return "";

      const [y, m, d] = parts;
      const dateStr = `${y}${String(m).padStart(2, "0")}${String(d).padStart(2, "0")}`;

      const categoryLabel = isRo ? CATEGORY_LABELS_RO[p.category] : CATEGORY_LABELS_EN[p.category];
      const summary = `${isRo ? "Reînnoire Poliță" : "Policy Renewal"}: ${p.nickname} (${p.insurer || "Asigurator"})`;
      const description = [
        `${isRo ? "Categorie" : "Category"}: ${categoryLabel}`,
        p.insurer ? `${isRo ? "Asigurator" : "Insurer"}: ${p.insurer}` : null,
        p.premiumAmount ? `${isRo ? "Primă estimată" : "Estimated Premium"}: ${p.premiumAmount} ${p.currency || "RON"}` : null,
        p.notes ? `${isRo ? "Notițe" : "Notes"}: ${p.notes}` : null,
        `\n${isRo ? "Ghid reînnoire & consultanță" : "Advisory & Renewal Review"}: https://insurance.cristianvaduva.com/verifica-polita`,
        `${isRo ? "Consultanță broker" : "Advisory Contact"}: 0767 110 439`,
      ]
        .filter(Boolean)
        .join("\\n");

      return [
        "BEGIN:VEVENT",
        `UID:cv-policy-renewal-${p.id}@insurance.cristianvaduva.com`,
        `DTSTAMP:${now}`,
        `DTSTART;VALUE=DATE:${dateStr}`,
        `DTEND;VALUE=DATE:${dateStr}`,
        `SUMMARY:${summary}`,
        `DESCRIPTION:${description}`,
        "STATUS:CONFIRMED",
        "BEGIN:VALARM",
        "TRIGGER:-P14D",
        "ACTION:DISPLAY",
        `DESCRIPTION:${isRo ? "Reamintire: Polița expiră în 14 zile" : "Reminder: Policy expires in 14 days"}`,
        "END:VALARM",
        "BEGIN:VALARM",
        "TRIGGER:-P7D",
        "ACTION:DISPLAY",
        `DESCRIPTION:${isRo ? "Reamintire: Polița expiră în 7 zile" : "Reminder: Policy expires in 7 days"}`,
        "END:VALARM",
        "END:VEVENT",
      ].join("\r\n");
    })
    .filter(Boolean)
    .join("\r\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Cristian Vaduva Asigurari//Insurance Renewal Planner//RO",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${isRo ? "Calendar Reînnoiri Asigurări — Cristian Văduva" : "Insurance Renewals — Cristian Vaduva"}`,
    events,
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Validates a JSON imported backup.
 */
export function validateImportedPortfolio(jsonStr: string): {
  isValid: boolean;
  error?: string;
  policies?: PolicyEntry[];
} {
  try {
    const parsed = JSON.parse(jsonStr);

    if (!parsed || typeof parsed !== "object") {
      return { isValid: false, error: "Fișierul JSON este invalid sau corupt." };
    }

    const list = Array.isArray(parsed) ? parsed : parsed.policies;

    if (!Array.isArray(list)) {
      return { isValid: false, error: "Structura JSON nu conține o listă validă de polițe." };
    }

    const validPolicies: PolicyEntry[] = [];

    for (const item of list) {
      if (!item || typeof item !== "object") continue;
      if (!item.nickname || typeof item.nickname !== "string") continue;
      if (!item.expiryDate || typeof item.expiryDate !== "string") continue;

      const validCategory: PolicyCategory = [
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
      ].includes(item.category)
        ? item.category
        : "other";

      validPolicies.push({
        id: typeof item.id === "string" ? item.id : `pol_${Math.random().toString(36).substring(2, 9)}`,
        nickname: String(item.nickname).slice(0, 100),
        category: validCategory,
        insurer: String(item.insurer || "").slice(0, 100),
        policyNumber: item.policyNumber ? String(item.policyNumber).slice(0, 100) : undefined,
        startDate: item.startDate ? String(item.startDate).slice(0, 10) : undefined,
        expiryDate: String(item.expiryDate).slice(0, 10),
        premiumAmount: typeof item.premiumAmount === "number" && !isNaN(item.premiumAmount) ? item.premiumAmount : undefined,
        currency: item.currency === "EUR" ? "EUR" : "RON",
        paymentFrequency: ["annual", "semiannual", "quarterly", "monthly"].includes(item.paymentFrequency)
          ? item.paymentFrequency
          : "annual",
        notes: item.notes ? String(item.notes).slice(0, 500) : undefined,
        requestReview: Boolean(item.requestReview),
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: item.updatedAt || new Date().toISOString(),
      });
    }

    if (validPolicies.length === 0) {
      return { isValid: false, error: "Nu a fost găsită nicio înregistrare validă de poliță în fișier." };
    }

    return { isValid: true, policies: validPolicies };
  } catch {
    return { isValid: false, error: "Format JSON neconform sau fișier corupt." };
  }
}
