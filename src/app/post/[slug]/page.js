import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArticleHero, ArticleContent } from "../../../components/article/ArticleLayout";
import { fetchLatestArticles } from "../../../lib/homeData"; // Assuming this exists, or we fetch all and filter

// --- DATA FETCHING (Adjusted for your setup) ---
// Since I don't have your exact 'fetchPost' function, I'll simulate it or use what you likely have.
// If you have a specific 'getPost(slug)' function, replace this block.
async function getPost(slug) {
  // Fallback: Fetch latest and find the one matching slug
  const allPosts = await fetchLatestArticles(100); 
  const post = allPosts.find((p) => p.slug === slug);
  return post || null;
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Bolu Adeoye`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-amber-500/30">
      
      {/* 1. HERO SECTION */}
      <ArticleHero post={post} />

      {/* 2. CONTENT SECTION */}
      <ArticleContent>
        {/* Render Markdown Content */}
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            // Custom Image Renderer for Markdown
            img: ({node, ...props}) => (
              <span className="block my-8 relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
                <img {...props} className="w-full h-full object-cover" loading="lazy" />
              </span>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </ArticleContent>

      {/* 3. COMMENTS & READ NEXT (Placeholder for your existing components) */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        {/* You can re-insert your <Comments /> component here if you have it separate */}
        <div className="p-8 rounded-2xl bg-slate-900/50 border border-white/5 text-center">
          <p className="text-slate-500 italic">Comments and Read Next sections loading...</p>
        </div>
      </section>

    </main>
  );
}
