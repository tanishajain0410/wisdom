require('dotenv').config();
const { initSchema } = require('../src/db/initSchema');
const { pool } = require('../src/config/db');

async function main() {
  console.log('Running database setup script...');
  try {
    const res = await initSchema({ verbose: true });
    console.log('Database initialized successfully:', res.counts);
  } catch (err) {
    console.error('Fatal initialization error:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
