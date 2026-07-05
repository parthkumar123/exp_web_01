"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

function LoginContent() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  // Auth.js redirects back here with ?error=… when the sign-in callback denies
  // access (email not on the allowlist) or the OAuth flow fails.
  const error = searchParams.get("error");
  const errorMessage = error
    ? error === "AccessDenied"
      ? "This Google account isn't authorized. Ask a site administrator to add your email."
      : "Something went wrong while signing you in. Please try again."
    : null;

  const handleGoogleSignIn = () => {
    setLoading(true);
    signIn("google", { redirectTo: "/admin/dashboard" });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-admin-bg px-4">
      {/* Subtle brand tint behind the card — unmistakably Senso, still calm. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 320px at 50% 30%, rgba(6, 95, 70, 0.07), transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-sm">
          {/* Thin emerald brand bar */}
          <div className="h-1 w-full bg-admin-primary" />

          <div className="p-8">
            <div className="mb-8 text-center">
              <Image
                src="/logo.png"
                alt="Senso Agrotech"
                width={56}
                height={56}
                className="mx-auto mb-4 h-14 w-14 rounded-xl object-contain"
                priority
              />
              <h1 className="text-xl font-semibold text-admin-ink">
                Sign in to Senso Admin Console
              </h1>
              <p className="mt-1 text-sm text-admin-muted">Authorized accounts only.</p>
            </div>

            {errorMessage && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-admin-border bg-white px-6 py-2.5 text-sm font-medium text-admin-ink transition-colors hover:bg-admin-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                />
              </svg>
              {loading ? "Redirecting…" : "Continue with Google"}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-admin-faint">
          © {new Date().getFullYear()} Senso Agrotech Private Limited
        </p>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
