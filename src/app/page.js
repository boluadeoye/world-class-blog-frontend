import HeroDeck from "../components/home/HeroDeck";

import FeaturedRail from "../components/paynext/FeaturedRail";
import LatestGrid from "../components/paynext/LatestGrid";
import VideosShowcase from "../components/paynext/VideosShowcase";

import { fetchLatestArticles, fetchFeaturedPosts, fetchVideoPosts, fetchFeaturedVideo } from "../lib/homeData";

export default async function Page({ searchParams }) {
  const tag = typeof searchParams?.tag === "string" ? searchParams.tag : "";

  const [latest, featuredPosts, videos, featuredVideo] = await Promise.all([
    fetchLatestArticles(6, tag),
    fetchFeaturedPosts(6),
    fetchVideoPosts(10),
    fetchFeaturedVideo(),
  ]);

  return (
    <div className="relative">
      <HeroDeck />
      <FeaturedRail posts={featuredPosts} />
      <LatestGrid posts={latest} />
      <VideosShowcase id="videos" featured={featuredVideo} items={videos} />
    </div>
  );
}
