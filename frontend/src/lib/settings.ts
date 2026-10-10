import { query } from './db';

export async function getAdmissionSession(): Promise<string> {
  try {
    const res = await query('SELECT value FROM school_settings WHERE key = $1', ['admission_session']);
    if (res.rows.length > 0 && res.rows[0]?.value) {
      return res.rows[0].value;
    }
  } catch (err) {
    console.warn('[SETTINGS] Error fetching admission_session:', err);
  }
  return '2026–27';
}
