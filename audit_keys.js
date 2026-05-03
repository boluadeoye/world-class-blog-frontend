const { Client } = require('pg');
const fetch = require('node-fetch'); // Ensure node-fetch is available or use native fetch in Node 18+

async function audit() {
  const client = new Client({
    connectionString: process.argv[2],
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const res = await client.query("SELECT id, key_val FROM shannon_api_pool WHERE is_active = TRUE");
    console.log(`\n--- AUDITING ${res.rows.length} KEYS ---\n`);

    for (let row of res.rows) {
      const response = await fetch('https://api.shannon-ai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${row.key_val}`
        },
        body: JSON.stringify({
          model: "shannon-pro-1.6",
          messages: [{ role: "user", content: "ping" }],
          max_tokens: 1
        })
      });

      if (response.status === 200) {
        console.log(`ID ${row.id}: [VALID] ✅`);
      } else {
        console.log(`ID ${row.id}: [INVALID - ${response.status}] ❌ -> Disabling in DB...`);
        await client.query("UPDATE shannon_api_pool SET is_active = FALSE WHERE id = $1", [row.id]);
      }
    }
    console.log("\n--- AUDIT COMPLETE ---");
  } catch (err) {
    console.error("Audit Failed:", err.message);
  } finally {
    await client.end();
  }
}
audit();
