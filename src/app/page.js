import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { fetchLatestArticles, fetchFeaturedPosts, fetchVideoPosts, fetchFeaturedVideo } from "../lib/homeData";
import ModernHero from "../components/home/ModernHero";
import ScrollReveal from "../components/ui/ScrollReveal";
import NewsUpdates from "../components/home/NewsUpdates";
import Newsletter from "../components/home/Newsletter";
import ServiceDeck from "../components/home/ServiceDeck";
import WhatsAppWidget from "../components/home/WhatsAppWidget";

export const revalidate = 3600;

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

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-amber-500/30 overflow-x-hidden font-sans">
      
      {/* 1. HERO SECTION */}
      <ModernHero />

      {/* 2. SERVICES DECK (Horizontal Grid) */}
      <ServiceDeck />

      {/* Separator */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent opacity-50"></div>
      </div>

      {/* 3. EDITOR'S PICKS */}
      <section className="px-6 md:px-12 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-serif text-3xl md:text-4xl text-white">Editor's Picks</h2>
              <Link href="/articles" className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-500 hover:text-white transition-colors">
                View Archive <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Feature */}
            {heroPost && (
              <div className="md:col-span-8">
                <ScrollReveal delay={0.1}>
                  <Link href={`/post/${heroPost.slug}`} className="group relative block min-h-[450px] rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl shadow-black/50 border border-white/5">
                    {getImg(heroPost) ? (
                      <img src={getImg(heroPost)} alt={heroPost.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-3xl">
                      <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest text-slate-950 bg-amber-500 rounded-md uppercase">
                        {heroPost.meta?.category || "Featured"}
                      </span>
                      <h3 className="font-serif text-3xl md:text-5xl text-white mb-4 leading-[1.1] group-hover:underline decoration-amber-500/50 underline-offset-8">
                        {heroPost.title}
                      </h3>
                      <p className="text-slate-300 text-lg line-clamp-2 max-w-xl font-light">{heroPost.excerpt}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              </div>
            )}
            
            {/* Sub Features */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {subFeatures.map((post, idx) => (
                <ScrollReveal key={post.slug} delay={0.2 + (idx * 0.1)}>
                  <Link href={`/post/${post.slug}`} className="flex-1 relative block p-8 rounded-[2rem] bg-slate-900/50 border border-white/5 hover:border-white/10 hover:bg-slate-900 transition-all group flex flex-col justify-between backdrop-blur-sm">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{getDate(post.created_at)}</span>
                        <ArrowRight size={16} className="text-slate-600 group-hover:text-amber-500 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                      <h4 className="font-serif text-2xl text-slate-200 group-hover:text-white transition-colors leading-tight">
                        {post.title}
                      </h4>
                    </div>
                    <div className="mt-6 h-0.5 w-8 bg-slate-800 group-hover:w-full group-hover:bg-amber-500 transition-all duration-500"></div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. ON AIR (Video) */}
      <section className="px-6 md:px-12 py-24 bg-[#050a15] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal delay={0.2}>
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-500">
                <Play size={24} fill="currentColor" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-white">On Air</h3>
            </div>
            
            {featuredVideo && featuredVideo.id ? (
              <div className="relative group rounded-[2.5rem] overflow-hidden border border-white/10 bg-black shadow-2xl">
                <div className="aspect-video relative">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${featuredVideo.id}?rel=0`}
                    title="YouTube video player"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-8 md:p-10 bg-slate-950">
                  <h4 className="font-serif text-2xl md:text-3xl text-white mb-2">{featuredVideo.title}</h4>
                  <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">Watch on YouTube</p>
                </div>
              </div>
            ) : (
              <div className="p-12 border border-dashed border-slate-800 rounded-3xl text-slate-600 text-center font-mono text-sm">
                // NO SIGNAL DETECTED
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* 5. TECH FEED */}
      <NewsUpdates />

      {/* 6. NEWSLETTER */}
      <Newsletter />

      {/* 7. WHATSAPP WIDGET */}
      <WhatsAppWidget />

    </main>
  );
}
