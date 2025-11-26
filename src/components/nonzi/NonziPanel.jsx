/* Server component */
function cleanText(s) {
  return String(s || "").replace(/<[^>]+>/g, " ").replace(/\[[^\]]*]\([^)]+\)/g, " ").replace(/\s+/g, " ").trim();
}
function dateParts(p) {
  const d = new Date(p?.created_at || p?.createdAt || Date.now());
  return { day: String(d.getDate()).padStart(2,"0"), when: d.toLocaleDateString(undefined,{year:"numeric",month:"short",day:"2-digit"}) };
}
export default function NonziPanel({ posts = [] }) {
  const havePosts = Array.isArray(posts) && posts.length > 0;
  const popular = havePosts ? posts.slice(0,5) : [];
  const threads = havePosts ? posts.slice(0,5) : [];

  return (
    <section className="nz-texture pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="nz-paper">
          <div className="grid grid-cols-12 gap-6">
            {/* Left column: posts */}
            <div className="col-span-12 md:col-span-8">
              {havePosts ? (
                posts.slice(0,6).map((p, i) => {
                  const { day, when } = dateParts(p);
                  const href = p?.slug ? `/post/${p.slug}` : "#";
                  const body = cleanText(p?.content).slice(0,180);
                  return (
                    <article key={i} className="nz-post">
                      <div className="nz-day">{day}</div>
                      <div className="nz-post-body">
                        <h3 className="nz-post-title">
                          <a href={href}>{p?.title || "Untitled"}</a>
                        </h3>
                        <p className="nz-post-meta">Posted • {when}</p>
                        {body && <p className="nz-post-excerpt">{body}…</p>}
                        <a className="nz-readmore" href={href}>READ MORE &raquo;</a>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="rounded-xl border border-sky-800/40 bg-slate-900/50 px-4 py-6 text-slate-200">
                  <div className="text-lg font-semibold">No posts yet</div>
                  <p className="mt-1 text-sm text-slate-400">When you publish posts, they’ll appear here automatically.</p>
                  <a href="/articles" className="mt-3 inline-block text-sky-400 hover:text-sky-300">Browse articles →</a>
                </div>
              )}
            </div>

            {/* Right column: widgets */}
            <aside className="col-span-12 md:col-span-4">
              <div className="nz-widget">
                <h4 className="nz-widget-title">Popular Posts</h4>
                {popular.length ? (
                  <ul className="nz-links">
                    {popular.map((p,i)=>(
                      <li key={i}><a href={p?.slug?`/post/${p.slug}`:"#"}>{p?.title||"Untitled"}</a></li>
                    ))}
                  </ul>
                ) : <p className="text-sm text-slate-400">No items yet.</p>}
              </div>
              <div className="nz-widget">
                <h4 className="nz-widget-title">Forum Threads</h4>
                {threads.length ? (
                  <ul className="nz-links">
                    {threads.map((p,i)=>(
                      <li key={i}><a href={p?.slug?`/post/${p.slug}`:"#"}>{p?.title||"Untitled"}</a></li>
                    ))}
                  </ul>
                ) : <p className="text-sm text-slate-400">No items yet.</p>}
              </div>
              <div className="nz-widget">
                <h4 className="nz-widget-title">Random Picture</h4>
                <div className="nz-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Random" src={process.env.NEXT_PUBLIC_HERO_IMAGE || "https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg"} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
