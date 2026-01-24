"use client";
import { Download, ArrowLeft, Server, Database, Shield, Zap, Cpu, Layers, CheckCircle2, AlertTriangle, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function ScholarsEdgeProposal() {
  
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Scholars_Edge_Technical_Audit_v1";
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
          .page-break { page-break-before: always; margin-top: 2rem; display: block; }
          .avoid-break { break-inside: avoid; }
        }
      `}</style>

      {/* === VIEW 1: DOWNLOAD PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>

        <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20">
            <Server size={32} className="text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Scholars Edge</h1>
          <p className="text-slate-400 text-sm mb-8">Infrastructure Audit • Scaling to 30k</p>

          <button 
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-200 text-slate-950 font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl"
          >
            <Download size={20} />
            <span>Download Audit PDF</span>
          </button>

          <Link href="/" className="block mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← Return to Dashboard
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block">
        
        {/* ================= PAGE 1: EXECUTIVE SUMMARY ================= */}
        <div className="p-[20mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          {/* Header */}
          <div className="border-b-4 border-blue-900 pb-6 mb-10 flex justify-between items-end">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Infrastructure Audit 2026</p>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none text-slate-900">
                Scholars<br/><span className="text-blue-700">Edge</span>
              </h1>
            </div>
            <div className="text-right">
              <div className="bg-slate-900 text-white px-4 py-1 font-bold text-xs uppercase inline-block mb-1">Confidential</div>
              <p className="text-xs font-mono font-bold">DATE: JAN 24, 2026</p>
            </div>
          </div>

          {/* 1. Executive Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-blue-900 pl-4 mb-6 text-slate-900">1. Executive Architectural Summary</h2>
            
            <div className="mb-6">
              <h3 className="font-bold text-sm uppercase text-slate-500 mb-2">The Transition</h3>
              <p className="text-sm leading-relaxed text-justify font-medium text-slate-800">
                Scholars Edge is currently operating on a <strong>Platform-Dependent Model</strong> (WhatsApp/Telegram). While effective for 3,000 students, this model poses an existential risk at 30,000 users due to account bans, manual data entry limits, and lack of ownership.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-sm uppercase text-slate-500 mb-2">The Objective</h3>
              <p className="text-sm leading-relaxed text-justify font-medium text-slate-800">
                We are migrating to a <strong>Sovereign Infrastructure</strong> capable of supporting <strong>30,000+ concurrent learners</strong> with 99.9% uptime. The architecture prioritizes <strong>Cost-Efficiency</strong> (Linear Scaling) and <strong>Data Integrity</strong> (NDPR Compliance).
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-900 p-4">
              <h3 className="font-bold text-sm uppercase text-blue-900 mb-1">The Promise</h3>
              <p className="text-sm leading-relaxed font-medium text-slate-700">
                This audit outlines a "High-Concurrency, Low-Cost" stack designed to handle the "9:00 AM Exam Rush" without crashing, while keeping operational costs under $100/month for the first 10,000 users.
              </p>
            </div>
          </section>

          {/* 2. The High-Concurrency Stack */}
          <section className="flex-1">
            <h2 className="text-xl font-black uppercase border-l-8 border-blue-900 pl-4 mb-6 text-slate-900">2. The High-Concurrency Stack</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border-2 border-slate-200 rounded-lg">
                <div className="text-blue-700 mb-2"><Layers size={24} /></div>
                <h4 className="font-bold text-sm uppercase mb-2">Frontend / Edge</h4>
                <p className="text-xs text-slate-600 font-bold">Next.js 15 (App Router)</p>
                <p className="text-[10px] text-slate-500 mt-1">Deployed on Vercel Edge Network. Uses Server Actions to reduce API latency by 40%.</p>
              </div>
              <div className="p-4 border-2 border-slate-200 rounded-lg">
                <div className="text-blue-700 mb-2"><Database size={24} /></div>
                <h4 className="font-bold text-sm uppercase mb-2">Database Engine</h4>
                <p className="text-xs text-slate-600 font-bold">Neon Serverless Postgres</p>
                <p className="text-[10px] text-slate-500 mt-1">Utilizes Connection Pooling to handle 10,000+ simultaneous exam submissions.</p>
              </div>
              <div className="p-4 border-2 border-slate-200 rounded-lg">
                <div className="text-blue-700 mb-2"><Shield size={24} /></div>
                <h4 className="font-bold text-sm uppercase mb-2">Security Layer</h4>
                <p className="text-xs text-slate-600 font-bold">Cloudflare WAF + RLS</p>
                <p className="text-[10px] text-slate-500 mt-1">Row-Level Security ensures strict data isolation between 30,000 student records.</p>
              </div>
              <div className="p-4 border-2 border-slate-200 rounded-lg">
                <div className="text-blue-700 mb-2"><Cpu size={24} /></div>
                <h4 className="font-bold text-sm uppercase mb-2">AI Intelligence</h4>
                <p className="text-xs text-slate-600 font-bold">Groq LPU + OpenAI</p>
                <p className="text-[10px] text-slate-500 mt-1">Hybrid model for "Weak-Skill Recognition" and personalized study paths.</p>
              </div>
            </div>
          </section>

          <div className="text-right text-xs font-black text-slate-400">Page 1/6</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 2: COST ANALYSIS ================= */}
        <div className="p-[20mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          {/* 3. Infrastructure Cost Analysis */}
          <section className="mb-12">
            <h2 className="text-xl font-black uppercase border-l-8 border-blue-900 pl-4 mb-6 text-slate-900">3. Infrastructure Cost Analysis</h2>
            <p className="text-sm mb-6 text-slate-700">
              To ensure sustainability, we utilize a <strong>"Linear Cost Scaling"</strong> model. We leverage Free Tiers and Serverless pricing to keep costs low until revenue scales.
            </p>
            
            <table className="w-full border-4 border-slate-900 text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-3 text-left uppercase">Service</th>
                  <th className="p-3 text-left uppercase">Provider</th>
                  <th className="p-3 text-left uppercase">Function</th>
                  <th className="p-3 text-right uppercase">Est. Monthly Cost</th>
                </tr>
              </thead>
              <tbody className="text-slate-800 font-medium">
                <tr className="border-b-2 border-slate-200">
                  <td className="p-3 font-bold">Hosting & Edge</td>
                  <td className="p-3">Vercel Pro</td>
                  <td className="p-3 text-xs">Frontend Delivery & Serverless Functions</td>
                  <td className="p-3 text-right">$20.00</td>
                </tr>
                <tr className="border-b-2 border-slate-200">
                  <td className="p-3 font-bold">Database</td>
                  <td className="p-3">Neon Postgres</td>
                  <td className="p-3 text-xs">Student Records & Exam Data</td>
                  <td className="p-3 text-right">$20 - $50</td>
                </tr>
                <tr className="border-b-2 border-slate-200">
                  <td className="p-3 font-bold">Email API</td>
                  <td className="p-3">Resend Pro</td>
                  <td className="p-3 text-xs">Transactional Emails (Welcome/Results)</td>
                  <td className="p-3 text-right">$20.00</td>
                </tr>
                <tr className="border-b-2 border-slate-200">
                  <td className="p-3 font-bold">AI Inference</td>
                  <td className="p-3">Groq / OpenAI</td>
                  <td className="p-3 text-xs">Personalized Study Paths (Usage Based)</td>
                  <td className="p-3 text-right">$20 - $40</td>
                </tr>
                <tr className="bg-blue-50 font-black">
                  <td className="p-3" colSpan="3">TOTAL ESTIMATED INFRASTRUCTURE COST</td>
                  <td className="p-3 text-right text-blue-900">$80 - $130</td>
                </tr>
              </tbody>
            </table>
            <p className="text-[10px] mt-2 text-slate-500 italic">* Costs are usage-based and scale linearly with student enrollment. Does not include developer fees.</p>
          </section>

          {/* 4. Scalability & Risk Mitigation */}
          <section className="flex-1">
            <h2 className="text-xl font-black uppercase border-l-8 border-blue-900 pl-4 mb-6 text-slate-900">4. Scalability & Risk Mitigation</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase text-red-700">Risk: The "9:00 AM Exam Rush"</h4>
                  <p className="text-xs text-slate-700 mt-1">
                    If 10,000 students click "Start Exam" simultaneously, traditional servers will crash due to connection limits.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase text-green-700">Solution: Edge Caching & Stateless Exams</h4>
                  <p className="text-xs text-slate-700 mt-1">
                    <strong>1. Edge Delivery:</strong> Exam questions are cached at the Edge (Cloudflare), reducing database hits by 99%.<br/>
                    <strong>2. Client-Side State:</strong> The exam timer and logic run in the student's browser. The server is only contacted for submission.<br/>
                    <strong>3. Connection Pooling:</strong> Neon manages thousands of concurrent connections without dropping packets.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="text-right text-xs font-black text-slate-400">Page 2/6</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 3: ARCHITECTURE DIAGRAM ================= */}
        <div className="p-[20mm] pt-[20mm] h-[297mm] relative flex flex-col">
          <h2 className="text-xl font-black uppercase border-l-8 border-blue-900 pl-4 mb-8 text-slate-900">5. System Architecture Diagram</h2>
          
          {/* DIAGRAM A: REQUEST LIFECYCLE */}
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-center font-bold text-sm uppercase mb-6 text-slate-500">Diagram A: The Request Lifecycle</h3>
            
            <div className="flex flex-col items-center gap-4 text-[10px] font-black uppercase">
              
              {/* USER LAYER */}
              <div className="flex gap-4 w-full justify-center">
                <div className="border-2 border-slate-900 p-3 rounded bg-white text-center w-32">
                  Student<br/>(Mobile/Web)
                </div>
                <div className="border-2 border-slate-900 p-3 rounded bg-white text-center w-32">
                  Tutor<br/>(Admin Panel)
                </div>
              </div>

              <div className="h-6 w-0.5 bg-slate-900"></div>

              {/* EDGE LAYER */}
              <div className="border-2 border-blue-600 p-4 rounded-xl bg-blue-50 relative w-full max-w-lg text-center">
                <span className="absolute -top-3 left-4 bg-white px-2 text-blue-600 text-xs font-black border border-blue-200">Cloudflare / Vercel Edge</span>
                <p className="mb-2">WAF • DDoS Protection • Static Caching</p>
                <div className="bg-white border border-blue-200 p-2 rounded text-[9px] text-slate-600">
                  Next.js Middleware (Auth Check)
                </div>
              </div>

              <div className="h-6 w-0.5 bg-slate-900"></div>

              {/* SERVERLESS LAYER */}
              <div className="flex gap-4 w-full justify-center">
                <div className="border-2 border-slate-900 p-4 w-40 text-center bg-white">
                  Server Actions<br/>(API Logic)
                </div>
                <div className="border-2 border-slate-900 p-4 w-40 text-center bg-white">
                  AI Engine<br/>(Groq LPU)
                </div>
              </div>

              <div className="h-6 w-0.5 bg-slate-900"></div>

              {/* DATA LAYER */}
              <div className="border-2 border-slate-900 p-4 w-48 text-center bg-slate-900 text-white rounded-lg shadow-xl">
                NEON POSTGRES<br/>
                <span className="text-[8px] font-normal opacity-70">Row-Level Security (RLS)</span>
              </div>

            </div>
          </div>

          <div className="text-right text-xs font-black text-slate-400">Page 3/6</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 4: TIER ACCESS DIAGRAM ================= */}
        <div className="p-[20mm] pt-[20mm] h-[297mm] relative flex flex-col">
          <h2 className="text-xl font-black uppercase border-l-8 border-blue-900 pl-4 mb-8 text-slate-900">6. Tier-Based Access Model</h2>
          
          {/* DIAGRAM B: ACCESS CONTROL */}
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-center font-bold text-sm uppercase mb-6 text-slate-500">Diagram B: Security & Permissions</h3>
            
            <div className="grid grid-cols-3 gap-4 text-[10px] font-bold uppercase h-64">
              
              {/* TIER 1 */}
              <div className="border-2 border-slate-300 bg-slate-50 p-4 flex flex-col justify-between rounded-lg">
                <div className="text-center border-b-2 border-slate-300 pb-2 mb-2">
                  <span className="text-xs font-black text-slate-600">Bronze Tier</span>
                  <br/>(Free User)
                </div>
                <ul className="list-disc pl-4 space-y-2 text-[9px] normal-case font-medium">
                  <li>Access Public Resources</li>
                  <li>View Tutors</li>
                  <li>Limited Mock Exams</li>
                </ul>
                <div className="mt-auto bg-red-100 text-red-700 p-2 text-center rounded border border-red-200">
                  RLS: Block Premium
                </div>
              </div>

              {/* TIER 2 */}
              <div className="border-2 border-blue-300 bg-blue-50 p-4 flex flex-col justify-between rounded-lg shadow-md">
                <div className="text-center border-b-2 border-blue-300 pb-2 mb-2">
                  <span className="text-xs font-black text-blue-700">Silver Tier</span>
                  <br/>(Monthly Sub)
                </div>
                <ul className="list-disc pl-4 space-y-2 text-[9px] normal-case font-medium">
                  <li>Full Exam Access</li>
                  <li>Attendance Tracking</li>
                  <li>Performance History</li>
                </ul>
                <div className="mt-auto bg-green-100 text-green-700 p-2 text-center rounded border border-green-200">
                  RLS: Allow Standard
                </div>
              </div>

              {/* TIER 3 */}
              <div className="border-2 border-amber-400 bg-amber-50 p-4 flex flex-col justify-between rounded-lg shadow-xl transform scale-105">
                <div className="text-center border-b-2 border-amber-400 pb-2 mb-2">
                  <span className="text-xs font-black text-amber-700">Gold Tier</span>
                  <br/>(3-Month Plan)
                </div>
                <ul className="list-disc pl-4 space-y-2 text-[9px] normal-case font-medium">
                  <li>All Silver Features</li>
                  <li>AI Personalized Path</li>
                  <li>Downloadable PDFs</li>
                </ul>
                <div className="mt-auto bg-amber-200 text-amber-900 p-2 text-center rounded border border-amber-300">
                  RLS: Allow All
                </div>
              </div>

            </div>
            
            <div className="mt-8 p-4 border-l-4 border-blue-900 bg-slate-50 text-xs text-slate-700">
              <strong>Note on RLS (Row-Level Security):</strong> Access control is enforced at the <em>Database Level</em>, not just the application level. Even if a hacker bypasses the frontend, the database will reject the query if the user's `tier_id` does not match the resource.
            </div>
          </div>

          <div className="text-right text-xs font-black text-slate-400">Page 4/6</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 5: AI & PEDAGOGY ================= */}
        <div className="p-[20mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          {/* 7. AI & Pedagogical Intelligence */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-blue-900 pl-4 mb-6 text-slate-900">7. AI & Pedagogical Intelligence</h2>
            
            <div className="mb-6">
              <h3 className="font-bold text-sm uppercase text-slate-500 mb-2">Weak-Skill Recognition</h3>
              <p className="text-sm leading-relaxed text-justify font-medium text-slate-800">
                We integrate <strong>Groq LPU</strong> to analyze student exam performance in real-time. The system identifies patterns (e.g., "Student consistently fails Calculus Algebra questions") and tags the user profile with specific weakness metadata.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-sm uppercase text-slate-500 mb-2">Autonomous Study Paths</h3>
              <p className="text-sm leading-relaxed text-justify font-medium text-slate-800">
                Based on the weakness tags, the system autonomously generates a <strong>Personalized Study Schedule</strong>. It recommends specific YouTube embeds and PDF chapters from the Resource Hub that target the student's failing areas.
              </p>
            </div>
          </section>

          {/* 8. Data Sovereignty */}
          <section className="flex-1">
            <h2 className="text-xl font-black uppercase border-l-8 border-blue-900 pl-4 mb-6 text-slate-900">8. Data Sovereignty & NDPR</h2>
            <div className="bg-slate-50 p-6 border-2 border-slate-200 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Shield size={24} className="text-blue-900" />
                <h3 className="font-black text-sm uppercase">Compliance Strategy</h3>
              </div>
              <ul className="list-disc pl-5 text-sm font-medium text-slate-700 space-y-2">
                <li><strong>Data Residency:</strong> All student PII (Personally Identifiable Information) is encrypted at rest using AES-256.</li>
                <li><strong>Ownership:</strong> Unlike WhatsApp, Scholars Edge owns the student database. Data can be exported to CSV/Excel for regulatory reporting.</li>
                <li><strong>Payment Security:</strong> We utilize Paystack's PCI-DSS compliant infrastructure. No card details are stored on our servers.</li>
              </ul>
            </div>
          </section>

          <div className="text-right text-xs font-black text-slate-400">Page 5/6</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 6: CONCLUSION ================= */}
        <div className="p-[20mm] pt-[20mm] h-[297mm] relative flex flex-col justify-between">
          
          {/* 9. Conclusion */}
          <section className="mb-12">
            <h2 className="text-xl font-black uppercase border-l-8 border-blue-900 pl-4 mb-6 text-slate-900">9. Final Technical Verdict</h2>
            <p className="text-sm leading-relaxed text-justify font-medium text-slate-800 mb-4">
              The proposed architecture (Next.js 15 + Neon + Cloudflare) is the only viable solution for scaling Scholars Edge to 30,000+ students while maintaining operational stability.
            </p>
            <p className="text-sm leading-relaxed text-justify font-bold text-blue-900">
              This system transforms Scholars Edge from a "Tutorial Group" into a "Digital Institution." It is Future-Proof, Cost-Efficient, and ready for the 2026 academic session.
            </p>
          </section>

          {/* SIGNATURE BLOCK */}
          <footer className="mt-auto pt-8 border-t-[6px] border-slate-900 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Architectural Approval</p>
              <div className="font-serif italic text-5xl text-black mb-2" style={{ fontFamily: 'cursive' }}>
                Boluwatife Adeoye
              </div>
              <div className="h-1.5 w-48 bg-blue-900 mb-2"></div>
              <p className="text-sm font-black text-black uppercase">Lead Technical Architect</p>
              <p className="text-xs font-bold text-slate-600">boluadeoye.com.ng</p>
            </div>
            <div className="text-right">
              <div className="w-24 h-24 bg-blue-900 text-white flex items-center justify-center font-black text-4xl rounded-xl shadow-2xl">
                BA
              </div>
            </div>
          </footer>
          
          <div className="absolute bottom-8 right-8 text-xs font-black text-slate-400">Page 6/6</div>
        </div>

      </div>
    </div>
  );
}
