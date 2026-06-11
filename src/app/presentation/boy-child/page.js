"use client";
import { useState } from "react";
import { Presentation, Download } from "lucide-react";

export default function BoyChildPPTX() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("");

  const generatePPTX = async () => {
    setIsGenerating(true);
    setStatus("Initializing...");
    try {
      const pptxgen = (await import("pptxgenjs")).default;
      const pres = new pptxgen();

      pres.layout = "LAYOUT_16x9";

      const bg_dark = "111827";
      const text_light = "FFFFFF";
      const accent_gold = "F59E0B";

      // SLIDE 1
      let s1 = pres.addSlide();
      s1.background = { color: bg_dark };
      s1.addText("THE BOY CHILD AND THE CRISIS OF IDENTITY", { x:1, y:2, w:11.3, fontSize:40, bold:true, color:text_light, align:"center" });
      s1.addText("Presented by Mayowa Olaoluwa", { x:1, y:5, w:11.3, fontSize:18, color:accent_gold, align:"center" });

      // SLIDE 2
      let s2 = pres.addSlide();
      s2.background = { color: bg_dark };
      s2.addText("THE OVERLOOKED CRISIS", { x:1, y:1, fontSize:32, bold:true, color:accent_gold });
      s2.addText("It is a struggle between who they naturally are and who society expects them to be.", { x:1, y:2.5, w:11, fontSize:24, color:text_light });

      // SLIDE 3
      let s3 = pres.addSlide();
      s3.background = { color: bg_dark };
      s3.addText("THE SEED METAPHOR", { x:1, y:1, fontSize:32, bold:true, color:accent_gold });
      s3.addText("Leaving a boy to fend for himself is like planting a seed without water or care.", { x:1, y:2.5, w:11, fontSize:24, color:text_light });

      // SLIDE 4
      let s4 = pres.addSlide();
      s4.background = { color: bg_dark };
      s4.addText("EXPECTATIONS VS. SCRIPTS", { x:1, y:1, fontSize:32, bold:true, color:accent_gold });
      s4.addText("HEALTHY: Responsibility, Dependability\nSCRIPTS: Men don't cry, Solve alone", { x:1, y:2.5, w:11, fontSize:24, color:text_light });

      // SLIDE 5
      let s5 = pres.addSlide();
      s5.background = { color: bg_dark };
      s5.addText("THE PATH FORWARD", { x:1, y:1, fontSize:32, bold:true, color:accent_gold });
      s5.addText("1. Intentional Parenting\n2. Mentorship\n3. Mental Health Awareness", { x:1, y:2.5, w:11, fontSize:24, color:text_light });

      setStatus("Finalizing Binary...");
      
      // FORCE PPTX MIME TYPE TO PREVENT ANDROID AUTO-EXTRACTION
      const blob = await pres.write("blob");
      const pptxFile = new Blob([blob], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });
      
      const url = window.URL.createObjectURL(pptxFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Boy_Child_Crisis_Presentation.pptx";
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
