"use client";

import Image from "next/image";
import Link from "next/link";

export default function ModernHero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-6 sm:px-8 pt-24 pb-16 overflow-hidden bg-[#0b1324]">
      {/* subtle grid + glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#1f2a44_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute -top-40 -right-24 h-[420px] w-[420px] rounded-full blur-3xl opacity-40 bg-indigo-600/20" />
        <div className="absolute -bottom-40 -left-24 h-[380px] w-[380px] rounded-full blur-3xl opacity-40 bg-fuchsia-600/20" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* top row: status pill left, avatar right */}
        <div className="flex justify-between items-start mb-6 sm:mb-8">
          <div className="inline-flex shrink-0 items-center gap-3 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur border border-slate-800/80 shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.7)]"></span>
            <span className="whitespace-nowrap font-mono text-[11px] sm:text-xs tracking-[0.18em] text-emerald-200">
              SYSTEM ONLINE. READY._
            </span>
          </div>

          <div className="shrink-0">
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full overflow-hidden border border-slate-600/60 ring-2 ring-slate-200/10 ring-offset-2 ring-offset-[#0b1324] shadow-[0_10px_40px_-10px_rgba(59,130,246,0.35)]">
              <Image
                src="/profile.jpg"
                alt="Profile photo"
                fill
                sizes="80px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* name */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-slate-100 font-semibold tracking-[-0.02em] leading-[0.88] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block">Boluwatife</span>
            <span className="-mt-3 sm:-mt-4 block italic text-slate-300 font-serif tracking-[-0.03em] leading-tight">
              Adeoye
            </span>
          </h1>
        </div>

        {/* role bar */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-amber-500/25 bg-amber-400/10 px-4 py-2">
            <span className="h-[3px] w-12 rounded-full bg-amber-400/80"></span>
            <span className="text-amber-300 tracking-[0.22em] text-[11px] sm:text-xs uppercase font-medium">
              Full-Stack Engineer & Writer
            </span>
          </div>
        </div>

        {/* description */}
        <p className="max-w-2xl text-slate-300/90 text-base sm:text-lg leading-relaxed">
          Architecting high‑performance digital ecosystems. Specializing in React
          Server Components, scalable systems, and human‑centric UI.
        </p>

        {/* ctas */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-6 sm:px-7 py-3 text-base sm:text-lg font-semibold shadow-lg shadow-fuchsia-500/20 hover:opacity-95 transition"
          >
            Let&apos;s Talk <span className="ml-2">→</span>
          </Link>

          <Link
            href="/logs"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 text-slate-200 px-6 py-3 text-base font-medium hover:bg-slate-900 transition"
          >
            Access Logs
          </Link>
        </div>
      </div>
    </section>
  );
}
