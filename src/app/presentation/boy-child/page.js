"use client";
import { useState } from "react";
import { Presentation, Download } from "lucide-react";

export default function BoyChildPPTX() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("");

  const generatePPTX = async () => {
    setIsGenerating(true);
    setStatus("Architecting Final Build...");
    try {
      const pptxgen = (await import("pptxgenjs")).default;
      const pres = new pptxgen();
      pres.layout = "LAYOUT_16x9"; 

      const bg_dark = "111827"; 
      const text_light = "FFFFFF"; 
      const accent_gold = "F59E0B"; 
      const card_bg = "1F2937";

      // HELPER: Apply Design Elements (Gold Bar + Corner Mark)
      const applyDesign = (slide) => {
        slide.background = { color: bg_dark };
        slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "2%", fill: { color: accent_gold } });
        slide.addShape(pres.ShapeType.rect, { x: "95%", y: "5%", w: 0.2, h: 0.2, fill: { color: accent_gold } });
      };

      // ==========================================
      // SLIDE 1: SPLIT COVER
      // ==========================================
      let s1 = pres.addSlide();
      s1.background = { color: bg_dark };
      s1.addImage({ path: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781158637/blog_assets/mkdjjognzhihi6qkqkfe.jpg", x: 0, y: 0, w: "50%", h: "100%", sizing: { type: "cover" } });
      s1.addShape(pres.ShapeType.line, { x: "50%", y: "10%", w: 0, h: "80%", line: { color: accent_gold, width: 2 } });
      s1.addText("THE BOY CHILD\nAND THE CRISIS\nOF IDENTITY", { x: "55%", y: "25%", w: "40%", h: "30%", fontSize: 32, bold: true, color: text_light, fontFace: "Arial", align: "left" });
      s1.addText("BETWEEN EXPECTATIONS AND REALITY", { x: "55%", y: "55%", w: "40%", h: "10%", fontSize: 14, color: accent_gold, fontFace: "Arial", tracking: 2 });
      s1.addText("Presented by Mayowa Olaoluwa", { x: "55%", y: "80%", w: "40%", h: "10%", fontSize: 12, color: "9CA3AF", fontFace: "Arial" });

      // ==========================================
      // SLIDE 2: INTRODUCTION
      // ==========================================
      let s2 = pres.addSlide();
      applyDesign(s2);
      s2.addText("INTRODUCTION", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 24, bold: true, color: accent_gold });
      s2.addShape(pres.ShapeType.rect, { x: "10%", y: "22%", w: "80%", h: "60%", fill: { color: card_bg } });
      s2.addText(
        "The crisis of identity among boys is one of the most overlooked social issues of our time. It is not simply about confusion over who they are; it is also about the struggle between who they naturally are and who society expects them to be.\n\nAcross many societies, boys are expected to be strong, brave, responsible, and independent. These expectations are not inherently wrong.",
        { x: "12%", y: "25%", w: "76%", h: "55%", fontSize: 16, color: text_light, fontFace: "Georgia", lineSpacing: 28, valign: "top" }
      );

      // ==========================================
      // SLIDE 3: THE UNWRITTEN RULES
      // ==========================================
      let s3 = pres.addSlide();
      applyDesign(s3);
      s3.addText("THE UNWRITTEN RULES", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 24, bold: true, color: accent_gold });
      s3.addText(
        "Qualities such as responsibility, leadership, courage, discipline, and hard work are necessary for personal growth. However, over time, many cultures have attached additional unwritten rules to manhood.\n\nA popular saying goes, 'A girl is raised while a boy grows up on his own.' This belief has created generations of boys who are expected to become men without guidance.",
        { x: "10%", y: "25%", w: "80%", h: "60%", fontSize: 16, color: text_light, fontFace: "Georgia", lineSpacing: 28, valign: "top" }
      );

      // ==========================================
      // SLIDE 4: THE SEED METAPHOR (SPLIT)
      // ==========================================
      let s4 = pres.addSlide();
      applyDesign(s4);
      s4.addImage({ path: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160420/blog_assets/rf05jemizu7lpzecnp8r.jpg", x: 0, y: 0, w: "40%", h: "100%", sizing: { type: "cover" } });
      s4.addShape(pres.ShapeType.line, { x: "40%", y: "10%", w: 0, h: "80%", line: { color: accent_gold, width: 1 } });
      s4.addText("THE SEED METAPHOR", { x: "45%", y: "10%", w: "50%", h: "10%", fontSize: 24, bold: true, color: accent_gold });
      s4.addText(
        "Having a boy child and leaving him to fend for himself is like planting a seed and expecting it to grow into a healthy tree without water, sunlight, or care.\n\nSuch a boy may lose sight of who he truly is because no one walked him through the journey of understanding himself, his emotions, his responsibilities, and his purpose.",
        { x: "45%", y: "25%", w: "50%", h: "65%", fontSize: 14, color: text_light, fontFace: "Georgia", lineSpacing: 24, valign: "top" }
      );

      // ==========================================
      // SLIDE 5: WHAT IS IDENTITY?
      // ==========================================
      let s5 = pres.addSlide();
      applyDesign(s5);
      s5.addText("WHAT IS IDENTITY?", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 24, bold: true, color: accent_gold });
      s5.addText(
        "Identity is a person's understanding of who they are, what they believe, where they belong, and what they stand for.\n\nFor boys, identity helps answer important questions:\n• What does it mean to be a man?\n• What are my responsibilities?\n• How do I handle emotions?\n• What kind of future do I want?\n• What values should guide my life?",
        { x: "10%", y: "25%", w: "80%", h: "60%", fontSize: 16, color: text_light, fontFace: "Georgia", lineSpacing: 30, valign: "top" }
      );

      // ==========================================
      // SLIDE 6: EXPECTATIONS VS SCRIPTS
      // ==========================================
      let s6 = pres.addSlide();
      applyDesign(s6);
      s6.addText("EXPECTATIONS VS. SCRIPTS", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 24, bold: true, color: accent_gold });
      s6.addText(
        "An expectation is a responsibility or standard that helps an individual grow (e.g., being dependable).\n\nA cultural script, however, is an unwritten rule that tells a boy how he must behave to be accepted as a 'real man.'\n\nOver time, these scripts become so deeply rooted that boys believe seeking support makes them less masculine.",
        { x: "10%", y: "25%", w: "80%", h: "60%", fontSize: 16, color: text_light, fontFace: "Georgia", lineSpacing: 28, valign: "top" }
      );

      // ==========================================
      // SLIDE 7: CULTURAL SCRIPTS
      // ==========================================
      let s7 = pres.addSlide();
      applyDesign(s7);
      s7.addText("THE CULTURAL SCRIPTS", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 24, bold: true, color: accent_gold });
      s7.addShape(pres.ShapeType.rect, { x: "10%", y: "25%", w: "80%", h: "50%", fill: { color: "991B1B" } });
      s7.addText(
        "• Men don't cry.\n• Men must always be strong.\n• Men must solve every problem alone.\n• Asking for help is weakness.\n• A man's value is determined by his financial success.",
        { x: "15%", y: "30%", w: "70%", h: "40%", fontSize: 18, color: text_light, fontFace: "Arial", lineSpacing: 36, valign: "middle" }
      );

      // ==========================================
      // SLIDE 8: THE CRISIS BEGINS (SPLIT)
      // ==========================================
      let s8 = pres.addSlide();
      applyDesign(s8);
      s8.addImage({ path: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160324/blog_assets/lkkmeo9qup7oxtebjksi.jpg", x: 0, y: 0, w: "40%", h: "100%", sizing: { type: "cover" } });
      s8.addShape(pres.ShapeType.line, { x: "40%", y: "10%", w: 0, h: "80%", line: { color: accent_gold, width: 1 } });
      s8.addText("THE IDENTITY CRISIS BEGINS", { x: "45%", y: "10%", w: "50%", h: "10%", fontSize: 24, bold: true, color: accent_gold });
      s8.addText(
        "A boy learns that certain emotions should be hidden. He learns that vulnerability attracts ridicule. He learns that failure is unacceptable.\n\nAs a result, many boys begin to suppress parts of themselves in order to fit society's definition of masculinity. The crisis is born when a boy starts performing manhood rather than understanding himself.",
        { x: "45%", y: "25%", w: "50%", h: "65%", fontSize: 14, color: text_light, fontFace: "Georgia", lineSpacing: 24, valign: "top" }
      );

      // ==========================================
      // SLIDE 9: THE COST (STATS)
      // ==========================================
      let s9 = pres.addSlide();
      applyDesign(s9);
      s9.addText("THE COST OF EXPECTATIONS", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 24, bold: true, color: accent_gold });
      s9.addText(
        "• EDUCATION (UNESCO): Millions of boys worldwide are out of school, and boys in many countries are increasingly at risk of dropping out.\n\n• MENTAL HEALTH (WHO): Suicide remains a leading cause of death among young people globally, with men dying at significantly higher rates than women.",
        { x: "10%", y: "25%", w: "80%", h: "60%", fontSize: 16, color: text_light, fontFace: "Georgia", lineSpacing: 30, valign: "top" }
      );

      // ==========================================
      // SLIDE 10: CONTRIBUTING FACTORS
      // ==========================================
      let s10 = pres.addSlide();
      applyDesign(s10);
      s10.addText("CONTRIBUTING FACTORS", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 24, bold: true, color: accent_gold });
      s10.addText(
        "1. Absence of Mentorship: Lack of positive male role models.\n2. Emotional Neglect: Suppression of emotions.\n3. Social Media Influence: Learning manhood from influencers.\n4. Economic Pressure: Judged by provision, not character.\n5. Lack of Safe Spaces: No environment for honest discussion.",
        { x: "10%", y: "25%", w: "80%", h: "60%", fontSize: 16, color: text_light, fontFace: "Georgia", lineSpacing: 28, valign: "top" }
      );

      // ==========================================
      // SLIDE 11: RE-DEFINING MASCULINITY (SPLIT)
      // ==========================================
      let s11 = pres.addSlide();
      applyDesign(s11);
      s11.addImage({ path: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160412/blog_assets/oyhpjyneacycgv777wav.jpg", x: 0, y: 0, w: "40%", h: "100%", sizing: { type: "cover" } });
      s11.addShape(pres.ShapeType.line, { x: "40%", y: "10%", w: 0, h: "80%", line: { color: accent_gold, width: 1 } });
      s11.addText("RE-DEFINING MASCULINITY", { x: "45%", y: "10%", w: "50%", h: "10%", fontSize: 24, bold: true, color: accent_gold });
      s11.addText(
        "The solution is to separate healthy expectations from unhealthy cultural pressures.\n\n• A strong man is one who can face reality honestly.\n• A responsible man is one who knows when to seek help.\n• A successful man is defined by character, purpose, and integrity.",
        { x: "45%", y: "25%", w: "50%", h: "65%", fontSize: 14, color: text_light, fontFace: "Georgia", lineSpacing: 24, valign: "top" }
      );

      // ==========================================
      // SLIDE 12: POSSIBLE SOLUTIONS
      // ==========================================
      let s12 = pres.addSlide();
      applyDesign(s12);
      s12.addText("POSSIBLE SOLUTIONS", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 24, bold: true, color: accent_gold });
      s12.addText(
        "1. Intentional Parenting: Teach values and discipline.\n2. Mentorship Programmes: Connect boys with mentors.\n3. Mental Health Awareness: Encourage seeking help.\n4. Positive Models: Strength through compassion.\n5. Educational Support: Systems that support both genders.",
        { x: "10%", y: "25%", w: "80%", h: "60%", fontSize: 16, color: text_light, fontFace: "Georgia", lineSpacing: 28, valign: "top" }
      );

      // ==========================================
      // SLIDE 13: CONCLUSION
      // ==========================================
      let s13 = pres.addSlide();
      applyDesign(s13);
      s13.addText("CONCLUSION", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 24, bold: true, color: accent_gold });
      s13.addText(
        "The crisis of identity among boys is often a crisis of inherited definitions. Every responsible man was once a boy who received guidance and support.\n\nThe challenge for this generation is to redefine manhood thoughtfully—to keep what builds character and discard what destroys authenticity.",
        { x: "10%", y: "25%", w: "80%", h: "60%", fontSize: 16, color: text_light, fontFace: "Georgia", lineSpacing: 30, valign: "top" }
      );

      // ==========================================
      // SLIDE 14: CLOSING QUOTE
      // ==========================================
      let s14 = pres.addSlide();
      s14.background = { color: bg_dark };
      s14.addShape(pres.ShapeType.rect, { x: "10%", y: "20%", w: "80%", h: "50%", fill: { color: card_bg }, line: { color: accent_gold, width: 2 } });
      s14.addText(
        "\"The greatest challenge facing many boys today is not becoming a man; it is discovering what being a man truly means beyond the voices of culture, tradition, and expectation.\"",
        { x: "15%", y: "25%", w: "70%", h: "40%", fontSize: 22, italic: true, color: text_light, fontFace: "Georgia", align: "center", lineSpacing: 36 }
      );
      s14.addText("Every man society celebrates was once a boy who was guided.", { x: "10%", y: "75%", w: "80%", h: "10%", fontSize: 14, bold: true, color: accent_gold, align: "center" });

      setStatus("Finalizing Binary...");
      const blob = await pres.write("blob");
      const pptxFile = new Blob([blob], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });
      const url = window.URL.createObjectURL(pptxFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = "The_Boy_Child_Crisis_Mayowa_Olaoluwa.pptx";
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

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Mayowa Olaoluwa</h1>
        <p className="text-slate-500 text-xs font-mono uppercase mb-6">PPTX Master V4</p>
        
        {status && <p className="text-[10px] font-mono text-amber-600 mb-4 italic">{status}</p>}

        <button
          onClick={generatePPTX}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20"
        >
          {isGenerating ? (
            <span className="font-mono text-xs animate-pulse">Processing...</span>
          ) : (
            <>
              <Download size={18} />
              <span>Download PowerPoint</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
