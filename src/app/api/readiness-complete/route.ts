import { handleCompletion } from "../../../lib/server/routes/readinessComplete";

// Completion storage is off until the PMO self-check ships. DATABASE_URL is not read here, and
// readiness_completions is not written. The handler still returns 204.

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  return handleCompletion(request, null);
}
