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
  // Show only the last word (e.g., "Boluwatife")
  const displayName =
    (process.env.NEXT_PUBLIC_DISPLAY_NAME || rawName.split(/\s+/).slice(-1)[0]).trim();

  const tagline =
    process.env.NEXT_PUBLIC_OWNER_TAGLINE || "Full-stack developer & writer";
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
          <div className="col-span-6">
            <p className="pro-eyebrow">Hello, my name is</p>
            <h1 className="pro-title">
              <SplitGoldName name={displayName} />
            </h1>
            <p className="mt-3 text-slate-300/95 text-[1.05rem] leading-7">{tagline}</p>

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

              {/* CTA with beam + dangling finger */}
              <span className="relative inline-block">
                <a
                  href={contactUrl}
                  className="btn-beam inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold text-slate-950"
                >
                  Let’s talk
                </a>
                <span className="hand-dangle" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M11 2c.6 0 1 .4 1 1v7l1-1c.4-.4 1-.4 1.4 0l.6.6c.4.4.4 1 0 1.4l-3.1 3.1c-.4.4-1 .4-1.4 0L8 12.4c-.4-.4-.4-1 0-1.4l.6-.6c.4-.4 1-.4 1.4 0l1 1V3c0-.6.4-1 1-1z"/>
                  </svg>
                </span>
              </span>
            </div>
          </div>

          <div className="col-span-6">
            <div className="gold-frame relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-800/50 to-slate-900">
              {heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img alt="Portrait" src={heroImage} className="hero-img h-full w-full object-cover" loading="eager" />
              ) : <div className="h-full w-full" />}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
