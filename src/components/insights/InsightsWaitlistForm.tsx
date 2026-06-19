'use client';

import * as React from "react";

export function InsightsWaitlistForm() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!isValid) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/insights-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Signup failed.");
      }

      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-[10px] border border-[var(--color-border)] bg-[rgba(0,255,136,0.06)] px-4 py-3 text-left">
        <div className="mb-1 text-[13px] font-semibold text-[var(--color-green)]">
          ✓ Thanks! We&apos;ll notify you when insights go live.
        </div>
        <p className="text-[12px] text-[var(--color-text-secondary)]">
          You&apos;ll receive our first briefings on AI governance and applied
          AI solutions as soon as they launch.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-stretch gap-2 sm:flex-row"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full flex-1 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-card)] px-[18px] py-[14px] text-[14px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-cyan)] focus:shadow-[0_0_0_2px_var(--color-cyan-dim)] sm:rounded-r-none"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-[8px] bg-[var(--color-cyan)] px-[24px] py-[14px] text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-void)] transition-shadow hover:shadow-[0_0_20px_var(--color-cyan-glow)] sm:w-auto sm:rounded-l-none"
      >
        {isSubmitting ? "SENDING..." : "NOTIFY ME"}
      </button>
      {error && (
        <p className="w-full text-left text-[12px] text-[var(--color-red)] sm:col-span-2">
          {error}
        </p>
      )}
    </form>
  );
}

