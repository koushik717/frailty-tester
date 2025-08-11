import React from "react";
import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import PoseCanvas from "../../components/poseDetection/PoseCanvas";
import * as rendererModule from "../../components/poseDetection/PoseRenderer";

// Fix the mock path to match the import path
jest.mock("../../components/poseDetection/PoseRenderer", () => jest.fn());

describe("PoseCanvas", () => {
  let store;
  let mockStore;
  let videoRef;

  beforeAll(() => {
    mockStore = configureStore([]);
  });

  beforeEach(() => {
    store = mockStore({
      position: { boundingBox: null },
    });
    videoRef = {
      current: {
        videoWidth: 640,
        videoHeight: 480,
      },
    };
    rendererModule.default.mockClear();
  });

  test("renders the canvas element", () => {
    render(
      <Provider store={store}>
        <PoseCanvas videoRef={videoRef} keypoints={[]} />
      </Provider>
    );

    const canvas = screen.getByTestId("pose-canvas");
    expect(canvas).toBeInTheDocument();
  });

  test("calls PoseRenderer when keypoints exist", () => {
    const testKeypoints = [
      { name: "left_ankle", x: 100, y: 200, confidence: 0.9 },
    ];

    act(() => {
      render(
        <Provider store={store}>
          <PoseCanvas videoRef={videoRef} keypoints={testKeypoints} />
        </Provider>
      );
    });

    expect(rendererModule.default).toHaveBeenCalledTimes(1);
    expect(rendererModule.default).toHaveBeenCalledWith(
      expect.any(Object),
      testKeypoints,
      expect.any(Object)
    );
  });
});
