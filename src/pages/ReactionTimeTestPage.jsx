import React, { useState, useEffect } from 'react';
import useReactionTimeTest from '../hooks/useReactionTimeTest';
import ReactionTimeTestUI from '../components/ReactionTimeTestUI';
import TestIntroCard from '../components/TestIntroCard';
import MetyNavbar from '../components/MetyNavbar';
import MetyPageSection from '../components/MetyPageSection';
import { FaBolt, FaClock, FaBrain } from 'react-icons/fa';

const introInstructions = [
  {
    icon: <FaBolt size={28} className="text-primary" aria-hidden="true" />, 
    title: "Response Speed Assessment",
    text: "Click as quickly as possible when the visual stimulus appears on screen."
  },
  {
    icon: <FaClock size={28} className="text-primary" aria-hidden="true" />, 
    title: "Assessment Duration",
    text: "This evaluation consists of multiple trials to ensure accurate measurement of your response times."
  },
  {
    icon: <FaBrain size={28} className="text-primary" aria-hidden="true" />, 
    title: "Cognitive Evaluation",
    text: "This assessment helps evaluate your cognitive processing speed and attention capabilities."
  }
];

const ReactionTimeTestPage = ({
  userId = "default-user-id",
  testConfig = {
    totalTrials: 20,
    stimulusDuration: 1000,
    minInterval: 1500,
    maxInterval: 2500,
    totalDuration: 60000
  },
  submittedToday = false,
  allowPractice = true,
  onSubmitResults = null,
  onTestComplete = null,
  onPracticeComplete = null,
  apiConfig = {
    baseUrl: 'http://localhost:8000',
    endpoints: {
      submit: '/api/frailty-tests/reaction-time',
      checkSubmission: '/api/frailty-tests/check-submission'
    }
  },
  text = {
    title: "Reaction Time Test",
    instructions: "You will be shown a button and series of 20 pictures... When the picture pops up, click the button once (you will be penalized for excess clicks). Try to click the button as fast as possible when the picture appears.",
    start: "Start",
    practice: "Practice",
    correct: "Correct",
    incorrect: "Incorrect",
    misses: "Misses",
    accuracy: "Accuracy",
    avgReactionTime: "Avg. Reaction Time",
    score: "Score",
    alreadySubmitted: "(Already submitted today)",
    clickHere: "Click Here!",
    pleaseClick: "Please click on the button below when you see the boy.",
    trialProgress: "Trial",
    of: "of"
  },
  stimulusImage = "https://iheartcraftythings.com/wp-content/uploads/2021/11/6-48.jpg",
  customStyles = {},
  theme = 'default',
  showResults = true
}) => {
  const [testStarted, setTestStarted] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [localSubmittedToday, setLocalSubmittedToday] = useState(submittedToday);

  const {
    start,
    practice,
    testComplete,
    showStimulus,
    stimulusPosition,
    trialCount,
    correctClicks,
    incorrectClicks,
    buttonColor,
    handleResponse,
    startRealTest,
    startPracticeTest,
    calculateResults,
    resetTest,
    totalTrials,
    allowPractice: hookAllowPractice,
    progress,
    isTestActive
  } = useReactionTimeTest({
    ...testConfig,
    allowPractice
  });

  useEffect(() => {
    if (testComplete) {
      const results = calculateResults();
      setTestResults(results);
      if (onTestComplete) {
        onTestComplete(results);
      }
      if (!practice && onSubmitResults) {
        const testData = {
          userId,
          testId: "reactiontime",
          score: results.score,
          metrics: results,
          metadata: {
            testDate: new Date().toISOString(),
            practice: false,
            deviceInfo: "web",
            screenDimensions: { width: window.innerWidth, height: window.innerHeight },
            testConfig,
            theme
          }
        };
        onSubmitResults(testData);
        setLocalSubmittedToday(true);
      }
      if (practice && onPracticeComplete) {
        onPracticeComplete(results);
      }
    }
  }, [testComplete, practice, calculateResults, onTestComplete, onSubmitResults, onPracticeComplete, userId, testConfig, theme]);

  const handleStartTest = () => {
    setTestStarted(true);
    startRealTest();
  };

  const handleStartPracticeTest = () => {
    startPracticeTest();
  };

  const handleResetTest = () => {
    resetTest();
    setTestResults(null);
  };

  if (!testStarted) {
    return (
      <>
        <MetyNavbar 
          brandLogo="/mety_technology_logo.png"
          navItems={[
            { label: "Home", path: "/", color: "#20545c" },
            { label: "My Youthspan", path: "/myyouthspan", color: "#20545c" },
            { label: "Careers", path: "/careers", color: "#20545c" },
            { label: "Contact", path: "/contact", color: "#20545c" }
          ]}
          fixed={true}
        />
        <MetyPageSection
          id="cognitive-assessment"
          background="white"
          centered={true}
          maxWidth="4xl"
          padding="py-16"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-brandHeading font-bold text-brand-primary mb-4">
              Cognitive Function Assessment
            </h1>
            <p className="text-xl font-brandBody text-brand-neutral max-w-3xl mx-auto leading-relaxed">
              Evaluate your cognitive processing speed and attention capabilities through our scientifically designed reaction time assessment.
            </p>
          </div>
          
          <TestIntroCard
            title="Cognitive Function Assessment"
            instructions={introInstructions}
            buttonText="Begin Assessment"
            onClick={handleStartTest}
          />
        </MetyPageSection>
      </>
    );
  }

  return (
    <>
      <MetyNavbar 
        brandLogo="/mety_technology_logo.png"
        navItems={[
          { label: "Home", path: "/", color: "#20545c" },
          { label: "My Youthspan", path: "/myyouthspan", color: "#20545c" },
          { label: "Careers", path: "/careers", color: "#20545c" },
          { label: "Contact", path: "/contact", color: "#20545c" }
        ]}
        fixed={true}
      />
      <MetyPageSection
        id="reaction-time-test"
        background="gray-50"
        centered={true}
        maxWidth="6xl"
        padding="py-16"
      >
        <ReactionTimeTestUI
          start={start}
          practice={practice}
          testComplete={testComplete}
          showStimulus={showStimulus}
          stimulusPosition={stimulusPosition}
          trialCount={trialCount}
          correctClicks={correctClicks}
          incorrectClicks={incorrectClicks}
          buttonColor={buttonColor}
          progress={progress}
          isTestActive={isTestActive}
          handleResponse={handleResponse}
          startRealTest={handleStartTest}
          startPracticeTest={handleStartPracticeTest}
          resetTest={handleResetTest}
          totalTrials={totalTrials}
          allowPractice={hookAllowPractice}
          submittedToday={localSubmittedToday}
          text={text}
          results={testResults}
          stimulusImage={stimulusImage}
          customStyles={customStyles}
          theme={theme}
        />
      </MetyPageSection>
    </>
  );
};

export default ReactionTimeTestPage; 