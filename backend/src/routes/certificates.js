const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');
const { JWT_SECRET } = require('../middleware/auth');

const CERTIFICATE_FILES = {
  primary: 'wisdom-primary-recognition-certificate.pdf',
  'upper-primary': 'wisdom-upper-primary-recognition-certificate.pdf',
};

// POST /api/certificates/verify
router.post('/verify', async (req, res) => {
  try {
    const password = (req.body?.password || '').trim();
    if (!password) {
      return res.status(400).json({ success: false, error: 'Password required' });
    }

    const defaultPass = process.env.DEFAULT_ADMIN_PASSWORD || 'wisdom@2026';
    let isValid = false;

    try {
      const result = await query('SELECT password_hash FROM admin_users WHERE username = $1', ['admin']);
      if (result.rows.length > 0) {
        isValid = await bcrypt.compare(password, result.rows[0].password_hash);
      }
    } catch (e) {
      console.warn('[CERT AUTH] DB check warning:', e.message);
    }

    if (!isValid && password === defaultPass) {
      isValid = true;
    }

    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Incorrect administrator password.' });
    }

    const token = jwt.sign({ username: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: 'Admin verified successfully' });
  } catch (err) {
    console.error('Cert verify error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/certificates/download
router.get('/download', async (req, res) => {
  try {
    const docKey = (req.query.doc || 'primary').toLowerCase();
    const token = req.cookies?.admin_token || req.headers.authorization?.replace(/^Bearer\s+/i, '');
    let isAuthed = false;

    if (token) {
      try {
        jwt.verify(token, JWT_SECRET);
        isAuthed = true;
      } catch (_) {}
    }

    if (!isAuthed && req.query.key) {
      const defaultPass = process.env.DEFAULT_ADMIN_PASSWORD || 'wisdom@2026';
      if (req.query.key === defaultPass) isAuthed = true;
    }

    if (!isAuthed) {
      return res.status(403).json({
        error: 'Access Denied: Government recognition certificates are confidential administrative documents.',
      });
    }

    const filename = CERTIFICATE_FILES[docKey] || CERTIFICATE_FILES.primary;
    const candidates = [
      path.resolve(__dirname, '../../../frontend/protected-documents', filename),
      path.resolve(__dirname, '../../frontend/protected-documents', filename),
    ];

    const filePath = candidates.find((p) => fs.existsSync(p));
    if (!filePath) {
      return res.status(404).json({ error: 'Certificate file not found' });
    }

    const isDownload = req.query.download === '1' || req.query.download === 'true';
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `${isDownload ? 'attachment' : 'inline'}; filename="${filename}"`);
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');

    const stream = fs.createReadStream(filePath);
    return stream.pipe(res);
  } catch (err) {
    console.error('Cert download error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
