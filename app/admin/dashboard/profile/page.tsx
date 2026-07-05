"use client";

import { useEffect, useState, FormEvent } from "react";
import { signOut } from "next-auth/react";
import { LogOut, Pencil, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { useAdminMe } from "@/hooks/useAdminMe";
import { Badge, Button, Card, Input, Label, PageHeader } from "@/components/admin/ui";
import { ProfileSkeleton } from "@/components/admin/Skeleton";

export default function ProfilePage() {
  const { me, loading, setMe } = useAdminMe();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (me?.name) setName(me.name);
  }, [me?.name]);

  const saveName = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (data.success) {
        setMe(data.admin);
        setEditing(false);
        toast.success("Name updated");
      } else {
        toast.error(data.error || "Failed to update name");
      }
    } catch {
      toast.error("Failed to update name");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Profile"
        description="Your console account. The display name is used for product attribution."
      />

      {loading || !me ? (
        <ProfileSkeleton />
      ) : (
        <Card className="p-6">
          <div className="flex items-center gap-4">
            {me.image ? (
              // no-referrer: Google's avatar CDN rejects some hotlink requests
              // that carry a Referer header (intermittent 403s).
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={me.image}
                alt=""
                referrerPolicy="no-referrer"
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-admin-primary text-xl font-semibold text-white">
                {(me.name || me.email).charAt(0).toUpperCase()}
              </span>
            )}
            <div className="min-w-0 flex-1">
              {editing ? (
                <form onSubmit={saveName} className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor="profile-name">Display name</Label>
                    <Input
                      id="profile-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={80}
                      required
                      autoFocus
                    />
                  </div>
                  <Button type="submit" disabled={saving}>
                    {saving ? "Saving…" : "Save"}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="px-2.5"
                    aria-label="Cancel"
                    onClick={() => {
                      setEditing(false);
                      setName(me.name || "");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <>
                  <p className="flex items-center gap-2 text-base font-semibold text-admin-ink">
                    {me.name || "Unnamed account"}
                    <button
                      onClick={() => setEditing(true)}
                      className="rounded-md p-1 text-admin-muted transition-colors hover:bg-admin-hover hover:text-admin-ink"
                      title="Edit name"
                      aria-label="Edit name"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    {me.role === "superadmin" ? (
                      <Badge tone="blue">
                        <ShieldCheck className="mr-1 h-3 w-3" />
                        Superadmin
                      </Badge>
                    ) : (
                      <Badge tone="slate">Admin</Badge>
                    )}
                  </p>
                  <p className="truncate text-sm text-admin-muted">{me.email}</p>
                </>
              )}
            </div>
          </div>

          <dl className="mt-6 grid gap-4 border-t border-admin-border pt-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-admin-faint">
                Last login
              </dt>
              <dd className="mt-0.5 text-sm text-admin-body">
                {me.lastLogin
                  ? new Date(me.lastLogin).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-admin-faint">
                Admin since
              </dt>
              <dd className="mt-0.5 text-sm text-admin-body">
                {me.createdAt
                  ? new Date(me.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "—"}
              </dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-admin-border pt-5">
            <p className="mb-4 text-xs text-admin-muted">
              The photo comes from your Google account. Access and roles are managed on the
              Admins page by a superadmin.
            </p>
            <Button variant="secondary" onClick={() => signOut({ redirectTo: "/admin/login" })}>
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
