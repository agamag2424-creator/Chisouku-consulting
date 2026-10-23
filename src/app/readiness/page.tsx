import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadinessCheck } from "../../components/readiness/ReadinessCheck";
import { Section } from "../../components/ui/Section";
import { pageMetadata } from "../../lib/seo";
import { routeRenders } from "../../lib/siteConfig";

const path = "/readiness";

// Live routes are indexed. A route that is switched off still fails closed, with noindex on the 404.
const renders = routeRenders(path);

export const metadata: Metadata = renders ? pageMetadata(path) : { robots: { index: false, follow: false } };

export default function ReadinessPage() {
  if (!renders) notFound();
  return (
    <Section tone="page">
      <ReadinessCheck />
    </Section>
  );
}
