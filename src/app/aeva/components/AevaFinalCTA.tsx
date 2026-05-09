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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(0,212,255,0.2),transparent_45%),linear-gradient(150deg,#050a12,#09182a,#050a12)]" />
      <div className="relative mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <div className="rounded-[24px] border border-[#1a2d45] bg-[#0c1620]/85 p-8 md:p-12">
          <h2
            className={`${syne.className} max-w-[24ch] text-balance text-[2rem] font-[700] leading-[1.12] tracking-[-0.005em] text-[#dde6f0] md:max-w-[20ch] md:text-[2.9rem]`}
          >
            Is your organisation ready for what happens when AI scales faster
            than governance?
          </h2>
          <p className="mt-5 max-w-3xl text-body-lg text-[#6b8aaa]">
            AEVA has been deployed at enterprise scale across manufacturing and
            aviation. If you are building or hiring for an AI governance
            function, I would like to hear from you.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/aeva/book"
              className="inline-flex items-center justify-center rounded-full bg-[#00d4ff] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#050a12]"
            >
              Book a 20-minute call
            </Link>
            <Link
              href="/aeva/90-day-plan"
              className="inline-flex items-center justify-center rounded-full border border-[#00d4ff] bg-transparent px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff]"
            >
              Download the 30-60-90 Day Plan
            </Link>
          </div>

          <p className="mt-6 text-[12px] text-[#6b8aaa]">
            Agam Agrawwal · Founder, ChisokuLab · Creator of AEVA Framework
          </p>
        </div>
      </div>
    </section>
  );
}
