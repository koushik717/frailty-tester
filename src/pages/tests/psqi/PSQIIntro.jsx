import React from 'react';
import { useNavigate } from 'react-router-dom';
import MetyButton from '../../../components/MetyButton';

const PSQIIntro = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/tests/psqi-test');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-8">
          <div className="text-center mb-8">
            <h1 className="font-montserrat text-4xl font-bold text-neutral-dark mb-4">
              Pittsburgh Sleep Quality Index
            </h1>
            <p className="text-lg text-neutral-medium max-w-3xl mx-auto">
              A comprehensive assessment of your sleep quality over the past month
            </p>
          </div>

          <div className="space-y-6 text-left">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <h2 className="font-semibold text-blue-800 mb-2">About This Test</h2>
              <p className="text-blue-700">
                The Pittsburgh Sleep Quality Index (PSQI) is a scientifically validated questionnaire that measures 
                sleep quality and disturbances. It assesses seven key components of sleep to provide a comprehensive 
                understanding of your sleep patterns.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-dark mb-4">What You'll Be Asked</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-dark">Sleep Timing</h3>
                      <p className="text-sm text-neutral-medium">Bedtime, wake time, and sleep duration</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-dark">Sleep Quality</h3>
                      <p className="text-sm text-neutral-medium">Overall sleep quality rating</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-dark">Sleep Disturbances</h3>
                      <p className="text-sm text-neutral-medium">Factors affecting your sleep</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-dark">Sleep Efficiency</h3>
                      <p className="text-sm text-neutral-medium">Time asleep vs. time in bed</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      5
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-dark">Medicine Use</h3>
                      <p className="text-sm text-neutral-medium">Sleep medication frequency</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      6
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-dark">Daytime Function</h3>
                      <p className="text-sm text-neutral-medium">Impact on daily activities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <h2 className="font-semibold text-yellow-800 mb-2">Important Notes</h2>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• All questions refer to your sleep habits during the past month only</li>
                <li>• Answer based on the majority of days and nights in the past month</li>
                <li>• The test takes approximately 5-10 minutes to complete</li>
                <li>• Your responses are confidential and used only for assessment purposes</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <h2 className="font-semibold text-green-800 mb-2">Scoring Information</h2>
                              <p className="text-green-700 text-sm">
                  Your PSQI score will range from 0 to 21, where lower scores indicate better sleep quality. 
                  A global score ≤ 5 is considered "good" sleep quality, while scores &gt; 5 suggest poor sleep quality.
                </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <MetyButton
              onClick={handleStartTest}
              className="px-8 py-3 text-lg"
            >
              Start PSQI Assessment
            </MetyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PSQIIntro;
