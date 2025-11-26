"use client";

import { Twitter, Github, Youtube, Instagram } from "lucide-react";

export default function PersonaHero() {
  const name = process.env.NEXT_PUBLIC_OWNER_NAME || "Adeoye Boluwatife";
  const tagline = process.env.NEXT_PUBLIC_OWNER_TAGLINE || "Full-stack developer & writer";
  const heroImage = process.env.NEXT_PUBLIC_HERO_IMAGE || ""; // set URL in .env.local
  const contactUrl = process.env.NEXT_PUBLIC_CONTACT_URL || "/about";

  const socials = [
    { href: process.env.NEXT_PUBLIC_TWITTER_URL || "", Icon: Twitter, label: "Twitter" },
    { href: process.env.NEXT_PUBLIC_GITHUB_URL || "", Icon: Github, label: "GitHub" },
    { href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "", Icon: Instagram, label: "Instagram" },
    { href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "", Icon: Youtube, label: "YouTube" },
  ].filter(s => s.href);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid gap-8 md:grid-cols-12 md:items-center">
          {/* Left: text */}
          <div className="md:col-span-7">
            <p className="section-eyebrow">Hello, my name is</p>
            <h1 className="section-title">{name}</h1>
            <p className="mt-3 text-slate-300/95 text-lg">{tagline}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/50 text-slate-300 hover:text-slate-50 hover:border-slate-600 transition"
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

          {/* Right: portrait */}
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-800/50 to-slate-900">
              {heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt="Portrait"
                  src={heroImage}
                  className="h-full w-full object-cover opacity-95"
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
