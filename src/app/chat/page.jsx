"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ArrowLeft, Trash2, Mail, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const scrollRef = useRef(null);

  // 1. Load Chat from LocalStorage on Mount
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("bolu_chat_history");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([{ role: "assistant", content: "Hello. I'm Bolu's digital twin. I can discuss projects, engineering, or my latest articles. What's on your mind?" }]);
    }
  }, []);

  // 2. Save Chat to LocalStorage on Change
  useEffect(() => {
    if (isClient && messages.length > 0) {
      localStorage.setItem("bolu_chat_history", JSON.stringify(messages));
    }
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isClient]);

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

  const clearChat = () => {
    if (confirm("Clear conversation history?")) {
      const reset = [{ role: "assistant", content: "Memory wiped. Ready for new input." }];
      setMessages(reset);
      localStorage.setItem("bolu_chat_history", JSON.stringify(reset));
    }
  };

  // Generate Mailto Link based on conversation context
  const handleEmail = () => {
    const lastMsg = messages[messages.length - 1]?.content || "";
    const subject = "Project Inquiry via AI Assistant";
    const body = `Hi Bolu,\n\nI was chatting with your AI assistant. Here is the summary of our discussion:\n\n${lastMsg}\n\nLet's connect!`;
    window.open(`mailto:boluadeoye97@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  if (!isClient) return null; // Prevent hydration mismatch

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 flex flex-col relative overflow-hidden font-sans">
      
      {/* Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-600/5 blur-[100px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 md:px-6 py-4 flex items-center justify-between border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-full hover:bg-white/5 transition-colors">
            <ArrowLeft size={20} className="text-slate-400" />
          </Link>
          <div>
            <h1 className="font-serif text-lg text-white leading-none">Bolu AI</h1>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Online</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleEmail}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all"
            title="Email Transcript to Bolu"
          >
            <Mail size={14} /> Send Brief
          </button>
          <button 
            onClick={clearChat}
            className="p-2 rounded-full hover:bg-red-500/10 hover:text-red-400 text-slate-500 transition-colors"
            title="Clear History"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 relative z-10 overflow-y-auto p-4 md:p-8 scroll-smooth" ref={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-6 pb-4">
          <AnimatePresence initial={false}>
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
                
                <div className={`max-w-[85%] md:max-w-[75%] p-4 md:p-5 rounded-2xl text-[15px] leading-relaxed shadow-xl ${
                  m.role === "user" 
                    ? "bg-white text-slate-900 rounded-tr-none font-medium" 
                    : "bg-slate-900/80 border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-md"
                }`}>
                  {/* MARKDOWN RENDERER */}
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      strong: ({node, ...props}) => <span className="font-bold text-amber-400" {...props} />,
                      a: ({node, ...props}) => <a className="text-indigo-400 hover:underline" target="_blank" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-4 my-2 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-4 my-2 space-y-1" {...props} />,
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />
                    }}
                  >
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
                <Sparkles size={14} className="text-amber-400 animate-pulse" />
                <span>Analyzing request...</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="relative z-10 p-4 md:p-6 bg-slate-950 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          
          {/* Input Box */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full opacity-20 group-hover:opacity-50 transition duration-500 blur"></div>
            <div className="relative flex items-center bg-slate-900 rounded-full p-1 border border-white/10 shadow-2xl">
              <input 
                type="text" 
                placeholder="Ask about projects, pricing, or tech..." 
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
          
          <div className="flex justify-center mt-4">
            <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={10} className="text-indigo-500" />
              Powered by Gemini 2.0 Flash
            </p>
          </div>
        </div>
      </div>

    </main>
  );
}
