// src/lib/visitorTracker.ts

/**
 * Visitor tracking – always sends a page view event to the API.
 */
export function trackPageView() {
  console.log('[VisitorTracker] sending');

  if (typeof window === 'undefined') {
    console.log('[VisitorTracker] no window');
    return;
  }

  const payload = {
    type: 'page_view',
    url: window.location.href,
    pathname: window.location.pathname,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
  };

  console.log('[VisitorTracker] payload', payload);

  fetch('/api/visitor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  })
    .then((res) => {
      console.log('[VisitorTracker] response', res.status);
    })
    .catch((err) => {
      console.error('[VisitorTracker] failed', err);
    });
}
export function trackLeadSubmit() {
  // No‑op for now
}
