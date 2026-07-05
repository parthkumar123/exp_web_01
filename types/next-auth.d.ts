import type { DefaultSession } from "next-auth";

// Augment Auth.js types so `session.user.id` / `session.user.role` are typed
// (set in the session/jwt callbacks in auth.ts).
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    adminId?: string;
    role?: string;
  }
}
