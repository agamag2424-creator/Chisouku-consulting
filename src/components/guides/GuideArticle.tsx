import type { Guide, GuideBlock } from "../../content/guides";
import { breadcrumbJsonLd, howToJsonLd } from "../../lib/jsonLd";
import { siteConfig } from "../../lib/siteConfig";
import { JsonLdScript } from "../aeo/JsonLdScript";
import { OfferClosing, offerCta } from "../offers/OfferSections";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";
import { Sheet } from "../ui/Sheet";

// Answer guide layout (E8.3): direct answer first, sections, optional checklist, sources, onward links.

const related = [
  { href: "/method", label: "How READINESS-5 works" },
  { href: siteConfig.offers.evidenceCheck.path, label: siteConfig.offers.evidenceCheck.name },
  { href: siteConfig.offers.decisionReview.path, label: siteConfig.offers.decisionReview.name },
  { href: offerCta.samplePack.href, label: offerCta.samplePack.label },
] as const;

export function GuideArticle({ guide }: { guide: Guide }) {
  return (
    <>
      <JsonLdScript
        id="guide-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: guide.title, path: guide.path },
        ])}
      />
      {guide.checklist && (
        <JsonLdScript
          id="guide-howto-ld-json"
          data={howToJsonLd({ name: guide.title, description: guide.answer, path: guide.path, steps: guide.checklist.steps })}
        />
      )}

      <Section tone="ink">
        <h1 className="t-h1 max-w-[28ch] text-paper">{guide.title}</h1>
        <p className="t-body mt-6 max-w-[62ch] border-l-4 border-teal pl-5 text-paper">{guide.answer}</p>
      </Section>

      <Section tone="paper">
        <article className="flex max-w-[760px] flex-col gap-14">
          {guide.sections.slice(0, 2).map((section) => (
            <GuideSectionView key={section.id} {...section} />
          ))}
          {guide.checklist && (
            <section id={guide.checklist.id} className="scroll-mt-24">
              <h2 className="t-h2 text-ink">{guide.checklist.heading}</h2>
              <p className="t-body mt-4 text-muted">{guide.checklist.intro}</p>
              <ol className="mt-8 flex flex-col gap-4">
                {guide.checklist.steps.map((step, index) => (
                  <li key={step.name}>
                    <Sheet className="p-6">
                      <h3 className="t-h3 flex items-center gap-3 text-ink">
                        <span className="t-data flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-[14px] text-paper">
                          {index + 1}
                        </span>
                        {step.name}
                      </h3>
                      <ul className="mt-4 flex flex-col">
                        {step.items.map((item) => (
                          <li key={item} className="t-small flex gap-3 border-t border-faint py-3 text-ink">
                            <span aria-hidden className="mt-1 size-3.5 shrink-0 rounded-[3px] border-2 border-teal" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Sheet>
                  </li>
                ))}
              </ol>
            </section>
          )}
          {guide.sections.slice(2).map((section) => (
            <GuideSectionView key={section.id} {...section} />
          ))}

          {guide.sources.length > 0 && (
            <section aria-labelledby="sources" className="border-t border-line pt-6">
              <h2 id="sources" className="t-small font-semibold text-ink">
                Sources
              </h2>
              <ul className="mt-3 flex flex-col gap-2 text-[14px]">
                {guide.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} className="font-semibold text-teal underline underline-offset-4 hover:text-ink">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </Section>

      <Section tone="page">
        <h2 className="t-h3 text-ink">Related</h2>
        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
          {related.map((link) => (
            <li key={link.href}>
              <Button href={link.href} variant="text">
                {link.label}
              </Button>
            </li>
          ))}
        </ul>
      </Section>

      <OfferClosing />
    </>
  );
}

function GuideSectionView({ id, heading, blocks }: { id: string; heading: string; blocks: readonly GuideBlock[] }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="t-h2 text-ink">{heading}</h2>
      <div className="mt-5 flex flex-col gap-5">
        {blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>
    </section>
  );
}

function Block({ block }: { block: GuideBlock }) {
  if (block.kind === "p") return <p className="t-body text-ink">{block.text}</p>;
  if (block.kind === "list")
    return (
      <ul className="flex flex-col gap-2.5">
        {block.items.map((item) => (
          <li key={item} className="t-body flex gap-3 text-ink">
            <span aria-hidden className="mt-[0.6em] size-2 shrink-0 rounded-full bg-teal" />
            {item}
          </li>
        ))}
      </ul>
    );
  return (
    // Focusable so keyboard users can scroll a table that is wider than a phone screen.
    <div role="region" aria-label={block.caption} tabIndex={0} className="overflow-x-auto rounded-sheet border border-line">
      <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
        <caption className="sr-only">{block.caption}</caption>
        <thead className="bg-page">
          <tr>
            {block.head.map((cell, index) => (
              <th key={index} scope="col" className="px-4 py-3 text-[13px] font-semibold text-muted">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr key={row[0]} className="border-t border-line align-top">
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={index} scope="row" className="px-4 py-3 font-semibold text-ink">
                    {cell}
                  </th>
                ) : (
                  <td key={index} className="px-4 py-3 text-ink">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
