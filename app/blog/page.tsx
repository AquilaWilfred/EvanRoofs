import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Blog | Roofing Tips & Interior Design Insights | EvanRoofs",
  description:
    "Read expert roofing tips, interior design inspiration, maintenance guides, and industry insights from the EvanRoofs team. Stay informed and make better decisions for your home.",
};

const posts = [
  {
    slug: "how-to-tell-your-roof-needs-replacing",
    title: "7 Signs Your Roof Needs Replacing (And What To Do About It)",
    category: "Roofing Tips",
    date: "January 15, 2025",
    readTime: "5 min read",
    excerpt:
      "Most homeowners don't think about their roof until there's a problem. But catching issues early can save you thousands. Here are the key signs that your roof is due for a replacement.",
    emoji: "🏠",
    color: "#8B4513",
  },
  {
    slug: "waterproofing-flat-roof-guide",
    title: "The Complete Guide to Waterproofing Your Flat Roof",
    category: "Maintenance",
    date: "December 20, 2024",
    readTime: "7 min read",
    excerpt:
      "Flat roofs are beautiful and practical — but they require proper waterproofing to last. In this guide, we break down the best methods, materials, and maintenance practices.",
    emoji: "💧",
    color: "#2d6a2d",
  },
  {
    slug: "false-ceiling-types-guide",
    title: "Gypsum vs PVC vs Grid Ceiling: Which Is Right for You?",
    category: "Interior Design",
    date: "November 30, 2024",
    readTime: "6 min read",
    excerpt:
      "Choosing the right false ceiling can completely transform your space. We break down the pros, cons, and ideal use cases for the three most popular ceiling types in Kenya.",
    emoji: "✨",
    color: "#4a4a4a",
  },
  {
    slug: "rainy-season-roof-prep",
    title: "How to Prepare Your Roof for the Rainy Season in Kenya",
    category: "Maintenance",
    date: "October 10, 2024",
    readTime: "4 min read",
    excerpt:
      "With the long rains approaching, now is the time to check your roof. Here is a practical checklist homeowners can use to protect their homes before the rains hit.",
    emoji: "🌧️",
    color: "#c0392b",
  },
  {
    slug: "interior-design-budget-tips",
    title: "5 Interior Design Upgrades That Add Value Without Breaking the Bank",
    category: "Interior Design",
    date: "September 5, 2024",
    readTime: "5 min read",
    excerpt:
      "You don't need a massive budget to transform your space. These five high-impact, cost-effective interior upgrades can dramatically improve how your home looks and feels.",
    emoji: "🎨",
    color: "#8B4513",
  },
  {
    slug: "choosing-roofing-materials-kenya",
    title: "Roofing Materials in Kenya: Iron Sheets vs Tiles vs Shingles",
    category: "Roofing Tips",
    date: "August 22, 2024",
    readTime: "8 min read",
    excerpt:
      "The right roofing material depends on your climate, budget, and aesthetic preferences. We compare the most common roofing options available in Kenya to help you choose wisely.",
    emoji: "🔩",
    color: "#2d6a2d",
  },
  {
    slug: "commercial-roofing-mistakes",
    title: "Common Mistakes Businesses Make When Choosing Commercial Roofing",
    category: "Commercial",
    date: "July 18, 2024",
    readTime: "6 min read",
    excerpt:
      "Commercial roofing decisions impact your operations, energy costs, and building longevity. Here are the mistakes we see most often — and how to avoid them.",
    emoji: "🏗️",
    color: "#4a4a4a",
  },
  {
    slug: "roof-insulation-kenya-weather",
    title: "Why Roof Insulation Matters More Than You Think in Kenya",
    category: "Energy Efficiency",
    date: "June 5, 2024",
    readTime: "5 min read",
    excerpt:
      "Most Kenyans skip roof insulation to cut costs. But without it, you could be losing significant amounts in energy bills and comfort. Here is why insulation is worth every shilling.",
    emoji: "☀️",
    color: "#c08040",
  },
];

const categories = ["All", "Roofing Tips", "Maintenance", "Interior Design", "Commercial", "Energy Efficiency"];

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="The EvanRoofs Blog"
        title={<>Insights, Tips &<br /><span className="text-brown-300">Expert Advice</span></>}
        subtitle="Stay informed with practical roofing tips, interior design ideas, and professional insights from the EvanRoofs team."
        gradientFrom="#1f1f1f"
        gradientTo="#2d6a2d"
        roofImage="https://picsum.photos/seed/blog_hero_roof/500/360"
        interiorImage="https://picsum.photos/seed/blog_hero_int/400/300"
      />

      {/* Categories filter display */}
      <section className="bg-white border-b border-roofGrey-100 px-6 md:px-12 lg:px-24 py-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`px-4 py-2 rounded-full text-sm cursor-pointer transition-colors ${
                  cat === "All"
                    ? "bg-brown-500 text-white"
                    : "bg-roofGrey-100 text-roofGrey-600 hover:bg-brown-50 hover:text-brown-500"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Blog posts */}
      <section className="section-padding bg-roofGrey-50">
        <div className="max-w-6xl mx-auto">
          {/* Featured post */}
          <div className="card mb-12 md:flex overflow-hidden">
            <div
              className="md:w-2/5 h-64 md:h-auto flex items-center justify-center text-8xl"
              style={{ background: `linear-gradient(135deg, ${posts[0].color}22, ${posts[0].color}55)` }}
            >
              {posts[0].emoji}
            </div>
            <div className="md:w-3/5 p-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs bg-brown-100 text-brown-600 px-3 py-1 rounded-full font-medium">
                  Featured Post
                </span>
                <span className="text-xs bg-roofGrey-100 text-roofGrey-500 px-3 py-1 rounded-full">
                  {posts[0].category}
                </span>
              </div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-roofGrey-800 mb-4 leading-tight">
                {posts[0].title}
              </h2>
              <p className="text-roofGrey-500 leading-relaxed mb-6">{posts[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-roofGrey-400">
                  {posts[0].date} · {posts[0].readTime}
                </div>
                <Link
                  href={`/blog/${posts[0].slug}`}
                  className="text-brown-500 text-sm font-medium hover:underline"
                >
                  Read Article →
                </Link>
              </div>
            </div>
          </div>

          {/* Post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <div key={post.slug} className="card group flex flex-col">
                <div
                  className="h-44 flex items-center justify-center text-6xl"
                  style={{ background: `linear-gradient(135deg, ${post.color}22, ${post.color}44)` }}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {post.emoji}
                  </span>
                </div>
                <div className="p-7 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-roofGrey-100 text-roofGrey-500 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-roofGrey-400">{post.readTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-roofGrey-800 mb-3 leading-tight flex-grow">
                    {post.title}
                  </h3>
                  <p className="text-roofGrey-500 text-sm leading-relaxed mb-5">{post.excerpt}</p>
                  <div className="border-t border-roofGrey-100 pt-4 flex items-center justify-between">
                    <span className="text-xs text-roofGrey-400">{post.date}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-brown-500 text-sm font-medium hover:underline"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-6 bg-roofGrey-800 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-4xl mb-4">📬</div>
          <h2 className="text-white font-heading text-3xl font-bold mb-4">
            Get Roofing Tips in Your Inbox
          </h2>
          <p className="text-roofGrey-300 leading-relaxed mb-8">
            Subscribe to our newsletter and receive expert tips, project updates,
            and exclusive offers from EvanRoofs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-5 py-3 rounded text-roofGrey-800 text-sm outline-none focus:ring-2 focus:ring-brown-500"
            />
            <button className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
