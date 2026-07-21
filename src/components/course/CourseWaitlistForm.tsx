'use client';

import * as React from "react";
type FormData = {
  fullName: string;
  workEmail: string;
  phone: string;
  company: string;
  role: string;
  country: string;
  experienceYears: string;
  whyJoining: string;
  consent: boolean;
  optInFutureModules: boolean;
  optInFreeTemplates: boolean;
  website: string; // honeypot
};

const INITIAL_FORM: FormData = {
  fullName: "",
  workEmail: "",
  phone: "",
  company: "",
  role: "",
  country: "",
  experienceYears: "",
  whyJoining: "",
  consent: false,
  optInFutureModules: false,
  optInFreeTemplates: false,
  website: "",
};

export function CourseWaitlistForm() {
  const [formData, setFormData] = React.useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");

  const onChange =
    (field: keyof FormData) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const value =
        event.target.type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!formData.workEmail.trim()) {
      nextErrors.workEmail = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail.trim())) {
      nextErrors.workEmail = "Please enter a valid work email.";
    }
    if (!formData.phone.trim()) nextErrors.phone = "Phone is required.";
    if (!formData.company.trim()) nextErrors.company = "Company is required.";
    if (!formData.role.trim()) nextErrors.role = "Role/title is required.";
    if (!formData.country.trim()) nextErrors.country = "Country is required.";
    if (!formData.experienceYears.trim()) {
      nextErrors.experienceYears = "Years of experience is required.";
    }
    if (!formData.whyJoining.trim()) {
      nextErrors.whyJoining = "Please share why you want to join.";
    }
    if (!formData.consent) {
      nextErrors.consent = "Consent is required to join the waitlist.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/course-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        success?: boolean;
      };
      if (!response.ok || data.success !== true) {
        throw new Error(data.error ?? "Submission failed.");
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-[14px] border border-[var(--color-green-dim)] bg-[rgba(0,255,136,0.06)] p-6">
        <p className="text-[15px] font-semibold text-[var(--color-green)]">
          You are on the waitlist.
        </p>
        <p className="mt-2 text-body">
          Thank you for your Module 01 nomination. You are on the priority list
          for launch access. If you opted in, you will also receive no-cost
          updates for future modules and free resources.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Full name"
          error={errors.fullName}
          input={
            <input
              type="text"
              value={formData.fullName}
              onChange={onChange("fullName")}
              className={inputClass}
              autoComplete="name"
            />
          }
        />
        <Field
          label="Work email"
          error={errors.workEmail}
          input={
            <input
              type="email"
              value={formData.workEmail}
              onChange={onChange("workEmail")}
              className={inputClass}
              autoComplete="email"
            />
          }
        />
        <Field
          label="Phone"
          error={errors.phone}
          input={
            <input
              type="tel"
              value={formData.phone}
              onChange={onChange("phone")}
              className={inputClass}
              autoComplete="tel"
            />
          }
        />
        <Field
          label="Company"
          error={errors.company}
          input={
            <input
              type="text"
              value={formData.company}
              onChange={onChange("company")}
              className={inputClass}
              autoComplete="organization"
            />
          }
        />
        <Field
          label="Role / title"
          error={errors.role}
          input={
            <input
              type="text"
              value={formData.role}
              onChange={onChange("role")}
              className={inputClass}
              autoComplete="organization-title"
            />
          }
        />
        <Field
          label="Country"
          error={errors.country}
          input={
            <input
              type="text"
              value={formData.country}
              onChange={onChange("country")}
              className={inputClass}
              autoComplete="country-name"
            />
          }
        />
        <Field
          label="Years of experience"
          error={errors.experienceYears}
          input={
            <input
              type="text"
              value={formData.experienceYears}
              onChange={onChange("experienceYears")}
              className={inputClass}
              placeholder="e.g. 8"
            />
          }
        />
      </div>

      <Field
        label="Why are you joining this course?"
        error={errors.whyJoining}
        input={
          <textarea
            value={formData.whyJoining}
            onChange={onChange("whyJoining")}
            rows={4}
            className={inputClass}
          />
        }
      />

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          value={formData.website}
          onChange={onChange("website")}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label className="flex items-start gap-3 text-[12px] text-[var(--color-text-secondary)]">
        <input
          type="checkbox"
          checked={formData.consent}
          onChange={onChange("consent")}
          className="mt-[2px] h-4 w-4"
        />
        <span>
          I want to join the Module 01 waitlist and consent to ChisokuLab
          storing my details to process my nomination.
        </span>
      </label>
      {errors.consent && <p className={errorClass}>{errors.consent}</p>}

      <label className="flex items-start gap-3 text-[12px] text-[var(--color-text-secondary)]">
        <input
          type="checkbox"
          checked={formData.optInFutureModules}
          onChange={onChange("optInFutureModules")}
          className="mt-[2px] h-4 w-4"
        />
        <span>
          Notify me about upcoming modules (02-07) at no extra cost.
        </span>
      </label>

      <label className="flex items-start gap-3 text-[12px] text-[var(--color-text-secondary)]">
        <input
          type="checkbox"
          checked={formData.optInFreeTemplates}
          onChange={onChange("optInFreeTemplates")}
          className="mt-[2px] h-4 w-4"
        />
        <span>Send me free tools/templates related to future modules.</span>
      </label>

      {submitError && (
        <p className="text-[12px] text-[var(--color-red)]">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex rounded-[9999px] bg-[var(--color-cyan)] px-[34px] py-[15px] text-[12px] font-bold uppercase tracking-[0.13em] text-[var(--color-void)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_0_28px_var(--color-cyan-glow)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "SUBMITTING..." : "JOIN THE WAITLIST"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  input,
}: {
  label: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
        {label}
      </label>
      {input}
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-[10px] border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-[13px] text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-cyan)]";

const errorClass = "mt-1 text-[11px] text-[var(--color-red)]";

