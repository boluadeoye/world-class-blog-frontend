import HeroShowcase from "../components/home/HeroShowcase";
import PartnersStrip from "../components/home/PartnersStrip";

import FeaturedRail from "../components/paynext/FeaturedRail";
import LatestGrid from "../components/paynext/LatestGrid";
import VideosSection from "../components/paynext/VideosSection";
import CTABanner from "../components/paynext/CTABanner";

import { fetchLatestPosts, fetchFeaturedPosts, fetchRecentVideos, fetchFeaturedVideo } from "../lib/homeData";

export default async function Page({ searchParams }) {
  const tag = typeof searchParams?.tag === "string" ? searchParams.tag : "";

  const [latest, featuredPosts, recentVideos, featuredVideo] = await Promise.all([
    fetchLatestPosts(6, tag),   // cap to 6
    fetchFeaturedPosts(6),      // enough items for the horizontal rail
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

      {/* Latest Posts — compact 2-column grid (no side scroll) */}
      <LatestGrid posts={latest} />

      {/* Videos + CTA */}
      <VideosSection featured={featuredVideo} items={moreVideos} />
      <CTABanner />
    </div>
  );
}
