import type { Db } from "../db";

// Completion storage is off until the PMO self-check ships.
// readiness_completions stays as it is, including existing rows. This handler does not read
// DATABASE_URL and does not insert, update, or delete, even when a database is passed in.

export async function handleCompletion(request: Request, db: Db | null): Promise<Response> {
  void request;
  void db;
  return new Response(null, { status: 204 });
}
