import type { Metadata } from "next";
import Link from "next/link";
import { AiReportingBlueprint } from "../../components/artifacts/AiReportingBlueprint";
import { PackCycleStrip } from "../../components/artifacts/PackCycleStrip";
import { DirectAnswer } from "../../components/aeo/DirectAnswer";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { canonicalAnswers } from "../../lib/legacyAeo";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { siteConfig } from "../../lib/siteConfig";
import { legacy } from "../../lib/legacyOffer"; // removed in E10

const title = "Implementation after the PMO Automation Audit";
const description =
  "What implementation looks like after the PMO Automation Audit — Data, then Integration, then Logic, then Interface for the reporting pack cycle.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/implementation" },
  openGraph: {
    title: `${title} | ChisokuLabs`,
    description,
    url: `${siteConfig.url}/implementation`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ChisokuLabs`,
    description,
    images: ["/og.png"],
  },
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
  "Generic “AI strategy” without a reporting starting point",
  "Dashboards without an operating owner",
];

export default function ImplementationPage() {
  return (
    <>
      <JsonLdScript
        id="implementation-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Implementation", path: "/implementation" },
        ])}
      />
      <section className="section report-cover pt-16">
        <div className="container max-w-3xl">
          <h1 className="display">Implementation after the PMO Automation Audit.</h1>
          <p className="subhead mt-5">
            After the audit blueprint — build AI automation into the pack cycle.
            Clarity on what implementation looks like — not a separate offer.
          </p>
          <DirectAnswer
            answer={canonicalAnswers.implementation}
            bullets={[
              "Automate first: collection, then consolidation, then narrative, then distribution",
              canonicalAnswers.systems,
              "Not sold: tool licenses, multi-year rebuilds, strategy without a reporting start",
            ]}
            primaryHref="/contact?interest=AI%20Implementation"
            primaryLabel="Book Implementation Fit Call"
            secondaryHref="/pmo-automation-audit"
            secondaryLabel="Start with the audit"
          />
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <h2 className="headline">Data, then Integration, then Logic, then Interface.</h2>
          <p className="subhead mt-4">
            The implementation stack for the PMO reporting layer.
          </p>
          <div className="mt-10">
            <AiReportingBlueprint />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="headline">Where drag repeats weekly.</h2>
          <div className="mt-10">
            {automateFirst.map(([title, detail], index) => (
              <div key={title} className="editorial-row">
                <span className="text-[13px] font-bold text-[var(--color-muted)]">
                  {index + 1}
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
            <h2 className="headline">No licence theatre.</h2>
            <ul className="mt-8">
              {doNotSell.map((item) => (
                <li key={item} className="editorial-row !grid-cols-1 md:!grid-cols-[16px_1fr]">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ink/25" aria-hidden />
                  <span className="text-sm font-semibold leading-relaxed text-[var(--color-ink)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="headline">Automate against what you run.</h2>
            <p className="mt-6 text-[13px] font-bold text-[var(--color-muted)]">
              {legacy.systems.join(", ")}
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
            <h2 className="headline">Ready to implement?</h2>
          </div>
          <Link href="/contact?interest=AI%20Implementation" className="button button-light">
            Book Implementation Fit Call
          </Link>
        </div>
        <p className="container mt-6 text-sm text-paper/72">
          Related:{" "}
          <Link href="/free-pmo-diagnostic" className="font-semibold text-paper">
            Free PMO Diagnostic
          </Link>
          {", "}
          <Link href="/pmo-automation-audit" className="font-semibold text-paper">
            PMO Automation Audit
          </Link>
          {", "}
          <Link href="/method" className="font-semibold text-paper">
            Method
          </Link>
          {", "}
          <Link href="/sample-outputs" className="font-semibold text-paper">
            Sample outputs
          </Link>
        </p>
      </section>
    </>
  );
}
