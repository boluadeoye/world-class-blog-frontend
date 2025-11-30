'use client';
import { useEffect, useRef, useState } from "react";

const SUGGESTS = [
  "What do you build these days?",
  "Show me recent projects.",
  "How do you approach performance on mobile?",
  "Point me to your best article for beginners.",
];

function useLocalHistory(key){
  const [value,setValue]=useState([]);
  useEffect(()=>{ try{ const v=JSON.parse(localStorage.getItem(key)||"[]"); if(Array.isArray(v)) setValue(v); }catch{} },[key]);
  useEffect(()=>{ try{ localStorage.setItem(key, JSON.stringify(value.slice(-40))); }catch{} },[key,value]);
  return [value,setValue];
}

export default function ClientChat(){
  const [messages,setMessages]=useLocalHistory("bolu_chat_history");
  const [input,setInput]=useState("");
  const [busy,setBusy]=useState(false);
  const endRef=useRef(null);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[messages,busy]);

  async function ask(prompt){
    if(busy) return;
    const userMsg = { role:"user", content: prompt.trim() };
    if(!userMsg.content) return;
    const history = [...messages, userMsg];
    setMessages(history);
    setInput(""); setBusy(true);
    try{
      const r = await fetch("/api/chat", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ messages: history }) });
      const data = await r.json();
      const ai = data?.reply || "Sorry, I couldn't answer that.";
      setMessages(prev => [...prev, { role:"assistant", content: ai }]);
    }catch(e){
      setMessages(prev => [...prev, { role:"assistant", content: "Network error. Please try again." }]);
    }finally{
      setBusy(false);
    }
  }

  return (
    <main className="min-h-dvh bg-slate-950 text-slate-200 p-4">
      <div className="max-w-3xl mx-auto">
        <section className="chat-card">
          <header className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold">Open Chat</h1>
              <p className="text-sm text-slate-400">Ask about my work, projects, posts — I’ll keep it concise.</p>
            </div>
          </header>

          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {SUGGESTS.map((s,i)=>(
                <button key={i} className="chip" onClick={()=>ask(s)}>{s}</button>
              ))}
            </div>
          )}

          <div className="mt-4 space-y-3">
            {messages.map((m, i)=>(
              <div key={i} className={m.role === "user" ? "bubble user" : "bubble ai"}>
                <div className="prose-sm whitespace-pre-wrap">{m.content}</div>
              </div>
            ))}
            {busy && (
              <div className="bubble ai">
                <div className="chat-typing"><span></span><span></span><span></span></div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form className="mt-4 flex items-end gap-2" onSubmit={e=>{ e.preventDefault(); ask(input); }}>
            <textarea
              className="chat-input"
              rows={1}
              value={input}
              onChange={e=>setInput(e.target.value)}
              placeholder="Type your question…"
            />
            <button disabled={busy || !input.trim()} className="btn-send" type="submit">
              Send
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
