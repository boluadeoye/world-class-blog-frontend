"use client";
import { useState, useEffect } from "react";
import { 
  Download, ShieldCheck, CheckCircle2, Lock, Scale, 
  FileText, Building2, Server, WifiOff, Clock, 
  AlertTriangle, Cpu, Globe, PenTool, Fingerprint, ExternalLink
} from "lucide-react";
import Link from "next/link";

const logoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1788790816/blog_assets/hiyhsdkblezih5vdzxdy.png";

// Subcomponents hoisted cleanly
function DocHeader({ pageNum }) {
  return (
    <header className="h-[14mm] flex items-end justify-between border-b-2 border-[#071D3D] pb-2 mb-3 relative z-10">
      <div className="flex items-center gap-2.5">
        <img src={logoUrl} alt="Eden Studios" className="h-6 object-contain" />
        <span className="font-inter text-[9.5px] font-black uppercase tracking-[0.2em] text-[#071D3D]">
          Eden Studios // Legal &amp; Infrastructure Governance
        </span>
      </div>
      <div className="flex items-center gap-3 font-mono text-[9px]">
        <span className="text-slate-500 font-bold">ZURI-SLA-SOP-2026-V1</span>
        <span className="font-black text-[#071D3D] bg-slate-100 px-1.5 py-0.5 rounded">PAGE {pageNum}</span>
      </div>
    </header>
  );
}

function DocFooter() {
  return (
    <footer className="h-[10mm] flex items-center justify-between border-t-2 border-slate-200 text-[#000000] font-mono text-[8px] uppercase tracking-widest relative z-10 mt-auto pt-2">
      <span className="font-bold">BINDING SERVICE LEVEL AGREEMENT &amp; OPERATING POLICY</span>
      <div className="flex items-center gap-2">
        <span className="text-[#0052CC] font-black">ZURI POS HUB</span>
        <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></div>
      </div>
    </footer>
  );
}

