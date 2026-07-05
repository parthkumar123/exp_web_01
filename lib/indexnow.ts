/**
 * IndexNow integration.
 *
 * IndexNow lets us instantly notify participating search engines (Bing, Yandex,
 * Naver, Seznam, Yep — NOT Google, which does not support the protocol) when a
 * URL is created, updated or deleted, instead of waiting for the next recrawl.
 * A single POST to api.indexnow.org is shared with every participating engine.
 *
 * Setup (see README "IndexNow"):
 *  1. INDEXNOW_KEY env var holds a public ownership key (alphanumeric, 8–128 chars).
 *  2. public/<INDEXNOW_KEY>.txt contains exactly that key, proving we own the host.
 *     The file NAME must equal INDEXNOW_KEY — both were generated together. If you
 *     ever rotate the key, regenerate the file too and keep the two in sync.
 *
 * Everything here fails soft: a missing key, a non-public host (localhost) or a
 * network error is swallowed and never throws, so an admin product save is never
 * broken by IndexNow.
 */
import { SITE_URL } from "@/lib/seo";
import type { ProductType } from "@/models/Product";

// Submitting to api.indexnow.org fans the ping out to all participating engines,
// so we don't need to call Bing/Yandex/etc. individually.
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
// IndexNow accepts up to 10,000 URLs per request.
const MAX_URLS = 10000;
// Keep the admin mutation snappy; the ping must still go out before a
// serverless function freezes, so we await it with a short timeout.
const SUBMIT_TIMEOUT_MS = 2500;

function getKey(): string | null {
  const key = process.env.INDEXNOW_KEY?.trim();
  return key && key.length >= 8 ? key : null;
}

/** The host part of SITE_URL, or null if SITE_URL is unparseable. */
function siteHost(): string | null {
  try {
    return new URL(SITE_URL).hostname;
  } catch {
    return null;
  }
}

/**
 * IndexNow verifies the key file over the public internet, so submitting from a
 * local dev host (localhost / 127.0.0.1) or a bare hostname is pointless.
 */
function isSubmittableHost(host: string | null): host is string {
  return (
    !!host &&
    host !== "localhost" &&
    host !== "127.0.0.1" &&
    host.includes(".")
  );
}

/**
 * Map a changed product to every public URL whose content is affected, so the
 * detail page, its listing page and the homepage featured grid all get
 * recrawled. Mirrors the paths in lib/revalidate.ts.
 */
export function productIndexNowUrls(
  slug: string,
  productType: ProductType
): string[] {
  const base =
    productType === "technical"
      ? "technicals"
      : productType === "solvent"
        ? "solvents"
        : "products";

  return [
    SITE_URL, // homepage featured grid
    `${SITE_URL}/${base}`, // the line's listing page
    `${SITE_URL}/${base}/${slug}`, // the product detail page
  ];
}

/**
 * Submit a batch of absolute URLs to IndexNow. Returns true only when the ping
 * was accepted. No-ops (returns false) when no key is configured or the host
 * isn't publicly reachable. Never throws.
 */
export async function submitUrlsToIndexNow(urls: string[]): Promise<boolean> {
  const key = getKey();
  const host = siteHost();
  if (!key || !isSubmittableHost(host)) return false;

  // Only the real production deployment may ping: preview deploys carry the
  // production NEXT_PUBLIC_BASE_URL, so without this guard they'd submit live
  // URLs. INDEXNOW_ENABLED=1 overrides for deliberate local/manual runs.
  if (
    process.env.INDEXNOW_ENABLED !== "1" &&
    process.env.VERCEL_ENV &&
    process.env.VERCEL_ENV !== "production"
  ) {
    return false;
  }

  // The protocol rejects URLs that don't belong to `host`; dedupe and cap too.
  const urlList = [...new Set(urls)]
    .filter((u) => {
      try {
        return new URL(u).hostname === host;
      } catch {
        return false;
      }
    })
    .slice(0, MAX_URLS);

  if (urlList.length === 0) return false;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `${SITE_URL}/${key}.txt`,
        urlList,
      }),
      signal: controller.signal,
    });
    // 200 OK and 202 Accepted both mean success (202 = key validation pending).
    if (!res.ok) {
      console.error(`IndexNow submit failed: HTTP ${res.status}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error("IndexNow submit error:", err);
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/** Convenience: submit every URL affected by a single product change. */
export async function submitProductToIndexNow(
  slug: string,
  productType: ProductType
): Promise<boolean> {
  return submitUrlsToIndexNow(productIndexNowUrls(slug, productType));
}
