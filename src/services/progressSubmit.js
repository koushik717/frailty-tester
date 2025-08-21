/**
 * Progress Test Submission Service
 * 
 * TODO: Backend Integration
 * - Endpoint: POST /api/progress/submit-test-result
 * - Payload: { testId, score, payload, timestamp, userId }
 * - Replace localStorage.setItem with axios.post call
 * - Add error handling and retry logic
 * - Add authentication headers
 */

/**
 * Submit progress test result
 * @param {Object} params
 * @param {string} params.testId - Unique identifier for the test (e.g., 'pitt', 'stress', 'digit')
 * @param {number} params.score - Numeric score from the test
 * @param {Object} params.payload - Additional test data (components, responses, etc.)
 * @returns {Object} - Success status and stored data
 */
export const submitProgress = ({ testId, score, payload }) => {
  try {
    // Generate date key for today (YYYY-MM-DD format)
    const today = new Date().toISOString().split('T')[0];
    const storageKey = `progress:${testId}:${today}`;
    
    // Prepare data to store
    const testData = {
      testId,
      score,
      payload,
      timestamp: new Date().toISOString(),
      date: today
    };
    
    // Store in localStorage
    localStorage.setItem(storageKey, JSON.stringify(testData));
    
    // Also store in a general progress history
    const historyKey = `progress:${testId}:history`;
    const existingHistory = localStorage.getItem(historyKey);
    const history = existingHistory ? JSON.parse(existingHistory) : [];
    history.push(testData);
    
    // Keep only last 30 entries to prevent localStorage bloat
    if (history.length > 30) {
      history.splice(0, history.length - 30);
    }
    
    localStorage.setItem(historyKey, JSON.stringify(history));
    
    return {
      success: true,
      data: testData,
      message: `Progress for ${testId} saved successfully`
    };
  } catch (error) {
    console.error('Error submitting progress:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to save progress'
    };
  }
};

/**
 * Get progress result for a specific test and date
 * @param {string} testId - Test identifier
 * @param {string} date - Date in YYYY-MM-DD format (defaults to today)
 * @returns {Object|null} - Stored test data or null if not found
 */
export const getProgress = (testId, date = null) => {
  try {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const storageKey = `progress:${testId}:${targetDate}`;
    const stored = localStorage.getItem(storageKey);
    
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error retrieving progress:', error);
    return null;
  }
};

/**
 * Get progress history for a specific test
 * @param {string} testId - Test identifier
 * @returns {Array} - Array of test results (max 30 entries)
 */
export const getProgressHistory = (testId) => {
  try {
    const historyKey = `progress:${testId}:history`;
    const stored = localStorage.getItem(historyKey);
    
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error retrieving progress history:', error);
    return [];
  }
};

/**
 * Check if test was already completed today
 * @param {string} testId - Test identifier
 * @returns {boolean} - True if test was completed today
 */
export const isCompletedToday = (testId) => {
  const today = new Date().toISOString().split('T')[0];
  const storageKey = `progress:${testId}:${today}`;
  return localStorage.getItem(storageKey) !== null;
};

