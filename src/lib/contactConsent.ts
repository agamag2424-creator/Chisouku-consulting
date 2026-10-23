// Consent recorded with a "Discuss your programme" enquiry (brief A5). The server checks the flag and stamps the time.

export type ContactEmailFields = {
  requestLabel: string;
  name: string;
  email: string;
  company: string;
  country: string;
  role: string;
  platform: string;
  decisionMonth: string;
  message: string;
};

/** True only when the client sent a boolean true. Missing, false and string values are not consent. */
export function hasContactConsent(consent: unknown): boolean {
  return consent === true;
}

/** UTC timestamp without milliseconds, for example 2026-10-24T10:15:00Z. */
export function consentTimestamp(at: Date): string {
  return at.toISOString().replace(/\.\d{3}Z$/, "Z");
}

export function consentLine(at: Date): string {
  return `Consent: yes, ${consentTimestamp(at)}`;
}

/** Plain-text body of the Resend notification, including the consent line. */
export function contactEmailText(fields: ContactEmailFields, at: Date): string {
  return [
    `Request: ${fields.requestLabel}`,
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Company: ${fields.company}`,
    `Country: ${fields.country}`,
    `Role: ${fields.role}`,
    `Platform: ${fields.platform}`,
    `Go-live decision date: ${fields.decisionMonth}`,
    ``,
    `Message:`,
    fields.message,
    ``,
    consentLine(at),
  ].join("\n");
}
