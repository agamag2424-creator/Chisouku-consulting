/**
 * Old-offer values (PMO reporting automation) still used by pages that E10 deletes.
 * Kept out of siteConfig so the new schema stays clean. Removed in E10.
 */
export const legacy = {
  tagline: "AI automation for delivery systems", // removed in E10
  subline: "Starting with the PMO reporting layer", // removed in E10
  diagnosticUrl: "https://diagnostic.chisokulabs.com/", // removed in E10
  pricing: { min: 4000, max: 5000, currency: "USD", timeline: "5-10 business days" }, // removed in E10
  markets: { primary: "GCC", secondary: "Singapore" }, // removed in E10
  systems: ["Jira", "Sheets", "Power BI", "Slack / Teams"] as const, // removed in E10
} as const;

/** Display form of the old audit price. Removed in E10. */
export const legacyAuditPriceRange = `${legacy.pricing.currency} ${legacy.pricing.min.toLocaleString(
  "en-US",
)}–${legacy.pricing.max.toLocaleString("en-US")}`;

/** Old AI Impact Model phases, used only by AiImpactModel. Removed in E10. */
export const impactPhases = [
  { key: "assess", name: "Assess", buyer: "Find drag", site: "Map the reporting system" },
  { key: "architect", name: "Architect", buyer: "Design fix", site: "Automation opportunity + blueprint" },
  { key: "activate", name: "Activate", buyer: "Build", site: "AI automation into the pack cycle" },
  { key: "accelerate", name: "Accelerate", buyer: "Scale", site: "Expand beyond reporting" },
] as const;
