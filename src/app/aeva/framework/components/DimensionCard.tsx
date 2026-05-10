import type { ReactNode } from "react";

type DimensionCardProps = {
  dimensionNumber: string;
  color: string;
  title: string;
  children: ReactNode;
};

export function DimensionCard({
  dimensionNumber,
  color,
  title,
  children,
}: DimensionCardProps) {
  return (
    <article className="rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6 md:p-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.15em]">
        <span className="text-[#6b8aaa]">DIMENSION </span>
        <span style={{ color }}>{dimensionNumber}</span>
      </p>
      <h2 className="mt-3 text-h1 text-[#dde6f0]">{title}</h2>
      <div className="mt-5 space-y-6">{children}</div>
    </article>
  );
}
