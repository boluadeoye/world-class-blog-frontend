"use client";

import Image from "next/image";
import { PenSquare, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import adeoyePic from "../../../public/adeoye.jpg";

export default function HomeHero({ heroPost, totalCount }) {
  const latestHref = heroPost ? `/post/${heroPost.slug}` : "/articles";

  return (
    <div className="grid gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] items-start">
      {/* Left: headline */}
      <Reveal className="space-y-4">
        <h1 className="font-display text-[30px] leading-[1.15] tracking-[-0.01em] sm:text-[38px] lg:text-[46px]">
          Build a{" "}
          <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
            world‑class
          </span>{" "}
          reading experience.
        </h1>

        <p className="max-w-[48ch] text-[15px] text-slate-300/90 sm:text-[16px]">
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

      {/* Right: profile / preview */}
      <Reveal className="relative">
        <div className="mx-auto w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/60">
          <div className="mb-3 flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-2xl border border-sky-500/60 bg-slate-900 shadow-lg shadow-sky-500/40">
              <Image
                src={adeoyePic}
                alt="Adeoye Boluwatife"
                className="h-11 w-11 object-cover"
                width={44}
                height={44}
                priority
              />
            </div>
            <div className="leading-tight">
              <p className="text-[15px] font-semibold text-slate-100">
                Adeoye Boluwatife
              </p>
              <p className="text-[11px] text-slate-400">Full‑stack developer & writer</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-[12px] text-slate-300 space-y-1">
            <p className="font-medium text-slate-100 mb-1">What’s inside</p>
            <p>• Practical systems and mental models</p>
            <p>• Tech, money, health & learning done right</p>
            <p>• Clean reading, fast search, smart embeds</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}