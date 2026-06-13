"use client";
import { useState, useEffect } from "react";
import { 
  Download, Server, Cpu, ShieldAlert, Activity, 
  Terminal, Network, Lock, Zap, Hexagon, FileCode2,
  AlertTriangle, CheckCircle2, Crosshair, Database
} from "lucide-react";

export default function CoreNodeManual() {
  const [isReady, setIsReady] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    const steps = ["INITIALIZING TITANIUM PROTOCOL...", "RENDERING HARDWARE SCHEMATICS...", "COMPILING TROUBLESHOOTING MATRIX...", "MANUAL_READY"];
    if (loadingStep < steps.length) {
      const timer = setTimeout(() => setLoadingStep(prev => prev + 1), 600);
      return () => clearTimeout(timer);
    } else {
      setIsReady(true);
    }
  }, [loadingStep]);

  const handlePrint = () => {
    document.title = "TD_CORE_NODE_MANUAL_V1";
    window.print();
  };

  return (
    <div className="min-h-screen bg-black font-sans text-slate-300 selection:bg-amber-500/30 selection:text-amber-400">
      
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #050505 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; counter-reset: pageCounter; }
          body * { visibility: hidden; }
          #manual-render, #manual-render * { visibility: visible; }
          #manual-render { position: absolute; left: 0; top: 0; width: 100%; background: #050505; }
          .a4-page { height: 297mm; width: 210mm; page-break-after: always; position: relative; background-color: #050505; box-sizing: border-box; overflow: hidden; }
          .page-num::after { counter-increment: pageCounter; content: counter(pageCounter); }
          .no-print { display: none !important; }
          
          .watermark {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg);
            font-family: 'Inter', sans-serif; font-size: 100px; font-weight: 900;
            color: rgba(255, 255, 255, 0.02); white-space: nowrap; pointer-events: none; z-index: 0;
          }
        }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .hud-card { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(245, 158, 11, 0.2); border-left: 4px solid #F59E0B; }
        .tech-grid { background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 20px 20px; }
      `}</style>

      {/* === VIEW 1: OBSIDIAN PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black"></div>
        
        <div className="relative z-10 w-full max-w-md border border-amber-500/30 bg-black/50 backdrop-blur-xl p-10 text-center shadow-[0_0_50px_-10px_rgba(245,158,11,0.2)]">
          <div className="w-24 h-24 mx-auto mb-8 relative flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-amber-500/50 rounded-sm animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-2 border border-slate-500/30 rounded-sm animate-[spin_5s_linear_infinite_reverse]"></div>
            <Server size={40} className="text-amber-400" />
          </div>

          <h1 className="font-inter text-2xl font-black text-white mb-2 tracking-widest uppercase">Core-Node Manual</h1>
          <p className="font-mono text-amber-500 text-[10px] mb-8 tracking-[0.3em]">TITANIUM DYNAMICS // TD-2026</p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-amber-950/20 p-6 border-l-2 border-amber-500 font-mono text-[10px] text-amber-400 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; {loadingStep >= 1 ? "RENDERING HARDWARE SCHEMATICS..." : "..."}</p>
              <p className="opacity-75">&gt; {loadingStep >= 2 ? "COMPILING TROUBLESHOOTING MATRIX..." : "..."}</p>
              <p className="text-white font-bold animate-pulse">&gt; {loadingStep >= 3 ? "MANUAL_READY" : "..."}</p>
            </div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500 text-amber-400 font-mono font-bold py-4 uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Download size={18} />
              Extract Technical Dossier
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE MANUAL (Print) === */}
      <div id="manual-render" className="hidden print:block text-slate-300">
        
        {/* PAGE 1: INDUSTRIAL COVER */}
        <div className="a4-page flex flex-col p-[20mm] tech-grid">
          <div className="watermark">RESTRICTED ACCESS</div>
          <header className="flex justify-between items-start relative z-10">
            <div className="w-12 h-12 bg-amber-500 flex items-center justify-center text-black font-black text-xl">TD</div>
            <div className="text-right">
              <p className="font-mono text-[8px] text-slate-500 tracking-[0.4em] mb-1">DOCUMENT ID</p>
              <h2 className="font-mono text-sm font-bold text-white tracking-widest">TD-CORE-2026-V1</h2>
            </div>
          </header>

          <main className="grow flex flex-col justify-center relative z-10">
            {/* CSS Exploded View Diagram */}
            <div className="relative w-full h-64 mb-12 flex items-center justify-center">
              <div className="absolute w-48 h-48 border border-amber-500/30 transform rotate-45"></div>
              <div className="absolute w-40 h-40 border-2 border-amber-500/50 transform rotate-45"></div>
              <div className="absolute w-32 h-32 bg-black border-4 border-amber-500 transform rotate-45 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                <Cpu size={40} className="text-amber-400 -rotate-45" />
              </div>
              {/* HUD Lines */}
              <div className="absolute top-10 left-10 w-32 h-px bg-slate-500"></div>
              <div className="absolute bottom-10 right-10 w-32 h-px bg-slate-500"></div>
            </div>

            <p className="font-mono text-xs text-amber-500 tracking-[0.4em] mb-4 uppercase">Hardware & Software Integration Guide</p>
            <h1 className="font-inter text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
              Sovereign<br/>AI Inference<br/>Node
            </h1>
            <div className="h-1 w-32 bg-amber-500 mb-8"></div>
            <p className="font-inter text-sm text-slate-400 max-w-md leading-relaxed">
              The definitive installation, configuration, and troubleshooting manual for the Titanium Dynamics Core-Node. Designed for sub-200ms latency and Zero-Trust environments.
            </p>
          </main>
          <Footer />
        </div>

        {/* PAGE 2: SYSTEM SPECIFICATIONS */}
        <div className="a4-page flex flex-col p-[20mm]">
          <div className="watermark">RESTRICTED ACCESS</div>
          <Header title="TD-CORE-2026-V1 // SECTION 1.0" />
          <main className="grow relative z-10">
            <h2 className="font-inter text-3xl font-black text-white uppercase tracking-widest mb-10">1.0 System Specifications</h2>
            
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="hud-card p-6">
                <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">Architecture</p>
                <p className="font-inter text-lg font-bold text-white">Groq LPU + Next.js Edge</p>
              </div>
              <div className="hud-card p-6">
                <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">Security Layer</p>
                <p className="font-inter text-lg font-bold text-white">Neon Postgres RLS</p>
              </div>
            </div>

            <h3 className="font-mono text-xs font-bold text-amber-400 uppercase mb-4">Performance Matrix</h3>
            <table className="w-full text-left border-collapse mb-10">
              <thead>
                <tr className="border-b-2 border-amber-500 font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                  <th className="py-3">Metric</th>
                  <th className="py-3">Threshold</th>
                  <th className="py-3">Peak Load</th>
                </tr>
              </thead>
              <tbody className="font-inter text-sm text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="py-4 font-bold text-white">Inference Latency</td>
                  <td className="py-4 text-amber-400 font-mono">&lt; 200ms</td>
                  <td className="py-4">450ms (99th Percentile)</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-4 font-bold text-white">Throughput</td>
                  <td className="py-4 text-amber-400 font-mono">800 Tokens/sec</td>
                  <td className="py-4">1,200 Tokens/sec</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-4 font-bold text-white">Power Draw</td>
                  <td className="py-4 text-amber-400 font-mono">45W Idle</td>
                  <td className="py-4">320W Active</td>
                </tr>
              </tbody>
            </table>
          </main>
          <Footer />
        </div>

        {/* PAGE 3: HARDWARE ANATOMY */}
        <div className="a4-page flex flex-col p-[20mm]">
          <div className="watermark">RESTRICTED ACCESS</div>
          <Header title="TD-CORE-2026-V1 // SECTION 2.0" />
          <main className="grow relative z-10">
            <h2 className="font-inter text-3xl font-black text-white uppercase tracking-widest mb-10">2.0 Hardware Anatomy</h2>
            
            {/* CSS Hardware Diagram */}
            <div className="relative w-full h-80 border border-slate-800 bg-[#0a0a0a] mb-10 flex items-center justify-center">
              {/* The Chassis */}
              <div className="w-3/4 h-48 border-2 border-slate-600 bg-black relative flex flex-col justify-between p-4">
                {/* Heat Sinks */}
                <div className="flex justify-between w-full">
                  <div className="w-1/3 h-12 bg-slate-800 border border-slate-600 flex items-center justify-center font-mono text-[8px] text-slate-400">LPU_CORE_01</div>
                  <div className="w-1/3 h-12 bg-slate-800 border border-slate-600 flex items-center justify-center font-mono text-[8px] text-slate-400">LPU_CORE_02</div>
                </div>
                {/* Ports */}
                <div className="flex gap-2 w-full justify-end">
                  <div className="w-8 h-4 bg-amber-500/20 border border-amber-500"></div>
                  <div className="w-8 h-4 bg-amber-500/20 border border-amber-500"></div>
                  <div className="w-12 h-4 bg-blue-500/20 border border-blue-500"></div>
                </div>
              </div>
              
              {/* HUD Labels */}
              <div className="absolute top-10 left-10 font-mono text-[10px] text-amber-400 flex items-center gap-2">
                <span>&lt;</span> Groq Tensor Cores
              </div>
              <div className="absolute bottom-10 right-10 font-mono text-[10px] text-blue-400 flex items-center gap-2">
                10GbE Uplink <span>&gt;</span>
              </div>
            </div>

            <div className="hud-card p-6">
              <p className="font-inter text-sm leading-relaxed text-slate-300">
                The chassis is designed for zero-thermal-throttling. Ensure the 10GbE Uplink is connected directly to the primary switch to avoid packet collision during high-entropy inference tasks.
              </p>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 4: INSTALLATION PROTOCOL */}
        <div className="a4-page flex flex-col p-[20mm]">
          <div className="watermark">RESTRICTED ACCESS</div>
          <Header title="TD-CORE-2026-V1 // SECTION 3.0" />
          <main className="grow relative z-10">
            <h2 className="font-inter text-3xl font-black text-white uppercase tracking-widest mb-8">3.0 Installation Protocol</h2>
            
            <p className="font-inter text-sm text-slate-300 mb-8">
              Execute the following commands in a secure Linux environment (Ubuntu 24.04 LTS or Termux Subsystem) to initialize the node.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-xs font-bold text-amber-400 uppercase mb-2">Step 1: Clone the Sovereign Repository</h3>
                <div className="bg-[#0a0a0a] border border-slate-800 p-4 rounded font-mono text-[10px] text-emerald-400">
                  $ git clone https://github.com/titanium-dynamics/core-node.git<br/>
                  $ cd core-node
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs font-bold text-amber-400 uppercase mb-2">Step 2: Inject Cryptographic Keys</h3>
                <div className="bg-[#0a0a0a] border border-slate-800 p-4 rounded font-mono text-[10px] text-emerald-400">
                  $ cp .env.example .env.local<br/>
                  $ nano .env.local<br/>
                  <span className="text-slate-500"># Insert GROQ_API_KEY and NEON_DATABASE_URL</span>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs font-bold text-amber-400 uppercase mb-2">Step 3: Ignite the Engine</h3>
                <div className="bg-[#0a0a0a] border border-slate-800 p-4 rounded font-mono text-[10px] text-emerald-400">
                  $ npm install --legacy-peer-deps<br/>
                  $ npm run build<br/>
                  $ npm run start
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 5: THE LOGIC ENGINE */}
        <div className="a4-page flex flex-col p-[20mm]">
          <div className="watermark">RESTRICTED ACCESS</div>
          <Header title="TD-CORE-2026-V1 // SECTION 4.0" />
          <main className="grow relative z-10">
            <h2 className="font-inter text-3xl font-black text-white uppercase tracking-widest mb-10">4.0 The Logic Engine</h2>
            
            {/* CSS Nervous System Diagram */}
            <div className="flex flex-col items-center gap-4 mb-10">
              <div className="w-full p-4 border border-slate-700 bg-slate-900 text-center font-mono text-xs text-white uppercase">Client Request (Edge)</div>
              <div className="h-8 w-px bg-amber-500"></div>
              <div className="w-full p-6 border-2 border-amber-500 bg-amber-950/20 text-center rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Cpu size={32} className="mx-auto text-amber-400 mb-2"/>
                <h3 className="font-black text-lg text-white uppercase">Groq LPU Inference</h3>
                <p className="font-mono text-[10px] text-amber-500 mt-1">Deterministic JSON Manifest</p>
              </div>
              <div className="h-8 w-px bg-amber-500"></div>
              <div className="w-full p-4 border border-slate-700 bg-slate-900 text-center font-mono text-xs text-white uppercase">Neon RLS Database</div>
            </div>

            <div className="hud-card p-6">
              <p className="font-inter text-sm leading-relaxed text-slate-300">
                The logic engine bypasses traditional REST bottlenecks. By utilizing the Groq LPU, we force the LLM to output strict JSON schemas, which are immediately validated and piped into the Neon database.
              </p>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 6: CONFIGURATION SCHEMAS */}
        <div className="a4-page flex flex-col p-[20mm]">
          <div className="watermark">RESTRICTED ACCESS</div>
          <Header title="TD-CORE-2026-V1 // SECTION 5.0" />
          <main className="grow relative z-10">
            <h2 className="font-inter text-3xl font-black text-white uppercase tracking-widest mb-8">5.0 Configuration Schemas</h2>
            
            <p className="font-inter text-sm text-slate-300 mb-6">
              The node requires a strict JSON-LD configuration file to establish its identity on the network.
            </p>

            <div className="bg-[#0a0a0a] border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                <FileCode2 size={14} className="text-amber-500"/>
                <span className="font-mono text-[10px] text-slate-400">node-config.json</span>
              </div>
              <pre className="p-6 font-mono text-[10px] leading-relaxed text-slate-300 overflow-x-auto">
{`{
  "node_id": "TD-CORE-ALPHA",
  "region": "us-east-1",
  "inference_engine": {
    "model": "llama3-70b-8192",
    "temperature": 0.0,
    "max_tokens": 1024
  },
  "security": {
    "require_tls": true,
    "rls_enabled": true,
    "allowed_ips": ["10.0.0.0/8"]
  }
}`}
              </pre>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 7: SECURITY HARDENING */}
        <div className="a4-page flex flex-col p-[20mm]">
          <div className="watermark">RESTRICTED ACCESS</div>
          <Header title="TD-CORE-2026-V1 // SECTION 6.0" />
          <main className="grow relative z-10">
            <h2 className="font-inter text-3xl font-black text-white uppercase tracking-widest mb-8">6.0 Security Hardening</h2>
            
            <div className="space-y-8">
              <div className="hud-card p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <h3 className="font-mono text-sm font-bold text-white mb-2 uppercase flex items-center gap-2"><Lock size={16} className="text-red-500"/> Zero-Trust Architecture</h3>
                <p className="font-inter text-sm leading-relaxed text-slate-400">
                  The node operates on a "Verify, then Trust" model. Every incoming request must carry a valid JWT signed by the Master Oracle. Unsigned requests are dropped at the Edge (Cloudflare WAF) before reaching the Node.
                </p>
              </div>

              <div className="hud-card p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <h3 className="font-mono text-sm font-bold text-white mb-2 uppercase flex items-center gap-2"><Database size={16} className="text-blue-500"/> Neon RLS Integration</h3>
                <p className="font-inter text-sm leading-relaxed text-slate-400">
                  Row-Level Security (RLS) is enforced at the database level. Even if the application layer is compromised, the attacker cannot query data belonging to other tenants. The database physically rejects unauthorized `SELECT` statements.
                </p>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 8: TROUBLESHOOTING MATRIX */}
        <div className="a4-page flex flex-col p-[20mm]">
          <div className="watermark">RESTRICTED ACCESS</div>
          <Header title="TD-CORE-2026-V1 // SECTION 7.0" />
          <main className="grow relative z-10">
            <h2 className="font-inter text-3xl font-black text-white uppercase tracking-widest mb-10">7.0 Troubleshooting Matrix</h2>
            
            {/* CSS Decision Tree */}
            <div className="flex flex-col items-center gap-2 mb-10">
              <div className="p-3 bg-red-950/30 border border-red-500 text-red-400 font-mono text-[10px] uppercase">System Fault Detected</div>
              <div className="h-4 w-px bg-slate-600"></div>
              
              <div className="flex gap-16 relative">
                {/* Horizontal connector */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-slate-600"></div>
                
                <div className="flex flex-col items-center">
                  <div className="h-4 w-px bg-slate-600"></div>
                  <div className="p-3 bg-slate-900 border border-slate-700 font-mono text-[10px] text-white">Error 401 / 403</div>
                  <div className="h-4 w-px bg-slate-600"></div>
                  <div className="p-3 bg-blue-950/30 border border-blue-500 text-blue-400 font-mono text-[8px] text-center w-32">Check JWT Token &<br/>Auth Headers</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="h-4 w-px bg-slate-600"></div>
                  <div className="p-3 bg-slate-900 border border-slate-700 font-mono text-[10px] text-white">Error 500 / 504</div>
                  <div className="h-4 w-px bg-slate-600"></div>
                  <div className="p-3 bg-amber-950/30 border border-amber-500 text-amber-400 font-mono text-[8px] text-center w-32">Check Groq API Key &<br/>Rate Limits</div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 9: MAINTENANCE & SCALING */}
        <div className="a4-page flex flex-col p-[20mm]">
          <div className="watermark">RESTRICTED ACCESS</div>
          <Header title="TD-CORE-2026-V1 // SECTION 8.0" />
          <main className="grow relative z-10">
            <h2 className="font-inter text-3xl font-black text-white uppercase tracking-widest mb-8">8.0 Maintenance & Scaling</h2>
            
            <div className="hud-card p-6 mb-8">
              <h3 className="font-mono text-sm font-bold text-amber-400 uppercase mb-2">Horizontal Clustering</h3>
              <p className="font-inter text-sm leading-relaxed text-slate-300">
                When inference load exceeds 1,200 tokens/sec, the system must be clustered. Deploy additional nodes across Vercel Edge regions (e.g., `iad1`, `fra1`) and route traffic using Cloudflare Load Balancing.
              </p>
            </div>

            <div className="hud-card p-6">
              <h3 className="font-mono text-sm font-bold text-amber-400 uppercase mb-2">Database Connection Pooling</h3>
              <p className="font-inter text-sm leading-relaxed text-slate-300">
                Do not connect directly to Postgres during high-scale events. Utilize Supabase PgBouncer to manage connection limits and prevent database exhaustion.
              </p>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 10: THE ARCHITECT'S SEAL */}
        <div className="a4-page flex flex-col p-[20mm]">
          <div className="watermark">RESTRICTED ACCESS</div>
          <Header title="TD-CORE-2026-V1 // APPROVAL" />
          <main className="grow flex flex-col justify-center relative z-10">
            
            <div className="iso-card p-10 border-t-4 border-amber-500 bg-black">
              <div className="flex items-center gap-4 mb-10">
                <ShieldAlert size={40} className="text-amber-500" />
                <div>
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Status</p>
                  <p className="font-inter text-2xl font-black text-white uppercase tracking-widest">System Verified</p>
                </div>
              </div>

              <div className="space-y-6 font-mono text-sm text-slate-300">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Date:</span>
                  <span className="text-white">March 13, 2026</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Architect:</span>
                  <span className="font-inter font-black text-white uppercase tracking-widest">Bolu Adeoye</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Organization:</span>
                  <span className="text-white">Titanium Dynamics</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">System Hash:</span>
                  <span className="text-amber-400">SHA256: 8f3c9a2b...e4d1f0b9</span>
                </div>
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
    <header className="border-b border-amber-500/30 pb-4 mb-8 flex justify-between items-end relative z-10">
      <h2 className="font-mono text-[10px] font-bold text-amber-500 tracking-widest">{title}</h2>
      <Hexagon className="text-amber-500/50" size={16} />
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-amber-500/30 pt-4 mt-auto flex justify-between items-center relative z-10 bg-black">
      <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-500">
        CONFIDENTIAL // TITANIUM DYNAMICS // PAGE <span className="page-num text-amber-500"></span>
      </span>
      <div className="flex gap-1">
        <div className="w-1 h-1 bg-amber-500"></div>
        <div className="w-1 h-1 bg-amber-500/50"></div>
      </div>
    </footer>
  );
}
