# Workflow: UX Improvement
**ID:** WF-03  
**Trigger Keywords:** UX, user experience, flow, journey, usability, confusing, friction, onboarding, navigation, conversion, drop-off, user testing, feedback, intuitive  
**Primary Agent:** UX  
**Support Agents:** UI, Planner, Tester (QA Manual), Coder  
**Estimated Time:** 1 day – 6 weeks (scope-dependent)  

---

## Overview

UX improvements focus on how users interact with the product — their mental models, task completion rates, and emotional experience. This workflow covers everything from fixing a confusing form to redesigning an entire user journey.

---

## Scope Classification

| Scope | Description | Time Estimate |
|-------|-------------|---------------|
| Micro-UX | Single interaction (tooltip, error message, button label) | 2–8 hours |
| Flow Fix | One user flow (checkout, signup, search) | 2–5 days |
| Feature UX | Full feature redesign | 1–3 weeks |
| Product UX | Core product experience overhaul | 4–12 weeks |

---

## Phase 1: Research & Discovery (UX Agent)

### 1.1 Quantitative Research
```
Data to collect:
- [ ] Analytics: drop-off points, time-on-task, error rates
- [ ] Funnel analysis: where users abandon
- [ ] Heatmaps: where users click/scroll
- [ ] Session recordings: watch real user sessions
- [ ] A/B test results (if any)
- [ ] Support tickets: common complaints
- [ ] NPS/CSAT scores
```

### 1.2 Qualitative Research
```
Methods:
- [ ] User interviews (5-8 users minimum)
- [ ] Usability testing (moderated or unmoderated)
- [ ] Contextual inquiry (observe users in their environment)
- [ ] Card sorting (for IA problems)
- [ ] Tree testing (for navigation problems)
```

### 1.3 Heuristic Evaluation
```
Nielsen's 10 Usability Heuristics:
1. [ ] Visibility of system status
2. [ ] Match between system and real world
3. [ ] User control and freedom
4. [ ] Consistency and standards
5. [ ] Error prevention
6. [ ] Recognition rather than recall
7. [ ] Flexibility and efficiency of use
8. [ ] Aesthetic and minimalist design
9. [ ] Help users recognize, diagnose, recover from errors
10. [ ] Help and documentation
```

### 1.4 User Journey Mapping
```
For each flow being improved, map:

CURRENT STATE JOURNEY:
Step 1: [User action] → [System response] → [User emotion]
Step 2: [User action] → [System response] → [User emotion]
...

Pain Points:
- [Pain point 1]: [Where it occurs] [Severity: High/Med/Low]
- [Pain point 2]: ...

Opportunities:
- [Opportunity 1]: [What could be improved]
```

---

## Phase 2: Problem Definition (UX Agent + Planner)

### 2.1 Problem Statement Framework
```
Using "How Might We" (HMW):

User: [Persona name/type]
Goal: [What they're trying to accomplish]
Obstacle: [What's preventing them]

HMW statement:
"How might we help [user] [accomplish goal] so that [desired outcome]?"

Example:
"How might we help new users complete their first project setup 
so that they experience value within 5 minutes of signing up?"
```

### 2.2 Success Metrics Definition
```
Define BEFORE designing:

Primary metric: [The one number that matters most]
  - Current: [X]
  - Target: [Y]
  - Measurement method: [How to track]

Secondary metrics:
  - [Metric 2]: [Current] → [Target]
  - [Metric 3]: [Current] → [Target]

Guardrail metrics (must not worsen):
  - [Metric]: [Minimum acceptable value]
```

### 2.3 User Personas
```
PERSONA: [Name]
Role: [Job title / user type]
Goals: [What they want to achieve]
Frustrations: [Current pain points]
Tech comfort: [Low/Medium/High]
Usage frequency: [Daily/Weekly/Monthly]
Key scenario: [Most common use case]
```

---

## Phase 3: Ideation & Design (UX Agent + UI Agent)

