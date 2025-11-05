import React, { useState } from 'react';
import ReactionTimeTestPage from '../pages/ReactionTimeTestPage';

/**
 * Example Usage of Modularized ReactionTimeTest Components
 * Demonstrates how to integrate the test into the FrailtyTester app
 */

const ReactionTimeTestExample = () => {
  const [testResults, setTestResults] = useState(null);
  const [userSubmittedToday, setUserSubmittedToday] = useState(false);

  // Example user data
  const currentUser = {
    id: "user-123",
    name: "John Doe",
    age: 75
  };

  // Frailty-specific test configuration
  const frailtyTestConfig = {
    totalTrials: 15,        // Fewer trials for elderly users
    stimulusDuration: 1200, // Longer display time
    minInterval: 2000,      // Longer intervals
    maxInterval: 3500,      // More time between stimuli
    totalDuration: 90000    // 90 seconds total
  };

  // Frailty-specific text
  const frailtyText = {
    title: "Cognitive Function Assessment",
    instructions: "This test measures your reaction time and attention. When you see the image appear, click the button as quickly as possible. This helps us assess your cognitive function and frailty risk.",
    start: "Begin Assessment",
    practice: "Practice First",
    correct: "Correct Responses",
    incorrect: "Incorrect Responses",
    misses: "Missed Responses",
    accuracy: "Accuracy Rate",
    avgReactionTime: "Average Response Time",
    score: "Cognitive Score",
    alreadySubmitted: "(Assessment completed today)",
    clickHere: "Click Here When Ready!",
    pleaseClick: "Click the button below when you see the image appear.",
    trialProgress: "Trial",
    of: "of"
  };

  // Handle test results submission
  const handleSubmitResults = async (testData) => {
    try {
      console.log('Submitting test results:', testData);
      
      // ✅ Fixed API URL for local backend
      const response = await fetch('http://localhost:3000/api/frailty-tests/reaction-time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(testData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('✅ Results saved:', result);
        setUserSubmittedToday(true);
      } else {
        console.error('❌ Failed to submit test results');
      }
    } catch (error) {
      console.error('⚠️ Error submitting test results:', error);
    }
  };

  // Handle test completion
  const handleTestComplete = (results) => {
    console.log('Test completed:', results);
    setTestResults(results);
    
    // Frailty risk assessment
    const risk = assessFrailtyRisk(results);
    console.log('Frailty risk assessment:', risk);
  };

  // Handle practice completion
  const handlePracticeComplete = (results) => {
    console.log('Practice completed:', results);
  };

  // Frailty risk assessment logic
  const assessFrailtyRisk = (results) => {
    const { averageReactionTime, accuracy } = results;
    
    if (averageReactionTime > 0.5 || accuracy < 70) {
      return { 
        risk: 'high', 
        recommendation: 'Consider comprehensive assessment',
        score: 3
      };
    } else if (averageReactionTime > 0.3 || accuracy < 85) {
      return { 
        risk: 'moderate', 
        recommendation: 'Monitor closely',
        score: 2
      };
    } else {
      return { 
        risk: 'low', 
        recommendation: 'Good cognitive function',
        score: 1
      };
    }
  };

  return (
    <div className="frailty-tester-app">
      <header className="app-header">
        <h1>Frailty Tester Tool</h1>
        <p>Welcome, {currentUser.name} (Age: {currentUser.age})</p>
      </header>

      <main className="app-main">
        <section className="test-section">
          <h2>Cognitive Function Assessment</h2>
          
          <ReactionTimeTestPage
            userId={currentUser.id}
            testConfig={frailtyTestConfig}
            submittedToday={userSubmittedToday}
            allowPractice={true}
            onSubmitResults={handleSubmitResults}
            onTestComplete={handleTestComplete}
            onPracticeComplete={handlePracticeComplete}
            text={frailtyText}
            stimulusImage="https://your-domain.com/frailty-stimulus-image.jpg"
            showResults={true}
          />
        </section>

        {testResults && (
          <section className="results-section">
            <h3>Assessment Results</h3>
            <div className="results-summary">
              <p><strong>Response Time:</strong> {testResults.averageReactionTime} seconds</p>
              <p><strong>Accuracy:</strong> {testResults.accuracy}%</p>
              <p><strong>Cognitive Score:</strong> {testResults.score}</p>

              <div className="risk-assessment">
                <h4>Frailty Risk Assessment:</h4>
                {(() => {
                  const risk = assessFrailtyRisk(testResults);
                  return (
                    <div className={`risk-level risk-${risk.risk}`}>
                      <p><strong>Risk Level:</strong> {risk.risk.toUpperCase()}</p>
                      <p><strong>Recommendation:</strong> {risk.recommendation}</p>
                      <p><strong>Risk Score:</strong> {risk.score}/3</p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ReactionTimeTestExample;
