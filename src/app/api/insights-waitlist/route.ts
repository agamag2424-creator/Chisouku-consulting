import { NextResponse } from "next/server";
import { verifyAppsScriptResponse } from "@/app/api/_lib/apps-script";

type InsightsWaitlistPayload = {
  email?: string;
  website?: string;
};

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

    const appScriptUrl =
      process.env.GOOGLE_APPS_SCRIPT_INSIGHTS_WAITLIST_URL ??
      process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;
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
      workEmail: email,
      userAgent: request.headers.get("user-agent") ?? "",
    };

    const forwardResponse = await fetch(appScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(forwardPayload),
      cache: "no-store",
      redirect: "follow",
    });

    const verification = await verifyAppsScriptResponse(forwardResponse);
    if (!verification.ok) {
      return NextResponse.json(
        {
          error: `Failed to save email. ${verification.error}`,
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
