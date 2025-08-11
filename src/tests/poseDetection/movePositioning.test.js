import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import MovePositioning from "../../components/poseDetection/MovePositioning";
import { updatePositionStatus } from "../../store/slices/positionSlice";

const mockStore = configureStore([]);

describe("MovePositioning", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      stage: { step: 0 },
      position: { status: "Positioning..." },
    });
    store.clearActions();
  });

  test("dispatches 'Move Backward' action if no keypoints", () => {
    // Render with an empty keypoints array
    render(
      <Provider store={store}>
        <MovePositioning keypoints={[]} />
      </Provider>
    );

    // The code calls: dispatch(updatePositionStatus("Move Backward"));
    // Let's confirm that was indeed dispatched:
    const actions = store.getActions();
    expect(actions).toContainEqual(updatePositionStatus("Move Backward"));
  });

  test("dispatches 'Position Correct' action when boundingBoxArea is in range", () => {
    // boundingBoxArea: (150-100)*(400-100)= 50*300=15000 => exactly on threshold
    const mockKeypoints = [
      { name: "left_shoulder", x: 100, y: 100 },
      { name: "right_shoulder", x: 150, y: 100 },
      { name: "left_ankle", x: 100, y: 400 },
      { name: "right_ankle", x: 150, y: 400 },
    ];

    // Force the store's initial "position: { status: ... }" to show anything
    render(
      <Provider store={store}>
        <MovePositioning keypoints={mockKeypoints} />
      </Provider>
    );

    // Check that "Position Correct" was dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual(updatePositionStatus("Position Correct"));
  });
});
