"use client";
import { useState, useEffect } from "react";
import { 
  Download, BookOpen, Terminal, Cpu, Globe, 
  Database, Server, Bot, Youtube, Code2, 
  Lightbulb, ArrowRight, Layers, MonitorSmartphone
} from "lucide-react";

export default function SovereignDeveloperEbook() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1500);
  },[]);

  const handlePrint = () => {
    document.title = "THE_SOVEREIGN_DEVELOPER_TEXTBOOK";
    window.print();
  };

  // === PHASE 1 HIGH-FIDELITY CONTENT ===
  const manualPages =[
    { type: 'COVER', title: "The Sovereign Developer", subtitle: "A Blueprint for Modern Web Engineering & AI-Assisted Architecture" },
    { type: 'TOC', items:["The Mental Models", "The Web's Anatomy", "The Request-Response Cycle", "The AI Co-Pilot", "Prompt Engineering for Devs", "The War Room Setup", "Curated Watchlist: Phase 1", "The Skeleton & Skin (HTML/CSS)", "The Logic Engine (JS)", "The Modern Stack (Next.js)"] },
    { type: 'EDITORIAL', title: "01. Welcome to the War Room", content: "You are not here to learn how to 'code.' Coding is a commodity. You are here to learn System Construction. In 2026, AI can write the syntax, but only an Architect can design the system. This manual will transform you from a consumer of technology into a Sovereign Creator." },
    { type: 'CONTENT', title: "02. The Web's Anatomy", content: "Every digital system consists of three pillars:\n\n1. THE CLIENT (Frontend): What the user sees and touches. Built with HTML, CSS, and React.\n2. THE SERVER (Backend): The brain. It processes rules, authenticates users, and handles logic.\n3. THE DATABASE: The memory. Where data lives permanently (e.g., PostgreSQL).", proTip: "Never trust the Client. Users can manipulate the frontend. Always verify data on the Server." },
    { type: 'DIAGRAM_WEB', title: "03. The Request-Response Cycle" },
    { type: 'CONTENT', title: "04. The AI Co-Pilot", content: "Do not memorize syntax. Memorize concepts. Use AI (ChatGPT, Claude, or Cursor IDE) as your Senior Engineer.\n\nWhen you hit a bug, do not ask AI to 'fix it.' Ask AI: 'Explain why this error is happening and give me the conceptual solution.' This builds your architectural muscle while saving you hours of frustration.", codeSnippet: "// BAD PROMPT:\n// Fix this code: [paste code]\n\n// SOVEREIGN PROMPT:\n// I am getting a CORS error when my Next.js frontend calls my Node backend. Explain the security policy causing this and how to configure the headers." },
    { type: 'DIAGRAM_AI', title: "05. AI-Assisted Workflow" },
    { type: 'CONTENT', title: "06. The War Room Setup", content: "A professional needs professional tools. Your environment dictates your velocity.\n\n1. VS CODE: The industry standard editor.\n2. CURSOR IDE: An AI-first fork of VS Code. Highly recommended.\n3. TERMUX: For mobile deployment and Linux subsystem mastery.\n4. GIT: Your time machine. Commit your code often.", youtube: "Search YouTube: 'Git and GitHub for Beginners - Crash Course' by freeCodeCamp." },
    { type: 'RESOURCES', title: "07. Curated Watchlist (Phase 1)", links:[
      { title: "How the Internet Works in 5 Minutes", channel: "Aaron" },
      { title: "100+ Computer Science Concepts Explained", channel: "Fireship" },
      { title: "Cursor IDE Tutorial - AI Coding", channel: "Theo - t3.gg" }
    ]},
    { type: 'EDITORIAL', title: "08. Entering Phase 2", content: "With the mental models locked in, we move to the Skeleton and the Skin. HTML provides the structure. CSS provides the aesthetics. We will not waste time on legacy CSS; we will move directly to Tailwind CSS—the framework used by top-tier agencies to build at the speed of thought." }
  ];

  // === 60-PAGE GENERATOR LOGIC ===
  const totalPages = Array.from({ length: 60 }, (_, i) => {
    if (i < manualPages.length) return manualPages[i];
    // Generate beautiful placeholder worksheets for the remaining pages
    return { 
      type: 'WORKSHEET', 
      title: `Architectural Notes // Module ${Math.floor(i/5) + 1}`,
      pageNumber: i + 1
    };
  });

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@400;600;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; counter-reset: pageCounter; }
          body * { visibility: hidden; }
          #textbook-render, #textbook-render * { visibility: visible; }
          #textbook-render { position: absolute; left: 0; top: 0; width: 100%; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background: white;
            box-sizing: border-box;
          }
          .page-num::after {
            counter-increment: pageCounter;
            content: counter(pageCounter);
          }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* === VIEW 1: PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950"></div>
        <div className="relative z-10 text-center max-w-md w-full">
          <div className="w-40 h-56 bg-[#172554] mx-auto mb-8 shadow-2xl border-l-[8px] border-[#eab308] flex flex-col justify-center items-center transform rotate-y-[-15deg] rotate-x-[5deg]">
            <Code2 size={48} className="text-white mb-4" />
            <h3 className="text-white font-black text-sm uppercase tracking-widest text-center px-2">The Sovereign<br/>Developer</h3>
          </div>
          <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Textbook Engine</h1>
          <p className="text-[#eab308] font-mono text-xs mb-8 tracking-[0.2em]">60-PAGE CURRICULUM GENERATED</p>
          
          {!isReady ? (
            <div className="text-blue-400 font-mono text-xs animate-pulse">COMPILING SYLLABUS...</div>
          ) : (
            <button onClick={handlePrint} className="w-full bg-white text-[#172554] font-black py-4 rounded uppercase tracking-widest hover:bg-blue-50 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Download Textbook (PDF)
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE TEXTBOOK (Print) === */}
      <div id="textbook-render" className="hidden print:block bg-white text-[#172554]">
        {totalPages.map((page, i) => (
          <div key={i} className="a4-page flex flex-col">
            
            {/* HEADER */}
            {page.type !== 'COVER' && (
              <header className="h-[20mm] px-[20mm] flex items-end justify-between border-b-2 border-slate-100 pb-2">
                <span className="font-inter text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">The Sovereign Developer // Curriculum</span>
                <span className="page-num font-inter text-[10px] font-black text-[#172554]"></span>
              </header>
            )}

            <main className="grow px-[20mm] py-[15mm] flex flex-col relative">
              
              {/* 1. COVER */}
              {page.type === 'COVER' && (
                <div className="h-full bg-[#172554] text-white p-[15mm] -m-[20mm] flex flex-col justify-between border-[10mm] border-slate-900">
                  <div className="mt-24">
                    <Terminal size={64} className="text-[#eab308] mb-8" />
                    <p className="font-inter text-xs font-bold uppercase tracking-[0.5em] text-blue-300 mb-4">Official Textbook</p>
                    <h1 className="font-playfair text-7xl font-black uppercase leading-[0.9] tracking-tighter">{page.title}</h1>
                    <div className="h-2 w-32 bg-[#eab308] my-8"></div>
                    <p className="font-inter text-xl font-medium text-blue-100 max-w-sm leading-relaxed">{page.subtitle}</p>
                  </div>
                  <div className="border-t border-blue-800 pt-8 flex justify-between items-end">
                    <div>
                      <p className="font-inter text-[8px] uppercase text-blue-400 font-bold tracking-widest">Lead Instructor</p>
                      <p className="font-inter text-lg font-black uppercase tracking-widest">Boluwatife Adeoye</p>
                    </div>
                    <div className="text-right">
                      <p className="font-inter text-2xl font-black text-[#eab308]">2026</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. TOC */}
              {page.type === 'TOC' && (
                <div className="h-full flex flex-col justify-center">
                  <h2 className="font-playfair text-5xl font-black uppercase mb-12 text-[#172554]">Table of Contents</h2>
                  <div className="space-y-5">
                    {page.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-6 border-b border-slate-200 pb-3">
                        <span className="font-mono text-[#eab308] font-bold text-xl">{(idx + 1).toString().padStart(2, '0')}</span>
                        <span className="font-inter text-lg font-bold text-slate-800 uppercase tracking-wide">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. EDITORIAL (Big Text) */}
              {page.type === 'EDITORIAL' && (
                <div className="h-full flex flex-col justify-center max-w-prose mx-auto">
                  <h2 className="font-playfair text-4xl font-black uppercase mb-10 leading-tight text-[#172554]">{page.title}</h2>
                  <p className="font-inter text-xl text-slate-700 leading-[2] text-justify first-letter:text-7xl first-letter:font-playfair first-letter:font-black first-letter:text-[#dc2626] first-letter:mr-3 first-letter:float-left">
                    {page.content}
                  </p>
                </div>
              )}

              {/* 4. STANDARD CONTENT WITH PRO-TIPS & CODE */}
              {page.type === 'CONTENT' && (
                <div className="h-full flex flex-col">
                  <h2 className="font-inter text-3xl font-black uppercase mb-8 border-l-[8px] border-[#eab308] pl-4 text-[#172554]">{page.title}</h2>
                  <div className="font-inter text-sm leading-[2] text-slate-700 whitespace-pre-wrap mb-8">
                    {page.content}
                  </div>
                  
                  {page.proTip && (
                    <div className="mt-auto bg-blue-50 border-l-4 border-[#172554] p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={16} className="text-[#eab308]" />
                        <span className="font-inter text-[10px] font-black uppercase tracking-widest text-[#172554]">Architect's Pro-Tip</span>
                      </div>
                      <p className="font-inter text-sm font-bold text-slate-800">{page.proTip}</p>
                    </div>
                  )}

                  {page.codeSnippet && (
                    <div className="mt-auto bg-slate-900 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
                        <Terminal size={14} className="text-slate-400" />
                        <span className="font-mono text-[10px] text-slate-400 uppercase">Prompt_Engineering.ts</span>
                      </div>
                      <pre className="font-mono text-xs text-green-400 whitespace-pre-wrap leading-relaxed">
                        {page.codeSnippet}
                      </pre>
                    </div>
                  )}

                  {page.youtube && (
                    <div className="mt-auto border-2 border-red-100 bg-red-50 p-6 rounded-lg flex items-center gap-4">
                      <Youtube size={32} className="text-red-600" />
                      <div>
                        <p className="font-inter text-[10px] font-black uppercase text-red-600 tracking-widest mb-1">Video Assignment</p>
                        <p className="font-inter text-sm font-bold text-slate-800">{page.youtube}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 5. DIAGRAM: WEB ANATOMY */}
              {page.type === 'DIAGRAM_WEB' && (
                <div className="h-full flex flex-col justify-center">
                  <h2 className="font-inter text-3xl font-black uppercase mb-16 text-center">{page.title}</h2>
                  <div className="flex items-center justify-between w-full px-10">
                    <div className="flex flex-col items-center text-center w-32">
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 border-4 border-[#172554]">
                        <MonitorSmartphone size={32} className="text-[#172554]" />
                      </div>
                      <h3 className="font-black uppercase text-sm">1. Client</h3>
                      <p className="text-[9px] font-bold text-slate-500 mt-1">Browser / Phone</p>
                    </div>
                    
                    <div className="grow flex flex-col items-center px-4">
                      <p className="text-[8px] font-black uppercase tracking-widest mb-2 text-blue-600">HTTP Request &gt;</p>
                      <div className="w-full h-1 bg-slate-300 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                      <p className="text-[8px] font-black uppercase tracking-widest mt-2 text-green-600">&lt; JSON Response</p>
                    </div>

                    <div className="flex flex-col items-center text-center w-32">
                      <div className="w-20 h-20 bg-slate-900 rounded-xl flex items-center justify-center mb-4 border-4 border-[#eab308]">
                        <Server size={32} className="text-white" />
                      </div>
                      <h3 className="font-black uppercase text-sm">2. Server</h3>
                      <p className="text-[9px] font-bold text-slate-500 mt-1">Node.js / Next.js</p>
                    </div>

                    <div className="grow flex flex-col items-center px-4">
                      <div className="w-full h-1 bg-slate-300 border-t-4 border-dotted border-slate-400"></div>
                    </div>

                    <div className="flex flex-col items-center text-center w-32">
                      <div className="w-20 h-20 bg-green-100 rounded flex items-center justify-center mb-4 border-4 border-green-600">
                        <Database size={32} className="text-green-700" />
                      </div>
                      <h3 className="font-black uppercase text-sm">3. Database</h3>
                      <p className="text-[9px] font-bold text-slate-500 mt-1">PostgreSQL</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. DIAGRAM: AI WORKFLOW */}
              {page.type === 'DIAGRAM_AI' && (
                <div className="h-full flex flex-col justify-center items-center">
                  <h2 className="font-inter text-3xl font-black uppercase mb-16">{page.title}</h2>
                  <div className="w-full max-w-md border-4 border-[#172554] p-8 rounded-2xl bg-slate-50 relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#eab308] text-[#172554] px-4 py-1 font-black uppercase text-xs tracking-widest">The Modern Loop</div>
                    
                    <div className="flex justify-between items-center mb-8">
                      <div className="text-center">
                        <Terminal size={40} className="mx-auto mb-2 text-slate-700" />
                        <p className="font-bold text-xs uppercase">Developer</p>
                      </div>
                      <ArrowRight size={24} className="text-slate-300" />
                      <div className="text-center">
                        <Bot size={40} className="mx-auto mb-2 text-blue-600" />
                        <p className="font-bold text-xs uppercase text-blue-600">AI Co-Pilot</p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-900 text-green-400 p-4 rounded font-mono text-xs text-center">
                      &gt; Generates Boilerplate<br/>
                      &gt; Explains Errors<br/>
                      &gt; Suggests Architecture
                    </div>
                  </div>
                </div>
              )}

              {/* 7. RESOURCES LIST */}
              {page.type === 'RESOURCES' && (
                <div className="h-full flex flex-col">
                  <h2 className="font-inter text-3xl font-black uppercase mb-8 border-l-[8px] border-red-600 pl-4 text-[#172554]">{page.title}</h2>
                  <div className="space-y-4">
                    {page.links.map((link, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 border-2 border-slate-100 rounded-lg">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                          <Youtube size={20} className="text-red-600" />
                        </div>
                        <div>
                          <p className="font-inter font-bold text-slate-900">{link.title}</p>
                          <p className="font-inter text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">Channel: {link.channel}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. WORKSHEET (Auto-generated filler for 60 pages) */}
              {page.type === 'WORKSHEET' && (
                <div className="h-full flex flex-col">
                  <h2 className="font-inter text-xl font-black uppercase mb-8 text-slate-300 tracking-widest">{page.title}</h2>
                  <div className="grow border-4 border-dashed border-slate-200 rounded-xl p-8">
                    <p className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-8">System Design Notes / Sketches</p>
                    {/* Grid lines for drawing */}
                    <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  </div>
                </div>
              )}

            </main>
          </div>
        ))}
      </div>
    </div>
  );
}
