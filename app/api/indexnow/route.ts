import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/seo";
import { getProductSlugs, getProductSlugsByType } from "@/lib/products";
import { submitUrlsToIndexNow } from "@/lib/indexnow";

// Reads the DB + makes an outbound request, so it must never be statically cached.
export const dynamic = "force-dynamic";

/**
 * Manual bulk submission — pings IndexNow with every public URL (the same set as
 * the XML sitemap). Useful as a one-off seed at launch or after a large import;
 * routine create/update/delete pings happen automatically in the product routes.
 *
 * Guarded by ADMIN_PASSWORD (the only server-side secret this app has). Provide
 * it as `Authorization: Bearer <password>`, an `x-admin-password` header, or a
 * `?secret=` query param.
 */
function isAuthorized(request: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;

  const authHeader = request.headers.get("authorization") ?? "";
  const bearer = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : "";
  const provided =
    bearer ||
    request.headers.get("x-admin-password") ||
    request.nextUrl.searchParams.get("secret") ||
    "";

  return provided.length > 0 && provided === adminPassword;
}

// Mirrors the static routes listed in app/sitemap.ts.
const STATIC_PATHS = [
  "",
  "/about",
  "/products",
  "/technicals",
  "/solvents",
  "/contact",
  "/terms",
  "/privacy",
  "/site-map",
];

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  // These helpers swallow DB errors and return [], so this never throws.
  const [products, technicals, solvents] = await Promise.all([
    getProductSlugs(),
    getProductSlugsByType("technical"),
    getProductSlugsByType("solvent"),
  ]);

  const urls = [
    ...STATIC_PATHS.map((p) => `${SITE_URL}${p}`),
    ...products.map((p) => `${SITE_URL}/products/${p.slug}`),
    ...technicals.map((p) => `${SITE_URL}/technicals/${p.slug}`),
    ...solvents.map((p) => `${SITE_URL}/solvents/${p.slug}`),
  ];

  const ok = await submitUrlsToIndexNow(urls);

  if (!ok) {
    return NextResponse.json(
      {
        success: false,
        error:
          "IndexNow submission did not go through. Check that INDEXNOW_KEY is set and NEXT_PUBLIC_BASE_URL is a public host.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, submitted: urls.length });
}
