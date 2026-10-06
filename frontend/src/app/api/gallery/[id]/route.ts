import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

// PATCH /api/gallery/[id] - Edit gallery photo details
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  try {
    const { title, category, imageUrl, caption, isFeatured } = await req.json();

    const updates: string[] = [];
    const values: any[] = [];

    if (title !== undefined) {
      values.push(title.trim());
      updates.push(`title = $${values.length}`);
    }
    if (category !== undefined) {
      values.push(category.trim());
      updates.push(`category = $${values.length}`);
    }
    if (imageUrl !== undefined) {
      values.push(imageUrl.trim());
      updates.push(`image_url = $${values.length}`);
    }
    if (caption !== undefined) {
      values.push(caption ? caption.trim() : null);
      updates.push(`caption = $${values.length}`);
    }
    if (isFeatured !== undefined) {
      values.push(Boolean(isFeatured));
      updates.push(`is_featured = $${values.length}`);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    values.push(id);
    const sql = `UPDATE gallery_items SET ${updates.join(', ')} WHERE id = $${values.length} RETURNING *`;
    const result = await query(sql, values);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, item: result.rows[0] });
  } catch (err: any) {
    console.error('Update gallery item error:', err);
    return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 });
  }
}

// DELETE /api/gallery/[id] - Admin only
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  try {
    const result = await query('DELETE FROM gallery_items WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    console.error('Delete gallery item error:', err);
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
