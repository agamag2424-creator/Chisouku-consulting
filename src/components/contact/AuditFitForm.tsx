"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "../../lib/siteConfig";

const inputClass = "form-field";

type FormState = {
  name: string;
  email: string;
  company: string;
  country: string;
  role: string;
  challenge: string;
  interest: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  country: "",
  role: "COO",
  challenge: "",
  interest: "Audit",
};

const interestOptions = [
  "Diagnostic",
  "Audit",
  "AI Implementation",
  "Not sure",
] as const;

type Props = {
  defaultInterest?: string;
};

export function AuditFitForm({ defaultInterest }: Props) {
  const resolvedInterest =
    defaultInterest &&
    (interestOptions as readonly string[]).includes(defaultInterest)
      ? defaultInterest
      : initialState.interest;

  const [form, setForm] = React.useState<FormState>({
    ...initialState,
    interest: resolvedInterest,
  });
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "error" | "success"
  >("idle");
  const [error, setError] = React.useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/audit-fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Unable to submit. Please email us directly.");
      }

      try {
        const calendly = new URL(siteConfig.calendlyUrl);
        calendly.searchParams.set("name", form.name);
        calendly.searchParams.set("email", form.email);
        window.location.assign(calendly.toString());
        // If navigation is blocked, surface fallback shortly.
        window.setTimeout(() => setStatus("success"), 1200);
      } catch {
        setStatus("success");
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-[rgba(17,24,32,0.14)] bg-[rgba(251,250,247,0.92)] p-6 md:p-8">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
          Received
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.02em]">
          We have your context.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
          If Calendly did not open, email{" "}
          <a
            className="font-bold text-[var(--color-cyan-strong)]"
            href={`mailto:${siteConfig.email}`}
          >
            {siteConfig.email}
          </a>{" "}
          or open the scheduler directly.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-primary"
          >
            Open Calendly
          </a>
          <Link href="/pmo-automation-audit" className="button button-secondary">
            Review the audit
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 border border-[rgba(17,24,32,0.14)] bg-[rgba(251,250,247,0.92)] p-6 md:p-8"
    >
      <div className="mb-1 border-b border-[rgba(17,24,32,0.1)] pb-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
          Fit call
        </p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          AI automation in delivery systems — starting at PMO reporting. Brief
          context, then schedule.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Name"
          name="name"
          required
          value={form.name}
          onChange={(v) => update("name", v)}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={(v) => update("email", v)}
        />
        <Field
          label="Company"
          name="company"
          required
          value={form.company}
          onChange={(v) => update("company", v)}
        />
        <Field
          label="Country"
          name="country"
          required
          value={form.country}
          onChange={(v) => update("country", v)}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Select
          label="Role"
          name="role"
          value={form.role}
          onChange={(v) => update("role", v)}
          options={[
            "COO",
            "VP Operations",
            "Head of PMO",
            "Director of Project Delivery",
            "Founder / CEO",
            "Other",
          ]}
        />
        <Select
          label="Interest"
          name="interest"
          value={form.interest}
          onChange={(v) => update("interest", v)}
          options={[...interestOptions]}
        />
      </div>

      <TextArea
        label="Current challenge"
        name="challenge"
        value={form.challenge}
        onChange={(v) => update("challenge", v)}
        placeholder="Reporting lag, escalation delays, PMO visibility…"
      />

      {error ? (
        <p className="text-sm font-semibold text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-[var(--color-line)] pt-5 sm:flex-row">
        <button
          type="submit"
          className="button button-primary"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting…" : "Continue to schedule"}
        </button>
        <Link href="/pmo-automation-audit" className="button button-secondary">
          Review audit first
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="form-label">{label}</span>
      <input
        className={inputClass}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="form-label">{label}</span>
      <select
        className={inputClass}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({
  label,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="form-label">{label}</span>
      <textarea
        className={inputClass}
        name={name}
        rows={3}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
