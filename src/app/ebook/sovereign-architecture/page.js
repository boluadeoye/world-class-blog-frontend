"use client";
import { useState, useEffect } from "react";
import { 
  Download, BookOpen, Layers, Cpu, Shield, Zap, 
  Globe, Database, Server, Activity, CheckCircle2, 
  Eye, Box, Microscope, BarChart3
} from "lucide-react";
import Link from "next/link";

export default function SovereignEbook() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1500);
  }, []);

  const handlePrint = () => {
    document.title = "SOVEREIGN_ARCHITECTURE_MANUAL_VOL1";
    window.print();
  };

  const pages = [
    { type: 'cover', title: "The Sovereign Architecture", subtitle: "High-Performance Agentic Systems for Global Scale" },
    { type: 'toc', items: ["The Death of Full Stack", "Legacy vs. Sovereign", "The 200ms Threshold", "Next.js 15 & Edge", "Inference Pipeline", "Data Sovereignty", "Case Study: Autoam", "Geospatial Engine", "Case Study: HeirsGuard", "Vision Pipeline", "Scaling to 100k", "Conclusion"] },
    { type: 'text', title: "01. Executive Foreword", content: "In 2026, speed is the only metric that matters. Monolithic architectures are dead. We are entering the age of 'Sovereign Systems'—autonomous, high-performance infrastructures that live at the Edge. This manual outlines the blueprint for sub-200ms inference and Zero-Trust security." },
    { type: 'text', title: "02. The Death of Full Stack", content: "Traditional REST APIs are too slow for Agentic AI. The round-trip latency of a standard request-response cycle kills the user experience of conversational interfaces. We move logic to the Edge to survive." },
    { type: 'diagram', title: "03. Architecture Comparison", diagramType: 'comparison' },
    { type: 'text', title: "04. The 200ms Threshold", content: "Human perception of 'instant' is 200ms. Anything slower breaks the flow state. Our architecture is optimized for P95 latency well below this threshold using Groq LPU and Vercel Edge Functions." },
    { type: 'text', title: "05. Next.js 15 & The Edge", content: "We leverage React Server Components (RSC) to eliminate client-side bloat. By streaming UI directly from the Edge, we achieve FCP scores that rival native applications." },
    { type: 'diagram', title: "06. The Inference Pipeline", diagramType: 'inference' },
    { type: 'text', title: "07. Data Sovereignty (RLS)", content: "Security cannot be an afterthought. We implement Row-Level Security (RLS) directly in Neon Postgres. This ensures that even if the API is compromised, the data remains segregated." },
    { type: 'text', title: "08. Case Study: Autoam", content: "Autoam required a geospatial matching engine capable of connecting drivers and mechanics in under 2 seconds. We utilized PostGIS and WebSockets to build a real-time, offline-first logistics network." },
    { type: 'diagram', title: "09. Geospatial Engine", diagramType: 'geo' },
    { type: 'text', title: "10. Case Study: HeirsGuard", content: "For HeirsGuard, we reduced insurance claim processing from 14 days to 5 minutes. This required a multi-modal AI pipeline combining Computer Vision for damage assessment and LLMs for policy verification." },
    { type: 'diagram', title: "11. Vision Pipeline", diagramType: 'vision' },
    { type: 'text', title: "12. Scaling to 100k Nodes", content: "Horizontal scaling is achieved via Serverless isolation. Each function runs in its own ephemeral container, allowing the system to handle massive concurrency spikes without provisioning permanent infrastructure." },
    { type: 'signature', title: "13. The Architect's Conclusion", content: "The systems we build today will define the operational velocity of the next decade. We are ready to build." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body * { visibility: hidden; }
          #ebook-container, #ebook-container * { visibility: visible; }
          #ebook-container { position: absolute; left: 0; top: 0; width: 100%; }
          .page { height: 297mm; width: 210mm; position: relative; page-break-after: always; overflow: hidden; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* === VIEW 1: PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950"></div>
        <div className="relative z-10 max-w-md w-full text-center">
          <div className="mb-8 perspective-[1000px]">
            <div className="w-48 h-64 bg-blue-950 mx-auto shadow-2xl border-l-8 border-blue-800 transform rotate-y-[-15deg] flex items-center justify-center">
              <Layers size={64} className="text-white opacity-50" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-white mb-2 uppercase">Sovereign Architecture</h1>
          <p className="text-blue-400 text-xs font-mono mb-8">15-PAGE TECHNICAL COMPENDIUM</p>
          {!isReady ? (
            <div className="text-blue-500 font-mono text-xs animate-pulse">COMPILING ASSETS...</div>
          ) : (
            <button onClick={handlePrint} className="w-full bg-white text-blue-950 font-black py-4 rounded uppercase tracking-widest hover:bg-blue-50 transition-all">
              Download Manual (PDF)
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: EBOOK PAGES === */}
      <div id="ebook-container" className="hidden print:block bg-white text-blue-950">
        {pages.map((page, index) => (
          <div key={index} className="page flex flex-col">
            
            {/* HEADER (Skip for Cover) */}
            {page.type !== 'cover' && (
              <header className="h-[20mm] px-[15mm] flex items-end justify-between border-b-2 border-slate-100">
                <span className="text-[10px] font-black uppercase text-slate-400">Sovereign Architecture // Vol. 1</span>
                <span className="text-[10px] font-black uppercase text-blue-950">Page {index + 1}</span>
              </header>
            )}

            {/* BODY CONTENT */}
            <main className="grow px-[15mm] py-[15mm] flex flex-col">
              
              {/* TYPE: COVER */}
              {page.type === 'cover' && (
                <div className="h-full flex flex-col justify-between bg-blue-950 text-white p-[10mm] -m-[15mm]">
                  <div className="mt-20">
                    <div className="w-20 h-20 border-4 border-white flex items-center justify-center mb-8">
                      <Layers size={40} />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-[0.5em] text-blue-400 mb-4">Technical Manual</p>
                    <h1 className="text-7xl font-black uppercase leading-[0.85]">{page.title}</h1>
                    <p className="text-xl mt-6 font-medium text-slate-300 max-w-md">{page.subtitle}</p>
                  </div>
                  <div className="border-t border-blue-800 pt-8 flex justify-between">
                    <div>
                      <p className="text-[10px] uppercase text-blue-400 font-bold">Author</p>
                      <p className="text-lg font-black uppercase">Boluwatife Adeoye</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase text-blue-400 font-bold">Version</p>
                      <p className="text-lg font-black uppercase">2026.1.0</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TYPE: TOC */}
              {page.type === 'toc' && (
                <div className="h-full flex flex-col justify-center">
                  <h2 className="text-4xl font-black uppercase mb-12 text-blue-950">Table of Contents</h2>
                  <div className="space-y-4">
                    {page.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 border-b border-slate-100 pb-2">
                        <span className="text-blue-600 font-mono font-bold text-lg">{(i + 1).toString().padStart(2, '0')}</span>
                        <span className="text-xl font-bold text-slate-800 uppercase">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TYPE: TEXT */}
              {page.type === 'text' && (
                <div className="h-full flex flex-col justify-center">
                  <h2 className="text-4xl font-black uppercase mb-8 text-blue-950 border-l-8 border-blue-600 pl-6">{page.title}</h2>
                  <p className="text-2xl font-medium leading-relaxed text-slate-700 text-justify">{page.content}</p>
                  <div className="mt-12 p-8 bg-slate-50 border border-slate-200">
                    <p className="text-xs font-black uppercase text-slate-400 mb-2">Architectural Note</p>
                    <p className="font-mono text-sm text-blue-600">"System integrity is defined by the weakest link in the latency chain."</p>
                  </div>
                </div>
              )}

              {/* TYPE: DIAGRAM (COMPARISON) */}
              {page.diagramType === 'comparison' && (
                <div className="h-full flex flex-col justify-center">
                  <h2 className="text-3xl font-black uppercase mb-8">{page.title}</h2>
                  <div className="grid grid-cols-2 gap-8 h-96">
                    <div className="border-4 border-slate-200 p-6 flex flex-col items-center justify-center opacity-50">
                      <Server size={48} className="mb-4 text-slate-400"/>
                      <h3 className="font-black uppercase text-slate-400">Legacy Monolith</h3>
                      <p className="text-center text-xs mt-2">High Latency • Single Point of Failure</p>
                    </div>
                    <div className="border-4 border-blue-950 p-6 flex flex-col items-center justify-center bg-blue-50">
                      <Globe size={48} className="mb-4 text-blue-600"/>
                      <h3 className="font-black uppercase text-blue-950">Sovereign Edge</h3>
                      <p className="text-center text-xs mt-2 font-bold">Global Distribution • &lt; 50ms</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TYPE: DIAGRAM (INFERENCE) */}
              {page.diagramType === 'inference' && (
                <div className="h-full flex flex-col justify-center">
                  <h2 className="text-3xl font-black uppercase mb-8">{page.title}</h2>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-full p-4 bg-slate-900 text-white text-center font-black uppercase rounded">User Input</div>
                    <div className="h-8 w-1 bg-slate-300"></div>
                    <div className="w-full p-8 border-4 border-blue-600 bg-blue-50 text-center rounded-xl">
                      <Cpu size={48} className="mx-auto text-blue-600 mb-2"/>
                      <h3 className="font-black text-xl uppercase">Groq LPU Inference</h3>
                      <p className="font-mono text-sm mt-2">500 Tokens / Sec</p>
                    </div>
                    <div className="h-8 w-1 bg-slate-300"></div>
                    <div className="w-full p-4 bg-green-600 text-white text-center font-black uppercase rounded">Instant Response</div>
                  </div>
                </div>
              )}

              {/* TYPE: DIAGRAM (GEO) */}
              {page.diagramType === 'geo' && (
                <div className="h-full flex flex-col justify-center">
                  <h2 className="text-3xl font-black uppercase mb-8">{page.title}</h2>
                  <div className="relative w-full aspect-square border-4 border-slate-200 rounded-full flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-blue-100 rounded-full animate-ping"></div>
                    <div className="w-2/3 h-2/3 border-4 border-blue-200 rounded-full flex items-center justify-center">
                      <div className="w-1/3 h-1/3 bg-blue-950 rounded-full flex items-center justify-center text-white">
                        <Globe size={32} />
                      </div>
                    </div>
                    <div className="absolute top-10 right-20 bg-white border-2 border-blue-600 p-2 text-xs font-bold">Driver A</div>
                    <div className="absolute bottom-20 left-10 bg-white border-2 border-blue-600 p-2 text-xs font-bold">Mechanic B</div>
                  </div>
                </div>
              )}

              {/* TYPE: DIAGRAM (VISION) */}
              {page.diagramType === 'vision' && (
                <div className="h-full flex flex-col justify-center">
                  <h2 className="text-3xl font-black uppercase mb-8">{page.title}</h2>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-slate-100 p-4 border-b-4 border-slate-400"><Box className="mx-auto mb-2"/><span className="text-[10px] font-bold uppercase">Upload</span></div>
                    <div className="bg-blue-50 p-4 border-b-4 border-blue-400"><Eye className="mx-auto mb-2 text-blue-600"/><span className="text-[10px] font-bold uppercase">Analysis</span></div>
                    <div className="bg-blue-100 p-4 border-b-4 border-blue-600"><Shield className="mx-auto mb-2 text-blue-800"/><span className="text-[10px] font-bold uppercase">Fraud Check</span></div>
                    <div className="bg-green-100 p-4 border-b-4 border-green-600"><CheckCircle2 className="mx-auto mb-2 text-green-600"/><span className="text-[10px] font-bold uppercase">Payout</span></div>
                  </div>
                </div>
              )}

              {/* TYPE: SIGNATURE */}
              {page.type === 'signature' && (
                <div className="h-full flex flex-col justify-center">
                  <h2 className="text-4xl font-black uppercase mb-8 text-blue-950">{page.title}</h2>
                  <p className="text-xl font-medium leading-relaxed text-slate-700 mb-12">{page.content}</p>
                  <div className="border-t-4 border-blue-950 pt-8">
                    <p className="text-xs font-bold uppercase text-slate-400 mb-2">Signed</p>
                    <p className="text-3xl font-black uppercase text-blue-950">Boluwatife Adeoye</p>
                    <p className="text-sm font-bold text-blue-600 uppercase mt-1">Lead Systems Architect</p>
                  </div>
                  <div className="mt-12 p-4 bg-slate-900 text-white text-center">
                    <p className="font-mono text-xs">VERIFIED ARCHITECTURAL SPECIFICATION</p>
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
