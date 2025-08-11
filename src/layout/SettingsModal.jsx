import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDeviceId } from "../store/slices/webcamSlice";
import WebcamComponent from "../components/webCam/Webcam";

const SettingsModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const selectedDeviceId = useSelector((state) => state.webcam.deviceId);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(selectedDeviceId);
  const [showWebcamSettings, setShowWebcamSettings] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchDevices = async () => {
      const devicesList = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devicesList.filter(device => device.kind === "videoinput");
      setDevices(videoDevices);
    };
    fetchDevices();
  }, []);

  const handleDeviceChange = (e) => {
    const deviceId = e.target.value;
    setSelectedDevice(deviceId);
    dispatch(setDeviceId(deviceId));
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
      style={{ zIndex: 9999 }}
    >
      <div className="bg-white p-6 rounded-md shadow-md w-[800px] max-h-[90vh] overflow-y-auto flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-center w-full">Settings</h2>

        {!showWebcamSettings ? (
          /* -------------------------------------------
             MAIN SETTINGS MENU
          ------------------------------------------- */
          <div className="flex flex-col items-center space-y-4 w-full">

            {/* Webcam Settings Button */}
            <button
              onClick={() => setShowWebcamSettings(true)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              Webcam Settings
            </button>
            
            {/* Close Button (Yellow) Underneath */}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md"
            >
              Close
            </button>
          </div>
        ) : (
          /* -------------------------------------------
             WEBCAM SETTINGS MENU
          ------------------------------------------- */
          <div className="flex flex-col items-center space-y-4 w-full">
            
            <label className="block font-medium">Select Webcam:</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedDevice || ""}
              onChange={handleDeviceChange}
            >
              <option value="">Default Device</option>
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${device.deviceId}`}
                </option>
              ))}
            </select>

            {/* Live Preview */}
            <div className="relative w-[640px] h-[480px] shadow-lg rounded-lg overflow-hidden border border-gray-300">
              <WebcamComponent ref={videoRef} overrideDeviceId={selectedDevice} />
            </div>
            
            {/* Back Button */}
            <button
              onClick={() => setShowWebcamSettings(false)}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
            >
              Back to Main Settings
            </button>

            {/* Close Button (Yellow) Underneath */}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsModal;
