import { foundingClientStatement } from "../../content/founding";
import { extraDaysSentence, feeCreditSentence, offerPriceLabel, siteConfig, type OfferKey } from "../../lib/siteConfig";
import { cn } from "../../lib/utils";
import { healthCheck, taxLine } from "../../content/offer";

type PriceBlockProps = {
  offer: OfferKey;
  /** Defaults to config; overridable so the zero-slots state can be shown and tested. */
  foundingSlotsRemaining?: number;
  /** Defaults to on. The credit line applies to both offers. */
  showFeeCredit?: boolean;
  /** Off when a heading beside the block already names the offer. */
  showName?: boolean;
  /** Full terms once per page. Off when another block on the same page already states them. */
  showTerms?: boolean;
  className?: string;
};

/** Price for one offer, read from config: list price, founding-client rate while places remain, fee credit. */
export function PriceBlock({
  offer,
  foundingSlotsRemaining = siteConfig.foundingSlotsRemaining,
  showFeeCredit,
  showName = true,
  showTerms = true,
  className,
}: PriceBlockProps) {
  const data = siteConfig.offers[offer];
  const { list, founding: foundingPrice } = offerPriceLabel(offer, foundingSlotsRemaining);
  const founding = foundingPrice !== null;
  const feeCredit = showFeeCredit ?? "listPrice" in data;

  return (
    <div className={cn("rounded-sheet border border-line bg-paper p-6", className)}>
      {showName && <p className="t-h3 text-ink">{data.name}</p>}
      {"days" in data && <p className="mt-1 t-small text-muted">{`${data.days} working days`}</p>}

      <dl className={cn("flex flex-wrap gap-x-10 gap-y-4", (showName || "days" in data) && "mt-5")}>
        <div>
          <dt className="t-small text-muted">{data.priceCaption}</dt>
          <dd className="t-data mt-1 text-[20px] text-ink">{list}</dd>
        </div>
        {founding && (
          <div>
            <dt className="t-small text-muted">Founding-client rate</dt>
            <dd className="t-data mt-1 text-[20px] text-ink">{foundingPrice}</dd>
          </div>
        )}
      </dl>

      {data.foundingApplies && (
        <p className="mt-4 t-small text-muted">{extraDaysSentence}</p>
      )}

      {founding && showTerms && data.foundingApplies && (
        <p className="mt-4 t-small text-muted">{foundingClientStatement(foundingSlotsRemaining)}</p>
      )}

      <p className="mt-4 t-small text-ink">
        <span className="font-semibold">Payment: </span>
        {data.payment}.
      </p>

      {offer === "healthCheck" && <p className="mt-2 t-small text-muted">{taxLine}</p>}

      {feeCredit && (
        <p className="mt-4 border-t border-line pt-4 t-small text-ink">
          {feeCreditSentence}
          {offer === "healthCheck" && ` ${healthCheck.cancellation}`}
        </p>
      )}
    </div>
  );
}
