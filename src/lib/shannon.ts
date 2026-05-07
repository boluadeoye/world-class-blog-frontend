import sql from './db';

export interface ShannonKey {
  id: number;
  key_val: string;
}

export async function getRotatedKey(): Promise<ShannonKey | null> {
  try {
    // 1. Reset expired windows (4h for calls, 24h for tokens)
    await sql`UPDATE shannon_api_pool SET calls_left = 100, reset_at = (CURRENT_TIMESTAMP + interval '4 hours') WHERE reset_at < CURRENT_TIMESTAMP;`;
    await sql`UPDATE shannon_api_pool SET tokens_left = 80000, daily_reset_at = (CURRENT_TIMESTAMP + interval '24 hours') WHERE daily_reset_at < CURRENT_TIMESTAMP;`;

    // 2. Pick the freshest active key
    const keys = await sql`
      SELECT id, key_val FROM shannon_api_pool 
      WHERE is_active = TRUE AND calls_left > 2 AND tokens_left > 5000
      ORDER BY last_used ASC LIMIT 1
    `;

    if (keys.length === 0) return null;

    // 3. Optimistic Update
    await sql`UPDATE shannon_api_pool SET calls_left = calls_left - 1, last_used = CURRENT_TIMESTAMP WHERE id = ${keys[0].id}`;
    return { id: keys[0].id, key_val: keys[0].key_val };
  } catch (err) {
    return null;
  }
}

export async function updateTokenUsage(id: number, tokensUsed: number) {
  try {
    await sql`UPDATE shannon_api_pool SET tokens_left = tokens_left - ${tokensUsed} WHERE id = ${id}`;
  } catch {}
}
