import { NextResponse } from "next/server";
import { checkRateLimit, createRateLimitResponse, getClientIp } from "@/lib/rateLimit";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * API endpoint for high‑intent visitor telemetry events.
 * It receives sanitized telemetry and logs it securely without exposing an open Telegram relay.
 */
export async function POST(request: Request) {
  const correlationId = crypto.randomUUID();
  const clientIp = getClientIp(request);

  // Rate Limiting: 20 visitor events per minute per IP
  const rateLimitResult = await checkRateLimit(`visitor:${clientIp}`, 20, 60000);
  if (!rateLimitResult.success) {
    return createRateLimitResponse(rateLimitResult.reset);
  }

  try {
    const body = await request.json();

    // Strict validation: /api/visitor is exclusively for page_view telemetry.
    // Arbitrary message or contact injection is strictly forbidden to prevent Telegram spam relay.
    if (!body || typeof body !== "object" || body.type !== "page_view") {
      return NextResponse.json(
        { success: false, error: "Invalid telemetry event" },
        {
          status: 400,
          headers: { "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate" },
        }
      );
    }

    const rawUrl = typeof body.url === "string" ? body.url : typeof body.pageUrl === "string" ? body.pageUrl : "";
    const pathname = typeof body.pathname === "string" ? body.pathname.slice(0, 100) : "";
    const referrer = typeof body.referrer === "string" ? body.referrer.slice(0, 200) : "";

    logger.info("High-intent visitor telemetry recorded", {
      correlationId,
      pathname,
      hasReferrer: Boolean(referrer),
    });

    return NextResponse.json(
      { success: true, correlationId },
      {
        status: 200,
        headers: { "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate" },
      }
    );
  } catch (err) {
    logger.error("Error processing visitor event payload", err, { correlationId });
    return NextResponse.json(
      { success: false, error: "Invalid payload" },
      {
        status: 400,
        headers: { "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate" },
      }
    );
  }
}
