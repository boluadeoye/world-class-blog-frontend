export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(){
  const ok = !!process.env.GEMINI_API_KEY;
  const raw = (process.env.GEMINI_MODEL || "").trim();
  const usingDefaultModel = !/^gemini-/.test(raw);
  return new Response(JSON.stringify({
    ok,
    usingDefaultModel,
    hint: ok ? "POST /api/chat/complete {messages,mode}" : "Set GEMINI_API_KEY, redeploy"
  }), { status: 200, headers: { "Content-Type":"application/json" } });
}
