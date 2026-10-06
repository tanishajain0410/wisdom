import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

// GET /api/enquiries - Admin only
export async function GET(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');
  const grade = searchParams.get('grade');

  let sql = 'SELECT * FROM admission_enquiries WHERE 1=1';
  const params: any[] = [];

  if (status && status !== 'ALL') {
    params.push(status);
    sql += ` AND status = $${params.length}`;
  }

  if (grade && grade !== 'ALL') {
    params.push(grade);
    sql += ` AND grade = $${params.length}`;
  }

  if (search) {
    params.push(`%${search}%`);
    const idx = params.length;
    sql += ` AND (student_name ILIKE $${idx} OR parent_name ILIKE $${idx} OR phone ILIKE $${idx} OR email ILIKE $${idx})`;
  }

  sql += ' ORDER BY created_at DESC';

  try {
    const result = await query(sql, params);
    return NextResponse.json({ enquiries: result.rows });
  } catch (err: any) {
    console.error('Fetch enquiries error:', err);
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

// POST /api/enquiries - Public Form Submission
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentName, parentName, phone, email, grade, message } = body;

    if (!studentName || !parentName || !phone || !grade) {
      return NextResponse.json(
        { error: 'Student name, parent name, phone number, and class are required' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO admission_enquiries 
       (student_name, parent_name, phone, email, grade, message, status) 
       VALUES ($1, $2, $3, $4, $5, $6, 'NEW') 
       RETURNING *`,
      [
        studentName.trim(),
        parentName.trim(),
        phone.trim(),
        email ? email.trim() : null,
        grade.trim(),
        message ? message.trim() : null,
      ]
    );

    return NextResponse.json({ success: true, enquiry: result.rows[0] }, { status: 201 });
  } catch (err: any) {
    console.error('Submit enquiry error:', err);
    return NextResponse.json({ error: 'Failed to submit admission enquiry' }, { status: 500 });
  }
}
