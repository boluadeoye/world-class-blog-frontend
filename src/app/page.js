import MainHero from "../components/home/MainHero";

import FeaturedRail from "../components/paynext/FeaturedRail";
import LatestGrid from "../components/paynext/LatestGrid";
import VideosShowcase from "../components/paynext/VideosShowcase";
import CTABanner from "../components/paynext/CTABanner";

import { fetchLatestArticles, fetchFeaturedPosts, fetchVideoPosts, fetchFeaturedVideo } from "../lib/homeData";

export default async function Page({ searchParams }) {
  const tag = typeof searchParams?.tag === "string" ? searchParams.tag : "";

  const [latest, featuredPosts, videos, featuredVideo] = await Promise.all([
    fetchLatestArticles(6, tag),   // articles only
    fetchFeaturedPosts(6),
    fetchVideoPosts(10),
    fetchFeaturedVideo(),
  ]);

  return (
    <div className="relative">
      <MainHero />

      <FeaturedRail posts={featuredPosts} />
      <LatestGrid posts={latest} />

      <VideosShowcase featured={featuredVideo} items={videos} />
      <CTABanner />
    </div>
  );
}
