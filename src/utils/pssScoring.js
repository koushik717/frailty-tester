/**
 * Calculate PSS-10 score from responses - EXACT from source
 * @param {Array} responses - Array of response objects with itemId and value
 * @returns {Object} - { total, category }
 */
export function scorePSS(responses) {
  if (!responses || responses.length !== 10) {
    throw new Error('PSS requires exactly 10 responses');
  }

  let total = 0;
  
  // EXACT scoring from source - no reverse scoring, direct values
  responses.forEach(response => {
    total += response.value;
  });

  // Source doesn't define categories, so we'll use standard cutoffs
  let category;
  if (total <= 13) {
    category = 'low';
  } else if (total <= 26) {
    category = 'moderate';
  } else {
    category = 'high';
  }

  return {
    total,
    category,
    maxScore: 40
  };
}

/**
 * Get category description
 * @param {string} category - The stress category
 * @returns {string} - Human-readable description
 */
export function getCategoryDescription(category) {
  const descriptions = {
    low: 'Low perceived stress',
    moderate: 'Moderate perceived stress',
    high: 'High perceived stress'
  };
  
  return descriptions[category] || 'Unknown category';
}

/**
 * Get category color for UI
 * @param {string} category - The stress category
 * @returns {string} - Tailwind color class
 */
export function getCategoryColor(category) {
  const colors = {
    low: 'text-green-600 bg-green-50 border-green-200',
    moderate: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    high: 'text-red-600 bg-red-50 border-red-200'
  };
  
  return colors[category] || 'text-gray-600 bg-gray-50 border-gray-200';
}
