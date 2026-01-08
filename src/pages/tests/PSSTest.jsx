import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, CheckCircle, AlertCircle } from 'lucide-react';
import MetyButton from '../../components/MetyButton';
import { PSS_ITEMS, PSS_RESPONSE_OPTIONS } from '../../constants/pssItems';
import { scorePSS, getCategoryDescription, getCategoryColor } from '../../utils/pssScoring';
import axios from "axios";

const PSSTest = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [endedAt, setEndedAt] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setStartedAt(new Date().toISOString());
  }, []);

  const handleResponseChange = (itemId, value) => {
    setResponses(prev => ({
      ...prev,
      [itemId]: value
    }));
    setError('');
  };

  const isFormValid = () => {
    return Object.keys(responses).length === 10 &&
      Object.values(responses).every(value => value !== undefined && value !== null);
  };

  const getProgressPercentage = () => {
    return Math.round((Object.keys(responses).length / 10) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError('Please answer all 10 questions before submitting.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Format responses for scoring
      const formattedResponses = Object.entries(responses).map(([itemId, value]) => ({
        itemId: parseInt(itemId),
        value: parseInt(value)
      }));

      // Calculate score
      const result = scorePSS(formattedResponses);
      setScore(result);
      const ended = new Date().toISOString();
      setEndedAt(ended);

      // Submit to backend PSS endpoint (existing behaviour)
      const testData = {
        test: "pss10",
        responses: formattedResponses,
        total: result.total,
        category: result.category,
        startedAt,
        endedAt: ended
      };

      const response = await fetch(`/api/frailty-tests/pss`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include', // Ensure cookies are sent (fetch API syntax)
        body: JSON.stringify(testData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit test results');
      }

      // ✅ Save result to Profile page results file (generic results route)
      await axios.post(`/api/frailty-tests/results`, {
        test: "pss10",
        testName: "PSS-10 Stress Test",
        overallScore: result.total,
        assessment: {
          category: result.category,
          startedAt,
          endedAt: ended
        }
      }, { withCredentials: true });

      console.log("✅ PSS result saved to profile results!");
      setSubmitted(true);

    } catch (err) {
      console.error('Error submitting PSS test:', err);
      setError('Failed to submit test results. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    setResponses({});
    setSubmitted(false);
    setScore(null);
    setStartedAt(new Date().toISOString());
    setEndedAt(null);
    setError('');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (submitted && score) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-dark mb-6">
              PSS Assessment Complete!
            </h1>

            <div className={`border rounded-lg p-6 mb-6 ${getCategoryColor(score.category)}`}>
              <h2 className="text-2xl font-semibold mb-2">Your Stress Level</h2>
              <div className="text-4xl font-bold mb-2">{score.total}/{score.maxScore}</div>
              <p className="text-lg capitalize">{getCategoryDescription(score.category)}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="text-lg font-semibold text-neutral-dark mb-3">Score Interpretation</h3>
              <div className="space-y-2 text-sm text-neutral-medium">
                <p><strong>0-13:</strong> Low perceived stress - You generally feel in control and able to cope with life's demands.</p>
                <p><strong>14-26:</strong> Moderate perceived stress - You experience some stress but generally feel able to manage it.</p>
                <p><strong>27-40:</strong> High perceived stress - You may be experiencing significant stress and could benefit from stress management strategies.</p>
              </div>
            </div>

            <div className="space-x-4">
              <MetyButton onClick={handleRetake} variant="secondary" size="lg">
                Retake Test
              </MetyButton>
              <MetyButton onClick={handleGoHome} variant="primary" size="lg">
                Return Home
              </MetyButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Scale className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-dark mb-2">
              Perceived Stress Scale (PSS-10)
            </h1>
            <p className="text-lg text-neutral-medium">
              Please answer each question based on how often you felt or thought a certain way during the last month.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-neutral-dark">Progress</span>
              <span className="text-sm text-neutral-medium">
                {Object.keys(responses).length}/10 questions answered
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-800">{error}</span>
              </div>
            </div>
          )}

          {/* Test Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {PSS_ITEMS.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-neutral-dark mb-2">
                    Question {item.id}
                  </h3>
                  <p className="text-neutral-medium">{item.text}</p>
                  {item.reverseScored && (
                    <p className="text-sm text-blue-600 mt-1">
                      <em>Note: This item is reverse-scored</em>
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  {PSS_RESPONSE_OPTIONS.map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${item.id}`}
                        value={option.value}
                        checked={responses[item.id] === option.value}
                        onChange={() => handleResponseChange(item.id, option.value)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-neutral-dark">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className="text-center pt-6">
              <MetyButton
                type="submit"
                variant="primary"
                size="lg"
                disabled={!isFormValid() || isSubmitting}
                className="px-8 py-3 text-lg"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
              </MetyButton>

              {!isFormValid() && (
                <p className="text-sm text-neutral-medium mt-2">
                  Please answer all questions to continue
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PSSTest;
