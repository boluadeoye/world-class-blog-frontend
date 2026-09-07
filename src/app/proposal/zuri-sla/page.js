"use client";
import { useState, useEffect } from "react";
import { 
  Download, ShieldCheck, CheckCircle2, Lock, Scale, 
  FileText, Building2, Server, WifiOff, Clock, 
  AlertTriangle, Globe
} from "lucide-react";
import Link from "next/link";

const logoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1788790816/blog_assets/hiyhsdkblezih5vdzxdy.png";

// Reusable Navy Header
function DocHeader({ pageNum }) {
  return (
    <header className="h-[14mm] flex items-end justify-between border-b-2 border-[#071D3D] pb-2 mb-4 relative z-10">
      <div className="flex items-center gap-2.5">
        <img src={logoUrl} alt="Eden Studios" className="h-6 object-contain" />
        <span className="font-inter text-[10px] font-black uppercase tracking-[0.2em] text-[#071D3D]">
          Eden Studios // Legal &amp; Systems Governance
        </span>
      </div>
      <div className="flex items-center gap-3 font-mono text-[9.5px]">
        <span className="text-[#071D3D] font-bold">ZURI-SLA-SOP-2026-V1</span>
        <span className="font-black text-white bg-[#071D3D] px-2 py-0.5 rounded">PAGE {pageNum}</span>
      </div>
    </header>
  );
}

// Reusable Navy Footer
function DocFooter() {
  return (
    <footer className="h-[10mm] flex items-center justify-between border-t-2 border-[#071D3D] text-[#000000] font-mono text-[8.5px] uppercase tracking-widest relative z-10 mt-auto pt-2">
      <span className="font-black">SERVICE LEVEL AGREEMENT &amp; SYSTEMS OPERATING POLICY</span>
      <div className="flex items-center gap-2">
        <span className="text-[#071D3D] font-black">ZURI POS HUB</span>
        <div className="w-2 h-2 bg-[#071D3D] rounded-full"></div>
      </div>
    </footer>
  );
}

