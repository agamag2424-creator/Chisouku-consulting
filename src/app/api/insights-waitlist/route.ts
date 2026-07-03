import { NextResponse } from "next/server";
import { readAppsScriptConfirmation } from "@/app/api/_lib/apps-script";

type InsightsWaitlistPayload = {
  email?: string;
  website?: string;
};

function getAppsScriptStatusMessage(status: number) {
  if (status === 401 || status === 403) {
    return "Apps Script rejected access. Ensure deployment access is set to 'Anyone'.";
  }

  if (status === 404) {
    return "Apps Script URL not found. Confirm you used the latest /exec deployment URL.";
  }

  return "Apps Script returned an unexpected response.";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InsightsWaitlistPayload;

    if (body.website && body.website.trim() !== "") {
      return NextResponse.json({ success: true }, { status: 200 });
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
      whyJoining: "Insights waitlist",
      consent: true,
      optInFutureModules: false,
      optInFreeTemplates: false,
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
      const statusMessage = getAppsScriptStatusMessage(status);
      return NextResponse.json(
        {
          error: `Failed to save subscription. ${statusMessage} (status: ${status})`,
        },
        { status: 502 },
      );
    }

    const confirmation = await readAppsScriptConfirmation(forwardResponse);
    if (!confirmation.success) {
      return NextResponse.json(
        {
          error: `Failed to save subscription. ${confirmation.error}`,
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
