"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/our-work", label: "Our Work" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-roofGrey-100">
      {/* Top bar */}
      <div className="bg-brown-500 text-white text-sm py-2 px-6 md:px-12 lg:px-24 flex flex-col sm:flex-row justify-between items-center gap-1">
        <span className="tracking-wide">📞 Call or WhatsApp: +254 790 001 776</span>
        <span>✉️ info@evanroofs.com</span>
      </div>

      {/* Main nav */}
      <nav className="bg-white px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brown-500 rounded flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
              <path d="M3 12L12 3l9 9H3z" />
              <rect x="5" y="12" width="14" height="9" fill="white" opacity="0.9" />
              <rect x="5" y="12" width="14" height="9" fill="#8B4513" opacity="0.3" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-heading font-bold text-brown-500 tracking-wide">
              Evan<span className="text-roofGreen-500">Roofs</span>
            </span>
            <p className="text-xs text-roofGrey-400 tracking-widest uppercase">
              Quality Above All
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="nav-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <Link href="/contact" className="hidden lg:block btn-primary text-xs">
          Get Free Quote
        </Link>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 cursor-pointer p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-roofGrey-700 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`w-6 h-0.5 bg-roofGrey-700 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-6 h-0.5 bg-roofGrey-700 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-roofGrey-100 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link block py-2 border-b border-roofGrey-50"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="btn-primary block text-center mt-2" onClick={() => setIsOpen(false)}>
                Get Free Quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
