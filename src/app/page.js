import { getPublicPosts } from "../lib/api";
import Aurora from "../components/public/Aurora";
import HomeHero from "../components/public/HomeHero";
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
  const heroPost = Array.isArray(posts) && posts.length > 0 ? posts[0] : null;

  return (
    <div className="relative">
      <Aurora />

      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-4 pt-8 pb-6 sm:px-6 sm:pt-12 lg:px-8 lg:pt-16">
        <HomeHero heroPost={heroPost} totalCount={posts?.length || 0} />
      </section>

      {/* METRICS */}
      <section className="relative mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <MetricsCounters posts={posts} />
      </section>

      {/* TOPICS */}
      <section className="relative mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <TopicsStrip />
      </section>

      {/* RECOMMENDED */}
      <section className="relative mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <RecommendedCarousel posts={posts} />
      </section>

      {/* LATEST POSTS */}
      {error && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-2">
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-950/40 px-4 py-3 text-xs text-red-200">
            Failed to fetch public posts ({error})
          </div>
        </div>
      )}
      <PostsSection posts={posts} />

      {/* NEWSLETTER */}
      <section className="relative mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <NewsletterCTA />
      </section>
    </div>
  );
}