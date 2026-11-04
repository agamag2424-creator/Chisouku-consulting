import { createHmac } from "node:crypto";

// Short-lived read links for the private Pack ZIP in Azure Blob Storage (service SAS, signed with the account key).
// Server only. Built with Node's crypto so no Azure SDK is needed. Format: Azure Storage service SAS, version
// 2022-11-02 (https://learn.microsoft.com/rest/api/storageservices/create-service-sas).

export type BlobConfig = { account: string; key: string; container: string; blobPath: string };

const SAS_VERSION = "2022-11-02";

export function blobConfig(env: Record<string, string | undefined>): BlobConfig | null {
  const account = env.AZURE_STORAGE_ACCOUNT?.trim();
  const key = env.AZURE_STORAGE_KEY?.trim();
  const container = env.PACK_CONTAINER?.trim();
  const blobPath = env.PACK_BLOB_PATH?.trim().replace(/^\/+/, "");
  if (!account || !key || !container || !blobPath) return null;
  if (!/^[a-z0-9]{3,24}$/.test(account) || !/^[a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])$/.test(container)) return null;
  return { account, key, container, blobPath };
}

/** Milliseconds dropped so the timestamp matches Azure's ISO 8601 form. */
const sasTime = (date: Date) => date.toISOString().replace(/\.\d{3}Z$/, "Z");

/**
 * A read-only, HTTPS-only link to the blob that expires after `minutes`. The download is saved as `fileName`.
 * The start time is set a few minutes back to allow for clock differences.
 */
export function signedBlobUrl(config: BlobConfig, now: Date, minutes: number, fileName: string): string {
  const start = sasTime(new Date(now.getTime() - 5 * 60_000));
  const expiry = sasTime(new Date(now.getTime() + minutes * 60_000));
  const encodedPath = config.blobPath.split("/").map(encodeURIComponent).join("/");
  const canonicalResource = `/blob/${config.account}/${config.container}/${config.blobPath}`;
  const contentDisposition = `attachment; filename="${fileName}"`;

  // Field order is fixed by Azure: permissions, start, expiry, resource, identifier, IP, protocol, version,
  // resource type, snapshot time, encryption scope, then the five response-header overrides (rscc..rsct).
  const stringToSign = [
    "r",
    start,
    expiry,
    canonicalResource,
    "",
    "",
    "https",
    SAS_VERSION,
    "b",
    "",
    "",
    "",
    contentDisposition,
    "",
    "",
    "",
  ].join("\n");
  const signature = createHmac("sha256", Buffer.from(config.key, "base64")).update(stringToSign, "utf8").digest("base64");

  const query = new URLSearchParams({
    sv: SAS_VERSION,
    spr: "https",
    st: start,
    se: expiry,
    sr: "b",
    sp: "r",
    rscd: contentDisposition,
    sig: signature,
  });
  return `https://${config.account}.blob.core.windows.net/${config.container}/${encodedPath}?${query.toString()}`;
}
