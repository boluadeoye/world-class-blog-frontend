import HeroShowcase from "../components/home/HeroShowcase";
import PartnersStrip from "../components/home/PartnersStrip";

import FeaturedRail from "../components/paynext/FeaturedRail";
import LatestGrid from "../components/paynext/LatestGrid";
import VideosShowcase from "../components/paynext/VideosShowcase";
import CTABanner from "../components/paynext/CTABanner";

import { fetchLatestPosts, fetchFeaturedPosts, fetchVideoPosts, fetchFeaturedVideo } from "../lib/homeData";

export default async function Page({ searchParams }) {
  const tag = typeof searchParams?.tag === "string" ? searchParams.tag : "";

  const [latest, featuredPosts, videos, featuredVideo] = await Promise.all([
    fetchLatestPosts(6, tag),
    fetchFeaturedPosts(6),
    fetchVideoPosts(10),
    fetchFeaturedVideo(),
  ]);

  return (
    <div className="relative">
      <HeroShowcase />
      <PartnersStrip />

      <FeaturedRail posts={featuredPosts} />
      <LatestGrid posts={latest} />

      {/* New video section: featured post + clickable rail */}
      <VideosShowcase featured={featuredVideo} items={videos} />

      <CTABanner />
    </div>
  );
}
