"use client";
import { useState } from "react";
import { Presentation, Download, Loader2 } from "lucide-react";

export default function BoyChildPPTX() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("");

  const generatePPTX = async () => {
    setIsGenerating(true);
    setStatus("Initializing Editorial Layering Engine...");
    
    try {
      const pptxgen = (await import("pptxgenjs")).default;
      const pres = new pptxgen();
      pres.layout = "LAYOUT_16x9"; 

      // TITANIUM COLOR PALETTE
      const c_sky = "BAE6FD"; 
      const c_shadow = "7DD3FC";
      const c_navy = "0F172A"; 
      const c_gold = "F59E0B"; 
      const c_white = "FFFFFF";

      // HIGH-RES ASSETS
      const img_cover = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176355/blog_assets/nww3tbifsdqy9jjpbhip.jpg";
      const img_stressed = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176367/blog_assets/p2s6sairkhl8mzoyphok.jpg";
      const img_planting = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160420/blog_assets/rf05jemizu7lpzecnp8r.jpg";
      const img_hoodie = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160324/blog_assets/lkkmeo9qup7oxtebjksi.jpg";
      const img_muscles = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176364/blog_assets/y2ayshhjhrw6vjcbfkty.jpg";
      const img_bicycle = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160412/blog_assets/oyhpjyneacycgv777wav.jpg";
      const img_sunset = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176359/blog_assets/qwqs4s5bqhz9fkmxdq5a.jpg";

      // ==========================================
      // CORE ENGINE: THE GLASS CARD GENERATOR
      // ==========================================
      const drawCard = (slide, xNum, yNum, wNum, hNum) => {
        // Layer 1: Offset Shadow (Creates 3D Depth)
        slide.addShape(pres.ShapeType.rect, { x: `${xNum + 1}%`, y: `${yNum + 2}%`, w: `${wNum}%`, h: `${hNum}%`, fill: { color: c_shadow } });
        // Layer 2: The Glass Card
        slide.addShape(pres.ShapeType.rect, { x: `${xNum}%`, y: `${yNum}%`, w: `${wNum}%`, h: `${hNum}%`, fill: { color: c_white }, line: { color: c_navy, width: 1.5 } });
        // Layer 3: Structural Anchor (Navy Left Border)
        slide.addShape(pres.ShapeType.rect, { x: `${xNum}%`, y: `${yNum}%`, w: "1.5%", h: `${hNum}%`, fill: { color: c_navy } });
      };

      const applyBase = (slide) => {
        slide.background = { color: c_sky };
      };

      // ==========================================
      // SLIDE 1: EDITORIAL COVER
      // ==========================================
      let s1 = pres.addSlide();
      applyBase(s1);
      // Full Bleed Image Right
      s1.addImage({ path: img_cover, x: "40%", y: 0, w: "60%", h: "100%", sizing: { type: "cover" } });
      // Overlapping Card Left
      drawCard(s1, 5, 20, 45, 60);
      s1.addText("THE BOY CHILD\nAND THE CRISIS\nOF IDENTITY", { x: "8%", y: "25%", w: "40%", h: "25%", fontSize: 32, bold: true, color: c_navy, fontFace: "Arial", charSpacing: 2, animation: { type: 'appear' } });
      s1.addText("BETWEEN EXPECTATIONS AND REALITY", { x: "8%", y: "52%", w: "40%", h: "5%", fontSize: 12, color: c_gold, fontFace: "Arial", bold: true, charSpacing: 1.5, animation: { type: 'appear' } });
      s1.addText("PRESENTERS:\nAgbemeho Favour Okeoghene\nOlaoluwa Mayowa Deborah", { x: "8%", y: "62%", w: "40%", h: "15%", fontSize: 12, color: c_navy, fontFace: "Georgia", lineSpacing: 20, animation: { type: 'appear' } });

      // ==========================================
      // SLIDE 2: HERO LEFT (INTRO)
      // ==========================================
      let s2 = pres.addSlide();
      applyBase(s2);
      s2.addImage({ path: img_stressed, x: 0, y: 0, w: "35%", h: "100%", sizing: { type: "cover" } });
      drawCard(s2, 40, 15, 55, 70);
      s2.addText("INTRODUCTION", { x: "44%", y: "20%", w: "48%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", charSpacing: 1.5, animation: { type: 'appear' } });
      s2.addText("The crisis of identity among boys is one of the most overlooked social issues of our time.", { x: "44%", y: "35%", w: "48%", h: "15%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animation: { type: 'appear' } });
      s2.addText("It is not simply about confusion over who they are; it is also about the struggle between who they naturally are and who society expects them to be.", { x: "44%", y: "55%", w: "48%", h: "25%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animation: { type: 'appear' } });

      // ==========================================
      // SLIDE 3: STARK FOCAL POINT (THE STRUGGLE)
      // ==========================================
      let s3 = pres.addSlide();
      applyBase(s3);
      drawCard(s3, 10, 15, 80, 70);
      s3.addText("THE STRUGGLE", { x: "14%", y: "20%", w: "72%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", charSpacing: 1.5, animation: { type: 'appear' } });
      s3.addText("Across many societies, boys are expected to be strong, brave, responsible, and independent. These expectations are not inherently wrong.", { x: "14%", y: "35%", w: "72%", h: "15%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animation: { type: 'appear' } });
      s3.addText("In fact, qualities such as responsibility, leadership, courage, discipline, and hard work are necessary for personal growth and societal development.", { x: "14%", y: "52%", w: "72%", h: "15%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animation: { type: 'appear' } });
      s3.addText("However, over time, many cultures have attached additional unwritten rules to manhood.", { x: "14%", y: "70%", w: "72%", h: "10%", fontSize: 16, color: c_navy, fontFace: "Georgia", bold: true, lineSpacing: 24, valign: "top", animation: { type: 'appear' } });

      // ==========================================
      // SLIDE 4: HERO RIGHT (SEED METAPHOR)
      // ==========================================
      let s4 = pres.addSlide();
      applyBase(s4);
      s4.addImage({ path: img_planting, x: "65%", y: 0, w: "35%", h: "100%", sizing: { type: "cover" } });
      drawCard(s4, 5, 15, 55, 70);
      s4.addText("THE SEED METAPHOR", { x: "9%", y: "20%", w: "48%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", charSpacing: 1.5, animation: { type: 'appear' } });
      s4.addText("A popular saying goes, 'A girl is raised while a boy grows up on his own.'", { x: "9%", y: "35%", w: "48%", h: "15%", fontSize: 16, color: c_navy, fontFace: "Georgia", italic: true, lineSpacing: 24, valign: "top", animation: { type: 'appear' } });
      s4.addText("Having a boy child and leaving him to fend for himself is like planting a seed and expecting it to grow into a healthy tree without water, sunlight, or care.", { x: "9%", y: "52%", w: "48%", h: "25%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animation: { type: 'appear' } });

      // ==========================================
      // SLIDE 5: TWO-COLUMN GRID (IDENTITY)
      // ==========================================
      let s5 = pres.addSlide();
      applyBase(s5);
      drawCard(s5, 5, 20, 42, 60);
      drawCard(s5, 53, 20, 42, 60);
      s5.addText("WHAT IS IDENTITY?", { x: "5%", y: "5%", w: "90%", h: "10%", fontSize: 28, bold: true, color: c_navy, fontFace: "Arial", align: "center", charSpacing: 2, animation: { type: 'appear' } });
      // Left Card
      s5.addText("THE DEFINITION", { x: "9%", y: "25%", w: "35%", h: "10%", fontSize: 16, bold: true, color: c_navy, fontFace: "Arial", animation: { type: 'appear' } });
      s5.addText("Identity is a person's understanding of who they are, what they believe, where they belong, and what they stand for.", { x: "9%", y: "40%", w: "35%", h: "30%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animation: { type: 'appear' } });
      // Right Card
      s5.addText("THE QUESTIONS", { x: "57%", y: "25%", w: "35%", h: "10%", fontSize: 16, bold: true, color: c_navy, fontFace: "Arial", animation: { type: 'appear' } });
      s5.addText("• What does it mean to be a man?\n• What are my responsibilities?\n• How do I handle emotions?\n• What kind of future do I want?", { x: "57%", y: "40%", w: "35%", h: "35%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 28, valign: "top", animation: { type: 'appear' } });

      // ==========================================
      // SLIDE 6: STARK FOCAL POINT (EXPECTATIONS)
      // ==========================================
      let s6 = pres.addSlide();
      applyBase(s6);
      drawCard(s6, 10, 15, 80, 70);
      s6.addText("EXPECTATIONS VS. SCRIPTS", { x: "14%", y: "20%", w: "72%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", charSpacing: 1.5, animation: { type: 'appear' } });
      s6.addText("An expectation is a responsibility or standard that helps an individual grow.", { x: "14%", y: "35%", w: "72%", h: "10%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animation: { type: 'appear' } });
      s6.addText("• A man should be responsible.\n• A man should be dependable.\n• A man should be able to care for himself and others.", { x: "14%", y: "48%", w: "72%", h: "20%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 28, valign: "top", animation: { type: 'appear' } });
      s6.addText("These are healthy expectations because they encourage maturity and accountability.", { x: "14%", y: "72%", w: "72%", h: "10%", fontSize: 16, color: c_navy, fontFace: "Georgia", bold: true, lineSpacing: 24, valign: "top", animation: { type: 'appear' } });

      // ==========================================
      // SLIDE 7: HERO LEFT (UNWRITTEN RULES)
      // ==========================================
      let s7 = pres.addSlide();
      applyBase(s7);
      s7.addImage({ path: img_hoodie, x: 0, y: 0, w: "35%", h: "100%", sizing: { type: "cover" } });
      drawCard(s7, 40, 15, 55, 70);
      s7.addText("THE UNWRITTEN RULES", { x: "44%", y: "20%", w: "48%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", charSpacing: 1.5, animation: { type: 'appear' } });
      s7.addText("A cultural script is an unwritten rule that tells a boy how he must behave to be accepted as a 'real man.'", { x: "44%", y: "35%", w: "48%", h: "15%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animation: { type: 'appear' } });
      s7.addText("• Men don't cry.\n• Men must always be strong.\n• Men must solve every problem alone.\n• Asking for help is weakness.", { x: "44%", y: "52%", w: "48%", h: "30%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 28, valign: "top", animation: { type: 'appear' } });

      // ==========================================
      // SLIDE 8: HERO RIGHT (CRISIS BEGINS)
      // ==========================================
      let s8 = pres.addSlide();
      applyBase(s8);
      s8.addImage({ path: img_muscles, x: "65%", y: 0, w: "35%", h: "100%", sizing: { type: "cover" } });
      drawCard(s8, 5, 15, 55, 70);
      s8.addText("THE CRISIS BEGINS", { x: "9%", y: "20%", w: "48%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", charSpacing: 1.5, animation: { type: 'appear' } });
      s8.addText("A boy enters life with emotions, fears, dreams, weaknesses, and strengths. However, as he grows, he begins to receive messages about what is acceptable.", { x: "9%", y: "35%", w: "48%", h: "20%", fontSize: 15, color: c_navy, fontFace: "Georgia", lineSpacing: 22, valign: "top", animation: { type: 'appear' } });
      s8.addText("He learns that certain emotions should be hidden. He learns that vulnerability may attract ridicule.", { x: "9%", y: "55%", w: "48%", h: "15%", fontSize: 15, color: c_navy, fontFace: "Georgia", lineSpacing: 22, valign: "top", animation: { type: 'appear' } });
      s8.addText("As a result, many boys begin to suppress parts of themselves.", { x: "9%", y: "72%", w: "48%", h: "10%", fontSize: 15, color: c_navy, fontFace: "Georgia", bold: true, lineSpacing: 22, valign: "top", animation: { type: 'appear' } });

      // ==========================================
      // SLIDE 9: EDITORIAL OVERLAY (PERFORMING)
      // ==========================================
      let s9 = pres.addSlide();
      s9.addImage({ path: img_stressed, x: 0, y: 0, w: "100%", h: "100%", sizing: { type: "cover" } });
      // Semi-transparent wash to make text readable
      s9.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "0F172A", transparency: 60 } });
      drawCard(s9, 15, 35, 70, 50);
      s9.addText("PERFORMING MANHOOD", { x: "19%", y: "40%", w: "62%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", charSpacing: 1.5, animation: { type: 'appear' } });
      s9.addText("The crisis is born when a boy starts performing manhood rather than understanding himself.", { x: "19%", y: "52%", w: "62%", h: "10%", fontSize: 16, color: c_navy, fontFace: "Georgia", bold: true, lineSpacing: 24, valign: "top", animation: { type: 'appear' } });
      s9.addText("Society tells them to be strong, independent, and successful, yet many have never been taught emotional intelligence, healthy masculinity, or self-worth.", { x: "19%", y: "65%", w: "62%", h: "15%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animation: { type: 'appear' } });

      // ==========================================
      // SLIDE 10: STARK FOCAL POINT (FACTORS)
      // ==========================================
      let s10 = pres.addSlide();
      applyBase(s10);
      drawCard(s10, 10, 10, 80, 80);
      s10.addText("WHAT CONTRIBUTES TO THE CRISIS?", { x: "14%", y: "15%", w: "72%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", charSpacing: 1.5, animation: { type: 'appear' } });
      s10.addText("1. Absence of Mentorship: Growing up without positive male role models.", { x: "14%", y: "30%", w: "72%", h: "8%", fontSize: 16, color: c_navy, fontFace: "Georgia", animation: { type: 'appear' } });
      s10.addText("2. Emotional Neglect: Taught to suppress emotions rather than manage them.", { x: "14%", y: "42%", w: "72%", h: "8%", fontSize: 16, color: c_navy, fontFace: "Georgia", animation: { type: 'appear' } });
      s10.addText("3. Social Media Influence: Learning manhood from toxic influencers.", { x: "14%", y: "54%", w: "72%", h: "8%", fontSize: 16, color: c_navy, fontFace: "Georgia", animation: { type: 'appear' } });
      s10.addText("4. Economic Pressure: Judged by provision rather than character.", { x: "14%", y: "66%", w: "72%", h: "8%", fontSize: 16, color: c_navy, fontFace: "Georgia", animation: { type: 'appear' } });
      s10.addText("5. Lack of Safe Spaces: Few environments allow boys to discuss fears.", { x: "14%", y: "78%", w: "72%", h: "8%", fontSize: 16, color: c_navy, fontFace: "Georgia", animation: { type: 'appear' } });

      // ==========================================
      // SLIDE 11: TWO-COLUMN GRID (THE COST)
      // ==========================================
      let s11 = pres.addSlide();
      applyBase(s11);
      s11.addText("THE COST OF UNDEFINED EXPECTATIONS", { x: "5%", y: "5%", w: "90%", h: "10%", fontSize: 28, bold: true, color: c_navy, fontFace: "Arial", align: "center", charSpacing: 2, animation: { type: 'appear' } });
      drawCard(s11, 5, 20, 42, 60);
      drawCard(s11, 53, 20, 42, 60);
      // Left Card
      s11.addText("EDUCATION (UNESCO)", { x: "9%", y: "25%", w: "35%", h: "10%", fontSize: 16, bold: true, color: c_navy, fontFace: "Arial", animation: { type: 'appear' } });
      s11.addText("Millions of boys worldwide are out of school, and boys in many countries are increasingly at risk of dropping out.", { x: "9%", y: "40%", w: "35%", h: "30%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animation: { type: 'appear' } });
      // Right Card
      s11.addText("MENTAL HEALTH (WHO)", { x: "57%", y: "25%", w: "35%", h: "10%", fontSize: 16, bold: true, color: c_navy, fontFace: "Arial", animation: { type: 'appear' } });
      s11.addText("Suicide remains a leading cause of death among young people globally, with men dying at significantly higher rates than women.", { x: "57%", y: "40%", w: "35%", h: "35%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animation: { type: 'appear' } });

      // ==========================================
      // SLIDE 12: HERO LEFT (REDEFINING)
      // ==========================================
      let s12 = pres.addSlide();
      applyBase(s12);
      s12.addImage({ path: img_bicycle, x: 0, y: 0, w: "35%", h: "100%", sizing: { type: "cover" } });
      drawCard(s12, 40, 15, 55, 70);
      s12.addText("RE-DEFINING MASCULINITY", { x: "44%", y: "20%", w: "48%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", charSpacing: 1.5, animation: { type: 'appear' } });
      s12.addText("The solution is to separate healthy expectations from unhealthy cultural pressures.", { x: "44%", y: "35%", w: "48%", h: "10%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animation: { type: 'appear' } });
      s12.addText("• A strong man is one who can face reality honestly.\n• A responsible man is one who knows when to seek help.\n• A successful man is defined by character, purpose, and integrity.", { x: "44%", y: "50%", w: "48%", h: "30%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 28, valign: "top", animation: { type: 'appear' } });

      // ==========================================
      // SLIDE 13: STARK FOCAL POINT (SOLUTIONS)
      // ==========================================
      let s13 = pres.addSlide();
      applyBase(s13);
      drawCard(s13, 10, 10, 80, 80);
      s13.addText("POSSIBLE SOLUTIONS", { x: "14%", y: "15%", w: "72%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", charSpacing: 1.5, animation: { type: 'appear' } });
      s13.addText("1. Intentional Parenting: Teach values and emotional intelligence.", { x: "14%", y: "30%", w: "72%", h: "8%", fontSize: 16, color: c_navy, fontFace: "Georgia", animation: { type: 'appear' } });
      s13.addText("2. Mentorship Programmes: Connect boys with positive male mentors.", { x: "14%", y: "42%", w: "72%", h: "8%", fontSize: 16, color: c_navy, fontFace: "Georgia", animation: { type: 'appear' } });
      s13.addText("3. Mental Health Awareness: Encourage seeking help without shame.", { x: "14%", y: "54%", w: "72%", h: "8%", fontSize: 16, color: c_navy, fontFace: "Georgia", animation: { type: 'appear' } });
      s13.addText("4. Positive Models: Strength must include compassion and self-control.", { x: "14%", y: "66%", w: "72%", h: "8%", fontSize: 16, color: c_navy, fontFace: "Georgia", animation: { type: 'appear' } });
      s13.addText("5. Educational Support: Create systems that support boys' learning styles.", { x: "14%", y: "78%", w: "72%", h: "8%", fontSize: 16, color: c_navy, fontFace: "Georgia", animation: { type: 'appear' } });

      // ==========================================
      // SLIDE 14: HERO RIGHT (CONCLUSION)
      // ==========================================
      let s14 = pres.addSlide();
      applyBase(s14);
      s14.addImage({ path: img_sunset, x: "65%", y: 0, w: "35%", h: "100%", sizing: { type: "cover" } });
      drawCard(s14, 5, 15, 55, 70);
      s14.addText("CONCLUSION", { x: "9%", y: "20%", w: "48%", h: "10%", fontSize: 24, bold: true, color: c_navy, fontFace: "Arial", charSpacing: 1.5, animation: { type: 'appear' } });
      s14.addText("The crisis of identity among boys is often a crisis of inherited definitions. Every responsible man was once a boy who received guidance and support.", { x: "9%", y: "35%", w: "48%", h: "20%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animation: { type: 'appear' } });
      s14.addText("The challenge for this generation is not to reject manhood but to redefine it thoughtfully—to keep what builds character and discard what destroys authenticity.", { x: "9%", y: "58%", w: "48%", h: "25%", fontSize: 16, color: c_navy, fontFace: "Georgia", lineSpacing: 24, valign: "top", animation: { type: 'appear' } });

      // ==========================================
      // SLIDE 15: THE CLOSING STATEMENT
      // ==========================================
      let s15 = pres.addSlide();
      s15.background = { color: c_navy };
      // Gold Accent Frame
      s15.addShape(pres.ShapeType.rect, { x: "5%", y: "10%", w: "90%", h: "80%", fill: { color: c_navy }, line: { color: c_gold, width: 2 } });
      s15.addText(
        "\"The greatest challenge facing many boys today is not becoming a man; it is discovering what being a man truly means beyond the voices of culture, tradition, and expectation.\"",
        { x: "10%", y: "30%", w: "80%", h: "30%", fontSize: 24, italic: true, color: c_white, fontFace: "Georgia", align: "center", lineSpacing: 36, animation: { type: 'appear' } }
      );
      s15.addText("Every man society celebrates was once a boy who was guided.", { x: "10%", y: "70%", w: "80%", h: "10%", fontSize: 14, bold: true, color: c_gold, fontFace: "Arial", align: "center", charSpacing: 2, animation: { type: 'appear' } });

      setStatus("Compiling Binary Payload...");
      const blob = await pres.write("blob");
      const pptxFile = new Blob([blob], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });
      const url = window.URL.createObjectURL(pptxFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = "The_Boy_Child_Crisis_Premium.pptx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setStatus("Deployment Successful.");
    } catch (error) {
      console.error("PPTX Generation Failed:", error);
      alert("Error generating PowerPoint: " + error.message);
      setStatus("Engine Failure.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-900/20 via-slate-950 to-slate-950"></div>
      
      <div className="relative z-10 w-full max-w-md bg-slate-900 p-10 text-center rounded-3xl shadow-2xl border border-slate-800">
        <div className="w-20 h-20 bg-sky-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-sky-500/20">
          <Presentation size={40} className="text-sky-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-2 tracking-wide">Titanium Engine</h1>
        <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-8">The Boy Child Crisis</p>
        
        <button 
          onClick={generatePPTX} 
          disabled={isGenerating} 
          className="w-full flex items-center justify-center gap-3 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold py-4 rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-sky-500/20"
        >
          {isGenerating ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span className="font-mono text-xs">Compiling...</span>
            </>
          ) : (
            <>
              <Download size={18} />
              <span>Download Premium PPTX</span>
            </>
          )}
        </button>

        {status && (
          <div className="mt-6 p-3 bg-slate-950 rounded-lg border border-slate-800">
            <p className="text-[10px] font-mono text-sky-400 uppercase tracking-wider">{status}</p>
          </div>
        )}
      </div>
    </div>
  );
}
