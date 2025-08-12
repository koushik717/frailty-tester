import React from 'react';
import { useNavigate } from 'react-router-dom';

const MemoryIntro = () => {
  const navigate = useNavigate();

  const handlePractice = () => {
    navigate('/tests/memory-test', { state: { mode: 'practice' } });
  };

  const handleStartTest = () => {
    navigate('/tests/memory-test', { state: { mode: 'test' } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Digit Memory Test
            </h1>
            <p className="text-xl text-gray-600">
              Test your working memory capacity
            </p>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How it works
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                You will be shown a sequence of digits, one at a time. Afterwards, 
                you will be asked to type the digits you just saw, so do your best 
                to remember them.
              </p>
              <p>
                The test will continue for up to 20 digit sequences or until you 
                make 3 incorrect guesses.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                <p className="text-blue-800">
                  <strong>Tip:</strong> Focus on each digit as it appears. The 
                  sequence gets longer with each correct answer!
                </p>
              </div>
            </div>
          </div>

          {/* Test Modes */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Choose your mode
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Practice Mode */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Practice Mode
                </h3>
                <p className="text-green-700 mb-4">
                  Unlimited attempts to get familiar with the test. No scores recorded.
                </p>
                <button
                  onClick={handlePractice}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Start Practice
                </button>
              </div>

              {/* Test Mode */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Test Mode
                </h3>
                <p className="text-blue-700 mb-4">
                  Official test with scoring. Your results will be recorded.
                </p>
                <button
                  onClick={handleStartTest}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryIntro;
