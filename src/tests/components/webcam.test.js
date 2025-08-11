import React, { createRef } from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, act } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import WebcamComponent from "../../components/webCam/Webcam";

beforeAll(() => {
  global.MediaStream = jest.fn();
  global.navigator.mediaDevices = {
    getUserMedia: jest.fn().mockResolvedValue(new MediaStream()),
  };
});

const mockStore = configureStore([]);
let store;

beforeEach(() => {
  store = mockStore({
    webcam: {
      deviceId: null,
      resolution: { width: 640, height: 480 },
    },
  });
});

describe("WebcamComponent", () => {
  test("renders the webcam feed", async () => {
    const videoRef = createRef();

    await act(async () => {
      render(
        <Provider store={store}>
          <WebcamComponent ref={videoRef} />
        </Provider>
      );
    });

    const webcamElement = await waitFor(() => screen.getByTestId("webcam-feed"));
    expect(webcamElement).toBeInTheDocument();
  });

  test("uses overrideDeviceId when provided", async () => {
    const videoRef = createRef();

    await act(async () => {
      render(
        <Provider store={store}>
          <WebcamComponent ref={videoRef} overrideDeviceId="test-device-id" />
        </Provider>
      );
    });

    await waitFor(() => screen.getByTestId("webcam-feed"));
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith(
      expect.objectContaining({
        video: expect.objectContaining({
          deviceId: "test-device-id",
        }),
      })
    );
  });

  test("calls getUserMedia with expected video constraints", async () => {
    const videoRef = { current: document.createElement("video") };

    await act(async () => {
      render(
        <Provider store={store}>
          <WebcamComponent ref={videoRef} />
        </Provider>
      );
    });

    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith(
      expect.objectContaining({
        video: expect.objectContaining({
          width: 640,
          height: 480,
        }),
      })
    );
  });

  test("sets videoRef.current.srcObject to the MediaStream", async () => {
    const mockStream = new MediaStream();
    navigator.mediaDevices.getUserMedia.mockResolvedValueOnce(mockStream);

    const videoRef = { current: document.createElement("video") };

    await act(async () => {
      render(
        <Provider store={store}>
          <WebcamComponent ref={videoRef} />
        </Provider>
      );
    });

    expect(videoRef.current.srcObject).toBe(mockStream);
  });

  test("logs error when camera access is denied", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    navigator.mediaDevices.getUserMedia.mockRejectedValueOnce(new Error("Permission denied"));

    const videoRef = { current: document.createElement("video") };

    await act(async () => {
      render(
        <Provider store={store}>
          <WebcamComponent ref={videoRef} />
        </Provider>
      );
    });

    expect(consoleSpy).toHaveBeenCalledWith("Webcam error:", expect.any(Error));
    consoleSpy.mockRestore();
  });
});
