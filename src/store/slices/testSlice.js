/**
 * @file testSlice.js
 * @description Redux slice for managing test attempts and results in the Frailty Tester application.
 * This slice tracks user attempts, balance test results, and determines when the test is complete.
 * 
 * @module testSlice
 * @requires @reduxjs/toolkit
 */

import { createSlice } from "@reduxjs/toolkit";

/**
 * @constant {Object} initialState - The initial state for the test slice.
 * @property {number} currentAttempt - Tracks the current test attempt (starts at 1).
 * @property {Array} testResults - Stores test results for each attempt.
 * @property {string} currentFoot - Indicates which foot the user is balancing on ("left" or "right").
 * @property {boolean} isTestComplete - Flags whether all attempts are completed.
 */
const initialState = {
  currentAttempt: 1,
  testResults: [],
  currentFoot: "left",
  isTestComplete: false,
};

/**
 * @constant {Object} testSlice - Redux slice for handling balance test attempts and results.
 * This slice provides actions to record results, switch foot positions, progress attempts, and reset the test.
 */
const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    /**
     * @function recordTestResult
     * @description Records the result of a test attempt.
     * @param {Object} state - The current state of the test slice.
     * @param {Object} action - The dispatched action containing the test result data.
     * @property {Object} action.payload - The test result data, including time balanced and foot used.
     */
    recordTestResult: (state, action) => {
      state.testResults.push(action.payload);
    },

    /**
     * @function nextAttempt
     * @description Advances to the next test attempt. Marks test as complete after six attempts.
     * @param {Object} state - The current state of the test slice.
     */
    nextAttempt: (state) => {
      if (state.currentAttempt < 6) {
        state.currentAttempt += 1;
      } else {
        state.isTestComplete = true;
      }
    },

    /**
     * @function switchFoot
     * @description Switches the balancing foot between "left" and "right" after a test attempt.
     * @param {Object} state - The current state of the test slice.
     */
    switchFoot: (state) => {
      state.currentFoot = state.currentFoot === "left" ? "right" : "left";
    },

    /**
     * @function resetTest
     * @description Resets all test data, including attempts, results, and foot position.
     * @param {Object} state - The current state of the test slice.
     */
    resetTest: (state) => {
      state.currentAttempt = 1;
      state.testResults = [];
      state.currentFoot = "left";
      state.isTestComplete = false;
    },
  },
});

// Export the reducer actions for use in components
export const { recordTestResult, nextAttempt, switchFoot, resetTest } = testSlice.actions;

// Export the reducer to be integrated into the Redux store
export default testSlice.reducer;
