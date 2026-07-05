import { auth } from "@/auth";

export interface SessionUser {
  id: string;
  email: string;
  role: string;
  name?: string | null;
}

/**
 * Server-side session accessor used by protected API routes
 * (/api/products writes, /api/upload, /api/admin/admins).
 * Returns null when there is no authenticated admin.
 */
export async function getSession(): Promise<SessionUser | null> {
  const session = await auth();
  if (!session?.user?.email) return null;

  return {
    id: session.user.id,
    email: session.user.email,
    role: session.user.role,
    name: session.user.name,
  };
}
