"use client";

import Image from "next/image";
import { PenSquare, Sparkles, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import adeoyePic from "../../../public/adeoye.jpg";

export default function HomeHero({ heroPost, totalCount }) {
  const latestHref = heroPost ? `/post/${heroPost.slug}` : "/articles";

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.45fr),minmax(0,1fr)]">
      {/* Left */}
      <Reveal className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-slate-900/60 px-3 py-1 text-[11px] text-slate-200 shadow-sm shadow-sky-500/40">
          <Sparkles className="h-3.5 w-3.5 text-sky-400" />
          <span>Essays by Adeoye Boluwatife</span>
        </div>

        <h1 className="font-display max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-slate-50 sm:text-5xl lg:text-[54px]">
          Build a{" "}
          <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
            world‑class
          </span>{" "}
          reading experience.
        </h1>

        <p className="max-w-2xl text-sm text-slate-300/90 sm:text-base">
          Full‑stack developer & writer — exploring health, finance, technology
          and education. I turn complex ideas into useful systems you can apply
          in your work and life.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={latestHref}
            className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-sky-950 shadow-lg shadow-sky-500/40 hover:bg-sky-400 transition"
          >
            <PenSquare className="h-4 w-4" />
            <span>{heroPost ? "Read latest article" : "Browse articles"}</span>
          </a>
          <a
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/60 px-4 py-2 text-sm text-slate-200 hover:border-sky-500/60 hover:text-sky-200 transition"
          >
            About me
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <p className="text-[11px] text-slate-400">
          {totalCount} articles curated • updated frequently
        </p>
      </Reveal>

      {/* Right */}
      <Reveal className="relative">
        <div className="relative mx-auto w-full max-w-sm rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/80">
          <div className="mb-4 flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-sky-500/60 bg-slate-900 shadow-lg shadow-sky-500/40">
              <Image
                src={adeoyePic}
                alt="Adeoye Boluwatife"
                className="h-12 w-12 object-cover"
                width={48}
                height={48}
                priority
              />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-100">
                Adeoye Boluwatife
              </p>
              <p className="text-[11px] text-slate-400">Full‑stack developer & writer</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300 space-y-1">
            <p className="font-medium text-slate-100 mb-1">Live preview</p>
            <p>✓ Server‑rendered blog frontend</p>
            <p>✓ Headless Node.js backend</p>
            <p>✓ Markdown + YouTube embeds</p>
            <p>✓ Google sign‑in, likes & comments</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}