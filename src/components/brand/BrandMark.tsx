import { cn } from "../../lib/utils";

type BrandMarkProps = {
  className?: string;
  inverted?: boolean;
};

/** Refined brush-C mark + clean geometry — logo without relying on noisy raster. */
export function BrandMark({ className, inverted = false }: BrandMarkProps) {
  const ink = inverted ? "#FFFDF8" : "#111820";
  const cyan = "#00A6C8";

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="ChisokuLabs"
    >
      <rect width="64" height="64" rx="10" fill={inverted ? "rgba(255,253,248,0.08)" : "#FFFDF8"} />
      <rect
        x="1.5"
        y="1.5"
        width="61"
        height="61"
        rx="9"
        fill="none"
        stroke={inverted ? "rgba(255,253,248,0.18)" : "rgba(17,24,32,0.12)"}
        strokeWidth="1.5"
      />
      <path
        d="M44.5 18.2c-3.2-3.4-7.7-5.4-12.7-5.4-9.8 0-17.7 7.5-17.7 18.2s7.9 18.2 17.7 18.2c5.1 0 9.6-2 12.8-5.5"
        fill="none"
        stroke={ink}
        strokeWidth="5.2"
        strokeLinecap="round"
      />
      <path
        d="M41.8 22.4c-2.1-2.1-5-3.3-8.3-3.3-6.4 0-11.4 4.8-11.4 12.1s5 12.1 11.4 12.1c3.3 0 6.2-1.2 8.3-3.4"
        fill="none"
        stroke={cyan}
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="45.5" cy="32" r="2.4" fill={cyan} />
    </svg>
  );
}
