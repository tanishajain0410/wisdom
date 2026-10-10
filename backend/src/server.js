require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const { pool, checkConnection } = require('./config/db');
const { initSchema } = require('./db/initSchema');
const authRoutes = require('./routes/auth');
const galleryRoutes = require('./routes/gallery');
const enquiryRoutes = require('./routes/enquiries');
const settingRoutes = require('./routes/settings');
const uploadRoutes = require('./routes/upload');
const certificateRoutes = require('./routes/certificates');

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);
const HOST = process.env.HOST || '0.0.0.0';

// Configurable CORS Origins
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim().replace(/\/+$/, ''))
  .filter(Boolean);

// Always permit local development origins
['http://localhost:3000', 'http://127.0.0.1:3000'].forEach((o) => {
  if (!allowedOrigins.includes(o)) allowedOrigins.push(o);
});

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      // Check allowed list or localhost in development
      const isAllowed =
        allowedOrigins.includes(origin) ||
        (process.env.NODE_ENV !== 'production' && origin.startsWith('http://localhost:')) ||
        (process.env.NODE_ENV !== 'production' && origin.startsWith('http://127.0.0.1:'));

      if (isAllowed) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

// Body parsers (50mb to handle high-res base64 cropped images)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Serve static uploaded images
const uploadPaths = [
  path.resolve(__dirname, '../../../frontend/public/uploads'),
  path.resolve(__dirname, '../../frontend/public/uploads'),
  path.resolve(__dirname, '../public/uploads'),
];
uploadPaths.forEach((p) => {
  app.use('/uploads', express.static(p));
});

// Health Checks (Supports cloud load balancers hitting /health or /api/health)
const healthHandler = async (req, res) => {
  const dbStatus = await checkConnection(1, 0);
  const isHealthy = dbStatus.ok;

  return res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'OK' : 'DEGRADED',
    server: 'Wisdom School Backend API',
    database: dbStatus,
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
    port: PORT,
  });
};

app.get('/health', healthHandler);
app.get('/api/health', healthHandler);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/certificates', certificateRoutes);

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.url}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

let serverInstance;

async function startServer() {
  try {
    // 1. Check DB Connection & Auto-Initialize Schema
    const dbCheck = await checkConnection();
    if (dbCheck.ok) {
      console.log(`[DB CONNECTED] PostgreSQL Database: ${dbCheck.database} (${dbCheck.version})`);
      try {
        await initSchema({ verbose: false });
        console.log('[DB AUTO-SETUP] Schema & initial data verified successfully.');
      } catch (schemaErr) {
        console.warn('[DB AUTO-SETUP WARNING]', schemaErr.message);
      }
    } else {
      console.warn('[DB WARNING] Database not reachable at startup:', dbCheck.error);
      console.warn('[DB WARNING] The server will start, but database operations may fail until connected.');
    }

    // 2. Bind HTTP Server
    serverInstance = app.listen(PORT, HOST, () => {
      console.log(`=========================================`);
      console.log(` Wisdom International School Backend API `);
      console.log(` Server running on: http://${HOST}:${PORT} `);
      console.log(` Allowed Origins:   ${allowedOrigins.join(', ')} `);
      console.log(`=========================================`);
    });
  } catch (err) {
    console.error('Fatal startup error:', err);
    process.exit(1);
  }
}

// Graceful Shutdown
const handleGracefulShutdown = async (signal) => {
  console.log(`\n[SHUTDOWN] Received ${signal}. Closing server gracefully...`);
  if (serverInstance) {
    serverInstance.close(async () => {
      console.log('[SHUTDOWN] HTTP server closed.');
      try {
        await pool.end();
        console.log('[SHUTDOWN] Database pool closed.');
      } catch (e) {
        console.error('[SHUTDOWN ERROR]', e.message);
      }
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));

startServer();

module.exports = app;
