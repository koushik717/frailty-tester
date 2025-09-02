import React, { useRef, useEffect } from "react";
import PoseRenderer from "./PoseRenderer";
import { drawBoundingBox } from "./BoundingBoxUtils";

const PoseCanvas = ({ videoRef, keypoints, boundingBox }) => {
  const canvasRef = useRef(null);

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

  return (
    <canvas
      data-testid="pose-canvas"
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default PoseCanvas;

