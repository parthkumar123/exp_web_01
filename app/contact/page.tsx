import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-emerald-900/30 to-zinc-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-radial from-emerald-500/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-8 text-center relative z-10">
          <div className="inline-block px-6 py-2 mb-8 backdrop-blur-xl bg-emerald-500/20 border border-emerald-500/40 rounded-full">
            <span className="text-sm font-medium text-emerald-300 tracking-[0.2em] uppercase">
              Contact Us
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extralight text-white mb-6 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-light">
            We&apos;re here to help. Reach out to us through any of the
            following channels
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Contact Info Cards */}

            {/* Visit Us */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 hover:border-emerald-400/50 hover:bg-gradient-to-br hover:from-white/15 hover:to-emerald-500/15 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 backdrop-blur-xl rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-emerald-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-4">Visit Us</h3>
              <p className="text-white/75 leading-relaxed font-light">
                Plot No. J-7832, GIDC Ind. Estate, Ankleshwar,
                <br />
                Gujarat, India - 380001
              </p>
            </div>

            {/* Call Us */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 hover:border-emerald-400/50 hover:bg-gradient-to-br hover:from-white/15 hover:to-emerald-500/15 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-600/20 to-amber-800/20 backdrop-blur-xl rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-amber-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-4">Call Us</h3>
              <div className="space-y-2 text-white/75 font-light">
                <p>
                  <a
                    href="tel:+916354914468"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    +91 63549 14468
                  </a>
                </p>
              </div>
            </div>

            {/* Email Us */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 hover:border-emerald-400/50 hover:bg-gradient-to-br hover:from-white/15 hover:to-emerald-500/15 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-xl rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-blue-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-4">Email Us</h3>
              <div className="space-y-2 text-white/75 font-light">
                <p>
                  <a
                    href="mailto:sensoagrotech2909@gmail.com"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    sensoagrotech2909@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 hover:border-emerald-400/50 hover:bg-gradient-to-br hover:from-white/15 hover:to-emerald-500/15 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-700/20 to-emerald-900/20 backdrop-blur-xl rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-emerald-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-white/75 font-light">
                <p>Monday - Saturday</p>
                <p className="font-normal text-white/80">9:00 AM - 6:00 PM</p>
                <p className="text-red-400 font-normal">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 mb-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full">
              <span className="text-xs font-medium text-white/70 tracking-[0.2em] uppercase">
                Location
              </span>
            </div>
            <h2 className="text-5xl font-extralight text-white mb-4 tracking-tight">
              Find Us on Map
            </h2>
            <p className="text-white/60 font-light">
              Visit our office and manufacturing facility
            </p>
          </div>

          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/5 to-emerald-500/5 border border-white/10 rounded-3xl overflow-hidden">
            <div className="aspect-[16/9] flex items-center justify-center">
              <div className="text-center p-12">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-emerald-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-white mb-2">
                  Google Maps Integration
                </h3>
                <p className="text-white/60 mb-6 font-light">
                  Plot No. J-7832, GIDC Ind. Estate Ankleshwar, Gujarat 393002
                </p>
                <a
                  href="https://maps.app.goo.gl/nyyQ5grTsXvgb4bT7?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 text-emerald-300 font-medium rounded-lg hover:bg-emerald-500/30 transition-colors duration-300"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
