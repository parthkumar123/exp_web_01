import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

/**
 * Full Auth.js instance (Node runtime — route handler + server `auth()` calls).
 *
 * Access is restricted to Google accounts whose email already exists in the
 * `Admin` collection. The collection IS the allowlist: no Admin document ⇒ no
 * access. Admins live in the DB and are managed from /admin/admins (or
 * bootstrapped once with `npm run setup-admin`) — never hardcoded, so
 * granting/revoking access requires no redeploy.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig.callbacks,

    // Allowlist gate: only emails present in the Admin collection may sign in.
    async signIn({ user }) {
      const email = user.email?.toLowerCase();
      if (!email) return false;

      await connectDB();
      const admin = await Admin.findOne({ email });
      if (!admin) return false; // not on the allowlist → deny

      admin.lastLogin = new Date();
      if (!admin.name && user.name) admin.name = user.name;
      if (!admin.image && user.image) admin.image = user.image;
      await admin.save();
      return true;
    },

    // Persist the Mongo id + role onto the JWT on first sign-in.
    async jwt({ token, user }) {
      if (user?.email) {
        await connectDB();
        const admin = await Admin.findOne({ email: user.email.toLowerCase() });
        if (admin) {
          token.adminId = admin._id.toString();
          token.role = admin.role;
        }
      }
      return token;
    },

    // Expose id + role on the session object the app reads.
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.adminId as string) ?? "";
        session.user.role = (token.role as string) ?? "admin";
      }
      return session;
    },
  },
});
