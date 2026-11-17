import { OfferLayout, offerMetadata, type OfferBlock } from "../../components/offers/OfferLayout";

const lead =
  "A five-day written check of one programme. You learn which status claims are proven, which are assumed, and where the reports contradict each other.";

export const metadata = offerMetadata("healthCheck");

const blocks: readonly OfferBlock[] = [
  {
    kind: "forWhom",
    title: "Who it's for",
    text: "A sponsor or PMO lead who wants an independent read of one programme before committing to a full PMO Health Audit.",
  },
  {
    kind: "documents",
    title: "What we review",
    text: "We list exactly what we need on day one.",
    items: ["Status pack", "RAID log", "Governance calendar", "Plan"],
  },
  {
    kind: "deliverables",
    title: "What you receive",
    items: [
      { kind: "register", text: "A Project Health Scorecard of your critical claims scored on HEALTH-5" },
      { kind: "risks", text: "The top findings" },
      { kind: "actions", text: "A 30-day fix plan" },
      { kind: "readout", text: "A 45-minute readout" },
    ],
  },
  {
    kind: "sequence",
    title: "How it runs",
    steps: [
      { from: 1, to: 1, text: "Scoping call and document request, plus the sponsor interview" },
      { from: 2, to: 4, text: "Evidence review and the two team interviews (45 minutes each, remote)" },
      { from: 5, to: 5, text: "Written findings and readout" },
    ],
  },
  { kind: "price" },
  {
    kind: "notIncluded",
    title: "What it is not",
    items: [
      "Not an implementation engagement",
      "Not a regulatory certification",
      "Not a guarantee that the programme will recover",
    ],
  },
];

export default function PmoHealthCheckPage() {
  return <OfferLayout offer="healthCheck" lead={lead} blocks={blocks} />;
}
