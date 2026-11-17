import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://calendly.com https://*.calendly.com https://assets.calendly.com https://api.resend.com https://diagnostic.chisokulabs.com",
  "frame-src https://calendly.com https://*.calendly.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto: https://calendly.com",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  // A self-contained server (.next/standalone/server.js) for Azure App Service; Vercel ignores it.
  output: "standalone",
  experimental: {
    // Measured in E1.3 (Lighthouse mobile, 3-run median on /): off 96 / TBT 69 ms vs on 94 / TBT 164 ms.
    optimizeCss: false,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Bare host → www. App code so Azure App Service does it (no Vercel domain setting).
      // Host is matched exactly (port stripped). www, localhost, *.vercel.app and
      // *.azurewebsites.net do not match. Path and query are kept. 308 is Next's permanent.
      {
        source: "/:path*",
        has: [{ type: "host", value: "chisokulabs\\.com" }],
        destination: "https://www.chisokulabs.com/:path*",
        permanent: true,
      },
      // Old offer routes (PRD 4.2, E10.1); the pages are deleted.
      ...[
        ["/pmo-automation-audit", "/pmo-health-check"],
        ["/implementation", "/pmo-health-audit"],
        ["/sample-outputs", "/see-it-first"],
        ["/free-pmo-diagnostic", "/see-it-first"],
        ["/diagnostic-vs-audit", "/pricing"],
        ["/pmo-reporting-automation", "/method"],
        ["/pmo-automation-gcc", "/go-live-readiness-uae"],
        ["/pmo-automation-singapore", "/go-live-readiness-uae"],
      ].map(([source, destination]) => ({ source, destination, permanent: true })),
      // Founder documents are no longer published (PRD L4, L8); old links land on the homepage.
      {
        source: "/documents/agam-agrawwal-resume.pdf",
        destination: "/",
        permanent: true,
      },
      {
        source: "/images/:file(founder-agam-agrawwal\\.jpg|founder-agam\\.jpg|founder-agam\\.png|founder-agam\\.webp)",
        destination: "/",
        permanent: true,
      },
      {
        source: "/aeva/:path*",
        destination: "/method",
        permanent: true,
      },
      {
        source: "/ai-governance/:path*",
        destination: "/method",
        permanent: true,
      },
      {
        source: "/ai-governance-course/:path*",
        destination: "/method",
        permanent: true,
      },
      {
        source: "/case-studies/:path*",
        destination: "/see-it-first",
        permanent: true,
      },
      {
        source: "/ai-solutions/:path*",
        destination: "/pmo-health-audit",
        permanent: true,
      },
      {
        source: "/go-live-decision-review",
        destination: "/pmo-health-audit",
        statusCode: 301,
      },
      {
        source: "/readiness-evidence-check",
        destination: "/pmo-health-check",
        statusCode: 301,
      },
      // The old readiness check is replaced by the PMO self-check (September port PRD, Story 5.5). Query strings,
      // including UTMs, are kept on the redirect.
      {
        source: "/readiness",
        destination: "/pmo-self-check",
        statusCode: 301,
      },
      {
        source: "/readiness/:path*",
        destination: "/pmo-self-check",
        statusCode: 301,
      },
      {
        source: "/founder-track-record",
        destination: "/method",
        permanent: true,
      },
      {
        source: "/founder-track-record/:path*",
        destination: "/method",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
