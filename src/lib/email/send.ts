import { siteConfig } from "../siteConfig";

// Transactional email through Resend (chisokulabs.com is verified there). Server only: RESEND_API_KEY is never sent
// to a browser. Buyer emails come from hello@chisokulabs.com, so replies reach the inbox people already write to.

export type Email = {
  to: string;
  subject: string;
  text: string;
  /** Base64 file contents, for the report PDF. */
  attachments?: { filename: string; content: string }[];
};

export const buyerSender = `ChisokuLabs <${siteConfig.email}>`;

/** Sends one email. Returns false (never throws) when the key is missing or Resend rejects the message. */
export async function sendEmail(email: Email, env: Record<string, string | undefined> = process.env): Promise<boolean> {
  const key = env.RESEND_API_KEY?.trim();
  if (!key) {
    console.error("[email] RESEND_API_KEY is not set; email not sent");
    return false;
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: buyerSender,
        to: [email.to],
        reply_to: siteConfig.email,
        subject: email.subject,
        text: email.text,
        ...(email.attachments ? { attachments: email.attachments } : {}),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    await response.body?.cancel().catch(() => undefined);
    if (!response.ok) console.error(`[email] Resend returned ${response.status}; email not sent`);
    return response.ok;
  } catch {
    console.error("[email] Resend request failed; email not sent");
    return false;
  }
}
