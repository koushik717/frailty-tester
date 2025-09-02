/**
 * Calculate SF-36 domain scores - EXACT from source
 * @param {Array} responses - Array of response objects with itemId and value
 * @returns {Object} - Domain scores on 0-100 scale
 */
export function scoreSF36(responses) {
  if (!responses || responses.length !== 36) {
    throw new Error('SF-36 requires exactly 36 responses');
  }

  // 7) Optional safeguard in scoring: Before scoring, assert that the final payload ids are 1..36 (no gaps/dupes).
  const responseIds = responses.map(r => r.itemId).sort((a, b) => a - b);
  const expectedIds = Array.from({length: 36}, (_, i) => i + 1);
  
  if (JSON.stringify(responseIds) !== JSON.stringify(expectedIds)) {
    throw new Error("SF-36 response order invalid; expected 1..36 unique ids");
  }

  // Create a map of responses by question ID
  const responseMap = {};
  responses.forEach(response => {
    responseMap[response.itemId] = response.value;
  });

  // EXACT domain calculations from source
  let physical_functioning = 0;
  let limitation_physical = 0;
  let limitation_emotional = 0;
  let energy = 0;
  let emotional_wellbeing = 0;
  let social_functioning = 0;
  let pain = 0;
  let general_health = 0;

  // Physical Functioning (PF) - 10 items
  if (responseMap[3]) physical_functioning += getScoreFromCode(responseMap[3]);
  if (responseMap[4]) physical_functioning += getScoreFromCode(responseMap[4]);
  if (responseMap[5]) physical_functioning += getScoreFromCode(responseMap[5]);
  if (responseMap[6]) physical_functioning += getScoreFromCode(responseMap[6]);
  if (responseMap[7]) physical_functioning += getScoreFromCode(responseMap[7]);
  if (responseMap[8]) physical_functioning += getScoreFromCode(responseMap[8]);
  if (responseMap[9]) physical_functioning += getScoreFromCode(responseMap[9]);
  if (responseMap[10]) physical_functioning += getScoreFromCode(responseMap[10]);
  if (responseMap[11]) physical_functioning += getScoreFromCode(responseMap[11]);
  if (responseMap[12]) physical_functioning += getScoreFromCode(responseMap[12]);

  // Role Physical (RP) - 4 items
  if (responseMap[13]) limitation_physical += getScoreFromCode(responseMap[13]);
  if (responseMap[14]) limitation_physical += getScoreFromCode(responseMap[14]);
  if (responseMap[15]) limitation_physical += getScoreFromCode(responseMap[15]);
  if (responseMap[16]) limitation_physical += getScoreFromCode(responseMap[16]);

  // Role Emotional (RE) - 3 items
  if (responseMap[17]) limitation_emotional += getScoreFromCode(responseMap[17]);
  if (responseMap[18]) limitation_emotional += getScoreFromCode(responseMap[18]);
  if (responseMap[19]) limitation_emotional += getScoreFromCode(responseMap[19]);

  // Energy/Vitality (VT) - 4 items
  if (responseMap[23]) energy += getScoreFromCode(responseMap[23]);
  if (responseMap[27]) energy += getScoreFromCode(responseMap[27]);
  if (responseMap[29]) energy += getScoreFromCode(responseMap[29]);
  if (responseMap[31]) energy += getScoreFromCode(responseMap[31]);

  // Emotional Wellbeing (MH) - 5 items
  if (responseMap[24]) emotional_wellbeing += getScoreFromCode(responseMap[24]);
  if (responseMap[25]) emotional_wellbeing += getScoreFromCode(responseMap[25]);
  if (responseMap[26]) emotional_wellbeing += getScoreFromCode(responseMap[26]);
  if (responseMap[28]) emotional_wellbeing += getScoreFromCode(responseMap[28]);
  if (responseMap[30]) emotional_wellbeing += getScoreFromCode(responseMap[30]);

  // Social Functioning (SF) - 2 items (including q20 which is also in GH)
  if (responseMap[20]) social_functioning += getScoreFromCode(responseMap[20]);
  if (responseMap[32]) social_functioning += getScoreFromCode(responseMap[32]);

  // Pain (BP) - 2 items (including q22 which is also in GH)
  if (responseMap[21]) pain += getScoreFromCode(responseMap[21]);
  if (responseMap[22]) pain += getScoreFromCode(responseMap[22]);

  // General Health (GH) - 6 items (including q20 and q22 which are also in other domains)
  if (responseMap[1]) general_health += getScoreFromCode(responseMap[1]);
  if (responseMap[2]) general_health += getScoreFromCode(responseMap[2]);
  if (responseMap[20]) general_health += getScoreFromCode(responseMap[20]); // Also in SF
  if (responseMap[22]) general_health += getScoreFromCode(responseMap[22]); // Also in BP
  if (responseMap[33]) general_health += getScoreFromCode(responseMap[33]);
  if (responseMap[34]) general_health += getScoreFromCode(responseMap[34]);
  if (responseMap[35]) general_health += getScoreFromCode(responseMap[35]);
  if (responseMap[36]) general_health += getScoreFromCode(responseMap[36]);

  // Calculate domain scores using EXACT logic from source
  const domainScores = {
    PF: Math.round(physical_functioning / 10),           // 10 items
    RP: Math.round(limitation_physical / 4),             // 4 items
    RE: Math.round(limitation_emotional / 3),            // 3 items
    VT: Math.round(energy / 4),                          // 4 items
    MH: Math.round(emotional_wellbeing / 5),             // 5 items
    SF: Math.round(social_functioning / 2),              // 2 items
    BP: Math.round(pain / 2),                            // 2 items
    GH: Math.round(general_health / 6)                   // 6 items (corrected from source)
  };

  // Calculate overall score (average of all domains)
  const overall_score = Math.round(
    (physical_functioning + limitation_physical + limitation_emotional + 
     energy + emotional_wellbeing + social_functioning + pain + general_health) / 36
  );

  return {
    ...domainScores,
    overall: overall_score,
    rawScores: {
      physical_functioning,
      limitation_physical,
      limitation_emotional,
      energy,
      emotional_wellbeing,
      social_functioning,
      pain,
      general_health
    }
  };
}

