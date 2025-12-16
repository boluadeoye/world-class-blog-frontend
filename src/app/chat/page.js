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
    // NUCLEAR OPTION: Fixed position, Top Z-Index, Black Background
    <main className="fixed inset-0 z-[99999] bg-black flex flex-col h-[100dvh] w-full overflow-hidden">
      
      {/* Force Hide Global Header via CSS */}
      <style>{`
        body > header, nav, .navbar { display: none !important; }
      `}</style>

      <ChatInterface blogContext={blogContext} />
    </main>
  );
}
