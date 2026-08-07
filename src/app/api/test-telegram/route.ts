import { NextResponse } from 'next/server';
import { sendTelegramAlert } from '@/lib/telegram';
import type { TelegramLeadData } from '@/lib/telegram';

/**
 * GET /api/test-telegram
 * Sends a test Telegram notification and returns the Telegram response status.
 */
export async function GET() {
  console.log('[Test Telegram] sending test notification');
  const testData: TelegramLeadData = {
    name: 'Test',
    phone: '',
    service: 'Test Notification',
    message: 'TEST Telegram notification from cristian-vaduva-premium',
    timestamp: new Date().toISOString(),
  };
  const success = await sendTelegramAlert(testData);
  console.log('[Test Telegram] success:', success);
  const status = success ? 200 : 500;
  return NextResponse.json({ success, status }, { status });
}
