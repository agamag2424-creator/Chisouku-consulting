// Request types for "Discuss your programme" (PRD 11, E9.1): labels from PRD 11, button wording from BACKLOG E9.1.
// Shared by the form, the contact page (for the ?request= preset) and the API (for the email subject).
export const requestTypes = {
  review: { label: "Discuss a review", submit: "Send" },
  brief: { label: "Free readiness brief", submit: "Request my readiness brief" },
  pricing: { label: "Pricing question", submit: "Ask about pricing" },
} as const;

export type RequestKey = keyof typeof requestTypes;

export const isRequestKey = (value: unknown): value is RequestKey =>
  typeof value === "string" && Object.hasOwn(requestTypes, value);
