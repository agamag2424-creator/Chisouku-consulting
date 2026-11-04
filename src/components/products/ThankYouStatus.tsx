"use client";

import * as React from "react";
import { report } from "../../content/products";
import { siteConfig } from "../../lib/siteConfig";
import { Button } from "../ui/Button";

// Thank-you states (brief section 5). Reads the order status the webhook sets; it never records a purchase itself.
// Wording: report and pack lines verbatim from the brief; the rest is draft for owner approval.

type Status = { status: string; kind: "report" | "pack"; downloadPath: string | null };

const POLL_MS = 3000;
const MAX_POLLS = 40;

export function ThankYouStatus({ orderId }: { orderId: string }) {
  const [order, setOrder] = React.useState<Status | null>(null);
  const [missing, setMissing] = React.useState(false);
  const [polls, setPolls] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch(`/api/orders/${encodeURIComponent(orderId)}`, { cache: "no-store" });
        if (cancelled) return;
        if (response.status === 404) setMissing(true);
        else if (response.ok) setOrder(await response.json());
      } catch {
        // Keep the "confirming" state and try again.
      }
      if (!cancelled) setPolls((count) => count + 1);
    }
    const settled = order && order.status !== "created" && (order.kind === "report" || order.downloadPath || order.status === "refunded");
    if (settled || missing || polls >= MAX_POLLS) return;
    const timer = window.setTimeout(load, polls === 0 ? 0 : POLL_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [orderId, order, missing, polls]);

  const contact = (
    <p className="t-small text-muted">
      Questions:{" "}
      <a href={`mailto:${siteConfig.email}`} className="font-semibold text-teal underline underline-offset-4">
        {siteConfig.email}
      </a>
      . Please include your order number: <span className="t-data">{orderId}</span>
    </p>
  );

  if (!order || order.status === "created" || missing) {
    return (
      <div role="status" className="flex flex-col gap-4">
        <h1 className="t-h2 text-ink">We&apos;re confirming your payment</h1>
        <p className="t-body text-ink">
          {missing || polls >= MAX_POLLS
            ? "This is taking longer than usual. You will receive an email as soon as your payment is confirmed."
            : "This page updates by itself. It usually takes a few seconds."}
        </p>
        {contact}
      </div>
    );
  }

  if (order.status === "refunded") {
    return (
      <div role="status" className="flex flex-col gap-4">
        <h1 className="t-h2 text-ink">This order has been refunded</h1>
        {contact}
      </div>
    );
  }

  if (order.kind === "report") {
    return (
      <div role="status" className="flex flex-col gap-5">
        <h1 className="t-h2 text-ink">Thank you. Your Go-Live Readiness Report will arrive by email within 48 hours of payment.</h1>
        <p className="t-body text-ink">The link to the questionnaire will follow by email.</p>
        <div className="flex flex-col gap-3 rounded-sheet border border-line p-5">
          <p className="t-body text-ink">{report.credit}</p>
          <div>
            <Button href="/readiness-pack" variant="text">
              Go-Live Readiness Pack
            </Button>
          </div>
        </div>
        {contact}
      </div>
    );
  }

  return (
    <div role="status" className="flex flex-col gap-5">
      <h1 className="t-h2 text-ink">Thank you for buying the Go-Live Readiness Pack.</h1>
      {order.downloadPath ? (
        <div>
          <a
            href={order.downloadPath}
            data-cta="pack-download"
            className="inline-flex min-h-12 items-center justify-center rounded-control border border-ink bg-ink px-6 text-[17px] font-semibold text-paper hover:border-teal hover:bg-teal"
          >
            Download the Pack
          </a>
          <p className="t-small mt-3 text-muted">The link stays active for 30 days. We have also emailed it to you.</p>
        </div>
      ) : (
        <p className="t-body text-ink">Your download link will arrive by email within 48 hours of payment.</p>
      )}
      {contact}
    </div>
  );
}
