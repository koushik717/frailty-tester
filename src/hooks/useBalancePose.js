import { useState, useEffect, useRef } from "react";
import { initializeTensorFlow } from "../components/pose/tf/initializeTF";

/**
 * Custom hook for detecting human poses using TensorFlow MoveNet for balance testing.
 */
const useBalancePose = (videoRef, onUpdate) => {
  const [detector, setDetector] = useState(null);
  const [keypoints, setKeypoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const animationFrameRef = useRef(null);

  // Initialize TensorFlow and detector
  useEffect(() => {
    const loadDetector = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const poseDetector = await initializeTensorFlow();
        setDetector(poseDetector);
      } catch (err) {
        console.error("Failed to load pose detector:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadDetector();
  }, []);

  // Pose detection loop
  useEffect(() => {
    const detectPose = async () => {
      if (!detector || !videoRef.current) {
        animationFrameRef.current = requestAnimationFrame(detectPose);
        return;
      }

      if (videoRef.current.readyState < 2) {
        animationFrameRef.current = requestAnimationFrame(detectPose);
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

          // Map keypoints to match the video element's coordinate system
          const mappedKeypoints = filteredKeypoints.map(kp => ({
            name: kp.name,
            x: kp.x,
            y: kp.y,
            score: kp.score,
          }));

          setKeypoints(mappedKeypoints);
          
          // Call the update callback if provided
          if (onUpdate) {
            onUpdate(mappedKeypoints);
          }
        }
      } catch (error) {
        console.error("Pose estimation error:", error);
      }

      animationFrameRef.current = requestAnimationFrame(detectPose);
    };

    if (detector) {
      detectPose();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [detector, videoRef, onUpdate]);

  const start = () => {
    if (detector && videoRef.current) {
      // Pose detection is already running
      return true;
    }
    return false;
  };

  const stop = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  return { 
    keypoints, 
    isLoading, 
    error, 
    start, 
    stop,
    detector: !!detector 
  };
};

export default useBalancePose;

