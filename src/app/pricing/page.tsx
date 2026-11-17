import type { Metadata } from "next";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { ComparisonTable } from "../../components/compare/ComparisonTable";
import { DayStrip } from "../../components/offers/DayStrip";
import { OfferClosing, SectionHead, offerCta } from "../../components/offers/OfferSections";
import { Accordion } from "../../components/ui/Accordion";
import { BookCallButton } from "../../components/ui/BookCallButton";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { Sheet } from "../../components/ui/Sheet";
import { foundingClientStatement } from "../../content/founding";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { pageMetadata } from "../../lib/seo";
import { extraDaysSentence, feeCreditSentence, offerPriceLabel, siteConfig, type OfferKey } from "../../lib/siteConfig";
import { cn } from "../../lib/utils";

const feeCredit = feeCreditSentence;

export const metadata: Metadata = pageMetadata("/pricing");

const cards: readonly { offer: OfferKey; duration: string; includes: readonly string[] }[] = [
  {
    offer: "healthCheck",
    duration: `${siteConfig.offers.healthCheck.days} working days, one programme`,
    includes: [
      "Status pack, RAID log, governance calendar and plan",
      "One sponsor and two team interviews (45 minutes each, remote)",
      "Project Health Scorecard scored on HEALTH-5",
      "Top findings and a 30-day fix plan",
      "45-minute readout",
    ],
  },
  {
    offer: "healthAudit",
    duration: `${siteConfig.offers.healthAudit.days} working days`,
    includes: [
      "Governance, reporting, RAID, cadence, prioritisation and the PMO operating model",
      "Evidence register and contradiction map",
      "Project Health Scorecard (Healthy / Needs attention / At risk) with owners and dates",
      "30-day fix plan",
      "Sponsor readout",
      extraDaysSentence,
    ],
  },
];

// Buying questions only. Answers use PRD wording: 6.2, 6.3, 8.6, 9.3, 9.6 and the 9.9 answer notes.
const faq = [
  {
    id: "why-publish-prices",
    summary: "Why publish prices?",
    content:
      "So you can judge the cost before you talk to us. The Health Check is one programme. The Audit list price covers one portfolio review, scoped on the call.",
  },
  {
    id: "larger-portfolio",
    summary: "What if the portfolio is larger?",
    content: `Larger or multi-country reviews are quoted after a scoping call. ${extraDaysSentence}`,
  },
  { id: "fee-credit", summary: "What is the fee credit?", content: feeCredit },
  ...(siteConfig.foundingSlotsRemaining > 0
    ? [
        {
          id: "founding-rate",
          summary: "What is the founding-client rate?",
          content: `Applies to the PMO Health Audit. ${foundingClientStatement(siteConfig.foundingSlotsRemaining)}`,
        },
      ]
    : []),
  {
    id: "payment",
    summary: "How is payment structured?",
    content: `${siteConfig.offers.healthCheck.name}: ${siteConfig.offers.healthCheck.payment}. ${siteConfig.offers.healthAudit.name}: ${siteConfig.offers.healthAudit.payment}.`,
  },
  {
    id: "one-programme",
    summary: "Do you start with one programme?",
    content: `Yes. The ${siteConfig.offers.healthCheck.name} is scoped to one programme, and is the usual starting point.`,
  },
  {
    id: "team-time",
    summary: "What do you need from our team?",
    content:
      "Documents on day one. The Health Check includes one sponsor and two team interviews (45 minutes each, remote).",
  },
  {
    id: "fixes",
    summary: "Do you implement or fix what you find?",
    content: "No. We stay independent, and we tell you who should own each fix.",
  },
  {
    id: "guarantee",
    summary: "Do you guarantee that a programme or portfolio will recover?",
    content: "No. The audit does not guarantee that a programme or portfolio will recover.",
  },
];

function PriceCard({ offer, duration, includes }: (typeof cards)[number]) {
  const data = siteConfig.offers[offer];
  const price = offerPriceLabel(offer);
  const page = "path" in data ? data.path : null;
  return (
    <Sheet
      as="article"
      className={cn("flex h-full flex-col gap-5 p-6 min-[641px]:p-8", offer === "healthAudit" && "border-2 border-ink")}
    >
      <div className="flex flex-col gap-1">
        <h3 className="t-h3 text-ink">{data.name}</h3>
        <p className="t-data text-[13px] text-muted">{duration}</p>
      </div>
      {"days" in data && <DayStrip days={data.days} />}
      <dl className="flex flex-wrap gap-x-8 gap-y-4 border-y border-line py-5">
        <div>
          <dt className="text-[13px] text-muted">{data.priceCaption}</dt>
          <dd className="t-data mt-1.5 text-[22px] text-ink">{price.list}</dd>
        </div>
        {price.founding && (
          <div>
            <dt className="text-[13px] text-muted">Founding-client rate</dt>
            <dd className="t-data mt-1.5 text-[22px] text-teal">{price.founding}</dd>
          </div>
        )}
      </dl>
      <ul className="flex flex-col gap-2.5">
        {includes.map((item) => (
          <li key={item} className="t-small flex items-start gap-2.5 text-ink">
            <svg viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0 text-teal" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
              <path d="M4 10.5l4 4L16 6" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col gap-4 pt-2">
        <p className="text-[13px] text-muted">
          <span className="font-semibold text-ink">Payment: </span>
          {siteConfig.offers[offer].payment}
        </p>
        {page && (
          <Button href={page} variant="text" className="self-start">
            {data.name}
          </Button>
        )}
      </div>
    </Sheet>
  );
}

export default function PricingPage() {
  const foundingPlaces = siteConfig.foundingSlotsRemaining;
  return (
    <>
      <JsonLdScript
        id="pricing-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />

      <Section tone="ink">
        <h1 className="t-h1 text-paper">Pricing</h1>
        <p className="t-body mt-5 max-w-[58ch] text-paper/80">{feeCredit}</p>
        <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
          <Button href={offerCta.review.href} variant="inverse" size="lg">
            {offerCta.review.label}
          </Button>
          <BookCallButton content="pricing" variant="inverse-outline" />
          <Button href={offerCta.brief.href} variant="inverse-outline" size="lg">
            {offerCta.brief.label}
          </Button>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHead title="Prices" />
        <ul className="mt-10 grid gap-5 min-[1100px]:grid-cols-2">
          {cards.map((card) => (
            <li key={card.offer}>
              <PriceCard {...card} />
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-6 min-[900px]:grid-cols-2 min-[900px]:gap-8">
          <p className="t-small font-semibold text-ink">{feeCredit}</p>
          {foundingPlaces > 0 && (
            <div className="flex items-start gap-4">
              <span aria-hidden className="mt-1 flex shrink-0 gap-1.5">
                {Array.from({ length: foundingPlaces }, (_, place) => (
                  <span key={place} className="size-3 rounded-full bg-teal" />
                ))}
              </span>
              <p className="t-small text-muted">
                Applies to the PMO Health Audit. {foundingClientStatement(foundingPlaces)}
              </p>
            </div>
          )}
        </div>
      </Section>

      <Section tone="page">
        <SectionHead title="Why not the usual options" />
        <ComparisonTable className="mt-10" />
      </Section>

      <Section tone="paper">
        <SectionHead title="FAQ" />
        <Accordion items={faq} className="mt-8 max-w-[70ch]" />
      </Section>

      <OfferClosing />
    </>
  );
}
