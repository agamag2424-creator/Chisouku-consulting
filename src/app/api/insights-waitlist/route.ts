import { NextResponse } from "next/server";
import {
  getAppsScriptFailureMessage,
  readAppsScriptResult,
} from "../_lib/apps-script";

type InsightsWaitlistPayload = {
  email?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InsightsWaitlistPayload;
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
      optInFreeTemplates: true,
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
      return NextResponse.json(
        {
          error: `Failed to save subscription. Apps Script returned an unexpected response. (status: ${forwardResponse.status})`,
        },
        { status: 502 },
      );
    }

    const appsScriptResult = await readAppsScriptResult(forwardResponse);
    if (!appsScriptResult.ok) {
      return NextResponse.json(
        {
          error: `Failed to save subscription. ${getAppsScriptFailureMessage(appsScriptResult)}`,
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
