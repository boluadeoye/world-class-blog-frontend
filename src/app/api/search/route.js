import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { query } = await req.json();
    const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const ddgRes = await fetch(ddgUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (SovereignStudio/6.0; Clinical)' }
    });
    const html = await ddgRes.text();
    const urlRegex = /<a class="result__url" href="([^"]+)">/g;
    const links = [...html.matchAll(urlRegex)]
      .map(match => match[1])
      .filter(link => !link.includes('duckduckgo.com'))
      .slice(0, 5);

    const results = await Promise.all(links.map(async (url) => {
      try {
        const jinaRes = await fetch(`https://r.jina.ai/${url}`, {
          headers: { 'X-Return-Format': 'markdown' }
        });
        return { url, content: await jinaRes.text() };
      } catch {
        return null;
      }
    }));

    return NextResponse.json({ 
      vectors: results.filter(r => r !== null),
      timestamp: Date.now() 
    });
  } catch (error) {
    return NextResponse.json({ error: 'GHOST_CLAW_FAILURE' }, { status: 500 });
  }
}
