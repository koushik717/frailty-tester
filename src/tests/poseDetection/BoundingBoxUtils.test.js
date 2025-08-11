import { drawBoundingBox } from "../../components/poseDetection/BoundingBoxUtils";

describe("drawBoundingBox", () => {
  let ctxMock;

  //  Set up a mock canvas context before each test
  beforeEach(() => {
    ctxMock = {
      strokeStyle: "",
      lineWidth: 0,
      strokeRect: jest.fn(),   // Mock for drawing rectangle
      fillStyle: "",
      font: "",
      fillText: jest.fn(),     // Mock for drawing text
    };
  });

  it("does nothing if no boundingBox is provided", () => {
    //  Ensure it exits early when input is null
    drawBoundingBox(ctxMock, null);

    //  No canvas methods should be called
    expect(ctxMock.strokeRect).not.toHaveBeenCalled();
    expect(ctxMock.fillText).not.toHaveBeenCalled();
  });

  it("draws bounding box correctly with provided data", () => {
    const boundingBox = {
      x: 10,
      y: 20,
      width: 100,
      height: 200,
      area: 5000,
    };

    //  Call the function with a valid bounding box
    drawBoundingBox(ctxMock, boundingBox);

    //  Style checks
    expect(ctxMock.strokeStyle).toBe("green");
    expect(ctxMock.lineWidth).toBe(3);

    //  Check that rectangle was drawn with correct dimensions
    expect(ctxMock.strokeRect).toHaveBeenCalledWith(10, 20, 100, 200);

    //  Check that area text was rendered properly
    expect(ctxMock.fillStyle).toBe("white");
    expect(ctxMock.font).toBe("16px Arial");
    expect(ctxMock.fillText).toHaveBeenCalledWith(
      "Area: 5000.00",   // Rounded to 2 decimals
      15,                // x + 5
      40                 // y + 20
    );
  });
});
