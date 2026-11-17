import type { Metadata } from "next";
import { FindingsBoard } from "../components/diagrams/FindingsBoard";
import { HealthCheckStrip } from "../components/diagrams/HealthCheckStrip";
import { PmoHealthMap } from "../components/diagrams/PmoHealthMap";
import { ScorecardExcerpt } from "../components/diagrams/ScorecardExcerpt";
import { OfferLadder } from "../components/home/OfferLadder";
import { ReportingCostCalculator } from "../components/home/ReportingCostCalculator";
import { PrincipalBlock } from "../components/trust/PrincipalBlock";
import { Button } from "../components/ui/Button";
import { Section } from "../components/ui/Section";
import { ctas, headline, healthCheck, primaryCtaHref, selfCheckPitch } from "../content/offer";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata("/");

/** Heading beside text from 1100px; stacked below. */
const split = "grid gap-6 min-[1100px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] min-[1100px]:gap-16";

function Ctas({ placement, inverse = false }: { placement: "hero" | "closing"; inverse?: boolean }) {
  return (
    <div className="flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
      <Button
        href={primaryCtaHref(placement)}
        variant={inverse ? "inverse" : "primary"}
        size="lg"
        ctaId="book_call"
        target="_blank"
        rel="noopener noreferrer"
      >
        {ctas.primaryLabel}
      </Button>
      <Button href={ctas.secondaryHref} variant={inverse ? "inverse-outline" : "secondary"} size="lg" ctaId="self_check">
        {ctas.secondaryLabel}
      </Button>
    </div>
  );
}

/** Homepage (September port PRD, Epic 3): the September section rhythm with the PMO Health story. */
export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Section
        className="report-cover"
        containerClassName="grid gap-12 min-[1200px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[1200px]:items-center min-[1200px]:gap-14"
      >
        <div>
          <p className="eyebrow hero-kicker">PMO Health Check</p>
          <h1 className="t-display hero-title max-w-[19ch] text-ink">{headline.h1}</h1>
          <p className="hero-copy mt-6 max-w-[46ch] text-[19px] leading-[1.6] text-muted min-[641px]:text-[21px]">{headline.sub}</p>
          <div className="hero-actions mt-8">
            <Ctas placement="hero" />
          </div>
          <p className="hero-meta mt-6 font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.14em] text-teal">
            {headline.market}
          </p>
        </div>
        <PmoHealthMap className="hero-map-reveal" />
      </Section>

      {/* 2. The three problems */}
      <Section tone="paper" aria-labelledby="problems-h">
        <div className={split}>
          <h2 id="problems-h" className="t-h2 text-ink">
            Three problems we find in most PMOs.
          </h2>
          <p className="t-body text-muted">
            Actions sit in the RAID log with no owner and no date. Status stays Green until it is too late to change the
            outcome. Steering meets, discusses and defers. None of this is anyone being dishonest. It is how reporting
            drifts when nobody checks it against the evidence.
          </p>
        </div>
        <FindingsBoard className="mt-12" />
      </Section>

      {/* 3. Reporting cost calculator */}
      <Section aria-labelledby="cost-h">
        <div className={split}>
          <h2 id="cost-h" className="t-h2 text-ink">
            What your PMO reporting costs today
          </h2>
          <p className="t-body text-muted">
            Put in your own numbers. Nothing you type leaves this page.
          </p>
        </div>
        <ReportingCostCalculator className="mt-12" />
      </Section>

      {/* 4. The Health Check in five working days */}
      <Section tone="paper" aria-labelledby="check-h">
        <div className={split}>
          <h2 id="check-h" className="t-h2 text-ink">
            The PMO Health Check, in five working days.
          </h2>
          <dl className="grid gap-4 text-[17px]">
            <div>
              <dt className="font-semibold text-ink">What we need</dt>
              <dd className="text-muted">{healthCheck.inputs}.</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">What you get</dt>
              <dd className="text-muted">{healthCheck.outputs}.</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">When</dt>
              <dd className="text-muted">{healthCheck.timing}.</dd>
            </div>
          </dl>
        </div>
        <HealthCheckStrip className="mt-12" />
      </Section>

      {/* 5. Sample scorecard excerpt */}
      <Section aria-labelledby="sample-h">
        <div className={split}>
          <h2 id="sample-h" className="t-h2 text-ink">
            What the scorecard looks like.
          </h2>
          <p className="t-body text-muted">
            Ten dimensions, each with a level and the evidence behind it. This excerpt is a sample for a fictional
            organisation.
          </p>
        </div>
        <ScorecardExcerpt className="mt-12" />
      </Section>

      {/* 6. The ladder */}
      <Section tone="paper" aria-labelledby="ladder-h">
        <div className={split}>
          <h2 id="ladder-h" className="t-h2 text-ink">
            Start free. Pay only for evidence.
          </h2>
          <p className="t-body text-muted">{selfCheckPitch}</p>
        </div>
        <OfferLadder className="mt-12" />
        <p className="t-small mt-6 max-w-[70ch] text-muted">
          {healthCheck.payment} {healthCheck.credit}
        </p>
      </Section>

      {/* 7. About */}
      <PrincipalBlock tone="page" id="principal" />

      {/* 8. Final CTA band */}
      <section className="dark-band atmosphere-band px-[var(--content-padding-x-mobile)] py-16 min-[641px]:px-[var(--content-padding-x)] min-[641px]:py-24" aria-labelledby="close-h">
        <div className="mx-auto flex max-w-[var(--content-max-width)] flex-wrap items-end justify-between gap-8">
          <h2 id="close-h" className="t-h2 max-w-[24ch] text-paper">
            Find out which of the three problems is yours.
          </h2>
          <Ctas placement="closing" inverse />
        </div>
      </section>
    </>
  );
}
