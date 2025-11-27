"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* Lite poster-first player (no iframe until click) */
function LiteYT({ id, title = "Video", start = 0 }) {
  const [on, setOn] = useState(false);
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1${start?`&start=${start}`:""}`;
  const poster = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
      {on ? (
        <iframe
          className="absolute inset-0 h-full w-full rounded-xl border-0"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          aria-label={`Play ${title}`}
          onClick={() => setOn(true)}
          className="group absolute inset-0 h-full w-full"
        >
          {/* poster */}
          <img
            src={poster}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
          {/* gradient + play */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" viewBox="0 0 68 48" width="68" height="48" aria-hidden="true">
            <path d="M66.52 7.74a8 8 0 0 0-5.63-5.66C56.69 1 34 1 34 1S11.31 1 7.11 2.08a8 8 0 0 0-5.63 5.66C.4 11.94.4 24 .4 24s0 12.06 1.08 16.26a8 8 0 0 0 5.63 5.66C11.31 47 34 47 34 47s22.69 0 26.89-1.08a8 8 0 0 0 5.63-5.66C67.6 36.06 67.6 24 67.6 24s0-12.06-1.08-16.26z" fill="rgba(15,23,42,.7)"/>
            <path d="M45 24 27 14v20" fill="#fff"/>
          </svg>
        </button>
      )}
    </div>
  );
}

function ThumbCard({ v, onPick }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <button
      type="button"
      onClick={() => onPick(v)}
      className={[
        "snap-start group min-w-[72%] sm:min-w-[360px] md:min-w-[320px] lg:min-w-[360px]",
        "video-card relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60",
        "transition-shadow hover:shadow-[0_26px_64px_rgba(0,0,0,.55)]",
      ].join(" ")}
    >
      <div className="relative aspect-[16/9]">
        {!loaded && <div className="skel absolute inset-0 rounded-2xl" />}
        <img
          src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] rounded-2xl"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>
      <div className="p-3">
        <h4 className="text-[13.5px] sm:text-[15px] font-semibold leading-snug text-slate-50 line-clamp-2">
          {v.title || "Video"}
        </h4>
      </div>
    </button>
  );
}

export default function VideosShowcase({ featured = null, items = [], id }) {
  const initial = useMemo(() => (featured?.id ? featured : (items?.[0] || null)), [featured, items]);
  const [current, setCurrent] = useState(initial);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const topRef = useRef(null);

  useEffect(() => { setCurrent(initial); setPosterLoaded(false); }, [initial]);

  const select = (v) => {
    setCurrent(v);
    try { topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); } catch {}
  };

  const have = current?.id || (Array.isArray(items) && items.length > 0);
  if (!have) return null;

  return (
    <section id={id} className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="text-[11px] uppercase tracking-[.18em] text-slate-400">Videos</div>
          <h2 className="h2-compact">Watch Recent Videos</h2>
          <p className="mx-auto -mt-1.5 max-w-2xl text-[12.5px] text-slate-400">
            Videos are embedded from YouTube to aid learning; credit to their creators.
          </p>
        </div>

        {/* Featured frame */}
        <div ref={topRef} className="video-frame rounded-2xl border border-white/10 bg-slate-950/60 p-3 sm:p-4 mb-4">
          {/* Title skeleton */}
          {!current?.id ? (
            <div className="skel h-6 w-2/3 rounded-md" />
          ) : (
            <h3 className="text-slate-50 font-semibold text-lg sm:text-xl mb-2">{current.title}</h3>
          )}

          {/* Stable skeleton for player area */}
          <div className="relative">
            {!posterLoaded && <div className="skel absolute inset-0 rounded-xl" />}
            {/* we mount LiteYT; the first render shows poster from YT (cannot detect load reliably),
                so we also render a hidden poster img to flip the skeleton once loaded */}
            {current?.id && <LiteYT id={current.id} start={current.start || 0} title={current.title || "Video"} />}
            {/* hidden loader for poster */}
            {current?.id && (
              <img
                src={`https://i.ytimg.com/vi/${current.id}/hqdefault.jpg`}
                alt=""
                className="hidden"
                onLoad={() => setPosterLoaded(true)}
              />
            )}
          </div>

          {current?.caption ? (
            <p className="mt-3 text-sm text-slate-300/90">{current.caption}</p>
          ) : (
            <div className="mt-3 skel h-4 w-1/2 rounded-md" />
          )}
        </div>

        {/* Horizontal rail of classy cards */}
        {Array.isArray(items) && items.length > 0 && (
          <div className="relative -mx-4 px-4">
            <div className="no-scrollbar overflow-x-auto flex gap-3 py-1 snap-x snap-mandatory">
              {items.map((v, i) => (
                <ThumbCard key={`${v.id}-${i}`} v={v} onPick={select} />
              ))}
            </div>
            <div className="fade-l" aria-hidden />
            <div className="fade-r" aria-hidden />
          </div>
        )}
      </div>
    </section>
  );
}
