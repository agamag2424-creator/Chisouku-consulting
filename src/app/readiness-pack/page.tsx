import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { PackHero, PackBody } from "../../components/products/PackSections";
import { ProductFooterLine, TestModeBanner } from "../../components/products/ProductParts";
import { pack } from "../../content/products";
import { breadcrumbJsonLd, productJsonLd } from "../../lib/jsonLd";
import { products } from "../../lib/payments/pricing";
import { pageMetadata } from "../../lib/seo";
import { routeRenders } from "../../lib/siteConfig";

// Go-Live Readiness Pack, USD 249 (paid funnel brief 3b). Copy verbatim from content/products.ts.
const path = "/readiness-pack";
const renders = routeRenders(path);

export const metadata: Metadata = renders ? pageMetadata(path) : { robots: { index: false, follow: false } };

export default function ReadinessPackPage() {
  if (!renders) notFound();
  const product = products.pack_249;

  return (
    <>
      <JsonLdScript
        id="pack-product-ld-json"
        data={productJsonLd({ name: product.name, description: pack.subheadline, path, amountCents: product.amountCents })}
      />
      <JsonLdScript
        id="pack-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: product.name, path },
        ])}
      />
      <TestModeBanner />
      <PackHero />
      <PackBody />
      <ProductFooterLine />
    </>
  );
}
