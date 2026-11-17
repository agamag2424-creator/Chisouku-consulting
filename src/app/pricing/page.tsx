import type { Metadata } from "next";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { OfferClosing, OfferCtas, SectionHead } from "../../components/offers/OfferSections";
import { ReportingCostCalculator } from "../../components/home/ReportingCostCalculator";
import { BeforeYouBook } from "../../components/offers/BeforeYouBook";
import { Accordion } from "../../components/ui/Accordion";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { foundingClientStatement } from "../../content/founding";
import { healthAudit, healthCheck, ladder, selfCheckPitch, taxLine } from "../../content/offer";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { pageMetadata } from "../../lib/seo";
import { foundingActive, offerPriceLabel, siteConfig } from "../../lib/siteConfig";

export const metadata: Metadata = pageMetadata("/pricing");

const faq = [
  {
    id: "why-publish-prices",
    summary: "Why publish prices?",
    content: "So you can judge the cost before you talk to us. The prices are the same as in our emails.",
  },
  { id: "fee-credit", summary: "Is the Health Check fee credited against the Audit?", content: `Yes. ${healthCheck.credit} ${healthCheck.cancellation}` },
  { id: "extra-days", summary: "What if the Audit needs more than 5 days?", content: healthAudit.extraDays },
  ...(foundingActive()
    ? [
        {
          id: "founding-rate",
          summary: "What is the founding-client rate?",
          content: `Applies to the PMO Health Audit. ${foundingClientStatement(siteConfig.foundingSlotsRemaining)}`,
        },
      ]
    : []),
  {
    id: "fixes",
    summary: "Do you implement or fix what you find?",
    content: "No. We stay independent, and we tell you who should own each fix.",
  },
];

/** A label-value row in a price card. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-line py-3 min-[641px]:grid-cols-[150px_minmax(0,1fr)] min-[641px]:gap-4">
      <dt className="label text-muted">{label}</dt>
      <dd className="text-[16px] text-ink">{children}</dd>
    </div>
  );
}

/** /pricing (September port PRD, Story 4.1): two paid items, the self-check shown as free. Prices from siteConfig. */
export default function PricingPage() {
  const check = siteConfig.offers.healthCheck;
  const audit = siteConfig.offers.healthAudit;
  const auditPrice = offerPriceLabel("healthAudit");
  return (
    <>
      <JsonLdScript
        id="pricing-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />

      <Section className="report-cover">
        <p className="eyebrow">Pricing</p>
        <h1 className="t-h1 max-w-[22ch] text-ink">Two fixed prices, and a free place to start</h1>
        <p className="t-body mt-5 max-w-[60ch] text-muted">
          For UK organisations running a PMO. {ladder.summary}.
        </p>
        <div className="mt-8">
          <OfferCtas content="pricing" />
        </div>
      </Section>

      <Section tone="paper" aria-labelledby="prices-h">
        <h2 id="prices-h" className="sr-only">
          Prices
        </h2>
        <ul className="grid gap-5 min-[1100px]:grid-cols-2">
          <li>
            <article className="panel flex h-full flex-col p-6 min-[641px]:p-8" data-price-card="healthCheck">
              <p className="eyebrow">Start here</p>
              <h3 className="t-h3 text-ink">{check.name}</h3>
              <p className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.03em] text-ink">{healthCheck.price}</p>
              <dl className="mt-6">
                <Row label="Scope">{healthCheck.scope}</Row>
                <Row label="What we need">{healthCheck.inputs}</Row>
                <Row label="What you get">{healthCheck.outputs}</Row>
                <Row label="Timing">{healthCheck.timing}</Row>
                <Row label="Payment">{healthCheck.payment}</Row>
                <Row label="Credit">
                  {healthCheck.credit} {healthCheck.cancellation}
                </Row>
              </dl>
              <div className="mt-auto pt-6">
                <Button href={check.path} variant="text">
                  {check.name}
                </Button>
              </div>
            </article>
          </li>
          <li>
            <article className="panel flex h-full flex-col border-2 border-ink p-6 min-[641px]:p-8" data-price-card="healthAudit">
              <p className="eyebrow">The whole portfolio</p>
              <h3 className="t-h3 text-ink">{audit.name}</h3>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.03em] text-ink">
                {auditPrice.list}{" "}
                <span className="text-[16px] font-semibold text-muted">list</span>
              </p>
              {auditPrice.founding && (
                <p className="mt-1 text-[17px] font-semibold text-gold-ink">{auditPrice.founding} founding</p>
              )}
              <dl className="mt-6">
                <Row label="Scope">{healthAudit.scope}</Row>
                <Row label="Price">{healthAudit.priceLine}</Row>
                <Row label="Length">{healthAudit.cap}</Row>
                <Row label="Extra days">{healthAudit.extraDays.replace("The Audit is capped at 5 working days. ", "")}</Row>
                <Row label="Payment">{healthAudit.payment}</Row>
              </dl>
              <div className="mt-auto pt-6">
                <Button href={audit.path} variant="text">
                  {audit.name}
                </Button>
              </div>
            </article>
          </li>
        </ul>

        <p className="t-small mt-5 text-muted" data-tax-line>
          {taxLine}
        </p>

        <div className="mt-6 flex flex-col gap-4 rounded-sheet border border-dashed border-ink/25 p-6 min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-between" data-price-card="selfCheck">
          <div>
            <p className="t-h3 text-ink">
              PMO self-check <span className="ml-2 text-muted">Free</span>
            </p>
            <p className="t-small mt-1 max-w-[62ch] text-muted">{selfCheckPitch}</p>
          </div>
          <Button href="/pmo-self-check" variant="secondary" ctaId="self_check">
            Take the PMO self-check
          </Button>
        </div>
      </Section>

      <Section tone="paper" className="pt-0 min-[641px]:pt-0">
        <BeforeYouBook />
      </Section>

      {/* Moved from the homepage (18 Nov 2026): someone weighing the price is the one who runs the numbers. */}
      <Section>
        <SectionHead title="What your PMO reporting costs today">
          Put in your own numbers. Nothing you type leaves this page.
        </SectionHead>
        <ReportingCostCalculator className="mt-10" />
      </Section>

      <Section aria-labelledby="pricing-faq">
        <SectionHead title="Questions about price" />
        <Accordion items={faq} className="mt-8 max-w-[70ch]" />
      </Section>

      <OfferClosing />
    </>
  );
}
