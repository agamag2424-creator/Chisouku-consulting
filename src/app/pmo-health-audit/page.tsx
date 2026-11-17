import { OfferLayout, offerMetadata, type OfferBlock } from "../../components/offers/OfferLayout";

const lead =
  "A 5 working day independent audit of how a programme or portfolio is governed, reported and run, with a 30-day fix plan.";

export const metadata = offerMetadata("healthAudit");

const blocks: readonly OfferBlock[] = [
  {
    kind: "scope",
    title: "Scope",
    text: "Governance, reporting, RAID, cadence, prioritisation and the PMO operating model.",
    core: ["Governance", "Reporting", "RAID", "Cadence", "Prioritisation", "PMO operating model"],
  },
  {
    kind: "method",
    title: "Method",
    text: "HEALTH-5 for every critical claim, then contradiction testing across reports and forums.",
    steps: ["HEALTH-5 for every critical claim", "Contradiction testing across reports and forums"],
  },
  {
    kind: "deliverables",
    title: "Deliverables",
    columns: 3,
    items: [
      { kind: "brief", text: "Audit brief (two pages, sponsor-ready)" },
      { kind: "register", text: "Evidence register" },
      { kind: "contradiction", text: "Contradiction map" },
      { kind: "conditions", text: "Project Health Scorecard (Healthy / Needs attention / At risk) with owners and dates" },
      { kind: "actions", text: "30-day fix plan" },
      { kind: "readout", text: "Sponsor readout" },
    ],
  },
  {
    kind: "sequence",
    title: "Timeline",
    steps: [
      { from: 1, to: 1, text: "Kickoff and evidence request" },
      { from: 2, to: 2, text: "Evidence review" },
      { from: 3, to: 3, text: "Targeted interviews" },
      { from: 4, to: 4, text: "Draft findings" },
      { from: 5, to: 5, text: "Sponsor readout" },
    ],
  },
  { kind: "price" },
];

export default function PmoHealthAuditPage() {
  return <OfferLayout offer="healthAudit" lead={lead} blocks={blocks} />;
}
