"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";

// GDPR consent gate for analytics. GA4 and Microsoft Clarity load ONLY after
// the visitor accepts — required because the site targets EU/UK B2B buyers and
// Clarity's session recording counts as "monitoring" under GDPR. The choice is
// remembered in localStorage; "denied" is never nagged again.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

const CONSENT_KEY = "analytics-consent";
const CONSENT_EVENT = "analytics-consent-change";

type Consent = "granted" | "denied" | "unset";

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}

function getSnapshot(): Consent {
  const stored = localStorage.getItem(CONSENT_KEY);
  return stored === "granted" || stored === "denied" ? stored : "unset";
}

// Server render (and first hydration pass) shows nothing; the real value
// kicks in client-side, so static/ISR pages never mismatch.
function getServerSnapshot(): Consent | "loading" {
  return "loading";
}

export default function CookieConsent() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Internal console — no banner, and admin traffic stays out of analytics.
  if (pathname.startsWith("/admin")) return null;

  const decide = (value: Consent) => {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  return (
    <>
      {consent === "unset" && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-4 left-4 right-24 z-50 max-w-md rounded-2xl border border-white/10 bg-zinc-900/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-auto"
        >
          <p className="text-sm font-light leading-relaxed text-slate-200">
            We use Google Analytics and Microsoft Clarity to understand how
            visitors use our website and to improve our products and services.
            See our{" "}
            <Link
              href="/privacy"
              className="text-emerald-400 underline-offset-2 transition-colors hover:text-emerald-300 hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => decide("granted")}
              className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              Accept
            </button>
            <button
              onClick={() => decide("denied")}
              className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Decline
            </button>
          </div>
        </div>
      )}

      {consent === "granted" && (
        <>
          {GA_ID && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
              />
              <Script id="ga4-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
              </Script>
            </>
          )}
          {CLARITY_ID && (
            <Script id="clarity-init" strategy="afterInteractive">
              {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_ID}");
window.clarity('consent');`}
            </Script>
          )}
        </>
      )}
    </>
  );
}
