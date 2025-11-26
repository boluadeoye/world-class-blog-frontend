"use client";

import { Twitter, Github, Youtube, Instagram } from "lucide-react";

/**
 * PremiumHero
 * - 12-col grid at ALL breakpoints -> desktop feel on mobile
 * - Left: name, role, CTA + socials
 * - Right: portrait (rounded, subtle ring)
 * - Background: CSS aurora + vignette + grain (lightweight)
 */
export default function PremiumHero() {
  const name = process.env.NEXT_PUBLIC_OWNER_NAME || "Adeoye Boluwatife";
  const tagline = process.env.NEXT_PUBLIC_OWNER_TAGLINE || "Full-stack developer & writer";
  const heroImage =
    process.env.NEXT_PUBLIC_HERO_IMAGE ||
    "https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg";
  const contactUrl = process.env.NEXT_PUBLIC_CONTACT_URL || "/about";

  const socials = [
    { href: process.env.NEXT_PUBLIC_TWITTER_URL || "", Icon: Twitter, label: "Twitter" },
    { href: process.env.NEXT_PUBLIC_GITHUB_URL || "", Icon: Github, label: "GitHub" },
    { href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "", Icon: Instagram, label: "Instagram" },
    { href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "", Icon: Youtube, label: "YouTube" },
  ].filter(s => s.href);

  return (
    <section className="relative isolate overflow-hidden pro-hero">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="pro-aurora pro-a" />
        <div className="pro-aurora pro-b" />
        <div className="pro-aurora pro-c" />
        <div className="pro-vignette" />
        <div className="pro-grain" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Left column keeps 6/12 even on mobile -> desktop feel */}
          <div className="col-span-6">
            <p className="pro-eyebrow">Hello, my name is</p>
            <h1 className="pro-title">{name}</h1>
            <p className="mt-3 text-slate-300/95 text-lg">{tagline}</p>

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
              <a
                href={contactUrl}
                className="ml-1 inline-flex items-center rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-500 transition"
              >
                Let’s talk
              </a>
            </div>
          </div>

          {/* Right column keeps 6/12 even on mobile -> desktop feel */}
          <div className="col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-800/50 to-slate-900">
              {heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt="Portrait"
                  src={heroImage}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="h-full w-full" />
              )}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
