import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { OfferClosing, SectionHead } from "../../components/offers/OfferSections";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { ogImage } from "../../lib/seo";
import { routeRenders, siteConfig } from "../../lib/siteConfig";

// PRD 9.7, verbatim fragments. Every data statement needs the founder's confirmation (IN-4) before the route goes
// live; until then the page renders only on previews and in development, and is a 404 in production.
const path = "/independence-and-data";
const title = "Independence and data handling";
const description =
  "No implementation fees, no software resale, no system integrator partnerships or referral fees. How client evidence is handled, and how AI is used.";
const lastUpdated = "17 October 2026";
const url = `${siteConfig.url}${path}`;

const renders = routeRenders(path);

// The 404 still streams this route's metadata, so the page title is only set where the page renders (as /_ui).
export const metadata: Metadata = renders
  ? {
      title,
      description,
      alternates: { canonical: url },
      openGraph: { type: "website", title: `${title} | ChisokuLabs`, description, url, images: [ogImage] },
      twitter: { card: "summary_large_image", title: `${title} | ChisokuLabs`, description, images: [ogImage.url] },
    }
  : { robots: { index: false, follow: false } };

const independence = [
  "No implementation fees",
  "No software resale",
  "No system integrator partnerships or referral fees",
  "Any conflict disclosed in writing before engagement",
] as const;

const icon = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" className="size-6 text-teal" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
    {d}
  </svg>
);

/** The life of client evidence, in order. Stage names group the 9.7 statements; the statements are verbatim. */
const lifecycle = [
  {
    stage: "Shared",
    icon: icon(<path d="M4 7h16v10H4zM4 8l8 5 8-5" />),
    items: ["Shared under NDA"],
  },
  {
    stage: "Stored",
    icon: icon(
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>,
    ),
    items: ["Stored encrypted in a dedicated engagement workspace", "Access limited to the principal"],
  },
  {
    stage: "Processed",
    icon: icon(
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      </>,
    ),
    items: [
      "Never used to train AI models",
      "AI processing only through providers contracted for zero data retention",
      "Personal data masked before processing where feasible",
    ],
  },
  {
    stage: "Deleted",
    icon: icon(<path d="M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13" />),
    items: ["Deleted within 30 days of the final readout unless you ask us to keep it"],
  },
] as const;

const aiUse = [
  { does: true, text: "Extracts claims and cross-checks evidence" },
  { does: true, text: "Every finding is reviewed and signed by the principal" },
  { does: false, text: "AI does not make the go-live recommendation" },
] as const;

export default function IndependenceAndDataPage() {
  if (!renders) notFound();

  return (
    <>
      <JsonLdScript
        id="independence-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: title, path },
        ])}
      />

      <Section tone="ink">
        <h1 className="t-h1 max-w-[20ch] text-paper">{title}</h1>
        <p className="t-body mt-5 max-w-[58ch] text-paper/80">No stake in your go-live date.</p>
        <nav aria-label="On this page" className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
          <Button href="#independence" variant="inverse" size="lg">
            Independence
          </Button>
          <Button href="#data-handling" variant="inverse-outline" size="lg">
            How we handle your evidence
          </Button>
          <Button href="#ai-use" variant="inverse-outline" size="lg">
            How AI is used
          </Button>
        </nav>
      </Section>

      <Section tone="paper" id="independence" className="scroll-mt-20">
        <SectionHead title="Independence" />
        <ul className="mt-10 grid gap-3 min-[641px]:grid-cols-2 min-[1100px]:grid-cols-4">
          {independence.map((item) => (
            <li key={item} className="flex items-center gap-3.5 rounded-sheet border border-line bg-paper p-5 min-[641px]:min-h-28 min-[641px]:flex-col min-[641px]:items-start min-[641px]:justify-between min-[641px]:gap-4">
              <svg viewBox="0 0 22 22" className="size-[22px] text-teal" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
                <path d="M4 11.5l4.5 4.5L18 6.5" />
              </svg>
              <span className="t-small font-semibold text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="page" id="data-handling" className="scroll-mt-20">
        <SectionHead title="How we handle your evidence" />
        <ol className="mt-10 grid gap-4 min-[900px]:grid-cols-4">
          {lifecycle.map((step, index) => (
            <li key={step.stage} className="relative flex flex-col gap-4 rounded-sheet border border-line bg-paper p-5">
              <span className="flex items-center gap-3">
                <span className="t-data flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-[14px] text-paper">
                  {index + 1}
                </span>
                {step.icon}
                <span className="font-[family-name:var(--font-display)] text-[19px] font-bold text-ink">{step.stage}</span>
              </span>
              <ul className="flex flex-col gap-2.5">
                {step.items.map((item) => (
                  <li key={item} className="t-small border-t border-faint pt-2.5 text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper" id="ai-use" className="scroll-mt-20">
        <SectionHead title="How AI is used" />
        <ul className="mt-10 grid gap-3 min-[900px]:grid-cols-3">
          {aiUse.map(({ does, text }) => (
            <li key={text} className="flex items-start gap-3.5 rounded-sheet border border-line bg-paper p-5">
              <span className={does ? "text-teal" : "text-ink"}>
                <svg viewBox="0 0 22 22" className="mt-0.5 size-[22px] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
                  {does ? (
                    <path d="M4 11.5l4.5 4.5L18 6.5" />
                  ) : (
                    <>
                      <circle cx="11" cy="11" r="8.5" />
                      <path d="M7.5 7.5l7 7M14.5 7.5l-7 7" />
                    </>
                  )}
                </svg>
              </span>
              <span className="t-small font-semibold text-ink">{text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-[14px] text-muted">
          <p>{`Last updated: ${lastUpdated}`}</p>
          <p>
            Questions about how we handle your data:{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-teal underline underline-offset-4">
              {siteConfig.email}
            </a>
          </p>
        </div>
      </Section>

      <OfferClosing />
    </>
  );
}
