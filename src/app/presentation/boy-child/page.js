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
      pres.layout = "LAYOUT_16x9"; // Force A4 Widescreen (13.33 x 7.5 inches)

      const bg_dark = "111827"; // Deep Navy
      const text_light = "FFFFFF"; // Stark White
      const accent_gold = "F59E0B"; // Amber Gold
      const text_gray = "9CA3AF"; // Cool Gray

      // ==========================================
      // DEFINE MASTER SLIDE (FOR INTERNAL PAGES)
      // ==========================================
      pres.defineSlideMaster({
        title: "MASTER_SLIDE",
        background: { color: bg_dark },
        objects: [
          // Thin Gold Ribbon at the top
          { rect: { x: 0, y: 0, w: "100%", h: 0.15, fill: { color: accent_gold } } },
          // Professional Footer
          { text: { text: "Mayowa Olaoluwa // The Boy Child Crisis", options: { x: "5%", y: "92%", w: "90%", h: "5%", fontSize: 10, color: text_gray, fontFace: "Arial" } } }
        ]
      });

      setStatus("Mapping 14 Slides...");

      // ==========================================
      // SLIDE 1: COVER (Uses your custom image)
      // ==========================================
      let s1 = pres.addSlide();
      s1.background = { path: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781158637/blog_assets/mkdjjognzhihi6qkqkfe.jpg" };
      
      // Minimal elegant title overlay (placed in safe zone)
      s1.addText("THE BOY CHILD AND THE CRISIS OF IDENTITY", {
        x: "5%", y: "20%", w: "90%", h: "20%",
        fontSize: 38, bold: true, color: text_light, fontFace: "Arial", align: "center"
      });
      s1.addText("BETWEEN EXPECTATIONS AND REALITY", {
        x: "5%", y: "38%", w: "90%", h: "10%",
        fontSize: 20, color: accent_gold, fontFace: "Arial", align: "center"
      });
      s1.addText("Presented by Mayowa Olaoluwa", {
        x: "5%", y: "80%", w: "90%", h: "10%",
        fontSize: 14, color: text_light, fontFace: "Arial", align: "center"
      });

      // ==========================================
      // SLIDE 2: INTRODUCTION
      // ==========================================
      let s2 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s2.addText("INTRODUCTION", { x: "10%", y: "8%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s2.addText(
        "The crisis of identity among boys is one of the most overlooked social issues of our time.\n\nIt is not simply about confusion over who they are; it is also about the struggle between who they naturally are and who society expects them to be.\n\nThis disconnect leaves many young men struggling silently with confusion, loneliness, anger, and low self-esteem.",
        { x: "10%", y: "22%", w: "80%", h: "60%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 28 }
      );

      // ==========================================
      // SLIDE 3: EXPECTATIONS VS REALITY
      // ==========================================
      let s3 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s3.addText("THE STRUGGLE", { x: "10%", y: "8%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s3.addText(
        "Across many societies, boys are expected to be strong, brave, responsible, and independent. These expectations are not inherently wrong.\n\nIn fact, qualities such as responsibility, leadership, courage, discipline, and hard work are necessary for personal growth and societal development.\n\nHowever, over time, many cultures have attached additional unwritten rules to manhood.",
        { x: "10%", y: "22%", w: "80%", h: "60%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 28 }
      );

      // ==========================================
      // SLIDE 4: THE SEED METAPHOR
      // ==========================================
      let s4 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s4.addText("THE SEED METAPHOR", { x: "10%", y: "8%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s4.addText(
        "A popular saying goes, 'A girl is raised while a boy grows up on his own.'\n\nHaving a boy child and leaving him to fend for himself is like planting a seed and expecting it to grow into a healthy tree without water, sunlight, or care.\n\nSuch a boy may lose sight of who he truly is because no one walked him through the journey of understanding himself.",
        { x: "10%", y: "22%", w: "80%", h: "60%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 28 }
      );

      // ==========================================
      // SLIDE 5: WHAT IS IDENTITY?
      // ==========================================
      let s5 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s5.addText("WHAT IS IDENTITY?", { x: "10%", y: "8%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s5.addText(
        "Identity is a person's understanding of who they are, what they believe, where they belong, and what they stand for.\n\nFor boys, identity helps answer important questions such as:\n• What does it mean to be a man?\n• What are my responsibilities?\n• How do I handle emotions?\n• What kind of future do I want?\n• What values should guide my life?",
        { x: "10%", y: "22%", w: "80%", h: "60%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 28 }
      );

      // ==========================================
      // SLIDE 6: EXPECTATIONS VS SCRIPTS
      // ==========================================
      let s6 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s6.addText("EXPECTATIONS VS. CULTURAL SCRIPTS", { x: "10%", y: "8%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s6.addText(
        "An expectation is a responsibility or standard that helps an individual grow.\n\nFor example:\n• A man should be responsible.\n• A man should be dependable.\n• A man should be able to care for himself and others.\n\nThese are healthy expectations because they encourage maturity and accountability.",
        { x: "10%", y: "22%", w: "80%", h: "60%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 28 }
      );

      // ==========================================
      // SLIDE 7: CULTURAL SCRIPTS (UNWRITTEN RULES)
      // ==========================================
      let s7 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s7.addText("THE UNWRITTEN RULES", { x: "10%", y: "8%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s7.addText(
        "A cultural script is an unwritten rule that tells a boy how he must behave to be accepted as a 'real man.'\n\nExamples include:\n• Men don't cry.\n• Men must always be strong.\n• Men must solve every problem alone.\n• Asking for help is weakness.\n• A man's value is determined by his financial success.",
        { x: "10%", y: "22%", w: "80%", h: "60%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 28 }
      );

      // ==========================================
      // SLIDE 8: THE IDENTITY CRISIS BEGINS
      // ==========================================
      let s8 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s8.addText("THE CRISIS BEGINS", { x: "10%", y: "8%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s8.addText(
        "A boy enters life with emotions, fears, dreams, weaknesses, and strengths. However, as he grows, he begins to receive messages about what is acceptable and what is not.\n\nHe learns that certain emotions should be hidden. He learns that vulnerability may attract ridicule. He learns that failure is unacceptable. He learns that his worth may be measured by achievement.",
        { x: "10%", y: "22%", w: "80%", h: "60%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 28 }
      );

      // ==========================================
      // SLIDE 9: PERFORMING MANHOOD
      // ==========================================
      let s9 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s9.addText("PERFORMING MANHOOD", { x: "10%", y: "8%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s9.addText(
        "The crisis is born when a boy starts performing manhood rather than understanding himself.\n\nToday, many boys find themselves caught between expectations and reality. Society tells them to be strong, independent, and successful, yet many have never been taught emotional intelligence, healthy masculinity, conflict resolution, or purpose.",
        { x: "10%", y: "22%", w: "80%", h: "60%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 28 }
      );

      // ==========================================
      // SLIDE 10: THE COST (STATS)
      // ==========================================
      let s10 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s10.addText("THE COST OF UNDEFINED EXPECTATIONS", { x: "10%", y: "8%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s10.addText(
        "Because these expectations were inherited rather than examined, many men feel trapped.\n\n• EDUCATION (UNESCO): Millions of boys worldwide are out of school, and boys in many countries are increasingly at risk of dropping out academically.\n\n• MENTAL HEALTH (WHO): Suicide remains one of the leading causes of death. Men in many countries die by suicide at significantly higher rates than women.",
        { x: "10%", y: "22%", w: "80%", h: "60%", fontSize: 18, color: text_light, fontFace: "Georgia", lineSpacing: 28 }
      );

      // ==========================================
      // SLIDE 11: CONTRIBUTING FACTORS
      // ==========================================
      let s11 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s11.addText("CONTRIBUTING FACTORS", { x: "10%", y: "8%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s11.addText(
        "1. Absence of Mentorship: Growing up without positive male role models.\n2. Emotional Neglect: Taught to suppress emotions rather than manage them.\n3. Social Media Influence: Learning about manhood from online influencers.\n4. Economic Pressure: Judged by what they can provide rather than who they are.\n5. Lack of Safe Spaces: Few environments allow discussion of fears without ridicule.",
        { x: "10%", y: "22%", w: "80%", h: "60%", fontSize: 18, color: text_light, fontFace: "Georgia", lineSpacing: 28 }
      );

      // ==========================================
      // SLIDE 12: RE-DEFINING MASCULINITY
      // ==========================================
      let s12 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s12.addText("RE-DEFINING MASCULINITY", { x: "10%", y: "8%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s12.addText(
        "The solution is to separate healthy expectations from unhealthy cultural pressures.\n\n• A strong man is not one who never cries; a strong man is one who can face reality honestly.\n• A responsible man is not one who carries every burden alone; a responsible man is one who knows when to seek help.\n• A successful man is defined by character, purpose, integrity, and positive impact.",
        { x: "10%", y: "22%", w: "80%", h: "60%", fontSize: 18, color: text_light, fontFace: "Georgia", lineSpacing: 28 }
      );

      // ==========================================
      // SLIDE 13: POSSIBLE SOLUTIONS
      // ==========================================
      let s13 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s13.addText("POSSIBLE SOLUTIONS", { x: "10%", y: "8%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s13.addText(
        "1. Intentional Parenting: Teach boys values, discipline, and emotional intelligence.\n2. Mentorship Programmes: Connect boys with positive male mentors.\n3. Mental Health Awareness: Encourage boys to seek help when struggling.\n4. Positive Models: Include compassion, responsibility, and self-control.\n5. Educational Support: Create systems that support both boys and girls.",
        { x: "10%", y: "22%", w: "80%", h: "60%", fontSize: 18, color: text_light, fontFace: "Georgia", lineSpacing: 28 }
      );

      // ==========================================
      // SLIDE 14: CONCLUSION & QUOTE
      // ==========================================
      let s14 = pres.addSlide({ masterName: "MASTER_SLIDE" });
      s14.addText("THE ARCHITECT'S CONCLUSION", { x: "10%", y: "8%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s14.addText(
        "The challenge for this generation is not to reject manhood but to redefine it thoughtfully—to keep what builds character and discard what destroys authenticity.\n\n\"The greatest challenge facing many boys today is not becoming a man; it is discovering what being a man truly means beyond the voices of culture, tradition, and expectation.\"",
        { x: "10%", y: "22%", w: "80%", h: "60%", fontSize: 18, italic: true, color: text_light, fontFace: "Georgia", lineSpacing: 30 }
      );

      setStatus("Compiling PowerPoint Binary...");
      
      // EXPLICIT MOBILE BLOB DOWNLOAD MECHANISM
      const blob = await pres.write("blob");
      const pptxFile = new Blob([blob], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });
      
      setStatus("Triggering download...");
      const url = window.URL.createObjectURL(pptxFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = "The_Boy_Child_Crisis_Mayowa_Olaoluwa.pptx";
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
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
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white p-10 text-center rounded-3xl shadow-2xl border-t-8 border-amber-500">
        <Presentation size={48} className="text-amber-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Mayowa Olaoluwa</h1>
        <p className="text-slate-500 text-xs font-mono uppercase mb-6">The Boy Child Crisis</p>
        
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
