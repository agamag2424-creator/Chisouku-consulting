import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "../../components/ui/Section";
import { SectionLabel } from "../../components/ui/SectionLabel";
import { InsightsWaitlistForm } from "../../components/insights/InsightsWaitlistForm";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "AI-Led PMO Insights & Briefings",
  description:
    "AI governance insights, PMO modernization strategies, and AI solution case studies from ChisokuLab.",
  robots: {
    index: false,
    follow: true,
  },
  keywords: [
    "AI PMO insights",
    "enterprise AI briefings",
    "AI transformation",
  ],
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-void pt-14 text-[var(--color-text-primary)]">
      <Section>
        <div className="flex min-h-[calc(100vh-56px-160px)] items-center justify-center text-center">
          <div className="max-w-[520px] px-5">
            <SectionLabel>INSIGHTS</SectionLabel>
            <h1 className="text-h1 mt-4 mb-3">
              Intelligence briefings are coming soon.
            </h1>
            <p className="text-body mx-auto mb-9 max-w-[460px]">
              We&apos;re preparing in-depth analyses on AI governance, shadow AI
              risk management, PMO modernization, and practical AI solutions for
              mid-market companies.
            </p>
            <InsightsWaitlistForm />
            <p className="mt-3 text-[11px] italic text-[var(--color-text-muted)]">
              No spam. Unsubscribe anytime.
            </p>
            <a
              href={siteConfig.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center rounded-full border border-[var(--color-cyan-dim)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-cyan)] transition-colors hover:bg-[rgba(0,212,255,0.08)]"
            >
              Follow on Substack
            </a>
            <Link
              href="/"
              className="mt-10 inline-block text-[12px] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              ← Back to homepage
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}

