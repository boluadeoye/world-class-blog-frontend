"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "System Online. I'm Bolu's digital assistant. I have access to his latest work and profile. How can I help?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async (text = input) => {
    if (!text.trim() || loading) return;
    
    const userMsg = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) 
        }),
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection interrupted." }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "What have you written lately?",
    "Tell me about your tech stack",
    "How can I hire you?",
    "Explain React Server Components"
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 flex flex-col relative overflow-hidden font-sans">
      
      {/* Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-600/5 blur-[100px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 flex items-center justify-between border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm">Exit Interface</span>
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Neural Link Active</span>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 relative z-10 overflow-y-auto p-4 md:p-8" ref={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shrink-0 mt-1">
                    <Bot size={16} className="text-white" />
                  </div>
                )}
                
                <div className={`max-w-[85%] p-4 md:p-6 rounded-2xl text-[15px] md:text-base leading-relaxed shadow-xl ${
                  m.role === "user" 
                    ? "bg-white text-slate-900 rounded-tr-none font-medium" 
                    : "bg-slate-900/80 border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-md"
                }`}>
                  <ReactMarkdown className="prose prose-invert prose-sm max-w-none">
                    {m.content}
                  </ReactMarkdown>
                </div>

                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 shrink-0 mt-1">
                    <User size={16} className="text-slate-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg mt-1">
                <Loader2 size={16} className="text-white animate-spin" />
              </div>
              <div className="bg-slate-900/80 border border-white/10 px-5 py-3 rounded-2xl rounded-tl-none text-slate-400 text-sm flex items-center gap-2">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="relative z-10 p-4 md:p-6 bg-slate-950 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          
          {/* Suggestions */}
          {messages.length < 3 && (
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {suggestions.map((s) => (
                <button 
                  key={s}
                  onClick={() => handleSend(s)}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-400 hover:bg-white/10 hover:text-white hover:border-indigo-500/50 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full opacity-20 group-hover:opacity-50 transition duration-500 blur"></div>
            <div className="relative flex items-center bg-slate-900 rounded-full p-1 border border-white/10 shadow-2xl">
              <input 
                type="text" 
                placeholder="Ask anything..." 
                className="w-full bg-transparent text-white placeholder-slate-500 px-5 py-3 outline-none text-base font-medium rounded-l-full"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mr-1"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
          
          <p className="text-center text-[10px] text-slate-600 mt-3 uppercase tracking-widest">
            Powered by Gemini 2.0 Flash
          </p>
        </div>
      </div>

    </main>
  );
}
