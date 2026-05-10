import Link from "next/link";

const dimensionCards = [
  {
    number: "01",
    color: "#4A90D9",
    title: "Ceremony Restructuring",
    description:
      "Six core Agile ceremonies evolved into AI-era equivalents — each with an original name. DataRetro. Precision Backlog Refinement. Increment Planning. Pulse Sync. Increment Governance Review. Feature Clearance.",
  },
  {
    number: "02",
    color: "#E8902A",
    title: "Lean AI-Era Team Structure",
    description:
      "Role evolution map for every Agile role. Four newly defined roles not existing in any prior framework. Junior-senior hierarchy inversion. Approximately 40% headcount reduction at equivalent output.",
  },
  {
    number: "03",
    color: "#5BBF8A",
    title: "Velocity Recalibration and Financial Model",
    description:
      "Decision Complexity Index — a 16-point scoring system replacing story points. DCI Governance Shield preventing gaming. 88% per-project cost reduction. Up to 12 projects per year where traditional teams deliver 2.",
  },
  {
    number: "04",
    color: "#C96DD8",
    title: "Five Transition Risks",
    description:
      "The predictable failure patterns that destroy AI adoption programmes before production scale. Governance Lag. Governance Drag. Shadow AI Proliferation. The Identity Crisis. Strategic Blindness. Each named, defined, and mitigated.",
  },
];

export function AevaDimensions() {
  return (
    <section className="bg-[#050a12] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]">
      <div className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <p className="text-label text-[#00d4ff]">THE FRAMEWORK</p>
        <h2 className="mt-4 max-w-4xl text-display text-[#dde6f0]">
          Four dimensions.{" "}
          <span className="bg-gradient-to-r from-[#7dd3fc] to-[#a5f3fc] bg-clip-text text-transparent">
            Fourteen
          </span>{" "}
          original IP contributions.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {dimensionCards.map((card) => (
            <article
              key={card.title}
              className="group relative overflow-hidden rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6 shadow-[0_20px_48px_rgba(0,0,0,0.22)] transition hover:-translate-y-[2px] hover:border-[#334e6b] md:p-7"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
                style={{
                  background: `linear-gradient(90deg, ${card.color}, ${card.color}44, transparent)`,
                  boxShadow: `0 0 24px ${card.color}40`,
                }}
              />
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-[0.12] blur-3xl"
                style={{ backgroundColor: card.color }}
              />
              <p
                className="relative text-stat-lg font-bold tabular-nums"
                style={{ color: card.color }}
              >
                {card.number}
              </p>
              <h3 className="relative mt-4 text-h2 text-[#dde6f0]">{card.title}</h3>
              <p className="relative mt-3 text-body leading-relaxed text-[#6b8aaa]">
                {card.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/aeva/framework"
            className="inline-flex w-fit items-center justify-center rounded-full border border-[#00d4ff]/50 bg-[#00d4ff]/[0.08] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff] shadow-[0_0_28px_rgba(0,212,255,0.15)] transition hover:border-[#00d4ff] hover:bg-[#00d4ff]/15"
          >
            See the full framework →
          </Link>
        </div>
      </div>
    </section>
  );
}
