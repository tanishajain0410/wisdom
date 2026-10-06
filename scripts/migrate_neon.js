const fs = require('fs');
const path = require('path');
const { Pool } = require('../backend/node_modules/pg');
const bcrypt = require('../backend/node_modules/bcryptjs');

// Read DATABASE_URL from frontend/.env.local
const envFile = path.resolve(__dirname, '../frontend/.env.local');
const envContent = fs.readFileSync(envFile, 'utf8');
const match = envContent.match(/DATABASE_URL="([^"]+)"/);

if (!match) {
  console.error('DATABASE_URL not found in frontend/.env.local');
  process.exit(1);
}

const connectionString = match[1];
console.log('Connecting to Neon PostgreSQL...');

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  const client = await pool.connect();
  console.log('Connected to Neon successfully!');

  try {
    await client.query('BEGIN');

    // 1. Admin Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Admission Enquiries Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admission_enquiries (
        id SERIAL PRIMARY KEY,
        student_name VARCHAR(150) NOT NULL,
        parent_name VARCHAR(150) NOT NULL,
        phone VARCHAR(25) NOT NULL,
        email VARCHAR(150),
        grade VARCHAR(50) NOT NULL,
        message TEXT,
        status VARCHAR(30) DEFAULT 'NEW',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Gallery Items Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS gallery_items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        category VARCHAR(100) NOT NULL,
        image_url TEXT NOT NULL UNIQUE,
        caption TEXT,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. School Settings Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS school_settings (
        key VARCHAR(100) PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 5. Indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_enquiries_status ON admission_enquiries(status);
      CREATE INDEX IF NOT EXISTS idx_enquiries_created ON admission_enquiries(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery_items(is_featured);
      CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_items(category);
    `);

    // 6. Seed Admin
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('wisdom@2026', salt);
    await client.query(`
      INSERT INTO admin_users (username, password_hash)
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING
    `, ['admin', hash]);
    console.log('Admin user seeded: admin / wisdom@2026');

    // 7. Seed Settings
    const settings = [
      ['school_name', 'Wisdom International School'],
      ['phone', '+91 70111 60057'],
      ['email', 'wisdominternational.mau@gmail.com'],
      ['address', 'Parwaripura Mohalla, Bus Stand, near Tikamgarh, Mauranipur, Roni, Uttar Pradesh 284204'],
      ['visiting_hours', 'Monday – Saturday: 8:00 AM – 3:00 PM']
    ];
    for (const [k, v] of settings) {
      await client.query(`
        INSERT INTO school_settings (key, value)
        VALUES ($1, $2)
        ON CONFLICT (key) DO NOTHING
      `, [k, v]);
    }

    // 8. Seed Gallery
    const sitePath = path.resolve(__dirname, '../frontend/src/data/site.ts');
    if (fs.existsSync(sitePath)) {
      const code = fs.readFileSync(sitePath, 'utf8');
      const items = [];

      const roundTwoRegex = /roundTwo\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"(?:\s*,\s*(true|false))?\s*\)/g;
      let m;
      while ((m = roundTwoRegex.exec(code)) !== null) {
        items.push({
          title: m[3],
          category: m[2],
          imageUrl: `/images/gallery/round-2/${m[1]}.webp`,
          caption: m[3],
          isFeatured: m[4] === 'true'
        });
      }

      const baseRegex = /\{\s*src:\s*"([^"]+)"\s*,\s*alt:\s*"([^"]*)"\s*,\s*category:\s*"([^"]+)"\s*,\s*caption:\s*"([^"]+)"(?:\s*,\s*wide:\s*(true|false))?\s*\}/g;
      while ((m = baseRegex.exec(code)) !== null) {
        items.push({
          title: m[4],
          category: m[3],
          imageUrl: m[1],
          caption: m[4],
          isFeatured: m[5] === 'true'
        });
      }

      for (const item of items) {
        await client.query(`
          INSERT INTO gallery_items (title, category, image_url, caption, is_featured)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (image_url) DO NOTHING
        `, [item.title, item.category, item.imageUrl, item.caption, item.isFeatured]);
      }
      console.log(`Seeded ${items.length} gallery items into Neon.`);
    }

    // 9. Seed Sample Enquiry
    await client.query(`
      INSERT INTO admission_enquiries (student_name, parent_name, phone, email, grade, message, status)
      VALUES ('Aarav Sharma', 'Rajesh Sharma', '+91 98765 43210', 'rajesh.sharma@example.com', 'Play Group', 'Want to know about fee structure and transport facility.', 'NEW')
      ON CONFLICT DO NOTHING
    `);

    await client.query('COMMIT');
    console.log('Migration to Neon Postgres completed successfully!');

    const resAdmins = await client.query('SELECT COUNT(*) FROM admin_users');
    const resGallery = await client.query('SELECT COUNT(*) FROM gallery_items');
    const resEnquiries = await client.query('SELECT COUNT(*) FROM admission_enquiries');
    console.log('Neon Tables Status:');
    console.log('- admin_users:', resAdmins.rows[0].count);
    console.log('- gallery_items:', resGallery.rows[0].count);
    console.log('- admission_enquiries:', resEnquiries.rows[0].count);

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
