/* Server component */
export default function NonziHero() {
  const name = (process.env.NEXT_PUBLIC_DISPLAY_NAME || (process.env.NEXT_PUBLIC_OWNER_NAME || "Boluwatife").split(/\s+/).slice(-1)[0]).trim();
  const role = process.env.NEXT_PUBLIC_OWNER_TAGLINE || "Full‑stack developer & writer";
  const img = process.env.NEXT_PUBLIC_HERO_IMAGE || "https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg";
  const cta = process.env.NEXT_PUBLIC_CONTACT_URL || "/chat";

  return (
    <section className="nz-texture">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative grid grid-cols-12 gap-6 items-center">
          <div className="col-span-7">
            <h2 className="nz-hero-h2">{name}</h2>
            <p className="nz-hero-sub">{role}</p>
            <a href={cta} className="nz-cta">Contact Me</a>
          </div>
          <div className="col-span-5">
            <div className="nz-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Portrait" src={img} className="h-full w-full object-cover" loading="eager" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
