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