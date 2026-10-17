import { OfferLayout, offerMetadata, type OfferBlock } from "../../components/offers/OfferLayout";

// PRD 9.2, verbatim; list items are cut from the 9.2 sentences.
const lead =
  "A five-day written review of your programme's readiness evidence. You learn which claims are proven, which are assumed, and where workstreams contradict each other.";

export const metadata = offerMetadata("evidenceCheck", lead);

const blocks: readonly OfferBlock[] = [
  {
    kind: "forWhom",
    title: "Who it's for",
    text: "Programmes 6–16 weeks from a go-live decision that want an independent read before committing to a full review.",
    window: { fromWeeks: 16, toWeeks: 6 },
  },
  {
    kind: "documents",
    title: "What we review",
    text: "We list exactly what we need on day one.",
    items: [
      "Your current readiness pack",
      "Test exit or progress reports",
      "Defect log",
      "Migration reconciliation results",
      "Cutover plan",
      "RAID log",
    ],
  },
  {
    kind: "deliverables",
    title: "What you receive",
    items: [
      { kind: "register", text: "An evidence register of your critical claims scored on READINESS-5" },
      { kind: "contradiction", text: "A contradiction map" },
      { kind: "risks", text: "The five risks most likely to move your date" },
      { kind: "readout", text: "A one-hour readout" },
    ],
  },
  {
    kind: "sequence",
    title: "How it runs",
    steps: [
      { from: 1, to: 1, text: "Scoping call and document request" },
      { from: 2, to: 4, text: "Evidence review" },
      { from: 5, to: 5, text: "Written findings and readout" },
    ],
  },
  { kind: "price" },
  {
    kind: "notIncluded",
    title: "What it is not",
    items: ["Not a re-test of your system", "Not a regulatory certification", "Not a guarantee of go-live success"],
  },
];

export default function ReadinessEvidenceCheckPage() {
  return <OfferLayout offer="evidenceCheck" lead={lead} blocks={blocks} />;
}
