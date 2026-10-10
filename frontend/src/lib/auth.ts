import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { query } from './db';

const SESSION_SECRET =
  process.env.SESSION_SECRET || 'wisdom_school_admin_secret_key_secure_session_token_2026';
const COOKIE_NAME = 'wisdom_admin_session';

export function signToken(payload: object): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url');
  return `${data}.${signature}`;
}

export function verifyToken<T = any>(token: string): T | null {
  try {
    const [data, signature] = token.split('.');
    if (!data || !signature) return null;

    const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url');
    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf-8'));
    // Check expiry if present (7 days default)
    if (payload.exp && Date.now() > payload.exp) return null;

    return payload as T;
  } catch {
    return null;
  }
}

export async function checkAdminCredentials(username: string, password: string): Promise<boolean> {
  try {
    const result = await query('SELECT password_hash FROM admin_users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const hash = result.rows[0].password_hash;
      const isMatch = await bcrypt.compare(password, hash);
      if (isMatch) return true;
    }
  } catch (err) {
    console.warn('[AUTH] Database check failed, falling back to env credentials:', err);
  }

  const envUser = process.env.ADMIN_USERNAME || 'admin';
  const envPass = process.env.ADMIN_PASSWORD || 'wisdom@2026';
  if (username === envUser && password === envPass) {
    return true;
  }

  return false;
}

export async function changeAdminPassword(username: string, newPassword: string): Promise<boolean> {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);
  const result = await query(
    'UPDATE admin_users SET password_hash = $1 WHERE username = $2 RETURNING id',
    [hash, username]
  );
  return (result.rowCount ?? 0) > 0;
}

export async function getAdminSession(): Promise<{ username: string } | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  if (!sessionCookie?.value) return null;

  const payload = verifyToken<{ username: string }>(sessionCookie.value);
  if (!payload || !payload.username) return null;

  return { username: payload.username };
}

export async function setAdminSessionCookie(username: string) {
  const cookieStore = await cookies();
  const token = signToken({
    username,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  cookieStore.set(VAULT_COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
}

const VAULT_COOKIE_NAME = 'wisdom_cert_vault_session';

export async function getVaultPassword(): Promise<string> {
  try {
    const res = await query('SELECT value FROM school_settings WHERE key = $1', ['certificate_vault_password']);
    if (res.rows.length > 0 && res.rows[0].value) {
      return res.rows[0].value;
    }
  } catch (err) {
    console.warn('[AUTH] Error reading vault password from settings:', err);
  }
  return process.env.CERTIFICATE_VAULT_PASSWORD || 'wisdom@vault2026';
}

export async function checkVaultPassword(password: string): Promise<boolean> {
  const stored = await getVaultPassword();
  return password.trim() === stored.trim();
}

export async function setVaultSessionCookie() {
  const cookieStore = await cookies();
  const token = signToken({
    vault: true,
    exp: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
  });

  cookieStore.set(VAULT_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 2 * 60 * 60,
  });
}

export async function clearVaultSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(VAULT_COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
}

export async function isVaultUnlocked(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(VAULT_COOKIE_NAME);
  if (!cookie?.value) return false;

  const payload = verifyToken<{ vault: boolean }>(cookie.value);
  return Boolean(payload?.vault);
}

export async function changeVaultPassword(newPassword: string): Promise<boolean> {
  try {
    await query(
      `INSERT INTO school_settings (key, value, updated_at) 
       VALUES ('certificate_vault_password', $1, CURRENT_TIMESTAMP)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP`,
      [newPassword.trim()]
    );
    return true;
  } catch (err) {
    console.error('[AUTH] Failed to update vault password:', err);
    return false;
  }
}
