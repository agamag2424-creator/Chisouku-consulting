import type { Metadata } from "next";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { OfferClosing, OfferCtas } from "../../components/offers/OfferSections";
import { Section } from "../../components/ui/Section";
import { healthCheck } from "../../content/offer";
import { dimensions, levels } from "../../content/pmoSelfCheck";
import { sampleFixPlan, sampleLabel, sampleOrganisation, sampleScorecard, sampleSummary } from "../../content/samples";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { pageMetadata } from "../../lib/seo";
import { cn } from "../../lib/utils";

export const metadata: Metadata = pageMetadata("/see-it-first");

const statusStyle = {
  ok: { dot: "bg-ev-ok", label: "Evidenced" },
  part: { dot: "bg-ev-part", label: "Partly evidenced" },
  miss: { dot: "bg-ev-miss", label: "Not evidenced" },
} as const;

function SampleBadge() {
  return (
    <span className="inline-block rounded-[2px] border border-gold-ink/40 bg-[rgba(168,146,95,0.1)] px-2 py-1 label text-gold-ink">
      {sampleLabel}
    </span>
  );
}

/** /see-it-first (PRD change 8, Story 6.2): a sample PMO Health Scorecard and a sample 30-day fix plan. */
export default function SeeItFirstPage() {
  const nameOf = (id: string) => dimensions.find((d) => d.id === id)?.name ?? id;
  return (
    <>
      <JsonLdScript
        id="see-it-first-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "See it first", path: "/see-it-first" },
        ])}
      />

      <Section className="report-cover">
        <p className="eyebrow">See it first</p>
        <h1 className="t-h1 max-w-[22ch] text-ink">What a PMO Health Check gives you</h1>
        <p className="t-body mt-5 max-w-[60ch] text-muted">
          {healthCheck.outputs}. Below are a sample scorecard and a sample fix plan for a fictional organisation.
        </p>
        <div className="mt-8">
          <OfferCtas content="see_it_first" />
        </div>
      </Section>

      <Section tone="paper" aria-labelledby="scorecard-h">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="scorecard-h" className="t-h2 text-ink">
              Sample PMO Health Scorecard
            </h2>
            <p className="t-body mt-2 text-muted">
              {sampleOrganisation.name}. {sampleOrganisation.context}
            </p>
          </div>
          <SampleBadge />
        </div>

        <div className="artifact-sheet paper-grain ink-corners mt-8 overflow-hidden" data-sample="scorecard">
          <div className="grid gap-4 border-b border-ink/10 p-5 min-[800px]:grid-cols-3 md:p-7">
            <div>
              <p className="label text-muted">Overall band</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold">
                {sampleSummary.band} <span className="text-[16px] text-muted">({sampleSummary.overall})</span>
              </p>
            </div>
            <div>
              <p className="label text-muted">Flagged</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold">{sampleSummary.flagged.join(", ")}</p>
            </div>
            <p className="t-small text-ink">{sampleSummary.headline}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-[15px]">
              <caption className="sr-only">{`Sample PMO Health Scorecard for ${sampleOrganisation.name}`}</caption>
              <thead>
                <tr className="border-b border-ink/15 label text-muted">
                  <th scope="col" className="px-5 py-3 font-bold md:px-7">Dimension</th>
                  <th scope="col" className="px-3 py-3 font-bold">Level</th>
                  <th scope="col" className="px-3 py-3 font-bold">Evidence seen</th>
                  <th scope="col" className="px-3 py-3 font-bold md:pr-7">Finding</th>
                </tr>
              </thead>
              <tbody>
                {sampleScorecard.map((row) => (
                  <tr key={row.dimension} className="border-b border-ink/10 align-top">
                    <th scope="row" className="px-5 py-3 font-semibold text-ink md:px-7">{nameOf(row.dimension)}</th>
                    <td className="whitespace-nowrap px-3 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span aria-hidden className={cn("h-2.5 w-2.5 rounded-full", statusStyle[row.status].dot)} />
                        {levels[row.level - 1]}
                        <span className="sr-only">, {statusStyle[row.status].label}</span>
                      </span>
                    </td>
                    <td className="px-3 py-3 text-muted">{row.evidence}</td>
                    <td className="px-3 py-3 text-ink md:pr-7">{row.finding}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="plan-h">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="plan-h" className="t-h2 text-ink">
            Sample 30-day fix plan
          </h2>
          <SampleBadge />
        </div>
        <ol className="mt-8 grid gap-3" data-sample="fix-plan">
          {sampleFixPlan.map((item, index) => (
            <li key={item.action} className="panel grid gap-3 p-5 min-[900px]:grid-cols-[150px_minmax(0,1.4fr)_minmax(0,0.6fr)_minmax(0,1fr)] min-[900px]:gap-6">
              <p className="label text-gold-ink">
                {String(index + 1).padStart(2, "0")} · {item.when}
              </p>
              <p className="text-[16px] font-semibold text-ink">{item.action}</p>
              <p className="text-[15px] text-ink">
                <span className="text-muted">Owner: </span>
                {item.owner}
              </p>
              <p className="text-[15px] text-muted">
                <span className="text-ink">Closed when: </span>
                {item.evidence}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <OfferClosing />
    </>
  );
}
