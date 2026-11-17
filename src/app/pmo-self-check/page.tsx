import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "../../components/ui/Section";
import { selfCheckQuestions } from "../../content/pmoSelfCheck";
import { pageMetadata } from "../../lib/seo";
import { routeRenders } from "../../lib/siteConfig";

const path = "/pmo-self-check";

const renders = routeRenders(path);

// TODO: remove noindex when the researched question bank replaces the placeholders
// and /pmo-self-check is taken out of routeUnlisted.
export const metadata: Metadata = renders
  ? { ...pageMetadata(path), robots: { index: false, follow: true } }
  : { robots: { index: false, follow: false } };

export default function PmoSelfCheckPage() {
  if (!renders) notFound();
  const published = selfCheckQuestions.some((question) => question.text.trim().length > 0);
  return (
    <Section tone="page">
      <h1 className="t-h1 text-balance text-ink">PMO self-check</h1>
      {/* TODO: render selfCheckQuestions here once the researched bank is in. No scoring or band copy in this shell. */}
      {published ? null : (
        <p className="t-body mt-5 text-muted">The questions for this check are not published yet.</p>
      )}
    </Section>
  );
}
