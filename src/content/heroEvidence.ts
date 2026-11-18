/**
 * The fictional sample programme (restored from the pre-September site, 18 Nov 2026). The homepage hero panel shows
 * three of its claims (the three problems) as reported and then as evidenced on five elements; the Method page shows
 * all six and the contradictions between reports. Fictional: never a client.
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

/** The fictional programme behind the hero panel and the Method tables: six claims, all reported Green. */
export type SampleClaim = HeroClaim & { domain: string; finding: string };

export const sampleClaims: readonly SampleClaim[] = [
  {
    id: "T1",
    domain: "RAID",
    claim: "RAID log acted on",
    reported: "green",
    marks: ["present", "present", "partial", "present", "missing"],
    finding: "The log lists 14 open actions. Nine are past their due date, and nothing is recorded to close them.",
  },
  {
    id: "T2",
    domain: "Resourcing",
    claim: "Resource plan matches the work",
    reported: "green",
    marks: ["present", "present", "partial", "missing", "missing"],
    finding: "The plan names roles. There is no date for when those people are released to the work.",
  },
  {
    id: "I1",
    domain: "Status",
    claim: "Status matches evidence",
    reported: "green",
    marks: ["present", "missing", "missing", "present", "missing"],
    finding: "The status pack reports Green. The project reports behind it do not, and nothing ties the Green to those reports.",
  },
  {
    id: "C2",
    domain: "Governance",
    claim: "Governance forum decides",
    reported: "green",
    marks: ["present", "present", "missing", "missing", "missing"],
    finding: "The forum met. The minutes record a discussion, not a decision.",
  },
  {
    id: "G1",
    domain: "Status",
    claim: "Status is current",
    reported: "green",
    marks: ["partial", "present", "missing", "present", "missing"],
    finding: "The pack says \u201con track\u201d. It does not say what is true this week.",
  },
  {
    id: "M1",
    domain: "Risk",
    claim: "Critical risks have owners and dates",
    reported: "green",
    marks: ["present", "missing", "partial", "missing", "missing"],
    finding: "Four critical risks have no named owner and no date.",
  },
];

const claimById = (id: string) => {
  const claim = sampleClaims.find((item) => item.id === id);
  if (!claim) throw new Error(`Unknown sample claim ${id}`);
  return claim;
};

/** The hero shows three of the six: the three problems. */
export const heroClaims: readonly HeroClaim[] = ["T1", "I1", "C2"].map(claimById);

/** Contradictions between reports in the same fictional programme (Method page). */
export const sampleContradictions = [
  {
    type: "Actions overdue while the status pack reports Green",
    between: ["T1", "I1"],
    text: "The RAID log shows 14 open actions, 9 of them past their due date, while the status pack reports Green.",
  },
  {
    type: "Forum met without deciding",
    between: ["C2", "I1"],
    text: "The status pack says governance is in place. The minutes show the forum met and discussed the risks, and did not decide them.",
  },
  {
    type: "Risks listed without owners",
    between: ["M1", "T1"],
    text: "The RAID log lists the risks. Four critical risks have no named owner and no date, so the log is current and the actions are not.",
  },
  {
    type: "Resource plan does not match the reported status",
    between: ["T2", "I1"],
    text: "The status pack reports the team is in place. The resource plan names roles whose people are not released, with no date.",
  },
] as const;

export const claimLabel = (id: string) => claimById(id).claim;

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
