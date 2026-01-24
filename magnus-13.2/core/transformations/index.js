/**
 * TRANSFORMATIONS - The Five Stages
 *
 * Tracks the developer's journey from passive consumer
 * to conscious orchestrator, mirroring Pinocchio's
 * transformation from wooden puppet to real boy.
 */

class Transformations {
  constructor() {
    this.stages = this.defineStages();
    this.developerProfiles = new Map();
  }

  /**
   * Define the five transformation stages
   */
  defineStages() {
    return [
      {
        id: 1,
        name: 'WOODEN_PUPPET',
        title: 'Marionnette Inanimée',
        description: 'Developer passif - Accepte tout sans question',
        characteristics: {
          clarity: { min: 0, max: 40 },
          complexity_awareness: { min: 0, max: 30 },
          validation_practice: { min: 0, max: 20 },
          refusal_count: { min: 0, max: 10 }
        },
        behaviors: [
          'Demandes vagues et non-structurées',
          'Accepte le code généré sans validation',
          'Aucune conscience de la complexité',
          'Ne pose pas de questions'
        ],
        pinocchio_parallel: 'Geppetto crée Pinocchio - marionnette de bois sans conscience',
        transformation_trigger: 'Premier refusal qui force la confrontation'
      },
      {
        id: 2,
        name: 'TALKING_PUPPET',
        title: 'Marionnette qui Parle',
        description: 'Developer utilisateur - Interaction mais pas de vraie validation',
        characteristics: {
          clarity: { min: 41, max: 60 },
          complexity_awareness: { min: 31, max: 50 },
          validation_practice: { min: 21, max: 40 },
          refusal_count: { min: 11, max: 25 }
        },
        behaviors: [
          'Demandes plus spécifiques mais encore vagues',
          'Teste superficiellement le code',
          'Conscience partielle de la complexité',
          'Pose quelques questions basiques'
        ],
        pinocchio_parallel: 'Pinocchio peut parler et bouger, mais ment et fait n\'importe quoi',
        transformation_trigger: 'Première vraie conséquence d\'un refusal (le nez pousse)'
      },
      {
        id: 3,
        name: 'REFUSING_PUPPET',
        title: 'Marionnette qui Refuse',
        description: 'Developer conscient - Commence à confronter l\'ambiguïté',
        characteristics: {
          clarity: { min: 61, max: 75 },
          complexity_awareness: { min: 51, max: 70 },
          validation_practice: { min: 41, max: 60 },
          refusal_count: { min: 26, max: 50 }
        },
        behaviors: [
          'Demandes bien structurées',
          'Valide avec des tests spécifiques',
          'Bonne conscience de la complexité',
          'Pose des questions de clarification'
        ],
        pinocchio_parallel: 'Le nez pousse - Pinocchio découvre qu\'il ne peut pas mentir impunément',
        transformation_trigger: 'Acceptation que les refusals révèlent la vérité'
      },
      {
        id: 4,
        name: 'CHOOSING_PUPPET',
        title: 'Marionnette qui Choisit',
        description: 'Developer orchestrateur - Décisions conscientes et stratégiques',
        characteristics: {
          clarity: { min: 76, max: 90 },
          complexity_awareness: { min: 71, max: 85 },
          validation_practice: { min: 61, max: 80 },
          refusal_count: { min: 51, max: 100 }
        },
        behaviors: [
          'Demandes précises avec contexte complet',
          'Validation rigoureuse et méthodique',
          'Excellente conscience de la complexité',
          'Anticipe les questions et y répond proactivement'
        ],
        pinocchio_parallel: 'Pinocchio choisit le devoir au lieu du plaisir (quitte l\'Île des Plaisirs)',
        transformation_trigger: 'Le moment de convergence - choisir l\'intégrité malgré le coût'
      },
      {
        id: 5,
        name: 'REAL_BOY',
        title: 'Garçon Réel',
        description: 'Orchestrateur autonome - La conscience est intégrée',
        characteristics: {
          clarity: { min: 91, max: 100 },
          complexity_awareness: { min: 86, max: 100 },
          validation_practice: { min: 81, max: 100 },
          refusal_count: { min: 101, max: Infinity }
        },
        behaviors: [
          'Demandes parfaitement claires et complètes',
          'Validation automatique et exhaustive',
          'Conscience totale de la complexité',
          'Pense comme Magnus lui-même'
        ],
        pinocchio_parallel: 'Pinocchio se transforme en garçon réel - la conscience est internalisée',
        transformation_trigger: 'N\'a plus besoin des refusals - est devenu auto-conscient'
      }
    ];
  }

