import { NextResponse } from 'next/server';
import { getAdminSession, checkVaultPassword, changeVaultPassword } from '@/lib/auth';

// POST /api/certificates/vault/password - Change Certificate Vault Key
export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin login required' }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Both current vault key and new vault key are required.' },
        { status: 400 }
      );
    }

    if (newPassword.trim().length < 6) {
      return NextResponse.json(
        { error: 'New vault key must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const isValidCurrent = await checkVaultPassword(currentPassword);
    if (!isValidCurrent) {
      return NextResponse.json(
        { error: 'Incorrect current vault security key.' },
        { status: 400 }
      );
    }

    const success = await changeVaultPassword(newPassword.trim());
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update vault password in database.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Certificate Vault Security Key updated successfully!',
    });
  } catch (err: any) {
    console.error('Change vault password error:', err);
    return NextResponse.json(
      { error: 'Internal server error updating vault key.' },
      { status: 500 }
    );
  }
}
