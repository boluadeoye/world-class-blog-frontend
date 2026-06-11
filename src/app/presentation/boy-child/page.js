"use client";
import { useState } from "react";
import { Presentation, Download } from "lucide-react";

export default function BoyChildPPTX() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("");

  const generatePPTX = async () => {
    setIsGenerating(true);
    setStatus("Initializing Safe-Mode Engine...");
    try {
      const pptxgen = (await import("pptxgenjs")).default;
      const pres = new pptxgen();
      pres.layout = "LAYOUT_16x9"; 

      // THE "SAFE" PALETTE
      const c_sky = "BAE6FD"; // Bright Sky Blue
      const c_navy = "0F172A"; // Deep Navy for Text
      const c_gold = "F59E0B"; // Amber Gold for Accents
      const c_white = "FFFFFF";

      // IMAGES
      const img_cover = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176355/blog_assets/nww3tbifsdqy9jjpbhip.jpg";
      const img_stressed = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176367/blog_assets/p2s6sairkhl8mzoyphok.jpg";
      const img_planting = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160420/blog_assets/rf05jemizu7lpzecnp8r.jpg";
      const img_hoodie = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160324/blog_assets/lkkmeo9qup7oxtebjksi.jpg";
      const img_muscles = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176364/blog_assets/y2ayshhjhrw6vjcbfkty.jpg";
      const img_bicycle = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160412/blog_assets/oyhpjyneacycgv777wav.jpg";
      const img_sunset = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176359/blog_assets/qwqs4s5bqhz9fkmxdq5a.jpg";

      // HELPER: Apply Standard Background
      const applyBase = (slide) => {
        slide.background = { color: c_sky };
        slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "2%", fill: { color: c_gold } });
        slide.addShape(pres.ShapeType.rect, { x: 0, y: "98%", w: "100%", h: "2%", fill: { color: c_navy } });
      };

      setStatus("Architecting Slide 1...");
      // ==========================================
      // SLIDE 1: COVER (50/50 SPLIT)
      // ==========================================
      let s1 = pres.addSlide();
      s1.background = { color: c_sky };
      s1.addImage({ path: img_cover, x: 0, y: 0, w: "50%", h: "100%", sizing: { type: "cover" } });
      s1.addShape(pres.ShapeType.line, { x: "50%", y: 0, w: 0, h: "100%", line: { color: c_gold, width: 4 } });
      
      s1.addText("THE BOY CHILD\nAND THE CRISIS\nOF IDENTITY", { x: "55%", y: "15%", w: "40%", h: "30%", fontSize: 32, bold: true, color: c_navy, fontFace: "Arial", animate: { type: 'appear' } });
      s1.addText("BETWEEN EXPECTATIONS AND REALITY", { x: "55%", y: "45%", w: "40%", h: "10%", fontSize: 14, color: c_gold, fontFace: "Arial", tracking: 2, animate: { type: 'appear' } });
      
      s1.addText("PRESENTERS:", { x: "55%", y: "65%", w: "40%", h: "5%", fontSize: 12, bold: true, color: c_navy, fontFace: "Arial", animate: { type: 'appear' } });
      s1.addText("Agbemeho Favour Okeoghene\nSphere of influence: Boy Child", { x: "55%", y: "70%", w: "40%", h: "10%", fontSize: 12, color: c_navy, fontFace: "Georgia", animate: { type: 'appear' } });
      s1.addText("Olaoluwa Mayowa Deborah\nSphere of influence: Boy Child and Men", { x: "55%", y: "80%", w: "40%", h: "10%", fontSize: 12, color: c_navy, fontFace: "Georgia", animate: { type: 'appear' } });

      setStatus("Architecting Slide 2...");
      // ==========================================
      // SLIDE 2: INTRODUCTION (40/60 SPLIT)
      // ==========================================
      let s2 = pres.addSlide();
      applyBase(s2);
      s2.addImage({ path: img_stressed, x: 0, y: 0, w: "40%", h: "100%", sizing: { type: "cover" } });
      s2.addText("INTRODUCTION", { x: "45%", y: "10%", w: "50%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", animate: { type: 'appear' } });
      s2.addText("The crisis of identity among boys is one of the most overlooked social issues of our time.", { x: "45%", y: "25%", w: "50%", h: "15%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s2.addText("It is not simply about confusion over who they are; it is also about the struggle between who they naturally are and who society expects them to be.", { x: "45%", y: "40%", w: "50%", h: "25%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });

      setStatus("Architecting Slide 3...");
      // ==========================================
      // SLIDE 3: THE STRUGGLE (FULL)
      // ==========================================
      let s3 = pres.addSlide();
      applyBase(s3);
      s3.addText("THE STRUGGLE", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", animate: { type: 'appear' } });
      s3.addText("Across many societies, boys are expected to be strong, brave, responsible, and independent. These expectations are not inherently wrong.", { x: "10%", y: "25%", w: "80%", h: "15%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s3.addText("In fact, qualities such as responsibility, leadership, courage, discipline, and hard work are necessary for personal growth and societal development.", { x: "10%", y: "40%", w: "80%", h: "20%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s3.addText("However, over time, many cultures have attached additional unwritten rules to manhood.", { x: "10%", y: "60%", w: "80%", h: "15%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });

      setStatus("Architecting Slide 4...");
      // ==========================================
      // SLIDE 4: SEED METAPHOR (40/60 SPLIT)
      // ==========================================
      let s4 = pres.addSlide();
      applyBase(s4);
      s4.addImage({ path: img_planting, x: 0, y: 0, w: "40%", h: "100%", sizing: { type: "cover" } });
      s4.addText("THE SEED METAPHOR", { x: "45%", y: "10%", w: "50%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", animate: { type: 'appear' } });
      s4.addText("A popular saying goes, 'A girl is raised while a boy grows up on his own.'", { x: "45%", y: "25%", w: "50%", h: "15%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s4.addText("Having a boy child and leaving him to fend for himself is like planting a seed and expecting it to grow into a healthy tree without water, sunlight, or care.", { x: "45%", y: "40%", w: "50%", h: "25%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s4.addText("Such a boy may lose sight of who he truly is because no one walked him through the journey of understanding himself.", { x: "45%", y: "65%", w: "50%", h: "20%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });

      setStatus("Architecting Slide 5...");
      // ==========================================
      // SLIDE 5: WHAT IS IDENTITY? (FULL)
      // ==========================================
      let s5 = pres.addSlide();
      applyBase(s5);
      s5.addText("WHAT IS IDENTITY?", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", animate: { type: 'appear' } });
      s5.addText("Identity is a person's understanding of who they are, what they believe, where they belong, and what they stand for.", { x: "10%", y: "25%", w: "80%", h: "15%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s5.addText("For boys, identity helps answer important questions:\n• What does it mean to be a man?\n• What are my responsibilities?\n• How do I handle emotions?\n• What kind of future do I want?\n• What values should guide my life?", { x: "10%", y: "40%", w: "80%", h: "40%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      setStatus("Architecting Slide 6...");
      // ==========================================
      // SLIDE 6: EXPECTATIONS (FULL)
      // ==========================================
      let s6 = pres.addSlide();
      applyBase(s6);
      s6.addText("EXPECTATIONS VS. CULTURAL SCRIPTS", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", animate: { type: 'appear' } });
      s6.addText("An expectation is a responsibility or standard that helps an individual grow.", { x: "10%", y: "25%", w: "80%", h: "10%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s6.addText("For example:\n• A man should be responsible.\n• A man should be dependable.\n• A man should be able to care for himself and others.", { x: "10%", y: "35%", w: "80%", h: "25%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s6.addText("These are healthy expectations because they encourage maturity and accountability.", { x: "10%", y: "60%", w: "80%", h: "15%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });

      setStatus("Architecting Slide 7...");
      // ==========================================
      // SLIDE 7: SCRIPTS (FULL)
      // ==========================================
      let s7 = pres.addSlide();
      applyBase(s7);
      s7.addText("THE UNWRITTEN RULES", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", animate: { type: 'appear' } });
      s7.addText("A cultural script is an unwritten rule that tells a boy how he must behave to be accepted as a 'real man.'", { x: "10%", y: "25%", w: "80%", h: "15%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s7.addText("Examples include:\n• Men don't cry.\n• Men must always be strong.\n• Men must solve every problem alone.\n• Asking for help is weakness.\n• A man's value is determined by his financial success.", { x: "10%", y: "40%", w: "80%", h: "40%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });

      setStatus("Architecting Slide 8...");
      // ==========================================
      // SLIDE 8: CRISIS BEGINS (40/60 SPLIT)
      // ==========================================
      let s8 = pres.addSlide();
      applyBase(s8);
      s8.addImage({ path: img_hoodie, x: 0, y: 0, w: "40%", h: "100%", sizing: { type: "cover" } });
      s8.addText("THE IDENTITY CRISIS BEGINS", { x: "45%", y: "10%", w: "50%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", animate: { type: 'appear' } });
      s8.addText("A boy enters life with emotions, fears, dreams, weaknesses, and strengths. However, as he grows, he begins to receive messages about what is acceptable and what is not.", { x: "45%", y: "25%", w: "50%", h: "25%", fontSize: 14, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s8.addText("He learns that certain emotions should be hidden. He learns that vulnerability may attract ridicule. He learns that failure is unacceptable.", { x: "45%", y: "50%", w: "50%", h: "20%", fontSize: 14, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s8.addText("As a result, many boys begin to suppress parts of themselves in order to fit society's definition of masculinity.", { x: "45%", y: "70%", w: "50%", h: "15%", fontSize: 14, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });

      setStatus("Architecting Slide 9...");
      // ==========================================
      // SLIDE 9: PERFORMING MANHOOD (40/60 SPLIT)
      // ==========================================
      let s9 = pres.addSlide();
      applyBase(s9);
      s9.addImage({ path: img_muscles, x: 0, y: 0, w: "40%", h: "100%", sizing: { type: "cover" } });
      s9.addText("PERFORMING MANHOOD", { x: "45%", y: "10%", w: "50%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", animate: { type: 'appear' } });
      s9.addText("The crisis is born when a boy starts performing manhood rather than understanding himself.", { x: "45%", y: "25%", w: "50%", h: "15%", fontSize: 14, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s9.addText("Today, many boys find themselves caught between expectations and reality. Society tells them to be strong, independent, and successful, yet many have never been taught emotional intelligence, healthy masculinity, conflict resolution, self-worth, or purpose.", { x: "45%", y: "40%", w: "50%", h: "40%", fontSize: 14, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });

      setStatus("Architecting Slide 10...");
      // ==========================================
      // SLIDE 10: FACTORS (FULL - 5 STEP REVEAL)
      // ==========================================
      let s10 = pres.addSlide();
      applyBase(s10);
      s10.addText("WHAT CONTRIBUTES TO THE CRISIS?", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", animate: { type: 'appear' } });
      s10.addText("1. Absence of Mentorship: Many boys grow up without positive male role models.", { x: "10%", y: "25%", w: "80%", h: "10%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s10.addText("2. Emotional Neglect: Taught to suppress emotions rather than manage them.", { x: "10%", y: "35%", w: "80%", h: "10%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s10.addText("3. Social Media Influence: Learning manhood from influencers rather than mentors.", { x: "10%", y: "45%", w: "80%", h: "10%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s10.addText("4. Economic Pressure: Judged by what they can provide rather than who they are.", { x: "10%", y: "55%", w: "80%", h: "10%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s10.addText("5. Lack of Safe Spaces: Few environments allow boys to discuss fears without ridicule.", { x: "10%", y: "65%", w: "80%", h: "15%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      setStatus("Architecting Slide 11...");
      // ==========================================
      // SLIDE 11: THE COST (FULL)
      // ==========================================
      let s11 = pres.addSlide();
      applyBase(s11);
      s11.addText("THE COST OF UNDEFINED EXPECTATIONS", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", animate: { type: 'appear' } });
      s11.addText("Many men today are carrying burdens they never consciously chose. Because these expectations were inherited rather than examined, many men feel trapped.", { x: "10%", y: "25%", w: "80%", h: "20%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s11.addText("• EDUCATION (UNESCO): Millions of boys worldwide are out of school, and boys in many countries are increasingly at risk of dropping out.", { x: "10%", y: "45%", w: "80%", h: "20%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s11.addText("• MENTAL HEALTH (WHO): Suicide remains a leading cause of death among young people globally, with men dying at significantly higher rates than women.", { x: "10%", y: "65%", w: "80%", h: "20%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });

      setStatus("Architecting Slide 12...");
      // ==========================================
      // SLIDE 12: REDEFINING (40/60 SPLIT)
      // ==========================================
      let s12 = pres.addSlide();
      applyBase(s12);
      s12.addImage({ path: img_bicycle, x: 0, y: 0, w: "40%", h: "100%", sizing: { type: "cover" } });
      s12.addText("RE-DEFINING MASCULINITY", { x: "45%", y: "10%", w: "50%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", animate: { type: 'appear' } });
      s12.addText("The solution is to separate healthy expectations from unhealthy cultural pressures.", { x: "45%", y: "25%", w: "50%", h: "15%", fontSize: 14, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s12.addText("• A strong man is one who can face reality honestly.\n\n• A responsible man is one who knows when to seek help.\n\n• A successful man is defined by character, purpose, and integrity.", { x: "45%", y: "40%", w: "50%", h: "45%", fontSize: 14, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animate: { type: 'appear' } });

      setStatus("Architecting Slide 13...");
      // ==========================================
      // SLIDE 13: SOLUTIONS (FULL - 5 STEP REVEAL)
      // ==========================================
      let s13 = pres.addSlide();
      applyBase(s13);
      s13.addText("POSSIBLE SOLUTIONS", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", animate: { type: 'appear' } });
      s13.addText("1. Intentional Parenting: Teach boys values, discipline, and emotional intelligence.", { x: "10%", y: "25%", w: "80%", h: "10%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s13.addText("2. Mentorship Programmes: Connect boys with positive male mentors.", { x: "10%", y: "35%", w: "80%", h: "10%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s13.addText("3. Mental Health Awareness: Encourage boys to seek help when struggling.", { x: "10%", y: "45%", w: "80%", h: "10%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s13.addText("4. Positive Models: Strength should include compassion and self-control.", { x: "10%", y: "55%", w: "80%", h: "10%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });
      s13.addText("5. Educational Support: Create systems that support both boys and girls.", { x: "10%", y: "65%", w: "80%", h: "15%", fontSize: 16, color: c_navy, fontFace: "Georgia", valign: "top", animate: { type: 'appear' } });

      setStatus("Architecting Slide 14...");
      // ==========================================
      // SLIDE 14: CONCLUSION (40/60 SPLIT)
      // ==========================================
      let s14 = pres.addSlide();
      applyBase(s14);
      s14.addImage({ path: img_sunset, x: 0, y: 0, w: "40%", h: "100%", sizing: { type: "cover" } });
      s14.addText("CONCLUSION", { x: "45%", y: "10%", w: "50%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", animate: { type: 'appear' } });
      s14.addText("The crisis of identity among boys is often a crisis of inherited definitions. Every responsible man was once a boy who received guidance and support.", { x: "45%", y: "25%", w: "50%", h: "25%", fontSize: 14, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animate: { type: 'appear' } });
      s14.addText("The challenge for this generation is not to reject manhood but to redefine it thoughtfully—to keep what builds character and discard what destroys authenticity.", { x: "45%", y: "50%", w: "50%", h: "35%", fontSize: 14, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animate: { type: 'appear' } });

      setStatus("Architecting Slide 15...");
      // ==========================================
      // SLIDE 15: CLOSING (SOLID NAVY)
      // ==========================================
      let s15 = pres.addSlide();
      s15.background = { color: c_navy };
      s15.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "2%", fill: { color: accent_gold } });
      s15.addText(
        "\"The greatest challenge facing many boys today is not becoming a man; it is discovering what being a man truly means beyond the voices of culture, tradition, and expectation.\"",
        { x: "10%", y: "30%", w: "80%", h: "30%", fontSize: 24, italic: true, color: c_white, fontFace: "Georgia", align: "center", lineSpacing: 36, animate: { type: 'appear' } }
      );
      s15.addText("Every man society celebrates was once a boy who was guided.", { x: "10%", y: "65%", w: "80%", h: "10%", fontSize: 16, bold: true, color: accent_gold, fontFace: "Arial", align: "center", animate: { type: 'appear' } });

      setStatus("Finalizing Binary...");
      const blob = await pres.write("blob");
      const pptxFile = new Blob([blob], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });
      const url = window.URL.createObjectURL(pptxFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = "The_Boy_Child_Crisis_Presentation.pptx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setStatus("Success.");
    } catch (error) {
      console.error("PPTX Generation Failed:", error);
      alert("Error generating PowerPoint: " + error.message);
      setStatus("Failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
      <div className="relative z-10 w-full max-w-sm bg-white p-10 text-center rounded-3xl shadow-2xl border-t-8 border-amber-500">
        <div className="w-20 h-20 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Presentation size={40} className="text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Mayowa & Favour</h1>
        <p className="text-slate-500 text-xs font-mono uppercase mb-6">The Boy Child Crisis</p>
        {status && <p className="text-[10px] font-mono text-amber-600 mb-4 italic">{status}</p>}
        <button onClick={generatePPTX} disabled={isGenerating} className="w-full flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20">
          {isGenerating ? <span className="font-mono text-xs animate-pulse">Processing...</span> : <><Download size={18} /><span>Download PowerPoint</span></>}
        </button>
      </div>
    </div>
  );
}
