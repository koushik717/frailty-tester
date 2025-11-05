/**
 * Calculate SF-36 domain scores - EXACT from source
 * @param {Array} responses - Array of response objects with itemId and value
 * @returns {Object} - Domain scores on 0-100 scale
 */
export function scoreSF36(responses) {
  // ✅ SAFER VALIDATION
  const validResponses = responses.filter(r => r && r.value != null);
  if (validResponses.length !== 36) {
    throw new Error(`SF-36 requires exactly 36 responses, got ${validResponses.length}`);
  }

  // ✅ Validate IDs (must be 1–36 unique)
  const responseIds = validResponses.map(r => r.itemId).sort((a, b) => a - b);
  const expectedIds = Array.from({ length: 36 }, (_, i) => i + 1);
  if (JSON.stringify(responseIds) !== JSON.stringify(expectedIds)) {
    throw new Error("SF-36 response order invalid; expected 1..36 unique ids");
  }

  // ✅ Build map of responses
  const responseMap = {};
  validResponses.forEach(response => {
    responseMap[response.itemId] = response.value;
  });

  // Domain totals
  let physical_functioning = 0;
  let limitation_physical = 0;
  let limitation_emotional = 0;
  let energy = 0;
  let emotional_wellbeing = 0;
  let social_functioning = 0;
  let pain = 0;
  let general_health = 0;

  // Physical Functioning (PF) - 10 items
  for (let i = 3; i <= 12; i++) {
    if (responseMap[i]) physical_functioning += getScoreFromCode(responseMap[i]);
  }

  // Role Physical (RP) - 4 items
  for (let i = 13; i <= 16; i++) {
    if (responseMap[i]) limitation_physical += getScoreFromCode(responseMap[i]);
  }

  // Role Emotional (RE) - 3 items
  for (let i = 17; i <= 19; i++) {
    if (responseMap[i]) limitation_emotional += getScoreFromCode(responseMap[i]);
  }

  // Energy/Vitality (VT) - 4 items
  [23, 27, 29, 31].forEach(id => {
    if (responseMap[id]) energy += getScoreFromCode(responseMap[id]);
  });

  // Emotional Wellbeing (MH) - 5 items
  [24, 25, 26, 28, 30].forEach(id => {
    if (responseMap[id]) emotional_wellbeing += getScoreFromCode(responseMap[id]);
  });

  // Social Functioning (SF) - 2 items
  [20, 32].forEach(id => {
    if (responseMap[id]) social_functioning += getScoreFromCode(responseMap[id]);
  });

  // Pain (BP) - 2 items
  [21, 22].forEach(id => {
    if (responseMap[id]) pain += getScoreFromCode(responseMap[id]);
  });

  // General Health (GH) - 6 items
  [1, 2, 20, 22, 33, 34, 35, 36].forEach(id => {
    if (responseMap[id]) general_health += getScoreFromCode(responseMap[id]);
  });

  // ✅ Calculate domain scores
  const domainScores = {
    PF: Math.round(physical_functioning / 10),
    RP: Math.round(limitation_physical / 4),
    RE: Math.round(limitation_emotional / 3),
    VT: Math.round(energy / 4),
    MH: Math.round(emotional_wellbeing / 5),
    SF: Math.round(social_functioning / 2),
    BP: Math.round(pain / 2),
    GH: Math.round(general_health / 6)
  };

  // ✅ Overall average score
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
 * Map response code → numeric score
 */
function getScoreFromCode(code) {
  const dict = {
    code11: 100, code12: 75, code13: 50, code14: 25, code15: 0,
    code21: 0,   code22: 50, code23: 100,
    code31: 0,   code32: 100,
    code41: 100, code42: 80, code43: 60, code44: 40, code45: 20, code46: 0,
    code51: 0,   code52: 20, code53: 40, code54: 60, code55: 80, code56: 100,
    code61: 0,   code62: 25, code63: 50, code64: 75, code65: 100
  };
  return dict[code] || 0;
}

/**
 * Domain info
 */
export function getDomainInfo(domain) {
  const domains = {
    PF: { name: 'Physical Functioning', description: 'Ability to perform physical activities' },
    RP: { name: 'Role Physical', description: 'Limitations due to physical health' },
    BP: { name: 'Bodily Pain', description: 'Pain and its interference with work' },
    GH: { name: 'General Health', description: 'Overall health perception' },
    VT: { name: 'Vitality', description: 'Energy and fatigue levels' },
    SF: { name: 'Social Functioning', description: 'Impact on social activities' },
    RE: { name: 'Role Emotional', description: 'Limitations due to emotional problems' },
    MH: { name: 'Mental Health', description: 'Psychological distress and well-being' }
  };
  return domains[domain] || { name: 'Unknown', description: 'Unknown domain' };
}

/**
 * Interpret numeric domain scores
 */
export function getScoreInterpretation(score) {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  if (score >= 20) return 'Poor';
  return 'Very Poor';
}

/**
 * TODO: Future PCS/MCS summary scoring
 */
export function calculatePCSMCS(domainScores) {
  console.log('PCS/MCS calculation not yet implemented - requires norm-based scoring');
  return { PCS: null, MCS: null };
}
