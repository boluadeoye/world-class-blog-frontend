"use client";
import { useState } from "react";
import { Presentation, Download } from "lucide-react";

export default function BoyChildPPTX() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("");

  const generatePPTX = async () => {
    setIsGenerating(true);
    setStatus("Initializing Unbreakable Engine...");
    try {
      const pptxgen = (await import("pptxgenjs")).default;
      const pres = new pptxgen();

      pres.layout = "LAYOUT_16x9"; 

      const bg_dark = "111827"; 
      const text_light = "FFFFFF"; 
      const accent_gold = "F59E0B"; 

      // HELPER: Manually draw background to avoid Master Slide crashes on mobile
      const applyBase = (slide) => {
        slide.background = { color: bg_dark };
        slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "2%", fill: { color: accent_gold } });
      };

      setStatus("Building Slide 1: Cover...");
      // ==========================================
      // SLIDE 1: COVER (FULL BLEED)
      // ==========================================
      let s1 = pres.addSlide();
      s1.addImage({ 
        path: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781158637/blog_assets/mkdjjognzhihi6qkqkfe.jpg", 
        x: 0, y: 0, w: "100%", h: "100%", 
        sizing: { type: "cover", w: "100%", h: "100%" } 
      });
      // Cinematic Scrim
      s1.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "000000", transparency: 60 } });
      
      s1.addText("THE BOY CHILD AND THE\nCRISIS OF IDENTITY", { 
        x: "5%", y: "25%", w: "90%", h: "25%", 
        fontSize: 40, bold: true, color: text_light, fontFace: "Arial", align: "center", valign: "middle" 
      });
      s1.addText("BETWEEN EXPECTATIONS AND REALITY", { 
        x: "5%", y: "50%", w: "90%", h: "10%", 
        fontSize: 20, color: accent_gold, fontFace: "Arial", align: "center", valign: "top" 
      });
      s1.addText("Presented by Mayowa Olaoluwa", { 
        x: "5%", y: "80%", w: "90%", h: "10%", 
        fontSize: 16, color: text_light, fontFace: "Arial", align: "center", bold: true, valign: "bottom" 
      });

      setStatus("Building Slide 2: Intro...");
      // ==========================================
      // SLIDE 2: INTRODUCTION
      // ==========================================
      let s2 = pres.addSlide();
      applyBase(s2);
      s2.addText("INTRODUCTION", { x: "5%", y: "8%", w: "90%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial", valign: "top" });
      s2.addText(
        "The crisis of identity among boys is one of the most overlooked social issues of our time.\n\nIt is not simply about confusion over who they are; it is also about the struggle between who they naturally are and who society expects them to be.\n\nThis disconnect leaves many young men struggling silently with confusion, loneliness, anger, and low self-esteem.",
        { x: "5%", y: "25%", w: "90%", h: "65%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 32, valign: "top" }
      );

      setStatus("Building Slide 3: The Struggle...");
      // ==========================================
      // SLIDE 3: THE STRUGGLE
      // ==========================================
      let s3 = pres.addSlide();
      applyBase(s3);
      s3.addText("THE STRUGGLE", { x: "5%", y: "8%", w: "90%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial", valign: "top" });
      s3.addText(
        "Across many societies, boys are expected to be strong, brave, responsible, and independent. These expectations are not inherently wrong.\n\nIn fact, qualities such as responsibility, leadership, courage, discipline, and hard work are necessary for personal growth and societal development.\n\nHowever, over time, many cultures have attached additional unwritten rules to manhood.",
        { x: "5%", y: "25%", w: "90%", h: "65%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 32, valign: "top" }
      );

      setStatus("Building Slide 4: Seed Metaphor...");
      // ==========================================
      // SLIDE 4: THE SEED METAPHOR (SPLIT SCREEN)
      // ==========================================
      let s4 = pres.addSlide();
      applyBase(s4);
      s4.addImage({ 
        path: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160420/blog_assets/rf05jemizu7lpzecnp8r.jpg", 
        x: 0, y: 0, w: "40%", h: "100%", 
        sizing: { type: "cover", w: "40%", h: "100%" } 
      });
      s4.addText("THE SEED METAPHOR", { x: "45%", y: "8%", w: "50%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial", valign: "top" });
      s4.addText(
        "A popular saying goes, 'A girl is raised while a boy grows up on his own.'\n\nHaving a boy child and leaving him to fend for himself is like planting a seed and expecting it to grow into a healthy tree without water, sunlight, or care.\n\nSuch a boy may lose sight of who he truly is because no one walked him through the journey of understanding himself.",
        { x: "45%", y: "25%", w: "50%", h: "65%", fontSize: 18, color: text_light, fontFace: "Georgia", lineSpacing: 28, valign: "top" }
      );

      setStatus("Building Slide 5: Identity...");
      // ==========================================
      // SLIDE 5: WHAT IS IDENTITY?
      // ==========================================
      let s5 = pres.addSlide();
      applyBase(s5);
      s5.addText("WHAT IS IDENTITY?", { x: "5%", y: "8%", w: "90%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial", valign: "top" });
      s5.addText(
        "Identity is a person's understanding of who they are, what they believe, where they belong, and what they stand for.\n\nFor boys, identity helps answer important questions such as:\n• What does it mean to be a man?\n• What are my responsibilities?\n• How do I handle emotions?\n• What kind of future do I want?\n• What values should guide my life?",
        { x: "5%", y: "25%", w: "90%", h: "65%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 32, valign: "top" }
      );

      setStatus("Building Slide 6: Expectations...");
      // ==========================================
      // SLIDE 6: EXPECTATIONS VS SCRIPTS
      // ==========================================
      let s6 = pres.addSlide();
      applyBase(s6);
      s6.addText("EXPECTATIONS VS. CULTURAL SCRIPTS", { x: "5%", y: "8%", w: "90%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial", valign: "top" });
      s6.addText(
        "An expectation is a responsibility or standard that helps an individual grow.\n\nFor example:\n• A man should be responsible.\n• A man should be dependable.\n• A man should be able to care for himself and others.\n\nThese are healthy expectations because they encourage maturity and accountability.",
        { x: "5%", y: "25%", w: "90%", h: "65%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 32, valign: "top" }
      );

      setStatus("Building Slide 7: Unwritten Rules...");
      // ==========================================
      // SLIDE 7: THE UNWRITTEN RULES
      // ==========================================
      let s7 = pres.addSlide();
      applyBase(s7);
      s7.addText("THE UNWRITTEN RULES", { x: "5%", y: "8%", w: "90%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial", valign: "top" });
      s7.addText(
        "A cultural script is an unwritten rule that tells a boy how he must behave to be accepted as a 'real man.'\n\nExamples include:\n• Men don't cry.\n• Men must always be strong.\n• Men must solve every problem alone.\n• Asking for help is weakness.\n• A man's value is determined by his financial success.",
        { x: "5%", y: "25%", w: "90%", h: "65%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 32, valign: "top" }
      );

      setStatus("Building Slide 8: Crisis Begins...");
      // ==========================================
      // SLIDE 8: THE CRISIS BEGINS (SPLIT SCREEN)
      // ==========================================
      let s8 = pres.addSlide();
      applyBase(s8);
      s8.addImage({ 
        path: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160324/blog_assets/lkkmeo9qup7oxtebjksi.jpg", 
        x: 0, y: 0, w: "40%", h: "100%", 
        sizing: { type: "cover", w: "40%", h: "100%" } 
      });
      s8.addText("THE CRISIS BEGINS", { x: "45%", y: "8%", w: "50%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial", valign: "top" });
      s8.addText(
        "A boy enters life with emotions, fears, dreams, weaknesses, and strengths. However, as he grows, he begins to receive messages about what is acceptable and what is not.\n\nHe learns that certain emotions should be hidden. He learns that vulnerability may attract ridicule. He learns that failure is unacceptable.\n\nAs a result, many boys begin to suppress parts of themselves in order to fit society's definition of masculinity.",
        { x: "45%", y: "25%", w: "50%", h: "65%", fontSize: 18, color: text_light, fontFace: "Georgia", lineSpacing: 28, valign: "top" }
      );

      setStatus("Building Slide 9: Performing...");
      // ==========================================
      // SLIDE 9: PERFORMING MANHOOD
      // ==========================================
      let s9 = pres.addSlide();
      applyBase(s9);
      s9.addText("PERFORMING MANHOOD", { x: "5%", y: "8%", w: "90%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial", valign: "top" });
      s9.addText(
        "The crisis is born when a boy starts performing manhood rather than understanding himself.\n\nToday, many boys find themselves caught between expectations and reality. Society tells them to be strong, independent, and successful, yet many have never been taught emotional intelligence, healthy masculinity, conflict resolution, self-worth, or purpose.",
        { x: "5%", y: "25%", w: "90%", h: "65%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 32, valign: "top" }
      );

      setStatus("Building Slide 10: The Cost...");
      // ==========================================
      // SLIDE 10: THE COST
      // ==========================================
      let s10 = pres.addSlide();
      applyBase(s10);
      s10.addText("THE COST OF UNDEFINED EXPECTATIONS", { x: "5%", y: "8%", w: "90%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial", valign: "top" });
      s10.addText(
        "Many men today are carrying burdens they never consciously chose. Because these expectations were inherited rather than examined, many men feel trapped.\n\n• EDUCATION (UNESCO): Millions of boys worldwide are out of school, and boys in many countries are increasingly at risk of dropping out academically.\n\n• MENTAL HEALTH (WHO): Suicide remains one of the leading causes of death. Men in many countries die by suicide at significantly higher rates than women.",
        { x: "5%", y: "25%", w: "90%", h: "65%", fontSize: 18, color: text_light, fontFace: "Georgia", lineSpacing: 30, valign: "top" }
      );

      setStatus("Building Slide 11: Factors...");
      // ==========================================
      // SLIDE 11: CONTRIBUTING FACTORS
      // ==========================================
      let s11 = pres.addSlide();
      applyBase(s11);
      s11.addText("WHAT CONTRIBUTES TO THE CRISIS?", { x: "5%", y: "8%", w: "90%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial", valign: "top" });
      s11.addText(
        "1. Absence of Mentorship: Growing up without positive male role models.\n\n2. Emotional Neglect: Taught to suppress emotions rather than manage them.\n\n3. Social Media Influence: Learning manhood from influencers rather than mentors.\n\n4. Academic and Economic Pressure: Judged by provision rather than character.\n\n5. Lack of Safe Spaces: Few environments allow boys to discuss fears without ridicule.",
        { x: "5%", y: "25%", w: "90%", h: "65%", fontSize: 18, color: text_light, fontFace: "Georgia", lineSpacing: 28, valign: "top" }
      );

      setStatus("Building Slide 12: Redefining...");
      // ==========================================
      // SLIDE 12: RE-DEFINING MASCULINITY (SPLIT SCREEN)
      // ==========================================
      let s12 = pres.addSlide();
      applyBase(s12);
      s12.addImage({ 
        path: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160412/blog_assets/oyhpjyneacycgv777wav.jpg", 
        x: 0, y: 0, w: "40%", h: "100%", 
        sizing: { type: "cover", w: "40%", h: "100%" } 
      });
      s12.addText("RE-DEFINING MASCULINITY", { x: "45%", y: "8%", w: "50%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial", valign: "top" });
      s12.addText(
        "The solution is to separate healthy expectations from unhealthy cultural pressures.\n\n• A strong man is not one who never cries; a strong man is one who can face reality honestly.\n\n• A responsible man is not one who carries every burden alone; a responsible man is one who knows when to seek help.\n\n• A successful man is defined by character, purpose, integrity, and positive impact.",
        { x: "45%", y: "25%", w: "50%", h: "65%", fontSize: 18, color: text_light, fontFace: "Georgia", lineSpacing: 28, valign: "top" }
      );

      setStatus("Building Slide 13: Solutions...");
      // ==========================================
      // SLIDE 13: POSSIBLE SOLUTIONS
      // ==========================================
      let s13 = pres.addSlide();
      applyBase(s13);
      s13.addText("POSSIBLE SOLUTIONS", { x: "5%", y: "8%", w: "90%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial", valign: "top" });
      s13.addText(
        "1. Intentional Parenting: Teach boys values, discipline, and emotional intelligence.\n\n2. Mentorship Programmes: Connect boys with positive male mentors.\n\n3. Mental Health Awareness: Encourage boys to seek help when struggling.\n\n4. Positive Models: Include compassion, responsibility, and self-control.\n\n5. Educational Support: Create systems that support both boys and girls.",
        { x: "5%", y: "25%", w: "90%", h: "65%", fontSize: 18, color: text_light, fontFace: "Georgia", lineSpacing: 28, valign: "top" }
      );

      setStatus("Building Slide 14: Conclusion...");
      // ==========================================
      // SLIDE 14: CONCLUSION & QUOTE
      // ==========================================
      let s14 = pres.addSlide();
      applyBase(s14);
      s14.addText("CONCLUSION", { x: "5%", y: "8%", w: "90%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial", valign: "top" });
      s14.addText(
        "The challenge for this generation is not to reject manhood but to redefine it thoughtfully—to keep what builds character and discard what destroys authenticity.\n\n\"The greatest challenge facing many boys today is not becoming a man; it is discovering what being a man truly means beyond the voices of culture, tradition, and expectation.\"\n\nEvery man society celebrates was once a boy who was guided.",
        { x: "5%", y: "25%", w: "90%", h: "65%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 32, valign: "top" }
      );

      setStatus("Finalizing Binary...");
      const blob = await pres.write("blob");
      const pptxFile = new Blob([blob], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });
      
      setStatus("Triggering download...");
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
        <p className="text-slate-500 text-xs font-mono uppercase mb-6">The Boy Child Crisis</p>
        
        {status && <p className="text-[10px] font-mono text-amber-600 mb-4 italic">{status}</p>}

        <button
          onClick={generatePPTX}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20"
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
