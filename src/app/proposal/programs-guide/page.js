"use client";
import { useState, useEffect } from "react";
import { 
  Download, BookOpen, Clock, CheckCircle2, FileText, 
  Users, Award, Calendar, ShieldCheck, Mail, MapPin, Globe, Play
} from "lucide-react";
import Link from "next/link";

export default function ProgramsGuide() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1200);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Programs_And_Anchors_Team_Documentation_Guide";
    window.print();
    document.title = originalTitle;
  };

  const logoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1772401576/blog_assets/vm1cxy8mcisdwwkghk3i.jpg";

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-red-200">
      
      {/* IMPORT PREMIUM TYPOGRAPHY */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;0,900;1,600&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body * { visibility: hidden; }
          #manual-render, #manual-render * { visibility: visible; }
          #manual-render { position: absolute; left: 0; top: 0; width: 100%; background: white; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background: white;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            padding: 20mm 20mm 15mm 20mm;
          }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .thin-border { border: 0.5pt solid #e2e8f0; }
        .thin-border-b { border-bottom: 0.5pt solid #cbd5e1; }
        .thin-border-t { border-top: 0.5pt solid #cbd5e1; }
        
        /* TABLE STYLING FOR PRINT */
        .manual-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        .manual-table th { background-color: #991b1b !important; color: white !important; font-family: 'Inter', sans-serif; font-weight: 800; text-transform: uppercase; font-size: 8px; tracking: 0.1em; padding: 10px; text-align: left; }
        .manual-table td { padding: 10px; font-family: 'Inter', sans-serif; font-size: 9px; border-bottom: 0.5pt solid #e2e8f0; color: #334155; }
        .manual-table tr:nth-child(even) { background-color: #fafaf9 !important; }
      `}</style>

      {/* === VIEW 1: THE OBSIDIAN PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-950/30 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white rounded-2xl p-10 text-center shadow-2xl border-t-8 border-[#991b1b]">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-50 rounded-full flex items-center justify-center p-2 border border-slate-200">
            <img src={logoUrl} alt="Logo" className="w-full h-full object-contain rounded-full mix-blend-multiply" />
          </div>

          <h1 className="font-playfair text-2xl font-black text-slate-900 mb-2">Programs & Anchors</h1>
          <p className="font-inter text-slate-400 text-xs tracking-widest uppercase mb-8">Documentation Guide</p>

          {!isReady ? (
            <div className="text-slate-500 font-mono text-xs animate-pulse">COMPILING MANUSCRIPT...</div>
          ) : (
            <button 
              onClick={handlePrint} 
              className="w-full bg-[#991b1b] hover:bg-red-700 text-white font-inter font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-red-950/20"
            >
              <Download size={18} className="inline mr-2" />
              Download Guide (PDF)
            </button>
          )}
          
          <Link href="/" className="block mt-8 text-xs text-slate-500 hover:text-slate-800 uppercase tracking-widest">
            ← Return to Dashboard
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE 8-PAGE MANUAL (Print Only) === */}
      <div id="manual-render" className="hidden print:block text-slate-800">
        
        {/* ================= PAGE 1: COVER & PURPOSE ================= */}
        <div className="a4-page">
          <PageHeader logoUrl={logoUrl} pageNum="1" />
          
          <main className="grow flex flex-col justify-between">
            <div className="mt-10">
              <p className="font-inter text-xs font-bold text-red-600 uppercase tracking-[0.3em] mb-4">Inspirational Insight Christian Assembly</p>
              <h1 className="font-playfair text-5xl font-black uppercase tracking-tight leading-[1.05] text-slate-900 mb-2">
                Programs and<br/>Anchors Team:
              </h1>
              <h2 className="font-inter text-2xl font-light uppercase tracking-wider text-slate-500 mb-8">Documentation Guide</h2>
              <div className="h-1 w-24 bg-[#eab308] mb-12"></div>
            </div>

            <div className="bg-slate-50 border-l-4 border-red-800 p-6 mb-12">
              <p className="font-inter text-[10px] font-black uppercase text-red-800 tracking-widest mb-2">Purpose of this Document</p>
              <p className="font-inter text-xs leading-relaxed text-justify text-slate-600">
                This document is the official administrative blueprint for the Programs and Anchors Team. It provides a clear, standardized pattern for all our documentation, from internal team reports to external communications with guest ministers. The goal is to ensure anyone handling these duties can seamlessly maintain our team's standard of precision, transparency, and simple, intelligent communication without relying on stiff religious jargon.
              </p>
              <p className="font-mono text-[9px] text-slate-400 mt-4 uppercase">Prepared by: Adeoye Boluwatife</p>
            </div>

            <section className="border-t border-slate-100 pt-8">
              <h3 className="font-inter text-lg font-black uppercase tracking-tight text-slate-900 mb-4">1. Weekly & Weekend Order of Service</h3>
              <p className="font-inter text-xs leading-relaxed text-slate-600 text-justify">
                This format dictates the flow of our regular weekend services. It keeps the service moving seamlessly by attaching a specific person and a strict time limit to every single activity.
              </p>
            </section>
          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 2: TIMELINE & SCHEDULING ================= */}
        <div className="a4-page">
          <PageHeader logoUrl={logoUrl} pageNum="2" />
          
          <main className="grow flex flex-col justify-between">
            <section className="mb-8">
              <h4 className="font-inter text-xs font-black uppercase text-red-800 tracking-wider mb-4">Guidelines for Order of Service:</h4>
              <ul className="space-y-3 font-inter text-xs text-slate-600">
                <li className="flex gap-2 items-start"><CheckCircle2 size={14} className="text-red-600 shrink-0 mt-0.5" /> <strong>Header:</strong> Center the official name of the service and the full date.</li>
                <li className="flex gap-2 items-start"><CheckCircle2 size={14} className="text-red-600 shrink-0 mt-0.5" /> <strong>Activity Blocks:</strong> List the service in the exact chronological order it will happen. Every item must contain three details: what the activity is, who is anchoring it, and the exact time allocation (both duration and timestamps).</li>
                <li className="flex gap-2 items-start"><CheckCircle2 size={14} className="text-red-600 shrink-0 mt-0.5" /> <strong>The Flow:</strong> Maintain the standard progression: Opening Prayer, Minstrel, Testimony, Thanksgiving, Prayer Charge, The Word, and Announcements.</li>
              </ul>
            </section>

            {/* PIPELINE TIMELINE DIAGRAM */}
            <section className="grow flex flex-col justify-center">
              <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mb-4">Example: Order of Programme (Wisdom Service)</p>
              <div className="relative pl-8 border-l border-red-200 space-y-4">
                <TimelineNode time="4:00pm - 4:05pm" title="Opening Prayer" anchor="Sis. Nneka Okafor" duration="5 mins" />
                <TimelineNode time="4:05pm - 4:15pm" title="Minstrel Ministration" anchor="Minstrel Team" duration="10 mins" />
                <TimelineNode time="4:15pm - 4:20pm" title="Testimony" anchor="Bro. Kayode Peters" duration="5 mins" />
                <TimelineNode time="4:20pm - 4:25pm" title="Thanksgiving" anchor="Sis. Amina Bello" duration="5 mins" />
                <TimelineNode time="4:25pm - 4:30pm" title="Prayer Charge" anchor="Bro. Chinedu Eze" duration="5 mins" />
                <TimelineNode time="4:30pm - 6:00pm" title="The Word" anchor="Pastor Enitan Somuyiwa" duration="1 hr & 30 mins" highlight={true} />
                <TimelineNode time="6:00pm - 6:05pm" title="Announcement" anchor="Sis. Amina Bello" duration="5 mins" />
              </div>
            </section>
          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 3: EVENT SCHEDULING MATRIX ================= */}
        <div className="a4-page">
          <PageHeader logoUrl={logoUrl} pageNum="3" />
          
          <main className="grow flex flex-col justify-between">
            <section className="mb-6">
              <h3 className="font-inter text-lg font-black uppercase tracking-tight text-slate-900 mb-4">2. Event Scheduling & Itineraries</h3>
              <p className="font-inter text-xs leading-relaxed text-slate-600 text-justify">
                The structure of the schedule must match the scale of the program. Complex events require tabular breakdowns, while single-session events can be listed sequentially.
              </p>
              <h4 className="font-inter text-xs font-black uppercase text-red-800 tracking-wider my-4">Guidelines:</h4>
              <ul className="space-y-2 font-inter text-xs text-slate-600">
                <li className="flex gap-2 items-start"><CheckCircle2 size={12} className="text-[#eab308] shrink-0 mt-0.5" /> <strong>For Single Sessions:</strong> Outline the day in order. Put the total allocated time at the top, then list the speakers sequentially.</li>
                <li className="flex gap-2 items-start"><CheckCircle2 size={12} className="text-[#eab308] shrink-0 mt-0.5" /> <strong>For Multi-Day Conferences:</strong> Use a matrix layout. Break it down strictly by Morning and Evening sessions. Track every transition to 5-minute increments.</li>
              </ul>
            </section>

            {/* CONFERENCE MATRIX (Day 1) */}
            <section className="grow">
              <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mb-2">Example: Word Explosion Conference Schedule</p>
              <table className="manual-table">
                <thead>
                  <tr>
                    <th>Day & Session</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Activity</th>
                    <th>Minister / Anchor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-bold">Day 1: Evening<br/><span className="text-[7px] font-normal text-slate-400">(4:00pm - 7:30pm)</span></td>
                    <td>4:00 - 4:10</td>
                    <td>10 mins</td>
                    <td>Opening Prayers</td>
                    <td>Sis. Nneka Okafor</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>4:10 - 4:40</td>
                    <td>30 mins</td>
                    <td>Minstrel</td>
                    <td>Minstrel Team</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>4:40 - 4:50</td>
                    <td>10 mins</td>
                    <td>Thanksgiving</td>
                    <td>P&A Team</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>4:50 - 5:20</td>
                    <td>30 mins</td>
                    <td>Prayer/Worship Charge</td>
                    <td>Pastor Enitan Somuyiwa</td>
                  </tr>
                  <tr className="bg-red-50/50">
                    <td></td>
                    <td className="font-bold">5:20 - 7:20</td>
                    <td className="font-bold">2 hrs</td>
                    <td className="font-bold">The Word</td>
                    <td className="font-bold text-red-800">Pastor Enitan Somuyiwa & Mrs. Somuyiwa</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>7:20 - 7:30</td>
                    <td>10 mins</td>
                    <td>Announcement</td>
                    <td>Sis. Amina Bello</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 4: CONFERENCE MATRIX CONTINUATION & INVITATIONS ================= */}
        <div className="a4-page">
          <PageHeader logoUrl={logoUrl} pageNum="4" />
          
          <main className="grow flex flex-col justify-between">
            {/* Day 2 Schedule */}
            <section className="mb-8">
              <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mb-2">Word Explosion Schedule (Day 2 Continuation)</p>
              <table className="manual-table">
                <thead>
                  <tr>
                    <th>Day & Session</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Activity</th>
                    <th>Minister / Anchor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-bold">Day 2: Morning<br/><span className="text-[7px] font-normal text-slate-400">(8:00am - 11:30am)</span></td>
                    <td>8:00 - 8:05</td>
                    <td>5 mins</td>
                    <td>Opening</td>
                    <td>Bro. Chinedu Eze</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>8:05 - 8:25</td>
                    <td>20 mins</td>
                    <td>Minstrel Session</td>
                    <td>Minstrel Team</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>8:25 - 8:30</td>
                    <td>5 mins</td>
                    <td>Thanksgiving</td>
                    <td>P&A Team</td>
                  </tr>
                  <tr className="bg-red-50/50">
                    <td></td>
                    <td className="font-bold">8:30 - 9:15</td>
                    <td className="font-bold">45 mins</td>
                    <td className="font-bold">Word One</td>
                    <td className="font-bold text-red-800">Pastor Enitan Somuyiwa</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>9:15 - 9:45</td>
                    <td>30 mins</td>
                    <td>Worship</td>
                    <td>Min. Ebuka</td>
                  </tr>
                  <tr className="bg-red-50/50">
                    <td></td>
                    <td className="font-bold">9:45 - 11:00</td>
                    <td className="font-bold">1 hr 15 mins</td>
                    <td className="font-bold">Word Two</td>
                    <td className="font-bold text-red-800">Pastor Enitan Somuyiwa</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>11:00 - 11:30</td>
                    <td>30 mins</td>
                    <td>Announcement</td>
                    <td>P&A Team</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* SECTION 3: INVITATIONS */}
            <section className="border-t border-slate-100 pt-6">
              <h3 className="font-inter text-lg font-black uppercase tracking-tight text-slate-900 mb-4">3. Formal Letters of Invitation</h3>
              <p className="font-inter text-xs leading-relaxed text-slate-600 text-justify mb-4">
                Our first formal contact with a guest minister. It must be warm, clear, and highly professional. Do not force stiff religious words into the letter just to sound spiritual; keep the tone natural and intelligent.
              </p>
              <div className="grid grid-cols-3 gap-3 font-inter text-[9px] text-slate-500 uppercase tracking-wider">
                <div className="border border-slate-200 p-2 rounded"><strong>Header:</strong> Official Ministry Letterhead with Date.</div>
                <div className="border border-slate-200 p-2 rounded"><strong>The Message:</strong> Respectful greeting, clear core purpose.</div>
                <div className="border border-slate-200 p-2 rounded"><strong>The Details:</strong> Bulleted list of Day, Date, Time, and Duration.</div>
              </div>
            </section>
          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 5: STANDALONE INVITATION LETTER ================= */}
        <div className="a4-page p-[20mm]">
          {/* Subtle Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-0">
            <img src={logoUrl} alt="Watermark" className="w-[150mm] h-[150mm] object-contain grayscale" />
          </div>
          <div className="flex h-2 w-full absolute top-0 left-0 z-10">
            <div className="bg-[#991b1b] w-1/2"></div><div className="bg-[#eab308] w-1/4"></div><div className="bg-[#2563eb] w-1/4"></div>
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <header className="flex flex-col items-center text-center mb-8 border-b pb-4">
              <img src={logoUrl} alt="Logo" className="h-16 object-contain mb-2" />
              <h1 className="font-playfair text-lg font-black uppercase tracking-wider text-[#991b1b]">Inspirational Insight Ministries</h1>
              <p className="text-[7px] font-bold uppercase tracking-widest text-[#2563eb]">Building Men Of Stature</p>
            </header>

            <main className="grow font-playfair text-[11px] leading-[1.8] text-slate-800">
              <p className="font-mono text-[8px] text-slate-400 mb-4 uppercase">DATE: 12th May, 2026</p>
              <p className="font-bold text-xs text-slate-900 mb-4">Dear Pastor Enitan Somuyiwa,</p>
              <p className="mb-3">
                It is with great pleasure that we invite you to be a guest speaker at our upcoming Believers' Summit. This event is designed to equip our members with practical leadership principles for the marketplace.
              </p>
              <p className="mb-4">
                Your insights have always been profoundly impactful, and we would be honored to have you minister during our opening session. We have proposed the following schedule for your ministration:
              </p>
              <ul className="space-y-1 pl-4 mb-4 font-inter text-[10px] text-slate-700">
                <li className="flex gap-2"><span>•</span> <strong>Day:</strong> Day 1</li>
                <li className="flex gap-2"><span>•</span> <strong>Date:</strong> Wednesday, June 10th, 2026</li>
                <li className="flex gap-2"><span>•</span> <strong>Allocated Speaking Time:</strong> 5:00 PM - 6:30 PM</li>
                <li className="flex gap-2"><span>•</span> <strong>Duration:</strong> 1 hour and 30 minutes</li>
              </ul>
              <p className="mb-4">
                We are confident your session will greatly enrich everyone in attendance. Thank you for your time, and we look forward to hosting you.
              </p>
            </main>

            <footer className="border-t pt-4">
              <p className="font-playfair text-[10px] italic text-slate-500 mb-4">Best Regards,</p>
              <p className="font-inter text-xs font-black uppercase text-[#991b1b]">Toluwalase Oni</p>
              <p className="font-inter text-[8px] font-bold text-slate-400 uppercase mt-0.5">Programs/Anchors Team</p>
            </footer>
          </div>
          <div className="flex h-1.5 w-full absolute bottom-0 left-0 z-10">
            <div className="bg-[#2563eb] w-1/4"></div><div className="bg-[#eab308] w-1/4"></div><div className="bg-[#991b1b] w-1/2"></div>
          </div>
        </div>

        {/* ================= PAGE 6: BRIEFINGS & APPRECIATION LETTERS ================= */}
        <div className="a4-page">
          <PageHeader logoUrl={logoUrl} pageNum="6" />
          
          <main className="grow flex flex-col justify-between">
            {/* SECTION 4: BRIEFINGS */}
            <section className="mb-8">
              <h3 className="font-inter text-lg font-black uppercase tracking-tight text-slate-900 mb-4">4. Ministration Briefings / Notifications</h3>
              <p className="font-inter text-xs leading-relaxed text-slate-600 text-justify mb-4">
                Sent closer to the event date, this functions as a polite operational reminder of the agreed schedule. Structure it strictly as an official memo.
              </p>
              
              {/* MEMO CARD */}
              <div className="border border-slate-200 bg-slate-50 p-4 rounded font-mono text-[9px] text-slate-600 space-y-1">
                <p><strong>DATE:</strong> June 9, 2026</p>
                <p><strong>TO:</strong> Pastor Enitan Somuyiwa</p>
                <p><strong>FROM:</strong> The Programs/Anchors Team, Inspirational Insight Ministries</p>
                <p><strong>SUBJECT:</strong> Ministration Briefing: Believers' Summit 2026</p>
                <div className="h-px bg-slate-200 my-2"></div>
                <p className="font-sans text-xs text-slate-700 leading-relaxed pt-2">
                  Good day, sir. The countdown to the Believers' Summit is finally over, and we are thrilled to host you tomorrow. This is a formal brief to confirm the schedule for your ministration:
                </p>
                <ul className="font-sans text-xs text-slate-700 pl-4 space-y-1 py-2">
                  <li>• <strong>Day:</strong> Day 1 (Opening Session)</li>
                  <li>• <strong>Date:</strong> Wednesday, June 10th, 2026</li>
                  <li>• <strong>Session Start Time:</strong> 4:00 PM</li>
                  <li>• <strong>Your Time Allocation:</strong> 1 hour 30 minutes</li>
                </ul>
              </div>
            </section>

            {/* SECTION 5: APPRECIATION LETTERS */}
            <section className="border-t border-slate-100 pt-6">
              <h3 className="font-inter text-lg font-black uppercase tracking-tight text-slate-900 mb-4">5. Post-Event Appreciation Letters</h3>
              <p className="font-inter text-xs leading-relaxed text-slate-600 text-justify mb-4">
                Sent after a program concludes. Always explicitly name the event, highlight how their session impacted attendees, and include a brief prayer. **Strict Rule:** Never signed by the admin team; always signed directly by the Lead Pastor.
              </p>
            </section>
          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 7: STANDALONE APPRECIATION LETTER ================= */}
        <div className="a4-page p-[20mm]">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-0">
            <img src={logoUrl} alt="Watermark" className="w-[150mm] h-[150mm] object-contain grayscale" />
          </div>
          <div className="flex h-2 w-full absolute top-0 left-0 z-10">
            <div className="bg-[#991b1b] w-1/2"></div><div className="bg-[#eab308] w-1/4"></div><div className="bg-[#2563eb] w-1/4"></div>
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <header className="flex flex-col items-center text-center mb-8 border-b pb-4">
              <img src={logoUrl} alt="Logo" className="h-16 object-contain mb-2" />
              <h1 className="font-playfair text-lg font-black uppercase tracking-wider text-[#991b1b]">Inspirational Insight Ministries</h1>
              <p className="text-[7px] font-bold uppercase tracking-widest text-[#2563eb]">Building Men Of Stature</p>
            </header>

            <main className="grow font-playfair text-[11px] leading-[1.8] text-slate-800">
              <p className="font-bold text-xs text-slate-900 mb-4">Dear Min. Ebuka,</p>
              <p className="mb-3">Grace and peace be multiplied unto you.</p>
              <p className="mb-3">
                As the Believers' Summit 2026 comes to a close, we want to formally express our deepest gratitude for your powerful song ministrations.
              </p>
              <p className="mb-3">
                Thank you for allowing God to use you to lead us so beautifully into His presence. The worship sessions were truly a defining highlight of the summit for our congregation. We pray that the Lord continues to expand your capacity and reward your labor of love abundantly.
              </p>
              <p className="mb-4">Thank you for being such a massive blessing to this house.</p>
            </main>

            <footer className="border-t pt-4">
              <p className="font-playfair text-[10px] italic text-slate-500 mb-4">Yours in Christ,</p>
              <div className="h-10 w-48 border-b border-slate-200 mb-2"></div>
              <p className="font-inter text-xs font-black uppercase text-[#991b1b]">Pastor Enitan Somuyiwa</p>
              <p className="font-inter text-[8px] font-bold text-slate-400 uppercase mt-0.5">Lead Pastor</p>
            </footer>
          </div>
          <div className="flex h-1.5 w-full absolute bottom-0 left-0 z-10">
            <div className="bg-[#2563eb] w-1/4"></div><div className="bg-[#eab308] w-1/4"></div><div className="bg-[#991b1b] w-1/2"></div>
          </div>
        </div>

        {/* ================= PAGE 8: MONTHLY REPORTS (ROSTER TABLE) ================= */}
        <div className="a4-page">
          <PageHeader logoUrl={logoUrl} pageNum="8" />
          
          <main className="grow flex flex-col justify-between">
            <section className="mb-6">
              <h3 className="font-inter text-lg font-black uppercase tracking-tight text-slate-900 mb-4">6. Monthly Reports</h3>
              <p className="font-inter text-xs leading-relaxed text-slate-600 text-justify mb-4">
                The absolute record of the team's operational reality. Honest, transparent, and direct. Follow the strict 7-part structure every month without variance.
              </p>
              
              <div className="bg-[#991b1b] text-white p-4 font-mono text-[9px] uppercase tracking-wider space-y-1">
                <p className="font-bold text-xs text-white">MONTHLY REPORT: PROGRAMS AND ANCHORS</p>
                <p>Month: JUNE 2026 // Date: 28TH JUNE, 2026</p>
                <p>Prepared by: ADEOYE BOLUWATIFE</p>
              </div>
            </section>

            {/* Attendance Table */}
            <section className="grow">
              <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mb-2">1. Team Composition & Attendance Summary</p>
              <table className="manual-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Attendance Status (Month in Review)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-bold">Oluwole Praise</td>
                    <td>Team Lead</td>
                    <td>Present at all meetings.</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Oni Toluwalase</td>
                    <td>Ass. Team Lead</td>
                    <td>Present at three meetings.</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Adeoye Boluwatife</td>
                    <td>Member</td>
                    <td>Present at all meetings.</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Bro Michael</td>
                    <td>Member</td>
                    <td>Present at all meetings.</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Aderibole Hannah</td>
                    <td>Member</td>
                    <td>Present at majority of meetings.</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 9: MONTHLY REPORT METRICS ================= */}
        <div className="a4-page">
          <PageHeader logoUrl={logoUrl} pageNum="9" />
          
          <main className="grow flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Overview */}
              <div>
                <h4 className="font-inter text-xs font-black uppercase text-red-800 tracking-wider mb-2">2. Executive Overview</h4>
                <p className="font-inter text-xs leading-relaxed text-slate-600 text-justify">
                  The Programs and Anchors Team dedicated the month of June to returning to our standard operational flow following the conclusion of the academic exams. Our primary focus was the successful execution of the Believers' Summit and restoring internal team discipline after the lapses noticed in previous months.
                </p>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="font-inter text-xs font-black uppercase text-red-800 tracking-wider mb-2">3. Key Achievements</h4>
                <ul className="space-y-2 font-inter text-xs text-slate-600">
                  <li className="flex gap-2"><span>•</span> <strong>Believers' Summit Execution:</strong> Successfully planned, coordinated, and anchored the 3-day summit. All guest ministers were managed effectively.</li>
                  <li className="flex gap-2"><span>•</span> <strong>Roster Stabilization:</strong> Sis. Hannah successfully created a working roster accommodating suspensions without weekend gaps.</li>
                  <li className="flex gap-2"><span>•</span> <strong>Service Continuity:</strong> Maintained the weekly Order of Service flawlessly despite a smaller active team.</li>
                </ul>
              </div>

              {/* Challenges */}
              <div>
                <h4 className="font-inter text-xs font-black uppercase text-red-800 tracking-wider mb-2">4. Challenges</h4>
                <ul className="space-y-2 font-inter text-xs text-slate-600">
                  <li className="flex gap-2"><span>•</span> <strong>Disciplinary Actions:</strong> Operated at a reduced capacity because Bro. Osiri is serving a suspension due to previous lapses in Bible reading.</li>
                  <li className="flex gap-2"><span>•</span> <strong>Punctuality:</strong> While physical attendance has improved, lateness to Wednesday meetings remains an issue we are addressing with fines.</li>
                </ul>
              </div>

              {/* Performance */}
              <div>
                <h4 className="font-inter text-xs font-black uppercase text-red-800 tracking-wider mb-2">5. General Team Performance</h4>
                <p className="font-inter text-xs leading-relaxed text-slate-600 text-justify">
                  The team functioned highly effectively under pressure this month. Successfully managing the Believers' Summit while short-staffed proved that our new operational roles are working. The strict enforcement of rules has brought a much-needed sense of seriousness back, resulting in zero pastoral complaints.
                </p>
              </div>

            </div>
          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 10: ACTION PLAN & CLOSING ================= */}
        <div className="a4-page">
          <PageHeader logoUrl={logoUrl} pageNum="10" />
          
          <main className="grow flex flex-col justify-between">
            {/* Next Steps Table */}
            <section className="mb-6">
              <h4 className="font-inter text-xs font-black uppercase text-red-800 tracking-wider mb-2">6. Next Steps & Action Plan</h4>
              <table className="manual-table">
                <thead>
                  <tr>
                    <th>Action Item</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-bold">July Officiating Roster</td>
                    <td>Sis. Hannah to finalize the July roster and review the suspension list for returning members.</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Meeting Time Review</td>
                    <td>Finalize the permanent Wednesday meeting time now that everyone's school schedules are settled.</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Mid-Year Review</td>
                    <td>Team Lead to schedule a brief retreat to assess our progress over the last six months and pray.</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* General Remarks */}
            <section className="border-t border-slate-100 pt-6">
              <h4 className="font-inter text-xs font-black uppercase text-red-800 tracking-wider mb-2">7. General Remark</h4>
              <p className="font-inter text-xs leading-relaxed text-slate-600 text-justify">
                June was a highly productive month. We successfully delivered our major program and fixed the operational errors we experienced earlier in the year. We are heading into July with a much stronger, more disciplined foundation and a renewed commitment to the work.
              </p>
            </section>

            {/* Conclusion & Final Note */}
            <section className="bg-slate-900 text-white p-6 rounded-lg mt-6">
              <h4 className="font-inter text-xs font-black uppercase text-red-500 tracking-wider mb-2">Conclusion & Final Note</h4>
              <p className="font-inter text-[11px] leading-relaxed text-slate-300 text-justify">
                This guide is designed to serve as a reliable reference for the Programs and Anchors Team. Remember, this is a working guide, not a rigid rulebook. It is fully subject to changes and updates as the team evolves. The goal is to maintain our standard of precision, transparency, and clear, intelligent communication.
              </p>
            </section>
          </main>
          <PageFooter />
        </div>

      </div>
    </div>
  );
}

// Subcomponents to cleanly handle print headers and footers
function PageHeader({ logoUrl, pageNum }) {
  return (
    <header className="h-[20mm] flex items-end justify-between border-b-2 border-slate-100 pb-2 relative z-10">
      <div className="flex items-center gap-2">
        <img src={logoUrl} alt="Logo" className="w-6 h-6 object-contain mix-blend-multiply" />
        <span className="font-inter text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Programs & Anchors Team // Documentation Guide</span>
      </div>
      <span className="font-inter text-[10px] font-black text-slate-900">PAGE {pageNum}</span>
    </header>
  );
}

function PageFooter() {
  return (
    <footer className="h-[15mm] flex items-center justify-between border-t border-slate-100 opacity-50 relative z-10 bg-white">
      <span className="font-inter text-[7px] font-bold uppercase tracking-widest text-slate-400">© 2026 Inspirational Insight Christian Assembly</span>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-red-600"></div>
        <div className="w-1.5 h-1.5 bg-[#eab308]"></div>
        <div className="w-1.5 h-1.5 bg-blue-600"></div>
      </div>
    </footer>
  );
}

function TimelineNode({ time, title, anchor, duration, highlight }) {
  return (
    <div className="relative pl-6 pb-2">
      <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full border border-white ${highlight ? 'bg-red-600 w-3 h-3 -left-[6px]' : 'bg-slate-400'}`}></div>
      <div className="flex justify-between items-start">
        <div>
          <h5 className={`font-inter text-xs ${highlight ? 'font-black text-red-800 text-sm' : 'font-bold text-slate-800'}`}>{title}</h5>
          <p className="font-inter text-[10px] text-slate-500">Anchor: {anchor}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[9px] font-bold text-slate-700">{time}</p>
          <span className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[8px] font-black uppercase text-slate-500">{duration}</span>
        </div>
      </div>
    </div>
  );
}
