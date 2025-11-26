import { getLatestPosts } from "../lib/api";
import NonziHero from "../components/nonzi/NonziHero";
import NonziPanel from "../components/nonzi/NonziPanel";

export default async function Page() {
  const posts = await getLatestPosts(8);
  return (
    <div className="relative">
      <NonziHero />
      <NonziPanel posts={posts} />
    </div>
  );
}
