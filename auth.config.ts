import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

/**
 * Edge-safe Auth.js config.
 *
 * This file MUST stay free of Node-only code (Mongoose, fs, …) because it is
 * imported by `middleware.ts`, which runs on the Edge runtime. The allowlist
 * DB lookup lives in the full config (`auth.ts`), which runs only in the
 * Node-runtime route handler.
 *
 * Provider credentials are read automatically from the environment:
 *   AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_SECRET
 */
export const authConfig = {
  providers: [Google],
  pages: {
    // Send unauthenticated users AND auth errors (e.g. AccessDenied for an
    // email not on the allowlist) to our branded admin login instead of the
    // default unstyled Auth.js pages. The login page reads ?error to show the
    // right message.
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    /**
     * Runs in middleware for every matched /admin/* request. Token presence
     * only — NO database access (Edge runtime). The allowlist is enforced in
     * the `signIn` callback in auth.ts at login time.
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      const isOnLogin = nextUrl.pathname.startsWith("/admin/login");

      if (isOnLogin) {
        // Already signed in → bounce away from the login page.
        if (isLoggedIn) {
          return Response.redirect(new URL("/admin/dashboard", nextUrl));
        }
        return true;
      }

      // Any other /admin/* path requires a session; returning false makes
      // Auth.js redirect to the configured signIn page.
      return isLoggedIn;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
