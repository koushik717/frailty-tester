import React from "react";

/**
 * Displays a message when camera access is denied by the user or browser.
 * Uses Tailwind CSS for styling and maintains fixed aspect ratio for video replacement.
 * 
 * @component
 * @example
 * return <PermissionDeniedMessage />
 */
const PermissionDeniedMessage = () => (
  <section
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
    role="alert"
    aria-labelledby="camera-access-heading"
    aria-describedby="camera-access-instructions"
  >
    <h1 
      id="camera-access-heading"
      className="mb-4 text-3xl font-bold text-center"
    >
      Camera Access Denied
    </h1>
    
    <div 
      id="camera-access-instructions"
      className="max-w-md text-lg text-center"
      role="contentinfo"
    >
      <p>
        To use the Frailty Tester, please allow camera access in your browser settings.
      </p>
      <p className="mt-2 text-sm">
        The camera is required for pose detection during balance and movement assessments.
      </p>
    </div>

    {/* Hidden instructions for screen readers */}
    <div className="sr-only">
      <p>
        This assessment requires camera access to detect your body position and movements. 
        Please check your browser's privacy settings and ensure camera permissions are enabled for this website.
      </p>
      <p>
        Common steps to enable camera access:
        1. Look for a camera icon in your browser's address bar
        2. Click the icon and select "Allow" for camera access
        3. Refresh the page to restart the assessment
      </p>
    </div>
  </section>
);

export default PermissionDeniedMessage;