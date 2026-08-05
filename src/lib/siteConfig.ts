export const siteConfig = {
  name: "ChisokuLabs",
  url: "https://chisokulabs.com",
  email: "agam@chisokulabs.com",
  linkedIn: "https://www.linkedin.com/in/agamag24",
  tagline: "AI automation for delivery systems",
  subline: "Starting with the PMO reporting layer",
  diagnosticUrl: "https://diagnostic.chisokulabs.com/",
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
  systems: ["Jira", "Sheets", "Power BI", "Slack / Teams"] as const,
} as const;

export const navLinks = [
  { href: "/pmo-automation-audit", label: "Audit" },
  { href: "/free-pmo-diagnostic", label: "Diagnostic" },
  { href: "/method", label: "Method" },
  { href: "/founder-track-record", label: "Founder" },
  { href: "/sample-outputs", label: "Outputs" },
] as const;

export const impactPhases = [
  {
    key: "assess",
    name: "Assess",
    buyer: "Find drag",
    site: "Map the reporting system",
  },
  {
    key: "architect",
    name: "Architect",
    buyer: "Design fix",
    site: "Automation opportunity + blueprint",
  },
  {
    key: "activate",
    name: "Activate",
    buyer: "Build",
    site: "AI automation into the pack cycle",
  },
  {
    key: "accelerate",
    name: "Accelerate",
    buyer: "Scale",
    site: "Expand beyond reporting",
  },
] as const;
