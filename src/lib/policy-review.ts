import crypto from "crypto";

export type PolicyCategory = "auto" | "home" | "health" | "business" | "private-client";

export interface PolicyReviewInput {
  category: PolicyCategory;
  reviewGoal: string;
  currentInsurer?: string;
  expiryTimeline?: string;
  clientNotes?: string;
  name: string;
  phone: string;
  email?: string;
  preferredContact: "whatsapp" | "phone" | "email";
  language: "ro" | "en";
  consent: boolean;
}

export interface PolicyReviewValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitizedData?: PolicyReviewInput;
}

const VALID_CATEGORIES: PolicyCategory[] = ["auto", "home", "health", "business", "private-client"];
const VALID_CONTACT_METHODS = ["whatsapp", "phone", "email"];

/**
 * Validates policy review form input server-side.
 */
export function validatePolicyReviewInput(raw: Record<string, unknown>): PolicyReviewValidationResult {
  const errors: Record<string, string> = {};

  const category = (typeof raw.category === "string" ? raw.category.trim().toLowerCase() : "") as PolicyCategory;
  if (!VALID_CATEGORIES.includes(category)) {
    errors.category = "Selectează o categorie validă de asigurare.";
  }

  const reviewGoal = typeof raw.reviewGoal === "string" ? raw.reviewGoal.trim() : "";
  if (!reviewGoal || reviewGoal.length < 3) {
    errors.reviewGoal = "Selectează sau precizează obiectivul verificării.";
  }

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  if (!name || name.length < 2 || name.length > 100) {
    errors.name = "Introdu numele complet (minim 2 caractere).";
  }

  const phone = typeof raw.phone === "string" ? raw.phone.trim().replace(/[\s.-]/g, "") : "";
  if (!phone || phone.length < 9 || phone.length > 20 || !/^\+?[0-9]+$/.test(phone)) {
    errors.phone = "Introdu un număr de telefon valid.";
  }

  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  if (email && (email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    errors.email = "Adresa de email nu are un format valid.";
  }

  const preferredContact = (typeof raw.preferredContact === "string" ? raw.preferredContact.trim().toLowerCase() : "phone") as "whatsapp" | "phone" | "email";
  if (!VALID_CONTACT_METHODS.includes(preferredContact)) {
    errors.preferredContact = "Selectează o metodă de contact validă.";
  }

  const language = raw.language === "en" ? "en" : "ro";

  const consent = Boolean(raw.consent);
  if (!consent) {
    errors.consent = "Este necesar acordul pentru prelucrarea datelor de contact.";
  }

  const currentInsurer = typeof raw.currentInsurer === "string" ? raw.currentInsurer.trim().slice(0, 100) : "";
  const expiryTimeline = typeof raw.expiryTimeline === "string" ? raw.expiryTimeline.trim().slice(0, 100) : "";
  const clientNotes = typeof raw.clientNotes === "string" ? raw.clientNotes.trim().slice(0, 1000) : "";

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: {},
    sanitizedData: {
      category,
      reviewGoal: reviewGoal.slice(0, 200),
      currentInsurer,
      expiryTimeline,
      clientNotes,
      name,
      phone,
      email,
      preferredContact,
      language,
      consent,
    },
  };
}

/**
 * Generates an unpredictable, cryptographically safe reference ID.
 * Example format: REV-20261009-A7F9C2
 */
export function generatePolicyReviewReference(): string {
  const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `REV-${datePrefix}-${randomSuffix}`;
}
