import Link from "next/link";
import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export function AevaFinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#050a12] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(0,212,255,0.18),transparent_45%),linear-gradient(150deg,#050a12,#09182a,#050a12)]" />

      <div className="relative mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <div className="relative overflow-hidden rounded-[24px] border border-[#00d4ff]/30">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#00d4ff]/[0.1] via-[#050a12]/95 to-[#a855f7]/[0.08]" />
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#00d4ff]/18 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-[#a855f7]/14 blur-3xl" />

          <div className="relative rounded-[24px] border border-[#1a2d45]/90 bg-[#0c1620]/75 p-8 backdrop-blur-[2px] md:p-12">
            <h2
              className={`${syne.className} max-w-[24ch] text-balance text-[2rem] font-[700] leading-[1.12] tracking-[-0.005em] text-[#dde6f0] md:max-w-[20ch] md:text-[2.9rem]`}
            >
              Is your organisation still running AI pilots that never reach
              production?
            </h2>
            <p className="mt-5 max-w-3xl border-l-2 border-[#00d4ff]/30 pl-5 text-body-lg leading-relaxed text-[#8aa4bf]">
              Pilot Purgatory is not a technology problem. It is a governance
              infrastructure problem — and governance infrastructure can be built.
              AEVA has been deployed at enterprise scale across manufacturing and
              aviation. If you are building or hiring for an AI governance
              function, I would like to hear from you.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/aeva/book"
                className="inline-flex items-center justify-center rounded-full bg-[#00d4ff] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#050a12] shadow-[0_8px_28px_rgba(0,212,255,0.38)] transition hover:-translate-y-px hover:brightness-110"
              >
                Book a 20-minute call
              </Link>
              <Link
                href="/aeva/90-day-plan"
                className="inline-flex items-center justify-center rounded-full border border-[#00d4ff] bg-[#050a12]/45 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff] backdrop-blur-sm transition hover:bg-[#00d4ff]/10"
              >
                Download the 30-60-90 Day Plan
              </Link>
            </div>

            <p className="mt-8 border-t border-[#1a2d45]/90 pt-6 text-[12px] text-[#6b8aaa]">
              Agam Agrawwal · Founder, ChisokuLab · Creator of AEVA Framework ·
              Patent Pending IPO 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
