import { getLatestPosts } from "../../lib/api";
import Link from "next/link";

// ---- category + helpers
const toTitle = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");
const isVideo = (p) => String(p?.type || "").toLowerCase() === "video" || !!(p?.meta?.youtubeUrl) || !!(p?.meta?.youtubeId);

function normalizeCategory(p){
  const known = ["health","finance","technology","education","others"];
  const raw =
    p?.meta?.category ||
    (typeof p?.category === "string" ? p.category : (p?.category?.name || p?.category?.title || p?.category?.slug)) ||
    (Array.isArray(p?.categories) && (p?.categories[0]?.name || p?.categories[0]?.title || p?.categories[0]?.slug)) ||
    "";
  if (raw){
    const low = String(raw).trim().toLowerCase();
    if (known.includes(low)) return toTitle(low);
    return toTitle(String(raw)); // show real category even if custom
  }
  const tags = Array.isArray(p?.tags) ? p.tags.map(t => String(t).toLowerCase()) : [];
  const hit = tags.find(t => known.includes(t));
  if (hit) return toTitle(hit);
  return "Other";
}

function descFor(cat){
  switch(cat){
    case "Health": return "Energy, wellbeing, mental clarity and the systems that sustain us.";
    case "Finance": return "Money, investing, personal finance and building resilient wealth.";
    case "Technology": return "Software, engineering, tools and the future of the web.";
    case "Education": return "Learning, teaching, skill‑building and accelerating growth.";
    default: return "Reflections, stories and everything that doesn’t fit a box.";
  }
}

export default async function Page(){
  // pull a larger set so categories fill correctly
  const posts = await getLatestPosts(200).catch(()=>[]);
  const byCat = new Map([["Health",[]],["Finance",[]],["Technology",[]],["Education",[]],["Other",[]]]);

  (Array.isArray(posts) ? posts : [])
    .filter(p => !isVideo(p))
    .forEach(p=>{
      const cat = normalizeCategory(p);
      if (!byCat.has(cat)) byCat.set(cat, []);
      byCat.get(cat).push({ id: p?.id || p?.slug, slug: p?.slug, title: p?.title });
    });

  const cats = Array.from(byCat.keys());

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-8 min-h-dvh">
      {/* Premium search */}
      <div className="max-w-3xl mx-auto mb-6">
        <form action="/articles" className="search-lux" role="search">
          <input
            name="q"
            type="search"
            placeholder="Search posts by title, topic, or keyword…"
            className="search-input-lux"
            aria-label="Search posts"
          />
          <button className="btn-beam-gold btn-xs" type="submit">Search</button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto grid gap-4">
        {cats.map((c)=> {
          const list = byCat.get(c) || [];
          return (
            <section key={c} className="topic-card">
              <header className="flex items-center justify-between">
                <div>
                  <h2 className="topic-title">{c}</h2>
                  <p className="topic-desc">{descFor(c)}</p>
                </div>
                <span className="topic-count">{list.length} {list.length===1 ? "post" : "posts"}</span>
              </header>

              {list.length > 0 && (
                <ul className="mt-3 grid gap-2">
                  {list.slice(0,12).map(p=>(
                    <li key={p.id}>
                      <Link href={`/post/${p.slug}`} className="topic-link">{p.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
