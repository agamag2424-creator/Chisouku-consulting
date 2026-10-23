import { foundingClientStatement } from "../../content/founding";
import { offerPriceLabel, siteConfig } from "../../lib/siteConfig";
import { cn } from "../../lib/utils";
import { DayStrip } from "../offers/DayStrip";
import { Button } from "../ui/Button";
import { Sheet } from "../ui/Sheet";

/** One-line outcomes are the first sentence of each offer page lead (PRD 9.2, 9.3). */
const panels = [
  {
    key: "evidenceCheck",
    outcome: "A five-day written review of your programme's readiness evidence.",
    // PRD 9.2 "How it runs": the real sequence, so the strip marks its first and last day.
    sequence: "Day 1 scoping call and document request. Days 2–4 evidence review. Day 5 written findings and readout.",
  },
  {
    key: "decisionReview",
    outcome:
      "A ten-day independent review that gives your steering committee a defensible go-live decision: Go, Conditional Go or No-Go, with the conditions, owners and dates behind it.",
    sequence: null,
  },
] as const;

/** Homepage section 5: the two offers, prices from config, founding rate while places remain, fee credit once. */
export function OfferPanels() {
  const foundingPlaces = siteConfig.foundingSlotsRemaining;
  return (
    <>
      <div className="relative mt-12 grid gap-8 min-[900px]:grid-cols-2">
        {panels.map(({ key, outcome, sequence }, index) => {
          const offer = siteConfig.offers[key];
          const price = offerPriceLabel(key);
          return (
            <Sheet
              key={key}
              as="article"
              className={cn("flex flex-col gap-5 p-6 min-[641px]:p-8", index === 0 ? "order-1" : "order-3 border-2 border-ink")}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="t-h3 text-ink">{offer.name}</h3>
                <p className="t-data text-[13px] text-muted">{`${offer.days} business days`}</p>
              </div>
              <p className="t-body text-ink">{outcome}</p>
              <DayStrip days={offer.days} />
              {sequence && <p className="text-[13px] leading-snug text-muted">{sequence}</p>}
              <dl className="mt-auto flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-5">
                <div>
                  <dt className="text-[13px] text-muted">List price</dt>
                  <dd className="t-data mt-1.5 text-[24px] text-ink">{price.list}</dd>
                </div>
                {price.founding && (
                  <div>
                    <dt className="text-[13px] text-muted">Founding-client rate</dt>
                    <dd className="t-data mt-1.5 text-[24px] text-teal">{price.founding}</dd>
                  </div>
                )}
              </dl>
              <div>
                <Button href={offer.path} variant="text">
                  {offer.name}
                </Button>
              </div>
            </Sheet>
          );
        })}
        <p className="order-2 -my-3 flex items-center gap-2 self-center justify-self-center whitespace-nowrap rounded-full bg-ink px-4 py-2.5 text-[13px] font-semibold text-paper min-[900px]:absolute min-[900px]:left-1/2 min-[900px]:top-0 min-[900px]:m-0 min-[900px]:-translate-x-1/2 min-[900px]:-translate-y-1/2">
          <svg
            viewBox="0 0 16 12"
            className="h-3 w-4 rotate-90 min-[900px]:rotate-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            focusable="false"
          >
            <path d="M1 6h13M9 1l5 5-5 5" />
          </svg>
          Fee credited in full
        </p>
      </div>
      <div className="mt-7 grid gap-6 min-[900px]:grid-cols-2 min-[900px]:gap-8">
        <p className="t-small font-semibold text-ink">
          {`The full Evidence Check fee is credited against a Go-Live Decision Review signed within ${siteConfig.feeCreditDays} days of the Evidence Check report.`}
        </p>
        {foundingPlaces > 0 && (
          <div className="flex items-start gap-4">
            <span aria-hidden className="mt-1 flex shrink-0 gap-1.5">
              {Array.from({ length: foundingPlaces }, (_, place) => (
                <span key={place} className="size-3 rounded-full bg-teal" />
              ))}
            </span>
            <p className="t-small text-muted">{foundingClientStatement(foundingPlaces)}</p>
          </div>
        )}
      </div>
    </>
  );
}
