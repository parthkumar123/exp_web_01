"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Navigation from "@/components/Navigation";

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
    signIn("google", { redirectTo: "/admin" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-emerald-900/30 to-zinc-900">
      <Navigation />

      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full">
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-emerald-500/20 rounded-full mb-4">
                <svg
                  className="w-12 h-12 text-emerald-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-light text-white mb-2">
                Admin Login
              </h1>
              <p className="text-white/60">
                Sign in with an authorized Google account
              </p>
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {errorMessage}
              </div>
            )}

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-zinc-800 font-semibold rounded-lg hover:bg-zinc-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
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
