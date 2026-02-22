import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Roofing & Interior Design Services | EvanRoofs Kenya",
  description:
    "EvanRoofs offers roof installation, repair, replacement, waterproofing, gutters, insulation, false ceilings, wall cladding, flooring, and full interior design services across Kenya.",
  keywords: ["roof installation Kenya", "roof repair Nairobi", "waterproofing Kenya", "false ceiling Nairobi", "interior design Kenya", "roofing services Kenya", "commercial roofing"],
  openGraph: {
    title: "Roofing & Interior Design Services | EvanRoofs Kenya",
    description: "Comprehensive roofing and interior design services for homes and businesses across Kenya. Get a free quote today.",
    url: "https://www.evanroofs.com/services",
  },
};

const roofingServices = [
  {
    icon: "🏠",
    title: "New Roof Installation",
    desc: "Complete roofing systems for new constructions. We work with clay tiles, concrete tiles, iron sheets, asphalt shingles, and more. Every installation meets local building standards.",
    features: ["Material consultation & selection", "Structural assessment", "Professional installation", "Final inspection & warranty"],
    img: "https://picsum.photos/seed/svc_install/600/400",
    imgAlt: "New roof installation with tiles",
    color: "border-brown-500",
    accent: "bg-brown-500",
  },
  {
    icon: "🔧",
    title: "Roof Repair & Maintenance",
    desc: "Fast and reliable repairs for leaking roofs, broken tiles, damaged flashing, and sagging structures. We diagnose the root cause and provide lasting solutions — not temporary fixes.",
    features: ["Emergency repair services", "Leak detection", "Tile replacement", "Structural reinforcement"],
    img: "https://picsum.photos/seed/svc_repair/600/400",
    imgAlt: "Roofer repairing damaged roof tiles",
    color: "border-roofGreen-500",
    accent: "bg-roofGreen-500",
  },
  {
    icon: "🔄",
    title: "Roof Replacement",
    desc: "When repair is no longer enough, we handle full roof replacement efficiently and cleanly. We remove the old roof, prepare the structure, and install a new system built to last.",
    features: ["Complete tear-off & disposal", "Deck inspection & repair", "New system installation", "Clean site guaranteed"],
    img: "https://picsum.photos/seed/svc_replace/600/400",
    imgAlt: "Full roof replacement project in progress",
    color: "border-roofRed-500",
    accent: "bg-roofRed-500",
  },
  {
    icon: "💧",
    title: "Waterproofing",
    desc: "Protect your property from water infiltration with professional waterproofing. We apply high-quality membranes and coatings to roofs, terraces, basements, and walls.",
    features: ["Membrane waterproofing", "Bitumen coating", "Terrace & flat roof sealing", "10-year waterproof guarantee"],
    img: "https://picsum.photos/seed/svc_waterproof/600/400",
    imgAlt: "Waterproofing membrane being applied to flat roof",
    color: "border-brown-500",
    accent: "bg-brown-500",
  },
  {
    icon: "🌧️",
    title: "Gutter Systems",
    desc: "Proper drainage is critical to roof longevity. We design, install, and repair gutter systems that channel rainwater away efficiently from your building's foundation.",
    features: ["Custom gutter installation", "Downspout positioning", "Gutter cleaning & repairs", "Overflow prevention"],
    img: "https://picsum.photos/seed/svc_gutter/600/400",
    imgAlt: "Aluminium gutter system installation",
    color: "border-roofGreen-500",
    accent: "bg-roofGreen-500",
  },
  {
    icon: "☀️",
    title: "Roof Insulation",
    desc: "Improve your building's energy efficiency and comfort with quality roof insulation. We install thermal and acoustic insulation materials that reduce heat and noise.",
    features: ["Thermal insulation", "Acoustic insulation", "Energy efficiency improvement", "Moisture barrier installation"],
    img: "https://picsum.photos/seed/svc_insulate/600/400",
    imgAlt: "Roof insulation installation with thermal boards",
    color: "border-roofGrey-500",
    accent: "bg-roofGrey-500",
  },
  {
    icon: "🔩",
    title: "Fascia & Soffit",
    desc: "Protect the edges of your roof with properly installed fascia boards and soffits. We replace damaged boards and install new ones for a clean, finished roofline.",
    features: ["Fascia board installation", "Soffit ventilation", "Material matching", "Painting & finishing"],
    img: "https://picsum.photos/seed/svc_fascia/600/400",
    imgAlt: "Fascia board installation on roofline edge",
    color: "border-brown-500",
    accent: "bg-brown-500",
  },
  {
    icon: "🏗️",
    title: "Commercial Roofing",
    desc: "From warehouses to office complexes, EvanRoofs delivers commercial roofing solutions designed for large structures, high traffic, and demanding environments.",
    features: ["Industrial roof systems", "Flat & low-slope roofing", "Metal roofing systems", "Preventive maintenance plans"],
    img: "https://picsum.photos/seed/svc_commercial/600/400",
    imgAlt: "Large commercial warehouse roofing project",
    color: "border-roofGreen-500",
    accent: "bg-roofGreen-500",
  },
];

