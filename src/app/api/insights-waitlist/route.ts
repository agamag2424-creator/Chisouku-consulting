import { NextResponse } from "next/server";
import { forwardToWaitlistAppScript } from "@/app/api/_lib/apps-script";

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

    const forwardResult = await forwardToWaitlistAppScript({
      fullName: "",
      workEmail: email,
      submittedAt: new Date().toISOString(),
      sourcePage: "/insights",
      userAgent: request.headers.get("user-agent") ?? "",
    });

    if (!forwardResult.ok) {
      return NextResponse.json(
        { error: forwardResult.error },
        { status: forwardResult.status },
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
