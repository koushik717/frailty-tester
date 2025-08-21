import { useState, useCallback } from 'react';

export const usePSQI = () => {
  // Sleep measures
  const [timeToBed, setTimeToBed] = useState("");
  const [durationToBed, setDurationToBed] = useState('');
  const [timeWakeUp, setTimeWakeUp] = useState("");
  const [totalSleep, setTotalSleep] = useState('');

  // Responses for sleep measures question 5
  const [cannotSleept30, setCannotSleept30] = useState("notPastMonth");
  const [wakeNightOrMorning, setWakeNightOrMorning] = useState("notPastMonth");
  const [useBathroom, setUseBathroom] = useState("notPastMonth");
  const [cannotBreatheComfortably, setCannotBreatheComfortably] = useState("notPastMonth");
  const [coughSnoreLoudly, setCoughSnoreLoudly] = useState("notPastMonth");
  const [tooCold, setTooCold] = useState("notPastMonth");
  const [tooHot, setTooHot] = useState("notPastMonth");
  const [badDreams, setBadDreams] = useState("notPastMonth");
  const [havePain, setHavePain] = useState("notPastMonth");
  const [sleepOther, setSleepOther] = useState("notPastMonth");

  // Questions 6,7,8,9
  const [sleepQual, setSleepQual] = useState("veryGood");
  const [medicine, setMedicine] = useState("notPastMonth");
  const [stayAwake, setStayAwake] = useState("notPastMonth");
  const [enthusiasm, setEnthusiasm] = useState("noProblem");

  // Responses for question 10
  const [partner, setPartner] = useState("NA");
  const [snoring, setSnoring] = useState("NA");
  const [pauses, setPauses] = useState("NA");
  const [twitching, setTwitching] = useState("NA");
  const [confusion, setConfusion] = useState("NA");
  const [restlessness, setRestlessness] = useState("NA");

  // Scoring dictionary
  const dict = {
    notPastMonth: 0,
    lessThanOnceWeek: 1,
    onceOrTwiceWeek: 2,
    ThreeOrMoreWeek: 3,
    veryGood: 0,
    fairlyGood: 1,
    fairlyBad: 2,
    veryBad: 3,
    noProblem: 0,
    slightProblem: 1,
    somewhatProblem: 2,
    bigProblem: 3
  };

  // Calculate PSQI score based on MYS algorithm
  const calculateScore = useCallback(() => {
    // Component 1: Sleep quality
    const comp1 = dict[sleepQual];

    // Component 2: Sleep latency
    let sleepLatency = 0;
    if (durationToBed > 60) {
      sleepLatency = 3;
    } else if (durationToBed > 30) {
      sleepLatency = 2;
    } else if (durationToBed > 15) {
      sleepLatency = 1;
    }

    const sleepLatency2 = dict[cannotSleept30];
    const totalLatency = sleepLatency + sleepLatency2;

    let sl = 0;
    if (totalLatency > 4) {
      sl = 3;
    } else if (totalLatency > 2) {
      sl = 2;
    } else if (totalLatency > 0) {
      sl = 1;
    }
    const comp2 = sl;

    // Component 3: Sleep duration
    let sd = 0;
    if (totalSleep < 5) {
      sd = 3;
    } else if (totalSleep < 6) {
      sd = 2;
    } else if (totalSleep < 7) {
      sd = 1;
    }
    const comp3 = sd;

    // Component 4: Sleep efficiency
    let timeBed = timeToBed.split(':');
    let timeUp = timeWakeUp.split(':');
    let minsInBed = 0;

    if ((+timeBed[0]) > 11) {
      let up = (+timeUp[0]) * 60 + (+timeUp[1]) + 1440;
      let bed = (+timeBed[0]) * 60 + (+timeBed[1]);
      minsInBed = up - bed;
    } else {
      let up = (+timeUp[0]) * 60 + (+timeUp[1]);
      let bed = (+timeBed[0]) * 60 + (+timeBed[1]);
      minsInBed = up - bed;
    }

    const minsSlept = totalSleep * 60;
    const sleepEfficiency = (minsSlept / minsInBed) * 100;
    
    let comp4 = 0;
    if (sleepEfficiency < 65) {
      comp4 = 3;
    } else if (sleepEfficiency < 75) {
      comp4 = 2;
    } else if (sleepEfficiency < 85) {
      comp4 = 1;
    }

    // Component 5: Sleep disturbances
    const c5 = dict[wakeNightOrMorning] + dict[useBathroom] + dict[cannotBreatheComfortably] + 
               dict[coughSnoreLoudly] + dict[tooCold] + dict[tooHot] + dict[badDreams] + 
               dict[havePain] + dict[sleepOther];
    
    let disturbances = 0;
    if (c5 > 18) {
      disturbances = 3;
    } else if (c5 > 9) {
      disturbances = 2;
    } else if (c5 > 0) {
      disturbances = 1;
    }
    const comp5 = disturbances;

    // Component 6: Medicine use
    const comp6 = dict[medicine];

    // Component 7: Daytime dysfunction
    const q8 = dict[stayAwake];
    const q9 = dict[enthusiasm];

    let dysfunction = 0;
    if (q8 + q9 > 4) {
      dysfunction = 3;
    } else if (q8 + q9 > 2) {
      dysfunction = 2;
    } else if (q8 + q9 > 0) {
      dysfunction = 1;
    }
    const comp7 = dysfunction;

    return {
      globalScore: comp1 + comp2 + comp3 + comp4 + comp5 + comp6 + comp7,
      components: {
        comp1, comp2, comp3, comp4, comp5, comp6, comp7
      }
    };
  }, [
    sleepQual, durationToBed, cannotSleept30, totalSleep, timeToBed, timeWakeUp,
    wakeNightOrMorning, useBathroom, cannotBreatheComfortably, coughSnoreLoudly,
    tooCold, tooHot, badDreams, havePain, sleepOther, medicine, stayAwake, enthusiasm
  ]);

  // Validation
  const isFormValid = useCallback(() => {
    return timeToBed && durationToBed && timeWakeUp && totalSleep;
  }, [timeToBed, durationToBed, timeWakeUp, totalSleep]);

  // Reset form
  const resetForm = useCallback(() => {
    setTimeToBed("");
    setDurationToBed('');
    setTimeWakeUp("");
    setTotalSleep("");
    setCannotSleept30("notPastMonth");
    setWakeNightOrMorning("notPastMonth");
    setUseBathroom("notPastMonth");
    setCannotBreatheComfortably("notPastMonth");
    setCoughSnoreLoudly("notPastMonth");
    setTooCold("notPastMonth");
    setTooHot("notPastMonth");
    setBadDreams("notPastMonth");
    setHavePain("notPastMonth");
    setSleepOther("notPastMonth");
    setSleepQual("veryGood");
    setMedicine("notPastMonth");
    setStayAwake("notPastMonth");
    setEnthusiasm("noProblem");
    setPartner("NA");
    setSnoring("NA");
    setPauses("NA");
    setTwitching("NA");
    setConfusion("NA");
    setRestlessness("NA");
  }, []);

  return {
    // State
    timeToBed, setTimeToBed,
    durationToBed, setDurationToBed,
    timeWakeUp, setTimeWakeUp,
    totalSleep, setTotalSleep,
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
    sleepQual, setSleepQual,
    medicine, setMedicine,
    stayAwake, setStayAwake,
    enthusiasm, setEnthusiasm,
    partner, setPartner,
    snoring, setSnoring,
    pauses, setPauses,
    twitching, setTwitching,
    confusion, setConfusion,
    restlessness, setRestlessness,
    
    // Functions
    calculateScore,
    isFormValid,
    resetForm,
    
    // Constants
    dict
  };
};

