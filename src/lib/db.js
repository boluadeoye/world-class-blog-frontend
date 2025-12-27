import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables.");
}

// This creates a stateless, high-speed SQL client
const sql = neon(process.env.DATABASE_URL);

export default sql;
