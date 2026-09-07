"use client";
import { useState, useEffect } from "react";
import { 
  Download, ShieldCheck, Scale, Building2, Server, Lock, 
  FileText, CheckCircle2, AlertTriangle, CreditCard, Cpu, 
  Globe, PenTool, ExternalLink, Layers
} from "lucide-react";
import Link from "next/link";

const logoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1788790816/blog_assets/hiyhsdkblezih5vdzxdy.png";

// Hoisted Reusable Subcomponents
function DocHeader({ pageNum }) {
  return (
    <header className="h-[14mm] flex items-end justify-between border-b-2 border-[#071D3D] pb-2 mb-4 relative z-10">
      <div className="flex items-center gap-2.5">
        <img src={logoUrl} alt="Eden Studios" className="h-6 object-contain" />
        <span className="font-inter text-[10px] font-black uppercase tracking-[0.2em] text-[#071D3D]">
          Eden Studios // Master Services Agreement
        </span>
      </div>
      <div className="flex items-center gap-3 font-mono text-[9.5px]">
        <span className="text-[#071D3D] font-bold">ZURI-MSA-2026-V1</span>
        <span className="font-black text-white bg-[#071D3D] px-2 py-0.5 rounded">PAGE {pageNum}</span>
      </div>
    </header>
  );
}

function DocFooter() {
  return (
    <footer className="h-[10mm] flex items-center justify-between border-t-2 border-[#071D3D] text-[#000000] font-mono text-[8.5px] uppercase tracking-widest relative z-10 mt-auto pt-2">
      <span className="font-black">LEGALLY BINDING MASTER SERVICES AGREEMENT</span>
      <div className="flex items-center gap-2">
        <span className="text-[#071D3D] font-black">ZURI POS HUB</span>
        <div className="w-2 h-2 bg-[#071D3D] rounded-full"></div>
      </div>
    </footer>
  );
}

