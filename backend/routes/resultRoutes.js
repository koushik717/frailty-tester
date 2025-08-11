const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const resultsPath = path.join(__dirname, '../data/results.json');

// Helper function to read results file
const getResults = async () => {
  const data = await fs.readFile(resultsPath, 'utf8');
  return JSON.parse(data);
};

// Get all results
router.get('/results', async (req, res) => {
  try {
    const results = await getResults();
    res.json(results);
  } catch (error) {
    console.error('Error reading results:', error);
    res.status(500).json({ error: 'Error fetching results' });
  }
});

// Save new result
router.post('/results', async (req, res) => {
  try {
    const { userAge, attempts, averageBalanceTime, assessment } = req.body;
    const results = await getResults();
    
    const newResult = {
      timestamp: new Date().toISOString(),
      userAge,
      attempts,
      averageBalanceTime,
      assessment: {
        category: assessment.category,
        ageGroup: assessment.ageGroup,
        expectedRange: assessment.expectedRange || "",
        recommendedExercises: assessment.recommendedExercises || []
      }
    };

    results.testResults.push(newResult);
    await fs.writeFile(resultsPath, JSON.stringify(results, null, 2));
    
    res.status(201).json(newResult);
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ error: 'Error saving result' });
  }
});

// Update result
router.put('/results/:resultId', async (req, res) => {
  try {
    const { userAge, attempts, averageBalanceTime, assessment } = req.body;
    const results = await getResults();
    
    if (!results.testResults[req.params.resultId]) {
      return res.status(404).json({ error: 'Result not found' });
    }

    const updatedResult = {
      ...results.testResults[req.params.resultId],
      userAge,
      attempts,
      averageBalanceTime,
      assessment: {
        category: assessment.category,
        ageGroup: assessment.ageGroup,
        expectedRange: assessment.expectedRange || "",
        recommendedExercises: assessment.recommendedExercises || []
      }
    };

    results.testResults[req.params.resultId] = updatedResult;
    await fs.writeFile(resultsPath, JSON.stringify(results, null, 2));
    res.json({ success: true, result: updatedResult });
  } catch (error) {
    console.error('Error updating result:', error);
    res.status(500).json({ error: 'Error updating result' });
  }
});

// Delete result
router.delete('/results/:resultId', async (req, res) => {
  try {
    const results = await getResults();
    
    if (!results.testResults[req.params.resultId]) {
      return res.status(404).json({ error: 'Result not found' });
    }

    results.testResults.splice(req.params.resultId, 1);
    await fs.writeFile(resultsPath, JSON.stringify(results, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting result:', error);
    res.status(500).json({ error: 'Error deleting result' });
  }
});

module.exports = router;