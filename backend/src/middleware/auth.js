const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'wisdom-school-jwt-secret-key-2026-secure';

function authenticateAdmin(req, res, next) {
  // Support cookie or Bearer token
  const token = req.cookies?.admin_token || req.headers.authorization?.replace(/^Bearer\s+/i, '');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired session' });
  }
}

module.exports = {
  authenticateAdmin,
  JWT_SECRET,
};
