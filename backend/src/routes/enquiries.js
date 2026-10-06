const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { authenticateAdmin } = require('../middleware/auth');

// GET /api/enquiries - Admin only
router.get('/', authenticateAdmin, async (req, res) => {
  const { status, search, grade } = req.query;

  let sql = 'SELECT * FROM admission_enquiries WHERE 1=1';
  const params = [];

  if (status && status !== 'ALL') {
    params.push(status);
    sql += ` AND status = $${params.length}`;
  }

  if (grade && grade !== 'ALL') {
    params.push(grade);
    sql += ` AND grade = $${params.length}`;
  }

  if (search) {
    params.push(`%${search}%`);
    const idx = params.length;
    sql += ` AND (student_name ILIKE $${idx} OR parent_name ILIKE $${idx} OR phone ILIKE $${idx} OR email ILIKE $${idx})`;
  }

  sql += ' ORDER BY created_at DESC';

  try {
    const result = await query(sql, params);
    return res.json({ enquiries: result.rows });
  } catch (err) {
    console.error('Fetch enquiries error:', err);
    return res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

// POST /api/enquiries - Public Form Submission
router.post('/', async (req, res) => {
  try {
    const { studentName, parentName, phone, email, grade, message } = req.body;

    if (!studentName || !parentName || !phone || !grade) {
      return res.status(400).json({ error: 'Student name, parent name, phone number, and grade are required.' });
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 10) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number.' });
    }

    const result = await query(
      `INSERT INTO admission_enquiries (student_name, parent_name, phone, email, grade, message, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'NEW')
       RETURNING id, student_name, created_at`,
      [studentName.trim(), parentName.trim(), cleanPhone, email ? email.trim() : null, grade.trim(), message ? message.trim() : null]
    );

    return res.status(201).json({
      success: true,
      message: 'Admission enquiry submitted successfully! Our school team will contact you shortly.',
      enquiryId: result.rows[0].id,
    });
  } catch (err) {
    console.error('Submit enquiry error:', err);
    return res.status(500).json({ error: 'Failed to submit enquiry. Please try again or call the school directly.' });
  }
});

// PATCH /api/enquiries/:id - Admin only
router.patch('/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const { status, notes } = req.body;

    const updates = [];
    const values = [];

    if (status !== undefined) {
      const validStatuses = ['NEW', 'CONTACTED', 'VISIT_SCHEDULED', 'ADMITTED', 'REJECTED'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
      }
      values.push(status);
      updates.push(`status = $${values.length}`);
    }

    if (notes !== undefined) {
      values.push(notes ? notes.trim() : null);
      updates.push(`notes = $${values.length}`);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);
    const sql = `UPDATE admission_enquiries SET ${updates.join(', ')} WHERE id = $${values.length} RETURNING *`;
    const result = await query(sql, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    return res.json({ success: true, enquiry: result.rows[0] });
  } catch (err) {
    console.error('Update enquiry error:', err);
    return res.status(500).json({ error: 'Failed to update enquiry' });
  }
});

// DELETE /api/enquiries/:id - Admin only
router.delete('/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('DELETE FROM admission_enquiries WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    return res.json({ success: true, deletedId: id });
  } catch (err) {
    console.error('Delete enquiry error:', err);
    return res.status(500).json({ error: 'Failed to delete enquiry' });
  }
});

module.exports = router;
