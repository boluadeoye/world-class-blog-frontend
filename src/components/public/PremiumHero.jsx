"use client";

import { useMemo } from "react";
import { Twitter, Github, Youtube, Instagram } from "lucide-react";

function SplitGoldName({ name }) {
  const chars = useMemo(() => Array.from(name || ""), [name]);
  return (
    <span className="gold-title" aria-label={name}>
      {chars.map((c, i) => (
        <span
          key={i}
          className={`char${c === " " ? " sp" : ""}`}
          style={{ animationDelay: `${i * 40}ms` }}
        >
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}

export default function PremiumHero() {
  const rawName = process.env.NEXT_PUBLIC_OWNER_NAME || "Adeoye Boluwatife";
  const displayName =
    (process.env.NEXT_PUBLIC_DISPLAY_NAME || rawName.split(/\s+/).slice(-1)[0]).trim();

  const tagline = process.env.NEXT_PUBLIC_OWNER_TAGLINE || "Full‑stack developer & writer";
  const heroImage =
    process.env.NEXT_PUBLIC_HERO_IMAGE ||
    "https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg";
  const contactUrl = process.env.NEXT_PUBLIC_CONTACT_URL || "/chat";

  const socials = [
    { href: process.env.NEXT_PUBLIC_TWITTER_URL || "", Icon: Twitter, label: "Twitter" },
    { href: process.env.NEXT_PUBLIC_GITHUB_URL || "", Icon: Github, label: "GitHub" },
    { href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "", Icon: Instagram, label: "Instagram" },
    { href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "", Icon: Youtube, label: "YouTube" },
  ].filter((s) => s.href);

  return (
    <section className="relative isolate overflow-hidden pro-hero">
      <div className="absolute inset-0 -z-10">
        <div className="pro-aurora pro-a" />
        <div className="pro-aurora pro-b" />
        <div className="pro-aurora pro-c" />
        <div className="pro-vignette" />
        <div className="pro-grain" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-12 items-center gap-6">
          {/* Left: give more width so name stays single line */}
          <div className="col-span-8 md:col-span-6">
            <p className="pro-eyebrow">Hello, my name is</p>
            <h1 className="pro-title">
              <SplitGoldName name={displayName} />
            </h1>
            <p className="pro-tagline">{tagline}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/60 text-slate-300 hover:text-slate-50 hover:border-slate-600 transition"
                >
                  <Icon size={18} />
                </a>
              ))}

              {/* CTA with beam and close-by hand cursor */}
              <span className="relative inline-block cta-hint">
                <a
                  href={contactUrl}
                  className="btn-beam btn-strong inline-flex items-center rounded-full px-5 py-2 text-sm font-bold text-slate-950 tracking-tight"
                >
                  Let’s Talk!
                </a>
                <span className="hand-cursor" aria-hidden="true">👇</span>
              </span>
            </div>
          </div>

          {/* Right: smaller portrait with premium photo frame */}
          <div className="col-span-4 md:col-span-6">
            <div className="photo-frame relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
              {heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img alt="Portrait" src={heroImage} className="hero-img h-full w-full object-cover" loading="eager" />
              ) : <div className="h-full w-full" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
