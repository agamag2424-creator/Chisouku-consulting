import { handleCompletion } from "../../../lib/server/routes/readinessComplete";
import { getDb } from "../../../lib/server/db";

// Anonymous completion count for /readiness, stored in Azure Database for PostgreSQL. DATABASE_URL is read only on
// the server. The handler (lib/server/routes/readinessComplete.ts) is tested without a database.

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  return handleCompletion(request, getDb());
}
