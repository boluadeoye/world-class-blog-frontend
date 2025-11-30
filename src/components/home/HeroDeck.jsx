// src/components/home/HeroDeck.jsx
"use client";

import { useEffect, useRef } from "react";
import { Code2, NotebookPen, Clapperboard, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import HeroCrest from "./HeroCrest";
import TypeShow from "../motion/TypeShow";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700","800","900"] });

function AutoRail({ children }) {
  const trackRef = useRef(null);
  const rafRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const run = () => {
      cancelAnimationFrame(rafRef.current);
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const stepPx = 0.8; // ~48px/s @ 60fps
      const tick = () => {
        const max = el.scrollWidth - el.clientWidth;
        if (!pausedRef.current && max > 2) {
          el.scrollLeft += stepPx;
          if (el.scrollLeft >= max - 1) {
            el.scrollLeft = 0; // simple wrap
          }
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    // start after a frame to ensure layout is ready
    const id = requestAnimationFrame(run);

    const onResize = () => run();
    window.addEventListener("resize", onResize);
    const onVis = () => { pausedRef.current = document.hidden || pausedRef.current; };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(id);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const byTile = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const tile = el.querySelector(".lux-tile");
    const gap = 12;
    const dist = (tile ? tile.getBoundingClientRect().width : 240) + gap;
    el.scrollBy({ left: dir * dist, behavior: "smooth" });
  };

  const pause = (v) => { pausedRef.current = v; };

  return (
    <div className="lux-rail">
      <button className="rail-nav rail-left" aria-label="Scroll left" onClick={() => byTile(-1)}>
        <span className="btn-rail"><ChevronLeft size={16} /></span>
      </button>

      <div
        ref={trackRef}
        className="lux-rail-track no-scrollbar"
        onMouseEnter={() => pause(true)}
        onMouseLeave={() => pause(false)}
        onTouchStart={() => pause(true)}
        onTouchEnd={() => pause(false)}
        onFocus={() => pause(true)}
        onBlur={() => pause(false)}
        tabIndex={0}
        aria-label="Quick sections"
      >
        {children}
      </div>

      <button className="rail-nav rail-right" aria-label="Scroll right" onClick={() => byTile(1)}>
        <span className="btn-rail"><ChevronRight size={16} /></span>
      </button>

      <div className="lux-rail-fade-left" aria-hidden="true" />
      <div className="lux-rail-fade-right" aria-hidden="true" />
    </div>
  );
}

export default function HeroDeck() {
  const name = "Boluwatife";
  const role = "FULL‑STACK DEVELOPER & WRITER";
  const bio  = "I build fast, clear web experiences and share practical notes on engineering, product, and writing.";

  // crisp sequence
  const step  = 28, dur = 480, gap = 140;
  const nameTotal = (name.length - 1) * step + dur + gap;
  const roleTotal = (role.length - 1) * step + dur + gap;
  const roleStart = nameTotal;
  const bioStart  = nameTotal + roleTotal;

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-6">
      <div className="relative mx-auto max-w-6xl studio-min-card px-6 sm:px-10 py-8 sm:py-10">
        <div className="studio-min-aurora a" aria-hidden />
        <div className="studio-min-aurora b" aria-hidden />
        <div className="hero-crest-layer" aria-hidden><HeroCrest /></div>

        <div className="relative z-[2] grid grid-cols-12 items-start gap-6">
          <div className="col-span-12">
            <TypeShow
              text={name}
              startAt={0}
              step={step}
              dur={dur}
              className={[
                playfair.className,
                "hero-title-min hero-title-gradient mt-0 block",
                "text-[44px] sm:text-[58px] md:text-[68px]"
              ].join(" ")}
            />
            <div className="mt-3 flex items-center gap-2">
              <Code2 size={14} className="shrink-0 text-[color:var(--acc-gold)] translate-y-[1px] seq-fade" style={{ '--delay': `${Math.max(0, roleStart - 100)}ms` }} aria-hidden="true" />
              <span className="hero-role-line">
                <TypeShow text={role} startAt={roleStart} step={step} dur={dur} className="hero-role-gradient" />
              </span>
            </div>
            <TypeShow text={bio} startAt={bioStart} step={step} dur={dur} className="hero-copy-min hero-copy-beauty mt-4 max-w-[50ch] block" />
            <div className="mt-5 sm:mt-6">
              <span className="relative inline-block cta-hand">
                <a href="/chat" className="cta-chip-min seq-fade" style={{ '--delay': `${bioStart + 220}ms` }}>
                  <span>Open Chat</span>
                  <MessageSquare className="ico" aria-hidden="true" />
                </a>
                <span className="hand-cursor" aria-hidden="true">👈</span>
              </span>
            </div>
          </div>

          {/* Auto-scrolling horizontal rail (Projects removed) */}
          <div className="col-span-12">
            <AutoRail>
              <a href="/articles" className="lux-tile rail-snap">
                <div className="lux-tile-overlay" />
                <NotebookPen className="text-white/90" />
                <div className="lux-tile-title">Latest Notes</div>
                <div className="lux-tile-sub">Concise ideas & deep dives</div>
              </a>
              <a href="/#videos" className="lux-tile rail-snap">
                <div className="lux-tile-overlay" />
                <Clapperboard className="text-white/90" />
                <div className="lux-tile-title">Videos</div>
                <div className="lux-tile-sub">Demos & walkthroughs</div>
              </a>
              <a href="/about" className="lux-tile rail-snap">
                <div className="lux-tile-overlay" />
                <MessageSquare className="text-white/90" />
                <div className="lux-tile-title">About</div>
                <div className="lux-tile-sub">How I work</div>
              </a>
            </AutoRail>
          </div>
        </div>
      </div>
    </section>
  );
}
