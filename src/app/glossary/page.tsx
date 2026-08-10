import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { glossaryTerms } from "../../lib/aeoContent";
import { breadcrumbJsonLd, definedTermSetJsonLd } from "../../lib/jsonLd";
import { siteConfig } from "../../lib/siteConfig";

const title = "Glossary — Pack Cycle, Reporting Drag & AI Impact Model";
const description =
  "Definitions for pack cycle, reporting drag, drag ledger, PMO Automation Audit, Free PMO Diagnostic, and the AI Impact Model used by ChisokuLabs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/glossary" },
  openGraph: {
    title: `${title} | ChisokuLabs`,
    description,
    url: `${siteConfig.url}/glossary`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ChisokuLabs`,
    description,
    images: ["/og.png"],
  },
};

export default function GlossaryPage() {
  return (
    <>
      <JsonLdScript
        id="glossary-defined-terms-ld-json"
        data={definedTermSetJsonLd(glossaryTerms)}
      />
      <JsonLdScript
        id="glossary-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Glossary", path: "/glossary" },
        ])}
      />

      <section className="section report-cover pt-16">
        <div className="container max-w-3xl">
          <p className="eyebrow">Definitions</p>
          <h1 className="display !max-w-[18ch]">Glossary — Pack cycle & reporting drag</h1>
          <p className="subhead mt-5">
            Shared language for the reporting layer — so buyers and answer engines
            cite the same meanings.
          </p>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            Buyer questions:{" "}
            <Link href="/faq" className="font-semibold text-[var(--color-cyan-strong)]">
              FAQ
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container max-w-3xl space-y-10">
          {glossaryTerms.map((term) => (
            <article
              key={term.id}
              id={term.id}
              className="scroll-mt-28 border-b border-[rgba(17,24,32,0.1)] pb-10 last:border-b-0"
            >
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em] text-[var(--color-ink)] md:text-2xl">
                {term.term}
              </h2>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[var(--color-ink)]">
                {term.definition}
              </p>
              {term.relatedHref && term.relatedLabel ? (
                <p className="mt-3 text-sm text-[var(--color-muted)]">
                  Related:{" "}
                  <Link
                    href={term.relatedHref}
                    className="font-semibold text-[var(--color-cyan-strong)]"
                  >
                    {term.relatedLabel}
                  </Link>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
