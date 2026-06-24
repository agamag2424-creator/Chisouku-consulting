export type AppsScriptResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: string;
    };

type AppsScriptResponse = {
  success?: unknown;
  error?: unknown;
};

export function parseAppsScriptResult(responseText: string): AppsScriptResult {
  let parsed: AppsScriptResponse;

  try {
    const value = JSON.parse(responseText) as unknown;
    if (!isRecord(value)) {
      return {
        ok: false,
        error: "Apps Script did not return a valid success confirmation.",
      };
    }
    parsed = value;
  } catch {
    return {
      ok: false,
      error: "Apps Script did not return a valid JSON success confirmation.",
    };
  }

  if (parsed.success !== true) {
    const upstreamError =
      typeof parsed.error === "string" && parsed.error.trim() !== ""
        ? ` Apps Script error: ${parsed.error.trim()}`
        : "";

    return {
      ok: false,
      error: `Apps Script did not confirm the submission was saved.${upstreamError}`,
    };
  }

  return { ok: true };
}

function isRecord(value: unknown): value is AppsScriptResponse {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
