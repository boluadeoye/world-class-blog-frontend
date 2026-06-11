"use client";
import { useState } from "react";
import { Presentation, Download, Loader2, ShieldCheck } from "lucide-react";

export default function BoyChildPPTX() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("");

  const generatePPTX = async () => {
    setIsGenerating(true);
    setStatus("Initializing Absolute Precision Engine...");
    
    try {
      const pptxgen = (await import("pptxgenjs")).default;
      const pres = new pptxgen();
      pres.layout = "LAYOUT_16x9"; 

      // TITANIUM PALETTE
      const c_sky = "BAE6FD"; 
      const c_navy = "0F172A"; 
      const c_gold = "F59E0B"; 
      const c_white = "FFFFFF";
      const c_shadow = "7DD3FC";

      // HIGH-RES ASSETS
      const img_cover = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176355/blog_assets/nww3tbifsdqy9jjpbhip.jpg";
      const img_stressed = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176367/blog_assets/p2s6sairkhl8mzoyphok.jpg";
      const img_planting = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160420/blog_assets/rf05jemizu7lpzecnp8r.jpg";
      const img_hoodie = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160324/blog_assets/lkkmeo9qup7oxtebjksi.jpg";
      const img_muscles = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176364/blog_assets/y2ayshhjhrw6vjcbfkty.jpg";
      const img_bicycle = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160412/blog_assets/oyhpjyneacycgv777wav.jpg";
      const img_sunset = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176359/blog_assets/qwqs4s5bqhz9fkmxdq5a.jpg";

      // ==========================================
      // HELPER: THE FLAWLESS LAYOUT ENGINE
      // ==========================================
      const drawSlide = (slide, layout, img, title, points, slideNum) => {
        slide.background = { color: c_sky };
        
        // Layout Math (Perfect 50/50 Split with 5% Card Overlap)
        let imgX = layout === 'left' ? 0 : "50%";
        let cardX = layout === 'left' ? 45 : 7;
        let textX = layout === 'left' ? 49 : 11;

        // 1. True Full-Bleed Image (Zero Black Bars)
        slide.addImage({ path: img, x: imgX, y: 0, w: "50%", h: "100%", sizing: { type: "cover", w: "100%", h: "100%" } });

        // 2. The Shadow (Depth)
        slide.addShape(pres.ShapeType.rect, { x: `${cardX + 0.5}%`, y: "16%", w: "48%", h: "68%", fill: { color: c_shadow } });

        // 3. The Glass Card (Overlaps image by 5%)
        slide.addShape(pres.ShapeType.rect, { x: `${cardX}%`, y: "15%", w: "48%", h: "68%", fill: { color: c_white }, line: { color: c_navy, width: 1.5 } });

        // 4. Structural Anchor Line
        slide.addShape(pres.ShapeType.rect, { x: `${cardX}%`, y: "15%", w: "1.5%", h: "68%", fill: { color: c_navy } });

        // 5. Title (Strict Boundaries)
        slide.addText(title, { x: `${textX}%`, y: "20%", w: "42%", h: "12%", fontSize: 22, bold: true, color: c_navy, fontFace: "Arial", charSpacing: 1, valign: "top", animation: { type: 'appear' } });

        // 6. Body Text (Zero-Bleed Math)
        let currentY = 35; 
        let pointHeight = points.length > 3 ? 11 : 14; // Dynamically shrink height box if many points
        
        points.forEach(pt => {
          slide.addText(pt, { 
            x: `${textX}%`, 
            y: `${currentY}%`, 
            w: "42%", 
            h: `${pointHeight}%`, 
            fontSize: 15, 
            color: c_navy, 
            fontFace: "Georgia", 
            lineSpacing: 20, 
            valign: "top", // CRITICAL: Forces text to top of box, preventing bottom bleed
            animation: { type: 'appear' } 
          });
          currentY += (pointHeight + 1); // Increment Y perfectly
        });

        // 7. Official Metadata
        slide.addText("THE BOY CHILD CRISIS // 2024", { x: "70%", y: "4%", w: "25%", h: "5%", fontSize: 8, color: c_navy, align: "right", fontFace: "Arial", bold: true });
        slide.addText(`${slideNum < 10 ? '0'+slideNum : slideNum} / 15`, { x: "85%", y: "90%", w: "10%", h: "5%", fontSize: 10, color: c_navy, bold: true, align: "right", fontFace: "Arial" });
      };

      // ==========================================
      // SLIDE 1: THE POWER COVER
      // ==========================================
      let s1 = pres.addSlide();
      s1.addImage({ path: img_cover, x: 0, y: 0, w: "100%", h: "100%", sizing: { type: "cover", w: "100%", h: "100%" } });
      s1.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: c_navy, transparency: 40 } }); // Dark Wash
      
      s1.addText("THE BOY CHILD", { x: "10%", y: "25%", w: "80%", h: "15%", fontSize: 54, bold: true, color: c_white, fontFace: "Arial", charSpacing: 3, animation: { type: 'appear' } });
      s1.addText("AND THE CRISIS OF IDENTITY", { x: "10%", y: "40%", w: "80%", h: "10%", fontSize: 24, color: c_gold, fontFace: "Arial", charSpacing: 2, bold: true, animation: { type: 'appear' } });
      
      // THE POWER BLOCK (Presenters)
      s1.addShape(pres.ShapeType.rect, { x: "10%", y: "65%", w: "80%", h: "20%", fill: { color: c_gold } });
      s1.addText("OFFICIAL PRESENTATION BY:", { x: "12%", y: "68%", w: "76%", h: "5%", fontSize: 12, bold: true, color: c_navy, fontFace: "Arial", tracking: 2 });
      s1.addText("AGBEMEHO FAVOUR OKEOGHENE  //  OLAOLUWA MAYOWA DEBORAH", { x: "12%", y: "74%", w: "76%", h: "8%", fontSize: 18, bold: true, color: c_navy, fontFace: "Arial" });

      // ==========================================
      // SLIDES 2-14: THE FLAWLESS CONTENT LOOP
      // ==========================================
      
      drawSlide(pres.addSlide(), 'left', img_stressed, "EXECUTIVE SUMMARY", [
        "The crisis of identity among boys is one of the most overlooked social issues of our time.",
        "It is not simply about confusion over who they are; it is also about the struggle between who they naturally are and who society expects them to be."
      ], 2);

      drawSlide(pres.addSlide(), 'right', img_muscles, "THE STRUGGLE", [
        "Across many societies, boys are expected to be strong, brave, responsible, and independent.",
        "Qualities such as leadership, courage, and discipline are necessary for personal growth.",
        "However, over time, many cultures have attached additional unwritten, toxic rules to manhood."
      ], 3);

      drawSlide(pres.addSlide(), 'left', img_planting, "THE SEED METAPHOR", [
        "\"A girl is raised while a boy grows up on his own.\"",
        "Having a boy child and leaving him to fend for himself is like planting a seed and expecting it to grow into a healthy tree without water or sunlight.",
        "Such a boy may lose sight of who he truly is because no one walked him through the journey."
      ], 4);

      drawSlide(pres.addSlide(), 'right', img_hoodie, "WHAT IS IDENTITY?", [
        "Identity is a person's understanding of who they are, what they believe, where they belong, and what they stand for.",
        "For boys, identity helps answer important questions:",
        "• What does it mean to be a man?",
        "• How do I handle emotions?",
        "• What values should guide my life?"
      ], 5);

      drawSlide(pres.addSlide(), 'left', img_bicycle, "EXPECTATIONS VS. SCRIPTS", [
        "An expectation is a responsibility or standard that helps an individual grow.",
        "• A man should be responsible and dependable.",
        "These are healthy expectations because they encourage maturity.",
        "A cultural script, however, is an unwritten rule that tells a boy how he must behave to be accepted as a 'real man'."
      ], 6);

      drawSlide(pres.addSlide(), 'right', img_stressed, "THE UNWRITTEN RULES", [
        "Society enforces scripts that damage emotional intelligence:",
        "• Men don't cry.",
        "• Men must always be strong.",
        "• Men must solve every problem alone.",
        "• Asking for help is a sign of weakness."
      ], 7);

      drawSlide(pres.addSlide(), 'left', img_hoodie, "THE CRISIS BEGINS", [
        "A boy enters life with emotions, fears, dreams, weaknesses, and strengths.",
        "As he grows, he learns that certain emotions should be hidden and that vulnerability attracts ridicule.",
        "As a result, many boys begin to suppress parts of themselves in order to fit society's definition of masculinity."
      ], 8);

      drawSlide(pres.addSlide(), 'right', img_muscles, "PERFORMING MANHOOD", [
        "The crisis is born when a boy starts performing manhood rather than understanding himself.",
        "Today, many boys find themselves caught between expectations and reality.",
        "Society demands success, yet many have never been taught emotional intelligence, conflict resolution, or self-worth."
      ], 9);

      drawSlide(pres.addSlide(), 'left', img_stressed, "CONTRIBUTING FACTORS", [
        "1. Absence of Mentorship: Growing up without positive male role models.",
        "2. Emotional Neglect: Taught to suppress emotions.",
        "3. Social Media: Learning manhood from toxic influencers.",
        "4. Economic Pressure: Judged solely by provision."
      ], 10);

      drawSlide(pres.addSlide(), 'right', img_sunset, "THE COST OF NEGLECT", [
        "Many men today are carrying burdens they never consciously chose.",
        "EDUCATION: Millions of boys worldwide are out of school, increasingly at risk of dropping out.",
        "MENTAL HEALTH: Suicide remains a leading cause of death, with men dying at significantly higher rates than women."
      ], 11);

      // THE SLIDE THAT PREVIOUSLY BLED - NOW MATHEMATICALLY PERFECT
      drawSlide(pres.addSlide(), 'left', img_bicycle, "RE-DEFINING MASCULINITY", [
        "The solution is to separate healthy expectations from unhealthy cultural pressures.",
        "• A strong man is one who can face reality honestly.",
        "• A responsible man is one who knows when to seek help.",
        "• A successful man is defined by character, purpose, and integrity."
      ], 12);

      drawSlide(pres.addSlide(), 'right', img_planting, "POSSIBLE SOLUTIONS", [
        "1. Intentional Parenting: Teach values and emotional intelligence.",
        "2. Mentorship Programmes: Connect boys with positive mentors.",
        "3. Mental Health Awareness: Encourage seeking help.",
        "4. Educational Support: Create systems that support boys."
      ], 13);

      drawSlide(pres.addSlide(), 'left', img_sunset, "CONCLUSION", [
        "The crisis of identity among boys is often a crisis of inherited definitions.",
        "The challenge for this generation is not to reject manhood but to redefine it thoughtfully.",
        "We must keep what builds character and discard what destroys authenticity."
      ], 14);

      // ==========================================
      // SLIDE 15: THE CLOSING AUTHORITY
      // ==========================================
      let s15 = pres.addSlide();
      s15.background = { color: c_navy };
      s15.addShape(pres.ShapeType.rect, { x: "5%", y: "10%", w: "90%", h: "80%", line: { color: c_gold, width: 2 } });
      
      s15.addText(
        "\"The greatest challenge facing many boys today is not becoming a man; it is discovering what being a man truly means beyond the voices of culture, tradition, and expectation.\"",
        { x: "10%", y: "25%", w: "80%", h: "30%", fontSize: 24, italic: true, color: c_white, fontFace: "Georgia", align: "center", lineSpacing: 36, animation: { type: 'appear' } }
      );
      
      s15.addShape(pres.ShapeType.rect, { x: "30%", y: "65%", w: "40%", h: "10%", fill: { color: c_gold } });
      s15.addText("EVERY MAN SOCIETY CELEBRATES WAS ONCE A BOY WHO WAS GUIDED.", { x: "30%", y: "65%", w: "40%", h: "10%", fontSize: 12, bold: true, color: c_navy, fontFace: "Arial", align: "center" });
      
      s15.addText("15 / 15", { x: "85%", y: "90%", w: "10%", h: "5%", fontSize: 10, color: c_gold, bold: true, align: "right", fontFace: "Arial" });

      setStatus("Compiling Flawless Binary...");
      const blob = await pres.write("blob");
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "Official_BoyChild_Crisis_Perfected.pptx";
      a.click();
      setStatus("Success. Zero Defects.");
    } catch (e) {
      setStatus("Engine Error.");
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-12 rounded-[40px] text-center shadow-2xl relative overflow-hidden">
        {/* Cinematic Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-amber-500/20 blur-[80px] pointer-events-none"></div>
        
        <div className="mb-8 flex justify-center relative z-10">
          <div className="p-4 bg-amber-500/10 rounded-full border border-amber-500/30">
            <ShieldCheck size={48} className="text-amber-500" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-white mb-2 tracking-tighter relative z-10">ABSOLUTE PRECISION</h1>
        <p className="text-slate-400 text-xs font-mono tracking-[0.2em] mb-10 uppercase relative z-10">Zero-Bleed Architecture</p>
        
        <button 
          onClick={generatePPTX} 
          disabled={isGenerating}
          className="relative z-10 w-full py-5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)]"
        >
          {isGenerating ? <Loader2 className="animate-spin" /> : <Download size={20} />}
          {isGenerating ? "COMPILING..." : "DOWNLOAD PERFECT DECK"}
        </button>
        
        {status && <p className="mt-8 text-[10px] font-mono text-amber-500/80 tracking-widest uppercase relative z-10">{status}</p>}
      </div>
    </div>
  );
}
