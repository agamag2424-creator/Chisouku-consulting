import { OfferLayout, offerMetadata, type OfferBlock } from "../../components/offers/OfferLayout";
import { healthCheck } from "../../content/offer";

// PMO Health Check (September port PRD, Story 4.1 / 4.2): wording from the source-of-truth table in content/offer.ts.
const lead = `A fixed-price check of one programme. ${healthCheck.timing}, you get ${healthCheck.outputs.charAt(0).toLowerCase()}${healthCheck.outputs.slice(1)}.`;

export const metadata = offerMetadata("healthCheck");

const blocks: readonly OfferBlock[] = [
  {
    kind: "forWhom",
    title: "Who it's for",
    text: "A sponsor, PMO lead or portfolio director who suspects one of the three problems: RAID logs nobody acts on, status that turns Red too late, or governance forums that cannot actually decide.",
  },
  {
    kind: "documents",
    title: "What we need",
    text: `${healthCheck.inputs}.`,
    items: ["Status pack", "RAID log", "Governance calendar", "Plan", "Three short interviews"],
  },
  {
    kind: "deliverables",
    title: "What you get",
    items: [
      { kind: "register", text: "The PMO Health Scorecard filled in with evidence" },
      { kind: "risks", text: "The top findings" },
      { kind: "actions", text: "A 30-day fix plan" },
      { kind: "readout", text: "A 45-minute readout" },
    ],
  },
  {
    kind: "sequence",
    title: "Five working days after documents arrive",
    steps: [
      { from: 1, to: 1, text: "Documents arrive; the three interviews are booked" },
      { from: 2, to: 3, text: "Evidence review and the three short interviews" },
      { from: 4, to: 4, text: "Scorecard, top findings and the 30-day fix plan written" },
      { from: 5, to: 5, text: "45-minute readout" },
    ],
  },
  { kind: "price" },
  {
    kind: "notIncluded",
    title: "What it is not",
    items: [
      `Not a portfolio view. ${healthCheck.partialView}`,
      "Not an accredited assessment",
      "Not an implementation engagement",
      "Not a guarantee that the programme will recover",
    ],
  },
];

export default function PmoHealthCheckPage() {
  return <OfferLayout offer="healthCheck" eyebrow={`${healthCheck.scope}, ${healthCheck.price}`} lead={lead} blocks={blocks} />;
}