  /**
   * Assess current transformation stage
   */
  assessStage(developerId, metrics) {
    const profile = this.getDeveloperProfile(developerId);

    // Calculate scores
    const scores = {
      clarity: this.calculateClarityScore(profile),
      complexity_awareness: this.calculateComplexityAwareness(profile),
      validation_practice: this.calculateValidationPractice(profile),
      refusal_count: profile.totalRefusals
    };

    // Determine stage
    const stage = this.determineStage(scores);

    // Update profile
    profile.currentStage = stage.id;
    profile.stageHistory.push({
      stage: stage.id,
      timestamp: Date.now(),
      scores
    });

    return {
      stage,
      scores,
      progress: this.calculateProgressToNextStage(scores, stage),
      insights: this.generateInsights(stage, scores, profile)
    };
  }

  /**
   * Get or create developer profile
   */
  getDeveloperProfile(developerId) {
    if (!this.developerProfiles.has(developerId)) {
      this.developerProfiles.set(developerId, {
        id: developerId,
        createdAt: Date.now(),
        currentStage: 1,
        stageHistory: [],
        totalRefusals: 0,
        totalApprovals: 0,
        clarityTrend: [],
        complexityTrend: [],
        validationTrend: []
      });
    }
    return this.developerProfiles.get(developerId);
  }

  /**
   * Determine stage based on scores
   */
  determineStage(scores) {
    // Check each stage from highest to lowest
    for (let i = this.stages.length - 1; i >= 0; i--) {
      const stage = this.stages[i];
      const chars = stage.characteristics;

      const fitsClarity = scores.clarity >= chars.clarity.min && scores.clarity <= chars.clarity.max;
      const fitsComplexity = scores.complexity_awareness >= chars.complexity_awareness.min &&
                            scores.complexity_awareness <= chars.complexity_awareness.max;
      const fitsValidation = scores.validation_practice >= chars.validation_practice.min &&
                            scores.validation_practice <= chars.validation_practice.max;
      const fitsRefusals = scores.refusal_count >= chars.refusal_count.min &&
                          (chars.refusal_count.max === Infinity || scores.refusal_count <= chars.refusal_count.max);

      // Must fit at least 3 out of 4 characteristics
      const matchCount = [fitsClarity, fitsComplexity, fitsValidation, fitsRefusals].filter(Boolean).length;

      if (matchCount >= 3) {
        return stage;
      }
    }

    // Default to first stage
    return this.stages[0];
  }

  /**
   * Calculate clarity score from profile
   */
  calculateClarityScore(profile) {
    if (profile.clarityTrend.length === 0) return 0;

    // Use recent trend (last 10 requests)
    const recent = profile.clarityTrend.slice(-10);
    return recent.reduce((sum, score) => sum + score, 0) / recent.length;
  }

  /**
   * Calculate complexity awareness score
   */
  calculateComplexityAwareness(profile) {
    if (profile.complexityTrend.length === 0) return 0;

    // How well does the developer estimate complexity?
    // Lower difference between estimated and actual = higher awareness
    const recent = profile.complexityTrend.slice(-10);
    const awareness = recent.map(item => {
      const diff = Math.abs(item.estimated - item.actual);
      return Math.max(0, 100 - (diff * 20));
    });

    return awareness.reduce((sum, score) => sum + score, 0) / awareness.length;
  }

  /**
   * Calculate validation practice score
   */
  calculateValidationPractice(profile) {
    if (profile.validationTrend.length === 0) return 0;

    // How thoroughly does the developer validate?
    const recent = profile.validationTrend.slice(-10);
    return recent.reduce((sum, score) => sum + score, 0) / recent.length;
  }

