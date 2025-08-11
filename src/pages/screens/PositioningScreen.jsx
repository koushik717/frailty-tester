import React, { useRef, useState, useEffect } from "react";
import usePoseDetection from "../../hooks/usePoseDetection";
import WebcamComponent from "../../components/webCam/Webcam";
import PoseCanvas from "../../components/poseDetection/PoseCanvas";
import MovePositioning from "../../components/poseDetection/MovePositioning";
import * as tf from "@tensorflow/tfjs";

/**
 * Screen for positioning the user before starting the balance test.
 * Detects keypoints and provides feedback on movement.
 * @returns {JSX.Element} Positioning screen component.
 */
const PositioningScreen = () => {
  const videoRef = useRef(null);
  const [isModelReady, setIsModelReady] = useState(false);
  const { keypoints } = usePoseDetection(videoRef);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      setIsModelReady(true);
    };
    loadModel();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-6">
      <div className="mb-6 max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-2">Position Yourself for the Test</h1>
        <p className="text-lg">
          Stand in front of the camera and adjust your position until the system detects you correctly.
          Move forward or backward as instructed. Once positioned correctly, hold your stance for 5 seconds 
          to proceed to the balance test.
        </p>
      </div>

      {!isModelReady ? (
        <p className="text-xl font-semibold text-gray-500">Loading Pose Detection...</p>
      ) : (
        <>
          {/* Centered Video Container */}
          <div className="flex items-center justify-center w-full">
            <div className="relative w-[925px] h-[670px] bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
              <WebcamComponent ref={videoRef} />
              <PoseCanvas keypoints={keypoints} videoRef={videoRef} />
            </div>
          </div>

          <MovePositioning keypoints={keypoints} />
        </>
      )}
    </div>
  );
};

export default PositioningScreen;
