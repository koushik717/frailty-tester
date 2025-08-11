import { useState, useRef } from 'react';

const getRandomPosition = () => ({
  top: Math.floor(Math.random() * 200) + 100,
  left: Math.floor(Math.random() * 400) + 100,
});

const useReactionTimeTest = ({
  totalTrials = 20,
  stimulusDuration = 1000,
  minInterval = 1500,
  maxInterval = 2500,
  allowPractice = true,
  totalDuration = 60000
} = {}) => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [practice, setPractice] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [showStimulus, setShowStimulus] = useState(false);
  const [stimulusPosition, setStimulusPosition] = useState(getRandomPosition());
  const [trialCount, setTrialCount] = useState(1);
  const [correctClicks, setCorrectClicks] = useState(0);
  const [incorrectClicks, setIncorrectClicks] = useState(0);
  const [missedClicks, setMissedClicks] = useState(0);
  const [buttonColor, setButtonColor] = useState('#2f4eff');
  const [progress, setProgress] = useState(0);
  const [reactionTimes, setReactionTimes] = useState([]);
  
  
  
  const stimulusTimeout = useRef(null);
  const trialStartTime = useRef(null);

  const startTrial = () => {
    setShowStimulus(false);
    setTimeout(() => {
      setStimulusPosition(getRandomPosition());
      setShowStimulus(true);
      trialStartTime.current = Date.now();
    }, Math.random() * (maxInterval - minInterval) + minInterval);
  };

  const startRealTest = () => {
    setIsTestActive(true);
    setPractice(false);
    setTestComplete(false);
    setTrialCount(1);
    setCorrectClicks(0);
    setIncorrectClicks(0);
    setMissedClicks(0);
    setProgress(0);
    setReactionTimes([]);
    startTrial();
  };

  const startPracticeTest = () => {
    setIsTestActive(true);
    setPractice(true);
    setTestComplete(false);
    setTrialCount(1);
    setCorrectClicks(0);
    setIncorrectClicks(0);
    setMissedClicks(0);
    setProgress(0);
    setReactionTimes([]);
    startTrial();
  };

  const handleResponse = () => {
    if (!showStimulus) {
      setIncorrectClicks((c) => c + 1);
      return;
    }
    setShowStimulus(false);
    const reactionTime = (Date.now() - trialStartTime.current) / 1000;
    setReactionTimes((arr) => [...arr, reactionTime]);
    setCorrectClicks((c) => c + 1);
    if (trialCount < totalTrials) {
      setTrialCount((t) => t + 1);
      setProgress((t + 1) / totalTrials);
      startTrial();
    } else {
      setIsTestActive(false);
      setTestComplete(true);
      setProgress(1);
    }
  };

  const resetTest = () => {
    setIsTestActive(false);
    setPractice(false);
    setTestComplete(false);
    setTrialCount(1);
    setCorrectClicks(0);
    setIncorrectClicks(0);
    setMissedClicks(0);
    setProgress(0);
    setReactionTimes([]);
    setShowStimulus(false);
  };

  const calculateResults = () => {
    const accuracy = totalTrials > 0 ? Math.round((correctClicks / totalTrials) * 100) : 0;
    const averageReactionTime = reactionTimes.length > 0 ? (reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length).toFixed(3) : 0;
    const score = Math.max(0, Math.round(1000 - averageReactionTime * 100 - incorrectClicks * 10));
    return {
      correctClicks,
      incorrectClicks,
      missedClicks,
      accuracy,
      averageReactionTime,
      score,
    };
  };

  return {
    start: isTestActive,
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
    allowPractice,
    progress,
    isTestActive,
  };
};

export default useReactionTimeTest;