"use client";
import { Download, ArrowLeft, CheckSquare, Layers, Shield, Zap, Database, DollarSign, Briefcase } from "lucide-react";
import Link from "next/link";

export default function AutoamProposal() {
  
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "AUTOAM_Technical_Financial_Blueprint_v3";
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
          <h1 className="text-2xl font-bold text-white mb-2">Technical & Financial Brief</h1>
          <p className="text-slate-400 text-sm mb-8">v3.0 • Comprehensive Budget Analysis</p>
          <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-200 text-slate-950 font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl">
            <Download size={20} /> <span>Download Full PDF</span>
          </button>
          <Link href="/" className="block mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors">← Return to Dashboard</Link>
        </div>
      </div>

      {/* === VIEW 2: THE DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block">
        
        {/* === PAGE 1: EXECUTIVE SUMMARY === */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start border-b-[6px] border-black pb-6 mb-8">
              <div>
                <h1 className="text-7xl font-black uppercase tracking-tighter leading-none mb-2">Autoam</h1>
                <p className="text-xl font-black text-slate-600 uppercase tracking-widest">Technical Blueprint</p>
              </div>
              <div className="text-right">
                <div className="bg-black text-white px-6 py-2 font-bold text-sm uppercase inline-block mb-1">Confidential</div>
                <p className="text-xs font-mono font-bold">DOC-ID: ATM-FIN-V3</p>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-black uppercase border-l-[10px] border-black pl-4 mb-4">1. Executive Summary</h2>
              <p className="text-sm leading-relaxed text-justify mb-4 font-bold text-black">
                Autoam is engineered to be a high-availability, geolocation-centric marketplace. The architecture prioritizes <strong>Zero-Latency Dispatching</strong> and <strong>Financial Trust</strong> via escrow.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase border-l-[10px] border-black pl-4 mb-4">2. Technology Stack</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-4 border-black p-4">
                  <p className="font-black text-lg">Mobile: React Native</p>
                  <p className="text-xs font-bold text-slate-800">Offline-First, Native Maps.</p>
                </div>
                <div className="border-4 border-black p-4">
                  <p className="font-black text-lg">Backend: NestJS</p>
                  <p className="text-xs font-bold text-slate-800">Scalable Microservices.</p>
                </div>
                <div className="border-4 border-black p-4">
                  <p className="font-black text-lg">Data: PostgreSQL</p>
                  <p className="text-xs font-bold text-slate-800">Geospatial Indexing.</p>
                </div>
                <div className="border-4 border-black p-4">
                  <p className="font-black text-lg">AI: OpenAI GPT-4o</p>
                  <p className="text-xs font-bold text-slate-800">Diagnostic Assistant.</p>
                </div>
              </div>
            </section>
          </div>
          <div className="text-right text-xs font-black text-slate-400">Page 1/3</div>
        </div>

        <div className="page-break"></div>

        {/* === PAGE 2: ARCHITECTURE DIAGRAM === */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col justify-between">
          <section className="mb-8">
            <h2 className="text-2xl font-black uppercase border-l-[10px] border-black pl-4 mb-6">3. System Architecture</h2>
            <div className="flex flex-col items-center gap-4 text-xs font-black uppercase">
              <div className="flex gap-4 w-full justify-center">
                <div className="border-[3px] border-black p-2 w-28 text-center bg-slate-100">User App</div>
                <div className="border-[3px] border-black p-2 w-28 text-center bg-slate-100">Partner App</div>
                <div className="border-[3px] border-black p-2 w-28 text-center bg-slate-100">Admin</div>
              </div>
              <div className="h-4 w-1.5 bg-black"></div>
              <div className="border-[3px] border-black p-3 w-full max-w-md text-center bg-white">
                API GATEWAY (Load Balancer)
              </div>
              <div className="h-4 w-1.5 bg-black"></div>
              <div className="flex gap-4 w-full justify-center">
                <div className="border-[3px] border-black p-3 w-36 text-center bg-white">CORE API</div>
                <div className="border-[3px] border-black p-3 w-36 text-center bg-slate-800 text-white">AI ENGINE</div>
                <div className="border-[3px] border-black p-3 w-36 text-center bg-white">DISPATCH</div>
              </div>
              <div className="h-4 w-1.5 bg-black"></div>
              <div className="flex gap-4 w-full justify-center">
                <div className="border-[3px] border-black p-2 w-28 text-center bg-slate-100">PostgreSQL</div>
                <div className="border-[3px] border-black p-2 w-28 text-center bg-slate-100">Redis</div>
                <div className="border-[3px] border-black p-2 w-28 text-center bg-slate-100">S3 Bucket</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase border-l-[10px] border-black pl-4 mb-6">4. Roadmap (9 Weeks)</h2>
            <div className="border-l-[6px] border-black ml-2 space-y-0">
              <div className="relative pl-8 pb-4">
                <div className="absolute -left-[12px] top-0 w-5 h-5 bg-black rounded-full border-4 border-white"></div>
                <h4 className="font-black text-sm uppercase">Phase 1: Foundation (Weeks 1-2)</h4>
                <p className="text-xs font-bold text-slate-700">System Design, Database, UI/UX.</p>
              </div>
              <div className="relative pl-8 pb-4">
                <div className="absolute -left-[12px] top-0 w-5 h-5 bg-white border-[5px] border-black rounded-full"></div>
                <h4 className="font-black text-sm uppercase">Phase 2: Core Engine (Weeks 3-5)</h4>
                <p className="text-xs font-bold text-slate-700">Geolocation, AI Integration, Matching.</p>
              </div>
              <div className="relative pl-8 pb-4">
                <div className="absolute -left-[12px] top-0 w-5 h-5 bg-white border-[5px] border-black rounded-full"></div>
                <h4 className="font-black text-sm uppercase">Phase 3: Ecosystem (Weeks 6-7)</h4>
                <p className="text-xs font-bold text-slate-700">Inventory, Payments, Wallet.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute -left-[12px] top-0 w-5 h-5 bg-white border-[5px] border-black rounded-full"></div>
                <h4 className="font-black text-sm uppercase">Phase 4: Launch (Weeks 8-9)</h4>
                <p className="text-xs font-bold text-slate-700">Beta Testing, Deployment.</p>
              </div>
            </div>
          </section>
          <div className="text-right text-xs font-black text-slate-400">Page 2/3</div>
        </div>

        <div className="page-break"></div>

        {/* === PAGE 3: FINANCIALS & AGREEMENT === */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col justify-between">
          
          <div>
            {/* 5. Post-Funding Budget */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-6 border-l-[10px] border-black pl-4">
                <DollarSign size={32} className="text-black" />
                <h2 className="text-2xl font-black uppercase">5. Post-Funding Budget (Year 1)</h2>
              </div>
              <p className="text-xs font-bold text-slate-600 mb-4 uppercase tracking-widest">Projected Monthly Burn (Scale-Up Phase)</p>
              
              <table className="w-full border-4 border-black text-sm font-bold mb-6">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-2 text-left uppercase">Item</th>
                    <th className="p-2 text-left uppercase">Monthly Cost</th>
                    <th className="p-2 text-left uppercase">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-slate-900 text-xs">
                  <tr className="border-b-2 border-black bg-slate-50">
                    <td className="p-2">Lead Engineer / CTO</td>
                    <td className="p-2">₦500k - ₦700k</td>
                    <td className="p-2">Full-time Architecture & Management</td>
                  </tr>
                  <tr className="border-b-2 border-black">
                    <td className="p-2">Junior Support Dev</td>
                    <td className="p-2">₦150k - ₦200k</td>
                    <td className="p-2">Maintenance & Bug Fixes</td>
                  </tr>
                  <tr className="border-b-2 border-black bg-slate-50">
                    <td className="p-2">Google Maps API</td>
                    <td className="p-2">$500 - $1,000</td>
                    <td className="p-2">Geolocation at Scale (10k users)</td>
                  </tr>
                  <tr className="border-b-2 border-black">
                    <td className="p-2">AI Intelligence (LLM)</td>
                    <td className="p-2">$100 - $300</td>
                    <td className="p-2">OpenAI Token Consumption</td>
                  </tr>
                  <tr className="border-b-2 border-black bg-slate-50">
                    <td className="p-2">Cloud Infrastructure</td>
                    <td className="p-2">$100 - $200</td>
                    <td className="p-2">AWS/DigitalOcean Hosting</td>
                  </tr>
                  <tr className="border-b-2 border-black">
                    <td className="p-2">App Store Fees</td>
                    <td className="p-2">$125 (Yearly)</td>
                    <td className="p-2">Apple ($99) + Google Play ($25)</td>
                  </tr>
                  <tr className="border-b-2 border-black bg-slate-50">
                    <td className="p-2">DevOps & Monitoring</td>
                    <td className="p-2">$50 - $100</td>
                    <td className="p-2">Sentry, GitHub Pro, Vercel</td>
                  </tr>
                </tbody>
              </table>
              <div className="p-4 bg-black text-white text-center font-black uppercase text-sm">
                Total Year 1 Tech Budget Requirement: ₦18M - ₦22M
              </div>
            </section>

            {/* 6. Immediate Agreement */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6 border-l-[10px] border-black pl-4">
                <Briefcase size={32} className="text-black" />
                <h2 className="text-2xl font-black uppercase">6. Founding Engineer Agreement</h2>
              </div>
              
              <div className="border-4 border-black p-6">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Role</p>
                    <p className="text-xl font-black">Founding Engineer</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Equity</p>
                    <p className="text-xl font-black">3% (Permanent)</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Operational Stipend</p>
                    <p className="text-xl font-black">₦80,000 / mo</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t-2 border-slate-200 text-center">
                  <p className="text-xs font-bold text-slate-600">
                    *Stipend covers Power/Data/Server costs during bootstrap phase.
                  </p>
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
