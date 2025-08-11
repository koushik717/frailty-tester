import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Camera, CameraOff, AlertCircle, RefreshCw } from 'lucide-react';

// Lazy load react-webcam to avoid bundle bloat
const ReactWebcam = lazy(() => import('react-webcam'));

/**
 * WebcamPane Component for Reaction Time Test
 * Handles camera permissions, device selection, and responsive display
 * 
 * @param {Object} props
 * @param {boolean} props.enabled - Whether webcam is enabled
 * @param {Function} props.onPermission - Permission state callback ('prompt'|'granted'|'denied')
 * @param {Function} props.onDevice - Device label callback
 * @param {string} props.className - Additional CSS classes
 */
const WebcamPane = ({ 
  enabled = false, 
  onPermission, 
  onDevice, 
  className = "" 
}) => {
  const [permissionState, setPermissionState] = useState('prompt');
  const [deviceLabel, setDeviceLabel] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  // Check initial permission state
  useEffect(() => {
    const checkPermission = async () => {
      try {
        if (navigator.permissions && navigator.permissions.query) {
          const permission = await navigator.permissions.query({ name: 'camera' });
          setPermissionState(permission.state);
          
          permission.onchange = () => {
            setPermissionState(permission.state);
            onPermission?.(permission.state);
          };
        } else {
          // Fallback for browsers without permissions API
          setPermissionState('prompt');
        }
      } catch (err) {
        console.warn('Permission check failed:', err);
        setPermissionState('prompt');
      } finally {
        setIsLoading(false);
      }
    };

    checkPermission();
  }, [onPermission]);

  // Request camera access
  const requestCameraAccess = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });
      
      setStream(mediaStream);
      setPermissionState('granted');
      onPermission?.('granted');
      
      // Get device label
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevice = devices.find(device => device.kind === 'videoinput');
      if (videoDevice) {
        setDeviceLabel(videoDevice.label || 'Camera');
        onDevice?.(videoDevice.label || 'Camera');
      }
      
    } catch (err) {
      console.error('Camera access error:', err);
      setError(err);
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionState('denied');
        onPermission?.('denied');
      } else {
        setPermissionState('prompt');
        onPermission?.('prompt');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Retry camera access
  const retryCameraAccess = () => {
    setPermissionState('prompt');
    setError(null);
    setStream(null);
    setDeviceLabel('');
    onPermission?.('prompt');
  };

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  if (!enabled) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className={`relative bg-gray-100 rounded-lg overflow-hidden ${className}`}>
        <div className="animate-pulse bg-gray-200 h-full w-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-32 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Permission denied state
  if (permissionState === 'denied') {
    return (
      <div className={`relative bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-center h-full min-h-[200px]">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Camera Access Denied
            </h3>
            <p className="text-red-600 mb-4 max-w-sm">
              Please enable camera access in your browser settings to use the webcam feature.
            </p>
            <button
              onClick={retryCameraAccess}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Permission prompt state
  if (permissionState === 'prompt') {
    return (
      <div className={`relative bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-center h-full min-h-[200px]">
          <div className="text-center">
            <Camera className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Camera Access Required
            </h3>
            <p className="text-blue-600 mb-4 max-w-sm">
              Enable your camera to enhance the reaction time assessment with visual monitoring.
            </p>
            <button
              onClick={requestCameraAccess}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Camera className="w-4 h-4 mr-2" />
              Request Camera Access
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Camera active state
  if (permissionState === 'granted' && stream) {
    return (
      <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
        <Suspense fallback={
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-600 rounded w-32 mx-auto animate-pulse"></div>
            </div>
          </div>
        }>
          <ReactWebcam
            audio={false}
            videoConstraints={{
              width: { ideal: 640 },
              height: { ideal: 480 },
              facingMode: 'user'
            }}
            className="w-full h-full object-cover"
            screenshotFormat="image/jpeg"
            screenshotQuality={0.8}
          />
        </Suspense>
        
        {/* Camera status indicator */}
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          Live
        </div>
        
        {/* Device label */}
        {deviceLabel && (
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            {deviceLabel}
          </div>
        )}
      </div>
    );
  }

  // Fallback state
  return (
    <div className={`relative bg-gray-100 border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-center h-full min-h-[200px]">
        <div className="text-center">
          <CameraOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Camera not available</p>
        </div>
      </div>
    </div>
  );
};

export default WebcamPane;
