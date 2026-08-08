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
    pageUrl: window.location.href,
    // Additional fields for compatibility
    name: '',
    phone: '',
    email: '',
    service: 'Visit',
  };

  console.log('[VisitorTracker] payload', payload);

  fetch(`${window.location.origin}/api/visitor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    // Use keepalive false for reliability on navigation
    keepalive: false,
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
