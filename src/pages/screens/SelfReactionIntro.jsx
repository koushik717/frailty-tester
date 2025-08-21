import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelfReactionIntro = () => {
  const navigate = useNavigate();

  const handlePractice = () => {
    navigate('/tests/self-reaction-test', { state: { mode: 'practice' } });
  };

  const handleStartTest = () => {
    navigate('/tests/self-reaction-test', { state: { mode: 'test' } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Self Reaction Test
            </h1>
            <p className="text-xl text-gray-600">
              Assess your cognitive reactivity and memory self-perception
            </p>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How it works
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                You will be presented with 10 statements about memory and cognitive abilities. 
                For each statement, you'll rate how true it is for you on a scale from "Never" to "Always".
              </p>
              <p>
                This self-assessment helps evaluate your perception of cognitive function and memory capacity. 
                The test takes approximately 3-5 minutes to complete.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                <p className="text-blue-800">
                  <strong>Tip:</strong> Be honest with your responses. There are no right or wrong answers - 
                  this is about your personal experience and self-perception.
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

export default SelfReactionIntro;
