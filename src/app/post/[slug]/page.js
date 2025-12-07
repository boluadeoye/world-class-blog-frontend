import { notFound } from "next/navigation";
import { ArticleContent } from "../../../components/article/ArticleLayout";
import SmartMarkdown from "../../../components/article/SmartMarkdown";
import ReadNext from "../../../components/article/ReadNext";
import { fetchLatestArticles } from "../../../lib/homeData";
import Comments from "../../../components/public/Comments";
import ReadingHUD from "../../../components/article/ReadingHUD";
import { Calendar, Clock, User, Share2 } from "lucide-react";

export const revalidate = 3600;

// --- SAFE UTILS ---
function calculateReadTime(content) {
  if (!content || typeof content !== 'string') return "1 min read";
  try {
    const text = content.replace(/[#*`\[\]()]/g, '');
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
  } catch (e) {
    return "1 min read";
  }
}

function safeDate(d) {
  try {
    if (!d) return "Recent";
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (e) {
    return "Recent";
  }
}

async function getPostData(slug) {
  try {
    const allPosts = await fetchLatestArticles(100);
    if (!Array.isArray(allPosts)) return { post: null, related: [] };

    const postIndex = allPosts.findIndex((p) => p.slug === slug);
    if (postIndex === -1) return { post: null, related: [] };
    
    const rawPost = allPosts[postIndex];
    
    // Ensure all fields exist to prevent rendering crashes
    const post = {
      ...rawPost,
      title: rawPost.title || "Untitled Post",
      content: rawPost.content || "",
      readTime: calculateReadTime(rawPost.content),
      meta: rawPost.meta || {},
      created_at: rawPost.created_at || new Date().toISOString()
    };

    const related = [];
    if (allPosts.length > 1) related.push(allPosts[(postIndex + 1) % allPosts.length]);
    if (allPosts.length > 2) related.push(allPosts[(postIndex + 2) % allPosts.length]);
    
    return { post, related };
  } catch (e) {
    console.error("Error fetching post:", e);
    return { post: null, related: [] };
  }
}

export async function generateMetadata(props) {
  try {
    const params = await props.params; // Await params for Next.js 15+
    const { post } = await getPostData(params.slug);
    if (!post) return { title: "Post Not Found" };
    return {
      title: `${post.title} | Bolu Adeoye`,
      description: post.excerpt || "Read this article on Bolu Adeoye's blog.",
      openGraph: { images: [post.meta?.cover || post.cover_image_url || ""] },
    };
  } catch (e) {
    return { title: "Article" };
  }
}

export default async function PostPage(props) {
  const params = await props.params; // Await params for Next.js 15+
  const { post, related } = await getPostData(params.slug);
  
  if (!post) notFound();

  const coverImage = post.meta?.cover || post.cover_image_url;

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-amber-500/30 font-sans relative">
      
      {/* HUD - Only render if we have readTime */}
      {post.readTime && <ReadingHUD readTime={post.readTime} />}

      {/* --- 1. CINEMATIC HERO --- */}
      <header className="relative min-h-[70vh] flex flex-col justify-end pb-20 px-6 md:px-12 overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {coverImage ? (
            <img src={coverImage} alt={post.title} className="w-full h-full object-cover opacity-40" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 to-[#0B1120]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl">
          {/* Meta Tags */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-xs font-bold tracking-[0.2em] uppercase text-amber-500">
            <span className="px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10">
              {post.meta?.category || "Log"}
            </span>
            <span className="flex items-center gap-2 text-slate-400">
              <Calendar size={14} /> {safeDate(post.created_at)}
            </span>
            <span className="flex items-center gap-2 text-slate-400">
              <Clock size={14} /> {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-8 tracking-tight">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400">
              <User size={20} />
            </div>
            <div>
              <div className="text-white font-bold">Boluwatife Adeoye</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Full-Stack Architect</div>
            </div>
          </div>
        </div>
      </header>

      {/* --- 2. EXECUTIVE BRIEF --- */}
      <section className="relative z-20 px-6 md:px-12 -mt-12 mb-20">
        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50">
          <div className="flex items-center gap-3 mb-6 text-xs font-bold text-emerald-500 uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Executive Brief
          </div>
          <p className="text-xl md:text-2xl text-slate-300 font-serif leading-relaxed italic">
            "{post.excerpt || "A deep dive into the architecture of modern systems."}"
          </p>
        </div>
      </section>

      {/* --- 3. MAIN CONTENT --- */}
      <article className="relative z-10 px-6 md:px-12 pb-24">
        <div className="max-w-3xl mx-auto prose prose-invert prose-lg md:prose-xl prose-headings:font-serif prose-headings:text-white prose-p:text-slate-300 prose-p:leading-loose prose-a:text-amber-500 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-hr:border-white/10">
          <SmartMarkdown content={post.content} />
        </div>
      </article>

      {/* --- 4. COMMENTS --- */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-12 border-t border-white/10 pt-12">
          <h3 className="text-2xl font-serif text-white">Discussion</h3>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm font-bold text-slate-300">
            <Share2 size={16} /> Share
          </button>
        </div>
        
        <div className="p-1 rounded-3xl bg-gradient-to-b from-white/5 to-transparent">
          <div className="bg-[#0B1120]/50 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-white/5">
            <Comments postId={post.id} />
          </div>
        </div>
      </section>

      {/* --- 5. READ NEXT --- */}
      <div className="border-t border-white/5 bg-[#050a14]">
        <ReadNext posts={related} />
      </div>

    </main>
  );
}
