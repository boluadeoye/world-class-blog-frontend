// src/components/home/HeroEditorial.jsx
"use client";

import { Code2 } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display-serif",
});

export default function HeroEditorial() {
  const name = "Boluwatife";
  const role = "Full‑stack Developer & Writer";
  const bio =
    "I share fast, practical notes on building products, clean engineering, and writing in public.";

  const CUTOUT = process.env.NEXT_PUBLIC_HERO_CUTOUT || "";
  const PHOTO =
    process.env.NEXT_PUBLIC_HERO_IMAGE ||
    "https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg";

  return (
    <section
      className={[
        "relative overflow-hidden rounded-3xl border border-white/10",
        "mx-auto max-w-6xl mt-6 px-6 py-8 sm:px-10 sm:py-10",
        "bg-slate-950",
        "bg-[radial-gradient(120%_90%_at_10%_-10%,rgba(99,102,241,.12),transparent_60%),radial-gradient(110%_80%_at_95%_10%,rgba(14,165,233,.1),transparent_60%)]",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
      <div className="noise-mask pointer-events-none absolute inset-0 rounded-3xl opacity-[0.06]" />
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="grid grid-cols-12 items-center gap-6">
        {/* Text Left */}
        <div className="col-span-12 md:col-span-7">
          <div className="text-amber-400 text-[12px] tracking-[.18em] uppercase select-none">
            Welcome to my blog
          </div>

          <h1
            className={`${playfair.className} mt-2 text-white font-extrabold leading-[1.03] text-5xl sm:text-6xl`}
          >
            {name}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <Code2
              size={20}
              className="shrink-0 text-amber-400 translate-y-[1px]"
              aria-hidden="true"
            />
            <div className="font-semibold tracking-wide uppercase text-cyan-300">
              {role}
            </div>
          </div>

          <p className="mt-3 max-w-md text-slate-300">{bio}</p>

          <a
            href="/articles"
            className={[
              "mt-5 inline-flex items-center justify-center rounded-full px-5 py-2",
              "border border-white/80 text-white/90",
              "hover:bg-white hover:text-black transition-all duration-200",
              "backdrop-blur-sm",
            ].join(" ")}
          >
            Read Notes
          </a>
        </div>

        {/* Portrait Right */}
        <div className="col-span-12 md:col-span-5">
          <div
            className={[
              "relative w-full min-h-[420px] sm:min-h-[520px] overflow-hidden rounded-2xl",
              "bg-[radial-gradient(120%_90%_at_60%_0%,rgba(36,99,235,.18),transparent_60%),linear-gradient(180deg,#0f172a,#0b1220_80%)]",
              "ring-1 ring-white/10 shadow-[0_26px_54px_rgba(0,0,0,.55)]",
            ].join(" ")}
          >
            {CUTOUT ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={CUTOUT}
                alt="Portrait"
                className="absolute bottom-0 right-0 h-full w-full object-contain"
                style={{ objectPosition: "right bottom" }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={PHOTO}
                alt="Portrait"
                className="absolute bottom-0 right-0 h-full w-full object-cover"
                style={{
                  objectPosition: "center 22%",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 78%, rgba(0,0,0,0) 100%)",
                  maskImage:
                    "linear-gradient(to bottom, #000 78%, rgba(0,0,0,0) 100%)",
                }}
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
