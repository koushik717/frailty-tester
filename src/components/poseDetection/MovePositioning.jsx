// src/poseDetection/MovePositioning.jsx
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePositionStatus } from "../../store/slices/positionSlice";
import { nextStep } from "../../store/slices/stageSlice";

const MovePositioning = ({ keypoints }) => {
  const dispatch = useDispatch();
  const positionStatus = useSelector((state) => state.position.status);
  const step = useSelector((state) => state.stage.step);

  const [holdTime, setHoldTime] = useState(0);
  const holdDuration = 5; // Require 5 seconds in "Correct Position"
  const timerRef = useRef(null);
  const lastStatus = useRef(null);
  const hasAdvanced = useRef(false);

  // Constants for bounding box size thresholds
  const BOUNDING_BOX_MIN = 15000; // Minimum area for correct positioning
  const BOUNDING_BOX_MAX = 50000; // Maximum area for correct positioning

  // Debugging: Monitor positionStatus updates
  useEffect(() => {
    console.log("Position Status Updated:", positionStatus);
  }, [positionStatus]);

  useEffect(() => {
    // If no keypoints => "Move Backward"
    if (!keypoints || !Array.isArray(keypoints) || keypoints.length === 0) {
      dispatch(updatePositionStatus("Move Backward"));
      setHoldTime(0);
      clearInterval(timerRef.current);
      timerRef.current = null;
      lastStatus.current = "Move Backward";
      return;
    }

    // Extract required keypoints
    const leftShoulder = keypoints.find((kp) => kp.name === "left_shoulder");
    const rightShoulder = keypoints.find((kp) => kp.name === "right_shoulder");
    const leftAnkle = keypoints.find((kp) => kp.name === "left_ankle");
    const rightAnkle = keypoints.find((kp) => kp.name === "right_ankle");

    if (!leftShoulder || !rightShoulder || !leftAnkle || !rightAnkle) {
      dispatch(updatePositionStatus("Move Backward"));
      setHoldTime(0);
      clearInterval(timerRef.current);
      timerRef.current = null;
      lastStatus.current = "Move Backward";
      return;
    }

    // boundingBox from shoulders to ankles
    const boundingBoxArea =
      (Math.max(leftShoulder.x, rightShoulder.x) - Math.min(leftShoulder.x, rightShoulder.x)) *
      (Math.max(leftAnkle.y, rightAnkle.y) - Math.min(leftShoulder.y, rightShoulder.y));

    // Adjust these thresholds to your logic
    if (boundingBoxArea < BOUNDING_BOX_MIN) {
      dispatch(updatePositionStatus("Move Forward"));
      setHoldTime(0);
      clearInterval(timerRef.current);
      timerRef.current = null;
      lastStatus.current = "Move Forward";
      return;
    } else if (boundingBoxArea > BOUNDING_BOX_MAX) {
      dispatch(updatePositionStatus("Move Backward"));
      setHoldTime(0);
      clearInterval(timerRef.current);
      timerRef.current = null;
      lastStatus.current = "Move Backward";
      return;
    } else {
      // "Position Correct"
      dispatch(updatePositionStatus("Position Correct"));

      if (lastStatus.current !== "Position Correct") {
        setHoldTime(0);
        lastStatus.current = "Position Correct";

        timerRef.current = setInterval(() => {
          setHoldTime((prevTime) => {
            if (prevTime + 1 >= holdDuration) {
              if (!hasAdvanced.current) {
                dispatch(nextStep());
                hasAdvanced.current = true;
              }
              clearInterval(timerRef.current);
              timerRef.current = null;
              return holdDuration;
            }
            return prevTime + 1;
          });
        }, 1000);
      }
    }

    return () => {
      if (lastStatus.current !== "Position Correct") {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [keypoints, dispatch, step]);

  // Generate descriptive status message for screen readers
  const getStatusDescription = () => {
    switch (positionStatus) {
      case "Position Correct":
        return `Position is correct. Hold this position for ${holdDuration - holdTime} more seconds to proceed.`;
      case "Move Forward":
        return "Please move closer to the camera to be properly detected.";
      case "Move Backward":
        return "Please move further from the camera or ensure your full body is visible.";
      default:
        return "Positioning status is being determined.";
    }
  };

  return (
    <section 
      className="text-center mt-4"
      role="region"
      aria-labelledby="position-status-heading"
      aria-describedby="position-instructions"
    >
      <h2 
        id="position-status-heading"
        className="sr-only"
      >
        Position Status
      </h2>
      
      <div 
        id="position-instructions"
        className="sr-only"
      >
        This section provides real-time feedback about your positioning for the assessment. 
        Follow the instructions to maintain the correct position.
      </div>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`text-5xl font-extrabold transition-all duration-300 ${
          positionStatus === "Position Correct" ? "text-green-400" : "text-yellow-400"
        }`}
        style={{ minHeight: "60px", lineHeight: "60px" }}
        aria-label={`Position status: ${positionStatus}`}
      >
        {positionStatus === "Position Correct"
          ? `Position Correct - Holding: ${holdTime} / ${holdDuration} sec`
          : positionStatus}
      </div>

      {/* Hidden description for screen readers */}
      <div 
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {getStatusDescription()}
      </div>

      {/* Progress indicator for position holding */}
      {positionStatus === "Position Correct" && (
        <div 
          role="progressbar"
          aria-valuenow={holdTime}
          aria-valuemin="0"
          aria-valuemax={holdDuration}
          aria-label={`Position hold progress: ${holdTime} out of ${holdDuration} seconds`}
          className="sr-only"
        >
          {holdTime} seconds held out of {holdDuration} required
        </div>
      )}
    </section>
  );
};

export default MovePositioning;
