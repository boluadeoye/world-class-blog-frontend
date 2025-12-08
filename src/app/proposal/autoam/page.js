"use client";
import { Printer, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AutoamProposal() {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black font-serif p-0 md:p-8 print:p-0 print:bg-white">
      
      {/* === TOOLBAR (Hidden when printing) === */}
      <div className="fixed top-0 left-0 right-0 bg-slate-900 text-white p-4 flex justify-between items-center shadow-xl z-50 print:hidden">
        <Link href="/" className="flex items-center gap-2 text-sm font-sans text-slate-300 hover:text-white">
          <ArrowLeft size={16} /> Back to Site
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-xs font-sans text-slate-400 hidden md:inline">Autoam Architecture v1.0</span>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg font-sans font-bold text-sm transition-colors"
          >
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>

      {/* === A4 DOCUMENT CONTAINER === */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-2xl print:shadow-none print:w-full print:max-w-none min-h-[297mm] p-[20mm] mt-16 print:mt-0 mb-16 print:mb-0">
        
        {/* HEADER */}
        <header className="border-b-2 border-black pb-6 mb-8">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">Technical Architecture</h1>
              <p className="text-sm text-gray-600 uppercase tracking-widest">System Design Blueprint</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold">Autoam</h2>
              <p className="text-sm text-gray-500">Version 1.0 • MVP</p>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="prose prose-slate max-w-none prose-headings:font-serif prose-p:text-justify prose-p:leading-relaxed">
          
          {/* 1. EXECUTIVE SUMMARY */}
          <section className="mb-8">
            <h3 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">1. Executive Summary</h3>
            <p className="text-sm">
              Autoam is designed as a high-availability, real-time On-Demand Service Platform. The architecture prioritizes <strong>low-latency geolocation</strong> (connecting drivers to mechanics instantly), <strong>transactional security</strong> (escrow payments), and <strong>scalability</strong>. The system follows a Mobile-First, Cloud-Native approach.
            </p>
          </section>

          {/* 2. SYSTEM ARCHITECTURE */}
          <section className="mb-8">
            <h3 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">2. High-Level System Architecture</h3>
            <div className="bg-gray-50 p-4 rounded border border-gray-200 font-mono text-[10px] leading-tight whitespace-pre overflow-x-auto">
{`[ USER APP ]        [ MECHANIC APP ]      [ ADMIN PORTAL ]
(React Native)      (React Native)        (Next.js/React)
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
                  (PostgreSQL)
`}
            </div>
          </section>

          {/* 3. FRONTEND STRATEGY */}
          <section className="mb-8">
            <h3 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">3. Frontend Strategy</h3>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li><strong>User App (Driver):</strong> Built on React Native (Expo). Features "One-Tap SOS" and Offline Mode for caching vehicle details.</li>
              <li><strong>Partner App (Mechanic):</strong> Built on React Native. Features "Job Radar" background service and Turn-by-Turn Navigation.</li>
              <li><strong>Command Center (Admin):</strong> Built on Next.js. Features "God Mode Map" for live fleet tracking.</li>
            </ul>
          </section>

          {/* 4. BACKEND INFRASTRUCTURE */}
          <section className="mb-8">
            <h3 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">4. Backend Infrastructure</h3>
            <p className="text-sm mb-2"><strong>The Matching Algorithm:</strong> Uses a Heuristic Scoring System based on Distance, Specialization (Car Brand), Rating, and Availability.</p>
            
            <div className="bg-gray-50 p-4 rounded border border-gray-200 font-mono text-[10px] leading-tight whitespace-pre overflow-x-auto mt-4">
{`+-----------+       +-----------+       +-----------+
|   USERS   |       | REQUESTS  |       | MECHANICS |
+-----------+       +-----------+       +-----------+
| PK user_id|1-----*| PK req_id |*-----1| PK mech_id|
|   name    |       |   status  |       |   skills  |
|   phone   |       |   cost    |       |   rating  |
+-----------+       +-----------+       +-----------+`}
            </div>
          </section>

          {/* 5. SECURITY */}
          <section className="mb-8">
            <h3 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">5. Security & Compliance</h3>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li><strong>Escrow Payments:</strong> Funds are held in a ledger and only released to the mechanic upon job confirmation via OTP.</li>
              <li><strong>Data Privacy:</strong> TLS 1.3 Encryption for data in transit. Phone number masking (proxy calling) for privacy.</li>
            </ul>
          </section>

          {/* 6. WIREFRAME FLOW */}
          <section className="mb-8">
            <h3 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">6. User Journey (Wireframe)</h3>
            <div className="bg-gray-50 p-4 rounded border border-gray-200 font-mono text-[10px] leading-tight whitespace-pre overflow-x-auto">
{`[ HOME ] -> [ MAP VIEW ] -> [ SELECT SERVICE ]
                                    |
                                    v
[ MATCHING ] -> [ ALGORITHM ] -> [ TRACKING ]
                                    |
                                    v
[ COMPLETION ] <- [ ETA TIMER ] <- [ LIVE MAP ]`}
            </div>
          </section>

          {/* 7. DELIVERABLES */}
          <section className="mb-12">
            <h3 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">7. Deliverables</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-gray-50 border border-gray-200">
                <strong className="block mb-1">Phase 1</strong>
                High-Fidelity Figma Prototypes
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200">
                <strong className="block mb-1">Phase 2</strong>
                Functional MVP (Apps + Backend)
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200">
                <strong className="block mb-1">Phase 3</strong>
                Payments & Admin Dashboard
              </div>
            </div>
          </section>

        </div>

        {/* FOOTER / SIGNATURE */}
        <footer className="mt-12 pt-8 border-t-2 border-black flex justify-between items-end">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Architectural Approval</p>
            <div className="font-script text-2xl mb-1 font-bold">Boluwatife Adeoye</div>
            <p className="text-sm font-bold">Full-Stack Engineer & Technical Consultant</p>
            <p className="text-xs text-gray-600">boluadeoye.com.ng</p>
          </div>
          <div className="text-right text-xs text-gray-400">
            Generated: {new Date().toLocaleDateString()}
          </div>
        </footer>

      </div>
    </div>
  );
}
