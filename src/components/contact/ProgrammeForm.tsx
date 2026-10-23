"use client";

import * as React from "react";
import Link from "next/link";
import { requestTypes, type RequestKey } from "../../content/contactForm";
import { siteConfig } from "../../lib/siteConfig";
import { track } from "../../lib/track";
import { cn } from "../../lib/utils";

// "Discuss your programme" form (PRD 11, E9.1). Labels and options are PRD 11 wording; messages per BACKLOG E9.1.

const countries = ["UAE", "Saudi Arabia", "Other GCC", "Other"] as const;
const roles = ["CIO/CTO", "Transformation Director", "Programme Sponsor", "Programme/PMO Director", "Other"] as const;
const platforms = [...siteConfig.platforms, "Other"] as const;

type Fields = {
  name: string;
  email: string;
  company: string;
  country: string;
  role: string;
  request_type: RequestKey;
  platform: string;
  decision_month: string;
  message: string;
  /** Required, and unticked until the visitor agrees. */
  consent: boolean;
  /** Honeypot: hidden from people, filled only by bots. */
  website: string;
};

type FieldKey = Exclude<keyof Fields, "website" | "consent">;
type ErrorKey = FieldKey | "consent";

const required: Partial<Record<FieldKey, string>> = {
  name: "Enter your name.",
  email: "Enter a work email so we can reply.",
  company: "Enter your company name.",
  country: "Choose a country.",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: Fields): Partial<Record<ErrorKey, string>> {
  const errors: Partial<Record<ErrorKey, string>> = {};
  for (const [key, message] of Object.entries(required) as [FieldKey, string][]) {
    if (!String(fields[key]).trim()) errors[key] = message;
  }
  if (!errors.email && !EMAIL.test(fields.email.trim())) errors.email = "Enter a work email so we can reply.";
  if (!fields.consent) errors.consent = "Tick the box to agree before sending.";
  return errors;
}

const fieldOrder: ErrorKey[] = ["name", "email", "company", "country", "consent"];

