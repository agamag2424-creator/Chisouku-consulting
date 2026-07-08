import { NextResponse } from "next/server";

type InsightsWaitlistPayload = {
  email?: string;
};

type AppsScriptResult = {
  success?: unknown;
  error?: unknown;
};

export async function POST(request: Request) {
  let body: InsightsWaitlistPayload;

  try {
    body = (await request.json()) as InsightsWaitlistPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }

  const email = String(body.email ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email." },
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
    submittedAt: new Date().toISOString(),
    sourcePage: "/insights",
    fullName: "",
    workEmail: email,
    phone: "",
    company: "",
    role: "",
    country: "",
    experienceYears: "",
    whyJoining: "Insights launch notification",
    consent: true,
    optInFutureModules: false,
    optInFreeTemplates: false,
    userAgent: request.headers.get("user-agent") ?? "",
  };

  try {
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
          error: `Failed to save email. ${statusMessage} (status: ${status})`,
        },
        { status: 502 },
      );
    }

    const appsScriptResult = (await forwardResponse
      .json()
      .catch(() => null)) as AppsScriptResult | null;
    if (appsScriptResult?.success !== true) {
      const detail =
        typeof appsScriptResult?.error === "string"
          ? ` ${appsScriptResult.error}`
          : "";
      return NextResponse.json(
        {
          error: `Failed to save email. Apps Script did not confirm the row was saved.${detail}`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to save email. Apps Script request failed." },
      { status: 502 },
    );
  }
}
