/**
 * @file settingsSlice.js
 * @description Defines a Redux slice for handling the visibility of the settings modal.
 */

import { createSlice } from "@reduxjs/toolkit";

/**
 * Creates a Redux slice for managing the open/closed state of the Settings modal.
 * @constant {Object} settingsSlice - The slice configuration object.
 * @property {string} name - The unique name of this slice, "settings".
 * @property {Object} initialState - The initial state of this slice, containing:
 *  - isOpen: A boolean indicating whether the Settings modal is open.
 * @property {Object} reducers - An object containing the reducer case functions:
 *  - openSettings: Sets isOpen to true.
 *  - closeSettings: Sets isOpen to false.
 */
const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isOpen: false,
  },
  reducers: {
    /**
     * Opens the settings modal by setting isOpen to true.
     * @function
     * @name openSettings
     * @param {Object} state - The current slice state.
     */
    openSettings: (state) => {
      state.isOpen = true;
    },

    /**
     * Closes the settings modal by setting isOpen to false.
     * @function
     * @name closeSettings
     * @param {Object} state - The current slice state.
     */
    closeSettings: (state) => {
      state.isOpen = false;
    },
  },
});

// Exporting the action creators for use in the application.
export const { openSettings, closeSettings } = settingsSlice.actions;

// Exporting the reducer for store integration.
export default settingsSlice.reducer;
