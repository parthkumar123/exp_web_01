import type { Metadata } from "next";
import SessionProviderWrapper from "@/components/admin/SessionProviderWrapper";

// Keep all /admin routes out of search engine indexes, and give the console
// its own tab title instead of inheriting the marketing site's template.
// Admin pages are client components, so per-page titles are set at runtime
// by AdminShell (document.title from the active breadcrumb).
export const metadata: Metadata = {
  title: {
    absolute: "Senso Console",
    template: "%s · Senso Console",
  },
  robots: { index: false, follow: false },
};

// The `.admin-ui` wrapper switches the tree to the light Senso Console theme
// (globals.css) — the public site's dark styling never leaks in here.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProviderWrapper>
      <div className="admin-ui">{children}</div>
    </SessionProviderWrapper>
  );
}
