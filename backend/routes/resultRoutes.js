const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const resultsPath = path.join(__dirname, '../data/results.json');

// Helper: read file and normalize to { testResults: [] }
const getResultsFile = async () => {
  try {
    const data = await fs.readFile(resultsPath, 'utf8');
    const parsed = data ? JSON.parse(data) : {};

    // Old format: plain array
    if (Array.isArray(parsed)) {
      return { testResults: parsed };
    }

    if (!parsed.testResults || !Array.isArray(parsed.testResults)) {
      parsed.testResults = [];
    }

    return parsed;
  } catch (err) {
    // First run: file may not exist yet
    if (err.code === 'ENOENT') {
      return { testResults: [] };
    }
    throw err;
  }
};

// ============== GET /api/frailty-tests/results ==============
router.get('/results', async (req, res) => {
  try {
    const resultsFile = await getResultsFile();
    let results = resultsFile.testResults;

    // Filter by user if logged in
    const currentUser = req.user || req.session.user;

    if (currentUser && currentUser.id) {
      results = results.filter(r => r.userId === currentUser.id);
    } else {
      // If not logged in, maybe return empty or session based?
      // For now return empty to avoid seeing others' data
      results = [];
    }

    console.log('[DEBUG-GET] req.session:', req.session);
    console.log('[DEBUG-GET] req.user:', req.user);
    console.log(`[DEBUG-GET] Returning ${results.length} results for user.`);

    res.json(results);
  } catch (error) {
    console.error('Error reading results:', error);
    res.status(500).json({ error: 'Error fetching results' });
  }
});

// ========= helper to build a normalized result object =========
const buildResultFromBody = (body, req) => {
  const {
    testName,
    testKey,
    // generic scores
    overallScore,
    totalScore,
    domainScores,

    // balance-style fields (for backwards compat)
    userAge,
    attempts,
    averageBalanceTime,

    // common meta
    assessment = {},
    startedAt,
    endedAt,
    test, // sometimes sent as "pss10" or "sf36"
  } = body;

  // category can come from assessment or directly on body
  const category =
    assessment.category ||
    body.category ||
    null;

  // Try to infer a test name if not provided
  let finalTestName = testName;
  if (!finalTestName) {
    if (test === 'pss10') {
      finalTestName = 'PSS-10 Stress Test';
    } else if (test === 'sf36') {
      finalTestName = 'SF-36 Health Survey';
    } else if (attempts && Array.isArray(attempts)) {
      finalTestName = 'Single-Leg Balance Test';
    } else {
      finalTestName = 'Untitled Test';
    }
  }

  return {
    timestamp: new Date().toISOString(),

    // identification
    testName: finalTestName,
    testKey: testKey || test || null,

    // scores
    overallScore: overallScore ?? totalScore ?? null,
    domainScores: domainScores || null,

    // balance-specific info (kept for old data)
    userAge,
    attempts,
    averageBalanceTime,

    // timing
    startedAt: startedAt || null,
    endedAt: endedAt || null,

    // assessment block (kept flexible)
    assessment: {
      category,
      ageGroup: assessment.ageGroup || '',
      expectedRange: assessment.expectedRange || '',
      recommendedExercises: assessment.recommendedExercises || [],
    },
    userId: (req.user && req.user.id) || (req.session.user && req.session.user.id) || null,
  };
};

// ============== POST /api/frailty-tests/results ==============
router.post('/results', async (req, res) => {
  try {
    const resultsFile = await getResultsFile();

    console.log('[DEBUG-POST] req.session:', req.session);
    console.log('[DEBUG-POST] req.user:', req.user);
    console.log('[DEBUG-POST] req.body:', JSON.stringify(req.body, null, 2));

    const newResult = buildResultFromBody(req.body, req);

    resultsFile.testResults.push(newResult);
    await fs.writeFile(resultsPath, JSON.stringify(resultsFile, null, 2));

    res.status(201).json(newResult);
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ error: 'Error saving result' });
  }
});

// ============== PUT /api/frailty-tests/results/:resultId ==============
router.put('/results/:resultId', async (req, res) => {
  try {
    const resultId = Number(req.params.resultId);
    const resultsFile = await getResultsFile();

    if (!resultsFile.testResults[resultId]) {
      return res.status(404).json({ error: 'Result not found' });
    }

    // merge existing + new data
    const updated = {
      ...resultsFile.testResults[resultId],
      ...buildResultFromBody({ ...resultsFile.testResults[resultId], ...req.body }, req),
    };

    resultsFile.testResults[resultId] = updated;
    await fs.writeFile(resultsPath, JSON.stringify(resultsFile, null, 2));

    res.json({ success: true, result: updated });
  } catch (error) {
    console.error('Error updating result:', error);
    res.status(500).json({ error: 'Error updating result' });
  }
});

// ============== DELETE /api/frailty-tests/results/:resultId ==============
router.delete('/results/:resultId', async (req, res) => {
  try {
    const resultId = Number(req.params.resultId);
    const resultsFile = await getResultsFile();

    if (!resultsFile.testResults[resultId]) {
      return res.status(404).json({ error: 'Result not found' });
    }

    resultsFile.testResults.splice(resultId, 1);
    await fs.writeFile(resultsPath, JSON.stringify(resultsFile, null, 2));

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting result:', error);
    res.status(500).json({ error: 'Error deleting result' });
  }
});

module.exports = router;
