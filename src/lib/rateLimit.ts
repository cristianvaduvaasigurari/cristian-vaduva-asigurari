/**
 * Rate Limiting & Anti-Spam Protection for Cristian Văduva Platform
 * 
 * OPERATIONAL ARCHITECTURE:
 * - Distributed Protection (Active ONLY with Upstash Redis / Vercel KV):
 *   When UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_*) are set,
 *   rate limits are synchronized globally across all serverless lambda instances and edge regions.
 * - In-Memory Fallback (Local / Single-Instance):
 *   When Upstash credentials are not set, rate limiting falls back to an in-memory Map.
 *   CRITICAL: On serverless platforms like Vercel, memory is NOT shared across lambda containers.
 *   In-memory rate limiting only throttles traffic hitting the SAME warm container. For true global
 *   protection in production under auto-scaling loads, Upstash Redis credentials are required.
 */

import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory sliding window cache for fallback
const memoryStore = new Map<string, RateLimitRecord>();

// Clean up expired keys every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, value] of memoryStore.entries()) {
      if (value.resetAt < now) {
        memoryStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
  if (cleanupTimer && typeof cleanupTimer.unref === "function") {
    cleanupTimer.unref();
  }
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export interface RateLimitOptions {
  limit?: number;
  windowMs?: number;
  /**
   * If true, failures in Upstash Redis will fail-closed (return success: false).
   * Recommended for sensitive endpoints like login and AI assistant.
   * Default: false (falls back to memory store for public lead submissions).
   */
  failClosed?: boolean;
}

/**
 * Extracts the real client IP address from a Headers instance or object with get().
 * Strips port numbers if present from proxy headers.
 */
export function getClientIpFromHeaders(headersList: { get(name: string): string | null }): string {
  const cfIp = headersList.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim().replace(/:[0-9]+$/, "");

  const xRealIp = headersList.get("x-real-ip");
  if (xRealIp) return xRealIp.trim().replace(/:[0-9]+$/, "");

  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp.replace(/:[0-9]+$/, "");
  }

  return "127.0.0.1";
}

/**
 * Extracts the real client IP address from request headers.
 */
export function getClientIp(req: Request): string {
  return getClientIpFromHeaders(req.headers);
}

/**
 * Rate limiter checking against distributed KV if configured, else in-memory store.
 * @param identifier Unique key (e.g., ip or route:ip)
 * @param limitOrOptions Max allowed requests or RateLimitOptions configuration
 * @param windowMs Time window in milliseconds (default: 60,000 = 1 minute)
 */
export async function checkRateLimit(
  identifier: string,
  limitOrOptions: number | RateLimitOptions = 5,
  windowMsParam = 60000
): Promise<RateLimitResult> {
  const options: RateLimitOptions =
    typeof limitOrOptions === "number"
      ? { limit: limitOrOptions, windowMs: windowMsParam, failClosed: false }
      : { limit: 5, windowMs: 60000, failClosed: false, ...limitOrOptions };

  const limit = options.limit ?? 5;
  const windowMs = options.windowMs ?? 60000;
  const failClosed = options.failClosed ?? false;
  const now = Date.now();

  // 1. Try distributed Upstash / Redis if available
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (redisUrl && redisToken) {
    try {
      const key = `ratelimit:${identifier}`;
      const url = `${redisUrl}/pipeline`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redisToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["PTTL", key],
        ]),
        cache: "no-store",
      });

      if (res.ok) {
        const [incrRes, pttlRes] = await res.json();
        const count = typeof incrRes?.result === "number" ? incrRes.result : 1;
        let pttl = typeof pttlRes?.result === "number" ? pttlRes.result : -1;

        if (count === 1 || pttl === -1) {
          // Set TTL on first request
          await fetch(`${redisUrl}/pexpire/${key}/${windowMs}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${redisToken}` },
            cache: "no-store",
          }).catch(() => null);
          pttl = windowMs;
        }

        const remaining = Math.max(0, limit - count);
        return {
          success: count <= limit,
          limit,
          remaining,
          reset: Math.ceil(pttl / 1000),
        };
      } else {
        logger.error(`[RateLimit] Upstash Redis returned HTTP ${res.status}`);
        if (failClosed) {
          return {
            success: false,
            limit,
            remaining: 0,
            reset: Math.ceil(windowMs / 1000),
          };
        }
      }
    } catch (redisErr) {
      logger.error("[RateLimit] Upstash Redis network error", redisErr);
      if (failClosed) {
        return {
          success: false,
          limit,
          remaining: 0,
          reset: Math.ceil(windowMs / 1000),
        };
      }
    }
  }

  // 2. High-performance In-Memory Fallback
  const record = memoryStore.get(identifier);

  if (!record || record.resetAt < now) {
    memoryStore.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: Math.ceil(windowMs / 1000),
    };
  }

  record.count += 1;
  const remaining = Math.max(0, limit - record.count);
  const resetSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000));

  return {
    success: record.count <= limit,
    limit,
    remaining,
    reset: resetSeconds,
  };
}

/**
 * Creates a standard HTTP 429 Too Many Requests response.
 */
export function createRateLimitResponse(resetSeconds: number): NextResponse {
  return NextResponse.json(
    {
      ok: false,
      success: false,
      error: "Prea multe solicitări. Te rugăm să aștepți un minut înainte de a reîncerca.",
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(resetSeconds),
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}
