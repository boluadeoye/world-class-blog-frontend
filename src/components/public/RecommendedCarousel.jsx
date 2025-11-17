"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PostCard from "./PostCard";
import Reveal from "./Reveal";

export default function RecommendedCarousel({ posts = [] }) {
  const list = posts.slice(0, 8); // top 8 as "recommended"
  const ref = useRef(null);

  const scrollBy = (dx) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  if (!list.length) return null;

  return (
    <Reveal>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-slate-50">Recommended</h3>
        <div className="flex gap-2">
          <button
            className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-200 hover:border-sky-500/60"
            onClick={() => scrollBy(-300)}
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-200 hover:border-sky-500/60"
            onClick={() => scrollBy(300)}
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {list.map((p) => (
          <div key={p.id ?? p.slug} className="min-w-[280px] max-w-[320px] flex-1 scroll-snap-align-start">
            <PostCard post={p} />
          </div>
        ))}
      </div>
    </Reveal>
  );
}