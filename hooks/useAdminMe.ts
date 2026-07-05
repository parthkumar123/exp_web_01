"use client";

import { useCallback, useEffect, useState } from "react";

export interface AdminMe {
  _id: string;
  email: string;
  role: "admin" | "superadmin";
  name?: string;
  image?: string;
  lastLogin?: string;
  createdAt?: string;
}

/**
 * The signed-in admin's own DB record (source of truth for the editable
 * display name — the JWT session only carries the Google-token values).
 */
export function useAdminMe() {
  const [me, setMe] = useState<AdminMe | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/me");
      const data = await res.json();
      if (data.success) setMe(data.admin);
    } catch {
      // Non-fatal — callers fall back to the session values.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/me");
        const data = await res.json();
        if (!cancelled && data.success) setMe(data.admin);
      } catch {
        // Non-fatal — callers fall back to the session values.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { me, loading, refresh, setMe };
}
