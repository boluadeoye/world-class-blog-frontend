"use client";
import { useState, useEffect } from "react";
import { 
  Download, Terminal, Cpu, Globe, Database, Server, Bot, 
  Code2, Lightbulb, Layers, Shield, Zap, GitBranch, Box, 
  CheckCircle2, Lock, Award, FileCode2, User, Activity, Crosshair
} from "lucide-react";
import Link from "next/link";

export default function MasterCompendium() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1200);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Engineering_Lifecycle_Master_Compendium";
    window.print();
    document.title = originalTitle;
  };

  const headshotUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781340188/blog_assets/bjvw4405zvvun59tnw7f.jpg";

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-slate-300 selection:bg-amber-500/30 selection:text-amber-400">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #050505 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; counter-reset: pageCounter; }
          body * { visibility: hidden; }
          #compendium-render, #compendium-render * { visibility: visible; }
          #compendium-render { position: absolute; left: 0; top: 0; width: 210mm; background: #050505; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #050505;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            padding: 18mm 18mm 14mm 18mm;
          }
          .page-num::after { counter-increment: pageCounter; content: counter(pageCounter); }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .hud-card { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(212, 175, 55, 0.25); border-left: 4px solid #D4AF37; }
        .tech-grid { background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 20px 20px; }
      `}</style>

      {/* === VIEW 1: PORTAL (SCREEN ONLY) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-950/20 via-black to-black"></div>
        
        <div className="relative z-10 w-full max-w-md border border-amber-500/30 bg-black/60 backdrop-blur-xl p-10 text-center shadow-[0_0_50px_-10px_rgba(212,175,55,0.2)]">
          <div className="w-20 h-20 mx-auto mb-6 relative flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-sm transform rotate-45 animate-[spin_12s_linear_infinite]"></div>
            <Cpu size={36} className="text-[#D4AF37]" />
          </div>

          <h1 className="font-playfair text-2xl font-black text-white mb-2 tracking-widest uppercase">Master Compendium</h1>
          <p className="font-mono text-[#D4AF37] text-[10px] mb-8 tracking-[0.3em] uppercase">30-PAGE TECHNICAL DOSSIER</p>

          {!isReady ? (
            <div className="text-slate-500 font-mono text-xs animate-pulse">COMPILING ARCHITECTURE...</div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-amber-500 text-black font-inter font-black py-4 uppercase tracking-widest transition-all shadow-xl">
              <Download size={18} /> Extract 30-Page Dossier
            </button>
          )}
          
          <Link href="/" className="block mt-8 text-xs font-mono text-slate-500 hover:text-slate-300 uppercase tracking-widest">
            &larr; Return to Dashboard
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE 30-PAGE COMPENDIUM (PRINT ONLY) === */}
      <div id="compendium-render" className="hidden print:block text-slate-300">
        
        {/* PAGE 1: HERO COVER */}
        <div className="a4-page tech-grid justify-between">
          <PageHeader id="ARCH-SPEC-2026 // VOL.1" />
          <main className="grow flex flex-col justify-center relative z-10 my-auto">
            <div className="relative w-full h-48 mb-8 flex items-center justify-center">
              <div className="absolute w-44 h-44 border border-[#D4AF37]/30 transform rotate-45"></div>
              <div className="absolute w-36 h-32 bg-black border-2 border-[#D4AF37] transform rotate-45 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.25)]">
                <Cpu size={48} className="text-[#D4AF37] -rotate-45" />
              </div>
            </div>

            <p className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-[0.4em] mb-3 text-center">Systems Engineering &amp; Talent Pipeline</p>
            <h1 className="font-playfair text-5xl font-black text-white uppercase tracking-tighter leading-[0.9] text-center mb-6">
              Engineering Lifecycle &amp;<br/>Systems Compendium
            </h1>
            <div className="h-1 w-24 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="font-inter text-xs text-slate-400 max-w-md mx-auto text-center leading-relaxed">
              A comprehensive technical onboarding standard covering full-stack web architecture, system design, performance optimization, and AI-assisted workflows.
            </p>
          </main>
          <PageFooter pageNum="1" />
        </div>

        {/* PAGE 2: ARCHITECT'S PROFILE */}
        <div className="a4-page justify-between">
          <PageHeader id="ARCH-PROFILE //001" />
          <main className="grow flex flex-col justify-center relative z-10 space-y-6">
            <div className="hud-card p-8 flex items-center gap-8">
              <div className="w-28 h-28 rounded-sm overflow-hidden border-2 border-[#D4AF37] shrink-0 shadow-lg">
                <img src={headshotUrl} alt="Bolu Adeoye" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-widest mb-1">Author &amp; Principal Architect</p>
                <h2 className="font-playfair text-3xl font-black text-white uppercase tracking-tight">Bolu Adeoye</h2>
                <p className="font-inter text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Lead Systems Architect // Full-Stack Engineer</p>
              </div>
            </div>

            <div className="hud-card p-6">
              <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-3">Architectural Philosophy</h3>
              <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
                &ldquo;Performance is aesthetics; security is architecture. We do not write code merely to satisfy requirements—we construct deterministic systems designed for sub-200ms latency, Zero-Trust compliance, and infinite operational elasticity.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 font-mono text-[10px]">
              <div className="p-4 bg-white/5 border border-white/10">
                <span className="text-slate-500 block mb-1">Primary Discipline:</span>
                <span className="text-white font-bold">Distributed Systems &amp; AI Edge Architecture</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/10">
                <span className="text-slate-500 block mb-1">Verification Key:</span>
                <span className="text-[#D4AF37] font-bold">BA-SPEC-ORACLE-v2</span>
              </div>
            </div>
          </main>
          <PageFooter pageNum="2" />
        </div>

        {/* PAGE 3: EXECUTIVE MANDATE */}
        <div className="a4-page justify-between">
          <PageHeader id="EXECUTIVE MANDATE //002" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-playfair text-3xl font-black text-white uppercase tracking-widest border-b border-[#D4AF37]/30 pb-4">The Death of the Developer</h2>
            
            <p className="font-inter text-xs leading-[2] text-slate-300 text-justify">
              In the current technological landscape, traditional syntax-focused coding has become a commodity. AI models can produce boilerplate code in milliseconds. Consequently, the value of an engineer is no longer measured by how quickly they type syntax, but by their ability to **architect systems**.
            </p>

            <div className="hud-card p-6">
              <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-2">The Three Pillars of Sovereign Engineering</h3>
              <ul className="space-y-3 font-inter text-xs text-slate-300">
                <li className="flex gap-2"><span className="text-[#D4AF37] font-bold">&bull;</span> <strong>Determinism:</strong> Systems must behave predictably under peak load without silent failures.</li>
                <li className="flex gap-2"><span className="text-[#D4AF37] font-bold">&bull;</span> <strong>Data Sovereignty:</strong> Security and Row-Level Security (RLS) must be enforced at the database layer.</li>
                <li className="flex gap-2"><span className="text-[#D4AF37] font-bold">&bull;</span> <strong>Latency Optimization:</strong> Every millisecond of delay represents operational friction and lost value.</li>
              </ul>
            </div>
          </main>
          <PageFooter pageNum="3" />
        </div>

        {/* PAGE 4: MENTAL MODELS (SYSTEM ANATOMY) */}
        <div className="a4-page justify-between">
          <PageHeader id="SYSTEM ANATOMY //003" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">3-Tier System Architecture</h2>
            
            <div className="space-y-4">
              <div className="hud-card p-5">
                <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-1">1. The Client (The Presentation Tier)</h3>
                <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">
                  The client is the browser or mobile application executing on the user's hardware. Its sole responsibility is rendering HTML, CSS, and user interfaces while capturing interaction events. Never trust client-side state for critical security checks.
                </p>
              </div>

              <div className="hud-card p-5">
                <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-1">2. The Server (The Application Logic Tier)</h3>
                <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">
                  The server is the authoritative business logic gate. It validates incoming payloads, enforces authentication rules, executes background tasks, and manages communication with external services.
                </p>
              </div>

              <div className="hud-card p-5">
                <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-1">3. The Database (The Persistence Tier)</h3>
                <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">
                  The immutable storage engine. Relational databases like PostgreSQL store structured domain entities, enforce relational integrity, and guarantee atomic state updates across distributed transactions.
                </p>
              </div>
            </div>
          </main>
          <PageFooter pageNum="4" />
        </div>

        {/* PAGE 5: THE WAR ROOM SETUP */}
        <div className="a4-page justify-between">
          <PageHeader id="DEVELOPER ENVIRONMENT //004" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Environment &amp; Tooling Standard</h2>
            
            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 bg-white/5 border border-white/10">
                <p className="text-[#D4AF37] font-bold uppercase mb-2">Editor Standard</p>
                <p className="text-slate-300 text-[11px] leading-relaxed">Visual Studio Code or Cursor IDE with strict ESLint and Prettier auto-formatting on save.</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10">
                <p className="text-[#D4AF37] font-bold uppercase mb-2">Runtime Environment</p>
                <p className="text-slate-300 text-[11px] leading-relaxed">Node.js LTS (v20+) or Bun runtime engine for local script execution and NPM package resolution.</p>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-emerald-400 space-y-2">
              <p className="text-slate-500">// Environment Variable Injection (.env.local):</p>
              <p>NEXT_PUBLIC_APP_URL="https://boluadeoye.com.ng"</p>
              <p>DATABASE_URL="postgresql://user:pass@ep-cool-db.neon.tech/neondb"</p>
              <p>GROQ_API_KEY="gsk_live_sovereign_key_99182"</p>
            </div>
          </main>
          <PageFooter pageNum="5" />
        </div>

        {/* PAGE 6: HTML5 STRUCTURAL INTEGRITY */}
        <div className="a4-page justify-between">
          <PageHeader id="HTML5 SPECIFICATION //005" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">HTML5 &amp; Semantic DOM Trees</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              Semantic HTML is not an aesthetic preference; it is an accessibility and structural requirement. Browsers parse semantic trees to construct the Document Object Model (DOM) and accessibility trees efficiently.
            </p>

            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-slate-300">
              <p className="text-[#D4AF37] mb-2">// Production Semantic Blueprint:</p>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Sovereign Architecture</title>
  </head>
  <body className="bg-black text-white">
    <header className="border-b p-4">
      <nav><a href="/">Home</a></nav>
    </header>
    <main className="p-8">
      <article>
        <h1>System Performance Audit</h1>
      </article>
    </main>
  </body>
</html>`}
              </pre>
            </div>
          </main>
          <PageFooter pageNum="6" />
        </div>

        {/* PAGE 7: CSS3 & VISUAL ARCHITECTURE */}
        <div className="a4-page justify-between">
          <PageHeader id="CSS3 & LAYOUT //006" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">CSS3 &amp; The Geometry of Layouts</h2>
            
            <div className="hud-card p-6">
              <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-2">Flexbox vs. CSS Grid</h3>
              <div className="grid grid-cols-2 gap-6 font-inter text-xs text-slate-300">
                <div>
                  <p className="font-bold text-white mb-1">Flexbox (1D Layouts)</p>
                  <p className="text-[11px] leading-relaxed">Designed for distributing space along a single row or column. Ideal for navigation bars, button clusters, and stacked items.</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">CSS Grid (2D Layouts)</p>
                  <p className="text-[11px] leading-relaxed">Designed for complex two-dimensional layouts where rows and columns must align simultaneously. Ideal for dashboards and magazine spreads.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-emerald-400">
              <p className="text-slate-500 mb-1">/* 12-Column Swiss Grid Utility Class */</p>
              <p>.swiss-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 1.5rem; }</p>
            </div>
          </main>
          <PageFooter pageNum="7" />
        </div>

        {/* PAGE 8: TAILWIND CSS LOGIC */}
        <div className="a4-page justify-between">
          <PageHeader id="TAILWIND LOGIC //007" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Utility-First Architecture with Tailwind</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              Tailwind CSS compiles utility classes on demand using a Just-In-Time (JIT) engine. It eliminates CSS file bloat and enforces design token consistency across complex teams.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="hud-card p-4">
                <span className="text-[#D4AF37] font-bold">flex flex-col items-center justify-between</span>
                <p className="text-slate-400 text-[10px] mt-1">Establishes a vertical flex container aligned and space-distributed.</p>
              </div>
              <div className="hud-card p-4">
                <span className="text-[#D4AF37] font-bold">bg-[#050505] text-slate-300 border border-amber-500/30</span>
                <p className="text-slate-400 text-[10px] mt-1">Enforces high-contrast Obsidian Sovereign theme tokens.</p>
              </div>
            </div>
          </main>
          <PageFooter pageNum="8" />
        </div>


        {/* PAGE 9: JAVASCRIPT LOGIC ENGINE */}
        <div className="a4-page justify-between">
          <PageHeader id="JAVASCRIPT ENGINE //008" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">JavaScript Memory &amp; Execution Context</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              JavaScript executes inside a single-threaded execution context managed by the V8 Engine. Understanding memory allocation across the Call Stack (primitive values) and Memory Heap (reference objects) is essential for preventing memory leaks in high-scale applications.
            </p>

            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-slate-300 space-y-2">
              <p className="text-[#D4AF37]">// Closures &amp; Lexical Scope Execution:</p>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`function createRateLimiter(limit) {
  let calls = 0; // Stored in Closure Scope
  return function checkLimit() {
    calls++;
    return calls <= limit;
  };
}

