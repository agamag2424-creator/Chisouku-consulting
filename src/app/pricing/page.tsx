import type { Metadata } from "next";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { ComparisonTable } from "../../components/compare/ComparisonTable";
import { DayStrip } from "../../components/offers/DayStrip";
import { OfferClosing, SectionHead, offerCta } from "../../components/offers/OfferSections";
import { Accordion } from "../../components/ui/Accordion";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { Sheet } from "../../components/ui/Sheet";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { ogImage } from "../../lib/seo";
import { offerPriceLabel, siteConfig, type OfferKey } from "../../lib/siteConfig";
import { cn } from "../../lib/utils";

// PRD 9.6. Prices, days, founding places and fee credit come from config; "what's included" is the PRD 6.1 table.
const feeCredit = `The full Evidence Check fee is credited against a Go-Live Decision Review signed within ${siteConfig.feeCreditDays} days of the Evidence Check report.`;
const paymentTerms = "50% on signature, 50% on delivery";
const url = `${siteConfig.url}/pricing`;

export const metadata: Metadata = {
  title: "Pricing",
  description: feeCredit,
  alternates: { canonical: url },
  openGraph: { type: "website", title: "Pricing | ChisokuLabs", description: feeCredit, url, images: [ogImage] },
  twitter: { card: "summary_large_image", title: "Pricing | ChisokuLabs", description: feeCredit, images: [ogImage.url] },
};

const cards: readonly { offer: OfferKey; duration: string; includes: readonly string[]; payment: boolean }[] = [
  {
    offer: "evidenceCheck",
    duration: `${siteConfig.offers.evidenceCheck.days} business days`,
    includes: [
      "Written review of one programme's readiness documents against READINESS-5 across the five domains",
      "Contradiction map",
      "Top risks",
      "One-hour readout",
    ],
    payment: true,
  },
  {
    offer: "decisionReview",
    duration: `${siteConfig.offers.decisionReview.days} business days`,
    includes: [
      "Evidence register",
      "Contradiction map",
      "Structured interviews (only where evidence conflicts)",
      "Decision recommendation (Go / Conditional Go / No-Go)",
      "Dated decision conditions with owners",
      "Sponsor readout",
    ],
    payment: true,
  },
  {
    offer: "continuous",
    duration: "Monthly, until go-live and hypercare",
    includes: ["Weekly evidence register refresh", "Decision-condition tracking"],
    payment: false,
  },
];

// Buying questions only. Answers use PRD wording: 6.2, 6.3, 8.6, 9.3, 9.6 and the 9.9 answer notes.
const faq = [
  {
    id: "why-publish-prices",
    summary: "Why publish prices?",
    content:
      "So you can judge the cost before you talk to us, and set it against what a slipped go-live would cost you. Each list price covers one programme, up to five workstreams.",
  },
  {
    id: "larger-programme",
    summary: "What if our programme is larger?",
    content:
      "Multi-entity reviews are quoted after a scoping call. The list price applies to one programme, up to five workstreams.",
  },
  { id: "fee-credit", summary: "What is the fee credit?", content: feeCredit },
  ...(siteConfig.foundingSlotsRemaining > 0
    ? [
        {
          id: "founding-rate",
          summary: "What is the founding-client rate?",
          content: `The first three clients pay 50% of list price in exchange for a named or anonymised case study. Founding-client places remaining: ${siteConfig.foundingSlotsRemaining}.`,
        },
      ]
    : []),
  {
    id: "payment",
    summary: "How is payment structured?",
    content: `${paymentTerms}, for the ${siteConfig.offers.evidenceCheck.name} and the ${siteConfig.offers.decisionReview.name}.`,
  },
  {
    id: "under-four-weeks",
    summary: "We go live in under four weeks. Can you still help?",
    content: `Yes. A ${siteConfig.offers.evidenceCheck.name}, scoped to the highest-risk domains.`,
  },
  {
    id: "team-time",
    summary: "What do you need from our team?",
    content:
      "Documents on day one. Interviews only where the evidence conflicts, which keeps your team's time to a minimum.",
  },
  {
    id: "fixes",
    summary: "Do you implement or fix what you find?",
    content: "No. We stay independent, and we tell you who should own each fix.",
  },
  {
    id: "guarantee",
    summary: "Do you guarantee a successful go-live?",
    content: "No. The review does not guarantee go-live success.",
  },
];

function PriceCard({ offer, duration, includes, payment }: (typeof cards)[number]) {
  const data = siteConfig.offers[offer];
  const price = offerPriceLabel(offer);
  const page = "path" in data ? data.path : null;
  return (
    <Sheet
      as="article"
      className={cn("flex h-full flex-col gap-5 p-6 min-[641px]:p-8", offer === "decisionReview" && "border-2 border-ink")}
    >
      <div className="flex flex-col gap-1">
        <h3 className="t-h3 text-ink">{data.name}</h3>
        <p className="t-data text-[13px] text-muted">{duration}</p>
      </div>
      {"days" in data && <DayStrip days={data.days} />}
      <dl className="flex flex-wrap gap-x-8 gap-y-4 border-y border-line py-5">
        <div>
          <dt className="text-[13px] text-muted">List price</dt>
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
        {payment && (
          <p className="text-[13px] text-muted">
            <span className="font-semibold text-ink">Payment: </span>
            {paymentTerms}
          </p>
        )}
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
          <Button href={offerCta.brief.href} variant="inverse-outline" size="lg">
            {offerCta.brief.label}
          </Button>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHead title="Prices" />
        <ul className="mt-10 grid gap-5 min-[1100px]:grid-cols-3">
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
                Founding-client rate: the first three clients pay 50% of list price in exchange for a named or anonymised
                case study. {`Founding-client places remaining: ${foundingPlaces}.`}
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
