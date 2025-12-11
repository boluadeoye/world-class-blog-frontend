import ChatInterface from "@/components/chat/ChatInterface";

export const metadata = {
  title: "Chat with Bolu | Digital Twin",
  description: "Ask my AI digital twin about my projects, skills, and experience.",
};

export default function ChatPage() {
  // HARDCODED CONTEXT (To prevent build errors)
  const blogContext = `
    Name: Boluwatife Adeoye
    Role: Software Engineer (Full Stack)
    Contact Email: boluadeoye97@gmail.com
    Contact Phone: 08106293674
    WhatsApp: https://wa.me/2348106293674
    
    Bio: I am a skilled Software Engineer specializing in modern web technologies like Next.js, React, and AI integrations.
    
    Tech Stack: JavaScript, React, Next.js, Node.js, Tailwind CSS, AI Engineering (Groq, Llama 3), Supabase, PostgreSQL.
    
    Focus: Building high-performance, scalable web applications and intelligent AI agents.
  `;

  return (
    <main className="h-[100dvh] w-full bg-slate-950 flex items-center justify-center p-0 md:p-4 relative overflow-hidden">
      {/* Subtle Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-900/10 rounded-full blur-[120px]" />
      </div>

      {/* The Chat Interface */}
      <div className="w-full h-full md:h-[85vh] md:max-w-2xl z-10">
        <ChatInterface blogContext={blogContext} />
      </div>
    </main>
  );
}
