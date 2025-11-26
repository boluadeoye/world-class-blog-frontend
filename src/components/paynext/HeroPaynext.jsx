// src/components/paynext/HeroPaynext.jsx (server component)
export default function HeroPaynext() {
  const title = process.env.NEXT_PUBLIC_HOME_HERO_TITLE || "Stay Updated On Digital Payment";
  const subtitle =
    process.env.NEXT_PUBLIC_HOME_HERO_SUB || "Get the latest insights and trends in technology, products, and writing — all in one place.";
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="pay-hero rounded-[28px] px-6 sm:px-10 py-12 sm:py-16 text-center">
          <h1 className="pay-hero-title">{title}</h1>
          <p className="pay-hero-sub mt-3">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
