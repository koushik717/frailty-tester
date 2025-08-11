const PoseRenderer = (ctx, keypoints, resolution) => {
  if (!ctx || keypoints.length === 0) return;

  // For reference, resolution.width & resolution.height are available if needed
  // If you do any scaling based on resolution, do it here.

  // Skeleton edges
  const skeletonEdges = {
    left: [
      ["left_shoulder", "left_elbow"],
      ["left_elbow", "left_wrist"],
      ["left_shoulder", "left_hip"],
      ["left_hip", "left_knee"],
      ["left_knee", "left_ankle"]
    ],
    right: [
      ["right_shoulder", "right_elbow"],
      ["right_elbow", "right_wrist"],
      ["right_shoulder", "right_hip"],
      ["right_hip", "right_knee"],
      ["right_knee", "right_ankle"]
    ],
    center: [
      ["left_shoulder", "right_shoulder"],
      ["left_hip", "right_hip"]
    ]
  };

  const getKeypoint = (name) => keypoints.find((kp) => kp.name === name && kp.confidence > 0.5);

  const drawLine = (p1, p2) => {
    if (!p1 || !p2) return;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  // Draw skeleton
  Object.values(skeletonEdges).flat().forEach(([start, end]) => {
    drawLine(getKeypoint(start), getKeypoint(end));
  });

  // Draw keypoints
  keypoints.forEach(({ x, y, confidence }) => {
    if (confidence > 0.5) {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    }
  });
};

export default PoseRenderer;
