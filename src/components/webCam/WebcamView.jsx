import React, { useEffect, forwardRef } from "react";

/**
 * Webcam component that handles camera stream access and display.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.deviceId] - Optional device ID to override default camera
 * @param {Function} [props.onError] - Optional error callback
 * @param {React.RefObject} ref - Forwarded ref for the video element
 */
const WebcamView = forwardRef(({ deviceId, onError, resolution = { width: 640, height: 480 } }, videoRef) => {
  useEffect(() => {
    const setupWebcam = async () => {
      if (!videoRef.current) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: deviceId || undefined,
            width: resolution.width,
            height: resolution.height,
          },
        });

        // Attach the stream to the <video> element
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      } catch (error) {
        console.error("Webcam error:", error);
        if (onError) onError(error);
      }
    };

    setupWebcam();
  }, [videoRef, deviceId, resolution, onError]);

  return (
    <video
      ref={videoRef}
      // "contain" shows the entire video, may add letterboxing if aspect ratio differs
      style={{ objectFit: "contain" }}
      className="absolute top-0 left-0 w-full h-full"
      autoPlay
      playsInline
      data-testid="webcam-feed"
    />
  );
});

WebcamView.displayName = 'WebcamView';

export default WebcamView;

