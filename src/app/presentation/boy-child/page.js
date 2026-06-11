"use client";
import { useState } from "react";
import { Presentation, Download, Loader2, CheckCircle } from "lucide-react";

export default function BoyChildPPTX() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("");

  const generatePPTX = async () => {
    setIsGenerating(true);
    setStatus("Compiling Final 2026 Architecture...");
    
    try {
      const pptxgen = (await import("pptxgenjs")).default;
      const pres = new pptxgen();
      pres.layout = "LAYOUT_16x9"; 

      const c_sky = "BAE6FD"; 
      const c_navy = "0F172A"; 
      const c_gold = "F59E0B"; 
      const c_white = "FFFFFF";

      const assets = {
        cover: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176355/blog_assets/nww3tbifsdqy9jjpbhip.jpg",
        stressed: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176367/blog_assets/p2s6sairkhl8mzoyphok.jpg",
        planting: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160420/blog_assets/rf05jemizu7lpzecnp8r.jpg",
        hoodie: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160324/blog_assets/lkkmeo9qup7oxtebjksi.jpg",
        muscles: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176364/blog_assets/y2ayshhjhrw6vjcbfkty.jpg",
        bicycle: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160412/blog_assets/oyhpjyneacycgv777wav.jpg",
        sunset: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176359/blog_assets/qwqs4s5bqhz9fkmxdq5a.jpg"
      };

      // ==========================================
      // THE "BIGGER BOX" RENDERER (ZERO BLEED)
      // ==========================================
      const addBigBoxSlide = (title, bodyTextArray, imagePath, isLeft, slideNum) => {
        const slide = pres.addSlide();
        slide.background = { color: c_sky };

        // Image takes exactly half the screen
        const imgX = isLeft ? 0 : "50%";
        slide.addImage({ path: imagePath, x: imgX, y: 0, w: "50%", h: "100%", sizing: { type: "cover" } });

        // The Bigger Box (55% width, 90% height - overlaps image by 5%)
        const boxX = isLeft ? "40%" : "5%";
        slide.addShape(pres.ShapeType.rect, { x: boxX, y: "5%", w: "55%", h: "90%", fill: { color: c_white }, line: { color: c_navy, width: 2 } });
        
        // Accent Line
        slide.addShape(pres.ShapeType.rect, { x: boxX, y: "5%", w: "2%", h: "90%", fill: { color: c_navy } });

        // Text Coordinates (Inside the Bigger Box)
        const textX = isLeft ? "45%" : "10%";

        // Title
        slide.addText(title, { x: textX, y: "12%", w: "45%", h: "10%", fontSize: 28, bold: true, color: c_navy, fontFace: "Arial", charSpacing: 1 });

        // Body (Single Container, AutoFit enabled)
        slide.addText(bodyTextArray, { 
          x: textX, 
          y: "25%", 
          w: "45%", 
          h: "60%", // Massive height allowance
          fontSize: 16, 
          color: c_navy, 
          fontFace: "Georgia", 
          valign: "top",
          autoFit: true, // Guarantees no bleeding
          lineSpacing: 24
        });

        // 2026 Metadata
        slide.addText("THE BOY CHILD CRISIS // 2026", { x: textX, y: "88%", w: "30%", h: "5%", fontSize: 9, color: c_navy, bold: true, fontFace: "Arial" });
        slide.addText(`${slideNum} / 15`, { x: isLeft ? "85%" : "50%", y: "88%", w: "5%", h: "5%", fontSize: 10, color: c_navy, bold: true, align: "right", fontFace: "Arial" });
      };

      // ==========================================
      // SLIDE 1: THE PERFECT COVER
      // ==========================================
      const s1 = pres.addSlide();
      s1.addImage({ path: assets.cover, x: 0, y: 0, w: "100%", h: "100%", sizing: { type: "cover" } });
      s1.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: c_navy, transparency: 40 } });
      
      s1.addText("THE BOY CHILD", { x: "5%", y: "15%", w: "90%", h: "15%", fontSize: 60, bold: true, color: c_white, fontFace: "Arial", charSpacing: 2 });
      s1.addText("AND THE CRISIS OF IDENTITY", { x: "5%", y: "30%", w: "90%", h: "10%", fontSize: 28, color: c_gold, fontFace: "Arial", bold: true, charSpacing: 1 });
      
      // The Presenter Power Block (Massive & Clear)
      s1.addShape(pres.ShapeType.rect, { x: "5%", y: "55%", w: "60%", h: "35%", fill: { color: c_white }, line: { color: c_gold, width: 4 } });
      s1.addShape(pres.ShapeType.rect, { x: "5%", y: "55%", w: "60%", h: "8%", fill: { color: c_gold } });
      s1.addText("OFFICIAL PRESENTATION - 2026", { x: "7%", y: "55%", w: "56%", h: "8%", fontSize: 12, bold: true, color: c_navy, fontFace: "Arial", tracking: 1 });
      
      s1.addText([
        { text: "Agbemeho Favour Okeoghene\n", options: { fontSize: 22, bold: true, color: c_navy } },
        { text: "Sphere of influence; Boy Child\n\n", options: { fontSize: 14, italic: true, color: c_navy } },
        { text: "Olaoluwa Mayowa Deborah\n", options: { fontSize: 22, bold: true, color: c_navy } },
        { text: "Sphere of influence; Boy Child and Men", options: { fontSize: 14, italic: true, color: c_navy } }
      ], { x: "8%", y: "65%", w: "54%", h: "22%", fontFace: "Arial", valign: "top" });

      // ==========================================
      // CONTENT SLIDES (100% INTACT)
      // ==========================================
      
      addBigBoxSlide("INTRODUCTION", [
        { text: "The crisis of identity among boys is one of the most overlooked social issues of our time.\n\n" },
        { text: "It is not simply about confusion over who they are; it is also about the struggle between who they naturally are and who society expects them to be." }
      ], assets.stressed, true, "02");

      addBigBoxSlide("THE STRUGGLE", [
        { text: "Across many societies, boys are expected to be strong, brave, responsible, and independent. These expectations are not inherently wrong.\n\n" },
        { text: "In fact, qualities such as responsibility, leadership, courage, discipline, and hard work are necessary for personal growth and societal development.\n\n" },
        { text: "However, over time, many cultures have attached additional unwritten rules to manhood." }
      ], assets.muscles, false, "03");

      addBigBoxSlide("THE SEED METAPHOR", [
        { text: "\"A girl is raised while a boy grows up on his own.\"\n\n", options: { italic: true, bold: true } },
        { text: "Having a boy child and leaving him to fend for himself is like planting a seed and expecting it to grow into a healthy tree without water, sunlight, or care.\n\n" },
        { text: "Such a boy may lose sight of who he truly is because no one walked him through the journey of understanding himself." }
      ], assets.planting, true, "04");

      addBigBoxSlide("WHAT IS IDENTITY?", [
        { text: "Identity is a person's understanding of who they are, what they believe, where they belong, and what they stand for.\n\n" },
        { text: "For boys, identity helps answer important questions:\n", options: { bold: true } },
        { text: "• What does it mean to be a man?\n" },
        { text: "• What are my responsibilities?\n" },
        { text: "• How do I handle emotions?\n" },
        { text: "• What kind of future do I want?\n" },
        { text: "• What values should guide my life?" }
      ], assets.hoodie, false, "05");

      addBigBoxSlide("EXPECTATIONS VS. SCRIPTS", [
        { text: "An expectation is a responsibility or standard that helps an individual grow. For example:\n\n" },
        { text: "• A man should be responsible.\n" },
        { text: "• A man should be dependable.\n" },
        { text: "• A man should be able to care for himself and others.\n\n" },
        { text: "These are healthy expectations because they encourage maturity and accountability." }
      ], assets.bicycle, true, "06");

      addBigBoxSlide("THE UNWRITTEN RULES", [
        { text: "A cultural script is an unwritten rule that tells a boy how he must behave to be accepted as a 'real man.' Examples include:\n\n" },
        { text: "• Men don't cry.\n" },
        { text: "• Men must always be strong.\n" },
        { text: "• Men must solve every problem alone.\n" },
        { text: "• Asking for help is weakness.\n" },
        { text: "• A man's value is determined by his financial success." }
      ], assets.stressed, false, "07");

      addBigBoxSlide("THE CRISIS BEGINS", [
        { text: "A boy enters life with emotions, fears, dreams, weaknesses, and strengths. However, as he grows, he begins to receive messages about what is acceptable and what is not.\n\n" },
        { text: "He learns that certain emotions should be hidden. He learns that vulnerability may attract ridicule. He learns that failure is unacceptable.\n\n" },
        { text: "As a result, many boys begin to suppress parts of themselves in order to fit society's definition of masculinity." }
      ], assets.hoodie, true, "08");

      addBigBoxSlide("PERFORMING MANHOOD", [
        { text: "The crisis is born when a boy starts performing manhood rather than understanding himself.\n\n" },
        { text: "Today, many boys find themselves caught between expectations and reality.\n\n" },
        { text: "Society tells them to be strong, independent, and successful, yet many have never been taught emotional intelligence, healthy masculinity, conflict resolution, self-worth, or purpose." }
      ], assets.muscles, false, "09");

      addBigBoxSlide("CONTRIBUTING FACTORS", [
        { text: "1. Absence of Mentorship: Many boys grow up without positive male role models.\n\n" },
        { text: "2. Emotional Neglect: Taught to suppress emotions rather than manage them.\n\n" },
        { text: "3. Social Media Influence: Learning manhood from influencers rather than mentors.\n\n" },
        { text: "4. Economic Pressure: Judged by what they can provide rather than who they are.\n\n" },
        { text: "5. Lack of Safe Spaces: Few environments allow boys to discuss fears without ridicule." }
      ], assets.stressed, true, "10");

      addBigBoxSlide("THE COST OF EXPECTATIONS", [
        { text: "Many men today are carrying burdens they never consciously chose. Because these expectations were inherited rather than examined, many men feel trapped.\n\n" },
        { text: "• EDUCATION (UNESCO): Millions of boys worldwide are out of school, and boys in many countries are increasingly at risk of dropping out.\n\n" },
        { text: "• MENTAL HEALTH (WHO): Suicide remains a leading cause of death among young people globally, with men dying at significantly higher rates than women." }
      ], assets.sunset, false, "11");

      addBigBoxSlide("RE-DEFINING MASCULINITY", [
        { text: "The solution is to separate healthy expectations from unhealthy cultural pressures.\n\n" },
        { text: "• A strong man is one who can face reality honestly.\n\n" },
        { text: "• A responsible man is one who knows when to seek help.\n\n" },
        { text: "• A successful man is defined by character, purpose, and integrity." }
      ], assets.bicycle, true, "12");

      addBigBoxSlide("POSSIBLE SOLUTIONS", [
        { text: "1. Intentional Parenting: Teach boys values, discipline, and emotional intelligence.\n\n" },
        { text: "2. Mentorship Programmes: Connect boys with positive male mentors.\n\n" },
        { text: "3. Mental Health Awareness: Encourage boys to seek help when struggling.\n\n" },
        { text: "4. Positive Models: Strength should include compassion and self-control.\n\n" },
        { text: "5. Educational Support: Create systems that support both boys and girls." }
      ], assets.planting, false, "13");

      addBigBoxSlide("CONCLUSION", [
        { text: "The crisis of identity among boys is often a crisis of inherited definitions. Every responsible man was once a boy who received guidance and support.\n\n" },
        { text: "The challenge for this generation is not to reject manhood but to redefine it thoughtfully—to keep what builds character and discard what destroys authenticity." }
      ], assets.sunset, true, "14");

      // ==========================================
      // SLIDE 15: FINAL AUTHORITY
      // ==========================================
      const s15 = pres.addSlide();
      s15.background = { color: c_navy };
      s15.addShape(pres.ShapeType.rect, { x: "5%", y: "10%", w: "90%", h: "80%", line: { color: c_gold, width: 2 } });
      
      s15.addText("\"The greatest challenge facing many boys today is not becoming a man; it is discovering what being a man truly means beyond the voices of culture, tradition, and expectation.\"", {
        x: "10%", y: "25%", w: "80%", h: "35%", fontSize: 28, italic: true, color: c_white, align: "center", fontFace: "Georgia", lineSpacing: 40
      });
      
      s15.addShape(pres.ShapeType.rect, { x: "20%", y: "65%", w: "60%", h: "10%", fill: { color: c_gold } });
      s15.addText("EVERY MAN SOCIETY CELEBRATES WAS ONCE A BOY WHO WAS GUIDED.", {
        x: "20%", y: "65%", w: "60%", h: "10%", fontSize: 14, bold: true, color: c_navy, align: "center", fontFace: "Arial"
      });

      setStatus("Finalizing Perfected Binary...");
      const blob = await pres.write("blob");
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "BoyChild_Crisis_2026_Official.pptx";
      a.click();
      setStatus("Success. Zero Defects.");
    } catch (e) {
      setStatus("Engine Failure.");
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border-t-8 border-amber-500 p-12 rounded-3xl text-center shadow-2xl">
        <div className="mb-8 flex justify-center">
          <div className="p-4 bg-amber-50 rounded-full">
            <CheckCircle size={48} className="text-amber-500" />
          </div>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">OFFICIAL 2026 DECK</h1>
        <p className="text-slate-500 text-xs font-mono tracking-widest mb-10 uppercase">Bigger Box Architecture</p>
        
        <button 
          onClick={generatePPTX} 
          disabled={isGenerating}
          className="w-full py-5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg"
        >
          {isGenerating ? <Loader2 className="animate-spin" /> : <Download size={20} />}
          {isGenerating ? "COMPILING..." : "DOWNLOAD PRESENTATION"}
        </button>
        
        {status && <p className="mt-6 text-[10px] font-mono text-slate-400 tracking-widest uppercase">{status}</p>}
      </div>
    </div>
  );
}
