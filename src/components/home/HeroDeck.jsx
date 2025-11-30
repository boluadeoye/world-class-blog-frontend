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
  const pausedRef = useRef(false);
  const rafRef = useRef(0);
  const loopWidthRef = useRef(0);

  // Measure after images decode, then start loop
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const imgs = Array.from(el.querySelectorAll("img"));
    const decodeAll = Promise.all(
      imgs.map(img => (img.decode ? img.decode().catch(() => {}) : Promise.resolve()))
    ).catch(() => {});

    let disposed = false;

    const measure = () => {
      const sets = el.querySelectorAll(".rail-set");
      if (sets.length > 0) {
        loopWidthRef.current = sets[0].scrollWidth || sets[0].getBoundingClientRect().width;
      }
    };

    const startLoop = () => {
      cancelAnimationFrame(rafRef.current);
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) return; // respect reduced motion

      const speed = 0.8; // px per frame (~48px/s @60fps)
      const step = () => {
        if (disposed) return;
        const el = trackRef.current;
        if (!el) return;
        if (!pausedRef.current && loopWidthRef.current > 0) {
          el.scrollLeft += speed;
          if (el.scrollLeft >= loopWidthRef.current) {
            el.scrollLeft -= loopWidthRef.current; // seamless wrap
          }
        }
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const init = async () => {
      await decodeAll;
      measure();
      startLoop();
    };
    init();

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    const onVis = () => {
      // pause loop when tab hidden
      pausedRef.current = document.hidden || pausedRef.current;
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      disposed = true;
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const pause = (v) => { pausedRef.current = v; };

  const byTile = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const tile = el.querySelector(".lux-tile");
    const gap = 12;
    const dist = (tile ? tile.getBoundingClientRect().width : 240) + gap;
    el.scrollBy({ left: dir * dist, behavior: "smooth" });
  };

  return (
    <div className="lux-rail">
      <button className="rail-nav rail-left" aria-label="Scroll left" onClick={() => byTile(-1)}>
        <span className="btn-rail"><ChevronLeft size={16} /></span>
      </button>

      <div
        className="lux-rail-track no-scrollbar"
        ref={trackRef}
        onMouseEnter={() => pause(true)}
        onMouseLeave={() => pause(false)}
        onTouchStart={() => pause(true)}
        onTouchEnd={() => pause(false)}
        onFocus={() => pause(true)}
        onBlur={() => pause(false)}
        tabIndex={0}
        aria-label="Quick sections"
      >
        {/* duplicate for seamless loop */}
        <div className="rail-set">{children}</div>
        <div className="rail-set" aria-hidden="true">{children}</div>
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

  // Crisp timing
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

          {/* Auto-scrolling horizontal rail */}
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
