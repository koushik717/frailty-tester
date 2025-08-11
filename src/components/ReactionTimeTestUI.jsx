import React from 'react';
import classNames from 'classnames';

// Semantic class constants - METY brand styling
const containerClasses = "min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6";
const cardContainerClasses = "bg-white rounded-xl shadow-lg border border-gray-200 max-w-4xl w-full p-8";
const titleClasses = "font-brandHeading text-3xl font-bold text-brand-primary mb-6 text-center";
const instructionClasses = "font-brandBody text-lg text-brand-neutral mb-8 text-center leading-relaxed";
const buttonGroupClasses = "flex flex-col sm:flex-row gap-4 justify-center mb-8";
const primaryButtonClasses = classNames(
  "px-8 py-4 rounded-lg font-semibold text-white text-lg font-brandBody",
  "bg-brand-primary hover:bg-red-700",
  "transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
  "focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
);
const disabledButtonClasses = "px-8 py-4 rounded-lg font-semibold text-white text-lg bg-gray-300 cursor-not-allowed opacity-60 font-brandBody";
const testStatusClasses = "font-brandHeading text-xl font-semibold text-brand-primary mb-4 text-center";
const progressContainerClasses = "w-full max-w-md mx-auto mb-6";
const progressBarClasses = "w-full h-3 bg-gray-200 rounded-full overflow-hidden";
const progressFillClasses = "h-full bg-brand-primary transition-all duration-300 ease-out";
const responseButtonClasses = classNames(
  "px-8 py-4 rounded-lg font-semibold text-white text-xl font-brandBody",
  "transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
  "focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
);
const resultsContainerClasses = "bg-white rounded-xl shadow-lg border border-gray-200 max-w-2xl w-full p-8";
const resultsTitleClasses = "font-brandHeading text-2xl font-bold text-brand-primary mb-6 text-center";
const resultItemClasses = "flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0";
const resultLabelClasses = "font-brandBody text-lg text-brand-neutral";
const resultValueClasses = "font-brandBody text-xl font-semibold text-brand-primary";
const practiceModeClasses = "font-brandBody text-lg text-brand-accent font-semibold text-center mt-4";
const stimulusContainerClasses = "absolute p-3 bg-white rounded-lg shadow-lg border border-gray-200";
const stimulusImageClasses = "w-32 h-32 object-cover rounded";

