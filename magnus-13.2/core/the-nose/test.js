/**
 * THE NOSE - Tests
 *
 * Testing the refusal system with various scenarios
 */

const TheNose = require('./index');

// Test scenarios inspired by Pinocchio's lies
const testScenarios = [
  {
    name: 'Clear and realistic request',
    request: {
      text: 'Create a login form with email and password validation. Must validate email format and require minimum 8 character password. Test with valid and invalid inputs.'
    },
    expected: {
      clarity: 'pass',
      complexity: 'pass',
      convergence: 'pass',
      refused: false
    }
  },
  {
    name: "Pinocchio's first lie - vague request",
    request: {
      text: 'Build me an app'
    },
    expected: {
      clarity: 'fail',
      refused: true
    }
  },
  {
    name: "Pinocchio's ambition - unrealistic complexity",
    request: {
      text: 'Create an entire social media platform with authentication, real-time chat, video calls, AI recommendations, and blockchain integration'
    },
    expected: {
      complexity: 'fail',
      refused: true
    }
  },
  {
    name: "Missing validation - like going to Toyland",
    request: {
      text: 'Create a payment system that processes transactions'
    },
    expected: {
      convergence: 'fail',
      refused: true
    }
  },
  {
    name: 'Moderate complexity with good clarity',
    request: {
      text: 'Implement a shopping cart that allows adding and removing items, must calculate total price and apply discount codes. Validate cart before checkout.'
    },
    expected: {
      clarity: 'pass',
      complexity: 'pass',
      convergence: 'pass',
      refused: false
    }
  },
  {
    name: "Triple refusal - Pinocchio at his worst",
    request: {
      text: 'Make something cool'
    },
    expected: {
      clarity: 'fail',
      complexity: 'uncertain',
      convergence: 'fail',
      refused: true
    }
  }
];

function runTests() {
  console.log('🤥 THE NOSE - Testing Refusal System\n');
  console.log('═══════════════════════════════════════════════════════\n');

  const nose = new TheNose();
  let passed = 0;
  let failed = 0;

  testScenarios.forEach((scenario, index) => {
    console.log(`Test ${index + 1}: ${scenario.name}`);
    console.log('─────────────────────────────────────────────────────');
    console.log(`Request: "${scenario.request.text}"\n`);

    // Detect
    const analysis = nose.detect(scenario.request);
    console.log(`📊 Analysis:`);
    console.log(`   Clarity: ${analysis.clarity.score}/100 (${analysis.clarity.message})`);
    console.log(`   Complexity: ${analysis.complexity.score}/10 (${analysis.complexity.message})`);
    console.log(`   Convergence: ${analysis.convergence.score}/100 (${analysis.convergence.message})`);
    console.log(`   Consciousness: ${Math.round(analysis.consciousnessScore)}/100\n`);

    // Refuse
    const decision = nose.refuse(analysis);

    if (decision.refused) {
      console.log(`❌ REFUSED (The nose grows!)`);
      console.log(`   Growth Factor: ${decision.growthFactor.toFixed(2)}x\n`);

      decision.refusals.forEach(refusal => {
        console.log(`   ${refusal.type}:`);
        console.log(`      Reason: ${refusal.reason}`);
        console.log(`      Lesson: ${refusal.lesson}`);
        console.log(`      Transformation: ${refusal.transformation}\n`);
      });
    } else {
      console.log(`✅ APPROVED (The nose stays small)\n`);
    }

    // Check expectations
    const testPassed = decision.refused === scenario.expected.refused;
    if (testPassed) {
      console.log(`✓ Test PASSED\n`);
      passed++;
    } else {
      console.log(`✗ Test FAILED - Expected refused=${scenario.expected.refused}, got ${decision.refused}\n`);
      failed++;
    }

    console.log('═══════════════════════════════════════════════════════\n');
  });

  // Statistics
  const stats = nose.getStatistics();
  console.log('📈 STATISTICS:');
  console.log('─────────────────────────────────────────────────────');
  console.log(`Total Refusals: ${stats.totalRefusals}`);
  console.log(`Average Consciousness: ${stats.averageConsciousness}/100`);
  console.log(`Refusals by Type:`, stats.refusalsByType);
  console.log(`Trend: ${stats.trend}`);
  console.log(`Current Growth Factor: ${stats.growthFactor.toFixed(2)}x\n`);

  console.log('═══════════════════════════════════════════════════════\n');
  console.log(`RESULTS: ${passed} passed, ${failed} failed`);

  if (failed === 0) {
    console.log('🎉 All tests passed! The nose works correctly.\n');
  } else {
    console.log('⚠️  Some tests failed. The nose needs adjustment.\n');
  }
}

// Run if executed directly
if (require.main === module) {
  runTests();
}

module.exports = { runTests, testScenarios };
