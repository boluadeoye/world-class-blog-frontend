import { Pool } from 'pg';

let pool;

if (!global.postgresPool) {
  global.postgresPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Required for Neon/AWS
    },
    max: 10, // Limit connections to prevent crashing
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });
}

pool = global.postgresPool;

export default pool;
