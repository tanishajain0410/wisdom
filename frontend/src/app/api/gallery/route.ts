import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

// GET /api/gallery - Public & Admin
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  const featured = searchParams.get('featured');

  let sql = 'SELECT * FROM gallery_items WHERE 1=1';
  const params: any[] = [];

  if (category && category !== 'ALL') {
    params.push(category);
    sql += ` AND category = $${params.length}`;
  }

  if (featured === 'true') {
    params.push(true);
    sql += ` AND is_featured = $${params.length}`;
  }

  sql += ' ORDER BY is_featured DESC, id DESC';

  try {
    const result = await query(sql, params);
    return NextResponse.json({ items: result.rows });
  } catch (err: any) {
    console.error('Fetch gallery error:', err);
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}

// POST /api/gallery - Admin only
export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, category, imageUrl, caption, isFeatured } = await req.json();

    if (!title || !category || !imageUrl) {
      return NextResponse.json({ error: 'Title, category, and image URL are required' }, { status: 400 });
    }

    const result = await query(
      `INSERT INTO gallery_items (title, category, image_url, caption, is_featured)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title.trim(), category.trim(), imageUrl.trim(), caption ? caption.trim() : null, Boolean(isFeatured)]
    );

    return NextResponse.json({ success: true, item: result.rows[0] }, { status: 201 });
  } catch (err: any) {
    console.error('Add gallery item error:', err);
    return NextResponse.json({ error: 'Failed to add gallery item' }, { status: 500 });
  }
}
