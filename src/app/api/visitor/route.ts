import { NextResponse } from 'next/server';
import { sendTelegramAlert } from '@/lib/telegram';
import type { TelegramLeadData } from '@/lib/telegram';

/**
 * API endpoint for high‑intent visitor events.
 * It receives minimal data and forwards a Telegram alert.
 * The response is returned immediately; Telegram sending is fire‑and‑forget.
 */
export async function POST(request: Request) {
  try {
    const data: TelegramLeadData = await request.json();
    // Fire‑and‑forget Telegram notification
    void sendTelegramAlert(data).catch((e) => console.error('[Telegram Alert] Visitor notification failed', e));
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[Visitor API] Error processing request', err);
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
