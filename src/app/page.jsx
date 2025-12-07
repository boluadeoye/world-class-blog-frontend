import Link from "next/link";
import { ArrowRight, Play, Code, PenTool, Cpu, Globe, Layers, Sparkles } from "lucide-react";
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

// --- SERVICE DATA ---
const SERVICES = [
  {
    id: 'eng',
    title: 'Full-Stack Engineering',
    desc: 'High-performance architectures using Next.js Server Components.',
    icon: Code,
    color: 'text-blue-400',
    glow: 'group-hover:shadow-blue-500/20 group-hover:border-blue-500/50'
  },
  {
    id: 'ai',
    title: 'AI Systems',
    desc: 'LLM integration and neural network interfaces.',
    icon: Cpu,
    color: 'text-emerald-400',
    glow: 'group-hover:shadow-emerald-500/20 group-hover:border-emerald-500/50'
  },
  {
    id: 'content',
    title: 'Technical Writing',
    desc: 'Documentation bridging code and human understanding.',
    icon: PenTool,
    color: 'text-amber-400',
    glow: 'group-hover:shadow-amber-500/20 group-hover:border-amber-500/50'
  },
  {
    id: 'strat',
    title: 'Digital Strategy',
    desc: 'Roadmapping for complex digital transformation.',
    icon: Globe,
    color: 'text-purple-400',
    glow: 'group-hover:shadow-purple-500/20 group-hover:border-purple-500/50'
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

      {/* --- NEW: HORIZONTAL LUMINOUS SHOWCASE --- */}
      <section className="relative z-20 mb-32 -mt-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 flex items-end justify-between border-b border-white/5 pb-6">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Layers size={16} /> Core Competencies
          </h2>
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest animate-pulse">
            {"<<< Swipe to Explore >>>"}
          </div>
        </div>

        {/* Horizontal Scroll Container (Hide Scrollbar) */}
        <div className="flex overflow-x-auto gap-8 px-6 md:px-12 pb-12 snap-x snap-mandatory scrollbar-hide">
          {SERVICES.map((service, idx) => (
            <div 
              key={service.id} 
              className={`
                relative flex-shrink-0 w-[320px] h-[420px] snap-center group
                rounded-[2.5rem] bg-[#0B1120]/40 backdrop-blur-xl 
                border border-white/10 transition-all duration-700 ease-out
                hover:-translate-y-2 hover:scale-[1.02]
                ${service.glow} hover:shadow-2xl
              `}
            >
              {/* Inner Glass Reflection */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />
              
              {/* Luminous Top Border */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 h-full p-10 flex flex-col justify-between">
                
                {/* Icon Container */}
                <div>
                  <div className={`w-16 h-16 rounded-2xl bg-[#020617]/50 border border-white/5 flex items-center justify-center mb-8 shadow-inner ${service.color} group-hover:scale-110 transition-transform duration-500`}>
                    <service.icon size={32} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-3xl font-serif text-white mb-4 leading-tight">
                    {service.title}
                  </h3>
                  
                  <div className="w-12 h-1 bg-white/10 rounded-full mb-6 group-hover:w-24 group-hover:bg-amber-500/50 transition-all duration-700" />
                  
                  <p className="text-sm text-slate-400 leading-relaxed font-light">
                    {service.desc}
                  </p>
                </div>

                {/* Decorative Footer */}
                <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                  <Sparkles size={14} className={service.color} />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Premium Service</span>
                </div>

              </div>
            </div>
          ))}
          
          {/* Spacer for end of scroll */}
          <div className="w-6 flex-shrink-0" />
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

      {/* === VIDEO SECTION === */}
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
