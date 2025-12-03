import { notFound } from "next/navigation";
import { ArticleHero, ArticleContent } from "../../../components/article/ArticleLayout";
import SmartMarkdown from "../../../components/article/SmartMarkdown";
import { fetchLatestArticles } from "../../../lib/homeData";
import Comments from "../../../components/public/Comments";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

      {/* 3. COMMENTS (Fixed Prop: Passing ID instead of Slug) */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="p-1 rounded-3xl bg-gradient-to-b from-white/5 to-transparent">
          <div className="bg-slate-950/50 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-white/5">
            <Comments postId={post.id} />
          </div>
        </div>
      </section>

      {/* 4. READ NEXT */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-slate-800"></div>
          <h3 className="text-xl font-serif text-slate-300">Read Next</h3>
          <div className="h-px flex-1 bg-slate-800"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {related.map((item) => (
            <Link key={item.slug} href={`/post/${item.slug}`} className="group relative block p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-3 block">
                    {item.meta?.category || "Article"}
                  </span>
                  <h4 className="text-xl font-serif text-white group-hover:text-amber-400 transition-colors mb-3">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 text-sm line-clamp-2">{item.excerpt}</p>
                </div>
                <div className="mt-6 flex items-center text-sm text-slate-500 group-hover:text-white transition-colors">
                  Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
