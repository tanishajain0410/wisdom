const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@127.0.0.1:5432/wisdom_school'
});

async function main() {
  const sitePath = fs.existsSync(path.join(__dirname, '..', 'src', 'data', 'site.ts'))
    ? path.join(__dirname, '..', 'src', 'data', 'site.ts')
    : path.join(__dirname, '..', '..', 'frontend', 'src', 'data', 'site.ts');
  const code = fs.readFileSync(sitePath, 'utf8');

  // Extract roundTwo calls: roundTwo("r2-00","School Campus","Activity classroom prepared for young learners",true)
  const roundTwoRegex = /roundTwo\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"(?:\s*,\s*(true|false))?\s*\)/g;
  const items = [];

  let match;
  while ((match = roundTwoRegex.exec(code)) !== null) {
    const [_, file, category, caption, wideStr] = match;
    const isWide = wideStr === 'true';
    items.push({
      title: caption,
      category: category,
      imageUrl: `/images/gallery/round-2/${file}.webp`,
      caption: caption,
      isFeatured: isWide // Featured if wide/hero moment
    });
  }

  // Extract base gallery items: {src:"...",alt:"...",category:"...",caption:"...",wide:true}
  const baseRegex = /\{\s*src:\s*"([^"]+)"\s*,\s*alt:\s*"([^"]*)"\s*,\s*category:\s*"([^"]+)"\s*,\s*caption:\s*"([^"]+)"(?:\s*,\s*wide:\s*(true|false))?\s*\}/g;
  while ((match = baseRegex.exec(code)) !== null) {
    const [_, src, alt, category, caption, wideStr] = match;
    const isWide = wideStr === 'true';
    items.push({
      title: caption,
      category: category,
      imageUrl: src,
      caption: caption,
      isFeatured: isWide
    });
  }

  console.log(`Found ${items.length} photos in site.ts`);

  const client = await pool.connect();
  try {
    let inserted = 0;
    let existing = 0;

    for (const item of items) {
      const check = await client.query('SELECT id, is_featured FROM gallery_items WHERE image_url = $1', [item.imageUrl]);
      if (check.rows.length === 0) {
        await client.query(
          `INSERT INTO gallery_items (title, category, image_url, caption, is_featured)
           VALUES ($1, $2, $3, $4, $5)`,
          [item.title, item.category, item.imageUrl, item.caption, item.isFeatured]
        );
        inserted++;
      } else {
        existing++;
      }
    }

    console.log(`Sync completed! Inserted: ${inserted}, Already existing: ${existing}`);

    const total = await client.query('SELECT count(*), is_featured FROM gallery_items GROUP BY is_featured');
    console.log('Database gallery counts by featured status:', total.rows);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
