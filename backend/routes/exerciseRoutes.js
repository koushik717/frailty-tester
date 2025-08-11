const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const exercisesPath = path.join(__dirname, '../data/exercises.json');

// Get exercises by category and age group
router.get('/exercises/:ageGroup/:category', async (req, res) => {
  try {
    const { ageGroup, category } = req.params;
    const data = await fs.readFile(exercisesPath, 'utf8');
    const exercises = JSON.parse(data);
    
    const categoryExercises = exercises.exercises[ageGroup]?.[category];
    
    if (categoryExercises) {
      res.json(categoryExercises);
    } else {
      res.status(404).json({ error: 'No exercises found for this combination' });
    }
  } catch (error) {
    console.error('Error reading exercises:', error);
    res.status(500).json({ error: 'Error fetching exercises' });
  }
});

module.exports = router;