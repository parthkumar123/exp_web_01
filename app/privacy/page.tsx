import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageBackgroundImage from "@/components/PageBackgroundImage";
import { companyInfo } from "@/lib/companyData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Senso Agrotech",
  description:
    "Privacy Policy for Senso Agrotech Private Limited. Learn how we collect, use, and protect your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen relative">
      <PageBackgroundImage imageOpacity={0.18} />
      <div className="relative z-10">
      <Navigation />

      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-radial from-emerald-500/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-8 text-center relative z-10">
          <div className="inline-block px-6 py-2 mb-8 backdrop-blur-xl bg-emerald-500/20 border border-emerald-500/40 rounded-full">
            <span className="text-sm font-medium text-emerald-300 tracking-[0.2em] uppercase">
              Legal
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
            Last updated: February 2025
          </p>
        </div>
      </section>

      <section className="pb-20 relative">
        <div className="max-w-3xl mx-auto px-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 md:p-12 space-y-8 text-slate-200 font-light leading-relaxed">
            <p>
              {companyInfo.fullName} (&quot;Senso Agrotech,&quot; &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;) is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website sensoagrotech.com or interact with us.
            </p>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. Information We Collect
              </h2>
              <p className="mb-3">
                We may collect information that you provide directly, such as:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Name, email address, and phone number when you contact us</li>
                <li>Company or organisation name and address</li>
                <li>Messages and inquiries you send via contact forms, email, or WhatsApp</li>
              </ul>
              <p className="mt-3">
                We may also automatically collect certain technical information
                when you visit our website, such as IP address, browser type,
                device type, and pages visited, for analytics and to improve our
                services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. How We Use Your Information
              </h2>
              <p>
                We use the information we collect to respond to your
                inquiries, provide product information and support, improve our
                website and services, comply with legal obligations, and
                communicate with you about our products and company updates
                where you have consented or where permitted by law.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. Sharing of Information
              </h2>
              <p>
                We do not sell your personal information. We may share your
                information with service providers who assist us in operating
                our website and business (e.g., hosting, analytics), subject to
                confidentiality obligations. We may also disclose information
                where required by law or to protect our rights and safety.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. Data Security
              </h2>
              <p>
                We implement appropriate technical and organisational measures
                to protect your personal information against unauthorised
                access, alteration, disclosure, or destruction. However, no
                method of transmission over the Internet is completely secure.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. Cookies and Similar Technologies
              </h2>
              <p>
                Our website may use cookies and similar technologies to enhance
                your experience, analyse usage, and remember preferences. You
                can control cookie settings through your browser. Disabling
                cookies may affect certain features of the website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                6. Your Rights
              </h2>
              <p>
                Depending on applicable law, you may have the right to access,
                correct, or delete your personal information, or to object to or
                restrict certain processing. To exercise these rights or ask
                questions about your data, please contact us using the details
                below.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                7. Retention
              </h2>
              <p>
                We retain your personal information only for as long as
                necessary to fulfil the purposes described in this policy or as
                required by law.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                8. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. The
                &quot;Last updated&quot; date at the top will reflect any
                changes. We encourage you to review this page periodically.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-slate-100 font-medium">Contact Us</p>
              <p className="mt-2">
                For privacy-related questions or requests, please contact us at{" "}
                <a
                  href={`mailto:${companyInfo.contact.email}`}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {companyInfo.contact.email}
                </a>
                , or write to us at {companyInfo.contact.address.full}. You can
                also visit our{" "}
                <a
                  href="/contact"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Contact
                </a>{" "}
                page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
}
