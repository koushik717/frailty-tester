import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, CheckCircle, ArrowLeft, ArrowRight, BarChart3 } from 'lucide-react';
import MetyButton from '../../components/MetyButton';
import { SF36_ITEMS, SF36_SECTION_ORDER, SF36_DOMAINS } from '../../constants/sf36Items';
import { scoreSF36, getDomainInfo, getScoreInterpretation } from '../../utils/sf36Scoring';

console.log("Backend URL →", import.meta.env.VITE_API_BASE_URL);

const SF36Test = () => {
  const navigate = useNavigate();

  // Map question id -> 1..36 numbering
  const idToNumber = useMemo(() => new Map(SF36_ITEMS.map((it, idx) => [it.id, idx + 1])), []);

  const [responsesById, setResponsesById] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [endedAt, setEndedAt] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setStartedAt(new Date().toISOString());
    console.debug("[sf36] unique ids", new Set(SF36_ITEMS.map(i => i.id)).size); // should be 36
  }, []);

  // Group questions by domain
  const itemsByDomain = useMemo(() => {
    const map = SF36_SECTION_ORDER.map(key => [key, []]);
    const buckets = Object.fromEntries(map);
    for (const q of SF36_ITEMS) {
      buckets[q.domain].push(q);
    }
    return buckets;
  }, []);

  // Update responses
  const setAnswer = (qid, value) => setResponsesById(prev => ({ ...prev, [qid]: value }));

  const isCurrentPageValid = () => {
    const currentDomain = SF36_SECTION_ORDER[currentPage];
    const currentItems = itemsByDomain[currentDomain];
    return currentItems.every(q => responsesById[q.id] != null);
  };

  const isFormValid = () => Object.keys(responsesById).length === 36;

  const getProgressPercentage = () =>
    Math.round((Object.keys(responsesById).length / 36) * 100);

  const handleNext = () => {
    if (isCurrentPageValid()) {
      if (currentPage < SF36_SECTION_ORDER.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      setError('Please answer all questions on this page before continuing.');
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Answered:", Object.keys(responsesById).length);
    if (!isFormValid()) {
      setError('Please answer all 36 questions before submitting.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const orderedResponses = SF36_ITEMS.map(it => ({
        itemId: it.id,
        value: responsesById[it.id] ?? null
      }));

      console.debug("[sf36] submit ids:", orderedResponses.map(r => r.itemId));
      console.debug("Sample responses:", Object.values(responsesById).slice(0, 5));

      const result = scoreSF36(orderedResponses);
      setScore(result);
      setEndedAt(new Date().toISOString());

      const testData = {
        test: "sf36",
        responses: orderedResponses,
        domainScores: {
          PF: result.PF,
          RP: result.RP,
          BP: result.BP,
          GH: result.GH,
          VT: result.VT,
          SF: result.SF,
          RE: result.RE,
          MH: result.MH
        },
        startedAt,
        endedAt: new Date().toISOString()
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/frailty-tests/sf36`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testData)
      });

      if (!response.ok) throw new Error('Failed to submit test results');

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting SF-36 test:', err);
      setError('Failed to submit test results. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    setResponsesById({});
    setSubmitted(false);
    setScore(null);
    setStartedAt(new Date().toISOString());
    setEndedAt(null);
    setError('');
    setCurrentPage(0);
  };

  const handleGoHome = () => navigate('/');

  // --- RESULT VIEW ---
  if (submitted && score) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-dark mb-6">
              SF-36 Assessment Complete!
            </h1>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">Your Overall Score</h2>
              <div className="text-4xl font-bold text-blue-600 mb-2">{score.overall}/100</div>
              <p className="text-blue-700">Average across all health domains</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="text-lg font-semibold text-neutral-dark mb-4">Domain Scores</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(score)
                  .filter(([key]) => key !== 'overall' && key !== 'rawScores')
                  .map(([domain, scoreValue]) => (
                    <div key={domain} className="flex justify-between items-center p-3 bg-white rounded border">
                      <div>
                        <span className="font-medium text-neutral-dark">{getDomainInfo(domain).name}</span>
                        <p className="text-sm text-neutral-medium">{getDomainInfo(domain).description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">{scoreValue}/100</div>
                        <div className="text-sm text-neutral-medium">{getScoreInterpretation(scoreValue)}</div>
                      </div>
                    </div>
                  ))}
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

  // --- TEST VIEW ---
  const currentDomain = SF36_SECTION_ORDER[currentPage];
  const pageItems = itemsByDomain[currentDomain];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-dark mb-2">
              General Health Inventory (SF-36)
            </h1>
            <p className="text-lg text-neutral-medium">
              Please answer each question based on how you have been feeling during the past 4 weeks.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-neutral-dark">Progress</span>
              <span className="text-sm text-neutral-medium">
                {Object.keys(responsesById).length}/36 questions answered
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>

          {/* Section Info */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2">
              <BarChart3 className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-neutral-dark">
                Section {currentPage + 1} of {SF36_SECTION_ORDER.length}: {SF36_DOMAINS[currentDomain].name}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <span className="text-red-800">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              {pageItems.map((q) => {
                const qNumber = idToNumber.get(q.id) ?? "?";
                const currentVal = responsesById[q.id] ?? null;

                return (
                  <div key={q.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-neutral-dark mb-2">
                        Question {qNumber}
                      </h3>
                      <p className="text-neutral-medium">{q.text}</p>
                    </div>

                    <div className="space-y-3">
                      {q.options.map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`q-${q.id}`}
                            value={option.value}
                            checked={currentVal === option.value}
                            onChange={() => setAnswer(q.id, option.value)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                          />
                          <span className="text-neutral-dark">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6">
              <MetyButton
                type="button"
                onClick={handlePrevious}
                variant="secondary"
                disabled={currentPage === 0}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </MetyButton>

              {currentPage < SF36_SECTION_ORDER.length - 1 ? (
                <MetyButton
                  type="button"
                  onClick={handleNext}
                  variant="primary"
                  disabled={!isCurrentPageValid()}
                  className="flex items-center space-x-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </MetyButton>
              ) : (
                <MetyButton
                  type="submit"
                  variant="primary"
                  disabled={!isFormValid() || isSubmitting}
                  className="flex items-center space-x-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
                </MetyButton>
              )}
            </div>

            {!isFormValid() && currentPage === SF36_SECTION_ORDER.length - 1 && (
              <p className="text-sm text-neutral-medium text-center">
                Please answer all questions to continue
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SF36Test;
