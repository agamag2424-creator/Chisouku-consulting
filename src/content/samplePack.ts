import type { EvidenceState } from "../components/ui/EvidenceCell";
import type { RagStatus } from "../components/ui/RagBadge";

/**
 * The illustrative go-live decision pack (fictional "Halcyon Group"), as data.
 * Single source for the hero (E1.2), the method page (E3) and the sample-pack page (E4).
 * Wording is the pack's own: docs/go-live-repositioning/assets/chisokulabs-go-live-decision-pack-illustrative.pdf
 */

export const sampleLabel = "Illustrative example. Fictional programme. Not a client engagement.";

export type Domain = "Testing" | "Data migration" | "Integration" | "Cutover" | "Governance";

export type Marks = readonly [EvidenceState, EvidenceState, EvidenceState, EvidenceState, EvidenceState];

export type PackClaim = {
  id: string;
  domain: Domain;
  claim: string;
  reported: RagStatus;
  /** One state per READINESS-5 element: Status, Owner, Evidence, Date, Action. */
  marks: Marks;
  finding: string;
};

export const packClaims: readonly PackClaim[] = [
  { id: "T1", domain: "Testing", claim: "SIT complete, 98% pass rate", reported: "green", marks: ["present", "present", "partial", "present", "missing"], finding: "Pass rate excludes 3 interfaces deferred from SIT. No action recorded to close them." },
  { id: "T2", domain: "Testing", claim: "UAT signed off by the business", reported: "green", marks: ["present", "present", "partial", "missing", "missing"], finding: "Sign-off from 4 of 6 entity process owners. Both KSA entities pending, no date." },
  { id: "T3", domain: "Testing", claim: "No open Severity 1 defects", reported: "green", marks: ["present", "present", "missing", "present", "missing"], finding: "6 defects downgraded from Sev 1 to Sev 2 in the last 10 days with no change-board record." },
  { id: "M1", domain: "Data migration", claim: "Mock 3 reconciliation passed", reported: "green", marks: ["present", "missing", "partial", "missing", "missing"], finding: "KSA open-item variance of SAR 2.1M unresolved. Ownership disputed between SI and client finance." },
  { id: "M2", domain: "Data migration", claim: "Master data cleansing complete", reported: "green", marks: ["present", "present", "partial", "present", "missing"], finding: "3.8% duplicate vendor records remain. No signed data-quality threshold to judge against." },
  { id: "I1", domain: "Integration", claim: "All 23 interfaces built and tested", reported: "green", marks: ["present", "present", "missing", "missing", "missing"], finding: "20 tested end to end. ZATCA e-invoicing, bank host-to-host and WMS tested only against mocks." },
  { id: "C1", domain: "Cutover", claim: "Cutover plan approved, 2 rehearsals done", reported: "amber", marks: ["present", "present", "present", "present", "missing"], finding: "Rehearsal 2 ran 61 hours against a 52-hour business window. No re-plan agreed." },
  { id: "C2", domain: "Cutover", claim: "Rollback plan in place", reported: "green", marks: ["partial", "missing", "missing", "missing", "missing"], finding: "Document exists. Rollback criteria and point of no return not agreed by anyone with authority." },
  { id: "G1", domain: "Governance", claim: "Programme status Green", reported: "green", marks: ["missing", "present", "missing", "present", "missing"], finding: "3 of 5 workstream reports are Amber. The steering pack consolidates them as Green." },
  { id: "G2", domain: "Governance", claim: "Hypercare resourcing confirmed", reported: "green", marks: ["present", "partial", "partial", "present", "missing"], finding: "SI roster confirmed for 4 weeks. Client super-users not released from day jobs; none named." },
];

export function packClaim(id: string): PackClaim {
  const claim = packClaims.find((item) => item.id === id);
  if (!claim) throw new Error(`Unknown sample-pack claim ${id}`);
  return claim;
}

/** The four contradiction types of PRD 9.4, one pack example each. */
export const packContradictions = [
  {
    type: "Pass rate on reduced scope",
    between: ["T1", "I1"],
    text: "Testing reports SIT 98% passed. Integration shows 3 interfaces, including ZATCA e-invoicing, were never tested end to end. The 98% is measured on a reduced scope.",
  },
  {
    type: "Reconciliation passed while a business entity has not signed UAT",
    between: ["M1", "T2"],
    text: "Migration reports Mock 3 passed. KSA finance has not signed UAT and carries an unowned SAR 2.1M variance. KSA is not ready on the same evidence.",
  },
  {
    type: "Cutover approved with no agreed rollback point",
    between: ["C1", "C2"],
    text: "Cutover reports the plan approved. Rehearsal 2 overran the window by 9 hours and no one has agreed when to roll back. The plan has no tested exit.",
  },
  {
    type: "Headline status not traceable to workstream status",
    between: ["G1", "T3"],
    text: "The steering pack reports Green. Workstream reports are Amber and Sev 1 defects were reclassified without a record. The headline status is not traceable to evidence.",
  },
] as const;

export const packRecommendation = {
  verdict: "Conditional Go",
  summary:
    "The programme reports Green. The evidence supports go-live for the four UAE entities. It does not yet support KSA, and the cutover has no agreed exit.",
  fallback:
    "If any condition is not met by its date: go live with the UAE entities on D-day and move both KSA entities to Wave 1b. Do not proceed without condition 3 in any scenario.",
} as const;

export const packConditions = [
  {
    condition: "ZATCA e-invoicing, bank host-to-host and WMS interfaces pass end-to-end test with business sign-off.",
    owner: "Integration Lead + KSA Finance Controller",
    by: "D-10",
  },
  {
    condition: "KSA SAR 2.1M variance resolved, or accepted in writing against a documented threshold, with a named owner.",
    owner: "Group Financial Controller",
    by: "D-14",
  },
  {
    condition: "Rollback criteria and point of no return agreed; rehearsal 3 completes inside the 52-hour window.",
    owner: "Cutover Manager, approved by Sponsor",
    by: "D-7",
  },
] as const;

/** Pack footer line on method and judgement. */
export const packMethodNote =
  "Every critical readiness claim tested for Status, Owner, Evidence, Date and Action (READINESS-5), then cross-checked between workstreams.";
export const packJudgementNote = "ChisokuLabs forms the judgement; the review does not guarantee go-live success.";

/** Page images of the pack PDF (public/images/sample-pack), rendered at 1600px from the PDF with pdftoppm. */
export const packPages = [
  {
    src: "/images/sample-pack/page-1.png",
    width: 1600,
    height: 1133,
    alt: "Sample decision pack, page 1, the decision brief: a Conditional Go recommendation for a fictional SAP S/4HANA programme, 22 of 50 readiness elements evidenced against a reported Green, evidence by domain, four contradictions between workstreams and three dated conditions with owners.",
  },
  {
    src: "/images/sample-pack/page-2.png",
    width: 1600,
    height: 1133,
    alt: "Sample decision pack, page 2, the evidence register: ten claims as reported, each scored on Status, Owner, Evidence, Date and Action with a finding, followed by leadership actions for the next 21 days and what the review covers and does not.",
  },
] as const;
