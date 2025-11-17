const express = require('express');
const router = express.Router();
const securityModules = require('../modules');

const startTime = Date.now();

// Main status endpoint
router.get('/', (req, res) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();

  res.json({
    status: 'operational',
    service: 'AI Security Research API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: {
      seconds: Math.floor(uptime),
      formatted: formatUptime(uptime)
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`
      }
    },
    security: {
      modulesLoaded: securityModules.getModuleCount(),
      modulesActive: securityModules.getActiveModules().length,
      capabilities: securityModules.getCapabilities()
    },
    endpoints: {
      health: '/status/health',
      modules: '/status/modules',
      metrics: '/status/metrics'
    }
  });
});

// Health check endpoint
router.get('/health', (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      api: 'pass',
      modules: securityModules.getModuleCount() > 0 ? 'pass' : 'fail',
      memory: process.memoryUsage().heapUsed < 500 * 1024 * 1024 ? 'pass' : 'warning'
    }
  };

  const allPassed = Object.values(health.checks).every(check => check === 'pass');
  health.status = allPassed ? 'healthy' : 'degraded';

  res.status(allPassed ? 200 : 503).json(health);
});

// Security modules endpoint
router.get('/modules', (req, res) => {
  res.json({
    totalModules: securityModules.getModuleCount(),
    activeModules: securityModules.getActiveModules().length,
    modules: securityModules.getAllModules(),
    categories: securityModules.getCategories()
  });
});

// Metrics endpoint
router.get('/metrics', (req, res) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();

  res.json({
    timestamp: new Date().toISOString(),
    uptime: {
      seconds: Math.floor(uptime),
      minutes: Math.floor(uptime / 60),
      hours: Math.floor(uptime / 3600)
    },
    memory: {
      rss: memoryUsage.rss,
      heapUsed: memoryUsage.heapUsed,
      heapTotal: memoryUsage.heapTotal,
      external: memoryUsage.external
    },
    process: {
      pid: process.pid,
      version: process.version,
      platform: process.platform
    },
    security: {
      modules: {
        total: securityModules.getModuleCount(),
        active: securityModules.getActiveModules().length,
        byCategory: securityModules.getModulesByCategory()
      }
    }
  });
});

// Helper function to format uptime
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  parts.push(`${secs}s`);

  return parts.join(' ');
}

module.exports = router;
