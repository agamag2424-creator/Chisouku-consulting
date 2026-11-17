import type { EvidenceState } from "../components/ui/EvidenceCell";
import type { RagStatus } from "../components/ui/RagBadge";

/**
 * Illustrative PMO examples for a fictional UK programme.
 * Single source for the hero and the method page.
 * No client name, no employer name, no e-invoicing, no country go-live.
 */

export const sampleLabel = "Illustrative example. Fictional programme. Not a client engagement.";

export type Domain = "RAID" | "Status" | "Governance" | "Risk" | "Resourcing";

export type Marks = readonly [EvidenceState, EvidenceState, EvidenceState, EvidenceState, EvidenceState];

export type PackClaim = {
  id: string;
  domain: Domain;
  claim: string;
  reported: RagStatus;
  /** One state per HEALTH-5 element: Status, Owner, Evidence, Date, Action. */
  marks: Marks;
  finding: string;
};

export const packClaims: readonly PackClaim[] = [
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
    finding: "The pack says “on track”. It does not say what is true this week.",
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

export function packClaim(id: string): PackClaim {
  const claim = packClaims.find((item) => item.id === id);
  if (!claim) throw new Error(`Unknown sample-pack claim ${id}`);
  return claim;
}

/** Four contradiction types, one fictional example each. */
export const packContradictions = [
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

export const packRecommendation = {
  verdict: "Needs attention",
  summary:
    "The status pack reports Green. The evidence supports some of that status. It does not yet support the RAID actions, the governance decisions or the resource plan.",
  fallback: "If a condition is not met by its evidence-by date, the score moves to At risk and the 30-day fix plan is revisited.",
} as const;

export const packConditions = [
  {
    condition: "Close or re-date the nine overdue RAID actions, each with a named owner.",
    owner: "PMO lead",
    by: "10 working days",
  },
  {
    condition: "Governance forum minutes record a decision on the open critical risks.",
    owner: "Sponsor",
    by: "15 working days",
  },
  {
    condition: "Resource plan names who is released to the work, or the status pack stops reporting them as in place.",
    owner: "Delivery lead",
    by: "20 working days",
  },
] as const;

/** Pack footer line on method and judgement. */
export const packMethodNote =
  "Every critical status claim tested for Status, Owner, Evidence, Date and Action (HEALTH-5), then cross-checked between reports and forums.";
export const packJudgementNote =
  "ChisokuLabs forms the judgement; the audit does not guarantee that a programme or portfolio will recover.";

/**
 * Page images of the old go-live pack. The viewer is not rendered until a PMO sample exists.
 * Kept so the old file URLs do not 404.
 */
export const packPages = [
  {
    src: "/images/sample-pack/page-1.png",
    width: 1600,
    height: 1133,
    alt: "Sample pack, page 1. Hidden until a PMO sample exists.",
  },
  {
    src: "/images/sample-pack/page-2.png",
    width: 1600,
    height: 1133,
    alt: "Sample pack, page 2. Hidden until a PMO sample exists.",
  },
] as const;