const limiter = createRateLimiter(100);
console.log(limiter()); // true`}
              </pre>
            </div>

            <div className="hud-card p-5">
              <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-1">Architectural Takeaway</h3>
              <p className="font-inter text-xs text-slate-300 leading-relaxed">
                Closures allow functions to maintain state long after their parent execution context has popped off the Call Stack.
              </p>
            </div>
          </main>
          <PageFooter pageNum="9" />
        </div>

        {/* PAGE 10: ASYNCHRONOUS ARCHITECTURE */}
        <div className="a4-page justify-between">
          <PageHeader id="ASYNC & EVENT LOOP //009" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Asynchronous Systems &amp; The Event Loop</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              JavaScript achieves non-blocking I/O via the Event Loop. When an asynchronous operation (like a database query or fetch API call) is initiated, it is delegated to Web APIs/Libuv thread pools, freeing the main thread to process incoming events.
            </p>

            <div className="hud-card p-6">
              <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-2">Microtasks vs. Macrotasks</h3>
              <ul className="space-y-2 font-inter text-xs text-slate-300">
                <li><strong className="text-white">Microtask Queue (High Priority):</strong> Processed immediately after the current execution stack empties. Contains <code className="text-[#D4AF37]">Promise.then</code> and <code className="text-[#D4AF37]">queueMicrotask</code> handlers.</li>
                <li><strong className="text-white">Macrotask Queue (Standard Priority):</strong> Processed on subsequent event loop ticks. Contains <code className="text-slate-400">setTimeout</code>, <code className="text-slate-400">setInterval</code>, and I/O events.</li>
              </ul>
            </div>

            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-emerald-400">
              <p className="text-slate-500 mb-1">// Non-blocking Async / Await Pattern:</p>
              <p>const fetchTelemetry = async () =&gt; &#123; const res = await fetch('/api/metrics'); return res.json(); &#125;;</p>
            </div>
          </main>
          <PageFooter pageNum="10" />
        </div>

        {/* PAGE 11: REACT COMPONENT MODEL */}
        <div className="a4-page justify-between">
          <PageHeader id="REACT COMPONENT MODEL //010" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">React &amp; Virtual DOM Reconciliation</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              React abstracts DOM manipulation using a lightweight Virtual DOM tree. When state changes, React constructs a new Virtual DOM tree and executes the <strong>Fiber Reconciliation Algorithm</strong> to calculate minimal real-DOM updates.
            </p>

            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-slate-300">
              <p className="text-[#D4AF37] mb-2">// Immutable State Pattern:</p>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`const [nodes, setNodes] = useState([]);