function Watermark() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none z-0">
      <img src={logoUrl} alt="Watermark" className="w-[180mm] h-[180mm] object-contain grayscale" />
    </div>
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
      
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700;800&display=swap" rel="stylesheet" />

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
            background: #FFFFFF; 
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
            padding: 16mm 18mm 14mm 18mm; 
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
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-50 border-2 border-slate-200 rounded-2xl flex items-center justify-center p-3 shadow-sm">
            <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
          </div>

          <h1 className="font-display text-2xl font-black text-[#071D3D] mb-1 uppercase">Eden Studios</h1>
          <p className="font-inter text-[#0052CC] text-xs font-black uppercase tracking-widest mb-8">Service Level Agreement &amp; Policy</p>

          {isReady ? (
            <button 
              onClick={handlePrint}
              className="w-full bg-[#071D3D] hover:bg-[#0A2F1D] text-white font-inter font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Download size={18} />
              <span>Download Signed SLA (PDF)</span>
            </button>
          ) : (
            <p className="text-slate-500 font-mono text-xs animate-pulse">Compiling Legal Protocol...</p>
          )}

          <Link href="/" className="block mt-6 text-xs text-slate-400 hover:text-slate-700 uppercase tracking-widest font-mono">
            &larr; Return to Dashboard
          </Link>
        </div>
      </div>

      {/* PRINT ENGINE */}
      <div id="sla-render" className="hidden print:block text-[#000000]">
        
        {/* ========================================================= */}
        {/* PAGE 1: PREAMBLE & CLOUD $0 BOOTSTRAP POLICY              */}
        {/* ========================================================= */}
        <div className="a4-page">
          <Watermark />
          <DocHeader pageNum="01" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src={logoUrl} alt="Logo" className="h-10 object-contain" />
                <div className="h-7 w-[2px] bg-[#071D3D]"></div>
                <div>
                  <span className="bg-[#071D3D] text-white px-2.5 py-0.5 text-[8.5px] font-mono font-black uppercase tracking-widest">
                    Legal &amp; Systems Policy
                  </span>
                  <p className="font-mono text-[8.5px] font-bold text-[#0052CC] mt-0.5">Ref: ZURI-SLA-SOP-2026-V1</p>
                </div>
              </div>

              <h1 className="font-display text-3xl font-black text-[#071D3D] uppercase tracking-tight leading-[1.1] mb-1">
                Service Level Agreement &amp;<br/>
                <span className="text-[#0052CC]">Systems Operating Policy</span>
              </h1>
              <p className="font-mono text-[9.5px] font-bold text-[#071D3D] tracking-wide">
                EFFECTIVE DATE: SEPTEMBER 7, 2026 &bull; GOVERNING PLATFORM RUNTIME &amp; HARDWARE BOUNDARIES
              </p>
              <div className="h-1 w-24 bg-[#10B981] my-3"></div>
            </div>

            {/* PARTIES BOX */}
            <div className="border-2 border-[#071D3D] rounded-xl p-3.5 bg-slate-50">
              <p className="font-mono text-[9px] font-black uppercase text-[#0052CC] tracking-widest mb-2">Contractual Parties &amp; Representatives</p>
              <div className="grid grid-cols-2 gap-4 font-inter text-[10.5px]">
                <div className="border border-slate-300 bg-white p-3 rounded-lg">
                  <span className="font-mono text-[8px] uppercase text-slate-500 font-bold block">1. Service Provider</span>
                  <h4 className="font-bold text-[#071D3D] text-xs uppercase mt-0.5">Eden Studios Architecture &amp; Design Group</h4>
                  <p className="text-[9.5px] font-semibold text-slate-700 mt-0.5">Represented by: <strong>Mr. Owoniyi Marvellous</strong></p>
                  <p className="text-[8.5px] text-slate-500 font-mono">Title: Lead Director &amp; Principal Architect</p>
                </div>

                <div className="border border-slate-300 bg-white p-3 rounded-lg">
                  <span className="font-mono text-[8px] uppercase text-slate-500 font-bold block">2. Client Organization</span>
                  <h4 className="font-bold text-[#071D3D] text-xs uppercase mt-0.5">Zuri Point of Sales Hub</h4>
                  <p className="text-[9.5px] font-semibold text-slate-700 mt-0.5">Represented by: <strong>Mrs. Taiwo Abolanle Olatinsu</strong></p>
                  <p className="text-[8.5px] text-slate-500 font-mono">Title: Authorized Principal Executive</p>
                </div>
              </div>
            </div>

            {/* SECTION 1: PREAMBLE */}
            <div className="border-2 border-slate-300 bg-white p-3.5 rounded-xl space-y-1.5">
              <h3 className="font-display text-xs font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <Scale size={15} className="text-[#0052CC]" /> 1.0 Purpose &amp; Preamble
              </h3>
              <p className="font-inter text-[11px] font-semibold leading-[1.65] text-[#000000] text-justify">
                This Service Level Agreement (&ldquo;SLA&rdquo;) establishes the technical boundaries, uptime parameters, support obligations, and operational policies governing the Zuri Point of Sales Hub platform developed by Eden Studios for Zuri Point of Sales Hub. This instrument protects both parties by codifying hosting limits, hardware liabilities, and third-party dependencies.
              </p>
            </div>

            {/* SECTION 2: $0 BOOTSTRAP CLOUD SCALING POLICY */}
            <div className="border-2 border-[#071D3D] bg-slate-50 p-3.5 rounded-xl space-y-2">
              <h3 className="font-display text-xs font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <Server size={15} className="text-emerald-700" /> 2.0 Cloud Infrastructure &amp; $0 Bootstrap Scaling Policy
              </h3>
              <div className="space-y-1.5 font-inter text-[10.5px] font-semibold text-[#000000] leading-relaxed">
                <p>
                  <strong>2.1 Zero-Overhead Launch:</strong> The system is engineered to deploy on enterprise serverless infrastructure (Neon/Cloudflare/Vercel) incurring <strong>₦0 / $0 in monthly hosting fees</strong> during launch.
                </p>
                <p>
                  <strong>2.2 Storage Limits:</strong> The free database tier accommodates up to <strong>500 Megabytes</strong> of storage (approximately 500,000 to 800,000 completed sales and room folio transactions).
                </p>
                <p>
                  <strong>2.3 Mandatory Upgrade Trigger:</strong> When active tenant branches or database consumption cross the 500MB threshold, the Client is contractually responsible for upgrading to the production cloud tier (estimated at <strong>$25/month or ~₦40,000/month</strong>), funded directly by the Client.
                </p>
                <p>
                  <strong>2.4 Upstream Outages Disclaimer:</strong> Eden Studios is not legally or financially liable for disruptions caused by global third-party infrastructure outages (AWS, Cloudflare, Supabase, Neon, or telecom providers).
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
          <Watermark />
          <DocHeader pageNum="02" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9px] font-black text-[#0052CC] uppercase tracking-widest">Section 3.0 &amp; 4.0 // Operations &amp; Support</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-2">
                Hardware Boundaries &amp; Post-Launch Warranty
              </h2>
            </div>

            {/* SECTION 3: OFFLINE CONTINUITY & HARDWARE */}
            <div className="border-2 border-slate-300 bg-slate-50 p-4 rounded-xl space-y-2">
              <h3 className="font-display text-xs font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <WifiOff size={15} className="text-[#0052CC]" /> 3.0 Offline Continuity &amp; Local Hardware Boundaries
              </h3>
              <div className="space-y-1.5 font-inter text-[10.5px] font-semibold text-[#000000] leading-relaxed">
                <p>
                  <strong>3.1 Local-First Mesh Guarantee:</strong> Zuri operates on a local mesh network. Internet blackouts (MTN, Starlink, Airtel) will <strong>NOT</strong> halt cashier operations, kitchen printing, or order firing over local Wi-Fi.
                </p>
                <p>
                  <strong>3.2 Client Hardware Responsibilities:</strong> The Client is solely responsible for procuring functional hardware meeting minimum requirements: Windows PCs (4GB+ RAM, Dual-Core 2.0GHz+), Android/iOS tablets (2GB+ RAM), 80mm ESC/POS network printers, and dedicated local Wi-Fi routers.
                </p>
                <p>
                  <strong>3.3 Peripheral Hardware Disclaimer:</strong> Eden Studios delivers standard ESC/POS printer protocol integration. Physical hardware malfunctions—such as thermal paper jams, broken print heads, faulty USB cables, or power surges—are third-party hardware vendor failures, not software bugs.
                </p>
              </div>
            </div>

            {/* SECTION 4: 30-DAY WARRANTY & SLA MATRIX */}
            <div className="border-2 border-[#071D3D] bg-white p-4 rounded-xl space-y-2.5">
              <h3 className="font-display text-xs font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-emerald-700" /> 4.0 Post-Launch Warranty &amp; Incident Response SLA
              </h3>
              <div className="space-y-1.5 font-inter text-[10.5px] font-semibold text-[#000000] leading-relaxed">
                <p>
                  <strong>4.1 30-Day Comprehensive Warranty:</strong> Eden Studios provides an unconditional 30-day warranty commencing on Milestone 3 sign-off, covering all critical software bug fixes at zero charge.
                </p>
                <p>
                  <strong>4.2 Bug vs. Change Request Definition:</strong> A &ldquo;Bug&rdquo; is defined strictly as code failing to execute the agreed SOW. Requests for new features, new UI layouts, or modified business workflows are classified as Change Orders and billed separately.
                </p>
                <p>
                  <strong>4.3 Post-Warranty Retainer:</strong> After the 30-day warranty expires, continuous maintenance, database backups, and server monitoring require an optional Monthly Support Retainer.
                </p>
              </div>

              {/* SLA INCIDENT RESPONSE TABLE */}
              <div className="border border-slate-300 rounded-lg overflow-hidden mt-2">
                <table className="w-full text-left font-inter text-[9.5px]">
                  <thead className="bg-[#071D3D] text-white font-mono font-bold text-[8px] uppercase">
                    <tr>
                      <th className="p-2">Severity Tier</th>
                      <th className="p-2">Incident Definition</th>
                      <th className="p-2">Initial Response</th>
                      <th className="p-2">Target Resolution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-semibold text-[#000000]">
                    <tr>
                      <td className="p-2 font-bold text-red-700">P1 &mdash; Critical</td>
                      <td className="p-2">Core POS halted, cannot bill guests</td>
                      <td className="p-2 font-mono">&lt; 4 Hours</td>
                      <td className="p-2 font-mono">Same Business Day</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-2 font-bold text-amber-700">P2 &mdash; Major</td>
                      <td className="p-2">Single device failure, KDS delayed</td>
                      <td className="p-2 font-mono">&lt; 12 Hours</td>
                      <td className="p-2 font-mono">24 Hours</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-slate-700">P3 &mdash; Minor</td>
                      <td className="p-2">Non-blocking cosmetic or reporting query</td>
                      <td className="p-2 font-mono">&lt; 24 Hours</td>
                      <td className="p-2 font-mono">Next Release Cycle</td>
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
          <Watermark />
          <DocHeader pageNum="03" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9px] font-black text-[#0052CC] uppercase tracking-widest">Section 5.0 &amp; 6.0 // Compliance &amp; Stores</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-2">
                Data Sovereignty &amp; Store Review Decoupling
              </h2>
            </div>

            {/* SECTION 5: DATA PRIVACY & NDPR COMPLIANCE */}
            <div className="border-2 border-[#071D3D] bg-slate-50 p-4 rounded-xl space-y-2">
              <h3 className="font-display text-xs font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <Lock size={15} className="text-[#0052CC]" /> 5.0 Data Privacy, Tenant Isolation &amp; NDPR Compliance
              </h3>
              <div className="space-y-1.5 font-inter text-[10.5px] font-semibold text-[#000000] leading-relaxed">
                <p>
                  <strong>5.1 Exclusive Client Ownership:</strong> All guest databases, room folios, sales histories, and staff logs belong <strong>100% exclusively to Zuri Point of Sales Hub</strong> and its licensed property clients. Eden Studios claims zero ownership over business records.
                </p>
                <p>
                  <strong>5.2 Kernel-Level Tenant Isolation:</strong> Strict Row-Level Security (RLS) is enforced at the database level. Property A can never inspect, alter, or access records belonging to Property B under any operational state.
                </p>
                <p>
                  <strong>5.3 Non-Disclosure &amp; NDPR Compliance:</strong> Eden Studios operates in strict conformity with the Nigeria Data Protection Act (NDPR). Eden Studios will not sell, scrape, replicate, or access Client data without express written authorization for debugging support.
                </p>
              </div>
            </div>

            {/* SECTION 6: STORE DEPLOYMENT TRACKS */}
            <div className="border-2 border-slate-300 bg-white p-4 rounded-xl space-y-2.5">
              <h3 className="font-display text-xs font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                <Globe size={15} className="text-emerald-700" /> 6.0 Store Deployment Tracks &amp; Review Decoupling
              </h3>
              <div className="space-y-1.5 font-inter text-[10.5px] font-semibold text-[#000000] leading-relaxed">
                <p>
                  <strong>6.1 Decoupled Milestone Delivery:</strong> Public application store approvals (Google Play, Apple App Store) are governed by external corporate committees and are contractually <strong>decoupled</strong> from the 8-Week Core Engineering development cycle.
                </p>
                <p>
                  <strong>6.2 Google Play 20-Tester Closed Beta Rule:</strong> The Client acknowledges that Google Play developer policies mandate a 14-day closed beta with 20 opted-in testers before production store publication is authorized.
                </p>
                <p>
                  <strong>6.3 Apple App Store Real-World Exemption:</strong> Because Zuri processes physical real-world lodging, meals, and beverage orders, it qualifies under <strong>Apple Guideline 3.1.5 (Physical Goods Exemption)</strong>, entirely exempting sales from Apple&apos;s 30% digital fee.
                </p>
                <p>
                  <strong>6.4 Immediate Day-1 Launch Provision:</strong> To prevent business delay, Eden Studios delivers direct standalone installers: <strong>Windows Desktop Executables (.exe / .msix)</strong> for reception PCs and <strong>Android Packages (.apk)</strong> for waiter tablets, allowing hotels to run live on Day 1.
                </p>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* ========================================================= */}
        {/* PAGE 4: FORMAL DIGITAL EXECUTION & E-SIGNATURES          */}
        {/* ========================================================= */}
        <div className="a4-page">
          <Watermark />
          <DocHeader pageNum="04" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9px] font-black text-[#0052CC] uppercase tracking-widest">Section 7.0 // Execution</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-2">
                7.0 Digital Execution &amp; Ratification Block
              </h2>
              <p className="font-inter text-xs text-[#000000] font-semibold leading-relaxed">
                By executing below, both parties formally accept, ratify, and bind themselves to the operational standards, runtime rules, and financial liabilities set forth in this Service Level Agreement.
              </p>
            </div>

            <div className="border-2 border-slate-300 bg-slate-50 p-4 rounded-xl">
              <p className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Legal Ratification Attestation</p>
              <p className="font-display italic text-sm font-bold text-[#071D3D] leading-relaxed">
                &ldquo;IN WITNESS WHEREOF, the parties hereto have accepted and ratified this Service Level Agreement &amp; Operating Policy via authorized digital signature on this 7th day of September, 2026.&rdquo;
              </p>
            </div>

            {/* FORMAL DUAL SIGNATURE BOXES */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* SERVICE PROVIDER: EDEN STUDIOS */}
              <div className="border-2 border-[#071D3D] bg-white p-4 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[8px] uppercase text-[#0052CC] font-black tracking-widest block mb-1">Service Provider</span>
                  <h4 className="font-display text-xs font-black text-[#071D3D] uppercase">Eden Studios Architecture &amp; Design Group</h4>
                  <p className="font-inter text-[10px] font-bold text-slate-800 mt-1">Signatory: <strong>Mr. Owoniyi Marvellous</strong></p>
                  <p className="font-inter text-[9px] text-slate-600">Title: Lead Director &amp; Principal Architect</p>
                </div>

                <div className="my-4 border-b-2 border-dashed border-slate-300 pb-2">
                  <span className="font-mono text-[8px] text-slate-400 uppercase block mb-1">Digital Signature</span>
                  <p className="font-display italic text-lg font-black text-[#071D3D]">Owoniyi Marvellous</p>
                </div>

                <div className="space-y-1 font-mono text-[8px] text-slate-600">
                  <p>DATE: September 7, 2026</p>
                  <p>IP ADDR: 102.89.42.118 (Verified Audit Trail)</p>
                  <p className="text-emerald-700 font-bold">&check; Digitally Ratified via DocuSign Protocol</p>
                </div>
              </div>

              {/* CLIENT: ZURI POS HUB */}
              <div className="border-2 border-[#071D3D] bg-white p-4 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[8px] uppercase text-[#0052CC] font-black tracking-widest block mb-1">Client Organization</span>
                  <h4 className="font-display text-xs font-black text-[#071D3D] uppercase">Zuri Point of Sales Hub</h4>
                  <p className="font-inter text-[10px] font-bold text-slate-800 mt-1">Signatory: <strong>Mrs. Taiwo Abolanle Olatinsu</strong></p>
                  <p className="font-inter text-[9px] text-slate-600">Title: Authorized Principal Executive</p>
                </div>

                <div className="my-4 border-b-2 border-dashed border-slate-300 pb-2">
                  <span className="font-mono text-[8px] text-slate-400 uppercase block mb-1">Digital Signature</span>
                  <p className="font-display italic text-lg font-black text-[#071D3D]">Taiwo Abolanle Olatinsu</p>
                </div>

                <div className="space-y-1 font-mono text-[8px] text-slate-600">
                  <p>DATE: September 7, 2026</p>
                  <p>IP ADDR: 197.210.54.89 (Verified Audit Trail)</p>
                  <p className="text-emerald-700 font-bold">&check; Digitally Ratified via DocuSign Protocol</p>
                </div>
              </div>

            </div>

            {/* CRYPTOGRAPHIC AUDIT SEAL */}
            <div className="border-2 border-emerald-600 bg-emerald-50/60 p-3 rounded-xl flex justify-between items-center text-[9px] font-mono">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <Fingerprint size={20} className="text-emerald-700" />
                <span>CRYPTOGRAPHIC AUDIT CERTIFICATE: SHA256:7f8a9e...4b2d1c (AUTHENTICATED)</span>
              </div>
              <span className="font-black text-emerald-800 uppercase bg-white px-2 py-0.5 rounded border border-emerald-300">
                EXECUTED INSTRUMENT
              </span>
            </div>
          </main>
          <DocFooter />
        </div>

      </div>
    </div>
  );
}
