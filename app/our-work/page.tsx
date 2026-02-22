import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Our Work | Roofing & Interior Projects Portfolio | EvanRoofs",
  description:
    "Browse EvanRoofs' portfolio of completed and ongoing roofing and interior design projects across Kenya — residential, commercial, and industrial.",
  keywords: ["roofing projects Kenya", "completed roof installations", "interior design projects Nairobi", "EvanRoofs portfolio", "roofing portfolio Kenya"],
  openGraph: {
    title: "Our Work | Roofing & Interior Projects Portfolio | EvanRoofs",
    description: "See our craftsmanship across 500+ projects in Kenya. Residential roofing, commercial builds, and stunning interiors.",
    url: "https://www.evanroofs.com/our-work",
  },
};

const projects = [
  {
    title: "Westlands Residential Complex",
    type: "Roof Installation",
    status: "Completed",
    location: "Westlands, Nairobi",
    year: "2024",
    desc: "Complete roof installation for a 24-unit residential complex using high-grade stone-coated tiles, waterproofing, and custom gutter systems.",
    img: "https://picsum.photos/seed/project_westlands/600/420",
    imgAlt: "Stone-coated tile roof on residential complex Westlands",
    accent: "#8B4513",
  },
  {
    title: "Karen Bungalow – Roof & Interior",
    type: "Roof Replacement + Interior",
    status: "Completed",
    location: "Karen, Nairobi",
    year: "2024",
    desc: "Full roof replacement and interior redesign including false ceiling, wall cladding, and custom lighting for a luxury family home.",
    img: "https://picsum.photos/seed/project_karen/600/420",
    imgAlt: "Luxury bungalow with new clay tiles and interior design Karen",
    accent: "#2d6a2d",
  },
  {
    title: "Thika Industrial Warehouse",
    type: "Commercial Roofing",
    status: "Completed",
    location: "Thika, Kiambu",
    year: "2023",
    desc: "Large-scale commercial roofing for a 5,000 sq meter warehouse with heavy-duty metal sheets and industrial gutter systems.",
    img: "https://picsum.photos/seed/project_thika/600/420",
    imgAlt: "Industrial warehouse with metal roofing Thika Kenya",
    accent: "#4a4a4a",
  },
  {
    title: "Kileleshwa Office Park",
    type: "Interior Design + Partitioning",
    status: "Completed",
    location: "Kileleshwa, Nairobi",
    year: "2023",
    desc: "Complete interior fit-out for a 3-floor office including glass partitions, false ceilings, flooring, and integrated lighting systems.",
    img: "https://picsum.photos/seed/project_kileleshwa/600/420",
    imgAlt: "Modern office interior with glass partitions and false ceiling Nairobi",
    accent: "#2d6a2d",
  },
  {
    title: "Kikuyu Church Assembly Hall",
    type: "Roof Installation",
    status: "Completed",
    location: "Kikuyu, Kiambu",
    year: "2023",
    desc: "Specialised roofing for a large church assembly hall with complex gabled roof design, high-span trusses, and acoustic insulation.",
    img: "https://picsum.photos/seed/project_church/600/420",
    imgAlt: "Church roof installation with gabled structure Kikuyu",
    accent: "#c0392b",
  },
  {
    title: "Rongai School Block",
    type: "Roof Repair & Waterproofing",
    status: "Completed",
    location: "Rongai, Kajiado",
    year: "2022",
    desc: "Emergency repair and waterproofing for a primary school building that experienced severe leakage during the rainy season.",
    img: "https://picsum.photos/seed/project_rongai/600/420",
    imgAlt: "School roof repair and waterproofing project Rongai",
    accent: "#8B4513",
  },
  {
    title: "Lavington Luxury Villa",
    type: "Full Roof + Interior Package",
    status: "Ongoing",
    location: "Lavington, Nairobi",
    year: "2025",
    desc: "High-end villa with imported clay tile roofing, full interior design, custom false ceilings, marble flooring, and smart lighting.",
    img: "https://picsum.photos/seed/project_lavington/600/420",
    imgAlt: "Luxury villa roofing and interior design Lavington Nairobi",
    accent: "#c08040",
  },
  {
    title: "Nakuru Mall Extension",
    type: "Commercial Roofing",
    status: "Ongoing",
    location: "Nakuru Town",
    year: "2025",
    desc: "Currently underway: mall extension with a complex curved roof spanning 2,000 sq meters with energy-efficient insulated panels.",
    img: "https://picsum.photos/seed/project_nakuru/600/420",
    imgAlt: "Commercial mall extension roofing project Nakuru",
    accent: "#2d6a2d",
  },
  {
    title: "Syokimau Housing Estate",
    type: "Estate Roofing",
    status: "Ongoing",
    location: "Syokimau, Machakos",
    year: "2025",
    desc: "Ongoing mass housing project: roofing 60 residential units with stone-coated tiles, coordinated gutters, and waterproofing.",
    img: "https://picsum.photos/seed/project_syokimau/600/420",
    imgAlt: "Residential estate roofing project Syokimau Machakos",
    accent: "#4a4a4a",
  },
];

