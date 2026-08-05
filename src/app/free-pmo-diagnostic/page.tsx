import type { Metadata } from "next";
import Link from "next/link";
import { DiagnosticOrbit } from "../../components/artifacts/DiagnosticOrbit";
import { siteConfig } from "../../lib/siteConfig";

export const metadata: Metadata = {
  title: "Free PMO Diagnostic",
  description:
    "Use the free PMO Maturity Tool before deciding whether the ChisokuLabs PMO Automation Audit is a fit.",
  alternates: { canonical: "/free-pmo-diagnostic" },
};

const measures = [
  ["Governance", "Cadence, ownership, escalation thresholds"],
  ["Reporting", "Pack assembly, freshness, reconciliation drag"],
  ["Risk", "RAID visibility and late-signal patterns"],
  ["Resources", "Capacity conflicts and planning friction"],
  ["Automation fit", "Where tooling can reduce manual load"],
];

export default function DiagnosticPage() {
  return (
    <>
      <section className="section pt-16">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow">Start here</p>
            <h1 className="display">Free PMO Diagnostic</h1>
            <p className="subhead mt-5">
              Start with a 5-minute PMO baseline before an Audit Fit Call.
            </p>
            <a
              href={siteConfig.diagnosticUrl}
              className="button button-primary mt-8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the PMO Maturity Tool
            </a>
          </div>
          <DiagnosticOrbit />
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <p className="eyebrow">What it measures</p>
          <h2 className="headline">Five operating signals. One baseline.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {measures.map(([title, detail]) => (
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
        <div className="container grid gap-10 md:grid-cols-3">
          {[
            ["Who should use it", "COO, VP Ops, Head of PMO, Delivery Director, Founder/CEO"],
            ["What the score means", "A directional maturity baseline — not a certification"],
            ["What to do next", "If drag is material, review the paid audit and book a fit call"],
          ].map(([title, copy]) => (
            <div key={title} className="border-t border-[rgba(17,24,32,0.16)] pt-5">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em]">
                {title}
              </h2>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section dark-band">
        <div className="container grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="eyebrow !text-[rgba(0,166,200,0.9)]">After the diagnostic</p>
            <h2 className="headline">If the gap is material, map the audit.</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link href="/pmo-automation-audit" className="button button-light">
              View PMO Automation Audit
            </Link>
            <Link href="/contact" className="button button-line-light">
              Book Audit Fit Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