export function ProgrammeForm({ initialRequest = "review" }: { initialRequest?: RequestKey }) {
  const [fields, setFields] = React.useState<Fields>({
    name: "",
    email: "",
    company: "",
    country: "",
    role: "",
    request_type: initialRequest,
    platform: "",
    decision_month: "",
    message: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = React.useState<Partial<Record<ErrorKey, string>>>({});
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "failed">("idle");
  const formRef = React.useRef<HTMLFormElement>(null);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (key in errors) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const first = fieldOrder.find((key) => found[key]);
    if (first) {
      track("form_error", { reason: "validation", request_type: fields.request_type });
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/audit-fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!response.ok) throw new Error(String(response.status));
      track("form_submit", { request_type: fields.request_type });
      setStatus("sent");
    } catch {
      track("form_error", { reason: "delivery", request_type: fields.request_type });
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-sheet border border-line bg-paper p-6 min-[641px]:p-8">
        <p className="t-h3 text-ink">Thanks. We&apos;ll reply within one business day.</p>
        {fields.request_type === "brief" && (
          <p className="t-body mt-3 text-ink">Your readiness brief arrives within two business days.</p>
        )}
      </div>
    );
  }

  const fieldProps = (key: FieldKey) => ({
    id: `pf-${key}`,
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `pf-${key}-error` : undefined,
  });

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-sheet border border-line bg-paper p-6 min-[641px]:p-8"
    >
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-[15px] font-semibold text-ink">
          Request type <Req />
        </legend>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(requestTypes) as RequestKey[]).map((key) => (
            <label
              key={key}
              className="cursor-pointer rounded-control border border-line px-4 py-2.5 text-[15px] text-ink has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-paper has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal"
            >
              <input
                type="radio"
                name="request_type"
                value={key}
                checked={fields.request_type === key}
                onChange={() => set("request_type", key)}
                className="sr-only"
              />
              {requestTypes[key].label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 min-[641px]:grid-cols-2">
        <Field label="Name" required error={errors.name} htmlFor="pf-name">
          <input {...fieldProps("name")} autoComplete="name" value={fields.name} onChange={(e) => set("name", e.target.value)} className={inputClass(errors.name)} />
        </Field>
        <Field label="Work email" required error={errors.email} htmlFor="pf-email">
          <input {...fieldProps("email")} type="email" autoComplete="email" value={fields.email} onChange={(e) => set("email", e.target.value)} className={inputClass(errors.email)} />
        </Field>
        <Field label="Company" required error={errors.company} htmlFor="pf-company">
          <input {...fieldProps("company")} autoComplete="organization" value={fields.company} onChange={(e) => set("company", e.target.value)} className={inputClass(errors.company)} />
        </Field>
        <Field label="Country" required error={errors.country} htmlFor="pf-country">
          <select {...fieldProps("country")} value={fields.country} onChange={(e) => set("country", e.target.value)} className={inputClass(errors.country)}>
            <option value="">Choose…</option>
            {countries.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
        <Field label="Role" htmlFor="pf-role">
          <select {...fieldProps("role")} value={fields.role} onChange={(e) => set("role", e.target.value)} className={inputClass()}>
            <option value="">Choose…</option>
            {roles.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
        <Field label="Platform" htmlFor="pf-platform">
          <select {...fieldProps("platform")} value={fields.platform} onChange={(e) => set("platform", e.target.value)} className={inputClass()}>
            <option value="">Choose…</option>
            {platforms.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
        <Field label="Go-live decision date" htmlFor="pf-decision_month">
          <input {...fieldProps("decision_month")} type="month" value={fields.decision_month} onChange={(e) => set("decision_month", e.target.value)} className={inputClass()} />
        </Field>
      </div>

      <Field label="Message" htmlFor="pf-message">
        <textarea {...fieldProps("message")} rows={5} value={fields.message} onChange={(e) => set("message", e.target.value)} className={inputClass()} />
      </Field>

      {/* Honeypot: off-screen and skipped by keyboard and screen readers; people never fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={(e) => set("website", e.target.value)} />
        </label>
      </div>

      {status === "failed" && (
        <p role="alert" className="t-small rounded-sheet bg-ev-miss-tint px-4 py-3 text-ink">
          We could not send your message. Please email us at{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-semibold underline underline-offset-4">
            {siteConfig.email}
          </a>
          .
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-3">
          <input
            id="pf-consent"
            name="consent"
            type="checkbox"
            checked={fields.consent}
            onChange={(event) => set("consent", event.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "pf-consent-error" : undefined}
            className="mt-1 size-4 shrink-0 accent-ink"
          />
          <label htmlFor="pf-consent" className="text-[15px] leading-snug text-ink">
            I agree that ChisokuLabs may use the details in this form to reply to my request, as described in the{" "}
            <Link href="/privacy" className="font-semibold text-teal underline underline-offset-4">
              Privacy notice
            </Link>
            .
          </label>
        </div>
        {errors.consent && (
          <p id="pf-consent-error" className="text-[14px] font-semibold text-ev-miss">
            {errors.consent}
          </p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 items-center justify-center rounded-control bg-ink px-6 text-[16px] font-semibold text-paper transition-colors hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : requestTypes[fields.request_type].submit}
        </button>
        <p className="mt-3 text-[14px] leading-snug text-muted">
          See the{" "}
          <Link href="/privacy" className="font-semibold text-teal underline underline-offset-4">
            Privacy notice
          </Link>{" "}
          for what we store, why, and how to ask us to delete it.
        </p>
      </div>
    </form>
  );
}

function Req() {
  return (
    <span className="text-ev-miss" aria-hidden>
      *
    </span>
  );
}

function Field({
  label,
  required: isRequired,
  error,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[15px] font-semibold text-ink">
        {label} {isRequired && <Req />}
        {isRequired && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-[14px] font-semibold text-ev-miss">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (error?: string) =>
  cn(
    "min-h-12 w-full rounded-control border bg-paper px-3.5 py-2.5 text-[16px] text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal",
    error ? "border-ev-miss" : "border-line",
  );
