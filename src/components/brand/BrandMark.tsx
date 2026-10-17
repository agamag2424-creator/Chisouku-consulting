import { cn } from "../../lib/utils";

type BrandMarkProps = {
  className?: string;
  inverted?: boolean;
};

/** Refined brush-C mark + clean geometry — logo without relying on noisy raster. */
export function BrandMark({ className, inverted = false }: BrandMarkProps) {
  const ink = inverted ? "stroke-paper" : "stroke-ink";

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="ChisokuLabs"
    >
      <rect className={inverted ? "fill-paper/8" : "fill-paper"} width="64" height="64" rx="10" />
      <rect
        x="1.5"
        y="1.5"
        width="61"
        height="61"
        rx="9"
        fill="none"
        className={inverted ? "stroke-paper/18" : "stroke-ink/12"}
        strokeWidth="1.5"
      />
      <path
        d="M44.5 18.2c-3.2-3.4-7.7-5.4-12.7-5.4-9.8 0-17.7 7.5-17.7 18.2s7.9 18.2 17.7 18.2c5.1 0 9.6-2 12.8-5.5"
        fill="none"
        className={ink}
        strokeWidth="5.2"
        strokeLinecap="round"
      />
      <path
        d="M41.8 22.4c-2.1-2.1-5-3.3-8.3-3.3-6.4 0-11.4 4.8-11.4 12.1s5 12.1 11.4 12.1c3.3 0 6.2-1.2 8.3-3.4"
        fill="none"
        className="stroke-teal"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle className="fill-teal" cx="45.5" cy="32" r="2.4" />
    </svg>
  );
}
