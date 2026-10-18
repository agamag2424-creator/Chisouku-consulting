import type { Metadata } from "next";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { PackIllustration } from "../../components/home/HomeVisuals";
import { OfferClosing, SectionHead, offerCta } from "../../components/offers/OfferSections";
import { SamplePack } from "../../components/see-it-first/SamplePack";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { Sheet } from "../../components/ui/Sheet";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { pageMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/siteConfig";

// PRD 9.5, verbatim. The brief's list items are cut from the 9.5 sentence.
const title = "See the work before you talk to us";
const briefText =
  "Tell us the programme. Within two business days we send a one-page readiness brief prepared from public information: where readiness risk most likely sits and the questions we would ask.";

export const metadata: Metadata = pageMetadata("/see-it-first");

const briefContents = [
  "A one-page readiness brief",
  "Where readiness risk most likely sits",
  "The questions we would ask",
  "Prepared from public information",
  "Within two business days",
] as const;

export default function SeeItFirstPage() {
  return (
    <>
      <JsonLdScript
        id="see-it-first-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "See it first", path: "/see-it-first" },
        ])}
      />

      <Section
        tone="ink"
        containerClassName="grid gap-10 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] min-[900px]:items-center"
      >
        <div>
          <h1 className="t-h1 max-w-[20ch] text-paper">{title}</h1>
          <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <Button href="#sample-pack" variant="inverse" size="lg">
              Sample decision pack
            </Button>
            <Button href="#readiness-brief" variant="inverse-outline" size="lg">
              Free readiness brief
            </Button>
          </div>
        </div>
        <div className="hidden min-[900px]:block">
          <PackIllustration />
        </div>
      </Section>

      <Section tone="page" id="sample-pack" className="scroll-mt-20">
        <SectionHead title="Sample decision pack" />
        <SamplePack />
      </Section>

      <Section tone="paper" id="readiness-brief" className="scroll-mt-20">
        <div className="grid gap-10 min-[1100px]:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] min-[1100px]:items-start min-[1100px]:gap-16">
          <div className="flex flex-col gap-6">
            <h2 className="t-h2 text-ink">Free readiness brief</h2>
            <p className="t-body text-ink">{briefText}</p>
            <div>
              <Button href={offerCta.brief.href} size="lg">
                {offerCta.brief.label}
              </Button>
            </div>
          </div>
          <Sheet as="div" className="p-6 min-[641px]:p-8">
            <ul className="flex flex-col">
              {briefContents.map((item) => (
                <li key={item} className="flex items-start gap-3 border-t border-line py-3.5 first:border-t-0 first:pt-0 last:pb-0">
                  <svg viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0 text-teal" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
                    <path d="M4 10.5l4 4L16 6" />
                  </svg>
                  <span className="t-small font-semibold text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </Sheet>
        </div>
      </Section>

      {siteConfig.selfCheck.live && siteConfig.selfCheck.url && (
        <Section tone="page">
          <SectionHead title="The Readiness Self-Check" />
          <div className="mt-8">
            <Button href={siteConfig.selfCheck.url} variant="secondary">
              The Readiness Self-Check
            </Button>
          </div>
        </Section>
      )}

      <OfferClosing />
    </>
  );
}
