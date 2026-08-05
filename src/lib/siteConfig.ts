export const siteConfig = {
  name: "ChisokuLabs",
  url: "https://chisokulabs.com",
  email: "agam@chisokulabs.com",
  linkedIn: "https://www.linkedin.com/in/agamag24",
  diagnosticUrl: "https://pmo-maturity-tool.vercel.app/",
  calendlyUrl: "https://calendly.com/chisokulab/discovery-call",
  pricing: {
    min: 4000,
    max: 5000,
    currency: "USD",
    timeline: "5-10 business days",
  },
  markets: {
    primary: "GCC",
    secondary: "Singapore",
  },
} as const;

export const navLinks = [
  { href: "/pmo-automation-audit", label: "Audit" },
  { href: "/free-pmo-diagnostic", label: "Diagnostic" },
  { href: "/founder-track-record", label: "Founder" },
  { href: "/sample-outputs", label: "Outputs" },
] as const;
