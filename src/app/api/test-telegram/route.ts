import { NextResponse } from 'next/server';
import { sendTelegramAlert } from '@/lib/telegram';
import type { TelegramLeadData } from '@/lib/telegram';
import { checkRateLimit, createRateLimitResponse, getClientIp } from '@/lib/rateLimit';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

/**
 * GET /api/test-telegram
 * Strictly restricted to development / diagnostic environments.
 */
export async function GET(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Endpoint not available in production' },
      { status: 404, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const clientIp = getClientIp(req);
  const rateLimitResult = await checkRateLimit(`test-tg:${clientIp}`, 3, 60000);
  if (!rateLimitResult.success) {
    return createRateLimitResponse(rateLimitResult.reset);
  }

  const correlationId = crypto.randomUUID();
  logger.info('Test telegram route triggered in development', { correlationId });

  const testData: TelegramLeadData = {
    name: 'Test Diagnostics',
    phone: '0700000000',
    service: 'Test Diagnostics',
    message: `TEST Telegram notification - ID: ${correlationId}`,
    timestamp: new Date().toISOString(),
  };

  const success = await sendTelegramAlert(testData);
  const status = success ? 200 : 500;
  return NextResponse.json(
    { success, correlationId },
    { status, headers: { 'Cache-Control': 'no-store' } }
  );
}
