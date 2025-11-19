import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDigitMemoryTest } from '../../../hooks/useDigitMemoryTest';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const MemoryTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || 'test';
  
  const {
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
    INITIAL_LENGTH,
    MAX_LENGTH,
    MAX_FAILURES,
    startPractice,
    startGame,
    submitAnswer,
    nextRound,
    reset,
    summary,
    setUserInput
  } = useDigitMemoryTest();

  const [message, setMessage] = useState('');
  const [showNextButton, setShowNextButton] = useState(false);

  // ---------- helper: map score to category & save to /results ----------
  const saveResultToProfile = async (summaryData) => {
    if (!summaryData) return;

    // Prefer highestDigits from hook, fall back to summary fields
    const scoreFromHook = typeof highestDigits === 'number' ? highestDigits : null;
    const scoreFromSummary =
      summaryData.highestDigits ??
      summaryData.maxLength ??
      summaryData.score ??
      null;

    const overallScore = scoreFromHook ?? scoreFromSummary ?? 0;

    let category = 'Needs Improvement';
    if (overallScore >= 9) {
      category = 'Excellent';
    } else if (overallScore >= 7) {
      category = 'Good';
    } else if (overallScore >= 5) {
      category = 'Average';
    }

    const payload = {
      testName: 'Digit Memory Test',
      testKey: 'digit-memory',
      overallScore,
      startedAt: summaryData.startedAt || null,
      endedAt: summaryData.endedAt || null,
      assessment: {
        category
      }
    };

    try {
      await axios.post(`${API_BASE_URL}/api/frailty-tests/results`, payload);
      console.log('Digit Memory summary saved to profile:', payload);
    } catch (err) {
      console.error('Error saving Digit Memory result to profile:', err);
    }
  };

  // Initialize based on mode
  useEffect(() => {
    if (mode === 'practice') {
      startPractice();
    } else {
      startGame();
    }
  }, [mode, startPractice, startGame]);

  // Handle answer submission
  const handleSubmit = () => {
    const result = submitAnswer();
    
    if (!result.valid) {
      setMessage(result.error);
      return;
    }

    if (result.correct) {
      if (result.gameOver) {
        // Reached max length
        setMessage('Perfect! You reached the maximum sequence length.');

        const resultsSummary = summary();
        saveResultToProfile(resultsSummary);

        setTimeout(() => {
          navigate('/tests/memory-results', { 
            state: { results: resultsSummary } 
          });
        }, 2000);
      } else {
        // Correct answer, show next round button
        setMessage('Correct! Get ready for the next round.');
        setShowNextButton(true);
      }
    } else {
      if (result.gameOver) {
        // Game over due to failures
        setMessage('Game Over. You made too many mistakes.');

        const resultsSummary = summary();
        saveResultToProfile(resultsSummary);

        setTimeout(() => {
          navigate('/tests/memory-results', { 
            state: { results: resultsSummary } 
          });
        }, 2000);
      } else {
        // Incorrect answer, show next round button
        setMessage('Incorrect. Try again with a new sequence.');
        setShowNextButton(true);
      }
    }
  };

  // Handle next round
  const handleNextRound = () => {
    setMessage('');
    setShowNextButton(false);
    nextRound();
  };

  // Handle early exit
  const handleEndTest = () => {
    const resultsSummary = summary();
    saveResultToProfile(resultsSummary);

    navigate('/tests/memory-results', { 
      state: { results: resultsSummary } 
    });
  };

  // Input validation
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Allow only digits and commas
    if (/^[0-9,]*$/.test(value)) {
      setUserInput(value);
    }
  };

  // Render digit display - show only current visible digit
  const renderDigitDisplay = () => {
    if (state !== 'SHOWING' || !isShowing) return null;

    return (
      <div className="flex justify-center items-center mb-8">
        <div className="w-24 h-24 flex items-center justify-center text-6xl font-bold rounded-lg border-4 border-blue-500 bg-blue-500 text-white transition-all duration-300">
          {visibleDigit}
        </div>
      </div>
    );
  };

  // Render user input form
  const renderInputForm = () => {
    if (state !== 'USER_INPUT') return null;

    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Enter the sequence you just saw
        </h3>
        <p className="text-gray-600 mb-4">
          Type each number separated by a comma. For example: "5,3,6"
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="e.g., 5,3,6"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            autoFocus
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Submit Answer
          </button>
        </div>
      </div>
    );
  };

  // Render game info
  const renderGameInfo = () => {
    return (
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Mode</p>
            <p className="font-semibold text-gray-800">
              {isPractice ? 'Practice' : 'Test'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Round</p>
            <p className="font-semibold text-gray-800">{round + 1}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Sequence Length</p>
            <p className="font-semibold text-gray-800">
              {currentSequence.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Failures</p>
            <p className="font-semibold text-gray-800">
              {failCount}/{MAX_FAILURES}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render message
  const renderMessage = () => {
    if (!message) return null;

    return (
      <div className="text-center mb-6">
        <p className={`text-lg font-medium ${
          message.includes('Correct') ? 'text-green-600' : 
          message.includes('Incorrect') ? 'text-red-600' : 
          'text-blue-600'
        }`}>
          {message}
        </p>
      </div>
    );
  };

  // Render next round button
  const renderNextButton = () => {
    if (!showNextButton) return null;

    return (
      <div className="text-center mb-6">
        <button
          onClick={handleNextRound}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
        >
          Next Round
        </button>
      </div>
    );
  };

  // Render action buttons
  const renderActionButtons = () => {
    if (state === 'INSTRUCTIONS') return null;

    return (
      <div className="text-center space-x-4">
        <button
          onClick={handleEndTest}
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
        >
          End Test
        </button>
        <button
          onClick={reset}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Digit Memory Test
          </h1>
          <p className="text-gray-600">
            {isPractice ? 'Practice Mode' : 'Test Mode'}
          </p>
        </div>

        {/* Game Info */}
        {renderGameInfo()}

        {/* Message */}
        {renderMessage()}

        {/* Next Button */}
        {renderNextButton()}

        {/* Digit Display */}
        {renderDigitDisplay()}

        {/* Input Form */}
        {renderInputForm()}

        {/* Action Buttons */}
        {renderActionButtons()}

        {/* Instructions */}
        {state === 'INSTRUCTIONS' && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <p className="text-blue-800">
              <strong>Ready?</strong> The sequence will start automatically. 
              Watch carefully and remember each digit!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryTest;
