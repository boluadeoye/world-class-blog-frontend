import StartHereNewsletter from "../components/home/StartHereNewsletter";
import HeroDeck from "../components/home/HeroDeck";
import FeaturedRail from "../components/paynext/FeaturedRail";
import LuxLatest from "../components/home/LuxLatest";
import VideosShowcase from "../components/paynext/VideosShowcase";

import {
  fetchLatestArticles,
  fetchFeaturedPosts,
  fetchVideoPosts,
  fetchFeaturedVideo,
} from "../lib/homeData";

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

      {/* Luxurious single-column latest (shows only the latest 3 internally) */}
      <LuxLatest posts={latest} />

      <VideosShowcase id="videos" featured={featuredVideo} items={videos} />

      <StartHereNewsletter />
    </div>
  );
}
