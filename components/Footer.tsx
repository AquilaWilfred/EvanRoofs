import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-roofGrey-800 text-roofGrey-200">
      {/* Main footer */}
      <div className="px-6 md:px-12 lg:px-24 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="mb-5">
            <span className="text-2xl font-heading font-bold text-white">
              Evan<span className="text-roofGreen-400">Roofs</span>
            </span>
            <p className="text-xs text-roofGrey-400 tracking-widest uppercase mt-1">Quality Above All</p>
          </div>
          <p className="text-sm leading-relaxed text-roofGrey-300 mb-6">
            Your trusted partner for professional roofing and interior design services. Building stronger, more beautiful spaces since 2010.
          </p>
          <div className="flex gap-3">
            <a
              href="https://wa.me/254790001776"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-roofGreen-600 rounded-full flex items-center justify-center hover:bg-roofGreen-500 transition-colors text-white text-sm font-bold"
              aria-label="WhatsApp"
            >
              W
            </a>
            <a
              href="tel:+254790001776"
              className="w-9 h-9 bg-brown-500 rounded-full flex items-center justify-center hover:bg-brown-400 transition-colors text-white text-sm font-bold"
              aria-label="Call us"
            >
              📞
            </a>
            <a
              href="mailto:info@evanroofs.com"
              className="w-9 h-9 bg-roofGrey-600 rounded-full flex items-center justify-center hover:bg-roofGrey-500 transition-colors text-white text-sm font-bold"
              aria-label="Email"
            >
              ✉
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-heading text-lg mb-5 pb-2 border-b border-roofGrey-600">Quick Links</h3>
          <ul className="space-y-3">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/services", label: "Our Services" },
              { href: "/our-work", label: "Our Work" },
              { href: "/gallery", label: "Gallery" },
              { href: "/testimonials", label: "Testimonials" },
              { href: "/blog", label: "Blog" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-link flex items-center gap-2 hover:gap-3 transition-all">
                  <span className="text-brown-400">›</span> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-heading text-lg mb-5 pb-2 border-b border-roofGrey-600">Our Services</h3>
          <ul className="space-y-3">
            {[
              "Roof Installation",
              "Roof Repair & Maintenance",
              "Roof Replacement",
              "Waterproofing",
              "Interior Design",
              "False Ceiling",
              "Wall Cladding",
              "Gutter Systems",
            ].map((service) => (
              <li key={service}>
                <Link href="/services" className="footer-link flex items-center gap-2 hover:gap-3 transition-all">
                  <span className="text-brown-400">›</span> {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-heading text-lg mb-5 pb-2 border-b border-roofGrey-600">Contact Us</h3>
          <ul className="space-y-4 text-sm text-roofGrey-300">
            <li className="flex gap-3">
              <span className="text-brown-400 mt-0.5">📍</span>
              <span>123 Roofing Lane, Nairobi, Kenya</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brown-400">📞</span>
              <a href="tel:+254700000000" className="hover:text-white transition-colors">+254 790 001 776</a>
            </li>
            <li className="flex gap-3">
              <span className="text-brown-400">💬</span>
              <a href="https://wa.me/254790001776" className="hover:text-white transition-colors">WhatsApp Us</a>
            </li>
            <li className="flex gap-3">
              <span className="text-brown-400">✉️</span>
              <a href="mailto:info@evanroofs.com" className="hover:text-white transition-colors">info@evanroofs.com</a>
            </li>
            <li className="flex gap-3">
              <span className="text-brown-400">🕒</span>
              <span>Mon – Sat: 7:00 AM – 6:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-roofGrey-700 px-6 md:px-12 lg:px-24 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-roofGrey-500">
        <p>© {new Date().getFullYear()} EvanRoofs. All rights reserved.</p>
        <p>Built with quality craftsmanship in mind.</p>
      </div>
    </footer>
  );
}
