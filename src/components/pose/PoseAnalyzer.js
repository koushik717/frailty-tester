/**
 * @file PoseAnalyzer.js
 * Uses a grace period before confirming a foot drop.
 */

let footDownTimeout = null;
const GRACE_PERIOD_MS = 300; // 300ms grace, adjust as you like

export const analyzeKeypoints = (keypoints, state) => {
  const { 
    isFootInAirRef, 
    startTimer, 
    stopTimer, 
    currentFoot, 
    setWrongLeg,
    onFootDrop // callback to notify test screen that test ended
  } = state;

  const leftAnkle = keypoints.find((kp) => kp.name === "left_ankle");
  const rightAnkle = keypoints.find((kp) => kp.name === "right_ankle");

  // Stop if ankles missing or confidence is too low
  if (!leftAnkle || !rightAnkle || leftAnkle.score < 0.5 || rightAnkle.score < 0.5) {
    stopTimer();
    return;
  }

  const threshold = 50;
  const isLeftFootRaised = leftAnkle.y < (rightAnkle.y - threshold);
  const isRightFootRaised = rightAnkle.y < (leftAnkle.y - threshold);

  // Wrong foot check
  if ((currentFoot === "left" && isRightFootRaised) ||
      (currentFoot === "right" && isLeftFootRaised)) {
    setWrongLeg(true);
    stopTimer();
    return;
  } else {
    setWrongLeg(false);
  }

  if (isLeftFootRaised || isRightFootRaised) {
    // Foot is up => clear any foot-down timer
    if (footDownTimeout) {
      clearTimeout(footDownTimeout);
      footDownTimeout = null;
    }
    // If foot wasn't in air, start the timer
    if (!isFootInAirRef.current) {
      isFootInAirRef.current = true;
      startTimer();
    }
  } else {
    // Foot is down => potential foot drop, start grace period if not already
    if (isFootInAirRef.current && !footDownTimeout) {
      footDownTimeout = setTimeout(() => {
        // After grace, if foot is STILL down, confirm drop
        if (isFootInAirRef.current) {
          isFootInAirRef.current = false;
          stopTimer();

          // Let the test screen know the test truly ended
          if (onFootDrop) {
            onFootDrop();
          }
        }
        footDownTimeout = null;
      }, GRACE_PERIOD_MS);
    }
  }
};

export default { analyzeKeypoints };

