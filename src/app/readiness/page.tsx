import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadinessCheck } from "../../components/readiness/ReadinessCheck";
import { Section } from "../../components/ui/Section";
import { routeRenders } from "../../lib/siteConfig";

const path = "/readiness";

// Per request, so production 404s and a Vercel preview renders. A static build would bake in one environment.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Go-live readiness check",
  robots: { index: false, follow: false },
};

export default function ReadinessPage() {
  if (!routeRenders(path)) notFound();
  return (
    <Section tone="page">
      <ReadinessCheck />
    </Section>
  );
}
