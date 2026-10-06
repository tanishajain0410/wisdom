import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

// PATCH /api/enquiries/[id] - Update status or notes
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  try {
    const { status, notes } = await req.json();

    const updates: string[] = [];
    const values: any[] = [];

    if (status !== undefined) {
      values.push(status);
      updates.push(`status = $${values.length}`);
    }

    if (notes !== undefined) {
      values.push(notes);
      updates.push(`notes = $${values.length}`);
    }

    values.push(id);
    const sql = `UPDATE admission_enquiries 
                 SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP 
                 WHERE id = $${values.length} 
                 RETURNING *`;

    const result = await query(sql, values);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: result.rows[0] });
  } catch (err: any) {
    console.error('Update enquiry error:', err);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}

// DELETE /api/enquiries/[id] - Delete enquiry
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  try {
    const result = await query('DELETE FROM admission_enquiries WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    console.error('Delete enquiry error:', err);
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
