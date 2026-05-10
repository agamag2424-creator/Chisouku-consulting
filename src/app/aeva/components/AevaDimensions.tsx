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
        <h2 className="mt-4 text-display text-[#dde6f0]">
          Four dimensions. Fourteen original IP contributions.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {dimensionCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6"
            >
              <p
                className="text-stat-lg font-bold"
                style={{ color: card.color }}
              >
                {card.number}
              </p>
              <h3 className="mt-4 text-h2 text-[#dde6f0]">{card.title}</h3>
              <p className="mt-3 text-body text-[#6b8aaa]">{card.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/aeva/framework"
            className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff] hover:text-[#72e5ff]"
          >
            See the full framework →
          </Link>
        </div>
      </div>
    </section>
  );
}
