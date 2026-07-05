import connectDB from "./mongodb";
import Setting from "@/models/Setting";
import { encryptString, decryptString, isEncrypted } from "./crypto";

/**
 * Dynamic configuration service backing the console's Apps section.
 *
 * Config lives in the `settings` collection (one doc per namespace) and is
 * managed from /admin/dashboard/apps — not in .env. Secret fields are
 * encrypted at rest (lib/crypto.ts). Every getter falls back to the
 * corresponding process.env var when the DB value is absent, so existing
 * deployments keep working before anything is configured in the console.
 *
 * Reads hit Mongo directly — settings are only read on admin actions
 * (image uploads), never on public traffic, so no cache layer is needed.
 */

// Which fields in each namespace must be encrypted at rest.
const SECRET_FIELDS: Record<string, readonly string[]> = {
  cloudinary: ["apiSecret"],
};

export interface CloudinarySettings {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  /** Where the effective config came from. */
  source: "console" | "env" | "none";
}

async function getNamespace(
  namespace: string
): Promise<Record<string, unknown>> {
  await connectDB();
  const doc = await Setting.findOne({ namespace }).lean<{
    data: Record<string, unknown>;
  }>();
  const data = doc?.data;
  if (!data) return {};

  const out: Record<string, unknown> = { ...data };
  for (const field of SECRET_FIELDS[namespace] ?? []) {
    const v = out[field];
    if (typeof v === "string" && v) {
      try {
        out[field] = decryptString(v);
      } catch {
        // Value was encrypted under a different AUTH_SECRET (rotation). Drop
        // it so the getter falls back to env instead of 500-ing the caller —
        // re-enter it in the console.
        console.warn(
          `[settings] failed to decrypt "${namespace}.${field}"; using env fallback`
        );
        delete out[field];
      }
    }
  }
  return out;
}

/** Effective Cloudinary config: console values first, env vars as fallback. */
export async function getCloudinarySettings(): Promise<CloudinarySettings> {
  const s = await getNamespace("cloudinary");
  const fromConsole = Boolean(s.cloudName || s.apiKey || s.apiSecret);

  const cloudName =
    (s.cloudName as string) || process.env.CLOUDINARY_CLOUD_NAME || "";
  const apiKey = (s.apiKey as string) || process.env.CLOUDINARY_API_KEY || "";
  const apiSecret =
    (s.apiSecret as string) || process.env.CLOUDINARY_API_SECRET || "";

  return {
    cloudName,
    apiKey,
    apiSecret,
    source: fromConsole ? "console" : cloudName ? "env" : "none",
  };
}

/**
 * Persist a namespace (shallow-merged into existing data). Secret fields are
 * encrypted before storage; never re-encrypts an already-encrypted value.
 */
export async function saveSettings(
  namespace: string,
  patch: Record<string, unknown>,
  updatedBy?: string
): Promise<void> {
  await connectDB();
  const existing = await Setting.findOne({ namespace });
  const merged: Record<string, unknown> = {
    ...(existing?.data ?? {}),
    ...patch,
  };

  for (const field of SECRET_FIELDS[namespace] ?? []) {
    const v = merged[field];
    if (typeof v === "string" && v && !isEncrypted(v)) {
      merged[field] = encryptString(v);
    }
  }

  await Setting.findOneAndUpdate(
    { namespace },
    { $set: { data: merged, updatedBy } },
    { upsert: true, new: true }
  );
}
