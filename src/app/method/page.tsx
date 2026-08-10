import type { Metadata } from "next";
import Link from "next/link";
import { AiImpactModel } from "../../components/artifacts/AiImpactModel";
import { DirectAnswer } from "../../components/aeo/DirectAnswer";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { canonicalAnswers } from "../../lib/aeoContent";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { siteConfig } from "../../lib/siteConfig";

const title = "Method — AI Impact Model";
const description =
  "ChisokuLabs AI Impact Model: Assess, Architect, Activate, Accelerate — starting with the PMO reporting layer.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/method" },
  openGraph: {
    title: `${title} | ChisokuLabs`,
    description,
    url: `${siteConfig.url}/method`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ChisokuLabs`,
    description,
    images: ["/og.png"],
  },
};

const gates = [
  {
    gate: "Gate 1",
    after: "Post-Assess",
    question: "Is the reporting drag material?",
    go: "Clear pack-cycle friction with automation upside",
    nogo: "Stop or refocus scope",
  },
  {
    gate: "Gate 2",
    after: "Post-Architect",
    question: "Is the automation path viable?",
    go: "Blueprint + fit confirmed for Activate",
    nogo: "Descope or redesign",
  },
  {
    gate: "Gate 3",
    after: "Post-Activate",
    question: "Is the pack cycle working as designed?",
    go: "Acceptance met — ready to scale",
    nogo: "Fix before expanding",
  },
  {
    gate: "Gate 4",
    after: "Quarterly",
    question: "Is the system still earning its keep?",
    go: "Continue / expand beyond reporting",
    nogo: "Optimize or sunset underperforming flows",
  },
] as const;

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
      <section className="section report-cover pt-16">
        <div className="container max-w-3xl">
          <p className="eyebrow">Method</p>
          <h1 className="display">AI Impact Model.</h1>
          <p className="subhead mt-5">
            {siteConfig.tagline}. {siteConfig.subline}.
          </p>
          <DirectAnswer
            answer={canonicalAnswers.method}
            bullets={[
              "Go/No-Go gates after each phase — prevent runaway scope",
              "PMO reporting starts at Assess → Architect (the audit)",
              "Definitions: pack cycle, reporting drag — see glossary",
            ]}
            primaryHref="/pmo-automation-audit"
            primaryLabel="View PMO Automation Audit"
            secondaryHref="/glossary#ai-impact-model"
            secondaryLabel="Glossary · AI Impact Model"
          />
        </div>
      </section>

      <section className="section bg-[var(--color-paper)] pt-0">
        <div className="container">
          <AiImpactModel />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)]">
            PMO reporting is Assess → Architect. Implementation is Activate.
            Accelerate expands beyond the reporting layer once the pack cycle is
            stable.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Decision gates</p>
          <h2 className="headline">Go / No-Go at each phase.</h2>
          <div className="report-board paper-grain ink-corners mt-10">
            {gates.map((item, index) => (
              <div
                key={item.gate}
                className={[
                  "grid gap-4 p-5 md:grid-cols-[0.7fr_1.2fr_1.1fr_1.1fr] md:items-start",
                  index < gates.length - 1
                    ? "border-b border-[rgba(17,24,32,0.1)]"
                    : "",
                ].join(" ")}
              >
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
                    {item.gate}
                  </div>
                  <div className="mt-2 text-sm font-bold text-[var(--color-ink)]">
                    {item.after}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                    Question
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-relaxed">
                    {item.question}
                  </p>
                </div>
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                    Go
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.go}
                  </p>
                </div>
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                    No-Go
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.nogo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-band atmosphere-band">
        <div className="container flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow !text-[rgba(0,166,200,0.9)]">Start</p>
            <h2 className="headline">Begin at the reporting layer.</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={siteConfig.diagnosticUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-light"
            >
              Run Free PMO Diagnostic
            </a>
            <Link href="/contact" className="button button-line-light">
              Book Audit Fit Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
