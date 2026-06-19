import { NextResponse } from "next/server";

type WaitlistPayload = {
  fullName?: string;
  workEmail?: string;
  phone?: string;
  company?: string;
  role?: string;
  country?: string;
  experienceYears?: string;
  whyJoining?: string;
  consent?: boolean;
  optInFutureModules?: boolean;
  optInFreeTemplates?: boolean;
  website?: string;
};

type AppsScriptResult = {
  success?: boolean;
  error?: unknown;
};

const REQUIRED_FIELDS: Array<keyof WaitlistPayload> = [
  "fullName",
  "workEmail",
  "phone",
  "company",
  "role",
  "country",
  "experienceYears",
  "whyJoining",
];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WaitlistPayload;

    // Basic spam trap
    if (body.website && body.website.trim() !== "") {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    for (const field of REQUIRED_FIELDS) {
      if (!body[field] || String(body[field]).trim() === "") {
        return NextResponse.json(
          { error: `${field} is required.` },
          { status: 400 },
        );
      }
    }

    const email = String(body.workEmail ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid work email." },
        { status: 400 },
      );
    }

    if (!body.consent) {
      return NextResponse.json(
        { error: "Consent is required." },
        { status: 400 },
      );
    }

    const appScriptUrl = process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;
    if (!appScriptUrl) {
      return NextResponse.json(
        { error: "Waitlist endpoint is not configured." },
        { status: 500 },
      );
    }
    if (!appScriptUrl.includes("/exec")) {
      return NextResponse.json(
        {
          error:
            "Waitlist endpoint looks invalid. Use the Apps Script Web App URL ending with /exec.",
        },
        { status: 500 },
      );
    }

    const forwardPayload = {
      ...body,
      submittedAt: new Date().toISOString(),
      sourcePage: "/ai-governance-course",
      userAgent: request.headers.get("user-agent") ?? "",
    };

    const forwardResponse = await fetch(appScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(forwardPayload),
      cache: "no-store",
      redirect: "follow",
    });

    if (!forwardResponse.ok) {
      const status = forwardResponse.status;
      const statusMessage =
        status === 401 || status === 403
          ? "Apps Script rejected access. Ensure deployment access is set to 'Anyone'."
          : status === 404
            ? "Apps Script URL not found. Confirm you used the latest /exec deployment URL."
            : "Apps Script returned an unexpected response.";
      return NextResponse.json(
        {
          error: `Failed to save nomination. ${statusMessage} (status: ${status})`,
        },
        { status: 502 },
      );
    }

    const appsScriptResult = await readAppsScriptResult(forwardResponse);
    if (appsScriptResult?.success === false) {
      console.error(
        "Waitlist Apps Script reported failure:",
        typeof appsScriptResult.error === "string"
          ? appsScriptResult.error
          : "No error detail provided.",
      );
      return NextResponse.json(
        {
          error:
            "Failed to save nomination. Apps Script reported that the nomination was not saved.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }
}

async function readAppsScriptResult(
  response: Response,
): Promise<AppsScriptResult | null> {
  const text = await response.text().catch(() => "");
  if (!text.trim()) return null;

  try {
    const parsed = JSON.parse(text) as unknown;
    if (parsed && typeof parsed === "object") {
      return parsed as AppsScriptResult;
    }
  } catch {
    // Some existing deployments may return an empty/plain 2xx response.
  }

  return null;
}

