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
      console.log('[Visitor API] received visitor event', data);
      if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
        console.warn('[Visitor API] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
      }
      console.log('[Telegram] sending visitor notification');
      sendTelegramAlert(data)
        .then((sent) => console.log('[Telegram] alert sent status:', sent))
        .catch((e) => console.error('[Telegram Alert] Visitor notification failed', e));
      return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error('[Visitor API] Error processing request', err);
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
