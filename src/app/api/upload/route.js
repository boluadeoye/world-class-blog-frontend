import { generateUploadUrl } from "@vercel/blob/server";

export async function POST(req) {
  try {
    const { filename, type } = await req.json();
    if (!filename || !type) {
      return new Response(JSON.stringify({ error: "filename/type required" }), { status: 400 });
    }
    const { url } = await generateUploadUrl({
      contentType: type,
      // access: "public", // default is public; uncomment if you want to force it
      // maxSize: 10 * 1024 * 1024, // optional 10MB cap
    });
    return new Response(JSON.stringify({ uploadUrl: url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
