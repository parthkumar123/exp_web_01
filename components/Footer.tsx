"use client";

import { useState } from "react";

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: "#",
    },
    {
      name: "Twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      url: "#",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      url: "#",
    },
  ];

  const quickLinks = [
    { name: "About Us", url: "#" },
    { name: "Our Products", url: "#" },
    { name: "Contact Us", url: "#" },
  ];

  const productCategories = [
    { name: "Insecticides", url: "#" },
    { name: "Fungicides", url: "#" },
    { name: "Herbicides", url: "#" },
    { name: "Plant Growth Regulators", url: "#" },
  ];

  return (
    <footer className="relative z-10 bg-gradient-to-b from-emerald-950/40 via-emerald-950/60 to-emerald-950/80 backdrop-blur-xl border-t border-emerald-500/10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Senso Agrotech"
                className="h-[77px] w-auto object-contain"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Manufacturing excellence in crop protection solutions. Registered
              with CIB&RC, committed to sustainable agriculture.
            </p>
            <div className="flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-emerald-500/10 border border-emerald-500/20 rounded-full inline-flex">
              <svg
                className="w-4 h-4 text-emerald-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-emerald-300 font-medium">
                Registered with CIB&RC
              </span>
            </div>
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/30 flex items-center justify-center text-white/60 hover:text-emerald-400 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="text-white/60 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span
                      className={`w-1 h-1 rounded-full bg-emerald-400 transition-all duration-300 ${
                        hoveredLink === link.name ? "w-6" : "group-hover:w-3"
                      }`}
                    />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              Product Categories
            </h4>
            <ul className="space-y-3">
              {productCategories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.url}
                    onMouseEnter={() => setHoveredLink(category.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="text-white/60 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span
                      className={`w-1 h-1 rounded-full bg-emerald-400 transition-all duration-300 ${
                        hoveredLink === category.name
                          ? "w-6"
                          : "group-hover:w-3"
                      }`}
                    />
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <svg
                  className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5"
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
                <div className="text-white/60">
                  <p>J27W+397, Ankleshwar GIDC</p>
                  <p>Ankleshwar, Gujarat 393002</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <svg
                  className="w-5 h-5 text-emerald-400 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href="tel:+916354914468"
                  className="text-white/60 hover:text-emerald-400 transition-colors duration-300"
                >
                  +91 63549 14468
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <svg
                  className="w-5 h-5 text-emerald-400 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <div className="text-white/60">
                  <span className="text-xs text-emerald-400">
                    Customer Care
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <svg
                  className="w-5 h-5 text-emerald-400 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:info@sensoagrotech.com"
                  className="text-white/60 hover:text-emerald-400 transition-colors duration-300"
                >
                  info@sensoagrotech.com
                </a>
              </li>
            </ul>

            {/* GSTIN Badge */}
            <div className="mt-6 space-y-2">
              <div className="px-3 py-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg inline-block">
                <p className="text-xs text-white/50 mb-1">GSTIN:</p>
                <p className="text-xs text-white/80 font-mono">[To be added]</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              © {currentYear} Senso Agrotech Private Limited. All rights
              reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/50">
              <a
                href="#"
                className="hover:text-emerald-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-emerald-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-emerald-400 transition-colors duration-300"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      </div>
    </footer>
  );
}
