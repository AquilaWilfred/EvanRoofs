"use client";

import { useState, useEffect, useCallback } from "react";
import { loadMedia } from "@/lib/adminAuth";
import { MediaItem, CATEGORIES, MediaCategory } from "@/lib/mediaStore";
import PageHero from "@/components/PageHero";

type FilterType = "All" | "image" | "video" | MediaCategory;

export default function GalleryPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [filter, setFilter] = useState<FilterType>("All");
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);
  const [search, setSearch] = useState("");
  const [lbIdx, setLbIdx] = useState<number>(0);

  useEffect(() => { setMedia(loadMedia()); }, []);

  const filtered = media.filter((item) => {
    const matchFilter = filter === "All" || filter === item.type || filter === item.category;
    const matchSearch = !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.location.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const featured = media.filter((m) => m.featured);

  const openLightbox = useCallback((item: MediaItem) => {
    const idx = filtered.findIndex((m) => m.id === item.id);
    setLbIdx(idx >= 0 ? idx : 0);
    setLightbox(item);
  }, [filtered]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prevItem = useCallback(() => {
    const newIdx = (lbIdx - 1 + filtered.length) % filtered.length;
    setLbIdx(newIdx);
    setLightbox(filtered[newIdx]);
  }, [lbIdx, filtered]);

  const nextItem = useCallback(() => {
    const newIdx = (lbIdx + 1) % filtered.length;
    setLbIdx(newIdx);
    setLightbox(filtered[newIdx]);
  }, [lbIdx, filtered]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevItem();
      if (e.key === "ArrowRight") nextItem();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeLightbox, prevItem, nextItem]);

  const typeFilters: { label: string; value: FilterType }[] = [
    { label: "All Media", value: "All" },
    { label: "📸 Photos", value: "image" },
    { label: "🎬 Videos", value: "video" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Our Gallery"
        title={<>See Our Work<br /><span className="text-brown-300">In Action</span></>}
        subtitle="Browse photos and videos from roofing and interior design projects across Kenya. Every image tells a story of craftsmanship and pride."
        gradientFrom="#1f1f1f"
        gradientTo="#4a2209"
        roofImage="https://picsum.photos/seed/gallery_hero_roof/500/360"
        interiorImage="https://picsum.photos/seed/gallery_hero_int/400/300"
      />

      {/* ── Featured ── */}
      {featured.length > 0 && (
        <section className="section-padding bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="title-line" />
            <h2 className="section-title mb-10">Featured Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item)}
                  className="card group cursor-pointer overflow-hidden"
                >
                  <div className="relative h-52 overflow-hidden bg-roofGrey-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.thumb} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl">
                          <span className="text-2xl ml-1">▶</span>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-brown-500 text-white text-xs px-2 py-1 rounded font-medium">★ Featured</span>
                      <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">{item.type === "video" ? "🎬" : "📸"}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-roofGreen-600 text-xs font-medium uppercase tracking-wide mb-1">{item.category}</p>
                    <h3 className="font-heading font-bold text-roofGrey-800 leading-tight mb-1">{item.title}</h3>
                    <p className="text-roofGrey-400 text-xs">📍 {item.location} · {item.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Filters ── */}
      <div className="sticky top-[69px] z-30 bg-white border-b border-roofGrey-100 shadow-sm px-6 md:px-12 lg:px-24 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            {typeFilters.map((f) => (
              <button key={f.value} onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === f.value ? "bg-brown-500 text-white shadow-md" : "bg-roofGrey-100 text-roofGrey-600 hover:bg-brown-50 hover:text-brown-500"}`}>
                {f.label}
              </button>
            ))}
            <div className="w-px bg-roofGrey-200 mx-1" />
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-3 py-2 rounded-full text-xs transition-all ${filter === cat ? "bg-roofGreen-500 text-white shadow-md" : "bg-roofGrey-100 text-roofGrey-600 hover:bg-roofGreen-50 hover:text-roofGreen-700"}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative max-w-sm flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-roofGrey-400 text-sm">🔍</span>
              <input type="text" placeholder="Search gallery..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-roofGrey-200 rounded-full text-sm outline-none focus:border-brown-400" />
            </div>
            <p className="text-xs text-roofGrey-400">{filtered.length} of {media.length} items</p>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="section-padding bg-roofGrey-50 roof-pattern">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-heading text-xl text-roofGrey-600 mb-2">No results found</h3>
              <button onClick={() => { setFilter("All"); setSearch(""); }} className="mt-4 btn-secondary text-xs">Clear Filters</button>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item)}
                  className="break-inside-avoid card group cursor-pointer overflow-hidden mb-0"
                >
                  <div className="relative overflow-hidden bg-roofGrey-200">
                    {item.type === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.thumb} alt={item.title} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ minHeight: "160px" }} />
                    ) : (
                      <div className="relative" style={{ minHeight: "180px" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.thumb} alt={item.title} className="w-full object-cover opacity-70" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"><span className="text-xl ml-0.5">▶</span></div>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-brown-500/0 group-hover:bg-brown-500/20 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-3 py-1.5 rounded-full">
                        {item.type === "video" ? "▶ Play" : "🔍 View"}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded">{item.type === "video" ? "🎬" : "📸"}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-brown-500 text-xs font-medium uppercase tracking-wide mb-1">{item.category}</p>
                    <h3 className="font-heading font-bold text-roofGrey-800 text-sm leading-tight mb-1">{item.title}</h3>
                    <p className="text-roofGrey-400 text-xs">📍 {item.location} · {item.year}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── LIGHTBOX — 3/4 screen ── */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 md:p-4"
          onClick={closeLightbox}>
          <div
            className="relative bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            style={{ width: "75vw", maxWidth: "1200px", height: "75vh", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button onClick={closeLightbox}
              className="absolute top-3 right-3 z-20 w-9 h-9 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black text-xl font-bold leading-none">
              ×
            </button>

            {/* Prev / Next */}
            {filtered.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prevItem(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black text-lg font-bold">
                  ‹
                </button>
                <button onClick={(e) => { e.stopPropagation(); nextItem(); }}
                  className="absolute right-3 md:right-[36%] top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black text-lg font-bold">
                  ›
                </button>
              </>
            )}

            {/* Media — takes 65% */}
            <div className="md:w-[65%] bg-black flex items-center justify-center overflow-hidden flex-shrink-0">
              {lightbox.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={lightbox.src} alt={lightbox.title} className="w-full h-full object-contain" />
              ) : (
                <iframe src={lightbox.src} title={lightbox.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen />
              )}
            </div>

            {/* Info panel — 35% */}
            <div className="md:w-[35%] p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xs bg-brown-100 text-brown-600 px-3 py-1 rounded-full font-medium">{lightbox.category}</span>
                  <span className="text-xs bg-roofGrey-100 text-roofGrey-500 px-3 py-1 rounded-full">
                    {lightbox.type === "video" ? "🎬 Video" : "📸 Photo"}
                  </span>
                </div>
                <h2 className="font-heading font-bold text-2xl text-roofGrey-800 mb-4 leading-tight">{lightbox.title}</h2>
                <p className="text-roofGrey-500 leading-relaxed text-sm mb-6">{lightbox.description}</p>
                <div className="space-y-3">
                  <div className="flex gap-3 text-sm"><span className="text-brown-400">📍</span><span className="text-roofGrey-600">{lightbox.location}</span></div>
                  <div className="flex gap-3 text-sm"><span className="text-brown-400">📅</span><span className="text-roofGrey-600">{lightbox.year}</span></div>
                  {lightbox.featured && <div className="flex gap-3 text-sm"><span className="text-brown-400">★</span><span className="text-brown-500 font-medium">Featured Project</span></div>}
                </div>

                {/* Counter */}
                <p className="text-roofGrey-400 text-xs mt-4">{lbIdx + 1} / {filtered.length}</p>
              </div>
              <div className="mt-6 pt-6 border-t border-roofGrey-100">
                <a href="/contact" className="btn-primary block text-center text-xs" onClick={closeLightbox}>
                  Get a Quote Like This
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
