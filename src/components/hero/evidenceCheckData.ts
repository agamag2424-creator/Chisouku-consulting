import type { EvidenceState } from "../ui/EvidenceCell";
import { packClaim, sampleLabel, type PackClaim } from "../../content/samplePack";

/**
 * Hero Evidence Check content (PRD 7). Claims come from the sample pack (src/content/samplePack.ts).
 */
export const readiness5 = [
  { key: "S", name: "Status" },
  { key: "O", name: "Owner" },
  { key: "E", name: "Evidence" },
  { key: "D", name: "Date" },
  { key: "A", name: "Action" },
] as const;

export type HeroClaim = Pick<PackClaim, "id" | "claim" | "reported" | "marks">;

/** The hero shows three of the pack's claims (PRD 7). */
export const heroClaims: readonly HeroClaim[] = ["T1", "I1", "C2"].map(packClaim);

export const heroContradiction = {
  between: ["T1", "I1"] as const,
  label: "The 98% excludes 3 interfaces never tested end to end.",
};

export const heroCompletionSummary =
  "Check complete: 1 of 3 claims has most of its evidence; 1 contradiction found";

export { sampleLabel };

/** Only ● present counts; ◐ partial does not (PRD 7). */
export function evidencedCount(marks: HeroClaim["marks"]): number {
  return marks.filter((mark) => mark === "present").length;
}

/** Interface wording for the hero card (PRD 9.12, IN-9). */
export const heroCard = {
  title: "Go-live readiness check",
  subtitle: "Three critical claims, all reported Green",
  views: { reported: "As reported", evidenced: "As evidenced" },
  reportedLabel: "claims reported Green",
  notCheckedLabel: "evidence not yet checked",
  evidencedLabel: "claims have most of their evidence",
  contradictionLabel: "contradiction between workstreams",
  detailSuffix: "what the evidence shows",
} as const;

export const evidenceStateLabel: Record<EvidenceState, string> = {
  present: "Evidenced",
  partial: "Partial",
  missing: "Missing",
};

/** A claim "has most of its evidence" at 3 or more of 5 (matches heroCompletionSummary). */
export const MOSTLY_EVIDENCED = 3;
