import type { NextConfig } from "next";

// Content-Security-Policy. No nonces: nonce-based CSP forces per-request dynamic
// rendering, which would break the static/ISR strategy the site's SEO depends
// on. 'unsafe-inline' is required for Next's own bootstrap scripts, the inline
// GA init and JSON-LD blocks. When adding a third-party script, add the
// narrowest possible allowance here and note why.
const CSP = [
  "default-src 'self'",
  // www.clarity.ms — Microsoft Clarity heatmaps/session recording (Bing Webmaster Tools).
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms",
  "style-src 'self' 'unsafe-inline'",
  // lh3.googleusercontent.com — Google account avatars shown in the admin console.
  "img-src 'self' data: https://res.cloudinary.com https://images.unsplash.com https://lh3.googleusercontent.com https://*.google-analytics.com https://www.googletagmanager.com",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const SECURITY_HEADERS = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Content-Security-Policy", value: CSP },
];

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats when next/image is used.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  // NOTE: www <-> non-www canonicalization is handled at the hosting/DNS layer
  // (Vercel). Do NOT add an app-level host redirect here — it can loop against
  // the platform's own redirect (ERR_TOO_MANY_REDIRECTS).
};

export default nextConfig;
