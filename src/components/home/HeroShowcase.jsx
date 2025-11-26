// src/components/home/HeroShowcase.jsx — overlay hero (portrait bigger, face visible)
export default function HeroShowcase() {
  const raw = process.env.NEXT_PUBLIC_OWNER_NAME || "Adeoye Boluwatife";
  const display =
    (process.env.NEXT_PUBLIC_DISPLAY_NAME || raw.split(/\s+/).slice(-1)[0]).trim();

  const eyebrow = process.env.NEXT_PUBLIC_HERO_EYEBROW || "WELCOME TO MY BLOG";
  const sub =
    process.env.NEXT_PUBLIC_OWNER_TAGLINE || "Full‑stack developer & writer";
  const intro =
    process.env.NEXT_PUBLIC_BLOG_INTRO ||
    "I share fast, practical notes on building products, clean engineering, and writing in public.";
  const image =
    process.env.NEXT_PUBLIC_HERO_IMAGE ||
    "https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg";

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-6">
      <div className="mx-auto max-w-6xl hs-card rounded-[28px] overflow-hidden border border-white/10">
        {/* Taller aspect so the portrait shows fully; same overlay */}
        <div className="relative aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/7]">
          {/* Background image with warm overlay */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            className="hs-media absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 12%" }}
          />
          <div className="hs-warm" aria-hidden />
          <div className="hs-gradient" aria-hidden />

          {/* Content */}
          <div className="relative z-10 h-full">
            <div className="grid grid-cols-12 gap-4 items-center h-full px-6 sm:px-10 py-8">
              <div className="col-span-12 md:col-span-7">
                <div className="hs-eyebrow">{eyebrow}</div>
                <h1 className="hs-title">{display}</h1>
                <p className="mh-sub">{sub}</p>
                <p className="hs-copy">{intro}</p>
              </div>
              <div className="col-span-12 md:col-span-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
