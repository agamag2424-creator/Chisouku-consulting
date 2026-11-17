import type { Metadata } from "next";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { OfferClosing } from "../../components/offers/OfferSections";
import { BookCallButton } from "../../components/ui/BookCallButton";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { Sheet } from "../../components/ui/Sheet";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { pageMetadata } from "../../lib/seo";

/** Old briefing offer; this page is rewritten in Epic 6 of the September port. */
const legacyBrief = { href: "/contact?request=brief", label: "Request a free briefing" } as const;
const title = "See the work before you talk to us";
const briefText =
  "Tell us the programme. Within two business days we send a one-page briefing prepared from public information: where the reporting and governance risks most likely sit, and the questions we would ask.";

export const metadata: Metadata = pageMetadata("/see-it-first");

const briefContents = [
  "A one-page briefing",
  "Where the reporting and governance risks most likely sit",
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

      <Section tone="ink">
        <div>
          <h1 className="t-h1 max-w-[20ch] text-paper">{title}</h1>
          <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <Button href="#briefing" variant="inverse" size="lg">
              Request a free briefing
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="paper" id="briefing" className="scroll-mt-20">
        <div className="grid gap-10 min-[1100px]:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] min-[1100px]:items-start min-[1100px]:gap-16">
          <div className="flex flex-col gap-6">
            <h2 className="t-h2 text-ink">Free briefing</h2>
            <p className="t-body text-ink">{briefText}</p>
            <div className="flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
              <Button href={legacyBrief.href} size="lg">
                {legacyBrief.label}
              </Button>
              <BookCallButton content="see_it_first" />
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

      <OfferClosing />
    </>
  );
}
