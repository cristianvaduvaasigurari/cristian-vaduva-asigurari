/**
 * Sentry & Error Monitoring Integration
 * Designed for Next.js App Router with strict GDPR & PII redaction.
 *
 * Requirements:
 * - Scrubber for CNP, passwords, tokens, auth headers, credit cards, emails, phone numbers.
 * - correlationId injection on every event.
 * - Operates safely without crashing if SENTRY_DSN is not configured.
 */

import { logger, redactSensitiveData, sanitizeObject } from "./logger";

export interface ErrorContext {
  correlationId?: string;
  route?: string;
  action?: string;
  extra?: Record<string, unknown>;
}

/**
 * Filter and redact event payload before dispatching.
 */
export function sanitizeEventPayload(event: Record<string, unknown>): Record<string, unknown> {
  const sanitized = sanitizeObject(event);

  // Explicitly remove request headers, cookies, query string, and form data
  if (sanitized.request && typeof sanitized.request === "object") {
    const req = { ...(sanitized.request as Record<string, unknown>) };
    delete req.cookies;
    delete req.headers;
    delete req.data; // never send raw form body or lead data
    delete req.query_string;
    sanitized.request = req;
  }

  // Redact user context to prevent transmitting PII (IP, email, username, phone)
  if (sanitized.user && typeof sanitized.user === "object") {
    const user = { ...(sanitized.user as Record<string, unknown>) };
    delete user.email;
    delete user.ip_address;
    delete user.username;
    delete user.phone;
    sanitized.user = user;
  }

  // Scrub breadcrumbs
  if (Array.isArray(sanitized.breadcrumbs)) {
    sanitized.breadcrumbs = sanitized.breadcrumbs.map((crumb) => {
      if (crumb && typeof crumb === "object") {
        const c = { ...(crumb as Record<string, unknown>) };
        delete c.data;
        if (typeof c.message === "string") {
          c.message = redactSensitiveData(c.message);
        }
        return c;
      }
      return crumb;
    });
  }

  return sanitized;
}

export interface SentryEndpoint {
  storeUrl: string;
  publicKey: string;
}

/**
 * Parses standard Sentry DSN into store endpoint and public key.
 * Format: https://{PUBLIC_KEY}@{HOST}/{PROJECT_ID}
 */
export function parseSentryDsn(dsn: string): SentryEndpoint | null {
  try {
    const url = new URL(dsn);
    const publicKey = url.username;
    const projectId = url.pathname.replace(/^\//, "");
    if (!publicKey || !projectId) return null;
    return {
      storeUrl: `${url.protocol}//${url.host}/api/${projectId}/store/`,
      publicKey,
    };
  } catch {
    return null;
  }
}

/**
 * Captures an exception with PII protection and correlation ID.
 */
export function captureException(error: unknown, context?: ErrorContext): string {
  const correlationId = context?.correlationId || (typeof crypto !== "undefined" ? crypto.randomUUID() : `err_${Date.now()}`);
  const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

  // Log locally via our secure logger
  logger.error(
    `[Monitoring] Exception captured (correlationId: ${correlationId})`,
    error,
    {
      correlationId,
      route: context?.route,
      action: context?.action,
      extra: context?.extra,
    }
  );

  // If SENTRY_DSN is configured, dispatch event via Sentry Store API
  if (dsn && dsn.startsWith("https://")) {
    try {
      const sentryInfo = parseSentryDsn(dsn);
      if (sentryInfo) {
        const sanitizedMessage = error instanceof Error ? redactSensitiveData(error.message) : "Unknown Error";
        const stack = error instanceof Error ? redactSensitiveData(error.stack || "") : undefined;

        const payload = sanitizeEventPayload({
          event_id: correlationId.replace(/-/g, ""),
          timestamp: new Date().toISOString(),
          platform: "javascript",
          level: "error",
          exception: {
            values: [
              {
                type: error instanceof Error ? error.name : "Error",
                value: sanitizedMessage,
                stacktrace: stack ? { frames: [] } : undefined,
              },
            ],
          },
          tags: {
            correlationId,
            environment: process.env.NODE_ENV || "production",
            route: context?.route || "unknown",
          },
        });

        // Fire and forget send to Sentry Store API
        fetch(sentryInfo.storeUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Sentry-Auth": `Sentry sentry_version=7, sentry_client=custom-nextjs-hardened/1.0, sentry_key=${sentryInfo.publicKey}`,
          },
          body: JSON.stringify(payload),
        }).catch(() => null);
      }
    } catch {
      // Suppress network dispatch errors
    }
  }

  return correlationId;
}

/**
 * Captures a structured monitoring message.
 */
export function captureMessage(message: string, context?: ErrorContext): string {
  const correlationId = context?.correlationId || (typeof crypto !== "undefined" ? crypto.randomUUID() : `msg_${Date.now()}`);
  logger.info(`[Monitoring] ${message}`, { correlationId, ...context });
  return correlationId;
}
