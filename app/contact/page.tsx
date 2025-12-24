"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-emerald-950/20 to-zinc-950">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-8 text-center relative z-10">
          <div className="inline-block px-6 py-2 mb-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full">
            <span className="text-sm font-medium text-white/70 tracking-[0.2em] uppercase">
              Contact Us
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extralight text-white mb-6 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto font-light">
            Get in touch with us for any inquiries about our products or
            services
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {/* Visit Us */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-white/5 to-emerald-500/5 border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-all">
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
                <p className="text-white/60 leading-relaxed font-light">
                  Plot No. 123, Industrial Area,
                  <br />
                  Gujarat, India - 380001
                </p>
              </div>

              {/* Call Us */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-white/5 to-emerald-500/5 border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-all">
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
                <div className="space-y-2 text-white/60 font-light">
                  <p>
                    <a
                      href="tel:+919876543210"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </p>
                  <p>
                    <a
                      href="tel:+919876543211"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      +91 98765 43211
                    </a>
                  </p>
                </div>
              </div>

              {/* Email Us */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-white/5 to-emerald-500/5 border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-red-600/20 to-red-800/20 backdrop-blur-xl rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-7 h-7 text-red-400"
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
                <div className="space-y-2 text-white/60 font-light">
                  <p>
                    <a
                      href="mailto:info@sensoagrotech.com"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      info@sensoagrotech.com
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:sales@sensoagrotech.com"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      sales@sensoagrotech.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-white/5 to-emerald-500/5 border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-all">
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
                <div className="space-y-2 text-white/60 font-light">
                  <p>Monday - Saturday</p>
                  <p className="font-normal text-white/80">9:00 AM - 6:00 PM</p>
                  <p className="text-red-400 font-normal">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="backdrop-blur-2xl bg-gradient-to-br from-white/5 to-emerald-500/5 border border-white/10 rounded-3xl p-8 md:p-12">
                <h2 className="text-4xl font-extralight text-white mb-8 tracking-tight">
                  Send us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-white/40"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-white/40"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-white/40"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Subject <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="product">Product Inquiry</option>
                        <option value="quote">Request Quote</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      required
                      rows={6}
                      className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-white placeholder-white/40"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </button>
                </form>
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
                  Plot No. 123, Industrial Area, Gujarat, India - 380001
                </p>
                <button className="px-8 py-3 bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 text-emerald-300 font-medium rounded-lg hover:bg-emerald-500/30 transition-colors duration-300">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
