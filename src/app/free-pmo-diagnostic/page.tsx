import type { Metadata } from "next";
import Link from "next/link";
import { DiagnosticOrbit } from "../../components/artifacts/DiagnosticOrbit";
import { DirectAnswer } from "../../components/aeo/DirectAnswer";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { canonicalAnswers } from "../../lib/aeoContent";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { siteConfig } from "../../lib/siteConfig";

const title = "Free PMO Diagnostic";
const description =
  "5-minute PMO baseline — see where AI automation can remove reporting drag before an Audit Fit Call.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/free-pmo-diagnostic" },
  openGraph: {
    title: `${title} | ChisokuLabs`,
    description,
    url: `${siteConfig.url}/free-pmo-diagnostic`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ChisokuLabs`,
    description,
    images: ["/og.png"],
  },
};

const measures = [
  ["Governance", "Cadence, ownership, escalation thresholds"],
  ["Reporting", "Pack assembly, freshness, reconciliation drag"],
  ["Risk", "RAID visibility and late-signal patterns"],
  ["Resources", "Capacity conflicts and planning friction"],
  ["AI readiness", "Automation fit — where AI can remove reporting drag"],
];

export default function DiagnosticPage() {
  return (
    <>
      <JsonLdScript
        id="diagnostic-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Free PMO Diagnostic", path: "/free-pmo-diagnostic" },
        ])}
      />
      <section className="section pt-16">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow">Start here</p>
            <h1 className="display">Free PMO Diagnostic</h1>
            <p className="subhead mt-5">
              A 5-minute baseline that shows where AI automation can remove
              reporting drag — before an Audit Fit Call.
            </p>
            <DirectAnswer
              answer={canonicalAnswers.diagnostic}
              bullets={[
                "20 questions · No login · No data stored",
                "Maturity profile, dimension scores, 90-day priority actions",
                "Next step if the gap is material: Audit Fit Call",
              ]}
              primaryHref={siteConfig.diagnosticUrl}
              primaryLabel="Run Free PMO Diagnostic"
              secondaryHref="/contact"
              secondaryLabel="Book Audit Fit Call"
            />
          </div>
          <DiagnosticOrbit />
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <p className="eyebrow">What it measures</p>
          <h2 className="headline">Five operating signals. One baseline.</h2>
          <div className="report-board paper-grain mt-10">
            {measures.map(([title, detail], index) => (
              <div
                key={title}
                className={[
                  "editorial-row px-5 md:px-6",
                  index === 0 ? "border-t-0" : "",
                  title === "AI readiness"
                    ? "bg-[rgba(0,166,200,0.04)]"
                    : "",
                ].join(" ")}
              >
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.02em]">
                  {title}
                </span>
                <span className="text-sm text-[var(--color-muted)]">{detail}</span>
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

      <section className="section dark-band atmosphere-band">
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
