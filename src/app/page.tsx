import type { Metadata } from "next";
import { EvidenceCheckHero } from "../components/hero/EvidenceCheckHero";
import { OfferPanels } from "../components/home/OfferPanels";
import { Button } from "../components/ui/Button";
import { Section } from "../components/ui/Section";
import { Sheet } from "../components/ui/Sheet";
import { siteConfig } from "../lib/siteConfig";

const title = "Independent Go-Live Decision Assurance | ChisokuLabs";
const description =
  "Before leadership approves a major ERP or core-platform go-live, ChisokuLabs independently tests whether every critical readiness claim has the status, owner, evidence, date and action to defend that decision.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: siteConfig.url },
  openGraph: { title, description, url: siteConfig.url },
  twitter: { title, description },
};

const CTA = {
  review: { href: "/contact?request=review", label: "Discuss your programme" },
  brief: { href: "/contact?request=brief", label: "Request a free readiness brief" },
  samplePack: { href: "/see-it-first#sample-pack", label: "See a full sample decision pack" },
} as const;

const verdicts = [
  { verdict: "Go", detail: "The evidence supports the date." },
  { verdict: "Conditional Go", detail: "Named conditions, owners and dates that must be met first." },
  { verdict: "No-Go", detail: "What is missing and the shortest path back to a date." },
] as const;

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Section tone="page" containerClassName="grid gap-12 min-[1200px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[1200px]:items-center">
        <div>
          <h1 className="t-h1 max-w-[18ch] text-ink">{siteConfig.positioning}</h1>
          <p className="t-body mt-5 text-muted">
            Independent go-live decision assurance for ERP and core-platform programmes in the UAE and Saudi Arabia.
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <Button href={CTA.review.href} size="lg">
              {CTA.review.label}
            </Button>
            <Button href={CTA.samplePack.href} variant="secondary" size="lg">
              {CTA.samplePack.label}
            </Button>
          </div>
          <p className="t-small mt-6 text-muted">{`${siteConfig.platforms.join(", ")}.`}</p>
        </div>
        <EvidenceCheckHero />
      </Section>

      {/* 2. The problem */}
      <Section tone="paper">
        <h2 className="t-h2 max-w-[24ch] text-ink">Every workstream can explain its piece. Nobody owns the whole picture.</h2>
        <p className="t-body mt-6 text-ink">
          Testing reports a pass rate. Migration reports a reconciliation. Cutover has a plan. The system integrator has an
          opinion, and its final milestone depends on the date holding. Weeks before go-live, leadership is asked to
          approve a decision on reports written by the people being judged on delivery. We don&apos;t assume anyone is
          misleading you. We check whether the evidence supports what is being reported.
        </p>
      </Section>

      {/* 3. How we test readiness */}
      <Section tone="page">
        <h2 className="t-h2 text-ink">Five questions for every critical claim.</h2>
        <p className="t-body mt-6 text-ink">
          For each readiness claim across testing, data migration, integration, cutover and governance, we ask: Is the
          status current? Is there a named owner? Is there evidence behind it? Is there a date? Is there an action if it
          slips? Then we check the claims against each other, because the most expensive risks sit between workstreams.
        </p>
        <div className="mt-6">
          <Button href="/method" variant="text">
            How READINESS-5 works
          </Button>
        </div>
      </Section>

      {/* 4. What you get */}
      <Section tone="paper">
        <h2 className="t-h2 text-ink">A decision you can defend.</h2>
        <ul className="mt-10 grid gap-4 min-[900px]:grid-cols-3">
          {verdicts.map(({ verdict, detail }) => (
            <li key={verdict}>
              <Sheet className="h-full p-6">
                <p className="t-h3 text-ink">{verdict}</p>
                <p className="t-small mt-2 text-ink">{detail}</p>
              </Sheet>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Button href={CTA.samplePack.href} variant="text">
            {CTA.samplePack.label}
          </Button>
        </div>
      </Section>

      {/* 5. Offers (section 4a, the slipped go-live estimator, is added by E1.5) */}
      <Section tone="page">
        <h2 className="t-h2 text-ink">Start small, or go straight to a decision.</h2>
        <OfferPanels />
      </Section>

      {/* 6. See it before you sign */}
      <Section tone="paper">
        <h2 className="t-h2 text-ink">See the work before you talk to us.</h2>
        <ul className="mt-10 grid gap-4 min-[900px]:grid-cols-2">
          <li>
            <Sheet className="flex h-full flex-col p-6">
              <p className="t-h3 text-ink">The full sample decision pack</p>
              <p className="t-small mt-2 text-muted">View or download, no form.</p>
              <div className="mt-auto pt-6">
                <Button href={CTA.samplePack.href} variant="secondary">
                  {CTA.samplePack.label}
                </Button>
              </div>
            </Sheet>
          </li>
          <li>
            <Sheet className="flex h-full flex-col p-6">
              <p className="t-h3 text-ink">A free readiness brief on your programme</p>
              <p className="t-small mt-2 text-muted">Prepared from public information.</p>
              <div className="mt-auto pt-6">
                <Button href={CTA.brief.href} variant="secondary">
                  {CTA.brief.label}
                </Button>
              </div>
            </Sheet>
          </li>
          {siteConfig.selfCheck.live && siteConfig.selfCheck.url && (
            <li>
              <Sheet className="flex h-full flex-col p-6">
                <p className="t-h3 text-ink">The Readiness Self-Check</p>
                <div className="mt-auto pt-6">
                  <Button href={siteConfig.selfCheck.url} variant="secondary">
                    The Readiness Self-Check
                  </Button>
                </div>
              </Sheet>
            </li>
          )}
        </ul>
      </Section>

      {/* 7. Why not the usual options: the compact comparison table arrives with E5.2 */}
      <Section tone="page">
        <h2 className="t-h2 text-ink">Why not the usual options</h2>
        <div className="mt-6">
          <Button href="/pricing" variant="text">
            Pricing
          </Button>
        </div>
      </Section>

      {/* 8. Independent, and careful with your data */}
      <Section tone="paper">
        <h2 className="t-h2 text-ink">No stake in your go-live date.</h2>
        <p className="t-body mt-6 text-ink">
          We take no implementation fees, resell no software and hold no system integrator partnerships. Your documents
          are processed under a written data-handling policy: never used to train models, deleted at the end of the
          engagement unless you ask us to keep them.
        </p>
        <div className="mt-6">
          <Button href="/independence-and-data" variant="text">
            Independence and data handling
          </Button>
        </div>
      </Section>

      {/* 9. Principal-led (PRD 8.3, IN-3 approved) */}
      {siteConfig.principalBlock && (
        <Section tone="page">
          <h2 className="t-h2 text-ink">Principal-led</h2>
          <p className="t-body mt-6 text-ink">
            Every review is led and signed by a principal with 11+ years leading ERP and transformation programmes across
            aviation, banking and manufacturing, including multi-country go-lives.
          </p>
        </Section>
      )}

      {/* 10. Closing CTA */}
      <Section tone="paper">
        <h2 className="t-h2 max-w-[22ch] text-ink">Six weeks from go-live? Start with the evidence.</h2>
        <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
          <Button href={CTA.review.href} size="lg">
            {CTA.review.label}
          </Button>
          <Button href={CTA.brief.href} variant="secondary" size="lg">
            {CTA.brief.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
