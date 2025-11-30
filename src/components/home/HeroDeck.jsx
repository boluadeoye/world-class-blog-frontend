// src/components/home/HeroDeck.jsx
"use client";

import { useMemo } from "react";
import { Code2, NotebookPen, Clapperboard, Rocket, MessageSquare } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import HeroCrest from "./HeroCrest";
import TypeShow from "../motion/TypeShow";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700","800","900"] });

export default function HeroDeck() {
  const name = "Boluwatife";
  const role = "FULL‑STACK DEVELOPER & WRITER";
  const bio  = "I build fast, clear web experiences and share practical notes on engineering, product, and writing.";

  // sequencing: name -> role -> tagline
  const step  = 38;   // ms between characters (fast but not brisk)
  const dur   = 650;  // ms per character animation
  const gap   = 180;  // ms gap between sections

  const nameTotal = (name.length - 1) * step + dur + gap;
  const roleTotal = (role.length - 1) * step + dur + gap;

  const roleStart = nameTotal;
  const bioStart  = nameTotal + roleTotal;

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-6">
      <div className="relative mx-auto max-w-6xl studio-min-card px-6 sm:px-10 py-8 sm:py-10">
        {/* minimal ambient + crest (below content) */}
        <div className="studio-min-aurora a" aria-hidden />
        <div className="studio-min-aurora b" aria-hidden />
        <div className="hero-crest-layer" aria-hidden><HeroCrest /></div>

        <div className="relative z-[2] grid grid-cols-12 items-center gap-6">
          {/* Left: text */}
          <div className="col-span-12 md:col-span-7 pr-1 sm:pr-4">
            {/* Name: letter-by-letter */}
            <TypeShow
              text={name}
              startAt={0}
              step={step}
              dur={dur}
              className={[
                playfair.className,
                "hero-title-min mt-0 block",
                "text-[44px] sm:text-[58px] md:text-[68px]"
              ].join(" ")}
            />

            {/* Role: letter-by-letter, starts after name finishes */}
            <div className="mt-3 flex items-center gap-2">
              <Code2
                size={14}
                className="shrink-0 text-[color:var(--acc-gold)] translate-y-[1px] seq-fade"
                style={{ animationDelay: `${Math.max(0, roleStart - 120)}ms` }}
                aria-hidden="true"
              />
              <TypeShow
                text={role}
                startAt={roleStart}
                step={step}
                dur={dur}
                className="font-extrabold tracking-wide text-[color:var(--acc-gold)]"
              />
            </div>

            {/* Tagline: letter-by-letter, starts after role finishes */}
            <TypeShow
              text={bio}
              startAt={bioStart}
              step={step}
              dur={dur}
              className="hero-copy-min hero-copy-beauty mt-4 max-w-[50ch] block"
            />

            {/* CTA appears near the end of the tagline sequence */}
            <div className="mt-5 sm:mt-6">
              <span className="relative inline-block cta-hand">
                <a
                  href="/chat"
                  className="cta-chip-min seq-fade"
                  style={{ animationDelay: `${bioStart + 280}ms` }}
                >
                  <span>Open Chat</span>
                  <MessageSquare className="ico" aria-hidden="true" />
                </a>
                <span className="hand-cursor" aria-hidden="true">👈</span>
              </span>
            </div>
          </div>

          {/* Right: feature deck (unchanged) */}
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
