import { Pool } from 'pg';

let pool;

if (!global.postgresPool) {
  global.postgresPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    // CRITICAL SERVERLESS SETTINGS
    max: 1, // Force 1 connection per lambda to prevent exhaustion
    idleTimeoutMillis: 5000, // Close immediately if not used
    connectionTimeoutMillis: 5000, // Fail fast
  });
}

pool = global.postgresPool;

export default pool;
