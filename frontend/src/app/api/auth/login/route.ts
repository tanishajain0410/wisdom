import { NextResponse } from 'next/server';
import { checkAdminCredentials, setAdminSessionCookie } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    const isValid = await checkAdminCredentials(username.trim(), password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    await setAdminSessionCookie(username.trim());
    return NextResponse.json({ success: true, user: { username: username.trim() } });
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
