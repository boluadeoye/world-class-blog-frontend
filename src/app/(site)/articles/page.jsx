import { fetchLatestArticles } from "../../../lib/homeData";
import ArchiveUI from "../../../components/articles/ArchiveUI";
import { BookOpen } from "lucide-react";

export const revalidate = 3600;

export const metadata = {
  title: "Engineering Notes | Bolu Adeoye",
  description: "Deep dives into Next.js, System Design, and AI Architecture.",
};

export default async function ArticlesPage({ searchParams }) {
  const posts = await fetchLatestArticles(100);
  const query = searchParams?.q || "";
  const topic = searchParams?.topic || "";

  // Filter Logic
  const filteredPosts = posts.filter(post => {
    const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase());
    const matchesTopic = topic ? post.meta?.category?.toLowerCase() === topic.toLowerCase() : true;
    return matchesQuery && matchesTopic;
  });

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-bold tracking-widest uppercase mb-6">
          <BookOpen size={14} /> The Archive
        </div>
        <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">Engineering Notes</h1>
        <p className="text-slate-400 text-lg">Thoughts on software architecture, AI, and digital strategy.</p>
      </div>

      <ArchiveUI posts={filteredPosts} />
    </main>
  );
}
