// ─── Media Store ────────────────────────────────────────────────────────────
// In a production deployment, replace this with a real database (Supabase,
// PlanetScale, Firebase, etc.) and cloud storage (Cloudinary, AWS S3, etc.).
// This file centralises all media types and seed data so Gallery + Admin share
// the same structure.

export type MediaCategory =
  | "Roof Installation"
  | "Roof Repair"
  | "Waterproofing"
  | "Interior Design"
  | "Commercial"
  | "Before & After"
  | "Team at Work";

export type MediaItem = {
  id: string;
  type: "image" | "video";
  title: string;
  description: string;
  category: MediaCategory;
  location: string;
  year: string;
  /** URL or data-URL for the media */
  src: string;
  /** Thumbnail URL – same as src for images, a poster frame URL for videos */
  thumb: string;
  featured: boolean;
  uploadedAt: string;
};

/** Seed data – realistic placeholders using picsum & YouTube embeds */
export const SEED_MEDIA: MediaItem[] = [
  {
    id: "m1",
    type: "image",
    title: "Stone-Coated Tile Installation – Westlands",
    description:
      "Full roof installation on a 24-unit residential complex using premium stone-coated steel tiles. Project completed in 12 days.",
    category: "Roof Installation",
    location: "Westlands, Nairobi",
    year: "2024",
    src: "https://picsum.photos/seed/roof1/800/600",
    thumb: "https://picsum.photos/seed/roof1/400/300",
    featured: true,
    uploadedAt: "2024-03-15",
  },
  {
    id: "m2",
    type: "image",
    title: "Karen Luxury Villa – Complete Reroofing",
    description:
      "Full tear-off and replacement with imported clay tiles on a high-end Karen bungalow. Includes custom guttering and fascia.",
    category: "Roof Installation",
    location: "Karen, Nairobi",
    year: "2024",
    src: "https://picsum.photos/seed/roof2/800/600",
    thumb: "https://picsum.photos/seed/roof2/400/300",
    featured: true,
    uploadedAt: "2024-02-10",
  },
  {
    id: "m3",
    type: "image",
    title: "Office False Ceiling – Kileleshwa",
    description:
      "Gypsum board false ceiling with integrated LED strip lighting for a modern 3-floor office park. Elegant and functional.",
    category: "Interior Design",
    location: "Kileleshwa, Nairobi",
    year: "2023",
    src: "https://picsum.photos/seed/interior1/800/600",
    thumb: "https://picsum.photos/seed/interior1/400/300",
    featured: true,
    uploadedAt: "2023-11-05",
  },
  {
    id: "m4",
    type: "image",
    title: "Thika Warehouse – Industrial Roofing",
    description:
      "5,000 sqm commercial warehouse roofing with heavy-duty metal sheets, industrial gutters, and ridge ventilation systems.",
    category: "Commercial",
    location: "Thika, Kiambu",
    year: "2023",
    src: "https://picsum.photos/seed/commercial1/800/600",
    thumb: "https://picsum.photos/seed/commercial1/400/300",
    featured: false,
    uploadedAt: "2023-09-22",
  },
  {
    id: "m5",
    type: "image",
    title: "Waterproofing – Flat Roof Terrace",
    description:
      "Torch-on membrane waterproofing applied to a large flat roof terrace. Finished with protective screed and drainage channels.",
    category: "Waterproofing",
    location: "Lavington, Nairobi",
    year: "2024",
    src: "https://picsum.photos/seed/water1/800/600",
    thumb: "https://picsum.photos/seed/water1/400/300",
    featured: false,
    uploadedAt: "2024-01-18",
  },
  {
    id: "m6",
    type: "image",
    title: "Before & After – Rongai School Roof",
    description:
      "Emergency repair and waterproofing of a primary school that experienced severe leakage. Left: before. Right: after.",
    category: "Before & After",
    location: "Rongai, Kajiado",
    year: "2022",
    src: "https://picsum.photos/seed/before1/800/600",
    thumb: "https://picsum.photos/seed/before1/400/300",
    featured: false,
    uploadedAt: "2022-08-30",
  },
  {
    id: "m7",
    type: "image",
    title: "Team Installing Trusses – Syokimau Estate",
    description:
      "Our crew setting up steel trusses for the Syokimau housing estate project — 60 units coordinated simultaneously.",
    category: "Team at Work",
    location: "Syokimau, Machakos",
    year: "2025",
    src: "https://picsum.photos/seed/team1/800/600",
    thumb: "https://picsum.photos/seed/team1/400/300",
    featured: false,
    uploadedAt: "2025-01-10",
  },
  {
    id: "m8",
    type: "image",
    title: "Wall Cladding – Feature Wall Design",
    description:
      "Stone-effect wall cladding installed in a luxury residential living room. Combined with accent lighting for dramatic effect.",
    category: "Interior Design",
    location: "Runda, Nairobi",
    year: "2024",
    src: "https://picsum.photos/seed/interior2/800/600",
    thumb: "https://picsum.photos/seed/interior2/400/300",
    featured: false,
    uploadedAt: "2024-06-12",
  },
  {
    id: "m9",
    type: "video",
    title: "Roof Installation Time-Lapse – Karen Villa",
    description:
      "Watch our team complete a full clay tile roof installation in under 3 minutes. From bare structure to finished roof.",
    category: "Roof Installation",
    location: "Karen, Nairobi",
    year: "2024",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumb: "https://picsum.photos/seed/video1/400/300",
    featured: true,
    uploadedAt: "2024-04-05",
  },
  {
    id: "m10",
    type: "video",
    title: "EvanRoofs – Company Overview 2024",
    description:
      "A short introduction to EvanRoofs — our team, our process, our projects, and our commitment to quality.",
    category: "Team at Work",
    location: "Nairobi, Kenya",
    year: "2024",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumb: "https://picsum.photos/seed/video2/400/300",
    featured: true,
    uploadedAt: "2024-05-20",
  },
  {
    id: "m11",
    type: "image",
    title: "Roof Repair – Cracked Ridge Tiles",
    description:
      "Replacement of damaged ridge tiles and repointing of mortar joints on a 15-year-old residential roof in Nakuru.",
    category: "Roof Repair",
    location: "Nakuru Town",
    year: "2023",
    src: "https://picsum.photos/seed/repair1/800/600",
    thumb: "https://picsum.photos/seed/repair1/400/300",
    featured: false,
    uploadedAt: "2023-06-14",
  },
  {
    id: "m12",
    type: "image",
    title: "Church Roof – Gabled Structure",
    description:
      "Complex gabled roof installation for a large church assembly hall in Kikuyu. High-span trusses with acoustic insulation.",
    category: "Commercial",
    location: "Kikuyu, Kiambu",
    year: "2023",
    src: "https://picsum.photos/seed/church1/800/600",
    thumb: "https://picsum.photos/seed/church1/400/300",
    featured: false,
    uploadedAt: "2023-04-28",
  },
];

export const CATEGORIES: MediaCategory[] = [
  "Roof Installation",
  "Roof Repair",
  "Waterproofing",
  "Interior Design",
  "Commercial",
  "Before & After",
  "Team at Work",
];
