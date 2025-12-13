import ChatInterface from "../../components/chat/ChatInterface";
import { fetchLatestArticles } from "../../lib/homeData";

export const metadata = {
  title: "Neural Core | Bolu Adeoye",
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
    // Z-INDEX 9999 forces this page to cover the global header
    <main className="fixed inset-0 z-[9999] bg-[#020617] text-white flex flex-col overflow-hidden">
      
      {/* === BACKGROUND BEAMS === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse duration-[8s]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-amber-600/5 blur-[150px] rounded-full mix-blend-screen animate-pulse duration-[10s]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
      </div>

      {/* === CONTENT === */}
      <div className="relative z-10 flex-1 flex flex-col max-w-4xl mx-auto w-full h-full md:py-8 md:px-6">
        <ChatInterface blogContext={blogContext} />
      </div>

    </main>
  );
}
