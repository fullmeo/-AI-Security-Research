/**
 * THE NOSE - Magnus 13.2 Refusal System
 *
 * Inspired by Pinocchio's growing nose, this system detects
 * ambiguity, unrealistic complexity, and poor convergence,
 * then refuses to proceed until the developer confronts the truth.
 *
 * The nose doesn't punish - it reveals.
 */

class TheNose {
  constructor(config = {}) {
    this.thresholds = {
      clarity: config.clarityThreshold || 70,
      complexity: config.complexityThreshold || 8,
      convergence: config.convergenceThreshold || 75,
      ...config.thresholds
    };

    this.refusalHistory = [];
    this.consciousnessFactor = 1.2; // Each refusal increases consciousness requirement
    this.learningRate = 0.1;
  }

  /**
   * Detect - Analyze the request like the nose detects a lie
   *
   * @param {Object} request - The developer's request
   * @returns {Object} Analysis results
   */
  detect(request) {
    const analysis = {
      clarity: this.analyzeClarity(request),
      complexity: this.analyzeComplexity(request),
      convergence: this.analyzeConvergence(request),
      timestamp: Date.now(),
      request: request.text || request.description
    };

    // Calculate overall consciousness score
    analysis.consciousnessScore = this.calculateConsciousness(analysis);

    return analysis;
  }

  /**
   * Analyze Clarity - How clear is the intention?
   *
   * Like detecting if Pinocchio is lying about going to school
   */
  analyzeClarity(request) {
    const text = request.text || request.description || '';

    // Clarity indicators
    const indicators = {
      hasSpecificGoal: /\b(create|build|implement|fix|add|remove|update)\s+\w+/.test(text),
      hasContext: text.length > 50,
      hasConstraints: /\b(must|should|cannot|need to|require)\b/.test(text),
      isNotVague: !/\b(something|anything|whatever|stuff|thing)\b/i.test(text),
      hasDetails: (text.match(/\b(specifically|exactly|precisely|for example)\b/gi) || []).length > 0
    };

    // Calculate clarity score (0-100)
    const weights = {
      hasSpecificGoal: 30,
      hasContext: 20,
      hasConstraints: 20,
      isNotVague: 20,
      hasDetails: 10
    };

    let score = 0;
    for (const [key, value] of Object.entries(indicators)) {
      if (value) score += weights[key];
    }

    return {
      score,
      indicators,
      threshold: this.thresholds.clarity,
      passed: score >= this.thresholds.clarity,
      message: this.getClarityMessage(score, indicators)
    };
  }

  /**
   * Analyze Complexity - Is this realistic?
   *
   * Like detecting if Pinocchio thinks he can do everything alone
   */
  analyzeComplexity(request) {
    const text = request.text || request.description || '';

    // Complexity indicators (higher = more complex)
    const indicators = {
      multipleFeatures: (text.match(/\band\b/gi) || []).length,
      integrations: (text.match(/\b(api|database|auth|integration|service)\b/gi) || []).length,
      newTechnology: (text.match(/\b(new|learn|implement|from scratch)\b/gi) || []).length,
      systemWide: /\b(entire|whole|all|every|complete)\b/i.test(text),
      ambiguousScope: /\b(etc|and so on|and more|whatever)\b/i.test(text)
    };

    // Calculate complexity score (0-10)
    let score = 1; // Base complexity
    score += indicators.multipleFeatures * 0.5;
    score += indicators.integrations * 1;
    score += indicators.newTechnology * 0.5;
    if (indicators.systemWide) score += 2;
    if (indicators.ambiguousScope) score += 1;

    // Cap at 10
    score = Math.min(score, 10);

    return {
      score: Math.round(score * 10) / 10,
      indicators,
      threshold: this.thresholds.complexity,
      passed: score <= this.thresholds.complexity,
      message: this.getComplexityMessage(score, indicators)
    };
  }

  /**
   * Analyze Convergence - Will this actually work?
   *
   * Like detecting if Pinocchio's choice will lead to transformation
   */
  analyzeConvergence(request) {
    const text = request.text || request.description || '';

    // Convergence indicators
    const indicators = {
      hasValidation: /\b(test|validate|verify|check|ensure)\b/i.test(text),
      hasSuccess: /\b(success|complete|done|finish|ready)\b/i.test(text),
      hasMetrics: /\b(measure|metric|performance|quality)\b/i.test(text),
      realistic: !/\b(perfect|best|amazing|revolutionary)\b/i.test(text),
      iterative: /\b(iterate|improve|refine|enhance|step)\b/i.test(text)
    };

    // Calculate convergence score (0-100)
    const weights = {
      hasValidation: 30,
      hasSuccess: 20,
      hasMetrics: 20,
      realistic: 15,
      iterative: 15
    };

    let score = 0;
    for (const [key, value] of Object.entries(indicators)) {
      if (value) score += weights[key];
    }

    return {
      score,
      indicators,
      threshold: this.thresholds.convergence,
      passed: score >= this.thresholds.convergence,
      message: this.getConvergenceMessage(score, indicators)
    };
  }

