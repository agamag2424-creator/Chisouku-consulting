"use client";

import * as React from "react";

// Ops form behind the private delivery link: pick the report PDF, press Send. It emails the buyer the PDF with the
// Pack upgrade link and records the delivery date, which starts the 60-day Pack credit.

const MAX_BYTES = 3 * 1024 * 1024;

const errors: Record<string, string> = {
  unauthorised: "This link is not valid any more. Use the link in the latest order email.",
  bad_order: "Check the order number. It is in the order email.",
  missing_pdf: "Choose the report PDF first.",
  not_a_report_order: "That order number is not a report order.",
  status_delivered: "This report was already delivered.",
  status_refunded: "This order was refunded, so the report was not sent.",
  status_created: "This order has not been paid yet.",
  email_failed: "The email could not be sent. Nothing was recorded. Please try again in a minute.",
};

export function DeliverReportForm({ adminKey, initialOrder }: { adminKey: string; initialOrder: string }) {
  const [order, setOrder] = React.useState(initialOrder);
  const [file, setFile] = React.useState<File | null>(null);
  const [state, setState] = React.useState<{ kind: "idle" | "sending" | "done" | "error"; message?: string }>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return setState({ kind: "error", message: errors.missing_pdf });
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return setState({ kind: "error", message: "That file is not a PDF." });
    }
    if (file.size > MAX_BYTES) return setState({ kind: "error", message: "The PDF is larger than 3 MB. Please make it smaller and try again." });
    setState({ kind: "sending" });
    const bytes = new Uint8Array(await file.arrayBuffer());
    let binary = "";
    for (let index = 0; index < bytes.length; index += 0x8000) binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
    try {
      const response = await fetch("/api/admin/deliver-report", {
        method: "POST",
        headers: { Authorization: `Bearer ${adminKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.trim(), pdfBase64: btoa(binary), filename: file.name.replace(/[^\w.-]/g, "-") }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) return setState({ kind: "error", message: errors[result.error] ?? "Something went wrong. Please try again." });
      setState({ kind: "done", message: "Sent. The buyer has the report, and the 60-day Pack credit has started." });
    } catch {
      setState({ kind: "error", message: "Something went wrong. Please try again." });
    }
  }

  if (state.kind === "done") {
    return (
      <p role="status" className="t-body rounded-sheet bg-ev-ok-tint p-5 font-semibold text-ink">
        {state.message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-sheet border border-line bg-paper p-6">
      <label className="flex flex-col gap-1.5 text-[15px] font-semibold text-ink">
        Order number
        <input
          value={order}
          onChange={(event) => setOrder(event.target.value)}
          required
          className="t-data min-h-12 rounded-control border border-line bg-paper px-3.5 text-[15px] font-normal text-ink"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-[15px] font-semibold text-ink">
        Report PDF
        <input
          type="file"
          accept="application/pdf,.pdf"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="text-[15px] font-normal text-ink"
        />
      </label>
      <div>
        <button
          type="submit"
          disabled={state.kind === "sending"}
          className="inline-flex min-h-12 items-center justify-center rounded-control border border-ink bg-ink px-6 text-[17px] font-semibold text-paper hover:border-teal hover:bg-teal disabled:opacity-60"
        >
          {state.kind === "sending" ? "Sending…" : "Send the report to the buyer"}
        </button>
      </div>
      {state.kind === "error" && (
        <p role="alert" className="text-[15px] font-semibold text-ev-miss">
          {state.message}
        </p>
      )}
    </form>
  );
}