/**
 * Get score from code - EXACT mapping from source
 * @param {string} code - The response code (e.g., "code11", "code21")
 * @returns {number} - The score value
 */
function getScoreFromCode(code) {
  const dict = {
    code11: 100,
    code12: 75,
    code13: 50,
    code14: 25,
    code15: 0,
    code21: 0,
    code22: 50,
    code23: 100,
    code31: 0,
    code32: 100,
    code41: 100,
    code42: 80,
    code43: 60,
    code44: 40,
    code45: 20,
    code46: 0,
    code51: 0,
    code52: 20,
    code53: 40,
    code54: 60,
    code55: 80,
    code56: 100,
    code61: 0,
    code62: 25,
    code63: 50,
    code64: 75,
    code65: 100
  };

  return dict[code] || 0;
}

/**
 * Get domain information
 * @param {string} domain - The domain code
 * @returns {Object} - Domain details
 */
export function getDomainInfo(domain) {
  const domains = {
    PF: { name: 'Physical Functioning', description: 'Ability to perform physical activities' },
    RP: { name: 'Role Physical', description: 'Limitations in work or daily activities due to physical health' },
    BP: { name: 'Bodily Pain', description: 'Pain and its interference with work' },
    GH: { name: 'General Health', description: 'Overall health perception' },
    VT: { name: 'Vitality', description: 'Energy and fatigue levels' },
    SF: { name: 'Social Functioning', description: 'Impact of health on social activities' },
    RE: { name: 'Role Emotional', description: 'Limitations in work or daily activities due to emotional problems' },
    MH: { name: 'Mental Health', description: 'Psychological distress and well-being' }
  };

  return domains[domain] || { name: 'Unknown', description: 'Unknown domain' };
}

/**
 * Get score interpretation
 * @param {number} score - Domain score (0-100)
 * @returns {string} - Interpretation text
 */
export function getScoreInterpretation(score) {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  if (score >= 20) return 'Poor';
  return 'Very Poor';
}

/**
 * TODO: Future implementation of PCS/MCS calculation
 * Physical Component Summary (PCS) and Mental Component Summary (MCS)
 * These require norm-based scoring and factor analysis
 */
export function calculatePCSMCS(domainScores) {
  // TODO: Implement PCS/MCS calculation using norm-based scoring
  // This requires population norms and factor analysis
  console.log('PCS/MCS calculation not yet implemented - requires norm-based scoring');
  return { PCS: null, MCS: null };
}
