import { blobConfig, signedBlobUrl } from "../../../lib/server/blob";
import { getDb } from "../../../lib/server/db";
import { handleDownload } from "../../../lib/server/routes/orders";

// Pack download: token, expiry and refund checks, first-download log, then a 10-minute signed Azure Blob link.

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }): Promise<Response> {
  const { token } = await params;
  return handleDownload(token, { db: getDb(), blob: blobConfig(process.env), now: new Date(), signUrl: signedBlobUrl });
}
