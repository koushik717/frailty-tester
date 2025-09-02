import React from "react";

/**
 * Displays a message when camera access is denied by the user or browser.
 * Uses Tailwind CSS for styling and maintains fixed aspect ratio for video replacement.
 * 
 * @component
 * @example
 * return <PermissionDenied />
 */
const PermissionDenied = () => (
  <div
    className="flex flex-col justify-center items-center p-8 rounded-2xl bg-gray-500 text-white text-lg font-semibold"
    style={{
      maxWidth: "940px", 
      maxHeight: "675px",
      width: "100%",
      height: "675px",
      aspectRatio: "940 / 675",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div className="mb-4 text-3xl font-bold text-center">Camera Access Denied</div>
    <div className="max-w-md text-lg text-center">
      To use the Balance Test, please allow camera access in your browser settings.
    </div>
  </div>
);

export default PermissionDenied;

