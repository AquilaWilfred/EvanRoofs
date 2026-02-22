import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Client Testimonials & Reviews | EvanRoofs Kenya",
  description:
    "Read what our clients say about EvanRoofs. Genuine reviews from homeowners, businesses, and developers who trusted us with their roofing and interior design projects.",
};

const testimonials = [
  {
    name: "James Mwangi",
    role: "Homeowner",
    location: "Westlands, Nairobi",
    project: "Roof Installation",
    rating: 5,
    quote:
      "EvanRoofs transformed our home completely. The team was professional, on time, and the quality of work exceeded our expectations. They cleaned up after themselves, which I really appreciated. I will definitely call them again for future projects.",
  },
  {
    name: "Sarah Kamau",
    role: "Property Developer",
    location: "Karen, Nairobi",
    project: "Commercial Roofing – 24 Units",
    rating: 5,
    quote:
      "We have worked with EvanRoofs on three commercial projects now. Their consistency, reliability, and workmanship are unmatched in the industry. They finish on schedule and within budget — a rare combination. I recommend them to all my contacts.",
  },
  {
    name: "David Otieno",
    role: "Business Owner",
    location: "Industrial Area, Nairobi",
    project: "Emergency Roof Repair",
    rating: 5,
    quote:
      "Fast response, fair pricing, and excellent results. My warehouse roof was leaking badly and EvanRoofs responded within hours. Repairs were done within 48 hours of first contact. Outstanding service and professional attitude throughout.",
  },
  {
    name: "Pastor John Waweru",
    role: "Church Administrator",
    location: "Kikuyu, Kiambu",
    project: "Church Building Roofing",
    rating: 5,
    quote:
      "We gave EvanRoofs a challenging project — a large church hall with a complex gabled roof design. They delivered beautifully. The team was respectful, hardworking, and communicated clearly at every stage. Blessings to Evan and his entire team.",
  },
  {
    name: "Angela Muthoni",
    role: "Interior Design Client",
    location: "Kileleshwa, Nairobi",
    project: "Office Interior Fit-Out",
    rating: 5,
    quote:
      "I hired EvanRoofs for our new office interior and I am beyond impressed. Grace and her design team understood exactly what I wanted — modern, clean, and functional. The false ceiling and lighting design are absolutely stunning.",
  },
  {
    name: "Robert Njoroge",
    role: "Homeowner",
    location: "Rongai, Kajiado",
    project: "Roof Replacement",
    rating: 5,
    quote:
      "My old roof was beyond repair. EvanRoofs came in, assessed the damage thoroughly, and replaced the entire roof in under a week. I was impressed by how organized and clean the team was. No mess left behind. Excellent work!",
  },
  {
    name: "Mary Akinyi",
    role: "School Principal",
    location: "Rongai, Kajiado",
    project: "School Roof Waterproofing",
    rating: 5,
    quote:
      "Our school suffered significant leakage that affected classrooms. EvanRoofs came quickly and solved the problem permanently. The team was kind, efficient, and careful around the school environment. Our students are now dry and safe.",
  },
  {
    name: "Peter Musyoka",
    role: "Architect",
    location: "Nairobi CBD",
    project: "Multiple Projects",
    rating: 5,
    quote:
      "As an architect, I have high standards for contractors I recommend to my clients. EvanRoofs consistently meets and exceeds those standards. Their technical knowledge is excellent and they always read and follow project drawings correctly.",
  },
  {
    name: "Caroline Njeri",
    role: "Homeowner",
    location: "Lavington, Nairobi",
    project: "Full Home Interior Design",
    rating: 5,
    quote:
      "We hired EvanRoofs for a complete interior overhaul of our home. The team — from the designers to the workers — was superb. The result is a home that feels like it belongs in a magazine. I am so happy with the outcome.",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Reviews"
        title={<>What Our Clients<br /><span className="text-brown-300">Say About Us</span></>}
        subtitle="We let our work and our clients speak. Genuine reviews from the people and businesses we have proudly served across Kenya."
        gradientFrom="#4a2209"
        gradientTo="#1f1f1f"
        roofImage="https://picsum.photos/seed/test_hero_roof/500/360"
        interiorImage="https://picsum.photos/seed/test_hero_int/400/300"
      />

      {/* Rating summary */}
      <section className="bg-brown-500 py-10 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
          <div>
            <p className="text-5xl font-heading font-bold">4.9 / 5</p>
            <div className="flex justify-center gap-1 my-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl">★</span>
              ))}
            </div>
            <p className="text-brown-200 text-sm">Average Rating</p>
          </div>
          <div>
            <p className="text-5xl font-heading font-bold">98%</p>
            <p className="text-brown-200 text-sm mt-4">Client Satisfaction Rate</p>
          </div>
          <div>
            <p className="text-5xl font-heading font-bold">500+</p>
            <p className="text-brown-200 text-sm mt-4">Happy Clients</p>
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="section-padding bg-roofGrey-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <div className="title-line" />
            <h2 className="section-title">Client Testimonials</h2>
            <p className="section-subtitle">
              Real experiences from real clients across Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-8 flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-brown-400 text-lg">★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-roofGrey-600 leading-relaxed text-sm italic mb-6 flex-grow">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t border-roofGrey-100 pt-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brown-100 rounded-full flex items-center justify-center text-xl font-bold text-brown-500">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-roofGrey-800">{t.name}</p>
                      <p className="text-roofGrey-400 text-xs">{t.role} — {t.location}</p>
                      <p className="text-brown-500 text-xs mt-0.5 italic">{t.project}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center bg-roofGreen-500">
        <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-4">
          Join Our Happy Clients
        </h2>
        <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
          Experience the EvanRoofs difference for yourself. Get a free quote today.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-roofGreen-600 px-10 py-4 rounded font-medium tracking-wider uppercase text-sm hover:bg-green-50 transition-colors"
        >
          Get Started
        </Link>
      </section>
    </>
  );
}
