# AI Security Research API

A comprehensive platform for testing and analyzing AI model security vulnerabilities. This API provides various security testing modules and monitoring capabilities for researching AI/ML security threats.

## Features

### Status Endpoint
Comprehensive status monitoring with:
- **Service Health**: Real-time health checks and system status
- **Security Modules**: Information about available security testing capabilities
- **System Metrics**: Memory usage, uptime, and performance metrics
- **API Documentation**: Available endpoints and usage information

### Security Research Modules

#### Adversarial Attack Testing
- **Prompt Injection Detection**: Detect and test prompt injection vulnerabilities in LLMs
- **Jailbreak Detection**: Identify jailbreak attempts and bypass techniques
- **Adversarial Examples**: Generate adversarial examples to test model robustness
- **Evasion Attacks**: Test model resilience against evasion attacks

#### Privacy & Data Security
- **Model Extraction Detection**: Detect attempts to extract model parameters
- **Model Inversion Detection**: Detect attacks attempting to reconstruct training data
- **Membership Inference**: Detect attempts to determine if data was in training set

#### Model Integrity
- **Data Poisoning Detection**: Detect potential data poisoning in training data
- **Backdoor Detection**: Identify backdoors and trojans in AI models

#### Fairness & Ethics
- **Bias Detection**: Analyze models for bias and fairness issues

## Installation

```bash
# Clone the repository
git clone https://github.com/fullmeo/-AI-Security-Research.git
cd -AI-Security-Research

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start the server
npm start
```

## Development

```bash
# Run in development mode with auto-reload
npm run dev

# Run tests
npm test
```

## API Endpoints

### Root Endpoint
```
GET /
```
Returns API information and available endpoints.

### Status Endpoints

#### Main Status
```
GET /status
```
Returns comprehensive status including service health, uptime, system metrics, and security module information.

**Response Example:**
```json
{
  "status": "operational",
  "service": "AI Security Research API",
  "version": "1.0.0",
  "timestamp": "2025-11-17T10:00:00.000Z",
  "uptime": {
    "seconds": 3600,
    "formatted": "1h 0m 0s"
  },
  "system": {
    "nodeVersion": "v18.0.0",
    "platform": "linux",
    "arch": "x64",
    "memory": {
      "rss": "50MB",
      "heapUsed": "30MB",
      "heapTotal": "40MB"
    }
  },
  "security": {
    "modulesLoaded": 10,
    "modulesActive": 10,
    "capabilities": ["detection", "testing", "mitigation", "analysis", ...]
  }
}
```

#### Health Check
```
GET /status/health
```
Simple health check endpoint for monitoring and load balancers.

**Response Example:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-17T10:00:00.000Z",
  "checks": {
    "api": "pass",
    "modules": "pass",
    "memory": "pass"
  }
}
```

#### Security Modules
```
GET /status/modules
```
Returns detailed information about all available security research modules.

**Response Example:**
```json
{
  "totalModules": 10,
  "activeModules": 10,
  "modules": [
    {
      "id": "prompt-injection",
      "name": "Prompt Injection Detection",
      "category": "adversarial",
      "description": "Detects and tests prompt injection vulnerabilities in LLMs",
      "status": "active",
      "version": "1.0.0",
      "capabilities": ["detection", "testing", "mitigation"]
    }
  ],
  "categories": [
    { "name": "adversarial", "count": 4 },
    { "name": "privacy", "count": 3 },
    { "name": "integrity", "count": 2 },
    { "name": "fairness", "count": 1 }
  ]
}
```

#### Metrics
```
GET /status/metrics
```
Returns detailed system and security metrics.

**Response Example:**
```json
{
  "timestamp": "2025-11-17T10:00:00.000Z",
  "uptime": {
    "seconds": 3600,
    "minutes": 60,
    "hours": 1
  },
  "memory": {
    "rss": 52428800,
    "heapUsed": 31457280,
    "heapTotal": 41943040,
    "external": 1048576
  },
  "process": {
    "pid": 1234,
    "version": "v18.0.0",
    "platform": "linux"
  },
  "security": {
    "modules": {
      "total": 10,
      "active": 10,
      "byCategory": {
        "adversarial": ["prompt-injection", "jailbreak-detection", ...],
        "privacy": ["model-extraction", "model-inversion", ...],
        "integrity": ["data-poisoning", "backdoor-detection"],
        "fairness": ["bias-detection"]
      }
    }
  }
}
```

## Security Module Categories

### Adversarial
Testing and detection of adversarial attacks on AI models
- Prompt injection
- Jailbreak attempts
- Adversarial examples
- Evasion attacks

### Privacy
Protection against privacy-violating attacks
- Model extraction
- Model inversion
- Membership inference

### Integrity
Ensuring model integrity and trustworthiness
- Data poisoning
- Backdoor detection

### Fairness
Analyzing and mitigating bias
- Bias detection
- Fairness analysis

## Use Cases

### Security Auditing
Use the API to audit AI models and systems for security vulnerabilities:
```bash
curl http://localhost:3000/status/modules
```

### Health Monitoring
Integrate health checks into your monitoring infrastructure:
```bash
curl http://localhost:3000/status/health
```

### Research & Development
Access security module information for research purposes:
```bash
curl http://localhost:3000/status
```

## Configuration

Environment variables can be configured in the `.env` file:

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)
- `LOG_LEVEL`: Logging verbosity

## Architecture

```
src/
├── index.js              # Main application entry point
├── routes/
│   └── status.js         # Status endpoint routes
└── modules/
    └── index.js          # Security modules registry
```

## Requirements

- Node.js >= 18.0.0
- npm or yarn

## Security Considerations

This is a research platform designed for:
- Security testing in controlled environments
- Educational purposes
- Defensive security research
- CTF challenges and competitions

**Important**: Only use this platform for authorized security testing. Ensure you have proper authorization before testing any AI models or systems.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Author

fullmeo

## Disclaimer

This tool is provided for educational and research purposes only. Users are responsible for ensuring they have proper authorization before conducting any security testing.
