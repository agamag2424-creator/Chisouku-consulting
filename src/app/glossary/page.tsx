import type { Metadata } from "next";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { OfferClosing } from "../../components/offers/OfferSections";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { glossaryTerms } from "../../lib/aeoContent";
import { breadcrumbJsonLd, definedTermSetJsonLd } from "../../lib/jsonLd";
import { ogImage } from "../../lib/seo";
import { siteConfig } from "../../lib/siteConfig";

// PRD 10 glossary (E8.2). Each term has an anchor; DefinedTermSet JSON-LD reads the same array.
const title = "Glossary";
const description =
  "Go-live readiness terms: go/no-go decision, Conditional Go, cutover, rollback point, hypercare, SIT, UAT, data migration reconciliation, READINESS-5 and more.";
const url = `${siteConfig.url}/glossary`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { type: "website", title: `${title} | ChisokuLabs`, description, url, images: [ogImage] },
  twitter: { card: "summary_large_image", title: `${title} | ChisokuLabs`, description, images: [ogImage.url] },
};

export default function GlossaryPage() {
  return (
    <>
      <JsonLdScript id="glossary-defined-terms-ld-json" data={definedTermSetJsonLd(glossaryTerms)} />
      <JsonLdScript
        id="glossary-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: title, path: "/glossary" },
        ])}
      />

      <Section tone="ink">
        <h1 className="t-h1 text-paper">{title}</h1>
        <nav aria-label="Terms" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {glossaryTerms.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-paper/25 px-3.5 text-[14px] text-paper/85 hover:border-paper hover:text-paper"
                >
                  {item.term}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      <Section tone="paper">
        <dl className="grid max-w-[960px] gap-x-12 min-[900px]:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          {glossaryTerms.map((item) => (
            <div key={item.id} className="contents">
              <dt id={item.id} className="scroll-mt-24 border-t border-line pt-6 font-[family-name:var(--font-display)] text-[20px] font-bold text-ink min-[900px]:pb-6">
                {item.term}
              </dt>
              <dd className="t-body pb-6 pt-2 text-ink min-[900px]:border-t min-[900px]:border-line min-[900px]:pt-6">
                {item.definition}
                {item.related && (
                  <span className="mt-2 block">
                    <Button href={item.related.href} variant="text">
                      {item.related.label}
                    </Button>
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <OfferClosing />
    </>
  );
}
