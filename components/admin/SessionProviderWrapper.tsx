"use client";

import { SessionProvider } from "next-auth/react";

/** Client boundary so the server admin layout can provide the Auth.js session
 *  context (useSession in AdminShell/AdminGuard) to the whole admin tree. */
export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
