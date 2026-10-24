/**
 * Form Input Validation & Sanitization
 * Complies with OWASP Top 10 & GDPR data minimization principles.
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedValue?: string;
}

/**
 * Strips HTML tags and excessive whitespace to prevent stored XSS.
 */
export function sanitizeText(text: string): string {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/<[^>]*>/g, "") // strip all HTML tags
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uD800-\uDFFF]/g, "") // strip control chars
    .trim();
}

/**
 * Validates Romanian and international phone numbers.
 */
export function validatePhone(phone: string): ValidationResult {
  const sanitized = sanitizeText(phone).replace(/[\s.-]/g, "");
  if (!sanitized) {
    return { isValid: false, error: "Numărul de telefon este obligatoriu." };
  }

  // Allow +40..., 07..., 0040..., or international +[1-9][0-9]{7,14}
  const phoneRegex = /^(\+?[0-9]{8,15})$/;
  if (!phoneRegex.test(sanitized)) {
    return {
      isValid: false,
      error: "Formatul numărului de telefon nu este valid. Exemplu: 0722123456 sau +40722123456.",
    };
  }

  return { isValid: true, sanitizedValue: sanitized };
}

/**
 * Validates email address format.
 */
export function validateEmail(email: string, required = false): ValidationResult {
  const sanitized = sanitizeText(email).toLowerCase();
  if (!sanitized) {
    if (required) {
      return { isValid: false, error: "Adresa de email este obligatorie." };
    }
    return { isValid: true, sanitizedValue: "" };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(sanitized) || sanitized.length > 120) {
    return {
      isValid: false,
      error: "Adresa de email introdusă nu este validă.",
    };
  }

  return { isValid: true, sanitizedValue: sanitized };
}

/**
 * Validates client name.
 */
export function validateName(name: string, required = false): ValidationResult {
  const sanitized = sanitizeText(name);
  if (!sanitized) {
    if (required) {
      return { isValid: false, error: "Numele este obligatoriu." };
    }
    return { isValid: true, sanitizedValue: "Anonim" };
  }

  if (sanitized.length < 2 || sanitized.length > 100) {
    return {
      isValid: false,
      error: "Numele trebuie să aibă între 2 și 100 de caractere.",
    };
  }

  return { isValid: true, sanitizedValue: sanitized };
}

/**
 * Validates message / inquiry description.
 */
export function validateMessage(message: string, maxLength = 2000): ValidationResult {
  const sanitized = sanitizeText(message);
  if (sanitized.length > maxLength) {
    return {
      isValid: false,
      error: `Mesajul depășește lungimea maximă admisă de ${maxLength} de caractere.`,
    };
  }
  return { isValid: true, sanitizedValue: sanitized };
}

/**
 * Anti-spam honeypot detection.
 */
export function isHoneypotTriggered(honeypotValue: unknown): boolean {
  if (typeof honeypotValue === "string" && honeypotValue.trim().length > 0) {
    return true;
  }
  return false;
}
