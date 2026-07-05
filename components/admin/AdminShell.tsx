"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Blocks,
  LayoutDashboard,
  Package,
  PlusSquare,
  Users,
  Radar,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronsUpDown,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { useAdminMe } from "@/hooks/useAdminMe";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: (pathname: string) => boolean;
}

const NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    isActive: (p) => p === "/admin/dashboard",
  },
  {
    label: "Products",
    href: "/admin/dashboard/products",
    icon: Package,
    isActive: (p) =>
      p.startsWith("/admin/dashboard/products") &&
      !p.startsWith("/admin/dashboard/products/new"),
  },
  {
    label: "New Product",
    href: "/admin/dashboard/products/new",
    icon: PlusSquare,
    isActive: (p) => p.startsWith("/admin/dashboard/products/new"),
  },
  {
    label: "Admins",
    href: "/admin/dashboard/admins",
    icon: Users,
    isActive: (p) => p.startsWith("/admin/dashboard/admins"),
  },
  {
    label: "Indexing",
    href: "/admin/dashboard/indexing",
    icon: Radar,
    isActive: (p) => p.startsWith("/admin/dashboard/indexing"),
  },
  {
    label: "Apps",
    href: "/admin/dashboard/apps",
    icon: Blocks,
    isActive: (p) => p.startsWith("/admin/dashboard/apps"),
  },
];

interface Crumb {
  label: string;
  href?: string;
}

function buildCrumbs(pathname: string): Crumb[] {
  const root: Crumb = { label: "Console", href: "/admin/dashboard" };
  const products: Crumb = { label: "Products", href: "/admin/dashboard/products" };

  if (pathname === "/admin/dashboard") return [root, { label: "Dashboard" }];
  if (pathname.startsWith("/admin/dashboard/products/new"))
    return [root, products, { label: "New Product" }];
  if (pathname.startsWith("/admin/dashboard/products/edit"))
    return [root, products, { label: "Edit Product" }];
  if (pathname.startsWith("/admin/dashboard/products")) return [root, { label: "Products" }];
  if (pathname.startsWith("/admin/dashboard/apps/cloudinary"))
    return [root, { label: "Apps", href: "/admin/dashboard/apps" }, { label: "Cloudinary" }];

  const map: Record<string, string> = {
    "/admin/dashboard/admins": "Admins",
    "/admin/dashboard/indexing": "Indexing",
    "/admin/dashboard/apps": "Apps",
    "/admin/dashboard/profile": "Profile",
  };
  for (const [path, label] of Object.entries(map)) {
    if (pathname.startsWith(path)) return [root, { label }];
  }
  return [root];
}

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {NAV.map(({ label, href, icon: Icon, isActive }) => {
        const active = isActive(pathname);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-admin-primary text-white"
                : "text-admin-body hover:bg-admin-hover"
            )}
          >
            <Icon className="h-[18px] w-[18px]" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <Link href="/admin/dashboard" className="flex items-center gap-2.5 px-5 py-4">
      <Image
        src="/logo.png"
        alt="Senso Agrotech"
        width={32}
        height={32}
        className="h-8 w-8 rounded-md object-contain"
      />
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-admin-ink">Senso Agrotech</span>
        <span className="block text-[11px] font-medium uppercase tracking-wider text-admin-faint">
          Console
        </span>
      </span>
    </Link>
  );
}

function SidebarFooter({
  user,
  onNavigate,
}: {
  user?: { name?: string | null; email?: string | null; image?: string | null };
  onNavigate?: () => void;
}) {
  return (
    <div className="border-t border-admin-border p-3">
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-admin-body hover:bg-admin-hover"
      >
        <ExternalLink className="h-[18px] w-[18px]" />
        View site
      </Link>

      <div className="mt-3 border-t border-admin-border pt-3">
        <UserMenu user={user} onNavigate={onNavigate} />
      </div>
    </div>
  );
}

