import {
  foundingActive,
  formatPrice,
  siteConfig,
  type OfferKey,
} from "../../lib/siteConfig";
import { cn } from "../../lib/utils";

type PriceBlockProps = {
  offer: OfferKey;
  /** Defaults to config; overridable so the zero-slots state can be shown and tested. */
  foundingSlotsRemaining?: number;
  /** Defaults to on for the Evidence Check and Decision Review (PRD 6.2). */
  showFeeCredit?: boolean;
  className?: string;
};

/** Price for one offer, read from config: list price, founding-client rate while places remain, fee credit. */
export function PriceBlock({
  offer,
  foundingSlotsRemaining = siteConfig.foundingSlotsRemaining,
  showFeeCredit,
  className,
}: PriceBlockProps) {
  const data = siteConfig.offers[offer];
  const founding = foundingActive(foundingSlotsRemaining);
  const oneOff = "listPrice" in data;
  const list = oneOff ? formatPrice(data.listPrice) : `From ${formatPrice(data.listPriceFromMonthly)} / month`;
  const foundingPrice = oneOff
    ? formatPrice(data.foundingPrice)
    : `From ${formatPrice(data.foundingPriceFromMonthly)} / month`;
  const feeCredit = showFeeCredit ?? oneOff;

  return (
    <div className={cn("rounded-sheet border border-line bg-paper p-6", className)}>
      <p className="t-h3 text-ink">{data.name}</p>
      {"days" in data && <p className="mt-1 t-small text-muted">{`${data.days} business days`}</p>}

      <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
        <div>
          <dt className="t-small text-muted">List price</dt>
          <dd className="t-data mt-1 text-[20px] text-ink">{list}</dd>
        </div>
        {founding && (
          <div>
            <dt className="t-small text-muted">Founding-client rate</dt>
            <dd className="t-data mt-1 text-[20px] text-ink">{foundingPrice}</dd>
          </div>
        )}
      </dl>

      {founding && (
        <p className="mt-4 t-small text-muted">
          Founding-client rate: the first three clients pay 50% of list price in exchange for a named or
          anonymised case study. {`Founding-client places remaining: ${foundingSlotsRemaining}.`}
        </p>
      )}

      {feeCredit && (
        <p className="mt-4 border-t border-line pt-4 t-small text-ink">
          {`The full Evidence Check fee is credited against a Go-Live Decision Review signed within ${siteConfig.feeCreditDays} days of the Evidence Check report.`}
        </p>
      )}
    </div>
  );
}
