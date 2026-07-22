"use client";
import { useState, useEffect } from "react";
import { Download, BookOpen, Brain, ShieldCheck, MessageSquare, Network, FileText, Target } from "lucide-react";

export default function DefenseGuide() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1200);
  }, []);

  const handlePrint = () => {
    document.title = "Adeoye_Boluwatife_Defense_Dossier";
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-amber-200">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;0,900;1,600&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #FFFFFF !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; counter-reset: pageCounter; }
          body * { visibility: hidden; }
          #dossier-render, #dossier-render * { visibility: visible; }
          #dossier-render { position: absolute; left: 0; top: 0; width: 210mm; background: #FFFFFF; }
          .a4-page { height: 297mm; width: 210mm; page-break-after: always; position: relative; background-color: #FFFFFF; box-sizing: border-box; overflow: hidden; display: flex; flex-direction: column; padding: 20mm; }
          .page-num::after { counter-increment: pageCounter; content: counter(pageCounter); }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* === VIEW 1: THE PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl rounded-none border-t-8 border-[#0F172A]">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center p-3 border border-slate-200">
            <BookOpen size={32} className="text-[#0F172A]" />
          </div>
          <h1 className="font-playfair text-2xl font-black text-[#0F172A] mb-2 uppercase tracking-widest">Defense Dossier</h1>
          <p className="font-inter text-[#D4AF37] text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">Adeoye Boluwatife</p>
          {!isReady ? (
            <div className="text-slate-500 font-mono text-xs animate-pulse">COMPILING ACADEMIC ARSENAL...</div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-[#0F172A] hover:bg-slate-800 text-white font-inter font-bold py-4 uppercase tracking-widest transition-all shadow-xl">
              <Download size={18} /> Extract Defense Guide
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE DOSSIER (Print Only) === */}
      <div id="dossier-render" className="hidden print:block">
        
        {/* ================= PAGE 1: COVER ================= */}
        <div className="a4-page">
          <div className="absolute top-0 left-0 w-full h-4 flex">
            <div className="bg-[#0F172A] w-1/2"></div><div className="bg-[#D4AF37] w-1/4"></div><div className="bg-slate-300 w-1/4"></div>
          </div>
          
          <main className="grow flex flex-col justify-center items-center text-center relative z-10">
            <div className="w-32 h-32 border-4 border-[#0F172A] rounded-full flex items-center justify-center mb-8 relative">
              <div className="absolute inset-2 border border-[#D4AF37] rounded-full"></div>
              <Target size={48} className="text-[#0F172A]" />
            </div>
            
            <p className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.4em] mb-4">Federal University Oye-Ekiti</p>
            <h1 className="font-playfair text-5xl font-black text-[#0F172A] uppercase tracking-tighter leading-[1.1] mb-6">
              The Ultimate<br/>Defense Blueprint
            </h1>
            <div className="h-1 w-24 bg-[#0F172A] mb-8"></div>
            <p className="font-inter text-sm font-bold text-slate-600 uppercase tracking-widest max-w-md leading-relaxed">
              The Roles of Nigerian Pidgin in Shaping Social Media Discourse
            </p>
          </main>

          <footer className="mt-auto border-t-2 border-slate-200 pt-6 flex justify-between items-end">
            <div>
              <p className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-1">Candidate</p>
              <p className="font-inter text-lg font-black text-[#0F172A] uppercase tracking-widest">Adeoye Boluwatife</p>
              <p className="font-inter text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mt-1">ELS/2021/1029</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-1">Panel / Supervisor</p>
              <p className="font-inter text-sm font-black text-[#0F172A] uppercase tracking-widest">Dr. Okunade</p>
            </div>
          </footer>
        </div>

        {/* ================= PAGE 2: CH 1 & 2 (THEORIES) ================= */}
        <div className="a4-page">
          <Header title="CHAPTER 1 & 2 // FOUNDATIONS & THEORIES" />
          <main className="grow flex flex-col gap-8">
            
            {/* Concept 1 */}
            <section>
              <h2 className="font-inter text-xl font-black text-[#0F172A] uppercase tracking-widest mb-4 border-b-2 border-slate-100 pb-2">1. Graphisation (Digital Pidgin)</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 p-5 border-l-4 border-[#D4AF37]">
                  <div className="flex items-center gap-2 mb-3"><Brain size={16} className="text-[#D4AF37]"/><span className="font-mono text-[10px] font-bold uppercase tracking-widest">Mental Anchor</span></div>
                  <p className="font-inter text-xs leading-relaxed text-slate-700">Imagine typing "wetin" instead of "what". Or typing "oooo" to show shock. You type exactly how you speak. You mix numbers like "404" for dog meat. This is graphisation.</p>
                </div>
                <div className="bg-[#0F172A] p-5 border-l-4 border-blue-500 text-white">
                  <div className="flex items-center gap-2 mb-3"><ShieldCheck size={16} className="text-blue-400"/><span className="font-mono text-[10px] font-bold uppercase tracking-widest text-blue-400">Defense Script</span></div>
                  <p className="font-inter text-xs leading-relaxed text-slate-300">"A core feature of digital Nigerian Pidgin is 'Graphisation.' This involves deliberate orthographic subversion. Users employ phonetic spelling and alphanumeric abbreviations to bypass character limits while maintaining cultural authenticity."</p>
                </div>
              </div>
            </section>

            {/* Concept 2 */}
            <section>
              <h2 className="font-inter text-xl font-black text-[#0F172A] uppercase tracking-widest mb-4 border-b-2 border-slate-100 pb-2">2. Speech Act Theory (Austin & Searle)</h2>
              
              {/* CSS Diagram: Speech Act Triangle */}
              <div className="flex justify-center items-center gap-8 mb-6 p-4 bg-slate-50 border border-slate-200 rounded">
                <div className="text-center"><div className="w-12 h-12 bg-[#0F172A] text-white rounded-full flex items-center justify-center font-bold text-xs mx-auto mb-2">A</div><p className="font-mono text-[8px] font-bold uppercase">Assertive<br/>(Facts)</p></div>
                <div className="h-px w-12 bg-slate-300"></div>
                <div className="text-center"><div className="w-12 h-12 bg-[#D4AF37] text-white rounded-full flex items-center justify-center font-bold text-xs mx-auto mb-2">D</div><p className="font-mono text-[8px] font-bold uppercase">Directive<br/>(Commands)</p></div>
                <div className="h-px w-12 bg-slate-300"></div>
                <div className="text-center"><div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xs mx-auto mb-2">E</div><p className="font-mono text-[8px] font-bold uppercase">Expressive<br/>(Emotions)</p></div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 p-5 border-l-4 border-[#D4AF37]">
                  <div className="flex items-center gap-2 mb-3"><Brain size={16} className="text-[#D4AF37]"/><span className="font-mono text-[10px] font-bold uppercase tracking-widest">Mental Anchor</span></div>
                  <p className="font-inter text-xs leading-relaxed text-slate-700">Words are actions. Assertive is stating hard facts. Directive is giving commands. Expressive is showing deep feelings like anger or joy.</p>
                </div>
                <div className="bg-[#0F172A] p-5 border-l-4 border-blue-500 text-white">
                  <div className="flex items-center gap-2 mb-3"><ShieldCheck size={16} className="text-blue-400"/><span className="font-mono text-[10px] font-bold uppercase tracking-widest text-blue-400">Defense Script</span></div>
                  <p className="font-inter text-xs leading-relaxed text-slate-300">"To interpret user intentions, I applied Austin and Searle’s Speech Act Theory. I analysed how users deploy Assertive acts to commit to sociopolitical truths, and Expressive acts to project psychological states like dark humour."</p>
                </div>
              </div>
            </section>

          </main>
          <Footer />
        </div>

        {/* ================= PAGE 3: CH 2 & 4 (GUMPERZ & FINDINGS) ================= */}
        <div className="a4-page">
          <Header title="CHAPTER 2 & 4 // GUMPERZ & DATA ANALYSIS" />
          <main className="grow flex flex-col gap-8">
            
            {/* Concept 3 */}
            <section>
              <h2 className="font-inter text-xl font-black text-[#0F172A] uppercase tracking-widest mb-4 border-b-2 border-slate-100 pb-2">3. Interactional Sociolinguistics (Gumperz)</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 p-5 border-l-4 border-[#D4AF37]">
                  <div className="flex items-center gap-2 mb-3"><Brain size={16} className="text-[#D4AF37]"/><span className="font-mono text-[10px] font-bold uppercase tracking-widest">Mental Anchor</span></div>
                  <p className="font-inter text-xs leading-relaxed text-slate-700">Think of saying "Omo!" online. It is a contextualisation cue. You infer the meaning through shared Nigerian culture. Outsiders will not understand the joke.</p>
                </div>
                <div className="bg-[#0F172A] p-5 border-l-4 border-blue-500 text-white">
                  <div className="flex items-center gap-2 mb-3"><ShieldCheck size={16} className="text-blue-400"/><span className="font-mono text-[10px] font-bold uppercase tracking-widest text-blue-400">Defense Script</span></div>
                  <p className="font-inter text-xs leading-relaxed text-slate-300">"I adopted Gumperz’s Interactional Sociolinguistics to decode implicit meanings. I focused on 'Contextualisation Cues'—highly localised slang—which require 'Conversational Inference' based on shared Nigerian sociocultural knowledge."</p>
                </div>
              </div>
            </section>

            {/* Concept 4 */}
            <section>
              <h2 className="font-inter text-xl font-black text-[#0F172A] uppercase tracking-widest mb-4 border-b-2 border-slate-100 pb-2">4. The Core Discovery (Politics vs. Entertainment)</h2>
              
              {/* CSS Diagram: The Split */}
              <div className="flex justify-between items-center gap-4 mb-6">
                <div className="w-1/2 p-4 border-2 border-red-800 bg-red-50 rounded text-center">
                  <p className="font-inter font-black text-red-800 uppercase text-sm mb-1">Political Discourse</p>
                  <p className="font-mono text-[9px] font-bold text-red-600">ASSERTIVE ACTS</p>
                  <p className="font-inter text-[10px] text-slate-600 mt-2">Upward resistance. Demanding accountability from elites.</p>
                </div>
                <div className="w-1/2 p-4 border-2 border-blue-800 bg-blue-50 rounded text-center">
                  <p className="font-inter font-black text-blue-800 uppercase text-sm mb-1">Entertainment Discourse</p>
                  <p className="font-mono text-[9px] font-bold text-blue-600">EXPRESSIVE ACTS</p>
                  <p className="font-inter text-[10px] text-slate-600 mt-2">Lateral banter. Enforcing boundaries and mocking rivals.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 p-5 border-l-4 border-[#D4AF37]">
                  <div className="flex items-center gap-2 mb-3"><Brain size={16} className="text-[#D4AF37]"/><span className="font-mono text-[10px] font-bold uppercase tracking-widest">Mental Anchor</span></div>
                  <p className="font-inter text-xs leading-relaxed text-slate-700">Politics uses Pidgin to fight the government. Entertainment uses Pidgin to mock rival fans. One fights up. The other fights sideways.</p>
                </div>
                <div className="bg-[#0F172A] p-5 border-l-4 border-blue-500 text-white">
                  <div className="flex items-center gap-2 mb-3"><ShieldCheck size={16} className="text-blue-400"/><span className="font-mono text-[10px] font-bold uppercase tracking-widest text-blue-400">Defense Script</span></div>
                  <p className="font-inter text-xs leading-relaxed text-slate-300">"The contextual variation is stark. In politics, Nigerian Pidgin is an upward-facing weapon of resistance. In entertainment, it is a lateral tool used to enforce social boundaries and engineer communal laughter."</p>
                </div>
              </div>
            </section>

          </main>
          <Footer />
        </div>

        {/* ================= PAGE 4: THE PREP SHEET (Q&A) ================= */}
        <div className="a4-page">
          <Header title="THE PREP SHEET // PROBABLE QUESTIONS & ANSWERS" />
          <main className="grow flex flex-col gap-6">
            
            <div className="bg-slate-50 border border-slate-200 p-5 rounded">
              <p className="font-inter text-sm font-black text-[#0F172A] mb-2">Q1: Why did you choose X and Facebook instead of Instagram or TikTok?</p>
              <div className="flex gap-3 items-start">
                <MessageSquare size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="font-lora text-xs leading-relaxed text-slate-700 font-bold italic">"Dr. Okunade, I purposively selected X and Facebook because their technical architecture is fundamentally text-driven. While Instagram relies on visual modes, X and Facebook generate massive corpora of written comment threads. This allowed me to conduct a fine-grained analysis of graphisation and text-based speech acts."</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded">
              <p className="font-inter text-sm font-black text-[#0F172A] mb-2">Q2: You mentioned 'Graphisation'. Can you give a practical example?</p>
              <div className="flex gap-3 items-start">
                <MessageSquare size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="font-lora text-xs leading-relaxed text-slate-700 font-bold italic">"Certainly. Graphisation is the deliberate orthographic subversion of standard English. In my data, institutional handles like BBC Pidgin spell 'the' as 'di' and 'government' as 'goment'. This is not a typographical error; it is a strategic linguistic choice to align with grassroots Nigerian identity."</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded">
              <p className="font-inter text-sm font-black text-[#0F172A] mb-2">Q3: How exactly did you apply Gumperz's Interactional Sociolinguistics?</p>
              <div className="flex gap-3 items-start">
                <MessageSquare size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="font-lora text-xs leading-relaxed text-slate-700 font-bold italic">"I used Gumperz’s concept of 'Contextualisation Cues.' For example, in Plate 4.10, a user refers to dog meat as '404'. To an outsider, 404 is a web error. But through 'Conversational Inference,' a Nigerian decodes it as a fast-moving animal. Gumperz’s theory allowed me to explain how users rely on shared cultural knowledge to decode hidden meanings."</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded">
              <p className="font-inter text-sm font-black text-[#0F172A] mb-2">Q4: What is the core contribution of your research to the Department?</p>
              <div className="flex gap-3 items-start">
                <MessageSquare size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="font-lora text-xs leading-relaxed text-slate-700 font-bold italic">"My research expands the paradigm of computer-mediated discourse. It proves that Nigerian Pidgin is no longer just a spoken lingua franca; it has evolved into a highly structured, written digital code used for sophisticated stance-taking and sociopolitical resistance."</p>
              </div>
            </div>

          </main>
          <Footer />
        </div>

      </div>
    </div>
  );
}

// Reusable Components
function Header({ title }) {
  return (
    <header className="border-b-2 border-slate-200 pb-4 mb-8 flex justify-between items-end relative z-10">
      <h2 className="font-mono text-[10px] font-bold text-[#0F172A] tracking-widest">{title}</h2>
      <FileText className="text-[#D4AF37]" size={16} />
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t-2 border-slate-200 pt-4 mt-auto flex justify-between items-center relative z-10">
      <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-400">
        CONFIDENTIAL // DEFENSE DOSSIER // PAGE <span className="page-num text-[#0F172A]"></span>
      </span>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-[#0F172A]"></div>
        <div className="w-1.5 h-1.5 bg-[#D4AF37]"></div>
      </div>
    </footer>
  );
}
