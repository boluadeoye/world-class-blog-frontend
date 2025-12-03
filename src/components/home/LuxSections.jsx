import Link from "next/link";
import { ArrowRight, Play, Terminal } from "lucide-react";

/* === HELPER: Clean Data & Text === */
const getPostLink = (slug) => `/post/${slug}`;

const getPostDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getPostImage = (post) => {
  // Prioritize meta.cover, then cover_image_url
  return post?.meta?.cover || post?.cover_image_url || null;
};

const getPostCategory = (post) => post?.meta?.category || "Note";

// STRIP MARKDOWN: Converts raw MD to clean plain text for previews
const getCleanExcerpt = (post) => {
  if (post.excerpt) return post.excerpt;
  if (!post.content) return "";
  
  let text = post.content
    .replace(/!\[.*?\]\(.*?\)/g, "")       // Remove images
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Replace links with text
    .replace(/#{1,6}\s?/g, "")             // Remove headers
    .replace(/(\*\*|__)(.*?)\1/g, "$2")    // Remove bold
    .replace(/(\*|_)(.*?)\1/g, "$2")       // Remove italic
    .replace(/`{3}[\s\S]*?`{3}/g, "")      // Remove code blocks
    .replace(/`(.+?)`/g, "$1")             // Remove inline code
    .replace(/\n/g, " ");                  // Replace newlines with spaces

  return text.length > 120 ? text.substring(0, 120).trim() + "..." : text;
};

/* === 1. STUDIO HERO === */
export function LuxHero() {
  return (
    <section className="relative pt-12 pb-12 px-0 md:pt-24 md:pb-20">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="studio-min-card p-8 md:p-12 grid gap-6 md:gap-8 mx-4">
          <div className="studio-min-aurora a"></div>
          <div className="studio-min-aurora b"></div>
          <div className="hero-crest-layer">
            <Terminal size={80} strokeWidth={0.5} className="opacity-50" />
          </div>

          <div className="grid gap-5 relative z-10">
            <div className="flex justify-center">
              <div className="hero-role-line text-amber-400/90 uppercase tracking-widest text-xs md:text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="hero-role-gradient">Full-Stack Engineer</span>
              </div>
            </div>

            <h1 className="hero-title-min text-4xl md:text-6xl lg:text-7xl tracking-tight">
              <span className="hero-title-gradient">
                <span className="seq-char">Bolu</span> <span className="seq-char">Adeoye</span>
              </span>
            </h1>

            <p className="hero-copy-beauty max-w-xl mx-auto text-lg md:text-xl text-slate-300">
              Crafting world-class digital experiences with precision, performance, and purpose.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/about" className="cta-chip-min group">
                <span>Let's Collaborate</span>
                <ArrowRight className="ico group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/articles" className="px-5 py-2 rounded-full border border-white/10 text-slate-400 text-sm font-bold hover:bg-white/5 transition-colors">
                Read Notes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === 2. LUX CARD === */
export function LuxCard({ post }) {
  if (!post) return null;
  
  const imageUrl = getPostImage(post);
  const dateStr = getPostDate(post.created_at);
  const link = getPostLink(post.slug);
  const cleanExcerpt = getCleanExcerpt(post);

  return (
    <Link href={link} className="lux-card group h-full flex flex-col relative overflow-hidden rounded-2xl bg-slate-900 border border-white/10">
      {/* Media Area - Using standard img to bypass Next.js domain restrictions */}
      <div className="lux-media relative aspect-video w-full overflow-hidden bg-slate-800">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={post.title} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
        )}
        <div className="lux-media-overlay absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
        
        {/* Floating Meta */}
        <div className="lux-meta absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <span className="lux-chip bg-amber-400 text-slate-950 text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            {getPostCategory(post)}
          </span>
          <span className="lux-date text-xs text-slate-200 font-medium drop-shadow-md">
            {dateStr}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="lux-body p-5 flex-1 flex flex-col">
        <h3 className="lux-title text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-2 leading-tight">
          {post.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-1 leading-relaxed">
          {cleanExcerpt}
        </p>
        <div className="lux-underline h-0.5 w-full bg-gradient-to-r from-amber-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
      </div>
    </Link>
  );
}

/* === 3. LUX RAIL === */
export function LuxRail({ posts }) {
  if (!posts?.length) return null;

  return (
    <div className="lux-rail my-12 relative">
      <div className="px-4 md:px-6 mb-4 flex items-center justify-between max-w-6xl mx-auto">
        <h2 className="lux-h2 text-xl md:text-2xl font-bold text-white">Latest Notes</h2>
        <Link href="/articles" className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider">
          View Archive
        </Link>
      </div>

      <div className="lux-rail-track flex gap-4 overflow-x-auto px-4 md:px-6 pb-6 snap-x">
        {posts.map((post) => (
          <Link key={post.slug} href={getPostLink(post.slug)} className="lux-tile rail-snap group min-w-[280px] w-[280px] bg-slate-900 border border-white/10 rounded-xl p-4 flex flex-col relative overflow-hidden">
            <div className="lux-tile-overlay absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-xs font-bold text-amber-400/90 uppercase">{getPostCategory(post)}</span>
              <ArrowRight size={14} className="text-slate-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="lux-tile-title text-base font-bold text-slate-200 line-clamp-2 group-hover:text-blue-200 transition-colors relative z-10">
              {post.title}
            </h3>
            <p className="lux-tile-sub text-sm text-slate-500 line-clamp-2 mt-auto pt-2 relative z-10">
              {getCleanExcerpt(post)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* === 4. YOUTUBE LITE === */
export function LuxYoutube({ video }) {
  if (!video || !video.id) return null;

  return (
    <div className="my-16 px-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-red-500/10 border border-red-500/20">
          <Play size={18} className="text-red-500 fill-current" />
        </div>
        <h2 className="lux-h2 text-2xl font-bold text-white">Featured Video</h2>
      </div>

      <div className="lux-card group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
        <div className="aspect-video relative">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-5 bg-slate-950 border-t border-white/5">
          <h3 className="text-lg font-bold text-white mb-1">{video.title}</h3>
          <p className="text-sm text-slate-400">Watch on YouTube</p>
        </div>
      </div>
    </div>
  );
}
