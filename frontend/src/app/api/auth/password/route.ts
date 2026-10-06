import { NextResponse } from 'next/server';
import { getAdminSession, checkAdminCredentials, changeAdminPassword } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await req.json();
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Both current and new password are required' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
    }

    const validCurrent = await checkAdminCredentials(session.username, currentPassword);
    if (!validCurrent) {
      return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
    }

    const changed = await changeAdminPassword(session.username, newPassword);
    if (!changed) {
      return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Password updated successfully' });
  } catch (err: any) {
    console.error('Password change error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
