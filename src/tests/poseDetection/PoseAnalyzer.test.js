import { analyzeKeypoints } from "../../components/poseDetection/PoseAnalyzer";

describe("analyzeKeypoints", () => {
  let stateMock;

  beforeAll(() => {
    jest.useFakeTimers(); // Enable fake timers globally for delayed calls
  });

  beforeEach(() => {
    stateMock = {
      isFootInAirRef: { current: false },
      startTimer: jest.fn(),
      stopTimer: jest.fn(),
      currentFoot: "left",
      setWrongLeg: jest.fn(),
      onFootDrop: jest.fn(), // Only used if your implementation includes it
    };
    jest.clearAllTimers(); // Clear timers before each test
  });

  it("should stop the timer if keypoints are missing or confidence is too low", () => {
    const keypoints = [];
    analyzeKeypoints(keypoints, stateMock);

    expect(stateMock.stopTimer).toHaveBeenCalled();
  });

  it("should trigger a warning and stop the timer if the wrong leg is raised", () => {
    const keypoints = [
      { name: "left_ankle", y: 200, score: 0.9 },
      { name: "right_ankle", y: 100, score: 0.9 },
    ];
    stateMock.currentFoot = "left";

    analyzeKeypoints(keypoints, stateMock);

    expect(stateMock.setWrongLeg).toHaveBeenCalledWith(true);
    expect(stateMock.stopTimer).toHaveBeenCalled();
  });

  it("should start the timer if the correct foot is raised", () => {
    const keypoints = [
      { name: "left_ankle", y: 100, score: 0.9 },
      { name: "right_ankle", y: 200, score: 0.9 },
    ];

    analyzeKeypoints(keypoints, stateMock);

    expect(stateMock.setWrongLeg).toHaveBeenCalledWith(false);
    expect(stateMock.startTimer).toHaveBeenCalled();
    expect(stateMock.isFootInAirRef.current).toBe(true);
  });

  it("should stop the timer if both feet are on the ground", () => {
    stateMock.isFootInAirRef.current = true;

    const keypoints = [
      { name: "left_ankle", y: 300, score: 0.9 },
      { name: "right_ankle", y: 305, score: 0.9 },
    ];

    analyzeKeypoints(keypoints, stateMock);

    jest.runAllTimers(); // Required to trigger delayed logic

    expect(stateMock.stopTimer).toHaveBeenCalled();
    expect(stateMock.isFootInAirRef.current).toBe(false);
  });
});
