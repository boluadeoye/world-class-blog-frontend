import { put } from "@vercel/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Browser health check: open /api/upload?health=1 */
export async function GET(req) {
  const hasToken = !!process.env.BLOB_READ_WRITE_TOKEN;
  return new Response(JSON.stringify({
    ok: hasToken,
    hint: hasToken
      ? "POST multipart/form-data with a 'file' field to upload"
      : "Blob store not linked. In Vercel → Project → Storage → Blob → Create store → Connect to this project → redeploy."
  }), { status: 200, headers: { "Content-Type": "application/json" } });
}

/* Upload cover directly via FormData */
export async function POST(req) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return new Response(JSON.stringify({
        error: "Blob store is not linked to this project. In Vercel: Project → Storage → Blob → Create store → Connect → redeploy."
      }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const form = await req.formData();
    const file = form.get("file");
    if (!file || typeof file === "string") {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400, headers: { "Content-Type": "application/json" }
      });
    }

    const safeName = (file.name || "cover.jpg").replace(/[^a-zA-Z0-9_.-]/g, "_");
    const key = `covers/${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`;

    const { url } = await put(key, file, {
      access: "public",
      contentType: file.type || "image/jpeg",
    });

    return new Response(JSON.stringify({ url }), {
      status: 200, headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { "Content-Type": "application/json" }
    });
  }
}
