import { notFound } from "next/navigation";
import { ArticleHero, ArticleContent } from "../../../components/article/ArticleLayout";
import SmartMarkdown from "../../../components/article/SmartMarkdown";
import { fetchLatestArticles } from "../../../lib/homeData";
import Comments from "../../../components/public/Comments";
import ReadNext from "../../../components/article/ReadNext";
import FloatingActionDock from "../../../components/article/FloatingActionDock"; // New Import

export const revalidate = 3600;

async function getPostData(slug) {
  const allPosts = await fetchLatestArticles(100);
  if (!Array.isArray(allPosts)) return { post: null, related: [] };
  
  const postIndex = allPosts.findIndex((p) => p.slug === slug);
  if (postIndex === -1) return { post: null, related: [] };

  const post = allPosts[postIndex];
  
  const related = [];
  if (allPosts.length > 1) related.push(allPosts[(postIndex + 1) % allPosts.length]);
  if (allPosts.length > 2) related.push(allPosts[(postIndex + 2) % allPosts.length]);

  return { post, related };
}

export async function generateMetadata(props) {
  const params = await props.params;
  const { post } = await getPostData(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Bolu Adeoye`,
    description: post.excerpt,
    openGraph: { images: [post.meta?.cover || post.cover_image_url || ""] },
  };
}

export default async function PostPage(props) {
  const params = await props.params;
  const { post, related } = await getPostData(params.slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-amber-500/30">
      
      {/* 1. HERO */}
      <ArticleHero post={post} />

      {/* 2. CONTENT */}
      <ArticleContent>
        <SmartMarkdown content={post.content} />
      </ArticleContent>

      {/* 3. COMMENTS */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="p-1 rounded-3xl bg-gradient-to-b from-white/5 to-transparent">
          <div className="bg-slate-950/50 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-white/5">
            <Comments postId={post.id} />
          </div>
        </div>
      </section>

      {/* 4. READ NEXT */}
      <ReadNext posts={related} />

      {/* 5. FLOATING ACTION DOCK (New Component) */}
      <FloatingActionDock />

    </main>
  );
}
