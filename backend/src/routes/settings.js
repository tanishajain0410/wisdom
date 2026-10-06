const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { authenticateAdmin } = require('../middleware/auth');

// GET /api/settings - Public
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT key, value FROM school_settings');
    const settings = {};
    for (const row of result.rows) {
      settings[row.key] = row.value;
    }
    return res.json({ settings });
  } catch (err) {
    console.error('Fetch settings error:', err);
    return res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// POST /api/settings - Admin only
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { phone, email, address, visiting_hours } = req.body;
    const updates = { phone, email, address, visiting_hours };

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        await query(
          `INSERT INTO school_settings (key, value, updated_at)
           VALUES ($1, $2, CURRENT_TIMESTAMP)
           ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP`,
          [key, value]
        );
      }
    }

    return res.json({ success: true, message: 'Settings saved successfully' });
  } catch (err) {
    console.error('Save settings error:', err);
    return res.status(500).json({ error: 'Failed to save settings' });
  }
});

module.exports = router;
