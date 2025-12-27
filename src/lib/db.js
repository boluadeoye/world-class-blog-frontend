import { Pool } from 'pg';

let pool;

if (!global.postgresPool) {
  global.postgresPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    max: 5, // REDUCED to 5 to prevent hitting Neon limits
    idleTimeoutMillis: 10000, // Close idle connections after 10 seconds
    connectionTimeoutMillis: 5000, // Fail fast if DB is busy
  });
}

pool = global.postgresPool;

export default pool;
