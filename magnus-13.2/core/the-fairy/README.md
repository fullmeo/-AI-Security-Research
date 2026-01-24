# THE FAIRY - Understanding Engine

> *"The Fairy doesn't give answers - she asks questions."*

## Overview

The Fairy is Magnus 13.2's Understanding Engine, inspired by the Blue Fairy who guides Pinocchio. She doesn't simply accept requests at face value - she **sees through ambiguity** and asks clarifying questions to reveal the developer's true intention.

Just as the Blue Fairy could see when Pinocchio was lying or confused, The Fairy detects vague requests, hidden assumptions, and critical ambiguities.

## Philosophy

```javascript
// In Pinocchio:
Pinocchio lies → Blue Fairy asks questions → Truth emerges → Consciousness grows

// In Magnus:
Developer is vague → The Fairy asks questions → Intent clarifies → Consciousness emerges
```

The Fairy's role is **not to provide solutions, but to reveal understanding**.

## Five Dimensions of Understanding

### 1. Intent (What do you want?)

**Detection:**
- Create/Build/Make
- Modify/Update/Change
- Fix/Debug/Resolve
- Remove/Delete
- Analyze/Investigate
- Optimize/Improve

**Clarity Levels:**
- `clear`: Single, well-defined intent
- `mixed`: Multiple intents (requires prioritization)
- `unclear`: No clear intent detected

**Example Questions:**
- "What is the primary goal you want to achieve?"
- "What problem are you trying to solve?"
- "What should be different after this is complete?"

### 2. Context (What's the situation?)

**Dimensions:**
- **Technology**: React, Node, Python, etc.
- **Domain**: E-commerce, Social, Finance, etc.
- **Scale**: Small, Medium, Large
- **Timeline**: Immediate, Short, Long
- **Stakeholders**: External users, Internal team

**Example Questions:**
- "What technologies or frameworks should be used?"
- "What is the business domain or use case?"
- "How many users should this handle?"

### 3. Constraints (What are the limits?)

**Types:**
- **Must**: Hard requirements (non-negotiable)
- **Should**: Soft requirements (preferred)
- **Cannot**: Prohibitions (never do this)
- **Prefer**: Preferences (nice to have)

**Example Questions:**
- "What are the hard requirements that must be met?"
- "What should this system never do?"
- "What are the non-negotiable aspects?"

### 4. Assumptions (What are you assuming?)

**Risk Types:**
- **Implicit**: "Obviously", "Of course", "Clearly"
- **Complexity**: "Just", "Simply", "Easy"
- **Knowledge**: "Everyone knows", "Standard"
- **Absolute**: "Always", "Never", "All"
- **Confidence**: "Should work", "Probably"

**Detection:**
Each assumption is flagged with a risk level:
- `high`: Implicit, Complexity
- `medium`: Knowledge, Absolute
- `low`: Confidence

**Example Questions:**
- "You mentioned 'simply' - can you elaborate on why you think this is simple?"
- "You said 'everyone knows' - what specific knowledge is assumed?"

### 5. Ambiguities (What is unclear?)

**Severity Types:**
- **Critical**: "Something", "Anything", "Stuff" (vague reference)
- **High**: "Etc", "And so on" (incomplete list)
- **Medium**: "Maybe", "Might", "Could" (uncertainty)
- **Low**: "Good", "Better", "Best" (subjective)

**Example Questions:**
- "You used 'something' - can you be more specific?"
- "You said 'etc' - what else should be included?"

## API Usage

### Basic Understanding

```javascript
const TheFairy = require('./the-fairy');

const fairy = new TheFairy();

// Start understanding a request
const understanding = fairy.understand({
  text: 'Build a login system'
}, 'session-123');

console.log(`Understanding Score: ${understanding.score}/100`);
console.log(`Complete: ${understanding.complete}`);

if (!understanding.complete) {
  console.log('\nClarifying Questions:');
  understanding.questions.forEach(q => {
    console.log(`[${q.priority}] ${q.question}`);
    console.log(`   Reason: ${q.reason}\n`);
  });
}
```

### Iterative Refinement

```javascript
// Initial request
let understanding = fairy.understand({
  text: 'Build something for users'
}, 'session-123');

// The Fairy asks questions
understanding.questions.forEach(q => {
  console.log(q.question);
});

// Developer answers
fairy.recordAnswer('session-123', 'intent',
  'Create a user authentication system with email/password');

// Re-analyze with more context
understanding = fairy.understand({
  text: 'Create a user authentication system with email/password. Must validate email format and require 8+ character passwords.'
}, 'session-123');

// Understanding score improves
console.log(`New Score: ${understanding.score}/100`);
```

### Understanding Breakdown

