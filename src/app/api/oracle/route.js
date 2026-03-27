import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt, docType, theme } = await req.json();

    // 1. THE 3-KEY POOLING SYSTEM (Round-Robin)
    const keys = [
      process.env.GROQ_KEY_1,
      process.env.GROQ_KEY_2,
      process.env.GROQ_KEY_3
    ].filter(Boolean);

    if (keys.length === 0) {
      return NextResponse.json({ error: "No API keys configured" }, { status: 500 });
    }

    // Select key based on current minute to distribute load
    const keyIndex = Math.floor(Date.now() / 1000) % keys.length;
    const activeKey = keys[keyIndex];

    // 2. THE SOVEREIGN SYSTEM PROMPT
    const systemPrompt = `
      ACT AS: Senior Systems Architect & Information Engineer.
      TASK: Generate a high-fidelity document schema in STRICT JSON.
      
      DOCUMENT_TYPE: ${docType}
      THEME_PROTOCOL: ${theme}
      
      CONSTRAINTS:
      - Output ONLY valid JSON. No conversational text.
      - Use "Playfair Display" for luxury headers, "Inter" for body, "JetBrains Mono" for data.
      - Max 250 characters per paragraph to prevent layout overflow.
      - Include suggested AI image prompts for cover and section headers.
      
      SCHEMA_STRUCTURE:
      {
        "document_meta": { "title": "string", "version": "1.2", "complexity": "9.1/10" },
        "pages": [
          {
            "page_number": 1,
            "layout": "HERO_COVER",
            "blocks": [
              { "type": "TITLE", "content": "string" },
              { "type": "SUBTITLE", "content": "string" },
              { "type": "IMAGE_PROMPT", "content": "string" }
            ]
          },
          {
            "page_number": 2,
            "layout": "EDITORIAL_GRID",
            "blocks": [
              { "type": "SECTION_HEADER", "content": "string" },
              { "type": "PARAGRAPH", "content": "string" },
              { "type": "KILL_SHOT_METRIC", "label": "string", "value": "string" }
            ]
          }
        ]
      }
    `;

    // 3. GROQ API CALL
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
          { role: "user", content: prompt }
        ],
        temperature: 0, // ZERO TEMPERATURE FOR LOGIC
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    let rawContent = data.choices[0].message.content;

    // 4. SANITIZATION LAYER
    // Strip markdown backticks if AI hallucinations occur
    const sanitizedContent = rawContent.replace(/```json|```/g, "").trim();
    const jsonOutput = JSON.parse(sanitizedContent);

    return NextResponse.json({ 
      success: true, 
      data: jsonOutput,
      meta: { keyUsed: keyIndex, timestamp: new Date().toISOString() }
    });

  } catch (error) {
    console.error("ORACLE_ERROR:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