const interiorServices = [
  {
    icon: "✨",
    title: "False Ceiling Installation",
    desc: "Elegant false ceiling solutions including gypsum, PVC, and suspended grid ceilings. We transform plain spaces into sophisticated interiors with lighting integration options.",
    features: ["Gypsum board ceilings", "PVC ceiling panels", "Suspended grid systems", "Integrated lighting design"],
    img: "https://picsum.photos/seed/svc_ceiling/600/400",
    imgAlt: "Beautiful gypsum false ceiling with LED lighting in living room",
  },
  {
    icon: "🧱",
    title: "Wall Cladding",
    desc: "Enhance your walls with decorative cladding including stone, wood, and composite panels. Our cladding transforms both interior and exterior surfaces.",
    features: ["Stone & brick cladding", "Wooden wall panels", "Composite cladding", "Feature wall design"],
    img: "https://picsum.photos/seed/svc_cladding/600/400",
    imgAlt: "Stone wall cladding in modern interior",
  },
  {
    icon: "🎨",
    title: "Interior Design Consultation",
    desc: "Full interior design services from concept to completion. Our designers work with you to create spaces that reflect your taste, lifestyle, and functional needs.",
    features: ["Space planning", "Colour scheme consultation", "Furniture arrangement", "3D design visualisation"],
    img: "https://picsum.photos/seed/svc_design/600/400",
    imgAlt: "Interior designer presenting design concept to client",
  },
  {
    icon: "🪟",
    title: "Partitioning & Fit-Out",
    desc: "Office and home partitioning using glass, drywalls, and aluminium systems. We create functional zones that maximise your available space.",
    features: ["Glass partitions", "Drywall partitioning", "Office fit-out", "Movable partition systems"],
    img: "https://picsum.photos/seed/svc_partition/600/400",
    imgAlt: "Glass office partition installation",
  },
  {
    icon: "🪵",
    title: "Flooring Services",
    desc: "Complete flooring installation including tiles, wooden floors, vinyl, and epoxy. We prep the surface and install your chosen material to perfection.",
    features: ["Ceramic & porcelain tiles", "Hardwood flooring", "Vinyl & LVT flooring", "Epoxy floor coating"],
    img: "https://picsum.photos/seed/svc_flooring/600/400",
    imgAlt: "Tile flooring installation with herringbone pattern",
  },
  {
    icon: "💡",
    title: "Lighting Design",
    desc: "Strategic lighting transforms any space. We design and install ambient, task, and accent lighting systems that enhance beauty and functionality.",
    features: ["LED lighting systems", "Mood & accent lighting", "Smart lighting integration", "Electrical coordination"],
    img: "https://picsum.photos/seed/svc_lighting/600/400",
    imgAlt: "Elegant accent lighting in modern interior design",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={<>Comprehensive Roofing &<br /><span className="text-brown-300">Interior Solutions</span></>}
        subtitle="From the roof above your head to the walls around you — EvanRoofs offers a complete suite of services to build, protect, and beautify your space."
        gradientFrom="#2d6a2d"
        gradientTo="#4a2209"
        roofImage="https://picsum.photos/seed/svc_hero_roof/500/360"
        interiorImage="https://picsum.photos/seed/svc_hero_interior/400/300"
      />

      {/* ── Roofing Services ── */}
      <section className="section-padding bg-roofGrey-50 roof-pattern">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <div className="title-line" />
            <h2 className="section-title">Roofing Services</h2>
            <p className="section-subtitle">Expert roofing solutions for residential and commercial properties across Kenya.</p>
          </div>

          <div className="space-y-16">
            {roofingServices.map((service, i) => (
              <div key={service.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                {/* Image */}
                <div className={`order-1 ${i % 2 !== 0 ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.img}
                      alt={service.imgAlt}
                      className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`${service.accent} text-white text-xs px-3 py-1.5 rounded-full font-medium shadow`}>
                        {service.icon} {service.title}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`order-2 ${i % 2 !== 0 ? "lg:order-1" : "lg:order-2"}`}>
                  <div className={`w-12 h-1 ${service.accent} mb-4`} />
                  <h3 className="font-heading font-bold text-2xl text-roofGrey-800 mb-4">{service.title}</h3>
                  <p className="text-roofGrey-500 leading-relaxed mb-6">{service.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-roofGrey-600">
                        <span className={`w-2 h-2 ${service.accent} rounded-full flex-shrink-0`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-primary text-xs">Request This Service</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interior Services ── */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <div className="title-line" style={{ backgroundColor: "#2d6a2d" }} />
            <h2 className="section-title">Interior Design Services</h2>
            <p className="section-subtitle">Beautiful, functional interiors crafted with expertise and an eye for detail.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {interiorServices.map((service) => (
              <div key={service.title} className="card group overflow-hidden">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.img}
                    alt={service.imgAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="bg-roofGreen-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      {service.icon} {service.title}
                    </span>
                  </div>
                </div>
                <div className="p-7">
                  <p className="text-roofGrey-500 text-sm leading-relaxed mb-5">{service.desc}</p>
                  <ul className="space-y-1.5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-roofGrey-600">
                        <span className="w-1.5 h-1.5 bg-roofGreen-500 rounded-full flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section-padding bg-roofGrey-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="w-16 h-1 bg-brown-500 mx-auto mb-6" />
            <h2 className="section-title text-center">How We Work</h2>
            <p className="section-subtitle mx-auto text-center">A transparent process from first contact to project completion.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Contact Us", desc: "Reach out via phone, WhatsApp, or email to discuss your project needs." },
              { step: "02", title: "Site Assessment", desc: "We visit your site, evaluate the scope, and understand your requirements." },
              { step: "03", title: "Free Quote", desc: "You receive a detailed, transparent quote with no hidden charges." },
              { step: "04", title: "Project Delivery", desc: "Our team executes on schedule with regular progress updates to you." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 bg-brown-500 text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mx-auto mb-5">
                  {s.step}
                </div>
                <h3 className="font-heading font-bold text-xl text-roofGrey-800 mb-3">{s.title}</h3>
                <p className="text-roofGrey-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6 text-center bg-brown-500">
        <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-brown-100 text-lg mb-8 max-w-xl mx-auto">
          Contact us today for a free site assessment and no-obligation quote.
        </p>
        <Link href="/contact" className="inline-block bg-white text-brown-500 px-10 py-4 rounded font-medium tracking-wider uppercase text-sm hover:bg-brown-50 transition-colors">
          Get Free Quote
        </Link>
      </section>
    </>
  );
}
