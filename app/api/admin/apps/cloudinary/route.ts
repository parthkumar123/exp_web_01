import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getCloudinarySettings, saveSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

/** Mask a credential for display: first 4 chars + length hint. */
function mask(value: string): string {
  if (!value) return "";
  return value.length <= 4 ? "••••" : `${value.slice(0, 4)}${"•".repeat(8)}`;
}

// Current Cloudinary config status (any admin). Secrets are never returned —
// only masked previews and configured flags.
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const s = await getCloudinarySettings();
  return NextResponse.json({
    success: true,
    config: {
      cloudName: s.cloudName,
      apiKeyMasked: mask(s.apiKey),
      apiSecretConfigured: Boolean(s.apiSecret),
      source: s.source,
    },
  });
}

// Save Cloudinary credentials (superadmin only). Blank apiKey/apiSecret keep
// the stored values (or the env fallback), so re-saving never wipes a secret.
export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "superadmin") {
    return NextResponse.json(
      { error: "Only a superadmin can configure apps" },
      { status: 403 }
    );
  }

  const body = await request.json();
  const cloudName = String(body?.cloudName ?? "").trim();
  const apiKey = String(body?.apiKey ?? "").trim();
  const apiSecret = String(body?.apiSecret ?? "").trim();

  if (!cloudName) {
    return NextResponse.json(
      { error: "Cloud name is required" },
      { status: 422 }
    );
  }

  const patch: Record<string, unknown> = { cloudName };
  if (apiKey) patch.apiKey = apiKey; // blank = keep existing / env fallback
  if (apiSecret) patch.apiSecret = apiSecret;

  await saveSettings("cloudinary", patch, session.email);

  return NextResponse.json({ success: true });
}
