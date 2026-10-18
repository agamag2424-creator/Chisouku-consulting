/** PRD 9.8 comparison table, verbatim. Categories only; no named competitors (PRD 3.2). */
export const comparisonColumns = [
  "Big Four review",
  "System integrator's readiness review",
  "Typical boutique assurance",
  "ChisokuLabs",
] as const;

export const comparisonRows: readonly { criterion: string; values: readonly [string, string, string, string] }[] = [
  { criterion: "Independent of delivery", values: ["Usually, check conflicts", "No", "Yes", "Yes"] },
  { criterion: "Typical duration", values: ["Weeks to months", "Part of delivery", "4–6 weeks", "5–10 business days"] },
  { criterion: "Price visible upfront", values: ["Rarely", "Included in SI fees", "Sometimes", "Yes"] },
  {
    criterion: "Evidence tested claim by claim",
    values: ["Varies", "Self-reported", "Varies", "Every critical claim, READINESS-5"],
  },
  { criterion: "Contradictions across workstreams", values: ["Varies", "Rarely", "Varies", "Always tested"] },
  { criterion: "See the output before you buy", values: ["Rarely", "No", "Rarely", "Sample pack and free brief"] },
];

export const comparisonFootnote = "Comparisons describe typical market practice, not specific firms.";