// CORRECT: Immutable update via spread operator
const addNode = (newNode) => {
  setNodes((prev) => [...prev, newNode]);
};`}
              </pre>
            </div>
          </main>
          <PageFooter pageNum="11" />
        </div>

        {/* PAGE 12: NEXT.JS 15 STANDARD */}
        <div className="a4-page justify-between">
          <PageHeader id="NEXT.JS 15 ROUTER //011" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Next.js 15 &amp; React Server Components</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              Next.js 15 introduces React Server Components (RSC) by default. Server Components execute exclusively on the server during request time or build time, sending zero JavaScript bundles to the browser for static content.
            </p>

            <div className="grid grid-cols-2 gap-4 font-inter text-xs">
              <div className="hud-card p-5">
                <p className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase mb-1">Server Components (Default)</p>
                <p className="text-slate-300 text-[11px] leading-relaxed">Direct database access, zero client bundle size, improved security for API secrets.</p>
              </div>
              <div className="hud-card p-5">
                <p className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase mb-1">Client Components (&quot;use client&quot;)</p>
                <p className="text-slate-300 text-[11px] leading-relaxed">Enables event listeners (<code className="text-white">onClick</code>), React hooks (<code className="text-white">useState</code>), and browser APIs.</p>
              </div>
            </div>
          </main>
          <PageFooter pageNum="12" />
        </div>

        {/* PAGE 13: DATA SOVEREIGNTY & POSTGRES */}
        <div className="a4-page justify-between">
          <PageHeader id="DATABASE ARCHITECTURE //012" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Data Sovereignty with Relational Databases</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              Relational databases like PostgreSQL provide ACID (Atomicity, Consistency, Isolation, Durability) guarantees across enterprise workloads. Serverless Postgres providers like Neon decouple compute from storage, allowing instance scale-to-zero capability.
            </p>

            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-slate-300">
              <p className="text-[#D4AF37] mb-2">// SQL Relational Schema Blueprint:</p>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT NOW()
);`}
              </pre>
            </div>
          </main>
          <PageFooter pageNum="13" />
        </div>

        {/* PAGE 14: ROW-LEVEL SECURITY (RLS) */}
        <div className="a4-page justify-between">
          <PageHeader id="SECURITY HARDENING //013" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Row-Level Security (RLS) &amp; Zero-Trust</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              Row-Level Security enforces tenant isolation directly inside the database kernel. Even if the web server application code contains vulnerabilities, the Postgres engine physically rejects queries that violate session policies.
            </p>

            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-slate-300">
              <p className="text-[#D4AF37] mb-2">// Declarative Postgres RLS Policy:</p>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only view their own profile"
ON user_profiles FOR SELECT
USING (auth.uid() = user_id);`}
              </pre>
            </div>
          </main>
          <PageFooter pageNum="14" />
        </div>

        {/* PAGE 15: AI-ASSISTED ENGINEERING */}
        <div className="a4-page justify-between">
          <PageHeader id="AI WORKFLOWS //014" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">AI-Assisted Architecture &amp; Prompting</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              High-velocity architects treat AI models (Gemini, Claude, Groq) as junior pair programmers. Rather than asking AI to write unvalidated code, architects provide strict type definitions, constraints, and schemas for the AI to fill.
            </p>

            <div className="hud-card p-6">
              <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-2">Prompt Architecture Rules</h3>
              <ul className="space-y-2 font-inter text-xs text-slate-300">
                <li><strong className="text-white">Provide Context:</strong> Include framework versions (e.g., Next.js 15, Tailwind v4).</li>
                <li><strong className="text-white">Enforce Constraints:</strong> Specify &quot;no external libraries&quot; or &quot;use TypeScript interfaces&quot;.</li>
                <li><strong className="text-white">Request Explanation:</strong> Ask the model to justify design trade-offs before outputting code.</li>
              </ul>
            </div>
          </main>
          <PageFooter pageNum="15" />
        </div>

        {/* PAGE 16: GIT FLOW & VERSION CONTROL */}
        <div className="a4-page justify-between">
          <PageHeader id="VERSION CONTROL //015" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Git Flow &amp; Version Control</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              Git maintains a directed acyclic graph (DAG) of project snapshots. Clean commit messages and strategic branch management prevent merge conflicts across enterprise teams.
            </p>

            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-slate-300 space-y-2">
              <p className="text-[#D4AF37]">// Standard Deployment Git Commands:</p>
              <p className="text-emerald-400">$ git checkout -b feat/sovereign-layer</p>
              <p className="text-emerald-400">$ git add .</p>
              <p className="text-emerald-400">$ git commit -m &quot;Feat: Implement RLS database policies&quot;</p>
              <p className="text-emerald-400">$ git push origin feat/sovereign-layer</p>
            </div>
          </main>
          <PageFooter pageNum="16" />
        </div>


        {/* PAGE 17: SERVER ACTIONS & DATA MUTATIONS */}
        <div className="a4-page justify-between">
          <PageHeader id="SERVER ACTIONS //016" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Server Actions &amp; Zero-API Mutations</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              Next.js Server Actions allow client components to invoke asynchronous functions that execute securely on the server. This eliminates the boilerplate required to write REST or GraphQL API endpoints manually.
            </p>

            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-slate-300">
              <p className="text-[#D4AF37] mb-2">// Direct Database Mutation via Server Action:</p>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`"use server";