export default function ZuriSLA() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setTimeout(() => setIsReady(true), 800); }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Zuri_POS_Hub_SLA_and_Operating_Policy_2026";
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
          #sla-render, #sla-render * { visibility: visible; }
          #sla-render { 
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
          <p className="font-inter text-[#071D3D] text-xs font-black uppercase tracking-widest mb-8">Service Level Agreement &amp; Policy</p>

          {isReady ? (
            <button 
              onClick={handlePrint}
              className="w-full bg-[#071D3D] hover:bg-slate-900 text-white font-inter font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Download size={18} />
              <span>Download Official SLA (PDF)</span>
            </button>
          ) : (
            <p className="text-slate-500 font-mono text-xs animate-pulse">Compiling Legal Protocol...</p>
          )}

          <Link href="/" className="block mt-6 text-xs text-slate-400 hover:text-slate-700 uppercase tracking-widest font-mono">
            &larr; Return to Dashboard
          </Link>
        </div>
      </div>

      {/* PRINT ENGINE: PURE VECTOR CRISP WHITE */}
      <div id="sla-render" className="hidden print:block text-[#000000]">
        
        {/* ========================================================= */}
        {/* PAGE 1: PREAMBLE & CLOUD $0 BOOTSTRAP POLICY              */}
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
                    Legal &amp; Systems Policy
                  </span>
                  <p className="font-mono text-[9px] font-black text-[#071D3D] mt-0.5">Ref: ZURI-SLA-SOP-2026-V1</p>
                </div>
              </div>

              <h1 className="font-display text-3xl font-black text-[#071D3D] uppercase tracking-tight leading-[1.1] mb-1">
                Service Level Agreement &amp;<br/>
                Systems Operating Policy
              </h1>
              <p className="font-mono text-[10px] font-black text-[#071D3D] tracking-wide">
                EFFECTIVE DATE: SEPTEMBER 7, 2026 &bull; GOVERNING PLATFORM RUNTIME &amp; HARDWARE BOUNDARIES
              </p>
              <div className="h-1 w-24 bg-[#071D3D] my-2.5"></div>
            </div>

            {/* CONTRACT PARTIES */}
            <div className="border-2 border-[#071D3D] rounded-xl p-3.5 bg-white">
              <p className="font-mono text-[10px] font-black uppercase text-[#071D3D] tracking-widest mb-2">Contractual Parties &amp; Representatives</p>
              <div className="grid grid-cols-2 gap-4 font-inter text-[11px]">
                <div className="border-2 border-[#071D3D] bg-white p-3 rounded-lg">
                  <span className="font-mono text-[8.5px] uppercase text-[#071D3D] font-black block">1. Service Provider</span>
                  <h4 className="font-black text-[#071D3D] text-xs uppercase mt-0.5">Eden Studios Architecture &amp; Design Group</h4>
                  <p className="text-[10px] font-bold text-[#000000] mt-1">Represented by: <strong>Mr. Owoniyi Marvellous</strong></p>
                  <p className="text-[9px] text-[#000000] font-mono font-bold">Title: Lead Director &amp; Principal Architect</p>
                </div>

                <div className="border-2 border-[#071D3D] bg-white p-3 rounded-lg">
                  <span className="font-mono text-[8.5px] uppercase text-[#071D3D] font-black block">2. Client Organization</span>
                  <h4 className="font-black text-[#071D3D] text-xs uppercase mt-0.5">Zuri Point of Sales Hub</h4>
                  <p className="text-[10px] font-bold text-[#000000] mt-1">Represented by: <strong>Mrs. Taiwo Abolanle Olatinsu</strong></p>
                  <p className="text-[9px] text-[#000000] font-mono font-bold">Title: Authorized Principal Executive</p>
                </div>
              </div>
            </div>

            {/* SECTION 1: PREAMBLE */}
            <div className="border-2 border-[#071D3D] bg-white p-3.5 rounded-xl space-y-1.5">
              <h3 className="font-display text-sm font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <Scale size={16} className="text-[#071D3D]" /> 1.0 Purpose &amp; Preamble
              </h3>
              <p className="font-inter text-[12px] font-bold leading-[1.7] text-[#000000] text-justify">
                This Service Level Agreement (&ldquo;SLA&rdquo;) establishes the technical standards, uptime expectations, support protocols, and operational policies governing the Zuri Point of Sales Hub software delivered by Eden Studios Architecture &amp; Design Group to Zuri Point of Sales Hub. This binding instrument formalizes cloud hosting parameters, hardware boundaries, and third-party liabilities.
              </p>
            </div>

            {/* SECTION 2: $0 BOOTSTRAP CLOUD SCALING POLICY */}
            <div className="border-2 border-[#071D3D] bg-white p-3.5 rounded-xl space-y-2">
              <h3 className="font-display text-sm font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <Server size={16} className="text-[#071D3D]" /> 2.0 Cloud Infrastructure &amp; $0 Bootstrap Scaling Policy
              </h3>
              <div className="space-y-1.5 font-inter text-[11.5px] font-bold text-[#000000] leading-relaxed">
                <p>
                  <strong>2.1 Serverless $0 Launch:</strong> The system is engineered to deploy on high-capacity Serverless Infrastructure (Neon/Cloudflare/Vercel) providing <strong>₦0 / $0 in monthly hosting overhead</strong> during startup.
                </p>
                <p>
                  <strong>2.2 500MB Database Allocation:</strong> Free database storage is allocated up to <strong>500 Megabytes</strong> (holding approximately 500,000 to 800,000 completed sales and room folio transactions).
                </p>
                <p>
                  <strong>2.3 Mandatory Upgrade Trigger:</strong> When active tenant branches or database consumption cross the 500MB threshold, the Client is responsible for upgrading to the production cloud database tier (estimated at <strong>$25/month or ~₦40,000/month</strong>), funded directly by the Client.
                </p>
                <p>
                  <strong>2.4 Third-Party Outage Disclaimer:</strong> Eden Studios is not liable for third-party cloud provider outages (e.g., AWS, Cloudflare, Supabase, Neon, or telecommunication providers).
                </p>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* ========================================================= */}
        {/* PAGE 2: HARDWARE BOUNDARIES & 30-DAY WARRANTY SLA         */}
        {/* ========================================================= */}
        <div className="a4-page">
          <DocHeader pageNum="02" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9.5px] font-black text-[#071D3D] uppercase tracking-widest">Section 3.0 &amp; 4.0 // Operations &amp; Support</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-2">
                Hardware Boundaries &amp; Post-Launch Warranty
              </h2>
            </div>

            {/* SECTION 3: OFFLINE CONTINUITY & HARDWARE */}
            <div className="border-2 border-[#071D3D] bg-white p-4 rounded-xl space-y-2">
              <h3 className="font-display text-sm font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <WifiOff size={16} className="text-[#071D3D]" /> 3.0 Offline Continuity &amp; Local Hardware Boundaries
              </h3>
              <div className="space-y-2 font-inter text-[12px] font-bold text-[#000000] leading-relaxed">
                <p>
                  <strong>3.1 100% Local-First Mesh Guarantee:</strong> Zuri operates on a 100% Local-First Architecture. Internet outages (e.g., MTN, Starlink, Airtel, Glo) will <strong>NOT</strong> halt cashier POS terminals, kitchen display screens, or receipt printing over local Wi-Fi.
                </p>
                <p>
                  <strong>3.2 Client Hardware Requirements:</strong> The Client is responsible for providing functional hardware meeting minimum specifications: Windows PCs with 4GB+ RAM, Android/iOS tablets, local Wi-Fi routers, and 80mm ESC/POS thermal receipt printers.
                </p>
                <p>
                  <strong>3.3 Peripheral Hardware Disclaimer:</strong> Eden Studios provides standard ESC/POS printer protocol integration. Physical hardware malfunctions (paper jams, broken thermal heads, damaged USB cables) are hardware vendor issues, not software defects.
                </p>
              </div>
            </div>

            {/* SECTION 4: 30-DAY WARRANTY & SLA MATRIX */}
            <div className="border-2 border-[#071D3D] bg-white p-4 rounded-xl space-y-2.5">
              <h3 className="font-display text-sm font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-[#071D3D]" /> 4.0 Post-Launch Warranty &amp; Incident Response SLA
              </h3>
              <div className="space-y-1.5 font-inter text-[12px] font-bold text-[#000000] leading-relaxed">
                <p>
                  <strong>4.1 30-Day Critical Warranty:</strong> Eden Studios provides a 30-day warranty starting from final deployment (Milestone 3 sign-off) covering all critical software bug fixes at zero cost.
                </p>
                <p>
                  <strong>4.2 Bug vs. Change Request Definition:</strong> A bug is defined strictly as code failing to perform as specified in the Master SOW. Requests for new features, new UI layouts, or modified workflows are classified as Change Requests and billed separately.
                </p>
                <p>
                  <strong>4.3 Post-Warranty Retainer:</strong> After the 30-day warranty expires, ongoing system maintenance, server monitoring, and feature updates require an optional Monthly Support Retainer.
                </p>
              </div>

              {/* SLA INCIDENT RESPONSE TABLE */}
              <div className="border-2 border-[#071D3D] rounded-lg overflow-hidden mt-3">
                <table className="w-full text-left font-inter text-[11px]">
                  <thead className="bg-[#071D3D] text-white font-mono font-black text-[9px] uppercase">
                    <tr>
                      <th className="p-2.5">Severity Tier</th>
                      <th className="p-2.5">Incident Definition</th>
                      <th className="p-2.5">Initial Response</th>
                      <th className="p-2.5">Target Resolution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-[#071D3D] font-black text-[#000000]">
                    <tr>
                      <td className="p-2.5 text-[#071D3D]">P1 &mdash; Critical</td>
                      <td className="p-2.5">Core POS halted, cannot bill guests</td>
                      <td className="p-2.5 font-mono">&lt; 4 Hours</td>
                      <td className="p-2.5 font-mono">Same Business Day</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-2.5 text-[#071D3D]">P2 &mdash; Major</td>
                      <td className="p-2.5">Single device failure, KDS delayed</td>
                      <td className="p-2.5 font-mono">&lt; 12 Hours</td>
                      <td className="p-2.5 font-mono">24 Hours</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-[#071D3D]">P3 &mdash; Minor</td>
                      <td className="p-2.5">Non-blocking cosmetic or reporting query</td>
                      <td className="p-2.5 font-mono">&lt; 24 Hours</td>
                      <td className="p-2.5 font-mono">Next Release Cycle</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>
        {/* ========================================================= */}
        {/* PAGE 3: DATA PRIVACY & STORE REVIEW DECOUPLING           */}
        {/* ========================================================= */}
        <div className="a4-page">
          <DocHeader pageNum="03" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9.5px] font-black text-[#071D3D] uppercase tracking-widest">Section 5.0 &amp; 6.0 // Compliance &amp; Stores</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-2">
                Data Sovereignty &amp; Store Review Decoupling
              </h2>
            </div>

            {/* SECTION 5: DATA PRIVACY & NDPR COMPLIANCE */}
            <div className="border-2 border-[#071D3D] bg-white p-4 rounded-xl space-y-2">
              <h3 className="font-display text-sm font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <Lock size={16} className="text-[#071D3D]" /> 5.0 Data Privacy, Tenant Isolation &amp; NDPR Compliance
              </h3>
              <div className="space-y-2 font-inter text-[12px] font-bold text-[#000000] leading-relaxed">
                <p>
                  <strong>5.1 Exclusive Client Ownership:</strong> All tenant transaction records, room folios, guest lists, and sales reports belong <strong>100% exclusively to Zuri Point of Sales Hub</strong> and its licensed property clients.
                </p>
                <p>
                  <strong>5.2 Row-Level Security (RLS) Isolation:</strong> Eden Studios enforces strict Row-Level Security (RLS) at the database kernel layer to ensure Property A can never view or access Property B&apos;s records under any operational state.
                </p>
                <p>
                  <strong>5.3 NDPR Compliance Guarantee:</strong> Eden Studios operates in strict conformity with the Nigeria Data Protection Act (NDPR). Eden Studios will not sell, share, or access Client data without express written permission for technical support.
                </p>
              </div>
            </div>

            {/* SECTION 6: STORE DEPLOYMENT TRACKS */}
            <div className="border-2 border-[#071D3D] bg-white p-4 rounded-xl space-y-2.5">
              <h3 className="font-display text-sm font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <Globe size={16} className="text-[#071D3D]" /> 6.0 Store Deployment Tracks (Explicit Policy)
              </h3>
              <div className="space-y-2 font-inter text-[12px] font-bold text-[#000000] leading-relaxed">
                <p>
                  <strong>6.1 Decoupled Milestone Delivery:</strong> Public App Store deployment (Google Play, Apple App Store) is decoupled from the 8-Week Core Engineering timeline.
                </p>
                <p>
                  <strong>6.2 Google Play 20-Tester Rule:</strong> The Client acknowledges that Google Play requires a 14-day closed beta test with 20 opted-in users before public release.
                </p>
                <p>
                  <strong>6.3 Apple App Store Exemption:</strong> Affirms that Zuri processes real-world physical hospitality services, qualifying under Apple Guideline 3.1.5 (Physical Goods Exemption) and exempting sales from Apple&apos;s 30% digital fee.
                </p>
                <p>
                  <strong>6.4 Direct Standalone Installers:</strong> Eden Studios will provide direct Windows (.exe / .msix) and Android (.apk) installers so hotel and restaurant operations can begin immediately on Day 1 without waiting for store reviews.
                </p>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* ========================================================= */}
        {/* PAGE 4: FORMAL DIGITAL EXECUTION & E-SIGNATURE BLOCK     */}
        {/* ========================================================= */}
        <div className="a4-page">
          <DocHeader pageNum="04" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9.5px] font-black text-[#071D3D] uppercase tracking-widest">Section 7.0 // Execution</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-2">
                7.0 Digital Execution &amp; E-Signature Block
              </h2>
              <p className="font-inter text-xs text-[#000000] font-bold leading-relaxed">
                This document serves as the formal operational instrument governing the runtime, maintenance, and cloud boundaries for the Zuri Point of Sales Hub platform.
              </p>
            </div>

            <div className="border-2 border-[#071D3D] bg-white p-4 rounded-xl">
              <p className="font-mono text-[9.5px] font-black text-[#071D3D] uppercase tracking-widest mb-1">Contractual Attestation</p>
              <p className="font-display italic text-sm font-bold text-[#000000] leading-relaxed">
                &ldquo;IN WITNESS WHEREOF, the parties hereto have accepted and ratified this Service Level Agreement &amp; Operating Policy via authorized digital signature.&rdquo;
              </p>
            </div>

            {/* CLEAN, FORMAL DUAL SIGNATURE BOXES (NO WEB BADGES) */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* SERVICE PROVIDER: EDEN STUDIOS */}
              <div className="border-2 border-[#071D3D] bg-white p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase text-[#071D3D] font-black tracking-widest block mb-1">FOR: SERVICE PROVIDER</span>
                  <h4 className="font-display text-xs font-black text-[#071D3D] uppercase">Eden Studios Architecture &amp; Design Group</h4>
                  <p className="font-inter text-[11px] font-bold text-[#000000] mt-1.5">Signatory: <strong>MR. OWONIYI MARVELLOUS</strong></p>
                  <p className="font-inter text-[10px] text-[#000000] font-semibold">Title: Lead Director &amp; Principal Architect</p>
                </div>

                <div className="my-6 space-y-4 font-mono text-[10px] text-[#000000]">
                  <div>
                    <span className="font-bold text-[#071D3D] uppercase block mb-1">Digital Signature:</span>
                    <p className="font-black tracking-tight text-[#000000]">____________________________________</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#071D3D] uppercase block mb-1">Date:</span>
                    <p className="font-black tracking-tight text-[#000000]">________________________</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#071D3D] uppercase block mb-1">Audit Trail / IP Address:</span>
                    <p className="font-black tracking-tight text-[#000000]">______________________________</p>
                  </div>
                </div>

                <p className="font-mono text-[8.5px] text-[#071D3D] font-bold border-t border-[#071D3D] pt-2">&bull; Authorized Execution Block</p>
              </div>

              {/* CLIENT: ZURI POS HUB */}
              <div className="border-2 border-[#071D3D] bg-white p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase text-[#071D3D] font-black tracking-widest block mb-1">FOR: CLIENT</span>
                  <h4 className="font-display text-xs font-black text-[#071D3D] uppercase">Zuri Point of Sales Hub</h4>
                  <p className="font-inter text-[11px] font-bold text-[#000000] mt-1.5">Signatory: <strong>MRS. TAIWO ABOLANLE OLATINSU</strong></p>
                  <p className="font-inter text-[10px] text-[#000000] font-semibold">Title: Authorized Principal Executive</p>
                </div>

                <div className="my-6 space-y-4 font-mono text-[10px] text-[#000000]">
                  <div>
                    <span className="font-bold text-[#071D3D] uppercase block mb-1">Digital Signature:</span>
                    <p className="font-black tracking-tight text-[#000000]">____________________________________</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#071D3D] uppercase block mb-1">Date:</span>
                    <p className="font-black tracking-tight text-[#000000]">________________________</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#071D3D] uppercase block mb-1">Audit Trail / IP Address:</span>
                    <p className="font-black tracking-tight text-[#000000]">______________________________</p>
                  </div>
                </div>

                <p className="font-mono text-[8.5px] text-[#071D3D] font-bold border-t border-[#071D3D] pt-2">&bull; Authorized Execution Block</p>
              </div>

            </div>

            <div className="py-2 text-center font-mono text-[9px] font-bold text-[#071D3D] uppercase tracking-widest">
              &bull; Official Legal Instrument &bull; Effective Date: September 7, 2026 &bull;
            </div>
          </main>
          <DocFooter />
        </div>

      </div>
    </div>
  );
}
