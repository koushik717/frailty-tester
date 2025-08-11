/**
 * @file positionSlice.js
 * @description Redux slice for managing user positioning state in the Frailty Tester application.
 * This slice handles the tracking of the user's position status and bounding box 
 * to determine if they are correctly positioned within the camera frame.
 * 
 * @module positionSlice
 * @requires @reduxjs/toolkit
 */

import { createSlice } from "@reduxjs/toolkit";

/**
 * @constant {Object} initialState - The initial state for the positioning slice.
 * @property {string} status - The current status of the user's position (e.g., "Positioning...", "Move Forward", "Move Backward").
 * @property {Object|null} boundingBox - The detected bounding box for the user's position, used for tracking movement.
 */
const initialState = {
  status: "Positioning...",
  boundingBox: null, // Stores calculated bounding box
};

/**
 * @constant {Object} positionSlice - Redux slice for handling user positioning state.
 * This slice provides actions and reducers to update the user's position status
 * and bounding box data in real-time based on pose detection analysis.
 */
const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    /**
     * @function updateBoundingBox
     * @description Updates the detected bounding box for the user's position.
     * @param {Object} state - The current state of the position slice.
     * @param {Object} action - The dispatched action containing the new bounding box data.
     * @property {Object} action.payload - The new bounding box data, including position and dimensions.
     */
    updateBoundingBox: (state, action) => {
      state.boundingBox = action.payload;
    },

    /**
     * @function updatePositionStatus
     * @description Updates the user's positioning status (e.g., "Move Forward", "Move Backward").
     * @param {Object} state - The current state of the position slice.
     * @param {Object} action - The dispatched action containing the new status.
     * @property {string} action.payload - The new positioning status.
     */
    updatePositionStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

// Export the reducer actions for use in components
export const { updateBoundingBox, updatePositionStatus } = positionSlice.actions;

// Export the reducer to be integrated into the Redux store
export default positionSlice.reducer;
