import { Pool } from 'pg';

if (!global.postgresPool) {
  console.log("Initializing New Global Postgres Pool...");
  global.postgresPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    // Optimized for Serverless + Neon Free Tier
    max: 6, 
    connectionTimeoutMillis: 30000, // 30 seconds (Wait for DB to wake up)
    idleTimeoutMillis: 15000,       // Close idle connections after 15s
  });

  global.postgresPool.on('error', (err) => {
    console.error('Unexpected error on idle database client', err);
  });
}

export default global.postgresPool;
