import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { query } = await req.json();
    const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const ddgRes = await fetch(ddgUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    
    if (!ddgRes.ok) return NextResponse.json({ vectors: [] });

    const html = await ddgRes.text();
    const urlRegex = /<a class="result__url" href="([^"]+)">/g;
    const links = [...html.matchAll(urlRegex)].map(match => match[1]).slice(0, 3);

    const results = await Promise.all(links.map(async (url) => {
      try {
        const res = await fetch(`https://r.jina.ai/${url}`, { signal: AbortSignal.timeout(3000) });
        return res.ok ? { url, content: await res.text() } : null;
      } catch { return null; }
    }));

    return NextResponse.json({ vectors: results.filter(r => r !== null) });
  } catch (error) {
    return NextResponse.json({ vectors: [], error: error.message });
  }
}
