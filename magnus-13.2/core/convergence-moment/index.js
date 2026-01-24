/**
 * CONVERGENCE MOMENT - The Critical Choice
 *
 * The moment when the developer must choose between
 * "good enough" and "truly good" - like Pinocchio
 * choosing between Toyland and saving Geppetto.
 *
 * This is where transformation becomes real.
 */

class ConvergenceMoment {
  constructor(config = {}) {
    this.convergenceThreshold = config.convergenceThreshold || 75;
    this.moments = [];
  }

  /**
   * Detect a convergence moment
   *
   * This happens when the developer is faced with a choice:
   * - Accept "good enough" code
   * - OR spend time validating/improving to "truly good"
   */
  detect(context) {
    const moment = {
      timestamp: Date.now(),
      type: this.detectMomentType(context),
      stakes: this.assessStakes(context),
      choice: null,
      outcome: null
    };

    // Assess the situation
    moment.situation = this.describeSituation(moment.type, moment.stakes);

    // Present the choice
    moment.choices = this.presentChoices(moment.type, context);

    this.moments.push(moment);

    return moment;
  }

  /**
   * Detect what type of moment this is
   */
  detectMomentType(context) {
    const { codeQuality, testCoverage, timeRemaining, pressure } = context;

    if (codeQuality >= 70 && codeQuality < this.convergenceThreshold) {
      if (timeRemaining === 'low' || pressure === 'high') {
        return 'THE_TEMPTATION'; // Like Toyland - easy path vs right path
      } else {
        return 'THE_TEST'; // Like the choice to save Geppetto
      }
    }

    if (testCoverage < 60 && codeQuality >= 80) {
      return 'THE_VALIDATION_GAP'; // Code seems good but untested
    }

    if (context.complexityActual > context.complexityEstimated) {
      return 'THE_REALITY_CHECK'; // Harder than expected
    }

    return 'THE_CHOICE'; // Generic critical decision point
  }

  /**
   * Assess the stakes of this moment
   */
  assessStakes(context) {
    const stakes = {
      technical: this.assessTechnicalStakes(context),
      temporal: this.assessTemporalStakes(context),
      consciousness: this.assessConsciousnessStakes(context)
    };

    // Overall stakes level
    const avgStakes = (stakes.technical + stakes.temporal + stakes.consciousness) / 3;

    stakes.level = avgStakes >= 70 ? 'high' : avgStakes >= 40 ? 'medium' : 'low';

    return stakes;
  }

  assessTechnicalStakes(context) {
    // How critical is this code?
    const { criticality = 50, usersAffected = 0, dataRisk = 0 } = context;
    return (criticality + usersAffected + dataRisk) / 3;
  }

  assessTemporalStakes(context) {
    // How much pressure is there?
    const { deadline = 'none', pressure = 'low' } = context;

    const pressureScore = {
      'low': 20,
      'medium': 50,
      'high': 80
    }[pressure] || 50;

    const deadlineScore = {
      'none': 0,
      'flexible': 20,
      'firm': 50,
      'urgent': 80,
      'critical': 100
    }[deadline] || 50;

    return (pressureScore + deadlineScore) / 2;
  }

  assessConsciousnessStakes(context) {
    // How much will this choice reveal about consciousness?
    const { transformationStage = 1, refusalHistory = 0 } = context;

    // Higher stage + more refusals = higher consciousness stakes
    const stageScore = transformationStage * 20;
    const historyScore = Math.min(refusalHistory * 2, 100);

    return (stageScore + historyScore) / 2;
  }

