"use client";
import { Download, ArrowLeft, CheckSquare, Layers, Shield, Zap, Database } from "lucide-react";
import Link from "next/link";

export default function AutoamProposal() {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900">
      
      {/* === GLOBAL PRINT STYLES === */}
      <style jsx global>{`
        /* 1. HIDE EVERYTHING ON PRINT */
        @media print {
          body * {
            visibility: hidden;
          }
          /* 2. SHOW ONLY THE DOCUMENT */
          #print-container, #print-container * {
            visibility: visible;
          }
          /* 3. POSITION DOCUMENT AT TOP LEFT */
          #print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            background: white;
          }
          /* 4. RESET PAGE MARGINS */
          @page {
            size: A4;
            margin: 0mm;
          }
          /* 5. HIDE WEB ELEMENTS */
          .no-print { display: none !important; }
          
          /* 6. FORCE PAGE BREAKS */
          .page-break { 
            page-break-before: always; 
            margin-top: 2rem;
            display: block;
          }
        }
      `}</style>

      {/* =====================================================================================
          VIEW 1: THE DOWNLOAD PORTAL (Screen Only)
         ===================================================================================== */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden z-50">
        
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>

        {/* The Card */}
        <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <span className="font-black text-2xl text-slate-900">BA</span>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Technical Architecture</h1>
          <p className="text-slate-400 text-sm mb-8">Project: Autoam MVP • v2.0 (Final)</p>

          <button 
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-200 text-slate-950 font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl"
          >
            <Download size={20} />
            <span>Download Blueprint PDF</span>
          </button>

          <Link href="/" className="block mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← Return to Dashboard
          </Link>
        </div>
      </div>

      {/* =====================================================================================
          VIEW 2: THE DOCUMENT (Print Only)
         ===================================================================================== */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block">
        
        {/* === PAGE 1: COVER & EXECUTIVE SUMMARY === */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start border-b-4 border-black pb-6 mb-10">
            <div>
              <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-2">Autoam</h1>
              <p className="text-xl font-bold text-slate-600 uppercase tracking-widest">Technical Blueprint</p>
            </div>
            <div className="text-right">
              <div className="bg-black text-white px-4 py-1 font-bold text-sm uppercase inline-block mb-1">Confidential</div>
              <p className="text-xs font-mono">DOC-ID: ATM-2025-X1</p>
            </div>
          </div>

          {/* 1. Executive Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-black pl-4 mb-6">1. Executive Summary</h2>
            <p className="text-sm leading-relaxed text-justify mb-4 font-medium text-slate-800">
              Autoam is engineered to be a high-availability, geolocation-centric marketplace connecting vehicle owners with automotive service providers. Unlike standard directories, Autoam functions as a <strong>Real-Time Logistics Platform</strong>.
            </p>
            <p className="text-sm leading-relaxed text-justify font-medium text-slate-800">
              The architecture prioritizes <strong>Zero-Latency Dispatching</strong> (matching drivers to mechanics in under 2 seconds), <strong>Financial Trust</strong> (via an automated escrow ledger), and <strong>Offline Resilience</strong> (allowing operations in low-network zones). This document outlines the full-stack implementation strategy required to scale from MVP to 100,000+ users.
            </p>
          </section>

          {/* 2. Core Stack Strategy */}
          <section className="flex-1">
            <h2 className="text-xl font-black uppercase border-l-8 border-black pl-4 mb-6">2. Technology Stack Strategy</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="border-2 border-black p-4">
                <div className="flex items-center gap-2 mb-2 border-b-2 border-black pb-2">
                  <span className="font-black text-sm uppercase">Mobile (User & Pro)</span>
                </div>
                <p className="font-bold text-sm">React Native (Expo)</p>
                <ul className="list-disc pl-4 mt-2 text-xs space-y-1 text-slate-700">
                  <li><strong>Why:</strong> Single codebase for iOS/Android.</li>
                  <li><strong>Key Tech:</strong> OTA Updates (ship fixes instantly).</li>
                  <li><strong>Maps:</strong> Native Google Maps SDK.</li>
                </ul>
              </div>
              <div className="border-2 border-black p-4">
                <div className="flex items-center gap-2 mb-2 border-b-2 border-black pb-2">
                  <span className="font-black text-sm uppercase">Backend Core</span>
                </div>
                <p className="font-bold text-sm">Node.js + NestJS</p>
                <ul className="list-disc pl-4 mt-2 text-xs space-y-1 text-slate-700">
                  <li><strong>Why:</strong> Strict architecture for scale.</li>
                  <li><strong>Queue:</strong> BullMQ (Redis) for dispatching.</li>
                  <li><strong>Protocol:</strong> Hybrid REST + WebSockets.</li>
                </ul>
              </div>
              <div className="border-2 border-black p-4">
                <div className="flex items-center gap-2 mb-2 border-b-2 border-black pb-2">
                  <span className="font-black text-sm uppercase">Data Layer</span>
                </div>
                <p className="font-bold text-sm">PostgreSQL + PostGIS</p>
                <ul className="list-disc pl-4 mt-2 text-xs space-y-1 text-slate-700">
                  <li><strong>Why:</strong> Relational integrity + Geo indexing.</li>
                  <li><strong>Query:</strong> "Find mechanics within 5km radius".</li>
                </ul>
              </div>
              <div className="border-2 border-black p-4">
                <div className="flex items-center gap-2 mb-2 border-b-2 border-black pb-2">
                  <span className="font-black text-sm uppercase">Security</span>
                </div>
                <p className="font-bold text-sm">JWT + AES-256</p>
                <ul className="list-disc pl-4 mt-2 text-xs space-y-1 text-slate-700">
                  <li><strong>Auth:</strong> Role-Based Access Control (RBAC).</li>
                  <li><strong>Privacy:</strong> Phone number masking via Proxy.</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* Page Number */}
          <div className="absolute bottom-8 right-8 text-xs font-bold text-slate-400">Page 1/3</div>
        </div>

        {/* === PAGE BREAK === */}
        <div className="page-break"></div>

        {/* === PAGE 2: ARCHITECTURE DIAGRAM & DATA === */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          {/* 3. System Architecture Diagram */}
          <section className="mb-12">
            <h2 className="text-xl font-black uppercase border-l-8 border-black pl-4 mb-8">3. System Architecture Diagram</h2>
            
            {/* BOLD CSS DIAGRAM */}
            <div className="flex flex-col items-center gap-6 text-xs font-bold uppercase">
              
              {/* CLIENT LAYER */}
              <div className="flex gap-4 w-full justify-center">
                <div className="border-4 border-black p-3 w-32 text-center bg-slate-100">User App<br/>(Driver)</div>
                <div className="border-4 border-black p-3 w-32 text-center bg-slate-100">Partner App<br/>(Mechanic)</div>
                <div className="border-4 border-black p-3 w-32 text-center bg-slate-100">Admin<br/>Portal</div>
              </div>

              {/* ARROWS */}
              <div className="h-6 w-1 bg-black"></div>

              {/* GATEWAY LAYER */}
              <div className="border-4 border-black p-4 w-full max-w-lg text-center bg-white relative">
                <span className="absolute -top-3 left-4 bg-white px-2 text-xs font-black">Load Balancer / Firewall</span>
                API GATEWAY (Nginx / Cloudflare)
                <br/><span className="text-[10px] font-normal normal-case text-slate-600">Rate Limiting • SSL Termination • DDoS Protection</span>
              </div>

              {/* ARROWS */}
              <div className="h-6 w-1 bg-black"></div>

              {/* SERVICE LAYER */}
              <div className="flex gap-4 w-full justify-center">
                <div className="border-4 border-black p-4 w-40 text-center bg-white">
                  CORE API<br/>(NestJS)
                  <div className="mt-2 border-t-2 border-black pt-1 text-[9px] text-slate-600">Auth • Payments • Users</div>
                </div>
                <div className="border-4 border-black p-4 w-40 text-center bg-white">
                  DISPATCH ENGINE<br/>(Socket.io)
                  <div className="mt-2 border-t-2 border-black pt-1 text-[9px] text-slate-600">Live Tracking • Chat</div>
                </div>
              </div>

              {/* ARROWS */}
              <div className="h-6 w-1 bg-black"></div>

              {/* DATA LAYER */}
              <div className="flex gap-4 w-full justify-center">
                <div className="border-4 border-black p-3 w-32 text-center bg-slate-100">PostgreSQL<br/>(Primary DB)</div>
                <div className="border-4 border-black p-3 w-32 text-center bg-slate-100">Redis<br/>(Cache/Queue)</div>
                <div className="border-4 border-black p-3 w-32 text-center bg-slate-100">S3 Bucket<br/>(Media)</div>
              </div>

            </div>
          </section>

          {/* 4. Database Schema */}
          <section className="flex-1">
            <h2 className="text-xl font-black uppercase border-l-8 border-black pl-4 mb-6">4. Core Database Schema</h2>
            <div className="space-y-4 text-xs font-mono">
              
              <div className="border-2 border-black p-3">
                <p className="font-black border-b-2 border-black pb-1 mb-2">USERS (Drivers & Mechanics)</p>
                <p className="text-slate-700">id (UUID) • phone (Unique) • password_hash • role (ENUM) • kyc_status • rating_avg • current_location (Point)</p>
              </div>

              <div className="border-2 border-black p-3">
                <p className="font-black border-b-2 border-black pb-1 mb-2">SERVICE_REQUESTS (Jobs)</p>
                <p className="text-slate-700">id • user_id • mechanic_id • vehicle_id • issue_type • status (PENDING/ACTIVE/COMPLETED) • location_coords • price_estimate</p>
              </div>

              <div className="border-2 border-black p-3">
                <p className="font-black border-b-2 border-black pb-1 mb-2">TRANSACTIONS (Escrow)</p>
                <p className="text-slate-700">id • request_id • amount • currency • provider_ref • status (HELD/RELEASED/REFUNDED) • created_at</p>
              </div>

            </div>
          </section>

          {/* Page Number */}
          <div className="absolute bottom-8 right-8 text-xs font-bold text-slate-400">Page 2/3</div>
        </div>

        {/* === PAGE BREAK === */}
        <div className="page-break"></div>

        {/* === PAGE 3: FEATURES & ROADMAP === */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          {/* 5. Detailed Feature Scope */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-black pl-4 mb-6">5. Detailed Feature Scope</h2>
            
            <div className="mb-4">
              <h3 className="font-bold text-lg uppercase mb-2">A. User Application</h3>
              <ul className="list-disc pl-5 text-sm space-y-1 text-slate-800">
                <li><strong>One-Tap SOS:</strong> Immediate request dispatch with auto-detected location.</li>
                <li><strong>Live Tracking:</strong> Uber-style map view showing mechanic's approach vector.</li>
                <li><strong>Vehicle Garage:</strong> Store multiple car profiles (Make, Model, Year).</li>
                <li><strong>Secure Wallet:</strong> Card/Bank integration with transaction history.</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-lg uppercase mb-2">B. Partner Application (Mechanic)</h3>
              <ul className="list-disc pl-5 text-sm space-y-1 text-slate-800">
                <li><strong>Job Radar:</strong> Background service detecting requests within set radius.</li>
                <li><strong>Turn-by-Turn Nav:</strong> Integrated Google Maps navigation to client.</li>
                <li><strong>Earnings Dashboard:</strong> Daily/Weekly payout visualization.</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-lg uppercase mb-2">C. Admin Command Center</h3>
              <ul className="list-disc pl-5 text-sm space-y-1 text-slate-800">
                <li><strong>God Mode Map:</strong> Real-time heatmap of all active agents and jobs.</li>
                <li><strong>Dispute Tribunal:</strong> Interface to review chat logs and resolve conflicts.</li>
              </ul>
            </div>
          </section>

          {/* 6. Implementation Roadmap */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-black pl-4 mb-6">6. Implementation Roadmap</h2>
            <div className="border-l-4 border-black ml-2 space-y-0">
              
              <div className="relative pl-8 pb-6">
                <div className="absolute -left-[11px] top-0 w-5 h-5 bg-black rounded-full border-4 border-white"></div>
                <h4 className="font-bold text-sm uppercase">Phase 1: Foundation (Weeks 1-3)</h4>
                <p className="text-xs text-slate-600 mt-1">System Design, Database Setup, UI/UX Wireframing, Auth System.</p>
              </div>

              <div className="relative pl-8 pb-6">
                <div className="absolute -left-[11px] top-0 w-5 h-5 bg-white border-4 border-black rounded-full"></div>
                <h4 className="font-bold text-sm uppercase">Phase 2: Core Engine (Weeks 4-7)</h4>
                <p className="text-xs text-slate-600 mt-1">Geolocation Logic, Request Matching Algorithm, Real-time Sockets.</p>
              </div>

              <div className="relative pl-8 pb-6">
                <div className="absolute -left-[11px] top-0 w-5 h-5 bg-white border-4 border-black rounded-full"></div>
                <h4 className="font-bold text-sm uppercase">Phase 3: Financials (Weeks 8-10)</h4>
                <p className="text-xs text-slate-600 mt-1">Payment Gateway Integration, Escrow Logic, Wallet System.</p>
              </div>

              <div className="relative pl-8">
                <div className="absolute -left-[11px] top-0 w-5 h-5 bg-white border-4 border-black rounded-full"></div>
                <h4 className="font-bold text-sm uppercase">Phase 4: Launch (Weeks 11-12)</h4>
                <p className="text-xs text-slate-600 mt-1">Beta Testing, Security Audit, App Store Deployment.</p>
              </div>

            </div>
          </section>

          {/* SIGNATURE BLOCK */}
          <footer className="mt-auto pt-8 border-t-4 border-black flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Architectural Approval</p>
              <div className="font-serif italic text-4xl text-black mb-2" style={{ fontFamily: 'cursive' }}>
                Boluwatife Adeoye
              </div>
              <div className="h-1 w-48 bg-black mb-2"></div>
              <p className="text-sm font-black text-black uppercase">Lead Technical Architect</p>
              <p className="text-xs text-slate-500">boluadeoye.com.ng</p>
            </div>
            <div className="text-right">
              <div className="w-24 h-24 bg-black text-white flex items-center justify-center font-black text-4xl">
                BA
              </div>
            </div>
          </footer>
          
          {/* Page Number */}
          <div className="absolute bottom-8 right-8 text-xs font-bold text-slate-400">Page 3/3</div>

        </div>

      </div>
    </div>
  );
}
