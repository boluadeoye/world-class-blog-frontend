import ChatInterface from "../../components/chat/ChatInterface";
import { fetchLatestArticles } from "../../lib/homeData";

export const metadata = {
  title: "Chat with Bolu's AI",
  description: "An intelligent digital twin of Boluwatife Adeoye.",
};

export default async function ChatPage() {
  // Fetch all posts to feed the AI's brain
  const posts = await fetchLatestArticles(50);
  
  // Format context for the AI
  const blogContext = posts.map(p => 
    `Title: ${p.title}\nSummary: ${p.excerpt}\nCategory: ${p.meta?.category}`
  ).join("\n\n");

  return (
    <main className="min-h-screen bg-[#020617] text-white pt-24 pb-12 px-4 md:px-8 selection:bg-indigo-500/30">
      
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-600/5 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-medium mb-3">Intelligence Hub</h1>
          <p className="text-slate-400 text-sm">Powered by Gemini 2.0 Flash • Trained on 50+ Articles</p>
        </div>

        <ChatInterface blogContext={blogContext} />
      </div>

    </main>
  );
}
