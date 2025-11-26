import { getPublicPosts, getHomeFeaturedVideo, getRecentVideos } from "../lib/api";
import Aurora from "../components/public/Aurora";
import PersonaHero from "../components/public/PersonaHero";
import ServicesSection from "../components/public/ServicesSection";
import VideosSection from "../components/public/VideosSection";
import TopicsStrip from "../components/public/TopicsStrip";
import RecommendedCarousel from "../components/public/RecommendedCarousel";
import MetricsCounters from "../components/public/MetricsCounters";
import PostsSection from "../components/public/PostsSection";
import NewsletterCTA from "../components/public/NewsletterCTA";

export default async function Page() {
  let posts = [];
  let error = "";
  try {
    posts = await getPublicPosts();
  } catch (e) {
    error = String(e?.message || e);
  }
  const featuredVideo = await getHomeFeaturedVideo();
  const recentVideos = await getRecentVideos(3);

  return (
    <div className="relative">
      <Aurora />
      <PersonaHero />
      <ServicesSection />
      <VideosSection featured={featuredVideo} items={recentVideos} />

      {/* Dynamic rails already on the site */}
      <section className="relative mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <TopicsStrip />
      </section>
      <section className="relative mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <RecommendedCarousel posts={posts} />
      </section>

      {error && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-2">
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-950/40 px-4 py-3 text-xs text-red-200">
            Failed to fetch public posts ({error})
          </div>
        </div>
      )}
      <PostsSection posts={posts} />

      <section className="relative mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <MetricsCounters posts={posts} />
      </section>
      <section className="relative mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <NewsletterCTA />
      </section>
    </div>
  );
}
