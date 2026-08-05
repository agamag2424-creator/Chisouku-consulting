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
  company_size: string;
  challenge: string;
  tools: string;
  urgency: string;
  interest: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  country: "",
  role: "COO",
  company_size: "25-100",
  challenge: "",
  tools: "",
  urgency: "This quarter",
  interest: "Audit",
};

export function AuditFitForm() {
  const [form, setForm] = React.useState<FormState>(initialState);
  const [status, setStatus] = React.useState<"idle" | "submitting" | "error">("idle");
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

      const calendly = new URL(siteConfig.calendlyUrl);
      calendly.searchParams.set("name", form.name);
      calendly.searchParams.set("email", form.email);
      window.location.assign(calendly.toString());
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 border border-[rgba(17,24,32,0.14)] bg-[rgba(251,250,247,0.92)] p-6 md:p-8"
    >
      <div className="mb-1 border-b border-[rgba(17,24,32,0.1)] pb-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
          Qualification
        </p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Enough context to decide fit — then continue to Calendly.
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
          label="Company size"
          name="company_size"
          value={form.company_size}
          onChange={(v) => update("company_size", v)}
          options={["25-100", "101-250", "251-500", "501-1,000", "1,000+"]}
        />
      </div>

      <TextArea
        label="Current PMO/reporting challenge"
        name="challenge"
        value={form.challenge}
        onChange={(v) => update("challenge", v)}
        placeholder="What is slowing reporting, escalation, governance, or delivery visibility?"
      />

      <TextArea
        label="Current tools"
        name="tools"
        value={form.tools}
        onChange={(v) => update("tools", v)}
        placeholder="Jira, MS Project, Excel, Power BI, Smartsheet, Monday, ERP, custom tools..."
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Select
          label="Urgency"
          name="urgency"
          value={form.urgency}
          onChange={(v) => update("urgency", v)}
          options={["This month", "This quarter", "Exploring options", "Not urgent"]}
        />
        <Select
          label="Interest"
          name="interest"
          value={form.interest}
          onChange={(v) => update("interest", v)}
          options={["Diagnostic", "Audit", "Implementation", "Not sure"]}
        />
      </div>

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
          {status === "submitting" ? "Submitting…" : "Submit & Book Fit Call"}
        </button>
        <Link href="/pmo-automation-audit" className="button button-secondary">
          Review Audit First
        </Link>
      </div>
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
        After submit you continue to Calendly to pick a time.
      </p>
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
        rows={4}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
