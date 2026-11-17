import type { Metadata } from "next";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { DimensionOrbit } from "../../components/diagrams/DimensionOrbit";
import { PmoHealthMap } from "../../components/diagrams/PmoHealthMap";
import { OfferClosing, OfferCtas, SectionHead } from "../../components/offers/OfferSections";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { healthCheck } from "../../content/offer";
import { levels } from "../../content/pmoSelfCheck";
import { aiOnOurDataAnswer } from "../../lib/aeoContent";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata("/method");

/** One line per level, in our own words (research file, section 2 design notes). */
const levelMeanings: Record<(typeof levels)[number], string> = {
  "Ad hoc": "It depends on who is involved. Nothing is written down.",
  Emerging: "Good practice in places, often on the larger projects.",
  Defined: "Written down and mostly followed across the portfolio.",
  Measured: "Checked against data, and used to decide.",
  Improving: "Reviewed regularly and changed when it does not work.",
};

const fiveChecks = [
  { name: "Status", text: "What is reported, and when it was last true." },
  { name: "Owner", text: "A named person who will act on it." },
  { name: "Evidence", text: "A document that shows it: a log, minutes, a plan, a forecast." },
  { name: "Date", text: "When the action is due, or the decision was taken." },
  { name: "Action", text: "What happens next, and whether it happened." },
];

/** /method (Story 6.1): the PMO Health Scorecard, the three problems, how evidence is checked, the fix plan. */
export default function MethodPage() {
  return (
    <>
      <JsonLdScript
        id="method-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Method", path: "/method" },
        ])}
      />

      <Section className="report-cover">
        <p className="eyebrow">Method</p>
        <h1 className="t-h1 max-w-[22ch] text-ink">The PMO Health Scorecard: ten dimensions, scored on evidence.</h1>
        <p className="t-body mt-5 max-w-[62ch] text-muted">
          The free self-check scores the ten dimensions from your own answers. The PMO Health Check fills the same ten in
          with evidence from your documents and three short interviews.
        </p>
        <div className="mt-8">
          <OfferCtas content="health_check" />
        </div>
      </Section>

      <Section tone="paper" aria-labelledby="dimensions-h">
        <div className="grid gap-10 min-[1100px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] min-[1100px]:items-start min-[1100px]:gap-16">
          <div>
            <h2 id="dimensions-h" className="t-h2 text-ink">
              Ten dimensions, five levels
            </h2>
            <p className="t-body mt-5 text-muted">
              Each dimension is placed on one of five levels. The overall band is the average across all ten, each weighted
              equally, and any dimension at the second level or below is flagged.
            </p>
            <dl className="mt-8 grid gap-3">
              {levels.map((level, index) => (
                <div key={level} className="grid grid-cols-[28px_120px_minmax(0,1fr)] gap-3 border-t border-line pt-3">
                  <dt className="font-[family-name:var(--font-mono)] text-[14px] font-bold text-teal">{index + 1}</dt>
                  <dt className="font-semibold text-ink">{level}</dt>
                  <dd className="text-[16px] text-muted">{levelMeanings[level]}</dd>
                </div>
              ))}
            </dl>
          </div>
          <DimensionOrbit stacked />
        </div>
      </Section>

      <Section aria-labelledby="problems-h">
        <SectionHead title="Where the three problems show up">
          <p>
            RAID logs nobody acts on, status that turns Red too late and forums that cannot decide each leave a trace in a
            document. That is where we look first.
          </p>
        </SectionHead>
        <PmoHealthMap className="mt-10" />
      </Section>

      <Section tone="paper" aria-labelledby="checks-h">
        <SectionHead title="How evidence is checked">
          <p>
            For each status claim, RAID action and decision we check five things. An action with no owner or date is not
            being managed. A Green status while milestones slip is not Green.
          </p>
        </SectionHead>
        <ol className="mt-10 grid gap-3 min-[900px]:grid-cols-5">
          {fiveChecks.map((check, index) => (
            <li key={check.name} className="panel p-5">
              <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold text-teal">0{index + 1}</p>
              <p className="t-h3 mt-2 text-ink">{check.name}</p>
              <p className="t-small mt-2 text-muted">{check.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section aria-labelledby="plan-h">
        <SectionHead title="From findings to a 30-day fix plan">
          <p>
            Every finding becomes an action with an owner, a date and the evidence that closes it. {healthCheck.outputs}.
          </p>
        </SectionHead>
        <div className="mt-8">
          <Button href="/see-it-first" variant="text">
            See a sample scorecard and fix plan
          </Button>
        </div>
      </Section>

      <Section tone="paper" aria-label="What tooling does, and how AI is used">
        <div className="grid items-start gap-12 min-[1100px]:grid-cols-2 min-[1100px]:gap-16">
          <div>
            <h2 className="t-h2 text-ink">What tooling does and doesn&apos;t do</h2>
            <p className="t-body mt-6 text-ink">
              Tooling extracts and cross-checks status claims, RAID actions and decisions. It does not decide: every finding
              is reviewed and signed by a person.
            </p>
          </div>
          <section id="how-we-use-ai" aria-labelledby="how-we-use-ai-heading">
            <h2 id="how-we-use-ai-heading" className="t-h2 text-ink">
              How we use AI, safely
            </h2>
            <p className="t-body mt-6 text-ink">{aiOnOurDataAnswer}</p>
          </section>
        </div>
      </Section>

      <OfferClosing />
    </>
  );
}
