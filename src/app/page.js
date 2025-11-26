import { getPublicPosts } from "../lib/api";
import NonziHero from "../components/nonzi/NonziHero";
import NonziPanel from "../components/nonzi/NonziPanel";

export default async function Page() {
  let posts = [];
  try { posts = await getPublicPosts(); } catch {}

  return (
    <div className="relative">
      <NonziHero />
      <NonziPanel posts={posts} />
    </div>
  );
}
