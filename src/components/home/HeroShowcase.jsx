// src/components/home/HeroShowcase.jsx — 2-column overlay hero (text left, portrait right)
export default function HeroShowcase() {
  const raw = process.env.NEXT_PUBLIC_OWNER_NAME || "Adeoye Boluwatife";
  const display = (process.env.NEXT_PUBLIC_DISPLAY_NAME || raw.split(/\s+/).slice(-1)[0]).trim();

  const eyebrow = process.env.NEXT_PUBLIC_HERO_EYEBROW || "WELCOME TO MY BLOG";
  const sub = process.env.NEXT_PUBLIC_OWNER_TAGLINE || "Full‑stack developer & writer";
  const intro =
    process.env.NEXT_PUBLIC_BLOG_INTRO ||
    "I share fast, practical notes on building products, clean engineering, and writing in public.";

  const image =
    process.env.NEXT_PUBLIC_HERO_IMAGE ||
    "https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg";
  const cutout = process.env.NEXT_PUBLIC_HERO_CUTOUT || ""; // transparent PNG if available

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-6">
      <div className="mx-auto max-w-6xl hs2-card rounded-[28px] overflow-hidden border border-white/10">
        <div className="relative">
          {/* overlay glows kept; positioned mostly left and nudged down */}
          <div className="hs2-warm-left" aria-hidden />
          <div className="hs2-topfade" aria-hidden />

          <div className="grid grid-cols-12 gap-5 items-center px-6 sm:px-10 py-8">
            {/* LEFT: text (aligned left) */}
            <div className="col-span-12 md:col-span-7">
              <div className="hs2-eyebrow">{eyebrow}</div>
              <h1 className="hs2-title">{display}</h1>
              <p className="hs2-sub">{sub}</p>
              <p className="hs2-copy">{intro}</p>
            </div>

            {/* RIGHT: portrait (taller, clean panel) */}
            <div className="col-span-12 md:col-span-5">
              <div className="hc-bg rounded-[22px] relative overflow-hidden min-h-[460px] sm:min-h-[520px]">
                {cutout ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cutout}
                    alt="Portrait"
                    className="absolute bottom-0 right-0 h-full w-full object-contain"
                    style={{ objectPosition: "right bottom" }}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt="Portrait"
                    className="absolute bottom-0 right-0 h-full w-full object-cover"
                    style={{
                      objectPosition: "center 24%", /* lower to reveal face */
                      WebkitMaskImage: "linear-gradient(#000 82%, transparent 100%)",
                      maskImage: "linear-gradient(#000 82%, transparent 100%)",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
