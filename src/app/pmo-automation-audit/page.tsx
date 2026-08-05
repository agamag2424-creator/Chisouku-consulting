import type { Metadata } from "next";
import Link from "next/link";
import { AuditPathway } from "../../components/artifacts/AuditPathway";
import { SampleAuditArtifact } from "../../components/artifacts/SampleAuditArtifact";
import { siteConfig } from "../../lib/siteConfig";

export const metadata: Metadata = {
  title: "PMO Automation Audit",
  description:
    "A 5-10 business day PMO Automation Audit for growth-stage SMEs in the GCC and Singapore, typically USD 4,000-5,000.",
  alternates: { canonical: "/pmo-automation-audit" },
};

const deliverables = [
  ["Current-state map", "Workflow of inputs, owners, forums, and packs"],
  ["Drag ledger", "Where reporting and escalation lose time"],
  ["Automation opportunity matrix", "Impact, effort, and fit scored"],
  ["ROI hypothesis", "Credible operator-facing estimate"],
  ["Implementation blueprint", "Sequence ready for the next 30-90 days"],
];

export default function AuditPage() {
  return (
    <>
      <section className="section pt-16">
        <div className="container grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="eyebrow">The engagement</p>
            <h1 className="display">PMO Automation Audit</h1>
            <p className="subhead mt-5">
              Find and fix project reporting, governance, and delivery bottlenecks
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
          <div className="artifact-sheet p-7">
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
                  USD 4,000-5,000
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
        <div className="container grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Who it is for</p>
            <h2 className="headline">Operators who need visibility, not theatre.</h2>
            <ul className="mt-6 space-y-3 text-sm font-semibold text-[var(--color-ink)]">
              <li>COO / VP Operations / Head of PMO / Delivery Director</li>
              <li>Growth-stage SMEs in GCC or Singapore</li>
              <li>Teams stuck in manual reporting packs</li>
              <li>Leadership that needs a credible fix sequence</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Who it is not for</p>
            <h2 className="headline">Not a broad transformation programme.</h2>
            <ul className="mt-6 space-y-3 text-sm font-semibold text-[var(--color-ink)]">
              <li>Enterprises seeking multi-year PMO rebuilds</li>
              <li>Teams wanting tool licenses instead of diagnosis</li>
              <li>Buyers without delivery or reporting ownership</li>
              <li>Buyers looking for multi-year transformation programmes</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Process</p>
          <h2 className="headline">Four phases. Clear buyer outputs.</h2>
          <div className="mt-10">
            <AuditPathway />
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <p className="eyebrow">Deliverables</p>
          <h2 className="headline">What you leave with.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {deliverables.map(([title, detail]) => (
              <div
                key={title}
                className="border border-[rgba(17,24,32,0.12)] bg-[rgba(255,253,248,0.9)] p-5"
              >
                <div className="font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.02em]">
                  {title}
                </div>
                <div className="mt-2 text-sm text-[var(--color-muted)]">{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Audit output</p>
          <h2 className="headline">Audit artifact.</h2>
          <div className="mt-10">
            <SampleAuditArtifact />
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="button button-primary">
              Book Audit Fit Call
            </Link>
            <Link href="/sample-outputs" className="button button-secondary">
              Browse outputs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
