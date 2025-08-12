import { useState, useEffect, useCallback } from 'react';

export const useDigitMemoryTest = () => {
  // Core state
  const [state, setState] = useState('INSTRUCTIONS');
  const [isPractice, setIsPractice] = useState(false);
  const [round, setRound] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [highestDigits, setHighestDigits] = useState(0);
  
  // Game state
  const [currentSequence, setCurrentSequence] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [visibleDigit, setVisibleDigit] = useState(null);
  const [isShowing, setIsShowing] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  
  // Constants from SOURCE
  const INITIAL_LENGTH = 3;
  const MAX_LENGTH = 20;
  const MAX_FAILURES = 3;
  const DIGIT_DISPLAY_INTERVAL = 500;
  const DIGIT_GAP_INTERVAL = 150;

  // Generate random digit sequence
  const generateSequence = useCallback((length) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10));
  }, []);

  // Start practice mode
  const startPractice = useCallback(() => {
    setIsPractice(true);
    setRound(0);
    setFailCount(0);
    setHighestDigits(0);
    setCurrentSequence(generateSequence(INITIAL_LENGTH));
    setVisibleIndex(0);
    setVisibleDigit(null);
    setIsShowing(false);
    setState('SHOWING');
    setStartTime(new Date());
  }, [generateSequence]);

  // Start actual test
  const startGame = useCallback(() => {
    setIsPractice(false);
    setRound(0);
    setFailCount(0);
    setHighestDigits(0);
    setCurrentSequence(generateSequence(INITIAL_LENGTH));
    setVisibleIndex(0);
    setVisibleDigit(null);
    setIsShowing(false);
    setState('SHOWING');
    setStartTime(new Date());
  }, [generateSequence]);

  // Handle digit display tick - show one digit at a time
  const tickShow = useCallback(() => {
    if (state === 'SHOWING' && visibleIndex >= 0 && visibleIndex < currentSequence.length) {
      // Show current digit
      setVisibleDigit(currentSequence[visibleIndex]);
      setIsShowing(true);
      
      // Schedule next digit or end sequence
      const timeout = setTimeout(() => {
        if (visibleIndex + 1 >= currentSequence.length) {
          // Last digit shown, end sequence
          setIsShowing(false);
          setVisibleDigit(null);
          setVisibleIndex(-1);
          setState('USER_INPUT');
        } else {
          // Move to next digit with gap
          setIsShowing(false);
          setVisibleDigit(null);
          
          // Gap between digits
          const gapTimeout = setTimeout(() => {
            setVisibleIndex(visibleIndex + 1);
          }, DIGIT_GAP_INTERVAL);
          
          return () => clearTimeout(gapTimeout);
        }
      }, DIGIT_DISPLAY_INTERVAL);
      
      return () => clearTimeout(timeout);
    }
  }, [state, visibleIndex, currentSequence]);

  // Submit user answer
  const submitAnswer = useCallback(() => {
    if (!userInput.trim() || !userInput.includes(',')) {
      return { valid: false, error: 'Please separate digits with commas' };
    }

    const userDigits = userInput.split(',').map(Number);
    const isCorrect = JSON.stringify(userDigits) === JSON.stringify(currentSequence);
    
    if (isCorrect) {
      if (currentSequence.length === MAX_LENGTH) {
        // Reached maximum length
        setHighestDigits(MAX_LENGTH);
        setState('GAME_OVER');
        return { valid: true, correct: true, gameOver: true };
      } else {
        // Correct answer, advance to next round
        setHighestDigits(currentSequence.length);
        setRound(prev => prev + 1);
        setFailCount(0);
        setUserInput('');
        setState('INSTRUCTIONS');
        return { valid: true, correct: true, nextRound: true };
      }
    } else {
      // Incorrect answer
      if (!isPractice) {
        const newFailCount = failCount + 1;
        setFailCount(newFailCount);
        
        if (newFailCount >= MAX_FAILURES) {
          setState('GAME_OVER');
          return { valid: true, correct: false, gameOver: true };
        }
      }
      
      setUserInput('');
      setState('INSTRUCTIONS');
      return { valid: true, correct: false, nextRound: true };
    }
  }, [userInput, currentSequence, isPractice, failCount]);

  // Move to next round
  const nextRound = useCallback(() => {
    const newLength = Math.min(currentSequence.length + 1, MAX_LENGTH);
    setCurrentSequence(generateSequence(newLength));
    setVisibleIndex(0);
    setVisibleDigit(null);
    setIsShowing(false);
    setState('SHOWING');
  }, [currentSequence.length, generateSequence]);

  // Reset game state
  const reset = useCallback(() => {
    setState('INSTRUCTIONS');
    setIsPractice(false);
    setRound(0);
    setFailCount(0);
    setHighestDigits(0);
    setCurrentSequence([]);
    setVisibleIndex(-1);
    setVisibleDigit(null);
    setIsShowing(false);
    setUserInput('');
    setStartTime(null);
  }, []);

  // Get game summary
  const summary = useCallback(() => {
    return {
      score: highestDigits,
      roundsPlayed: round,
      failures: failCount,
      startTime,
      isPractice,
      maxLength: MAX_LENGTH,
      maxFailures: MAX_FAILURES
    };
  }, [highestDigits, round, failCount, startTime, isPractice]);

  // Handle digit display timing
  useEffect(() => {
    tickShow();
  }, [tickShow]);

  // Handle game over conditions
  useEffect(() => {
    if (failCount >= MAX_FAILURES && !isPractice) {
      setState('GAME_OVER');
    }
  }, [failCount, isPractice]);

  return {
    // State
    state,
    isPractice,
    round,
    failCount,
    highestDigits,
    currentSequence,
    visibleIndex,
    visibleDigit,
    isShowing,
    userInput,
    startTime,
    
    // Constants
    INITIAL_LENGTH,
    MAX_LENGTH,
    MAX_FAILURES,
    DIGIT_DISPLAY_INTERVAL,
    DIGIT_GAP_INTERVAL,
    
    // Actions
    startPractice,
    startGame,
    tickShow,
    submitAnswer,
    nextRound,
    reset,
    summary,
    
    // Setters
    setUserInput
  };
};
