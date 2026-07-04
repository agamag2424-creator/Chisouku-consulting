import { NextResponse } from "next/server";
import {
  saveToAppsScript,
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
  try {
    const body = (await request.json()) as WaitlistPayload;

    // Basic spam trap
    if (body.website && body.website.trim() !== "") {
      return NextResponse.json(
        { error: "Invalid submission." },
        { status: 400 },
      );
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
    const urlError = validateAppsScriptUrl(appScriptUrl);
    if (urlError || !appScriptUrl) {
      return NextResponse.json(
        { error: urlError ?? "Waitlist endpoint is not configured." },
        { status: 500 },
      );
    }

    const forwardPayload = {
      fullName: String(body.fullName ?? "").trim(),
      workEmail: email,
      phone: String(body.phone ?? "").trim(),
      company: String(body.company ?? "").trim(),
      role: String(body.role ?? "").trim(),
      country: String(body.country ?? "").trim(),
      experienceYears: String(body.experienceYears ?? "").trim(),
      whyJoining: String(body.whyJoining ?? "").trim(),
      consent: true,
      optInFutureModules: body.optInFutureModules === true,
      optInFreeTemplates: body.optInFreeTemplates === true,
      submittedAt: new Date().toISOString(),
      sourcePage: "/ai-governance-course",
      userAgent: request.headers.get("user-agent") ?? "",
    };

    const saveResult = await saveToAppsScript(appScriptUrl, forwardPayload);

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

