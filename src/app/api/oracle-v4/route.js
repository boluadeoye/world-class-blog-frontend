import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt, docType } = await req.json();

    // 1. 3-KEY POOLING LOGIC
    const keys = [
      process.env.GROQ_KEY_1,
      process.env.GROQ_KEY_2,
      process.env.GROQ_KEY_3
    ].filter(Boolean);

    if (keys.length === 0) {
      return NextResponse.json({ error: "API_KEYS_NOT_CONFIGURED" }, { status: 500 });
    }

    const activeKey = keys[Math.floor(Date.now() / 1000) % keys.length];

    // 2. THE RELATIONAL GEOMETRY SYSTEM PROMPT
    const systemPrompt = `
      ACT AS: Relational Geometry Engine (RGE).
      TASK: Compile a high-fidelity document graph based on mathematical constraints.
      
      GEOMETRY RULES:
      - Canvas: A4 (210mm x 297mm).
      - Positioning: Use "constraints" (anchor, margin_top, margin_left, width_pct).
      - Relational Logic: Elements can be "relative_to" other element IDs.
      - Overlap: Define "overlap_behavior" (multiply, screen, overlay) and "z_index".
      - Typography: Use "Playfair Display" (Luxury), "Inter" (Technical), "JetBrains Mono" (Data).
      
      OUTPUT FORMAT: STRICT JSON ONLY.
      
      SCHEMA:
      {
        "doc_identity": { "title": "string", "protocol": "OBSIDIAN|ALABASTER|MONOLITH" },
        "elements": [
          {
            "id": "string",
            "type": "IMAGE|TEXT|DIAGRAM|SHAPE",
            "content": "string",
            "style": {
              "font": "string",
              "size_pt": "number",
              "color": "hex",
              "tracking": "number"
            },
            "geometry": {
              "anchor": "PAGE_EDGE|ELEMENT_ID",
              "relative_to": "string|null",
              "margin_top_mm": "number",
              "margin_left_mm": "number",
              "width_pct": "number",
              "z_index": "number",
              "overlap_mode": "string"
            }
          }
        ]
      }
    `;

    // 3. EXECUTION
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${activeKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate a ${docType} based on this intent: ${prompt}` }
        ],
        temperature: 0,
        response_format: { type: "json_object" }
      })
    });

    const result = await response.json();
    const sanitized = result.choices[0].message.content.replace(/```json|```/g, "").trim();
    
    return NextResponse.json({ 
      success: true, 
      graph: JSON.parse(sanitized) 
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
