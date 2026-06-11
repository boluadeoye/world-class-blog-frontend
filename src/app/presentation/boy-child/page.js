"use client";
import { useState } from "react";
import { Presentation, Download } from "lucide-react";

export default function BoyChildPPTX() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("");

  const generatePPTX = async () => {
    setIsGenerating(true);
    setStatus("Initializing Flat-Architecture Engine...");
    try {
      const pptxgen = (await import("pptxgenjs")).default;
      const pres = new pptxgen();

      pres.layout = "LAYOUT_16x9"; 

      const bg_dark = "111827"; 
      const text_light = "FFFFFF"; 
      const accent_gold = "F59E0B"; 

      // Helper function to draw the standard background and gold bar on every slide
      const applyStandardBackground = (slide) => {
        slide.background = { color: bg_dark };
        slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "2%", fill: { color: accent_gold } });
        slide.addText("Mayowa Olaoluwa // The Boy Child Crisis", { 
          x: "5%", y: "92%", w: "90%", h: "5%", 
          fontSize: 10, color: "9CA3AF", fontFace: "Arial" 
        });
      };

      setStatus("Building Slide 1: Cover...");
      // ==========================================
      // SLIDE 1: COVER
      // ==========================================
      let s1 = pres.addSlide();
      s1.addImage({ path: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781158637/blog_assets/mkdjjognzhihi6qkqkfe.jpg", x: 0, y: 0, w: "100%", h: "100%" });
      s1.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "000000", transparency: 60 } });
      s1.addText("THE BOY CHILD AND THE\nCRISIS OF IDENTITY", { x: "5%", y: "25%", w: "90%", h: "25%", fontSize: 40, bold: true, color: text_light, fontFace: "Arial", align: "center" });
      s1.addText("BETWEEN EXPECTATIONS AND REALITY", { x: "5%", y: "50%", w: "90%", h: "10%", fontSize: 22, color: accent_gold, fontFace: "Arial", align: "center" });
      s1.addText("Presented by Mayowa Olaoluwa", { x: "5%", y: "80%", w: "90%", h: "10%", fontSize: 16, color: text_light, fontFace: "Arial", align: "center", bold: true });

      setStatus("Building Slide 2: Intro...");
      // ==========================================
      // SLIDE 2: INTRODUCTION
      // ==========================================
      let s2 = pres.addSlide();
      applyStandardBackground(s2);
      s2.addText("INTRODUCTION", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s2.addText(
        "The crisis of identity among boys is one of the most overlooked social issues of our time.\n\nIt is not simply about confusion over who they are; it is also about the struggle between who they naturally are and who society expects them to be.\n\nAcross many societies, boys are expected to be strong, brave, responsible, and independent. These expectations are not inherently wrong. In fact, qualities such as responsibility, leadership, courage, discipline, and hard work are necessary for personal growth and societal development.",
        { x: "10%", y: "25%", w: "80%", h: "65%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 30 }
      );

      setStatus("Building Slide 3: Seed Metaphor...");
      // ==========================================
      // SLIDE 3: THE SEED METAPHOR (SPLIT LAYOUT)
      // ==========================================
      let s3 = pres.addSlide();
      applyStandardBackground(s3);
      s3.addImage({ path: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160420/blog_assets/rf05jemizu7lpzecnp8r.jpg", x: 0, y: 0, w: "40%", h: "100%", sizing: { type: "cover", w: "40%", h: "100%" } });
      s3.addText("THE SEED METAPHOR", { x: "45%", y: "10%", w: "50%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s3.addText(
        "A popular saying goes, 'A girl is raised while a boy grows up on his own.' Unfortunately, this belief has created generations of boys who are expected to become men without guidance.\n\nHaving a boy child and leaving him to fend for himself is like planting a seed and expecting it to grow into a healthy tree without water, sunlight, or care.\n\nSuch a boy may lose sight of who he truly is because no one walked him through the journey of understanding himself, his emotions, his responsibilities, and his purpose.",
        { x: "45%", y: "25%", w: "50%", h: "65%", fontSize: 18, color: text_light, fontFace: "Georgia", lineSpacing: 28 }
      );

      setStatus("Building Slide 4: Identity...");
      // ==========================================
      // SLIDE 4: WHAT IS IDENTITY?
      // ==========================================
      let s4 = pres.addSlide();
      applyStandardBackground(s4);
      s4.addText("WHAT IS IDENTITY?", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s4.addText(
        "Identity is a person's understanding of who they are, what they believe, where they belong, and what they stand for.\n\nFor boys, identity helps answer important questions such as:\n• What does it mean to be a man?\n• What are my responsibilities?\n• How do I handle emotions?\n• What kind of future do I want?\n• What values should guide my life?\n\nWhen these questions are not answered properly, boys often seek answers from peers, social media, celebrities, gangs, or unhealthy role models.",
        { x: "10%", y: "25%", w: "80%", h: "65%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 30 }
      );

      setStatus("Building Slide 5: Expectations...");
      // ==========================================
      // SLIDE 5: EXPECTATIONS VS SCRIPTS
      // ==========================================
      let s5 = pres.addSlide();
      applyStandardBackground(s5);
      s5.addText("EXPECTATIONS VS. CULTURAL SCRIPTS", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s5.addText(
        "An expectation is a responsibility or standard that helps an individual grow.\n\nFor example:\n• A man should be responsible.\n• A man should be dependable.\n• A man should be able to care for himself and others.\n\nThese are healthy expectations because they encourage maturity and accountability.",
        { x: "10%", y: "25%", w: "80%", h: "65%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 30 }
      );

      setStatus("Building Slide 6: Scripts...");
      // ==========================================
      // SLIDE 6: CULTURAL SCRIPTS
      // ==========================================
      let s6 = pres.addSlide();
      applyStandardBackground(s6);
      s6.addText("THE UNWRITTEN RULES", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s6.addText(
        "A cultural script, however, is an unwritten rule that tells a boy how he must behave to be accepted as a 'real man.'\n\nExamples include:\n• Men don't cry.\n• Men must always be strong.\n• Men must solve every problem alone.\n• Asking for help is weakness.\n• A man's value is determined by his financial success.\n\nThe challenge is that many people cannot explain where these rules came from. They simply inherited them.",
        { x: "10%", y: "25%", w: "80%", h: "65%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 30 }
      );

      setStatus("Building Slide 7: Crisis Begins...");
      // ==========================================
      // SLIDE 7: THE CRISIS BEGINS (SPLIT LAYOUT)
      // ==========================================
      let s7 = pres.addSlide();
      applyStandardBackground(s7);
      s7.addImage({ path: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160324/blog_assets/lkkmeo9qup7oxtebjksi.jpg", x: 0, y: 0, w: "40%", h: "100%", sizing: { type: "cover", w: "40%", h: "100%" } });
      s7.addText("THE IDENTITY CRISIS BEGINS", { x: "45%", y: "10%", w: "50%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s7.addText(
        "A boy enters life with emotions, fears, dreams, weaknesses, and strengths. However, as he grows, he begins to receive messages about what is acceptable and what is not.\n\nHe learns that certain emotions should be hidden. He learns that vulnerability may attract ridicule. He learns that failure is unacceptable. He learns that his worth may be measured by achievement rather than character.\n\nAs a result, many boys begin to suppress parts of themselves in order to fit society's definition of masculinity.",
        { x: "45%", y: "25%", w: "50%", h: "65%", fontSize: 18, color: text_light, fontFace: "Georgia", lineSpacing: 28 }
      );

      setStatus("Building Slide 8: Performing...");
      // ==========================================
      // SLIDE 8: PERFORMING MANHOOD
      // ==========================================
      let s8 = pres.addSlide();
      applyStandardBackground(s8);
      s8.addText("PERFORMING MANHOOD", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s8.addText(
        "The crisis is born when a boy starts performing manhood rather than understanding himself.\n\nToday, many boys find themselves caught between expectations and reality. Society tells them to be strong, independent, and successful, yet many have never been taught emotional intelligence, healthy masculinity, conflict resolution, self-worth, or purpose.\n\nThis disconnect leaves many young men struggling silently with confusion, loneliness, anger, and low self-esteem.",
        { x: "10%", y: "25%", w: "80%", h: "65%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 30 }
      );

      setStatus("Building Slide 9: The Cost...");
      // ==========================================
      // SLIDE 9: THE COST
      // ==========================================
      let s9 = pres.addSlide();
      applyStandardBackground(s9);
      s9.addText("THE COST OF UNDEFINED EXPECTATIONS", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s9.addText(
        "Many men today are carrying burdens they never consciously chose. Because these expectations were inherited rather than examined, many men feel trapped by standards they do not fully understand.\n\n• EDUCATION (UNESCO): Millions of boys worldwide are out of school, and boys in many countries are increasingly at risk of dropping out or underperforming academically.\n\n• MENTAL HEALTH (WHO): Suicide remains one of the leading causes of death among young people globally, with men in many countries dying by suicide at significantly higher rates than women.",
        { x: "10%", y: "25%", w: "80%", h: "65%", fontSize: 18, color: text_light, fontFace: "Georgia", lineSpacing: 28 }
      );

      setStatus("Building Slide 10: Factors...");
      // ==========================================
      // SLIDE 10: CONTRIBUTING FACTORS
      // ==========================================
      let s10 = pres.addSlide();
      applyStandardBackground(s10);
      s10.addText("WHAT CONTRIBUTES TO THE CRISIS?", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s10.addText(
        "1. Absence of Mentorship: Many boys grow up without positive male role models to guide and mentor them.\n\n2. Emotional Neglect: Boys are often taught to suppress emotions rather than understand and manage them.\n\n3. Social Media Influence: Many boys learn about manhood from influencers and online personalities rather than responsible mentors.\n\n4. Academic and Economic Pressure: Young men are frequently judged by what they can provide rather than who they are becoming.\n\n5. Lack of Safe Spaces: Few environments allow boys to discuss fears, failures, and personal struggles without ridicule.",
        { x: "10%", y: "25%", w: "80%", h: "65%", fontSize: 18, color: text_light, fontFace: "Georgia", lineSpacing: 26 }
      );

      setStatus("Building Slide 11: Redefining...");
      // ==========================================
      // SLIDE 11: RE-DEFINING MASCULINITY (SPLIT LAYOUT)
      // ==========================================
      let s11 = pres.addSlide();
      applyStandardBackground(s11);
      s11.addImage({ path: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160412/blog_assets/oyhpjyneacycgv777wav.jpg", x: 0, y: 0, w: "40%", h: "100%", sizing: { type: "cover", w: "40%", h: "100%" } });
      s11.addText("RE-DEFINING MASCULINITY", { x: "45%", y: "10%", w: "50%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s11.addText(
        "The solution is not to remove expectations from men. Society needs responsible, disciplined, courageous, and dependable men. The solution is to separate healthy expectations from unhealthy cultural pressures.\n\n• A strong man is not one who never cries; a strong man is one who can face reality honestly.\n• A responsible man is not one who carries every burden alone; a responsible man is one who knows when to seek help.\n• A successful man is not defined only by money; a successful man is defined by character, purpose, integrity, and positive impact.",
        { x: "45%", y: "25%", w: "50%", h: "65%", fontSize: 18, color: text_light, fontFace: "Georgia", lineSpacing: 28 }
      );

      setStatus("Building Slide 12: Solutions...");
      // ==========================================
      // SLIDE 12: POSSIBLE SOLUTIONS
      // ==========================================
      let s12 = pres.addSlide();
      applyStandardBackground(s12);
      s12.addText("POSSIBLE SOLUTIONS", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s12.addText(
        "To address the identity crisis among boys, intentional action is required:\n\n1. Intentional Parenting: Parents must actively teach boys values, discipline, responsibility, and emotional intelligence.\n\n2. Mentorship Programmes: Schools, religious institutions, and communities should connect boys with positive male mentors.\n\n3. Mental Health Awareness: Boys should be encouraged to seek help when struggling emotionally.\n\n4. Positive Models of Masculinity: Strength should include compassion, responsibility, integrity, and self-control.\n\n5. Educational Support: Schools should recognize the unique challenges boys face and create systems that support both boys and girls.",
        { x: "10%", y: "25%", w: "80%", h: "65%", fontSize: 18, color: text_light, fontFace: "Georgia", lineSpacing: 26 }
      );

      setStatus("Building Slide 13: Conclusion...");
      // ==========================================
      // SLIDE 13: CONCLUSION
      // ==========================================
      let s13 = pres.addSlide();
      applyStandardBackground(s13);
      s13.addText("CONCLUSION", { x: "10%", y: "10%", w: "80%", h: "10%", fontSize: 28, bold: true, color: accent_gold, fontFace: "Arial" });
      s13.addText(
        "The crisis of identity among boys is often a crisis of inherited definitions. Many boys are trying to become men according to rules they never created and do not fully understand.\n\nEvery responsible man was once a boy who received guidance, correction, encouragement, and support. When boys are ignored, society eventually deals with the consequences. But when boys are guided, mentored, and empowered, society benefits from responsible fathers, leaders, professionals, and citizens.\n\nThe challenge for this generation is not to reject manhood but to redefine it thoughtfully—to keep what builds character and discard what destroys authenticity.",
        { x: "10%", y: "25%", w: "80%", h: "65%", fontSize: 20, color: text_light, fontFace: "Georgia", lineSpacing: 30 }
      );

      setStatus("Building Slide 14: Closing...");
      // ==========================================
      // SLIDE 14: CLOSING STATEMENT
      // ==========================================
      let s14 = pres.addSlide();
      s14.background = { color: bg_dark };
      s14.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "2%", fill: { color: accent_gold } });
      s14.addText(
        "\"The greatest challenge facing many boys today is not becoming a man; it is discovering what being a man truly means beyond the voices of culture, tradition, and expectation.\"",
        { x: "10%", y: "30%", w: "80%", h: "30%", fontSize: 28, italic: true, color: text_light, fontFace: "Georgia", align: "center", lineSpacing: 40 }
      );
      s14.addText("Every man society celebrates was once a boy who was guided.", {
        x: "10%", y: "65%", w: "80%", h: "10%", fontSize: 18, bold: true, color: accent_gold, fontFace: "Arial", align: "center"
      });

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