export async function updateSystemConfig(formData) {
  const configId = formData.get("configId");
  
  // Executed directly on server with RLS context
  await db.update(configs)
    .set({ updated_at: new Date() })
    .where(eq(configs.id, configId));
}`}
              </pre>
            </div>
          </main>
          <PageFooter pageNum="17" />
        </div>

        {/* PAGE 18: RAG PIPELINES & VECTOR EMBEDDINGS */}
        <div className="a4-page justify-between">
          <PageHeader id="RAG ARCHITECTURE //017" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Retrieval-Augmented Generation (RAG)</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              RAG pipelines prevent LLM hallucinations by grounding generative models in verified private domain data. Text chunks are converted into multi-dimensional floating-point vectors and stored in vector databases for cosine-similarity retrieval.
            </p>

            <div className="hud-card p-6">
              <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-2">Vector Search Query (Pgvector)</h3>
              <div className="bg-[#0a0a0a] p-4 rounded border border-slate-800 font-mono text-[9px] text-emerald-400 overflow-x-auto">
                SELECT content, 1 - (embedding &lt;=&gt; query_embedding) AS similarity FROM document_vectors WHERE 1 - (embedding &lt;=&gt; query_embedding) &gt; 0.85 ORDER BY similarity DESC LIMIT 5;
              </div>
            </div>
          </main>
          <PageFooter pageNum="18" />
        </div>

        {/* PAGE 19: CI/CD & AUTOMATED VELOCITY */}
        <div className="a4-page justify-between">
          <PageHeader id="CI/CD PIPELINES //018" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Continuous Integration &amp; Deployment</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              High-velocity software engineering requires automated quality gates. Every GitHub pull request triggers isolated preview environments where unit tests, type-checking, and static analysis execute before merging into production branches.
            </p>

            <div className="grid grid-cols-2 gap-4 font-inter text-xs">
              <div className="hud-card p-5">
                <p className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase mb-1">Pre-Commit Gates</p>
                <p className="text-slate-300 text-[11px] leading-relaxed">ESLint, Prettier auto-format, and Husky pre-commit hooks enforce team syntax consistency.</p>
              </div>
              <div className="hud-card p-5">
                <p className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase mb-1">Automated Build Verification</p>
                <p className="text-slate-300 text-[11px] leading-relaxed">Vercel and GitHub Actions run Next.js production builds to catch prerender errors before traffic hits users.</p>
              </div>
            </div>
          </main>
          <PageFooter pageNum="19" />
        </div>

        {/* PAGE 20: GLOBAL EDGE DEPLOYMENT */}
        <div className="a4-page justify-between">
          <PageHeader id="EDGE INFRASTRUCTURE //019" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Global CDN &amp; Edge Runtime Distribution</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              Deploying on the Vercel Edge Network places serverless execution nodes in over 300 data centers worldwide. Users in Lagos, Washington D.C., or London connect to the geographically closest node, cutting sub-second network round-trip delays.
            </p>

            <div className="hud-card p-6">
              <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-2">Stale-While-Revalidate Caching</h3>
              <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">
                By specifying HTTP <code className="text-white font-mono">Cache-Control: s-maxage=1, stale-while-revalidate=59</code> headers, edge nodes serve cached static responses instantly while background workers re-validate dynamic content seamlessly.
              </p>
            </div>
          </main>
          <PageFooter pageNum="20" />
        </div>

        {/* PAGE 21: DIAGRAM: NEXT.JS REQUEST FLOW */}
        <div className="a4-page justify-between">
          <PageHeader id="SYSTEM SCHEMATIC //020" />
          <main className="grow flex flex-col justify-center space-y-8">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest text-center">Next.js Edge Request Lifecycle</h2>
            
            {/* CSS Request Flow Diagram */}
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="w-full p-3 bg-white/5 border border-white/20 text-center font-mono text-xs text-white">Client Interface (Mobile / Browser)</div>
              <div className="h-4 w-px bg-[#D4AF37]"></div>
              <div className="w-full p-4 bg-[#0A0A0A] border-2 border-[#D4AF37] text-center font-mono text-xs text-[#D4AF37]">Vercel Edge Network (Route Match &amp; Cache Check)</div>
              <div className="h-4 w-px bg-[#D4AF37]"></div>
              <div className="w-full p-4 bg-emerald-950/30 border border-emerald-500 text-center font-mono text-xs text-emerald-300">Server Action / React Server Component</div>
              <div className="h-4 w-px bg-[#D4AF37]"></div>
              <div className="w-full p-3 bg-white/5 border border-white/20 text-center font-mono text-xs text-white">Neon / Supabase Postgres (RLS Enforcement)</div>
            </div>
          </main>
          <PageFooter pageNum="21" />
        </div>

        {/* PAGE 22: CASE STUDY - AUTOAM */}
        <div className="a4-page justify-between">
          <PageHeader id="CASE STUDY 01 // AUTOAM" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Autoam: Real-Time Geospatial Logistics</h2>
            
            <div className="hud-card p-6">
              <p className="font-mono text-[10px] text-[#D4AF37] uppercase font-bold mb-2">Architectural Problem</p>
              <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">
                Automotive emergency marketplaces require matching distressed drivers with the nearest verified mechanics in under 2 seconds, even in low-network cellular zones across African metropolitan centers.
              </p>
            </div>

            <div className="hud-card p-6">
              <p className="font-mono text-[10px] text-[#D4AF37] uppercase font-bold mb-2">Sovereign Solution</p>
              <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">
                Architected an Offline-First geospatial matching engine powered by PostgreSQL PostGIS spatial indexing, WatermelonDB client-side local caching, and WebSockets for sub-200ms bid propagation.
              </p>
            </div>
          </main>
          <PageFooter pageNum="22" />
        </div>

        {/* PAGE 23: CASE STUDY - FORENSIC REALITY PROTOCOL */}
        <div className="a4-page justify-between">
          <PageHeader id="CASE STUDY 02 // FRP ORACLE" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">FRP: Cryptographic Media Oracle</h2>
            
            <div className="hud-card p-6">
              <p className="font-mono text-[10px] text-[#D4AF37] uppercase font-bold mb-2">Architectural Problem</p>
              <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">
                Deepfakes and AI-generated synthetic media threaten digital insurance claims and news integrity. Traditional visual inspection cannot reliably detect spatial-temporal tampering.
              </p>
            </div>

            <div className="hud-card p-6">
              <p className="font-mono text-[10px] text-[#D4AF37] uppercase font-bold mb-2">Sovereign Solution</p>
              <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">
                Designed a 4-Plane evidence verification chain combining 128KB binary header hex scanning, astronomical SunCalc solar altitude cross-validation, and secp256k1 ECDSA cryptographic seals.
              </p>
            </div>
          </main>
          <PageFooter pageNum="23" />
        </div>

        {/* PAGE 24: CASE STUDY - HEIRSGUARD VISION */}
        <div className="a4-page justify-between">
          <PageHeader id="CASE STUDY 03 // HEIRSGUARD" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">HeirsGuard Vision: AI Claims Engine</h2>
            
            <div className="hud-card p-6">
              <p className="font-mono text-[10px] text-[#D4AF37] uppercase font-bold mb-2">Architectural Problem</p>
              <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">
                Motor insurance claims in developing markets average 14 days of bureaucratic delays, manual damage inspection, and high administrative overhead.
              </p>
            </div>

            <div className="hud-card p-6">
              <p className="font-mono text-[10px] text-[#D4AF37] uppercase font-bold mb-2">Sovereign Solution</p>
              <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">
                Engineered an Azure-native AI claims processing pipeline that analyzes damage via Computer Vision, interprets insurance policy PDFs via RAG (GPT-4o), and triggers instant payouts in under 5 minutes.
              </p>
            </div>
          </main>
          <PageFooter pageNum="24" />
        </div>


        {/* PAGE 25: AI WORKFLOWS & PROMPT ARCHITECTURE */}
        <div className="a4-page justify-between">
          <PageHeader id="AI PROMPT ARCHITECTURE //024" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Gemini &amp; Claude 3.5 Sonnet Workflows</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              Modern architects leverage frontier models (Gemini 1.5 Pro, Claude 3.5 Sonnet) within AI-native editors like Cursor IDE to write, refactor, and audit production code at 10x velocity.
            </p>

            <div className="hud-card p-6">
              <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-2">The 3-Step AI Engineering Protocol</h3>
              <div className="space-y-3 font-inter text-xs text-slate-300">
                <p><strong>1. Schema First:</strong> Define TypeScript interfaces or SQL schemas before asking the model to write functions.</p>
                <p><strong>2. Context Injection:</strong> Pass relevant documentation snippets and framework versions directly into the prompt context window.</p>
                <p><strong>3. Deterministic Validation:</strong> Run automated type-checking and unit tests to verify AI output before committing.</p>
              </div>
            </div>
          </main>
          <PageFooter pageNum="25" />
        </div>

        {/* PAGE 26: FRONTEND PERFORMANCE OPTIMIZATION */}
        <div className="a4-page justify-between">
          <PageHeader id="PERFORMANCE OPTIMIZATION //025" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Core Web Vitals &amp; Asset Optimization</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              Achieving 100/100 Lighthouse scores requires optimizing Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). Next.js provides automatic font, script, and image optimization engines.
            </p>

            <div className="grid grid-cols-2 gap-4 font-inter text-xs">
              <div className="hud-card p-5">
                <p className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase mb-1">Font Optimization</p>
                <p className="text-slate-300 text-[11px] leading-relaxed"><code className="text-white">next/font</code> automatically inline-hosts Google Fonts at build time, eliminating external network round trips.</p>
              </div>
              <div className="hud-card p-5">
                <p className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase mb-1">AVIF Image Encoding</p>
                <p className="text-slate-300 text-[11px] leading-relaxed"><code className="text-white">next/image</code> serves modern AVIF and WebP formats dynamically based on client browser user-agent headers.</p>
              </div>
            </div>
          </main>
          <PageFooter pageNum="26" />
        </div>

        {/* PAGE 27: SYSTEM RESILIENCE & ERROR BOUNDARIES */}
        <div className="a4-page justify-between">
          <PageHeader id="SYSTEM RESILIENCE //026" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Fault Tolerance &amp; Graceful Degradation</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              Production infrastructure must gracefully handle downstream service outages. React Error Boundaries catch unhandled component exceptions, preventing white-screen crashes and presenting localized fallback UIs.
            </p>

            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-slate-300">
              <p className="text-[#D4AF37] mb-2">// Next.js Error Boundary (error.js):</p>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`"use client";

