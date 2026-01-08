# Test Modules Documentation

This document explains the technical implementation of the various frailty assessment modules in the application.

## 1. Perceived Stress Scale (PSS-10)
- **Path:** `src/pages/tests/PSSTest.jsx`
- **Logic:**
    - Displays 10 standard questions.
    - User selects from a Likert scale (0-4).
    - **Scoring:** `src/utils/pssScoring.js` reverses scores for positive questions (4, 5, 7, 8) and sums the total.
    - **Result:** Classifies as "Low", "Moderate", or "High" stress.

## 2. SF-36 Health Survey
- **Path:** `src/pages/tests/SF36Test.jsx`
- **Logic:**
    - A comprehensive 36-question survey.
    - **Scoring:** `src/utils/sf36Scoring.js` calculates 8 distinct health domains (Physical Functioning, General Health, etc.).
    - Uses a complex mapping of raw scores to a 0-100 scale.

## 3. Reaction Time Test
- **Path:** `src/pages/tests/SelfReactionTest.jsx`
- **Logic:**
    - Uses a "traffic light" UI metaphor.
    - Measures the delta between the "Green" signal timestamp and the user's click timestamp.
    - Runs 5 trials and calculates the average.
    - **Cheating Prevention:** Detects if a user clicks too early (before green).

## 4. Balance Test (Pose Detection)
- **Path:** `src/pages/tests/BalanceTest.jsx`
- **Tech Stack:** TensorFlow.js + MoveNet (Thunder model).
- **Logic:**
    - Accesses webcam via `react-webcam`.
    - Detects 17 keypoints on the body.
    - **Scoring:** `src/utils/balanceScoring.js` analyzes sway (movement variance of shoulders/hips) over 10-30 seconds.
    - Requires the user to be fully in frame.

## 5. Hosting/Hearing Test
- **Path:** `src/pages/tests/HearingTest.jsx`
- **Implementation:** Integrates an external or embedded hearing test tool (often iframe or custom logic in `public/hearing-test`).

## 6. Memory Test
- **Path:** `src/pages/tests/memory/MemoryTest.jsx`
- **Logic:**
    - Displays a sequence of digits or patterns.
    - User must recall them.
    - Difficulty increases with successful attempts.
