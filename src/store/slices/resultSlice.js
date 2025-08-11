import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentResult: null,
  results: [],
  selectedResultId: null,
  loading: false,
  error: null
};

export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setCurrentResult: (state, action) => {
      state.currentResult = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setSelectedResultId: (state, action) => {
      state.selectedResultId = action.payload;
    },
    deleteResult: (state, action) => {
      state.results = state.results.filter((_, index) => index !== action.payload);
      state.selectedResultId = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearCurrentResult: (state) => {
      state.currentResult = null;
      state.selectedResultId = null;
    }
  }
});

// Export the reducer actions for use in components
export const { setCurrentResult, setResults, setSelectedResultId, deleteResult, setLoading, setError, clearCurrentResult } = resultSlice.actions;
export default resultSlice.reducer;