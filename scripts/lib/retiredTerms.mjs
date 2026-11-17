// Words and claims that must not appear on chisokulabs.com (September port PRD, non-negotiables and Story 7.1).
// Used by the unit tests (content files) and by scripts/scanSite.mjs (built HTML). Patterns are case-insensitive.

/** Retired offers, framing and prices. */
export const retiredTerms = [
  { label: "go-live", pattern: /\bgo[\s-]?live\b/i },
  { label: "readiness", pattern: /\breadiness\b/i },
  { label: "Readiness Evidence Check", pattern: /readiness evidence check/i },
  { label: "Go-Live Decision Review", pattern: /go[\s-]?live decision review/i },
  { label: "Continuous readiness assurance", pattern: /continuous readiness assurance/i },
  { label: "PMO Automation Audit", pattern: /pmo automation audit/i },
  { label: "USD 12,000", pattern: /usd\s*12,000/i },
  { label: "USD 6,000", pattern: /usd\s*6,000/i },
  { label: "USD 4,000 to 5,000", pattern: /usd\s*4,000\s*(to|-|–)\s*5,000/i },
  { label: "free PMO Diagnostic", pattern: /free pmo diagnostic/i },
  { label: "Audit Fit Call", pattern: /audit fit call/i },
  { label: "free readiness brief", pattern: /free readiness brief/i },
  { label: "AI automation for delivery systems", pattern: /ai automation for delivery systems/i },
  { label: "Assess, Architect, Activate, Accelerate", pattern: /assess,?\s+architect,?\s+activate/i },
  { label: "Manual pack to AI-assisted pack", pattern: /manual pack to ai[\s-]assisted pack/i },
  { label: "Systems we automate against", pattern: /systems we automate against/i },
];

/** House-style and claims checks (Story 7.1, decisions 1 and 2 of the review). */
export const styleTerms = [
  { label: "em dash", pattern: /—/ },
  { label: "Chisoku Guard", pattern: /chisoku\s*guard/i },
  { label: "ten-plus years (the site says 11+)", pattern: /\b10\+?\s*years/i },
  { label: "leading programmes", pattern: /leading programmes/i },
  { label: "Pvt Ltd", pattern: /\bpvt\.?\s*ltd\b/i },
  { label: "wrong legal name", pattern: /chisoku\s*labs\s+private\s+limited|chisoku\s+lab\s+private\s+limited/i },
  { label: "pilot", pattern: /\bpilot\b/i },
  { label: "ROI or savings claim", pattern: /\b(roi|reclaim(ed)?|savings?|save up to)\b/i },
  { label: "percentile or benchmark", pattern: /\b(percentile|benchmark(ed)?\s+against)\b/i },
];

/** "refund" within 120 characters of "Health Check", either order (the Health Check is never described as refundable). */
export const refundNearHealthCheck = { label: "refund near Health Check", pattern: /health check[^.]{0,120}\brefund|\brefund[^.]{0,120}health check/i };

/** Every hit of the lists above in a piece of text, with a little context. */
export function findHits(text, lists = [retiredTerms, styleTerms, [refundNearHealthCheck]]) {
  const hits = [];
  for (const list of lists) {
    for (const { label, pattern } of list) {
      const re = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : pattern.flags + "g");
      for (const m of text.matchAll(re)) {
        hits.push({ label, context: text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40).replace(/\s+/g, " ") });
      }
    }
  }
  return hits;
}
