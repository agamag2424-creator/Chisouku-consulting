import Script from "next/script";
import type { JsonLd } from "../../lib/jsonLd";
import { stringifyJsonLd } from "../../lib/jsonLd";

type JsonLdScriptProps = {
  id: string;
  data: JsonLd;
};

export function JsonLdScript({ id, data }: JsonLdScriptProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: stringifyJsonLd(data) }}
    />
  );
}
