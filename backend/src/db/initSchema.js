const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { pool, query } = require('../config/db');

async function initSchema({ verbose = true } = {}) {
  const log = (...args) => {
    if (verbose) console.log('[DB INIT]', ...args);
  };

  log('Initializing database schema and initial data...');

  const client = await pool.connect();
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

    // 5. Production Indexes for query performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_enquiries_status ON admission_enquiries(status);
      CREATE INDEX IF NOT EXISTS idx_enquiries_created ON admission_enquiries(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery_items(is_featured);
      CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_items(category);
    `);

    // 6. Seed Default Admin User if table is empty
    const adminCheck = await client.query('SELECT id FROM admin_users LIMIT 1');
    if (adminCheck.rows.length === 0) {
      const defaultUser = process.env.DEFAULT_ADMIN_USER || 'admin';
      const defaultPass = process.env.DEFAULT_ADMIN_PASSWORD || 'wisdom@2026';
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(defaultPass, salt);
      await client.query(
        'INSERT INTO admin_users (username, password_hash) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [defaultUser, hash]
      );
      log(`Created initial admin user (${defaultUser}).`);
    }

    // 7. Seed Default School Settings
    const defaultSettings = [
      { key: 'school_name', value: 'Wisdom International School' },
      { key: 'phone', value: '+91 70111 60057' },
      { key: 'email', value: 'wisdominternational.mau@gmail.com' },
      { key: 'address', value: 'Parwaripura Mohalla, Bus Stand, near Tikamgarh, Mauranipur, Roni, Uttar Pradesh 284204' },
      { key: 'visiting_hours', value: 'Monday – Saturday: 8:00 AM – 3:00 PM' },
    ];

    for (const s of defaultSettings) {
      await client.query(
        `INSERT INTO school_settings (key, value)
         VALUES ($1, $2)
         ON CONFLICT (key) DO NOTHING`,
        [s.key, s.value]
      );
    }

    // 8. Seed Gallery Data from frontend/src/data/site.ts if gallery is empty
    const galCountRes = await client.query('SELECT COUNT(*) FROM gallery_items');
    const galCount = parseInt(galCountRes.rows[0].count, 10);

    if (galCount === 0) {
      log('Populating initial gallery photos from site configuration...');
      const sitePathCandidates = [
        path.resolve(__dirname, '../../../frontend/src/data/site.ts'),
        path.resolve(__dirname, '../../data/site.ts'),
      ];

      const sitePath = sitePathCandidates.find((p) => fs.existsSync(p));
      if (sitePath) {
        const code = fs.readFileSync(sitePath, 'utf8');
        const items = [];

        // Parse roundTwo calls
        const roundTwoRegex = /roundTwo\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"(?:\s*,\s*(true|false))?\s*\)/g;
        let match;
        while ((match = roundTwoRegex.exec(code)) !== null) {
          const [, file, category, caption, wideStr] = match;
          items.push({
            title: caption,
            category,
            imageUrl: `/images/gallery/round-2/${file}.webp`,
            caption,
            isFeatured: wideStr === 'true',
          });
        }

        // Parse base gallery items
        const baseRegex = /\{\s*src:\s*"([^"]+)"\s*,\s*alt:\s*"([^"]*)"\s*,\s*category:\s*"([^"]+)"\s*,\s*caption:\s*"([^"]+)"(?:\s*,\s*wide:\s*(true|false))?\s*\}/g;
        while ((match = baseRegex.exec(code)) !== null) {
          const [, src, , category, caption, wideStr] = match;
          items.push({
            title: caption,
            category,
            imageUrl: src,
            caption,
            isFeatured: wideStr === 'true',
          });
        }

        for (const item of items) {
          await client.query(
            `INSERT INTO gallery_items (title, category, image_url, caption, is_featured)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (image_url) DO NOTHING`,
            [item.title, item.category, item.imageUrl, item.caption, item.isFeatured]
          );
        }
        log(`Seeded ${items.length} initial gallery items.`);
      }
    }

    // 9. Seed Sample Enquiries if table is empty
    const enqCountRes = await client.query('SELECT COUNT(*) FROM admission_enquiries');
    if (parseInt(enqCountRes.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO admission_enquiries (student_name, parent_name, phone, email, grade, message, status)
        VALUES 
          ('Aarav Sharma', 'Rajesh Sharma', '+91 98765 43210', 'rajesh.sharma@example.com', 'Play Group', 'Want to know about fee structure and transport facility.', 'NEW'),
          ('Ananya Richhariya', 'Deepak Richhariya', '+91 91234 56789', 'deepak@example.com', 'Class 1', 'Enquiring for Class 1 admission for 2026-27 session.', 'CONTACTED')
        ON CONFLICT DO NOTHING
      `);
      log('Seeded sample admission enquiries.');
    }

    await client.query('COMMIT');

    const c1 = await client.query('SELECT COUNT(*) FROM admin_users');
    const c2 = await client.query('SELECT COUNT(*) FROM admission_enquiries');
    const c3 = await client.query('SELECT COUNT(*) FROM gallery_items');
    const c4 = await client.query('SELECT COUNT(*) FROM school_settings');

    const summary = {
      admin_users: parseInt(c1.rows[0].count, 10),
      admission_enquiries: parseInt(c2.rows[0].count, 10),
      gallery_items: parseInt(c3.rows[0].count, 10),
      school_settings: parseInt(c4.rows[0].count, 10),
    };

    log('Database schema verification complete. Current counts:', summary);
    return { success: true, counts: summary };
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[DB INIT ERROR] Failed to initialize schema:', err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  initSchema,
};
