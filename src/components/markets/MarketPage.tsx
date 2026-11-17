import type { Metadata } from "next";
import type { Market } from "../../content/markets";
import { headline, healthCheck, threeProblemsLine } from "../../content/offer";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { pageMetadata } from "../../lib/seo";
import { JsonLdScript } from "../aeo/JsonLdScript";
import { FindingsBoard } from "../diagrams/FindingsBoard";
import { OfferLadder } from "../home/OfferLadder";
import { OfferClosing, OfferCtas, SectionHead } from "../offers/OfferSections";
import { Section } from "../ui/Section";

const lead = (market: Market) =>
  `${headline.sub} For organisations in ${market.inName} running a PMO.`;

export function marketMetadata(market: Market): Metadata {
  return pageMetadata(market.path);
}

/** UAE and Saudi Arabia pages: the same ladder and the same three problems as the UK pages. */
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

      <Section className="report-cover">
        <p className="eyebrow">{market.country.name}</p>
        <h1 className="t-h1 max-w-[20ch] text-ink">{market.name}</h1>
        <p className="t-body mt-5 max-w-[56ch] text-muted">{lead(market)}</p>
        <p className="t-small mt-3 max-w-[56ch] text-muted">{market.delivery}</p>
        <div className="mt-8">
          <OfferCtas content="market_hero" />
        </div>
      </Section>

      <Section tone="paper">
        <SectionHead title="Three problems we find in most PMOs">
          <p>{threeProblemsLine}</p>
        </SectionHead>
        <FindingsBoard className="mt-10" />
      </Section>

      <Section>
        <SectionHead title="Start free. Pay only for evidence.">
          <p>
            {healthCheck.scope}, {healthCheck.price}. {healthCheck.timing}.
          </p>
        </SectionHead>
        <OfferLadder className="mt-10" />
      </Section>

      <OfferClosing />
    </>
  );
}
