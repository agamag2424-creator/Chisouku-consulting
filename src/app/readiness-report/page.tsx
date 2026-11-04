import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { CheckoutForm } from "../../components/products/CheckoutForm";
import {
  Block,
  FaqList,
  LineList,
  Placeholder,
  ProductFooterLine,
  QuestionsLine,
  TestModeBanner,
  TextList,
} from "../../components/products/ProductParts";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { Sheet } from "../../components/ui/Sheet";
import { report } from "../../content/products";
import { breadcrumbJsonLd, productJsonLd } from "../../lib/jsonLd";
import { products } from "../../lib/payments/pricing";
import { pageMetadata } from "../../lib/seo";
import { routeRenders } from "../../lib/siteConfig";

// Go-Live Readiness Report, USD 149 (paid funnel brief 3a). Copy verbatim from content/products.ts.
const path = "/readiness-report";
const renders = routeRenders(path);

export const metadata: Metadata = renders ? pageMetadata(path) : { robots: { index: false, follow: false } };

export default function ReadinessReportPage() {
  if (!renders) notFound();
  const product = products.report_149;

  return (
    <>
      <JsonLdScript
        id="report-product-ld-json"
        data={productJsonLd({ name: product.name, description: report.subheadline, path, amountCents: product.amountCents })}
      />
      <JsonLdScript
        id="report-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: product.name, path },
        ])}
      />
      <TestModeBanner />

      <Section
        tone="ink"
        containerClassName="grid gap-10 min-[1100px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-[1100px]:items-center min-[1100px]:gap-16"
      >
        <div>
          <p className="t-small font-semibold text-paper/75">{product.name}</p>
          <h1 className="t-h1 mt-3 text-paper">{report.headline}</h1>
          <Placeholder>{report.headlinePlaceholder}</Placeholder>
          <p className="t-body mt-5 max-w-[60ch] text-paper/80">{report.subheadline}</p>
        </div>
        <Sheet className="flex flex-col gap-5 p-6 text-ink shadow-2xl min-[641px]:p-8">
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="t-data text-[40px] leading-none tracking-[-0.03em]">{report.price}</span>
            <span className="t-small text-muted">{report.priceNote}</span>
          </p>
          <CheckoutForm product="report" buttonLabel={report.button} />
        </Sheet>
      </Section>

      <Section tone="paper">
        <div className="flex max-w-[780px] flex-col gap-14">
          <Block title={report.datesTitle}>
            <LineList items={report.dates} />
            <p className="t-small text-muted">{report.datesSources}</p>
          </Block>

          <Block title={report.givesTitle}>
            <LineList items={report.gives} />
          </Block>

          <div className="grid gap-10 min-[900px]:grid-cols-2">
            <Block title={report.forTitle}>
              <TextList items={report.for} />
            </Block>
            <Block title={report.notForTitle}>
              <TextList items={report.notFor} />
            </Block>
          </div>

          <Block title={report.howTitle}>
            <LineList items={report.how} numbered />
            <Placeholder>{report.howPlaceholder}</Placeholder>
          </Block>

          <Block title={report.isTitle}>
            <p className="t-body text-ink">{report.is}</p>
          </Block>

          <Block title={report.creditTitle}>
            <p className="t-body text-ink">{report.credit}</p>
            <div>
              <Button href="/readiness-pack" variant="text">
                {products.pack_249.name}
              </Button>
            </div>
          </Block>

          <FaqList items={report.faqs} />

          <Block title={report.deliveryTitle}>
            <LineList items={report.delivery} />
            <QuestionsLine />
          </Block>
        </div>
      </Section>

      <ProductFooterLine />
    </>
  );
}
