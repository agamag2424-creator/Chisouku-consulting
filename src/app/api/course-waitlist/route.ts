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

type AppsScriptResponse = {
  success?: unknown;
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
  let body: WaitlistPayload;

  try {
    body = (await request.json()) as WaitlistPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }

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

  if (body.consent !== true) {
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

  let forwardResponse: Response;
  try {
    forwardResponse = await fetch(appScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(forwardPayload),
      cache: "no-store",
      redirect: "follow",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to save nomination. Apps Script could not be reached." },
      { status: 502 },
    );
  }

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

  let forwardData: AppsScriptResponse;
  try {
    forwardData = (await forwardResponse.json()) as AppsScriptResponse;
  } catch {
    return NextResponse.json(
      { error: "Failed to save nomination. Apps Script returned invalid JSON." },
      { status: 502 },
    );
  }

  if (forwardData.success !== true) {
    const upstreamError =
      typeof forwardData.error === "string"
        ? ` ${forwardData.error}`
        : "";
    return NextResponse.json(
      {
        error: `Failed to save nomination. Apps Script did not confirm the sheet write.${upstreamError}`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
