import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SelfReactionTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || 'test';

  const [highlightedQuestionIndex, setHighlightedQuestionIndex] = useState(null);
  const [submittedToday, setSubmittedToday] = useState(false);
  const [selectedValues, setSelectedValues] = useState(Array(10).fill(''));
  const [showScore, setShowScore] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const questions = [
    '1. I can easily remember what has been said or done in the past 24 hours.',
    '2. I can easily remember information for a short period of time (e.g., a phone number).',
    '3. I can easily hold information in my head while working with it (perform mental arithmetic, take notes while listening in class).',
    '4. I can easily recall information that I learn.',
    '5. When I read, I remember the important facts.',
    '6. I am easily able to recall events, things I have done or places I have been, in detail.',
    '7. I can easily recognize someone\'s face that I have seen before.',
    '8. It is easy for me to remember movies I have seen.',
    '9. I use specific memory strategies, such as saying things over and over or making mental pictures.',
    '10. It is easy for me to remember where I put things.',
  ];

  const categories = [
    { name: 'Never', value: 3 },
    { name: 'Sometimes', value: 2 },
    { name: 'Often', value: 1 },
    { name: 'Always', value: 0 },
  ];

  useEffect(() => {
    // In a real implementation, you would check if the user has already submitted today
    setSubmittedToday(false);
  }, []);

  const handleAnswerChange = (questionIndex, categoryName) => {
    const updatedValues = [...selectedValues];
    updatedValues[questionIndex] = categoryName;
    setSelectedValues(updatedValues);
    setHighlightedQuestionIndex(questionIndex);
  };

  const calculateTotalScore = () => {
    let score = 0;
    let unansweredQ = false;

    selectedValues.forEach((selectedValue) => {
      const category = categories.find((cat) => cat.name === selectedValue);
      if (category) {
        score += category.value;
      } else {
        unansweredQ = true;
      }
    });

    if (unansweredQ) {
      return -1;
    } else {
      return score;
    }
  };

  const handleSubmit = async () => {
    const score = calculateTotalScore();

    if (score === -1) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setTotalScore(score);
    setShowScore(true);

    if (mode === 'test') {
      console.log('Test submitted with score:', score);

      // Map score -> simple category text for the profile page
      let category;
      if (score <= 10) {
        category = 'Excellent';
      } else if (score <= 20) {
        category = 'Good';
      } else {
        category = 'May benefit from strategies';
      }

      try {
        await fetch('/api/frailty-tests/results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Critical for session cookies
          body: JSON.stringify({
            testName: 'Self Reaction Test',
            overallScore: score,
            assessment: { category },
          }),
        });
      } catch (err) {
        console.error('Failed to save Self Reaction result:', err);
      }
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Fixed Header */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 sticky top-4 z-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            Self Reaction Test
          </h1>
          <p className="text-gray-600 text-center mb-4">
            Read the items below and click on the answer choice that best describes how true this statement is for you.
          </p>

          {/* Category Headers */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="text-center">
                <span className="text-sm font-medium text-gray-700">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((question, questionIndex) => (
            <div
              key={questionIndex}
              className={`bg-white shadow-md rounded-lg p-6 ${questionIndex % 2 === 1 ? 'bg-gray-50' : ''
                }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Question Text */}
                <div className="flex-1">
                  <p
                    className={`text-gray-800 leading-relaxed ${highlightedQuestionIndex === questionIndex
                        ? 'font-semibold text-green-700'
                        : ''
                      }`}
                  >
                    {question}
                  </p>
                </div>

                {/* Answer Options */}
                <div className="flex justify-center lg:justify-end gap-6">
                  {categories.map((category, categoryIndex) => {
                    const isSelected = selectedValues[questionIndex] === category.name;
                    return (
                      <button
                        key={categoryIndex}
                        onClick={() => handleAnswerChange(questionIndex, category.name)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${isSelected
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-300 hover:border-gray-400'
                          }`}
                      >
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-white mx-auto mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8 text-center">
          {(!showScore && !submittedToday) && (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Submit Test
            </button>
          )}

          {(showScore || submittedToday) && (
            <div className="space-y-4">
              <div className="text-lg font-medium text-gray-700">
                {submittedToday ? 'Already Submitted Today' : `Total Score: ${totalScore} / 30`}
              </div>
              <div className="text-sm text-gray-600">
                {totalScore <= 10 && 'Excellent memory self-perception'}
                {totalScore > 10 && totalScore <= 20 && 'Good memory self-perception'}
                {totalScore > 20 && 'May benefit from memory strategies'}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleBackToHome}
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

export default SelfReactionTest;
