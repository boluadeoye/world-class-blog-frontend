import sql from './db';

export interface ShannonKey {
  id: number;
  key_val: string;
}

export async function getRotatedKey(): Promise<ShannonKey | null> {
  try {
    await sql`UPDATE shannon_api_pool SET calls_left = 100, reset_at = (CURRENT_TIMESTAMP + interval '4 hours') WHERE reset_at < CURRENT_TIMESTAMP;`;
    await sql`UPDATE shannon_api_pool SET tokens_left = 80000, daily_reset_at = (CURRENT_TIMESTAMP + interval '24 hours') WHERE daily_reset_at < CURRENT_TIMESTAMP;`;

    const keys = await sql`
      SELECT id, key_val FROM shannon_api_pool 
      WHERE is_active = TRUE AND calls_left > 2 AND tokens_left > 5000
      ORDER BY last_used ASC LIMIT 1
    `;

    if (keys.length === 0) return null;

    await sql`UPDATE shannon_api_pool SET calls_left = calls_left - 1, last_used = CURRENT_TIMESTAMP WHERE id = ${keys[0].id}`;
    return { id: keys[0].id, key_val: keys[0].key_val };
  } catch (err) {
    return null;
  }
}

export async function updateTokenUsage(id: number, tokensUsed: number) {
  await sql`UPDATE shannon_api_pool SET tokens_left = tokens_left - ${tokensUsed} WHERE id = ${id}`;
}

// --- NEW: STRATEGIC SUMMARIZATION LOGIC ---
export async function generateStrategicSummary(messages: any[], currentSummary: string) {
  const keyData = await getRotatedKey();
  if (!keyData) return currentSummary;

  const prompt = `You are a Strategic Summarizer. Below is a conversation history and an existing summary. 
  Create a new, concise technical summary (max 300 words) that captures:
  1. The primary strategic goal.
  2. Key technical decisions (file paths, languages, tools).
  3. Current blockers or next steps.
  
  EXISTING SUMMARY: ${currentSummary}
  NEW MESSAGES: ${JSON.stringify(messages.slice(-6))}
  
  Provide ONLY the new summary text.`;

  try {
    const res = await fetch('https://api.shannon-ai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keyData.key_val}`
      },
      body: JSON.stringify({
        model: "shannon-pro-1.6",
        messages: [{ role: "system", content: prompt }],
        temperature: 0.3
      })
    });
    const data = await res.json();
    return data.choices[0].message.content;
  } catch (e) {
    return currentSummary;
  }
}
