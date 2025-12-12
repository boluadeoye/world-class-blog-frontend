import BotInterface from "@/components/chat/BotInterface";

export const metadata = {
  title: "Chat with Bolu | Digital Consciousness",
};

export default function ChatPage() {
  const blogContext = `
    Name: Boluwatife Adeoye
    Role: Full-Stack Engineer & AI Architect
    Skills: Next.js, React, Node.js, AI Agents (Llama 3, Groq), Supabase.
    Services: 
    1. Custom AI Sales Agents (₦50k Setup).
    2. Premium Web Development.
    3. Technical Consultation.
    Contact: boluadeoye97@gmail.com
  `;

  return (
    <main className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center">
      <div className="w-full h-full md:max-w-md md:h-[85vh] md:rounded-3xl md:border md:border-white/10 md:shadow-2xl overflow-hidden bg-slate-950">
        <BotInterface blogContext={blogContext} />
      </div>
    </main>
  );
}