export default function ZuriMSA() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setTimeout(() => setIsReady(true), 800); }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Zuri_POS_Hub_Master_Services_Agreement_2026";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-blue-100 antialiased">
      
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=Inter:wght@500;600;700;800;900&family=JetBrains+Mono:wght@600;700;800&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { 
            size: A4; 
            margin: 0; 
          }
          body { 
            background-color: #FFFFFF !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
          body * { visibility: hidden; }
          #msa-render, #msa-render * { visibility: visible; }
          #msa-render { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            background: #FFFFFF !important; 
          }
          .a4-page { 
            height: 297mm; 
            width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #FFFFFF !important; 
            box-sizing: border-box; 
            overflow: hidden; 
            display: flex; 
            flex-direction: column; 
            padding: 15mm 18mm 13mm 18mm; 
          }
          .no-print { display: none !important; }
        }
        .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* PORTAL (Screen View) */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl rounded-2xl border-t-8 border-[#071D3D]">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-50 border-2 border-[#071D3D] rounded-2xl flex items-center justify-center p-3 shadow-sm">
            <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
          </div>

          <h1 className="font-display text-2xl font-black text-[#071D3D] mb-1 uppercase">Eden Studios</h1>
          <p className="font-inter text-[#0052CC] text-xs font-black uppercase tracking-widest mb-8">Master Services Agreement (MSA)</p>

          {isReady ? (
            <button 
              onClick={handlePrint}
              className="w-full bg-[#071D3D] hover:bg-slate-900 text-white font-inter font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Download size={18} />
              <span>Download Master Contract (PDF)</span>
            </button>
          ) : (
            <p className="text-slate-500 font-mono text-xs animate-pulse">Compiling Contract Terms...</p>
          )}

          <Link href="/" className="block mt-6 text-xs text-slate-400 hover:text-slate-700 uppercase tracking-widest font-mono">
            &larr; Return to Dashboard
          </Link>
        </div>
      </div>

      {/* PRINT ENGINE: CRISP 300 DPI VECTOR WHITE */}
      <div id="msa-render" className="hidden print:block text-[#000000]">
        
        {/* ========================================================= */}
        {/* PAGE 1: RECITALS, PARTIES & CORE SCOPE (INCLUSIONS)       */}
        {/* ========================================================= */}
        <div className="a4-page">
          <DocHeader pageNum="01" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img src={logoUrl} alt="Logo" className="h-10 object-contain" />
                <div className="h-7 w-[2px] bg-[#071D3D]"></div>
                <div>
                  <span className="bg-[#071D3D] text-white px-2.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-widest">
                    Commercial Contract
                  </span>
                  <p className="font-mono text-[9px] font-black text-[#071D3D] mt-0.5">Contract Ref: ZURI-MSA-2026-V1</p>
                </div>
              </div>

              <h1 className="font-display text-3xl font-black text-[#071D3D] uppercase tracking-tight leading-[1.1] mb-1">
                Master Services Agreement
              </h1>
              <p className="font-mono text-[10px] font-black text-[#071D3D] tracking-wide">
                GOVERNING TURNKEY SOFTWARE ENGINEERING &bull; FIXED CONSIDERATION: ₦1,000,000 NGN
              </p>
              <div className="h-1 w-24 bg-[#071D3D] my-2.5"></div>
            </div>

            {/* PARTIES RECITAL */}
            <div className="border-2 border-[#071D3D] rounded-xl p-3.5 bg-white space-y-2">
              <p className="font-mono text-[10px] font-black uppercase text-[#071D3D] tracking-widest">Preamble &amp; Contractual Parties</p>
              <div className="grid grid-cols-2 gap-4 font-inter text-[11px]">
                <div className="border-2 border-[#071D3D] bg-white p-3 rounded-lg">
                  <span className="font-mono text-[8.5px] uppercase text-[#071D3D] font-black block">Service Provider / Architect</span>
                  <h4 className="font-black text-[#071D3D] text-xs uppercase mt-0.5">Eden Studios Architecture &amp; Design Group</h4>
                  <p className="text-[10px] font-bold text-[#000000] mt-1">Authorized Signatory: <strong>Mr. Owoniyi Marvellous</strong></p>
                  <p className="text-[9px] text-[#000000] font-mono font-bold">Title: Lead Director &amp; Principal Architect</p>
                </div>

                <div className="border-2 border-[#071D3D] bg-white p-3 rounded-lg">
                  <span className="font-mono text-[8.5px] uppercase text-[#071D3D] font-black block">The Client</span>
                  <h4 className="font-black text-[#071D3D] text-xs uppercase mt-0.5">Zuri Point of Sales Hub</h4>
                  <p className="text-[10px] font-bold text-[#000000] mt-1">Authorized Signatory: <strong>Mrs. Taiwo Abolanle Olatinsu</strong></p>
                  <p className="text-[9px] text-[#000000] font-mono font-bold">Title: Authorized Principal Executive</p>
                </div>
              </div>
            </div>

            {/* CLAUSE 1: RECITALS */}
            <div className="border-2 border-[#071D3D] bg-white p-3 rounded-xl space-y-1">
              <h3 className="font-display text-sm font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <Scale size={16} className="text-[#071D3D]" /> 1.0 Recitals &amp; Commercial Intent
              </h3>
              <p className="font-inter text-[11.5px] font-bold leading-[1.65] text-[#000000] text-justify">
                WHEREAS, the Client desires to retain the Architect to design, architect, and engineer the core multi-tenant software system known as **Zuri Point of Sales Hub**; and WHEREAS, the Architect agrees to deliver the turnkey engineering and design services under the strict commercial terms, deliverable milestones, and specifications set forth herein for the fixed turnkey sum of <strong>₦1,000,000 (One Million Nigerian Naira)</strong> over an accelerated 8-week production timeline.
              </p>
            </div>

            {/* CLAUSE 2: CORE SCOPE OF WORK */}
            <div className="border-2 border-[#071D3D] bg-white p-3.5 rounded-xl space-y-2">
              <h3 className="font-display text-sm font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[#071D3D]" /> 2.0 Definitive Core Scope of Work (₦1,000,000 Inclusions)
              </h3>
              <p className="font-inter text-[11px] font-bold text-[#000000]">
                The Architect shall deliver the following eight (8) mandatory core software modules under the fixed turnkey fee:
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-inter text-[10px] font-bold text-[#000000]">
                <p>&bull; 1. Complete Custom UI/UX Design System in Figma</p>
                <p>&bull; 2. Multi-Tenant &amp; Multi-Property Architecture (Postgres RLS)</p>
                <p>&bull; 3. Front-of-House F&amp;B POS with Table Floorplans</p>
                <p>&bull; 4. Local-First Offline Delta-Sync Engine (SQLite)</p>
                <p>&bull; 5. Anti-Theft Recipe BOM Fractional Stock Depletion</p>
                <p>&bull; 6. Front Desk PMS Tape Chart &amp; Unified Room Folio</p>
                <p>&bull; 7. Shift &amp; Audit Control with Blind Cash Drops</p>
                <p>&bull; 8. Multi-Platform Delivery: Windows (.exe), Android (.apk)</p>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* ========================================================= */}
        {/* PAGE 2: SCOPE EXCLUSIONS & THIRD-PARTY EXPENSES          */}
        {/* ========================================================= */}
        <div className="a4-page">
          <DocHeader pageNum="02" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9.5px] font-black text-[#071D3D] uppercase tracking-widest">Section 3.0 &amp; 4.0 // Scope Boundaries</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-2">
                Scope Exclusions &amp; Third-Party Utilities
              </h2>
            </div>

            {/* CLAUSE 3: EXPLICIT EXCLUSIONS */}
            <div className="border-2 border-[#071D3D] bg-white p-4 rounded-xl space-y-2">
              <h3 className="font-display text-sm font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <AlertTriangle size={16} className="text-[#071D3D]" /> 3.0 Explicit Scope Exclusions (Phase 2 Add-Ons)
              </h3>
              <p className="font-inter text-[12px] font-bold leading-relaxed text-[#000000] text-justify">
                It is mutually understood, agreed, and acknowledged that the fixed fee of ₦1,000,000 strictly covers the Core Deliverables set forth in Clause 2.0. The following advanced modules are **explicitly excluded** and shall require independent, unlinked Statements of Work (SOWs) and supplemental compensation:
              </p>
              
              <div className="border-2 border-[#071D3D] rounded-lg p-3 space-y-2 font-inter text-[11px] font-bold text-[#000000] bg-slate-50">
                <div className="flex items-start gap-2">
                  <span className="text-[#071D3D]">&bull;</span>
                  <p><strong>3.1 Zuri Smart Access Control:</strong> Integration with physical Smart Door Locks, RFID Keycard Encoders, NFC passes, and Elevator Relay Controller boards.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#071D3D]">&bull;</span>
                  <p><strong>3.2 Gym &amp; Wellness Membership Engine:</strong> Turnstile gate access verification, recurring membership subscription billing, and trainer booking schedules.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#071D3D]">&bull;</span>
                  <p><strong>3.3 Laundry Operations:</strong> Barcode garment intake tagging, dry cleaning progress tracking, and automated room folio posting.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#071D3D]">&bull;</span>
                  <p><strong>3.4 Venue &amp; Conference Hall Management:</strong> Hourly and daily hall rental engines, stage seating layouts, and AV equipment billing.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#071D3D]">&bull;</span>
                  <p><strong>3.5 WooCommerce E-Commerce Relay:</strong> Real-time bi-directional catalog and order synchronization with external WordPress web properties.</p>
                </div>
              </div>
            </div>

            {/* CLAUSE 4: THIRD-PARTY UTILITY EXPENSES */}
            <div className="border-2 border-[#071D3D] bg-white p-4 rounded-xl space-y-2">
              <h3 className="font-display text-sm font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <CreditCard size={16} className="text-[#071D3D]" /> 4.0 Third-Party Utility &amp; Pass-Through Expenses
              </h3>
              <p className="font-inter text-[12px] font-bold leading-relaxed text-[#000000] text-justify">
                The fixed fee of ₦1,000,000 applies strictly to engineering and design labor. The Client shall bear sole and exclusive financial liability for all external third-party subscriptions, developer accounts, infrastructure scales, and gateway fees required to operate the platform:
              </p>
              
              <div className="grid grid-cols-2 gap-3 font-inter text-[11px] font-bold text-[#000000]">
                <div className="border border-slate-300 p-2.5 rounded bg-slate-50">
                  <p className="text-[#071D3D] font-black uppercase text-[10px]">Developer Store Licenses</p>
                  <p className="mt-0.5 text-[10px]">Google Play Developer Account ($25 one-time) and Apple Developer Program ($99/year).</p>
                </div>
                <div className="border border-slate-300 p-2.5 rounded bg-slate-50">
                  <p className="text-[#071D3D] font-black uppercase text-[10px]">Telecom &amp; SMS Units</p>
                  <p className="mt-0.5 text-[10px]">SMS gateway credits (Termii / Twilio) for booking alerts and staff two-factor authentication.</p>
                </div>
                <div className="border border-slate-300 p-2.5 rounded bg-slate-50">
                  <p className="text-[#071D3D] font-black uppercase text-[10px]">Domain &amp; Merchant Fees</p>
                  <p className="mt-0.5 text-[10px]">Custom domain registrations (.com / .ng) and payment gateway processing fees (Paystack / PayPal).</p>
                </div>
                <div className="border border-slate-300 p-2.5 rounded bg-slate-50">
                  <p className="text-[#071D3D] font-black uppercase text-[10px]">Cloud Database Scaling</p>
                  <p className="mt-0.5 text-[10px]">Production database upgrades ($25/month) when active transactions exceed free serverless quotas.</p>
                </div>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>
        {/* ========================================================= */}
        {/* PAGE 3: IP RETENTION & SYSTEM LICENSING GUARD            */}
        {/* ========================================================= */}
        <div className="a4-page">
          <DocHeader pageNum="03" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9.5px] font-black text-[#071D3D] uppercase tracking-widest">Section 5.0 &amp; 6.0 // Ownership &amp; Security</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-2">
                Intellectual Property &amp; System Entitlement
              </h2>
            </div>

            {/* CLAUSE 5: IP TRANSFER */}
            <div className="border-2 border-[#071D3D] bg-white p-4 rounded-xl space-y-2">
              <h3 className="font-display text-sm font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <Lock size={16} className="text-[#071D3D]" /> 5.0 Intellectual Property Reservation &amp; Conditional Transfer
              </h3>
              <div className="space-y-2 font-inter text-[12px] font-bold text-[#000000] leading-relaxed text-justify">
                <p>
                  <strong>5.1 Retention of Title:</strong> Pursuant to Section 10 of the Copyright Act 2022 of the Federal Republic of Nigeria, all bespoke source code, database architectures, user interface tokens, and compiled binaries developed under this Agreement remain the exclusive intellectual property of Eden Studios Architecture &amp; Design Group throughout the project lifecycle.
                </p>
                <p>
                  <strong>5.2 Conditional Assignment:</strong> Complete title, ownership, and unencumbered commercial license to the bespoke software shall transfer to Zuri Point of Sales Hub <strong>ONLY AND EXCLUSIVELY UPON</strong> full, final, and cleared receipt of the Milestone 3 payment (₦200,000).
                </p>
                <p>
                  <strong>5.3 Prohibition of Premature Sublicensing:</strong> The Client is contractually barred from reselling, sublicensing, white-labeling, or distributing the software to external commercial third parties prior to the execution and full clearance of Milestone 3.
                </p>
              </div>
            </div>

            {/* CLAUSE 6: SYSTEM ENTITLEMENT GUARD */}
            <div className="border-2 border-[#071D3D] bg-white p-4 rounded-xl space-y-2.5">
              <h3 className="font-display text-sm font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <Cpu size={16} className="text-[#071D3D]" /> 6.0 System Entitlement Guard &amp; Licensing Heartbeat
              </h3>
              <div className="space-y-2 font-inter text-[12px] font-bold text-[#000000] leading-relaxed text-justify">
                <p>
                  <strong>6.1 Built-in Verification Protocol:</strong> The Client formally acknowledges and authorizes that the compiled binaries contain an embedded System Entitlement Guard designed to verify valid licensing status against the master cloud registry.
                </p>
                <p>
                  <strong>6.2 14-Day Offline Lease Grace Window:</strong> To accommodate network unreliability, the software operates with a rolling fourteen (14) day offline lease. The system must perform a brief cryptographic heartbeat validation over the network at least once every 14 days to renew operational authorization.
                </p>
                <p>
                  <strong>6.3 Breach Suspension Remedies:</strong> In the event of an uncured payment breach or default on any scheduled milestone disbursement, Eden Studios reserves the absolute legal and contractual right to suspend, restrict, or revoke licensing validation until all outstanding financial obligations are settled in full.
                </p>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* ========================================================= */}
        {/* PAGE 4: TERMINATION, MILESTONES & DIGITAL EXECUTION       */}
        {/* ========================================================= */}
        <div className="a4-page">
          <DocHeader pageNum="04" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9.5px] font-black text-[#071D3D] uppercase tracking-widest">Section 7.0 &amp; 8.0 // Commercials &amp; Execution</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-1.5">
                Termination, Milestones &amp; Execution
              </h2>
            </div>

            {/* CLAUSE 7: TERMINATION & DISPUTES */}
            <div className="border-2 border-[#071D3D] bg-white p-3.5 rounded-xl space-y-1.5">
              <h3 className="font-display text-xs font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <Scale size={15} className="text-[#071D3D]" /> 7.0 Default, Termination &amp; Dispute Resolution
              </h3>
              <div className="space-y-1 font-inter text-[11px] font-bold text-[#000000] leading-snug text-justify">
                <p>
                  <strong>7.1 Material Breach:</strong> Either party may terminate upon seven (7) days written notice if a material breach remains uncured. In the event of early termination by the Client, Eden Studios retains all disbursed milestone payments as fair compensation for labor executed.
                </p>
                <p>
                  <strong>7.2 Binding Arbitration:</strong> Governed by the laws of the Federal Republic of Nigeria. Disputes shall be resolved through good-faith executive consultation, failing which they shall be submitted to final and binding arbitration in accordance with the <strong>Arbitration and Mediation Act 2023</strong>.
                </p>
              </div>
            </div>

            {/* COMMERCIAL MILESTONE SCHEDULE */}
            <div className="border-2 border-[#071D3D] rounded-xl overflow-hidden">
              <div className="bg-[#071D3D] text-white p-2 font-mono font-black text-[9px] uppercase tracking-wider flex justify-between items-center">
                <span>Disbursement Schedule (Total: ₦1,000,000 NGN)</span>
                <span className="text-amber-400">8 Weeks Total</span>
              </div>
              <table className="w-full text-left font-inter text-[10.5px]">
                <tbody className="divide-y-2 divide-[#071D3D] font-bold text-[#000000]">
                  <tr className="bg-slate-50">
                    <td className="p-2.5 font-black text-[#071D3D] w-36">Milestone 1 (40%)<br/><span className="text-xs font-black text-black">₦400,000</span></td>
                    <td className="p-2.5 text-[10px]">Payable on kickoff. Covers multi-tenant cloud database architecture, organization hierarchy logic, and complete UI/UX Design System in Figma (Weeks 1–3).</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-black text-[#071D3D] w-36">Milestone 2 (40%)<br/><span className="text-xs font-black text-black">₦400,000</span></td>
                    <td className="p-2.5 text-[10px]">Payable on live staging demonstration of F&amp;B POS, local SQLite offline sync, Recipe BOM stock depletion, and KDS order routing (Weeks 4–6).</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-2.5 font-black text-[#071D3D] w-36">Milestone 3 (20%)<br/><span className="text-xs font-black text-black">₦200,000</span></td>
                    <td className="p-2.5 text-[10px]">Payable on final delivery of Front Desk PMS (Tape Chart, Room Folios), Housekeeping, Analytics, and compiled Windows (.exe) &amp; Android (.apk) installers (Weeks 7–8).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* CLAUSE 8: FORMAL E-SIGNATURE BLOCK */}
            <div className="space-y-2">
              <p className="font-display italic text-xs font-bold text-[#000000] text-center">
                &ldquo;IN WITNESS WHEREOF, the parties hereto have executed this Master Services Agreement via authorized digital signature.&rdquo;
              </p>

              <div className="grid grid-cols-2 gap-4">
                {/* SERVICE PROVIDER */}
                <div className="border-2 border-[#071D3D] bg-white p-3.5 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[8.5px] uppercase text-[#071D3D] font-black tracking-widest block">FOR: SERVICE PROVIDER</span>
                    <h4 className="font-display text-[11px] font-black text-[#071D3D] uppercase">Eden Studios Architecture &amp; Design Group</h4>
                    <p className="font-inter text-[10px] font-bold text-slate-900 mt-1">Signatory: <strong>MR. OWONIYI MARVELLOUS</strong></p>
                    <p className="font-inter text-[9px] text-slate-700 font-semibold">Title: Lead Director &amp; Principal Architect</p>
                  </div>
                  <div className="my-3 space-y-2 font-mono text-[9px] text-[#000000]">
                    <div>
                      <span className="font-bold text-[#071D3D] uppercase block text-[8px]">Digital Signature:</span>
                      <p className="font-black text-[#000000]">____________________________________</p>
                    </div>
                    <div>
                      <span className="font-bold text-[#071D3D] uppercase block text-[8px]">Date:</span>
                      <p className="font-black text-[#000000]">________________________</p>
                    </div>
                    <div>
                      <span className="font-bold text-[#071D3D] uppercase block text-[8px]">Audit Trail / IP Address:</span>
                      <p className="font-black text-[#000000]">______________________________</p>
                    </div>
                  </div>
                </div>

                {/* CLIENT */}
                <div className="border-2 border-[#071D3D] bg-white p-3.5 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[8.5px] uppercase text-[#071D3D] font-black tracking-widest block">FOR: THE CLIENT</span>
                    <h4 className="font-display text-[11px] font-black text-[#071D3D] uppercase">Zuri Point of Sales Hub</h4>
                    <p className="font-inter text-[10px] font-bold text-slate-900 mt-1">Signatory: <strong>MRS. TAIWO ABOLANLE OLATINSU</strong></p>
                    <p className="font-inter text-[9px] text-slate-700 font-semibold">Title: Authorized Principal Executive</p>
                  </div>
                  <div className="my-3 space-y-2 font-mono text-[9px] text-[#000000]">
                    <div>
                      <span className="font-bold text-[#071D3D] uppercase block text-[8px]">Digital Signature:</span>
                      <p className="font-black text-[#000000]">____________________________________</p>
                    </div>
                    <div>
                      <span className="font-bold text-[#071D3D] uppercase block text-[8px]">Date:</span>
                      <p className="font-black text-[#000000]">________________________</p>
                    </div>
                    <div>
                      <span className="font-bold text-[#071D3D] uppercase block text-[8px]">Audit Trail / IP Address:</span>
                      <p className="font-black text-[#000000]">______________________________</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-1 text-center font-mono text-[8.5px] font-bold text-[#071D3D] uppercase tracking-widest">
              &bull; Official Legal Contract &bull; Governed under the Laws of the Federal Republic of Nigeria &bull;
            </div>
          </main>
          <DocFooter />
        </div>

      </div>
    </div>
  );
}
