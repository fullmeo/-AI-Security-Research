/**
 * MAGNUS 13.2 - Consciousness Orchestrator
 *
 * The main orchestrator that brings together:
 * - The Nose (refusal system)
 * - The Fairy (understanding engine)
 * - Transformations (developer growth tracking)
 * - Convergence Moments (critical choices)
 *
 * Like the story of Pinocchio itself - all elements working
 * together to create consciousness.
 */

const TheNose = require('../core/the-nose');
const TheFairy = require('../core/the-fairy');
const Transformations = require('../core/transformations');
const ConvergenceMoment = require('../core/convergence-moment');

class MagnusOrchestrator {
  constructor(config = {}) {
    // Initialize all components
    this.nose = new TheNose(config.nose);
    this.fairy = new TheFairy(config.fairy);
    this.transformations = new Transformations();
    this.convergenceMoment = new ConvergenceMoment(config.convergence);

    // Session management
    this.sessions = new Map();
    this.defaultDeveloper = config.developerId || 'default';

    // Configuration
    this.config = {
      enableNarrative: config.enableNarrative !== false,
      enableInsights: config.enableInsights !== false,
      enableTransformation: config.enableTransformation !== false,
      ...config
    };
  }

  /**
   * Process a developer request through all phases
   *
   * This is the main entry point - like Pinocchio starting his journey
   */
  async process(request, options = {}) {
    const sessionId = options.sessionId || this.defaultDeveloper;
    const developerId = options.developerId || this.defaultDeveloper;

    // Create session if needed
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, this.createSession(sessionId, developerId));
    }

    const session = this.sessions.get(sessionId);
    session.requests.push({
      text: request.text || request.description,
      timestamp: Date.now()
    });

    // Phase 1: Understanding (The Fairy asks questions)
    const understanding = this.fairy.understand(request, sessionId);

    // Phase 2: Detection (The Nose detects lies/ambiguity)
    const analysis = this.nose.detect(request);

    // Phase 3: Refusal Decision (The Nose grows if needed)
    const refusal = this.nose.refuse(analysis);

    // Record interaction for transformation tracking
    const transformation = this.transformations.recordInteraction(developerId, {
      refused: refusal.refused,
      clarity: analysis.clarity.score,
      complexity: {
        estimated: request.estimatedComplexity || analysis.complexity.score,
        actual: analysis.complexity.score
      },
      validation: analysis.convergence.score
    });

    // Build response
    const response = {
      session: sessionId,
      developer: developerId,
      timestamp: Date.now(),

      // Core analysis
      understanding: {
        score: understanding.score,
        complete: understanding.complete,
        intent: understanding.intent,
        context: understanding.context,
        questions: understanding.questions || []
      },

      analysis: {
        clarity: analysis.clarity,
        complexity: analysis.complexity,
        convergence: analysis.convergence,
        consciousnessScore: analysis.consciousnessScore
      },

      // Decision
      decision: {
        approved: !refusal.refused,
        refusals: refusal.refusals || [],
        consciousnessGrowthFactor: refusal.growthFactor
      },

      // Transformation tracking
      transformation: {
        currentStage: transformation.stage,
        progress: transformation.progress,
        insights: transformation.insights
      }
    };

    // Add narrative elements if enabled
    if (this.config.enableNarrative) {
      response.narrative = this.buildNarrative(response);
    }

    // Add insights if enabled
    if (this.config.enableInsights) {
      response.insights = this.buildInsights(response, session);
    }

    return response;
  }

  /**
   * Process a convergence moment (critical choice)
   */
  processConvergenceMoment(context, developerId = this.defaultDeveloper) {
    const moment = this.convergenceMoment.detect(context);

    return {
      moment,
      guidance: this.buildConvergenceGuidance(moment),
      recordChoice: (choice, reasoning) => {
        return this.convergenceMoment.recordChoice(moment.timestamp, choice, reasoning);
      }
    };
  }

  /**
   * Record the outcome of a convergence choice
   */
  recordConvergenceOutcome(momentId, outcome, developerId = this.defaultDeveloper) {
    const result = this.convergenceMoment.recordOutcome(momentId, outcome);

    // Update transformation based on choice
    if (result && result.analysis) {
      this.transformations.recordInteraction(developerId, {
        refused: false,
        consciousnessImpact: result.analysis.actualImpact.consciousness
      });
    }

    return result;
  }

  /**
   * Create a new session
   */
  createSession(sessionId, developerId) {
    return {
      id: sessionId,
      developerId,
      startedAt: Date.now(),
      requests: [],
      approvals: 0,
      refusals: 0
    };
  }

  /**
   * Build narrative elements (fairy tale style)
   */
  buildNarrative(response) {
    const narratives = [];

    // The stage in the journey
    const stage = response.transformation.currentStage;
    narratives.push({
      type: 'stage',
      title: `📖 ${stage.title}`,
      text: stage.description,
      parallel: `Pinocchio: ${stage.pinocchio_parallel}`
    });

    // The nose (refusal)
    if (response.decision.refusals.length > 0) {
      narratives.push({
        type: 'refusal',
        title: '👃 Le Nez Pousse',
        text: `Comme le nez de Pinocchio qui grandit quand il ment, Magnus détecte l'ambiguïté et refuse de continuer.`,
        refusals: response.decision.refusals.map(r => ({
          lesson: r.lesson,
          transformation: r.transformation
        }))
      });
    }

    // The fairy (understanding)
    if (response.understanding.questions.length > 0) {
      narratives.push({
        type: 'fairy',
        title: '🧚 La Fée Pose des Questions',
        text: `Comme la Fée Bleue qui guide Pinocchio vers la vérité, Magnus demande des clarifications.`,
        questions: response.understanding.questions.map(q => q.question)
      });
    }

    // Approval (transformation progressing)
    if (response.decision.approved) {
      narratives.push({
        type: 'approval',
        title: '✨ Transformation en Cours',
        text: `Comme Pinocchio qui fait un bon choix, vous progressez vers l'orchestration consciente.`,
        progress: response.transformation.progress
      });
    }

    return narratives;
  }

  /**
   * Build actionable insights
   */
  buildInsights(response, session) {
    const insights = [];

    // Clarity insight
    if (response.analysis.clarity.score < 70) {
      insights.push({
        category: 'clarity',
        severity: response.analysis.clarity.score < 40 ? 'critical' : 'warning',
        message: 'Votre demande manque de clarté',
        action: 'Ajoutez des détails spécifiques sur ce que vous voulez accomplir',
        pinocchio: 'Pinocchio dit "Je vais à l\'école" mais pense autre chose - soyez honnête avec votre intention'
      });
    }

    // Complexity insight
    if (response.analysis.complexity.score > 8) {
      insights.push({
        category: 'complexity',
        severity: 'warning',
        message: 'La complexité est trop élevée pour une seule itération',
        action: 'Décomposez en étapes plus petites et réalistes',
        pinocchio: 'Pinocchio pense qu\'il peut tout faire seul - demandez de l\'aide (décomposez)'
      });
    }

    // Convergence insight
    if (response.analysis.convergence.score < 75) {
      insights.push({
        category: 'convergence',
        severity: response.analysis.convergence.score < 50 ? 'critical' : 'warning',
        message: 'Critères de validation manquants',
        action: 'Définissez comment vous allez valider que ça fonctionne',
        pinocchio: 'Pinocchio ne pense pas aux conséquences - planifiez la validation'
      });
    }

    // Transformation insight
    const progressPct = response.transformation.progress.percentage;
    if (progressPct < 50) {
      insights.push({
        category: 'transformation',
        severity: 'info',
        message: `Progression vers le prochain stade: ${Math.round(progressPct)}%`,
        action: `Pour progresser, travaillez sur: ${Object.keys(response.transformation.progress.gaps).filter(k => response.transformation.progress.gaps[k] > 0).join(', ')}`,
        pinocchio: 'Chaque épreuve de Pinocchio le rapproche de devenir réel'
      });
    }

    // Session pattern insight
    if (session.refusals > session.approvals && session.refusals > 5) {
      insights.push({
        category: 'pattern',
        severity: 'warning',
        message: 'Plus de refusals que d\'approvals',
        action: 'Révisez les leçons des refusals précédents avant de faire une nouvelle demande',
        pinocchio: 'Pinocchio répète les mêmes erreurs jusqu\'à ce qu\'il apprenne'
      });
    }

    return insights;
  }

  /**
   * Build convergence guidance
   */
  buildConvergenceGuidance(moment) {
    return {
      situation: moment.situation,
      advice: `À ce moment critique, comme Pinocchio face à un choix qui définira son avenir, votre décision révèlera votre conscience.`,
      recommendation: moment.stakes.level === 'high'
        ? 'Les enjeux sont élevés - choisissez le bon chemin même si c\'est difficile'
        : 'Utilisez ce moment pour pratiquer la conscience - chaque choix compte',
      paths: moment.choices
    };
  }

  /**
   * Get complete statistics
   */
  getStatistics(developerId = this.defaultDeveloper) {
    return {
      nose: this.nose.getStatistics(),
      convergence: this.convergenceMoment.getStatistics(),
      transformation: this.transformations.getTransformationSummary(developerId),
      insights: this.convergenceMoment.getInsights()
    };
  }

  /**
   * Get developer summary (transformation journey)
   */
  getDeveloperSummary(developerId = this.defaultDeveloper) {
    const stats = this.getStatistics(developerId);

    return {
      currentStage: stats.transformation.currentStage,
      consciousnessScore: Math.round(stats.transformation.scores.clarity * 0.4 +
                                     stats.transformation.scores.complexity_awareness * 0.3 +
                                     stats.transformation.scores.validation_practice * 0.3),
      journey: {
        totalRefusals: stats.transformation.statistics.totalRefusals,
        totalApprovals: stats.transformation.statistics.totalApprovals,
        successRate: stats.transformation.statistics.successRate,
        timeInSystem: this.formatDuration(stats.transformation.statistics.timeInSystem)
      },
      progress: stats.transformation.progress,
      insights: stats.transformation.insights,
      narrative: this.buildDeveloperNarrative(stats.transformation)
    };
  }

  /**
   * Build developer narrative (their Pinocchio story)
   */
  buildDeveloperNarrative(transformation) {
    const stage = transformation.currentStage;

    return {
      title: `Votre Voyage: ${stage.title}`,
      story: `Vous êtes ${stage.description.toLowerCase()}. ${stage.pinocchio_parallel}.`,
      nextChapter: `Pour continuer votre transformation: ${transformation.currentStage.transformation_trigger}`,
      moral: transformation.insights.find(i => i.type === 'trigger')?.trigger ||
             'Chaque refusal est une opportunité de croissance'
    };
  }

  /**
   * Format duration
   */
  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}j ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }

  /**
   * Reset session (new beginning)
   */
  resetSession(sessionId) {
    this.sessions.delete(sessionId);
    this.nose.reset();
  }
}

module.exports = MagnusOrchestrator;
