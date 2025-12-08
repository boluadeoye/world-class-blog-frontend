"use client";
import { Download, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AutoamProposal() {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* === AGGRESSIVE CSS RESET === */}
      <style jsx global>{`
        /* Hide Global Header & Footer */
        body > header, body > footer, nav { display: none !important; }
        /* Reset Page Background */
        body { background: #f8fafc !important; }
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
        }
      `}</style>

      {/* === TOOLBAR (Hidden on Print) === */}
      <div className="no-print fixed top-0 left-0 right-0 bg-slate-900 text-white p-4 flex justify-between items-center shadow-xl z-50">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white">
          <ArrowLeft size={16} /> Exit
        </Link>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-200 px-6 py-2 rounded-full font-bold text-sm transition-colors shadow-lg"
        >
          <Download size={16} /> Export PDF
        </button>
      </div>

      {/* === A4 DOCUMENT === */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-2xl print:shadow-none min-h-[297mm] mt-20 print:mt-0 mb-20 print:mb-0 relative overflow-hidden">
        
        {/* DECORATIVE SIDE BAR */}
        <div className="absolute top-0 bottom-0 left-0 w-3 bg-slate-900 print:w-3"></div>

        <div className="p-[20mm] pl-[25mm]">
          
          {/* === HEADER === */}
          <header className="flex justify-between items-start border-b-4 border-slate-900 pb-8 mb-10">
            <div>
              {/* AGENCY LOGO */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center font-black text-xl tracking-tighter">
                  BA
                </div>
                <div className="leading-none">
                  <h1 className="text-lg font-black uppercase tracking-widest text-slate-900">Bolu Adeoye</h1>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Systems Engineering</p>
                </div>
              </div>
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight leading-none">
                Technical<br/>Architecture
              </h2>
            </div>
            <div className="text-right">
              <div className="inline-block bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Client</p>
                <p className="text-xl font-black text-slate-900">AUTOAM</p>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-2">REF: MVP-ARCH-V1.0</p>
            </div>
          </header>

          {/* === CONTENT === */}
          <div className="space-y-10">
            
            {/* 1. EXECUTIVE SUMMARY */}
            <section>
              <h3 className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">01</span>
                Executive Summary
              </h3>
              <p className="text-base leading-relaxed font-medium text-slate-700 text-justify">
                Autoam is architected as a high-availability, real-time <strong>On-Demand Service Platform</strong>. The system prioritizes low-latency geolocation (connecting drivers to mechanics instantly), transactional security (escrow payments), and horizontal scalability. The infrastructure follows a <strong>Mobile-First, Cloud-Native</strong> approach to ensure reliability in field conditions.
              </p>
            </section>

            {/* 2. THE STACK */}
            <section>
              <h3 className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-400 mb-6">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">02</span>
                Core Infrastructure
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border-l-4 border-slate-900">
                  <p className="text-xs font-bold text-slate-500 uppercase">Mobile Applications</p>
                  <p className="text-lg font-black text-slate-900">React Native (Expo)</p>
                  <p className="text-xs text-slate-600 mt-1">Cross-platform iOS & Android</p>
                </div>
                <div className="p-4 bg-slate-50 border-l-4 border-slate-900">
                  <p className="text-xs font-bold text-slate-500 uppercase">Backend Core</p>
                  <p className="text-lg font-black text-slate-900">Node.js / NestJS</p>
                  <p className="text-xs text-slate-600 mt-1">Enterprise-grade Scalability</p>
                </div>
                <div className="p-4 bg-slate-50 border-l-4 border-slate-900">
                  <p className="text-xs font-bold text-slate-500 uppercase">Database Engine</p>
                  <p className="text-lg font-black text-slate-900">PostgreSQL + PostGIS</p>
                  <p className="text-xs text-slate-600 mt-1">Geospatial Indexing</p>
                </div>
                <div className="p-4 bg-slate-50 border-l-4 border-slate-900">
                  <p className="text-xs font-bold text-slate-500 uppercase">Real-Time Layer</p>
                  <p className="text-lg font-black text-slate-900">Socket.io / WebSocket</p>
                  <p className="text-xs text-slate-600 mt-1">Live Location Tracking</p>
                </div>
              </div>
            </section>

            {/* 3. SYSTEM DIAGRAM */}
            <section>
              <h3 className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">03</span>
                Data Flow Architecture
              </h3>
              <div className="bg-slate-900 text-slate-300 p-6 rounded-xl font-mono text-[10px] leading-tight whitespace-pre overflow-hidden shadow-inner">
{`[ USER APP ]        [ MECHANIC APP ]      [ ADMIN PORTAL ]
      |                   |                      |
      v                   v                      v
+-------------------------------------------------------+
|             API GATEWAY / LOAD BALANCER               |
+-------------------------------------------------------+
                          |
        +-----------------+-----------------+
        |                                   |
+-------v-------+                   +-------v-------+
|  CORE API     |                   |  REAL-TIME    |
|  SERVER       |                   |  ENGINE       |
| (Node/NestJS) |                   | (Socket.io)   |
+-------+-------+                   +-------+-------+
        |                                   |
        +--------->[ DATABASE ]<------------+
                  (PostgreSQL)`}
              </div>
            </section>

            {/* 4. DELIVERABLES */}
            <section>
              <h3 className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">04</span>
                Project Deliverables
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 border-b border-slate-100">
                  <CheckCircle2 size={20} className="text-slate-900" />
                  <div>
                    <p className="font-bold text-slate-900">User Application (Driver)</p>
                    <p className="text-xs text-slate-500">SOS Request, Live Map, Payments</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 border-b border-slate-100">
                  <CheckCircle2 size={20} className="text-slate-900" />
                  <div>
                    <p className="font-bold text-slate-900">Partner Application (Mechanic)</p>
                    <p className="text-xs text-slate-500">Job Radar, Navigation, Wallet</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 border-b border-slate-100">
                  <CheckCircle2 size={20} className="text-slate-900" />
                  <div>
                    <p className="font-bold text-slate-900">Admin Command Center</p>
                    <p className="text-xs text-slate-500">User Verification, Dispute Resolution, Analytics</p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* === FOOTER / SIGNATURE === */}
          <footer className="mt-16 pt-8 border-t-4 border-slate-900 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Architectural Approval</p>
              
              {/* DIGITAL SIGNATURE */}
              <div className="font-serif italic text-3xl text-slate-900 mb-2" style={{ fontFamily: 'cursive' }}>
                Boluwatife Adeoye
              </div>
              
              <div className="h-px w-40 bg-slate-300 mb-2"></div>
              <p className="text-sm font-black text-slate-900 uppercase">Lead Technical Architect</p>
              <p className="text-xs text-slate-500">boluadeoye.com.ng</p>
            </div>
            
            <div className="text-right">
              <div className="w-16 h-16 bg-slate-900 text-white flex items-center justify-center font-black text-2xl">
                BA
              </div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
