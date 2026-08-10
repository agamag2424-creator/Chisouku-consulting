import Link from "next/link";
import { DirectAnswer } from "./DirectAnswer";
import { JsonLdScript } from "./JsonLdScript";
import { breadcrumbJsonLd } from "../../lib/jsonLd";

export type GuideSection = {
  heading: string;
  paragraphs: string[];
};

type GuidePageProps = {
  breadcrumbName: string;
  path: string;
  eyebrow: string;
  title: string;
  subhead: string;
  answer: string;
  bullets: readonly string[];
  sections: GuideSection[];
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export function GuidePage({
  breadcrumbName,
  path,
  eyebrow,
  title,
  subhead,
  answer,
  bullets,
  sections,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: GuidePageProps) {
  return (
    <>
      <JsonLdScript
        id={`guide-breadcrumb-${path.replace(/\//g, "")}`}
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: breadcrumbName, path },
        ])}
      />
      <section className="section report-cover pt-16">
        <div className="container max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display !max-w-[18ch]">{title}</h1>
          <p className="subhead mt-5">{subhead}</p>
          <DirectAnswer
            answer={answer}
            bullets={bullets}
            primaryHref={primaryHref}
            primaryLabel={primaryLabel}
            secondaryHref={secondaryHref}
            secondaryLabel={secondaryLabel}
          />
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container max-w-3xl space-y-12">
          {sections.map((section) => (
            <article key={section.heading}>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em] text-[var(--color-ink)] md:text-2xl">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="mt-4 text-base leading-relaxed text-[var(--color-muted)]"
                >
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <p className="eyebrow">Path</p>
          <h2 className="headline">Diagnostic. Audit. Implementation.</h2>
          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link href="/free-pmo-diagnostic" className="font-semibold text-[var(--color-cyan-strong)]">
              Free PMO Diagnostic
            </Link>
            <Link href="/pmo-automation-audit" className="font-semibold text-[var(--color-cyan-strong)]">
              PMO Automation Audit
            </Link>
            <Link href="/implementation" className="font-semibold text-[var(--color-cyan-strong)]">
              Implementation
            </Link>
            <Link href="/faq" className="font-semibold text-[var(--color-cyan-strong)]">
              FAQ
            </Link>
            <Link href="/glossary" className="font-semibold text-[var(--color-cyan-strong)]">
              Glossary
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
