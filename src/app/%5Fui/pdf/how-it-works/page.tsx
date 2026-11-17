import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { companyLine, healthCheck, taxLine } from "../../../../content/offer";
import { faqItems } from "../../../../lib/aeoContent";
import { siteConfig } from "../../../../lib/siteConfig";

/**
 * Source of the "How a PMO Health Check works" PDF (change 1): one A4 page built only from existing site copy.
 * Printed by scripts/makePdfs.mjs. Development and previews only; 404 in production.
 */
const show = process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";

export const metadata: Metadata = { title: "How a PMO Health Check works", robots: { index: false, follow: false } };

const confidentiality = faqItems.find((item) => item.id === "confidentiality")?.answer ?? "";

const dayLabel = (from: number, to: number) => (from === to ? `Day ${from}` : `Days ${from} to ${to}`);

export default function HowItWorksPdf() {
  if (!show) notFound();
  return (
    <div data-pdf className="fixed inset-0 z-[999] overflow-auto bg-white">
      <article className="mx-auto w-[210mm] px-[16mm] py-[14mm] text-[11pt] leading-[1.45] text-ink">
        <header className="flex items-baseline justify-between border-b border-ink/20 pb-3">
          <p className="font-[family-name:var(--font-display)] text-[16pt] font-semibold">{siteConfig.name}</p>
          <p className="text-[9pt] text-muted">{siteConfig.url.replace("https://", "")}</p>
        </header>

        <h1 className="mt-6 font-[family-name:var(--font-display)] text-[22pt] font-semibold leading-tight">How a PMO Health Check works</h1>
        <p className="mt-2 text-[11pt] text-muted">
          {healthCheck.scope}. {healthCheck.timing}.
        </p>

        <h2 className="mt-6 font-[family-name:var(--font-display)] text-[13pt] font-semibold">What we need from you</h2>
        <p className="mt-1">{healthCheck.inputs}.</p>

        <h2 className="mt-5 font-[family-name:var(--font-display)] text-[13pt] font-semibold">The five working days</h2>
        <ol className="mt-2 grid gap-1.5">
          {healthCheck.steps.map((step) => (
            <li key={step.text} className="grid grid-cols-[30mm_1fr] gap-3">
              <span className="font-semibold text-gold-ink">{dayLabel(step.from, step.to)}</span>
              <span>{step.text}</span>
            </li>
          ))}
        </ol>

        <h2 className="mt-5 font-[family-name:var(--font-display)] text-[13pt] font-semibold">What you get</h2>
        <p className="mt-1">{healthCheck.outputs}.</p>

        <h2 className="mt-5 font-[family-name:var(--font-display)] text-[13pt] font-semibold">Price</h2>
        <p className="mt-1">
          {healthCheck.payment} {healthCheck.credit} {healthCheck.cancellation}
        </p>
        <p className="mt-1 text-muted">{taxLine}</p>

        <h2 className="mt-5 font-[family-name:var(--font-display)] text-[13pt] font-semibold">Confidentiality</h2>
        <p className="mt-1">{confidentiality}</p>

        <footer className="mt-8 border-t border-ink/20 pt-3 text-[8.5pt] text-muted">
          <p>
            {siteConfig.email} · {siteConfig.url.replace("https://", "")}/pmo-health-check
          </p>
          <p className="mt-1">{companyLine}</p>
        </footer>
      </article>
    </div>
  );
}