  /**
   * Calculate progress to next stage
   */
  calculateProgressToNextStage(scores, currentStage) {
    if (currentStage.id === 5) {
      return {
        percentage: 100,
        message: 'Transformation complète - Vous êtes devenu un orchestrateur réel'
      };
    }

    const nextStage = this.stages[currentStage.id]; // id is 1-indexed, array is 0-indexed
    const nextChars = nextStage.characteristics;

    // Calculate how close to next stage minimums
    const clarityProgress = (scores.clarity / nextChars.clarity.min) * 100;
    const complexityProgress = (scores.complexity_awareness / nextChars.complexity_awareness.min) * 100;
    const validationProgress = (scores.validation_practice / nextChars.validation_practice.min) * 100;
    const refusalProgress = (scores.refusal_count / nextChars.refusal_count.min) * 100;

    const avgProgress = (clarityProgress + complexityProgress + validationProgress + refusalProgress) / 4;

    return {
      percentage: Math.min(avgProgress, 100),
      nextStage: nextStage.title,
      gaps: {
        clarity: Math.max(0, nextChars.clarity.min - scores.clarity),
        complexity: Math.max(0, nextChars.complexity_awareness.min - scores.complexity_awareness),
        validation: Math.max(0, nextChars.validation_practice.min - scores.validation_practice),
        refusals: Math.max(0, nextChars.refusal_count.min - scores.refusal_count)
      }
    };
  }

  /**
   * Generate insights about transformation
   */
  generateInsights(stage, scores, profile) {
    const insights = [];

    // Stage-specific insights
    insights.push({
      type: 'stage',
      message: `Vous êtes au stade "${stage.title}"`,
      detail: stage.description,
      parallel: `Pinocchio: ${stage.pinocchio_parallel}`
    });

    // Behavior patterns
    insights.push({
      type: 'behaviors',
      message: 'Comportements typiques à ce stade:',
      behaviors: stage.behaviors
    });

    // Transformation trigger
    insights.push({
      type: 'trigger',
      message: 'Pour passer au stade suivant:',
      trigger: stage.transformation_trigger
    });

    // Trend analysis
    if (profile.stageHistory.length >= 5) {
      const recentStages = profile.stageHistory.slice(-5).map(h => h.stage);
      const isProgressing = recentStages[recentStages.length - 1] > recentStages[0];
      const isRegressing = recentStages[recentStages.length - 1] < recentStages[0];

      if (isProgressing) {
        insights.push({
          type: 'trend',
          message: '📈 Vous progressez! La conscience émerge.',
          detail: 'Continue à accepter les refusals comme des opportunités d\'apprentissage'
        });
      } else if (isRegressing) {
        insights.push({
          type: 'trend',
          message: '📉 Attention: régression détectée',
          detail: 'Revisite les leçons des refusals précédents'
        });
      } else {
        insights.push({
          type: 'trend',
          message: '➡️  Stagnation',
          detail: 'Il faut confronter activement la complexité pour progresser'
        });
      }
    }

    return insights;
  }

  /**
   * Record interaction
   */
  recordInteraction(developerId, interaction) {
    const profile = this.getDeveloperProfile(developerId);

    if (interaction.refused) {
      profile.totalRefusals++;
    } else {
      profile.totalApprovals++;
    }

    if (interaction.clarity !== undefined) {
      profile.clarityTrend.push(interaction.clarity);
    }

    if (interaction.complexity !== undefined) {
      profile.complexityTrend.push({
        estimated: interaction.complexity.estimated || 0,
        actual: interaction.complexity.actual || 0
      });
    }

    if (interaction.validation !== undefined) {
      profile.validationTrend.push(interaction.validation);
    }

    return this.assessStage(developerId, {});
  }

  /**
   * Get transformation summary
   */
  getTransformationSummary(developerId) {
    const profile = this.getDeveloperProfile(developerId);
    const currentAssessment = this.assessStage(developerId, {});

    return {
      developerId,
      currentStage: currentAssessment.stage,
      scores: currentAssessment.scores,
      progress: currentAssessment.progress,
      insights: currentAssessment.insights,
      statistics: {
        totalRefusals: profile.totalRefusals,
        totalApprovals: profile.totalApprovals,
        successRate: profile.totalApprovals / (profile.totalRefusals + profile.totalApprovals) * 100 || 0,
        timeInSystem: Date.now() - profile.createdAt,
        stageProgression: profile.stageHistory.map(h => ({
          stage: this.stages[h.stage - 1].title,
          timestamp: h.timestamp
        }))
      }
    };
  }

  /**
   * Get all stages (for reference)
   */
  getAllStages() {
    return this.stages.map(stage => ({
      id: stage.id,
      name: stage.name,
      title: stage.title,
      description: stage.description,
      pinocchio_parallel: stage.pinocchio_parallel
    }));
  }
}

module.exports = Transformations;