### 3.1 Information Architecture
```
For navigation/structure problems:

Current IA:
└── Home
    ├── Products
    │   ├── Category A
    │   └── Category B
    └── Account

Proposed IA:
└── Home
    ├── [Reorganized structure]
    └── [Based on user mental models]

Validation: Card sorting results confirm [X]% of users 
expect [item] under [category]
```

### 3.2 User Flow Design
```
FLOW: [Flow name]
Entry point: [Where user starts]
Exit point: [Where user ends / success state]

Happy path:
1. User sees [X] → clicks [Y]
2. System shows [Z]
3. User inputs [A]
4. System confirms [B]
5. User reaches goal ✓

Error paths:
- If [condition]: show [error message] → offer [recovery action]
- If [timeout]: [what happens]

Edge cases:
- Empty state: [what user sees]
- First-time user: [onboarding treatment]
- Returning user: [shortcut/memory]
```

### 3.3 Wireframe Specifications
```
For each screen/state, document:

SCREEN: [Name]
Purpose: [What user accomplishes here]
Primary action: [The one thing we want user to do]
Secondary actions: [Supporting actions]
Content hierarchy: [Order of importance]
Empty state: [What shows when no data]
Loading state: [What shows while loading]
Error state: [What shows on failure]
```

### 3.4 Microcopy Guidelines
```
Principles:
- Be specific, not generic ("Save changes" not "Submit")
- Use active voice ("Create account" not "Account creation")
- Match user's vocabulary (not technical jargon)
- Set expectations ("This takes about 2 minutes")
- Acknowledge errors with empathy ("Something went wrong. Try again?")

Error message formula:
[What happened] + [Why] + [What to do]
Example: "Your session expired. Please sign in again to continue."

CTA copy formula:
[Verb] + [Object] + [Optional: benefit]
Example: "Start free trial" / "Download report" / "Get instant access"

Empty state formula:
[What's missing] + [Why it's empty] + [How to fill it]
Example: "No projects yet. Create your first project to get started."
```

---

## Phase 4: Prototyping & Validation (UX Agent)

### 4.1 Prototype Fidelity by Stage
```
Stage 1 - Paper/Sketch: Test basic flow logic
Stage 2 - Lo-fi wireframe: Test information architecture
Stage 3 - Hi-fi prototype: Test visual design + interactions
Stage 4 - Coded prototype: Test real performance + edge cases
```

### 4.2 Usability Test Protocol
```
Test setup:
- Participants: 5-8 users (matching target persona)
- Method: Think-aloud protocol
- Duration: 45-60 minutes per session
- Tools: Maze, UserTesting, or moderated Zoom session

Tasks to test:
1. [Task 1]: "Please [action]. Think aloud as you go."
   Success criteria: [What counts as success]
   
2. [Task 2]: ...

Metrics to capture:
- Task completion rate
- Time on task
- Error rate
- Satisfaction rating (1-7 scale)
- Qualitative observations
```

### 4.3 Iteration Criteria
```
Proceed to implementation when:
- [ ] Task completion rate >= 80%
- [ ] No critical usability issues (severity 1)
- [ ] No more than 2 major issues (severity 2)
- [ ] Stakeholder sign-off received
```

---

## Phase 5: Implementation Guidance (Coder)

### 5.1 UX Patterns Implementation

**Progressive Disclosure:**
```jsx
// Show complexity only when needed
const AdvancedOptions = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  return (
    <div>
      <BasicOptions />
      <button 
        onClick={() => setShowAdvanced(!showAdvanced)}
        aria-expanded={showAdvanced}
      >
        {showAdvanced ? 'Hide' : 'Show'} advanced options
      </button>
      {showAdvanced && <AdvancedOptionsPanel />}
    </div>
  );
};
```

**Inline Validation:**
```jsx
// Validate on blur, not on every keystroke
const EmailInput = () => {
  const [error, setError] = useState('');
  
  const handleBlur = (e) => {
    if (!isValidEmail(e.target.value)) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  };
  
  return (
    <div>
      <input 
        type="email"
        onBlur={handleBlur}
        aria-describedby={error ? 'email-error' : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <span id="email-error" role="alert">{error}</span>
      )}
    </div>
  );
};
```

