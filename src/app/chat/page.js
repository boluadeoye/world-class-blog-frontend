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
    // FIXED FULL SCREEN (Mobile Safe)
    <main className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col h-dvh w-full">
      <ChatInterface blogContext={blogContext} />
    </main>
  );
}
