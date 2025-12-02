export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(){
  const ok = !!process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash-latest";
  return new Response(JSON.stringify({ ok, model, hint: ok ? "POST /api/chat/complete with {messages,mode}" : "Set GEMINI_API_KEY in Vercel, then redeploy." }), {
    status: 200, headers: { "Content-Type":"application/json" }
  });
}
