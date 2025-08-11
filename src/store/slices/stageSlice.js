/**
 * @file stageSlice.js
 * @description Redux slice for managing the current stage of the Frailty Tester application.
 * This slice controls the navigation between different test stages, including positioning, 
 * balance tests, and result screens.
 * 
 * @module stageSlice
 * @requires @reduxjs/toolkit
 */

import { createSlice } from "@reduxjs/toolkit";

/**
 * @constant {Object} initialState - The initial state for the stage slice.
 * @property {number} step - The current step in the test sequence (0 = Welcome, 1 = Positioning, etc.).
 */
const initialState = {
  step: 0, // Start at WelcomeScreen
  isHistory: false,
};

/**
 * @constant {Object} stageSlice - Redux slice for handling test stage transitions.
 * This slice provides actions to move forward, backward, and reset test stages.
 */
const stageSlice = createSlice({
  name: "stage",
  initialState,
  reducers: {
    /**
     * @function nextStep
     * @description Advances the test to the next stage, ensuring it does not exceed the final step.
     * @param {Object} state - The current state of the stage slice.
     */
    nextStep: (state) => {
      if (state.step < 3) {
        console.log(`Advancing Stage: ${state.step} to ${state.step + 1}`);
        state.step += 1;
      } else {
        console.warn("Attempted to advance past the last stage");
      }
    },

    /**
     * @function prevStep
     * @description Moves the test back to the previous stage, ensuring it does not go below step 1.
     * @param {Object} state - The current state of the stage slice.
     */
    prevStep: (state) => {
      if (state.step >= 1) {
        console.log(`Reverting Stage: ${state.step} to ${state.step - 1}`);
        state.step -= 1;
      }
    },

    /**
     * @function resetStage
     * @description Resets the test stage back to step 1, typically used for restarting the test.
     * @param {Object} state - The current state of the stage slice.
     */
    resetStage: (state) => {
      console.log("Resetting Stage to 1");
      state.step = 1;
    },

    /**
     * @function viewHistory
     * @description Sets the view to history screen
     * @param {Object} state - The current state of the stage slice
     */
    viewHistory: (state) => {
      state.isHistory = true;
    },

    /**
     * @function returnHome
     * @description Sets the stage back to the introduction page, primarily for demo purposes
     * @param {Object} state - The current state of the stage slice
     */
    returnHome: (state) => {
      // reset test
      state.currentAttempt = 1;
      state.testResults = [];
      state.currentFoot = "left";
      state.isTestComplete = false;

      // and return to step 0
      console.log("Returning Home");
      state.step = 0;
    },
  },
});

// Export the reducer actions for use in components
export const { nextStep, prevStep, resetStage, viewHistory, returnHome } = stageSlice.actions;

// Export the reducer to be integrated into the Redux store
export default stageSlice.reducer;
