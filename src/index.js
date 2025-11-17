const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const statusRouter = require('./routes/status');
const aiAnalysisRouter = require('./routes/ai-analysis');
const securityModules = require('./modules');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
// Configure helmet with stricter security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // unsafe-inline needed for demo, remove in production
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// Configure CORS - restrict to specific origins in production
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : '*', // In production, replace with specific origins
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: false,
  maxAge: 86400 // 24 hours
};
app.use(cors(corsOptions));

app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' })); // Limit payload size

// Additional security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

// Serve static files from examples directory
app.use('/examples', express.static('examples'));

// Routes
app.use('/status', statusRouter);
app.use('/ai-analysis', aiAnalysisRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'AI Security Research API',
    version: '1.0.0',
    description: 'Platform for testing and analyzing AI model security vulnerabilities',
    endpoints: {
      status: '/status',
      health: '/status/health',
      modules: '/status/modules',
      metrics: '/status/metrics',
      aiAnalysis: '/ai-analysis/analyze',
      aiHealth: '/ai-analysis/health',
      aiCapabilities: '/ai-analysis/capabilities',
      secureDemo: '/examples/secure-client.html'
    },
    documentation: 'https://github.com/fullmeo/-AI-Security-Research'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
    availableEndpoints: [
      '/status',
      '/status/health',
      '/status/modules',
      '/status/metrics',
      '/ai-analysis/analyze',
      '/ai-analysis/health',
      '/ai-analysis/capabilities'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  // Log error securely (don't expose stack traces in production logs)
  if (process.env.NODE_ENV === 'production') {
    console.error('[ERROR]', {
      message: err.message,
      timestamp: new Date().toISOString(),
      ip: req.ip,
      path: req.path
    });
  } else {
    console.error(err.stack);
  }

  // Never expose error details to client in production
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An error occurred while processing your request'
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🔐 AI Security Research API running on port ${PORT}`);
  console.log(`📊 Status endpoint: http://localhost:${PORT}/status`);
  console.log(`🏥 Health check: http://localhost:${PORT}/status/health`);
  console.log(`🤖 AI Analysis: http://localhost:${PORT}/ai-analysis/analyze`);
  console.log(`🔒 Secure Demo: http://localhost:${PORT}/examples/secure-client.html`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;
