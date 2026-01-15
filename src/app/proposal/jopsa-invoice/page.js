"use client";
import { Download, ArrowLeft, FileText, CreditCard, Landmark } from "lucide-react";
import Link from "next/link";

export default function JopsaInvoice() {
  
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "JOPSA_Project_Invoice_BA_Systems";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900">
      
      <style jsx global>{`
        body > header, body > footer, nav { display: none !important; }
        @media print {
          @page { margin: 0; size: A4; }
          body { background: white !important; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
        }
      `}</style>

      {/* === VIEW 1: DOWNLOAD PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto bg-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <FileText size={32} className="text-black" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">JOPSA Project Invoice</h1>
          <p className="text-slate-400 text-sm mb-8">Ref: #JPSA-2026-001 • Updated Terms</p>

          <button 
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-200 text-slate-950 font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl"
          >
            <Download size={20} />
            <span>Download Invoice PDF</span>
          </button>

          <Link href="/" className="block mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← Return to Site
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE INVOICE (Print Only) === */}
      <div className="print-only hidden bg-white w-full max-w-[210mm] mx-auto">
        <div className="p-[20mm] min-h-[297mm] relative flex flex-col">
          
          {/* Header Bar */}
          <div className="flex justify-between items-start border-b-4 border-slate-900 pb-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center font-black text-2xl">BA</div>
                <div>
                  <h1 className="text-xl font-black uppercase tracking-tighter">Bolu Adeoye</h1>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Lead Technical Architect</p>
                </div>
              </div>
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Invoice &<br/>Agreement</h2>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Invoice Number</p>
              <p className="text-lg font-black">#JPSA-2026-001</p>
              <p className="text-xs font-mono mt-2">DATE: JAN 15, 2026</p>
            </div>
          </div>

          {/* Client Info */}
          <div className="grid grid-cols-2 gap-10 mb-12">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Bill To:</p>
              <p className="text-lg font-black text-slate-900">Dr. Ose Irene</p>
              <p className="text-sm font-bold text-slate-700">Peace Service Academy (JoPSA)</p>
              <p className="text-xs text-slate-500 mt-1">15 Safori Area, Orogun, Ibadan, Nigeria</p>
            </div>
            <div className="bg-slate-50 p-4 border-2 border-slate-900">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Project Title:</p>
              <p className="text-sm font-black text-slate-900 uppercase">JOPSA Digital Infrastructure</p>
              <p className="text-[10px] text-slate-500 mt-1">Academy Wing + Journal Repository</p>
            </div>
          </div>

          {/* Investment Table */}
          <section className="mb-10">
            <table className="w-full border-4 border-slate-900">
              <thead className="bg-slate-900 text-white text-xs uppercase font-black">
                <tr>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-right">Amount (NGN)</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold">
                <tr className="border-b-2 border-slate-900">
                  <td className="p-4">Full-Stack Development & Digital Architecture (Academy + Journal)</td>
                  <td className="p-4 text-right">₦50,000.00</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 text-right font-black uppercase">Total Investment</td>
                  <td className="p-4 text-right font-black text-lg">₦50,000.00</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Payment Schedule */}
          <section className="mb-12">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Payment Schedule</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 border-2 border-amber-500 bg-amber-50">
                <div>
                  <p className="text-xs font-black text-amber-800 uppercase">Milestone 1: Commitment Fee</p>
                  <p className="text-[10px] text-amber-700">Required to commence architectural design and data mapping</p>
                </div>
                <p className="text-xl font-black text-amber-900">₦15,000.00</p>
              </div>
              <div className="flex justify-between items-center p-4 border-2 border-slate-200">
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase">Milestone 2: Development (50%)</p>
                  <p className="text-[10px] text-slate-400">Due upon completion of Academy Wing</p>
                </div>
                <p className="text-lg font-black text-slate-400">₦25,000.00</p>
              </div>
              <div className="flex justify-between items-center p-4 border-2 border-slate-200">
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase">Milestone 3: Handover (Final)</p>
                  <p className="text-[10px] text-slate-400">Due upon final approval and domain mapping</p>
                </div>
                <p className="text-lg font-black text-slate-400">₦10,000.00</p>
              </div>
            </div>
          </section>

          {/* Bank Details */}
          <section className="mb-12 p-6 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Landmark size={32} className="text-amber-500" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Payment Details</p>
                <p className="text-lg font-black">POLARIS BANK / 3103060811</p>
                <p className="text-xs font-medium text-slate-300">Account Name: Adeoye Boluwatife</p>
              </div>
            </div>
            <div className="text-right">
              <CreditCard size={24} className="ml-auto mb-1 opacity-50" />
              <p className="text-[10px] font-bold uppercase">Direct Transfer</p>
            </div>
          </section>

          {/* Signature */}
          <footer className="mt-auto pt-8 border-t-4 border-slate-900 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Authorized Signature</p>
              <div className="font-serif italic text-4xl text-slate-900 mb-2" style={{ fontFamily: 'cursive' }}>
                Boluwatife Adeoye
              </div>
              <div className="h-1 w-40 bg-slate-900 mb-2"></div>
              <p className="text-xs font-bold text-slate-500">boluadeoye.com.ng</p>
            </div>
            <div className="text-right text-[10px] font-bold text-slate-400 uppercase">
              Generated via BA Systems Engine
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
