import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Clock, Shield, AlertTriangle } from 'lucide-react';
import MetyButton from '../../components/MetyButton';

const PSSIntro = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/tests/pss-test');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Scale className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="font-montserrat text-4xl font-bold text-neutral-dark mb-4">
              Perceived Stress Scale (PSS-10)
            </h1>
            <p className="text-lg text-neutral-medium max-w-3xl mx-auto">
              A validated assessment of your perceived stress levels over the past month
            </p>
          </div>

          <div className="space-y-6 text-left">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <h2 className="font-semibold text-blue-800 mb-2">About This Test</h2>
              <p className="text-blue-700">
                The Perceived Stress Scale (PSS-10) is a widely used psychological instrument that measures 
                the degree to which situations in your life are appraised as stressful. It assesses how 
                unpredictable, uncontrollable, and overloaded you find your life to be.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-neutral-dark mb-1">Duration</h3>
                <p className="text-sm text-neutral-medium">3-5 minutes</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Scale className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-neutral-dark mb-1">Questions</h3>
                <p className="text-sm text-neutral-medium">10 items</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold text-neutral-dark mb-1">Scoring</h3>
                <p className="text-sm text-neutral-medium">0-40 scale</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-dark mb-4">What You'll Be Asked</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-dark">Stress Perception</h3>
                    <p className="text-sm text-neutral-medium">How often you've felt stressed, nervous, or overwhelmed</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-dark">Control Assessment</h3>
                    <p className="text-sm text-neutral-medium">Your sense of control over life events and situations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-dark">Coping Ability</h3>
                    <p className="text-sm text-neutral-medium">How well you feel you can handle life's challenges</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <h2 className="font-semibold text-yellow-800 mb-2">Important Notes</h2>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• Answer based on your experiences over the past month</li>
                <li>• There are no right or wrong answers</li>
                <li>• Be honest about your feelings and experiences</li>
                <li>• You can stop the test at any time</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-semibold text-green-800 mb-2">Privacy & Data Protection</h2>
                  <p className="text-green-700 text-sm">
                    Your responses are confidential and will only be used for assessment purposes. 
                    All data is stored securely and in accordance with privacy regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <MetyButton
              onClick={handleStartTest}
              variant="primary"
              size="lg"
              className="px-8 py-3 text-lg"
            >
              Start PSS Assessment
            </MetyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PSSIntro;

