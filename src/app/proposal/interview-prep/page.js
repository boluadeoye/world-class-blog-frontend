"use client";
import { Download, ArrowLeft, Brain, Database, Zap, Server, Layers, MessageSquare, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function InterviewPrep() {
  
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Senior_Architect_Interview_Masterclass";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900">
      
      {/* === GLOBAL PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; -webkit-print-color-adjust: exact; }
          body * { visibility: hidden; }
          #print-container, #print-container * { visibility: visible; }
          #print-container {
            position: absolute;
            left: 0; top: 0; width: 100%;
            margin: 0; padding: 0;
            background: white;
          }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; display: block; height: 0; }
          .avoid-break { break-inside: avoid; }
        }
      `}</style>

      {/* === VIEW 1: DOWNLOAD PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-900/20">
            <Brain size={32} className="text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Operation: Neural Link</h1>
          <p className="text-slate-400 text-sm mb-8">Senior Architect Crash Course</p>

          <button 
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-200 text-slate-950 font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl"
          >
            <Download size={20} />
            <span>Download Study Guide</span>
          </button>

          <Link href="/" className="block mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← Return to Dashboard
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block">
        
        {/* ================= PAGE 1: RAG & VECTORS ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          {/* Header */}
          <div className="border-b-4 border-emerald-600 pb-6 mb-10 flex justify-between items-end">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Interview Prep Module 1</p>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none text-slate-900">
                The AI<br/><span className="text-emerald-600">Engine</span>
              </h1>
            </div>
            <div className="text-right">
              <div className="bg-slate-900 text-white px-4 py-1 font-bold text-xs uppercase inline-block mb-1">Core Concept</div>
              <p className="text-xs font-mono font-bold">RAG & VECTORS</p>
            </div>
          </div>

          {/* 1. What is RAG? */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-emerald-600 pl-4 mb-6 text-slate-900">1. What is RAG? (Retrieval-Augmented Generation)</h2>
            <p className="text-sm font-medium text-slate-700 mb-4">
              <strong>The Problem:</strong> Standard AI (like ChatGPT) is like a smart student who hasn't read the textbook. It hallucinates (makes things up).<br/>
              <strong>The Solution (RAG):</strong> We give the AI the textbook *before* it answers.
            </p>

            {/* DIAGRAM: RAG FLOW */}
            <div className="border-2 border-slate-900 p-4 bg-slate-50 rounded-xl">
              <p className="text-xs font-black uppercase mb-4 text-center">The RAG Pipeline Diagram</p>
              <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase text-center">
                <div className="w-20 p-2 border-2 border-slate-400 bg-white rounded">User Question</div>
                <div className="text-slate-400">→</div>
                <div className="w-24 p-2 border-2 border-emerald-600 bg-emerald-50 rounded text-emerald-800">
                  Database<br/>(The Library)
                </div>
                <div className="text-slate-400">→</div>
                <div className="w-24 p-2 border-2 border-blue-600 bg-blue-50 rounded text-blue-800">
                  Context<br/>(Relevant Pages)
                </div>
                <div className="text-slate-400">→</div>
                <div className="w-20 p-2 border-2 border-slate-900 bg-slate-900 text-white rounded">
                  AI Model<br/>(The Brain)
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-4 text-center italic">
                "We fetch the relevant data first, then feed it to the AI to generate the answer."
              </p>
            </div>
          </section>

          {/* 2. What are Vector Embeddings? */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-emerald-600 pl-4 mb-6 text-slate-900">2. Vector Embeddings (The "Map")</h2>
            <p className="text-sm font-medium text-slate-700 mb-4">
              Computers don't understand words; they understand numbers. <strong>Embeddings</strong> turn text into a list of numbers (coordinates).
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 border-2 border-slate-200 rounded-lg">
                <h4 className="font-black text-sm uppercase mb-2">The Analogy</h4>
                <p className="text-xs text-slate-600">
                  Imagine a grocery store. "Apple" and "Banana" are close together (Fruits). "Dog" is far away (Pets). <br/><br/>
                  <strong>Vector DBs</strong> measure the "distance" between words to find meaning.
                </p>
              </div>
              <div className="p-4 border-2 border-slate-200 rounded-lg bg-slate-900 text-white">
                <h4 className="font-black text-sm uppercase mb-2">The Tech Speak</h4>
                <p className="text-xs text-slate-300">
                  "I use <strong>Cosine Similarity</strong> to find the nearest semantic neighbors in a <strong>High-Dimensional Vector Space</strong>."
                </p>
              </div>
            </div>
          </section>

          <div className="text-right text-xs font-black text-slate-400">Page 1/3</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 2: GROQ & NEXT.JS ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          {/* 3. Groq LPU (The Speed) */}
          <section className="mb-12">
            <h2 className="text-xl font-black uppercase border-l-8 border-emerald-600 pl-4 mb-6 text-slate-900">3. Why Groq LPU? (Latency)</h2>
            
            <div className="flex gap-6 mb-6">
              <div className="flex-1 p-4 border-l-4 border-red-500 bg-red-50">
                <h4 className="font-bold text-sm text-red-700 mb-1">Nvidia GPU (The Old Way)</h4>
                <p className="text-xs text-slate-700">Like a bus. It waits for the bus to fill up (batching) before moving. Good for graphics, slow for text.</p>
              </div>
              <div className="flex-1 p-4 border-l-4 border-emerald-500 bg-emerald-50">
                <h4 className="font-bold text-sm text-emerald-700 mb-1">Groq LPU (The New Way)</h4>
                <p className="text-xs text-slate-700">Like a conveyor belt. It processes text token-by-token instantly. No waiting.</p>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-lg">
              <p className="text-xs font-mono">
                <span className="text-emerald-400">INTERVIEW ANSWER:</span> "I choose Groq because standard GPUs introduce latency due to memory bandwidth bottlenecks. Groq's LPU architecture is deterministic and optimized for sequential data, giving me sub-200ms inference."
              </p>
            </div>
          </section>

          {/* 4. Next.js 15 & Server Actions */}
          <section className="mb-12">
            <h2 className="text-xl font-black uppercase border-l-8 border-emerald-600 pl-4 mb-6 text-slate-900">4. Next.js 15 (The Framework)</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-sm uppercase">App Router</h4>
                  <p className="text-xs text-slate-700">We organize code by "Routes" (URL paths). It supports <strong>React Server Components (RSC)</strong> by default.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-sm uppercase">Server Actions</h4>
                  <p className="text-xs text-slate-700">Instead of building a separate API (Express/Python), we write functions that run on the server directly inside our React components. It reduces latency and code complexity.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="text-right text-xs font-black text-slate-400">Page 2/3</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 3: THE CHEAT SHEET ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          {/* 5. The Interview Cheat Sheet */}
          <section className="mb-12">
            <h2 className="text-xl font-black uppercase border-l-8 border-emerald-600 pl-4 mb-6 text-slate-900">5. The "One-Strike" Answers</h2>
            <p className="text-sm font-medium text-slate-500 mb-6">Memorize these phrases. They make you sound like a Senior Architect.</p>

            <div className="space-y-6">
              
              <div className="border-2 border-slate-200 p-4 rounded-xl">
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-2">Q: How do you handle data security?</p>
                <p className="text-sm font-bold text-slate-900">
                  "I implement <span className="text-emerald-600">Row-Level Security (RLS)</span> in Postgres. This ensures that the database engine itself enforces access control, not just the application logic. Even if the API is bypassed, the data remains secure."
                </p>
              </div>

              <div className="border-2 border-slate-200 p-4 rounded-xl">
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-2">Q: Why Next.js over React?</p>
                <p className="text-sm font-bold text-slate-900">
                  "For <span className="text-emerald-600">SEO and Initial Load Performance</span>. React is Client-Side Rendered (slow start). Next.js is Server-Side Rendered (instant start). For enterprise apps, the Edge Runtime capabilities of Next.js are non-negotiable."
                </p>
              </div>

              <div className="border-2 border-slate-200 p-4 rounded-xl">
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-2">Q: How do you scale?</p>
                <p className="text-sm font-bold text-slate-900">
                  "I design for <span className="text-emerald-600">Stateless Architecture</span>. I use Serverless functions that auto-scale with traffic, and I offload heavy compute (like AI) to specialized APIs (Groq) so the main server never gets blocked."
                </p>
              </div>

            </div>
          </section>

          {/* Footer */}
          <footer className="mt-auto pt-8 border-t-4 border-slate-900 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Prepared for</p>
              <div className="font-serif italic text-3xl text-slate-900 mb-1">
                Boluwatife Adeoye
              </div>
              <p className="text-xs font-bold text-slate-500">Senior AI Systems Architect</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-emerald-600 text-white flex items-center justify-center font-black text-2xl rounded-lg">
                BA
              </div>
            </div>
          </footer>
          
          <div className="text-right text-xs font-black text-slate-400 mt-4">Page 3/3</div>
        </div>

      </div>
    </div>
  );
}
