import { notFound } from "next/navigation";
import { ArticleHero, ArticleGrid } from "../../../components/article/ArticleLayout";
import SmartMarkdown from "../../../components/article/SmartMarkdown";
import { fetchLatestArticles } from "../../../lib/homeData";
import Comments from "../../../components/public/Comments";
import ReadNext from "../../../components/article/ReadNext";

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

// Helper to extract headings for TOC
function extractHeadings(content) {
  const headings = [];
  const lines = content.split('\n');
  lines.forEach(line => {
    const match = line.match(/^##\s+(.+)$/); // Match H2s
    if (match) {
      // Create a slug from the text
      const slug = match[1].toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      headings.push(slug);
    }
  });
  return headings;
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

  const headings = extractHeadings(post.content);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-amber-500/30">
      
      <ArticleHero post={post} />

      <ArticleGrid headings={headings}>
        <SmartMarkdown content={post.content} />
        
        {/* Comments Section */}
        <div className="mt-24 pt-12 border-t border-white/10">
          <h3 className="font-serif text-3xl text-white mb-8">Discussion</h3>
          <Comments postId={post.id} />
        </div>
      </ArticleGrid>

      <ReadNext posts={related} />

    </main>
  );
}
