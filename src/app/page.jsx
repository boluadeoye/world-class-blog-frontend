import Link from "next/link";
import { ArrowRight, Play, Code, PenTool, Cpu, Globe, ArrowUpRight, Layers } from "lucide-react";
import { fetchLatestArticles, fetchFeaturedPosts, fetchVideoPosts, fetchFeaturedVideo } from "../lib/homeData";
import ModernHero from "../components/home/ModernHero";
import ScrollReveal from "../components/ui/ScrollReveal";
import NewsUpdates from "../components/home/NewsUpdates";
import Newsletter from "../components/home/Newsletter";

export const revalidate = 3600;
const getImg = (p) => p?.meta?.cover || p?.cover_image_url || null;
const getDate = (d) => d ? new Date(d).toLocaleDateString('en-US', {month:'short', day:'numeric'}) : "";

// --- CINEMATIC ASSETS ---
const FilmGrain = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay">
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
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-indigo-900/10 blur-[150px] rounded-full opacity-40 animate-pulse-slow" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-amber-900/10 blur-[150px] rounded-full opacity-30" />
  </div>
);

// --- PREMIUM SERVICES DATA ---
const SERVICES = [
  {
    id: 'eng',
    title: 'Full-Stack Engineering',
    desc: 'Scalable, high-performance web architectures using Next.js and Server Components.',
    icon: Code,
    color: 'text-blue-400',
    bg: 'group-hover:bg-blue-500/10',
    border: 'group-hover:border-blue-500/30'
  },
  {
    id: 'ai',
    title: 'AI Systems Architecture',
    desc: 'Integrating LLMs (Gemini/GPT) into business logic for intelligent automation.',
    icon: Cpu,
    color: 'text-emerald-400',
    bg: 'group-hover:bg-emerald-500/10',
    border: 'group-hover:border-emerald-500/30'
  },
  {
    id: 'content',
    title: 'Technical Writing',
    desc: 'Documentation and narratives that bridge the gap between code and humans.',
    icon: PenTool,
    color: 'text-amber-400',
    bg: 'group-hover:bg-amber-500/10',
    border: 'group-hover:border-amber-500/30'
  },
  {
    id: 'strat',
    title: 'Digital Strategy',
    desc: 'Roadmapping and consulting for complex digital transformation projects.',
    icon: Globe,
    color: 'text-purple-400',
    bg: 'group-hover:bg-purple-500/10',
    border: 'group-hover:border-purple-500/30'
  }
];

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

      {/* --- NEW: PREMIUM SERVICES GLASS DECK --- */}
      <section className="relative z-20 px-6 md:px-12 max-w-7xl mx-auto mb-32 -mt-8">
        <div className="flex items-end justify-between mb-12 border-b border-white/5 pb-6">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">
            Core Competencies
          </h2>
          <Layers size={16} className="text-slate-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, idx) => (
            <ScrollReveal key={service.id} delay={idx * 0.1}>
              <div className={`group relative h-full p-8 rounded-[2rem] bg-[#0B1120]/60 backdrop-blur-xl border border-white/5 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] hover:-translate-y-4 hover:scale-105 hover:shadow-2xl hover:shadow-black/50 ${service.border}`}>
                
                {/* Hover Gradient Blob */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-transparent via-transparent to-${service.color.split('-')[1]}-900/20 rounded-[2rem]`} />

                <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                  <div>
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 transition-colors duration-500 ${service.bg} ${service.color}`}>
                      <service.icon size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-serif text-white mb-3 group-hover:text-amber-50 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                      {service.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5 group-hover:border-white/10">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-slate-600 group-hover:text-white transition-colors uppercase">
                      Explore
                    </span>
                    <ArrowUpRight size={14} className="text-slate-600 group-hover:text-amber-400 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-12 relative z-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50"></div>
      </div>

      {/* --- EDITOR'S PICKS --- */}
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
                  <Link href={`/post/${heroPost.slug}`} className="group relative block min-h-[500px] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl shadow-black/50 border border-slate-800/50 transition-all duration-700 hover:scale-[1.01]">
                    {getImg(heroPost) ? (
                      <img src={getImg(heroPost)} alt={heroPost.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-3xl">
                      <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-slate-950 bg-amber-400 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                        {heroPost.meta?.category || "FEATURED"}
                      </span>
                      <h3 className="font-serif text-3xl md:text-6xl text-white mb-6 leading-tight group-hover:text-amber-50 transition-colors">
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
                  <Link href={`/post/${post.slug}`} className="flex-1 relative block p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-slate-600 hover:bg-slate-900 transition-all duration-500 group flex flex-col justify-between backdrop-blur-sm hover:-translate-y-2">
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

      {/* === VIDEO SECTION (Cleaned up) === */}
      <section className="px-6 md:px-12 py-12 bg-slate-900/30 border-t border-slate-800/50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal delay={0.2}>
            <h3 className="font-serif text-3xl text-slate-100 mb-8 flex items-center gap-3">
              <Play className="text-red-500" size={28} /> On Air
            </h3>
            {featuredVideo && featuredVideo.id ? (
              <div className="relative group rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl max-w-4xl mx-auto hover:border-slate-700 transition-all duration-500">
                <div className="aspect-video relative">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${featuredVideo.id}?rel=0`}
                    title="YouTube video player"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-8 bg-[#0B1120]">
                  <h4 className="font-bold text-white text-xl">{featuredVideo.title}</h4>
                  <p className="text-sm text-slate-500 mt-2">Watch on YouTube</p>
                </div>
              </div>
            ) : (
              <div className="p-8 border border-slate-800 rounded-2xl text-slate-500 text-center">No video available.</div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* === REAL-TIME UPDATES === */}
      <div className="relative z-10">
        <NewsUpdates />
      </div>

      {/* === NEWSLETTER === */}
      <div className="relative z-10">
        <Newsletter />
      </div>

    </main>
  );
}
