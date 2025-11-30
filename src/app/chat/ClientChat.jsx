'use client';
import { useEffect, useRef, useState, useMemo } from "react";

const SUGGESTS = [
  "What does Boluwatife build?",
  "Can you show recent projects?",
  "How do we start a website project?",
  "What’s your approach to performance on mobile?",
];

function useLocalHistory(key){
  const [value,setValue]=useState([]);
  useEffect(()=>{ try{ const v=JSON.parse(localStorage.getItem(key)||"[]"); if(Array.isArray(v)) setValue(v); }catch{} },[key]);
  useEffect(()=>{ try{ localStorage.setItem(key, JSON.stringify(value.slice(-60))); }catch{} },[key,value]);
  return [value,setValue];
}

function transcript(messages){
  return messages.map(m => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`).join('\n\n');
}

export default function ClientChat(){
  const [messages,setMessages]=useLocalHistory("bolu_chat_history");
  const [input,setInput]=useState("");
  const [busy,setBusy]=useState(false);
  const endRef=useRef(null);

  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://boluadeoye.com.ng").replace(/\/+$/,'');
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "boluadeoye97@gmail.com";
  const avatar = process.env.NEXT_PUBLIC_PORTRAIT_URL || "/adeoye.jpg";

  const greeting = useMemo(() =>
    `Hi, I'm Boluwatife's personal assistant. How may we help you today?`,
  []);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[messages,busy]);

  // Seed a friendly greeting the first time
  useEffect(()=>{
    if (messages.length === 0) {
      setMessages([{ role:"assistant", content: greeting }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

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

  function sendToEmail(){
    const subject = encodeURIComponent("Open Chat — inquiry from boluadeoye.com.ng");
    const body = encodeURIComponent(
`Summary / request:

(Replace with a short brief here — goals, scope, timeline, budget.)

Conversation transcript:
${transcript(messages)}

— sent from ${site}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <main className="min-h-dvh bg-slate-950 text-slate-200 p-4">
      <div className="max-w-3xl mx-auto">
        <section className="chat-card">
          <header className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src={avatar} alt="Assistant avatar" className="ai-avatar" />
              <div>
                <h1 className="text-xl font-bold">Open Chat</h1>
                <p className="text-sm text-slate-400">I’m Boluwatife’s personal assistant. Ask about his work, projects, or how to start.</p>
              </div>
            </div>
            <button onClick={sendToEmail} className="btn-send-email" type="button" title="Send summary to email">
              Send to Email
            </button>
          </header>

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {SUGGESTS.map((s,i)=>(
                <button key={i} className="chip" onClick={()=>ask(s)}>{s}</button>
              ))}
            </div>
          )}

          <div className="mt-4 space-y-3">
            {messages.map((m, i)=>(
              m.role === "assistant" ? (
                <div key={i} className="flex items-start gap-2">
                  <img src={avatar} alt="" className="ai-avatar shrink-0" />
                  <div className="bubble ai">
                    <div className="prose-sm whitespace-pre-wrap">{m.content}</div>
                  </div>
                </div>
              ) : (
                <div key={i} className="bubble user">
                  <div className="prose-sm whitespace-pre-wrap">{m.content}</div>
                </div>
              )
            ))}
            {busy && (
              <div className="flex items-start gap-2">
                <img src={avatar} alt="" className="ai-avatar shrink-0" />
                <div className="bubble ai">
                  <div className="chat-typing"><span></span><span></span><span></span></div>
                </div>
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
