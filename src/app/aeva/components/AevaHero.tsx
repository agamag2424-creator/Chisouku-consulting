import Link from "next/link";

export function AevaHero() {
  return (
    <section className="relative overflow-hidden bg-[#050a12] pb-20 pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 animate-[aevaGradientShift_16s_ease_infinite] bg-[radial-gradient(circle_at_20%_20%,rgba(0,212,255,0.2),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.16),transparent_45%),linear-gradient(145deg,#050a12,#09182a,#050a12)] [background-size:180%_180%]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <div className="max-w-4xl">
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#00d4ff]">
            PATENT-PENDING · INDIAN PATENT OFFICE 2026
          </p>
          <h1 className="mt-5">
            <span className="block text-[2.2rem] font-[700] leading-[1.06] tracking-[-0.005em] text-[#dde6f0] md:text-[3.8rem]">
              The Governance Framework
            </span>
            <span className="mt-3 block text-[0.98rem] font-[700] uppercase leading-[1.28] tracking-[0.08em] text-[#9edff0] md:text-[1.2rem]">
              Built for the{" "}
              <span className="inline-flex items-center rounded-full border border-[#00d4ff4d] bg-[#00d4ff1a] px-3 py-0.5 font-[700] tracking-[0.06em] text-[#b9f1ff]">
                AI-Augmented
              </span>{" "}
              Enterprise
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-[#6b8aaa]">
            AEVA was developed from first-hand observation of AI failure modes
            in live enterprise PMOs — Shadow AI proliferation, agentic workflow
            risk, and the alignment breakdown that happens when AI tools outpace
            policy.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <article className="rounded-[20px] border border-[#1a2d45] bg-[#0c1620]/80 p-6">
              <p className="text-stat-lg text-[#22c55e]">900+</p>
              <p className="mt-2 text-body text-[#6b8aaa]">
                hours recovered across deployments
              </p>
            </article>
            <article className="rounded-[20px] border border-[#1a2d45] bg-[#0c1620]/80 p-6">
              <p className="text-stat-lg text-[#00d4ff]">5</p>
              <p className="mt-2 text-body text-[#6b8aaa]">
                departments governed in first deployment
              </p>
            </article>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/aeva/framework"
              className="inline-flex items-center justify-center rounded-full bg-[#00d4ff] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#050a12] transition duration-200 hover:-translate-y-[1px]"
            >
              Explore the Framework →
            </Link>
            <Link
              href="/aeva/book"
              className="inline-flex items-center justify-center rounded-full border border-[#00d4ff] bg-transparent px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff] transition duration-200 hover:bg-[rgba(0,212,255,0.08)]"
            >
              Book a 20-min Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
