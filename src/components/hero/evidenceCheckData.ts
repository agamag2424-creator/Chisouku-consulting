import type { EvidenceState } from "../ui/EvidenceCell";

/**
 * Hero Evidence Check content (PRD 7). Fictional programme, consistent with the sample pack.
 * Single source for the hero, the method page (E3) and the sample pack page (E4).
 */
export const readiness5 = [
  { key: "S", name: "Status" },
  { key: "O", name: "Owner" },
  { key: "E", name: "Evidence" },
  { key: "D", name: "Date" },
  { key: "A", name: "Action" },
] as const;

export type HeroClaim = {
  id: string;
  claim: string;
  reported: "green" | "amber" | "red";
  /** One state per READINESS-5 element, in readiness5 order. */
  marks: readonly [EvidenceState, EvidenceState, EvidenceState, EvidenceState, EvidenceState];
};

export const heroClaims: readonly HeroClaim[] = [
  { id: "T1", claim: "SIT complete, 98% pass rate", reported: "green", marks: ["present", "present", "partial", "present", "missing"] },
  { id: "I1", claim: "All 23 interfaces built and tested", reported: "green", marks: ["present", "present", "missing", "missing", "missing"] },
  { id: "C2", claim: "Rollback plan in place", reported: "green", marks: ["partial", "missing", "missing", "missing", "missing"] },
];

export const heroContradiction = {
  between: ["T1", "I1"] as const,
  label: "The 98% excludes 3 interfaces never tested end to end.",
};

export const heroCompletionSummary =
  "Check complete: 1 of 3 claims has most of its evidence; 1 contradiction found";

export const sampleLabel = "Illustrative example. Fictional programme. Not a client engagement.";

/** Only ● present counts; ◐ partial does not (PRD 7). */
export function evidencedCount(marks: HeroClaim["marks"]): number {
  return marks.filter((mark) => mark === "present").length;
}
