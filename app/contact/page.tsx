"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title={<>We&apos;d Love to Hear<br /><span className="text-brown-300">From You</span></>}
        subtitle="Whether you need a quote, have questions about our services, or want to discuss a project — reach out and we will respond within 24 hours."
        gradientFrom="#5c2b0b"
        gradientTo="#1e461e"
        roofImage="https://picsum.photos/seed/contact_hero_roof/500/360"
        interiorImage="https://picsum.photos/seed/contact_hero_int/400/300"
      />

      {/* Contact options */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Phone */}
            <a
              href="tel:+254700000000"
              className="card p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-brown-500 group"
            >
              <div className="w-16 h-16 bg-brown-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-5 group-hover:bg-brown-500 transition-colors">
                <span className="group-hover:grayscale-0">📞</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-roofGrey-800 mb-3">
                Call Us
              </h3>
              <p className="text-roofGrey-500 text-sm leading-relaxed mb-4">
                Speak directly with our team for immediate assistance or to schedule a site visit.
              </p>
              <p className="text-brown-500 font-bold text-lg">+254 790 001 776</p>
              <p className="text-roofGrey-400 text-xs mt-2">Mon – Sat: 7am – 6pm</p>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/254700000000?text=Hello%20EvanRoofs!%20I%20would%20like%20to%20enquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="card p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-roofGreen-500 group"
            >
              <div className="w-16 h-16 bg-roofGreen-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-5 group-hover:bg-roofGreen-500 transition-colors">
                💬
              </div>
              <h3 className="font-heading font-bold text-xl text-roofGrey-800 mb-3">
                WhatsApp Us
              </h3>
              <p className="text-roofGrey-500 text-sm leading-relaxed mb-4">
                Send us a message on WhatsApp for quick responses, photos, and project discussions.
              </p>
              <p className="text-roofGreen-600 font-bold text-lg">Chat on WhatsApp</p>
              <p className="text-roofGrey-400 text-xs mt-2">Usually replies within 1 hour</p>
            </a>

            {/* Email */}
            <a
              href="mailto:info@evanroofs.com"
              className="card p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-roofGrey-500 group"
            >
              <div className="w-16 h-16 bg-roofGrey-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-5 group-hover:bg-roofGrey-500 transition-colors">
                ✉️
              </div>
              <h3 className="font-heading font-bold text-xl text-roofGrey-800 mb-3">
                Email Us
              </h3>
              <p className="text-roofGrey-500 text-sm leading-relaxed mb-4">
                Send detailed project inquiries, documents, or attach photos for a comprehensive assessment.
              </p>
              <p className="text-roofGrey-700 font-bold text-lg">info@evanroofs.com</p>
              <p className="text-roofGrey-400 text-xs mt-2">Reply within 24 hours</p>
            </a>
          </div>

          {/* Contact form + info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <div className="title-line" />
              <h2 className="section-title">Send Us a Message</h2>
              <p className="text-roofGrey-500 leading-relaxed mb-8">
                Fill in the form below and one of our team members will reach out
                to discuss your project and provide a free quote.
              </p>

              {submitted ? (
                <div className="bg-roofGreen-50 border border-roofGreen-200 rounded-xl p-10 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="font-heading font-bold text-xl text-roofGreen-700 mb-3">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-roofGreen-600 text-sm leading-relaxed">
                    Thank you for reaching out. A member of our team will contact
                    you within 24 hours to discuss your project.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-roofGrey-700 text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. John Mwangi"
                        className="w-full border border-roofGrey-200 rounded px-4 py-3 text-sm text-roofGrey-700 placeholder-roofGrey-300 outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-300 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-roofGrey-700 text-sm font-medium mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+254 700 000 000"
                        className="w-full border border-roofGrey-200 rounded px-4 py-3 text-sm text-roofGrey-700 placeholder-roofGrey-300 outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-300 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-roofGrey-700 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full border border-roofGrey-200 rounded px-4 py-3 text-sm text-roofGrey-700 placeholder-roofGrey-300 outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-300 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-roofGrey-700 text-sm font-medium mb-2">
                      Service Needed *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full border border-roofGrey-200 rounded px-4 py-3 text-sm text-roofGrey-700 outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-300 transition bg-white"
                    >
                      <option value="">Select a service...</option>
                      <option value="roof-installation">Roof Installation</option>
                      <option value="roof-repair">Roof Repair</option>
                      <option value="roof-replacement">Roof Replacement</option>
                      <option value="waterproofing">Waterproofing</option>
                      <option value="gutters">Gutter Systems</option>
                      <option value="insulation">Roof Insulation</option>
                      <option value="commercial">Commercial Roofing</option>
                      <option value="false-ceiling">False Ceiling</option>
                      <option value="interior-design">Interior Design</option>
                      <option value="wall-cladding">Wall Cladding</option>
                      <option value="flooring">Flooring</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-roofGrey-700 text-sm font-medium mb-2">
                      Message / Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Describe your project, location, and any specific requirements..."
                      className="w-full border border-roofGrey-200 rounded px-4 py-3 text-sm text-roofGrey-700 placeholder-roofGrey-300 outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-300 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded font-medium tracking-wider uppercase text-sm transition-colors ${
                      loading
                        ? "bg-roofGrey-300 text-roofGrey-500 cursor-not-allowed"
                        : "bg-brown-500 text-white hover:bg-brown-600 cursor-pointer"
                    }`}
                  >
                    {loading ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              )}
            </div>

            {/* Info panel */}
            <div>
              <div className="title-line" style={{ backgroundColor: "#2d6a2d" }} />
              <h2 className="section-title">Our Office</h2>
              <p className="text-roofGrey-500 leading-relaxed mb-8">
                Visit us at our Nairobi office or call to arrange a site visit.
                We serve all major counties in Kenya.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  { icon: "📍", label: "Address", value: "123 Roofing Lane, Westlands, Nairobi, Kenya" },
                  { icon: "📞", label: "Phone", value: "+254 790 001 776" },
                  { icon: "💬", label: "WhatsApp", value: "+254 790 001 776" },
                  { icon: "✉️", label: "Email", value: "info@evanroofs.com" },
                  { icon: "🕒", label: "Working Hours", value: "Monday – Saturday: 7:00 AM – 6:00 PM" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-5 items-start">
                    <div className="w-12 h-12 bg-brown-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-roofGrey-400 uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-roofGrey-700 font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div
                className="rounded-xl h-56 flex items-center justify-center text-white"
                style={{ background: "linear-gradient(135deg, #2d6a2d, #8B4513)" }}
              >
                <div className="text-center">
                  <div className="text-5xl mb-3">📍</div>
                  <p className="font-heading font-bold text-xl mb-1">Westlands, Nairobi</p>
                  <p className="text-green-100 text-sm">Kenya</p>
                </div>
              </div>

              {/* Quick contact buttons */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <a
                  href="tel:+254790001776"
                  className="flex items-center justify-center gap-2 bg-brown-500 text-white py-3 rounded font-medium text-sm hover:bg-brown-600 transition-colors"
                >
                  📞 Call Now
                </a>
                <a
                  href="https://wa.me/254790001776"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-roofGreen-500 text-white py-3 rounded font-medium text-sm hover:bg-roofGreen-600 transition-colors"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
