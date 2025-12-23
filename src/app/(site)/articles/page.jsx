import { fetchLatestArticles } from "../../lib/homeData";
import ArchiveUI from "../../components/articles/ArchiveUI";
import { BookOpen } from "lucide-react";

export const revalidate = 3600;

export const metadata = {
  title: "The Archive | Bolu Adeoye",
  description: "A curated collection of engineering deep dives, financial insights, and thoughts on the future.",
};

export default async function ArticlesPage() {
  // Fetch all posts (limit 100 for now)
  const posts = await fetchLatestArticles(100).catch(() => []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-amber-500/30">
      
      {/* === HEADER === */}
      <section className="pt-32 pb-16 px-6 text-center relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[80%] bg-indigo-900/10 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-bold text-[10px] tracking-widest uppercase backdrop-blur-md">
              <BookOpen size={12} /> The Archive
            </div>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-white tracking-tight mb-6">
            Intel & Insights
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Deep dives into software architecture, scalable systems, and the human side of technology.
          </p>
        </div>
      </section>

      {/* === INTERACTIVE ARCHIVE === */}
      <ArchiveUI posts={posts} />

    </main>
  );
}
