// src/components/home/HeroDeck.jsx
"use client";

import { Code2, NotebookPen, Clapperboard, MessageSquare } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import HeroCrest from "./HeroCrest";
import TypeShow from "../motion/TypeShow";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700","800","900"] });

export default function HeroDeck() {
  const name = "Boluwatife";
  const role = "FULL‑STACK DEVELOPER & WRITER";
  const bio  = "I build fast, clear web experiences and share practical notes on engineering, product, and writing.";

  // Faster, crisp sequencing
  const step  = 18;   // was 28
  const dur   = 360;  // was 480
  const gap   = 90;   // was 140

  const nameTotal = (name.length - 1) * step + dur + gap;
  const roleTotal = (role.length - 1) * step + dur + gap;
  const roleStart = nameTotal;
  const bioStart  = nameTotal + roleTotal;

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-6">
      <div className="relative mx-auto max-w-6xl studio-min-card px-6 sm:px-10 py-8 sm:py-10">
        {/* ambient + crest */}
        <div className="studio-min-aurora a" aria-hidden />
        <div className="studio-min-aurora b" aria-hidden />
        <div className="hero-crest-layer" aria-hidden><HeroCrest /></div>

        <div className="relative z-[2] grid grid-cols-12 items-start gap-6">
          <div className="col-span-12">
            {/* Name with luxurious gradient */}
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

            {/* Role (single line) */}
            <div className="mt-3 flex items-center gap-2">
              <Code2
                size={14}
                className="shrink-0 text-[color:var(--acc-gold)] translate-y-[1px] seq-fade"
                style={{ '--delay': `${Math.max(0, roleStart - 80)}ms` }}
                aria-hidden="true"
              />
              <span className="hero-role-line">
                <TypeShow
                  text={role}
                  startAt={roleStart}
                  step={step}
                  dur={dur}
                  className="hero-role-gradient"
                />
              </span>
            </div>

            {/* Intro line */}
            <TypeShow
              text={bio}
              startAt={bioStart}
              step={step}
              dur={dur}
              className="hero-copy-min hero-copy-beauty mt-4 max-w-[50ch] block"
            />

            {/* CTA */}
            <div className="mt-5 sm:mt-6">
              <span className="relative inline-block cta-hand">
                <a
                  href="/chat"
                  className="cta-chip-min seq-fade"
                  style={{ '--delay': `${bioStart + 160}ms` }}
                >
                  <span>Open Chat</span>
                  <MessageSquare className="ico" aria-hidden="true" />
                </a>
                <span className="hand-cursor" aria-hidden="true">👈</span>
              </span>
            </div>
          </div>

          {/* Horizontal rail (manual scroll) */}
          <div className="col-span-12">
            <div className="lux-rail">
              <div className="lux-rail-track no-scrollbar" tabIndex={0} aria-label="Quick sections">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
