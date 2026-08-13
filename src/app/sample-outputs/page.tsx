import type { Metadata } from "next";
import Link from "next/link";
import { PmoOperatingMap } from "../../components/artifacts/PmoOperatingMap";
import { DragLedger } from "../../components/artifacts/DragLedger";
import { OpportunityMatrix } from "../../components/artifacts/OpportunityMatrix";
import { ImplementationBlueprint } from "../../components/artifacts/ImplementationBlueprint";
import { AiReportingBlueprint } from "../../components/artifacts/AiReportingBlueprint";
import { SampleAuditArtifact } from "../../components/artifacts/SampleAuditArtifact";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { siteConfig } from "../../lib/siteConfig";

const title = "Audit Outputs";
const description =
  "PMO Automation Audit artifacts — operating map, drag ledger, opportunity matrix, AI reporting blueprint, and implementation sequence.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sample-outputs" },
  openGraph: {
    title: `${title} | ChisokuLabs`,
    description,
    url: `${siteConfig.url}/sample-outputs`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ChisokuLabs`,
    description,
    images: ["/og.png"],
  },
};

const strip = [
  { href: "#map", n: "01", title: "Map", detail: "Operating map" },
  { href: "#locate", n: "02", title: "Locate", detail: "Drag ledger" },
  { href: "#prioritize", n: "03", title: "Prioritize", detail: "Opportunity matrix" },
  { href: "#ai-blueprint", n: "04", title: "AI Blueprint", detail: "Reporting automation" },
  { href: "#blueprint", n: "05", title: "Sequence", detail: "Implementation plan" },
] as const;

export default function SampleOutputsPage() {
  return (
    <>
      <JsonLdScript
        id="sample-outputs-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Audit Outputs", path: "/sample-outputs" },
        ])}
      />
      <section className="section report-cover pt-16">
        <div className="container max-w-3xl">
          <p className="eyebrow">Audit outputs</p>
          <h1 className="display">What the audit produces.</h1>
          <p className="subhead mt-5">
            Map · Drag Ledger · Opportunity Matrix · AI Blueprint · Sequence.
          </p>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)] pt-0">
        <div className="container">
          <p className="eyebrow">Featured</p>
          <h2 className="headline">Full artifact excerpt.</h2>
          <div className="mt-8">
            <SampleAuditArtifact />
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <p className="eyebrow">Jump the sequence</p>
          <div className="output-strip mt-6">
            {strip.map((item) => (
              <a key={item.href} href={item.href}>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  {item.n}
                </span>
                <div className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.02em]">
                  {item.title}
                </div>
                <div className="mt-1 text-sm text-[var(--color-muted)]">{item.detail}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container grid gap-14">
          <div id="map">
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
              01 · Map
            </p>
            <h2 className="headline !max-w-none">PMO Operating Map</h2>
            <div className="mt-6">
              <PmoOperatingMap compact />
            </div>
          </div>
          <div id="locate">
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
              02 · Locate
            </p>
            <h2 className="headline !max-w-none">Drag Ledger</h2>
            <div className="mt-6">
              <DragLedger />
            </div>
          </div>
          <div id="prioritize">
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
              03 · Prioritize
            </p>
            <h2 className="headline !max-w-none">Automation Opportunity Matrix</h2>
            <div className="mt-6">
              <OpportunityMatrix />
            </div>
          </div>
          <div id="ai-blueprint">
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
              04 · AI Blueprint
            </p>
            <h2 className="headline !max-w-none">AI Reporting Automation Blueprint</h2>
            <div className="mt-6">
              <AiReportingBlueprint />
            </div>
          </div>
          <div id="blueprint">
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
              05 · Sequence
            </p>
            <h2 className="headline !max-w-none">Implementation Blueprint</h2>
            <div className="mt-6">
              <ImplementationBlueprint />
            </div>
          </div>
        </div>
        <div className="container mt-12 flex flex-col gap-3 sm:flex-row">
          <Link href="/pmo-automation-audit" className="button button-primary">
            View PMO Automation Audit
          </Link>
          <Link href="/contact" className="button button-secondary">
            Book Audit Fit Call
          </Link>
          <Link href="/implementation" className="button button-secondary">
            View implementation path
          </Link>
        </div>
        <p className="container mt-6 text-sm text-[var(--color-muted)]">
          Related:{" "}
          <Link href="/free-pmo-diagnostic" className="font-semibold text-[var(--color-cyan-strong)]">
            Free PMO Diagnostic
          </Link>
          {" · "}
          <Link href="/method" className="font-semibold text-[var(--color-cyan-strong)]">
            Method
          </Link>
          {" · "}
          <Link href="/founder-track-record" className="font-semibold text-[var(--color-cyan-strong)]">
            Founder
          </Link>
        </p>
      </section>
    </>
  );
}
