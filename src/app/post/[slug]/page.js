import { notFound } from "next/navigation";
import { ArticleHero, ArticleGrid } from "../../../components/article/ArticleLayout";
import SmartMarkdown from "../../../components/article/SmartMarkdown";
import { fetchLatestArticles } from "../../../lib/homeData";
import Comments from "../../../components/public/Comments";
import ReadNext from "../../../components/article/ReadNext";

export const revalidate = 3600;

// Calculate Read Time
function calculateReadTime(content) {
  if (!content) return "1 min read";
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Helper to extract headings for TOC
function extractHeadings(content) {
  if (!content) return [];
  const headings = [];
  const lines = content.split('\n');
  lines.forEach(line => {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      const slug = match[1].toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      headings.push(slug);
    }
  });
  return headings;
}

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

// === FACEBOOK/WHATSAPP OPTIMIZED METADATA ===
export async function generateMetadata(props) {
  const params = await props.params;
  const { post } = await getPostData(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      robots: { index: false, follow: false }
    };
  }

  const domain = "https://boluadeoye.com.ng";
  const ogImageUrl = `${domain}/post/${post.slug}/opengraph-image`;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: "Boluwatife Adeoye" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${domain}/post/${post.slug}`,
      siteName: "Boluwatife Adeoye",
      locale: "en_US",
      type: "article",
      // EXPLICIT DEFINITION FOR WHATSAPP
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
      creator: "@Tech_babby",
    },
  };
}

export default async function PostPage(props) {
  const params = await props.params;
  const { post, related } = await getPostData(params.slug);

  if (!post) notFound();

  const readTime = calculateReadTime(post.content);
  const headings = extractHeadings(post.content);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-amber-500/30">
      
      {/* 1. HERO */}
      <ArticleHero post={post} readTime={readTime} />

      {/* 2. CONTENT GRID */}
      <ArticleGrid headings={headings}>
        <SmartMarkdown content={post.content || ""} />
        
        {/* Comments */}
        <div className="mt-24 pt-12 border-t border-white/10">
          <h3 className="font-serif text-3xl text-white mb-8">Discussion</h3>
          <Comments postId={post.id} />
        </div>
      </ArticleGrid>

      {/* 3. READ NEXT */}
      <ReadNext posts={related} />

    </main>
  );
}
