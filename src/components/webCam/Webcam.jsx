import React, { useEffect, forwardRef } from "react";
import { useSelector } from "react-redux";

/**
 * Webcam component that handles camera stream access and display.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.overrideDeviceId] - Optional device ID to override default camera
 * @param {Function} [props.onError] - Optional error callback
 * @param {React.RefObject} ref - Forwarded ref for the video element
 */
const WebcamComponent = forwardRef(({ overrideDeviceId }, videoRef) => {
  const webcamState = useSelector((state) => state.webcam);
  const { deviceId, resolution } = webcamState;

  // overrideDeviceId, if provided, takes precedence
  const finalDeviceId = overrideDeviceId || deviceId;

  useEffect(() => {
    const setupWebcam = async () => {
      if (!videoRef.current) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: finalDeviceId || undefined,
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
      }
    };

    setupWebcam();
  }, [videoRef, finalDeviceId, resolution]);

  return (
    <div 
      role="img"
      aria-label="Camera feed for pose detection"
      aria-describedby="camera-feed-description"
      className="relative"
    >
      <video
        ref={videoRef}
        // "contain" shows the entire video, may add letterboxing if aspect ratio differs
        style={{ objectFit: "contain" }}
        className="absolute top-0 left-0 w-full h-full"
        autoPlay
        playsInline
        data-testid="webcam-feed"
        aria-hidden="true"
        role="presentation"
        muted
      />
      
      {/* Hidden description for screen readers */}
      <div 
        id="camera-feed-description"
        className="sr-only"
        aria-live="polite"
      >
        Live camera feed for pose detection assessment. 
        Your body position and movements will be analyzed to provide real-time feedback.
        Ensure your full body is visible in the camera frame for accurate detection.
      </div>
    </div>
  );
});

export default WebcamComponent;
