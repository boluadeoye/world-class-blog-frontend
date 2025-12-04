import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { fetchLatestArticles } from "../../../lib/homeData";
import PostCard from "../../../components/ui/PostCard";

// Force dynamic rendering so it catches new posts
export const dynamic = 'force-dynamic';

export default async function TopicCategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const topicName = slug.charAt(0).toUpperCase() + slug.slice(1);

  // 1. Fetch Data
  let filteredPosts = [];
  try {
    const allPosts = await fetchLatestArticles(500, "");
    if (Array.isArray(allPosts)) {
      // Filter posts that match the topic slug (by title or category)
      filteredPosts = allPosts.filter((post: any) => {
        const content = JSON.stringify(post).toLowerCase();
        return content.includes(slug.toLowerCase());
      });
    }
  } catch (e) {
    console.error("Error fetching topic posts:", e);
  }

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
        <Link href="/topics" className="inline-flex items-center gap-2 text-amber-500 mb-8 hover:text-amber-400 transition-colors">
          <ArrowLeft size={16} />
          <span className="text-xs font-bold tracking-widest uppercase">Return to Index</span>
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
          {topicName} <span className="text-slate-600 italic">Archives</span>
        </h1>
        <p className="text-slate-400">
          Found {filteredPosts.length} articles matching this frequency.
        </p>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="p-12 border border-dashed border-slate-800 rounded-3xl text-center text-slate-500">
            <p>No signals detected for this frequency yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
