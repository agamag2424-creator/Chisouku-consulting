/**
 * "Why not the usual options" (restored from the pre-September site, 18 Nov 2026). Categories only; no named
 * competitors. Cells describe typical practice for each category.
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
    values: ["Varies", "Varies", "Varies", "Every critical claim, on five checks"],
  },
  { criterion: "Contradictions across reports", values: ["Varies", "Varies", "Varies", "Always tested"] },
  { criterion: "See the output before you buy", values: ["Rarely", "No", "Rarely", "Sample report and free self-check"] },
];

export const comparisonFootnote = "Comparisons describe typical market practice, not specific firms.";
