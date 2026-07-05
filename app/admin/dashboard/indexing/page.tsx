"use client";

import { useState } from "react";
import { Radar, Send } from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/components/admin/ConfirmDialog";
import { Button, Card, PageHeader } from "@/components/admin/ui";

export default function IndexingPage() {
  const confirm = useConfirm();
  const [submitting, setSubmitting] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);

  const submitAll = async () => {
    const ok = await confirm({
      title: "Submit all URLs to IndexNow?",
      description:
        "This pings search engines with every public URL on the site. Routine product changes are submitted automatically — only run this after a large import or overhaul.",
      confirmText: "Submit",
    });
    if (!ok) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/indexnow", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setLastResult(`Submitted ${data.submitted} URLs to IndexNow.`);
        toast.success(`${data.submitted} URLs submitted`);
      } else {
        setLastResult(null);
        toast.error(data.error || "Submission failed");
      }
    } catch {
      toast.error("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Search engine indexing"
        description="Product create/edit/delete already pings IndexNow automatically."
      />

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-admin-primary/10 text-admin-primary">
            <Radar className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-admin-ink">Bulk resubmission</h2>
            <p className="mt-1 text-sm leading-relaxed text-admin-muted">
              Pings IndexNow (Bing, Yandex, Seznam, …) with every public URL — the same set as
              the XML sitemap: static pages plus all product, technical and solvent detail
              pages. Use it after a large import or content overhaul; routine changes don&apos;t
              need it.
            </p>
            {lastResult && (
              <p className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                {lastResult}
              </p>
            )}
            <Button className="mt-4" onClick={submitAll} disabled={submitting}>
              <Send className="h-4 w-4" />
              {submitting ? "Submitting…" : "Submit all URLs"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
