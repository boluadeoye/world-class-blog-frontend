import ChatInterface from "@/components/chat/ChatInterface";
import { homeData } from "@/lib/homeData";

export const metadata = {
  title: "Chat with Bolu | Digital Twin",
  description: "Ask my AI digital twin about my projects, skills, and experience.",
};

export default function ChatPage() {
  // Prepare context
  const blogContext = `
    Name: Boluwatife Adeoye
    Role: ${homeData.hero.role}
    Bio: ${homeData.hero.description}
    Tech Stack: ${homeData.skills.map(s => s.name).join(", ")}
    Projects: ${homeData.projects.map(p => `${p.title} (${p.tech})`).join("; ")}
    Contact: Email: boluadeoye97@gmail.com, Phone: 08106293674
  `;

  return (
    <main className="h-[100dvh] w-full bg-slate-950 flex items-center justify-center p-0 md:p-4 relative overflow-hidden">
      {/* Subtle Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-900/10 rounded-full blur-[120px]" />
      </div>

      {/* The Chat Interface - Full Height on Mobile, Boxed on Desktop */}
      <div className="w-full h-full md:h-[85vh] md:max-w-2xl z-10">
        <ChatInterface blogContext={blogContext} />
      </div>
    </main>
  );
}
