import { useState, useRef, useEffect } from 'react';

const useReactionTimeTest = ({
  totalTrials = 20,
  practiceTrials = 3,
  allowPractice = true
} = {}) => {
  // Core state
  const [status, setStatus] = useState('idle'); // 'idle' | 'countdown' | 'ready' | 'clicked' | 'done'
  const [countdownNum, setCountdownNum] = useState(3);
  const [trialIndex, setTrialIndex] = useState(0);
  const [showCue, setShowCue] = useState(false);
  const [earlyClick, setEarlyClick] = useState(false);
  
  // Results storage
  const [results, setResults] = useState({
    practice: [],
    actual: []
  });
  
  // Timing references
  const [cueShownAt, setCueShownAt] = useState(0);
  const countdownTimer = useRef(null);
  const cueTimer = useRef(null);
  
  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (countdownTimer.current) clearTimeout(countdownTimer.current);
      if (cueTimer.current) clearTimeout(cueTimer.current);
    };
  }, []);
  
  // Start test with countdown
  const start = ({ practice = true } = {}) => {
    // Clear any existing timers
    if (countdownTimer.current) clearTimeout(countdownTimer.current);
    if (cueTimer.current) clearTimeout(cueTimer.current);
    
    // Reset state
    setStatus('countdown');
    setCountdownNum(3);
    setTrialIndex(0);
    setShowCue(false);
    setEarlyClick(false);
    setResults({ practice: [], actual: [] });
    
    // Start countdown
    const runCountdown = (num) => {
      if (num > 0) {
        setCountdownNum(num);
        countdownTimer.current = setTimeout(() => runCountdown(num - 1), 1000);
      } else {
        // Countdown finished, start first trial
        setStatus('ready');
        startTrial();
      }
    };
    
    runCountdown(3);
  };
  
  // Start individual trial with random delay
  const startTrial = () => {
    if (trialIndex >= (allowPractice ? practiceTrials + totalTrials : totalTrials)) {
      setStatus('done');
      return;
    }
    
    // Random delay between 800-2000ms
    const randomDelay = Math.random() * 1200 + 800;
    
    cueTimer.current = setTimeout(() => {
      setShowCue(true);
      setCueShownAt(performance.now());
      setStatus('ready');
    }, randomDelay);
  };
  
  // Handle click response
  const onClick = () => {
    if (!showCue) {
      // Early click - restart trial
      setEarlyClick(true);
      if (cueTimer.current) clearTimeout(cueTimer.current);
      setShowCue(false);
      setStatus('ready');
      startTrial();
      return;
    }
    
    // Valid click - record reaction time
    const reactionMs = performance.now() - cueShownAt;
    const isPractice = trialIndex < practiceTrials;
    
    // Store result
    setResults(prev => ({
      ...prev,
      [isPractice ? 'practice' : 'actual']: [
        ...prev[isPractice ? 'practice' : 'actual'],
        reactionMs
      ]
    }));
    
    // Clear cue and advance trial
    setShowCue(false);
    setTrialIndex(prev => prev + 1);
    setStatus('clicked');
    
    // Start next trial after brief pause
    setTimeout(() => {
      if (trialIndex + 1 >= (allowPractice ? practiceTrials + totalTrials : totalTrials)) {
        setStatus('done');
      } else {
        setStatus('ready');
        startTrial();
      }
    }, 500);
  };
  
  // Reset to initial state
  const reset = () => {
    // Clear timers
    if (countdownTimer.current) clearTimeout(countdownTimer.current);
    if (cueTimer.current) clearTimeout(cueTimer.current);
    
    // Reset state
    setStatus('idle');
    setCountdownNum(3);
    setTrialIndex(0);
    setShowCue(false);
    setEarlyClick(false);
    setResults({ practice: [], actual: [] });
    setCueShownAt(0);
  };
  
  // Calculate summary statistics for actual trials only
  const summary = () => {
    const actualTrials = results.actual;
    
    if (actualTrials.length === 0) {
      return {
        avg: 0,
        fastest: 0,
        slowest: 0,
        validCount: 0
      };
    }
    
    const avg = actualTrials.reduce((sum, time) => sum + time, 0) / actualTrials.length;
    const fastest = Math.min(...actualTrials);
    const slowest = Math.max(...actualTrials);
    
    return {
      avg: Math.round(avg),
      fastest: Math.round(fastest),
      slowest: Math.round(slowest),
      validCount: actualTrials.length
    };
  };
  
  return {
    // State
    status,
    countdownNum,
    trialIndex,
    totalTrials,
    practiceTrials,
    showCue,
    earlyClick,
    results,
    
    // Actions
    start,
    onClick,
    reset,
    summary
  };
};

export default useReactionTimeTest;