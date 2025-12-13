import ChatInterface from "../../components/chat/ChatInterface";
import { fetchLatestArticles } from "../../lib/homeData";

export const metadata = {
  title: "Digital Consciousness | Bolu Adeoye",
  description: "Interactive AI Digital Twin.",
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
    // FIXED HEIGHT CONTAINER - No Window Scroll
    <main className="fixed inset-0 z-[9999] bg-[#050505] text-white flex flex-col overflow-hidden">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/20 blur-[120px] rounded-full opacity-50"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-amber-900/10 blur-[100px] rounded-full opacity-50"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      </div>

      {/* Chat Centered Container */}
      <div className="relative z-10 flex-1 flex flex-col w-full max-w-2xl mx-auto h-full md:py-6">
        <ChatInterface blogContext={blogContext} />
      </div>

    </main>
  );
}
