import { offerPriceLabel, siteConfig } from "../../lib/siteConfig";
import { Button } from "../ui/Button";
import { Sheet } from "../ui/Sheet";

/** One-line outcomes are the first sentence of each offer page lead (PRD 9.2, 9.3). */
const panels = [
  {
    key: "evidenceCheck",
    outcome: "A five-day written review of your programme's readiness evidence.",
  },
  {
    key: "decisionReview",
    outcome:
      "A ten-day independent review that gives your steering committee a defensible go-live decision: Go, Conditional Go or No-Go, with the conditions, owners and dates behind it.",
  },
] as const;

/** Homepage section 5: the two offers, prices from config, founding rate while places remain, fee credit once. */
export function OfferPanels() {
  const foundingPlaces = siteConfig.foundingSlotsRemaining;
  return (
    <>
      <div className="mt-10 grid gap-6 min-[900px]:grid-cols-2">
        {panels.map(({ key, outcome }) => {
          const offer = siteConfig.offers[key];
          const price = offerPriceLabel(key);
          return (
            <Sheet key={key} as="article" className="flex flex-col p-6 min-[641px]:p-8">
              <h3 className="t-h3 text-ink">{offer.name}</h3>
              <p className="t-small mt-1 text-muted">{`${offer.days} business days`}</p>
              <p className="t-body mt-4 text-ink">{outcome}</p>
              <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-5">
                <div>
                  <dt className="t-small text-muted">List price</dt>
                  <dd className="t-data mt-1 text-[20px] text-ink">{price.list}</dd>
                </div>
                {price.founding && (
                  <div>
                    <dt className="t-small text-muted">Founding-client rate</dt>
                    <dd className="t-data mt-1 text-[20px] text-ink">{price.founding}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-auto pt-6">
                <Button href={offer.path} variant="text">
                  {offer.name}
                </Button>
              </div>
            </Sheet>
          );
        })}
      </div>
      <div className="t-small mt-6 max-w-[70ch] space-y-2 text-muted">
        {foundingPlaces > 0 && (
          <p>
            Founding-client rate: the first three clients pay 50% of list price in exchange for a named or anonymised
            case study. {`Founding-client places remaining: ${foundingPlaces}.`}
          </p>
        )}
        <p className="text-ink">
          {`The full Evidence Check fee is credited against a Go-Live Decision Review signed within ${siteConfig.feeCreditDays} days of the Evidence Check report.`}
        </p>
      </div>
    </>
  );
}
