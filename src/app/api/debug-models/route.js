import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        status: "ERROR", 
        message: "GEMINI_API_KEY is missing in Vercel Environment Variables." 
      });
    }

    // Mask the key for safety (show only last 4 chars)
    const maskedKey = "..." + apiKey.slice(-4);

    // Query Google for available models
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const r = await fetch(url);
    const json = await r.json();

    if (!r.ok) {
      return NextResponse.json({ 
        status: "GOOGLE_API_ERROR", 
        key_used: maskedKey,
        error_details: json.error || r.statusText 
      });
    }

    // Filter for models that support 'generateContent' (Chat)
    const chatModels = (json.models || [])
      .filter(m => m.supportedGenerationMethods?.includes("generateContent"))
      .map(m => m.name.replace("models/", ""));

    return NextResponse.json({ 
      status: "SUCCESS", 
      key_used: maskedKey,
      available_models: chatModels 
    });

  } catch (error) {
    return NextResponse.json({ 
      status: "SERVER_ERROR", 
      message: error.message 
    });
  }
}
