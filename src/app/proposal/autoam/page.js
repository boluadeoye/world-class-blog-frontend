"use client";
import { Download, ArrowLeft, CheckSquare, Layers, Shield, Zap, Database, Bot, MapPin, Smartphone, Server } from "lucide-react";
import Link from "next/link";

export default function AutoamProposal() {
  
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "AUTOAM Technical Architecture Blueprint v2.0";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900">
      
      {/* === GLOBAL PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #print-container, #print-container * { visibility: visible; }
          #print-container {
            position: absolute;
            left: 0; top: 0; width: 100%;
            margin: 0; padding: 0;
            background: white;
          }
          @page { size: A4; margin: 0mm; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; margin-top: 0; display: block; }
          .avoid-break { break-inside: avoid; }
        }
      `}</style>

      {/* === VIEW 1: DOWNLOAD PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>

        <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <span className="font-black text-2xl text-slate-900">BA</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Technical Architecture</h1>
          <p className="text-slate-400 text-sm mb-8">Aligned with Autoam PRD v1.0</p>
          <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-200 text-slate-950 font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl">
            <Download size={20} /> <span>Download Blueprint PDF</span>
          </button>
          <Link href="/" className="block mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors">← Return to Dashboard</Link>
        </div>
      </div>

      {/* === VIEW 2: THE DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block">
        
        {/* === PAGE 1 === */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex justify-between items-start border-b-[6px] border-black pb-6 mb-8">
              <div>
                <h1 className="text-7xl font-black uppercase tracking-tighter leading-none mb-2">Autoam</h1>
                <p className="text-xl font-black text-slate-600 uppercase tracking-widest">Technical Blueprint</p>
              </div>
              <div className="text-right">
                <div className="bg-black text-white px-6 py-2 font-bold text-sm uppercase inline-block mb-1">Confidential</div>
                <p className="text-xs font-mono font-bold">REF: PRD-ALIGN-V2</p>
              </div>
            </div>

            {/* 1. Executive Summary */}
            <section className="mb-8">
              <h2 className="text-2xl font-black uppercase border-l-[10px] border-black pl-4 mb-4">1. Executive Summary</h2>
              <p className="text-sm leading-relaxed text-justify mb-4 font-bold text-black">
                This architecture is engineered to meet the specific KPIs outlined in the Autoam PRD (v1.0), specifically the <strong>&lt;3s load time</strong> and <strong>AI-driven diagnostics</strong>.
              </p>
              <p className="text-sm leading-relaxed text-justify font-bold text-black">
                The system unifies three service verticals—<strong>Mechanics, Auto-Parts, and Fuel Stations</strong>—into a single geospatial engine. It introduces a dedicated <strong>AI Layer</strong> for vehicle fault diagnosis and utilizes an <strong>Offline-First</strong> data strategy to ensure reliability in low-connectivity zones across Nigeria.
              </p>
            </section>

            {/* 2. Core Stack Strategy */}
            <section>
              <h2 className="text-2xl font-black uppercase border-l-[10px] border-black pl-4 mb-4">2. Technology Stack Strategy</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-4 border-black p-4">
                  <div className="flex items-center gap-2 mb-2 border-b-4 border-black pb-2">
                    <Smartphone size={18} />
                    <span className="font-black text-sm uppercase">Mobile (User & Pro)</span>
                  </div>
                  <p className="font-black text-lg">React Native (Expo)</p>
                  <ul className="list-disc pl-4 mt-2 text-xs font-bold space-y-1 text-slate-800">
                    <li>Unified iOS/Android codebase.</li>
                    <li><strong>Offline Mode:</strong> Local caching (WatermelonDB).</li>
                    <li><strong>Maps:</strong> Native Google Maps SDK.</li>
                  </ul>
                </div>
                <div className="border-4 border-black p-4">
                  <div className="flex items-center gap-2 mb-2 border-b-4 border-black pb-2">
                    <Bot size={18} />
                    <span className="font-black text-sm uppercase">AI & Logic Core</span>
                  </div>
                  <p className="font-black text-lg">NestJS + OpenAI</p>
                  <ul className="list-disc pl-4 mt-2 text-xs font-bold space-y-1 text-slate-800">
                    <li><strong>AI Assistant:</strong> GPT-4o Mini for diagnostics.</li>
                    <li><strong>Matching:</strong> Geospatial Heuristic Engine.</li>
                    <li><strong>Queue:</strong> BullMQ for reliable dispatch.</li>
                  </ul>
                </div>
                <div className="border-4 border-black p-4">
                  <div className="flex items-center gap-2 mb-2 border-b-4 border-black pb-2">
                    <Database size={18} />
                    <span className="font-black text-sm uppercase">Data Layer</span>
                  </div>
                  <p className="font-black text-lg">PostgreSQL + PostGIS</p>
                  <ul className="list-disc pl-4 mt-2 text-xs font-bold space-y-1 text-slate-800">
                    <li><strong>Multi-Vendor:</strong> Mechanics, Parts, Fuel.</li>
                    <li><strong>Geo-Index:</strong> "Find nearest X within 5km".</li>
                  </ul>
                </div>
                <div className="border-4 border-black p-4">
                  <div className="flex items-center gap-2 mb-2 border-b-4 border-black pb-2">
                    <Shield size={18} />
                    <span className="font-black text-sm uppercase">Security</span>
                  </div>
                  <p className="font-black text-lg">JWT + AES-256</p>
                  <ul className="list-disc pl-4 mt-2 text-xs font-bold space-y-1 text-slate-800">
                    <li><strong>Privacy:</strong> NDPR/GDPR Compliance.</li>
                    <li><strong>Payments:</strong> PCI-DSS Escrow Logic.</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
          
          <div className="text-right text-xs font-black text-slate-400">Page 1/3</div>
        </div>

        <div className="page-break"></div>

        {/* === PAGE 2 === */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col justify-between">
          
          <div>
            {/* 3. System Architecture Diagram */}
            <section className="mb-8">
              <h2 className="text-2xl font-black uppercase border-l-[10px] border-black pl-4 mb-6">3. System Architecture Diagram</h2>
              
              {/* COMPACT BOLD DIAGRAM */}
              <div className="flex flex-col items-center gap-4 text-xs font-black uppercase">
                <div className="flex gap-4 w-full justify-center">
                  <div className="border-[3px] border-black p-2 w-28 text-center bg-slate-100">User App<br/>(Driver)</div>
                  <div className="border-[3px] border-black p-2 w-28 text-center bg-slate-100">Partner App<br/>(Mechanic/Dealer)</div>
                  <div className="border-[3px] border-black p-2 w-28 text-center bg-slate-100">Admin<br/>Portal</div>
                </div>
                <div className="h-4 w-1.5 bg-black"></div>
                <div className="border-[3px] border-black p-3 w-full max-w-md text-center bg-white relative">
                  <span className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-black">Load Balancer</span>
                  API GATEWAY (Nginx / Cloudflare)
                </div>
                <div className="h-4 w-1.5 bg-black"></div>
                <div className="flex gap-4 w-full justify-center">
                  <div className="border-[3px] border-black p-3 w-36 text-center bg-white">
                    CORE API<br/>(NestJS)
                  </div>
                  <div className="border-[3px] border-black p-3 w-36 text-center bg-slate-800 text-white">
                    AI ENGINE<br/>(LLM / RAG)
                  </div>
                  <div className="border-[3px] border-black p-3 w-36 text-center bg-white">
                    DISPATCH<br/>(Socket.io)
                  </div>
                </div>
                <div className="h-4 w-1.5 bg-black"></div>
                <div className="flex gap-4 w-full justify-center">
                  <div className="border-[3px] border-black p-2 w-28 text-center bg-slate-100">PostgreSQL<br/>(Primary DB)</div>
                  <div className="border-[3px] border-black p-2 w-28 text-center bg-slate-100">Redis<br/>(Cache)</div>
                  <div className="border-[3px] border-black p-2 w-28 text-center bg-slate-100">S3 Bucket<br/>(Media)</div>
                </div>
              </div>
            </section>

            {/* 4. Database Schema */}
            <section>
              <h2 className="text-2xl font-black uppercase border-l-[10px] border-black pl-4 mb-6">4. Core Database Schema</h2>
              <div className="space-y-4 text-xs font-mono font-bold">
                <div className="border-4 border-black p-3 avoid-break">
                  <p className="font-black border-b-4 border-black pb-1 mb-2 text-sm">USERS (Drivers & Providers)</p>
                  <p className="text-slate-900">id (UUID) • type (DRIVER/MECHANIC/DEALER/FUEL) • kyc_docs • rating_avg • location (Point)</p>
                </div>
                <div className="border-4 border-black p-3 avoid-break">
                  <p className="font-black border-b-4 border-black pb-1 mb-2 text-sm">SERVICE_REQUESTS (Jobs)</p>
                  <p className="text-slate-900">id • user_id • provider_id • service_type (REPAIR/TOW/FUEL) • ai_diagnosis_log • status • cost</p>
                </div>
                <div className="border-4 border-black p-3 avoid-break">
                  <p className="font-black border-b-4 border-black pb-1 mb-2 text-sm">INVENTORY (Parts & Fuel)</p>
                  <p className="text-slate-900">id • provider_id • item_name • stock_level • price • compatibility_tags</p>
                </div>
              </div>
            </section>
          </div>

          <div className="text-right text-xs font-black text-slate-400">Page 2/3</div>
        </div>

        <div className="page-break"></div>

        {/* === PAGE 3 === */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col justify-between">
          
          <div>
            {/* 5. Detailed Feature Scope */}
            <section className="mb-8">
              <h2 className="text-2xl font-black uppercase border-l-[10px] border-black pl-4 mb-6">5. Detailed Feature Scope</h2>
              <div className="mb-4">
                <h3 className="font-black text-lg uppercase mb-2">A. User Application</h3>
                <ul className="list-disc pl-5 text-sm font-bold space-y-1 text-slate-900">
                  <li><strong>AI Assistant:</strong> Chat interface for fault diagnosis before booking.</li>
                  <li><strong>Multi-Service Map:</strong> Toggle between Mechanics, Parts, and Fuel.</li>
                  <li><strong>Offline Mode:</strong> Access vehicle data without internet.</li>
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="font-black text-lg uppercase mb-2">B. Provider Application</h3>
                <ul className="list-disc pl-5 text-sm font-bold space-y-1 text-slate-900">
                  <li><strong>Job Radar:</strong> Background service detecting requests.</li>
                  <li><strong>Inventory Mgmt:</strong> Simple interface for Dealers to update stock.</li>
                  <li><strong>Earnings Wallet:</strong> Real-time commission tracking.</li>
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="font-black text-lg uppercase mb-2">C. Admin Command Center</h3>
                <ul className="list-disc pl-5 text-sm font-bold space-y-1 text-slate-900">
                  <li><strong>God Mode Map:</strong> Real-time heatmap of all active agents.</li>
                  <li><strong>Verification Portal:</strong> Review KYC docs for mechanics/dealers.</li>
                </ul>
              </div>
            </section>

            {/* 6. Implementation Roadmap (9 WEEKS) */}
            <section>
              <h2 className="text-2xl font-black uppercase border-l-[10px] border-black pl-4 mb-6">6. Roadmap (9 Weeks)</h2>
              <div className="border-l-[6px] border-black ml-2 space-y-0">
                <div className="relative pl-8 pb-4">
                  <div className="absolute -left-[12px] top-0 w-5 h-5 bg-black rounded-full border-4 border-white"></div>
                  <h4 className="font-black text-sm uppercase">Phase 1: Foundation (Weeks 1-2)</h4>
                  <p className="text-xs font-bold text-slate-700 mt-1">System Design, Database, UI/UX, Auth System.</p>
                </div>
                <div className="relative pl-8 pb-4">
                  <div className="absolute -left-[12px] top-0 w-5 h-5 bg-white border-[5px] border-black rounded-full"></div>
                  <h4 className="font-black text-sm uppercase">Phase 2: Core Engine (Weeks 3-5)</h4>
                  <p className="text-xs font-bold text-slate-700 mt-1">Geolocation, AI Integration, Request Matching.</p>
                </div>
                <div className="relative pl-8 pb-4">
                  <div className="absolute -left-[12px] top-0 w-5 h-5 bg-white border-[5px] border-black rounded-full"></div>
                  <h4 className="font-black text-sm uppercase">Phase 3: Ecosystem (Weeks 6-7)</h4>
                  <p className="text-xs font-bold text-slate-700 mt-1">Parts/Fuel Integration, Inventory System, Payments.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute -left-[12px] top-0 w-5 h-5 bg-white border-[5px] border-black rounded-full"></div>
                  <h4 className="font-black text-sm uppercase">Phase 4: Launch (Weeks 8-9)</h4>
                  <p className="text-xs font-bold text-slate-700 mt-1">Beta Testing, Security Audit, Deployment.</p>
                </div>
              </div>
            </section>
          </div>

          {/* SIGNATURE BLOCK */}
          <footer className="pt-8 border-t-[6px] border-black flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Architectural Approval</p>
              <div className="font-serif italic text-5xl text-black mb-2" style={{ fontFamily: 'cursive' }}>
                Boluwatife Adeoye
              </div>
              <div className="h-1.5 w-48 bg-black mb-2"></div>
              <p className="text-sm font-black text-black uppercase">Lead Technical Architect</p>
              <p className="text-xs font-bold text-slate-600">boluadeoye.com.ng</p>
            </div>
            <div className="text-right">
              <div className="w-24 h-24 bg-black text-white flex items-center justify-center font-black text-4xl">
                BA
              </div>
            </div>
          </footer>
          
          <div className="absolute bottom-8 right-8 text-xs font-black text-slate-400">Page 3/3</div>
        </div>

      </div>
    </div>
  );
}
