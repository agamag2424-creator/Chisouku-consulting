type DimensionCardProps = {
  letter: string;
  color: string;
  title: string;
  problem: string;
  bullets: string[];
  inPractice: string;
  connectsTo: string;
};

export function DimensionCard({
  letter,
  color,
  title,
  problem,
  bullets,
  inPractice,
  connectsTo,
}: DimensionCardProps) {
  return (
    <article className="rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6 md:p-8">
      <p className="text-stat-lg font-bold" style={{ color }}>
        {letter}
      </p>
      <h2 className="mt-3 text-h1 text-[#dde6f0]">{title}</h2>

      <div className="mt-5 space-y-5">
        <div>
          <p className="text-label text-[#00d4ff]">Problem</p>
          <p className="mt-2 text-body text-[#6b8aaa]">{problem}</p>
        </div>

        <div>
          <p className="text-label text-[#00d4ff]">How it works</p>
          <ul className="mt-2 space-y-2 text-body text-[#6b8aaa]">
            {bullets.map((bullet) => (
              <li key={bullet}>- {bullet}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-label text-[#00d4ff]">In practice</p>
          <p className="mt-2 text-body text-[#6b8aaa]">{inPractice}</p>
        </div>

        <div>
          <p className="text-label text-[#00d4ff]">Connects to</p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b8aaa]">
            {connectsTo}
          </p>
        </div>
      </div>
    </article>
  );
}
