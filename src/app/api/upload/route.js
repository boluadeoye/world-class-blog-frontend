import { put } from "@vercel/blob";

export async function POST(req) {
  try {
    // Accept multipart/form-data with a "file" field
    const form = await req.formData();
    const file = form.get("file");
    if (!file || typeof file === "string") {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400, headers: { "Content-Type": "application/json" }
      });
    }

    const name = (file.name || "cover.jpg").replace(/[^a-zA-Z0-9_.-]/g, "_");
    const key = `covers/${Date.now()}-${Math.random().toString(36).slice(2)}-${name}`;

    // Upload to Blob (public by default)
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
