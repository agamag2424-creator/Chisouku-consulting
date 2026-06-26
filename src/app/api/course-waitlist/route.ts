import { NextResponse } from "next/server";
import { forwardToWaitlistAppScript } from "@/app/api/_lib/apps-script";

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

    const forwardPayload = {
      ...body,
      submittedAt: new Date().toISOString(),
      sourcePage: "/ai-governance-course",
      userAgent: request.headers.get("user-agent") ?? "",
    };

    const forwardResult = await forwardToWaitlistAppScript(forwardPayload);
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

