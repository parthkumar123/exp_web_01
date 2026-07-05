import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Route protection for /admin/* (Next 16 "proxy" convention — the successor
// to middleware.ts). Uses the edge-safe Auth.js config only (no Mongoose);
// the `authorized` callback in auth.config.ts decides access.
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  // SCOPE: admin only. The public site (home, products, sitemap, robots…)
  // is never touched by this proxy. /api/auth/* is intentionally excluded
  // so the Google OAuth handshake works.
  matcher: ["/admin/:path*"],
};
