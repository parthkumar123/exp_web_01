"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Package,
  Eye,
  EyeOff,
  Star,
  Users,
  Plus,
  Radar,
  ChevronRight,
} from "lucide-react";
import { useAdminMe } from "@/hooks/useAdminMe";
import {
  Badge,
  ButtonLink,
  Card,
  PageHeader,
  StatCard,
} from "@/components/admin/ui";
import { DashboardSkeleton } from "@/components/admin/Skeleton";
import { PRODUCT_TYPE_LABELS, type AdminProduct } from "@/components/admin/types";

interface Stats {
  products: {
    total: number;
    active: number;
    inactive: number;
    featured: number;
    byType: Record<string, number>;
    byCategory: { category: string; count: number }[];
  };
  admins: number;
  recent: AdminProduct[];
}

// Distinct bar colors per category so the breakdown reads at a glance.
const CATEGORY_COLORS = [
  "#059669", // emerald
  "#2563eb", // blue
  "#7c3aed", // violet
  "#d97706", // amber
  "#e11d48", // rose
  "#0891b2", // cyan
];

export default function DashboardPage() {
  const { data: session } = useSession();
  // DB profile is the source of truth for the display name (editable on
  // /profile); the Google-token session name is only a fallback.
  const { me } = useAdminMe();
  const [stats, setStats] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d.success) setStats(d.data);
        else setFailed(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const displayName = me?.name ?? session?.user?.name;
  const firstName = displayName?.split(" ")[0];

  return (
    <div>
      <PageHeader
        title={firstName ? `Welcome back, ${firstName}` : "Dashboard"}
        description="Catalog overview and recent activity."
        actions={
          <ButtonLink href="/admin/dashboard/products/new">
            <Plus className="h-4 w-4" />
            New product
          </ButtonLink>
        }
      />

      {failed ? (
        <p className="text-sm text-red-600">Couldn&apos;t load dashboard stats. Refresh to retry.</p>
      ) : !stats ? (
        <DashboardSkeleton />
      ) : (
        <div className="space-y-5">
          {/* Stat tiles — each links to the matching pre-filtered view */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard
              label="Total products"
              value={stats.products.total}
              icon={Package}
              tone="emerald"
              href="/admin/dashboard/products"
              hint={["formulation", "technical", "solvent"]
                .filter((t) => stats.products.byType[t])
                .map(
                  (t) =>
                    `${stats.products.byType[t]} ${PRODUCT_TYPE_LABELS[
                      t as keyof typeof PRODUCT_TYPE_LABELS
                    ].toLowerCase()}s`
                )
                .join(" · ")}
            />
            <StatCard
              label="Active"
              value={stats.products.active}
              icon={Eye}
              tone="blue"
              href="/admin/dashboard/products?status=active"
              hint="Visible in the catalog"
            />
            <StatCard
              label="Inactive"
              value={stats.products.inactive}
              icon={EyeOff}
              tone="rose"
              href="/admin/dashboard/products?status=inactive"
              hint="Hidden from the catalog"
            />
            <StatCard
              label="Featured"
              value={stats.products.featured}
              icon={Star}
              tone="amber"
              href="/admin/dashboard/products?status=featured"
              hint="Shown on the homepage"
            />
            <StatCard
              label="Admins"
              value={stats.admins}
              icon={Users}
              tone="violet"
              href="/admin/dashboard/admins"
              hint="Accounts with console access"
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {/* Recent activity */}
            <Card className="lg:col-span-2">
              <div className="flex items-center justify-between border-b border-admin-border px-5 py-4">
                <h2 className="text-sm font-semibold text-admin-ink">Recently updated</h2>
                <Link
                  href="/admin/dashboard/products"
                  className="flex items-center gap-0.5 text-xs font-medium text-admin-primary hover:underline"
                >
                  All products
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              {stats.recent.length === 0 ? (
                <p className="px-5 py-8 text-sm text-admin-muted">
                  No products yet — create the first one to see activity here.
                </p>
              ) : (
                <ul className="divide-y divide-admin-border">
                  {stats.recent.map((p) => (
                    <li key={p._id}>
                      <Link
                        href={`/admin/dashboard/products/edit/${p._id}`}
                        className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-admin-hover/50"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.image}
                          alt=""
                          className="h-9 w-9 flex-shrink-0 rounded-md border border-admin-border bg-admin-hover object-contain"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-admin-ink">{p.name}</p>
                          <p className="text-xs text-admin-faint">
                            {[PRODUCT_TYPE_LABELS[p.productType], p.category]
                              .filter(Boolean)
                              .join(" · ")}
                            {p.updatedAt &&
                              ` · updated ${new Date(p.updatedAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                              })}`}
                            {p.updatedBy?.name && ` by ${p.updatedBy.name}`}
                          </p>
                        </div>
                        <div className="flex flex-shrink-0 items-center gap-1.5">
                          {!p.isActive && <Badge tone="red">Inactive</Badge>}
                          {p.isFeatured && <Badge tone="amber">Featured</Badge>}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            {/* Category breakdown + quick links */}
            <div className="space-y-5">
              <Card>
                <div className="border-b border-admin-border px-5 py-4">
                  <h2 className="text-sm font-semibold text-admin-ink">By category</h2>
                </div>
                {stats.products.byCategory.length === 0 ? (
                  <p className="px-5 py-6 text-sm text-admin-muted">No categorized products.</p>
                ) : (
                  <ul className="px-3 py-2">
                    {stats.products.byCategory.map((c, i) => {
                      const pct = stats.products.total
                        ? Math.round((c.count / stats.products.total) * 100)
                        : 0;
                      const color = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
                      return (
                        <li key={c.category}>
                          <Link
                            href={`/admin/dashboard/products?category=${encodeURIComponent(c.category)}`}
                            className="block rounded-lg px-2 py-2 transition-colors hover:bg-admin-hover/60"
                          >
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span className="flex items-center gap-2 text-admin-body">
                                <span
                                  className="h-2 w-2 rounded-full"
                                  style={{ backgroundColor: color }}
                                />
                                {c.category}
                              </span>
                              <span className="font-medium text-admin-ink">{c.count}</span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-admin-hover">
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${pct}%`, backgroundColor: color }}
                              />
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </Card>

              <Card className="p-4">
                <h2 className="mb-2 px-1 text-sm font-semibold text-admin-ink">Quick actions</h2>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/admin/dashboard/admins"
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-admin-body hover:bg-admin-hover"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-100 text-violet-700">
                      <Users className="h-4 w-4" />
                    </span>
                    Manage admins
                  </Link>
                  <Link
                    href="/admin/dashboard/indexing"
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-admin-body hover:bg-admin-hover"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-100 text-blue-700">
                      <Radar className="h-4 w-4" />
                    </span>
                    Resubmit URLs to search engines
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