  /**
   * Describe the situation like a fairy tale moment
   */
  describeSituation(type, stakes) {
    const situations = {
      'THE_TEMPTATION': {
        title: 'Le Moment de la Tentation',
        description: `Comme Pinocchio face à l'Île des Plaisirs, vous avez un code qui "fonctionne assez bien". Vous pourriez l'accepter maintenant et passer à autre chose. Mais est-ce vraiment bon?`,
        pinocchio_parallel: 'Honest John dit: "Viens à Toyland, amuse-toi!" vs La conscience dit: "Va à l\'école, apprends!"',
        risk: 'Si vous choisissez la facilité, vous risquez de devenir un âne (code qui échoue en production)'
      },
      'THE_TEST': {
        title: 'Le Moment du Test',
        description: `Comme Pinocchio qui doit choisir entre s'échapper ou sauver Geppetto, vous devez choisir entre avancer rapidement ou faire les choses correctement.`,
        pinocchio_parallel: 'Pinocchio dans le ventre de la baleine - sauver ou fuir?',
        risk: 'Le choix révèle qui vous êtes vraiment'
      },
      'THE_VALIDATION_GAP': {
        title: 'Le Trou de Validation',
        description: `Le code semble bon, mais vous n'avez pas vraiment testé. Comme Pinocchio qui pense pouvoir mentir sans conséquence.`,
        pinocchio_parallel: 'Le nez n\'a pas encore poussé, mais le mensonge est là',
        risk: 'Les bugs cachés deviennent des catastrophes en production'
      },
      'THE_REALITY_CHECK': {
        title: 'La Vérification de Réalité',
        description: `C'est plus complexe que prévu. Comme Pinocchio réalisant que devenir réel demande plus que juste vouloir l'être.`,
        pinocchio_parallel: 'Pinocchio découvre que la transformation demande du sacrifice',
        risk: 'Continuer sans reconnaître la complexité mène à l\'échec'
      },
      'THE_CHOICE': {
        title: 'Le Moment du Choix',
        description: `Un moment critique où votre décision révèlera votre niveau de conscience.`,
        pinocchio_parallel: 'Chaque choix de Pinocchio le rapproche ou l\'éloigne d\'être réel',
        risk: 'Les petits choix s\'accumulent en grande transformation'
      }
    };

    const situation = situations[type] || situations['THE_CHOICE'];
    situation.stakes = stakes;

    return situation;
  }

  /**
   * Present the two paths (like the fairy tale fork in the road)
   */
  presentChoices(type, context) {
    return {
      easy_path: {
        title: 'Le Chemin Facile',
        description: 'Accepter le code tel quel et continuer',
        consequences: [
          '✓ Gain de temps immédiat',
          '✓ Pression réduite',
          '✗ Risques techniques non-adressés',
          '✗ Dette technique accumulée',
          '✗ Conscience stagnante'
        ],
        pinocchio_parallel: 'Aller à Toyland - plaisir immédiat, transformation en âne',
        convergence_impact: -20,
        consciousness_impact: -10
      },
      right_path: {
        title: 'Le Bon Chemin',
        description: 'Prendre le temps de valider et améliorer',
        consequences: [
          '✓ Code de qualité validée',
          '✓ Confiance dans la solution',
          '✓ Conscience augmentée',
          '✗ Temps supplémentaire nécessaire',
          '✗ Pression augmentée temporairement'
        ],
        pinocchio_parallel: 'Sauver Geppetto - sacrifice immédiat, transformation en garçon réel',
        convergence_impact: +25,
        consciousness_impact: +15
      }
    };
  }

  /**
   * Record the choice made
   */
  recordChoice(momentId, choice, reasoning = '') {
    const moment = this.moments.find(m => m.timestamp === momentId);
    if (!moment) return null;

    moment.choice = choice; // 'easy_path' or 'right_path'
    moment.reasoning = reasoning;
    moment.choiceTimestamp = Date.now();
    moment.timeToDecide = moment.choiceTimestamp - moment.timestamp;

    return moment;
  }

  /**
   * Record the outcome of the choice
   */
  recordOutcome(momentId, outcome) {
    const moment = this.moments.find(m => m.timestamp === momentId);
    if (!moment) return null;

    moment.outcome = {
      success: outcome.success,
      actualTime: outcome.actualTime,
      quality: outcome.quality,
      learnings: outcome.learnings,
      timestamp: Date.now()
    };

    // Analyze if the choice was correct
    moment.analysis = this.analyzeChoice(moment);

    return moment;
  }

