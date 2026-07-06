import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { SITE_URL } from "@/lib/seo";

// Google Analytics 4 measurement id (e.g. "G-XXXXXXXXXX") and Google Search
// Console verification token. Both are injected only when the env var is set,
// so local/dev builds stay clean. See .env.example.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
// Microsoft Clarity project id (e.g. "xi1l9cjx71") — heatmaps + session
// recordings, surfaced via Bing Webmaster Tools. See .env.example.
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Child pages set bare titles ("Products", product names, …); the template
  // appends the brand once. Never hardcode "| Senso Agrotech" in a page title.
  title: {
    default: "Senso Agrotech - Protecting Crops, Empowering Farmers",
    template: "%s | Senso Agrotech",
  },
  description:
    "Manufacturing excellence in crop protection solutions. Premium Insecticides, Fungicides, Herbicides & Plant Growth Regulators. Registered with CIB&RC, committed to sustainable agriculture.",
  authors: [{ name: "Senso Agrotech Private Limited" }],
  creator: "Senso Agrotech Private Limited",
  publisher: "Senso Agrotech Private Limited",
  // Favicon / app icons are provided by the file-based app/favicon.ico,
  // app/icon.png and app/apple-icon.png (proper square assets).
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    title: "Senso Agrotech - Protecting Crops, Empowering Farmers",
    description:
      "Manufacturing excellence in crop protection solutions. Trusted by 25,000+ farmers nationwide.",
    siteName: "Senso Agrotech",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Senso Agrotech — Protecting Crops, Empowering Farmers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Senso Agrotech - Protecting Crops, Empowering Farmers",
    description:
      "Premium crop protection solutions. 150+ Products. 10+ Years Excellence.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
};

export const viewport: Viewport = {
  // emerald-950 — matches the site's dark theme (browser UI / PWA chrome).
  themeColor: "#022c22",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <FloatingWhatsApp />
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
})(window, document, "clarity", "script", "${CLARITY_ID}");`}
          </Script>
        )}
      </body>
    </html>
  );
}
