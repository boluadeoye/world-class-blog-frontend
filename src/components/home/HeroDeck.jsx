// src/components/home/HeroDeck.jsx
"use client";

import { useMemo } from "react";
import { Code2, NotebookPen, Clapperboard, Rocket, MessageSquare } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import HeroCrest from "./HeroCrest";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700","800","900"],
});

function AnimatedLetters({ text, className }) {
  const letters = useMemo(() => Array.from(text), [text]);
  return (
    <span className={className} aria-label={text}>
      {letters.map((ch, i) => (
        <span key={i} className="hero-char" style={{ animationDelay: `${i * 38}ms` }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

export default function HeroDeck() {
  const hello = "Hi, my name is";
  const name  = "Boluwatife";
  const role  = "Full‑stack Developer & Writer";
  const bio   = "I share fast, practical notes on building products, clean engineering, and writing in public.";

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-6">
      <div
        className={[
          "relative mx-auto max-w-6xl rounded-3xl hero-glass border border-white/10",
          "px-6 sm:px-10 py-7 sm:py-9",
        ].join(" ")}
      >
        {/* neon rim + subtle noise */}
        <div className="hero-neon pointer-events-none" aria-hidden />
        <div className="noise-mask pointer-events-none absolute inset-0 rounded-3xl opacity-[0.05]" aria-hidden />
        {/* decorative crest, kept subtle */}
        <HeroCrest />

        <div className="grid grid-cols-12 items-center gap-6">
          {/* TEXT LEFT (more air between blocks) */}
          <div className="col-span-12 md:col-span-7 pr-1 sm:pr-4">
            <div className="hero-hello">{hello}</div>

            <AnimatedLetters
              text={name}
              className={[
                playfair.className,
                "mt-1.5 block text-white font-extrabold leading-[1.06]",
                "text-[40px] sm:text-[54px] md:text-[64px]",
              ].join(" ")}
            />

            <div className="mt-3.5 flex items-center gap-2">
              <Code2 size={20} className="shrink-0 text-amber-400 translate-y-[1px]" aria-hidden="true" />
              <div className="hero-role">{role}</div>
            </div>

            <p className="mt-3.5 max-w-[46ch] text-[15.5px] leading-[1.65] text-slate-300 hero-fade-in">
              {bio}
            </p>

            {/* CTA with breathing room */}
            <span className="relative inline-block cta-hand hero-fade-in-delayed mt-5 sm:mt-6">
              <a
                href="/chat"
                className={[
                  "inline-flex items-center justify-center rounded-full px-5 py-2.5",
                  "border border-white/80 text-white/90",
                  "hover:bg-white hover:text-black transition-all duration-200",
                  "backdrop-blur-sm btn-tap",
                ].join(" ")}
              >
                Open Chat
                <MessageSquare size={18} className="ml-2" />
              </a>
              <span className="hand-cursor">👈</span>
            </span>
          </div>

          {/* FEATURE DECK RIGHT (unchanged) */}
          <div className="col-span-12 md:col-span-5">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <a href="/articles" className="deck-card group">
                <div className="deck-ring" />
                <div className="deck-blob deck-blob-cyan" />
                <NotebookPen className="text-white/90" />
                <div className="deck-title">Latest Notes</div>
                <div className="deck-sub">Concise ideas & deep dives</div>
              </a>

              <a href="/#videos" className="deck-card group">
                <div className="deck-ring" />
                <div className="deck-blob deck-blob-violet" />
                <Clapperboard className="text-white/90" />
                <div className="deck-title">Videos</div>
                <div className="deck-sub">Demos & walkthroughs</div>
              </a>

              <a href="/projects" className="deck-card group">
                <div className="deck-ring" />
                <div className="deck-blob deck-blob-emerald" />
                <Rocket className="text-white/90" />
                <div className="deck-title">Projects</div>
                <div className="deck-sub">What I’m building</div>
              </a>

              <a href="/about" className="deck-card group">
                <div className="deck-ring" />
                <div className="deck-blob deck-blob-amber" />
                <MessageSquare className="text-white/90" />
                <div className="deck-title">About</div>
                <div className="deck-sub">How I work</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
