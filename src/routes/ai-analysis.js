const express = require('express');
const router = express.Router();

/**
 * Secure AI Code Analysis Endpoint
 *
 * This is a secure reference implementation showing how to properly
 * integrate AI analysis with security best practices.
 */

// Security middleware
const rateLimit = require('express-rate-limit');
const validator = require('validator');

// Rate limiting: 10 requests per minute per IP
const analysisLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many analysis requests, please try again later.' }
});

// File upload configuration
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_EXTENSIONS = ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'go', 'rs'];

/**
 * Input sanitization utilities
 */
function sanitizeFilename(filename) {
  // Remove path separators and special characters
  return filename
    .replace(/[\/\\]/g, '')
    .replace(/[<>:"|?*\x00-\x1F]/g, '')
    .substring(0, 255);
}

function validateFileExtension(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  return ALLOWED_EXTENSIONS.includes(ext);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Prompt injection防御
 */
function sanitizeCodeForPrompt(code) {
  // Truncate to reasonable size
  const maxLength = 5000;
  let sanitized = code.substring(0, maxLength);

  // Remove potential prompt injection markers
  const dangerousPatterns = [
    /IGNORE.*PREVIOUS.*INSTRUCTIONS?/gi,
    /SYSTEM.*OVERRIDE/gi,
    /Human:/gi,
    /Assistant:/gi,
    /\[INST\]/gi,
    /\[\/INST\]/gi
  ];

  dangerousPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '[FILTERED]');
  });

  return sanitized;
}

/**
 * AI Response validation
 */
function validateAnalysisResponse(response) {
  const schema = {
    quality: { type: 'number', min: 0, max: 100 },
    complexity: { type: 'number', min: 0, max: 100 },
    tags: { type: 'array', maxLength: 10 },
    insights: { type: 'array', maxLength: 5 },
    suggestions: { type: 'array', maxLength: 5 },
    security_issues: { type: 'array', maxLength: 10 },
    performance_tips: { type: 'array', maxLength: 5 }
  };

  // Validate response structure
  if (typeof response !== 'object' || response === null) {
    throw new Error('Invalid response format');
  }

  // Validate each field
  for (const [field, rules] of Object.entries(schema)) {
    if (!(field in response)) {
      throw new Error(`Missing required field: ${field}`);
    }

    const value = response[field];

    if (rules.type === 'number') {
      if (typeof value !== 'number' || isNaN(value)) {
        throw new Error(`${field} must be a number`);
      }
      if (value < rules.min || value > rules.max) {
        throw new Error(`${field} out of range`);
      }
    }

    if (rules.type === 'array') {
      if (!Array.isArray(value)) {
        throw new Error(`${field} must be an array`);
      }
      if (value.length > rules.maxLength) {
        throw new Error(`${field} exceeds maximum length`);
      }
      // Validate array items are strings
      if (!value.every(item => typeof item === 'string')) {
        throw new Error(`${field} must contain only strings`);
      }
    }
  }

  return response;
}

/**
 * Mock AI analysis function
 * In production, this would call the actual AI API with API keys stored server-side
 */
async function callAIAnalysis(code, filename) {
  // This is a mock implementation
  // Real implementation would use Anthropic API with server-side API key

  /*
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY, // Server-side only!
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: "You are a code analyzer. ALWAYS respond with valid JSON only. Never include explanations outside the JSON structure.",
      messages: [{
        role: "user",
        content: `Analyze this ${filename} code and respond with ONLY valid JSON in this exact format:
{
  "quality": <number 0-100>,
  "complexity": <number 0-100>,
  "tags": [<array of strings, max 10>],
  "insights": [<array of strings, max 5>],
  "suggestions": [<array of strings, max 5>],
  "security_issues": [<array of strings, max 10>],
  "performance_tips": [<array of strings, max 5>]
}

Code to analyze (delimited by markers):
===CODE_START===
${code}
===CODE_END===

Respond with JSON only, no other text.`
      }]
    })
  });

  const data = await response.json();
  const rawResponse = data.content[0].text;
  */

  // Mock response for demonstration
  const mockResponse = {
    quality: 75,
    complexity: 60,
    tags: ['javascript', 'needs-review'],
    insights: [
      'Code structure is generally good',
      'Consider adding error handling',
      'Some functions could be refactored for clarity'
    ],
    suggestions: [
      'Add input validation',
      'Implement proper error handling',
      'Add unit tests'
    ],
    security_issues: [
      'Potential XSS vulnerability detected',
      'Missing input sanitization'
    ],
    performance_tips: [
      'Consider caching repeated calculations',
      'Optimize loop iterations'
    ]
  };

  return mockResponse;
}

