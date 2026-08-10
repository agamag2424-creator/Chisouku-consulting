import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { faqItems } from "../../lib/aeoContent";
import { breadcrumbJsonLd, faqPageJsonLd } from "../../lib/jsonLd";
import { siteConfig } from "../../lib/siteConfig";

const title = "FAQ — PMO Diagnostic, Audit & Implementation";
const description =
  "Answers on ChisokuLabs: Free PMO Diagnostic, PMO Automation Audit pricing and timeline, pack cycle, reporting drag, and how to start in the GCC and Singapore.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `${title} | ChisokuLabs`,
    description,
    url: `${siteConfig.url}/faq`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ChisokuLabs`,
    description,
    images: ["/og.png"],
  },
};

export default function FaqPage() {
  return (
    <>
      <JsonLdScript id="faq-page-ld-json" data={faqPageJsonLd(faqItems)} />
      <JsonLdScript
        id="faq-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />

      <section className="section report-cover pt-16">
        <div className="container max-w-3xl">
          <p className="eyebrow">Answers</p>
          <h1 className="display">FAQ.</h1>
          <p className="subhead mt-5">
            Direct answers on the Free PMO Diagnostic, PMO Automation Audit, and
            implementation path — for growth-stage SMEs in the{" "}
            {siteConfig.markets.primary} and {siteConfig.markets.secondary}.
          </p>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            Definitions:{" "}
            <Link href="/glossary" className="font-semibold text-[var(--color-cyan-strong)]">
              Glossary
            </Link>
            . Machine-readable map:{" "}
            <a href="/llms.txt" className="font-semibold text-[var(--color-cyan-strong)]">
              llms.txt
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container max-w-3xl space-y-10">
          {faqItems.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="scroll-mt-28 border-b border-[rgba(17,24,32,0.1)] pb-10 last:border-b-0"
            >
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em] text-[var(--color-ink)] md:text-2xl">
                {item.question}
              </h2>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[var(--color-ink)]">
                {item.answer}
              </p>
              {item.detail ? (
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {item.detail}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <p className="eyebrow">Next step</p>
          <h2 className="headline">Start with the baseline.</h2>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={siteConfig.diagnosticUrl}
              className="button button-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Run Free PMO Diagnostic
            </a>
            <Link href="/contact" className="button button-secondary">
              Book Audit Fit Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
