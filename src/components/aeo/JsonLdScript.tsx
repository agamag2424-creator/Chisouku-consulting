import type { JsonLd } from "../../lib/jsonLd";
import { stringifyJsonLd } from "../../lib/jsonLd";

type JsonLdScriptProps = {
  id: string;
  data: JsonLd;
};

/** Structured data in the server HTML (Next.js guidance): crawlers read it without running JavaScript, and the browser does no work for it. */
export function JsonLdScript({ id, data }: JsonLdScriptProps) {
  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(data) }} />;
}
