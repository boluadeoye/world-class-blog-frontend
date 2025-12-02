import { generateUploadUrl } from "@vercel/blob/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Browser test: open https://your-site.com/api/upload?health=1 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    if (searchParams.get("health")) {
      return new Response(JSON.stringify({ ok: true, runtime: "nodejs", hint: "POST JSON {filename,type} to get a signed uploadUrl" }), {
        status: 200, headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ error: "Use POST {filename,type}" }), {
      status: 405, headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { "Content-Type": "application/json" }
    });
  }
}

/* Returns a signed uploadUrl. Client will POST the file to that URL with x-vercel-filename */
export async function POST(req) {
  try {
    const { filename, type } = await req.json();
    if (!filename || !type) {
      return new Response(JSON.stringify({ error: "filename/type required" }), {
        status: 400, headers: { "Content-Type": "application/json" }
      });
    }
    const { url } = await generateUploadUrl({
      contentType: type,
      // access: "public"  // default public
      // maxSize: 10 * 1024 * 1024,
    });
    return new Response(JSON.stringify({ uploadUrl: url }), {
      status: 200, headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    console.error("upload route error:", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { "Content-Type": "application/json" }
    });
  }
}
