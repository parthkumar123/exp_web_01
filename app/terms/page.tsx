import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageBackgroundImage from "@/components/PageBackgroundImage";
import { companyInfo } from "@/lib/companyData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Senso Agrotech",
  description:
    "Terms of Service for Senso Agrotech Private Limited. Read our terms governing use of our website and services.",
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
            Last updated: February 2025
          </p>
        </div>
      </section>

      <section className="pb-20 relative">
        <div className="max-w-3xl mx-auto px-8">
          <div className="rounded-2xl border border-slate-500/30 bg-gradient-to-br from-slate-700/90 to-emerald-900/40 p-8 md:p-12 space-y-8 text-slate-200 font-light leading-relaxed">
            <p>
              Welcome to the website of {companyInfo.fullName} (&quot;Senso
              Agrotech,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
              By accessing or using our website at sensoagrotech.com and related
              services, you agree to be bound by these Terms of Service. Please
              read them carefully.
            </p>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. Use of Website
              </h2>
              <p>
                This website provides information about our crop protection
                products, including insecticides, fungicides, herbicides, plant
                growth regulators, and biological solutions. The content is for
                general information only and does not constitute professional
                agricultural or legal advice. You may use the website only for
                lawful purposes and in accordance with these terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. Products and Information
              </h2>
              <p>
                Product descriptions, images, and technical information are
                subject to change. Always read the product label and follow
                local regulations before use. We are registered with CIB&amp;RC
                and comply with applicable Indian laws governing agrochemicals.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. Intellectual Property
              </h2>
              <p>
                All content on this website, including text, graphics, logos,
                and images, is the property of Senso Agrotech or its licensors
                and is protected by copyright and other intellectual property
                laws. You may not reproduce, distribute, or use our content
                without prior written permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, Senso Agrotech shall not
                be liable for any indirect, incidental, or consequential
                damages arising from your use of the website or reliance on its
                content. Use of our products must comply with label instructions
                and applicable law.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. Links to Third Parties
              </h2>
              <p>
                Our website may contain links to third-party sites. We are not
                responsible for the content or practices of those sites. Your
                use of third-party links is at your own risk.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                6. Governing Law
              </h2>
              <p>
                These terms are governed by the laws of India. Any disputes
                shall be subject to the exclusive jurisdiction of the courts of
                Gujarat, India.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                7. Changes
              </h2>
              <p>
                We may update these Terms of Service from time to time. The
                &quot;Last updated&quot; date at the top of this page will
                reflect any changes. Continued use of the website after changes
                constitutes acceptance of the revised terms.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-slate-100 font-medium">Contact</p>
              <p className="mt-2">
                For questions about these Terms of Service, please contact us at{" "}
                <a
                  href={`mailto:${companyInfo.contact.email}`}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {companyInfo.contact.email}
                </a>{" "}
                or visit our{" "}
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
