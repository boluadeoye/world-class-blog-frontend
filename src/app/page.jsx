import Link from "next/link";
import { ArrowRight, Play, Cpu, ShieldCheck, Layers, ArrowUpRight } from "lucide-react";
import { fetchLatestArticles, fetchFeaturedPosts, fetchVideoPosts, fetchFeaturedVideo } from "../lib/homeData";
import ModernHero from "../components/home/ModernHero";
import ScrollReveal from "../components/ui/ScrollReveal";
import NewsUpdates from "../components/home/NewsUpdates";
import Newsletter from "../components/home/Newsletter";
import ServiceDeck from "../components/home/ServiceDeck";

export const revalidate = 3600;
const getImg = (p) => p?.meta?.cover || p?.cover_image_url || null;
const getDate = (d) => d ? new Date(d).toLocaleDateString('en-US', {month:'short', day:'numeric'}) : "";

// --- CINEMATIC EFFECTS ---
const FilmGrain = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

const AmbientLighting = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-900/20 blur-[120px] rounded-full opacity-50 animate-pulse-slow" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-amber-900/10 blur-[120px] rounded-full opacity-30" />
  </div>
);

export default async function Page() {
  const [latest, featuredPosts, videos, featuredVideo] = await Promise.all([
    fetchLatestArticles(6),
    fetchFeaturedPosts(3),
    fetchVideoPosts(4),
    fetchFeaturedVideo(),
  ]);

  const heroPost = featuredPosts?.[0] || latest?.[0];
  const subFeatures = featuredPosts?.slice(1, 3) || latest?.slice(1, 3);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-amber-500/30 overflow-x-hidden font-sans relative">
      <FilmGrain />
      <AmbientLighting />

      {/* --- HERO SECTION --- */}
      <div className="relative z-10">
        <ModernHero />
      </div>

      {/* --- NEW: COMMAND DECK (Bento Grid for Tools) --- */}
      <section className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto mb-24 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px]">
          
          {/* AI NEURAL LINK */}
          <Link href="/chat" className="group relative md:col-span-8 md:row-span-2 rounded-[2rem] bg-[#0B1120] border border-white/5 p-8 md:p-12 flex flex-col justify-between overflow-hidden hover:border-amber-500/30 transition-all duration-700 shadow-2xl shadow-black/50">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-600/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 border border-amber-500/20">
                <Cpu size={28} />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">Neural Interface</h3>
              <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                Access my digital consciousness. A Gemini-powered AI with full context of my archives.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-3 text-sm font-bold text-amber-500 uppercase tracking-widest mt-8">
              <span>Initialize Link</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
            </div>
          </Link>

          {/* STEALTH WRITER */}
          <Link href="/tools/humanizer" className="group relative md:col-span-4 md:row-span-1 rounded-[2rem] bg-[#0B1120] border border-white/5 p-8 flex flex-col justify-between overflow-hidden hover:border-emerald-500/30 transition-all duration-700">
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-emerald-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                  <ShieldCheck size={20} />
                </div>
                <ArrowUpRight size={18} className="text-slate-600 group-hover:text-emerald-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white">StealthWriter</h3>
              <p className="text-sm text-slate-500 mt-1">Zero-cost AI humanizer.</p>
            </div>
          </Link>

          {/* TOPIC INDEX */}
          <Link href="/topics" className="group relative md:col-span-4 md:row-span-1 rounded-[2rem] bg-[#0B1120] border border-white/5 p-8 flex flex-col justify-between overflow-hidden hover:border-blue-500/30 transition-all duration-700">
            <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                  <Layers size={20} />
                </div>
                <ArrowUpRight size={18} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white">Topic Index</h3>
              <p className="text-sm text-slate-500 mt-1">Browse the knowledge graph.</p>
            </div>
          </Link>

        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-12 relative z-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50"></div>
      </div>

      {/* --- EDITOR'S PICKS (Existing) --- */}
      <section className="px-6 md:px-12 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-serif text-3xl md:text-4xl text-slate-100">Editor's Picks</h2>
              <Link href="/articles" className="hidden md:flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-slate-500 hover:text-amber-400 transition-colors">
                View Archive <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {heroPost && (
              <div className="md:col-span-8">
                <ScrollReveal delay={0.1}>
                  <Link href={`/post/${heroPost.slug}`} className="group relative block min-h-[450px] rounded-2xl overflow-hidden bg-slate-900 shadow-2xl shadow-black/50 border border-slate-800/50">
                    {getImg(heroPost) ? (
                      <img src={getImg(heroPost)} alt={heroPost.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-3xl">
                      <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-slate-950 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                        {heroPost.meta?.category || "FEATURED"}
                      </span>
                      <h3 className="font-serif text-3xl md:text-5xl text-white mb-4 leading-tight group-hover:underline decoration-amber-500/50 underline-offset-8">
                        {heroPost.title}
                      </h3>
                      <p className="text-slate-300 text-lg line-clamp-2 max-w-xl">{heroPost.excerpt}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              </div>
            )}

            <div className="md:col-span-4 flex flex-col gap-6">
              {subFeatures.map((post, idx) => (
                <ScrollReveal key={post.slug} delay={0.2 + (idx * 0.1)}>
                  <Link href={`/post/${post.slug}`} className="flex-1 relative block p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-600 hover:bg-slate-900 transition-all group flex flex-col justify-between backdrop-blur-sm">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{getDate(post.created_at)}</span>
                        <ArrowRight size={16} className="text-slate-600 group-hover:text-amber-400 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                      <h4 className="font-serif text-xl md:text-2xl text-slate-200 group-hover:text-white transition-colors leading-snug">
                        {post.title}
                      </h4>
                    </div>
                    <div className="mt-4 h-1 w-12 bg-slate-800 group-hover:w-full group-hover:bg-amber-500/50 transition-all duration-500"></div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === SERVICES & VIDEO (Existing) === */}
      <section className="px-6 md:px-12 py-12 bg-slate-900/30 border-t border-slate-800/50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <ServiceDeck />
          </ScrollReveal>
          <div className="mt-20">
            <ScrollReveal delay={0.2}>
              <h3 className="font-serif text-3xl text-slate-100 mb-8 flex items-center gap-3">
                <Play className="text-red-500" size={28} /> On Air
              </h3>
              {featuredVideo && featuredVideo.id ? (
                <div className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl max-w-4xl mx-auto">
                  <div className="aspect-video relative">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${featuredVideo.id}?rel=0`}
                      title="YouTube video player"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-white text-xl">{featuredVideo.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">Watch on YouTube</p>
                  </div>
                </div>
              ) : (
                <div className="p-8 border border-slate-800 rounded-2xl text-slate-500 text-center">No video available.</div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* === REAL-TIME UPDATES (Existing) === */}
      <div className="relative z-10">
        <NewsUpdates />
      </div>

      {/* === NEWSLETTER (Existing) === */}
      <div className="relative z-10">
        <Newsletter />
      </div>

    </main>
  );
}