**Optimistic UI:**
```jsx
// Update UI immediately, sync in background
const toggleLike = async (postId) => {
  // Optimistic update
  setLiked(prev => !prev);
  setLikeCount(prev => liked ? prev - 1 : prev + 1);
  
  try {
    await api.toggleLike(postId);
  } catch (error) {
    // Revert on failure
    setLiked(prev => !prev);
    setLikeCount(prev => liked ? prev + 1 : prev - 1);
    showToast('Failed to update. Please try again.');
  }
};
```

**Skeleton Loading:**
```jsx
// Show structure while loading (better than spinner)
const UserCard = ({ userId }) => {
  const { data, isLoading } = useUser(userId);
  
  if (isLoading) return <UserCardSkeleton />;
  return <UserCardContent user={data} />;
};

const UserCardSkeleton = () => (
  <div className="skeleton-card" aria-busy="true" aria-label="Loading user">
    <div className="skeleton-avatar" />
    <div className="skeleton-text skeleton-text--wide" />
    <div className="skeleton-text skeleton-text--narrow" />
  </div>
);
```

**Toast Notifications:**
```jsx
// Non-blocking feedback for actions
const useToast = () => {
  const show = ({ message, type = 'info', duration = 4000 }) => {
    // type: 'success' | 'error' | 'warning' | 'info'
    toast[type](message, {
      duration,
      position: 'bottom-right',
      // Accessible: announced to screen readers
      ariaProps: { role: 'status', 'aria-live': 'polite' }
    });
  };
  return { show };
};
```

### 5.2 Onboarding Patterns
```jsx
// Progressive onboarding - teach by doing
const OnboardingChecklist = ({ steps, completedSteps }) => (
  <div role="list" aria-label="Getting started checklist">
    {steps.map(step => (
      <div 
        key={step.id}
        role="listitem"
        className={completedSteps.includes(step.id) ? 'completed' : ''}
      >
        <CheckIcon aria-hidden="true" />
        <span>{step.label}</span>
        {!completedSteps.includes(step.id) && (
          <a href={step.actionUrl}>{step.actionLabel}</a>
        )}
      </div>
    ))}
  </div>
);
```

---

## Phase 6: QA & Validation (QA Manual Agent)

### 6.1 UX QA Checklist
```
Flow Integrity:
- [ ] All happy paths work end-to-end
- [ ] All error states display correctly
- [ ] All empty states display correctly
- [ ] Loading states appear and disappear correctly
- [ ] Back button behavior is correct
- [ ] Deep links work correctly

Microcopy:
- [ ] All error messages are helpful and specific
- [ ] All CTA labels are clear and action-oriented
- [ ] No placeholder text left in production
- [ ] No lorem ipsum text
- [ ] Consistent terminology throughout

Feedback & Response:
- [ ] Every user action has visible feedback
- [ ] Loading indicators for operations > 300ms
- [ ] Success confirmations for important actions
- [ ] Undo available for destructive actions
```

### 6.2 Post-Launch Measurement
```
Week 1: Monitor primary metric daily
Week 2-4: Compare to baseline
Month 2: Full analysis vs success criteria

Report template:
- Metric: [Name]
- Baseline: [Before]
- Current: [After]
- Change: [+/- %]
- Status: [Hit target / Miss / Ongoing]
```

---

## Quick Reference: UX Principles

| Principle | Application |
|-----------|-------------|
| Fitts's Law | Make important targets large and close |
| Hick's Law | Reduce choices to reduce decision time |
| Miller's Law | Chunk information into groups of 7±2 |
| Jakob's Law | Follow platform conventions users already know |
| Peak-End Rule | Make the peak moment and ending memorable |
| Doherty Threshold | Response time < 400ms feels instant |
| Progressive Disclosure | Show only what's needed, when needed |
| Recognition > Recall | Show options, don't make users remember |
