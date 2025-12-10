import ChatInterface from "../../components/chat/ChatInterface";
import { fetchLatestArticles } from "../../lib/homeData";

export const metadata = {
  title: "Chat with Bolu's AI",
  description: "An intelligent digital twin of Boluwatife Adeoye.",
};

export default async function ChatPage() {
  let blogContext = "";

  try {
    // Safely fetch posts with a timeout or fallback
    const posts = await fetchLatestArticles(50).catch(() => []);
    
    if (Array.isArray(posts) && posts.length > 0) {
      blogContext = posts.map(p => 
        `Title: ${p.title}\nSummary: ${p.excerpt}\nCategory: ${p.meta?.category}`
      ).join("\n\n");
    } else {
      blogContext = "No specific blog posts found. Answer based on general software engineering knowledge.";
    }
  } catch (error) {
    console.error("Chat Context Error:", error);
    blogContext = "System maintenance mode. Answer general questions.";
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white pt-8 pb-4 px-4 md:px-8 selection:bg-indigo-500/30 flex flex-col">
      
      {/* === HIDE GLOBAL HEADER === */}
      <style>{`
        header { display: none !important; }
      `}</style>
      
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-600/5 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-5xl mx-auto w-full">
        <div className="text-center mb-6">
          <h1 className="font-serif text-3xl md:text-4xl font-medium mb-2 text-white">Intelligence Hub</h1>
          <p className="text-slate-400 text-xs uppercase tracking-widest">Digital Twin • Online</p>
        </div>

        <ChatInterface blogContext={blogContext} />
      </div>

    </main>
  );
}