export default function OurWorkPage() {
  const completed = projects.filter((p) => p.status === "Completed");
  const ongoing = projects.filter((p) => p.status === "Ongoing");

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={<>Our Work Speaks<br /><span className="text-brown-300">For Itself</span></>}
        subtitle="Browse completed and ongoing projects across Kenya. Each one reflects our commitment to quality, precision, and client satisfaction."
        gradientFrom="#333333"
        gradientTo="#8B4513"
        roofImage="https://picsum.photos/seed/work_hero_roof/500/360"
        interiorImage="https://picsum.photos/seed/work_hero_interior/400/300"
      />

      {/* Stats */}
      <section className="bg-roofGreen-500 py-10 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { v: completed.length + "+", l: "Completed" },
            { v: ongoing.length, l: "Ongoing" },
            { v: "500+", l: "Total Projects" },
            { v: "10+", l: "Counties Served" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-3xl font-heading font-bold">{s.v}</p>
              <p className="text-sm text-green-100 uppercase tracking-wider mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ongoing ── */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-roofRed-500 rounded-full animate-pulse" />
            <span className="text-roofRed-500 text-sm font-bold tracking-widest uppercase">Live Now</span>
          </div>
          <h2 className="section-title mb-10">Ongoing Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ongoing.map((project) => (
              <div key={project.title} className="card overflow-hidden group border-l-4 border-roofRed-500">
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.img}
                    alt={project.imgAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-roofRed-500 text-white text-xs px-3 py-1 rounded-full font-medium animate-pulse">🔴 Ongoing</span>
                  </div>
                  <div className="absolute bottom-3 right-3 text-white text-xs bg-black/50 px-2 py-1 rounded">{project.year}</div>
                </div>
                <div className="p-6">
                  <p className="text-brown-500 text-xs font-medium uppercase tracking-wide mb-1">{project.type}</p>
                  <h3 className="font-heading font-bold text-xl text-roofGrey-800 mb-2">{project.title}</h3>
                  <p className="text-roofGrey-400 text-xs mb-3">📍 {project.location}</p>
                  <p className="text-roofGrey-500 text-sm leading-relaxed">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Completed ── */}
      <section className="section-padding bg-roofGrey-50 roof-pattern">
        <div className="max-w-6xl mx-auto">
          <div className="title-line" />
          <h2 className="section-title mb-10">Completed Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completed.map((project) => (
              <div key={project.title} className="card overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.img}
                    alt={project.imgAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-roofGreen-500 text-white text-xs px-3 py-1 rounded-full font-medium">✅ Completed</span>
                  </div>
                  <div className="absolute bottom-3 right-3 text-white text-xs bg-black/50 px-2 py-1 rounded">{project.year}</div>
                </div>
                <div className="p-6">
                  <p className="text-brown-500 text-xs font-medium uppercase tracking-wide mb-1">{project.type}</p>
                  <h3 className="font-heading font-bold text-xl text-roofGrey-800 mb-2">{project.title}</h3>
                  <p className="text-roofGrey-400 text-xs mb-3">📍 {project.location}</p>
                  <p className="text-roofGrey-500 text-sm leading-relaxed">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6 text-center" style={{ background: "linear-gradient(135deg,#8B4513,#2d6a2d)" }}>
        <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-4">Want Your Project Here?</h2>
        <p className="text-brown-100 text-lg mb-8 max-w-xl mx-auto">Let's build something great together. Contact us for a free consultation.</p>
        <Link href="/contact" className="inline-block bg-white text-brown-500 px-10 py-4 rounded font-medium tracking-wider uppercase text-sm hover:bg-brown-50 transition-colors">
          Start Your Project
        </Link>
      </section>
    </>
  );
}
