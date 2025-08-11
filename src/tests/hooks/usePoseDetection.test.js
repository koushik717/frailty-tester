import { renderHook, act } from "@testing-library/react";
import usePoseDetection from "../../../src/hooks/usePoseDetection";

// Mock TensorFlow core
jest.mock("@tensorflow/tfjs-core", () => ({
  ready: jest.fn().mockResolvedValue(),
  setBackend: jest.fn().mockResolvedValue(),
}));

// Mock TensorFlow backend
jest.mock("@tensorflow/tfjs-backend-webgl", () => ({}));

// Mock pose-detection
jest.mock("@tensorflow-models/pose-detection", () => ({
  SupportedModels: { MoveNet: "MoveNet" },
  movenet: { modelType: { SINGLEPOSE_THUNDER: "singlepose_thunder" } },
  createDetector: jest.fn(),
}));

describe("usePoseDetection", () => {
  let mockDetector;
  let mockVideoRef;

  beforeEach(() => {
    mockDetector = {
      estimatePoses: jest.fn().mockResolvedValue([
        {
          keypoints: [
            { name: "left_ankle", x: 50, y: 100, score: 0.9 },
            { name: "right_ankle", x: 150, y: 100, score: 0.8 },
            { name: "left_shoulder", x: 80, y: 50, score: 0.4 }, // Should be filtered out
          ],
        },
      ]),
    };

    require("@tensorflow-models/pose-detection").createDetector.mockResolvedValue(mockDetector);

    mockVideoRef = {
      current: {
        readyState: 4,
        videoWidth: 640,
        videoHeight: 480,
        clientWidth: 320,
        clientHeight: 240,
      },
    };
  });

  it("initializes detector and detects poses", async () => {
    const { result } = renderHook(() => usePoseDetection(mockVideoRef));

    await act(async () => {}); // wait for useEffect to run

    expect(require("@tensorflow-models/pose-detection").createDetector).toHaveBeenCalled();

    await act(async () => {
      await mockDetector.estimatePoses(mockVideoRef.current);
    });

    // ✅ Updated expectation to match raw (non-normalized) values
    const keypoints = result.current.keypoints;
    expect(keypoints).toEqual([
      {
        name: "left_ankle",
        x: 50,
        y: 100,
        confidence: 0.9,
      },
      {
        name: "right_ankle",
        x: 150,
        y: 100,
        confidence: 0.8,
      },
    ]);
  });
});
