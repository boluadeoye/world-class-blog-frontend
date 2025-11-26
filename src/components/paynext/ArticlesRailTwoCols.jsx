"use client";

import { useEffect, useRef } from "react";

function whenOf(p) {
  const d = new Date(p?.created_at || p?.createdAt || Date.now());
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

export default function ArticlesRailTwoCols({ posts = [] }) {
  const ref = useRef(null);

  // Gentle auto glide; pauses on interaction; respects reduced motion
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    let raf = 0;
    let dir = 1;
    let speed = 0.35;
    let paused = false;
    let pauseTimer = 0;

    const loop = () => {
      if (!paused) {
        const max = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= max - 2) dir = -1;
        if (el.scrollLeft <= 2) dir = 1;
        el.scrollLeft += dir * speed;
      }
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      paused = true;
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(() => (paused = false), 1500);
    };

    el.addEventListener("pointerdown", pause, { passive: true });
    el.addEventListener("wheel", pause, { passive: true });
    el.addEventListener("touchstart", pause, { passive: true });

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(pauseTimer);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("wheel", pause);
      el.removeEventListener("touchstart", pause);
    };
  }, []);

  if (!Array.isArray(posts) || posts.length === 0) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-3">
          <div className="text-[11px] uppercase tracking-[.18em] text-slate-400">All Articles</div>
          <h2 className="h2-compact">Browse Everything</h2>
        </div>

        <div className="relative -mx-4 px-4">
          <div
            ref={ref}
            className="two-rail no-scrollbar overflow-x-auto py-1"
          >
            {posts.map((p, i) => {
              const href = p?.slug ? `/post/${p.slug}` : "#";
              const tag = Array.isArray(p?.tags) && p.tags[0] ? p.tags[0] : null;
              const cover = p?.meta?.cover || p?.meta?.image || null; // no auto fallback
              const row = i % 2 ? "2" : "1"; // two rows
              return (
                <a
                  key={i}
                  href={href}
                  className="two-item group block overflow-hidden rounded-[18px] border border-slate-800 bg-slate-900/40 hover:border-slate-700 transition"
                  style={{ gridRow: row }}
                >
                  <div className="relative aspect-[16/9]">
                    {cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        alt=""
                        src={cover}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="card-grad absolute inset-0" />
                    )}
                    <div className="card-topfade" />
                  </div>
                  <div className="p-3">
                    {tag ? <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{tag}</div> : <div className="h-[14px]" />}
                    <h3 className="mt-1 text-slate-50 font-semibold leading-snug">{p?.title || "Untitled"}</h3>
                    <div className="mt-1 text-[12px] text-slate-400">{whenOf(p)}</div>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="fade-l" aria-hidden />
          <div className="fade-r" aria-hidden />
        </div>
      </div>
    </section>
  );
}
