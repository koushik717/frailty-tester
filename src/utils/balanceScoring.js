/**
 * Balance test norms by age group
 */
const normsTable = [
  { minAge: 20, maxAge: 40, minTime: 30, maxTime: 40, ageGroup: "20-40" },
  { minAge: 40, maxAge: 50, minTime: 25, maxTime: 35, ageGroup: "40-50" },
  { minAge: 50, maxAge: 60, minTime: 20, maxTime: 30, ageGroup: "50-60" },
  { minAge: 60, maxAge: 99, minTime: 15, maxTime: 25, ageGroup: "60-70" }
];

/**
 * Find applicable norm for given age
 * @param {number} age - User's age
 * @returns {Object|null} Matching norm or null if not found
 */
const findAgeNorm = (age) => {
  return normsTable.find(norm => age >= norm.minAge && age < norm.maxAge) || null;
};

/**
 * Evaluate performance category based on time and norm
 * @param {number} averageTime - User's average balance time
 * @param {Object} norm - Age-appropriate norm
 * @returns {string} Performance category
 */
const evaluatePerformance = (averageTime, norm) => {
  if (averageTime < norm.minTime) {
    return "Below Average";
  } else if (averageTime <= norm.maxTime) {
    return "Average";
  }
  return "Above Average";
};

/**
 * Assess balance test results
 * @param {number} age - User's age
 * @param {number} averageBalance - Average balance time
 * @returns {Object} Assessment result
 */
export const assessBalance = (age, averageBalance) => {
  const norm = findAgeNorm(age);
  
  if (!norm) {
    return {
      isValid: false,
      message: "Age out of expected range"
    };
  }

  const category = evaluatePerformance(averageBalance, norm);
  
  return {
    isValid: true,
    category,
    ageGroup: norm.ageGroup,
    expectedRange: `${norm.minTime}-${norm.maxTime} seconds`
  };
};

/**
 * Compute balance score from trial results
 * @param {Array} trials - Array of trial results with duration and foot
 * @returns {Object} Computed score and assessment
 */
export const computeBalanceScore = (trials) => {
  if (!trials || trials.length === 0) {
    return {
      totalScore: 0,
      averageTime: 0,
      bestTime: 0,
      totalTrials: 0,
      assessment: null
    };
  }

  const validTrials = trials.filter(trial => trial.duration > 0);
  const totalTrials = validTrials.length;
  
  if (totalTrials === 0) {
    return {
      totalScore: 0,
      averageTime: 0,
      bestTime: 0,
      totalTrials: 0,
      assessment: null
    };
  }

  const totalTime = validTrials.reduce((sum, trial) => sum + trial.duration, 0);
  const averageTime = totalTime / totalTrials;
  const bestTime = Math.max(...validTrials.map(trial => trial.duration));

  // Simple scoring: average time in seconds (higher is better for balance)
  const totalScore = Math.round(averageTime * 10) / 10;

  // For now, use a default age of 30 for assessment (can be made configurable)
  const assessment = assessBalance(30, averageTime);

  return {
    totalScore,
    averageTime: Math.round(averageTime * 10) / 10,
    bestTime: Math.round(bestTime * 10) / 10,
    totalTrials,
    assessment
  };
};

