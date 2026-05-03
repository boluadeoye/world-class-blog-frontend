const { Client } = require('pg');
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });

const question = (query) => new Promise((resolve) => readline.question(query, resolve));

async function run() {
  console.log("\n--- SHANNON STUDIO: 10-KEY NEON INITIALIZER ---");
  const dbUrl = await question('Paste your Neon Connection String: ');
  const keysInput = await question('Paste all 10 API keys (separated by commas): ');
  
  const keys = keysInput.split(',').map(k => k.trim()).filter(k => k.length > 0);

  if (keys.length !== 10) {
    console.error(`\n[!] ERROR: You provided ${keys.length} keys. 10 are required for this architecture.`);
    process.exit(1);
  }

  const client = new Client({ connectionString: dbUrl });

  try {
    await client.connect();
    console.log("\n[1/3] Hardening Database Schema...");
    
    // Using a Transaction to ensure "All or Nothing" execution
    await client.query('BEGIN');

    await client.query(`
      CREATE TABLE IF NOT EXISTS shannon_api_pool (
          id SERIAL PRIMARY KEY,
          key_val TEXT UNIQUE NOT NULL,
          calls_left INTEGER DEFAULT 100,
          tokens_left INTEGER DEFAULT 80000,
          last_used TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          reset_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + interval '4 hours'),
          daily_reset_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + interval '24 hours'),
          is_active BOOLEAN DEFAULT TRUE
      );

      CREATE TABLE IF NOT EXISTS shannon_history (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT DEFAULT 'New Chat',
          system_prompt TEXT,
          messages JSONB DEFAULT '[]',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("[2/3] Injecting 10-Key Matrix into Pool...");
    for (const key of keys) {
      await client.query(
        "INSERT INTO shannon_api_pool (key_val) VALUES ($1) ON CONFLICT (key_val) DO NOTHING",
        [key]
      );
    }

    await client.query('COMMIT');
    console.log("[3/3] 10-Key Infrastructure Verified.");
    console.log("\nSUCCESS: Your 800,000 token/day engine is ready.");
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("\nCRITICAL EXECUTION ERROR:", err.message);
  } finally {
    await client.end();
    readline.close();
  }
}

run();
