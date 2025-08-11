import testReducer, {
    recordTestResult,
    nextAttempt,
    switchFoot,
    resetTest,
  } from "../../store/slices/testSlice";
  
  describe("testSlice reducer", () => {
    // Define the initial state structure used across tests
    const initialState = {
      currentAttempt: 1,
      testResults: [],
      currentFoot: "left",
      isTestComplete: false,
    };
  
    // Verify that the reducer returns the correct default state
    it("should return the initial state when passed an empty action", () => {
      expect(testReducer(undefined, { type: undefined })).toEqual(initialState);
    });
  
    // Ensure that recording a test result appends to testResults array
    it("should handle recordTestResult", () => {
      const action = {
        type: recordTestResult.type,
        payload: { timeBalanced: 10, foot: "left" },
      };
      const state = testReducer(initialState, action);
      expect(state.testResults).toEqual([{ timeBalanced: 10, foot: "left" }]);
    });
  
    // Confirm nextAttempt increments the attempt number and test is not yet complete
    it("should handle nextAttempt and not mark test as complete before 6 attempts", () => {
      const action = { type: nextAttempt.type };
      const state = testReducer(initialState, action);
      expect(state.currentAttempt).toBe(2);
      expect(state.isTestComplete).toBe(false);
    });
  
    // Confirm that after 6 attempts, the test is marked as complete
    it("should handle nextAttempt and mark test as complete after 6 attempts", () => {
      const stateAfterFiveAttempts = {
        ...initialState,
        currentAttempt: 6,
      };
      const action = { type: nextAttempt.type };
      const state = testReducer(stateAfterFiveAttempts, action);
      expect(state.currentAttempt).toBe(6);
      expect(state.isTestComplete).toBe(true);
    });
  
    // Validate foot-switching logic toggles between "left" and "right"
    it("should handle switchFoot", () => {
      const action = { type: switchFoot.type };
  
      // From "left" to "right"
      const state = testReducer(initialState, action);
      expect(state.currentFoot).toBe("right");
  
      // From "right" back to "left"
      const stateAfterSwitch = testReducer(state, action);
      expect(stateAfterSwitch.currentFoot).toBe("left");
    });
  
    // Ensure that resetTest resets all state values to their defaults
    it("should handle resetTest", () => {
      const modifiedState = {
        currentAttempt: 3,
        testResults: [{ timeBalanced: 10, foot: "left" }],
        currentFoot: "right",
        isTestComplete: true,
      };
      const action = { type: resetTest.type };
      const state = testReducer(modifiedState, action);
      expect(state).toEqual(initialState);
    });
  });
  