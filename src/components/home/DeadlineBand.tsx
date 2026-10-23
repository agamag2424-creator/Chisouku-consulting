import Link from "next/link";
import { homepageAed50Clause, homepageSaudiClause, homepageSmallerClause } from "../../lib/uaeTimeline";

/** Slim homepage band under the hero (brief A2). Wraps at every width; the AED 50m+ clause switches with the clock. */
export function DeadlineBand() {
  return (
    <aside
      aria-label="Regulatory dates"
      className="border-b border-line bg-teal-tint px-[var(--content-padding-x-mobile)] py-3.5 min-[641px]:px-[var(--content-padding-x)]"
    >
      <p className="mx-auto max-w-[var(--content-max-width)] text-pretty text-[14px] leading-relaxed text-ink min-[641px]:text-[15px]">
        <Link href="/go-live-readiness-uae" className="font-semibold underline decoration-1 underline-offset-4 hover:decoration-2">
          UAE e-invoicing
        </Link>
        {`: ${homepageAed50Clause()}; ${homepageSmallerClause}. `}
        <Link
          href="/go-live-readiness-saudi-arabia"
          className="font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
        >
          Saudi Arabia
        </Link>
        {`: ${homepageSaudiClause}.`}
      </p>
    </aside>
  );
}
