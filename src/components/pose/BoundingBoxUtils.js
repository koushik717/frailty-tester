export const drawBoundingBox = (ctx, boundingBox) => {
  if (!boundingBox) return;

  // Set bounding box style
  ctx.strokeStyle = "green";
  ctx.lineWidth = 3;

  // Draw the bounding box on the canvas
  ctx.strokeRect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);

  // Display the area inside the box for debugging
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(`Area: ${boundingBox.area.toFixed(2)}`, boundingBox.x + 5, boundingBox.y + 20);
};

