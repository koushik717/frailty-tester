import React, { useState, useEffect, useMemo } from 'react';
import boyImage from '../assets/tests/reaction-time/boy.jpg';

const ReactionTimeTestUI = () => {
  // State variables matching the source implementation
  const [showBoy, setShowBoy] = useState(false);
  const [start, setStart] = useState(false);
  const [boyAppearances, setBoyAppearances] = useState(0);
  const [correctClicks, setCorrectClicks] = useState(0);
  const [incorrectClicks, setIncorrectClicks] = useState(0);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [startReaction, setStartReaction] = useState(null);
  const [intervalArray, setIntervalArray] = useState([]);
  const [positions, setPositions] = useState([]);
  const [boyPosition, setBoyPosition] = useState({ top: 50, left: 50 });
  const [practice, setPractice] = useState(true);
  const [color, setColor] = useState("blue");
  const [submittedToday, setSubmittedToday] = useState(false);

  // Constants from source
  const TOTAL_TRIALS = 20;
  const BOY_DURATION = 1000; // 1 second
  const TOTAL_DURATION = 60; // 60 seconds total

  // Generate random positions and timing array (exact logic from source)
  useEffect(() => {
    let uniquePositions = new Set();
    let newPositions = [];
  
    while (newPositions.length < TOTAL_TRIALS) {
      let newPos = {
        top: Math.random() * (window.innerHeight - 600),
        left: Math.random() * (window.innerWidth - 200),
      };
  
      let key = `${Math.floor(newPos.top)}-${Math.floor(newPos.left)}`;
      if (!uniquePositions.has(key)) {
        uniquePositions.add(key);
        newPositions.push(newPos);
      }
    }

    let timingArr = Array.from({ length: TOTAL_TRIALS }, () => Math.random() * 1 + 1.5);
    let scale = TOTAL_DURATION / timingArr.reduce((sum, val) => sum + val, 0);
    let scaledTimings = timingArr.map((val) => val * scale);

    setPositions(newPositions);
    setIntervalArray(scaledTimings);
  }, []);

  // Main test logic (exact from source)
  useEffect(() => {
    if (!start) return;
  
    if (boyAppearances >= TOTAL_TRIALS) {
      return;
    }
  
    let timer = setTimeout(() => {
      setShowBoy(true);
      setBoyPosition(positions[boyAppearances]);
      setStartReaction(Date.now());
      setBoyAppearances((prev) => prev + 1);
    }, intervalArray[boyAppearances] * 1000);
  
    return () => clearTimeout(timer);
  }, [start, boyAppearances, intervalArray, positions]);

  // Hide boy after duration (exact from source)
  useEffect(() => {
    let timer;
    if (showBoy) {
      timer = setTimeout(() => {
        setShowBoy(false);
      }, BOY_DURATION);
    }
  
    return () => clearTimeout(timer);
  }, [showBoy]);

  // Button click handler (exact logic from source)
  const onPressButton = () => {
    if (!start || !showBoy || startReaction === null) {
      setColor("red");
      setIncorrectClicks(prev => prev + 1);
      return;
    }
    const reactionTime = Date.now() - startReaction;
    setColor("green");
    setCorrectClicks(prev => prev + 1);
    setReactionTimes(prev => [...prev, reactionTime]);
    setStartReaction(null);
  };

  const startTest = () => {
    setPractice(false);
    setStart(true);
  };

  const startPractice = () => {
    setStart(true);
  };

  // Score calculations (exact from source)
  const totalReactionTime = reactionTimes.reduce((total, time) => total + time, 0);
  const dummy = ((Math.round((totalReactionTime / reactionTimes.length) * 1000) / 1000) / 1000).toFixed(3);
  const averageReactionTimeInSeconds = isNaN(dummy) ? 0 : dummy;
  const missedClicks = TOTAL_TRIALS - correctClicks;
  const totalClicks = correctClicks + incorrectClicks;
  const accuracy = Math.round((correctClicks / (totalClicks + missedClicks)) * 1000) / 1000;
  const dummy2 = Math.round((accuracy / averageReactionTimeInSeconds) * 1000) / 1000;
  const score = isNaN(dummy2) ? 0 : dummy2;

  // Test in progress
  if (!start || boyAppearances < TOTAL_TRIALS) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 max-w-4xl w-full p-8">
          {start && (
            <>
              <div className="text-center mb-6">
                <p className="text-xl text-gray-700 mb-4">
                  Please click on the button below when you see the boy.
                </p>
                <p className="text-xl text-gray-700 mb-6">
                  Correct Clicks: {correctClicks}
                </p>
              </div>
              <div className="text-center">
                <button
                  className={`px-8 py-4 rounded-lg font-semibold text-white text-xl transition-all duration-200 ${
                    color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                    color === 'red' ? 'bg-red-500 hover:bg-red-600' :
                    'bg-green-500 hover:bg-green-600'
                  }`}
                  onClick={onPressButton}
                >
                  Click Here!
                </button>
              </div>
            </>
          )}
          
          {!start && (
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Reaction Time Test
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                You will be shown a button and series of 20 pictures... When the picture pops up, click the button once 
                (you will be penalized for excess clicks). Try to click the button as fast as possible when the picture appears.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="px-8 py-4 rounded-lg font-semibold text-white text-lg bg-blue-500 hover:bg-blue-600 transition-all duration-200"
                  onClick={startTest}
                >
                  Start
                </button>
                <button
                  className="px-8 py-4 rounded-lg font-semibold text-white text-lg bg-green-500 hover:bg-green-600 transition-all duration-200"
                  onClick={startPractice}
                >
                  Practice
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Boy Image - positioned absolutely like in source */}
        {showBoy && (
          <div
            className="fixed z-50 p-3 bg-white rounded-lg shadow-lg border border-gray-200"
            style={{
              top: boyPosition.top,
              left: boyPosition.left,
            }}
          >
            <img
              src={boyImage}
              alt="Boy cue"
              className="w-36 h-36 object-cover rounded"
            />
          </div>
        )}
      </div>
    );
  }

  // Test complete - show results (exact from source)
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 max-w-2xl w-full p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Test Results
        </h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-lg text-gray-700">✅ Correct:</span>
            <span className="text-xl font-semibold text-blue-600">{correctClicks}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-lg text-gray-700">❌ Incorrect:</span>
            <span className="text-xl font-semibold text-red-600">{incorrectClicks}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-lg text-gray-700">🚫 Misses:</span>
            <span className="text-xl font-semibold text-gray-600">{missedClicks}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-lg text-gray-700">🎯 Accuracy:</span>
            <span className="text-xl font-semibold text-blue-600">{accuracy}%</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-lg text-gray-700">⏱ Avg. Reaction Time:</span>
            <span className="text-xl font-semibold text-blue-600">{averageReactionTimeInSeconds} sec</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-lg text-gray-700">🏆 Score:</span>
            <span className="text-xl font-semibold text-blue-600">{score}</span>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            className="px-8 py-4 rounded-lg font-semibold text-white text-lg bg-blue-500 hover:bg-blue-600 transition-all duration-200"
            onClick={() => {
              setStart(false);
              setBoyAppearances(0);
              setCorrectClicks(0);
              setIncorrectClicks(0);
              setReactionTimes([]);
              setStartReaction(null);
              setColor("blue");
              setPractice(true);
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReactionTimeTestUI; 