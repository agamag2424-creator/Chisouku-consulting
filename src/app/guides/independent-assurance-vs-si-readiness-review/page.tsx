import { notFound } from "next/navigation";
import { GuideArticle } from "../../../components/guides/GuideArticle";
import { guideByPath } from "../../../content/guides";
import { pageMetadata } from "../../../lib/seo";
import { routeRenders } from "../../../lib/siteConfig";

// Answer guide (PRD 4.1, E8.3).
const guide = guideByPath("/guides/independent-assurance-vs-si-readiness-review");

export const metadata = routeRenders(guide.path) ? pageMetadata(guide.path) : { robots: { index: false, follow: false } };

export default function Guide() {
  if (!routeRenders(guide.path)) notFound();
  return <GuideArticle guide={guide} />;
}