  /**
   * Analyze if the choice aligned with the outcome
   */
  analyzeChoice(moment) {
    if (!moment.choice || !moment.outcome) return null;

    const { choice, outcome, choices } = moment;
    const chosenPath = choices[choice];

    const analysis = {
      choiceWasCorrect: null,
      actualImpact: {
        convergence: outcome.quality - 50, // Relative to baseline
        consciousness: 0
      },
      lesson: ''
    };

    // Compare predicted vs actual impact
    if (choice === 'right_path' && outcome.success) {
      analysis.choiceWasCorrect = true;
      analysis.actualImpact.consciousness = +15;
      analysis.lesson = 'Vous avez choisi le bon chemin et cela a porté ses fruits. Comme Pinocchio sauvant Geppetto, le sacrifice mène à la transformation.';
    } else if (choice === 'right_path' && !outcome.success) {
      analysis.choiceWasCorrect = true; // Still correct even if failed
      analysis.actualImpact.consciousness = +10;
      analysis.lesson = 'Vous avez choisi le bon chemin même si le résultat n\'est pas parfait. L\'intention compte pour la conscience.';
    } else if (choice === 'easy_path' && outcome.success) {
      analysis.choiceWasCorrect = false; // Lucky but wrong
      analysis.actualImpact.consciousness = -5;
      analysis.lesson = 'Le chemin facile a fonctionné cette fois, mais comme Pinocchio à Toyland, cela ne dure jamais.';
    } else {
      analysis.choiceWasCorrect = false;
      analysis.actualImpact.consciousness = -15;
      analysis.lesson = 'Le chemin facile a mené à l\'échec, comme Pinocchio transformé en âne. Les raccourcis ont un prix.';
    }

    return analysis;
  }

  /**
   * Get statistics about convergence moments
   */
  getStatistics() {
    if (this.moments.length === 0) {
      return {
        totalMoments: 0,
        choicesMade: 0,
        rightPathChosen: 0,
        easyPathChosen: 0,
        successRate: 0,
        consciousnessGrowth: 0
      };
    }

    const withChoices = this.moments.filter(m => m.choice);
    const withOutcomes = this.moments.filter(m => m.outcome);

    const rightPathCount = withChoices.filter(m => m.choice === 'right_path').length;
    const easyPathCount = withChoices.filter(m => m.choice === 'easy_path').length;

    const successfulOutcomes = withOutcomes.filter(m => m.outcome.success).length;
    const successRate = withOutcomes.length > 0 ? (successfulOutcomes / withOutcomes.length) * 100 : 0;

    const consciousnessGrowth = withOutcomes.reduce((sum, m) => {
      return sum + (m.analysis?.actualImpact.consciousness || 0);
    }, 0);

    return {
      totalMoments: this.moments.length,
      choicesMade: withChoices.length,
      rightPathChosen: rightPathCount,
      easyPathChosen: easyPathCount,
      successRate: Math.round(successRate),
      consciousnessGrowth,
      trend: rightPathCount > easyPathCount ? 'improving' : 'needs_attention'
    };
  }

  /**
   * Get convergence moment insights
   */
  getInsights() {
    const stats = this.getStatistics();

    const insights = [];

    // Path choice analysis
    if (stats.rightPathChosen > stats.easyPathChosen) {
      insights.push({
        type: 'positive',
        message: '✓ Vous choisissez généralement le bon chemin',
        detail: `${stats.rightPathChosen} fois le bon chemin vs ${stats.easyPathChosen} fois le chemin facile`
      });
    } else if (stats.easyPathChosen > stats.rightPathChosen) {
      insights.push({
        type: 'warning',
        message: '⚠ Vous tendez vers le chemin facile',
        detail: `${stats.easyPathChosen} fois le chemin facile vs ${stats.rightPathChosen} fois le bon chemin`,
        advice: 'Comme Pinocchio, les raccourcis mènent à la transformation en âne'
      });
    }

    // Consciousness growth
    if (stats.consciousnessGrowth > 0) {
      insights.push({
        type: 'positive',
        message: `📈 Conscience en croissance: +${stats.consciousnessGrowth} points`,
        detail: 'Vos choix contribuent à votre transformation'
      });
    } else if (stats.consciousnessGrowth < 0) {
      insights.push({
        type: 'warning',
        message: `📉 Conscience en déclin: ${stats.consciousnessGrowth} points`,
        detail: 'Vos choix vous éloignent de la transformation réelle'
      });
    }

    // Success rate
    if (stats.successRate >= 75) {
      insights.push({
        type: 'positive',
        message: `✓ Taux de succès élevé: ${stats.successRate}%`,
        detail: 'Vos décisions mènent généralement au succès'
      });
    } else if (stats.successRate < 50) {
      insights.push({
        type: 'warning',
        message: `✗ Taux de succès faible: ${stats.successRate}%`,
        detail: 'Revisitez vos critères de décision'
      });
    }

    return insights;
  }
}

module.exports = ConvergenceMoment;
