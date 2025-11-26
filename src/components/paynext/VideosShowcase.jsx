"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function LiteYT({ id, title = "Video", start = 0, className = "" }) {
  const [on, setOn] = useState(false);
  const poster = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1${start?`&start=${start}`:""}`;
  return (
    <div className={`lite-yt-embed rounded-[18px] overflow-hidden ${className}`}>
      {on ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" className="relative block w-full h-full" aria-label={`Play ${title}`} onClick={() => setOn(true)}>
          <div className="lite-yt-poster" style={{ backgroundImage: `url(${poster})` }} />
          <div className="lite-yt-gradient" />
          <svg className="lite-yt-playbtn" viewBox="0 0 68 48" width="68" height="48" aria-hidden="true">
            <path className="lite-yt-playbtn-bg" d="M66.52 7.74a8 8 0 0 0-5.63-5.66C56.69 1 34 1 34 1S11.31 1 7.11 2.08a8 8 0 0 0-5.63 5.66C.4 11.94.4 24 .4 24s0 12.06 1.08 16.26a8 8 0 0 0 5.63 5.66C11.31 47 34 47 34 47s22.69 0 26.89-1.08a8 8 0 0 0 5.63-5.66C67.6 36.06 67.6 24 67.6 24s0-12.06-1.08-16.26z" fill="currentColor"/>
            <path d="M45 24 27 14v20" fill="#fff"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export default function VideosShowcase({ featured = null, items = [], id }) {
  const initial = useMemo(() => featured?.id ? featured : (items?.[0] || null), [featured, items]);
  const [current, setCurrent] = useState(initial);
  const topRef = useRef(null);
  useEffect(() => { setCurrent(initial); }, [initial]);

  if ((!featured || !featured.id) && (!items || items.length === 0)) return null;

  const pick = (v) => { setCurrent(v); try { topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); } catch {} };

  return (
    <section id={id} className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-4">
          <div className="text-[11px] uppercase tracking-[.18em] text-slate-400">Videos</div>
          <h2 className="h2-compact">Watch Recent Videos</h2>
        </div>

        {current?.id && (
          <div ref={topRef} className="rounded-[18px] border border-slate-800 bg-slate-900/40 p-3 sm:p-4 mb-4">
            <h3 className="text-slate-50 font-semibold text-lg sm:text-xl">{current.title || "Video"}</h3>
            {current.caption ? <p className="mt-1 text-sm text-slate-300/90">{current.caption}</p> : null}
            <div className="mt-3">
              <LiteYT id={current.id} start={current.start || 0} title={current.title || "Video"} className="w-full" />
            </div>
          </div>
        )}

        {Array.isArray(items) && items.length > 0 && (
          <div className="relative -mx-4 px-4">
            <div className="no-scrollbar overflow-x-auto flex gap-3 py-1 snap-x snap-mandatory">
              {items.map((v, i) => (
                <button
                  key={`${v.id}-${i}`}
                  type="button"
                  onClick={() => pick(v)}
                  className="group snap-start min-w-[72%] sm:min-w-[360px] md:min-w-[320px] lg:min-w-[360px] rounded-[16px] overflow-hidden border border-slate-800 bg-slate-900/40 text-left"
                >
                  <div className="relative aspect-[16/9]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="" src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" />
                    <div className="card-topfade" />
                  </div>
                  <div className="p-3">
                    <h4 className="text-[13.5px] sm:text-[15px] font-semibold leading-snug text-slate-50 line-clamp-2">
                      {v.title || "Video"}
                    </h4>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
