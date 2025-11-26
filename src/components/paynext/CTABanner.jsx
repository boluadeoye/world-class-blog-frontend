// src/components/paynext/CTABanner.jsx (server component)
export default function CTABanner() {
  const title = process.env.NEXT_PUBLIC_HOME_CTA_TITLE || "Ready To Elevate Your Financial Game?";
  const sub = process.env.NEXT_PUBLIC_HOME_CTA_SUB || "Discover how our work can transform your product with cutting‑edge solutions.";
  const cta = process.env.NEXT_PUBLIC_CONTACT_URL || "/chat";
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="pay-hero rounded-[28px] px-6 sm:px-10 py-12 sm:py-16 text-center">
          <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90">Best Transaction Platform</div>
          <h2 className="pay-hero-title mt-3">{title}</h2>
          <p className="pay-hero-sub mt-2">{sub}</p>
          <a href={cta} className="mt-4 inline-flex items-center justify-center rounded-full bg-white text-slate-900 px-5 py-2 font-semibold shadow hover:opacity-90">Learn More</a>
        </div>
      </div>
    </section>
  );
}
