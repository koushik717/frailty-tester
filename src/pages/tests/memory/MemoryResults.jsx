import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MemoryResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Redirect if no results
  useEffect(() => {
    if (!results) {
      navigate('/tests/memory-intro');
    }
  }, [results, navigate]);

  // Submit results to backend (PROD mode)
  const submitResults = async () => {
    if (!results || results.isPractice) return;

    setIsSubmitting(true);
    setSubmitStatus('submitting');

    try {
      // Check if backend endpoint is available
      const response = await fetch('/api/memory-test/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testId: 'digit',
          score: results.score,
          roundsPlayed: results.roundsPlayed,
          failures: results.failures,
          startTime: results.startTime,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Store in localStorage as backup
        const storedResults = JSON.parse(localStorage.getItem('memoryTestResults') || '[]');
        storedResults.push({
          ...results,
          submittedAt: new Date().toISOString(),
          id: Date.now()
        });
        localStorage.setItem('memoryTestResults', JSON.stringify(storedResults));
      } else {
        throw new Error('Failed to submit results');
      }
    } catch (error) {
      console.warn('Backend submission failed, storing locally:', error);
      setSubmitStatus('local');
      
      // Store in localStorage (DEV fallback)
      const storedResults = JSON.parse(localStorage.getItem('memoryTestResults') || '[]');
      storedResults.push({
        ...results,
        submittedAt: new Date().toISOString(),
        id: Date.now()
      });
      localStorage.setItem('memoryTestResults', JSON.stringify(storedResults));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-submit results if not practice mode
  useEffect(() => {
    if (results && !results.isPractice && submitStatus === null) {
      submitResults();
    }
  }, [results, submitStatus]);

  if (!results) {
    return null;
  }

  const getScoreMessage = (score) => {
    if (score >= 18) return "Excellent memory! You're in the top tier.";
    if (score >= 14) return "Great job! Your memory is above average.";
    if (score >= 10) return "Good work! Your memory is solid.";
    if (score >= 6) return "Not bad! With practice, you can improve.";
    return "Keep practicing! Memory is a skill that can be developed.";
  };

  const getScoreColor = (score) => {
    if (score >= 18) return "text-green-600";
    if (score >= 14) return "text-blue-600";
    if (score >= 10) return "text-yellow-600";
    if (score >= 6) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Test Complete!
            </h1>
            <p className="text-xl text-gray-600">
              {results.isPractice ? 'Practice Session Results' : 'Your Memory Test Results'}
            </p>
          </div>

          {/* Results Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
            <div className="text-center">
              <div className="mb-4">
                <span className="text-sm text-gray-600">Final Score</span>
                <div className={`text-6xl font-bold ${getScoreColor(results.score)}`}>
                  {results.score}
                </div>
                <span className="text-lg text-gray-600">digits remembered</span>
              </div>
              
              <p className={`text-lg font-medium ${getScoreColor(results.score)}`}>
                {getScoreMessage(results.score)}
              </p>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Rounds Played</p>
              <p className="text-2xl font-bold text-gray-800">{results.roundsPlayed}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Failures</p>
              <p className="text-2xl font-bold text-gray-800">{results.failures}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Max Length</p>
              <p className="text-2xl font-bold text-gray-800">{results.maxLength}</p>
            </div>
          </div>

          {/* Test Details */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <h3 className="font-semibold text-gray-800 mb-2">Test Details</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Started:</strong> {results.startTime ? new Date(results.startTime).toLocaleString() : 'N/A'}</p>
              <p><strong>Mode:</strong> {results.isPractice ? 'Practice' : 'Test'}</p>
              <p><strong>Max Failures Allowed:</strong> {results.maxFailures}</p>
            </div>
          </div>

          {/* Submission Status */}
          {!results.isPractice && (
            <div className="mb-8">
              {submitStatus === 'submitting' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-center">
                    Submitting your results...
                  </p>
                </div>
              )}
              
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-center">
                    ✓ Results submitted successfully!
                  </p>
                </div>
              )}
              
              {submitStatus === 'local' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-center">
                    Results saved locally (backend unavailable)
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/tests/memory-test', { 
                state: { mode: results.isPractice ? 'practice' : 'test' } 
              })}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Try Again
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>

          {/* Practice Mode Note */}
          {results.isPractice && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Practice mode results are not recorded. Start a real test to save your score!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryResults;
