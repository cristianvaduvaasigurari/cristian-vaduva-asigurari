import { NextResponse } from "next/server";
import { sendTelegramAlert } from "@/lib/telegram";
import type { TelegramLeadData } from "@/lib/telegram";
import { checkRateLimit, createRateLimitResponse, getClientIp } from "@/lib/rateLimit";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * API endpoint for high‑intent visitor events.
 * It receives minimal data and forwards a Telegram alert.
 * The response is returned immediately; Telegram sending is fire‑and‑forget.
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
    const data: TelegramLeadData = await request.json();

    logger.info("High-intent visitor event received", {
      correlationId,
      service: data.service,
      pageUrl: data.pageUrl,
    });

    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      logger.warn("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID", { correlationId });
    }

    sendTelegramAlert(data)
      .then((sent) => {
        logger.info("Telegram visitor alert sent", { correlationId, success: sent });
      })
      .catch((e) => {
        logger.error("Telegram visitor notification failed", e, { correlationId });
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
