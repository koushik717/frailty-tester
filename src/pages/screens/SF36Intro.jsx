import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Clock, BarChart3, Shield } from 'lucide-react';
import MetyButton from '../../components/MetyButton';

const SF36Intro = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/tests/sf36-test');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="font-montserrat text-4xl font-bold text-neutral-dark mb-4">
              General Health Inventory (SF-36)
            </h1>
            <p className="text-lg text-neutral-medium max-w-3xl mx-auto">
              A comprehensive assessment of your health-related quality of life across 8 key domains
            </p>
          </div>

          <div className="space-y-6 text-left">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <h2 className="font-semibold text-blue-800 mb-2">About This Test</h2>
              <p className="text-blue-700">
                The SF-36 (Short Form 36) is a widely used, scientifically validated health survey that measures 
                your health-related quality of life. It assesses eight key areas of health to provide a comprehensive 
                understanding of your physical and mental well-being.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-neutral-dark mb-1">Duration</h3>
                <p className="text-sm text-neutral-medium">8-12 minutes</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-neutral-dark mb-1">Questions</h3>
                <p className="text-sm text-neutral-medium">36 items</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-neutral-dark mb-1">Domains</h3>
                <p className="text-sm text-neutral-medium">8 health areas</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-dark mb-4">Health Domains Assessed</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-dark">Physical Functioning</h3>
                      <p className="text-sm text-neutral-medium">Ability to perform physical activities</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-dark">Role Physical</h3>
                      <p className="text-sm text-neutral-medium">Limitations in work due to physical health</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-dark">Bodily Pain</h3>
                      <p className="text-sm text-neutral-medium">Pain and its interference with work</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-dark">General Health</h3>
                      <p className="text-sm text-neutral-medium">Overall health perception</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      5
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-dark">Vitality</h3>
                      <p className="text-sm text-neutral-medium">Energy and fatigue levels</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      6
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-dark">Social Functioning</h3>
                      <p className="text-sm text-neutral-medium">Impact of health on social activities</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      7
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-dark">Role Emotional</h3>
                      <p className="text-sm text-neutral-medium">Limitations due to emotional problems</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      8
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-dark">Mental Health</h3>
                      <p className="text-sm text-neutral-medium">Psychological distress and well-being</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <h2 className="font-semibold text-yellow-800 mb-2">Important Notes</h2>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• Answer based on your experiences during the past 4 weeks</li>
                <li>• There are no right or wrong answers</li>
                <li>• Be honest about your health and how you've been feeling</li>
                <li>• You can stop the test at any time</li>
                <li>• The test will be divided into sections for easier completion</li>
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
              Start SF-36 Assessment
            </MetyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SF36Intro;

