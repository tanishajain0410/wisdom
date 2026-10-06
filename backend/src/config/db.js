require('dotenv').config();
const { Pool } = require('pg');

const rawConnectionString =
  process.env.DATABASE_URL || 'postgres://postgres:postgres@127.0.0.1:5432/wisdom_school';

// Detect whether SSL is needed for production cloud databases (Neon, Supabase, Render, AWS RDS, etc.)
function shouldUseSSL(connString) {
  if (process.env.DB_SSL === 'false' || process.env.DB_SSL === '0') return false;
  if (process.env.DB_SSL === 'true' || process.env.DB_SSL === '1') {
    return { rejectUnauthorized: false };
  }
  if (!connString) return false;

  const isLocal =
    connString.includes('127.0.0.1') ||
    connString.includes('localhost') ||
    connString.includes('::1');

  const hasSslQuery = connString.includes('sslmode=require') || connString.includes('ssl=true');
  const isCloudHost =
    connString.includes('neon.tech') ||
    connString.includes('supabase.co') ||
    connString.includes('render.com') ||
    connString.includes('rds.amazonaws.com') ||
    connString.includes('railway.app');

  if (hasSslQuery || isCloudHost || (!isLocal && process.env.NODE_ENV === 'production')) {
    return { rejectUnauthorized: false };
  }
  return false;
}

const poolConfig = {
  connectionString: rawConnectionString,
  max: parseInt(process.env.DB_MAX_CONNECTIONS || '20', 10),
  idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MS || '30000', 10),
  connectionTimeoutMillis: parseInt(process.env.DB_CONNECT_TIMEOUT_MS || '8000', 10),
};

const sslOption = shouldUseSSL(rawConnectionString);
if (sslOption) {
  poolConfig.ssl = sslOption;
}

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  console.error('[DB POOL] Unexpected error on idle PostgreSQL client:', err.message);
});

async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'production' && duration > 150) {
      console.log(`[DB SLOW QUERY] (${duration}ms):`, text.slice(0, 100));
    }
    return res;
  } catch (err) {
    console.error(`[DB QUERY ERROR] Query failed: ${err.message}`);
    throw err;
  }
}

async function checkConnection(retries = 3, delayMs = 1500) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await pool.query('SELECT NOW() as current_time, current_database() as db_name, version()');
      return {
        ok: true,
        database: res.rows[0].db_name,
        time: res.rows[0].current_time,
        version: res.rows[0].version.split(' ')[0] + ' ' + res.rows[0].version.split(' ')[1],
      };
    } catch (err) {
      console.warn(`[DB CHECK] Attempt ${attempt}/${retries} failed: ${err.message}`);
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else {
        return { ok: false, error: err.message };
      }
    }
  }
}

module.exports = {
  pool,
  query,
  checkConnection,
};
