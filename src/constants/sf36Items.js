/**
 * SF-36 Health Survey Items (Fixed)
 * 
 * Corrected to exactly 36 items (IDs 1–36)
 * Removes duplicates (GH q20, q22)
 * Maintains correct SF-36 domain distribution and order
 */

export const SF36_ITEMS = [
  // --- General Health (GH) ---
  {
    id: 1,
    domain: 'GH',
    text: "In general, would you say your health is:",
    options: [
      { value: "code11", label: "Excellent", score: 100 },
      { value: "code12", label: "Very Good", score: 75 },
      { value: "code13", label: "Good", score: 50 },
      { value: "code14", label: "Fair", score: 25 },
      { value: "code15", label: "Poor", score: 0 }
    ]
  },
  {
    id: 2,
    domain: 'GH',
    text: "Compared to one year ago, how would you rate your health in general now?",
    options: [
      { value: "code11", label: "Much better now than one year ago", score: 100 },
      { value: "code12", label: "Somewhat better now than one year ago", score: 75 },
      { value: "code13", label: "About the same as one year ago", score: 50 },
      { value: "code14", label: "Somewhat worse now than one year ago", score: 25 },
      { value: "code15", label: "Much worse now than one year ago", score: 0 }
    ]
  },
  {
    id: 33,
    domain: 'GH',
    text: "I seem to get sick a little easier than other people.",
    options: [
      { value: "code61", label: "Definitely true", score: 0 },
      { value: "code62", label: "Mostly true", score: 25 },
      { value: "code63", label: "Don’t know", score: 50 },
      { value: "code64", label: "Mostly false", score: 75 },
      { value: "code65", label: "Definitely false", score: 100 }
    ]
  },
  {
    id: 34,
    domain: 'GH',
    text: "I am as healthy as anybody I know.",
    options: [
      { value: "code61", label: "Definitely true", score: 100 },
      { value: "code62", label: "Mostly true", score: 75 },
      { value: "code63", label: "Don’t know", score: 50 },
      { value: "code64", label: "Mostly false", score: 25 },
      { value: "code65", label: "Definitely false", score: 0 }
    ]
  },
  {
    id: 35,
    domain: 'GH',
    text: "I expect my health to get worse.",
    options: [
      { value: "code61", label: "Definitely true", score: 0 },
      { value: "code62", label: "Mostly true", score: 25 },
      { value: "code63", label: "Don’t know", score: 50 },
      { value: "code64", label: "Mostly false", score: 75 },
      { value: "code65", label: "Definitely false", score: 100 }
    ]
  },
  {
    id: 36,
    domain: 'GH',
    text: "My health is excellent.",
    options: [
      { value: "code61", label: "Definitely true", score: 100 },
      { value: "code62", label: "Mostly true", score: 75 },
      { value: "code63", label: "Don’t know", score: 50 },
      { value: "code64", label: "Mostly false", score: 25 },
      { value: "code65", label: "Definitely false", score: 0 }
    ]
  },

  // --- Physical Functioning (PF) ---
  ...[
    "Vigorous activities (running, lifting heavy objects, strenuous sports)",
    "Moderate activities (moving a table, pushing a vacuum, bowling, golf)",
    "Lifting or carrying groceries",
    "Climbing several flights of stairs",
    "Climbing one flight of stairs",
    "Bending, kneeling, or stooping",
    "Walking more than a mile",
    "Walking several blocks",
    "Walking one block",
    "Bathing or dressing yourself"
  ].map((q, i) => ({
    id: 3 + i,
    domain: 'PF',
    text: q,
    options: [
      { value: "code21", label: "Yes, limited a lot", score: 0 },
      { value: "code22", label: "Yes, limited a little", score: 50 },
      { value: "code23", label: "No, not limited at all", score: 100 }
    ]
  })),

  // --- Role Physical (RP) ---
  ...[
    "Cut down the amount of time you spent on work or other activities",
    "Accomplished less than you would like",
    "Were limited in the kind of work or other activities",
    "Had difficulty performing the work or other activities (for example, it took extra effort)"
  ].map((q, i) => ({
    id: 13 + i,
    domain: 'RP',
    text: q,
    options: [
      { value: "code31", label: "Yes", score: 0 },
      { value: "code32", label: "No", score: 100 }
    ]
  })),

  // --- Role Emotional (RE) ---
  ...[
    "Cut down the amount of time you spent on work or other activities due to emotional problems",
    "Accomplished less than you would like due to emotional problems",
    "Didn’t do work or other activities as carefully as usual due to emotional problems"
  ].map((q, i) => ({
    id: 17 + i,
    domain: 'RE',
    text: q,
    options: [
      { value: "code31", label: "Yes", score: 0 },
      { value: "code32", label: "No", score: 100 }
    ]
  })),

  // --- Social Functioning (SF) ---
  {
    id: 20,
    domain: 'SF',
    text: "During the past 4 weeks, to what extent has your physical health or emotional problems interfered with your social activities?",
    options: [
      { value: "code41", label: "Not at all", score: 100 },
      { value: "code42", label: "Slightly", score: 80 },
      { value: "code43", label: "Moderately", score: 60 },
      { value: "code44", label: "Quite a bit", score: 40 },
      { value: "code45", label: "Extremely", score: 20 }
    ]
  },
  {
    id: 32,
    domain: 'SF',
    text: "During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities?",
    options: [
      { value: "code41", label: "All of the time", score: 0 },
      { value: "code42", label: "Most of the time", score: 20 },
      { value: "code43", label: "A good bit of the time", score: 40 },
      { value: "code44", label: "Some of the time", score: 60 },
      { value: "code45", label: "A little of the time", score: 80 },
      { value: "code46", label: "None of the time", score: 100 }
    ]
  },

  // --- Bodily Pain (BP) ---
  {
    id: 21,
    domain: 'BP',
    text: "How much bodily pain have you had during the past 4 weeks?",
    options: [
      { value: "code41", label: "None", score: 100 },
      { value: "code42", label: "Very mild", score: 80 },
      { value: "code43", label: "Mild", score: 60 },
      { value: "code44", label: "Moderate", score: 40 },
      { value: "code45", label: "Severe", score: 20 },
      { value: "code46", label: "Very severe", score: 0 }
    ]
  },
  {
    id: 22,
    domain: 'BP',
    text: "During the past 4 weeks, how much did pain interfere with your normal work (including both work outside the home and housework)?",
    options: [
      { value: "code41", label: "Not at all", score: 100 },
      { value: "code42", label: "A little bit", score: 80 },
      { value: "code43", label: "Moderately", score: 60 },
      { value: "code44", label: "Quite a bit", score: 40 },
      { value: "code45", label: "Extremely", score: 20 }
    ]
  },

  // --- Vitality (VT) ---
  {
    id: 23,
    domain: 'VT',
    text: "Did you feel full of pep?",
    options: [
      { value: "code41", label: "All of the time", score: 100 },
      { value: "code42", label: "Most of the time", score: 80 },
      { value: "code43", label: "A good bit of the time", score: 60 },
      { value: "code44", label: "Some of the time", score: 40 },
      { value: "code45", label: "A little of the time", score: 20 },
      { value: "code46", label: "None of the time", score: 0 }
    ]
  },
  {
    id: 27,
    domain: 'VT',
    text: "Did you have a lot of energy?",
    options: [
      { value: "code41", label: "All of the time", score: 100 },
      { value: "code42", label: "Most of the time", score: 80 },
      { value: "code43", label: "A good bit of the time", score: 60 },
      { value: "code44", label: "Some of the time", score: 40 },
      { value: "code45", label: "A little of the time", score: 20 },
      { value: "code46", label: "None of the time", score: 0 }
    ]
  },
  {
    id: 29,
    domain: 'VT',
    text: "Did you feel worn out?",
    options: [
      { value: "code51", label: "All of the time", score: 0 },
      { value: "code52", label: "Most of the time", score: 20 },
      { value: "code53", label: "A good bit of the time", score: 40 },
      { value: "code54", label: "Some of the time", score: 60 },
      { value: "code55", label: "A little of the time", score: 80 },
      { value: "code56", label: "None of the time", score: 100 }
    ]
  },
  {
    id: 31,
    domain: 'VT',
    text: "Did you feel tired?",
    options: [
      { value: "code51", label: "All of the time", score: 0 },
      { value: "code52", label: "Most of the time", score: 20 },
      { value: "code53", label: "A good bit of the time", score: 40 },
      { value: "code54", label: "Some of the time", score: 60 },
      { value: "code55", label: "A little of the time", score: 80 },
      { value: "code56", label: "None of the time", score: 100 }
    ]
  },

  // --- Mental Health (MH) ---
  {
    id: 24,
    domain: 'MH',
    text: "Have you been a very nervous person?",
    options: [
      { value: "code51", label: "All of the time", score: 0 },
      { value: "code52", label: "Most of the time", score: 20 },
      { value: "code53", label: "A good bit of the time", score: 40 },
      { value: "code54", label: "Some of the time", score: 60 },
      { value: "code55", label: "A little of the time", score: 80 },
      { value: "code56", label: "None of the time", score: 100 }
    ]
  },
  {
    id: 25,
    domain: 'MH',
    text: "Have you felt so down in the dumps that nothing could cheer you up?",
    options: [
      { value: "code51", label: "All of the time", score: 0 },
      { value: "code52", label: "Most of the time", score: 20 },
      { value: "code53", label: "A good bit of the time", score: 40 },
      { value: "code54", label: "Some of the time", score: 60 },
      { value: "code55", label: "A little of the time", score: 80 },
      { value: "code56", label: "None of the time", score: 100 }
    ]
  },
  {
    id: 26,
    domain: 'MH',
    text: "Have you felt calm and peaceful?",
    options: [
      { value: "code41", label: "All of the time", score: 100 },
      { value: "code42", label: "Most of the time", score: 80 },
      { value: "code43", label: "A good bit of the time", score: 60 },
      { value: "code44", label: "Some of the time", score: 40 },
      { value: "code45", label: "A little of the time", score: 20 },
      { value: "code46", label: "None of the time", score: 0 }
    ]
  },
  {
    id: 28,
    domain: 'MH',
    text: "Have you felt downhearted and blue?",
    options: [
      { value: "code51", label: "All of the time", score: 0 },
      { value: "code52", label: "Most of the time", score: 20 },
      { value: "code53", label: "A good bit of the time", score: 40 },
      { value: "code54", label: "Some of the time", score: 60 },
      { value: "code55", label: "A little of the time", score: 80 },
      { value: "code56", label: "None of the time", score: 100 }
    ]
  },
  {
    id: 30,
    domain: 'MH',
    text: "Have you been a happy person?",
    options: [
      { value: "code41", label: "All of the time", score: 100 },
      { value: "code42", label: "Most of the time", score: 80 },
      { value: "code43", label: "A good bit of the time", score: 60 },
      { value: "code44", label: "Some of the time", score: 40 },
      { value: "code45", label: "A little of the time", score: 20 },
      { value: "code46", label: "None of the time", score: 0 }
    ]
  }
];

// ✅ Domain section order
export const SF36_SECTION_ORDER = ['GH', 'PF', 'RP', 'RE', 'SF', 'BP', 'VT', 'MH'];

// ✅ Domain information
export const SF36_DOMAINS = {
  PF: { name: 'Physical Functioning', description: 'Ability to perform physical activities' },
  RP: { name: 'Role Physical', description: 'Limitations due to physical health' },
  BP: { name: 'Bodily Pain', description: 'Pain and its interference with work' },
  GH: { name: 'General Health', description: 'Overall health perception' },
  VT: { name: 'Vitality', description: 'Energy and fatigue levels' },
  SF: { name: 'Social Functioning', description: 'Impact on social activities' },
  RE: { name: 'Role Emotional', description: 'Limitations due to emotional problems' },
  MH: { name: 'Mental Health', description: 'Psychological well-being' }
};
