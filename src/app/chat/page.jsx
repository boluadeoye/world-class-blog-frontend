"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Mail, Copy, RotateCcw } from "lucide-react";
import { suggestions, answerFor } from "../../lib/assistant/kb";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi — I’m Boluadeoye’s personal assistant. How may we help? We offer full‑stack development, technical writing, and product videos.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("chat-transcript");
      if (saved) setMessages(JSON.parse(saved));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("chat-transcript", JSON.stringify(messages));
    } catch {}
    // Scroll to bottom on new message
    wrapRef.current?.scrollTo({ top: wrapRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: content }]);
    setTyping(true);
    // Fake small think time
    setTimeout(() => {
      const reply = answerFor(content);
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
      setTyping(false);
    }, 450);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const transcriptText = () =>
    messages.map((m) => `${m.role === "assistant" ? "Assistant" : "You"}: ${m.text}`).join("\n");

  const mailto = () => {
    const subject = encodeURIComponent("New inquiry from boluadeoye.com.ng");
    const body = encodeURIComponent(transcriptText());
    const url = CONTACT_EMAIL
      ? `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
      : `mailto:?subject=${subject}&body=${body}`;
    window.location.href = url;
  };

  const copyTranscript = async () => {
    try {
      await navigator.clipboard.writeText(transcriptText());
      alert("Transcript copied.");
    } catch {
      alert("Copy failed; long‑press to copy.");
    }
  };

  const reset = () => {
    setMessages([
      {
        role: "assistant",
        text: "Hi — I’m Boluadeoye’s personal assistant. How may we help today?",
      },
    ]);
    try { localStorage.removeItem("chat-transcript"); } catch {}
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur supports-backdrop-blur:bg-slate-950/50">
        <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-semibold text-slate-100">Let’s talk</h1>
            <div className="flex items-center gap-2">
              <button onClick={copyTranscript} className="btn-ghost h-8 px-2" aria-label="Copy transcript"><Copy size={16} /></button>
              <button onClick={reset} className="btn-ghost h-8 px-2" aria-label="Reset chat"><RotateCcw size={16} /></button>
              <button onClick={mailto} className="btn-ghost h-8 px-2" aria-label="Send to owner"><Mail size={16} /></button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Suggestions */}
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => send(s)}
              className="rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1.5 text-sm text-slate-200 hover:border-slate-600 transition"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div ref={wrapRef} className="mt-4 max-h-[70vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900/40 p-3 no-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={[
                  "max-w-[84%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm",
                  m.role === "user"
                    ? "bg-sky-600 text-white"
                    : "bg-slate-800/70 text-slate-50 border border-slate-700/60",
                ].join(" ")}
              >
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="mb-2 flex justify-start">
              <div className="chat-typing" aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Composer */}
      <footer className="sticky bottom-0 z-10 mt-3 border-t border-slate-800/70 bg-slate-950/70 backdrop-blur supports-backdrop-blur:bg-slate-950/50">
        <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex gap-2">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type your message..."
              className="min-h-[44px] flex-1 resize-none rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600/60"
            />
            <button
              onClick={() => send()}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-sky-500"
            >
              <Send size={16} /> Send
            </button>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">Free assistant. Final replies can be emailed to the owner.</div>
        </div>
      </footer>
    </div>
  );
}
