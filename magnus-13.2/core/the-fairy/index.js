/**
 * THE FAIRY - Understanding Engine
 *
 * Inspired by the Blue Fairy who guides Pinocchio,
 * this engine understands developer intentions and
 * asks clarifying questions to reveal the truth.
 *
 * The Fairy doesn't give answers - she asks questions.
 */

class TheFairy {
  constructor(config = {}) {
    this.questionBank = this.buildQuestionBank();
    this.maxQuestionsPerSession = config.maxQuestions || 5;
    this.understandingThreshold = config.understandingThreshold || 85;
    this.sessions = new Map();
  }

  /**
   * Understand - Deep analysis of developer intention
   *
   * Like the Blue Fairy seeing through Pinocchio's lies
   */
  understand(request, sessionId = 'default') {
    let session = this.sessions.get(sessionId) || this.createSession(request);
    this.sessions.set(sessionId, session);

    const understanding = {
      intent: this.analyzeIntent(request),
      context: this.analyzeContext(request),
      constraints: this.analyzeConstraints(request),
      assumptions: this.detectAssumptions(request),
      ambiguities: this.detectAmbiguities(request)
    };

    // Calculate understanding score
    understanding.score = this.calculateUnderstandingScore(understanding);
    understanding.complete = understanding.score >= this.understandingThreshold;

    // Generate clarifying questions if needed
    if (!understanding.complete) {
      understanding.questions = this.generateQuestions(understanding, session);
    }

    // Update session
    session.understanding = understanding;
    session.iterations++;

    return understanding;
  }

  /**
   * Create a new understanding session
   */
  createSession(request) {
    return {
      startTime: Date.now(),
      iterations: 0,
      history: [],
      originalRequest: request.text || request.description,
      refinements: [],
      understanding: null
    };
  }

  /**
   * Analyze Intent - What does the developer really want?
   */
  analyzeIntent(request) {
    const text = request.text || request.description || '';

    const patterns = {
      create: /\b(create|build|make|generate|develop)\b/i,
      modify: /\b(update|modify|change|edit|refactor)\b/i,
      fix: /\b(fix|repair|resolve|debug|solve)\b/i,
      remove: /\b(remove|delete|eliminate|drop)\b/i,
      analyze: /\b(analyze|understand|explain|investigate)\b/i,
      optimize: /\b(optimize|improve|enhance|speed up)\b/i
    };

    const detected = [];
    for (const [intent, pattern] of Object.entries(patterns)) {
      if (pattern.test(text)) {
        detected.push(intent);
      }
    }

    return {
      primary: detected[0] || 'unknown',
      all: detected,
      clarity: detected.length === 1 ? 'clear' : detected.length > 1 ? 'mixed' : 'unclear',
      confidence: this.calculateIntentConfidence(detected, text)
    };
  }

  /**
   * Analyze Context - What's the environment/situation?
   */
  analyzeContext(request) {
    const text = request.text || request.description || '';

    const contexts = {
      technology: this.extractTechnologies(text),
      domain: this.extractDomain(text),
      scale: this.extractScale(text),
      timeline: this.extractTimeline(text),
      stakeholders: this.extractStakeholders(text)
    };

    const contextScore = Object.values(contexts).filter(v => v && v !== 'unknown').length * 20;

    return {
      ...contexts,
      score: Math.min(contextScore, 100),
      complete: contextScore >= 60
    };
  }

  /**
   * Analyze Constraints - What are the limits/requirements?
   */
  analyzeConstraints(request) {
    const text = request.text || request.description || '';

    const constraints = {
      must: this.extractConstraints(text, /\b(must|required|need to|have to)\b/i),
      should: this.extractConstraints(text, /\b(should|ought to|recommended)\b/i),
      cannot: this.extractConstraints(text, /\b(cannot|must not|forbidden|prohibited)\b/i),
      prefer: this.extractConstraints(text, /\b(prefer|would like|ideally)\b/i)
    };

    const totalConstraints = Object.values(constraints).reduce((sum, arr) => sum + arr.length, 0);

    return {
      ...constraints,
      total: totalConstraints,
      score: Math.min(totalConstraints * 25, 100),
      hasHardConstraints: constraints.must.length > 0 || constraints.cannot.length > 0
    };
  }

