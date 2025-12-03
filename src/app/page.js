import Link from "next/link";
import { ArrowRight, Play, FileText, Sparkles } from "lucide-react";
import { fetchLatestArticles, fetchFeaturedPosts, fetchVideoPosts, fetchFeaturedVideo } from "../lib/homeData";
import ModernHero from "../components/home/ModernHero";
import ScrollReveal from "../components/ui/ScrollReveal";

export const revalidate = 3600;

// Helpers
const getImg = (p) => p?.meta?.cover || p?.cover_image_url || null;
const getDate = (d) => d ? new Date(d).toLocaleDateString('en-US', {month:'short', day:'numeric'}) : "";

export default async function Page() {
  const [latest, featuredPosts, videos, featuredVideo] = await Promise.all([
    fetchLatestArticles(6),
    fetchFeaturedPosts(3),
    fetchVideoPosts(4),
    fetchFeaturedVideo(),
  ]);

  const heroPost = featuredPosts?.[0] || latest?.[0];
  const subFeatures = featuredPosts?.slice(1, 3) || latest?.slice(1, 3);
  const usedSlugs = new Set([heroPost?.slug, ...subFeatures.map(p => p?.slug)]);
  const recentNotes = latest?.filter(p => !usedSlugs.has(p.slug)).slice(0, 4) || [];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-amber-500/30 overflow-x-hidden">
      
      {/* === 1. HERO === */}
      <ModernHero />

      {/* === 2. FEATURED WORK === */}
      <section className="px-6 md:px-12 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10 border-b border-slate-800 pb-4">
              <h2 className="font-serif text-3xl md:text-4xl text-slate-100">Selected Work</h2>
              <Link href="/articles" className="hidden md:flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-slate-500 hover:text-amber-400 transition-colors">
                View Archive <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Feature */}
            {heroPost && (
              <div className="md:col-span-8">
                <ScrollReveal delay={0.1}>
                  <Link href={`/post/${heroPost.slug}`} className="group relative block min-h-[450px] rounded-2xl overflow-hidden bg-slate-900 shadow-2xl shadow-black/50">
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
            
            {/* Sub Features */}
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

      {/* === 3. LATEST NOTES & VIDEO === */}
      <section className="px-6 md:px-12 py-24 bg-slate-900/30 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <ScrollReveal>
              <h3 className="font-serif text-2xl text-slate-100 mb-8 flex items-center gap-3">
                <FileText className="text-amber-500" size={24} /> Latest Notes
              </h3>
            </ScrollReveal>
            <div className="space-y-2">
              {recentNotes.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.1}>
                  <Link href={`/post/${post.slug}`} className="group flex items-baseline gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors border-b border-slate-800/50 last:border-0">
                    <span className="font-mono text-xs text-slate-600">0{i + 1}</span>
                    <div>
                      <h4 className="text-lg font-medium text-slate-300 group-hover:text-white transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-1">{post.excerpt}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div>
            <ScrollReveal delay={0.2}>
              <h3 className="font-serif text-2xl text-slate-100 mb-8 flex items-center gap-3">
                <Play className="text-red-500" size={24} /> On Air
              </h3>
              {featuredVideo && featuredVideo.id ? (
                <div className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
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
                    <h4 className="font-bold text-white text-lg">{featuredVideo.title}</h4>
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

      {/* === 4. FOOTER CTA (Restored) === */}
      <section className="py-24 px-6 text-center relative overflow-hidden border-t border-slate-800/50">
        <div className="absolute inset-0 bg-indigo-600/5 skew-y-3 pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">Ready to build something great?</h2>
            <p className="text-slate-400 mb-8 text-lg">
              Whether it's a web app, a content platform, or technical consulting, let's discuss how I can help.
            </p>
            <Link href="/chat" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:scale-105 transition-transform shadow-xl shadow-indigo-500/20">
              Chat with my AI <Sparkles size={18} className="text-indigo-600" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
