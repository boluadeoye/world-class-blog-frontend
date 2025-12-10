"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Trash2, Bot, Circle } from "lucide-react";

export default function ChatInterface({ blogContext }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    setMessages([{
      id: "init",
      role: "assistant",
      content: "System Online. Debug Mode Active."
    }]);
  }, []);

  useEffect(() => {
    if (mounted) scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mounted]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");

    // Add User Message
    const userMsg = { id: Date.now(), role: "user", content: userText };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          context: blogContext || "Tech Context"
        }),
      });

      const data = await res.json();
      
      // DEBUG: Print the entire data object to the chat
      const debugContent = data.reply 
        ? data.reply 
        : "DEBUG: Empty Reply. Raw Data: " + JSON.stringify(data);

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: debugContent
      }]);

    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: "Error: " + err.message,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="flex flex-col h-[75vh] w-full bg-slate-900 border border-white/10 rounded-3xl overflow-hidden">
      
      {/* Header */}
      <div className="p-4 bg-black/50 border-b border-white/10 flex justify-between items-center">
        <div className="text-white font-bold flex items-center gap-2">
          <Bot size={20} /> <span>Debug Twin</span>
        </div>
        <button onClick={() => setMessages([])} className="text-red-400"><Trash2 /></button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              style={{ 
                backgroundColor: msg.role === 'user' ? '#4F46E5' : '#1E293B', // Force Purple/Dark
                color: '#FFFFFF', // Force White Text
                padding: '12px',
                borderRadius: '12px',
                maxWidth: '85%',
                border: msg.isError ? '1px solid red' : '1px solid #333'
              }}
            >
              {/* Force render as string */}
              {String(msg.content)}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-white p-4">Bot is thinking...</div>}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-black/50">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-slate-800 text-white p-3 rounded-full"
            placeholder="Type test message..."
          />
          <button type="submit" className="bg-indigo-600 text-white p-3 rounded-full">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
