import { neon } from '@neondatabase/serverless';

// Ensure the environment variable exists
if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL is missing. Check your environment variables.");
}

// Initialize the Neon serverless SQL connection
const sql = neon(process.env.DATABASE_URL || '');

// Export as default to satisfy all 42 API routes (imported as 'sql' or 'pool')
export default sql;
