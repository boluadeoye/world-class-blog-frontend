"use client";
import { useState, useEffect } from "react";
import { Download, BookOpen, Brain, ShieldCheck, MessageSquare, FileText, Target, CheckCircle2, Award, ChevronRight } from "lucide-react";

export default function DefenseGuideExhaustive() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1000);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Adeoye_Boluwatife_Complete_Thesis_Defense_Textbook";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-amber-200">
      
      {/* IMPORT LUXURY EDITORIAL FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #FFFFFF !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; counter-reset: pageCounter; }
          body * { visibility: hidden; }
          #dossier-render, #dossier-render * { visibility: visible; }
          #dossier-render { position: absolute; left: 0; top: 0; width: 210mm; background: #FFFFFF; }
          .a4-page { height: 297mm; width: 210mm; page-break-after: always; position: relative; background-color: #FFFFFF; box-sizing: border-box; overflow: hidden; display: flex; flex-direction: column; padding: 18mm 18mm 12mm 18mm; }
          .page-num::after { counter-increment: pageCounter; content: counter(pageCounter); }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* === VIEW 1: THE PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl border-t-8 border-[#0F172A]">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center p-3 border border-slate-200">
            <BookOpen size={32} className="text-[#0F172A]" />
          </div>
          <h1 className="font-playfair text-2xl font-black text-[#0F172A] mb-2 uppercase tracking-widest">Defense Textbook</h1>
          <p className="font-inter text-[#D4AF37] text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">12-Page Exhaustive Blueprint</p>
          {!isReady ? (
            <div className="text-slate-500 font-mono text-xs animate-pulse">COMPILING ACADEMIC TEXTBOOK...</div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-[#0F172A] hover:bg-slate-800 text-white font-inter font-bold py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl">
              <Download size={18} /> Download 12-Page Textbook
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE 12-PAGE TEXTBOOK (Print Only) === */}
      <div id="dossier-render" className="hidden print:block text-slate-800">
        
        {/* ================= PAGE 1: COVER ================= */}
        <div className="a4-page">
          <div className="flex h-3 w-full absolute top-0 left-0 z-10">
            <div className="bg-[#0F172A] w-1/2"></div><div className="bg-[#D4AF37] w-1/4"></div><div className="bg-slate-300 w-1/4"></div>
          </div>
          
          <main className="grow flex flex-col justify-between pt-12">
            <div>
              <p className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.4em] mb-3">Federal University Oye-Ekiti // Faculty of Arts</p>
              <p className="font-inter text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Department of English and Literary Studies</p>
              <h1 className="font-playfair text-4xl font-black text-[#0F172A] uppercase tracking-tight leading-[1.15] mb-6">
                The Roles of Nigerian Pidgin in Shaping Social Media Discourse:
              </h1>
              <h2 className="font-inter text-sm font-bold text-slate-500 uppercase tracking-wider mb-8">A Qualitative Content Analysis of X and Facebook</h2>
              <div className="h-1 w-24 bg-[#D4AF37] mb-8"></div>
            </div>

            <div className="bg-slate-50 border-l-4 border-[#0F172A] p-6 mb-8">
              <p className="font-inter text-[10px] font-black uppercase text-[#0F172A] tracking-widest mb-2">Master Thesis Overview</p>
              <p className="font-inter text-xs leading-relaxed text-slate-700 text-justify">
                This academic study investigates how digital Nigerian users deploy Nigerian Pidgin on social media platforms (X and Facebook) as a strategic linguistic tool. The research moves beyond traditional views of Pidgin as a mere market dialect, demonstrating how it functions as a mechanism for political resistance, identity negotiation, humour, and boundary demarcation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t-2 border-slate-200 pt-6">
              <div>
                <p className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Presented By</p>
                <p className="font-inter text-sm font-black text-[#0F172A] uppercase">Adeoye Boluwatife</p>
                <p className="font-mono text-[10px] text-[#D4AF37] font-bold mt-0.5">Matric: ELS/2021/1029</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Supervisor & Panel</p>
                <p className="font-inter text-sm font-black text-[#0F172A] uppercase">Dr. Okunade</p>
                <p className="font-mono text-[10px] text-slate-500 mt-0.5">July 2026 Academic Session</p>
              </div>
            </div>
          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 2: CHAPTER 1 DEEP DIVE ================= */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 1 // INTRODUCTION & OVERVIEW" pageNum="2" />
          <main className="grow flex flex-col gap-6">
            
            <ConceptCard 
              num="1.1" title="Background to the Study"
              anchor="Language is for talking in society. Think of buying pepper in the market. You use Pidgin to connect fast. Now, Pidgin has moved to Twitter. It is used for serious political fights."
              script="Dr. Okunade, language functions primarily as an instrument for social interaction and rapport management. Historically categorized as an informal contact code, Nigerian Pidgin has transcended its traditional market domain to become a primary text-based medium for complex sociopolitical discourse on digital networks like X and Facebook."
            />

            <ConceptCard 
              num="1.2" title="Statement of the Problem"
              anchor="Past scholars studied spoken Pidgin or internet jokes. But they ignored how Pidgin changes between political fights and entertainment banter on social media. My project fixes this exact gap."
              script="The statement of the problem addresses a critical empirical gap. Existing literature has predominantly investigated oral Pidgin or generalized digital humor, neglecting the distinct pragmatic functions, stance-taking strategies, and code-switching behaviors across political and entertainment genres on X and Facebook."
            />

            <ConceptCard 
              num="1.3" title="Aims & Specific Objectives"
              anchor="I am testing four things: communicative functions, identity strategies, code-switching types, and differences between political and entertainment posts."
              script="The primary aim is to investigate the discursive roles of Nigerian Pidgin. Specifically, I explore its dominant communicative functions, describe identity negotiation strategies, analyze code-switching patterns, and contrast the contextual variations between political and entertainment discourses."
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 border border-slate-200">
                <p className="font-inter text-[9px] font-black uppercase text-[#0F172A] mb-1">1.4 Significance of the Study</p>
                <p className="font-inter text-[10px] text-slate-600 leading-normal">Offers a pragmatic framework for digital sociolinguists and provides baseline data for social media content moderators addressing online discourse in Nigeria.</p>
              </div>
              <div className="bg-slate-50 p-4 border border-slate-200">
                <p className="font-inter text-[9px] font-black uppercase text-[#0F172A] mb-1">1.5 Scope & Delimitation</p>
                <p className="font-inter text-[10px] text-slate-600 leading-normal">Restricted strictly to written Nigerian Pidgin text threads on X and Facebook collected between April 2020 and July 2026.</p>
              </div>
            </div>

          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 3: CHAPTER 2 - GRAPHISATION ================= */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 2 // CONCEPTUAL REVIEW: GRAPHISATION" pageNum="3" />
          <main className="grow flex flex-col gap-5">
            
            <section className="bg-slate-50 p-4 border-l-4 border-[#0F172A]">
              <h3 className="font-inter text-xs font-black uppercase text-[#0F172A] mb-1">2.1.1 The Notion of Nigerian Pidgin</h3>
              <p className="font-inter text-[11px] text-slate-700 text-justify leading-relaxed">
                Nigerian Pidgin is an autonomous, English-lexifier hybrid language that carries covert prestige. It functions as a national lingua franca bridging Nigeria's diverse ethnic groups. In digital spaces, it acts as a primary code for humor, political critique, and group identity.
              </p>
            </section>

            <h3 className="font-inter text-sm font-black uppercase text-[#0F172A] tracking-wider border-b pb-1">2.1.2.1 The 4 Sub-Categories of Graphisation</h3>

            <ConceptCard 
              num="A" title="Orthographic Variation"
              anchor="You type words exactly how they sound. You spell 'goment' for government or 'di' for the. It shows you belong to the streets."
              script="Orthographic variation involves deliberate phonetic spellings. Users intentionally subvert standard English spelling conventions to approximate spoken Pidgin pronunciation, asserting cultural authenticity and in-group alignment."
            />

            <ConceptCard 
              num="B" title="Typographic Lengthening"
              anchor="You stretch letters like 'nooooo' or 'gbegeeee'. It shows you are very angry, excited, or mocking someone."
              script="Typographic lengthening is the repetition of vowels or consonants within a word. It functions as a digital prosodic cue, heightening the emotional intensity, emphasis, or satirical tone of a text post."
            />

            <ConceptCard 
              num="C" title="Alphanumeric Abbreviation"
              anchor="You mix numbers and letters like '404' for dog meat or '2geda' to beat character limits and type fast."
              script="Alphanumeric abbreviation shrinks complex terms into condensed visual codes. It allows digital users to bypass platform character limits while maintaining high interactional speed."
            />

            <ConceptCard 
              num="D" title="Visual Hybridity"
              anchor="You mix proper English and street Pidgin in one sentence. It shows you are educated but still street-smart."
              script="Visual hybridity juxtaposes formal English grammar alongside vernacular slang. This structural blending projects a dual identity, connecting institutional authority with grassroots cultural roots."
            />

          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 4: CHAPTER 2 - CODE-SWITCHING & IDENTITY ================= */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 2 // CODE-SWITCHING & IDENTITY NEGOTIATION" pageNum="4" />
          <main className="grow flex flex-col gap-6">
            
            <h3 className="font-inter text-sm font-black uppercase text-[#0F172A] tracking-wider border-b pb-1">2.1.2.2 The 3 Types of Code-Switching</h3>

            <ConceptCard 
              num="1" title="Intra-Sentential Switching"
              anchor="Think of mixing rice and beans in one spoon. You switch languages inside one single sentence without stopping."
              script="Intra-sentential switching occurs within the boundaries of a single clause or sentence. It requires high bilingual competence, allowing users to fuse academic concepts with street-level realities in one breath."
            />

            <ConceptCard 
              num="2" title="Inter-Sentential Switching"
              anchor="Think of eating rice first, then eating beans. You finish one full sentence in English, then write the next in Pidgin."
              script="Inter-sentential switching involves a complete language transition between full sentences. It is used strategically to build dramatic tension, setting up a premise in English and delivering a punchline in Pidgin."
            />

            <ConceptCard 
              num="3" title="Tag-Switching"
              anchor="Think of adding a pinch of salt. You throw in short words like 'Omo' or 'Abeg' at the end of English sentences."
              script="Tag-switching involves inserting isolated discourse markers or exclamation tags from one language into another. These tags act as emotional anchors that invite the audience into a shared cultural mood."
            />

            <section className="bg-slate-900 text-white p-5 rounded-lg mt-2">
              <h4 className="font-inter text-xs font-black uppercase text-[#D4AF37] mb-2">2.2 Identity Negotiation & In-Group Dynamics</h4>
              <p className="font-inter text-[11px] leading-relaxed text-slate-300 text-justify">
                Online identity is an active performance. Users deploy Pidgin as a <strong>sociolinguistic password</strong>. It creates in-group solidarity among everyday Nigerians while erecting linguistic boundaries to exclude out-groups, such as aloof politicians or foreign spectators.
              </p>
            </section>

          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 5: CHAPTER 2 - SPEECH ACT THEORY ================= */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 2 // THEORETICAL FRAMEWORK: SPEECH ACT THEORY" pageNum="5" />
          <main className="grow flex flex-col gap-6">
            
            <div className="bg-slate-50 p-4 border border-slate-200">
              <p className="font-inter text-xs font-bold text-[#0F172A] mb-1">Austin (1962) & Searle (1979) Speech Act Theory</p>
              <p className="font-inter text-[11px] text-slate-600 leading-normal">
                Language does not just describe facts; language performs actions. Utterances operate on three levels: Locutionary (the words), Illocutionary (the intention), and Perlocutionary (the effect).
              </p>
            </div>

            <h3 className="font-inter text-sm font-black uppercase text-[#0F172A] tracking-wider border-b pb-1">Primary Illocutionary Classifications in Data</h3>

            <ConceptCard 
              num="I" title="Assertive Speech Acts"
              anchor="Assertives state hard facts. Example: 'Country hard past metal.' You commit to the truth of what you are saying."
              script="Assertive speech acts commit the speaker to the truth of an expressed proposition. In my data, users deploy Assertives to present socio-economic inflation and governance failures as objective, indisputable realities."
            />

            <ConceptCard 
              num="II" title="Directive Speech Acts"
              anchor="Directives give commands or advice. Example: 'Abeg carry your matter comot.' You are ordering someone to do something."
              script="Directive speech acts are attempts by the speaker to get the hearer to perform a future action. Online, Directives range from polite requests to aggressive commands designed to challenge political targets."
            />

            <ConceptCard 
              num="III" title="Expressive Speech Acts"
              anchor="Expressives show your inner feelings. Example: 'I dey laugh oh' or 'God go punish poverty.' You show anger, joy, or shock."
              script="Expressive speech acts manifest the psychological state of the speaker. In digital discourse, Expressives are weaponized through sarcasm and dark comedy to vent frustration and cope with national hardship."
            />

          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 6: CHAPTER 2 - INTERACTIONAL SOCIOLINGUISTICS ================= */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 2 // INTERACTIONAL SOCIOLINGUISTICS" pageNum="6" />
          <main className="grow flex flex-col gap-6">
            
            <div className="bg-slate-50 p-4 border border-slate-200">
              <p className="font-inter text-xs font-bold text-[#0F172A] mb-1">John Gumperz (1982) Interactional Sociolinguistics</p>
              <p className="font-inter text-[11px] text-slate-600 leading-normal">
                Explains how speakers use subtle linguistic signals to guide how their words should be interpreted within a specific cultural context.
              </p>
            </div>

            <ConceptCard 
              num="1" title="Contextualisation Cues"
              anchor="Think of saying 'gbajue' or 'ojoro'. These slang words are signals. They tell insiders how to decode the conversation."
              script="Contextualisation cues are linguistic signals that indicate the interpretive frame of an interaction. Localized slang items like 'gbajue' (fraud) or 'chop' (corrupt consumption) trigger specific cultural background knowledge."
            />

            <ConceptCard 
              num="2" title="Conversational Inference"
              anchor="Reading between the lines. When a user types '404', Nigerians know it means dog meat. Outsiders think it is a internet error."
              script="Conversational inference is the process through which hearers use contextualisation cues to decode implied meanings. It relies on a shared sociocultural background between the communicator and the audience."
            />

            {/* THEORETICAL INTERACTION DIAGRAM */}
            <div className="border-2 border-[#0F172A] p-6 bg-slate-50 rounded text-center my-4">
              <p className="font-mono text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest mb-4">Theoretical Integration Model</p>
              <div className="flex justify-around items-center font-inter text-xs font-bold">
                <div className="bg-[#0F172A] text-white p-3 rounded">Speech Acts<br/><span className="text-[8px] font-normal text-slate-300">Intention / Action</span></div>
                <div className="text-xl font-black text-[#D4AF37]">+</div>
                <div className="bg-[#0F172A] text-white p-3 rounded">Gumperz's Cues<br/><span className="text-[8px] font-normal text-slate-300">Cultural Decoding</span></div>
                <div className="text-xl font-black text-[#D4AF37]">=</div>
                <div className="bg-red-800 text-white p-3 rounded">Digital Meaning<br/><span className="text-[8px] font-normal text-red-200">Pragmatic Finality</span></div>
              </div>
            </div>

          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 7: CHAPTER 3 - METHODOLOGY ================= */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 3 // METHODOLOGY & RESEARCH DESIGN" pageNum="7" />
          <main className="grow flex flex-col gap-5">
            
            <ConceptCard 
              num="3.1" title="Research Design"
              anchor="I used a descriptive qualitative design. I analyzed written text posts on screens without using numbers or complex statistics."
              script="A qualitative, descriptive research design was adopted. This non-experimental approach enabled an in-depth examination of the contextual and pragmatic nuances of written Nigerian Pidgin within social media threads."
            />

            <ConceptCard 
              num="3.2" title="Sampling Technique"
              anchor="I did not pick posts randomly. I purposively selected 30 posts from X and Facebook between April 2020 and July 2026."
              script="Purposive sampling was utilized to select 30 high-density text posts from X and Facebook spanning 2020 to 2026. These platforms were chosen because their text-centric architecture yields rich public commentary threads."
            />

            <ConceptCard 
              num="3.3" title="Methods of Data Collection"
              anchor="I used advanced search tools and mobile screenshots to capture organic posts directly from public timelines."
              script="Data was gathered from public pages and timelines via advanced search queries and digital capturing. Publicly accessible threads carried no expectation of privacy, adhering to strict ethical standards."
            />

            <ConceptCard 
              num="3.4" title="Method of Data Analysis"
              anchor="First, I grouped posts by theme. Then I applied Searle's Speech Acts to find intention and Gumperz's cues to decode culture."
              script="Data analysis followed a two-tiered framework: first, categorizing posts into political and entertainment genres; second, applying Speech Act Theory to identify illocutionary forces and Interactional Sociolinguistics to analyze code-switching and cues."
            />

          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 8: CHAPTER 4 - POLITICAL DISCOURSE ================= */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 4 // DATA ANALYSIS: POLITICAL DISCOURSE" pageNum="8" />
          <main className="grow flex flex-col gap-5">
            
            <section className="bg-slate-50 p-4 border-l-4 border-red-800">
              <h3 className="font-inter text-xs font-black uppercase text-red-800 mb-1">4.1.1 Political Discourse Analysis</h3>
              <p className="font-inter text-[11px] text-slate-700 text-justify leading-relaxed">
                Political discussions on X and Facebook focus on economic hardship, government policies, and political figures. Pidgin is weaponized as a tool for public accountability and resistance.
              </p>
            </section>

            <ConceptCard 
              num="Plate 4.1" title="Economic Lamentation (Smart Nelix - Facebook)"
              anchor="Text: 'Power Na Borrowed Cloth'. Assertive act stating political power is temporary. 'Oga' is used sarcastically to reprimand leaders."
              script="In Plate 4.1, the speaker deploys Assertive speech acts ('Power Na Borrowed Cloth') to establish the transient nature of political appointments. The vocative 'Oga' functions as a sarcastic contextualisation cue that establishes a confrontational stance."
            />

            <ConceptCard 
              num="Plate 4.3" title="Institutional Reporting (BBC News Pidgin)"
              anchor="Text: 'US House don agree to bill...'. Uses Assertives to report foreign policy without emotion. Uses 'di' and 'dia' spelling."
              script="BBC Pidgin utilizes Assertive predicates ('don agree') to report international sanction policies as verified facts. The strategic graphisation ('di', 'dia') translates complex Western diplomacy into accessible grassroots text."
            />

            <ConceptCard 
              num="Plate 4.11" title="Governance Critique (@dirawnn - X)"
              anchor="Text: 'See the gbajue goment you worked for!'. Uses Directive 'See' sarcastically and slang 'gbajue' (fraud) to attack politicians."
              script="This post combines Expressive and Directive speech acts. The imperative 'See' is sarcastically used to force the target to recognize political failure, while the intra-sentential switch 'gbajue goment' labels the state as fraudulent."
            />

          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 9: CHAPTER 4 - ENTERTAINMENT DISCOURSE ================= */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 4 // DATA ANALYSIS: ENTERTAINMENT DISCOURSE" pageNum="9" />
          <main className="grow flex flex-col gap-5">
            
            <section className="bg-slate-50 p-4 border-l-4 border-blue-800">
              <h3 className="font-inter text-xs font-black uppercase text-blue-800 mb-1">4.1.2 Entertainment & Sports Discourse Analysis</h3>
              <p className="font-inter text-[11px] text-slate-700 text-justify leading-relaxed">
                Entertainment discourse covers football rivalries, celebrity gossip, and corporate banter. Here, Pidgin is used to manage emotional distance, create humor, and mock rival groups.
              </p>
            </section>

            <ConceptCard 
              num="Plate 4.6" title="Football Banter (Facebook Thread)"
              anchor="Text: 'Haaland from Temu'. Expressive act comparing a top athlete to a cheap knockoff product to create communal laughter."
              script="Plate 4.6 demonstrates Expressive speech acts utilizing comedic incongruity. Metaphorically comparing footballer Haaland to 'Temu' (cheap knockoffs) devalues the target's athletic performance, generating in-group hilarity."
            />

            <ConceptCard 
              num="Plate 4.9" title="Corporate Banter (Iorfa Isaiah - Facebook)"
              anchor="Text: 'Airtel, wetin dey happen?'. Inter-sentential switch from Pidgin shock to English narrative when network men show up."
              script="In Plate 4.9, the user employs inter-sentential code-switching. Opening exclamations in Pidgin ('Omo, be like say...') express performative shock, switching to standard English to provide a serious factual description."
            />

            <ConceptCard 
              num="Plate 4.28" title="Digital Gossip (X Thread)"
              anchor="Text: 'Maybe she wan chop Tinubu too'. Assertive acts treating speculation as fact. 'Chop' means parasitic financial consumption."
              script="This thread relies heavily on Assertive speech acts to convert conjecture into factual narrative. The phrase 'chop Tinubu' utilizes metonymy, positioning the users as a digital tribunal while excluding the subject from the in-group."
            />

          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 10: CHAPTER 4 - FINDINGS & DISCUSSION ================= */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 4 // DISCUSSION OF MAJOR FINDINGS" pageNum="10" />
          <main className="grow flex flex-col gap-6">
            
            <h3 className="font-inter text-sm font-black uppercase text-[#0F172A] tracking-wider border-b pb-1">4.2 Major Research Discoveries</h3>

            <div className="space-y-4">
              <div className="border-l-4 border-red-800 bg-red-50/50 p-4">
                <p className="font-inter text-xs font-black text-red-900 uppercase mb-1">Finding 1: Political Discourse = Upward Resistance (Assertives)</p>
                <p className="font-inter text-[11px] text-slate-700 leading-relaxed text-justify">
                  In political contexts, Nigerian Pidgin is an upward-facing weapon against state authority. Users rely on <strong>Assertive speech acts</strong> to lock economic inflation and governance failures into undeniable facts, using slang like 'gbajue' to strip political figures of their legitimacy.
                </p>
              </div>

              <div className="border-l-4 border-blue-800 bg-blue-50/50 p-4">
                <p className="font-inter text-xs font-black text-blue-900 uppercase mb-1">Finding 2: Entertainment Discourse = Lateral Banter (Expressives & Directives)</p>
                <p className="font-inter text-[11px] text-slate-700 leading-relaxed text-justify">
                  In entertainment contexts, Pidgin is a lateral tool used between peers. Users rely on <strong>Expressive and Directive speech acts</strong> to enforce social boundaries, slander rival sports fans, and create humor through absurd conditions (e.g., commanding rival fans to 'cry alone').
                </p>
              </div>

              <div className="border-l-4 border-[#D4AF37] bg-amber-50/50 p-4">
                <p className="font-inter text-xs font-black text-amber-900 uppercase mb-1">Finding 3: Graphisation as Linguistic Rebellion</p>
                <p className="font-inter text-[11px] text-slate-700 leading-relaxed text-justify">
                  By deliberately rejecting standard English spellings ('goment', 'kontri', 'di'), digital users construct a distinct online space. Graphisation functions as a digital password that unifies street-smart citizens while locking out uninformed spectators.
                </p>
              </div>
            </div>

          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 11: CHAPTER 5 - CONCLUSION & CONTRIBUTIONS ================= */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 5 // SUMMARY, CONCLUSION & CONTRIBUTIONS" pageNum="11" />
          <main className="grow flex flex-col gap-6">
            
            <ConceptCard 
              num="5.1" title="Summary of Findings"
              anchor="Pidgin on social media serves two distinct roles: fighting political leaders using facts, and teasing rival fans using jokes and slang."
              script="The study confirmed that Nigerian Pidgin serves dual pragmatic roles: an instrument of ideological confrontation against political elites, and a mechanism for lateral social bonding, boundary enforcement, and humor among digital peers."
            />

            <ConceptCard 
              num="5.2" title="Conclusion"
              anchor="Pidgin is not just a language for uneducated market people. It is a powerful digital tool for political activism and identity."
              script="Nigerian Pidgin transcends its historical classification as an informal oral contact code. It has evolved into a sophisticated, written digital medium capable of articulating complex sociopolitical critique and negotiating authentic cultural identities."
            />

            <section className="bg-slate-900 text-white p-5 rounded-lg">
              <p className="font-inter text-xs font-black text-[#D4AF37] uppercase tracking-wider mb-2">5.3 Original Contributions to Knowledge</p>
              <ul className="list-disc pl-4 font-inter text-[10px] text-slate-300 space-y-2 leading-relaxed">
                <li>Demonstrates the theoretical synergy between Austin/Searle's Speech Act Theory and Gumperz's Interactional Sociolinguistics in digital spaces.</li>
                <li>Provides a fine-grained comparative framework contrasting political resistance discourse against entertainment banter on microblogging platforms.</li>
                <li>Establishes that digital graphisation is an intentional act of linguistic identity marking rather than a sign of poor literacy.</li>
              </ul>
            </section>

          </main>
          <PageFooter />
        </div>

        {/* ================= PAGE 12: THE PREP SHEET (Q&A) ================= */}
        <div className="a4-page">
          <PageHeader title="THE PREP SHEET // PROBABLE DEFENSE QUESTIONS" pageNum="12" />
          <main className="grow flex flex-col gap-4">
            
            <QAItem 
              q="Q1: Boluwatife, why did you choose X and Facebook instead of Instagram or TikTok?"
              a="Dr. Okunade, I purposively selected X and Facebook because their technical architecture is fundamentally text-driven. While Instagram and TikTok rely on visual and oral modes, X and Facebook generate massive corpora of written comment threads. This allowed me to conduct a fine-grained analysis of graphisation and text-based speech acts."
            />

            <QAItem 
              q="Q2: You mentioned 'Graphisation'. Can you give a practical example from your data?"
              a="Certainly. Graphisation is the deliberate orthographic subversion of standard English. In my data, institutional handles like BBC Pidgin spell 'the' as 'di' and 'government' as 'goment'. This is a strategic linguistic choice to align with grassroots Nigerian identity and ensure mass comprehensibility."
            />

            <QAItem 
              q="Q3: How exactly did you apply Gumperz's Interactional Sociolinguistics?"
              a="I used Gumperz’s concept of 'Contextualisation Cues.' For example, in Plate 4.10, a user refers to dog meat as '404'. To an outsider, 404 is a web error. But through 'Conversational Inference,' a Nigerian decodes it as a fast-moving animal. Gumperz’s theory allowed me to explain how users rely on shared cultural knowledge to decode hidden meanings."
            />

            <QAItem 
              q="Q4: What is the major difference between Political and Entertainment discourse?"
              a="The difference lies in the illocutionary force. Political discourse heavily utilizes Assertive speech acts to state undeniable facts about economic hardship and demand accountability from elites. Entertainment discourse relies on Expressive and Directive acts to generate humour and establish in-group/out-group boundaries."
            />

            <QAItem 
              q="Q5: Why did you combine Speech Act Theory and Interactional Sociolinguistics?"
              a="Speech Act Theory allowed me to analyze the speaker's core intention (illocutionary force) at the micro-level. Interactional Sociolinguistics provided the macro-level cultural lens required to explain how those intentions are decoded through shared sociolinguistic cues."
            />

          </main>
          <PageFooter />
        </div>

      </div>
    </div>
  );
}

