import { NextResponse } from "next/server";
import {
  saveToAppsScript,
  validateAppsScriptUrl,
} from "@/app/api/_lib/apps-script";

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
    const urlError = validateAppsScriptUrl(appScriptUrl);
    if (urlError || !appScriptUrl) {
      return NextResponse.json(
        { error: urlError ?? "Waitlist endpoint is not configured." },
        { status: 500 },
      );
    }

    const saveResult = await saveToAppsScript(appScriptUrl, {
      submittedAt: new Date().toISOString(),
      sourcePage: "/insights",
      fullName: "",
      workEmail: email,
      phone: "",
      company: "",
      role: "",
      country: "",
      experienceYears: "",
      whyJoining: "Insights notification signup",
      consent: true,
      optInFutureModules: false,
      optInFreeTemplates: false,
      userAgent: request.headers.get("user-agent") ?? "",
    });

    if (!saveResult.success) {
      return NextResponse.json({ error: saveResult.error }, { status: 502 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }
}
