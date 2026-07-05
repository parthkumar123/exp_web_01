"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Client-side UX guard. Server-side protection is enforced by proxy.ts
// (Auth.js session cookie); this only avoids flashing protected content while
// the session resolves and redirects to login if somehow unauthenticated.
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-admin-bg">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-admin-primary border-t-transparent" />
          <p className="mt-4 text-sm text-admin-muted">Loading…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
