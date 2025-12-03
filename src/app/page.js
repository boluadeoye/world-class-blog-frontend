import Link from "next/link";
import { Sparkles } from "lucide-react";
import { fetchLatestArticles, fetchFeaturedPosts, fetchVideoPosts, fetchFeaturedVideo } from "../lib/homeData";
import { LuxHero, LuxCard, LuxRail, LuxYoutube } from "../components/home/LuxSections";

export const revalidate = 3600; // Revalidate every hour

export default async function Page() {
  // Fetch all data in parallel
  const [latest, featuredPosts, videos, featuredVideo] = await Promise.all([
    fetchLatestArticles(8),
    fetchFeaturedPosts(3),
    fetchVideoPosts(4),
    fetchFeaturedVideo(),
  ]);

  // Determine content distribution
  const heroPost = featuredPosts?.[0] || latest?.[0];
  const subFeatures = featuredPosts?.slice(1, 3) || latest?.slice(1, 3);
  
  // Filter out featured posts from the "Latest" rail to avoid duplicates
  const featuredSlugs = new Set([heroPost?.slug, ...subFeatures.map(p => p.slug)]);
  const railPosts = latest?.filter(p => !featuredSlugs.has(p.slug)) || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* 1. Animated Masthead */}
      <LuxHero />

      {/* 2. Featured Grid (Bento Style) */}
      <section className="px-4 md:px-6 max-w-6xl mx-auto mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="lux-h2 text-2xl">Featured Work</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Feature (Left, spans 2 cols) */}
          <div className="md:col-span-2 h-[420px]">
            <LuxCard post={heroPost} priority={true} />
          </div>
          
          {/* Sub Features (Right Column) */}
          <div className="flex flex-col gap-6 h-[420px]">
            <div className="flex-1">
              <LuxCard post={subFeatures[0]} />
            </div>
            <div className="flex-1">
              <LuxCard post={subFeatures[1]} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Horizontal Rail (Latest Notes) */}
      <LuxRail posts={railPosts} />

      {/* 4. YouTube Lite Embed */}
      <LuxYoutube video={featuredVideo} />

      {/* 5. Footer CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden mt-12">
        <div className="absolute inset-0 bg-indigo-600/5 skew-y-3 pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
            Ready to build something great?
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            Whether it's a web app, a content platform, or technical consulting, let's discuss how I can help.
          </p>
          <Link href="/chat" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:scale-105 transition-transform shadow-xl shadow-indigo-500/20">
            Chat with my AI <Sparkles size={18} className="text-indigo-600" />
          </Link>
        </div>
      </section>
    </div>
  );
}
