import type { Metadata } from "next";
import type { Market } from "../../content/markets";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { pageMetadata } from "../../lib/seo";
import { JsonLdScript } from "../aeo/JsonLdScript";
import { OfferPanels } from "../home/OfferPanels";
import { SectionHead, offerCta } from "../offers/OfferSections";
import { BookCallButton } from "../ui/BookCallButton";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";
import { Sheet } from "../ui/Sheet";

const lead = (market: Market) =>
  `A fixed-price, independent check of how programmes in ${market.inName} are governed, reported and run.`;

export function marketMetadata(market: Market): Metadata {
  return pageMetadata(market.path);
}

/** Unlisted market page. Same offer as the rest of the site. No vendor strip and no countdown. */
export function MarketPage({ market }: { market: Market }) {
  return (
    <>
      <JsonLdScript
        id="market-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: market.name, path: market.path },
        ])}
      />

      <Section tone="ink">
        <h1 className="t-h1 max-w-[16ch] text-paper">{market.name}</h1>
        <p className="t-body mt-5 max-w-[46ch] text-paper/80">{lead(market)}</p>
        <p className="t-small mt-4 max-w-[46ch] text-paper/70">{market.whyNow}</p>
        <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
          <Button href={offerCta.brief.href} variant="inverse" size="lg">
            {offerCta.brief.label}
          </Button>
          <BookCallButton content="market_hero" variant="inverse-outline" />
          <Button href={offerCta.review.href} variant="inverse-outline" size="lg">
            {offerCta.review.label}
          </Button>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHead title="How you can start" />
        <ul className="mt-10 grid gap-4 min-[900px]:grid-cols-3">
          {market.programmes.map((item) => (
            <li key={item.title}>
              <Sheet className="flex h-full flex-col gap-2 p-6">
                <span aria-hidden className="mb-2 block h-1 w-10 rounded-full bg-teal" />
                <h3 className="t-h3 text-ink">{item.title}</h3>
                <p className="t-small text-muted">{item.text}</p>
              </Sheet>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="page">
        <SectionHead title="How an engagement runs">
          <p>Remote by default, on site by arrangement.</p>
        </SectionHead>
        <OfferPanels />
      </Section>

      <Section tone="ink">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 className="t-h2 max-w-[20ch] text-paper">A free one-page briefing on your programme</h2>
            <p className="t-body mt-4 text-paper/75">Prepared from public information. We reply within two business days.</p>
          </div>
          <div className="flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:flex-wrap">
            <Button href={offerCta.brief.href} variant="inverse" size="lg">
              {offerCta.brief.label}
            </Button>
            <BookCallButton content="market_close" variant="inverse-outline" />
            <Button href={offerCta.review.href} variant="inverse-outline" size="lg">
              {offerCta.review.label}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
