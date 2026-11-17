import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandMark } from "../../../components/brand/BrandMark";
import { headline, healthAudit, healthCheck } from "../../../content/offer";

/** Share-image source (1200 x 630), screenshotted by scripts/makeOgImages.mjs. Development and previews only. */
const show = process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const cards: Record<string, { eyebrow: string; title: string; sub: string }> = {
  home: { eyebrow: "PMO Health Check", title: headline.h1, sub: headline.sub },
  "health-check": { eyebrow: `PMO Health Check · ${healthCheck.price}`, title: "One programme. Five working days. Evidence, not opinion.", sub: `${healthCheck.outputs}.` },
  "health-audit": { eyebrow: "PMO Health Audit", title: "The whole portfolio, scored with evidence on ten dimensions.", sub: `${healthAudit.priceLine} ${healthAudit.cap}` },
  "self-check": { eyebrow: "Free · 5 minutes", title: "PMO self-check: ten dimensions, scored in your browser.", sub: "The same ten dimensions the paid Health Check fills in with evidence." },
  method: { eyebrow: "Method", title: "The PMO Health Scorecard: ten dimensions, scored on evidence.", sub: "Where the three problems show up, how evidence is checked, and the 30-day fix plan." },
  "see-it-first": { eyebrow: "See it first", title: "A sample scorecard and a 30-day fix plan.", sub: "Sample. Fictional organisation." },
};

export default async function OgPage({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  if (!show) notFound();
  const { v = "home" } = await searchParams;
  const card = cards[v] ?? cards.home;
  return (
    <div
      data-og
      className="fixed left-0 top-0 z-[999] flex h-[630px] w-[1200px] flex-col justify-between overflow-hidden bg-page p-[72px]"
      style={{ background: "radial-gradient(circle at 84% 8%, rgba(0,166,200,0.12), transparent 34%), linear-gradient(180deg,#f8f7f4,#f5f4f0 60%,#eceae4)" }}
    >
      <div className="map-grid-texture pointer-events-none absolute inset-0 opacity-80" />
      <div className="relative flex items-center gap-4">
        <BrandMark className="h-12 w-12" />
        <span className="font-[family-name:var(--font-display)] text-[30px] font-bold tracking-[-0.03em] text-ink">ChisokuLabs</span>
      </div>
      <div className="relative">
        <p className="font-[family-name:var(--font-mono)] text-[20px] font-bold uppercase tracking-[0.14em] text-teal">{card.eyebrow}</p>
        <p className="mt-4 max-w-[1000px] font-[family-name:var(--font-display)] text-[58px] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink">{card.title}</p>
        <p className="mt-6 max-w-[920px] text-[26px] leading-[1.4] text-muted">{card.sub}</p>
      </div>
      <div className="relative h-[6px] w-[220px] bg-gold" />
    </div>
  );
}
