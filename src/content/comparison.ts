/**
 * Comparison table. Categories only; no named competitors.
 * Columns follow the PMO offer. Cell values describe typical practice for those columns.
 * The spec named the new columns and the ChisokuLabs evidence cell; the other cells are filled to match.
 */
export const comparisonCaption = "How ChisokuLabs compares with the usual options for a PMO problem";

export const comparisonColumns = [
  "Big Four review",
  "Hiring a Head of PMO first",
  "Freelance PMO (day rate)",
  "ChisokuLabs",
] as const;

export const comparisonRows: readonly { criterion: string; values: readonly [string, string, string, string] }[] = [
  {
    criterion: "Independent of delivery",
    values: ["Usually, check conflicts", "No, they join the team", "No, they join the team", "Yes"],
  },
  { criterion: "Typical duration", values: ["Weeks to months", "A permanent hire", "Open-ended", "5 working days"] },
  { criterion: "Price visible upfront", values: ["Rarely", "A salary", "A day rate", "Yes"] },
  {
    criterion: "Evidence tested claim by claim",
    values: ["Varies", "Varies", "Varies", "Every critical claim, HEALTH-5"],
  },
  { criterion: "Contradictions across workstreams", values: ["Varies", "Varies", "Varies", "Always tested"] },
  { criterion: "See the output before you buy", values: ["Rarely", "No", "Rarely", "Free briefing"] },
];

export const comparisonFootnote = "Comparisons describe typical market practice, not specific firms.";
