import type { Metadata } from "next";
import Link from "next/link";
import { getAllCaseStudies } from "@/lib/caseStudies";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Deep analysis of AI adoption in enterprise — what worked, what failed, and what it means for your organisation.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <section className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] py-16 md:px-[var(--content-padding-x)] md:py-24">
      <header className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-cyan)]">
          Intelligence Archive
        </p>
        <h1 className="mt-4 text-display">Case Studies</h1>
        <p className="mt-5 text-body-lg text-white/90">
          Deep analysis of AI adoption in enterprise - what worked, what failed,
          and what it means for your organisation.
        </p>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2">
        {caseStudies.map((study) => (
          <article
            key={study.slug}
            className="relative overflow-hidden rounded-2xl border border-[var(--color-border-light)] bg-[rgba(13,24,41,0.55)] p-6 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="inline-flex rounded-full border border-[var(--color-cyan-dim)] bg-[rgba(0,212,255,0.08)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-cyan)]">
                {study.sector}
              </span>
              {!study.published && (
                <span className="inline-flex rounded-full border border-[var(--color-border-light)] bg-[rgba(92,109,136,0.12)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                  Coming Soon
                </span>
              )}
            </div>

            <h2 className="mt-5 text-h2">{study.title}</h2>
            <p className="mt-4 text-body">{study.summary.slice(0, 120)}</p>

            <div className="mt-8">
              {study.published ? (
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center rounded-full border border-[var(--color-cyan-dim)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-cyan)] transition-colors hover:bg-[rgba(0,212,255,0.08)]"
                >
                  Read Analysis
                </Link>
              ) : (
                <span className="inline-flex cursor-not-allowed items-center rounded-full border border-[var(--color-border)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                  Read Analysis
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-[var(--color-border-light)] bg-[rgba(13,24,41,0.5)] p-6 md:mt-14 md:p-8">
        <p className="text-h3">Subscribe to our analysis</p>
        <p className="mt-3 text-body max-w-2xl">
          Get case study breakdowns and practical AI adoption insights directly in
          your inbox.
        </p>
        <a
          href={siteConfig.substackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center rounded-full border border-[var(--color-cyan-dim)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-cyan)] transition-colors hover:bg-[rgba(0,212,255,0.08)]"
        >
          Subscribe on Substack
        </a>
      </div>
    </section>
  );
}
