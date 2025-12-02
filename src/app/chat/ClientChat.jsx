'use client';
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Mail } from "lucide-react";

const MODES = [
  { key:"inquiry", label:"Project inquiry" },
  { key:"advice", label:"Advice" },
  { key:"troubleshoot", label:"Troubleshoot" },
  { key:"writing", label:"Writing" },
];

const SUGGESTS = [
  "I want a website — where do we start?",
  "Can you review a simple API design for me?",
  "Help me debug a 500 error on my Next.js API route.",
  "Outline a one‑page landing for my idea.",
];

function useDurableHistory(key){
  const [value, setValue] = useState(()=>{
    if (typeof window === "undefined") return [];
    try{ const raw = localStorage.getItem(key); const v = raw ? JSON.parse(raw) : []; return Array.isArray(v) ? v : []; }catch{return [];}
  });
  useEffect(()=>{ try{ localStorage.setItem(key, JSON.stringify(value.slice(-60))); }catch{} },[key,value]);
  useEffect(()=>{
    const fn = (e)=>{ if (e.key===key && e.newValue) try{ setValue(JSON.parse(e.newValue)); }catch{} };
    window.addEventListener("storage", fn);
    return ()=> window.removeEventListener("storage", fn);
  },[key]);
  return [value,setValue];
}

export default function ClientChat(){
  const [messages,setMessages] = useDurableHistory("bolu_chat_history_v2");
  const [input,setInput] = useState("");
  const [busy,setBusy] = useState(false);
  const [mode,setMode] = useState("inquiry");
  const endRef = useRef(null);

  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "boluadeoye97@gmail.com";
  const greeting = useMemo(()=>`Hi, I’m Boluwatife’s personal assistant. How can I help today?`,[]);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[messages,busy]);

  async function fallbackComplete(history){
    const r = await fetch("/api/chat/complete", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ messages: history, mode })
    });
    const j = await r.json().catch(()=>({}));
    if (!r.ok || !j?.reply) throw new Error(j?.error || "Fallback failed");
    return j.reply;
  }

  async function streamAsk(prompt){
    if (busy) return;
    const userMsg = { role:"user", content: prompt.trim() };
    if (!userMsg.content) return;

    const history = messages.length ? [...messages, userMsg] : [{ role:"assistant", content: greeting }, userMsg];
    setMessages(history);
    setInput("");
    setBusy(true);

    // create empty assistant turn to fill
    setMessages(prev => [...prev, { role:"assistant", content: "" }]);

    let appended = false;
    try{
      const r = await fetch("/api/chat/stream", {
        method:"POST",
        headers:{ "Content-Type":"application/json", "Accept":"text/event-stream" },
        body: JSON.stringify({ messages: history, mode })
      });
      if (!r.ok || !r.body) throw new Error("stream request failed");

      const reader = r.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let gotAny = false;

      while (true){
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, {stream:true});
        const parts = buffer.split(/\n\n/);
        buffer = parts.pop() || "";
        for (const part of parts){
          const line = part.trim();
          if (!line.startsWith("data:")) continue;
          const json = line.slice(5).trim();
          if (!json) continue;
          try{
            const evt = JSON.parse(json);
            if (evt.error) throw new Error(evt.error);
            if (evt.delta){
              gotAny = true;
              appended = true;
              setMessages(prev => {
                const copy = prev.slice();
                const last = copy[copy.length-1];
                if (last?.role === "assistant") last.content += evt.delta;
                return copy;
              });
            }
          }catch(e){
            throw e;
          }
        }
      }

      // if stream produced nothing, fallback
      if (!gotAny) {
        const reply = await fallbackComplete(history);
        appended = true;
        setMessages(prev => {
          const copy = prev.slice();
          const last = copy[copy.length-1];
          if (last?.role === "assistant") last.content = reply;
          return copy;
        });
      }
    }catch(e){
      // fallback on any error
      try{
        const reply = await fallbackComplete(history);
        appended = true;
        setMessages(prev => {
          const copy = prev.slice();
          const last = copy[copy.length-1];
          if (last?.role === "assistant") last.content = reply;
          return copy;
        });
      }catch(e2){
        setMessages(prev => {
          const copy = prev.slice();
          const last = copy[copy.length-1];
          if (last?.role === "assistant") last.content = "Sorry, I ran into a network issue.";
          return copy;
        });
      }
    }finally{
      setBusy(false);
    }
  }

  const onSubmit = (e)=>{ e.preventDefault(); streamAsk(input); };

  return (
    <main className="min-h-dvh bg-slate-950 text-slate-200 p-4">
      <div className="max-w-3xl mx-auto">
        <section className="chat-card">
          <header className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold">Open Chat</h1>
              <p className="text-sm text-slate-400">I’m Boluwatife’s PA. Ask about work, tech, APIs, troubleshooting, or writing.</p>
            </div>
            <a href={`mailto:${email}`} className="icon-btn" title="Email"><Mail size={16} /></a>
          </header>

          {/* Modes */}
          <div className="mt-2 flex flex-wrap gap-2">
            {MODES.map(m => (
              <button key={m.key} onClick={()=>setMode(m.key)} className={`btn-xs ${mode===m.key ? 'btn-beam-gold' : 'btn-outline-lux'}`} type="button">
                {m.label}
              </button>
            ))}
          </div>

          {/* Suggestions if empty */}
          {messages.length === 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {SUGGESTS.map((s,i)=>(
                <button key={i} className="chip" onClick={()=>streamAsk(s)}>{s}</button>
              ))}
            </div>
          )}

          {/* Transcript */}
          <div className="mt-3 space-y-2">
            {messages.map((m, i)=>(
              <div key={i} className={m.role === "user" ? "bubble user" : "bubble ai"}>
                <div className="md-prose whitespace-pre-wrap">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {busy && <div className="bubble ai"><div className="chat-typing"><span></span><span></span><span></span></div></div>}
            <div ref={endRef} />
          </div>

          {/* Composer */}
          <form className="chat-input-row" onSubmit={onSubmit}>
            <textarea className="chat-input" rows={1} value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type your question…"/>
            <button disabled={busy || !input.trim()} className="btn-send" type="submit">Send</button>
          </form>
        </section>
      </div>
    </main>
  );
}