export default function ErrorBoundary({ error, reset }) {
  return (
    <div className="p-8 bg-red-950/20 border border-red-500">
      <h2>System Exception Detected</h2>
      <button onClick={() => reset()}>Re-initialize State</button>
    </div>
  );
}`}
              </pre>
            </div>
          </main>
          <PageFooter pageNum="27" />
        </div>

        {/* PAGE 28: SECURITY AUDITING & COMPLIANCE */}
        <div className="a4-page justify-between">
          <PageHeader id="SECURITY COMPLIANCE //027" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">SOC2 &amp; OWASP Security Standards</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">
              Securing web applications requires mitigating OWASP Top 10 vulnerabilities. Security headers, Cross-Origin Resource Sharing (CORS) policies, and Content Security Policies (CSP) are enforced at the Edge network layer.
            </p>

            <div className="hud-card p-6 space-y-3 font-inter text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="font-bold text-white">X-Frame-Options:</span>
                <span className="font-mono text-emerald-400">DENY (Clickjacking Defense)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="font-bold text-white">X-Content-Type-Options:</span>
                <span className="font-mono text-emerald-400">nosniff (MIME Sniffing Defense)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-white">Strict-Transport-Security:</span>
                <span className="font-mono text-emerald-400">max-age=63072000; includeSubDomains</span>
              </div>
            </div>
          </main>
          <PageFooter pageNum="28" />
        </div>

        {/* PAGE 29: THE ARCHITECT'S CONCLUSION */}
        <div className="a4-page justify-between">
          <PageHeader id="ARCHITECT CONCLUSION //028" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-playfair text-3xl font-black text-white uppercase tracking-widest border-b border-[#D4AF37]/30 pb-4">The Sovereign Path</h2>
            
            <p className="font-inter text-xs leading-[2] text-slate-300 text-justify">
              Engineering excellence is not achieved by chance. It is the result of relentless discipline, deterministic system design, and the continuous refinement of architectural patterns.
            </p>

            <p className="font-inter text-xs leading-[2] text-slate-300 text-justify">
              By mastering the foundations—from semantic HTML and CSS geometry to asynchronous execution loops, Next.js Server Components, PostgreSQL RLS, and AI pair-programming—you transition from a passive consumer of technology into a Sovereign System Architect.
            </p>

            <div className="hud-card p-6 bg-white/5 border border-[#D4AF37]">
              <p className="font-playfair text-sm italic text-white leading-relaxed">
                &ldquo;Building high-performance software is an act of craftsmanship. Treat every component, schema, and API route as an enduring asset.&rdquo;
              </p>
            </div>
          </main>
          <PageFooter pageNum="29" />
        </div>

        {/* PAGE 30: THE FINAL SEAL */}
        <div className="a4-page justify-between">
          <PageHeader id="TITANIUM SEAL //029" />
          <main className="grow flex flex-col justify-center items-center text-center relative z-10 space-y-8">
            
            <div className="hud-card p-10 border-4 border-[#D4AF37] w-full max-w-lg bg-black shadow-[0_0_50px_rgba(212,175,55,0.2)]">
              <div className="flex items-center justify-center gap-4 mb-8">
                <Shield size={40} className="text-[#D4AF37]" />
                <div className="text-left">
                  <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">Architectural Verification</p>
                  <p className="font-inter text-xl font-black text-white uppercase tracking-widest">Master Specification Signed</p>
                </div>
              </div>

              <div className="space-y-4 font-mono text-xs text-slate-300 text-left border-t border-white/10 pt-6">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Document:</span>
                  <span className="text-white font-bold">ELSOC-2026-COMPENDIUM</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Principal Architect:</span>
                  <span className="font-inter font-black text-white uppercase">Bolu Adeoye</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Organization:</span>
                  <span className="text-[#D4AF37] font-bold">Titanium Dynamics</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">System Hash:</span>
                  <span className="text-emerald-400">SHA256: 9f8c...3a1b02d</span>
                </div>
              </div>
            </div>

            <div className="text-center font-mono text-[9px] text-slate-500 uppercase tracking-widest">
              END OF MASTER SPECIFICATION // VOL. 1
            </div>

          </main>
          <PageFooter pageNum="30" />
        </div>

      </div>
    </div>
  );
}

// Subcomponents for Clean Modular Rendering
function PageHeader({ id }) {
  return (
    <header className="border-b border-[#D4AF37]/30 pb-3 mb-6 flex justify-between items-end relative z-10">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-[#D4AF37] flex items-center justify-center text-black font-black text-[8px]">TD</div>
        <span className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-widest">{id}</span>
      </div>
      <Hexagon size={14} className="text-[#D4AF37]/50" />
    </header>
  );
}

function PageFooter({ pageNum }) {
  return (
    <footer className="border-t border-[#D4AF37]/30 pt-3 mt-auto flex justify-between items-center relative z-10 bg-[#050505]">
      <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-500">
        CONFIDENTIAL // TITANIUM DYNAMICS // SPECIFICATION
      </span>
      <span className="font-mono text-[9px] font-bold text-[#D4AF37] uppercase">
        PAGE {pageNum} OF 30
      </span>
    </footer>
  );
}

        {/* P8 */}
        <div className="a4-page justify-between">
          <PageHeader id="TAILWIND LOGIC //007" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Utility-First Architecture with Tailwind</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">Tailwind CSS compiles utility classes on demand using a Just-In-Time (JIT) engine. It eliminates CSS file bloat and enforces design token consistency across complex teams.</p>
            <div className="space-y-3 font-mono text-xs">
              <div className="hud-card p-4"><span className="text-[#D4AF37] font-bold">flex flex-col items-center justify-between</span><p className="text-slate-400 text-[10px] mt-1">Establishes a vertical flex container aligned and space-distributed.</p></div>
              <div className="hud-card p-4"><span className="text-[#D4AF37] font-bold">bg-[#050505] text-slate-300 border border-amber-500/30</span><p className="text-slate-400 text-[10px] mt-1">Enforces high-contrast Obsidian Sovereign theme tokens.</p></div>
            </div>
          </main>
          <PageFooter pageNum="8" />
        </div>

        {/* P9 */}
        <div className="a4-page justify-between">
          <PageHeader id="JAVASCRIPT ENGINE //008" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">JavaScript Memory &amp; Execution Context</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">JavaScript executes inside a single-threaded execution context managed by the V8 Engine. Understanding memory allocation across the Call Stack (primitive values) and Memory Heap (reference objects) is essential for preventing memory leaks in high-scale applications.</p>
            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-slate-300 space-y-2">
              <p className="text-[#D4AF37]">// Closures &amp; Lexical Scope Execution:</p>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`function createRateLimiter(limit) {
  let calls = 0; // Stored in Closure Scope
  return function checkLimit() {
    calls++;
    return calls <= limit;
  };
}

