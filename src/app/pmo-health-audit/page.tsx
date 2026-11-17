import { OfferLayout, offerMetadata, type OfferBlock } from "../../components/offers/OfferLayout";
import { healthAudit, healthCheck } from "../../content/offer";
import { dimensions } from "../../content/pmoSelfCheck";

// PMO Health Audit (September port PRD, Story 4.2): the Health Check is the way in, then the Audit.
const lead = `Most clients start with the ${healthCheck.price} PMO Health Check on one programme. The Audit then covers ${healthAudit.scope.charAt(0).toLowerCase()}${healthAudit.scope.slice(1)}.`;

export const metadata = offerMetadata("healthAudit");

const blocks: readonly OfferBlock[] = [
  {
    kind: "wayIn",
    title: "The way in: the PMO Health Check",
    text: `One programme, ${healthCheck.price}. ${healthCheck.timing}: ${healthCheck.outputs.charAt(0).toLowerCase()}${healthCheck.outputs.slice(1)}.`,
    note: `${healthCheck.credit} ${healthCheck.partialView}`,
  },
  {
    kind: "scope",
    title: "Scope",
    text: `${healthAudit.scope}.`,
    core: dimensions.map((d) => d.name),
  },
  {
    kind: "deliverables",
    title: "What you get",
    columns: 4,
    items: [
      { kind: "register", text: "The PMO Health Scorecard for the portfolio, filled in with evidence" },
      { kind: "contradiction", text: "Where reports, RAID logs and forums disagree" },
      { kind: "actions", text: "A 30-day fix plan with owners and dates" },
      { kind: "readout", text: "A sponsor readout" },
    ],
  },
  {
    kind: "sequence",
    title: "Capped at 5 working days",
    steps: [
      { from: 1, to: 1, text: "Kickoff and document request" },
      { from: 2, to: 2, text: "Evidence review across the portfolio" },
      { from: 3, to: 3, text: "Interviews" },
      { from: 4, to: 4, text: "Scorecard and fix plan written" },
      { from: 5, to: 5, text: "Sponsor readout" },
    ],
  },
  { kind: "price" },
];

export default function PmoHealthAuditPage() {
  return <OfferLayout offer="healthAudit" eyebrow="The whole portfolio" lead={lead} blocks={blocks} />;
}
