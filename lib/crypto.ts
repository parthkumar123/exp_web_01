import { hkdfSync, randomBytes, createCipheriv, createDecipheriv } from "node:crypto";

/**
 * Symmetric encryption for secret values stored at rest in the DB (e.g. the
 * Cloudinary API secret in the dynamic Settings collection).
 *
 * The key is derived from AUTH_SECRET via HKDF, so this adds NO new env var.
 * AUTH_SECRET already exists, is high-entropy, and is required for the app to
 * boot — rotating it invalidates encrypted settings (re-enter them in the
 * console), which is acceptable and rare.
 *
 * Format: `enc:v1:<base64(iv|authTag|ciphertext)>`. Values without the prefix
 * are treated as plaintext (legacy / env-fallback), so decrypt is safe to call
 * on anything.
 */

const PREFIX = "enc:v1:";
const ALGO = "aes-256-gcm";
const IV_LEN = 12;

function getKey(): Buffer {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is required to encrypt/decrypt settings");
  }
  // 32-byte key for AES-256, namespaced so it can't collide with other uses.
  return Buffer.from(
    hkdfSync("sha256", secret, "senso-settings-salt", "settings-encryption", 32)
  );
}

export function encryptString(plain: string): string {
  const iv = randomBytes(IV_LEN);
  const cipher = createCipheriv(ALGO, getKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return PREFIX + Buffer.concat([iv, authTag, ciphertext]).toString("base64");
}

export function isEncrypted(value: string): boolean {
  return typeof value === "string" && value.startsWith(PREFIX);
}

export function decryptString(value: string): string {
  if (!isEncrypted(value)) return value; // plaintext / env-fallback passthrough
  const raw = Buffer.from(value.slice(PREFIX.length), "base64");
  const iv = raw.subarray(0, IV_LEN);
  const authTag = raw.subarray(IV_LEN, IV_LEN + 16);
  const ciphertext = raw.subarray(IV_LEN + 16);
  const decipher = createDecipheriv(ALGO, getKey(), iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
}
