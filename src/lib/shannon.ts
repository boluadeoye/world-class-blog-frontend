import sql from './db';

export interface ShannonKey {
  id: number;
  key_val: string;
}

export async function getRotatedKey(): Promise<ShannonKey | null> {
  try {
    // ATOMIC TRANSACTION: Pick, Lock, and Update in one go
    const keys = await sql`
      UPDATE shannon_api_pool
      SET last_used = NOW(), 
          calls_left = CASE WHEN reset_at < NOW() THEN 99 ELSE calls_left - 1 END,
          reset_at = CASE WHEN reset_at < NOW() THEN (NOW() + interval '4 hours') ELSE reset_at END
      WHERE id = (
        SELECT id FROM shannon_api_pool
        WHERE is_active = TRUE 
        AND (calls_left > 0 OR reset_at < NOW())
        AND jail_until < NOW()
        ORDER BY last_used ASC
        LIMIT 1
        FOR UPDATE SKIP LOCKED
      )
      RETURNING id, key_val;
    `;

    if (keys.length === 0) return null;
    return { id: keys[0].id, key_val: keys[0].key_val };
  } catch (err) {
    console.error("Atomic Rotation Failure:", err);
    return null;
  }
}

export async function jailKey(id: number, minutes: number = 5) {
  await sql`
    UPDATE shannon_api_pool 
    SET jail_until = (NOW() + ${minutes} * interval '1 minute') 
    WHERE id = ${id}
  `;
}

export async function updateTokenUsage(id: number, tokensUsed: number) {
  await sql`UPDATE shannon_api_pool SET tokens_left = tokens_left - ${tokensUsed} WHERE id = ${id}`;
}
