const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authenticateAdmin } = require('../middleware/auth');

// Determine upload destination directory
const frontendUploadDir = path.resolve(__dirname, '../../../frontend/public/uploads');
const localUploadDir = path.resolve(__dirname, '../../public/uploads');

const targetUploadDir = fs.existsSync(path.resolve(__dirname, '../../../frontend'))
  ? frontendUploadDir
  : localUploadDir;

if (!fs.existsSync(targetUploadDir)) {
  fs.mkdirSync(targetUploadDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(targetUploadDir)) {
      fs.mkdirSync(targetUploadDir, { recursive: true });
    }
    cb(null, targetUploadDir);
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const uniqueName = `${Date.now()}_${cleanName}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// POST /api/upload - Admin only
router.post('/', authenticateAdmin, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const publicUrl = `/uploads/${req.file.filename}`;
    return res.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error('Upload handling error:', err);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
});

module.exports = router;
