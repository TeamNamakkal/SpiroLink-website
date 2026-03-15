import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DATABASE_URL || '';
const shouldUseSsl =
  dbUrl.includes('render.com') ||
  dbUrl.includes('railway.app') ||
  dbUrl.includes('rlwy.net');

const pool = new Pool({
  connectionString: dbUrl,
  ssl: shouldUseSsl ? { rejectUnauthorized: false } : undefined,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('connect', () => {
  console.log('✅ PostgreSQL connected successfully');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
});

export default pool;
