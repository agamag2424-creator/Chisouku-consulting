import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DeliverReportForm } from "../../../components/products/DeliverReportForm";
import { Section } from "../../../components/ui/Section";
import { isUuid } from "../../../lib/payments/orders";
import { isAdminKey } from "../../../lib/server/routes/orders";

// Private report delivery page, opened from the link in the ops alert email. Without the admin key in the link it is
// an ordinary 404, so nothing internal shows on the site (backlog rule 14). Never indexed, never linked.

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Deliver a report | ChisokuLabs" },
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function DeliverReportPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string | string[]; order?: string | string[] }>;
}) {
  const { key, order } = await searchParams;
  if (!isAdminKey(key, process.env.ADMIN_API_TOKEN)) notFound();
  return (
    <Section tone="page">
      <div className="flex max-w-[640px] flex-col gap-6">
        <h1 className="t-h2 text-ink">Deliver a Go-Live Readiness Report</h1>
        <DeliverReportForm adminKey={key as string} initialOrder={isUuid(order) ? order : ""} />
      </div>
    </Section>
  );
}