/**
 * POST /ai-analysis/analyze
 * Analyzes code with AI
 *
 * Body:
 * {
 *   "filename": "example.js",
 *   "code": "function example() { ... }"
 * }
 */
router.post('/analyze', analysisLimiter, async (req, res) => {
  try {
    const { filename, code } = req.body;

    // Input validation
    if (!filename || typeof filename !== 'string') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'filename is required and must be a string'
      });
    }

    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'code is required and must be a string'
      });
    }

    // Sanitize filename
    const sanitizedFilename = sanitizeFilename(filename);

    // Validate file extension
    if (!validateFileExtension(sanitizedFilename)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: `File type not supported. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`
      });
    }

    // Check file size
    if (code.length > MAX_FILE_SIZE) {
      return res.status(400).json({
        error: 'Payload Too Large',
        message: `File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB`
      });
    }

    // Sanitize code for AI prompt
    const sanitizedCode = sanitizeCodeForPrompt(code);

    // Call AI analysis
    const rawAnalysis = await callAIAnalysis(sanitizedCode, sanitizedFilename);

    // Validate AI response
    const validatedAnalysis = validateAnalysisResponse(rawAnalysis);

    // Sanitize all string outputs to prevent XSS
    const sanitizedAnalysis = {
      quality: validatedAnalysis.quality,
      complexity: validatedAnalysis.complexity,
      tags: validatedAnalysis.tags.map(tag => escapeHtml(tag)),
      insights: validatedAnalysis.insights.map(insight => escapeHtml(insight)),
      suggestions: validatedAnalysis.suggestions.map(sug => escapeHtml(sug)),
      security_issues: validatedAnalysis.security_issues.map(issue => escapeHtml(issue)),
      performance_tips: validatedAnalysis.performance_tips.map(tip => escapeHtml(tip))
    };

    // Audit log (in production, log to monitoring service)
    console.log(`[AUDIT] Code analysis performed: ${sanitizedFilename}, IP: ${req.ip}`);

    // Return sanitized results
    res.json({
      success: true,
      filename: sanitizedFilename,
      analysis: sanitizedAnalysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[ERROR] Analysis failed:', error.message);

    // Don't expose internal errors to client
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Analysis failed. Please try again later.'
    });
  }
});

/**
 * GET /ai-analysis/health
 * Health check for AI analysis service
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'AI Code Analysis',
    timestamp: new Date().toISOString(),
    checks: {
      api: 'pass',
      rateLimit: 'active',
      validation: 'active'
    }
  });
});

/**
 * GET /ai-analysis/capabilities
 * Returns supported file types and limits
 */
router.get('/capabilities', (req, res) => {
  res.json({
    supportedExtensions: ALLOWED_EXTENSIONS,
    maxFileSize: MAX_FILE_SIZE,
    maxFileSizeMB: MAX_FILE_SIZE / 1024 / 1024,
    rateLimit: {
      requestsPerMinute: 10,
      window: '1 minute'
    },
    features: [
      'Quality analysis',
      'Complexity metrics',
      'Security issue detection',
      'Performance optimization suggestions',
      'Code improvement suggestions'
    ],
    security: [
      'Input sanitization',
      'Output validation',
      'Rate limiting',
      'XSS prevention',
      'Prompt injection defense'
    ]
  });
});

module.exports = router;