function UserMenu({
  user,
  onNavigate,
}: {
  user?: { name?: string | null; email?: string | null; image?: string | null };
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const initial = (user?.name || user?.email || "?").charAt(0).toUpperCase();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const avatar = user?.image ? (
    // no-referrer: Google's avatar CDN rejects some hotlink requests that
    // carry a Referer header (intermittent 403s), so never send one.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={user.image}
      alt=""
      referrerPolicy="no-referrer"
      className="h-8 w-8 rounded-full object-cover"
    />
  ) : (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-admin-primary text-xs font-semibold text-white">
      {initial}
    </span>
  );

  return (
    <div ref={ref} className="relative">
      {/* Dropdown — opens upward (chip sits at the bottom of the sidebar) */}
      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-lg border border-admin-border bg-admin-surface p-1 shadow-lg">
          <Link
            href="/admin/dashboard/profile"
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-admin-body hover:bg-admin-hover"
          >
            <UserRound className="h-[18px] w-[18px]" />
            Profile
          </Link>
          <button
            onClick={() => signOut({ redirectTo: "/admin/login" })}
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-admin-body hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Sign out
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors",
          open ? "bg-admin-hover" : "hover:bg-admin-hover"
        )}
      >
        {avatar}
        <span className="min-w-0 flex-1 text-left leading-tight">
          <span className="block truncate text-[13px] font-medium text-admin-ink">
            {user?.name || "Account"}
          </span>
          <span className="block truncate text-[11px] text-admin-faint">{user?.email}</span>
        </span>
        <ChevronsUpDown className="h-4 w-4 flex-shrink-0 text-admin-faint" />
      </button>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { me } = useAdminMe();
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Prefer the editable DB profile (name set on /profile) over Google-token values.
  const user = {
    name: me?.name ?? session?.user?.name,
    email: me?.email ?? session?.user?.email,
    image: me?.image ?? session?.user?.image,
  };
  const crumbs = buildCrumbs(pathname);

  // Client-side pages can't export Next.js metadata, so the tab title follows
  // the active breadcrumb: "Products · Senso Console", "Edit Product · …", etc.
  useEffect(() => {
    const trail = buildCrumbs(pathname);
    const page = trail[trail.length - 1]?.label;
    document.title =
      page && page !== "Console" ? `${page} · Senso Console` : "Senso Console";
  }, [pathname]);

  return (
    <div className="min-h-screen antialiased">
      {/* Sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-admin-border bg-admin-surface lg:flex">
        <Brand />
        <div className="mt-1 flex-1 overflow-y-auto">
          <NavLinks pathname={pathname} />
        </div>
        <SidebarFooter user={user ?? undefined} />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-60 flex-col bg-admin-surface shadow-xl">
            <div className="flex items-center justify-between pr-3">
              <Brand />
              <button
                onClick={() => setDrawerOpen(false)}
                className="rounded-md p-1.5 text-admin-muted hover:bg-admin-hover"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-1 flex-1 overflow-y-auto">
              <NavLinks pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
            </div>
            <SidebarFooter user={user ?? undefined} onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="lg:pl-60">
        {/* Topbar — breadcrumbs */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-admin-border bg-admin-surface/90 px-4 backdrop-blur sm:px-6">
          <button
            onClick={() => setDrawerOpen(true)}
            className="rounded-md p-1.5 text-admin-muted hover:bg-admin-hover lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <nav className="flex min-w-0 items-center gap-1.5 text-sm" aria-label="Breadcrumb">
            {crumbs.map((c, i) => {
              const last = i === crumbs.length - 1;
              return (
                <span key={`${c.label}-${i}`} className="flex min-w-0 items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-admin-faint" />
                  )}
                  {c.href && !last ? (
                    <Link
                      href={c.href}
                      className="truncate text-admin-muted hover:text-admin-primary"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span
                      className={cn(
                        "truncate",
                        last ? "font-medium text-admin-ink" : "text-admin-muted"
                      )}
                    >
                      {c.label}
                    </span>
                  )}
                </span>
              );
            })}
          </nav>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
