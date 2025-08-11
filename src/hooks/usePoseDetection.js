import { useState, useEffect } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

/**
 * Custom hook for detecting human poses using TensorFlow MoveNet.
 */
const usePoseDetection = (videoRef) => {
  const [detector, setDetector] = useState(null);
  const [keypoints, setKeypoints] = useState([]);

  useEffect(() => {
    const loadDetector = async () => {
      await tf.ready();
      await tf.setBackend("webgl");

      const model = poseDetection.SupportedModels.MoveNet;
      const detectorConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
      };
      const poseDetector = await poseDetection.createDetector(model, detectorConfig);
      setDetector(poseDetector);
    };
    loadDetector();
  }, []);

  useEffect(() => {
    const detectPose = async () => {
      if (!detector || !videoRef.current) return;
      if (videoRef.current.readyState < 2) {
        requestAnimationFrame(detectPose);
        return;
      }

      try {
        const videoElement = videoRef.current;

        const poses = await detector.estimatePoses(videoElement, {
          flipHorizontal: false,
          maxPoses: 1,
        });

        if (poses.length > 0 && poses[0].keypoints) {
          // Filter out low-confidence keypoints
          const filteredKeypoints = poses[0].keypoints.filter(kp => kp.score > 0.5);

          // We'll store raw x & y to match the video element's coordinate system
          const mappedKeypoints = filteredKeypoints.map(kp => ({
            name: kp.name,
            x: kp.x, // The raw coordinate from MoveNet
            y: kp.y, 
            confidence: kp.score,
          }));

          setKeypoints(mappedKeypoints);
        }
      } catch (error) {
        console.error("Pose estimation error:", error);
      }

      requestAnimationFrame(detectPose);
    };

    if (detector) detectPose();
  }, [detector, videoRef]);

  return { keypoints };
};

export default usePoseDetection;
