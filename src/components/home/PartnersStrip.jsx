// src/components/home/PartnersStrip.jsx — server component
export default function PartnersStrip() {
  const csv =
    process.env.NEXT_PUBLIC_PARTNER_PILLS ||
    "Next.js, Neon (Postgres), Tailwind CSS, Vercel, YouTube";
  const items = csv.split(",").map((s) => s.trim()).filter(Boolean);
  if (!items.length) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-6">
      <div className="mx-auto max-w-6xl">
        <div className="partners-card rounded-[20px] border border-white/10 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-wrap items-center gap-2">
            {items.map((t, i) => (
              <span key={i} className="pill">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
