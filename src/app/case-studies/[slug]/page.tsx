import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getPublishedCaseStudies,
  getPublishedCaseStudyBySlug,
} from "@/lib/caseStudies";
import { siteConfig } from "@/lib/siteConfig";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const caseStudies = await getPublishedCaseStudies();
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getPublishedCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: study.title,
    description: study.summary,
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = await getPublishedCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] py-16 md:px-[var(--content-padding-x)] md:py-24">
      <header className="max-w-4xl border-b border-[var(--color-border)] pb-10">
        <span className="inline-flex rounded-full border border-[var(--color-cyan-dim)] bg-[rgba(0,212,255,0.08)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-cyan)]">
          {study.sector}
        </span>
        <h1 className="mt-5 text-display text-[var(--color-cyan)]">{study.title}</h1>
        <p className="mt-5 text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
          Published {new Date(study.date).toLocaleDateString("en-IN", { dateStyle: "long" })}
        </p>
        <p className="mt-4 max-w-3xl text-body-lg text-white/90">{study.summary}</p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,65%)_minmax(0,35%)] lg:items-start">
        <article className="prose prose-invert max-w-none text-[var(--color-text-secondary)] prose-p:leading-8 prose-li:my-1 prose-ul:my-4 prose-headings:font-semibold prose-headings:tracking-[-0.01em] prose-h2:mt-10 prose-h2:text-[var(--color-cyan)] prose-h3:mt-8 prose-h3:text-[var(--color-cyan)]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{study.content}</ReactMarkdown>
        </article>

        <aside className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-[var(--color-cyan-dim)] bg-[rgba(13,24,41,0.55)] p-6">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--color-cyan)]">
              Key Takeaways
            </h2>
            <ul className="mt-4 space-y-3 text-body">
              {study.takeaways.map((takeaway) => (
                <li key={takeaway} className="flex gap-2">
                  <span className="mt-[8px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-cyan)]" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section className="mt-14 rounded-2xl border border-[var(--color-border-light)] bg-[#0D1117] px-6 py-8 md:px-8 md:py-10">
        <p className="text-h3">Facing a similar challenge in your organisation?</p>
        <div className="mt-5">
          <Link
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-[var(--color-cyan)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-void)] transition-transform hover:-translate-y-[1px]"
          >
            Book a Discovery Call
          </Link>
        </div>
      </section>
    </section>
  );
}