const ReactionTimeTestUI = ({
  start,
  practice,
  testComplete,
  showStimulus,
  stimulusPosition,
  trialCount,
  correctClicks,
  incorrectClicks,
  buttonColor,
  progress,
  isTestActive,
  handleResponse,
  startRealTest,
  startPracticeTest,
  resetTest,
  totalTrials,
  allowPractice,
  submittedToday,
  text = {
    title: "Reaction Time Assessment",
    instructions: "You will be shown a button and series of 20 pictures. When the picture appears, click the button once as quickly as possible. You will be penalized for excess clicks.",
    start: "Begin Assessment",
    practice: "Practice Run",
    correct: "Correct Clicks",
    incorrect: "Incorrect Clicks",
    misses: "Missed Clicks",
    accuracy: "Accuracy",
    avgReactionTime: "Average Reaction Time",
    score: "Score",
    alreadySubmitted: "Assessment already completed today",
    clickHere: "Click Here!",
    pleaseClick: "Click the button below when you see the stimulus image.",
    trialProgress: "Trial",
    of: "of"
  },
  results = null,
  stimulusImage = "https://iheartcraftythings.com/wp-content/uploads/2021/11/6-48.jpg",
  customStyles = {},
  theme = 'default'
}) => {
  // Test in progress
  if (isTestActive) {
    return (
      <div className={containerClasses}>
        <div className={cardContainerClasses}>
          
          <div className="text-center">
            <h2 className={testStatusClasses}>
              {text.pleaseClick}
            </h2>
            
            <div className="mb-6">
              <div className="font-brandBody text-lg text-brand-neutral mb-2">
                <span className="font-semibold">Correct Clicks:</span> {correctClicks}
              </div>
              <div className="font-brandBody text-lg text-brand-neutral mb-2">
                <span className="font-semibold">{text.trialProgress} {trialCount} {text.of} {totalTrials}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className={progressContainerClasses}>
              <div 
                className={progressBarClasses}
                role="progressbar"
                aria-valuenow={Math.round(progress * 100)}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label={`Progress: ${Math.round(progress * 100)}% complete`}
              >
                <div 
                  className={progressFillClasses}
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>

            <button
              className={classNames(responseButtonClasses, "bg-brand-primary hover:bg-red-700")}
              onClick={handleResponse}
              aria-label={`${text.clickHere} - Click when you see the stimulus image`}
              type="button"
            >
              {text.clickHere}
            </button>
          </div>

          {/* Stimulus */}
          {showStimulus && (
            <div
              className={stimulusContainerClasses}
              style={{
                top: stimulusPosition.top,
                left: stimulusPosition.left,
              }}
              role="img"
              aria-label="Stimulus image - Click the button when you see this image"
            >
              <img
                src={stimulusImage}
                alt="Stimulus image - Click the button when you see this image"
                className={stimulusImageClasses}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Test complete - show results
  if (testComplete && results) {
    return (
      <div className={containerClasses}>
        <div className={resultsContainerClasses}>
          <h2 className={resultsTitleClasses}>
            Assessment Results
          </h2>
          
          <div className="space-y-2">
            <div className={resultItemClasses}>
              <span className={resultLabelClasses}>✅ {text.correct}</span>
              <span className={resultValueClasses}>{results.correctClicks}</span>
            </div>
            <div className={resultItemClasses}>
              <span className={resultLabelClasses}>❌ {text.incorrect}</span>
              <span className={resultValueClasses}>{results.incorrectClicks}</span>
            </div>
            <div className={resultItemClasses}>
              <span className={resultLabelClasses}>🚫 {text.misses}</span>
              <span className={resultValueClasses}>{results.missedClicks}</span>
            </div>
            <div className={resultItemClasses}>
              <span className={resultLabelClasses}>🎯 {text.accuracy}</span>
              <span className={resultValueClasses}>{results.accuracy}%</span>
            </div>
            <div className={resultItemClasses}>
              <span className={resultLabelClasses}>⏱ {text.avgReactionTime}</span>
              <span className={resultValueClasses}>{results.averageReactionTime} sec</span>
            </div>
            <div className={resultItemClasses}>
              <span className={resultLabelClasses}>🏆 {text.score}</span>
              <span className={resultValueClasses}>{results.score}</span>
            </div>
          </div>

          {practice && (
            <>
              <div className={practiceModeClasses}>
                📝 Practice Mode
              </div>
              <div className="text-center mt-6">
                <button 
                  className={primaryButtonClasses}
                  onClick={resetTest}
                  aria-label="Try practice test again"
                  type="button"
                >
                  Try Again
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Initial state - show instructions and start buttons
  return (
    <div className={containerClasses}>
      <div className={cardContainerClasses}>
        <div className="text-center">
          <h1 className={titleClasses}>
            {text.title}
          </h1>
          
          <p className={instructionClasses}>
            {text.instructions}
          </p>

          {!submittedToday && (
            <div className={buttonGroupClasses}>
              <button 
                className={primaryButtonClasses}
                onClick={startRealTest}
                aria-label={`${text.start} - Begin the actual assessment`}
                type="button"
              >
                {text.start}
              </button>
              {allowPractice && (
                <button 
                  className={primaryButtonClasses}
                  onClick={startPracticeTest}
                  aria-label={`${text.practice} - Try a practice run first`}
                  type="button"
                >
                  {text.practice}
                </button>
              )}
            </div>
          )}

          {submittedToday && (
            <div className={buttonGroupClasses}>
              <button 
                className={disabledButtonClasses}
                disabled
                aria-label={`${text.start} - Already completed today`}
                type="button"
              >
                {text.start}
              </button>
              {allowPractice && (
                <button 
                  className={primaryButtonClasses}
                  onClick={startPracticeTest}
                  aria-label={`${text.practice} - Try a practice run`}
                  type="button"
                >
                  {text.practice}
                </button>
              )}
              <p className="font-brandBody text-lg text-brand-neutral text-center mt-4">
                {text.alreadySubmitted}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReactionTimeTestUI; 