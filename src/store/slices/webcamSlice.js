/**
 * @file webcamSlice.js
 * @description Defines a Redux slice for managing webcam-related state, 
 * including which device ID is selected and the webcam's resolutions for the feed and skeleton.
 */

import { createSlice } from "@reduxjs/toolkit";

/**
 * The initial state of the webcam slice.
 * @type {Object}
 * @property {string|null} deviceId - The ID of the currently selected webcam device. Null indicates no specific device.
 * @property {Object} currentResolution - The resolution used for skeleton scaling (e.g., { width, height }).
 * @property {Object} resolution - The resolution used for the actual webcam feed via getUserMedia.
 */
const initialState = {
  deviceId: null,
  currentResolution: { width: 640, height: 480 },
  resolution: { width: 640, height: 480 },
};

/**
 * Creates a Redux slice to store and update the webcam's device ID 
 * and resolutions for both the actual feed and skeleton scaling.
 * @constant {Object} webcamSlice - The slice configuration object.
 */
const webcamSlice = createSlice({
  name: "webcam",
  initialState,
  reducers: {
    /**
     * Sets the device ID for the webcam.
     * @function
     * @name setDeviceId
     * @param {Object} state - The current slice state.
     * @param {Object} action - The dispatched action, containing the new device ID in action.payload.
     */
    setDeviceId: (state, action) => {
      state.deviceId = action.payload;
    },

    /**
     * Updates the resolution used for getUserMedia (actual webcam feed).
     * @function
     * @name setResolution
     * @param {Object} state - The current slice state.
     * @param {Object} action - The dispatched action, containing the new resolution object in action.payload.
     */
    setResolution: (state, action) => {
      state.resolution = action.payload;
    },

    /**
     * Updates the resolution used for skeleton scaling logic.
     * @function
     * @name updateResolution
     * @param {Object} state - The current slice state.
     * @param {Object} action - The dispatched action, containing the new resolution object in action.payload.
     */
    updateResolution: (state, action) => {
      state.currentResolution = action.payload;
    },
  },
});

/** Action creators generated from the slice reducers. */
export const { setDeviceId, setResolution, updateResolution } = webcamSlice.actions;

/** The reducer function to be used when integrating this slice into the store. */
export default webcamSlice.reducer;
