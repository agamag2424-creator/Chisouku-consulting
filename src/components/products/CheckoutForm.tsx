"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "../../lib/siteConfig";
import { track } from "../../lib/track";
import { cn } from "../../lib/utils";

// Razorpay Standard Checkout (brief section 4). The checkout script loads only when a buyer starts checkout, so it
// cannot shift the layout or slow the page. The price comes from the server; this form never sends an amount.
// Interface wording here is draft for owner approval (listed in the PR).

type Product = "report" | "pack" | "upgrade";

type RazorpayResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayInstance = { open: () => void; on: (event: "payment.failed", handler: () => void) => void };
declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

const SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";
let scriptPromise: Promise<void> | null = null;

function loadCheckoutScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("checkout script failed"));
    };
    document.body.appendChild(script);
  });
  return scriptPromise;
}

/** UTM values and the free check's band from the page address, passed on to the order. */
function campaignFromUrl(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "band", "assessment_id"];
  return Object.fromEntries(keys.flatMap((key) => (params.get(key) ? [[key, params.get(key) as string]] : [])));
}

const messages = {
  invalidEmail: "Enter an email address so we can deliver your order.",
  unavailable: `Checkout is not available right now. Please try again later, or email ${siteConfig.email}.`,
  notEligible: "This link no longer qualifies for the report credit. The Pack is available at its full price below.",
  dismissed: "Payment not completed. You can try again.",
  failed: "The payment did not go through. No money was taken for this attempt. You can try again.",
} as const;

export function CheckoutForm({
  product,
  buttonLabel,
  refId,
  tone = "light",
}: {
  product: Product;
  buttonLabel: string;
  refId?: string;
  tone?: "light" | "ink";
}) {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const inputId = React.useId();
  const errorId = `${inputId}-error`;
  const onInk = tone === "ink";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const address = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      setError(messages.invalidEmail);
      return;
    }
    setError(null);
    setBusy(true);
    track("checkout_start", { product });
    try {
      const [response] = await Promise.all([
        fetch("/api/checkout/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product, email: address, ref: refId, ...campaignFromUrl() }),
        }),
        loadCheckoutScript(),
      ]);
      const order = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(order.error === "not_eligible" ? messages.notEligible : order.error === "invalid_email" ? messages.invalidEmail : messages.unavailable);
        setBusy(false);
        return;
      }
      if (!window.Razorpay) throw new Error("checkout unavailable");
      const teal = getComputedStyle(document.documentElement).getPropertyValue("--color-teal").trim();
      const checkout = new window.Razorpay({
        key: order.keyId,
        order_id: order.razorpayOrderId,
        amount: order.amount,
        currency: order.currency,
        name: "ChisokuLabs",
        description: order.productName,
        prefill: { email: order.email },
        theme: teal ? { color: teal } : undefined,
        handler: async (result: RazorpayResponse) => {
          try {
            await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(result),
            });
          } finally {
            // The thank-you page shows the confirmed status from the webhook either way.
            router.push(`/thank-you?order=${encodeURIComponent(order.orderId)}`);
          }
        },
        modal: {
          ondismiss: () => {
            setError(messages.dismissed);
            setBusy(false);
          },
        },
      });
      checkout.on("payment.failed", () => setError(messages.failed));
      checkout.open();
    } catch {
      setError(messages.unavailable);
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <label htmlFor={inputId} className={cn("text-[15px] font-semibold", onInk ? "text-paper" : "text-ink")}>
        Email for delivery
      </label>
      <div className="flex flex-col gap-3 min-[480px]:flex-row">
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={error === messages.invalidEmail || undefined}
          aria-describedby={error ? errorId : undefined}
          className="min-h-12 w-full rounded-control border border-line bg-paper px-3.5 text-[16px] text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal min-[480px]:max-w-[320px]"
        />
        <button
          type="submit"
          disabled={busy}
          data-cta={`checkout-${product}`}
          className={cn(
            "inline-flex min-h-12 shrink-0 items-center justify-center rounded-control px-6 text-[17px] font-semibold transition-colors disabled:opacity-60",
            onInk ? "border border-paper bg-paper text-ink hover:bg-teal-tint" : "border border-ink bg-ink text-paper hover:border-teal hover:bg-teal",
          )}
        >
          {busy ? "Opening checkout…" : buttonLabel}
        </button>
      </div>
      <p id={errorId} role="alert" className={cn("min-h-6 text-[14px] font-semibold", onInk ? "text-paper" : "text-ev-miss")}>
        {error ?? ""}
      </p>
    </form>
  );
}
