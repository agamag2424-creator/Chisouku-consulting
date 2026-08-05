import type { Metadata } from "next";
import Link from "next/link";
import { AiReportingBlueprint } from "../../components/artifacts/AiReportingBlueprint";
import { PackCycleStrip } from "../../components/artifacts/PackCycleStrip";
import { siteConfig } from "../../lib/siteConfig";

export const metadata: Metadata = {
  title: "AI Implementation Path",
  description:
    "What Activate looks like after the PMO Automation Audit — Data → Integration → Logic → Interface for the reporting pack cycle.",
  alternates: { canonical: "/implementation" },
};

const automateFirst = [
  ["Status collection", "Pull signals from the systems already in use"],
  ["Consolidation", "Remove spreadsheet glue between sources"],
  ["Narrative packs", "LLM-assisted summaries where judgment still matters"],
  ["Distribution", "Fresh packs to the right forums on cadence"],
];

const doNotSell = [
  "Tool licenses or reseller theatre",
  "Multi-year PMO rebuild programmes",
  "Generic “AI strategy” without a reporting wedge",
  "Dashboards without an operating owner",
];

export default function ImplementationPage() {
  return (
    <>
      <section className="section report-cover pt-16">
        <div className="container max-w-3xl">
          <p className="eyebrow">Activate</p>
          <h1 className="display">AI implementation path.</h1>
          <p className="subhead mt-5">
            After the audit blueprint — build AI automation into the pack cycle.
            Clarity on what Activate looks like — not a separate offer.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact?interest=AI%20Implementation" className="button button-primary">
              Book Implementation Fit Call
            </Link>
            <Link href="/pmo-automation-audit" className="button button-secondary">
              Start with the audit
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <p className="eyebrow">Architecture</p>
          <h2 className="headline">Data → Integration → Logic → Interface.</h2>
          <p className="subhead mt-4">
            The Activate stack for the PMO reporting layer.
          </p>
          <div className="mt-10">
            <AiReportingBlueprint />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">What we automate first</p>
          <h2 className="headline">Where drag repeats weekly.</h2>
          <div className="mt-10">
            {automateFirst.map(([title, detail], index) => (
              <div key={title} className="editorial-row">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.02em]">
                  {title}
                </span>
                <span className="text-sm leading-relaxed text-[var(--color-muted)]">{detail}</span>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <PackCycleStrip />
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow">What we do not sell</p>
            <h2 className="headline">No licence theatre.</h2>
            <ul className="mt-8">
              {doNotSell.map((item) => (
                <li key={item} className="editorial-row !grid-cols-1 md:!grid-cols-[16px_1fr]">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[rgba(17,24,32,0.25)]" aria-hidden />
                  <span className="text-sm font-semibold leading-relaxed text-[var(--color-ink)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Systems</p>
            <h2 className="headline">Automate against what you run.</h2>
            <p className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
              {siteConfig.systems.join(" · ")}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-[var(--color-muted)]">
              Audit first when the reporting layer is unclear. Implementation when
              the blueprint is real and ownership is ready.
            </p>
            <Link href="/method" className="button button-secondary mt-8">
              View AI Impact Model
            </Link>
          </div>
        </div>
      </section>

      <section className="section dark-band atmosphere-band">
        <div className="container flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow !text-[rgba(0,166,200,0.9)]">Fit call</p>
            <h2 className="headline">Ready for Activate?</h2>
          </div>
          <Link href="/contact?interest=AI%20Implementation" className="button button-light">
            Book Implementation Fit Call
          </Link>
        </div>
      </section>
    </>
  );
}
