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
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' })); // Limit payload size

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
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message
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
