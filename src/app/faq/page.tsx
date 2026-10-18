import type { Metadata } from "next";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { OfferClosing } from "../../components/offers/OfferSections";
import { Accordion } from "../../components/ui/Accordion";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { faqItems } from "../../lib/aeoContent";
import { breadcrumbJsonLd, faqPageJsonLd } from "../../lib/jsonLd";
import { pageMetadata } from "../../lib/seo";

// PRD 9.9 (E8.1). The page and its FAQPage JSON-LD read the same array.
const title = "FAQ";

export const metadata: Metadata = pageMetadata("/faq");

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
