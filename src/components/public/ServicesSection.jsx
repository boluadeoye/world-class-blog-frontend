"use client";

import { useEffect, useRef } from "react";
import { Code2, PenTool, Camera } from "lucide-react";

/**
 * Horizontal services rail:
 * - Compact cards in a snap-x track
 * - Reveal-in from the right as cards enter view
 * - Arrow buttons scroll by one card
 * - Respects prefers-reduced-motion
 */
const SERVICES = [
  {
    title: "Full‑stack Development",
    desc: "Design, build and ship web apps that are fast and reliable.",
    Icon: Code2,
    accent: "sky",
    highlight: true,
  },
  {
    title: "Technical Writing",
    desc: "Docs, tutorials and notes that teach and scale your work.",
    Icon: PenTool,
    accent: "violet",
    highlight: false,
  },
  {
    title: "Video & Demos",
    desc: "Concise product videos and walkthroughs people finish.",
    Icon: Camera,
    accent: "emerald",
    highlight: false,
  },
];

export default function ServicesSection() {
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const items = Array.from(el.querySelectorAll(".srv-item"));
    if (reduce) {
      items.forEach((i) => i.classList.add("reveal-in"));
      return;
    }

    // Reveal-in when item is >= 40% visible inside the track
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("reveal-in");
        });
      },
      { root: el, threshold: 0.4 }
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  const scrollByCards = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    // Find first card width for consistent paging
    const card = el.querySelector(".srv-item");
    const w = card ? card.getBoundingClientRect().width : 300;
    el.scrollBy({ left: dir * (w + 16), behavior: "smooth" });
  };

  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-3 flex items-center justify-between">
        <div className="relative">
          <p className="section-eyebrow">01.</p>
          <h2 className="section-h2">Services</h2>
          <div aria-hidden className="ghost-title">Services</div>
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="Scroll left" onClick={() => scrollByCards(-1)} className="btn-ghost h-9 w-9 rounded-xl">&larr;</button>
          <button aria-label="Scroll right" onClick={() => scrollByCards(1)} className="btn-ghost h-9 w-9 rounded-xl">&rarr;</button>
          <a href="/projects" className="btn-ghost">View all services</a>
        </div>
      </div>

      <div className="relative -mx-4 px-4">
        {/* Horizontal rail */}
        <div
          ref={trackRef}
          className="srv-track no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto py-1"
        >
          {SERVICES.map(({ title, desc, Icon, highlight }, i) => (
            <article
              key={title}
              className={[
                "srv-item reveal-x snap-start min-w-[84%] sm:min-w-[420px] md:min-w-[360px] lg:min-w-[340px]",
                "rounded-2xl border shadow-sm overflow-hidden transition-colors",
                highlight
                  ? "border-sky-700/50 bg-gradient-to-br from-sky-700/40 to-sky-900/30"
                  : "border-slate-800 bg-slate-900/40 hover:border-slate-700",
              ].join(" ")}
              style={{ viewTransitionName: `srv-${i}` }}
            >
              <div className="p-5">
                <div
                  className={[
                    "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg",
                    highlight ? "bg-sky-600/30 text-sky-200" : "bg-slate-800 text-slate-300",
                  ].join(" ")}
                >
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
                <p className="mt-2 text-sm text-slate-300/90">{desc}</p>
              </div>
            </article>
          ))}
          {/* Spacer so last card can center nicely */}
          <div className="min-w-[8%] sm:min-w-[24px]" aria-hidden />
        </div>

        {/* Edge fades */}
        <div className="srv-fade-left" aria-hidden />
        <div className="srv-fade-right" aria-hidden />
      </div>
    </section>
  );
}
