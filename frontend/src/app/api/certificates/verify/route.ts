import { NextResponse } from 'next/server';
import { checkAdminCredentials, setAdminSessionCookie } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    let password = '';
    try {
      const body = await req.json();
      password = (body?.password || '').toString().trim();
    } catch {
      const text = await req.text();
      try {
        const parsed = JSON.parse(text);
        password = (parsed?.password || '').toString().trim();
      } catch {
        password = '';
      }
    }

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required to access official certificates.' },
        { status: 400 }
      );
    }

    const isValid = await checkAdminCredentials('admin', password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Incorrect administrator password. Access denied.' },
        { status: 401 }
      );
    }

    await setAdminSessionCookie('admin');
    return NextResponse.json({
      success: true,
      message: 'Admin authorization verified. Certificate access granted.',
    });
  } catch (err: any) {
    console.error('Certificate verify error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error verifying credentials.' },
      { status: 500 }
    );
  }
}
