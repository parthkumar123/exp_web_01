"use client";

import { signOut } from "next-auth/react";

/**
 * Admin session helper for client components.
 *
 * Route protection is handled server-side by `middleware.ts` (Auth.js session
 * cookie) — no client-side redirect logic is needed anymore. This hook only
 * exposes `logout`, keeping the API the admin pages already use.
 */
export function useAdminAuth() {
  const logout = () => {
    signOut({ redirectTo: "/admin/login" });
  };

  return { logout };
}
