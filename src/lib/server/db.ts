import { Pool } from "pg";

// Azure Database for PostgreSQL (flexible server). Server only: DATABASE_URL is never sent to a browser and must not
// be prefixed with NEXT_PUBLIC_. The server accepts connections from anywhere (Vercel has no fixed IP addresses), so
// every connection uses TLS with certificate verification, and the URL carries a strong password.

/** The one method the routes need; tests pass a fake with the same shape. */
export type Db = {
  query<Row = Record<string, unknown>>(text: string, params?: unknown[]): Promise<{ rows: Row[]; rowCount: number | null }>;
};

/**
 * Parsed DATABASE_URL, or null when it is missing or not a postgres:// URL. Any sslmode in the URL is dropped:
 * TLS with a verified certificate is always required (Azure's certificates chain to public roots Node trusts).
 */
export function databaseConfig(env: Record<string, string | undefined>): { connectionString: string } | null {
  const raw = env.DATABASE_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "postgres:" && url.protocol !== "postgresql:") return null;
    if (!url.hostname || !url.username || !url.password) return null;
    url.searchParams.delete("sslmode");
    return { connectionString: url.toString() };
  } catch {
    return null;
  }
}

let pool: Pool | null = null;
let poolFor: string | null = null;

/**
 * A small shared pool per server instance. Serverless functions run many instances, so each keeps few connections
 * and closes idle ones quickly; the smallest Azure tiers allow around 50 connections in total.
 */
export function getDb(env: Record<string, string | undefined> = process.env): Db | null {
  const config = databaseConfig(env);
  if (!config) return null;
  if (!pool || poolFor !== config.connectionString) {
    void pool?.end().catch(() => undefined);
    pool = new Pool({
      connectionString: config.connectionString,
      ssl: { rejectUnauthorized: true },
      max: 3,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 5_000,
      statement_timeout: 8_000,
    });
    pool.on("error", () => console.error("[db] idle client error"));
    poolFor = config.connectionString;
  }
  return pool;
}
