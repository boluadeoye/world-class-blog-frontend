import { Pool } from 'pg';

let pool;

if (!process.env.DATABASE_URL) {
  throw new Error("CRITICAL ERROR: DATABASE_URL is missing. Please add it to Vercel Environment Variables.");
}

if (!pool) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Required for Neon
    }
  });
}

export default pool;
