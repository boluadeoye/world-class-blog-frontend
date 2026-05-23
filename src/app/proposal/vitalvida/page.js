"use client";
import { useState, useEffect } from "react";
import { 
  Download, Clock, AlertTriangle, Anchor, 
  Database, MessageSquare, BrainCircuit, CreditCard,
  Smartphone, CheckCircle2, ShieldCheck, Video, 
  GitBranch, LifeBuoy, HelpCircle, ChevronRight
} from "lucide-react";

export default function VitalVidaProposal() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1500);
  }, []);

  const handlePrint = () => {
    document.title = "VITALVIDA_CONVERSION_ENGINE_PROPOSAL";
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#000080] font-sans text-slate-900 selection:bg-[#DC143C] selection:text-white">
      
      {/* IMPORT EDITORIAL FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #FFFFFF !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; counter-reset: pageCounter; }
          body * { visibility: hidden; }
          #proposal-render, #proposal-render * { visibility: visible; }
          #proposal-render { position: absolute; left: 0; top: 0; width: 100%; background: #FFFFFF; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #FFFFFF;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          .page-num::after {
            counter-increment: pageCounter;
            content: "0" counter(pageCounter);
          }
          .no-print { display: none !important; }
        }
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .blueprint-line { border: 0.5pt solid #000080; }
        .blueprint-line-red { border: 0.5pt solid #DC143C; }
      `}</style>

      {/* === VIEW 1: THE PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#000080] via-[#000040] to-black"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl border-t-8 border-[#DC143C]">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-50 rounded-full flex items-center justify-center p-3 border border-slate-200">
            <Database size={32} className="text-[#000080]" />
          </div>

          <h1 className="font-serif text-3xl font-bold text-[#000080] mb-2 tracking-tight leading-none">The VitalVida<br/>Conversion Engine</h1>
          <p className="font-sans text-[#DC143C] text-[9px] font-bold mb-8 tracking-[0.2em] uppercase">Strategic Integration Proposal</p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-slate-50 p-6 border-l-2 border-[#000080] font-sans text-[10px] text-slate-500 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; AUDITING 25-PAGE BRIEF...</p>
              <p className="opacity-75">&gt; MAPPING FRAPPE SERVICE LAYER...</p>
              <p className="text-[#DC143C] font-bold animate-pulse">&gt; PROPOSAL_READY</p>
            </div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-[#000080] hover:bg-[#000040] text-white font-sans font-bold py-4 uppercase tracking-widest transition-all shadow-xl">
              <Download size={18} />
              Extract Proposal
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE PROPOSAL (Print Only) === */}
      <div id="proposal-render" className="hidden print:block text-[#000080]">
        
        {/* PAGE 1: COVER */}
        <div className="a4-page p-[25mm]">
          <div className="h-full flex flex-col border-4 border-[#000080] p-[15mm] relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#DC143C]"></div>
            
            <div className="mt-20">
              <p className="font-sans text-[10px] font-bold text-[#DC143C] uppercase tracking-[0.4em] mb-6">Strategic Proposal</p>
              <h1 className="font-serif text-7xl font-bold text-[#000080] uppercase tracking-tighter leading-[0.9] mb-8">
                The VitalVida<br/>Conversion<br/>Engine
              </h1>
              <div className="w-32 h-[2px] bg-[#000080] mb-8"></div>
              <p className="font-sans text-sm font-medium text-slate-600 leading-relaxed max-w-sm">
                A Phased Proposal for the WhatsApp Commerce & Financial Integration Layer.
              </p>
            </div>

            <div className="mt-auto pt-12 border-t border-slate-300 flex justify-between items-end">
              <div>
                <p className="font-sans text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">Prepared By</p>
                <p className="font-serif text-2xl font-bold text-[#000080] uppercase tracking-wide">Adeoye Boluwatife</p>
                <p className="font-sans text-[9px] font-bold text-[#DC143C] uppercase tracking-widest mt-1">Lead Architect</p>
              </div>
              <div className="text-right">
                <p className="font-sans text-[10px] font-bold text-[#000080] tracking-widest">www.boluadeoye.com.ng</p>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 2: THE HONEST READ */}
        <div className="a4-page p-[25mm]">
          <Header title="Section 1.0 // The Business Reality" />
          <main className="grow flex flex-col justify-center">
            <h2 className="font-serif text-5xl font-bold text-[#000080] mb-10">The Honest Read</h2>
            
            <div className="font-sans text-sm leading-[2.2] text-slate-700 text-justify">
              <p className="mb-6 first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:text-[#DC143C] first-letter:mr-3 first-letter:float-left">
                After a forensic audit of the 25-page VitalVida brief, my assessment is clear: This is not a messaging project; it is a <span className="font-bold text-[#000080]">Logistics-Financial State Machine</span>.
              </p>
              <p className="mb-6">
                You are currently losing <span className="font-bold text-[#DC143C]">₦4,000–₦6,000</span> on every Return To Office (RTO) failure. The core issue is not customer intent, but operational friction. 
              </p>
              <p className="mb-6 p-6 bg-slate-50 border-l-4 border-[#000080] italic font-medium">
                "My mission is to close the 'Doubt Window'—that high-risk period between checkout and bank transfer—by engineering a system where the product is the leverage and the Moniepoint webhook is the key."
              </p>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 3: DIAGRAM - THE DOUBT WINDOW */}
        <div className="a4-page p-[25mm]">
          <Header title="Section 1.1 // Risk Analysis" />
          <main className="grow flex flex-col justify-center">
            <h2 className="font-serif text-4xl font-bold text-[#000080] mb-16 text-center">The "Doubt Window" Timeline</h2>
            
            {/* THE TIMELINE DIAGRAM */}
            <div className="relative w-full max-w-2xl mx-auto mt-10">
              {/* Gradient Risk Line */}
              <div className="absolute top-6 left-0 w-full h-4 bg-gradient-to-r from-slate-100 via-red-200 to-[#DC143C] rounded-full z-0"></div>
              
              <div className="flex justify-between relative z-10">
                {/* Node 1 */}
                <div className="flex flex-col items-center w-32">
                  <div className="w-12 h-12 bg-white border-4 border-[#000080] rounded-full flex items-center justify-center mb-4 shadow-md">
                    <Clock size={20} className="text-[#000080]" />
                  </div>
                  <p className="font-sans text-[10px] font-bold text-center uppercase">Order Received</p>
                  <p className="font-sans text-[8px] text-slate-500 text-center mt-1">Risk: Low</p>
                </div>

                {/* Node 2 */}
                <div className="flex flex-col items-center w-32">
                  <div className="w-12 h-12 bg-white border-4 border-[#DC143C] rounded-full flex items-center justify-center mb-4 shadow-md">
                    <AlertTriangle size={20} className="text-[#DC143C]" />
                  </div>
                  <p className="font-sans text-[10px] font-bold text-center uppercase text-[#DC143C]">Rider Dispatch</p>
                  <p className="font-sans text-[8px] text-[#DC143C] text-center mt-1">Risk: Escalating</p>
                </div>

                {/* Node 3 */}
                <div className="flex flex-col items-center w-32">
                  <div className="w-12 h-12 bg-[#000080] border-4 border-[#000080] rounded-full flex items-center justify-center mb-4 shadow-md">
                    <Anchor size={20} className="text-white" />
                  </div>
                  <p className="font-sans text-[10px] font-bold text-center uppercase text-[#000080]">Rider Arrival</p>
                  <p className="font-sans text-[8px] text-[#000080] text-center mt-1">Moniepoint Anchor</p>
                </div>
              </div>

              {/* Annotation */}
              <div className="mt-16 text-center border border-slate-200 p-6 bg-slate-50">
                <p className="font-sans text-xs font-bold text-[#DC143C] uppercase tracking-widest mb-2">The Vulnerability Zone</p>
                <p className="font-sans text-[10px] text-slate-600 leading-relaxed">
                  As time elapses between dispatch and arrival, buyer's remorse and logistical friction increase cancellation probability. The Moniepoint Webhook acts as the definitive anchor, converting intent into settled revenue.
                </p>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 4: TECHNICAL ARCHITECTURE */}
        <div className="a4-page p-[25mm]">
          <Header title="Section 2.0 // The Unfair Advantage" />
          <main className="grow flex flex-col">
            <h2 className="font-serif text-4xl font-bold text-[#000080] mb-8">Technical Architecture</h2>
            
            <p className="font-sans text-sm leading-[2] text-slate-700 text-justify mb-12">
              We are moving away from the fragile Google Apps Script environment to a native <span className="font-bold text-[#000080]">Frappe Service Layer</span>. By integrating the official Meta WhatsApp Business API directly with your ERPNext core, we eliminate 'WhatsApp Jailing' and data latency.
            </p>

            {/* ECOSYSTEM MAP DIAGRAM */}
            <div className="grow relative flex items-center justify-center border border-slate-200 bg-slate-50 p-10">
              <p className="absolute top-4 left-4 font-sans text-[8px] font-bold text-slate-400 uppercase tracking-widest">The VitalVida Ecosystem Map</p>
              
              {/* Central Hub */}
              <div className="absolute z-20 w-32 h-32 bg-[#000080] rounded-full flex flex-col items-center justify-center text-white shadow-xl border-4 border-white">
                <Database size={24} className="mb-1" />
                <p className="font-sans text-[10px] font-bold text-center leading-tight">ERPNext<br/>Core</p>
                <p className="font-sans text-[7px] opacity-70">(Frappe)</p>
              </div>

              {/* Spoke 1: Meta */}
              <div className="absolute top-10 left-10 z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-white blueprint-line rounded-full flex items-center justify-center mb-2">
                  <MessageSquare size={20} className="text-[#000080]" />
                </div>
                <p className="font-sans text-[8px] font-bold uppercase">Meta API</p>
              </div>
              <svg className="absolute inset-0 w-full h-full z-0"><line x1="25%" y1="25%" x2="50%" y2="50%" stroke="#000080" strokeWidth="1" strokeDasharray="4 4"/></svg>

              {/* Spoke 2: Moniepoint */}
              <div className="absolute top-10 right-10 z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-white blueprint-line rounded-full flex items-center justify-center mb-2">
                  <CreditCard size={20} className="text-[#000080]" />
                </div>
                <p className="font-sans text-[8px] font-bold uppercase">Moniepoint</p>
              </div>
              <svg className="absolute inset-0 w-full h-full z-0"><line x1="75%" y1="25%" x2="50%" y2="50%" stroke="#000080" strokeWidth="1" strokeDasharray="4 4"/></svg>

              {/* Spoke 3: AI Brain */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-white blueprint-line-red rounded-full flex items-center justify-center mb-2">
                  <BrainCircuit size={20} className="text-[#DC143C]" />
                </div>
                <p className="font-sans text-[8px] font-bold uppercase text-[#DC143C]">Groq / Llama 3.3</p>
              </div>
              <svg className="absolute inset-0 w-full h-full z-0"><line x1="50%" y1="75%" x2="50%" y2="50%" stroke="#DC143C" strokeWidth="1" strokeDasharray="4 4"/></svg>

            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 5: MOBILE UI SKETCH */}
        <div className="a4-page p-[25mm]">
          <Header title="Section 2.1 // Interface Logic" />
          <main className="grow flex flex-col items-center justify-center">
            <h2 className="font-serif text-3xl font-bold text-[#000080] mb-12 text-center">Rider Command Interaction</h2>
            
            {/* PHONE MOCKUP */}
            <div className="w-72 h-[500px] border-[6px] border-[#000080] rounded-[3rem] p-4 flex flex-col bg-slate-50 relative shadow-2xl">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#000080] rounded-b-xl"></div>
              
              {/* Header */}
              <div className="mt-6 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-[#000080] rounded-full flex items-center justify-center text-white font-sans text-[10px] font-bold">VV</div>
                <div>
                  <p className="font-sans text-[10px] font-bold text-[#000080]">VitalVida System</p>
                  <p className="font-sans text-[8px] text-green-600">Online</p>
                </div>
              </div>

              {/* Chat Area */}
              <div className="grow flex flex-col gap-4">
                {/* Rider Message */}
                <div className="self-end bg-[#000080] text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                  <p className="font-mono text-[10px]">ARRIVED VVO-001</p>
                </div>
                
                {/* System Processing */}
                <div className="self-start flex items-center gap-2 opacity-50">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>

                {/* System Response (Urgency) */}
                <div className="self-start bg-white border border-[#DC143C] p-3 rounded-2xl rounded-tl-sm max-w-[90%] shadow-sm">
                  <p className="font-sans text-[9px] font-bold text-[#DC143C] mb-1 flex items-center gap-1"><AlertTriangle size={10}/> URGENT: CUSTOMER ALERT FIRED</p>
                  <p className="font-sans text-[9px] text-slate-700 leading-relaxed">
                    "Your VitalVida package has arrived! Please complete your Moniepoint transfer within 10 minutes to secure handover."
                  </p>
                </div>
              </div>

              {/* Input Area */}
              <div className="h-10 bg-white border border-slate-200 rounded-full mt-auto flex items-center px-4">
                <p className="font-sans text-[10px] text-slate-400">Type command...</p>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 6: INVESTMENT ROADMAP */}
        <div className="a4-page p-[25mm]">
          <Header title="Section 3.0 // Phased Implementation" />
          <main className="grow flex flex-col">
            <h2 className="font-serif text-4xl font-bold text-[#000080] mb-6">Investment Roadmap</h2>
            <p className="font-sans text-sm leading-[2] text-slate-700 text-justify mb-10">
              The scope is determined by the rigor of the 'Hard Policy'—ensuring no product is handed over without digital confirmation. I have structured the investment into three logical gates.
            </p>

            {/* THE TABLE */}
            <div className="w-full border border-slate-200 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-12 bg-[#000080] text-white font-sans text-[9px] font-bold uppercase tracking-widest p-4">
                <div className="col-span-2">Phase</div>
                <div className="col-span-6">Core Deliverables</div>
                <div className="col-span-2">Timeline</div>
                <div className="col-span-2 text-right">Investment</div>
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-12 p-4 border-b border-slate-200 items-center bg-blue-50/30">
                <div className="col-span-2 font-sans text-[10px] font-bold text-[#000080]">Phase A:<br/>Foundation</div>
                <div className="col-span-6 font-sans text-[10px] text-slate-600 leading-relaxed pr-4">Meta WABA Setup, Migration off Google Sheets, 10 Transactional Templates.</div>
                <div className="col-span-2 font-mono text-[10px] text-slate-500">10 Days</div>
                <div className="col-span-2 text-right font-mono text-[10px] font-bold text-[#000080]">₦250,000</div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-12 p-4 border-b border-slate-200 items-center bg-red-50/30">
                <div className="col-span-2 font-sans text-[10px] font-bold text-[#DC143C]">Phase B:<br/>Urgency Engine</div>
                <div className="col-span-6 font-sans text-[10px] text-slate-600 leading-relaxed pr-4">7 POD-BT Triggers, 3 Retention Engines, Affiliate Logic.</div>
                <div className="col-span-2 font-mono text-[10px] text-slate-500">14 Days</div>
                <div className="col-span-2 text-right font-mono text-[10px] font-bold text-[#DC143C]">₦400,000</div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-12 p-4 border-b border-slate-200 items-center">
                <div className="col-span-2 font-sans text-[10px] font-bold text-[#000080]">Phase C:<br/>AI Sales Agent</div>
                <div className="col-span-6 font-sans text-[10px] text-slate-600 leading-relaxed pr-4">Groq/Llama Integration, RAG Knowledge Base, Moniepoint Automation.</div>
                <div className="col-span-2 font-mono text-[10px] text-slate-500">14 Days</div>
                <div className="col-span-2 text-right font-mono text-[10px] font-bold text-[#000080]">₦500,000</div>
              </div>

              {/* Footer Total */}
              <div className="grid grid-cols-12 p-4 bg-slate-100 items-center">
                <div className="col-span-10 text-right font-sans text-[10px] font-bold uppercase tracking-widest text-slate-500 pr-4">Total Project Value</div>
                <div className="col-span-2 text-right font-mono text-sm font-black text-[#000080]">₦1,150,000</div>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 7: ACCEPTANCE PROTECTIONS */}
        <div className="a4-page p-[25mm]">
          <Header title="Section 4.0 // The Trust Protocol" />
          <main className="grow flex flex-col">
            <h2 className="font-serif text-4xl font-bold text-[#000080] mb-6">Acceptance Protections</h2>
            <p className="font-sans text-sm leading-[2] text-slate-700 text-justify mb-12">
              I am fully aligned with the high-stakes nature of your operations. My workflow includes built-in safeguards to ensure zero downtime during the cutover.
            </p>

            {/* 4-POINT INFOGRAPHIC */}
            <div className="grid grid-cols-2 gap-8">
              
              <div className="border border-slate-200 p-6 bg-slate-50">
                <Video size={24} className="text-[#000080] mb-4" />
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#000080] mb-2">1. Loom Evidence</h3>
                <p className="font-sans text-[10px] text-slate-600 leading-relaxed">Every trigger and workflow is verified via recorded video demonstration before any payment milestone is requested.</p>
              </div>

              <div className="border border-slate-200 p-6 bg-slate-50">
                <GitBranch size={24} className="text-[#000080] mb-4" />
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#000080] mb-2">2. Feature Branching</h3>
                <p className="font-sans text-[10px] text-slate-600 leading-relaxed">All development work is isolated on a dedicated <span className="font-mono text-[9px] bg-white px-1">whatsapp-erp-integration</span> branch to protect production stability.</p>
              </div>

              <div className="border border-slate-200 p-6 bg-slate-50">
                <Database size={24} className="text-[#000080] mb-4" />
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#000080] mb-2">3. Database Integrity</h3>
                <p className="font-sans text-[10px] text-slate-600 leading-relaxed">Mandatory, verifiable database backups are executed immediately prior to every production push.</p>
              </div>

              <div className="border border-slate-200 p-6 bg-slate-50 border-b-4 border-b-[#DC143C]">
                <ShieldCheck size={24} className="text-[#DC143C] mb-4" />
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#DC143C] mb-2">4. 14-Day Warranty</h3>
                <p className="font-sans text-[10px] text-slate-600 leading-relaxed">Comprehensive post-launch bug support and system monitoring provided at zero additional cost for 14 days.</p>
              </div>

            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 8: STRATEGIC CLARIFICATIONS & SIGN-OFF */}
        <div className="a4-page p-[25mm]">
          <Header title="Section 5.0 // Expert Discovery" />
          <main className="grow flex flex-col">
            <h2 className="font-serif text-4xl font-bold text-[#000080] mb-6">Strategic Clarifications</h2>
            <p className="font-sans text-sm leading-[2] text-slate-700 text-justify mb-10">
              To ensure Phase A is a 'Zero-Failure' deployment, I have identified four technical dependencies to discuss during our 30-minute alignment call:
            </p>

            <div className="space-y-6 mb-16">
              <div className="flex gap-4">
                <div className="font-serif text-2xl font-bold text-[#DC143C]">1.</div>
                <div>
                  <h3 className="font-sans text-xs font-bold text-[#000080] uppercase tracking-widest mb-1">Transaction Query API</h3>
                  <p className="font-sans text-[11px] text-slate-600 leading-relaxed">Beyond the webhook, do we have 'GET' access to Moniepoint to perform manual re-syncs for riders?</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="font-serif text-2xl font-bold text-[#DC143C]">2.</div>
                <div>
                  <h3 className="font-sans text-xs font-bold text-[#000080] uppercase tracking-widest mb-1">Rider Authentication</h3>
                  <p className="font-sans text-[11px] text-slate-600 leading-relaxed">Will we use phone-number whitelisting or unique Rider IDs for the WhatsApp command interface?</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="font-serif text-2xl font-bold text-[#DC143C]">3.</div>
                <div>
                  <h3 className="font-sans text-xs font-bold text-[#000080] uppercase tracking-widest mb-1">Migration Scale</h3>
                  <p className="font-sans text-[11px] text-slate-600 leading-relaxed">What is the total row count of the current Google Sheet to optimize the import script?</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="font-serif text-2xl font-bold text-[#DC143C]">4.</div>
                <div>
                  <h3 className="font-sans text-xs font-bold text-[#000080] uppercase tracking-widest mb-1">The "Whale" Protocol</h3>
                  <p className="font-sans text-[11px] text-slate-600 leading-relaxed">Should the AI be programmatically silenced the moment a ₦100k+ order escalates to the founder?</p>
                </div>
              </div>
            </div>

            {/* SIGNATURE BLOCK */}
            <div className="mt-auto pt-8 border-t-2 border-[#000080]">
              <p className="font-sans text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">Architectural Approval</p>
              <h3 className="font-serif text-3xl font-bold text-[#000080] mb-1">Adeoye Boluwatife</h3>
              <p className="font-sans text-[10px] font-bold text-[#DC143C] uppercase tracking-widest">Lead Architect</p>
            </div>
          </main>
          <Footer />
        </div>

      </div>
    </div>
  );
}

// Reusable Components
function Header({ title }) {
  return (
    <header className="flex justify-between items-end border-b border-slate-200 pb-4 mb-12 relative z-10">
      <span className="font-sans text-[8px] font-bold text-slate-400 uppercase tracking-widest">{title}</span>
      <span className="font-sans text-[8px] text-[#000080] font-bold page-num"></span>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center relative z-10">
      <span className="font-sans text-[7px] font-bold uppercase tracking-widest text-slate-400">
        CONFIDENTIAL // VITALVIDA CONVERSION ENGINE
      </span>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-[#000080]"></div>
        <div className="w-1.5 h-1.5 bg-[#DC143C]"></div>
      </div>
    </footer>
  );
}