const limiter = createRateLimiter(100);
console.log(limiter()); // true`}
              </pre>
            </div>
            <div className="hud-card p-5"><h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-1">Architectural Takeaway</h3><p className="font-inter text-xs text-slate-300 leading-relaxed">Closures allow functions to maintain state long after their parent execution context has popped off the Call Stack.</p></div>
          </main>
          <PageFooter pageNum="9" />
        </div>

        {/* P10 */}
        <div className="a4-page justify-between">
          <PageHeader id="ASYNC & EVENT LOOP //009" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Asynchronous Systems &amp; The Event Loop</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">JavaScript achieves non-blocking I/O via the Event Loop. When an asynchronous operation (like a database query or fetch API call) is initiated, it is delegated to Web APIs/Libuv thread pools, freeing the main thread to process incoming events.</p>
            <div className="hud-card p-6">
              <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-2">Microtasks vs. Macrotasks</h3>
              <ul className="space-y-2 font-inter text-xs text-slate-300">
                <li><strong className="text-white">Microtask Queue (High Priority):</strong> Processed immediately after the current execution stack empties. Contains <code className="text-[#D4AF37]">Promise.then</code> and <code className="text-[#D4AF37]">queueMicrotask</code> handlers.</li>
                <li><strong className="text-white">Macrotask Queue (Standard Priority):</strong> Processed on subsequent event loop ticks. Contains <code className="text-slate-400">setTimeout</code>, <code className="text-slate-400">setInterval</code>, and I/O events.</li>
              </ul>
            </div>
            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-emerald-400">
              <p className="text-slate-500 mb-1">// Non-blocking Async / Await Pattern:</p>
              <p>const fetchTelemetry = async () =&gt; &#123; const res = await fetch(&apos;/api/metrics&apos;); return res.json(); &#125;;</p>
            </div>
          </main>
          <PageFooter pageNum="10" />
        </div>

        {/* P11 */}
        <div className="a4-page justify-between">
          <PageHeader id="REACT COMPONENT MODEL //010" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">React &amp; Virtual DOM Reconciliation</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">React abstracts DOM manipulation using a lightweight Virtual DOM tree. When state changes, React constructs a new Virtual DOM tree and executes the <strong>Fiber Reconciliation Algorithm</strong> to calculate minimal real-DOM updates.</p>
            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-slate-300">
              <p className="text-[#D4AF37] mb-2">// Immutable State Pattern:</p>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`const [nodes, setNodes] = useState([]);

// CORRECT: Immutable update via spread operator
const addNode = (newNode) => {
  setNodes((prev) => [...prev, newNode]);
};`}
              </pre>
            </div>
          </main>
          <PageFooter pageNum="11" />
        </div>

        {/* P12 */}
        <div className="a4-page justify-between">
          <PageHeader id="NEXT.JS 15 ROUTER //011" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Next.js 15 &amp; React Server Components</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">Next.js 15 introduces React Server Components (RSC) by default. Server Components execute exclusively on the server during request time or build time, sending zero JavaScript bundles to the browser for static content.</p>
            <div className="grid grid-cols-2 gap-4 font-inter text-xs">
              <div className="hud-card p-5"><p className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase mb-1">Server Components (Default)</p><p className="text-slate-300 text-[11px] leading-relaxed">Direct database access, zero client bundle size, improved security for API secrets.</p></div>
              <div className="hud-card p-5"><p className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase mb-1">Client Components (&quot;use client&quot;)</p><p className="text-slate-300 text-[11px] leading-relaxed">Enables event listeners (<code className="text-white">onClick</code>), React hooks (<code className="text-white">useState</code>), and browser APIs.</p></div>
            </div>
          </main>
          <PageFooter pageNum="12" />
        </div>

        {/* P13 */}
        <div className="a4-page justify-between">
          <PageHeader id="DATABASE ARCHITECTURE //012" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Data Sovereignty with Relational Databases</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">Relational databases like PostgreSQL provide ACID (Atomicity, Consistency, Isolation, Durability) guarantees across enterprise workloads. Serverless Postgres providers like Neon decouple compute from storage, allowing instance scale-to-zero capability.</p>
            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-slate-300">
              <p className="text-[#D4AF37] mb-2">// SQL Relational Schema Blueprint:</p>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT NOW()
);`}
              </pre>
            </div>
          </main>
          <PageFooter pageNum="13" />
        </div>

        {/* P14 */}
        <div className="a4-page justify-between">
          <PageHeader id="SECURITY HARDENING //013" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Row-Level Security (RLS) &amp; Zero-Trust</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">Row-Level Security enforces tenant isolation directly inside the database kernel. Even if the web server application code contains vulnerabilities, the Postgres engine physically rejects queries that violate session policies.</p>
            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-slate-300">
              <p className="text-[#D4AF37] mb-2">// Declarative Postgres RLS Policy:</p>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only view their own profile"
ON user_profiles FOR SELECT
USING (auth.uid() = user_id);`}
              </pre>
            </div>
          </main>
          <PageFooter pageNum="14" />
        </div>

        {/* P15 */}
        <div className="a4-page justify-between">
          <PageHeader id="AI WORKFLOWS //014" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">AI-Assisted Architecture &amp; Prompting</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">High-velocity architects treat AI models (Gemini, Claude, Groq) as junior pair programmers. Rather than asking AI to write unvalidated code, architects provide strict type definitions, constraints, and schemas for the AI to fill.</p>
            <div className="hud-card p-6">
              <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-2">Prompt Architecture Rules</h3>
              <ul className="space-y-2 font-inter text-xs text-slate-300">
                <li><strong className="text-white">Provide Context:</strong> Include framework versions (e.g., Next.js 15, Tailwind v4).</li>
                <li><strong className="text-white">Enforce Constraints:</strong> Specify &quot;no external libraries&quot; or &quot;use TypeScript interfaces&quot;.</li>
                <li><strong className="text-white">Request Explanation:</strong> Ask the model to justify design trade-offs before outputting code.</li>
              </ul>
            </div>
          </main>
          <PageFooter pageNum="15" />
        </div>


        {/* P16 */}
        <div className="a4-page justify-between">
          <PageHeader id="VERSION CONTROL //015" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Git Flow &amp; Version Control</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">Git maintains a directed acyclic graph (DAG) of project snapshots. Clean commit messages and strategic branch management prevent merge conflicts across enterprise teams.</p>
            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-slate-300 space-y-2">
              <p className="text-[#D4AF37]">// Standard Deployment Git Commands:</p>
              <p className="text-emerald-400">$ git checkout -b feat/sovereign-layer</p>
              <p className="text-emerald-400">$ git add .</p>
              <p className="text-emerald-400">$ git commit -m &quot;Feat: Implement RLS database policies&quot;</p>
              <p className="text-emerald-400">$ git push origin feat/sovereign-layer</p>
            </div>
          </main>
          <PageFooter pageNum="16" />
        </div>

        {/* P17 */}
        <div className="a4-page justify-between">
          <PageHeader id="SERVER ACTIONS //016" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Server Actions &amp; Zero-API Mutations</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">Next.js Server Actions allow client components to invoke asynchronous functions that execute securely on the server. This eliminates the boilerplate required to write REST or GraphQL API endpoints manually.</p>
            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-slate-300">
              <p className="text-[#D4AF37] mb-2">// Direct Database Mutation via Server Action:</p>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`"use server";

