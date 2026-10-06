import { Pool, PoolConfig } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

const connectionString =
  process.env.DATABASE_URL || 'postgres://postgres:postgres@127.0.0.1:5432/wisdom_school';

function shouldUseSSL(connString: string) {
  if (process.env.DB_SSL === 'false' || process.env.DB_SSL === '0') return false;
  if (process.env.DB_SSL === 'true' || process.env.DB_SSL === '1') {
    return { rejectUnauthorized: false };
  }
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

const poolConfig: PoolConfig = {
  connectionString,
  max: parseInt(process.env.DB_MAX_CONNECTIONS || '10', 10),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 7000,
};

const ssl = shouldUseSSL(connectionString);
if (ssl) {
  poolConfig.ssl = ssl;
}

export const pool = global.__pgPool || new Pool(poolConfig);

if (process.env.NODE_ENV !== 'production') {
  global.__pgPool = pool;
}

export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<{ rows: T[]; rowCount: number | null }> {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return { rows: res.rows, rowCount: res.rowCount };
  } finally {
    client.release();
  }
}
