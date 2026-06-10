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
      // Dynamic import to prevent Next.js SSR "window is not defined" error
      const pptxgen = (await import("pptxgenjs")).default;
      const pres = new pptxgen();

      setStatus("Configuring presentation layout...");
      pres.layout = "LAYOUT_16x9"; // Corrected layout string (16x9)

      // Define Color Palette
      const bg_dark = "111827"; // Deep Navy
      const text_light = "FFFFFF"; // Stark White
      const accent_gold = "F59E0B"; // Amber Gold
      const text_gray = "9CA3AF"; // Cool Gray

      setStatus("Building slides...");

      // SLIDE 1: TITLE SLIDE
      let slide1 = pres.addSlide();
      slide1.background = { color: bg_dark };
      slide1.addText("THE BOY CHILD AND THE CRISIS OF IDENTITY", {
        x: 1.0, y: 2.0, w: 11.3, h: 2.0,
        fontSize: 40, bold: true, color: text_light,
        fontFace: "Arial", align: "center"
      });
      slide1.addText("BETWEEN EXPECTATIONS AND REALITY", {
        x: 1.0, y: 4.0, w: 11.3, h: 0.5,
        fontSize: 20, color: accent_gold,
        fontFace: "Arial", align: "center"
      });
      slide1.addText("Presented by Mayowa Olaoluwa", {
        x: 1.0, y: 5.5, w: 11.3, h: 0.5,
        fontSize: 14, color: text_gray,
        fontFace: "Arial", align: "center"
      });

      // SLIDE 2: THE HOOK
      let slide2 = pres.addSlide();
      slide2.background = { color: bg_dark };
      slide2.addText("THE OVERLOOKED CRISIS", {
        x: 1.0, y: 1.0, w: 11.3, h: 1.0,
        fontSize: 32, bold: true, color: accent_gold,
        fontFace: "Arial"
      });
      slide2.addText(
        "The crisis of identity among boys is one of the most overlooked social issues of our time.\n\nIt is not simply about confusion over who they are; it is also about the struggle between who they naturally are and who society expects them to be.",
        {
          x: 1.0, y: 2.5, w: 11.3, h: 4.0,
          fontSize: 20, color: text_light,
          fontFace: "Arial", lineSpacing: 28
        }
      );

      // SLIDE 3: THE SEED METAPHOR
      let slide3 = pres.addSlide();
      slide3.background = { color: bg_dark };
      slide3.addText("THE SEED METAPHOR", {
        x: 1.0, y: 1.0, w: 11.3, h: 1.0,
        fontSize: 32, bold: true, color: accent_gold,
        fontFace: "Arial"
      });
      slide3.addText(
        "Having a boy child and leaving him to fend for himself is like planting a seed and expecting it to grow into a healthy tree without water, sunlight, or care.\n\nSuch a boy may lose sight of who he truly is because no one walked him through the journey of understanding himself.",
        {
          x: 1.0, y: 2.5, w: 11.3, h: 4.0,
          fontSize: 20, color: text_light,
          fontFace: "Arial", lineSpacing: 28
        }
      );

      // SLIDE 4: THE 5 QUESTIONS
      let slide4 = pres.addSlide();
      slide4.background = { color: bg_dark };
      slide4.addText("CORE QUESTIONS OF IDENTITY", {
        x: 1.0, y: 1.0, w: 11.3, h: 1.0,
        fontSize: 32, bold: true, color: accent_gold,
        fontFace: "Arial"
      });
      slide4.addText(
        "- What does it mean to be a man?\n- What are my responsibilities?\n- How do I handle emotions?\n- What kind of future do I want?\n- What values should guide my life?",
        {
          x: 1.0, y: 2.5, w: 11.3, h: 4.0,
          fontSize: 22, color: text_light,
          fontFace: "Arial", lineSpacing: 32
        }
      );

      // SLIDE 5: EXPECTATIONS VS SCRIPTS
      let slide5 = pres.addSlide();
      slide5.background = { color: bg_dark };
      slide5.addText("EXPECTATIONS VS. CULTURAL SCRIPTS", {
        x: 1.0, y: 1.0, w: 11.3, h: 1.0,
        fontSize: 32, bold: true, color: accent_gold,
        fontFace: "Arial"
      });
      slide5.addText("HEALTHY EXPECTATIONS\n\n- A man should be responsible.\n- A man should be dependable.\n- A man should care for himself & others.", {
        x: 1.0, y: 2.5, w: 5.3, h: 4.0,
        fontSize: 16, color: text_light,
        fontFace: "Arial", fill: { color: "1F2937" },
        margin: [20, 20, 20, 20]
      });
      slide5.addText("CULTURAL SCRIPTS\n\n- Men don't cry.\n- Men must always be strong.\n- Solve every problem alone.\n- Asking for help is weakness.", {
        x: 7.0, y: 2.5, w: 5.3, h: 4.0,
        fontSize: 16, color: text_light,
        fontFace: "Arial", fill: { color: "991B1B" },
        margin: [20, 20, 20, 20]
      });

      // SLIDE 6: THE COST (STATS)
      let slide6 = pres.addSlide();
      slide6.background = { color: bg_dark };
      slide6.addText("THE COST OF UNDEFINED EXPECTATIONS", {
        x: 1.0, y: 1.0, w: 11.3, h: 1.0,
        fontSize: 32, bold: true, color: accent_gold,
        fontFace: "Arial"
      });
      slide6.addText("EDUCATION (UNESCO)\n\nMillions of boys worldwide are out of school, increasingly at risk of dropping out or underperforming academically.", {
        x: 1.0, y: 2.5, w: 5.3, h: 4.0,
        fontSize: 16, color: text_light,
        fontFace: "Arial", fill: { color: "1F2937" },
        margin: [20, 20, 20, 20]
      });
      slide6.addText("MENTAL HEALTH (WHO)\n\nSuicide remains a leading cause of death. Men die by suicide at significantly higher rates than women globally.", {
        x: 7.0, y: 2.5, w: 5.3, h: 4.0,
        fontSize: 16, color: text_light,
        fontFace: "Arial", fill: { color: "1F2937" },
        margin: [20, 20, 20, 20]
      });

      // SLIDE 7: PATH FORWARD
      let slide7 = pres.addSlide();
      slide7.background = { color: bg_dark };
      slide7.addText("THE PATH FORWARD", {
        x: 1.0, y: 1.0, w: 11.3, h: 1.0,
        fontSize: 32, bold: true, color: accent_gold,
        fontFace: "Arial"
      });
      slide7.addText(
        "1. Intentional Parenting: Teach values, discipline, and emotional intelligence.\n2. Mentorship Programmes: Connect boys with positive male mentors.\n3. Mental Health Awareness: Encourage boys to seek help without shame.\n4. Redefining Strength: Include compassion, responsibility, and self-control.",
        {
          x: 1.0, y: 2.5, w: 11.3, h: 4.0,
          fontSize: 18, color: text_light,
          fontFace: "Arial", lineSpacing: 28
        }
      );

      // SLIDE 8: CLOSING QUOTE
      let slide8 = pres.addSlide();
      slide8.background = { color: bg_dark };
      slide8.addText(
        "\"The greatest challenge facing many boys today is not becoming a man; it is discovering what being a man truly means beyond the voices of culture, tradition, and expectation.\"",
        {
          x: 1.5, y: 2.0, w: 10.3, h: 3.0,
          fontSize: 24, italic: true, color: text_light,
          fontFace: "Georgia", align: "center", lineSpacing: 36
        }
      );
      slide8.addText("- Mayowa Olaoluwa", {
        x: 1.0, y: 5.5, w: 11.3, h: 0.5,
        fontSize: 16, bold: true, color: accent_gold,
        fontFace: "Arial", align: "center"
      });

      setStatus("Compiling PowerPoint Binary...");
      
      // EXPLICIT MOBILE BLOB DOWNLOAD MECHANISM
      const blob = await pres.write("blob");
      
      setStatus("Triggering download...");
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "The_Boy_Child_Crisis_Mayowa_Olaoluwa.pptx";
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setStatus("Download initiated.");
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
        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-4">The Boy Child Crisis</p>

        {status && (
          <p className="text-[10px] font-mono text-amber-600 mb-6 bg-amber-50 p-2 rounded border border-amber-200">
            &gt; {status}
          </p>
        )}

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
