"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700","800","900"],
});

/* Lite player: no iframe until click */
function LiteYT({ id, title = "Video", start = 0 }) {
  const [on, setOn] = useState(false);
  const poster = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1${start?`&start=${start}`:""}`;
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
          <img
            src={poster}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" viewBox="0 0 68 48" width="68" height="48" aria-hidden="true">
            <path d="M66.52 7.74a8 8 0 0 0-5.63-5.66C56.69 1 34 1 34 1S11.31 1 7.11 2.08a8 8 0 0 0-5.63 5.66C.4 11.94.4 24 .4 24s0 12.06 1.08 16.26a8 8 0 0 0 5.63 5.66C11.31 47 34 47 34 47s22.69 0 26.89-1.08a8 8 0 0 0 5.63-5.66C67.6 36.06 67.6 24 67.6 24s0-12.06-1.08-16.26z" fill="rgba(8,10,18,.75)"/>
            <path d="M45 24 27 14v20" fill="#fff"/>
          </svg>
        </button>
      )}
    </div>
  );
}

/* Premium thumb card */
function ThumbCard({ v, onPick }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <button
      type="button"
      onClick={() => onPick(v)}
      className={[
        "snap-start group min-w-[78%] sm:min-w-[360px] md:min-w-[340px]",
        "studio-card rounded-2xl border border-white/10 bg-slate-950/60",
        "transition-shadow hover:shadow-[0_26px_64px_rgba(0,0,0,.55)]",
      ].join(" ")}
    >
      <div className="relative aspect-[16/9]">
        {!loaded && <div className="studio-skel absolute inset-0 rounded-2xl" />}
        <img
          src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-[1.03]"
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/38 via-transparent to-transparent" />
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

  const have = current?.id || (items && items.length > 0);
  if (!have) return null;

  return (
    <section id={id} className="px-4 sm:px-6 lg:px-8 py-7">
      <div className="mx-auto max-w-6xl">
        {/* Studio header */}
        <div className="videos-cap mb-2">
          <span className="cap-line" />
          <span className="cap-pill">Videos</span>
          <span className="cap-line" />
        </div>
        <h2 className={`${playfair.className} videos-title`}>Watch Recent Videos</h2>
        <p className="videos-sub">
          Videos are embedded from YouTube to aid learning; credit to their creators.
        </p>

        {/* Featured: Studio panel */}
        <div ref={topRef} className="studio-panel rounded-2xl border border-white/10 p-4 sm:p-5 mb-5">
          <div className="studio-noise pointer-events-none absolute inset-0 rounded-2xl" />
          <div className="studio-inner rounded-[18px] p-3 sm:p-4">
            {!current?.id ? (
              <div className="studio-skel h-6 w-2/3 rounded-md mb-3" />
            ) : (
              <h3 className="text-slate-50 font-semibold text-lg sm:text-xl mb-3">{current.title}</h3>
            )}

            <div className="relative">
              {!posterLoaded && <div className="studio-skel absolute inset-0 rounded-xl" />}
              {current?.id && <LiteYT id={current.id} start={current.start || 0} title={current.title || "Video"} />}
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
              <div className="mt-3 studio-skel h-4 w-1/2 rounded-md" />
            )}
          </div>
        </div>

        {/* Rail of premium thumb cards */}
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
