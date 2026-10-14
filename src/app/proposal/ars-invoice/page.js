"use client";
import { useState, useEffect } from "react";
import { Download, MapPin, CreditCard } from "lucide-react";
import Link from "next/link";

export default function ARSInvoice() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 800);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "INV-ARS-2026-001_Adeoye_Boluwatife";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-blue-200 antialiased">
      
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700;800&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #FFFFFF !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #invoice-render, #invoice-render * { visibility: visible; }
          #invoice-render { position: absolute; left: 0; top: 0; width: 100%; background: #FFFFFF; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #FFFFFF !important; 
            box-sizing: border-box; 
            overflow: hidden; 
            display: flex; 
            flex-direction: column; 
            padding: 12mm 20mm; /* REDUCED VERTICAL PADDING TO PREVENT CUT-OFF */
          }
          .no-print { display: none !important; }
        }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* PORTAL (Screen View) */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl rounded-2xl border-t-8 border-[#0F172A]">
          <div className="w-16 h-16 mx-auto mb-6 bg-[#0F172A] rounded-full flex items-center justify-center text-white shadow-xl">
            <CreditCard size={28} />
          </div>
          <h1 className="font-inter text-2xl font-black text-[#0F172A] mb-2 uppercase">Invoice Engine</h1>
          <p className="font-mono text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-8">INV-ARS-2026-001</p>
          {!isReady ? (
            <div className="text-slate-500 font-mono text-xs animate-pulse">Formatting Document...</div>
          ) : (
            <button onClick={handlePrint} className="w-full bg-[#0F172A] hover:bg-blue-900 text-white font-inter font-bold py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2">
              <Download size={18} /> Download Invoice (PDF)
            </button>
          )}
          <Link href="/" className="block mt-6 text-xs text-slate-400 hover:text-slate-700 uppercase tracking-widest font-mono">
            &larr; Return to Dashboard
          </Link>
        </div>
      </div>

      {/* PRINT ENGINE */}
      <div id="invoice-render" className="hidden print:block text-[#000000]">
        <div className="a4-page">
          
          {/* HEADER */}
          <header className="flex justify-between items-start border-b-4 border-[#0F172A] pb-4 mb-5">
            <div>
              <h1 className="font-inter text-4xl font-black text-[#0F172A] uppercase tracking-tighter mb-1">INVOICE</h1>
              <p className="font-inter text-[10px] font-bold text-slate-500 uppercase tracking-widest">ARS Multiventures Platform</p>
            </div>
            <div className="text-right font-mono text-[9px] space-y-1">
              <p><span className="font-bold text-slate-500 uppercase">Invoice Number:</span> <span className="font-black text-[#0F172A] text-[10px]">INV-ARS-2026-001</span></p>
              <p><span className="font-bold text-slate-500 uppercase">Date:</span> <span className="font-bold text-[#0F172A]">October 14, 2026</span></p>
              <p><span className="font-bold text-slate-500 uppercase">Payment Terms:</span> <span className="font-bold text-[#0F172A] bg-slate-100 px-1.5 py-0.5 rounded">Due on Receipt</span></p>
            </div>
          </header>

          {/* FROM / TO SECTION */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            {/* FROM */}
            <div>
              <h2 className="font-inter text-[9px] font-black text-white bg-[#0F172A] inline-block px-2.5 py-1 uppercase tracking-widest mb-2">From (Service Provider)</h2>
              <div className="font-inter text-xs space-y-1">
                <p className="font-black text-[#0F172A] text-base uppercase">Adeoye Boluwatife</p>
                <p className="text-slate-600 flex items-center gap-1.5"><MapPin size={10} className="text-[#0F172A]"/> Ekiti State, Nigeria</p>
              </div>
            </div>

            {/* TO */}
            <div>
              <h2 className="font-inter text-[9px] font-black text-[#0F172A] border-b-2 border-[#0F172A] pb-0.5 uppercase tracking-widest mb-2">To (Client)</h2>
              <div className="font-inter text-xs space-y-1">
                <p className="font-black text-[#0F172A] text-base uppercase">ARS Multiventures / ARS Ventures</p>
                <p className="text-slate-600 font-medium leading-snug text-[9.5px]">
                  <span className="font-bold text-[#0F172A] uppercase tracking-wider block mb-0.5">Project:</span>
                  ARS Heavy Construction Materials Supply Chain, Multi-Quarry Management &amp; Logistics Operating Platform
                </p>
              </div>
            </div>
          </div>
          {/* DELIVERABLES TABLE (COMPACTED) */}
          <div className="mb-5">
            <h2 className="font-inter text-[10px] font-black text-[#0F172A] uppercase tracking-widest mb-2">1. 4-Week Deliverables &amp; Payment Schedule</h2>
            
            <table className="w-full border-collapse border-2 border-[#0F172A]">
              <thead className="bg-[#0F172A] text-white font-inter text-[8px] uppercase tracking-widest">
                <tr>
                  <th className="py-1.5 px-2 text-left border-r border-slate-700 w-[14%]">Phase</th>
                  <th className="py-1.5 px-2 text-left border-r border-slate-700 w-[52%]">Deliverables Summary</th>
                  <th className="py-1.5 px-2 text-center border-r border-slate-700 w-[10%]">Timeline</th>
                  <th className="py-1.5 px-2 text-right border-r border-slate-700 w-[12%]">Allocation</th>
                  <th className="py-1.5 px-2 text-center w-[12%]">Status</th>
                </tr>
              </thead>
              <tbody className="font-inter text-[8.5px] text-slate-800">
                
                {/* MILESTONE 1 */}
                <tr className="border-b border-slate-300 bg-slate-50">
                  <td className="py-1.5 px-2 border-r border-slate-300 font-black text-[#0F172A] align-top">Milestone 1</td>
                  <td className="py-1.5 px-2 border-r border-slate-300 align-top">
                    <p className="font-bold text-[#0F172A] mb-1 uppercase text-[9px]">Account Portal, Dashboard &amp; Foundation</p>
                    <ul className="space-y-0.5 pl-3 list-disc text-slate-600 leading-tight">
                      <li>Registration &amp; Auth (Email verification, password reset, session security)</li>
                      <li>Company &amp; Profile Management (Individual &amp; corporate details)</li>
                      <li>Saved Delivery Locations (Multiple site management)</li>
                      <li>Customer Dashboard (Balance, credit status, past orders, quick reorder)</li>
                      <li>Master Materials &amp; Quarry Database (Live Supabase PG15 setup)</li>
                      <li>Role-Based Security: Database access rules for all company roles</li>
                    </ul>
                  </td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono align-top">Week 1</td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-right font-mono font-black text-[#0F172A] align-top">₦100,000.00</td>
                  <td className="py-1.5 px-2 text-center align-top">
                    <span className="inline-block bg-[#0F172A] text-white font-bold text-[6.5px] px-1.5 py-0.5 rounded uppercase tracking-wider">Completed &amp;<br/>Due Now</span>
                  </td>
                </tr>

                {/* MILESTONE 2 */}
                <tr className="border-b border-slate-300">
                  <td className="py-1.5 px-2 border-r border-slate-300 font-bold text-slate-700 align-top">Milestone 2</td>
                  <td className="py-1.5 px-2 border-r border-slate-300 align-top">
                    <p className="font-bold text-[#0F172A] mb-1 uppercase text-[9px]">Core Engine: Catalog, Comparison &amp; Checkout</p>
                    <ul className="space-y-0.5 pl-3 list-disc text-slate-600 leading-tight">
                      <li>Interactive Materials Catalog (Live feed with price per ton &amp; MOQ filter)</li>
                      <li>Materials &amp; Suppliers Directory (Browse by material OR by quarry)</li>
                      <li>Multi-Quarry Comparison Engine (Side-by-side price, stock &amp; distance)</li>
                      <li>Truck Fleet Selector (Auto-match tonnage to 20/30/45-ton tippers)</li>
                      <li>Automated Pricing Calculator (Material + Loading + Haulage + Fuel)</li>
                      <li>Checkout &amp; Payments (Order summary, REQ-XXXX numbers, Paystack)</li>
                      <li>Native iOS/Android UI Readiness (Mobile-optimized layout)</li>
                    </ul>
                  </td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono align-top">Weeks 2-3</td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-right font-mono font-bold text-slate-700 align-top">₦200,000.00</td>
                  <td className="py-1.5 px-2 text-center align-top">
                    <span className="inline-block border border-slate-300 text-slate-500 font-bold text-[7px] px-1.5 py-0.5 rounded uppercase tracking-wider">In Progress</span>
                  </td>
                </tr>

                {/* MILESTONE 3 */}
                <tr>
                  <td className="py-1.5 px-2 border-r border-slate-300 font-bold text-slate-700 align-top">Milestone 3</td>
                  <td className="py-1.5 px-2 border-r border-slate-300 align-top">
                    <p className="font-bold text-[#0F172A] mb-1 uppercase text-[9px]">Logistics, Admin Portal, Store Launch &amp; Handover</p>
                    <ul className="space-y-0.5 pl-3 list-disc text-slate-600 leading-tight">
                      <li>Driver Dispatch &amp; Live GPS Tracking (Dispatched &rarr; In-Transit &rarr; Delivered)</li>
                      <li>Digital Proof of Delivery (POD: Signature capture &amp; photo upload)</li>
                      <li>Operations Admin Web Portal (Update daily prices, approve destinations)</li>
                      <li>B2B Credit Controls (Set limits, track balance, auto-block overdue)</li>
                      <li>Native iOS App Store Packaging (Xcode packaging, Sign in with Apple)</li>
                      <li>Android Play Store Packaging (Production .AAB / APK build)</li>
                      <li>App Store Submission &amp; Launch (TestFlight beta, submission to stores)</li>
                    </ul>
                  </td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono align-top">Week 4</td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-right font-mono font-bold text-slate-700 align-top">₦150,000.00</td>
                  <td className="py-1.5 px-2 text-center align-top">
                    <span className="inline-block border border-slate-300 text-slate-500 font-bold text-[7px] px-1.5 py-0.5 rounded uppercase tracking-wider">Balance on<br/>Completion</span>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
          {/* FINANCIAL SUMMARY & PAYMENT DETAILS */}
          <div className="grid grid-cols-2 gap-6 mt-auto">
            
            {/* PAYMENT DETAILS */}
            <div>
              <h2 className="font-inter text-[10px] font-black text-[#0F172A] uppercase tracking-widest mb-2">2. Payment Details</h2>
              <div className="border-2 border-[#0F172A] p-4 rounded-lg bg-slate-50">
                <p className="font-inter text-[9px] text-slate-600 mb-2.5 uppercase font-bold tracking-wider">Please transfer the initial ₦100,000.00 to:</p>
                <div className="space-y-1.5 font-mono text-[10px]">
                  <p className="flex justify-between border-b border-slate-200 pb-1"><span className="text-slate-500">Bank:</span> <span className="font-bold text-[#0F172A]">First Bank of Nigeria</span></p>
                  <p className="flex justify-between border-b border-slate-200 pb-1"><span className="text-slate-500">Account Number:</span> <span className="font-black text-base text-[#0F172A]">3191334473</span></p>
                  <p className="flex justify-between border-b border-slate-200 pb-1"><span className="text-slate-500">Account Name:</span> <span className="font-bold text-[#0F172A]">Adeoye Boluwatife</span></p>
                  <p className="flex justify-between pt-0.5"><span className="text-slate-500">Reference:</span> <span className="font-bold text-[#0F172A]">ARS-INV-001</span></p>
                </div>
              </div>
            </div>

            {/* FINANCIAL SUMMARY */}
            <div>
              <h2 className="font-inter text-[10px] font-black text-[#0F172A] uppercase tracking-widest mb-2 text-right">3. Financial Summary</h2>
              <div className="space-y-2.5 font-mono text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-inter font-medium">Total Project Fee:</span>
                  <span className="font-bold text-[#0F172A]">₦450,000.00</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span className="font-inter font-medium">Less: Balance Due on Future Milestones (2 &amp; 3):</span>
                  <span>(₦350,000.00)</span>
                </div>
                <div className="h-0.5 w-full bg-[#0F172A] my-1.5"></div>
                <div className="flex justify-between items-center bg-[#0F172A] text-white p-2.5 rounded">
                  <span className="font-inter font-black uppercase tracking-widest text-[9px]">Amount Payable Now (Milestone 1):</span>
                  <span className="font-black text-base">₦100,000.00</span>
                </div>
                <p className="text-right font-inter text-[7.5px] font-black text-slate-500 uppercase tracking-widest mt-1.5">
                  Total Due Now: One Hundred Thousand Naira
                </p>
              </div>
            </div>

          </div>

          {/* FOOTER */}
          <footer className="mt-4 pt-3 border-t-2 border-slate-200 flex justify-between items-center font-mono text-[7.5px] text-slate-400 uppercase tracking-widest">
            <span>Generated by Sovereign Billing Engine</span>
            <span className="text-[#0F172A] font-bold">Thank you for your business.</span>
          </footer>

        </div>
      </div>
    </div>
  );
}
