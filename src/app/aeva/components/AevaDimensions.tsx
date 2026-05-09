import Link from "next/link";

const dimensionCards = [
  {
    letter: "A",
    color: "#4A90D9",
    title: "Agile Governance Layer",
    description:
      "Embeds governance into existing agile ceremonies without slowing delivery.",
  },
  {
    letter: "E",
    color: "#E8902A",
    title: "Enterprise AI Visibility",
    description:
      "Maps every AI tool in use — sanctioned and unsanctioned — across the organisation.",
  },
  {
    letter: "V",
    color: "#5BBF8A",
    title: "Velocity Preservation",
    description:
      "Governance designed to add structure without adding friction.",
  },
  {
    letter: "A",
    color: "#C96DD8",
    title: "Alignment Architecture",
    description:
      "Connects AI tool usage to strategy, risk appetite, and regulatory requirements.",
  },
];

export function AevaDimensions() {
  return (
    <section className="bg-[#050a12] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]">
      <div className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <p className="text-label text-[#00d4ff]">THE FRAMEWORK</p>
        <h2 className="mt-4 text-display text-[#dde6f0]">
          Four dimensions. One governance system.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {dimensionCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6"
            >
              <p className="text-stat-lg font-bold" style={{ color: card.color }}>
                {card.letter}
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
