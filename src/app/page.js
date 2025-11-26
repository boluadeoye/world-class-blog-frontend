import HeroShowcase from "../components/home/HeroShowcase";
import PartnersStrip from "../components/home/PartnersStrip";

import FeaturedRail from "../components/paynext/FeaturedRail";
import ArticlesRailTwoCols from "../components/paynext/ArticlesRailTwoCols";
import VideosSection from "../components/paynext/VideosSection";
import CTABanner from "../components/paynext/CTABanner";

import { fetchLatestPosts, fetchFeaturedPosts, fetchRecentVideos, fetchFeaturedVideo } from "../lib/homeData";

export default async function Page({ searchParams }) {
  const tag = typeof searchParams?.tag === "string" ? searchParams.tag : "";

  const [latest, featuredPosts, recentVideos, featuredVideo] = await Promise.all([
    fetchLatestPosts(12, tag),
    fetchFeaturedPosts(6),           // give the rail more items
    fetchRecentVideos(3),
    fetchFeaturedVideo(),
  ]);

  const moreVideos = (recentVideos || []).filter(v => !featuredVideo || v.id !== featuredVideo.id);

  return (
    <div className="relative">
      <HeroShowcase />
      <PartnersStrip />

      {/* Featured — animated horizontal rail */}
      <FeaturedRail posts={featuredPosts} />

      {/* All Articles — two-row horizontal scroller */}
      <ArticlesRailTwoCols posts={latest} />

      {/* Videos + CTA unchanged */}
      <VideosSection featured={featuredVideo} items={moreVideos} />
      <CTABanner />
    </div>
  );
}
