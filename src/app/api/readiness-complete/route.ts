import { completionInsert } from "../../../lib/readinessCompletion";

// Anonymous completion count for /readiness. One row, via the Supabase REST API.
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are read only in this server route.
// Do not reference them from a client component, and do not prefix them with NEXT_PUBLIC_.
// No IP address, email, name or answers are read or stored. If either variable is missing,
// or the URL is not https, this returns 204 and writes nothing.

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type SupabaseConfig = { url: string; key: string };

function supabaseConfig(env: {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}): SupabaseConfig | null {
  const key = env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const rawUrl = env.SUPABASE_URL?.trim();
  if (!key || !rawUrl) return null;
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return { url: url.origin, key };
  } catch {
    return null;
  }
}

export async function POST(request: Request): Promise<Response> {
  const config = supabaseConfig(process.env);
  if (!config) return new Response(null, { status: 204 });

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }

  const row = completionInsert(input);
  if (!row) return new Response(null, { status: 400 });

  try {
    const response = await fetch(`${config.url}/rest/v1/readiness_completions`, {
      method: "POST",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    await response.body?.cancel().catch(() => undefined);
    if (!response.ok) {
      console.error(`[readiness] Supabase returned ${response.status}; completion not stored`);
      return new Response(null, { status: 502 });
    }
  } catch {
    console.error("[readiness] Supabase request failed; completion not stored");
    return new Response(null, { status: 502 });
  }

  return new Response(null, { status: 204 });
}
