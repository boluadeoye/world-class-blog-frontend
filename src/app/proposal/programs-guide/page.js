"use client";
import { useState, useEffect } from "react";
import { Download, CheckCircle2, Clock, FileText, Users, Calendar, ShieldCheck, Mail, MapPin, Globe } from "lucide-react";
import Link from "next/link";

export default function ProgramsGuideV3() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1200);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Programs_And_Anchors_Team_Documentation_Guide_V3";
    window.print();
    document.title = originalTitle;
  };

  const logoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1772401576/blog_assets/vm1cxy8mcisdwwkghk3i.jpg";

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-red-200 antialiased subpixel-antialiased">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;0,900;1,600&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: #FFFFFF !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body * { visibility: hidden; }
          #manual-render, #manual-render * { visibility: visible; }
          #manual-render { position: absolute; left: 0; top: 0; width: 100%; background: #FFFFFF; }
          .a4-page { height: 297mm; width: 210mm; page-break-after: always; position: relative; background: #FFFFFF; box-sizing: border-box; overflow: hidden; display: flex; flex-direction: column; padding: 20mm 20mm 15mm 20mm; }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .manual-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        .manual-table th { background-color: #991b1b !important; color: white !important; font-family: 'Inter', sans-serif; font-weight: 800; text-transform: uppercase; font-size: 9px; letter-spacing: 0.1em; padding: 12px; text-align: left; border-bottom: 2px solid #eab308; }
        .manual-table td { padding: 12px; font-family: 'Inter', sans-serif; font-size: 10px; border-bottom: 0.5pt solid #e2e8f0; color: #0f172a; }
        .manual-table tr:nth-child(even) { background-color: #fafaf9 !important; }
      `}</style>

      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-950/30 via-slate-950 to-slate-950"></div>
        <div className="relative z-10 w-full max-w-md bg-white rounded-none p-10 text-center shadow-2xl border-t-8 border-[#991b1b]">
          <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
            <img src={logoUrl} alt="Logo" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <h1 className="font-playfair text-2xl font-black text-slate-900 mb-2">Programs & Anchors</h1>
          <p className="font-inter text-slate-400 text-xs tracking-widest uppercase mb-8">Documentation Guide V3</p>
          {!isReady ? (
            <div className="text-slate-500 font-mono text-xs animate-pulse">COMPILING MANUSCRIPT...</div>
          ) : (
            <button onClick={handlePrint} className="w-full bg-[#991b1b] hover:bg-red-700 text-white font-inter font-black py-4 uppercase tracking-widest transition-all shadow-lg shadow-red-950/20">
              <Download size={18} className="inline mr-2" /> Extract Master Manual
            </button>
          )}
        </div>
      </div>
      <div id="manual-render" className="hidden print:block text-[#0f172a]">
        
        {/* PAGE 1 */}
        <div className="a4-page">
          <PageHeader logoUrl={logoUrl} pageNum="1" />
          <main className="grow flex flex-col justify-between">
            <div className="mt-10 flex flex-col items-center text-center">
              <img src={logoUrl} alt="Logo" className="h-40 object-contain mb-8" />
              <p className="font-inter text-xs font-black text-[#991b1b] uppercase tracking-[0.3em] mb-4">Inspirational Insight Christian Assembly</p>
              <h1 className="font-playfair text-5xl font-black uppercase tracking-tight leading-[1.05] text-slate-900 mb-4">Programs and<br/>Anchors Team</h1>
              <h2 className="font-inter text-xl font-bold uppercase tracking-[0.2em] text-slate-500 mb-8">Documentation Guide</h2>
              <div className="h-1 w-32 bg-[#eab308] mb-12"></div>
            </div>
            <div className="bg-slate-50 border-l-4 border-[#991b1b] p-8 mb-12">
              <p className="font-inter text-xs font-black uppercase text-[#991b1b] tracking-widest mb-3">Purpose of this Document</p>
              <p className="font-inter text-sm leading-relaxed text-justify text-slate-700">This document is the official administrative blueprint for the Programs and Anchors Team. It provides a clear, standardized pattern for all our documentation, from internal team reports to external communications with guest ministers. The goal is to ensure anyone handling these duties can seamlessly maintain our team's standard of precision, transparency, and simple, intelligent communication without relying on stiff religious jargon.</p>
              <p className="font-mono text-[10px] font-bold text-slate-400 mt-6 uppercase tracking-widest">Prepared by: Adeoye Boluwatife</p>
            </div>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 2 */}
        <div className="a4-page">
          <PageHeader logoUrl={logoUrl} pageNum="2" />
          <main className="grow flex flex-col justify-between">
            <section className="mb-8">
              <h3 className="font-inter text-2xl font-black uppercase tracking-tight text-slate-900 mb-4">1. Weekly & Weekend Order of Service</h3>
              <p className="font-inter text-sm leading-relaxed text-slate-700 text-justify mb-6">This format dictates the flow of our regular weekend services. It keeps the service moving seamlessly by attaching a specific person and a strict time limit to every single activity.</p>
              <h4 className="font-inter text-xs font-black uppercase text-[#991b1b] tracking-wider mb-4">Guidelines:</h4>
              <div className="space-y-4 font-inter text-sm text-slate-700">
                <div className="flex gap-4 items-start"><div className="w-1.5 h-1.5 bg-[#eab308] rounded-full mt-2 shrink-0"></div><p><strong>Header:</strong> Center the official name of the service and the full date.</p></div>
                <div className="flex gap-4 items-start"><div className="w-1.5 h-1.5 bg-[#eab308] rounded-full mt-2 shrink-0"></div><p><strong>Activity Blocks:</strong> List the service in the exact chronological order it will happen. Every item must contain three details: what the activity is, who is anchoring it, and the exact time allocation.</p></div>
                <div className="flex gap-4 items-start"><div className="w-1.5 h-1.5 bg-[#eab308] rounded-full mt-2 shrink-0"></div><p><strong>The Flow:</strong> Maintain the standard progression: Opening Prayer, Minstrel, Testimony, Thanksgiving, Prayer Charge, The Word, and Announcements.</p></div>
              </div>
            </section>
            <section className="grow flex flex-col justify-center">
              <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Example: Order of Programme (Wisdom Service)</p>
              <div className="relative pl-8 border-l-2 border-slate-200 space-y-6">
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

        {/* PAGE 3 */}
        <div className="a4-page">
          <PageHeader logoUrl={logoUrl} pageNum="3" />
          <main className="grow flex flex-col justify-between">
            <section className="mb-8">
              <h3 className="font-inter text-2xl font-black uppercase tracking-tight text-slate-900 mb-4">2. Event Scheduling & Itineraries</h3>
              <p className="font-inter text-sm leading-relaxed text-slate-700 text-justify mb-6">The structure of the schedule must match the scale of the program. Complex events require tabular breakdowns, while single-session events can be listed sequentially.</p>
              <h4 className="font-inter text-xs font-black uppercase text-[#991b1b] tracking-wider mb-4">Guidelines:</h4>
              <div className="space-y-4 font-inter text-sm text-slate-700">
                <div className="flex gap-4 items-start"><div className="w-1.5 h-1.5 bg-[#eab308] rounded-full mt-2 shrink-0"></div><p><strong>For Single Sessions:</strong> Outline the day in order. Put the total allocated time at the top, then list the speakers sequentially.</p></div>
                <div className="flex gap-4 items-start"><div className="w-1.5 h-1.5 bg-[#eab308] rounded-full mt-2 shrink-0"></div><p><strong>For Multi-Day Conferences:</strong> Use a comprehensive matrix. Break it down strictly by Morning and Evening sessions. Track every transition to 5-minute increments.</p></div>
              </div>
            </section>
            <section className="grow">
              <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Example: Word Explosion Conference Schedule</p>
              <table className="manual-table">
                <thead><tr><th>Day & Session</th><th>Time</th><th>Duration</th><th>Activity</th><th>Minister / Anchor</th></tr></thead>
                <tbody>
                  <tr><td className="font-bold text-sm">Day 1: Evening<br/><span className="text-[9px] font-normal text-slate-500">(4:00pm - 7:30pm)</span></td><td className="font-mono font-bold">4:00 - 4:10</td><td className="font-mono">10 mins</td><td className="font-bold">Opening Prayers</td><td>Sis. Nneka Okafor</td></tr>
                  <tr><td></td><td className="font-mono font-bold">4:10 - 4:40</td><td className="font-mono">30 mins</td><td className="font-bold">Minstrel</td><td>Minstrel Team</td></tr>
                  <tr><td></td><td className="font-mono font-bold">4:40 - 4:50</td><td className="font-mono">10 mins</td><td className="font-bold">Thanksgiving</td><td>P&A Team</td></tr>
                  <tr><td></td><td className="font-mono font-bold">4:50 - 5:20</td><td className="font-mono">30 mins</td><td className="font-bold">Prayer/Worship Charge</td><td>Pastor Enitan Somuyiwa</td></tr>
                  <tr className="bg-red-50/50"><td></td><td className="font-mono font-black text-[#991b1b]">5:20 - 7:20</td><td className="font-mono font-black text-[#991b1b]">2 hrs</td><td className="font-black text-[#991b1b] uppercase">The Word</td><td className="font-black text-[#991b1b]">Pastor Enitan Somuyiwa & Mrs. Somuyiwa</td></tr>
                  <tr><td></td><td className="font-mono font-bold">7:20 - 7:30</td><td className="font-mono">10 mins</td><td className="font-bold">Announcement</td><td>Sis. Amina Bello</td></tr>
                </tbody>
              </table>
            </section>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 4 */}
        <div className="a4-page">
          <PageHeader logoUrl={logoUrl} pageNum="4" />
          <main className="grow flex flex-col justify-between">
            <section className="mb-12">
              <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Word Explosion Schedule (Day 2 Continuation)</p>
              <table className="manual-table">
                <thead><tr><th>Day & Session</th><th>Time</th><th>Duration</th><th>Activity</th><th>Minister / Anchor</th></tr></thead>
                <tbody>
                  <tr><td className="font-bold text-sm">Day 2: Morning<br/><span className="text-[9px] font-normal text-slate-500">(8:00am - 11:30am)</span></td><td className="font-mono font-bold">8:00 - 8:05</td><td className="font-mono">5 mins</td><td className="font-bold">Opening</td><td>Bro. Chinedu Eze</td></tr>
                  <tr><td></td><td className="font-mono font-bold">8:05 - 8:25</td><td className="font-mono">20 mins</td><td className="font-bold">Minstrel Session</td><td>Minstrel Team</td></tr>
                  <tr><td></td><td className="font-mono font-bold">8:25 - 8:30</td><td className="font-mono">5 mins</td><td className="font-bold">Thanksgiving</td><td>P&A Team</td></tr>
                  <tr className="bg-red-50/50"><td></td><td className="font-mono font-black text-[#991b1b]">8:30 - 9:15</td><td className="font-mono font-black text-[#991b1b]">45 mins</td><td className="font-black text-[#991b1b] uppercase">Word One</td><td className="font-black text-[#991b1b]">Pastor Enitan Somuyiwa</td></tr>
                  <tr><td></td><td className="font-mono font-bold">9:15 - 9:45</td><td className="font-mono">30 mins</td><td className="font-bold">Worship</td><td>Min. Ebuka</td></tr>
                  <tr className="bg-red-50/50"><td></td><td className="font-mono font-black text-[#991b1b]">9:45 - 11:00</td><td className="font-mono font-black text-[#991b1b]">1 hr 15 mins</td><td className="font-black text-[#991b1b] uppercase">Word Two</td><td className="font-black text-[#991b1b]">Pastor Enitan Somuyiwa</td></tr>
                  <tr><td></td><td className="font-mono font-bold">11:00 - 11:30</td><td className="font-mono">30 mins</td><td className="font-bold">Announcement</td><td>P&A Team</td></tr>
                </tbody>
              </table>
            </section>
            <section className="border-t-2 border-slate-100 pt-8">
              <h3 className="font-inter text-2xl font-black uppercase tracking-tight text-slate-900 mb-4">3. Formal Letters of Invitation</h3>
              <p className="font-inter text-sm leading-relaxed text-slate-700 text-justify mb-6">This document is our first formal contact with a guest minister. It must be warm, clear, and highly professional. Do not force stiff religious words into the letter just to sound spiritual; keep the tone natural and intelligent.</p>
              <div className="grid grid-cols-3 gap-6 font-inter text-xs text-slate-700">
                <div className="bg-slate-50 p-4 border-t-4 border-[#991b1b]"><p className="font-black uppercase text-[#991b1b] mb-2">Header</p><p>Use the official ministry letterhead and include the current date.</p></div>
                <div className="bg-slate-50 p-4 border-t-4 border-[#991b1b]"><p className="font-black uppercase text-[#991b1b] mb-2">The Message</p><p>Greet the minister respectfully, explain the core purpose of the event.</p></div>
                <div className="bg-slate-50 p-4 border-t-4 border-[#991b1b]"><p className="font-black uppercase text-[#991b1b] mb-2">The Details</p><p>Provide the exact logistics in a clean, bulleted list detailing Day, Date, and Time.</p></div>
              </div>
            </section>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 5 */}
        <div className="a4-page p-[25mm]">
          <div className="flex h-3 w-full absolute top-0 left-0 z-10"><div className="bg-[#991b1b] w-1/2"></div><div className="bg-[#eab308] w-1/4"></div><div className="bg-[#2563eb] w-1/4"></div></div>
          <div className="relative z-10 flex flex-col h-full">
            <header className="flex flex-col items-center text-center mb-12 border-b-2 border-slate-100 pb-8">
              <img src={logoUrl} alt="Logo" className="h-32 object-contain mb-4" />
              <h1 className="font-playfair text-2xl font-black uppercase tracking-[0.2em] text-[#991b1b] mb-2">Inspirational Insight Ministries</h1>
              <p className="font-inter text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563eb]">Building Men Of Stature</p>
            </header>
            <main className="grow font-inter text-sm leading-[2] text-slate-800 text-justify">
              <p className="font-mono text-[10px] font-bold text-slate-500 mb-8 uppercase tracking-widest">DATE: 12th May, 2026</p>
              <p className="font-bold text-lg text-slate-900 mb-6">Dear Pastor Enitan Somuyiwa,</p>
              <p className="mb-4">It is with great pleasure that we invite you to be a guest speaker at our upcoming Believers' Summit. This event is designed to equip our members with practical leadership principles for the marketplace.</p>
              <p className="mb-6">Your insights have always been profoundly impactful, and we would be honored to have you minister during our opening session. We have proposed the following schedule for your ministration:</p>
              <div className="bg-slate-50 border border-slate-200 p-6 mb-6 font-mono text-xs space-y-2">
                <div className="flex"><span className="w-48 font-bold text-slate-500">Day:</span><span className="font-bold text-slate-900">Day 1</span></div>
                <div className="flex"><span className="w-48 font-bold text-slate-500">Date:</span><span className="font-bold text-slate-900">Wednesday, June 10th, 2026</span></div>
                <div className="flex"><span className="w-48 font-bold text-slate-500">Allocated Speaking Time:</span><span className="font-bold text-slate-900">5:00 PM – 6:30 PM</span></div>
                <div className="flex"><span className="w-48 font-bold text-slate-500">Duration:</span><span className="font-bold text-slate-900">1 hour and 30 minutes</span></div>
              </div>
              <p className="mb-4">We are confident your session will greatly enrich everyone in attendance. Thank you for your time, and we look forward to hosting you.</p>
            </main>
            <footer className="mt-12 pt-8">
              <p className="font-playfair text-lg italic text-slate-600 mb-6">Best Regards,</p>
              <div className="h-1 w-48 border-b-2 border-slate-300 mb-3"></div>
              <p className="font-inter text-sm font-black uppercase tracking-widest text-[#991b1b]">Toluwalase Oni</p>
              <p className="font-inter text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Programs/Anchors Team</p>
            </footer>
          </div>
          <div className="flex h-2 w-full absolute bottom-0 left-0 z-10"><div className="bg-[#2563eb] w-1/4"></div><div className="bg-[#eab308] w-1/4"></div><div className="bg-[#991b1b] w-1/2"></div></div>
        </div>
        {/* PAGE 6 */}
        <div className="a4-page">
          <PageHeader logoUrl={logoUrl} pageNum="6" />
          <main className="grow flex flex-col justify-between">
            <section className="mb-12">
              <h3 className="font-inter text-2xl font-black uppercase tracking-tight text-slate-900 mb-4">4. Ministration Briefings / Notifications</h3>
              <p className="font-inter text-sm leading-relaxed text-slate-700 text-justify mb-8">This notification is sent closer to the event date. It functions as a polite operational reminder of the previously agreed-upon schedule. Structure it as an official memo.</p>
              <div className="border-2 border-slate-200 bg-slate-50 p-8 rounded-lg font-mono text-xs text-slate-700 space-y-2 shadow-sm">
                <div className="flex"><span className="w-24 font-bold text-slate-400">DATE:</span><span className="font-bold text-slate-900">June 9, 2026</span></div>
                <div className="flex"><span className="w-24 font-bold text-slate-400">TO:</span><span className="font-bold text-slate-900">Pastor Enitan Somuyiwa</span></div>
                <div className="flex"><span className="w-24 font-bold text-slate-400">FROM:</span><span className="font-bold text-slate-900">The Programs/Anchors Team, Inspirational Insight Ministries</span></div>
                <div className="flex"><span className="w-24 font-bold text-slate-400">SUBJECT:</span><span className="font-bold text-[#991b1b]">Ministration Briefing: Believers' Summit 2026</span></div>
                <div className="h-px bg-slate-300 my-6"></div>
                <p className="font-sans text-sm text-slate-800 leading-relaxed pt-2 mb-4">Good day, sir. The countdown to the Believers' Summit is finally over, and we are thrilled to host you tomorrow. This is a formal brief to confirm the schedule for your ministration:</p>
                <div className="bg-white border border-slate-200 p-4 space-y-2 mb-4">
                  <div className="flex"><span className="w-48 font-bold text-slate-500">Day:</span><span className="font-bold text-slate-900">Day 1 (Opening Session)</span></div>
                  <div className="flex"><span className="w-48 font-bold text-slate-500">Date:</span><span className="font-bold text-slate-900">Wednesday, June 10th, 2026</span></div>
                  <div className="flex"><span className="w-48 font-bold text-slate-500">Session Start Time:</span><span className="font-bold text-slate-900">4:00 PM</span></div>
                  <div className="flex"><span className="w-48 font-bold text-slate-500">Your Time Allocation:</span><span className="font-bold text-slate-900">1 hour 30 minutes</span></div>
                </div>
                <p className="font-sans text-sm text-slate-800 leading-relaxed">We are fully prepared and eagerly anticipating the wisdom you will share with the congregation. God bless you.</p>
              </div>
            </section>
            <section className="border-t-2 border-slate-100 pt-8">
              <h3 className="font-inter text-2xl font-black uppercase tracking-tight text-slate-900 mb-4">5. Post-Event Appreciation Letters</h3>
              <p className="font-inter text-sm leading-relaxed text-slate-700 text-justify mb-6">This letter is sent after a program concludes to formally thank the guest ministers for their service.</p>
              <div className="grid grid-cols-2 gap-6 font-inter text-xs text-slate-700">
                <div className="bg-slate-50 p-6 border-t-4 border-[#991b1b]"><p className="font-black uppercase text-[#991b1b] mb-2">The Message</p><p>Explicitly name the event that just concluded. State exactly what you appreciated about their specific session and how it impacted the attendees.</p></div>
                <div className="bg-slate-50 p-6 border-t-4 border-[#991b1b]"><p className="font-black uppercase text-[#991b1b] mb-2">The Sign-off (Strict Rule)</p><p>This letter is never signed by the admin team. It must always be signed directly by the Lead Pastor.</p></div>
              </div>
            </section>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 7 */}
        <div className="a4-page p-[25mm]">
          <div className="flex h-3 w-full absolute top-0 left-0 z-10"><div className="bg-[#991b1b] w-1/2"></div><div className="bg-[#eab308] w-1/4"></div><div className="bg-[#2563eb] w-1/4"></div></div>
          <div className="relative z-10 flex flex-col h-full">
            <header className="flex flex-col items-center text-center mb-12 border-b-2 border-slate-100 pb-8">
              <img src={logoUrl} alt="Logo" className="h-32 object-contain mb-4" />
              <h1 className="font-playfair text-2xl font-black uppercase tracking-[0.2em] text-[#991b1b] mb-2">Inspirational Insight Ministries</h1>
              <p className="font-inter text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563eb]">Building Men Of Stature</p>
            </header>
            <main className="grow font-inter text-sm leading-[2.2] text-slate-800 text-justify">
              <p className="font-bold text-lg text-slate-900 mb-8">Dear Min. Ebuka,</p>
              <p className="mb-6">Grace and peace be multiplied unto you.</p>
              <p className="mb-6">As the Believers' Summit 2026 comes to a close, we want to formally express our deepest gratitude for your powerful song ministrations.</p>
              <p className="mb-6">Thank you for allowing God to use you to lead us so beautifully into His presence. The worship sessions were truly a defining highlight of the summit for our congregation. We pray that the Lord continues to expand your capacity and reward your labor of love abundantly.</p>
              <p className="mb-6">Thank you for being such a massive blessing to this house.</p>
            </main>
            <footer className="mt-12 pt-8">
              <p className="font-playfair text-lg italic text-slate-600 mb-6">Yours in Christ,</p>
              <div className="h-1 w-56 border-b-2 border-slate-300 mb-3"></div>
              <p className="font-inter text-sm font-black uppercase tracking-widest text-[#991b1b]">Pastor Enitan Somuyiwa</p>
              <p className="font-inter text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Lead Pastor</p>
            </footer>
          </div>
          <div className="flex h-2 w-full absolute bottom-0 left-0 z-10"><div className="bg-[#2563eb] w-1/4"></div><div className="bg-[#eab308] w-1/4"></div><div className="bg-[#991b1b] w-1/2"></div></div>
        </div>

        {/* PAGE 8 */}
        <div className="a4-page">
          <PageHeader logoUrl={logoUrl} pageNum="8" />
          <main className="grow flex flex-col justify-between">
            <section className="mb-10">
              <h3 className="font-inter text-2xl font-black uppercase tracking-tight text-slate-900 mb-4">6. Monthly Reports</h3>
              <p className="font-inter text-sm leading-relaxed text-slate-700 text-justify mb-8">The monthly report is the absolute record of the team's operational reality. It must be honest, transparent, and direct. If attendance drops or programs face hurdles, document it clearly. The report must follow this exact 7-part structure every month.</p>
              <div className="bg-[#991b1b] text-white p-6 rounded-lg font-mono text-xs uppercase tracking-wider space-y-2 shadow-lg">
                <p className="font-black text-sm text-white mb-4 border-b border-red-800 pb-2">MONTHLY REPORT: PROGRAMS AND ANCHORS</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="text-red-300">Month:</span> JUNE 2026</div>
                  <div><span className="text-red-300">Date:</span> 28TH JUNE, 2026</div>
                  <div className="col-span-2"><span className="text-red-300">Prepared by:</span> ADEOYE BOLUWATIFE</div>
                </div>
              </div>
            </section>
            <section className="grow">
              <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">1. Team Composition & Attendance Summary</p>
              <table className="manual-table">
                <thead><tr><th>Name</th><th>Role</th><th>Attendance Status (Month in Review)</th></tr></thead>
                <tbody>
                  <tr><td className="font-bold text-sm">Oluwole Praise</td><td className="font-mono">Team Lead</td><td>Present at all meetings.</td></tr>
                  <tr><td className="font-bold text-sm">Oni Toluwalase</td><td className="font-mono">Ass. Team Lead</td><td>Present at three meetings.</td></tr>
                  <tr><td className="font-bold text-sm">Adeoye Boluwatife</td><td className="font-mono">Member</td><td>Present at all meetings.</td></tr>
                  <tr><td className="font-bold text-sm">Bro Michael</td><td className="font-mono">Member</td><td>Present at all meetings.</td></tr>
                  <tr><td className="font-bold text-sm">Aderibole Hannah</td><td className="font-mono">Member</td><td>Present at majority of meetings.</td></tr>
                </tbody>
              </table>
            </section>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 9 */}
        <div className="a4-page">
          <PageHeader logoUrl={logoUrl} pageNum="9" />
          <main className="grow flex flex-col">
            <div className="space-y-10">
              <div className="grid grid-cols-12 gap-8 border-b border-slate-200 pb-8">
                <div className="col-span-4"><h4 className="font-inter text-sm font-black uppercase text-[#991b1b] tracking-widest">2. Executive Overview</h4></div>
                <div className="col-span-8"><p className="font-inter text-sm leading-relaxed text-slate-700 text-justify">The Programs and Anchors Team dedicated the month of June to returning to our standard operational flow following the conclusion of the academic exams. Our primary focus was the successful execution of the Believers' Summit and restoring internal team discipline after the lapses noticed in previous months.</p></div>
              </div>
              <div className="grid grid-cols-12 gap-8 border-b border-slate-200 pb-8">
                <div className="col-span-4"><h4 className="font-inter text-sm font-black uppercase text-[#991b1b] tracking-widest">3. Key Achievements</h4></div>
                <div className="col-span-8 space-y-4">
                  <div className="bg-slate-50 p-4 border-l-2 border-[#eab308]"><p className="font-inter text-xs font-black uppercase text-slate-900 mb-1">Believers' Summit Execution</p><p className="font-inter text-xs leading-relaxed text-slate-600">Successfully planned, coordinated, and anchored the 3-day summit. All guest ministers were managed effectively and time limits were strictly adhered to.</p></div>
                  <div className="bg-slate-50 p-4 border-l-2 border-[#eab308]"><p className="font-inter text-xs font-black uppercase text-slate-900 mb-1">Roster Stabilization</p><p className="font-inter text-xs leading-relaxed text-slate-600">Sis. Hannah successfully created a working roster that accommodated the ongoing suspensions without causing any scheduling gaps in the weekend services.</p></div>
                  <div className="bg-slate-50 p-4 border-l-2 border-[#eab308]"><p className="font-inter text-xs font-black uppercase text-slate-900 mb-1">Service Continuity</p><p className="font-inter text-xs leading-relaxed text-slate-600">Maintained the weekly Order of Service flawlessly despite operating with a smaller active team this month.</p></div>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-8 border-b border-slate-200 pb-8">
                <div className="col-span-4"><h4 className="font-inter text-sm font-black uppercase text-[#991b1b] tracking-widest">4. Challenges</h4></div>
                <div className="col-span-8 space-y-4">
                  <div className="bg-red-50 p-4 border-l-2 border-red-600"><p className="font-inter text-xs font-black uppercase text-red-900 mb-1">Disciplinary Actions</p><p className="font-inter text-xs leading-relaxed text-red-800">We operated at a reduced capacity this month because Bro. Osiri is still serving a suspension from the officiating list due to previous lapses in daily Bible reading instructions.</p></div>
                  <div className="bg-red-50 p-4 border-l-2 border-red-600"><p className="font-inter text-xs font-black uppercase text-red-900 mb-1">Punctuality</p><p className="font-inter text-xs leading-relaxed text-red-800">While physical attendance has improved since the holidays ended, lateness to the Wednesday meetings remains an issue that we are actively monitoring and addressing with the newly introduced fines.</p></div>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-4"><h4 className="font-inter text-sm font-black uppercase text-[#991b1b] tracking-widest">5. General Team Performance</h4></div>
                <div className="col-span-8"><p className="font-inter text-sm leading-relaxed text-slate-700 text-justify">The team functioned highly effectively under pressure this month. Successfully managing the Believers' Summit while short-staffed proved that our new operational roles are working. The strict enforcement of rules has brought a much-needed sense of seriousness back to the group, resulting in zero pastoral complaints this month.</p></div>
              </div>
            </div>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 10 */}
        <div className="a4-page">
          <PageHeader logoUrl={logoUrl} pageNum="10" />
          <main className="grow flex flex-col justify-between">
            <section className="mb-10">
              <h4 className="font-inter text-sm font-black uppercase text-[#991b1b] tracking-widest mb-6">6. Next Steps & Action Plan</h4>
              <table className="manual-table">
                <thead><tr><th>Action Item</th><th>Description</th></tr></thead>
                <tbody>
                  <tr><td className="font-bold text-sm">July Officiating Roster</td><td>Sis. Hannah to finalize the July roster and review the suspension list for returning members.</td></tr>
                  <tr><td className="font-bold text-sm">Meeting Time Review</td><td>Finalize the permanent Wednesday meeting time now that everyone's school schedules are completely settled.</td></tr>
                  <tr><td className="font-bold text-sm">Mid-Year Review</td><td>Team Lead to schedule a brief retreat to assess our progress over the last six months and pray.</td></tr>
                </tbody>
              </table>
            </section>
            <section className="border-t-2 border-slate-100 pt-8 mb-10">
              <h4 className="font-inter text-sm font-black uppercase text-[#991b1b] tracking-widest mb-4">7. General Remark</h4>
              <p className="font-inter text-sm leading-relaxed text-slate-700 text-justify">June was a highly productive month. We successfully delivered our major program and fixed the operational errors we experienced earlier in the year. We are heading into July with a much stronger, more disciplined foundation and a renewed commitment to the work.</p>
            </section>
            <section className="mt-auto bg-slate-900 text-white p-8 rounded-xl shadow-2xl border-t-4 border-[#eab308]">
              <h4 className="font-inter text-sm font-black uppercase text-[#eab308] tracking-widest mb-4">Conclusion & Final Note</h4>
              <p className="font-inter text-sm leading-relaxed text-slate-300 text-justify">This guide is designed to serve as a reliable reference for the Programs and Anchors Team. Remember, this is a working guide, not a rigid rulebook. It is fully subject to changes and updates as the team evolves, or as specific occasions demand. The goal is to maintain our standard of precision, transparency, and clear, intelligent communication.</p>
            </section>
          </main>
          <PageFooter />
        </div>

      </div>
    </div>
  );
}

function PageHeader({ logoUrl, pageNum }) {
  return (
    <header className="h-[20mm] flex items-end justify-between border-b-2 border-slate-100 pb-4 mb-8 relative z-10">
      <div className="flex items-center gap-4">
        <img src={logoUrl} alt="Logo" className="h-12 object-contain mix-blend-multiply" />
        <div className="h-8 w-px bg-slate-300"></div>
        <span className="font-inter text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Programs & Anchors Team // Documentation Guide</span>
      </div>
      <span className="font-inter text-xs font-black text-slate-900">PAGE {pageNum}</span>
    </header>
  );
}

function PageFooter() {
  return (
    <footer className="h-[15mm] flex items-center justify-between border-t border-slate-100 opacity-50 relative z-10 bg-white mt-auto pt-4">
      <span className="font-inter text-[8px] font-bold uppercase tracking-widest text-slate-400">© 2026 Inspirational Insight Christian Assembly</span>
      <div className="flex gap-1"><div className="w-2 h-2 bg-[#991b1b]"></div><div className="w-2 h-2 bg-[#eab308]"></div><div className="w-2 h-2 bg-[#2563eb]"></div></div>
    </footer>
  );
}

function TimelineNode({ time, title, anchor, duration, highlight }) {
  return (
    <div className="relative pl-8 pb-4">
      <div className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full border-2 border-white ${highlight ? 'bg-[#991b1b] w-4 h-4 -left-[9px]' : 'bg-slate-400'}`}></div>
      <div className="flex justify-between items-start">
        <div>
          <h5 className={`font-inter ${highlight ? 'font-black text-[#991b1b] text-lg' : 'font-bold text-slate-800 text-sm'}`}>{title}</h5>
          <p className="font-inter text-xs text-slate-500 mt-1">Anchor: <span className="font-bold text-slate-700">{anchor}</span></p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs font-bold text-slate-700 mb-1">{time}</p>
          <span className="bg-slate-100 px-2 py-1 rounded font-mono text-[10px] font-black uppercase text-slate-500">{duration}</span>
        </div>
      </div>
    </div>
  );
}
