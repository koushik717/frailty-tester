import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextStep } from "../../store/slices/stageSlice";
import WelcomeScreen from "../screens/WelcomeScreen";
import PositioningScreen from "../screens/PositioningScreen";
import TestScreen from "../screens/TestScreen";
import ResultsScreen from "../screens/ResultsScreen";
import HistoryScreen from "../screens/HistoryScreen";
import WebcamComponent from "../../components/webCam/Webcam";

/**
 * @file StageManager.jsx
 * @description Manages the flow between different test screens (welcome, positioning, test, and results).
 * Controls stage progression and attempts using Redux state.
 */

// Array of available screens in order of test flow
const screens = [WelcomeScreen, PositioningScreen, TestScreen, ResultsScreen];

/**
 * StageManager Component - Handles the navigation between test screens.
 * @returns {JSX.Element} The component responsible for managing test progression.
 */
const StageManager = () => {
  const step = useSelector((state) => state.stage.step); // Current test stage (0-3)
  const attempt = useSelector((state) => state.test.currentAttempt); // Tracks current test attempt (1-6)
  const dispatch = useDispatch();
  const ScreenComponent = screens[step]; // Selects the current screen component
  const isHistory = useSelector((state) => state.stage.isHistory);

  console.log(`Current Stage: ${step}, Current Attempt: ${attempt}`);

  /**
   * Handles progression to the next test stage or attempt.
   * - If on the test screen (`step === 2`) and not yet at attempt 6, advance attempt.
   * - Otherwise, move to the next stage.
   */
  const handleNext = () => {
    if (step === 2 && attempt < 6) {
      console.log(`Advancing Attempt: ${attempt} to ${attempt + 1}`);
      dispatch(nextAttempt());
    } else {
      console.log(`Advancing Stage: ${step} to ${step + 1}`);
      dispatch(nextStep());
    }
  };

  // If we're in history view, show that instead of normal flow
  if (isHistory) {
    return <HistoryScreen />;
  }

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      {/* Display the webcam only during positioning and test stages */}
      {step > 0 && step < 3 && <WebcamComponent />}
      {/* Render the appropriate screen */}
      <ScreenComponent onNext={handleNext} />
    </div>
  );
};

export default StageManager;