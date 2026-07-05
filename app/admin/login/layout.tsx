import type { Metadata } from "next";

// The login page is a client component, so its tab title lives here.
export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
