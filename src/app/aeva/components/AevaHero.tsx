import Link from "next/link";

export function AevaHero() {
  return (
    <section className="relative overflow-hidden bg-[#050a12] pb-20 pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 animate-[aevaGradientShift_18s_ease_infinite] bg-[radial-gradient(circle_at_18%_22%,rgba(0,212,255,0.22),transparent_46%),radial-gradient(circle_at_82%_28%,rgba(168,85,247,0.14),transparent_48%),linear-gradient(145deg,#050a12,#09182a,#050a12)] [background-size:180%_180%]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050a12]/90" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-14">
          <div className="max-w-4xl min-w-0 flex-1">
            <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/[0.06] px-3.5 py-1.5 shadow-[0_0_24px_rgba(0,212,255,0.12)]">
              <span
                className="relative flex h-2 w-2 shrink-0 rounded-full bg-[#00d4ff]"
                style={{ boxShadow: "0 0 12px #00d4ff" }}
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-[#00d4ff] opacity-35" />
              </span>
              <span className="text-[10px] font-bold uppercase leading-snug tracking-[0.18em] text-[#7ee9ff] md:text-[11px] md:tracking-[0.2em]">
                Patent-pending · Indian Patent Office 2026 · Copyright
                LD-14934/2026-CO
              </span>
            </div>

            <h1 className="mt-7 text-[2.2rem] font-bold leading-[1.06] tracking-[-0.02em] text-[#dde6f0] md:text-[3.8rem]">
              The Governance Framework Built for the{" "}
              <span className="bg-gradient-to-r from-[#7dd3fc] via-[#a5f3fc] to-[#5eead4] bg-clip-text text-transparent">
                AI-Augmented Enterprise
              </span>
            </h1>

            <p className="mt-6 max-w-3xl border-l-2 border-[#00d4ff]/35 pl-5 text-[17px] leading-relaxed text-[#8aa4bf] md:text-[18px]">
              Enterprises are trapped in Pilot Purgatory — AI capability is racing
              ahead while governance, methodology, and adoption infrastructure
              remain frozen. AEVA is the infrastructure designed to close that
              gap.
            </p>

            <div className="mt-9 grid gap-4 md:grid-cols-3">
              <article className="group relative overflow-hidden rounded-[20px] border border-[#1a2d45] bg-[#0c1620]/90 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.25)] transition hover:-translate-y-[2px] hover:border-[#334e6b]">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-90"
                  style={{
                    background:
                      "linear-gradient(90deg, #22c55e, rgba(34,197,94,0.3))",
                    boxShadow: "0 0 20px rgba(34,197,94,0.35)",
                  }}
                />
                <p className="text-stat-lg tabular-nums text-[#22c55e]">900+</p>
                <p className="mt-2 text-body text-[#6b8aaa]">
                  hours recovered across Yamaha and Etihad deployments
                </p>
              </article>
              <article className="group relative overflow-hidden rounded-[20px] border border-[#1a2d45] bg-[#0c1620]/90 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.25)] transition hover:-translate-y-[2px] hover:border-[#334e6b]">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-90"
                  style={{
                    background:
                      "linear-gradient(90deg, #00d4ff, rgba(0,212,255,0.3))",
                    boxShadow: "0 0 20px rgba(0,212,255,0.35)",
                  }}
                />
                <p className="text-stat-lg tabular-nums text-[#00d4ff]">14</p>
                <p className="mt-2 text-body text-[#6b8aaa]">
                  original IP contributions across four dimensions
                </p>
              </article>
              <article className="group relative overflow-hidden rounded-[20px] border border-[#1a2d45] bg-[#0c1620]/90 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.25)] transition hover:-translate-y-[2px] hover:border-[#334e6b]">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-90"
                  style={{
                    background:
                      "linear-gradient(90deg, #f59e0b, rgba(245,158,11,0.35))",
                    boxShadow: "0 0 20px rgba(245,158,11,0.32)",
                  }}
                />
                <p className="text-stat-lg tabular-nums text-[#f59e0b]">88%</p>
                <p className="mt-2 text-body text-[#6b8aaa]">
                  per-project cost reduction in financial model
                </p>
              </article>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/aeva/framework"
                className="inline-flex items-center justify-center rounded-full bg-[#00d4ff] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#050a12] shadow-[0_8px_28px_rgba(0,212,255,0.38)] transition duration-200 hover:-translate-y-[2px] hover:brightness-110"
              >
                Explore the Framework →
              </Link>
              <Link
                href="/aeva/book"
                className="inline-flex items-center justify-center rounded-full border border-[#00d4ff] bg-[#050a12]/30 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff] backdrop-blur-sm transition duration-200 hover:bg-[#00d4ff]/10"
              >
                Book a 20-min Call
              </Link>
            </div>
          </div>

          <aside className="w-full shrink-0 rounded-[20px] border border-[#1a2d45]/90 bg-[#060d15]/85 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md lg:max-w-[280px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b8aaa]">
              Sections
            </p>
            <ul className="mt-4 space-y-3 text-[11px] font-bold uppercase tracking-[0.14em] leading-snug text-[#a9bdd4]">
              <li className="flex gap-3 border-b border-[#1a2d45]/80 pb-3 text-[#7dd3fc]">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#f59e0b]" />
                THE PROBLEM
              </li>
              <li className="flex gap-3 border-b border-[#1a2d45]/80 pb-3 text-[#7dd3fc]">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#4A90D9]" />
                THE FRAMEWORK
              </li>
              <li className="flex gap-3 text-[#7dd3fc]">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#22c55e]" />
                DEPLOYMENT EVIDENCE
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
