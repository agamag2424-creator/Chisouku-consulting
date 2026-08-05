import type { Metadata } from "next";
import Link from "next/link";
import { AuditPathway } from "../../components/artifacts/AuditPathway";
import { SampleAuditArtifact } from "../../components/artifacts/SampleAuditArtifact";
import { PackCycleStrip } from "../../components/artifacts/PackCycleStrip";
import { siteConfig } from "../../lib/siteConfig";

export const metadata: Metadata = {
  title: "PMO Automation Audit",
  description:
    "A 5-10 business day PMO Automation Audit for growth-stage SMEs in the GCC and Singapore — map reporting drag, score AI automation fit, leave with a blueprint.",
  alternates: { canonical: "/pmo-automation-audit" },
};

const deliverables = [
  ["01", "Current-state map", "Workflow of inputs, owners, forums, and packs"],
  ["02", "Drag ledger", "Where reporting and escalation lose time"],
  ["03", "Automation opportunity matrix", "Impact, effort, and fit scored"],
  ["04", "AI automation fit score", "Where AI removes reporting drag — and where it does not"],
  ["05", "ROI hypothesis", "Credible operator-facing estimate"],
  ["06", "Implementation blueprint", "Sequence ready for the next 30–90 days"],
];

const forItems = [
  "COO / VP Operations / Head of PMO / Delivery Director",
  "Growth-stage SMEs in GCC or Singapore",
  "Teams stuck in manual reporting packs",
  "Leadership that needs a credible fix sequence",
];

const notForItems = [
  "Enterprises seeking multi-year PMO rebuilds",
  "Teams wanting tool licenses instead of diagnosis",
  "Buyers without delivery or reporting ownership",
  "Requests for broad transformation theatre",
];

export default function AuditPage() {
  return (
    <>
      <section className="section report-cover pt-16">
        <div className="container grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="eyebrow">The engagement</p>
            <h1 className="display">PMO Automation Audit</h1>
            <p className="subhead mt-5">
              Find reporting drag. Score AI automation fit. Leave with a blueprint —
              in {siteConfig.pricing.timeline}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="button button-primary">
                Book Audit Fit Call
              </Link>
              <a
                href={siteConfig.diagnosticUrl}
                className="button button-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Run Free Diagnostic
              </a>
            </div>
          </div>
          <div className="artifact-sheet paper-grain p-7">
            <div className="grid gap-6">
              <div>
                <div className="kicker-title">Typical timeline</div>
                <div className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold tracking-[-0.03em]">
                  {siteConfig.pricing.timeline}
                </div>
              </div>
              <div>
                <div className="kicker-title">Typical range</div>
                <div className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold tracking-[-0.03em]">
                  USD 4,000–5,000
                </div>
              </div>
              <div className="rule" />
              <p className="body-copy">
                Final scope confirmed after the fit call — workstreams, tools, and
                stakeholder interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow">Who it is for</p>
            <h2 className="headline">Operators who need visibility.</h2>
            <ul className="mt-8">
              {forItems.map((item) => (
                <li key={item} className="editorial-row !grid-cols-1 md:!grid-cols-[16px_1fr]">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-cyan)]" aria-hidden />
                  <span className="text-sm font-semibold leading-relaxed text-[var(--color-ink)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Who it is not for</p>
            <h2 className="headline">Not a transformation programme.</h2>
            <ul className="mt-8">
              {notForItems.map((item) => (
                <li key={item} className="editorial-row !grid-cols-1 md:!grid-cols-[16px_1fr]">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[rgba(17,24,32,0.25)]" aria-hidden />
                  <span className="text-sm font-semibold leading-relaxed text-[var(--color-ink)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">How AI enters</p>
          <h2 className="headline">Manual pack → AI-assisted pack.</h2>
          <p className="subhead mt-4">
            The audit finds where automation removes drag — before you build.
          </p>
          <div className="mt-10">
            <PackCycleStrip />
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <p className="eyebrow">Process</p>
          <h2 className="headline">Four phases. Clear outputs.</h2>
          <div className="mt-10">
            <AuditPathway />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Deliverables</p>
          <h2 className="headline">What you leave with.</h2>
          <div className="mt-10">
            {deliverables.map(([n, title, detail]) => (
              <div key={title} className="editorial-row">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                  {n}
                </span>
                <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.02em]">
                  {title}
                </span>
                <span className="text-sm leading-relaxed text-[var(--color-muted)]">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <p className="eyebrow">Audit output</p>
          <h2 className="headline">Audit artifact.</h2>
          <div className="mt-10">
            <SampleAuditArtifact />
          </div>
          <div className="mt-10 grid gap-6 border-t border-[rgba(17,24,32,0.12)] pt-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              The audit can stop at the blueprint — or continue into implementation when
              ownership and fit are clear.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link href="/contact" className="button button-primary">
                Book Audit Fit Call
              </Link>
              <Link href="/implementation" className="button button-secondary">
                View implementation path
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
