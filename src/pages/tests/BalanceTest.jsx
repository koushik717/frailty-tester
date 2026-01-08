import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useBalancePose from '../../hooks/useBalancePose';
import WebcamView from '../../components/webCam/WebcamView';
import PermissionDenied from '../../components/webCam/PermissionDenied';
import PoseCanvas from '../../components/pose/PoseCanvas';
import { analyzeKeypoints } from '../../components/pose/PoseAnalyzer';
import { computeBalanceScore } from '../../utils/balanceScoring';

const BalanceTest = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // Test state
  const [currentTrial, setCurrentTrial] = useState(0);
  const [currentFoot, setCurrentFoot] = useState('left');
  const [trialDuration, setTrialDuration] = useState(0);
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [trials, setTrials] = useState([]);
  const [showCooldown, setShowCooldown] = useState(false);
  const [cooldownCount, setCooldownCount] = useState(5);
  const [wrongLeg, setWrongLeg] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for pose analysis
  const isFootInAirRef = useRef(false);
  const startTimeRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Pose detection hook
  const { keypoints, isLoading, error, detector } = useBalancePose(videoRef, (keypoints) => {
    if (isTrialActive && keypoints.length > 0) {
      analyzeKeypoints(keypoints, {
        isFootInAirRef,
        startTimer,
        stopTimer,
        currentFoot,
        setWrongLeg,
        onFootDrop: handleFootDrop
      });
    }
  });

  // Trial configuration
  const TOTAL_TRIALS = 6;
  const TRIALS_PER_FOOT = 3;

  // Timer functions
  const startTimer = useCallback(() => {
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
      setIsTrialActive(true);

      // Update timer every 100ms for smooth display
      timerIntervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = (Date.now() - startTimeRef.current) / 1000;
          setTrialDuration(Math.round(elapsed * 10) / 10);
        }
      }, 100);
    }
  }, []);

  const stopTimer = useCallback(() => {
    if (startTimeRef.current) {
      const duration = (Date.now() - startTimeRef.current) / 1000;

      // Record trial result
      const trialResult = {
        trial: currentTrial + 1,
        foot: currentFoot,
        duration: Math.round(duration * 10) / 10,
        timestamp: new Date().toISOString()
      };

      setTrials(prev => [...prev, trialResult]);

      // Reset timer
      startTimeRef.current = null;
      setIsTrialActive(false);
      setTrialDuration(0);

      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }

      // Start cooldown
      setShowCooldown(true);
      setCooldownCount(5);
    }
  }, [currentTrial, currentFoot]);

  // Handle foot drop (called from pose analyzer)
  const handleFootDrop = useCallback(() => {
    stopTimer();
  }, [stopTimer]);

  // Cooldown countdown
  useEffect(() => {
    if (showCooldown && cooldownCount > 0) {
      const timer = setTimeout(() => {
        setCooldownCount(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (showCooldown && cooldownCount === 0) {
      setShowCooldown(false);
      nextTrial();
    }
  }, [showCooldown, cooldownCount]);

  // Move to next trial
  const nextTrial = () => {
    const nextTrialIndex = currentTrial + 1;

    if (nextTrialIndex >= TOTAL_TRIALS) {
      // Test complete
      setTestComplete(true);
      const score = computeBalanceScore(trials);
      setFinalScore(score);
    } else {
      // Switch foot every 3 trials
      const newFoot = Math.floor(nextTrialIndex / TRIALS_PER_FOOT) % 2 === 0 ? 'left' : 'right';
      setCurrentFoot(newFoot);
      setCurrentTrial(nextTrialIndex);
      setWrongLeg(false);
    }
  };

  // Submit results
  const submitResults = async () => {
    if (!finalScore) return;

    setIsSubmitting(true);
    try {
      const payload = {
        testType: 'balance',
        timestamp: new Date().toISOString(),
        trials: trials,
        score: finalScore,
        metadata: {
          totalTrials: finalScore.totalTrials,
          averageTime: finalScore.averageTime,
          bestTime: finalScore.bestTime,
          assessment: finalScore.assessment
        }
      };

      // Submit to backend
      const response = await fetch(`/api/frailty-tests/results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Critical for session cookies
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log('Results submitted successfully');
        navigate('/');
      } else {
        console.error('Failed to submit results');
      }
    } catch (error) {
      console.error('Error submitting results:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Loading pose detection model...</p>
          <p className="text-gray-500 mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Model Loading Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/tests/balance-intro')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Intro
          </button>
        </div>
      </div>
    );
  }

  // Test complete state
  if (testComplete && finalScore) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Test Complete!</h1>
            <p className="text-xl text-gray-600">Your balance test results</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{finalScore.averageTime}s</div>
                <div className="text-gray-600">Average Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{finalScore.bestTime}s</div>
                <div className="text-gray-600">Best Time</div>
              </div>
            </div>

            {finalScore.assessment && (
              <div className="text-center mb-6">
                <div className="text-lg font-semibold text-gray-800 mb-2">Performance</div>
                <div className="text-2xl font-bold text-blue-600">{finalScore.assessment.category}</div>
                <div className="text-gray-600">Age Group: {finalScore.assessment.ageGroup}</div>
                <div className="text-gray-600">Expected Range: {finalScore.assessment.expectedRange}</div>
              </div>
            )}

            <div className="space-y-2">
              {trials.map((trial, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Trial {trial.trial} ({trial.foot} foot)</span>
                  <span className="text-lg font-semibold">{trial.duration}s</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
            >
              Back to Home
            </button>

            <button
              onClick={submitResults}
              disabled={isSubmitting}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Results'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main test interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Balance Test</h1>
          <div className="flex justify-center items-center space-x-8 text-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{currentTrial + 1}</div>
              <div className="text-gray-600">Trial</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{TOTAL_TRIALS}</div>
              <div className="text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{currentFoot}</div>
              <div className="text-gray-600">Foot</div>
            </div>
          </div>
        </div>

        {/* Test Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Camera Feed */}
          <div className="lg:col-span-2">
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <WebcamView ref={videoRef} />
              <PoseCanvas
                videoRef={videoRef}
                keypoints={keypoints}
                boundingBox={null}
              />

              {/* Overlay for instructions */}
              {!isTrialActive && !showCooldown && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <h3 className="text-2xl font-bold mb-4">Lift your {currentFoot} foot</h3>
                    <p className="text-lg">Stand on one leg and maintain balance</p>
                    <p className="text-sm mt-2">The test will start automatically when you lift your foot</p>
                  </div>
                </div>
              )}

              {/* Timer overlay */}
              {isTrialActive && (
                <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg">
                  <div className="text-2xl font-bold">{trialDuration}s</div>
                </div>
              )}

              {/* Cooldown overlay */}
              {showCooldown && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl font-bold mb-4">{cooldownCount}</div>
                    <p className="text-xl">Next trial in...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status Panel */}
          <div className="space-y-6">
            {/* Current Status */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Status</h3>

              {wrongLeg && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                  <p className="text-red-700 font-medium">Wrong foot lifted!</p>
                  <p className="text-red-600 text-sm">Please lift your {currentFoot} foot</p>
                </div>
              )}

              {isTrialActive && (
                <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                  <p className="text-green-700 font-medium">Trial Active</p>
                  <p className="text-green-600 text-sm">Keep your {currentFoot} foot up!</p>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Trial:</span>
                  <span className="font-semibold">{currentTrial + 1} of {TOTAL_TRIALS}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Foot:</span>
                  <span className="font-semibold capitalize">{currentFoot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Model Status:</span>
                  <span className="font-semibold text-green-600">Ready</span>
                </div>
              </div>
            </div>

            {/* Trial Results */}
            {trials.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Completed Trials</h3>
                <div className="space-y-2">
                  {trials.map((trial, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">Trial {trial.trial} ({trial.foot})</span>
                      <span className="font-semibold">{trial.duration}s</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Controls</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/tests/balance-intro')}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back to Intro
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Exit Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceTest;

