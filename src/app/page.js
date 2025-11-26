import HeroShowcase from "../components/home/HeroShowcase";
import PartnersStrip from "../components/home/PartnersStrip";

import FeaturedTwo from "../components/paynext/FeaturedTwo";
import ArticlesChips from "../components/paynext/ArticlesChips";
import ArticlesGrid from "../components/paynext/ArticlesGrid";
import VideosSection from "../components/paynext/VideosSection";
import CTABanner from "../components/paynext/CTABanner";

import { fetchLatestPosts, fetchFeaturedPosts, fetchRecentVideos, fetchFeaturedVideo } from "../lib/homeData";

export default async function Page({ searchParams }) {
  const tag = typeof searchParams?.tag === "string" ? searchParams.tag : "";

  const [latest, featuredPosts, recentVideos, featuredVideo] = await Promise.all([
    fetchLatestPosts(12, tag),
    fetchFeaturedPosts(2),
    fetchRecentVideos(3),
    fetchFeaturedVideo(),
  ]);

  const allForTags = tag ? await fetchLatestPosts(24, "") : latest;
  const tags = (allForTags || []).flatMap(p => Array.isArray(p?.tags) ? p.tags : []).slice(0, 24);
  const moreVideos = (recentVideos || []).filter(v => !featuredVideo || v.id !== featuredVideo.id);

  return (
    <div className="relative">
      <HeroShowcase />
      <PartnersStrip />

      <FeaturedTwo posts={featuredPosts} />

      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="h2-compact">All Articles</h2>
          <div className="mt-3">
            <ArticlesChips tags={tags} current={tag} />
          </div>
        </div>
      </section>

      <ArticlesGrid posts={latest} />
      <VideosSection featured={featuredVideo} items={moreVideos} />
      <CTABanner />
    </div>
  );
}
