"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Trash2, Bot, Circle, AlertTriangle } from "lucide-react";

export default function ChatInterface({ blogContext }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [debugError, setDebugError] = useState(null); // For on-screen debugging
  const scrollRef = useRef(null);

  // Safe ID Generator
  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    setMounted(true);
    setMessages([{
      id: "init-001",
      role: "assistant",
      content: "System Online. I am Bolu's Digital Twin (v2.1). Ask me anything."
    }]);
  }, []);

  useEffect(() => {
    if (mounted && !debugError) {
      // Only scroll if no error to prevent layout thrashing
      requestAnimationFrame(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [messages, mounted, debugError]);

  // --- PARANOID RENDERER ---
  const renderContent = (content) => {
    try {
      if (content === null || content === undefined) return "";
      if (typeof content === 'string') return content;
      if (typeof content === 'number') return String(content);
      if (typeof content === 'object') {
        return JSON.stringify(content);
      }
      return String(content);
    } catch (e) {
      return "Error displaying content.";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");
    setDebugError(null); // Clear previous errors

    const userMsg = { id: generateId(), role: "user", content: userText };
    
    // Optimistic update
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      // 1. Truncate Context to prevent "Payload Too Large" (413) errors
      const safeContext = typeof blogContext === 'string' 
        ? blogContext.slice(0, 10000) // Limit to ~10k chars
        : "General Tech Context";

      // 2. Send Request
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, content: m.content })), // Send clean data
          context: safeContext
        }),
      });

      // 3. Handle Non-JSON Responses (e.g., Vercel 504/500 HTML pages)
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON Response:", text);
        throw new Error(`Server returned ${res.status}. Likely a timeout or payload limit.`);
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server Error: ${res.status}`);
      }

      // 4. Validate Reply
      const replyText = data.reply ? String(data.reply) : "No response received.";

      setMessages(prev => [...prev, {
        id: generateId(),
        role: "assistant",
        content: replyText
      }]);

    } catch (err) {
      console.error("Chat Critical Failure:", err);
      setDebugError(err.message); // Show error on screen
      
      setMessages(prev => [...prev, {
        id: generateId(),
        role: "assistant",
        content: "I encountered a connection error. Please check the debug log below.",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return <div className="h-[70vh] w-full bg-slate-900/50 rounded-3xl animate-pulse"></div>;
  }

  return (
    <div className="flex flex-col h-[75vh] w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Digital Twin <span className="text-xs opacity-50">(v2.1)</span></h3>
            <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1">
              <Circle size={6} fill="currentColor" /> Online
            </p>
          </div>
        </div>
        <button
          onClick={() => setMessages([{ id: generateId(), role: "assistant", content: "Memory cleared." }])}
          className="p-2 text-slate-500 hover:text-red-400 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-1">
                <Bot size={14} className="text-amber-400" />
              </div>
            )}
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
              msg.role === 'user'
                ? 'bg-indigo-600 text-white rounded-tr-none'
                : msg.isError
                  ? 'bg-red-900/20 text-red-200 border border-red-500/20'
                  : 'bg-slate-800 text-slate-200 border border-white/5 rounded-tl-none'
            }`}>
              {renderContent(msg.content)}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-amber-400" />
            </div>
            <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center border border-white/5">
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.1s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            </div>
          </div>
        )}
        
        {/* ON-SCREEN DEBUGGER */}
        {debugError && (
          <div className="w-full p-3 mt-4 bg-red-950/50 border border-red-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-red-400 mb-1">
              <AlertTriangle size={14} />
              <span className="text-xs font-bold uppercase">Debug Error Log</span>
            </div>
            <code className="text-[10px] text-red-200 font-mono break-all block">
              {debugError}
            </code>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-black/40 border-t border-white/5">
        <form onSubmit={handleSend} className="relative flex items-center gap-2 bg-slate-800/50 rounded-full p-1.5 border border-white/10 focus-within:border-indigo-500/50 transition-colors shadow-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 px-4 py-3 outline-none text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
