// src/lib/visitorTracker.ts

/**
 * Visitor tracking module for high‑intent events.
 * Sends minimal Telegram alerts for specific pages and interactions.
 * Uses sessionStorage to avoid duplicate notifications on page refreshes.
 */
import type { TelegramLeadData } from '@/lib/telegram';

// Helper to POST data to the server‑side visitor endpoint (fire‑and‑forget)
async function postVisitor(data: TelegramLeadData) {
  try {
    // Fire‑and‑forget: we don't await the response to keep UI fast
    void fetch('/api/visitor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch((e) => console.error('[Telegram Alert] Visitor POST failed', e));
  } catch (e) {
    console.error('[Telegram Alert] Visitor tracking error', e);
  }
}

/** Determine whether a page is high‑intent and should trigger a Telegram alert. */
function isHighIntentPath(path: string): boolean {
  const patterns = [/\/contact/, /\/credite/, /\/servicii/];
  return patterns.some((p) => p.test(path));
}

/** Track a page view. Sends a Telegram alert only once per session for high‑intent pages. */
export function trackPageView() {
  if (typeof window === 'undefined') return;
  const path = window.location.pathname;
  if (!isHighIntentPath(path)) return;

  const flagKey = `visited_${path}`;
  if (sessionStorage.getItem(flagKey)) return; // already notified
  sessionStorage.setItem(flagKey, 'true');

  const data: TelegramLeadData = {
    name: 'Visitor',
    phone: '',
    service: 'Page View',
    message: `User opened high‑intent page: ${path}`,
    pageUrl: window.location.href,
    timestamp: new Date().toISOString(),
  };

  postVisitor(data);
}

/** Track the start of a lead form (e.g., when the first input receives focus). */
export function trackFormStart(formName: string) {
  if (typeof window === 'undefined') return;
  const flagKey = `form_start_${formName}`;
  if (sessionStorage.getItem(flagKey)) return;
  sessionStorage.setItem(flagKey, 'true');

  const data: TelegramLeadData = {
    name: 'Visitor',
    phone: '',
    service: 'Form Start',
    message: `User started filling form: ${formName}`,
    pageUrl: window.location.href,
    timestamp: new Date().toISOString(),
  };

  postVisitor(data);
}

/** Track a lead submission – this is already handled by the existing lead API. */
export function trackLeadSubmit() {
  // No‑op: the /api/lead route already notifies Telegram.
}
