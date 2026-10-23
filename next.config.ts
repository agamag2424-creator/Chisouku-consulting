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
      // Old offer routes (PRD 4.2, E10.1); the pages are deleted.
      ...[
        ["/pmo-automation-audit", "/readiness-evidence-check"],
        ["/implementation", "/go-live-decision-review"],
        ["/sample-outputs", "/see-it-first"],
        ["/free-pmo-diagnostic", "/see-it-first"],
        ["/diagnostic-vs-audit", "/pricing"],
        ["/pmo-reporting-automation", "/method"],
        ["/pmo-automation-gcc", "/go-live-readiness-uae"],
        ["/pmo-automation-singapore", "/go-live-readiness-uae"],
      ].map(([source, destination]) => ({ source, destination, permanent: true })),
      // The principal stays anonymous (brief A3). /about lands on the principal block.
      {
        source: "/about",
        destination: "/#principal",
        permanent: true,
      },
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
        destination: "/go-live-decision-review",
        permanent: true,
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
