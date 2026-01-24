/**
 * MAGNUS 13.2 - Basic Usage Example
 *
 * This example demonstrates the transformation journey
 * from passive developer to conscious orchestrator.
 */

const MagnusOrchestrator = require('../api/orchestrator');

// Create Magnus instance
const magnus = new MagnusOrchestrator({
  developerId: 'example-dev',
  enableNarrative: true,
  enableInsights: true
});

console.log('🎭 MAGNUS 13.2 - Consciousness Framework');
console.log('═══════════════════════════════════════\n');

// Example 1: Vague request (will be refused)
console.log('Example 1: Vague Request\n');
console.log('Developer: "Build me an app"\n');

(async () => {
  const result1 = await magnus.process({
    text: 'Build me an app'
  });

  if (!result1.decision.approved) {
    console.log('❌ REFUSED\n');
    result1.decision.refusals.forEach(refusal => {
      console.log(`${refusal.type}:`);
      console.log(`  Reason: ${refusal.reason}`);
      console.log(`  Lesson: ${refusal.lesson}`);
      console.log(`  Transformation: ${refusal.transformation}\n`);
    });

    console.log('🧚 The Fairy asks:');
    result1.understanding.questions.forEach(q => {
      console.log(`  [${q.priority}] ${q.question}`);
    });
  }

  console.log('\n─────────────────────────────────────\n');

  // Example 2: Clearer request (may still be refused)
  console.log('Example 2: Clearer Request\n');
  console.log('Developer: "Create a login form with email and password"\n');

  const result2 = await magnus.process({
    text: 'Create a login form with email and password'
  });

  console.log(`Clarity: ${result2.analysis.clarity.score}/100`);
  console.log(`Complexity: ${result2.analysis.complexity.score}/10`);
  console.log(`Convergence: ${result2.analysis.convergence.score}/100`);
  console.log(`Consciousness: ${Math.round(result2.analysis.consciousnessScore)}/100\n`);

  if (!result2.decision.approved) {
    console.log('⚠️  PARTIALLY REFUSED\n');
    result2.decision.refusals.forEach(refusal => {
      console.log(`${refusal.type}: ${refusal.lesson}`);
    });
  } else {
    console.log('✅ APPROVED\n');
  }

  console.log('\n─────────────────────────────────────\n');

  // Example 3: Well-structured request (likely approved)
  console.log('Example 3: Well-Structured Request\n');
  console.log('Developer: "Create a login form with email and password validation."\n');
  console.log('           "Must validate email format (RFC 5322) and require minimum"\n');
  console.log('           "8 character passwords with at least 1 number and 1 special char."\n');
  console.log('           "Test with valid inputs (should succeed) and invalid inputs"\n');
  console.log('           "(should show error messages)."\n');

  const result3 = await magnus.process({
    text: `Create a login form with email and password validation.
           Must validate email format (RFC 5322) and require minimum
           8 character passwords with at least 1 number and 1 special char.
           Test with valid inputs (should succeed) and invalid inputs
           (should show error messages).`
  });

  console.log(`Clarity: ${result3.analysis.clarity.score}/100`);
  console.log(`Complexity: ${result3.analysis.complexity.score}/10`);
  console.log(`Convergence: ${result3.analysis.convergence.score}/100`);
  console.log(`Consciousness: ${Math.round(result3.analysis.consciousnessScore)}/100\n`);

  if (result3.decision.approved) {
    console.log('✅ APPROVED - Ready to implement\n');

    // Show transformation progress
    console.log('📊 Transformation Progress:');
    console.log(`  Current Stage: ${result3.transformation.currentStage.title}`);
    console.log(`  Progress to Next: ${Math.round(result3.transformation.progress.percentage)}%`);
    console.log(`  ${result3.transformation.currentStage.description}\n`);
  }

  console.log('\n─────────────────────────────────────\n');

  // Example 4: Convergence Moment
  console.log('Example 4: Convergence Moment (Critical Choice)\n');

  const convergence = magnus.processConvergenceMoment({
    codeQuality: 72,
    testCoverage: 55,
    timeRemaining: 'low',
    pressure: 'high',
    criticality: 80,
    transformationStage: 3,
    refusalHistory: 15
  });

  console.log(`Situation: ${convergence.moment.situation.title}`);
  console.log(`${convergence.moment.situation.description}\n`);

  console.log(`Pinocchio Parallel:`);
  console.log(`  ${convergence.moment.situation.pinocchio_parallel}\n`);

  console.log(`Stakes: ${convergence.moment.stakes.level.toUpperCase()}`);
  console.log(`  Technical: ${convergence.moment.stakes.technical}/100`);
  console.log(`  Temporal: ${convergence.moment.stakes.temporal}/100`);
  console.log(`  Consciousness: ${convergence.moment.stakes.consciousness}/100\n`);

  console.log('🔀 The Choice:\n');

  console.log('Option A: Le Chemin Facile');
  console.log(`  ${convergence.moment.choices.easy_path.description}`);
  console.log('  Consequences:');
  convergence.moment.choices.easy_path.consequences.forEach(c => {
    console.log(`    ${c}`);
  });
  console.log(`  Pinocchio: ${convergence.moment.choices.easy_path.pinocchio_parallel}\n`);

  console.log('Option B: Le Bon Chemin');
  console.log(`  ${convergence.moment.choices.right_path.description}`);
  console.log('  Consequences:');
  convergence.moment.choices.right_path.consequences.forEach(c => {
    console.log(`    ${c}`);
  });
  console.log(`  Pinocchio: ${convergence.moment.choices.right_path.pinocchio_parallel}\n`);

  // Developer chooses
  console.log('Developer chooses: Le Bon Chemin');
  console.log('Reasoning: "I want to build something I can trust"\n');

  convergence.recordChoice('right_path', 'I want to build something I can trust');

  // Simulate outcome after 3 days
  setTimeout(() => {
    magnus.recordConvergenceOutcome(convergence.moment.timestamp, {
      success: true,
      actualTime: 3 * 24 * 60 * 60 * 1000, // 3 days
      quality: 88,
      learnings: [
        'Validation caught 3 critical bugs that would have failed in production',
        'Test coverage increased to 85%',
        'Gained deeper understanding of the system'
      ]
    });

    console.log('✨ Outcome Recorded:\n');
    console.log('  Success: true');
    console.log('  Quality: 88/100');
    console.log('  Time: 3 days');
    console.log('  Consciousness Impact: +15 points\n');
    console.log('  Lesson: Vous avez choisi le bon chemin et cela a porté ses fruits.');
    console.log('          Comme Pinocchio sauvant Geppetto, le sacrifice mène à la transformation.\n');

    console.log('\n─────────────────────────────────────\n');

    // Final Summary
    console.log('📈 Developer Summary:\n');

    const summary = magnus.getDeveloperSummary();

    console.log(`Current Stage: ${summary.currentStage.title}`);
    console.log(`Consciousness Score: ${summary.consciousnessScore}/100\n`);

    console.log('Journey:');
    console.log(`  Total Refusals: ${summary.journey.totalRefusals}`);
    console.log(`  Total Approvals: ${summary.journey.totalApprovals}`);
    console.log(`  Success Rate: ${Math.round(summary.journey.successRate)}%`);
    console.log(`  Time in System: ${summary.journey.timeInSystem}\n`);

    console.log('Narrative:');
    console.log(`  ${summary.narrative.story}`);
    console.log(`  Next: ${summary.narrative.nextChapter}\n`);

    console.log('Insights:');
    summary.insights.forEach(insight => {
      console.log(`  ${insight.type}: ${insight.message}`);
    });

    console.log('\n═══════════════════════════════════════');
    console.log('🎉 Transformation in progress!');
    console.log('═══════════════════════════════════════\n');

  }, 100);

})();
