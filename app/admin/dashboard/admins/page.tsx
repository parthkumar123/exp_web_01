"use client";

import { useEffect, useState, FormEvent } from "react";
import { RefreshCw, ShieldCheck, Trash2, UserPlus, Users } from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/components/admin/ConfirmDialog";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  Label,
  PageHeader,
  Select,
} from "@/components/admin/ui";
import { ListSkeleton } from "@/components/admin/Skeleton";

interface AdminRow {
  _id: string;
  email: string;
  role: string;
  name?: string;
  lastLogin?: string;
}

export default function AdminsPage() {
  const confirm = useConfirm();
  const [admins, setAdmins] = useState<AdminRow[] | null>(null);
  const [currentEmail, setCurrentEmail] = useState("");
  const [isSuperadmin, setIsSuperadmin] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("admin");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/admins");
        const data = await res.json();
        if (cancelled) return;
        setAdmins(data.admins || []);
        setCurrentEmail(data.currentEmail || "");
        setIsSuperadmin(data.currentRole === "superadmin");
      } catch {
        if (!cancelled) {
          toast.error("Failed to load admins");
          setAdmins([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  // Clearing the list swaps it for the skeleton, so a refresh is visible.
  const refresh = () => {
    setAdmins(null);
    setRefreshKey((k) => k + 1);
  };

  // Upsert: adds the email if new, otherwise updates their role/name.
  const save = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, name: name || undefined }),
      });
      const data = await res.json();
      if (res.ok) {
        setEmail("");
        setName("");
        setRole("admin");
        toast.success(
          data.updated ? `${email} updated` : `${email} can now sign in`
        );
        refresh();
      } else {
        toast.error(data.error || "Failed to save admin");
      }
    } finally {
      setSaving(false);
    }
  };

  const changeRole = async (
    admin: AdminRow,
    newRole: string,
    selectEl: HTMLSelectElement
  ) => {
    const ok = await confirm({
      title: `Make ${admin.name || admin.email} ${
        newRole === "superadmin" ? "a superadmin" : "an admin"
      }?`,
      description:
        newRole === "superadmin"
          ? "Superadmins can add, remove and change the role of every admin."
          : "They will no longer be able to manage the admin allowlist.",
      confirmText: "Change role",
    });
    if (!ok) {
      // Controlled select — no state changed, so put the DOM value back.
      selectEl.value = admin.role;
      return;
    }

    const res = await fetch("/api/admin/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: admin.email, role: newRole }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(`${admin.email} is now ${newRole}`);
      refresh();
    } else {
      selectEl.value = admin.role;
      toast.error(data.error || "Failed to change role");
    }
  };

  const remove = async (admin: AdminRow) => {
    const ok = await confirm({
      title: `Remove ${admin.email}?`,
      description: "They lose access to the console immediately.",
      confirmText: "Remove",
      destructive: true,
    });
    if (!ok) return;

    const res = await fetch(`/api/admin/admins?id=${admin._id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error || "Failed to remove admin");
      return;
    }
    toast.success("Admin removed");
    refresh();
  };

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Admins"
        description="Google accounts allowed to sign in. The list is the allowlist — no redeploy needed."
        actions={
          <Button
            variant="secondary"
            onClick={refresh}
            title="Refresh"
            aria-label="Refresh admins"
            className="px-2.5"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        }
      />

      {isSuperadmin && (
        <Card className="mb-5 p-5">
          <form onSubmit={save} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Label htmlFor="admin-email">Add or update admin</Label>
              <Input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="person@gmail.com"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="admin-name">Name (optional)</Label>
              <Input
                id="admin-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Display name"
              />
            </div>
            <div>
              <Label htmlFor="admin-role">Role</Label>
              <Select
                id="admin-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full sm:w-36"
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </Select>
            </div>
            <Button type="submit" disabled={saving}>
              <UserPlus className="h-4 w-4" />
              {saving ? "Saving…" : "Save"}
            </Button>
          </form>
          <p className="mt-2 text-xs text-admin-muted">
            If the email already exists, its role and name are updated instead of added twice.
          </p>
        </Card>
      )}

      {admins === null ? (
        <ListSkeleton />
      ) : (
        <Card>
          {admins.length === 0 ? (
            <EmptyState icon={Users} title="No admins found" />
          ) : (
            <ul className="divide-y divide-admin-border">
              {admins.map((admin) => {
                const isSelf = admin.email === currentEmail;
                return (
                  <li key={admin._id} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-admin-primary/10 text-sm font-semibold text-admin-primary">
                        {(admin.name || admin.email).charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="flex items-center gap-2 truncate text-sm font-medium text-admin-ink">
                          {admin.name || admin.email}
                          {isSelf && <Badge tone="green">you</Badge>}
                        </p>
                        <p className="truncate text-xs text-admin-muted">
                          {admin.name ? `${admin.email} · ` : ""}
                          {admin.lastLogin
                            ? `Last login ${new Date(admin.lastLogin).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}`
                            : "Never logged in"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-shrink-0 items-center gap-2">
                      {isSuperadmin && !isSelf ? (
                        <Select
                          value={admin.role}
                          onChange={(e) => changeRole(admin, e.target.value, e.target)}
                          className="w-32 py-1.5"
                          aria-label={`Role for ${admin.email}`}
                        >
                          <option value="admin">Admin</option>
                          <option value="superadmin">Superadmin</option>
                        </Select>
                      ) : admin.role === "superadmin" ? (
                        <Badge tone="blue">
                          <ShieldCheck className="mr-1 h-3 w-3" />
                          Superadmin
                        </Badge>
                      ) : (
                        <Badge tone="slate">Admin</Badge>
                      )}
                      {isSuperadmin && !isSelf && (
                        <Button variant="dangerOutline" onClick={() => remove(admin)}>
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </Button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      )}
    </div>
  );
}
