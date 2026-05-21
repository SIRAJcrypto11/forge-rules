/**
 * @file utils/intent-classifier.js
 * @purpose Intent classification for Forge Rules v3.0 Agent Router
 * @description Analyzes user requests and classifies into one of 20 intent categories
 */

import routingTable from '../config/routing-table.json' assert { type: 'json' };

/**
 * Classifies user intent from natural language request
 * 
 * @param {string} userRequest - The user's request in natural language
 * @returns {Object} Classification result with intent, confidence, and routing info
 * 
 * @example
 * classifyIntent("The login button is broken")
 * // Returns: { intent: "BUG_FIX", confidence: 0.89, primary_agent: "coder", ... }
 */
export function classifyIntent(userRequest) {
  if (!userRequest || typeof userRequest !== 'string') {
    throw new Error('Invalid user request: must be a non-empty string');
  }

  const request = userRequest.toLowerCase().trim();
  const scores = {};

  // Calculate score for each intent based on keyword matches
  for (const [intent, config] of Object.entries(routingTable.intents)) {
    scores[intent] = calculateIntentScore(request, config.keywords);
  }

  // Sort intents by score (highest first)
  const sortedIntents = Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .filter(([, score]) => score > 0); // Only include intents with matches

  if (sortedIntents.length === 0) {
    return {
      intent: 'UNKNOWN',
      confidence: 0,
      message: 'Could not classify intent. Please rephrase your request.',
      suggestions: getIntentSuggestions()
    };
  }

  const [primaryIntent, primaryScore] = sortedIntents[0];
  const config = routingTable.intents[primaryIntent];
  const matchedKeywords = extractMatchedKeywords(request, config.keywords);

  // Calculate confidence (0-1 scale)
  const confidence = Math.min(primaryScore, 1.0);

  // Check for multi-intent scenarios
  const secondaryIntents = sortedIntents
    .slice(1, 3)
    .filter(([, score]) => score > 0.3)
    .map(([intent]) => intent);

  return {
    intent: primaryIntent,
    confidence: confidence,
    primary_agent: config.primary_agent,
    secondary_agents: config.secondary_agents,
    tertiary_agents: config.tertiary_agents || [],
    workflow: config.workflow,
    estimated_time: config.estimated_time,
    keywords_matched: matchedKeywords,
    secondary_intents: secondaryIntents,
    description: config.description,
    routing_info: {
      agent_chain: [
        config.primary_agent,
        ...config.secondary_agents
      ],
      workflow_path: config.workflow,
      complexity: determineComplexity(confidence, secondaryIntents.length)
    }
  };
}

/**
 * Calculates intent score based on keyword matches
 * 
 * @param {string} request - User request (lowercase)
 * @param {string[]} keywords - Intent keywords
 * @returns {number} Score between 0 and 1
 */
function calculateIntentScore(request, keywords) {
  let score = 0;
  let matchCount = 0;

  for (const keyword of keywords) {
    if (request.includes(keyword)) {
      matchCount++;
      // Exact word match gets higher score
      const wordBoundaryRegex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (wordBoundaryRegex.test(request)) {
        score += 1.0;
      } else {
        score += 0.5; // Partial match
      }
    }
  }

  // Normalize score
  return matchCount > 0 ? score / keywords.length : 0;
}

/**
 * Extracts keywords that matched in the request
 * 
 * @param {string} request - User request (lowercase)
 * @param {string[]} keywords - Intent keywords
 * @returns {string[]} Matched keywords
 */
function extractMatchedKeywords(request, keywords) {
  return keywords.filter(keyword => request.includes(keyword));
}

/**
 * Determines complexity level based on confidence and secondary intents
 * 
 * @param {number} confidence - Classification confidence
 * @param {number} secondaryCount - Number of secondary intents
 * @returns {string} Complexity level
 */
function determineComplexity(confidence, secondaryCount) {
  if (confidence > 0.8 && secondaryCount === 0) return 'simple';
  if (confidence > 0.6 && secondaryCount <= 1) return 'moderate';
  return 'complex';
}

/**
 * Provides intent suggestions when classification fails
 * 
 * @returns {string[]} Common intent patterns
 */
function getIntentSuggestions() {
  return [
    'Fix [specific bug]',
    'Improve [UI/UX aspect]',
    'Optimize [performance area]',
    'Add [new feature]',
    'Review [code/PR]',
    'Test [functionality]',
    'Deploy [to environment]'
  ];
}

/**
 * Batch classifies multiple requests
 * 
 * @param {string[]} requests - Array of user requests
 * @returns {Object[]} Array of classification results
 */
export function classifyBatch(requests) {
  if (!Array.isArray(requests)) {
    throw new Error('Invalid input: requests must be an array');
  }

  return requests.map(request => {
    try {
      return classifyIntent(request);
    } catch (error) {
      return {
        intent: 'ERROR',
        confidence: 0,
        error: error.message,
        original_request: request
      };
    }
  });
}

/**
 * Gets all available intents with their descriptions
 * 
 * @returns {Object[]} Array of intent information
 */
export function getAvailableIntents() {
  return Object.entries(routingTable.intents).map(([intent, config]) => ({
    intent,
    description: config.description,
    keywords: config.keywords,
    estimated_time: config.estimated_time,
    primary_agent: config.primary_agent
  }));
}

/**
 * Validates if a string matches a specific intent
 * 
 * @param {string} userRequest - User request
 * @param {string} expectedIntent - Expected intent to match
 * @returns {boolean} True if matches expected intent
 */
export function matchesIntent(userRequest, expectedIntent) {
  const result = classifyIntent(userRequest);
  return result.intent === expectedIntent && result.confidence > 0.5;
}

// Export routing table for external use
export { routingTable };
