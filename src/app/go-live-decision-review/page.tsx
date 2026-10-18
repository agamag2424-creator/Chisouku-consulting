import { OfferLayout, offerMetadata, type OfferBlock } from "../../components/offers/OfferLayout";

// PRD 9.3 and 6.1, verbatim; list items are cut from the 9.3 sentences.
const lead =
  "A ten-day independent review that gives your steering committee a defensible go-live decision: Go, Conditional Go or No-Go, with the conditions, owners and dates behind it.";

export const metadata = offerMetadata("decisionReview");

const blocks: readonly OfferBlock[] = [
  {
    kind: "scope",
    title: "Scope",
    text: "Testing, data migration, integration, cutover and governance (business readiness added where it is material).",
    core: ["Testing", "Data migration", "Integration", "Cutover", "Governance"],
    optional: { name: "Business readiness", note: "Added where it is material" },
  },
  {
    kind: "method",
    title: "Method",
    text: "READINESS-5 for every critical claim, then contradiction testing across workstreams. Interviews only where the evidence conflicts, which keeps your team's time to a minimum.",
    steps: [
      "READINESS-5 for every critical claim",
      "Contradiction testing across workstreams",
      "Interviews only where the evidence conflicts",
    ],
  },
  {
    kind: "deliverables",
    title: "Deliverables",
    columns: 3,
    samplePackLink: true,
    items: [
      { kind: "brief", text: "Decision brief (two pages, steering-committee ready)" },
      { kind: "register", text: "Evidence register" },
      { kind: "contradiction", text: "Contradiction map" },
      { kind: "conditions", text: "Dated decision conditions with owners" },
      { kind: "actions", text: "Leadership actions for the next 30 days" },
      { kind: "readout", text: "Sponsor readout" },
    ],
  },
  {
    kind: "sequence",
    title: "Timeline",
    steps: [
      { from: 1, to: 1, text: "Kickoff and evidence request" },
      { from: 2, to: 6, text: "Evidence review and contradiction testing" },
      { from: 7, to: 8, text: "Targeted interviews" },
      { from: 9, to: 9, text: "Draft findings" },
      { from: 10, to: 10, text: "Sponsor readout" },
    ],
    speedNote: {
      text: "Most independent reviews take four to six weeks. We deliver the same depth in ten business days because our evidence tooling extracts and cross-checks every claim; a principal reviews every finding and makes the judgement.",
      usual: { label: "Four to six weeks", fromDays: 20, toDays: 30 },
    },
  },
  { kind: "price" },
  {
    kind: "continuous",
    text: "Weekly evidence register refresh and decision-condition tracking. Monthly, until go-live and hypercare.",
  },
];

export default function GoLiveDecisionReviewPage() {
  return <OfferLayout offer="decisionReview" lead={lead} blocks={blocks} />;
}
