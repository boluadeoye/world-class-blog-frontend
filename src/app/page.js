import Link from "next/link";
import { ArrowRight, Sparkles, Menu, Globe, Terminal } from "lucide-react";
import { fetchLatestArticles, fetchFeaturedPosts, fetchVideoPosts, fetchFeaturedVideo } from "../lib/homeData";
import { LuxCard, LuxRail, LuxYoutube } from "../components/home/LuxSections";
import CinematicHero from "../components/home/CinematicHero";

export const revalidate = 3600;

export default async function Page() {
  // 1. Fetch Data (Restored)
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
    <main className="relative min-h-screen w-full bg-zinc-950 text-zinc-100 selection:bg-amber-500/30">
      
      {/* === 1. CINEMATIC HERO (Animated) === */}
      <CinematicHero />

      {/* === 2. FEATURED WORK (Restored Content) === */}
      {heroPost && (
        <section className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-zinc-800"></div>
            <h2 className="font-serif text-2xl md:text-3xl text-zinc-100">Featured Work</h2>
            <div className="h-px flex-1 bg-zinc-800"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Hero Card */}
            <div className="md:col-span-2 min-h-[400px]">
              <LuxCard post={heroPost} priority={true} />
            </div>
            
            {/* Sub Cards */}
            <div className="flex flex-col gap-6">
              {subFeatures[0] && <div className="flex-1 min-h-[180px]"><LuxCard post={subFeatures[0]} /></div>}
              {subFeatures[1] && <div className="flex-1 min-h-[180px]"><LuxCard post={subFeatures[1]} /></div>}
            </div>
          </div>
        </section>
      )}

      {/* === 3. LATEST NOTES RAIL === */}
      <section className="relative z-10 mb-24">
        <LuxRail posts={railPosts} />
      </section>

      {/* === 4. FEATURED VIDEO === */}
      <section className="relative z-10 mb-32">
        <LuxYoutube video={featuredVideo} />
      </section>

      {/* === 5. FLOATING DOCK (Fixed Links) === */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 p-2 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-full shadow-2xl shadow-black/50">
          <Link href="/" className="p-3 rounded-full bg-zinc-800 text-white">
            <Globe size={20} />
          </Link>
          <Link href="/articles" className="p-3 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors">
            <span className="text-xs font-bold px-2">NOTES</span>
          </Link>
          <Link href="/about" className="p-3 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors">
            <span className="text-xs font-bold px-2">ABOUT</span>
          </Link>
        </div>
      </div>

    </main>
  );
}
