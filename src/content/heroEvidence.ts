/**
 * Homepage hero panel (restored from the pre-September site, 18 Nov 2026): three claims reported Green, seen as
 * reported and then as evidenced on five elements. The claims are the three problems. Fictional: never a client.
 */
import type { EvidenceState } from "../components/ui/EvidenceCell";
import type { RagStatus } from "../components/ui/RagBadge";
type Marks = readonly [EvidenceState, EvidenceState, EvidenceState, EvidenceState, EvidenceState];
export type HeroClaim = { id: string; claim: string; reported: RagStatus; marks: Marks };

/** The five things checked for each claim (the same five the method page lists). */
export const evidenceElements = [
  { key: "S", name: "Status" },
  { key: "O", name: "Owner" },
  { key: "E", name: "Evidence" },
  { key: "D", name: "Date" },
  { key: "A", name: "Action" },
] as const;

export const heroClaims: readonly HeroClaim[] = [
  { id: "T1", claim: "RAID log acted on", reported: "green", marks: ["present", "present", "partial", "present", "missing"] },
  { id: "I1", claim: "Status matches evidence", reported: "green", marks: ["present", "missing", "missing", "present", "missing"] },
  { id: "C2", claim: "Governance forum decides", reported: "green", marks: ["present", "present", "missing", "missing", "missing"] },
];

export const heroContradiction = {
  between: ["T1", "I1"] as const,
  label: "The RAID log shows 14 open actions, 9 of them past their due date, while the status pack reports Green.",
};

export const heroCompletionSummary = "Check complete: 1 of 3 claims has most of its evidence; 1 contradiction found";

export const sampleLabel = "Illustrative example. Fictional programme. Not a client engagement.";

export const heroCard = {
  title: "PMO Health Check",
  subtitle: "Three critical claims, all reported Green",
  views: { reported: "As reported", evidenced: "As evidenced" },
  reportedLabel: "claims reported Green",
  notCheckedLabel: "evidence not yet checked",
  evidencedLabel: "claims have most of their evidence",
  contradictionLabel: "contradiction between reports",
  detailSuffix: "what the evidence shows",
} as const;

export const evidenceStateLabel: Record<EvidenceState, string> = {
  present: "Evidenced",
  partial: "Partial",
  missing: "Missing",
};

/** A claim "has most of its evidence" at 3 or more of 5 (matches heroCompletionSummary). Partial does not count. */
export const MOSTLY_EVIDENCED = 3;
export const evidencedCount = (marks: Marks) => marks.filter((mark) => mark === "present").length;
