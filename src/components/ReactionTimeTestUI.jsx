import React from 'react';
import classNames from 'classnames';
import boyImage from '../assets/tests/reaction-time/boy.png';

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
const boyImageClasses = "w-32 h-32 object-cover rounded-lg shadow-md";

const ReactionTimeTestUI = ({
  // Hook state
  status,
  countdownNum,
  trialIndex,
  totalTrials,
  practiceTrials,
  showCue,
  earlyClick,
  results,
  
  // Hook actions
  start,
  onClick,
  reset,
  summary,
  
  // Legacy props for compatibility
  text = {
    title: "Reaction Time Assessment",
    instructions: "You will see a boy image appear on screen. Click the button as quickly as possible when you see the boy.",
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
    pleaseClick: "Click the button below when you see the boy image.",
    trialProgress: "Trial",
    of: "of"
  },
  results: legacyResults = null,
  stimulusImage = boyImage,
  customStyles = {},
  theme = 'default'
}) => {
  // Countdown state
  if (status === 'countdown') {
    return (
      <div className={containerClasses}>
        <div className={cardContainerClasses}>
          <div className="text-center">
            <div 
              className="text-8xl font-bold text-brand-primary mb-8"
              aria-live="polite"
              aria-label={`Countdown: ${countdownNum}`}
            >
              {countdownNum}
            </div>
            <p className="text-xl font-brandBody text-brand-neutral">
              Get ready...
            </p>
            <button 
              className={disabledButtonClasses}
              disabled
              type="button"
            >
              Wait for countdown
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Test in progress
  if (status === 'ready' || status === 'clicked') {
    const isPractice = trialIndex < practiceTrials;
    const currentTrial = trialIndex + 1;
    const totalTrialCount = isPractice ? practiceTrials : practiceTrials + totalTrials;
    const progress = currentTrial / totalTrialCount;
    
    return (
      <div className={containerClasses}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[260px,1fr] gap-6 items-start">
          {/* Boy Image Card - Left side on desktop, top on mobile */}
          <div className="w-full md:w-auto">
            <div className="bg-white rounded-xl border shadow-sm p-4 md:p-5 text-center">
              <h3 className="text-brand-primary font-brandHeading text-sm md:text-base font-semibold mb-3">
                {isPractice ? 'Practice Trial' : 'Test Trial'}
              </h3>
              
              {/* Boy Image - Only show when cue is active */}
              {showCue && (
                <div className="mb-3">
                  <img
                    src={boyImage}
                    alt="Boy cue"
                    className="w-28 h-28 md:w-32 md:h-32 object-contain mx-auto"
                  />
                  <p className="text-xs text-brand-neutral mt-1">
                    Click now!
                  </p>
                  {/* Visually hidden live text for accessibility */}
                  <span className="sr-only" aria-live="polite">
                    Cue visible — click now!
                  </span>
                </div>
              )}
              
              {/* Early Click Warning */}
              {earlyClick && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3">
                  <p className="text-xs text-yellow-800 font-medium">
                    ⚠️ Too soon — wait for the boy
                  </p>
                </div>
              )}
              
              {/* Trial Progress */}
              <div className="text-xs text-brand-neutral">
                <p>Trial {currentTrial} of {totalTrialCount}</p>
                {isPractice && (
                  <p className="text-brand-accent font-medium">Practice Mode</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Main Test Interface */}
          <div className="w-full">
            <div className={cardContainerClasses}>
              <div className="text-center">
                <h2 className={testStatusClasses}>
                  {text.pleaseClick}
                </h2>
                
                {/* Progress Bar */}
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
                
                {/* Response Button */}
                <button
                  className={classNames(responseButtonClasses, "bg-brand-primary hover:bg-red-700")}
                  onClick={onClick}
                  aria-label={`${text.clickHere} - Click when you see the boy image`}
                  type="button"
                >
                  {text.clickHere}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Test complete - show results
  if (status === 'done') {
    const summaryData = summary();
    const isPractice = trialIndex <= practiceTrials;
    
    return (
      <div className={containerClasses}>
        <div className={resultsContainerClasses}>
          <h2 className={resultsTitleClasses}>
            Assessment Results
          </h2>
          
          <div className="space-y-2">
            <div className={resultItemClasses}>
              <span className={resultLabelClasses}>✅ Valid Clicks</span>
              <span className={resultValueClasses}>{summaryData.validCount}</span>
            </div>
            <div className={resultItemClasses}>
              <span className={resultLabelClasses}>⏱ Average Time</span>
              <span className={resultValueClasses}>{summaryData.avg}ms</span>
            </div>
            <div className={resultItemClasses}>
              <span className={resultLabelClasses}>🚀 Fastest</span>
              <span className={resultValueClasses}>{summaryData.fastest}ms</span>
            </div>
            <div className={resultItemClasses}>
              <span className={resultLabelClasses}>🐌 Slowest</span>
              <span className={resultValueClasses}>{summaryData.slowest}ms</span>
            </div>
          </div>

          {isPractice && (
            <>
              <div className={practiceModeClasses}>
                📝 Practice Mode Complete
              </div>
              <div className="text-center mt-6">
                <button 
                  className={primaryButtonClasses}
                  onClick={() => start({ practice: false })}
                  aria-label="Start actual test"
                  type="button"
                >
                  Start Actual Test
                </button>
              </div>
            </>
          )}
          
          {!isPractice && (
            <div className="text-center mt-6">
              <button 
                className={primaryButtonClasses}
                onClick={reset}
                aria-label="Try test again"
                type="button"
              >
                Try Again
              </button>
            </div>
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

          <div className={buttonGroupClasses}>
            <button 
              className={primaryButtonClasses}
              onClick={() => start({ practice: true })}
              aria-label={`${text.start} - Begin the assessment`}
              type="button"
            >
              {text.start}
            </button>
            
            <button 
              className={primaryButtonClasses}
              onClick={() => start({ practice: false })}
              aria-label={`${text.practice} - Skip practice and start actual test`}
              type="button"
            >
              Skip Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactionTimeTestUI; 