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
  const name = "Boluwatife";
  const role = "Full‑stack Developer & Writer";
  const bio =
    "I share fast, practical notes on building products, clean engineering, and writing in public.";

  return (
    <section
      className={[
        "relative overflow-hidden rounded-3xl border border-white/10",
        "mx-auto max-w-6xl mt-6 px-6 py-8 sm:px-10 sm:py-10",
        "bg-slate-950",
        "bg-[radial-gradient(120%_90%_at_10%_-10%,rgba(99,102,241,.12),transparent_60%),radial-gradient(110%_80%_at_95%_10%,rgba(14,165,233,.1),transparent_60%)]",
      ].join(" ")}
    >
      {/* inner glow + noise */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
      <div className="noise-mask pointer-events-none absolute inset-0 rounded-3xl opacity-[0.06]" />
      {/* dynamic crest top-right */}
      <HeroCrest />

      <div className="grid grid-cols-12 items-center gap-6">
        {/* TEXT (left) */}
        <div className="col-span-12 md:col-span-7">
          <div className="flex items-center gap-2">
            <span className="hero-accent" aria-hidden="true" />
            <span className="text-amber-400 text-[12px] tracking-[.18em] uppercase select-none">
              Welcome to my blog
            </span>
          </div>

          <AnimatedLetters
            text={name}
            className={[
              playfair.className,
              "mt-2 block text-white font-extrabold leading-[1.03] text-5xl sm:text-6xl",
            ].join(" ")}
          />

          <div className="mt-3 flex items-center gap-2">
            <Code2 size={20} className="shrink-0 text-amber-400 translate-y-[1px]" aria-hidden="true" />
            <div className="hero-role">{role}</div>
          </div>

          <p className="mt-3 max-w-md text-slate-300 hero-fade-in">{bio}</p>

          <span className="relative inline-block cta-hand hero-fade-in-delayed">
            <a
              href="/chat"
              className={[
                "inline-flex items-center justify-center rounded-full px-5 py-2",
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

        {/* FEATURE DECK (right) */}
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
    </section>
  );
}
