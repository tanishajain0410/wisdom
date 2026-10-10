import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import {
  getAdminSession,
  verifyToken,
  checkAdminCredentials,
  isVaultUnlocked,
  checkVaultPassword,
} from '@/lib/auth';

const CERTIFICATE_FILES: Record<string, { filename: string; title: string }> = {
  primary: {
    filename: 'wisdom-primary-recognition-certificate.pdf',
    title: 'Wisdom_International_School_Primary_Recognition_Certificate.pdf',
  },
  'wisdom-primary': {
    filename: 'wisdom-primary-recognition-certificate.pdf',
    title: 'Wisdom_International_School_Primary_Recognition_Certificate.pdf',
  },
  'wisdom-primary-recognition-certificate.pdf': {
    filename: 'wisdom-primary-recognition-certificate.pdf',
    title: 'Wisdom_International_School_Primary_Recognition_Certificate.pdf',
  },
  'upper-primary': {
    filename: 'wisdom-upper-primary-recognition-certificate.pdf',
    title: 'Wisdom_International_School_Upper_Primary_Recognition_Certificate.pdf',
  },
  upper: {
    filename: 'wisdom-upper-primary-recognition-certificate.pdf',
    title: 'Wisdom_International_School_Upper_Primary_Recognition_Certificate.pdf',
  },
  'wisdom-upper-primary-recognition-certificate.pdf': {
    filename: 'wisdom-upper-primary-recognition-certificate.pdf',
    title: 'Wisdom_International_School_Upper_Primary_Recognition_Certificate.pdf',
  },
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const docKey = (searchParams.get('doc') || searchParams.get('id') || 'primary').toLowerCase();
    const token = searchParams.get('token');
    const password = searchParams.get('key') || searchParams.get('password');
    const vaultKey = searchParams.get('vaultKey');
    const download = searchParams.get('download') === '1' || searchParams.get('download') === 'true';

    // 1. Check Admin Authentication
    let isAdminAuthed = false;
    const session = await getAdminSession();
    if (session) {
      isAdminAuthed = true;
    } else if (token) {
      const verified = verifyToken(token);
      if (verified) isAdminAuthed = true;
    } else if (password) {
      const validPass = await checkAdminCredentials('admin', password);
      if (validPass) isAdminAuthed = true;
    }

    if (!isAdminAuthed) {
      return NextResponse.json(
        {
          error:
            'Access Denied: Government recognition certificates are confidential administrative documents. Admin portal authentication required.',
        },
        { status: 403 }
      );
    }

    // 2. Check Secondary Vault Master Key
    const isUnlocked =
      (await isVaultUnlocked()) ||
      (vaultKey ? await checkVaultPassword(vaultKey) : false);

    if (!isUnlocked) {
      return NextResponse.json(
        {
          error:
            'Access Denied: Certificate Vault is locked. Enter the secondary Vault Master Key in the Admin Portal to download.',
        },
        { status: 403 }
      );
    }

    // 3. Resolve Certificate File
    const targetCert = CERTIFICATE_FILES[docKey] || CERTIFICATE_FILES.primary;
    const filePath = path.resolve(process.cwd(), 'protected-documents', targetCert.filename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Requested document file not found on server.' },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);
    const dispositionType = download ? 'attachment' : 'inline';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `${dispositionType}; filename="${targetCert.title}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (err: any) {
    console.error('Certificate download error:', err);
    return NextResponse.json(
      { error: 'Internal server error while retrieving document.' },
      { status: 500 }
    );
  }
}
