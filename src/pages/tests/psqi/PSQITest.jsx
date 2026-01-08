import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePSQI } from '../../../hooks/usePSQI';
import MetyButton from '../../../components/MetyButton';
import { submitProgress } from '../../../services/progressSubmit';

const PSQITest = () => {
  const navigate = useNavigate();
  const [highlightedLabel, setHighlightedLabel] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const {
    // Sleep measures
    timeToBed, setTimeToBed,
    durationToBed, setDurationToBed,
    timeWakeUp, setTimeWakeUp,
    totalSleep, setTotalSleep,

    // Question 5 responses
    cannotSleept30, setCannotSleept30,
    wakeNightOrMorning, setWakeNightOrMorning,
    useBathroom, setUseBathroom,
    cannotBreatheComfortably, setCannotBreatheComfortably,
    coughSnoreLoudly, setCoughSnoreLoudly,
    tooCold, setTooCold,
    tooHot, setTooHot,
    badDreams, setBadDreams,
    havePain, setHavePain,
    sleepOther, setSleepOther,

    // Questions 6,7,8,9
    sleepQual, setSleepQual,
    medicine, setMedicine,
    stayAwake, setStayAwake,
    enthusiasm, setEnthusiasm,

    // Question 10 responses
    partner, setPartner,
    snoring, setSnoring,
    pauses, setPauses,
    twitching, setTwitching,
    confusion, setConfusion,
    restlessness, setRestlessness,

    // Functions
    calculateScore,
    isFormValid,
    resetForm
  } = usePSQI();

  // 🔹 Simple category text for Profile card
  const getGlobalCategory = (globalScore) => {
    if (globalScore <= 5) return 'Good Sleep Quality';
    if (globalScore <= 10) return 'Moderate Sleep Problems';
    return 'Poor Sleep Quality';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert('Please fill in all required fields (bedtime, sleep duration, wake time, and total sleep hours).');
      return;
    }

    const result = calculateScore();
    setScore(result);
    setSubmitted(true);

    // Submit progress using the existing service (local storage, etc.)
    const testData = {
      testId: 'pitt',
      score: result.globalScore,
      payload: {
        components: result.components,
        timestamp: new Date().toISOString()
      }
    };

    const submissionResult = submitProgress(testData);
    console.log('PSQI Test Result:', submissionResult);

    // ✅ NEW: Save a summary entry for Profile page
    const category = getGlobalCategory(result.globalScore);

    const payload = {
      testName: 'Pittsburgh Sleep Quality Index',
      testKey: 'psqi',
      overallScore: result.globalScore,
      domainScores: result.components, // component scores (comp1..comp7)
      assessment: {
        category
      }
      // timestamp will be added on backend (resultRoutes.js) if omitted
    };

    try {
      console.log('🔄 Saving PSQI summary to /api/frailty-tests/results', payload);
      await axios.post('/api/frailty-tests/results', payload, { withCredentials: true });
      console.log('✅ PSQI summary saved to global results');
    } catch (err) {
      console.error('❌ Error saving PSQI summary:', err);
    }
  };

  const handleViewResults = () => {
    navigate('/tests/psqi-results');
  };

  const handleRetake = () => {
    resetForm();
    setSubmitted(false);
    setScore(null);
  };

  if (submitted && score) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-8 text-center">
            <h1 className="text-3xl font-bold text-neutral-dark mb-6">PSQI Assessment Complete!</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">Your Global Score</h2>
              <div className="text-4xl font-bold text-blue-600 mb-2">{score.globalScore}/21</div>
              <p className="text-blue-700">
                {score.globalScore <= 5 ? 'Good Sleep Quality' : 'Poor Sleep Quality'}
              </p>
            </div>
            <div className="space-x-4">
              <MetyButton onClick={handleViewResults} className="px-6 py-3">
                View Detailed Results
              </MetyButton>
              <MetyButton onClick={handleRetake} variant="outline" className="px-6 py-3">
                Retake Test
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-dark mb-4">Pittsburgh Sleep Quality Index</h1>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-blue-700">
                <strong>Instructions:</strong> The following questions relate to your usual sleep habits during the past month only.
                Your answers should indicate the most accurate reply for the majority of days and nights in the past month.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question 1: Bedtime */}
            <div className="form-group">
              <label className={`block text-sm font-medium mb-2 ${highlightedLabel === '1' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}>
                1. During the past month, what time have you usually gone to bed at night?
              </label>
              <input
                type="time"
                value={timeToBed}
                onChange={(e) => setTimeToBed(e.target.value)}
                onFocus={() => setHighlightedLabel('1')}
                onBlur={() => setHighlightedLabel(null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Question 2: Sleep Duration */}
            <div className="form-group bg-gray-50 p-4 rounded-lg">
              <label className={`block text-sm font-medium mb-2 ${highlightedLabel === '2' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}>
                2. During the past month, how long (in minutes) has it usually taken you to fall asleep each night?
              </label>
              <input
                type="number"
                value={durationToBed}
                onChange={(e) => setDurationToBed(e.target.value)}
                onFocus={() => setHighlightedLabel('2')}
                onBlur={() => setHighlightedLabel(null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter minutes"
                min="0"
                required
              />
            </div>

            {/* Question 3: Wake Time */}
            <div className="form-group">
              <label className={`block text-sm font-medium mb-2 ${highlightedLabel === '3' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}>
                3. During the past month, what time have you usually gotten up in the morning?
              </label>
              <input
                type="time"
                value={timeWakeUp}
                onChange={(e) => setTimeWakeUp(e.target.value)}
                onFocus={() => setHighlightedLabel('3')}
                onBlur={() => setHighlightedLabel(null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Question 4: Total Sleep */}
            <div className="form-group bg-gray-50 p-4 rounded-lg">
              <label className={`block text-sm font-medium mb-2 ${highlightedLabel === '4' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}>
                4. During the past month, how many hours of actual sleep did you get at night?
              </label>
              <input
                type="number"
                value={totalSleep}
                onChange={(e) => setTotalSleep(e.target.value)}
                onFocus={() => setHighlightedLabel('4')}
                onBlur={() => setHighlightedLabel(null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter hours"
                min="0"
                step="0.1"
                required
              />
            </div>

            {/* Question 5: Sleep Disturbances */}
            {/* ... all your existing Question 5–11 code stays unchanged ... */}
            {/* I’m keeping everything exactly as you had it from here down */}

            {/* Question 5: Sleep Disturbances */}
            <div className="form-group">
              <label className={`block text-sm font-medium mb-4 ${highlightedLabel === '5' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}>
                5. During the past month, how often have you had trouble sleeping because you...
              </label>

              {/* 5a */}
              <div className="ml-4 mb-3">
                <label className="block text-sm font-medium mb-2">a) Cannot get to sleep within 30 minutes</label>
                <select
                  value={cannotSleept30}
                  onChange={(e) => setCannotSleept30(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="notPastMonth">Not during the past month</option>
                  <option value="lessThanOnceWeek">Less than once a week</option>
                  <option value="onceOrTwiceWeek">Once or twice a week</option>
                  <option value="ThreeOrMoreWeek">Three or more times a week</option>
                </select>
              </div>

              {/* 5b */}
              <div className="ml-4 mb-3">
                <label className="block text-sm font-medium mb-2">b) Wake up in the middle of the night or early morning</label>
                <select
                  value={wakeNightOrMorning}
                  onChange={(e) => setWakeNightOrMorning(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="notPastMonth">Not during the past month</option>
                  <option value="lessThanOnceWeek">Less than once a week</option>
                  <option value="onceOrTwiceWeek">Once or twice a week</option>
                  <option value="ThreeOrMoreWeek">Three or more times a week</option>
                </select>
              </div>

              {/* 5c */}
              <div className="ml-4 mb-3">
                <label className="block text-sm font-medium mb-2">c) Have to get up to use the bathroom</label>
                <select
                  value={useBathroom}
                  onChange={(e) => setUseBathroom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="notPastMonth">Not during the past month</option>
                  <option value="lessThanOnceWeek">Less than once a week</option>
                  <option value="onceOrTwiceWeek">Once or twice a week</option>
                  <option value="ThreeOrMoreWeek">Three or more times a week</option>
                </select>
              </div>

              {/* 5d */}
              <div className="ml-4 mb-3">
                <label className="block text-sm font-medium mb-2">d) Cannot breathe comfortably</label>
                <select
                  value={cannotBreatheComfortably}
                  onChange={(e) => setCannotBreatheComfortably(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="notPastMonth">Not during the past month</option>
                  <option value="lessThanOnceWeek">Less than once a week</option>
                  <option value="onceOrTwiceWeek">Once or twice a week</option>
                  <option value="ThreeOrMoreWeek">Three or more times a week</option>
                </select>
              </div>

              {/* 5e */}
              <div className="ml-4 mb-3">
                <label className="block text-sm font-medium mb-2">e) Cough or snore loudly</label>
                <select
                  value={coughSnoreLoudly}
                  onChange={(e) => setCoughSnoreLoudly(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="notPastMonth">Not during the past month</option>
                  <option value="lessThanOnceWeek">Less than once a week</option>
                  <option value="onceOrTwiceWeek">Once or twice a week</option>
                  <option value="ThreeOrMoreWeek">Three or more times a week</option>
                </select>
              </div>

              {/* 5f */}
              <div className="ml-4 mb-3">
                <label className="block text-sm font-medium mb-2">f) Feel too cold</label>
                <select
                  value={tooCold}
                  onChange={(e) => setTooCold(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="notPastMonth">Not during the past month</option>
                  <option value="lessThanOnceWeek">Less than once a week</option>
                  <option value="onceOrTwiceWeek">Once or twice a week</option>
                  <option value="ThreeOrMoreWeek">Three or more times a week</option>
                </select>
              </div>

              {/* 5g */}
              <div className="ml-4 mb-3">
                <label className="block text-sm font-medium mb-2">g) Feel too hot</label>
                <select
                  value={tooHot}
                  onChange={(e) => setTooHot(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="notPastMonth">Not during the past month</option>
                  <option value="lessThanOnceWeek">Less than once a week</option>
                  <option value="onceOrTwiceWeek">Once or twice a week</option>
                  <option value="ThreeOrMoreWeek">Three or more times a week</option>
                </select>
              </div>

              {/* 5h */}
              <div className="ml-4 mb-3">
                <label className="block text-sm font-medium mb-2">h) Had bad dreams</label>
                <select
                  value={badDreams}
                  onChange={(e) => setBadDreams(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="notPastMonth">Not during the past month</option>
                  <option value="lessThanOnceWeek">Less than once a week</option>
                  <option value="onceOrTwiceWeek">Once or twice a week</option>
                  <option value="ThreeOrMoreWeek">Three or more times a week</option>
                </select>
              </div>

              {/* 5i */}
              <div className="ml-4 mb-3">
                <label className="block text-sm font-medium mb-2">i) Have a pain</label>
                <select
                  value={havePain}
                  onChange={(e) => setHavePain(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="notPastMonth">Not during the past month</option>
                  <option value="lessThanOnceWeek">Less than once a week</option>
                  <option value="onceOrTwiceWeek">Once or twice a week</option>
                  <option value="ThreeOrMoreWeek">Three or more times a week</option>
                </select>
              </div>

              {/* 5j */}
              <div className="ml-4 mb-3">
                <label className="block text-sm font-medium mb-2">j) Other reason(s)</label>
                <select
                  value={sleepOther}
                  onChange={(e) => setSleepOther(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="notPastMonth">Not during the past month</option>
                  <option value="lessThanOnceWeek">Less than once a week</option>
                  <option value="onceOrTwiceWeek">Once or twice a week</option>
                  <option value="ThreeOrMoreWeek">Three or more times a week</option>
                </select>
              </div>
            </div>

            {/* Question 6: Sleep Quality */}
            <div className="form-group bg-gray-50 p-4 rounded-lg">
              <label className={`block text-sm font-medium mb-2 ${highlightedLabel === '6' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}>
                6. During the past month, how would you rate your sleep quality overall?
              </label>
              <select
                value={sleepQual}
                onChange={(e) => setSleepQual(e.target.value)}
                onFocus={() => setHighlightedLabel('6')}
                onBlur={() => setHighlightedLabel(null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="veryGood">Very good</option>
                <option value="fairlyGood">Fairly good</option>
                <option value="fairlyBad">Fairly bad</option>
                <option value="veryBad">Very bad</option>
              </select>
            </div>

            {/* Question 7: Medicine Use */}
            <div className="form-group">
              <label className={`block text-sm font-medium mb-2 ${highlightedLabel === '7' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}>
                7. During the past month, how often have you taken medicine to help you sleep (prescribed or "over the counter")?
              </label>
              <select
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
                onFocus={() => setHighlightedLabel('7')}
                onBlur={() => setHighlightedLabel(null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="notPastMonth">Not during the past month</option>
                <option value="lessThanOnceWeek">Less than once a week</option>
                <option value="onceOrTwiceWeek">Once or twice a week</option>
                <option value="ThreeOrMoreWeek">Three or more times a week</option>
              </select>
            </div>

            {/* Question 8: Stay Awake */}
            <div className="form-group bg-gray-50 p-4 rounded-lg">
              <label className={`block text-sm font-medium mb-2 ${highlightedLabel === '8' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}>
                8. During the past month, how often have you had trouble staying awake while driving, eating meals, or engaging in social activity?
              </label>
              <select
                value={stayAwake}
                onChange={(e) => setStayAwake(e.target.value)}
                onFocus={() => setHighlightedLabel('8')}
                onBlur={() => setHighlightedLabel(null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="notPastMonth">Not during the past month</option>
                <option value="lessThanOnceWeek">Less than once a week</option>
                <option value="onceOrTwiceWeek">Once or twice a week</option>
                <option value="ThreeOrMoreWeek">Three or more times a week</option>
              </select>
            </div>

            {/* Question 9: Enthusiasm */}
            <div className="form-group">
              <label className={`block text-sm font-medium mb-2 ${highlightedLabel === '9' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}>
                9. During the past month, how much of a problem has it been for you to keep up enough enthusiasm to get things done?
              </label>
              <select
                value={enthusiasm}
                onChange={(e) => setEnthusiasm(e.target.value)}
                onFocus={() => setHighlightedLabel('9')}
                onBlur={() => setHighlightedLabel(null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="noProblem">No problem at all</option>
                <option value="slightProblem">Only a slight problem</option>
                <option value="somewhatProblem">Somewhat of a problem</option>
                <option value="bigProblem">A very big problem</option>
              </select>
            </div>

            {/* Question 10: Bed Partner */}
            <div className="form-group bg-gray-50 p-4 rounded-lg">
              <label className={`block text-sm font-medium mb-2 ${highlightedLabel === '10' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}>
                10. Do you have a bed partner or room mate?
              </label>
              <select
                value={partner}
                onChange={(e) => setPartner(e.target.value)}
                onFocus={() => setHighlightedLabel('10')}
                onBlur={() => setHighlightedLabel(null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="NA">No bed partner or room mate</option>
                <option value="otherRoom">Partner/room mate in other room</option>
                <option value="sameRoom">Partner in same room, but not same bed</option>
                <option value="sameBed">Partner in same bed</option>
              </select>
            </div>

            {/* Question 11: Partner Observations */}
            <div className="form-group">
              <label className="block text-sm font-medium mb-4 text-blue-600">
                If you have a room mate or bed partner, ask him/her how often in the past month you have had...
              </label>

              {/* 11a */}
              <div className="ml-4 mb-3">
                <label className="block text-sm font-medium mb-2">a) Loud snoring</label>
                <select
                  value={snoring}
                  onChange={(e) => setSnoring(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="NA">No bed partner or room mate</option>
                  <option value="notPastMonth">Not during the past month</option>
                  <option value="lessThanOnceWeek">Less than once a week</option>
                  <option value="onceOrTwiceWeek">Once or twice a week</option>
                  <option value="ThreeOrMoreWeek">Three or more times a week</option>
                </select>
              </div>

              {/* 11b */}
              <div className="ml-4 mb-3">
                <label className="block text-sm font-medium mb-2">b) Long pauses between breaths while asleep</label>
                <select
                  value={pauses}
                  onChange={(e) => setPauses(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="NA">No bed partner or room mate</option>
                  <option value="notPastMonth">Not during the past month</option>
                  <option value="lessThanOnceWeek">Less than once a week</option>
                  <option value="onceOrTwiceWeek">Once or twice a week</option>
                  <option value="ThreeOrMoreWeek">Three or more times a week</option>
                </select>
              </div>

              {/* 11c */}
              <div className="ml-4 mb-3">
                <label className="block text-sm font-medium mb-2">c) Legs twitching or jerking while you sleep</label>
                <select
                  value={twitching}
                  onChange={(e) => setTwitching(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="NA">No bed partner or room mate</option>
                  <option value="notPastMonth">Not during the past month</option>
                  <option value="lessThanOnceWeek">Less than once a week</option>
                  <option value="onceOrTwiceWeek">Once or twice a week</option>
                  <option value="ThreeOrMoreWeek">Three or more times a week</option>
                </select>
              </div>

              {/* 11d */}
              <div className="ml-4 mb-3">
                <label className="block text-sm font-medium mb-2">d) Episodes of disorientation or confusion during sleep</label>
                <select
                  value={confusion}
                  onChange={(e) => setConfusion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="NA">No bed partner or room mate</option>
                  <option value="notPastMonth">Not during the past month</option>
                  <option value="lessThanOnceWeek">Less than once a week</option>
                  <option value="onceOrTwiceWeek">Once or twice a week</option>
                  <option value="ThreeOrMoreWeek">Three or more times a week</option>
                </select>
              </div>

              {/* 11e */}
              <div className="ml-4 mb-3">
                <label className="block text-sm font-medium mb-2">e) Other restlessness while you sleep</label>
                <select
                  value={restlessness}
                  onChange={(e) => setRestlessness(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="NA">No bed partner or room mate</option>
                  <option value="notPastMonth">Not during the past month</option>
                  <option value="lessThanOnceWeek">Less than once a week</option>
                  <option value="onceOrTwiceWeek">Once or twice a week</option>
                  <option value="ThreeOrMoreWeek">Three or more times a week</option>
                </select>
              </div>
            </div>

            <div className="text-center pt-6">
              <MetyButton type="submit" className="px-8 py-3 text-lg">
                Submit PSQI Assessment
              </MetyButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PSQITest;
