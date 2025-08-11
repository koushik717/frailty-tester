import React from "react";

/**
 * Renders the balance test instructions.
 * @returns {JSX.Element} - The balance test instructions element.
 */
const BalanceTestInstructions = () => (
  <>
    <h2 className="text-2xl text-center font-bold mb-4">Balance Test Instructions</h2>
    <h3 className="text-lg font-semibold mb-3">Trial Attempts</h3>
    <ol className="list-decimal list-inside mb-4">
      <li className="mb-2">
        Stand on one leg for 30 seconds. Start with your right leg.
      </li>
      <li className="mb-2">
        Repeat the same with your left leg.
      </li>
      <li className="mb-2">
        You have 3 tries:
        <ul className="list-disc list-inside ml-4">
          <li>1st try: Practice.</li>
          <li>Next 2 tries: Best result counts.</li>
        </ul>
      </li>
    </ol>
  </>
);

/**
 * Renders the note section.
 * @returns {JSX.Element} - The note section element.
 */
const NoteSection = () => (
  <p className="text-sm text-gray-700 mb-4">
    <strong>Note:</strong> Make sure you stay visible in the camera and follow the on-screen instructions carefully. Good luck!
  </p>
);

/**
 * Renders the recording toggle button.
 * @param {Object} props - The component props.
 * @param {boolean} props.isRecording - Indicates if recording is in progress.
 * @param {Function} props.toggleRecording - Function to toggle the recording state.
 * @returns {JSX.Element} - The recording toggle button element.
 */
const RecordingToggleButton = ({ isRecording, toggleRecording }) => (
  <button
    onClick={toggleRecording}
    className="px-4 py-2 bg-lightBlue hover:bg-darkBlue text-white font-semibold rounded-md mt-4"
  >
    {isRecording ? "Stop Recording" : "Start Recording"}
  </button>
);

/**
 * SideInfo Component - Renders the side information panel with balance test instructions and recording toggle button.
 * @param {Object} props - The component props.
 * @param {boolean} props.isRecording - Indicates if recording is in progress.
 * @param {Function} props.toggleRecording - Function to toggle the recording state.
 * @returns {JSX.Element} - The side information panel element.
 */
const SideInfo = ({ isRecording, toggleRecording }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <BalanceTestInstructions />
      <NoteSection />
      <RecordingToggleButton isRecording={isRecording} toggleRecording={toggleRecording} />
    </div>
  );
};

export default SideInfo;