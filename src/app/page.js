import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, FileText, Sparkles, ExternalLink } from "lucide-react";
import { fetchLatestArticles, fetchFeaturedPosts, fetchVideoPosts, fetchFeaturedVideo } from "../lib/homeData";

export const revalidate = 3600; // Revalidate every hour

const isVideo = (p) => String(p?.type || "").toLowerCase() === "video" || !!(p?.meta?.youtubeUrl) || !!(p?.meta?.youtubeId);

export default async function Page() {
  const [latest, featuredPosts, videos, featuredVideo] = await Promise.all([
    fetchLatestArticles(6),
    fetchFeaturedPosts(3),
    fetchVideoPosts(4),
    fetchFeaturedVideo(),
  ]);

  const heroPost = featuredPosts?.[0] || latest?.[0];
  const subFeatures = featuredPosts?.slice(1, 3) || latest?.slice(1, 3);
  const recentNotes = latest?.filter(p => p.slug !== heroPost?.slug).slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 relative font-sans selection:bg-indigo-500/30">
      {/* Global Grain Overlay */}
      <div className="bg-grain"></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="aurora-bg">
          <div className="aurora-orb orb-1"></div>
          <div className="aurora-orb orb-2"></div>
          <div className="aurora-orb orb-3"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles size={12} />
            <span>Full-Stack Developer & Writer</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Boluwatife <span className="text-gradient-gold">Adeoye</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Building world-class digital experiences. I write about engineering, product design, and the future of software.
          </p>

          <div className="mt-8 flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link href="/about" className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2">
              Contact Me <ArrowRight size={16} />
            </Link>
            <Link href="/blog" className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all flex items-center gap-2">
              Read Notes
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work (Bento Grid) */}
      <section className="px-6 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Featured Work</h2>
            <Link href="/blog" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hero Card (Left, spans 2 cols) */}
            {heroPost && (
              <Link href={`/blog/${heroPost.slug}`} className="md:col-span-2 group relative block h-[400px] rounded-3xl overflow-hidden glass-card">
                 {heroPost.coverImage ? (
                   <Image src={heroPost.coverImage} alt={heroPost.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                 ) : (
                   <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-90" />
                 <div className="absolute bottom-0 left-0 p-8">
                   <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 inline-block">Featured</span>
                   <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">{heroPost.title}</h3>
                   <p className="text-slate-300 line-clamp-2">{heroPost.excerpt}</p>
                 </div>
              </Link>
            )}

            {/* Sub Cards (Right Column) */}
            <div className="flex flex-col gap-6">
              {subFeatures.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="flex-1 relative block p-6 rounded-3xl glass-card group flex flex-col justify-end min-h-[180px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 -z-10" />
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{post.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                     <span>{new Date(post.date).toLocaleDateString('en-US', {month:'short', day:'numeric'})}</span>
                     <span>•</span>
                     <span>{post.readTime || "5 min read"}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video & Notes Split */}
      <section className="px-6 py-16 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Latest Notes List */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="text-indigo-400" size={24} /> Latest Notes
            </h2>
            <div className="space-y-4">
              {recentNotes.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block p-4 rounded-2xl hover:bg-white/5 transition-colors group border border-transparent hover:border-white/5">
                  <h3 className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-1">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Video */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Play className="text-red-400" size={24} /> Recent Video
            </h2>
            {featuredVideo ? (
              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                 {/* Use Lite YouTube Embed CSS class if available, or simple iframe */}
                 <div className="aspect-video bg-slate-950 relative">
                    <iframe 
                      src={`https://www.youtube-nocookie.com/embed/${featuredVideo.meta?.youtubeId || featuredVideo.meta?.youtubeUrl?.split('v=')[1]}?rel=0`} 
                      title="YouTube video player" 
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                 </div>
                 <div className="p-5 bg-slate-900">
                   <h3 className="font-bold text-white text-lg mb-1">{featuredVideo.title}</h3>
                   <p className="text-sm text-slate-400">Watch on YouTube</p>
                 </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center text-slate-500">
                No videos available right now.
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/5 skew-y-3"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to build something great?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Whether it's a web app, a content platform, or technical consulting, let's discuss how I can help.
          </p>
          <Link href="/chat" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:scale-105 transition-transform">
            Chat with my AI <Sparkles size={18} className="text-indigo-600" />
          </Link>
        </div>
      </section>
    </div>
  );
}
