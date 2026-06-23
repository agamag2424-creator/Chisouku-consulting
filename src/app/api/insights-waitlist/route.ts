import { NextResponse } from "next/server";
import {
  submitToAppsScript,
  validateAppsScriptUrl,
} from "@/app/api/_lib/apps-script";

type InsightsWaitlistPayload = {
  email?: string;
  website?: string;
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

  // Basic spam trap
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

  const appScriptUrl = process.env.GOOGLE_APPS_SCRIPT_INSIGHTS_URL;
  const endpointError = validateAppsScriptUrl(appScriptUrl, "Insights waitlist");
  if (endpointError || !appScriptUrl) {
    return NextResponse.json(
      { error: endpointError ?? "Insights waitlist endpoint is not configured." },
      { status: 500 },
    );
  }

  const submission = await submitToAppsScript(appScriptUrl, {
    email,
    submittedAt: new Date().toISOString(),
    sourcePage: "/insights",
    userAgent: request.headers.get("user-agent") ?? "",
  });

  if (!submission.success) {
    return NextResponse.json(
      { error: submission.error },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
