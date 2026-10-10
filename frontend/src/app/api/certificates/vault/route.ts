import { NextResponse } from 'next/server';
import {
  getAdminSession,
  checkVaultPassword,
  setVaultSessionCookie,
  clearVaultSessionCookie,
  isVaultUnlocked,
} from '@/lib/auth';

// GET /api/certificates/vault - Check if vault is currently unlocked
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin login required' }, { status: 401 });
  }

  const unlocked = await isVaultUnlocked();
  return NextResponse.json({ unlocked });
}

// POST /api/certificates/vault - Unlock vault with secondary master key
export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin login required' }, { status: 401 });
  }

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
        { success: false, error: 'Vault security key is required.' },
        { status: 400 }
      );
    }

    const isValid = await checkVaultPassword(password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Incorrect Certificate Vault Security Key. Access denied.' },
        { status: 401 }
      );
    }

    await setVaultSessionCookie();
    return NextResponse.json({
      success: true,
      message: 'Certificate Vault unlocked successfully. Documents and order numbers are accessible.',
    });
  } catch (err: any) {
    console.error('Vault unlock error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error verifying vault key' }, { status: 500 });
  }
}

// DELETE /api/certificates/vault - Re-lock vault
export async function DELETE() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await clearVaultSessionCookie();
  return NextResponse.json({ success: true, message: 'Certificate Vault locked.' });
}
