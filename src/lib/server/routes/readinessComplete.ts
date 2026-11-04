import { completionInsert } from "../../readinessCompletion";
import type { Db } from "../db";

// POST /api/readiness-complete: one anonymous row in readiness_completions. No IP address, email, name or answers.
// Without a database (DATABASE_URL missing or invalid) it returns 204 and writes nothing.

export async function handleCompletion(request: Request, db: Db | null): Promise<Response> {
  if (!db) return new Response(null, { status: 204 });

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }

  const row = completionInsert(input);
  if (!row) return new Response(null, { status: 400 });

  try {
    await db.query(
      `insert into readiness_completions (score_band, utm_source, utm_medium, utm_campaign, referrer_host)
       values ($1, $2, $3, $4, $5)`,
      [row.score_band, row.utm_source, row.utm_medium, row.utm_campaign, row.referrer_host],
    );
  } catch {
    console.error("[readiness] database insert failed; completion not stored");
    return new Response(null, { status: 502 });
  }

  return new Response(null, { status: 204 });
}
