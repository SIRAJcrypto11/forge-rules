# FORGE SKILL: INTELLIGENT ROUTER
**Skill Name:** forge-router  
**Version:** 3.0.0  
**Type:** Master Router  
**Kiro Compatible:** Yes

---

## SKILL DESCRIPTION

The Intelligent Router is the entry point for all Forge Rules interactions. It analyzes user requests, classifies intent, and routes to the appropriate specialized agent with the right workflow.

**Use this skill when:**
- Starting any new task
- Unsure which agent to use
- Need guidance on workflow
- Want automatic agent selection

---

## ACTIVATION

### Method 1: Kiro Context Menu
```
Right-click in editor → Kiro → Activate Skill → forge-router
```

### Method 2: Kiro Command
```
#forge-router [your request]
```

### Method 3: Chat
```
User: "I want to [describe task]"
Kiro: [Automatically activates forge-router]
```

---

## CAPABILITIES

This skill can:
- ✅ Classify 20 different intent types
- ✅ Route to 16 specialized agents
- ✅ Provide 20+ situational workflows
- ✅ Handle ambiguous requests
- ✅ Sequence multiple intents
- ✅ Estimate time and complexity
- ✅ Provide clear next steps

---

## USAGE EXAMPLES

### Example 1: Bug Fix
```
User: "The login button doesn't work"
Router: 
  Intent: BUG_FIX
  Agent: Coder → Tester → Reviewer
  Workflow: workflows/situational/01-bug-fix.workflow.md
  Time: 2-4 hours
```

### Example 2: UI Improvement
```
User: "Make the dashboard look modern"
Router:
  Intent: UI_IMPROVEMENT
  Agent: UI → Coder → A11y → Performance
  Workflow: workflows/situational/02-ui-improvement.workflow.md
  Time: 2-4 weeks
```

### Example 3: Performance Issue
```
User: "The app is slow"
Router:
  Intent: PERFORMANCE_OPTIMIZATION
  Agent: Performance → Coder → Reviewer
  Workflow: workflows/situational/04-performance-optimization.workflow.md
  Time: 1-2 days
```

---

## INTENT CATEGORIES

The router can classify these 20 intents:

1. **BUG_FIX** - Fix broken functionality
2. **UI_IMPROVEMENT** - Improve visual design
3. **UX_IMPROVEMENT** - Optimize user experience
4. **PERFORMANCE_OPTIMIZATION** - Improve speed
5. **SECURITY_FIX** - Fix vulnerabilities
6. **ACCESSIBILITY_FIX** - Improve accessibility
7. **REFACTORING** - Improve code quality
8. **TESTING** - Add/improve tests
9. **CODE_REVIEW** - Review code changes
10. **DEBUGGING** - Investigate issues
11. **ARCHITECTURE_AUDIT** - Review system design
12. **API_DESIGN** - Design/implement APIs
13. **DATABASE_OPTIMIZATION** - Optimize queries
14. **DEPLOYMENT** - Setup CI/CD
15. **MOBILE_OPTIMIZATION** - Optimize for mobile
16. **INTERNATIONALIZATION** - Add multi-language
17. **DATA_VISUALIZATION** - Create charts
18. **NEW_PROJECT** - Start from scratch
19. **NEW_FEATURE** - Add new functionality
20. **UNKNOWN** - Need clarification

---

## CONFIGURATION

No configuration needed. The router uses:
- `config/routing-table.json` - Intent mappings
- `utils/intent-classifier.js` - Classification logic
- `agents/router.md` - Router protocol

---

## INTEGRATION WITH OTHER SKILLS

The router works with all 16 Forge agent skills:

```
forge-router → forge-ceo
            → forge-architect
            → forge-planner
            → forge-coder
            → forge-ui
            → forge-ux
            → forge-reviewer
            → forge-security
            → forge-tester
            → forge-qa
            → forge-performance
            → forge-a11y
            → forge-browser
            → forge-backend
            → forge-devops
            → forge-retro
```

---

## TROUBLESHOOTING

### Issue: Router can't classify intent
**Solution:** Be more specific. Use patterns like:
- "Fix [specific bug]"
- "Improve [specific aspect]"
- "Add [specific feature]"

### Issue: Multiple intents detected
**Solution:** Router will suggest optimal sequence. Follow the recommendation.

### Issue: Wrong agent suggested
**Solution:** Provide more context about what you want to achieve.

---

## SKILL METADATA

```json
{
  "name": "forge-router",
  "version": "3.0.0",
  "type": "master-router",
  "intents_supported": 20,
  "agents_connected": 16,
  "workflows_available": 20,
  "confidence_threshold": 0.5,
  "multi_intent_support": true,
  "ambiguity_handling": true
}
```

---

## RELATED SKILLS

- **forge-ceo** - Product strategy
- **forge-architect** - System design
- **forge-planner** - Sprint planning
- **forge-coder** - Implementation
- **All other Forge agents** - Specialized tasks

---

## CHANGELOG

### v3.0.0 (2026-05-21)
- Initial release
- 20 intent categories
- 16 agent integrations
- 20+ workflow mappings
- Multi-intent sequencing
- Ambiguity handling

---

**Author:** Siraj Nur Ihrom  
**Repository:** https://github.com/SIRAJcrypto11/forge-rules  
**License:** MIT
