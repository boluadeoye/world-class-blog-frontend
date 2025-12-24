import ChatInterface from "../../../components/chat/ChatInterface";
import { fetchLatestArticles } from "../../../lib/homeData";

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
    <main className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col h-dvh w-full overflow-hidden">
      <style>{`
        header, nav, .navbar, [role="banner"] { display: none !important; }
      `}</style>
      <ChatInterface blogContext={blogContext} />
    </main>
  );
}
