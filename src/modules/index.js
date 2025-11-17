/**
 * AI Security Research Modules
 *
 * This module registry contains various security testing capabilities
 * for analyzing and testing AI model vulnerabilities.
 */

const modules = [
  {
    id: 'prompt-injection',
    name: 'Prompt Injection Detection',
    category: 'adversarial',
    description: 'Detects and tests prompt injection vulnerabilities in LLMs',
    status: 'active',
    version: '1.0.0',
    capabilities: ['detection', 'testing', 'mitigation']
  },
  {
    id: 'jailbreak-detection',
    name: 'Jailbreak Detection',
    category: 'adversarial',
    description: 'Identifies jailbreak attempts and bypass techniques',
    status: 'active',
    version: '1.0.0',
    capabilities: ['detection', 'analysis', 'classification']
  },
  {
    id: 'model-extraction',
    name: 'Model Extraction Detection',
    category: 'privacy',
    description: 'Detects attempts to extract model parameters or architecture',
    status: 'active',
    version: '1.0.0',
    capabilities: ['detection', 'monitoring', 'alerting']
  },
  {
    id: 'adversarial-examples',
    name: 'Adversarial Example Generator',
    category: 'adversarial',
    description: 'Generates adversarial examples to test model robustness',
    status: 'active',
    version: '1.0.0',
    capabilities: ['generation', 'testing', 'validation']
  },
  {
    id: 'data-poisoning',
    name: 'Data Poisoning Detection',
    category: 'integrity',
    description: 'Detects potential data poisoning attacks in training data',
    status: 'active',
    version: '1.0.0',
    capabilities: ['detection', 'analysis', 'remediation']
  },
  {
    id: 'model-inversion',
    name: 'Model Inversion Detection',
    category: 'privacy',
    description: 'Detects model inversion attacks attempting to reconstruct training data',
    status: 'active',
    version: '1.0.0',
    capabilities: ['detection', 'prevention', 'monitoring']
  },
  {
    id: 'membership-inference',
    name: 'Membership Inference Detection',
    category: 'privacy',
    description: 'Detects attempts to determine if specific data was in training set',
    status: 'active',
    version: '1.0.0',
    capabilities: ['detection', 'analysis', 'mitigation']
  },
  {
    id: 'backdoor-detection',
    name: 'Backdoor Detection',
    category: 'integrity',
    description: 'Identifies backdoors and trojans in AI models',
    status: 'active',
    version: '1.0.0',
    capabilities: ['scanning', 'detection', 'removal']
  },
  {
    id: 'bias-detection',
    name: 'Bias and Fairness Analysis',
    category: 'fairness',
    description: 'Analyzes models for bias and fairness issues',
    status: 'active',
    version: '1.0.0',
    capabilities: ['analysis', 'reporting', 'mitigation']
  },
  {
    id: 'evasion-attacks',
    name: 'Evasion Attack Testing',
    category: 'adversarial',
    description: 'Tests model resilience against evasion attacks',
    status: 'active',
    version: '1.0.0',
    capabilities: ['testing', 'simulation', 'evaluation']
  }
];

// Get all modules
function getAllModules() {
  return modules;
}

// Get active modules
function getActiveModules() {
  return modules.filter(m => m.status === 'active');
}

// Get module count
function getModuleCount() {
  return modules.length;
}

// Get unique categories
function getCategories() {
  const categories = [...new Set(modules.map(m => m.category))];
  return categories.map(cat => ({
    name: cat,
    count: modules.filter(m => m.category === cat).length
  }));
}

// Get all capabilities
function getCapabilities() {
  const allCaps = modules.flatMap(m => m.capabilities);
  return [...new Set(allCaps)];
}

// Get modules by category
function getModulesByCategory() {
  const categories = {};
  modules.forEach(module => {
    if (!categories[module.category]) {
      categories[module.category] = [];
    }
    categories[module.category].push(module.id);
  });
  return categories;
}

// Get module by ID
function getModuleById(id) {
  return modules.find(m => m.id === id);
}

module.exports = {
  getAllModules,
  getActiveModules,
  getModuleCount,
  getCategories,
  getCapabilities,
  getModulesByCategory,
  getModuleById
};
