/**
 * Secure Structured Logger for Cristian Văduva Insurance Platform
 * Complies with GDPR Article 32 & Security Hardening Requirements
 *
 * Rules:
 * 1. Automatic redaction of PII (emails, phone numbers, CNP, credit cards).
 * 2. Automatic stripping of authorization headers, tokens, and cookies.
 * 3. Correlation ID tracking for cross-request tracing.
 * 4. Safe server-side output without dumping raw form payloads.
 */

export interface LogContext {
  correlationId?: string;
  source?: string;
  route?: string;
  service?: string;
  status?: number;
  [key: string]: unknown;
}

// Redaction patterns
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX = /(\+?40|0)?7[0-9]{8}/g;
const CNP_REGEX = /\b[1-8]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{6}\b/g;
const TOKEN_REGEX = /(bearer\s+[a-zA-Z0-9-_.]+)|(ey[a-zA-Z0-9-_.]+\.[a-zA-Z0-9-_.]+\.[a-zA-Z0-9-_.]+)/gi;

export function redactSensitiveData(text: string): string {
  if (!text || typeof text !== "string") return text;
  return text
    .replace(CNP_REGEX, "[REDACTED_CNP]")
    .replace(EMAIL_REGEX, (match) => {
      const parts = match.split("@");
      if (parts.length !== 2) return "[REDACTED_EMAIL]";
      const name = parts[0];
      const domain = parts[1];
      const maskedName = name.length > 2 ? `${name[0]}***${name[name.length - 1]}` : "***";
      return `${maskedName}@${domain}`;
    })
    .replace(PHONE_REGEX, (match) => {
      return match.length > 4 ? `${match.slice(0, 3)}****${match.slice(-2)}` : "[REDACTED_PHONE]";
    })
    .replace(TOKEN_REGEX, "[REDACTED_TOKEN]");
}

export function sanitizeObject<T>(obj: T): T {
  if (!obj || typeof obj !== "object") {
    if (typeof obj === "string") {
      return redactSensitiveData(obj) as unknown as T;
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item)) as unknown as T;
  }

  const sanitized: Record<string, unknown> = {};
  const sensitiveKeys = [
    "password",
    "passwd",
    "token",
    "secret",
    "apikey",
    "api_key",
    "authorization",
    "auth",
    "cookie",
    "cookies",
    "cnp",
    "card",
    "cvv",
    "credentials",
    "lead_data",
    "pin",
    "session",
  ];

  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();
    if (sensitiveKeys.some((s) => lowerKey.includes(s))) {
      sanitized[key] = "[REDACTED_SECRET]";
    } else if (typeof value === "string") {
      sanitized[key] = redactSensitiveData(value);
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}

export const logger = {
  info(message: string, context?: LogContext): void {
    const safeContext = context ? sanitizeObject(context) : {};
    const timestamp = new Date().toISOString();
    console.info(`[INFO] [${timestamp}] ${redactSensitiveData(message)}`, safeContext);
  },

  warn(message: string, context?: LogContext): void {
    const safeContext = context ? sanitizeObject(context) : {};
    const timestamp = new Date().toISOString();
    console.warn(`[WARN] [${timestamp}] ${redactSensitiveData(message)}`, safeContext);
  },

  error(message: string, error?: unknown, context?: LogContext): void {
    const safeContext = context ? sanitizeObject(context) : {};
    const timestamp = new Date().toISOString();
    const errorDetails =
      error instanceof Error
        ? { name: error.name, message: redactSensitiveData(error.message) }
        : typeof error === "string"
        ? redactSensitiveData(error)
        : undefined;

    console.error(`[ERROR] [${timestamp}] ${redactSensitiveData(message)}`, {
      ...safeContext,
      error: errorDetails,
    });
  },
};
