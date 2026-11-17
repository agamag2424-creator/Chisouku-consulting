import type { Metadata } from "next";
import { HealthCheckStrip } from "../components/diagrams/HealthCheckStrip";
import { PmoHealthMap } from "../components/diagrams/PmoHealthMap";
import { ScorecardExcerpt } from "../components/diagrams/ScorecardExcerpt";
import { OfferLadder } from "../components/home/OfferLadder";
import { PrincipalBlock } from "../components/trust/PrincipalBlock";
import { Button } from "../components/ui/Button";
import { Section } from "../components/ui/Section";
import { ctas, headline, healthCheck, primaryCtaHref, selfCheckPitch, threeProblemsDetail } from "../content/offer";
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

/**
 * Homepage. Seven sections (18 Nov 2026 review): hero, the three problems, the five days, the sample scorecard, prices,
 * who does the work, and the closing call. The three problems are named in the hero line and set out once in section 2.
 * The reporting-cost calculator lives on /pricing.
 */
export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Section
        className="report-cover"
        containerClassName="grid gap-12 min-[1200px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] min-[1200px]:items-center min-[1200px]:gap-16"
      >
        <div>
          <p className="eyebrow hero-kicker">{headline.kicker}</p>
          <h1 className="t-display hero-title max-w-[22ch] text-ink">{headline.h1}</h1>
          <p className="hero-copy mt-6 max-w-[52ch] text-[18px] leading-[1.6] text-muted min-[641px]:text-[19px]">{headline.sub}</p>
          <div className="hero-actions mt-8">
            <Ctas placement="hero" />
          </div>
          <p className="hero-meta mt-5">
            <Button href="/see-it-first" variant="text" ctaId="sample_report">
              {headline.sampleLink}
            </Button>
          </p>
        </div>
        {/* On phones the headline and both calls fill the first screen; the map is left to larger screens. */}
        <PmoHealthMap compact className="hero-map-reveal max-[639px]:hidden" />
      </Section>

      {/* 2. The three problems */}
      <Section tone="paper" aria-labelledby="problems-h">
        <h2 id="problems-h" className="t-h2 text-ink">
          Three problems we find in most PMOs
        </h2>
        <ol className="mt-10 grid gap-8 min-[900px]:grid-cols-3 min-[900px]:gap-10">
          {threeProblemsDetail.map((problem, i) => (
            <li key={problem.title} className="border-t border-ink/15 pt-5">
              <p className="label text-gold-ink">Problem {i + 1}</p>
              <h3 className="t-h3 mt-2 text-ink">{problem.title}</h3>
              <p className="mt-3 text-[17px] leading-[1.6] text-muted">{problem.body}</p>
            </li>
          ))}
        </ol>
        <p className="t-body mt-10 text-ink">
          None of this is anyone being dishonest. It is how reporting drifts when nobody checks it against the evidence.
        </p>
      </Section>

      {/* 3. The Health Check in five working days */}
      <Section tone="paper" aria-labelledby="check-h">
        <div className={split}>
          <h2 id="check-h" className="t-h2 text-ink">
            The PMO Health Check, in five working days
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

      {/* 4. Sample scorecard excerpt */}
      <Section aria-labelledby="sample-h">
        <div className={split}>
          <h2 id="sample-h" className="t-h2 text-ink">
            What the scorecard looks like
          </h2>
          <p className="t-body text-muted">
            Ten dimensions, each with a level and the evidence behind it. This excerpt is a sample for a fictional
            organisation.
          </p>
        </div>
        <ScorecardExcerpt className="mt-12" />
      </Section>

      {/* 5. Prices */}
      <Section tone="paper" aria-labelledby="ladder-h">
        <div className={split}>
          <h2 id="ladder-h" className="t-h2 text-ink">
            Start free. Pay only for evidence
          </h2>
          <p className="t-body text-muted">{selfCheckPitch}</p>
        </div>
        <OfferLadder className="mt-12" />
        <p className="t-small mt-6 max-w-[70ch] text-muted">
          {healthCheck.payment} {healthCheck.credit}
        </p>
      </Section>

      {/* 6. Who does the work */}
      <PrincipalBlock tone="page" id="principal" />

      {/* 7. Closing call */}
      <section className="dark-band atmosphere-band px-[var(--content-padding-x-mobile)] py-16 min-[641px]:px-[var(--content-padding-x)] min-[641px]:py-24" aria-labelledby="close-h">
        <div className="mx-auto flex max-w-[var(--content-max-width)] flex-wrap items-end justify-between gap-8">
          <h2 id="close-h" className="t-h2 max-w-[24ch] text-paper">
            Find out what to fix first
          </h2>
          <Ctas placement="closing" inverse />
        </div>
      </section>
    </>
  );
}
