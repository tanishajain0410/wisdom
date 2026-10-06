const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { authenticateAdmin } = require('../middleware/auth');

// GET /api/gallery - Public & Admin
router.get('/', async (req, res) => {
  const { category, featured } = req.query;

  let sql = 'SELECT * FROM gallery_items WHERE 1=1';
  const params = [];

  if (category && category !== 'ALL') {
    params.push(category);
    sql += ` AND category = $${params.length}`;
  }

  if (featured === 'true') {
    params.push(true);
    sql += ` AND is_featured = $${params.length}`;
  }

  sql += ' ORDER BY is_featured DESC, id DESC';

  try {
    const result = await query(sql, params);
    return res.json({ items: result.rows });
  } catch (err) {
    console.error('Fetch gallery error:', err);
    return res.status(500).json({ error: 'Failed to fetch gallery items' });
  }
});

// POST /api/gallery - Admin only
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { title, category, imageUrl, caption, isFeatured } = req.body;

    if (!title || !category || !imageUrl) {
      return res.status(400).json({ error: 'Title, category, and image URL are required' });
    }

    const result = await query(
      `INSERT INTO gallery_items (title, category, image_url, caption, is_featured)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title.trim(), category.trim(), imageUrl.trim(), caption ? caption.trim() : null, Boolean(isFeatured)]
    );

    return res.status(201).json({ success: true, item: result.rows[0] });
  } catch (err) {
    console.error('Add gallery item error:', err);
    return res.status(500).json({ error: 'Failed to add gallery item' });
  }
});

// PATCH /api/gallery/:id - Admin only
router.patch('/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const { title, category, imageUrl, caption, isFeatured } = req.body;

    const updates = [];
    const values = [];

    if (title !== undefined) {
      values.push(title.trim());
      updates.push(`title = $${values.length}`);
    }
    if (category !== undefined) {
      values.push(category.trim());
      updates.push(`category = $${values.length}`);
    }
    if (imageUrl !== undefined) {
      values.push(imageUrl.trim());
      updates.push(`image_url = $${values.length}`);
    }
    if (caption !== undefined) {
      values.push(caption ? caption.trim() : null);
      updates.push(`caption = $${values.length}`);
    }
    if (isFeatured !== undefined) {
      values.push(Boolean(isFeatured));
      updates.push(`is_featured = $${values.length}`);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);
    const sql = `UPDATE gallery_items SET ${updates.join(', ')} WHERE id = $${values.length} RETURNING *`;
    const result = await query(sql, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    return res.json({ success: true, item: result.rows[0] });
  } catch (err) {
    console.error('Update gallery item error:', err);
    return res.status(500).json({ error: 'Failed to update gallery item' });
  }
});

// DELETE /api/gallery/:id - Admin only
router.delete('/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('DELETE FROM gallery_items WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    return res.json({ success: true, deletedId: id });
  } catch (err) {
    console.error('Delete gallery item error:', err);
    return res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

module.exports = router;
