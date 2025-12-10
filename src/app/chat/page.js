import ChatInterface from "../../components/chat/ChatInterface";
import { fetchLatestArticles } from "../../lib/homeData";

export const metadata = {
  title: "Chat with Bolu's AI",
  description: "An intelligent digital twin of Boluwatife Adeoye.",
};

export default async function ChatPage() {
  let blogContext = "";
  try {
    const posts = await fetchLatestArticles(50).catch(() => []);
    if (Array.isArray(posts)) {
      blogContext = posts.map(p => `Title: ${p.title}\nSummary: ${p.excerpt}`).join("\n\n");
    }
  } catch (e) {}

  return (
    // Z-INDEX 100 forces it above the global header
    <main className="fixed inset-0 z-[100] bg-[#020617] text-white flex flex-col">
      
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-600/5 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col max-w-5xl mx-auto w-full p-4 md:p-8">
        <div className="mb-4">
           <a href="/" className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest">← Back to Portfolio</a>
        </div>
        <ChatInterface blogContext={blogContext} />
      </div>

    </main>
  );
}