  /**
   * Calculate overall consciousness score
   */
  calculateConsciousness(analysis) {
    const clarityWeight = 0.4;
    const complexityWeight = 0.3;
    const convergenceWeight = 0.3;

    // Complexity is inverted (lower is better)
    const complexityScore = Math.max(0, 100 - (analysis.complexity.score * 10));

    return (
      analysis.clarity.score * clarityWeight +
      complexityScore * complexityWeight +
      analysis.convergence.score * convergenceWeight
    );
  }

  /**
   * Refuse - Manifest the refusal, like the nose growing
   *
   * @param {Object} analysis - The detection analysis
   * @returns {Object} Refusal decision
   */
  refuse(analysis) {
    const refusals = [];

    // Check each dimension
    if (!analysis.clarity.passed) {
      refusals.push({
        type: 'CLARITY',
        reason: 'Clarity insuffisante',
        score: analysis.clarity.score,
        threshold: analysis.clarity.threshold,
        message: analysis.clarity.message,
        lesson: 'Tu dois clarifier ton intention',
        transformation: 'De vague à précis'
      });
    }

    if (!analysis.complexity.passed) {
      refusals.push({
        type: 'COMPLEXITY',
        reason: 'Complexité irréaliste',
        score: analysis.complexity.score,
        threshold: analysis.complexity.threshold,
        message: analysis.complexity.message,
        lesson: 'Tu dois décomposer en étapes réalistes',
        transformation: 'De naïf à réaliste'
      });
    }

    if (!analysis.convergence.passed) {
      refusals.push({
        type: 'CONVERGENCE',
        reason: 'Convergence incertaine',
        score: analysis.convergence.score,
        threshold: analysis.convergence.threshold,
        message: analysis.convergence.message,
        lesson: 'Tu dois définir comment valider le succès',
        transformation: "De 'assez bon' à 'vraiment bon'"
      });
    }

    // Build refusal decision
    const decision = {
      refused: refusals.length > 0,
      refusals,
      consciousnessScore: analysis.consciousnessScore,
      timestamp: Date.now(),
      growthFactor: this.grow(this.refusalHistory.length)
    };

    // Record in history
    if (decision.refused) {
      this.refusalHistory.push({
        analysis,
        decision,
        timestamp: Date.now()
      });
    }

    return decision;
  }

  /**
   * Grow - The nose grows with each refusal
   *
   * More refusals = More consciousness required
   * Like Pinocchio's nose growing longer with each lie
   */
  grow(refusalCount) {
    return Math.pow(this.consciousnessFactor, refusalCount);
  }

  /**
   * Get clarity message based on score
   */
  getClarityMessage(score, indicators) {
    if (score >= 80) {
      return '✓ Intention claire et bien définie';
    } else if (score >= 60) {
      return '⚠ Intention partiellement claire, mais pourrait être plus précise';
    } else if (score >= 40) {
      return '✗ Intention vague, nécessite plus de détails';
    } else {
      return '✗ Intention très vague, impossible de procéder';
    }
  }

  /**
   * Get complexity message based on score
   */
  getComplexityMessage(score, indicators) {
    if (score <= 3) {
      return '✓ Complexité raisonnable, faisable en une itération';
    } else if (score <= 6) {
      return '⚠ Complexité modérée, décomposition recommandée';
    } else if (score <= 8) {
      return '⚠ Complexité élevée, décomposition nécessaire';
    } else {
      return '✗ Complexité irréaliste, doit être décomposé en phases';
    }
  }

  /**
   * Get convergence message based on score
   */
  getConvergenceMessage(score, indicators) {
    if (score >= 75) {
      return '✓ Critères de succès clairs, convergence probable';
    } else if (score >= 50) {
      return '⚠ Critères de succès partiels, validation recommandée';
    } else if (score >= 25) {
      return '✗ Critères de succès flous, validation nécessaire';
    } else {
      return '✗ Aucun critère de succès, convergence impossible à valider';
    }
  }

  /**
   * Get refusal history statistics
   */
  getStatistics() {
    if (this.refusalHistory.length === 0) {
      return {
        totalRefusals: 0,
        averageConsciousness: 0,
        refusalsByType: {},
        trend: 'none'
      };
    }

    const refusalsByType = this.refusalHistory.reduce((acc, record) => {
      record.decision.refusals.forEach(refusal => {
        acc[refusal.type] = (acc[refusal.type] || 0) + 1;
      });
      return acc;
    }, {});

    const avgConsciousness = this.refusalHistory.reduce(
      (sum, record) => sum + record.analysis.consciousnessScore,
      0
    ) / this.refusalHistory.length;

    // Determine trend (improving vs declining consciousness)
    const recentConsciousness = this.refusalHistory
      .slice(-5)
      .reduce((sum, record) => sum + record.analysis.consciousnessScore, 0) /
      Math.min(5, this.refusalHistory.length);

    const trend = recentConsciousness > avgConsciousness ? 'improving' : 'declining';

    return {
      totalRefusals: this.refusalHistory.length,
      averageConsciousness: Math.round(avgConsciousness * 10) / 10,
      recentConsciousness: Math.round(recentConsciousness * 10) / 10,
      refusalsByType,
      trend,
      growthFactor: this.grow(this.refusalHistory.length)
    };
  }

  /**
   * Reset the nose (new session)
   */
  reset() {
    this.refusalHistory = [];
  }
}

module.exports = TheNose;
