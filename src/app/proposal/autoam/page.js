"use client";
import { Download, ArrowLeft, CheckSquare, Layers, Shield, Zap, Database } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function AutoamProposal() {
  
  // === NUCLEAR OPTION: REMOVE GLOBAL HEADER ===
  useEffect(() => {
    // 1. Hide scrollbar on body to prevent double scrolling
    document.body.style.overflow = "hidden";
    
    // 2. Find and hide global headers/navs
    const headers = document.querySelectorAll('header, nav, .sticky, .fixed');
    headers.forEach(el => {
      // Don't hide OUR toolbar (check if it's inside the proposal-root)
      if (!el.closest('#proposal-root')) {
        el.style.display = 'none';
      }
    });

    return () => {
      // Cleanup when leaving page
      document.body.style.overflow = "";
      headers.forEach(el => el.style.display = '');
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    // ID used to protect our toolbar from the cleanup script
    <div id="proposal-root" className="fixed inset-0 z-[9999] bg-slate-100 overflow-y-auto font-sans text-slate-900">
      
      {/* === TOOLBAR (No Print) === */}
      <div className="fixed top-0 left-0 right-0 bg-slate-900 text-white p-4 flex justify-between items-center shadow-2xl z-50 print:hidden">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white uppercase tracking-widest">
          <ArrowLeft size={16} /> Exit Viewer
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-emerald-400 animate-pulse">● SYSTEM READY</span>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white text-black hover:bg-slate-200 px-6 py-2 rounded-sm font-black text-xs uppercase tracking-widest transition-colors"
          >
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>

      {/* === A4 DOCUMENT CANVAS === */}
      <div className="min-h-screen flex justify-center py-20 print:py-0 print:block">
        <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl print:shadow-none print:w-full p-[20mm] relative">
          
          {/* WATERMARK */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-9xl font-black text-slate-50 opacity-[0.03] pointer-events-none whitespace-nowrap">
            CONFIDENTIAL
          </div>

          {/* === HEADER === */}
          <header className="border-b-[6px] border-black pb-8 mb-12 flex justify-between items-end">
            <div>
              <h1 className="text-6xl font-black tracking-tighter leading-[0.85] mb-4">
                AUTOAM<br/>
                <span className="text-slate-400">MVP.</span>
              </h1>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
                <span className="w-2 h-2 bg-black"></span>
                Technical Architecture
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black mb-1">V1.0</div>
              <p className="text-xs font-mono text-slate-400">DEC 08, 2025</p>
            </div>
          </header>

          {/* === 01. EXECUTIVE SUMMARY === */}
          <section className="mb-12">
            <h3 className="text-lg font-black uppercase border-b-2 border-slate-100 pb-2 mb-4 flex items-center gap-2">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center text-xs">01</span>
              Executive Summary
            </h3>
            <p className="text-sm leading-relaxed text-justify font-medium text-slate-700">
              Autoam is engineered as a high-availability <strong>On-Demand Service Platform</strong>. The architecture prioritizes low-latency geolocation (connecting drivers to mechanics instantly), transactional security (escrow payments), and horizontal scalability. The system follows a <strong>Mobile-First, Cloud-Native</strong> approach to ensure reliability in field conditions.
            </p>
          </section>

          {/* === 02. THE STACK (Grid) === */}
          <section className="mb-12">
            <h3 className="text-lg font-black uppercase border-b-2 border-slate-100 pb-2 mb-6 flex items-center gap-2">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center text-xs">02</span>
              Core Infrastructure
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 border-2 border-slate-900 bg-slate-50">
                <div className="flex items-center gap-2 mb-2 text-slate-900">
                  <Layers size={18} />
                  <span className="font-black text-sm uppercase">Mobile Apps</span>
                </div>
                <p className="text-xs font-bold text-slate-600">React Native (Expo)</p>
                <p className="text-[10px] text-slate-400 mt-1">Unified iOS & Android Codebase</p>
              </div>
              <div className="p-4 border-2 border-slate-900 bg-slate-50">
                <div className="flex items-center gap-2 mb-2 text-slate-900">
                  <Zap size={18} />
                  <span className="font-black text-sm uppercase">Backend API</span>
                </div>
                <p className="text-xs font-bold text-slate-600">Node.js / NestJS</p>
                <p className="text-[10px] text-slate-400 mt-1">Event-Driven Architecture</p>
              </div>
              <div className="p-4 border-2 border-slate-900 bg-slate-50">
                <div className="flex items-center gap-2 mb-2 text-slate-900">
                  <Database size={18} />
                  <span className="font-black text-sm uppercase">Database</span>
                </div>
                <p className="text-xs font-bold text-slate-600">PostgreSQL + PostGIS</p>
                <p className="text-[10px] text-slate-400 mt-1">Geospatial Indexing</p>
              </div>
              <div className="p-4 border-2 border-slate-900 bg-slate-50">
                <div className="flex items-center gap-2 mb-2 text-slate-900">
                  <Shield size={18} />
                  <span className="font-black text-sm uppercase">Security</span>
                </div>
                <p className="text-xs font-bold text-slate-600">TLS 1.3 & Escrow</p>
                <p className="text-[10px] text-slate-400 mt-1">PCI-DSS Compliant Payments</p>
              </div>
            </div>
          </section>

          {/* === 03. ARCHITECTURE DIAGRAM === */}
          <section className="mb-12">
            <h3 className="text-lg font-black uppercase border-b-2 border-slate-100 pb-2 mb-4 flex items-center gap-2">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center text-xs">03</span>
              Data Flow
            </h3>
            <div className="bg-slate-900 p-6 text-white font-mono text-[10px] leading-tight whitespace-pre overflow-hidden rounded-sm">
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

          {/* === 04. DELIVERABLES LIST === */}
          <section className="mb-12">
            <h3 className="text-lg font-black uppercase border-b-2 border-slate-100 pb-2 mb-4 flex items-center gap-2">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center text-xs">04</span>
              Scope of Work
            </h3>
            <ul className="space-y-3 text-sm font-medium text-slate-700">
              <li className="flex items-start gap-3">
                <CheckSquare size={16} className="mt-0.5 text-black" />
                <span><strong>User App:</strong> SOS Request, Live Map Tracking, Vehicle Profile, Payments.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckSquare size={16} className="mt-0.5 text-black" />
                <span><strong>Partner App:</strong> Job Radar, Turn-by-Turn Navigation, Earnings Wallet.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckSquare size={16} className="mt-0.5 text-black" />
                <span><strong>Admin Panel:</strong> User Verification, Dispute Resolution, Financial Analytics.</span>
              </li>
            </ul>
          </section>

          {/* === FOOTER / SIGNATURE === */}
          <footer className="mt-auto pt-12 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Architectural Approval</p>
              
              {/* SIGNATURE IMAGE OR FONT */}
              <div className="font-serif italic text-4xl text-black mb-2" style={{ fontFamily: 'cursive' }}>
                Boluwatife Adeoye
              </div>
              
              <div className="h-1 w-32 bg-black mb-2"></div>
              <p className="text-sm font-black text-black uppercase">Lead Technical Architect</p>
              <p className="text-xs text-slate-500">boluadeoye.com.ng</p>
            </div>
            
            <div className="text-right">
              <div className="w-20 h-20 bg-black text-white flex items-center justify-center font-black text-3xl">
                BA
              </div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
