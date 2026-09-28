import type { NextConfig } from "next";
import path from "node:path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Performance optimizations
  compress: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Headers for caching and security
  async headers() {
    const isDev = process.env.NODE_ENV !== "production";
    const cspDirectives = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.unsplash.com https://insurance.cristianvaduva.com",
      "font-src 'self' data:",
      "connect-src 'self' https://fcpsafjgjnecdlyqfcid.supabase.co https://*.supabase.co wss://*.supabase.co",
      "frame-src 'self'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "manifest-src 'self'",
      "media-src 'self'",
      ...(isDev ? [] : ["upgrade-insecure-requests"]),
    ];
    const cspHeaderValue = cspDirectives.join("; ");

    const globalHeaders = [
      {
        key: 'Content-Security-Policy',
        value: cspHeaderValue,
      },
      ...(!isDev ? [{
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      }] : []),
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
    ];

    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: globalHeaders,
      },
    ];
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'react-icons'],
  },
};

export default withNextIntl(nextConfig);
