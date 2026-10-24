import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // Generate cryptographically secure nonce for CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  // Content Security Policy
  // In production, script-src uses 'nonce-${nonce}' and 'strict-dynamic' to eliminate unsafe-inline.
  // In development, 'unsafe-eval' is permitted by Next.js/React error overlay.
  // style-src permits 'unsafe-inline' for Framer Motion / React dynamic inline styles.
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://iovzvnntcftcxagdjlyg.supabase.co https://*.supabase.co${isDev ? " 'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://images.unsplash.com https://insurance.cristianvaduva.com https://cristianvaduva.com https://aixluxury.com;
    font-src 'self' data:;
    connect-src 'self' https://iovzvnntcftcxagdjlyg.supabase.co https://*.supabase.co wss://*.supabase.co https://api.telegram.org https://api.openai.com;
    frame-src 'self';
    frame-ancestors 'self';
    form-action 'self';
    base-uri 'self';
    object-src 'none';
    manifest-src 'self';
    media-src 'self';
    ${isDev ? "" : "upgrade-insecure-requests;"}
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  // Forward nonce and CSP to Next.js render engine
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Attach CSP to the outgoing response headers
  response.headers.set("Content-Security-Policy", cspHeader);

  // Cache-Control Strategy for Dynamic CSP Nonce Architecture:
  // 1. Any HTML document or dynamic route carrying a per-request CSP nonce MUST NOT be cached by shared CDN / edge caches.
  //    Serving cached HTML with a stale nonce or mismatched CSP header causes script execution failures (CSP violations)
  //    and defeats the cryptographic uniqueness of the per-request nonce.
  // 2. Static hashed assets (/_next/static/*, public images/fonts) are bypassed by the matcher and cached immutably in next.config.ts.
  response.headers.set(
    "Cache-Control",
    "private, no-cache, no-store, max-age=0, must-revalidate"
  );
  response.headers.set("Vary", "Accept-Encoding, Cookie");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static JS/CSS files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, manifest
     * - direct image files in public (.svg, .png, .jpg, .webp, .avif)
     */
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