// Subcomponents for Clean Layout
function PageHeader({ title, pageNum }) {
  return (
    <header className="border-b-2 border-slate-200 pb-3 mb-6 flex justify-between items-end relative z-10">
      <div>
        <p className="font-mono text-[7px] font-bold text-slate-400 uppercase tracking-widest">FUOYE // ELS DEFENSE TEXTBOOK</p>
        <h2 className="font-inter text-[10px] font-black text-[#0F172A] tracking-wider uppercase mt-0.5">{title}</h2>
      </div>
      <span className="font-inter text-xs font-black text-[#0F172A]">PAGE {pageNum}</span>
    </header>
  );
}

function PageFooter() {
  return (
    <footer className="border-t-2 border-slate-200 pt-3 mt-auto flex justify-between items-center relative z-10 bg-white">
      <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-400">
        ADEOYE BOLUWATIFE // ELS/2021/1029 // SUPERVISOR: DR. OKUNADE
      </span>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-[#0F172A]"></div>
        <div className="w-1.5 h-1.5 bg-[#D4AF37]"></div>
      </div>
    </footer>
  );
}

function ConceptCard({ num, title, anchor, script }) {
  return (
    <div className="border border-slate-200 rounded overflow-hidden">
      <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
        <h4 className="font-inter text-xs font-black text-[#0F172A] uppercase tracking-wide">{num}. {title}</h4>
        <span className="font-mono text-[8px] font-bold text-[#D4AF37] uppercase">Two-Layer Unit</span>
      </div>
      <div className="grid grid-cols-2">
        <div className="p-4 bg-amber-50/30 border-r border-slate-200">
          <p className="font-mono text-[8px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1.5 flex items-center gap-1"><Brain size={10}/> Mental Anchor</p>
          <p className="font-inter text-[11px] leading-relaxed text-slate-700">{anchor}</p>
        </div>
        <div className="p-4 bg-[#0F172A] text-white">
          <p className="font-mono text-[8px] font-bold text-blue-400 uppercase tracking-widest mb-1.5 flex items-center gap-1"><ShieldCheck size={10}/> Defense Script</p>
          <p className="font-inter text-[10px] leading-relaxed text-slate-300 italic">{script}</p>
        </div>
      </div>
    </div>
  );
}

function QAItem({ q, a }) {
  return (
    <div className="bg-slate-50 border border-slate-200 p-4 rounded">
      <p className="font-inter text-xs font-black text-[#0F172A] mb-2">{q}</p>
      <div className="flex gap-2 items-start">
        <MessageSquare size={12} className="text-[#D4AF37] shrink-0 mt-0.5" />
        <p className="font-inter text-[10px] leading-relaxed text-slate-700 italic font-medium">{a}</p>
      </div>
    </div>
  );
}
