// src/poseDetection/PoseCanvas.jsx
import React, { useRef, useEffect } from "react";
import PoseRenderer from "./PoseRenderer";
import { useSelector } from "react-redux";
import { drawBoundingBox } from "./BoundingBoxUtils";

const PoseCanvas = ({ videoRef, keypoints }) => {
  const canvasRef = useRef(null);
  const boundingBox = useSelector((state) => state.position?.boundingBox);

  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const video = videoRef.current;

    if (video.videoWidth === 0 || video.videoHeight === 0) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (keypoints?.length > 0) {
      PoseRenderer(ctx, keypoints, {
        width: video.videoWidth,
        height: video.videoHeight,
      });
    }

    if (boundingBox) {
      drawBoundingBox(ctx, boundingBox);
    }
  }, [keypoints, boundingBox, videoRef]);

  // Generate descriptive text for screen readers
  const getCanvasDescription = () => {
    if (!keypoints || keypoints.length === 0) {
      return "Pose detection canvas - waiting for body position data";
    }
    
    const detectedPoints = keypoints.length;
    return `Pose detection canvas showing ${detectedPoints} body keypoints detected. ${boundingBox ? 'Positioning guide is visible.' : 'Positioning guide is being calculated.'}`;
  };

  return (
    <div 
      role="img"
      aria-label={getCanvasDescription()}
      aria-describedby="pose-canvas-description"
      className="relative"
    >
      <canvas
        data-testid="pose-canvas"
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        role="presentation"
      />
      
      {/* Hidden description for screen readers */}
      <div 
        id="pose-canvas-description"
        className="sr-only"
        aria-live="polite"
      >
        {getCanvasDescription()}
        {keypoints && keypoints.length > 0 && (
          <span>
            Body pose is being tracked. Follow the on-screen instructions to maintain proper positioning.
          </span>
        )}
      </div>
    </div>
  );
};

export default PoseCanvas;
