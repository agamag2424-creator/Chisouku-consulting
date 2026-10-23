import type { Metadata } from "next";
import { breadcrumbJsonLd, offerServiceJsonLd } from "../../lib/jsonLd";
import { pageMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/siteConfig";
import { JsonLdScript } from "../aeo/JsonLdScript";
import { PrincipalBlock } from "../trust/PrincipalBlock";
import { Button } from "../ui/Button";
import { PriceBlock } from "../ui/PriceBlock";
import { Section } from "../ui/Section";
import { Sheet } from "../ui/Sheet";
import {
  DecisionWindow,
  DeliverableTiles,
  DocumentTiles,
  MethodFlow,
  NotList,
  OfferClosing,
  OfferHero,
  RunSequence,
  ScopeTiles,
  SectionHead,
  SpeedBars,
  offerCta,
  type DeliverableKind,
  type FixedOffer,
  type RunStep,
} from "./OfferSections";

/** One block of an offer page, in page order. Copy is passed in verbatim from PRD 9.2 / 9.3. */
export type OfferBlock =
  | { kind: "forWhom"; title: string; text: string; window: { fromWeeks: number; toWeeks: number } }
  | { kind: "documents"; title: string; text: string; items: readonly string[] }
  | { kind: "scope"; title: string; text: string; core: readonly string[]; optional?: { name: string; note: string } }
  | { kind: "method"; title: string; text: string; steps: readonly string[] }
  | {
      kind: "deliverables";
      title: string;
      items: readonly { kind: DeliverableKind; text: string }[];
      columns?: 3 | 4;
      samplePackLink?: boolean;
    }
  | {
      kind: "sequence";
      title: string;
      steps: readonly RunStep[];
      speedNote?: { text: string; usual: { label: string; fromDays: number; toDays: number } };
    }
  | { kind: "price" }
  | { kind: "continuous"; text: string }
  | { kind: "notIncluded"; title: string; items: readonly string[] };

type OfferLayoutProps = { offer: FixedOffer; lead: string; blocks: readonly OfferBlock[] };

/** Page metadata for an offer page, from the SEO map. */
export function offerMetadata(offer: FixedOffer): Metadata {
  return pageMetadata(siteConfig.offers[offer].path);
}

/** Offer page (E2.3): JSON-LD, ink hero, the blocks with alternating tones, closing band. */
export function OfferLayout({ offer, lead, blocks }: OfferLayoutProps) {
  const { name, path } = siteConfig.offers[offer];
  let plain = 0; // paper and page alternate across plain blocks; the closing notes sit on tint
  return (
    <>
      <JsonLdScript id={`${offer}-service-ld-json`} data={offerServiceJsonLd(offer, lead)} />
      <JsonLdScript
        id={`${offer}-breadcrumb-ld-json`}
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name, path },
        ])}
      />
      <OfferHero offer={offer} lead={lead} />
      {blocks.map((block) => {
        const tinted = block.kind === "notIncluded" || block.kind === "continuous";
        const tone = tinted ? "tint" : plain++ % 2 === 0 ? "paper" : "page";
        return (
          <Section key={block.kind} tone={tone}>
            <Block offer={offer} block={block} />
          </Section>
        );
      })}
      <PrincipalBlock tone="paper" />
      <OfferClosing />
    </>
  );
}

const priceGrid =
  "grid gap-8 min-[900px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[900px]:items-center min-[900px]:gap-16";

function Block({ offer, block }: { offer: FixedOffer; block: OfferBlock }) {
  switch (block.kind) {
    case "forWhom":
      return (
        <>
          <SectionHead title={block.title}>
            <p>{block.text}</p>
          </SectionHead>
          <DecisionWindow {...block.window} />
        </>
      );
    case "documents":
      return (
        <>
          <SectionHead title={block.title}>
            <p>{block.text}</p>
          </SectionHead>
          <DocumentTiles items={block.items} />
        </>
      );
    case "scope":
      return (
        <>
          <SectionHead title={block.title}>
            <p>{block.text}</p>
          </SectionHead>
          <ScopeTiles core={block.core} optional={block.optional} />
        </>
      );
    case "method":
      return (
        <>
          <SectionHead title={block.title}>
            <p>{block.text}</p>
          </SectionHead>
          <MethodFlow steps={block.steps} />
        </>
      );
    case "deliverables":
      return (
        <>
          <SectionHead title={block.title} />
          <DeliverableTiles items={block.items} columns={block.columns} />
          {block.samplePackLink && (
            <div className="mt-7">
              <Button href={offerCta.samplePack.href} variant="text">
                {offerCta.samplePack.label}
              </Button>
            </div>
          )}
        </>
      );
    case "sequence":
      return (
        <>
          <SectionHead title={block.title} />
          <RunSequence days={siteConfig.offers[offer].days} steps={block.steps} />
          {block.speedNote && (
            <Sheet className="mt-6 grid gap-8 p-6 min-[641px]:p-8 min-[900px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-[900px]:items-center min-[900px]:gap-12">
              <p className="t-body text-ink">{block.speedNote.text}</p>
              <SpeedBars days={siteConfig.offers[offer].days} usual={block.speedNote.usual} />
            </Sheet>
          )}
        </>
      );
    case "price":
      return (
        <div className={priceGrid}>
          <div className="flex flex-col items-start gap-6">
            <h2 className="t-h2 text-ink">Price</h2>
            <Button href={offerCta.review.href} size="lg">
              {offerCta.review.label}
            </Button>
          </div>
          <PriceBlock offer={offer} className="p-6 min-[641px]:p-8" />
        </div>
      );
    case "continuous":
      return (
        <div className={priceGrid}>
          <div className="flex flex-col gap-4">
            <h2 className="t-h2 text-ink">{siteConfig.offers.continuous.name}</h2>
            <p className="t-body text-ink">{block.text}</p>
          </div>
          <PriceBlock offer="continuous" showName={false} showTerms={false} className="p-6 min-[641px]:p-8" />
        </div>
      );
    case "notIncluded":
      return (
        <>
          <SectionHead title={block.title} />
          <NotList items={block.items} />
        </>
      );
  }
}
