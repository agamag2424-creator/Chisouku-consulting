import type { Metadata } from "next";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import {
  DeliverableTiles,
  MethodFlow,
  OfferClosing,
  OfferHero,
  RunSequence,
  ScopeTiles,
  SectionHead,
  SpeedBars,
  offerCta,
} from "../../components/offers/OfferSections";
import { Button } from "../../components/ui/Button";
import { PriceBlock } from "../../components/ui/PriceBlock";
import { Section } from "../../components/ui/Section";
import { Sheet } from "../../components/ui/Sheet";
import { breadcrumbJsonLd, offerServiceJsonLd } from "../../lib/jsonLd";
import { ogImage } from "../../lib/seo";
import { siteConfig } from "../../lib/siteConfig";

// PRD 9.3 and 6.1, verbatim; list items are cut from the 9.3 sentences.
const offer = siteConfig.offers.decisionReview;
const continuous = siteConfig.offers.continuous;
const lead =
  "A ten-day independent review that gives your steering committee a defensible go-live decision: Go, Conditional Go or No-Go, with the conditions, owners and dates behind it.";
const url = `${siteConfig.url}${offer.path}`;

export const metadata: Metadata = {
  title: offer.name,
  description: lead,
  alternates: { canonical: url },
  openGraph: { type: "website", title: `${offer.name} | ChisokuLabs`, description: lead, url, images: [ogImage] },
  twitter: { card: "summary_large_image", title: `${offer.name} | ChisokuLabs`, description: lead, images: [ogImage.url] },
};

const scope = ["Testing", "Data migration", "Integration", "Cutover", "Governance"] as const;

const method = [
  "READINESS-5 for every critical claim",
  "Contradiction testing across workstreams",
  "Interviews only where the evidence conflicts",
] as const;

const deliverables = [
  { kind: "brief", text: "Decision brief (two pages, steering-committee ready)" },
  { kind: "register", text: "Evidence register" },
  { kind: "contradiction", text: "Contradiction map" },
  { kind: "conditions", text: "Dated decision conditions with owners" },
  { kind: "actions", text: "Leadership actions for the next 30 days" },
  { kind: "readout", text: "Sponsor readout" },
] as const;

const timeline = [
  { from: 1, to: 1, text: "Kickoff and evidence request" },
  { from: 2, to: 6, text: "Evidence review and contradiction testing" },
  { from: 7, to: 8, text: "Targeted interviews" },
  { from: 9, to: 9, text: "Draft findings" },
  { from: 10, to: 10, text: "Sponsor readout" },
] as const;

export default function GoLiveDecisionReviewPage() {
  return (
    <>
      <JsonLdScript id="decision-review-service-ld-json" data={offerServiceJsonLd("decisionReview", lead)} />
      <JsonLdScript
        id="decision-review-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: offer.name, path: offer.path },
        ])}
      />

      <OfferHero offer="decisionReview" lead={lead} />

      <Section tone="paper">
        <SectionHead title="Scope">
          <p>
            Testing, data migration, integration, cutover and governance (business readiness added where it is
            material).
          </p>
        </SectionHead>
        <ScopeTiles core={scope} optional={{ name: "Business readiness", note: "Added where it is material" }} />
      </Section>

      <Section tone="page">
        <SectionHead title="Method">
          <p>
            READINESS-5 for every critical claim, then contradiction testing across workstreams. Interviews only where
            the evidence conflicts, which keeps your team&apos;s time to a minimum.
          </p>
        </SectionHead>
        <MethodFlow steps={method} />
      </Section>

      <Section tone="paper">
        <SectionHead title="Deliverables" />
        <DeliverableTiles items={deliverables} columns={3} />
        <div className="mt-7">
          <Button href={offerCta.samplePack.href} variant="text">
            {offerCta.samplePack.label}
          </Button>
        </div>
      </Section>

      <Section tone="page">
        <SectionHead title="Timeline" />
        <RunSequence days={offer.days} steps={timeline} />
        <Sheet className="mt-6 grid gap-8 p-6 min-[641px]:p-8 min-[900px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-[900px]:items-center min-[900px]:gap-12">
          <p className="t-body text-ink">
            Most independent reviews take four to six weeks. We deliver the same depth in ten business days because our
            evidence tooling extracts and cross-checks every claim; a principal reviews every finding and makes the
            judgement.
          </p>
          <SpeedBars days={offer.days} usual={{ label: "Four to six weeks", fromDays: 20, toDays: 30 }} />
        </Sheet>
      </Section>

      <Section tone="paper">
        <div className="grid gap-8 min-[900px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[900px]:items-center min-[900px]:gap-16">
          <div className="flex flex-col items-start gap-6">
            <h2 className="t-h2 text-ink">Price</h2>
            <Button href={offerCta.review.href} size="lg">
              {offerCta.review.label}
            </Button>
          </div>
          <PriceBlock offer="decisionReview" className="p-6 min-[641px]:p-8" />
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid gap-8 min-[900px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[900px]:items-center min-[900px]:gap-16">
          <div className="flex flex-col gap-4">
            <h2 className="t-h2 text-ink">{continuous.name}</h2>
            <p className="t-body text-ink">
              Weekly evidence register refresh and decision-condition tracking. Monthly, until go-live and hypercare.
            </p>
          </div>
          <PriceBlock offer="continuous" showName={false} className="p-6 min-[641px]:p-8" />
        </div>
      </Section>

      <OfferClosing />
    </>
  );
}
