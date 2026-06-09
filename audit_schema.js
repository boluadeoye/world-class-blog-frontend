const { neon } = require('@neondatabase/serverless');

async function check() {
  const dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl) {
    console.error('❌ ERROR: DATABASE_URL is not defined in your environment.');
    process.exit(1);
  }

  const sql = neon(dbUrl);

  try {
    console.log('Auditing shannon_api_pool...');
    await sql`SELECT id, key_val, jail_until FROM shannon_api_pool LIMIT 1`;
    console.log('✅ API POOL: OK');
    
    console.log('Auditing shannon_history...');
    await sql`SELECT id, messages, system_prompt FROM shannon_history LIMIT 1`;
    console.log('✅ HISTORY: OK');
    
    process.exit(0);
  } catch (e) {
    console.error('\n❌ SCHEMA INTEGRITY FAILURE:');
    console.error(e.message);
    process.exit(1);
  }
}

check();
