"use client";
import { useState, useEffect } from "react";
import { Download, GraduationCap, ShieldCheck, BookOpen, CheckCircle2, ChevronRight, Layers, FileText } from "lucide-react";
import Link from "next/link";

export default function ThesisDefenseDeck() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1000);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Adeoye_Boluwatife_Thesis_Defense_Presentation";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-emerald-500/30">
      
      {/* IMPORT GEOMETRIC SANS-SERIF FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & 16:9 PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: 16in 9in; margin: 0; }
          body { background: #121212 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body * { visibility: hidden; }
          #deck-render, #deck-render * { visibility: visible; }
          #deck-render { position: absolute; left: 0; top: 0; width: 16in; background: #121212; }
          .slide-page { 
            height: 9in; width: 16in; 
            page-break-after: always; 
            position: relative; 
            background: #121212;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
          }
          .slide-page-neutral {
            background: #FAF8F5 !important;
            color: #121212 !important;
          }
          .no-print { display: none !important; }
        }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* === VIEW 1: THE PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative bg-slate-950">
        <div className="relative z-10 w-full max-w-md bg-zinc-900 p-10 text-center shadow-2xl rounded-2xl border-t-8 border-[#50C878]">
          <GraduationCap size={48} className="text-[#50C878] mx-auto mb-6" />
          <h1 className="font-inter text-2xl font-black text-white mb-2 uppercase tracking-widest">Thesis Defense Deck</h1>
          <p className="font-mono text-[#FFD700] text-xs uppercase tracking-widest mb-8">Adeoye Boluwatife // FUOYE</p>

          {!isReady ? (
            <div className="text-slate-500 font-mono text-xs animate-pulse">COMPILING SLIDES...</div>
          ) : (
            <button onClick={handlePrint} className="w-full bg-[#50C878] hover:bg-emerald-600 text-slate-950 font-inter font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20">
              <Download size={18} className="inline mr-2" /> Download Presentation PDF
            </button>
          )}
          
          <Link href="/" className="block mt-8 text-xs text-slate-500 hover:text-white uppercase tracking-widest">
            ← Return to Dashboard
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE 8-SLIDE DECK (Print Only) === */}
      <div id="deck-render" className="hidden print:block font-inter">
        
        {/* ================= SLIDE 1: TITLE SLIDE (NEUTRAL BACKGROUND) ================= */}
        <div className="slide-page slide-page-neutral flex-row">
          {/* Left 40% Panel */}
          <div className="w-[40%] bg-[#F0EFEA] p-[0.8in] flex flex-col justify-between border-r-2 border-slate-300">
            <div>
              <p className="font-mono text-xs font-bold text-[#50C878] uppercase tracking-[0.3em] mb-2">FUOYE // Faculty of Arts</p>
              <p className="font-inter text-xs font-black text-slate-500 uppercase tracking-widest">Dept. of English & Literary Studies</p>
            </div>
            
            <div className="border-t-2 border-slate-400 pt-6">
              <p className="font-mono text-[11px] font-bold text-slate-600 uppercase tracking-widest mb-1">SUPERVISOR SIGNATURE:</p>
              <p className="font-mono text-xs font-black text-slate-800 tracking-widest">___________________________</p>
            </div>
          </div>

          {/* Right 60% Panel */}
          <div className="w-[60%] p-[0.8in] flex flex-col justify-between text-[#121212]">
            <div>
              <span className="bg-[#121212] text-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">B.A. Thesis Defense</span>
              <h1 className="text-4xl font-black uppercase tracking-tight leading-tight mb-6 text-[#121212]">
                THE ROLES OF NIGERIAN PIDGIN IN SHAPING SOCIAL MEDIA DISCOURSE:
              </h1>
              <h2 className="text-lg font-bold text-slate-600 uppercase tracking-wider mb-8">
                A QUALITATIVE CONTENT ANALYSIS OF X AND FACEBOOK
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6 border-t border-slate-300 pt-6">
              <div>
                <p className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">Submitted By</p>
                <p className="text-base font-black text-[#121212] uppercase">ADEOYE BOLUWATIFE</p>
                <p className="font-mono text-xs text-[#50C878] font-bold">ELS/2021/1029</p>
              </div>
              <div>
                <p className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">Supervisor</p>
                <p className="text-base font-black text-[#121212] uppercase">DR. OKUNADE</p>
                <p className="font-mono text-xs text-slate-500 font-bold">July 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SLIDE 2: BACKGROUND OF RESEARCH ================= */}
        <div className="slide-page text-[#F5F5F5]">
          {/* Left 40% Panel */}
          <div className="w-[40%] bg-zinc-900 p-[0.8in] flex flex-col justify-between border-r border-zinc-800">
            <div>
              <p className="font-mono text-xs text-[#50C878] uppercase tracking-[0.3em] mb-4">Chapter 1.1</p>
              <h2 className="text-4xl font-black uppercase tracking-tight text-white leading-none">Background<br/>of Research</h2>
            </div>
            <div className="w-16 h-2 bg-[#FFD700]"></div>
          </div>

          {/* Right 60% Panel */}
          <div className="w-[60%] p-[0.8in] flex flex-col justify-center gap-6 text-slate-300">
            <div className="bg-zinc-900/60 p-6 border-l-4 border-[#50C878] rounded">
              <h3 className="text-sm font-bold text-white uppercase mb-2">Language as Social Action</h3>
              <p className="text-xs leading-relaxed text-slate-300">Language functions as a communicative tool for negotiating relationships and establishing group identities (Gumperz, 1982; Oyeleye, 2013). On digital networks like X and Facebook, language choice regulates rapport and social distance.</p>
            </div>

            <div className="bg-zinc-900/60 p-6 border-l-4 border-[#FFD700] rounded">
              <h3 className="text-sm font-bold text-white uppercase mb-2">Evolution of Nigerian Pidgin (NP)</h3>
              <p className="text-xs leading-relaxed text-slate-300">Historically categorized strictly as an informal market contact code (Mafeni, 1971; Elugbe & Omamor, 1991), NP has evolved into a primary written code for public discourse, political activism, and digital satire (Aboh, 2023; Udenze, 2024).</p>
            </div>
          </div>
        </div>

        {/* ================= SLIDE 3: STATEMENT OF THE PROBLEM ================= */}
        <div className="slide-page text-[#F5F5F5]">
          {/* Left 40% Panel */}
          <div className="w-[40%] bg-zinc-900 p-[0.8in] flex flex-col justify-between border-r border-zinc-800">
            <div>
              <p className="font-mono text-xs text-[#50C878] uppercase tracking-[0.3em] mb-4">Chapter 1.2</p>
              <h2 className="text-4xl font-black uppercase tracking-tight text-white leading-none">Statement of<br/>the Problem</h2>
            </div>
            <div className="w-16 h-2 bg-red-600"></div>
          </div>

          {/* Right 60% Panel (EXACT BULLETS REQUIRED) */}
          <div className="w-[60%] p-[0.8in] flex flex-col justify-center text-slate-300">
            <ul className="space-y-4 text-xs font-normal leading-relaxed">
              <li className="flex gap-3 items-start bg-zinc-900/40 p-4 border border-zinc-800 rounded">
                <span className="text-[#FFD700] font-bold">•</span>
                <span>Existing studies mostly examine historical development, entertainment, or political activism in isolation.</span>
              </li>
              <li className="flex gap-3 items-start bg-zinc-900/40 p-4 border border-zinc-800 rounded">
                <span className="text-[#FFD700] font-bold">•</span>
                <span>Few studies compare Nigerian Pidgin use across political and entertainment discourse.</span>
              </li>
              <li className="flex gap-3 items-start bg-zinc-900/40 p-4 border border-zinc-800 rounded">
                <span className="text-[#FFD700] font-bold">•</span>
                <span>Analysis of specific pragmatic functions remains underexplored.</span>
              </li>
              <li className="flex gap-3 items-start bg-zinc-900/40 p-4 border border-zinc-800 rounded">
                <span className="text-[#FFD700] font-bold">•</span>
                <span>Code-switching behaviours in digital Pidgin are not examined in depth.</span>
              </li>
              <li className="flex gap-3 items-start bg-emerald-950/30 p-4 border border-[#50C878]/40 rounded font-bold text-white">
                <span className="text-[#50C878]">•</span>
                <span>This study addresses these gaps using X and Facebook data (April 2020 – July 2026).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= SLIDE 4: AIM AND OBJECTIVES ================= */}
        <div className="slide-page text-[#F5F5F5]">
          {/* Left 40% Panel */}
          <div className="w-[40%] bg-zinc-900 p-[0.8in] flex flex-col justify-between border-r border-zinc-800">
            <div>
              <p className="font-mono text-xs text-[#50C878] uppercase tracking-[0.3em] mb-4">Chapter 1.3</p>
              <h2 className="text-4xl font-black uppercase tracking-tight text-white leading-none">Aim &amp;<br/>Objectives</h2>
            </div>
            <div className="w-16 h-2 bg-[#50C878]"></div>
          </div>

          {/* Right 60% Panel */}
          <div className="w-[60%] p-[0.8in] flex flex-col justify-center text-slate-300">
            <div className="mb-6 bg-zinc-900 p-4 border-l-4 border-[#FFD700]">
              <p className="font-mono text-[10px] text-[#FFD700] uppercase font-bold">Research Aim</p>
              <p className="text-xs font-bold text-white mt-1">To investigate the discursive roles and forms of Nigerian Pidgin on X and Facebook.</p>
            </div>

            <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-3">Specific Objectives:</p>
            <div className="space-y-3 text-xs">
              <div className="bg-zinc-900/50 p-3 border border-zinc-800 flex gap-3 items-center">
                <span className="font-mono font-bold text-[#50C878] text-sm">(i)</span>
                <span>Explore the dominant communicative functions of Nigerian Pidgin in selected digital discourses.</span>
              </div>
              <div className="bg-zinc-900/50 p-3 border border-zinc-800 flex gap-3 items-center">
                <span className="font-mono font-bold text-[#50C878] text-sm">(ii)</span>
                <span>Describe the identity negotiation strategies employed in selected digital discourses.</span>
              </div>
              <div className="bg-zinc-900/50 p-3 border border-zinc-800 flex gap-3 items-center">
                <span className="font-mono font-bold text-[#50C878] text-sm">(iii)</span>
                <span>Analyse the code-switching patterns used in selected digital discourses.</span>
              </div>
              <div className="bg-zinc-900/50 p-3 border border-zinc-800 flex gap-3 items-center">
                <span className="font-mono font-bold text-[#50C878] text-sm">(iv)</span>
                <span>Discuss contextual variations between political and entertainment discourses on the platforms.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SLIDE 5: THEORETICAL FRAMEWORK ================= */}
        <div className="slide-page text-[#F5F5F5]">
          {/* Left 40% Panel */}
          <div className="w-[40%] bg-zinc-900 p-[0.8in] flex flex-col justify-between border-r border-zinc-800">
            <div>
              <p className="font-mono text-xs text-[#50C878] uppercase tracking-[0.3em] mb-4">Chapter 2.4</p>
              <h2 className="text-4xl font-black uppercase tracking-tight text-white leading-none">Theoretical<br/>Framework</h2>
            </div>
            <div className="w-16 h-2 bg-[#FFD700]"></div>
          </div>

          {/* Right 60% Panel */}
          <div className="w-[60%] p-[0.8in] flex flex-col justify-center gap-6 text-slate-300">
            <div className="bg-zinc-900 p-6 border-t-4 border-[#50C878] rounded">
              <h3 className="text-sm font-black text-white uppercase mb-1">1. Speech Act Theory</h3>
              <p className="font-mono text-[10px] text-[#50C878] mb-3">Austin (1962) &amp; Searle (1979)</p>
              <p className="text-xs leading-relaxed text-slate-300">Analyzes language as performative action. Focuses on illocutionary forces: <strong>Assertives</strong> (committing to factual truth), <strong>Directives</strong> (commands/requests), and <strong>Expressives</strong> (psychological/emotional states).</p>
            </div>

            <div className="bg-zinc-900 p-6 border-t-4 border-[#FFD700] rounded">
              <h3 className="text-sm font-black text-white uppercase mb-1">2. Interactional Sociolinguistics</h3>
              <p className="font-mono text-[10px] text-[#FFD700] mb-3">John Gumperz (1982)</p>
              <p className="text-xs leading-relaxed text-slate-300">Explains how speakers deploy <strong>Contextualisation Cues</strong> (localized slang, graphisation) to trigger <strong>Conversational Inference</strong>, allowing bilingual in-groups to decode implicit cultural meanings.</p>
            </div>
          </div>
        </div>

        {/* ================= SLIDE 6: METHODOLOGY ================= */}
        <div className="slide-page text-[#F5F5F5]">
          {/* Left 40% Panel */}
          <div className="w-[40%] bg-zinc-900 p-[0.8in] flex flex-col justify-between border-r border-zinc-800">
            <div>
              <p className="font-mono text-xs text-[#50C878] uppercase tracking-[0.3em] mb-4">Chapter 3</p>
              <h2 className="text-4xl font-black uppercase tracking-tight text-white leading-none">Research<br/>Methodology</h2>
            </div>
            <div className="w-16 h-2 bg-[#50C878]"></div>
          </div>

          {/* Right 60% Panel */}
          <div className="w-[60%] p-[0.8in] flex flex-col justify-center text-slate-300">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900 p-5 border border-zinc-800">
                <p className="font-mono text-[10px] text-[#50C878] font-bold uppercase mb-1">Research Design</p>
                <p className="text-xs text-white font-bold">Descriptive Qualitative Approach</p>
                <p className="text-[10px] text-slate-400 mt-2">Non-experimental textual analysis of naturalistic social media data.</p>
              </div>

              <div className="bg-zinc-900 p-5 border border-zinc-800">
                <p className="font-mono text-[10px] text-[#FFD700] font-bold uppercase mb-1">Sampling Technique</p>
                <p className="text-xs text-white font-bold">Purposive Sampling</p>
                <p className="text-[10px] text-slate-400 mt-2">30 high-density text plates extracted from public threads.</p>
              </div>

              <div className="bg-zinc-900 p-5 border border-zinc-800">
                <p className="font-mono text-[10px] text-[#FFD700] font-bold uppercase mb-1">Data Scope &amp; Timeline</p>
                <p className="text-xs text-white font-bold">April 2020 – July 2026</p>
                <p className="text-[10px] text-slate-400 mt-2">Sourced from public pages and threads on X and Facebook.</p>
              </div>

              <div className="bg-zinc-900 p-5 border border-zinc-800">
                <p className="font-mono text-[10px] text-[#50C878] font-bold uppercase mb-1">Analytical Procedure</p>
                <p className="text-xs text-white font-bold">Pragmatic &amp; Sociolinguistic</p>
                <p className="text-[10px] text-slate-400 mt-2">Speech Act classification paired with contextualisation cue decoding.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SLIDE 7: SAMPLE ANALYSIS ================= */}
        <div className="slide-page text-[#F5F5F5]">
          {/* Left 40% Panel */}
          <div className="w-[40%] bg-zinc-900 p-[0.8in] flex flex-col justify-between border-r border-zinc-800">
            <div>
              <p className="font-mono text-xs text-[#50C878] uppercase tracking-[0.3em] mb-4">Chapter 4</p>
              <h2 className="text-4xl font-black uppercase tracking-tight text-white leading-none">Sample Data<br/>Analysis</h2>
            </div>
            <div className="w-16 h-2 bg-[#FFD700]"></div>
          </div>

          {/* Right 60% Panel (EXACT ANALYSES REQUIRED) */}
          <div className="w-[60%] p-[0.6in] flex flex-col justify-center gap-4 text-slate-300">
            
            {/* Analysis 1 */}
            <div className="bg-zinc-900/80 p-4 border-l-4 border-[#50C878] rounded">
              <p className="font-mono text-[9px] font-bold text-[#50C878] uppercase">SAMPLE ANALYSIS: COMMUNICATIVE FUNCTIONS</p>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5">Political Discourse: Facebook Post (Plate 4.1)</p>
              <div className="bg-black/50 p-2 my-2 rounded font-mono text-[10px] text-[#FFD700]">
                "Power Na Borrowed Cloth... Appointment no be permanent address..."
              </div>
              <p className="text-[10px] leading-relaxed text-slate-300">
                <strong>Analysis:</strong> The user deploys Assertive speech acts to establish the transient nature of political power as an undeniable fact. Metaphorical representations strip political targets of invincibility, creating a boundary contrasting "Abuja" (elite) with the "village square" (grassroots).<br/>
                <span className="font-mono text-[9px] text-[#50C878]">Framework: Speech Act Theory</span>
              </p>
            </div>

            {/* Analysis 2 */}
            <div className="bg-zinc-900/80 p-4 border-l-4 border-[#FFD700] rounded">
              <p className="font-mono text-[9px] font-bold text-[#FFD700] uppercase">SAMPLE ANALYSIS: CODE-SWITCHING PATTERNS</p>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5">Political Mockery: X Post (Plate 4.11)</p>
              <div className="bg-black/50 p-2 my-2 rounded font-mono text-[10px] text-[#FFD700]">
                "But see where your life end.... See the gbajue goment you worked for and supported! O ga o!"
              </div>
              <p className="text-[10px] leading-relaxed text-slate-300">
                <strong>Analysis:</strong> Intra-sentential code-switching is demonstrated by inserting Yoruba slang "gbajue" next to graphised Pidgin "goment" within an English sentence. Tag-switching ("O ga o!") acts as an emotional anchor. A sarcastic Directive act ("See...") mocks the target.<br/>
                <span className="font-mono text-[9px] text-[#FFD700]">Framework: Interactional Sociolinguistics</span>
              </p>
            </div>

          </div>
        </div>

        {/* ================= SLIDE 8: FINDINGS & CONTRIBUTIONS TO KNOWLEDGE ================= */}
        <div className="slide-page text-[#F5F5F5]">
          {/* Left 40% Panel */}
          <div className="w-[40%] bg-zinc-900 p-[0.8in] flex flex-col justify-between border-r border-zinc-800">
            <div>
              <p className="font-mono text-xs text-[#50C878] uppercase tracking-[0.3em] mb-4">Chapter 4 &amp; 5</p>
              <h2 className="text-3xl font-black uppercase tracking-tight text-white leading-tight">Findings &amp;<br/>Contributions to<br/>Knowledge</h2>
            </div>
            <div className="w-16 h-2 bg-[#50C878]"></div>
          </div>

          {/* Right 60% Panel */}
          <div className="w-[60%] p-[0.6in] flex flex-col justify-center gap-4 text-slate-300">
            
            <div className="bg-zinc-900 p-4 border-l-4 border-[#50C878]">
              <h3 className="text-xs font-bold text-white uppercase mb-1">1. Major Research Findings</h3>
              <ul className="list-disc pl-4 text-[10px] space-y-1 text-slate-300">
                <li><strong>Political vs. Entertainment Variation:</strong> Political discourse relies heavily on <em>Assertive speech acts</em> to present economic realities as objective facts (upward resistance). Entertainment discourse relies on <em>Expressive and Directive acts</em> for lateral banter and boundary enforcement.</li>
                <li><strong>Graphisation as Rebellion:</strong> Deliberate phonetic spellings ('goment', 'di') reject standard English conventions, acting as a digital password for grassroots solidarity.</li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-4 border-l-4 border-[#FFD700]">
              <h3 className="text-xs font-bold text-white uppercase mb-1">2. Contributions to Knowledge</h3>
              <ul className="list-disc pl-4 text-[10px] space-y-1 text-slate-300">
                <li>Demonstrates the theoretical synergy between Speech Act Theory and Interactional Sociolinguistics in computer-mediated communication.</li>
                <li>Establishes that digital Nigerian Pidgin is an autonomous, highly structured written code rather than informal oral slang.</li>
                <li>Provides baseline empirical data for sociolinguists and social media content moderators navigating Nigerian public sphere discourse.</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
