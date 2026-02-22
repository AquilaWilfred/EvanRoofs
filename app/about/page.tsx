import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About EvanRoofs | Our Story, Owner & Expert Team",
  description:
    "Meet Evan Kariuki and the EvanRoofs team. Learn about our 14+ year journey, core values, and commitment to quality roofing and interior design across Kenya.",
  keywords: ["EvanRoofs team", "roofing company Kenya", "Evan Kariuki", "professional roofers Nairobi", "interior design team Kenya"],
  openGraph: {
    title: "About EvanRoofs | Our Story, Owner & Expert Team",
    description: "Meet the people behind EvanRoofs — 50+ professionals delivering quality roofing and interior design across Kenya since 2010.",
    url: "https://www.evanroofs.com/about",
  },
};

const team = [
  {
    name: "Evan Kariuki",
    role: "Founder & Lead Roofer",
    bio: "With over 14 years in the roofing industry, Evan founded EvanRoofs with a simple mission: exceptional quality with honest pricing. His hands-on approach sets the standard for every project.",
    img: "https://picsum.photos/seed/person_evan/400/400",
    delay: "0s",
  },
  {
    name: "Grace Njeri",
    role: "Interior Design Lead",
    bio: "Grace brings creativity and precision to every interior project. With a background in architecture and design, she transforms spaces into functional, beautiful environments.",
    img: "https://picsum.photos/seed/person_grace/400/400",
    delay: "0.15s",
  },
  {
    name: "Michael Oduya",
    role: "Site Supervisor",
    bio: "Michael ensures every project runs smoothly from start to finish. His coordination skills and technical expertise keep our teams efficient and clients informed.",
    img: "https://picsum.photos/seed/person_michael/400/400",
    delay: "0.3s",
  },
  {
    name: "Priscilla Wanjiku",
    role: "Client Relations Manager",
    bio: "Priscilla manages client relationships with care and professionalism. She ensures every customer feels heard and well-informed throughout the entire process.",
    img: "https://picsum.photos/seed/person_priscilla/400/400",
    delay: "0.45s",
  },
  {
    name: "Joseph Maina",
    role: "Senior Roofer",
    bio: "With 10+ years of hands-on roofing experience, Joseph leads our installation crews with precision, specialising in complex structures and waterproofing systems.",
    img: "https://picsum.photos/seed/person_joseph/400/400",
    delay: "0.6s",
  },
  {
    name: "Lydia Achieng",
    role: "Estimator & Project Planner",
    bio: "Lydia handles project assessments and cost estimations with thoroughness, ensuring clients receive accurate quotes and well-planned timelines.",
    img: "https://picsum.photos/seed/person_lydia/400/400",
    delay: "0.75s",
  },
];

