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
    <article className="relative overflow-hidden rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6 shadow-[0_24px_48px_rgba(0,0,0,0.28)] md:p-8">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
        style={{
          background: `linear-gradient(90deg, ${color}, ${color}66, transparent)`,
          boxShadow: `0 0 24px ${color}44`,
        }}
      />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full opacity-[0.07] blur-3xl"
        style={{ backgroundColor: color }}
      />
      <div className="relative">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em]">
          <span className="text-[#6b8aaa]">DIMENSION </span>
          <span style={{ color }}>{dimensionNumber}</span>
        </p>
        <h2 className="mt-3 text-h1 text-[#dde6f0]">{title}</h2>
        <div className="mt-5 space-y-6">{children}</div>
      </div>
    </article>
  );
}
