import type { Metadata } from "next";
import type { Market } from "../../content/markets";
import { breadcrumbJsonLd, marketServiceJsonLd } from "../../lib/jsonLd";
import { pageMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/siteConfig";
import { JsonLdScript } from "../aeo/JsonLdScript";
import { OfferPanels } from "../home/OfferPanels";
import { WeekStrip } from "../home/HomeVisuals";
import { SectionHead, offerCta } from "../offers/OfferSections";
import { BookCallButton } from "../ui/BookCallButton";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";
import { Sheet } from "../ui/Sheet";

// Market page layout (PRD 9.10, E7). Facts and sources come from src/content/markets.ts.

const lead = (market: Market) =>
  `Independent go-live decision assurance for ERP and core-platform programmes in ${market.inName}.`;

export function marketMetadata(market: Market): Metadata {
  return pageMetadata(market.path);
}

/** Ink hero with the dated reasons as a timeline card, then programme shapes, engagement and offers, brief CTA. */
export function MarketPage({ market }: { market: Market }) {
  return (
    <>
      <JsonLdScript id="market-service-ld-json" data={marketServiceJsonLd(market, lead(market))} />
      <JsonLdScript
        id="market-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: market.name, path: market.path },
        ])}
      />

      <Section
        tone="ink"
        containerClassName="grid gap-12 min-[1100px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[1100px]:items-center min-[1100px]:gap-16"
      >
        <div>
          <h1 className="t-h1 max-w-[16ch] text-paper">{market.name}</h1>
          <p className="t-body mt-5 max-w-[46ch] text-paper/80">{lead(market)}</p>
          <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <Button href={offerCta.brief.href} variant="inverse" size="lg">
              {offerCta.brief.label}
            </Button>
            <BookCallButton content="market_hero" variant="inverse-outline" />
            <Button href={offerCta.review.href} variant="inverse-outline" size="lg">
              {offerCta.review.label}
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Platforms">
            {siteConfig.platforms.map((platform) => (
              <li key={platform} className="rounded-full border border-paper/25 px-3 py-1.5 text-[13px] text-paper/85">
                {platform}
              </li>
            ))}
          </ul>
        </div>
        <WhyNow market={market} />
      </Section>

      <Section tone="paper">
        <SectionHead title="Typical programmes" />
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
            <h2 className="t-h2 max-w-[20ch] text-paper">A free readiness brief on your programme</h2>
            <p className="t-body mt-4 text-paper/75">Prepared from public information.</p>
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
        <WeekStrip />
      </Section>
    </>
  );
}

/** The dated reasons, in date order on a rail, each with its source. */
function WhyNow({ market }: { market: Market }) {
  return (
    <Sheet className="p-6 text-ink shadow-2xl min-[641px]:p-8">
      <h2 className="t-h3 text-ink">Why now</h2>
      <p className="t-small mt-1 text-muted">{market.whyNow}</p>
      <ol className="mt-6 flex flex-col">
        {market.facts.map((fact, index) => (
          <li key={fact.date} className="relative grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-4 pb-7 last:pb-0">
            <span aria-hidden className="relative flex justify-center">
              <span className="mt-1 size-3.5 rounded-full border-[3px] border-teal bg-paper" />
              {index < market.facts.length - 1 && (
                <span className="absolute bottom-[-0.25rem] top-6 w-0.5 bg-line" />
              )}
            </span>
            <div className="flex flex-col gap-1.5">
              <p className="t-data text-[22px] leading-tight tracking-[-0.02em] text-ink">{fact.date}</p>
              <h3 className="t-small font-semibold text-ink">{fact.title}</h3>
              <p className="t-small text-ink">{fact.text}</p>
              <p className="text-[13px] text-muted">
                Source:{" "}
                <a href={fact.source.url} className="font-semibold text-teal underline underline-offset-4 hover:text-ink">
                  {fact.source.label}
                </a>
                {fact.also && (
                  <>
                    {" · "}
                    <a href={fact.also.url} className="font-semibold text-teal underline underline-offset-4 hover:text-ink">
                      {fact.also.label}
                    </a>
                  </>
                )}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Sheet>
  );
}
