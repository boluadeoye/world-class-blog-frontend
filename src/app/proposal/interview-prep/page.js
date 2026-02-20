"use client";
import { Download, ArrowLeft, User, GitBranch, CheckCircle2, Globe } from "lucide-react";
import Link from "next/link";

export default function InterviewPrep() {
  
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Bolu_Adeoye_Interview_Masterclass_Full";
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-900/20">
            <User size={32} className="text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Interview Masterclass</h1>
          <p className="text-slate-400 text-sm mb-8">Comprehensive 5-Page Dossier</p>

          <button 
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-200 text-slate-950 font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl"
          >
            <Download size={20} />
            <span>Download Full Guide</span>
          </button>

          <Link href="/" className="block mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← Return to Dashboard
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block">
        
        {/* ================= PAGE 1: THE NARRATIVE (INTRO) ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          {/* Header */}
          <div className="border-b-4 border-indigo-600 pb-6 mb-10 flex justify-between items-end">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Module 01</p>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none text-slate-900">
                The<br/><span className="text-indigo-600">Narrative</span>
              </h1>
            </div>
            <div className="text-right">
              <div className="bg-slate-900 text-white px-4 py-1 font-bold text-xs uppercase inline-block mb-1">Behavioral</div>
              <p className="text-xs font-mono font-bold">INTRO & FIT</p>
            </div>
          </div>

          {/* 1. Tell Me About Yourself */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-indigo-600 pl-4 mb-6 text-slate-900">1. "Tell Me About Yourself"</h2>
            <div className="bg-slate-50 p-6 border-2 border-slate-200 rounded-xl">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">THE SCRIPT (MEMORIZE THIS)</p>
              <p className="text-sm font-medium text-slate-800 leading-relaxed">
                "I am a <strong>Systems Architect and Full-Stack Engineer</strong> with a focus on high-performance AI infrastructure. 
                <br/><br/>
                My background is in building scalable web applications using <strong>Next.js</strong> and <strong>Node.js</strong>, but over the last year, I have pivoted deeply into <strong>AI Engineering</strong>. I specialize in architecting <strong>RAG (Retrieval-Augmented Generation)</strong> engines that solve the 'hallucination' problem for enterprise data.
                <br/><br/>
                Most recently, I architected <strong>Onyx Sovereign</strong>, a financial terminal where I reduced AI inference latency to under 200ms using Groq LPUs. I am looking to bring that same level of architectural rigor to Exxom's industrial data challenges."
              </p>
            </div>
          </section>

          {/* 2. Why Exxom? */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-indigo-600 pl-4 mb-6 text-slate-900">2. "Why do you want to join Exxom?"</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 border-2 border-slate-200 rounded-lg">
                <h4 className="font-black text-sm uppercase mb-2 text-indigo-700">The Challenge</h4>
                <p className="text-xs text-slate-700">
                  "I am driven by complexity. Exxom deals with <strong>large-scale industrial data</strong>, which is the perfect playground for the high-throughput systems I build."
                </p>
              </div>
              <div className="p-4 border-2 border-slate-200 rounded-lg">
                <h4 className="font-black text-sm uppercase mb-2 text-indigo-700">The Impact</h4>
                <p className="text-xs text-slate-700">
                  "I want to move beyond building 'features' to building 'infrastructure.' Exxom offers the scale where optimization actually impacts the bottom line."
                </p>
              </div>
            </div>
          </section>

          <div className="text-right text-xs font-black text-slate-400 mt-auto">Page 1/5</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 2: CORE ENGINEERING (BASICS) ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          <div className="border-b-4 border-blue-600 pb-6 mb-10 flex justify-between items-end">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Module 02</p>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none text-slate-900">
                Core<br/><span className="text-blue-600">Engineering</span>
              </h1>
            </div>
            <div className="text-right">
              <div className="bg-slate-900 text-white px-4 py-1 font-bold text-xs uppercase inline-block mb-1">Foundations</div>
              <p className="text-xs font-mono font-bold">REACT & NODE</p>
            </div>
          </div>

          {/* 1. React/Next.js Fundamentals */}
          <section className="mb-8">
            <h2 className="text-xl font-black uppercase border-l-8 border-blue-600 pl-4 mb-6 text-slate-900">1. React & Next.js Fundamentals</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold shrink-0">Q</div>
                <div>
                  <p className="font-bold text-sm text-slate-900">"What is the difference between Client & Server Components?"</p>
                  <p className="text-xs text-slate-600 mt-1">
                    <strong>Answer:</strong> "Server Components (RSC) render on the backend, reducing bundle size and allowing direct DB access. Client Components handle interactivity (onClick, useState). I use RSC for data fetching and Client for UI logic."
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold shrink-0">Q</div>
                <div>
                  <p className="font-bold text-sm text-slate-900">"Why use TypeScript?"</p>
                  <p className="text-xs text-slate-600 mt-1">
                    <strong>Answer:</strong> "For <strong>Type Safety</strong> and <strong>Developer Experience</strong>. It catches errors at compile-time (before code runs) and provides autocomplete, which is critical for large codebases like Exxom's."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. API & Database */}
          <section className="mb-8">
            <h2 className="text-xl font-black uppercase border-l-8 border-blue-600 pl-4 mb-6 text-slate-900">2. API & Database Design</h2>
            <div className="border-2 border-slate-900 p-4 rounded-xl">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-black text-xs uppercase mb-2">REST vs GraphQL</h4>
                  <p className="text-[10px] text-slate-700">
                    "I prefer <strong>REST</strong> for simple, cacheable resources. I use <strong>GraphQL</strong> when I need to fetch nested data in a single request to avoid over-fetching."
                  </p>
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase mb-2">SQL vs NoSQL</h4>
                  <p className="text-[10px] text-slate-700">
                    "I default to <strong>PostgreSQL (SQL)</strong> because relational data integrity is crucial for financial/industrial apps. I only use NoSQL (like MongoDB) for unstructured logs."
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="text-right text-xs font-black text-slate-400 mt-auto">Page 2/5</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 3: AI ARCHITECTURE (DEEP TECH) ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          <div className="border-b-4 border-emerald-600 pb-6 mb-10 flex justify-between items-end">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Module 03</p>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none text-slate-900">
                AI Systems<br/><span className="text-emerald-600">Architecture</span>
              </h1>
            </div>
            <div className="text-right">
              <div className="bg-slate-900 text-white px-4 py-1 font-bold text-xs uppercase inline-block mb-1">Advanced</div>
              <p className="text-xs font-mono font-bold">RAG & LLMs</p>
            </div>
          </div>

          {/* 1. RAG Explained */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-emerald-600 pl-4 mb-6 text-slate-900">1. RAG (Retrieval-Augmented Generation)</h2>
            <p className="text-sm font-medium text-slate-700 mb-4">
              <strong>Concept:</strong> Giving the AI a "Reference Book" so it doesn't hallucinate.
            </p>
            <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase text-center border-2 border-slate-200 p-4 rounded-xl bg-slate-50">
              <div className="w-20 p-2 bg-white border border-slate-300 rounded">User Query</div>
              <div className="text-slate-400">→</div>
              <div className="w-24 p-2 bg-emerald-100 border border-emerald-500 text-emerald-800 rounded">Vector DB<br/>(Search)</div>
              <div className="text-slate-400">→</div>
              <div className="w-24 p-2 bg-blue-100 border border-blue-500 text-blue-800 rounded">Context<br/>(Data)</div>
              <div className="text-slate-400">→</div>
              <div className="w-20 p-2 bg-slate-900 text-white rounded">LLM<br/>(Answer)</div>
            </div>
          </section>

          {/* 2. Vector Embeddings */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-emerald-600 pl-4 mb-6 text-slate-900">2. Vector Embeddings</h2>
            <div className="p-4 bg-slate-900 text-white rounded-xl">
              <p className="text-xs font-mono mb-2 text-emerald-400">// THE EXPLANATION</p>
              <p className="text-sm leading-relaxed">
                "Computers don't understand words; they understand numbers. <strong>Embeddings</strong> convert text into a list of numbers (vectors). We use <strong>Cosine Similarity</strong> to find vectors that are close together (e.g., 'Apple' is close to 'Fruit'). This allows us to search by <em>meaning</em>, not just keywords."
              </p>
            </div>
          </section>

          {/* 3. Groq LPU */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-emerald-600 pl-4 mb-6 text-slate-900">3. Why Groq LPU?</h2>
            <ul className="list-disc pl-5 text-sm font-medium text-slate-700 space-y-2">
              <li><strong>Speed:</strong> Groq uses LPUs (Language Processing Units), which are deterministic.</li>
              <li><strong>Result:</strong> 500 tokens/second vs. Nvidia's 50 tokens/second.</li>
              <li><strong>Why it matters:</strong> "For real-time agents, latency is the enemy. Groq makes the AI feel instant."</li>
            </ul>
          </section>

          <div className="text-right text-xs font-black text-slate-400 mt-auto">Page 3/5</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 4: WORKFLOW & OPS ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          <div className="border-b-4 border-amber-500 pb-6 mb-10 flex justify-between items-end">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Module 04</p>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none text-slate-900">
                Workflow<br/><span className="text-amber-500">Operations</span>
              </h1>
            </div>
            <div className="text-right">
              <div className="bg-slate-900 text-white px-4 py-1 font-bold text-xs uppercase inline-block mb-1">US Standard</div>
              <p className="text-xs font-mono font-bold">CI/CD & AGILE</p>
            </div>
          </div>

          {/* 1. CI/CD Pipeline */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-amber-500 pl-4 mb-6 text-slate-900">1. CI/CD (Continuous Integration)</h2>
            <p className="text-sm font-medium text-slate-700 mb-4">
              "I don't deploy manually. I use pipelines."
            </p>
            <div className="grid grid-cols-3 gap-4 text-center text-[10px] font-bold uppercase">
              <div className="p-3 border-2 border-slate-300 rounded">
                <GitBranch size={20} className="mx-auto mb-2"/>
                Push to GitHub
              </div>
              <div className="p-3 border-2 border-slate-300 rounded">
                <CheckCircle2 size={20} className="mx-auto mb-2 text-green-600"/>
                Auto-Test (Jest)
              </div>
              <div className="p-3 border-2 border-slate-300 rounded">
                <Globe size={20} className="mx-auto mb-2 text-blue-600"/>
                Deploy (Vercel)
              </div>
            </div>
          </section>

          {/* 2. Agile & Async */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-amber-500 pl-4 mb-6 text-slate-900">2. Remote Async Workflow</h2>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border-l-4 border-amber-500">
                <h4 className="font-black text-xs uppercase mb-1">Communication</h4>
                <p className="text-xs text-slate-700">"I over-communicate in written form (Slack/Linear). I write detailed PR descriptions so my code is easy to review asynchronously."</p>
              </div>
              <div className="p-4 bg-amber-50 border-l-4 border-amber-500">
                <h4 className="font-black text-xs uppercase mb-1">Task Management</h4>
                <p className="text-xs text-slate-700">"I live in Jira/Linear. I break down large features into small, shippable tickets to maintain velocity."</p>
              </div>
            </div>
          </section>

          <div className="text-right text-xs font-black text-slate-400 mt-auto">Page 4/5</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 5: STAR METHOD (BEHAVIORAL) ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          <div className="border-b-4 border-red-600 pb-6 mb-10 flex justify-between items-end">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Module 05</p>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none text-slate-900">
                Behavioral<br/><span className="text-red-600">Mastery</span>
              </h1>
            </div>
            <div className="text-right">
              <div className="bg-slate-900 text-white px-4 py-1 font-bold text-xs uppercase inline-block mb-1">STAR Method</div>
              <p className="text-xs font-mono font-bold">STORIES</p>
            </div>
          </div>

          {/* 1. The Challenge Story */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-red-600 pl-4 mb-6 text-slate-900">Q: "Tell me about a technical challenge you solved."</h2>
            <div className="space-y-3 text-sm text-slate-700">
              <p><strong>Situation:</strong> "On the Autoam project, we needed to track 500 mechanics in real-time, but WebSockets were draining battery life."</p>
              <p><strong>Task:</strong> "I needed to maintain real-time updates without killing the user's device."</p>
              <p><strong>Action:</strong> "I architected a <strong>Hybrid Sync</strong> system. I used WebSockets only when the app was open, and switched to <strong>FCM High-Priority Push</strong> when backgrounded. I also implemented 'Adaptive Tracking'—slowing down GPS updates when the mechanic wasn't moving."</p>
              <p><strong>Result:</strong> "We reduced battery consumption by 40% and maintained 99.9% data accuracy."</p>
            </div>
          </section>

          {/* 2. The Conflict Story */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-red-600 pl-4 mb-6 text-slate-900">Q: "Tell me about a conflict with a team member."</h2>
            <div className="p-4 border-2 border-slate-200 rounded-xl bg-slate-50">
              <p className="text-xs text-slate-700 italic">
                "I once disagreed with a backend engineer about database schema. He wanted NoSQL for speed; I wanted SQL for integrity. Instead of arguing, I built a quick <strong>Proof of Concept (POC)</strong> showing that relational integrity was critical for our payment ledger. Data won the argument, not ego."
              </p>
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
          
          <div className="text-right text-xs font-black text-slate-400 mt-4">Page 5/5</div>
        </div>

      </div>
    </div>
  );
}
