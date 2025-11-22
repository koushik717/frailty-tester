// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import stageReducer from "./slices/stageSlice";
import testReducer from "./slices/testSlice";
import positionReducer from "./slices/positionSlice";
import settingsReducer from "./slices/settingsSlice";
import webcamReducer from "./slices/webcamSlice";
import resultsReducer from "./slices/resultSlice";
import userReducer from "./slices/userSlice";

import { resultApi } from '../services/resultAPI';
import { exercisesApi } from '../services/exercisesAPI';

/**
 * @constant {Object} store - Redux store configuration with reducers.
 */
export const store = configureStore({
  reducer: {
    stage: stageReducer,
    test: testReducer,
    position: positionReducer,
    settings: settingsReducer,  // For opening/closing SettingsModal
    webcam: webcamReducer,      // For webcam device & resolution
    results: resultsReducer,
    user: userReducer,           // For user authentication state

    [resultApi.reducerPath]: resultApi.reducer,
    [exercisesApi.reducerPath]: exercisesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      resultApi.middleware,
      exercisesApi.middleware,
    )
});

export default store;
