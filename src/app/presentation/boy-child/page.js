"use client";
import { useState } from "react";
import { Presentation, Download } from "lucide-react";

export default function BoyChildPPTX() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("");

  const generatePPTX = async () => {
    setIsGenerating(true);
    setStatus("Initializing engine...");
    try {
      const pptxgen = (await import("pptxgenjs")).default;
      const pres = new pptxgen();

      setStatus("Configuring Master Layout...");
      pres.layout = "LAYOUT_16x9"; // 13.33 x 7.5 inches

      const bg_dark = "111827"; // Deep Navy
      const text_light = "FFFFFF"; // Stark White
      const accent_gold = "F59E0B"; // Amber Gold
      const text_gray = "9CA3AF"; // Cool Gray

      // ==========================================
      // DEFINE MASTER SLIDE (PREVENTS MOBILE CRASH)
      // ==========================================
      pres.defineSlideMaster({
        title: "MASTER_SLIDE",
        background: { color: bg_dark },
        objects: [
          // Gold Header Bar
          { rect: { x: 0, y: 0, w: "100%", h: 0.15, fill: { color: accent_gold } } },
          // Footer Text
          { text: { text: "Mayowa Olaoluwa // The Boy Child Crisis", options: { x: 0.5, y: 7.1, w: 12, h: 0.3, fontSize: 10, color: text_gray, fontFace: "Arial" } } }
        ]
      });

      setStatus("Building 14 Slides...");

      // ==========================================
      // SLIDE 1: TITLE
      // ==========================================
      let s1 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s1.addText("THE BOY CHILD AND THE CRISIS OF IDENTITY", {
        x: 1.0, y: 2.5, w: 11.33, h: 1.5,
        fontSize: 44, bold: true, color: text_light, fontFace: "Arial", align: "center"
      });
      s1.addText("BETWEEN EXPECTATIONS AND REALITY", {
        x: 1.0, y: 4.0, w: 11.33, h: 0.5,
        fontSize: 24, color: accent_gold, fontFace: "Arial", align: "center"
      });
      s1.addText("Presented by Mayowa Olaoluwa", {
        x: 1.0, y: 5.5, w: 11.33, h: 0.5,
        fontSize: 16, color: text_gray, fontFace: "Arial", align: "center"
      });

      // ==========================================
      // SLIDE 2: INTRODUCTION
      // ==========================================
      let s2 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s2.addText("INTRODUCTION", { x: 1.0, y: 0.8, w: 11.33, h: 0.8, fontSize: 32, bold: true, color: accent_gold, fontFace: "Arial" });
      s2.addText(
        "The crisis of identity among boys is one of the most overlooked social issues of our time.\n\nIt is not simply about confusion over who they are; it is also about the struggle between who they naturally are and who society expects them to be.\n\nAcross many societies, boys are expected to be strong, brave, responsible, and independent. These expectations are not inherently wrong.",
        { x: 1.0, y: 2.0, w: 11.33, h: 4.5, fontSize: 22, color: text_light, fontFace: "Georgia", lineSpacing: 32 }
      );

      // ==========================================
      // SLIDE 3: THE SEED METAPHOR
      // ==========================================
      let s3 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s3.addText("THE SEED METAPHOR", { x: 1.0, y: 0.8, w: 11.33, h: 0.8, fontSize: 32, bold: true, color: accent_gold, fontFace: "Arial" });
      s3.addText(
        "A popular saying goes, 'A girl is raised while a boy grows up on his own.'\n\nHaving a boy child and leaving him to fend for himself is like planting a seed and expecting it to grow into a healthy tree without water, sunlight, or care.\n\nSuch a boy may lose sight of who he truly is because no one walked him through the journey of understanding himself.",
        { x: 1.0, y: 2.0, w: 11.33, h: 4.5, fontSize: 22, color: text_light, fontFace: "Georgia", lineSpacing: 32 }
      );

      // ==========================================
      // SLIDE 4: WHAT IS IDENTITY?
      // ==========================================
      let s4 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s4.addText("WHAT IS IDENTITY?", { x: 1.0, y: 0.8, w: 11.33, h: 0.8, fontSize: 32, bold: true, color: accent_gold, fontFace: "Arial" });
      s4.addText(
        "Identity is a person's understanding of who they are, what they believe, where they belong, and what they stand for.\n\nFor boys, identity helps answer important questions such as:\n• What does it mean to be a man?\n• What are my responsibilities?\n• How do I handle emotions?\n• What kind of future do I want?\n• What values should guide my life?",
        { x: 1.0, y: 2.0, w: 11.33, h: 4.5, fontSize: 22, color: text_light, fontFace: "Georgia", lineSpacing: 32 }
      );

      // ==========================================
      // SLIDE 5: EXPECTATIONS VS SCRIPTS
      // ==========================================
      let s5 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s5.addText("EXPECTATIONS VS. CULTURAL SCRIPTS", { x: 1.0, y: 0.8, w: 11.33, h: 0.8, fontSize: 32, bold: true, color: accent_gold, fontFace: "Arial" });
      s5.addText(
        "An expectation is a responsibility or standard that helps an individual grow.\n\nFor example:\n• A man should be responsible.\n• A man should be dependable.\n• A man should be able to care for himself and others.\n\nThese are healthy expectations because they encourage maturity and accountability.",
        { x: 1.0, y: 2.0, w: 11.33, h: 4.5, fontSize: 22, color: text_light, fontFace: "Georgia", lineSpacing: 32 }
      );

      // ==========================================
      // SLIDE 6: UNWRITTEN RULES
      // ==========================================
      let s6 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s6.addText("THE UNWRITTEN RULES", { x: 1.0, y: 0.8, w: 11.33, h: 0.8, fontSize: 32, bold: true, color: accent_gold, fontFace: "Arial" });
      s6.addText(
        "A cultural script is an unwritten rule that tells a boy how he must behave to be accepted as a 'real man.'\n\nExamples include:\n• Men don't cry.\n• Men must always be strong.\n• Men must solve every problem alone.\n• Asking for help is weakness.\n• A man's value is determined by his financial success.",
        { x: 1.0, y: 2.0, w: 11.33, h: 4.5, fontSize: 22, color: text_light, fontFace: "Georgia", lineSpacing: 32 }
      );

      // ==========================================
      // SLIDE 7: THE CRISIS BEGINS
      // ==========================================
      let s7 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s7.addText("THE IDENTITY CRISIS BEGINS", { x: 1.0, y: 0.8, w: 11.33, h: 0.8, fontSize: 32, bold: true, color: accent_gold, fontFace: "Arial" });
      s7.addText(
        "A boy enters life with emotions, fears, dreams, weaknesses, and strengths. However, as he grows, he begins to receive messages about what is acceptable and what is not.\n\nHe learns that certain emotions should be hidden. He learns that vulnerability may attract ridicule. He learns that failure is unacceptable.\n\nAs a result, many boys begin to suppress parts of themselves in order to fit society's definition of masculinity.",
        { x: 1.0, y: 2.0, w: 11.33, h: 4.5, fontSize: 22, color: text_light, fontFace: "Georgia", lineSpacing: 32 }
      );

      // ==========================================
      // SLIDE 8: PERFORMING MANHOOD
      // ==========================================
      let s8 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s8.addText("PERFORMING MANHOOD", { x: 1.0, y: 0.8, w: 11.33, h: 0.8, fontSize: 32, bold: true, color: accent_gold, fontFace: "Arial" });
      s8.addText(
        "The crisis is born when a boy starts performing manhood rather than understanding himself.\n\nToday, many boys find themselves caught between expectations and reality. Society tells them to be strong, independent, and successful, yet many have never been taught emotional intelligence, healthy masculinity, conflict resolution, self-worth, or purpose.",
        { x: 1.0, y: 2.0, w: 11.33, h: 4.5, fontSize: 22, color: text_light, fontFace: "Georgia", lineSpacing: 32 }
      );

      // ==========================================
      // SLIDE 9: THE COST
      // ==========================================
      let s9 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s9.addText("THE COST OF UNDEFINED EXPECTATIONS", { x: 1.0, y: 0.8, w: 11.33, h: 0.8, fontSize: 32, bold: true, color: accent_gold, fontFace: "Arial" });
      s9.addText(
        "Many men today are carrying burdens they never consciously chose.\n\n• EDUCATION (UNESCO): Millions of boys worldwide are out of school, increasingly at risk of dropping out or underperforming academically.\n\n• MENTAL HEALTH (WHO): Suicide remains one of the leading causes of death among young people globally, with men dying by suicide at significantly higher rates than women.",
        { x: 1.0, y: 2.0, w: 11.33, h: 4.5, fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 30 }
      );

      // ==========================================
      // SLIDE 10: CONTRIBUTING FACTORS
      // ==========================================
      let s10 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s10.addText("WHAT CONTRIBUTES TO THE CRISIS?", { x: 1.0, y: 0.8, w: 11.33, h: 0.8, fontSize: 32, bold: true, color: accent_gold, fontFace: "Arial" });
      s10.addText(
        "1. Absence of Mentorship: Growing up without positive male role models.\n2. Emotional Neglect: Taught to suppress emotions rather than manage them.\n3. Social Media Influence: Learning manhood from influencers rather than mentors.\n4. Academic and Economic Pressure: Judged by provision rather than character.\n5. Lack of Safe Spaces: Few environments allow boys to discuss fears without ridicule.",
        { x: 1.0, y: 2.0, w: 11.33, h: 4.5, fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 30 }
      );

      // ==========================================
      // SLIDE 11: RE-DEFINING MASCULINITY
      // ==========================================
      let s11 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s11.addText("RE-DEFINING MASCULINITY", { x: 1.0, y: 0.8, w: 11.33, h: 0.8, fontSize: 32, bold: true, color: accent_gold, fontFace: "Arial" });
      s11.addText(
        "The solution is to separate healthy expectations from unhealthy cultural pressures.\n\n• A strong man is not one who never cries; a strong man is one who can face reality honestly.\n• A responsible man is not one who carries every burden alone; a responsible man is one who knows when to seek help.\n• A successful man is not defined only by money; a successful man is defined by character, purpose, integrity, and positive impact.",
        { x: 1.0, y: 2.0, w: 11.33, h: 4.5, fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 30 }
      );

      // ==========================================
      // SLIDE 12: POSSIBLE SOLUTIONS
      // ==========================================
      let s12 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s12.addText("POSSIBLE SOLUTIONS", { x: 1.0, y: 0.8, w: 11.33, h: 0.8, fontSize: 32, bold: true, color: accent_gold, fontFace: "Arial" });
      s12.addText(
        "1. Intentional Parenting: Actively teach values, discipline, and emotional intelligence.\n2. Mentorship Programmes: Connect boys with positive male mentors.\n3. Mental Health Awareness: Encourage boys to seek help when struggling.\n4. Positive Models of Masculinity: Strength should include compassion and self-control.\n5. Educational Support: Create systems that support both boys and girls.",
        { x: 1.0, y: 2.0, w: 11.33, h: 4.5, fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 30 }
      );

      // ==========================================
      // SLIDE 13: CONCLUSION
      // ==========================================
      let s13 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s13.addText("CONCLUSION", { x: 1.0, y: 0.8, w: 11.33, h: 0.8, fontSize: 32, bold: true, color: accent_gold, fontFace: "Arial" });
      s13.addText(
        "Every responsible man was once a boy who received guidance, correction, encouragement, and support. When boys are ignored, society eventually deals with the consequences.\n\nThe challenge for this generation is not to reject manhood but to redefine it thoughtfully—to keep what builds character and discard what destroys authenticity.",
        { x: 1.0, y: 2.0, w: 11.33, h: 4.5, fontSize: 22, color: text_light, fontFace: "Georgia", lineSpacing: 32 }
      );

      // ==========================================
      // SLIDE 14: CLOSING STATEMENT
      // ==========================================
      let s14 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s14.background = { color: bg_dark };
      s14.addText(
        "\"The greatest challenge facing many boys today is not becoming a man; it is discovering what being a man truly means beyond the voices of culture, tradition, and expectation.\"",
        { x: 1.5, y: 2.5, w: 10.33, h: 2.5, fontSize: 28, italic: true, color: text_light, fontFace: "Georgia", align: "center", lineSpacing: 40 }
      );
      s14.addText("Every man society celebrates was once a boy who was guided.", {
        x: 1.0, y: 5.5, w: 11.33, h: 0.5, fontSize: 18, bold: true, color: accent_gold, fontFace: "Arial", align: "center"
      });

      setStatus("Finalizing Binary...");
      
      // FORCE PPTX MIME TYPE TO PREVENT ANDROID AUTO-EXTRACTION
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
      alert("Error: " + error.message);
      setStatus("Failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white p-10 text-center rounded-3xl shadow-2xl border-t-8 border-amber-500">
        <Presentation size={48} className="text-amber-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Mayowa Olaoluwa</h1>
        <p className="text-slate-500 text-xs font-mono uppercase mb-6">PPTX Generator</p>
        
        {status && <p className="text-[10px] font-mono text-amber-600 mb-4 italic">{status}</p>}

        <button
          onClick={generatePPTX}
          disabled={isGenerating}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all"
        >
          {isGenerating ? "Processing..." : "Download PPTX"}
        </button>
      </div>
    </div>
  );
}
