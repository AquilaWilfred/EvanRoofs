"use client";

import { useEffect, useState } from "react";

interface FloatingImage {
  src: string;
  alt: string;
  className: string;
  animClass: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  gradientFrom?: string;
  gradientTo?: string;
  roofImage?: string;
  interiorImage?: string;
}

// Animated floating blob images — roof + interior on every page
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  gradientFrom = "#4a2209",
  gradientTo = "#1e461e",
  roofImage = "https://picsum.photos/seed/rooftop99/400/300",
  interiorImage = "https://picsum.photos/seed/interior99/400/300",
}: PageHeroProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      className="relative min-h-[480px] flex items-center overflow-hidden py-28 px-6 md:px-12 lg:px-24"
      style={{ background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
    >
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)" }} />

      {/* ── Floating roof image (top-right) ── */}
      {mounted && (
        <div
          className="absolute right-[-40px] top-[10%] w-[280px] md:w-[340px] lg:w-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 opacity-0"
          style={{
            animation: "floatIn 0.9s 0.2s ease forwards, floatBob 6s 1.1s ease-in-out infinite",
            transform: "rotate(3deg)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={roofImage} alt="Roofing work" className="w-full h-48 md:h-56 object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <p className="text-white text-xs font-medium tracking-wide">🏠 Expert Roofing</p>
          </div>
        </div>
      )}

      {/* ── Floating interior image (bottom-right, offset) ── */}
      {mounted && (
        <div
          className="absolute right-[200px] md:right-[260px] lg:right-[320px] bottom-[5%] w-[200px] md:w-[240px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 opacity-0 hidden md:block"
          style={{
            animation: "floatIn 0.9s 0.5s ease forwards, floatBobAlt 7s 1.4s ease-in-out infinite",
            transform: "rotate(-2deg)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={interiorImage} alt="Interior design" className="w-full h-36 md:h-44 object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <p className="text-white text-xs font-medium tracking-wide">✨ Interior Design</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        {eyebrow && (
          <p className="text-brown-300 text-sm tracking-[0.3em] uppercase mb-4 font-medium">{eyebrow}</p>
        )}
        <h1 className="text-white font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/70 text-lg leading-relaxed max-w-xl">{subtitle}</p>
        )}
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(30px) rotate(3deg); }
          to   { opacity: 1; transform: translateY(0px) rotate(3deg); }
        }
        @keyframes floatBob {
          0%,100% { transform: translateY(0px) rotate(3deg); }
          50%      { transform: translateY(-14px) rotate(3deg); }
        }
        @keyframes floatBobAlt {
          0%,100% { transform: translateY(0px) rotate(-2deg); }
          50%      { transform: translateY(-10px) rotate(-2deg); }
        }
      `}</style>
    </section>
  );
}
