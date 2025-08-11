import React from "react";

/**
 * @file Skeleton.jsx
 * @description Displays detected pose keypoints as red circles using an SVG overlay.
 */

/**
 * Skeleton Component - Renders pose keypoints onto an SVG canvas.
 * @param {Object} props - Component properties.
 * @param {Array} props.keypoints - Array of detected pose keypoints.
 * @returns {JSX.Element} The skeleton overlay displaying keypoints.
 */
const Skeleton = ({ keypoints }) => {
  // Display loading message if no keypoints are detected
  if (!keypoints || keypoints.length === 0) {
    console.warn("No keypoints detected yet...");
    return <p>Loading pose detection...</p>;
  }

  return (
    <div className="skeleton-overlay">
      {/* SVG canvas for rendering keypoints */}
      <svg width="640" height="480">
        {keypoints.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="red" // Red dots represent detected keypoints
          />
        ))}
      </svg>
    </div>
  );
};

export default Skeleton;
