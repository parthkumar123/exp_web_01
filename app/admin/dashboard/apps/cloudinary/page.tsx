"use client";

import { useEffect, useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { PlugZap, Save } from "lucide-react";
import { toast } from "sonner";
import {
  Button,
  Card,
  FieldHint,
  Input,
  Label,
  PageHeader,
  SectionCard,
} from "@/components/admin/ui";
import { Skeleton } from "@/components/admin/Skeleton";
import { CloudinaryLogo, StatusDot } from "@/components/admin/app-logos";

interface CloudinaryConfig {
  cloudName: string;
  apiKeyMasked: string;
  apiSecretConfigured: boolean;
  source: "console" | "env" | "none";
}

export default function CloudinaryAppPage() {
  const { data: session } = useSession();
  const isSuperadmin = session?.user?.role === "superadmin";

  const [config, setConfig] = useState<CloudinaryConfig | null>(null);
  const [cloudName, setCloudName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/apps/cloudinary");
        const data = await res.json();
        if (!cancelled && data.success) {
          setConfig(data.config);
          setCloudName(data.config.cloudName || "");
        }
      } catch {
        if (!cancelled) toast.error("Failed to load Cloudinary settings");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/apps/cloudinary", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cloudName,
          // Blank fields keep the stored values (API enforces the same).
          apiKey: apiKey || undefined,
          apiSecret: apiSecret || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Cloudinary settings saved");
        setApiKey("");
        setApiSecret("");
        setRefreshKey((k) => k + 1);
      } else {
        toast.error(data.error || "Failed to save settings");
      }
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const testConnection = async () => {
    setTesting(true);
    try {
      const res = await fetch("/api/admin/apps/cloudinary/test", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        toast.success("Cloudinary connection OK");
      } else {
        toast.error(data.error || "Connection test failed");
      }
    } catch {
      toast.error("Connection test failed");
    } finally {
      setTesting(false);
    }
  };

  const connected = Boolean(config && config.source !== "none");

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Cloudinary"
        icon={<CloudinaryLogo className="h-full w-full" />}
        description="Image hosting for product photos. Credentials are encrypted at rest; changes apply immediately, no redeploy."
        actions={
          <>
            {config && (
              <StatusDot
                connected={connected}
                label={connected ? "Connected" : "Not configured"}
              />
            )}
            <Button variant="secondary" onClick={testConnection} disabled={testing || !config}>
              <PlugZap className="h-4 w-4" />
              {testing ? "Testing…" : "Test connection"}
            </Button>
          </>
        }
      />

      {!config ? (
        <Card className="space-y-4 p-6">
          <Skeleton className="h-5 w-48 rounded-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </Card>
      ) : (
        <div className="space-y-5">
          <SectionCard
            title="Credentials"
            description="From your Cloudinary dashboard (cloudinary.com → Settings → API Keys)."
          >
            <form onSubmit={save} className="space-y-4">
              <div>
                <Label htmlFor="cl-cloud">Cloud name</Label>
                <Input
                  id="cl-cloud"
                  value={cloudName}
                  onChange={(e) => setCloudName(e.target.value)}
                  placeholder="e.g. senso-agrotech"
                  required
                  disabled={!isSuperadmin}
                />
              </div>
              <div>
                <Label htmlFor="cl-key">API key</Label>
                <Input
                  id="cl-key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={config.apiKeyMasked || "API key"}
                  disabled={!isSuperadmin}
                />
                {config.apiKeyMasked && (
                  <FieldHint>
                    Currently set ({config.apiKeyMasked}). Leave blank to keep it.
                  </FieldHint>
                )}
              </div>
              <div>
                <Label htmlFor="cl-secret">API secret</Label>
                <Input
                  id="cl-secret"
                  type="password"
                  value={apiSecret}
                  onChange={(e) => setApiSecret(e.target.value)}
                  placeholder={config.apiSecretConfigured ? "••••••••••••" : "API secret"}
                  disabled={!isSuperadmin}
                  autoComplete="new-password"
                />
                <FieldHint>
                  {config.apiSecretConfigured
                    ? "Currently set — stored encrypted, never shown. Leave blank to keep it."
                    : "Stored encrypted (AES-256-GCM) in the database."}
                </FieldHint>
              </div>

              {isSuperadmin ? (
                <Button type="submit" disabled={saving}>
                  <Save className="h-4 w-4" />
                  {saving ? "Saving…" : "Save settings"}
                </Button>
              ) : (
                <p className="text-xs text-admin-muted">
                  Only a superadmin can change these credentials.
                </p>
              )}
            </form>
          </SectionCard>
        </div>
      )}
    </div>
  );
}
