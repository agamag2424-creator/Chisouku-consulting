import { NextResponse } from "next/server";
import {
  submitToAppsScript,
  validateAppsScriptUrl,
} from "@/app/api/_lib/apps-script";

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
  const endpointError = validateAppsScriptUrl(appScriptUrl, "Waitlist");
  if (endpointError || !appScriptUrl) {
    return NextResponse.json(
      { error: endpointError ?? "Waitlist endpoint is not configured." },
      { status: 500 },
    );
  }

  const forwardPayload = {
    fullName: body.fullName,
    workEmail: email,
    phone: body.phone,
    company: body.company,
    role: body.role,
    country: body.country,
    experienceYears: body.experienceYears,
    whyJoining: body.whyJoining,
    consent: true,
    optInFutureModules: body.optInFutureModules === true,
    optInFreeTemplates: body.optInFreeTemplates === true,
    submittedAt: new Date().toISOString(),
    sourcePage: "/ai-governance-course",
    userAgent: request.headers.get("user-agent") ?? "",
  };

  const submission = await submitToAppsScript(appScriptUrl, forwardPayload);

  if (!submission.success) {
    return NextResponse.json(
      { error: submission.error },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

