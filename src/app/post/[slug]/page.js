import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArticleHero, ArticleContent } from "../../../components/article/ArticleLayout";
import { fetchLatestArticles } from "../../../lib/homeData";

export const revalidate = 3600;

// Helper to find post
async function getPost(slug) {
  try {
    // Fetch a large batch to ensure we find the post
    // If you have a specific fetchPostBySlug function in homeData, we should use that instead.
    const allPosts = await fetchLatestArticles(100); 
    
    if (!Array.isArray(allPosts)) return null;
    
    const post = allPosts.find((p) => p.slug === slug);
    return post || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata(props) {
  const params = await props.params; // Await params for Next.js 15+
  const post = await getPost(params.slug);
  
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} | Bolu Adeoye`,
    description: post.excerpt || "Read this article on Bolu Adeoye's blog.",
    openGraph: {
      images: [post.meta?.cover || post.cover_image_url || ""],
    },
  };
}

export default async function PostPage(props) {
  const params = await props.params; // Await params for Next.js 15+
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
                <img {...props} className="w-full h-full object-cover" loading="lazy" alt={props.alt || "Article Image"} />
              </span>
            ),
            // Custom Link Renderer
            a: ({node, ...props}) => (
              <a {...props} className="text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-4" target="_blank" rel="noopener noreferrer" />
            ),
            // Custom Headers
            h2: ({node, ...props}) => (
              <h2 {...props} className="text-3xl font-serif font-medium text-white mt-12 mb-6" />
            ),
            h3: ({node, ...props}) => (
              <h3 {...props} className="text-2xl font-serif font-medium text-slate-100 mt-8 mb-4" />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </ArticleContent>

      {/* 3. FOOTER AREA */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="p-8 rounded-2xl bg-slate-900/50 border border-white/5 text-center">
          <p className="text-slate-500 italic">Thanks for reading.</p>
        </div>
      </section>

    </main>
  );
}
