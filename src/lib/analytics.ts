// src/lib/analytics.ts

/**
 * Minimal analytics helper used for conversion tracking.
 * Currently logs to console – replace with your analytics provider as needed.
 */
export function trackConversion(eventName: string) {
  try {
    console.log('[Conversion]', eventName);
  } catch {
    // Silently ignore analytics failures to avoid breaking app
  }
}