export async function updateSystemConfig(formData) {
  const configId = formData.get("configId");
  
  await db.update(configs)
    .set({ updated_at: new Date() })
    .where(eq(configs.id, configId));
}`}
              </pre>
            </div>
          </main>
          <PageFooter pageNum="17" />
        </div>

        {/* P18 */}
        <div className="a4-page justify-between">
          <PageHeader id="RAG ARCHITECTURE //017" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Retrieval-Augmented Generation (RAG)</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">RAG pipelines prevent LLM hallucinations by grounding generative models in verified private domain data. Text chunks are converted into multi-dimensional floating-point vectors and stored in vector databases for cosine-similarity retrieval.</p>
            <div className="hud-card p-6">
              <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-2">Vector Search Query (Pgvector)</h3>
              <div className="bg-[#0a0a0a] p-4 rounded border border-slate-800 font-mono text-[9px] text-emerald-400 overflow-x-auto">
                SELECT content, 1 - (embedding &lt;=&gt; query_embedding) AS similarity FROM document_vectors WHERE 1 - (embedding &lt;=&gt; query_embedding) &gt; 0.85 ORDER BY similarity DESC LIMIT 5;
              </div>
            </div>
          </main>
          <PageFooter pageNum="18" />
        </div>

        {/* P19 */}
        <div className="a4-page justify-between">
          <PageHeader id="CI/CD PIPELINES //018" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Continuous Integration &amp; Deployment</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">High-velocity software engineering requires automated quality gates. Every GitHub pull request triggers isolated preview environments where unit tests, type-checking, and static analysis execute before merging into production branches.</p>
            <div className="grid grid-cols-2 gap-4 font-inter text-xs">
              <div className="hud-card p-5"><p className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase mb-1">Pre-Commit Gates</p><p className="text-slate-300 text-[11px] leading-relaxed">ESLint, Prettier auto-format, and Husky pre-commit hooks enforce team syntax consistency.</p></div>
              <div className="hud-card p-5"><p className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase mb-1">Automated Build Verification</p><p className="text-slate-300 text-[11px] leading-relaxed">Vercel and GitHub Actions run Next.js production builds to catch prerender errors before traffic hits users.</p></div>
            </div>
          </main>
          <PageFooter pageNum="19" />
        </div>

        {/* P20 */}
        <div className="a4-page justify-between">
          <PageHeader id="EDGE INFRASTRUCTURE //019" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Global CDN &amp; Edge Runtime Distribution</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">Deploying on the Vercel Edge Network places serverless execution nodes in over 300 data centers worldwide. Users connect to the geographically closest node, cutting sub-second network round-trip delays.</p>
            <div className="hud-card p-6">
              <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-2">Stale-While-Revalidate Caching</h3>
              <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">By specifying HTTP <code className="text-white font-mono">Cache-Control: s-maxage=1, stale-while-revalidate=59</code> headers, edge nodes serve cached static responses instantly while background workers re-validate dynamic content seamlessly.</p>
            </div>
          </main>
          <PageFooter pageNum="20" />
        </div>

        {/* P21 */}
        <div className="a4-page justify-between">
          <PageHeader id="SYSTEM SCHEMATIC //020" />
          <main className="grow flex flex-col justify-center space-y-8">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest text-center">Next.js Edge Request Lifecycle</h2>
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="w-full p-3 bg-white/5 border border-white/20 text-center font-mono text-xs text-white">Client Interface (Mobile / Browser)</div>
              <div className="h-4 w-px bg-[#D4AF37]"></div>
              <div className="w-full p-4 bg-[#0A0A0A] border-2 border-[#D4AF37] text-center font-mono text-xs text-[#D4AF37]">Vercel Edge Network (Route Match &amp; Cache Check)</div>
              <div className="h-4 w-px bg-[#D4AF37]"></div>
              <div className="w-full p-4 bg-emerald-950/30 border border-emerald-500 text-center font-mono text-xs text-emerald-300">Server Action / React Server Component</div>
              <div className="h-4 w-px bg-[#D4AF37]"></div>
              <div className="w-full p-3 bg-white/5 border border-white/20 text-center font-mono text-xs text-white">Neon / Supabase Postgres (RLS Enforcement)</div>
            </div>
          </main>
          <PageFooter pageNum="21" />
        </div>

        {/* P22 */}
        <div className="a4-page justify-between">
          <PageHeader id="CASE STUDY 01 // AUTOAM" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Autoam: Real-Time Geospatial Logistics</h2>
            <div className="hud-card p-6">
              <p className="font-mono text-[10px] text-[#D4AF37] uppercase font-bold mb-2">Architectural Problem</p>
              <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">Automotive emergency marketplaces require matching distressed drivers with the nearest verified mechanics in under 2 seconds, even in low-network cellular zones across African metropolitan centers.</p>
            </div>
            <div className="hud-card p-6">
              <p className="font-mono text-[10px] text-[#D4AF37] uppercase font-bold mb-2">Sovereign Solution</p>
              <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">Architected an Offline-First geospatial matching engine powered by PostgreSQL PostGIS spatial indexing, WatermelonDB client-side local caching, and WebSockets for sub-200ms bid propagation.</p>
            </div>
          </main>
          <PageFooter pageNum="22" />
        </div>

        {/* P23 */}
        <div className="a4-page justify-between">
          <PageHeader id="CASE STUDY 02 // FRP ORACLE" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">FRP: Cryptographic Media Oracle</h2>
            <div className="hud-card p-6">
              <p className="font-mono text-[10px] text-[#D4AF37] uppercase font-bold mb-2">Architectural Problem</p>
              <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">Deepfakes and AI-generated synthetic media threaten digital insurance claims and news integrity. Traditional visual inspection cannot reliably detect spatial-temporal tampering.</p>
            </div>
            <div className="hud-card p-6">
              <p className="font-mono text-[10px] text-[#D4AF37] uppercase font-bold mb-2">Sovereign Solution</p>
              <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">Designed a 4-Plane evidence verification chain combining 128KB binary header hex scanning, astronomical SunCalc solar altitude cross-validation, and secp256k1 ECDSA cryptographic seals.</p>
            </div>
          </main>
          <PageFooter pageNum="23" />
        </div>


        {/* P24 */}
        <div className="a4-page justify-between">
          <PageHeader id="CASE STUDY 03 // HEIRSGUARD" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">HeirsGuard Vision: AI Claims Engine</h2>
            <div className="hud-card p-6">
              <p className="font-mono text-[10px] text-[#D4AF37] uppercase font-bold mb-2">Architectural Problem</p>
              <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">Motor insurance claims in developing markets average 14 days of bureaucratic delays, manual damage inspection, and high administrative overhead.</p>
            </div>
            <div className="hud-card p-6">
              <p className="font-mono text-[10px] text-[#D4AF37] uppercase font-bold mb-2">Sovereign Solution</p>
              <p className="font-inter text-xs text-slate-300 leading-relaxed text-justify">Engineered an Azure-native AI claims processing pipeline that analyzes damage via Computer Vision, interprets insurance policy PDFs via RAG (GPT-4o), and triggers instant payouts in under 5 minutes.</p>
            </div>
          </main>
          <PageFooter pageNum="24" />
        </div>

        {/* P25 */}
        <div className="a4-page justify-between">
          <PageHeader id="AI PROMPT ARCHITECTURE //024" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Gemini &amp; Claude 3.5 Sonnet Workflows</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">Modern architects leverage frontier models (Gemini 1.5 Pro, Claude 3.5 Sonnet) within AI-native editors like Cursor IDE to write, refactor, and audit production code at 10x velocity.</p>
            <div className="hud-card p-6">
              <h3 className="font-mono text-xs font-bold text-[#D4AF37] uppercase mb-2">The 3-Step AI Engineering Protocol</h3>
              <div className="space-y-3 font-inter text-xs text-slate-300">
                <p><strong>1. Schema First:</strong> Define TypeScript interfaces or SQL schemas before asking the model to write functions.</p>
                <p><strong>2. Context Injection:</strong> Pass relevant documentation snippets and framework versions directly into the prompt context window.</p>
                <p><strong>3. Deterministic Validation:</strong> Run automated type-checking and unit tests to verify AI output before committing.</p>
              </div>
            </div>
          </main>
          <PageFooter pageNum="25" />
        </div>

        {/* P26 */}
        <div className="a4-page justify-between">
          <PageHeader id="PERFORMANCE OPTIMIZATION //025" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Core Web Vitals &amp; Asset Optimization</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">Achieving 100/100 Lighthouse scores requires optimizing Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). Next.js provides automatic font, script, and image optimization engines.</p>
            <div className="grid grid-cols-2 gap-4 font-inter text-xs">
              <div className="hud-card p-5"><p className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase mb-1">Font Optimization</p><p className="text-slate-300 text-[11px] leading-relaxed"><code className="text-white">next/font</code> automatically inline-hosts Google Fonts at build time, eliminating external network round trips.</p></div>
              <div className="hud-card p-5"><p className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase mb-1">AVIF Image Encoding</p><p className="text-slate-300 text-[11px] leading-relaxed"><code className="text-white">next/image</code> serves modern AVIF and WebP formats dynamically based on client browser user-agent headers.</p></div>
            </div>
          </main>
          <PageFooter pageNum="26" />
        </div>

        {/* P27 */}
        <div className="a4-page justify-between">
          <PageHeader id="SYSTEM RESILIENCE //026" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">Fault Tolerance &amp; Graceful Degradation</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">Production infrastructure must gracefully handle downstream service outages. React Error Boundaries catch unhandled component exceptions, preventing white-screen crashes and presenting localized fallback UIs.</p>
            <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded font-mono text-[10px] text-slate-300">
              <p className="text-[#D4AF37] mb-2">// Next.js Error Boundary (error.js):</p>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`"use client";

