import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EvanRoofs | Expert Roofing & Interior Design Services",
  description:
    "EvanRoofs delivers premium roofing installation, repair, and interior design services. Get a free quote today and experience the EvanRoofs difference.",
};

const services = [
  {
    icon: "🏠",
    title: "Roof Installation",
    desc: "New construction or full replacement — we install durable, weather-resistant roofing systems built to last decades.",
    color: "border-brown-500",
  },
  {
    icon: "🔧",
    title: "Roof Repair",
    desc: "Leaks, damaged tiles, sagging gutters — our expert team diagnoses and fixes all roofing issues quickly and reliably.",
    color: "border-roofGreen-500",
  },
  {
    icon: "💧",
    title: "Waterproofing",
    desc: "Protect your home from moisture damage with our professional waterproofing solutions for roofs, basements, and walls.",
    color: "border-roofRed-500",
  },
  {
    icon: "🎨",
    title: "Interior Design",
    desc: "Transform your interiors with our design expertise — from false ceilings to wall finishes and space planning.",
    color: "border-roofGrey-500",
  },
];

const stats = [
  { number: "500+", label: "Projects Completed" },
  { number: "14+", label: "Years Experience" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "50+", label: "Expert Team Members" },
];

const testimonials = [
  {
    name: "James Mwangi",
    role: "Homeowner, Nairobi",
    quote:
      "EvanRoofs transformed our home completely. The team was professional, on time, and the quality of work exceeded our expectations. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sarah Kamau",
    role: "Property Developer",
    quote:
      "We've worked with EvanRoofs on three commercial projects. Their consistency, reliability, and workmanship are unmatched in the industry.",
    rating: 5,
  },
  {
    name: "David Otieno",
    role: "Business Owner",
    quote:
      "Fast response, fair pricing, and excellent results. My warehouse roof was repaired within 48 hours of first contact. Outstanding service!",
    rating: 5,
  },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1f1f1f 0%, #333333 40%, #4a2209 100%)",
        }}
      >
        {/* Decorative roof shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute border-brown-400"
              style={{
                width: `${200 + i * 80}px`,
                height: `${200 + i * 80}px`,
                borderBottom: "3px solid #c08040",
                borderLeft: "3px solid #c08040",
                borderRight: "3px solid #c08040",
                bottom: `-${100 + i * 40}px`,
                left: `${i * 15}%`,
                transform: "rotate(0deg)",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 md:px-12 max-w-5xl mx-auto">
          <p className="text-brown-300 text-sm tracking-[0.3em] uppercase mb-6 font-medium">
            Professional Roofing & Interior Design
          </p>
          <h1 className="text-white font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            Building Roofs That{" "}
            <span className="text-brown-300">Protect</span> &{" "}
            <span className="text-roofGreen-400">Inspire</span>
          </h1>
          <p className="text-roofGrey-300 text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
            EvanRoofs is your trusted partner for premium roofing solutions and
            elegant interior designs. We bring craftsmanship, quality materials,
            and decades of expertise to every project — big or small.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-10 py-4">
              Get a Free Quote
            </Link>
            <Link href="/our-work" className="btn-secondary text-base px-10 py-4 border-white text-white hover:bg-white hover:text-roofGrey-800">
              View Our Work
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-roofGrey-400 text-xs tracking-widest uppercase">
          <span>Scroll</span>
          <div className="w-px h-8 bg-roofGrey-500 animate-pulse" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-brown-500 py-14 px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-white text-4xl md:text-5xl font-heading font-bold mb-2">
                {stat.number}
              </p>
              <p className="text-brown-200 text-sm tracking-wider uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="section-padding roof-pattern bg-roofGrey-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="title-line" />
            <h2 className="section-title">What We Do</h2>
            <p className="section-subtitle">
              From a single roof repair to a complete interior transformation,
              EvanRoofs handles every project with precision and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s) => (
              <div
                key={s.title}
                className={`card border-t-4 ${s.color} p-8`}
              >
                <div className="text-4xl mb-5">{s.icon}</div>
                <h3 className="text-xl font-heading font-bold text-roofGrey-800 mb-4">
                  {s.title}
                </h3>
                <p className="text-roofGrey-500 leading-relaxed text-sm">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-primary">
              All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <div className="title-line" />
            <h2 className="section-title">Why Choose EvanRoofs?</h2>
            <p className="text-roofGrey-500 leading-relaxed mb-8">
              We are more than a roofing company. We are a team of dedicated
              professionals who take pride in delivering lasting solutions that
              protect your investment and enhance your space.
            </p>
            <ul className="space-y-5">
              {[
                {
                  icon: "✅",
                  title: "Licensed & Insured",
                  desc: "Full compliance with local building codes and regulations.",
                },
                {
                  icon: "⏱️",
                  title: "On-Time Delivery",
                  desc: "We respect your schedule and complete projects on time.",
                },
                {
                  icon: "🛡️",
                  title: "Quality Guarantee",
                  desc: "All our work comes with a comprehensive warranty.",
                },
                {
                  icon: "💰",
                  title: "Competitive Pricing",
                  desc: "Premium quality at fair, transparent prices — no hidden costs.",
                },
                {
                  icon: "🌱",
                  title: "Eco-Friendly Materials",
                  desc: "Sustainable material options available for the environmentally conscious.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4 items-start">
                  <span className="text-2xl mt-0.5">{item.icon}</span>
                  <div>
                    <h4 className="font-heading font-bold text-roofGrey-800 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-roofGrey-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual panel */}
          <div className="relative">
            <div
              className="rounded-xl h-96 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #8B4513 0%, #5c2b0b 50%, #2d6a2d 100%)",
              }}
            >
              <div className="text-center text-white p-8">
                <div className="text-7xl mb-6">🏗️</div>
                <h3 className="text-2xl font-heading font-bold mb-3">
                  14+ Years of Excellence
                </h3>
                <p className="text-brown-100 leading-relaxed">
                  Serving homes and businesses across the region with
                  uncompromising quality and integrity.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-roofRed-500 rounded-xl flex items-center justify-center text-white font-heading text-center text-sm font-bold p-3">
              Free<br />Quote
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS PREVIEW ── */}
      <section className="section-padding bg-roofGrey-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="w-16 h-1 bg-brown-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-roofGrey-300 text-lg max-w-2xl mx-auto">
              Don&apos;t take our word for it — hear from the people we&apos;ve served.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-roofGrey-700 rounded-xl p-8 hover:bg-roofGrey-600 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-brown-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-roofGrey-200 leading-relaxed mb-6 italic text-sm">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-roofGrey-600 pt-4">
                  <p className="text-white font-heading font-bold">{t.name}</p>
                  <p className="text-roofGrey-400 text-xs mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/testimonials" className="btn-secondary border-white text-white hover:bg-white hover:text-roofGrey-800">
              Read More Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="title-line" />
              <h2 className="section-title">From Our Gallery</h2>
              <p className="text-roofGrey-500 max-w-xl leading-relaxed">
                A glimpse of our roofing and interior work across Kenya.
              </p>
            </div>
            <Link href="/gallery" className="btn-secondary text-xs whitespace-nowrap">
              View Full Gallery →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { seed: "roof1", label: "Roof Installation", emoji: "🏠" },
              { seed: "interior1", label: "Interior Design", emoji: "✨" },
              { seed: "commercial1", label: "Commercial", emoji: "🏗️" },
              { seed: "before1", label: "Before & After", emoji: "🔄" },
            ].map((item) => (
              <Link
                key={item.seed}
                href="/gallery"
                className="relative group overflow-hidden rounded-xl aspect-square bg-roofGrey-200 block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${item.seed}/300/300`}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-3xl">{item.emoji}</div>
                    <p className="text-white text-xs font-medium mt-1">{item.label}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        className="py-20 px-6 md:px-12 lg:px-24 text-center"
        style={{ background: "linear-gradient(135deg, #2d6a2d, #8B4513)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-white font-heading text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-green-100 text-lg leading-relaxed mb-10">
            Contact EvanRoofs today for a free consultation and no-obligation
            quote. We&apos;re ready to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-brown-500 px-10 py-4 rounded font-medium tracking-wider uppercase text-sm hover:bg-brown-50 transition-colors"
            >
              Get Free Quote
            </Link>
            <a
              href="tel:+254700000000"
              className="border-2 border-white text-white px-10 py-4 rounded font-medium tracking-wider uppercase text-sm hover:bg-white hover:text-brown-500 transition-colors"
            >
              📞 Call Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
