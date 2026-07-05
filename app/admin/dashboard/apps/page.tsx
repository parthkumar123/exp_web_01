"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, HardDrive } from "lucide-react";
import { PageHeader } from "@/components/admin/ui";
import { Skeleton } from "@/components/admin/Skeleton";
import { CloudinaryLogo, StatusDot } from "@/components/admin/app-logos";

interface CloudinaryStatus {
  cloudName: string;
  source: "console" | "env" | "none";
}

/**
 * Third-party integrations, grouped by category. Each app is a card linking
 * to its own config page — adding a future integration (email, analytics, …)
 * is just another entry here plus a config page + settings namespace.
 */
export default function AppsPage() {
  const [cloudinary, setCloudinary] = useState<CloudinaryStatus | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/apps/cloudinary");
        const data = await res.json();
        if (!cancelled && data.success) setCloudinary(data.config);
      } catch {
        // Card falls back to "Not configured".
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const connected = Boolean(cloudinary && cloudinary.source !== "none");

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Apps"
        description="Third-party integrations used by the console. Credentials are stored encrypted in the database — no redeploy needed to change them."
      />

      {/* Storage */}
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-admin-muted">
        <HardDrive className="h-3.5 w-3.5" />
        Storage
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/dashboard/apps/cloudinary"
          className="group flex items-start gap-4 rounded-xl border border-admin-border bg-admin-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-admin-primary/40 hover:shadow-md"
        >
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-admin-border bg-white p-2">
            <CloudinaryLogo className="h-full w-full" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2">
              <span className="text-sm font-semibold text-admin-ink">Cloudinary</span>
              {loaded ? (
                <StatusDot connected={connected} />
              ) : (
                <Skeleton className="h-2 w-2 rounded-full" />
              )}
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-admin-muted">
              Image hosting &amp; optimization for product photos uploaded from the
              console.
              {cloudinary?.cloudName ? ` Cloud: ${cloudinary.cloudName}` : ""}
            </span>
          </span>
          <ChevronRight className="h-4 w-4 flex-shrink-0 self-center text-admin-faint transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <p className="mt-8 text-xs text-admin-faint">
        More integrations (email, analytics, messaging) will appear here as they&apos;re
        added.
      </p>
    </div>
  );
}
