import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'storefront',
  ssl: true
});

pool.connect((err) => {
  if (err) {
    console.error('db connection error', err.stack);
  } else {
    console.log('db connected');
  }
});

// @ts-ignore
export const pgQuery = async (query: string, params?: any[] = []) => {
  const start = Date.now();
  const res = await pool.query(query, params);
  const duration = Date.now() - start;
  console.log('executed query', { query, duration, res });
  return res;
};
