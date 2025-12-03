import Link from "next/link";
import { Sparkles } from "lucide-react";
import { fetchLatestArticles, fetchFeaturedPosts, fetchVideoPosts, fetchFeaturedVideo } from "../lib/homeData";
import { LuxHero, LuxCard, LuxRail, LuxYoutube } from "../components/home/LuxSections";

export const revalidate = 3600;

export default async function Page() {
  // 1. Fetch Data
  const [latest, featuredPosts, videos, featuredVideo] = await Promise.all([
    fetchLatestArticles(8),
    fetchFeaturedPosts(3),
    fetchVideoPosts(4),
    fetchFeaturedVideo(),
  ]);

  // 2. Safe Fallbacks
  const safeLatest = Array.isArray(latest) ? latest : [];
  const safeFeatured = Array.isArray(featuredPosts) ? featuredPosts : [];
  
  // 3. Determine Hero & Sub-features
  // If no featured posts, use latest posts
  const heroPost = safeFeatured[0] || safeLatest[0] || null;
  const subFeatures = safeFeatured.length > 1 
    ? safeFeatured.slice(1, 3) 
    : safeLatest.slice(1, 3);

  // 4. Filter Rail (Remove duplicates)
  const usedSlugs = new Set();
  if (heroPost) usedSlugs.add(heroPost.slug);
  subFeatures.forEach(p => p && usedSlugs.add(p.slug));
  
  const railPosts = safeLatest.filter(p => !usedSlugs.has(p.slug));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      
      <LuxHero />

      {/* Featured Grid */}
      {heroPost && (
        <section className="px-4 md:px-6 max-w-6xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Featured Work</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-[400px]">
              <LuxCard post={heroPost} priority={true} />
            </div>
            
            <div className="flex flex-col gap-6 h-auto md:h-[400px]">
              {subFeatures[0] && <div className="flex-1 h-[190px]"><LuxCard post={subFeatures[0]} /></div>}
              {subFeatures[1] && <div className="flex-1 h-[190px]"><LuxCard post={subFeatures[1]} /></div>}
            </div>
          </div>
        </section>
      )}

      <LuxRail posts={railPosts} />

      <LuxYoutube video={featuredVideo} />

      {/* Footer CTA */}
      <section className="py-20 px-6 text-center mt-12 border-t border-white/5 bg-slate-900/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to build something great?
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            Let's discuss how I can help with your next project.
          </p>
          <Link href="/chat" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:scale-105 transition-transform">
            Chat with my AI <Sparkles size={18} className="text-indigo-600" />
          </Link>
        </div>
      </section>
    </div>
  );
}
