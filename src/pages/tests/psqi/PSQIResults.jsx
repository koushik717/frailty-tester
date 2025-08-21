import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetyButton from '../../../components/MetyButton';
import { getProgress } from '../../../services/progressSubmit';

const PSQIResults = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);

  useEffect(() => {
    const storedResults = getProgress('pitt');
    if (storedResults) {
      setResults(storedResults);
    }
  }, []);

  const handleRetakeTest = () => {
    navigate('/tests/psqi-test');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const getComponentDescription = (component, score) => {
    const descriptions = {
      comp1: {
        name: 'Sleep Quality',
        description: 'Overall subjective sleep quality rating',
        interpretation: score === 0 ? 'Very Good' : score === 1 ? 'Fairly Good' : score === 2 ? 'Fairly Bad' : 'Very Bad'
      },
      comp2: {
        name: 'Sleep Latency',
        description: 'Time to fall asleep and trouble falling asleep',
        interpretation: score === 0 ? 'Excellent' : score === 1 ? 'Good' : score === 2 ? 'Fair' : 'Poor'
      },
      comp3: {
        name: 'Sleep Duration',
        description: 'Total hours of sleep per night',
        interpretation: score === 0 ? '≥7 hours' : score === 1 ? '6-7 hours' : score === 2 ? '5-6 hours' : '<5 hours'
      },
      comp4: {
        name: 'Sleep Efficiency',
        description: 'Percentage of time in bed actually sleeping',
        interpretation: score === 0 ? '≥85%' : score === 1 ? '75-84%' : score === 2 ? '65-74%' : '<65%'
      },
      comp5: {
        name: 'Sleep Disturbances',
        description: 'Frequency of sleep-disrupting factors',
        interpretation: score === 0 ? 'Minimal' : score === 1 ? 'Mild' : score === 2 ? 'Moderate' : 'Severe'
      },
      comp6: {
        name: 'Medicine Use',
        description: 'Frequency of sleep medication use',
        interpretation: score === 0 ? 'None' : score === 1 ? 'Rare' : score === 2 ? 'Occasional' : 'Frequent'
      },
      comp7: {
        name: 'Daytime Dysfunction',
        description: 'Problems staying awake and lack of enthusiasm',
        interpretation: score === 0 ? 'None' : score === 1 ? 'Mild' : score === 2 ? 'Moderate' : 'Severe'
      }
    };
    return descriptions[component] || { name: 'Unknown', description: '', interpretation: '' };
  };

  const getGlobalScoreInterpretation = (score) => {
    if (score <= 5) {
      return {
        category: 'Good Sleep Quality',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        description: 'Your sleep quality is considered good. You may have occasional sleep issues but overall maintain healthy sleep patterns.'
      };
    } else if (score <= 10) {
      return {
        category: 'Moderate Sleep Problems',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        description: 'You experience moderate sleep difficulties. Consider improving sleep hygiene and consulting a healthcare provider if issues persist.'
      };
    } else {
      return {
        category: 'Poor Sleep Quality',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        description: 'Your sleep quality indicates significant problems. It\'s recommended to consult with a healthcare provider for sleep evaluation and treatment.'
      };
    }
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-8 text-center">
            <h1 className="text-3xl font-bold text-neutral-dark mb-6">No PSQI Results Found</h1>
            <p className="text-neutral-medium mb-8">
              It looks like you haven't completed the PSQI assessment yet.
            </p>
            <MetyButton onClick={handleRetakeTest} className="px-6 py-3">
              Take PSQI Assessment
            </MetyButton>
          </div>
        </div>
      </div>
    );
  }

  const globalInterpretation = getGlobalScoreInterpretation(results.score);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-neutral-dark mb-4">PSQI Assessment Results</h1>
            <p className="text-lg text-neutral-medium">
              Your Pittsburgh Sleep Quality Index assessment results
            </p>
          </div>

          {/* Global Score */}
          <div className={`${globalInterpretation.bgColor} border ${globalInterpretation.borderColor} rounded-lg p-6 mb-8 text-center`}>
            <h2 className="text-2xl font-semibold text-neutral-dark mb-2">Global PSQI Score</h2>
            <div className={`text-5xl font-bold ${globalInterpretation.color} mb-2`}>
              {results.score}/21
            </div>
            <h3 className={`text-xl font-semibold ${globalInterpretation.color} mb-3`}>
              {globalInterpretation.category}
            </h3>
            <p className="text-neutral-700 max-w-2xl mx-auto">
              {globalInterpretation.description}
            </p>
          </div>

          {/* Component Scores */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-dark mb-6 text-center">Component Breakdown</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(results.components).map(([component, score]) => {
                const compInfo = getComponentDescription(component, score);
                const scoreColor = score === 0 ? 'text-green-600' : score === 1 ? 'text-yellow-600' : score === 2 ? 'text-orange-600' : 'text-red-600';
                const bgColor = score === 0 ? 'bg-green-50' : score === 1 ? 'bg-yellow-50' : score === 2 ? 'bg-orange-50' : 'bg-red-50';
                const borderColor = score === 0 ? 'border-green-200' : score === 1 ? 'border-yellow-200' : score === 2 ? 'border-orange-200' : 'border-red-200';
                
                return (
                  <div key={component} className={`${bgColor} border ${borderColor} rounded-lg p-4`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-neutral-dark">{compInfo.name}</h3>
                      <span className={`text-lg font-bold ${scoreColor}`}>{score}/3</span>
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">{compInfo.description}</p>
                    <p className="text-sm font-medium text-neutral-700">
                      <span className="font-semibold">Interpretation:</span> {compInfo.interpretation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Score Interpretation Guide */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Understanding Your Score</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p><strong>0-5:</strong> Good sleep quality - Your sleep patterns are healthy and restorative.</p>
              <p><strong>6-10:</strong> Moderate sleep problems - You may benefit from sleep hygiene improvements.</p>
              <p><strong>11-21:</strong> Poor sleep quality - Consider consulting a healthcare provider for sleep evaluation.</p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-3">General Sleep Improvement Tips</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Maintain a consistent sleep schedule, even on weekends</li>
              <li>• Create a relaxing bedtime routine</li>
              <li>• Keep your bedroom cool, dark, and quiet</li>
              <li>• Avoid caffeine, alcohol, and large meals before bedtime</li>
              <li>• Exercise regularly, but not close to bedtime</li>
              <li>• Limit screen time before bed</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-x-4">
            <MetyButton onClick={handleRetakeTest} className="px-6 py-3">
              Retake Assessment
            </MetyButton>
            <MetyButton onClick={handleBackToHome} variant="outline" className="px-6 py-3">
              Back to Home
            </MetyButton>
          </div>

          {/* Test Information */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Assessment completed on {new Date(results.timestamp).toLocaleDateString()} at {new Date(results.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PSQIResults;
