'use client';
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Mail, Trash2, ChevronDown } from "lucide-react";

const PROMPTS = [
  "What do you build?",
  "Show your recent projects.",
  "How do we start a website project?",
  "What’s your mobile performance approach?",
  "Where can I read your best articles?",
];

function useDurableHistory(key){
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return [];
    try { const raw = localStorage.getItem(key); const v = raw ? JSON.parse(raw) : []; return Array.isArray(v) ? v : []; }
    catch { return []; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }, [key, value]);
  useEffect(() => {
    const onStorage = (e) => { if (e.key === key && e.newValue) { try { setValue(JSON.parse(e.newValue)); } catch {} } };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);
  return [value, setValue];
}
const transcript = (messages) => messages.map(m => `${m.role === 'user' ? 'Visitor' : 'Me'}: ${m.content}`).join('\n\n');

export default function ClientChat(){
  const [messages, setMessages] = useDurableHistory("bolu_chat_history_v2");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [openIdx, setOpenIdx] = useState(-1);
  const endRef = useRef(null);

  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://boluadeoye.com.ng").replace(/\/+$/,'');
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "boluadeoye97@gmail.com";
  const who = (process.env.NEXT_PUBLIC_DISPLAY_NAME || process.env.NEXT_PUBLIC_OWNER_NAME || "Boluwatife");

  const avatar = useMemo(() => {
    const seed = encodeURIComponent(who + "-pa");
    return `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${seed}&size=64&radius=50&backgroundType=gradientLinear`;
  }, [who]);

  const greeting = `Hi, I'm ${who}. How may I help you today?`;

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, busy]);

  async function ask(prompt){
    if (busy) return;
    const userMsg = { role:"user", content: prompt.trim() };
    if (!userMsg.content) return;
    const history = messages.length ? [...messages, userMsg] : [{ role:"assistant", content: greeting }, userMsg];
    setMessages(history);
    setInput(""); setBusy(true);
    try{
      const r = await fetch("/api/chat", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ messages: history }) });
      const data = await r.json();
      const ai = data?.reply || "Sorry, I couldn't answer that.";
      setMessages(prev => [...prev, { role:"assistant", content: ai }]);
    }catch{
      setMessages(prev => [...prev, { role:"assistant", content: "Network error. Please try again." }]);
    }finally{ setBusy(false); }
  }

  function sendToEmail(){
    const subject = encodeURIComponent("Open Chat — inquiry from boluadeoye.com.ng");
    const body = encodeURIComponent(
`Summary / request:

(Replace with your brief — goals, scope, timeline, budget.)

Conversation transcript:
${transcript(messages)}

— sent from ${site}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }
  function clearSession(){ try{ localStorage.removeItem("bolu_chat_history_v2"); }catch{} setMessages([]); }

  function onPromptClick(i, p, e){
    e.preventDefault();
    setOpenIdx(prev => (prev === i ? -1 : i));
    setTimeout(() => { setOpenIdx(-1); ask(p); }, 140);
  }

  return (
    <main className="min-h-dvh bg-slate-950 text-slate-200 p-4">
      <div className="max-w-3xl mx-auto">
        <section className="studio-min-card p-4 sm:p-6 space-y-6">
          <header className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <img src={avatar} alt="Avatar" className="ai-avatar" />
              <div>
                <h1 className="text-xl font-extrabold leading-tight">Open Chat</h1>
                <p className="text-sm text-slate-400 mt-1">I’m {who}. Ask me about my work, projects, or how to start.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button onClick={sendToEmail} className="icon-btn" type="button" aria-label="Send to Email" title="Send to Email"><Mail size={16}/></button>
              <button onClick={clearSession} className="icon-btn ghost" type="button" aria-label="Clear conversation" title="Clear conversation"><Trash2 size={16}/></button>
            </div>
          </header>

          {messages.length === 0 && (
            <>
              <div className="bubble ai standalone">
                <ReactMarkdown className="md-prose" remarkPlugins={[remarkGfm]}>{greeting}</ReactMarkdown>
              </div>
              <div className="qp-acc">
                {PROMPTS.map((p,i)=>(
                  <details key={i} open={openIdx===i} onToggle={(e)=>e.preventDefault()}>
                    <summary onClick={(e)=>onPromptClick(i,p,e)}>
                      <span>{p}</span>
                      <ChevronDown className="chev" size={16}/>
                    </summary>
                  </details>
                ))}
              </div>
            </>
          )}

          <div className="flow space-y-4">
            {messages.map((m, i)=>(
              m.role === "assistant" ? (
                <div key={i} className="flex items-start gap-3">
                  <img src={avatar} alt="" className="ai-avatar shrink-0" />
                  <div className="bubble ai">
                    <ReactMarkdown className="md-prose" remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div key={i} className="bubble user"><div className="md-prose">{m.content}</div></div>
              )
            ))}
            {busy && (
              <div className="flex items-start gap-3">
                <img src={avatar} alt="" className="ai-avatar shrink-0" />
                <div className="bubble ai"><div className="chat-typing"><span></span><span></span><span></span></div></div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form className="chat-input-row" onSubmit={e=>{ e.preventDefault(); ask(input); }}>
            <textarea className="chat-input" rows={1} value={input} onChange={e=>setInput(e.target.value)} placeholder="Type your question…"/>
            <button disabled={busy || !input.trim()} className="btn-send" type="submit">Send</button>
          </form>
        </section>
      </div>
    </main>
  );
}
