import type { Metadata } from "next";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import {
  DecisionWindow,
  DeliverableTiles,
  DocumentTiles,
  NotList,
  OfferClosing,
  OfferHero,
  RunSequence,
  SectionHead,
  offerCta,
} from "../../components/offers/OfferSections";
import { Button } from "../../components/ui/Button";
import { PriceBlock } from "../../components/ui/PriceBlock";
import { Section } from "../../components/ui/Section";
import { breadcrumbJsonLd, offerServiceJsonLd } from "../../lib/jsonLd";
import { ogImage } from "../../lib/seo";
import { siteConfig } from "../../lib/siteConfig";

// PRD 9.2, verbatim; list items are cut from the 9.2 sentences.
const offer = siteConfig.offers.evidenceCheck;
const lead =
  "A five-day written review of your programme's readiness evidence. You learn which claims are proven, which are assumed, and where workstreams contradict each other.";
const url = `${siteConfig.url}${offer.path}`;

export const metadata: Metadata = {
  title: offer.name,
  description: lead,
  alternates: { canonical: url },
  openGraph: { type: "website", title: `${offer.name} | ChisokuLabs`, description: lead, url, images: [ogImage] },
  twitter: { card: "summary_large_image", title: `${offer.name} | ChisokuLabs`, description: lead, images: [ogImage.url] },
};

const documents = [
  "Your current readiness pack",
  "Test exit or progress reports",
  "Defect log",
  "Migration reconciliation results",
  "Cutover plan",
  "RAID log",
] as const;

const deliverables = [
  { kind: "register", text: "An evidence register of your critical claims scored on READINESS-5" },
  { kind: "contradiction", text: "A contradiction map" },
  { kind: "risks", text: "The five risks most likely to move your date" },
  { kind: "readout", text: "A one-hour readout" },
] as const;

const steps = [
  { from: 1, to: 1, text: "Scoping call and document request" },
  { from: 2, to: 4, text: "Evidence review" },
  { from: 5, to: 5, text: "Written findings and readout" },
] as const;

const notThis = [
  "Not a re-test of your system",
  "Not a regulatory certification",
  "Not a guarantee of go-live success",
] as const;

export default function ReadinessEvidenceCheckPage() {
  return (
    <>
      <JsonLdScript id="evidence-check-service-ld-json" data={offerServiceJsonLd("evidenceCheck", lead)} />
      <JsonLdScript
        id="evidence-check-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: offer.name, path: offer.path },
        ])}
      />

      <OfferHero offer="evidenceCheck" lead={lead} />

      <Section tone="paper">
        <SectionHead title="Who it's for">
          <p>
            Programmes 6–16 weeks from a go-live decision that want an independent read before committing to a full
            review.
          </p>
        </SectionHead>
        <DecisionWindow fromWeeks={16} toWeeks={6} />
      </Section>

      <Section tone="page">
        <SectionHead title="What we review">
          <p>We list exactly what we need on day one.</p>
        </SectionHead>
        <DocumentTiles items={documents} />
      </Section>

      <Section tone="paper">
        <SectionHead title="What you receive" />
        <DeliverableTiles items={deliverables} />
      </Section>

      <Section tone="page">
        <SectionHead title="How it runs" />
        <RunSequence days={offer.days} steps={steps} />
      </Section>

      <Section tone="paper">
        <div className="grid gap-8 min-[900px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[900px]:items-center min-[900px]:gap-16">
          <div className="flex flex-col items-start gap-6">
            <h2 className="t-h2 text-ink">Price</h2>
            <Button href={offerCta.review.href} size="lg">
              {offerCta.review.label}
            </Button>
          </div>
          <PriceBlock offer="evidenceCheck" className="p-6 min-[641px]:p-8" />
        </div>
      </Section>

      <Section tone="tint">
        <SectionHead title="What it is not" />
        <NotList items={notThis} />
      </Section>

      <OfferClosing />
    </>
  );
}
