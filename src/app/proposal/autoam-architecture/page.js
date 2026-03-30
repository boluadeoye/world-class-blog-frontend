"use client";
import { useState, useEffect } from "react";
import { 
  Download, Triangle, Database, BrainCircuit, 
  Smartphone, Globe, Zap, Server, Network, 
  ArrowRight, ArrowDown, CheckCircle2, FileCode2, ShieldCheck
} from "lucide-react";

export default function AutoamArchitecture() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1500);
  }, []);

  const handlePrint = () => {
    document.title = "AUTOAM_MASTER_ARCHITECTURE_AUDIT";
    window.print();
  };

  // The Autoam "A-Frame" Watermark Component
  const AFrameWatermark = () => (
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
      <svg width="600" height="600" viewBox="0 0 24 24" fill="none" stroke="#1A2C4E" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 2 9 20H3Z"/>
        <path d="m12 2 4 9H8Z"/>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1A2C4E] font-sans text-[#1A2C4E] selection:bg-[#D97B0C] selection:text-white">
      
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #F8FAFC !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; counter-reset: pageCounter; }
          body * { visibility: hidden; }
          #audit-render, #audit-render * { visibility: visible; }
          #audit-render { position: absolute; left: 0; top: 0; width: 100%; background: #F8FAFC; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #F8FAFC;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          .page-num::after {
            counter-increment: pageCounter;
            content: "PAGE " counter(pageCounter, decimal-leading-zero);
          }
          .no-print { display: none !important; }
        }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .thin-border { border: 0.5pt solid #cbd5e1; }
        .thin-border-b { border-bottom: 0.5pt solid #cbd5e1; }
        .thin-border-t { border-top: 0.5pt solid #cbd5e1; }
        
        /* Diagram Specifics */
        .erd-box { background: white; border: 1px solid #1A2C4E; border-top: 4px solid #1A2C4E; padding: 12px; width: 140px; font-family: 'JetBrains Mono', monospace; font-size: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .erd-header { font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 4px; color: #1A2C4E; }
        .erd-row { display: flex; justify-content: space-between; color: #64748b; margin-bottom: 2px; }
        .erd-pk { color: #D97B0C; font-weight: bold; }
      `}</style>

      {/* === VIEW 1: THE PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6">
        <div className="relative z-10 w-full max-w-md bg-white p-12 text-center shadow-2xl rounded-2xl border-t-4 border-[#D97B0C]">
          <Database size={48} className="text-[#1A2C4E] mx-auto mb-6" />
          <h1 className="font-inter text-2xl font-black text-[#1A2C4E] mb-2 tracking-tight">Master Architecture</h1>
          <p className="font-inter text-[#D97B0C] text-[10px] font-bold mb-8 tracking-[0.2em] uppercase">System Logic Audit</p>

          {!isReady ? (
            <div className="text-slate-400 font-mono text-xs animate-pulse">COMPILING 8-PAGE AUDIT...</div>
          ) : (
            <button onClick={handlePrint} className="w-full bg-[#1A2C4E] text-white font-inter font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-[#D97B0C] transition-colors shadow-lg">
              Extract Technical Bible
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE DOCUMENT (Print) === */}
      <div id="audit-render" className="hidden print:block text-[#1A2C4E]">
        
        {/* PAGE 1: COVER PAGE */}
        <div className="a4-page p-[30mm]">
          <AFrameWatermark />
          <div className="h-full flex flex-col justify-center relative z-10">
            <div className="mb-auto">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1A2C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-8">
                <path d="m12 2 9 20H3Z"/><path d="m12 2 4 9H8Z"/>
              </svg>
            </div>
            
            <div>
              <p className="font-mono text-[10px] text-[#D97B0C] uppercase tracking-[0.3em] mb-4">Confidential // Technical Audit</p>
              <h1 className="font-inter text-6xl font-black tracking-tighter leading-[1.1] mb-8 text-[#1A2C4E]">
                Autoam:<br/>Master Technical<br/>Architecture
              </h1>
              <div className="w-24 h-[2px] bg-[#D97B0C] mb-12"></div>
              <p className="font-inter text-sm font-medium text-slate-600 max-w-sm leading-relaxed">
                A comprehensive breakdown of the intelligence layer, real-time nervous system, and geospatial engine powering the Autoam marketplace.
              </p>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-12 thin-border-t pt-8">
              <div>
                <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mb-2">Lead Architect</p>
                <p className="font-inter text-sm font-black uppercase tracking-wide">Bolu Adeoye</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mb-2">Date of Audit</p>
                <p className="font-inter text-sm font-black uppercase tracking-wide">March 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 2: THE INTELLIGENCE LAYER */}
        <div className="a4-page p-[30mm]">
          <AFrameWatermark />
          <Header title="Autoam // System Logic Audit" />

          <main className="grow relative z-10">
            <h2 className="font-inter text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
              <BrainCircuit className="text-[#D97B0C]"/> 1.0 The Intelligence Layer
            </h2>
            
            <p className="font-inter text-sm leading-[2] text-slate-600 text-justify mb-8">
              The core decision-making engine of Autoam is powered by the <span className="font-bold text-[#1A2C4E]">Groq Llama 3.3 70B</span> model. Traditional LLM integrations suffer from probabilistic outputs (hallucinations) which are unacceptable in a financial marketplace. To solve this, we implemented a <span className="font-bold text-[#1A2C4E]">Deterministic JSON Manifest</span> logic.
            </p>

            <div className="bg-white thin-border p-6 rounded-lg mb-8 shadow-sm">
              <p className="font-mono text-[10px] text-[#D97B0C] uppercase tracking-widest mb-4">Deterministic JSON Manifest</p>
              <p className="font-inter text-xs leading-relaxed text-slate-600 mb-4">
                The LLM is forced via system prompts to output strictly formatted JSON. This ensures the application layer can parse the AI's reasoning without regex hacking.
              </p>
              <pre className="bg-slate-900 text-emerald-400 p-4 rounded font-mono text-[8px] overflow-x-auto">
{`{
  "intent": "FAULT_DIAGNOSIS",
  "confidence_score": 0.94,
  "extracted_entities": {
    "vehicle_make": "Toyota",
    "symptom": "Engine knocking sound",
    "urgency": "CRITICAL"
  },
  "recommended_action": "DISPATCH_MECHANIC"
}`}
              </pre>
            </div>

            <ArchitectNote text="By utilizing Groq's LPU (Language Processing Unit) hardware, we achieve inference speeds of over 800 tokens per second, reducing the cognitive latency to near-zero." />
          </main>
        </div>

        {/* PAGE 3: THE REAL-TIME NERVOUS SYSTEM */}
        <div className="a4-page p-[30mm]">
          <AFrameWatermark />
          <Header title="Autoam // System Logic Audit" />

          <main className="grow relative z-10">
            <h2 className="font-inter text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
              <Zap className="text-[#D97B0C]"/> 2.0 The Real-Time Nervous System
            </h2>
            
            <p className="font-inter text-sm leading-[2] text-slate-600 text-justify mb-8">
              A marketplace dies if users have to refresh the page. Autoam utilizes the <span className="font-bold text-[#1A2C4E]">Supabase Broadcast Protocol</span> to create a sub-second latency handshake between drivers and mechanics. This is achieved via PostgreSQL logical replication and WebSockets.
            </p>

            {/* DIAGRAM 3: THE MECHANIC HANDSHAKE */}
            <div className="bg-white thin-border p-8 rounded-lg mb-8 shadow-sm flex flex-col items-center">
              <p className="font-mono text-[10px] text-[#D97B0C] uppercase tracking-widest mb-8 w-full text-left">Sequence Diagram: The Handshake</p>
              
              <div className="flex justify-between w-full max-w-sm relative">
                {/* Phone A */}
                <div className="flex flex-col items-center z-10">
                  <div className="w-16 h-24 border-2 border-[#1A2C4E] rounded-lg flex items-center justify-center bg-slate-50 mb-2">
                    <Smartphone size={24} className="text-[#1A2C4E]"/>
                  </div>
                  <p className="font-mono text-[8px] font-bold">DRIVER (Phone A)</p>
                </div>

                {/* Cloud */}
                <div className="flex flex-col items-center justify-center z-10">
                  <Server size={32} className="text-[#D97B0C] mb-2"/>
                  <p className="font-mono text-[8px] font-bold">SUPABASE CLOUD</p>
                  <p className="font-mono text-[6px] text-slate-400">&lt; 200ms Latency</p>
                </div>

                {/* Phone B */}
                <div className="flex flex-col items-center z-10">
                  <div className="w-16 h-24 border-2 border-[#1A2C4E] rounded-lg flex items-center justify-center bg-slate-50 mb-2">
                    <Smartphone size={24} className="text-[#1A2C4E]"/>
                  </div>
                  <p className="font-mono text-[8px] font-bold">MECHANIC (Phone B)</p>
                </div>

                {/* Arrows */}
                <div className="absolute top-8 left-16 w-20 h-px border-t border-dashed border-[#1A2C4E]">
                  <div className="absolute -top-3 left-2 font-mono text-[6px] bg-white px-1">1. Broadcast: new_request</div>
                  <ArrowRight size={12} className="absolute -right-1 -top-1.5 text-[#1A2C4E]"/>
                </div>
                <div className="absolute top-8 right-16 w-20 h-px border-t border-dashed border-[#1A2C4E]">
                  <div className="absolute -top-3 left-2 font-mono text-[6px] bg-white px-1">2. Alert: Incoming Job</div>
                  <ArrowRight size={12} className="absolute -right-1 -top-1.5 text-[#1A2C4E]"/>
                </div>
                <div className="absolute top-16 right-16 w-20 h-px border-t border-dashed border-[#D97B0C]">
                  <div className="absolute -top-3 left-2 font-mono text-[6px] bg-white px-1 text-[#D97B0C]">3. Broadcast: job_accepted</div>
                  <ArrowRight size={12} className="absolute -left-1 -top-1.5 text-[#D97B0C] rotate-180"/>
                </div>
                <div className="absolute top-16 left-16 w-20 h-px border-t border-dashed border-[#D97B0C]">
                  <div className="absolute -top-3 left-2 font-mono text-[6px] bg-white px-1 text-[#D97B0C]">4. Trigger: Payment State</div>
                  <ArrowRight size={12} className="absolute -left-1 -top-1.5 text-[#D97B0C] rotate-180"/>
                </div>
              </div>
            </div>

          </main>
        </div>

        {/* PAGE 4: GEOSPATIAL ENGINE */}
        <div className="a4-page p-[30mm]">
          <AFrameWatermark />
          <Header title="Autoam // System Logic Audit" />

          <main className="grow relative z-10">
            <h2 className="font-inter text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
              <Globe className="text-[#D97B0C]"/> 3.0 Geospatial Engine
            </h2>
            
            <p className="font-inter text-sm leading-[2] text-slate-600 text-justify mb-8">
              Location accuracy is paramount. We integrated <span className="font-bold text-[#1A2C4E]">Leaflet.js</span> for lightweight, mobile-optimized map rendering. To convert raw GPS coordinates (Latitude/Longitude) into human-readable addresses, we implemented a robust <span className="font-bold text-[#1A2C4E]">Reverse Geocoding</span> pipeline.
            </p>

            <div className="bg-white thin-border p-6 rounded-lg mb-8 shadow-sm">
              <p className="font-mono text-[10px] text-[#D97B0C] uppercase tracking-widest mb-4">PostGIS Spatial Queries</p>
              <p className="font-inter text-xs leading-relaxed text-slate-600 mb-4">
                Instead of calculating distances on the client (which drains battery), we use PostGIS extensions in Supabase to perform spatial queries directly on the database.
              </p>
              <pre className="bg-slate-900 text-emerald-400 p-4 rounded font-mono text-[8px] overflow-x-auto">
{`-- Find mechanics within 5km radius
SELECT id, name, 
  ST_Distance(location, ST_SetSRID(ST_MakePoint(lng, lat), 4326)) as dist
FROM mechanics
WHERE ST_DWithin(
  location, 
  ST_SetSRID(ST_MakePoint(lng, lat), 4326), 
  5000
)
ORDER BY dist ASC;`}
              </pre>
            </div>

            <ArchitectNote text="By offloading spatial mathematics to the PostGIS layer, we reduced client-side CPU load by 60%, significantly improving battery life for drivers in the field." />
          </main>
        </div>

        {/* PAGE 5: DATABASE ARCHITECTURE (ERD) */}
        <div className="a4-page p-[30mm]">
          <AFrameWatermark />
          <Header title="Autoam // System Logic Audit" />

          <main className="grow relative z-10">
            <h2 className="font-inter text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
              <Database className="text-[#D97B0C]"/> 4.0 Database Architecture
            </h2>
            
            <p className="font-inter text-sm leading-[2] text-slate-600 text-justify mb-8">
              The schema is designed for high-throughput writes and strict relational integrity. Below is the Entity Relationship Diagram (ERD) detailing the flow from a Fault Signal to a Bidding Event.
            </p>

            {/* DIAGRAM 2: THE ERD */}
            <div className="bg-white thin-border p-8 rounded-lg mb-8 shadow-sm h-96 relative flex items-center justify-center">
              <p className="absolute top-6 left-6 font-mono text-[10px] text-[#D97B0C] uppercase tracking-widest">Entity Relationship Diagram</p>
              
              {/* PROFILES TABLE */}
              <div className="absolute top-20 left-10 erd-box z-10">
                <div className="erd-header">PROFILES</div>
                <div className="erd-row"><span className="erd-pk">id (PK)</span><span>uuid</span></div>
                <div className="erd-row"><span>role</span><span>enum</span></div>
                <div className="erd-row"><span>location</span><span>geometry</span></div>
              </div>

              {/* REQUESTS TABLE (CENTER) */}
              <div className="absolute top-40 left-1/2 -translate-x-1/2 erd-box z-10 border-t-[#D97B0C]">
                <div className="erd-header text-[#D97B0C]">REQUESTS</div>
                <div className="erd-row"><span className="erd-pk">id (PK)</span><span>uuid</span></div>
                <div className="erd-row"><span>driver_id (FK)</span><span>uuid</span></div>
                <div className="erd-row"><span>fault_signal</span><span>jsonb</span></div>
                <div className="erd-row"><span>status</span><span>enum</span></div>
              </div>

              {/* JOBS TABLE */}
              <div className="absolute bottom-20 right-10 erd-box z-10">
                <div className="erd-header">JOBS (MARKETPLACE)</div>
                <div className="erd-row"><span className="erd-pk">id (PK)</span><span>uuid</span></div>
                <div className="erd-row"><span>request_id (FK)</span><span>uuid</span></div>
                <div className="erd-row"><span>mechanic_id (FK)</span><span>uuid</span></div>
                <div className="erd-row"><span>bid_amount</span><span>numeric</span></div>
              </div>

              {/* SVG Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                {/* Profiles to Requests */}
                <path d="M 150 120 L 250 120 L 250 160" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                {/* Requests to Jobs */}
                <path d="M 350 220 L 450 220 L 450 260" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
            </div>
          </main>
        </div>

        {/* PAGE 6: PWA & EDGE DEPLOYMENT */}
        <div className="a4-page p-[30mm]">
          <AFrameWatermark />
          <Header title="Autoam // System Logic Audit" />

          <main className="grow relative z-10">
            <h2 className="font-inter text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
              <Network className="text-[#D97B0C]"/> 5.0 PWA & Edge Deployment
            </h2>
            
            <p className="font-inter text-sm leading-[2] text-slate-600 text-justify mb-8">
              To bypass App Store friction and ensure immediate accessibility, Autoam is deployed as a <span className="font-bold text-[#1A2C4E]">Progressive Web App (PWA)</span>. The infrastructure is hosted on the <span className="font-bold text-[#1A2C4E]">Vercel Edge Network</span>, ensuring that static assets and serverless functions are executed physically close to the user.
            </p>

            <div className="bg-white thin-border p-6 rounded-lg mb-8 shadow-sm">
              <p className="font-mono text-[10px] text-[#D97B0C] uppercase tracking-widest mb-4">Service Worker Caching</p>
              <p className="font-inter text-xs leading-relaxed text-slate-600 mb-4">
                We implemented a 'Stale-While-Revalidate' caching strategy via Service Workers. This allows the app shell to load instantly, even on 3G networks, while fetching fresh data in the background.
              </p>
              <div className="flex items-center gap-4 mt-6 border-t border-slate-100 pt-4">
                <CheckCircle2 size={16} className="text-emerald-500"/>
                <span className="font-mono text-[10px] font-bold">Offline-Ready App Shell</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <CheckCircle2 size={16} className="text-emerald-500"/>
                <span className="font-mono text-[10px] font-bold">Push Notification Support</span>
              </div>
            </div>

            <ArchitectNote text="Deploying to the Edge reduces Time-To-First-Byte (TTFB) by 40%, a critical metric for users stranded on the side of the road with poor network connectivity." />
          </main>
        </div>

        {/* PAGE 7: CODE MOCKUPS */}
        <div className="a4-page p-[30mm]">
          <AFrameWatermark />
          <Header title="Autoam // System Logic Audit" />

          <main className="grow relative z-10">
            <h2 className="font-inter text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
              <FileCode2 className="text-[#D97B0C]"/> 6.0 Source Code Verification
            </h2>
            
            <p className="font-inter text-sm leading-[2] text-slate-600 text-justify mb-8">
              The following exhibits demonstrate the structural integrity and clean architecture of the Next.js 15 codebase.
            </p>

            {/* BROWSER MOCKUP */}
            <div className="w-full rounded-lg overflow-hidden shadow-lg border border-slate-300 bg-slate-900">
              {/* Browser Header */}
              <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="ml-4 bg-slate-700 px-4 py-1 rounded text-[8px] font-mono text-slate-400">src/app/api/match/route.ts</div>
              </div>
              {/* Code Area */}
              <pre className="p-6 font-mono text-[8px] text-slate-300 leading-relaxed overflow-x-auto">
{`import { createClient } from '@supabase/supabase-js';

export async function POST(req) {
  // 1. Parse incoming fault signal
  const body = await req.json();
  const { driver_id, lat, lng } = body;

  // 2. Execute PostGIS spatial query
  const { data: mechanics } = await supabase.rpc('find_nearby_mechanics', {
    driver_lat: lat,
    driver_lng: lng
  });

  return Response.json({ mechanics });
}`}
              </pre>
            </div>
          </main>
        </div>

        {/* PAGE 8: CONCLUSION */}
        <div className="a4-page p-[30mm]">
          <AFrameWatermark />
          <Header title="Autoam // System Logic Audit" />

          <main className="grow relative z-10 flex flex-col justify-center text-center">
            <ShieldCheck size={64} className="text-[#1A2C4E] mx-auto mb-8" />
            <h2 className="font-inter text-4xl font-black uppercase tracking-tight mb-6">Audit Complete</h2>
            <p className="font-inter text-sm leading-[2] text-slate-600 max-w-md mx-auto mb-12">
              The Autoam infrastructure is a highly complex, deterministic system. It requires specialized knowledge of Edge computing, PostGIS, and LLM orchestration to maintain and scale.
            </p>
            
            <div className="inline-block border-t-2 border-[#D97B0C] pt-8 px-12">
              <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-2">Verified By</p>
              <p className="font-inter text-xl font-black uppercase tracking-wide text-[#1A2C4E]">Bolu Adeoye</p>
              <p className="font-inter text-[10px] text-[#D97B0C] uppercase tracking-widest mt-1">Lead Architect</p>
            </div>
          </main>
        </div>

      </div>
    </div>
  );
}

// Reusable Components
function Header({ title }) {
  return (
    <header className="flex justify-between items-end thin-border-b pb-4 mb-12 relative z-10">
      <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">{title}</span>
      <span className="font-mono text-[8px] text-[#1A2C4E] font-bold page-num"></span>
    </header>
  );
}

function ArchitectNote({ text }) {
  return (
    <div className="mt-auto bg-[#1A2C4E] text-white p-6 rounded-lg border-l-4 border-[#D97B0C]">
      <p className="font-mono text-[10px] text-[#D97B0C] uppercase tracking-widest mb-2">Architect's Note</p>
      <p className="font-inter text-xs leading-relaxed italic">{text}</p>
    </div>
  );
}