  /**
   * Detect Assumptions - What is the developer assuming?
   */
  detectAssumptions(request) {
    const text = request.text || request.description || '';

    const assumptionPatterns = [
      { pattern: /\b(obviously|of course|clearly)\b/i, type: 'implicit' },
      { pattern: /\b(just|simply|easy|straightforward)\b/i, type: 'complexity' },
      { pattern: /\b(everyone knows|it's common|standard)\b/i, type: 'knowledge' },
      { pattern: /\b(always|never|all|none)\b/i, type: 'absolute' },
      { pattern: /\b(should work|will work|probably)\b/i, type: 'confidence' }
    ];

    const detected = [];
    assumptionPatterns.forEach(({ pattern, type }) => {
      const matches = text.match(new RegExp(pattern.source, 'gi'));
      if (matches) {
        matches.forEach(match => {
          detected.push({ text: match, type, risk: this.assessAssumptionRisk(type) });
        });
      }
    });

    return {
      detected,
      count: detected.length,
      risky: detected.filter(a => a.risk === 'high').length,
      score: Math.max(0, 100 - detected.length * 15) // More assumptions = lower score
    };
  }

  /**
   * Detect Ambiguities - What is unclear?
   */
  detectAmbiguities(request) {
    const text = request.text || request.description || '';

    const ambiguityPatterns = [
      { pattern: /\b(something|anything|whatever|stuff|thing)\b/i, type: 'vague_reference' },
      { pattern: /\b(etc|and so on|and more)\b/i, type: 'incomplete_list' },
      { pattern: /\b(maybe|might|could|possibly)\b/i, type: 'uncertainty' },
      { pattern: /\b(some|several|few|many)\b/i, type: 'vague_quantity' },
      { pattern: /\b(good|bad|better|best)\b/i, type: 'subjective' }
    ];

    const detected = [];
    ambiguityPatterns.forEach(({ pattern, type }) => {
      const matches = text.match(new RegExp(pattern.source, 'gi'));
      if (matches) {
        matches.forEach(match => {
          detected.push({ text: match, type, severity: this.assessAmbiguitySeverity(type) });
        });
      }
    });

    return {
      detected,
      count: detected.length,
      critical: detected.filter(a => a.severity === 'critical').length,
      score: Math.max(0, 100 - detected.length * 20) // More ambiguities = lower score
    };
  }

  /**
   * Calculate overall understanding score
   */
  calculateUnderstandingScore(understanding) {
    const weights = {
      intent: 0.25,
      context: 0.20,
      constraints: 0.20,
      assumptions: 0.15,
      ambiguities: 0.20
    };

    return (
      (understanding.intent.confidence * weights.intent) +
      (understanding.context.score * weights.context) +
      (understanding.constraints.score * weights.constraints) +
      (understanding.assumptions.score * weights.assumptions) +
      (understanding.ambiguities.score * weights.ambiguities)
    );
  }

  /**
   * Generate clarifying questions based on gaps
   */
  generateQuestions(understanding, session) {
    const questions = [];
    const askedTypes = new Set(session.history.map(q => q.type));

    // Intent questions
    if (understanding.intent.clarity !== 'clear' && !askedTypes.has('intent')) {
      questions.push({
        type: 'intent',
        question: this.questionBank.intent[Math.floor(Math.random() * this.questionBank.intent.length)],
        priority: 'high',
        reason: 'Intent is unclear or mixed'
      });
    }

    // Context questions
    if (understanding.context.score < 60 && !askedTypes.has('context')) {
      const missing = Object.entries(understanding.context)
        .filter(([key, value]) => key !== 'score' && key !== 'complete' && (!value || value === 'unknown'))
        .map(([key]) => key);

      if (missing.length > 0) {
        questions.push({
          type: 'context',
          question: this.questionBank.context[missing[0]],
          priority: 'medium',
          reason: `Missing ${missing[0]} context`
        });
      }
    }

    // Constraint questions
    if (!understanding.constraints.hasHardConstraints && !askedTypes.has('constraints')) {
      questions.push({
        type: 'constraints',
        question: this.questionBank.constraints[0],
        priority: 'high',
        reason: 'No hard constraints defined'
      });
    }

    // Assumption questions
    if (understanding.assumptions.risky > 0 && !askedTypes.has('assumptions')) {
      const riskyAssumption = understanding.assumptions.detected.find(a => a.risk === 'high');
      questions.push({
        type: 'assumptions',
        question: `You mentioned "${riskyAssumption.text}" - can you elaborate on why you think this is ${riskyAssumption.type}?`,
        priority: 'medium',
        reason: 'Risky assumption detected'
      });
    }

    // Ambiguity questions
    if (understanding.ambiguities.critical > 0 && !askedTypes.has('ambiguities')) {
      const criticalAmbiguity = understanding.ambiguities.detected.find(a => a.severity === 'critical');
      questions.push({
        type: 'ambiguities',
        question: `You used "${criticalAmbiguity.text}" - can you be more specific?`,
        priority: 'high',
        reason: 'Critical ambiguity detected'
      });
    }

    // Sort by priority and limit
    return questions
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
      .slice(0, this.maxQuestionsPerSession);
  }

  /**
   * Build question bank (like the Fairy's wisdom)
   */
  buildQuestionBank() {
    return {
      intent: [
        "What is the primary goal you want to achieve?",
        "What problem are you trying to solve?",
        "What should be different after this is complete?",
        "What specific outcome do you expect?"
      ],
      context: {
        technology: "What technologies or frameworks should be used?",
        domain: "What is the business domain or use case?",
        scale: "How many users/requests/data should this handle?",
        timeline: "What is the timeline for this work?",
        stakeholders: "Who will use or benefit from this?"
      },
      constraints: [
        "What are the hard requirements that must be met?",
        "What are the limitations or restrictions?",
        "What should this system never do?",
        "What are the non-negotiable aspects?"
      ],
      validation: [
        "How will you know when this is complete?",
        "What tests or checks should be performed?",
        "What does success look like?",
        "How will you validate this works correctly?"
      ]
    };
  }

  /**
   * Helper methods for extraction
   */

  extractTechnologies(text) {
    const techPatterns = [
      'react', 'vue', 'angular', 'node', 'python', 'java', 'javascript',
      'typescript', 'rust', 'go', 'database', 'sql', 'nosql', 'mongodb',
      'postgres', 'redis', 'api', 'rest', 'graphql', 'docker', 'kubernetes'
    ];

    const found = techPatterns.filter(tech =>
      new RegExp(`\\b${tech}\\b`, 'i').test(text)
    );

    return found.length > 0 ? found : ['unknown'];
  }

  extractDomain(text) {
    const domains = {
      ecommerce: /\b(shop|cart|payment|checkout|product|order)\b/i,
      social: /\b(user|profile|friend|follow|post|comment|like)\b/i,
      finance: /\b(transaction|account|balance|payment|invoice)\b/i,
      healthcare: /\b(patient|medical|health|appointment|diagnosis)\b/i,
      education: /\b(student|course|lesson|grade|assignment)\b/i
    };

    for (const [domain, pattern] of Object.entries(domains)) {
      if (pattern.test(text)) return domain;
    }

    return 'unknown';
  }

  extractScale(text) {
    if (/\b(million|thousands|large-scale|enterprise)\b/i.test(text)) return 'large';
    if (/\b(hundred|moderate|medium)\b/i.test(text)) return 'medium';
    if (/\b(few|small|prototype|poc)\b/i.test(text)) return 'small';
    return 'unknown';
  }

  extractTimeline(text) {
    if (/\b(urgent|asap|immediately|today)\b/i.test(text)) return 'immediate';
    if (/\b(week|days|sprint)\b/i.test(text)) return 'short';
    if (/\b(month|quarter|long-term)\b/i.test(text)) return 'long';
    return 'unknown';
  }

  extractStakeholders(text) {
    if (/\b(user|customer|client)\b/i.test(text)) return 'external';
    if (/\b(team|internal|developer)\b/i.test(text)) return 'internal';
    return 'unknown';
  }

  extractConstraints(text, pattern) {
    const sentences = text.split(/[.!?]+/);
    const matching = sentences.filter(s => pattern.test(s));
    return matching.map(s => s.trim()).filter(s => s.length > 0);
  }

  calculateIntentConfidence(detected, text) {
    if (detected.length === 0) return 0;
    if (detected.length === 1) return 100;

    // Multiple intents reduce confidence
    const penalty = (detected.length - 1) * 20;
    return Math.max(50, 100 - penalty);
  }

  assessAssumptionRisk(type) {
    const risks = {
      implicit: 'high',
      complexity: 'high',
      knowledge: 'medium',
      absolute: 'medium',
      confidence: 'low'
    };
    return risks[type] || 'low';
  }

  assessAmbiguitySeverity(type) {
    const severities = {
      vague_reference: 'critical',
      incomplete_list: 'high',
      uncertainty: 'medium',
      vague_quantity: 'medium',
      subjective: 'low'
    };
    return severities[type] || 'low';
  }

  /**
   * Record answer to a question
   */
  recordAnswer(sessionId, questionType, answer) {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    session.history.push({
      type: questionType,
      answer,
      timestamp: Date.now()
    });

    session.refinements.push(answer);

    return session;
  }

  /**
   * Get session summary
   */
  getSessionSummary(sessionId) {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    return {
      iterations: session.iterations,
      questionsAsked: session.history.length,
      understandingScore: session.understanding?.score || 0,
      complete: session.understanding?.complete || false,
      duration: Date.now() - session.startTime
    };
  }
}

module.exports = TheFairy;