export default function ErrorBoundary({ error, reset }) {
  return (
    <div className="p-8 bg-red-950/20 border border-red-500">
      <h2>System Exception Detected</h2>
      <button onClick={() => reset()}>Re-initialize State</button>
    </div>
  );
}`}
              </pre>
            </div>
          </main>
          <PageFooter pageNum="27" />
        </div>

        {/* P28 */}
        <div className="a4-page justify-between">
          <PageHeader id="SECURITY COMPLIANCE //027" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest">SOC2 &amp; OWASP Security Standards</h2>
            <p className="font-inter text-xs leading-relaxed text-slate-300 text-justify">Securing web applications requires mitigating OWASP Top 10 vulnerabilities. Security headers, Cross-Origin Resource Sharing (CORS) policies, and Content Security Policies (CSP) are enforced at the Edge network layer.</p>
            <div className="hud-card p-6 space-y-3 font-inter text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2"><span className="font-bold text-white">X-Frame-Options:</span><span className="font-mono text-emerald-400">DENY (Clickjacking Defense)</span></div>
              <div className="flex justify-between border-b border-white/10 pb-2"><span className="font-bold text-white">X-Content-Type-Options:</span><span className="font-mono text-emerald-400">nosniff (MIME Sniffing Defense)</span></div>
              <div className="flex justify-between"><span className="font-bold text-white">Strict-Transport-Security:</span><span className="font-mono text-emerald-400">max-age=63072000; includeSubDomains</span></div>
            </div>
          </main>
          <PageFooter pageNum="28" />
        </div>

        {/* P29 */}
        <div className="a4-page justify-between">
          <PageHeader id="ARCHITECT CONCLUSION //028" />
          <main className="grow flex flex-col justify-center space-y-6">
            <h2 className="font-playfair text-3xl font-black text-white uppercase tracking-widest border-b border-[#D4AF37]/30 pb-4">The Sovereign Path</h2>
            <p className="font-inter text-xs leading-[2] text-slate-300 text-justify">Engineering excellence is not achieved by chance. It is the result of relentless discipline, deterministic system design, and the continuous refinement of architectural patterns.</p>
            <p className="font-inter text-xs leading-[2] text-slate-300 text-justify">By mastering the foundations—from semantic HTML and CSS geometry to asynchronous execution loops, Next.js Server Components, PostgreSQL RLS, and AI pair-programming—you transition from a passive consumer of technology into a Sovereign System Architect.</p>
            <div className="hud-card p-6 bg-white/5 border border-[#D4AF37]">
              <p className="font-playfair text-sm italic text-white leading-relaxed">&ldquo;Building high-performance software is an act of craftsmanship. Treat every component, schema, and API route as an enduring asset.&rdquo;</p>
            </div>
          </main>
          <PageFooter pageNum="29" />
        </div>

        {/* P30 */}
        <div className="a4-page justify-between">
          <PageHeader id="TITANIUM SEAL //029" />
          <main className="grow flex flex-col justify-center items-center text-center relative z-10 space-y-8">
            <div className="hud-card p-10 border-4 border-[#D4AF37] w-full max-w-lg bg-black shadow-[0_0_50px_rgba(212,175,55,0.2)]">
              <div className="flex items-center justify-center gap-4 mb-8">
                <Shield size={40} className="text-[#D4AF37]" />
                <div className="text-left">
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Architectural Verification</p>
                  <p className="font-inter text-xl font-black text-white uppercase tracking-widest">Master Specification Signed</p>
                </div>
              </div>
              <div className="space-y-6 font-mono text-sm text-slate-300 text-left border-t border-white/10 pt-6">
                <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-slate-500">Document:</span><span className="text-white font-bold">ELSOC-2026-COMPENDIUM</span></div>
                <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-slate-500">Principal Architect:</span><span className="font-inter font-black text-white uppercase">Bolu Adeoye</span></div>
                <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-slate-500">Organization:</span><span className="text-[#D4AF37] font-bold">Titanium Dynamics</span></div>
                <div className="flex justify-between pt-2"><span className="text-slate-500">System Hash:</span><span className="text-emerald-400">SHA256: 9f8c...3a1b02d</span></div>
              </div>
            </div>
            <div className="text-center font-mono text-[9px] text-slate-500 uppercase tracking-widest">END OF MASTER SPECIFICATION // VOL. 1</div>
          </main>
          <PageFooter pageNum="30" />
        </div>

      </div>
    </div>
  );
}

function PageHeader({ id }) {
  return (
    <header className="border-b border-[#D4AF37]/30 pb-3 mb-6 flex justify-between items-end relative z-10">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-[#D4AF37] flex items-center justify-center text-black font-black text-[8px]">TD</div>
        <span className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-widest">{id}</span>
      </div>
      <Hexagon size={14} className="text-[#D4AF37]/50" />
    </header>
  );
}

function PageFooter({ pageNum }) {
  return (
    <footer className="border-t border-[#D4AF37]/30 pt-3 mt-auto flex justify-between items-center relative z-10 bg-[#050505]">
      <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-500">CONFIDENTIAL // TITANIUM DYNAMICS // SPECIFICATION</span>
      <span className="font-mono text-[9px] font-bold text-[#D4AF37] uppercase">PAGE {pageNum} OF 30</span>
    </footer>
  );
}
