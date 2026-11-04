import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutForm } from "../../../components/products/CheckoutForm";
import { PackBody, PackHero } from "../../../components/products/PackSections";
import { ProductFooterLine, TestModeBanner } from "../../../components/products/ProductParts";
import { Sheet } from "../../../components/ui/Sheet";
import { pack } from "../../../content/products";
import { isUuid, upgradeEligibility, type UpgradeCheck } from "../../../lib/payments/orders";
import { orderById } from "../../../lib/payments/store";
import { getDb } from "../../../lib/server/db";
import { routeRenders } from "../../../lib/siteConfig";

// Unlisted Pack upgrade (brief section 5): linked only from the report delivery email, never indexed or listed.
// The server checks the report order before offering USD 100; otherwise it shows the full-price Pack and the rule.

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Go-Live Readiness Pack upgrade | ChisokuLabs" },
  robots: { index: false, follow: false },
};

// Draft wording for owner approval (listed in the PR). The rule sentence is verbatim from brief 3b.
const eligibleText =
  "Your report credit applies. The USD 149 you paid for the Go-Live Readiness Report is credited towards the Pack, so you pay USD 100.";
const ruleText = "The credit lasts 60 days from the date your report is delivered. After that, the Pack is at the full price of USD 249.";
const ineligibleText: Record<Exclude<UpgradeCheck, { eligible: true }>["reason"], string> = {
  expired: "This link is more than 60 days after your report was delivered, so the report credit no longer applies.",
  refunded: "The report linked to this page was refunded, so the report credit does not apply.",
  not_delivered: "We could not match this link to a delivered Go-Live Readiness Report, so the report credit does not apply.",
  not_report: "We could not match this link to a delivered Go-Live Readiness Report, so the report credit does not apply.",
  not_found: "We could not match this link to a delivered Go-Live Readiness Report, so the report credit does not apply.",
};

export default async function PackUpgradePage({ searchParams }: { searchParams: Promise<{ ref?: string | string[] }> }) {
  if (!routeRenders("/readiness-pack")) notFound();
  const { ref } = await searchParams;
  const db = getDb();
  const reportOrder = db && isUuid(ref) ? await orderById(db, ref) : null;
  const check = upgradeEligibility(reportOrder, new Date());

  const priceCard = check.eligible ? (
    <Sheet className="flex flex-col gap-5 p-6 text-ink shadow-2xl min-[641px]:p-8">
      <p className="t-data text-[40px] leading-none tracking-[-0.03em]">USD 100</p>
      <p className="t-small text-ink">{eligibleText}</p>
      <CheckoutForm product="upgrade" refId={ref as string} buttonLabel={pack.button} />
    </Sheet>
  ) : (
    <Sheet className="flex flex-col gap-5 p-6 text-ink shadow-2xl min-[641px]:p-8">
      <p className="t-small text-ink">{ineligibleText[check.reason]}</p>
      <p className="t-small text-muted">{ruleText}</p>
      <p className="t-data text-[40px] leading-none tracking-[-0.03em]">{pack.price}</p>
      <CheckoutForm product="pack" buttonLabel={pack.button} />
    </Sheet>
  );

  return (
    <>
      <TestModeBanner />
      <PackHero priceCard={priceCard} />
      <PackBody />
      <ProductFooterLine />
    </>
  );
}
