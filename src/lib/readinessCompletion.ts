import type { BandId } from "./readinessScore";

/**
 * Anonymous row for one completed /readiness check.
 * The database fills id and created_at. Nothing else is stored.
 */
export type ReadinessCompletionInsert = {
  score_band: BandId;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer_host: string | null;
};

const CAMPAIGN_MAX = 120;
const HOST_MAX = 253;
const REFERRER_MAX = 2048;

function isScoreBand(value: unknown): value is BandId {
  return value === "not_ready" || value === "partly_ready" || value === "ready";
}

/** Campaign text, or null when it is empty, too long, or could carry an email address. */
function campaignValue(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > CAMPAIGN_MAX) return null;
  if (containsEmail(trimmed)) return null;
  if (/[\u0000-\u001f\u007f]/.test(trimmed)) return null;
  return trimmed;
}

function containsEmail(value: string): boolean {
  if (value.includes("@")) return true;
  if (!/%[0-9a-fA-F]{2}/.test(value)) return false;
  try {
    return decodeURIComponent(value).includes("@");
  } catch {
    return true;
  }
}

/**
 * Hostname only. The path, query string and any user info are dropped, so an email
 * address in the referring URL is not stored. A bare email address is not a host.
 */
function referrerHost(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > REFERRER_MAX) return null;
  const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(trimmed);
  if (!hasScheme && containsEmail(trimmed)) return null;
  try {
    const url = new URL(hasScheme ? trimmed : `https://${trimmed}`);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (url.username || url.password) return null;
    const host = url.hostname.toLowerCase().replace(/\.$/, "");
    if (!host || host.length > HOST_MAX || host.includes("@")) return null;
    return host;
  } catch {
    return null;
  }
}

/**
 * The only object that may be inserted. Unknown fields (name, email, answers, IP) are ignored.
 * Returns null when the score band is missing or not one of the three bands.
 */
export function completionInsert(input: unknown): ReadinessCompletionInsert | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const body = input as Record<string, unknown>;
  if (!isScoreBand(body.score_band)) return null;
  return {
    score_band: body.score_band,
    utm_source: campaignValue(body.utm_source),
    utm_medium: campaignValue(body.utm_medium),
    utm_campaign: campaignValue(body.utm_campaign),
    referrer_host: referrerHost(body.referrer_host),
  };
}

/** Fire-and-forget. The result screen must not wait on this request. */
export function postReadinessCompletion(scoreBand: BandId): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const row = completionInsert({
      score_band: scoreBand,
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      referrer_host: document.referrer,
    });
    if (!row) return;
    void fetch("/api/readiness-complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
      keepalive: true,
    }).catch(() => {
      // Counting is optional. The score is already on screen.
    });
  } catch {
    // Counting must never break the check.
  }
}
