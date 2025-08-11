/**
 * @file TestScreen.jsx
 * @description This component handles the main balance test flow. It detects the user's movements
 *              via PoseAnalyzer, tracks balance duration, logs results, and transitions between attempts.
 */

import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { recordTestResult, nextAttempt, switchFoot } from "../../store/slices/testSlice";
import { nextStep } from "../../store/slices/stageSlice";
import usePoseDetection from "../../hooks/usePoseDetection";
import WebcamComponent from "../../components/webCam/Webcam";
import PoseCanvas from "../../components/poseDetection/PoseCanvas";
import PoseAnalyzer from "../../components/poseDetection/PoseAnalyzer";

/**
 * Represents a screen that conducts the balance test for up to six attempts.
 * Upon foot drop, initiates a 5-second cooldown before the next attempt.
 * Once six attempts are finished, navigates to the results stage.
 * 
 * @class TestScreen
 * @component
 * @returns {JSX.Element} The rendered test screen component.
 */
const TestScreen = () => {
  /** The Redux dispatcher for triggering actions. */
  const dispatch = useDispatch();

  /** A ref pointing to the webcam video element for pose detection. */
  const videoRef = useRef(null);

  /** Pose detection hook providing the current frame's detected keypoints. */
  const { keypoints } = usePoseDetection(videoRef);

  // -----------------------------------------------------------------------------------------
  // Redux state selectors
  // -----------------------------------------------------------------------------------------

  /** The current attempt number, from 1 to 6. */
  const attempt = useSelector((state) => state.test.currentAttempt);

  /** The foot ("left" or "right") the user should be lifting for this attempt. */
  const currentFoot = useSelector((state) => state.test.currentFoot);

  /** Whether all six attempts have completed, indicating test completion. */
  const isTestComplete = useSelector((state) => state.test.isTestComplete);

  // -----------------------------------------------------------------------------------------
  // Local references & states
  // -----------------------------------------------------------------------------------------

  /**
   * Whether the foot is currently in the air (used by PoseAnalyzer).
   * @type {React.MutableRefObject<boolean>}
   */
  const isFootInAirRef = useRef(false);

  /**
   * Tracks the time the foot was first lifted. Allows us to measure duration.
   * @type {React.MutableRefObject<number|null>}
   */
  const startTimeRef = useRef(null);

  /**
   * Indicates if the user lifted the wrong leg.
   * @type {[boolean, Function]}
   */
  const [wrongLeg, setWrongLeg] = useState(false);

  /**
   * Whether a 5-second cooldown is in progress after foot drop.
   * @type {[boolean, Function]}
   */
  const [showCooldown, setShowCooldown] = useState(false);

  /**
   * The remaining countdown (in seconds) for the cooldown.
   * @type {[number, Function]}
   */
  const [cooldownCount, setCooldownCount] = useState(5);

  // -----------------------------------------------------------------------------------------
  // Side effects
  // -----------------------------------------------------------------------------------------

  /**
   * Navigates to the results screen if the test is flagged as complete.
   */
  useEffect(() => {
    if (isTestComplete) {
      dispatch(nextStep());
    }
  }, [isTestComplete, dispatch]);

  /**
   * Starts timing when the correct foot is first lifted.
   * Called from PoseAnalyzer logic.
   */
  const startTimer = () => {
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }
  };

  /**
   * Stops timing when a foot drop is confirmed. Dispatches the result.
   * Called from PoseAnalyzer logic.
   */
  const ATTEMPTS_PER_FOOT = 3;
  const TOTAL_ATTEMPTS = ATTEMPTS_PER_FOOT * 2;

  const stopTimer = () => {
    if (startTimeRef.current && !wrongLeg) {
      const duration = (Date.now() - startTimeRef.current) / 1000;
      dispatch(recordTestResult({ attempt, foot: currentFoot, balanceScore: duration }));
      startTimeRef.current = null;

      // Switch foot every ATTEMPTS_PER_FOOT attempts
      if (attempt % ATTEMPTS_PER_FOOT === 0) {
      // Switch foot after ATTEMPTS_PER_FOOT attempts (from left to right)
        if (attempt === ATTEMPTS_PER_FOOT) {
          dispatch(switchFoot());
        }
      }
    }
  };

  /**
   * Called by PoseAnalyzer if a foot drop is confirmed. Initiates a 5-second cooldown
   * before moving on to the next attempt.
   */
  const handleFootDrop = () => {
    // Only show cooldown and advance attempt if we haven't reached the end
    if (attempt < TOTAL_ATTEMPTS) {
      setShowCooldown(true);
      setCooldownCount(3);
    } else {
      // If we've completed 6 attempts, mark test as complete
      dispatch(nextStep());
    }
  };

  /**
   * Manages a 5-second countdown. When it reaches zero, we proceed to the next attempt.
   */
  useEffect(() => {
    let intervalId;
    if (showCooldown) {
      intervalId = setInterval(() => {
        setCooldownCount((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setShowCooldown(false);
            // Advance to the next attempt
            dispatch(nextAttempt());
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [showCooldown, dispatch]);

  /**
   * Analyzes pose keypoints each frame to track foot position, with a grace period for foot drop.
   */
  useEffect(() => {
    PoseAnalyzer.analyzeKeypoints(keypoints, {
      isFootInAirRef,
      startTimer,
      stopTimer,
      currentFoot,
      setWrongLeg,
      onFootDrop: handleFootDrop,
    });
  }, [keypoints, currentFoot]);

  // If test complete, let the user know we’re loading results.
  if (isTestComplete) {
    return <p className="text-xl font-semibold">Loading Results...</p>;
  }

  // -----------------------------------------------------------------------------------------
  // UI rendering
  // -----------------------------------------------------------------------------------------

  // Decide which status message to show in the UI
  let statusMessage;
  if (showCooldown) {
    statusMessage = `Test #${attempt} complete! Next attempt in ${cooldownCount} seconds...`;
  } else {
    statusMessage = startTimeRef.current ? "Timing..." : "Waiting for foot lift...";
  }

  return (
    <div className="flex flex-col items-center text-center p-6">
      <h1 className="text-2xl font-bold mb-4">
        Balance Test #{attempt} / 6 ({currentFoot === "left" ? "Left Foot" : "Right Foot"})
      </h1>

      {wrongLeg && <p className="text-red-500 font-bold">Wrong leg, try again!</p>}

      {/**
       * We place the status in a fixed-height container to avoid screen reflow 
       * that might push the webcam up or down during text changes.
       */}
      <div
        className="flex items-center justify-center"
        style={{ minHeight: "40px", marginBottom: "1rem" }}
      >
        <p className="text-2xl font-semibold text-blue-600 text-center">
          {statusMessage}
        </p>
      </div>

      {/**
       * The container for the webcam (940×675), 
       * includes the PoseCanvas overlay for keypoint rendering.
       */}
      <div className="relative w-[940px] h-[675px] shadow-lg rounded-lg overflow-hidden border border-gray-300 bg-white">
        <WebcamComponent ref={videoRef} />
        <PoseCanvas videoRef={videoRef} keypoints={keypoints} />
      </div>
    </div>
  );
};

export default TestScreen;
