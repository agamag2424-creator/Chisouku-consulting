import type { Metadata } from "next";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { OfferClosing } from "../../components/offers/OfferSections";
import { Accordion } from "../../components/ui/Accordion";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { faqItems } from "../../lib/aeoContent";
import { breadcrumbJsonLd, faqPageJsonLd } from "../../lib/jsonLd";
import { ogImage } from "../../lib/seo";
import { siteConfig } from "../../lib/siteConfig";

// PRD 9.9 (E8.1). The page and its FAQPage JSON-LD read the same array.
const title = "FAQ";
const description =
  "Independent go-live decision assurance: how it differs from an SI readiness review, timing, platforms, data handling, AI use, prices and the fee credit.";
const url = `${siteConfig.url}/faq`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { type: "website", title: `${title} | ChisokuLabs`, description, url, images: [ogImage] },
  twitter: { card: "summary_large_image", title: `${title} | ChisokuLabs`, description, images: [ogImage.url] },
};

export default function FaqPage() {
  return (
    <>
      <JsonLdScript id="faq-page-ld-json" data={faqPageJsonLd(faqItems)} />
      <JsonLdScript
        id="faq-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: title, path: "/faq" },
        ])}
      />

      <Section tone="ink">
        <h1 className="t-h1 text-paper">{title}</h1>
      </Section>

      <Section tone="paper">
        <Accordion
          className="max-w-[860px]"
          items={faqItems.map((item) => ({
            id: item.id,
            summary: item.question,
            content: (
              <>
                <p className="t-body">{item.answer}</p>
                {item.related?.map((link) => (
                  <div key={link.href} className="mt-3">
                    <Button href={link.href} variant="text">
                      {link.label}
                    </Button>
                  </div>
                ))}
              </>
            ),
          }))}
        />
      </Section>

      <OfferClosing />
    </>
  );
}