```javascript
const understanding = fairy.understand(request, sessionId);

// Intent analysis
console.log('Intent:', understanding.intent.primary);
console.log('Confidence:', understanding.intent.confidence);

// Context analysis
console.log('Technologies:', understanding.context.technology);
console.log('Domain:', understanding.context.domain);
console.log('Scale:', understanding.context.scale);

// Constraints
console.log('Must have:', understanding.constraints.must);
console.log('Cannot have:', understanding.constraints.cannot);

// Assumptions (risky)
understanding.assumptions.detected.forEach(a => {
  if (a.risk === 'high') {
    console.log(`⚠ Risky assumption: "${a.text}" (${a.type})`);
  }
});

// Ambiguities (critical)
understanding.ambiguities.detected.forEach(a => {
  if (a.severity === 'critical') {
    console.log(`❌ Critical ambiguity: "${a.text}" (${a.type})`);
  }
});
```

### Session Management

```javascript
// Get session summary
const summary = fairy.getSessionSummary('session-123');

console.log(`Iterations: ${summary.iterations}`);
console.log(`Questions Asked: ${summary.questionsAsked}`);
console.log(`Understanding: ${summary.understandingScore}/100`);
console.log(`Duration: ${summary.duration}ms`);
```

## Configuration

```javascript
const fairy = new TheFairy({
  maxQuestions: 5,              // Max questions per iteration
  understandingThreshold: 85    // Minimum score to be "complete"
});
```

## Understanding Scores

### Score Calculation

```javascript
Understanding Score =
  (Intent Confidence × 0.25) +
  (Context Score × 0.20) +
  (Constraints Score × 0.20) +
  (Assumptions Score × 0.15) +
  (Ambiguities Score × 0.20)
```

### Score Ranges

- **0-40**: Very unclear - Multiple critical issues
- **41-60**: Unclear - Needs significant clarification
- **61-80**: Partially clear - Some gaps remain
- **81-100**: Clear - Ready to proceed

## The Blue Fairy's Wisdom

### Question Priority

Questions are prioritized:
1. **High**: Intent unclear, Critical ambiguities, No hard constraints
2. **Medium**: Missing context, Risky assumptions
3. **Low**: Soft improvements, Optional details

### Question Types

The Fairy never asks:
- ❌ Closed yes/no questions (unless critical)
- ❌ Leading questions that suggest answers
- ❌ Multiple questions at once

The Fairy always asks:
- ✓ Open-ended questions
- ✓ Questions that reveal thinking
- ✓ Questions about concrete details
- ✓ Questions about validation

## Example Scenarios

### Scenario 1: Vague Request

```javascript
Request: "Build something for users"

Understanding:
- Intent: unclear (confidence: 0)
- Context: unknown
- Constraints: none
- Assumptions: 2 detected
- Ambiguities: 1 critical ("something")

Score: 15/100

Questions:
[high] What is the primary goal you want to achieve?
[high] You used "something" - can you be more specific?
[medium] Who are the users and what do they need?
```

### Scenario 2: Clear Request

```javascript
Request: "Create a login form with email and password validation.
Must validate email format and require 8+ character passwords.
Test with valid and invalid inputs."

Understanding:
- Intent: create (confidence: 100)
- Context: web form, validation
- Constraints: email format, 8+ chars, testing
- Assumptions: none
- Ambiguities: none

Score: 92/100
Complete: true
```

### Scenario 3: Risky Assumptions

```javascript
Request: "Simply add authentication - it's easy and everyone knows
how to do it. Just use the standard approach."

Understanding:
- Intent: create (confidence: 100)
- Context: authentication
- Constraints: use standard (vague)
- Assumptions: 4 detected (3 high-risk)
  - "Simply" (complexity assumption)
  - "Easy" (complexity assumption)
  - "Everyone knows" (knowledge assumption)
  - "Standard" (implicit assumption)
- Ambiguities: 2 detected

Score: 52/100

Questions:
[medium] You mentioned "simply" and "easy" - can you elaborate
         on why you think authentication is simple?
[medium] What specific "standard approach" should be used?
[high] What are the hard requirements for this authentication?
```

## Integration with Magnus

The Fairy is used in Phase 1 (Understanding) of Magnus:

```javascript
// Phase 1: Understanding
const understanding = fairy.understand(request, sessionId);

if (understanding.score < 70) {
  // Ask clarifying questions
  return {
    status: 'needs_clarification',
    questions: understanding.questions
  };
}

// Proceed to Phase 2 (Complexity)
```

## The Transformation

```
Developer Journey with The Fairy:

1. First Request → Vague
   Fairy: "What do you really want?"
   Developer: *clarifies*

2. Second Request → More specific
   Fairy: "What are the constraints?"
   Developer: *adds constraints*

3. Third Request → Constrained but assuming
   Fairy: "You assume X - is that valid?"
   Developer: *questions assumptions*

4. Fourth Request → Clear, constrained, validated
   Fairy: "Understanding complete" ✓
   Developer: *has learned to think before asking*

5. After Many Requests → The Fairy rarely needs to question
   Reason: Developer asks themselves the Fairy's questions
```

## The Lesson

> *"The Blue Fairy guides Pinocchio not by telling him what to do,*
> *but by helping him understand what he wants."*
>
> *"The Fairy asks questions not to delay,*
> *but to reveal the truth that was always there."*
>
> *"Understanding is not given. It is discovered."*

---

**Part of Magnus 13.2 - The Consciousness Framework**

*Inspired by the Blue Fairy (Collodi, 1882)*