const values = [
  { icon: "🏆", title: "Excellence", desc: "We pursue the highest standards in every nail driven, every tile laid, and every design rendered.", color: "border-brown-500" },
  { icon: "🤝", title: "Integrity", desc: "Transparent pricing, honest timelines, and no surprises — we treat your home like our own.", color: "border-roofGreen-500" },
  { icon: "💪", title: "Reliability", desc: "When we commit to a project, we see it through. Our clients trust us to show up and deliver.", color: "border-roofRed-500" },
  { icon: "🌿", title: "Sustainability", desc: "We champion eco-friendly materials and methods that protect both your home and environment.", color: "border-roofGrey-500" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About EvanRoofs"
        title={<>Built on Trust,<br /><span className="text-brown-300">Delivered with Pride</span></>}
        subtitle="EvanRoofs was founded with a clear vision: to provide homeowners and businesses with roofing and interior design services they can truly depend on."
        gradientFrom="#4a2209"
        gradientTo="#333333"
        roofImage="https://picsum.photos/seed/roofhero_about/500/360"
        interiorImage="https://picsum.photos/seed/interiorhero_about/400/300"
      />

      {/* ── Story with floating images ── */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Floating collage */}
          <div className="relative h-[440px] hidden lg:block">
            <div className="absolute top-0 left-0 w-[62%] rounded-2xl overflow-hidden shadow-2xl border-4 border-roofGrey-100"
              style={{ animation: "floatBobSlow 6s ease-in-out infinite" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://picsum.photos/seed/team_work_a/500/360" alt="EvanRoofs team at work" className="w-full h-64 object-cover" />
            </div>
            <div className="absolute top-8 right-0 w-[40%] rounded-2xl overflow-hidden shadow-xl border-4 border-brown-100"
              style={{ animation: "floatBobSlow 5s 1s ease-in-out infinite" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://picsum.photos/seed/roof_close/400/280" alt="Roof installation detail" className="w-full h-44 object-cover" />
              <div className="absolute bottom-0 inset-x-0 bg-brown-500/90 text-white text-xs p-2 text-center font-medium">14+ Years of Excellence</div>
            </div>
            <div className="absolute bottom-0 right-10 w-[38%] rounded-2xl overflow-hidden shadow-xl border-4 border-roofGreen-100"
              style={{ animation: "floatBobSlow 7s 0.5s ease-in-out infinite" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://picsum.photos/seed/interior_room/400/280" alt="Interior design project" className="w-full h-36 object-cover" />
              <div className="absolute bottom-0 inset-x-0 bg-roofGreen-600/90 text-white text-xs p-2 text-center font-medium">✨ Interior Design</div>
            </div>
            <div className="absolute bottom-14 left-[-10px] bg-brown-500 text-white rounded-xl p-4 shadow-xl">
              <p className="text-2xl font-heading font-bold">500+</p>
              <p className="text-xs text-brown-200">Projects Done</p>
            </div>
          </div>

          <div>
            <div className="title-line" />
            <h2 className="section-title">Our Story</h2>
            <p className="text-roofGrey-500 leading-relaxed mb-5">
              EvanRoofs began in 2010 when founder Evan Kariuki noticed a gap in the market — homeowners were being overcharged for substandard roofing work. Determined to change that, Evan started small with a two-person crew and a firm commitment to quality.
            </p>
            <p className="text-roofGrey-500 leading-relaxed mb-5">
              Word spread quickly. One satisfied client led to another, and EvanRoofs grew into a full-service company with over 50 experienced professionals. Today, we serve residential and commercial clients across Kenya.
            </p>
            <p className="text-roofGrey-500 leading-relaxed mb-8">
              Our headquarters is based in Westlands, Nairobi, and we operate across multiple counties — bringing the same level of care and quality to every location.
            </p>
            <Link href="/contact" className="btn-primary">Work With Us</Link>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section-padding bg-roofGrey-50 roof-pattern">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="w-16 h-1 bg-brown-500 mx-auto mb-6" />
            <h2 className="section-title text-center">Our Core Values</h2>
            <p className="section-subtitle mx-auto text-center">Everything we do is guided by principles that put our clients first.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className={`card border-t-4 ${v.color} p-8 text-center hover:shadow-xl transition-shadow`}>
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-heading font-bold text-xl text-roofGrey-800 mb-3">{v.title}</h3>
                <p className="text-roofGrey-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team with photo cards ── */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <div className="title-line" />
            <h2 className="section-title">Meet the Team</h2>
            <p className="section-subtitle">The skilled, passionate people behind every EvanRoofs project.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="card group overflow-hidden">
                <div className="relative h-60 overflow-hidden bg-roofGrey-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.img}
                    alt={`${member.name} - ${member.role} at EvanRoofs`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-brown-500 text-white text-xs px-3 py-1 rounded-full">{member.role}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-roofGrey-800 mb-1">{member.name}</h3>
                  <p className="text-brown-500 text-xs font-medium tracking-wide uppercase mb-3">{member.role}</p>
                  <p className="text-roofGrey-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location ── */}
      <section className="section-padding bg-roofGrey-800 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-16 h-1 bg-brown-400 mb-6" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Where We Are</h2>
            <p className="text-roofGrey-300 leading-relaxed mb-6">
              Our main office is in Westlands, Nairobi. We operate across Nairobi County, Kiambu, Machakos, Nakuru, and surrounding areas. Our mobile teams travel to your site for assessment and delivery.
            </p>
            <ul className="space-y-4 text-roofGrey-300">
              <li className="flex gap-3"><span className="text-brown-400">📍</span><span>123 Roofing Lane, Westlands, Nairobi, Kenya</span></li>
              <li className="flex gap-3"><span className="text-brown-400">🕒</span><span>Monday – Saturday: 7:00 AM – 6:00 PM</span></li>
              <li className="flex gap-3"><span className="text-brown-400">📞</span><a href="tel:+254700000000" className="hover:text-white">+254 700 000 000</a></li>
            </ul>
          </div>
          <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl"
            style={{ animation: "floatBobSlow 6s ease-in-out infinite" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://picsum.photos/seed/nairobi_office/600/400" alt="EvanRoofs Nairobi office location" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-3">📍</div>
                <p className="font-heading font-bold text-xl text-white">Westlands, Nairobi</p>
                <p className="text-roofGrey-300 text-sm">Serving all major counties in Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes floatBobSlow {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
}
