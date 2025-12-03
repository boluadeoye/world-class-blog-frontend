import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Terminal } from "lucide-react";

/* === 1. STUDIO HERO (Animated Masthead) === */
export function LuxHero() {
  return (
    <section className="relative pt-28 pb-16 px-4 md:pt-36 md:pb-24">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Minimal Card Wrapper */}
        <div className="studio-min-card p-8 md:p-12 grid gap-6 md:gap-8">
          
          {/* Aurora Backgrounds */}
          <div className="studio-min-aurora a"></div>
          <div className="studio-min-aurora b"></div>

          {/* Crest/Logo Layer (Top Right) */}
          <div className="hero-crest-layer">
            <Terminal size={120} strokeWidth={0.5} />
          </div>

          {/* Content Grid */}
          <div className="grid gap-5 relative z-10">
            
            {/* Role Line */}
            <div className="flex justify-center">
              <div className="hero-role-line text-amber-400/90 uppercase tracking-widest text-xs md:text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="hero-role-gradient">Full-Stack Engineer</span>
              </div>
            </div>

            {/* Name with Gradient Animation */}
            <h1 className="hero-title-min text-4xl md:text-6xl lg:text-7xl tracking-tight">
              <span className="hero-title-gradient">
                <span className="seq-char" style={{ "--dur": "600ms", "--delay": "0ms" }}>Bolu</span>
                <span className="seq-char" style={{ "--dur": "650ms", "--delay": "60ms" }}>Adeoye</span>
              </span>
            </h1>

            {/* Tagline */}
            <p className="hero-copy-beauty max-w-xl mx-auto text-lg md:text-xl opacity-0 animate-[seqFade_0.8s_ease_0.3s_forwards]">
              Crafting world-class digital experiences with precision, performance, and purpose.
            </p>

            {/* CTA Row */}
            <div className="flex flex-wrap justify-center gap-4 pt-4 opacity-0 animate-[seqFade_0.8s_ease_0.5s_forwards]">
              <Link href="/about" className="cta-chip-min group">
                <span className="cta-hand"><span className="hand-cursor">☝️</span></span>
                <span>Let's Collaborate</span>
                <ArrowRight className="ico group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/blog" className="px-5 py-2 rounded-full border border-white/10 text-slate-400 text-sm font-bold hover:bg-white/5 transition-colors">
                Read Notes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === 2. LUX CARD (Featured Posts) === */
export function LuxCard({ post, priority = false }) {
  if (!post) return null;
  
  return (
    <Link href={`/blog/${post.slug}`} className="lux-card group h-full flex flex-col">
      {/* Media Area */}
      <div className="lux-media">
        {post.coverImage ? (
          <Image 
            src={post.coverImage} 
            alt={post.title} 
            fill 
            className="lux-img group-hover:scale-105 transition-transform duration-700"
            priority={priority}
          />
        ) : (
          <div className="lux-img lux-img-fallback" />
        )}
        <div className="lux-media-overlay" />
        
        {/* Floating Meta */}
        <div className="lux-meta">
          <span className="lux-chip shadow-lg">
            {post.category || "Article"}
          </span>
          <span className="lux-date drop-shadow-md">
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="lux-body flex-1 flex flex-col">
        <h3 className="lux-title mb-2 group-hover:text-white transition-colors">
          {post.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-1">
          {post.excerpt}
        </p>
        <div className="lux-underline group-hover:scale-x-100"></div>
      </div>
    </Link>
  );
}

/* === 3. LUX RAIL (Horizontal Scroll) === */
export function LuxRail({ posts }) {
  if (!posts?.length) return null;

  return (
    <div className="lux-rail my-12">
      <div className="px-6 mb-4 flex items-center justify-between">
        <h2 className="lux-h2 text-xl md:text-2xl">Latest Notes</h2>
        <Link href="/blog" className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider">
          View Archive
        </Link>
      </div>

      <div className="lux-rail-track">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="lux-tile rail-snap group min-w-[260px] md:min-w-[300px]">
            <div className="lux-tile-overlay"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-400/90 uppercase">{post.category || "Note"}</span>
              <ArrowRight size={14} className="text-slate-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="lux-tile-title line-clamp-2 group-hover:text-blue-200 transition-colors">
              {post.title}
            </h3>
            <p className="lux-tile-sub line-clamp-2 mt-auto pt-2">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
      
      <div className="lux-rail-fade-left"></div>
      <div className="lux-rail-fade-right"></div>
    </div>
  );
}

/* === 4. YOUTUBE LITE (Performance) === */
export function LuxYoutube({ video }) {
  if (!video) return null;
  
  const videoId = video.meta?.youtubeId || video.meta?.youtubeUrl?.split('v=')[1];
  if (!videoId) return null;

  return (
    <div className="my-16 px-4 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-red-500/10 border border-red-500/20">
          <Play size={18} className="text-red-500 fill-current" />
        </div>
        <h2 className="lux-h2 text-2xl">Featured Video</h2>
      </div>

      <div className="lux-card group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
        <div className="aspect-video relative">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-5 bg-slate-950/80 backdrop-blur-md border-t border-white/5">
          <h3 className="text-lg font-bold text-white mb-1">{video.title}</h3>
          <p className="text-sm text-slate-400">Watch on YouTube</p>
        </div>
      </div>
    </div>
  );
}
