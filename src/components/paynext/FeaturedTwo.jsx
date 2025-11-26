// src/components/paynext/FeaturedTwo.jsx (server component)
function whenOf(p) {
  const d = new Date(p?.created_at || p?.createdAt || Date.now());
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}
export default function FeaturedTwo({ posts = [] }) {
  if (!Array.isArray(posts) || posts.length === 0) return null;
  const items = posts.slice(0, 2);
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-6xl grid gap-4 lg:grid-cols-2">
        {items.map((p, i) => {
          const href = p?.slug ? `/post/${p.slug}` : "#";
          // if you have thumbnails in meta, you can swap here
          const thumb = p?.meta?.cover || p?.meta?.image || null;
          return (
            <a key={i} href={href} className="group block overflow-hidden rounded-[22px] pay-card relative">
              <div className="aspect-[16/9] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={thumb || "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop"}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="pay-card-overlay" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2">
                    {Array.isArray(p?.tags) && p.tags[0] ? (
                      <span className="pay-chip">{p.tags[0]}</span>
                    ) : null}
                    <span className="pay-author text-[13px]">{whenOf(p)}</span>
                  </div>
                  <h3 className="pay-card-title mt-2">{p?.title || "Untitled"}</h3>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
