// src/components/home/MainHero.jsx — server component (clean hero)
export default function MainHero() {
  const nameRaw = process.env.NEXT_PUBLIC_OWNER_NAME || "Adeoye Boluwatife";
  const name = (process.env.NEXT_PUBLIC_DISPLAY_NAME || nameRaw.split(/\s+/).slice(-1)[0]).trim(); // "Boluwatife"
  const greeting = process.env.NEXT_PUBLIC_HERO_GREETING || "Welcome to my blog";
  const tagline =
    process.env.NEXT_PUBLIC_OWNER_TAGLINE || "Full‑stack developer & writer";
  const blogIntro =
    process.env.NEXT_PUBLIC_BLOG_INTRO ||
    "I share fast, practical notes on building products, clean engineering, and writing in public.";
  const img =
    process.env.NEXT_PUBLIC_HERO_IMAGE ||
    "https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg";

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-6">
      <div className="mx-auto max-w-6xl mh-card rounded-[26px] overflow-hidden border border-white/10">
        <div className="grid grid-cols-12 items-center gap-4 p-5 sm:p-8">
          {/* Left: welcome + intro */}
          <div className="col-span-12 md:col-span-7">
            <div className="mh-eyebrow">{greeting}</div>
            <h1 className="mh-title">{name}</h1>
            <p className="mh-sub">{tagline}</p>
            <p className="mh-copy">{blogIntro}</p>
          </div>

          {/* Right: portrait, face fully visible (object-position top) */}
          <div className="col-span-12 md:col-span-5">
            <div className="mh-frame relative aspect-[4/5] w-full overflow-hidden rounded-[22px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt="Portrait"
                className="mh-img h-full w-full object-cover"
                style={{ objectPosition: "center 10%" }}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
