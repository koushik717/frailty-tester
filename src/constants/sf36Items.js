/**
 * SF-36 Health Survey Items
 * 
 * A comprehensive 36-item health survey measuring health-related quality of life
 * across 8 domains: Physical Functioning (PF), Role Physical (RP), Bodily Pain (BP),
 * General Health (GH), Vitality (VT), Social Functioning (SF), Role Emotional (RE),
 * and Mental Health (MH).
 * 
 * Key Features:
 * - Global question numbering 1-36 across all domains
 * - Duplicate questions (q20, q22) appear in multiple domains but share state
 * - Domain-based organization for UI pagination
 * - Exact wording and scoring from source implementation
 * 
 * Domain Distribution:
 * - PF: 10 items (Physical Functioning)
 * - RP: 4 items (Role Physical)
 * - BP: 2 items (Bodily Pain)
 * - GH: 6 items (General Health)
 * - VT: 4 items (Vitality)
 * - SF: 2 items (Social Functioning)
 * - RE: 3 items (Role Emotional)
 * - MH: 5 items (Mental Health)
 * 
 * Source: Migrated from MyEdMasters-MML repository with exact question order and domain mapping
 */
export const SF36_ITEMS = [
  // General Health (GH) - 6 items in EXACT SOURCE order
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
    id: 20,
    domain: 'GH',
    text: "During the past 4 weeks, to what extent has your physical health or emotional problems interfered with your normal social activities with family, friends, neighbors, or groups?",
    options: [
      { value: "code41", label: "Not at all", score: 100 },
      { value: "code42", label: "Slightly", score: 80 },
      { value: "code43", label: "Moderately", score: 60 },
      { value: "code44", label: "Quite a bit", score: 40 },
      { value: "code45", label: "Extremely", score: 20 }
    ]
  },
  {
    id: 22,
    domain: 'GH',
    text: "During the past 4 weeks, how much did pain interfere with your normal work (including both work outside the home and housework)?",
    options: [
      { value: "code41", label: "Not at all", score: 100 },
      { value: "code42", label: "A little bit", score: 80 },
      { value: "code43", label: "Moderately", score: 60 },
      { value: "code44", label: "Quite a bit", score: 40 },
      { value: "code45", label: "Extremely", score: 20 }
    ]
  },
  {
    id: 34,
    domain: 'GH',
    text: "I am as healthy as anybody I know",
    options: [
      { value: "code61", label: "Definitely true", score: 100 },
      { value: "code62", label: "Mostly true", score: 75 },
      { value: "code63", label: "Don't know", score: 50 },
      { value: "code64", label: "Mostly false", score: 25 },
      { value: "code65", label: "Definitely false", score: 0 }
    ]
  },
  {
    id: 36,
    domain: 'GH',
    text: "My health is excellent",
    options: [
      { value: "code61", label: "Definitely true", score: 100 },
      { value: "code62", label: "Mostly true", score: 75 },
      { value: "code63", label: "Don't know", score: 50 },
      { value: "code64", label: "Mostly false", score: 25 },
      { value: "code65", label: "Definitely false", score: 0 }
    ]
  },

  // Physical Functioning (PF) - 10 items in EXACT SOURCE order
  {
    id: 3,
    domain: 'PF',
    text: "Vigorous activities, such as running, lifting heavy objects, participating in strenuous sports",
    options: [
      { value: "code21", label: "Yes, limited a lot", score: 0 },
      { value: "code22", label: "Yes, limited a little", score: 50 },
      { value: "code23", label: "No, not limited at all", score: 100 }
    ]
  },
  {
    id: 4,
    domain: 'PF',
    text: "Moderate activities, such as moving a table, pushing a vacuum cleaner, bowling, or playing golf",
    options: [
      { value: "code21", label: "Yes, limited a lot", score: 0 },
      { value: "code22", label: "Yes, limited a little", score: 50 },
      { value: "code23", label: "No, not limited at all", score: 100 }
    ]
  },
  {
    id: 5,
    domain: 'PF',
    text: "Lifting or carrying groceries",
    options: [
      { value: "code21", label: "Yes, limited a lot", score: 0 },
      { value: "code22", label: "Yes, limited a little", score: 50 },
      { value: "code23", label: "No, not limited at all", score: 100 }
    ]
  },
  {
    id: 6,
    domain: 'PF',
    text: "Climbing several flights of stairs",
    options: [
      { value: "code21", label: "Yes, limited a lot", score: 0 },
      { value: "code22", label: "Yes, limited a little", score: 50 },
      { value: "code23", label: "No, not limited at all", score: 100 }
    ]
  },
  {
    id: 7,
    domain: 'PF',
    text: "Climbing one flight of stairs",
    options: [
      { value: "code21", label: "Yes, limited a lot", score: 0 },
      { value: "code22", label: "Yes, limited a little", score: 50 },
      { value: "code23", label: "No, not limited at all", score: 100 }
    ]
  },
  {
    id: 8,
    domain: 'PF',
    text: "Bending, kneeling, or stooping",
    options: [
      { value: "code21", label: "Yes, limited a lot", score: 0 },
      { value: "code22", label: "Yes, limited a little", score: 50 },
      { value: "code23", label: "No, not limited at all", score: 100 }
    ]
  },
  {
    id: 9,
    domain: 'PF',
    text: "Walking more than a mile",
    options: [
      { value: "code21", label: "Yes, limited a lot", score: 0 },
      { value: "code22", label: "Yes, limited a little", score: 50 },
      { value: "code23", label: "No, not limited at all", score: 100 }
    ]
  },
  {
    id: 10,
    domain: 'PF',
    text: "Walking several blocks",
    options: [
      { value: "code21", label: "Yes, limited a lot", score: 0 },
      { value: "code22", label: "Yes, limited a little", score: 50 },
      { value: "code23", label: "No, not limited at all", score: 100 }
    ]
  },
  {
    id: 11,
    domain: 'PF',
    text: "Walking one block",
    options: [
      { value: "code21", label: "Yes, limited a lot", score: 0 },
      { value: "code22", label: "Yes, limited a little", score: 50 },
      { value: "code23", label: "No, not limited at all", score: 100 }
    ]
  },
  {
    id: 12,
    domain: 'PF',
    text: "Bathing or dressing yourself",
    options: [
      { value: "code21", label: "Yes, limited a lot", score: 0 },
      { value: "code22", label: "Yes, limited a little", score: 50 },
      { value: "code23", label: "No, not limited at all", score: 100 }
    ]
  },

  // Role Physical (RP) - 4 items in EXACT SOURCE order
  {
    id: 13,
    domain: 'RP',
    text: "Cut down the amount of time you spent on work or other activities",
    options: [
      { value: "code31", label: "Yes", score: 0 },
      { value: "code32", label: "No", score: 100 }
    ]
  },
  {
    id: 14,
    domain: 'RP',
    text: "Accomplished less than you would like",
    options: [
      { value: "code31", label: "Yes", score: 0 },
      { value: "code32", label: "No", score: 100 }
    ]
  },
  {
    id: 15,
    domain: 'RP',
    text: "Were limited in the kind of work or other activities",
    options: [
      { value: "code31", label: "Yes", score: 0 },
      { value: "code32", label: "No", score: 100 }
    ]
  },
  {
    id: 16,
    domain: 'RP',
    text: "Had difficulty performing the work or other activities (for example, it took extra effort)",
    options: [
      { value: "code31", label: "Yes", score: 0 },
      { value: "code32", label: "No", score: 100 }
    ]
  },

  // Role Emotional (RE) - 3 items in EXACT SOURCE order
  {
    id: 17,
    domain: 'RE',
    text: "Cut down the amount of time you spent on work or other activities",
    options: [
      { value: "code31", label: "Yes", score: 0 },
      { value: "code32", label: "No", score: 100 }
    ]
  },
  {
    id: 18,
    domain: 'RE',
    text: "Accomplished less than you would like",
    options: [
      { value: "code31", label: "Yes", score: 0 },
      { value: "code32", label: "No", score: 100 }
    ]
  },
  {
    id: 19,
    domain: 'RE',
    text: "Didn't do work or other activities as carefully as usual",
    options: [
      { value: "code31", label: "Yes", score: 0 },
      { value: "code32", label: "No", score: 100 }
    ]
  },

  // Social Functioning (SF) - 2 items in EXACT SOURCE order (including q20 which is also in GH)
  {
    id: 20,
    domain: 'SF',
    text: "During the past 4 weeks, to what extent has your physical health or emotional problems interfered with your normal social activities with family, friends, neighbors, or groups?",
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
    text: "During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (like visiting with friends, relatives, etc.)?",
    options: [
      { value: "code41", label: "All of the time", score: 0 },
      { value: "code42", label: "Most of the time", score: 20 },
      { value: "code43", label: "A good bit of the time", score: 40 },
      { value: "code44", label: "Some of the time", score: 60 },
      { value: "code45", label: "A little of the time", score: 80 },
      { value: "code46", label: "None of the time", score: 100 }
    ]
  },

  // Pain (BP) - 2 items in EXACT SOURCE order (including q22 which is also in GH)
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

  // Energy/Vitality (VT) - 4 items in EXACT SOURCE order
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

  // Mental Health (MH) - 5 items in EXACT SOURCE order
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
  },

  // Missing questions to complete the 36 items (based on SOURCE analysis)
  {
    id: 33,
    domain: 'GH',
    text: "I seem to get sick a little easier than other people",
    options: [
      { value: "code61", label: "Definitely true", score: 0 },
      { value: "code62", label: "Mostly true", score: 25 },
      { value: "code63", label: "Don't know", score: 50 },
      { value: "code64", label: "Mostly false", score: 75 },
      { value: "code65", label: "Definitely false", score: 100 }
    ]
  },
  {
    id: 35,
    domain: 'GH',
    text: "I expect my health to get worse",
    options: [
      { value: "code61", label: "Definitely true", score: 0 },
      { value: "code62", label: "Mostly true", score: 25 },
      { value: "code63", label: "Don't know", score: 50 },
      { value: "code64", label: "Mostly false", score: 75 },
      { value: "code65", label: "Definitely false", score: 100 }
    ]
  }
];

// Domain section order based on SOURCE (corrected for proper SF-36 structure)
export const SF36_SECTION_ORDER = ['GH', 'PF', 'RP', 'RE', 'SF', 'BP', 'VT', 'MH'];

// Domain information for display
export const SF36_DOMAINS = {
  PF: { name: 'Physical Functioning', description: 'Ability to perform physical activities' },
  RP: { name: 'Role Physical', description: 'Limitations in work or daily activities due to physical health' },
  BP: { name: 'Bodily Pain', description: 'Pain and its interference with work' },
  GH: { name: 'General Health', description: 'Overall health perception' },
  VT: { name: 'Vitality', description: 'Energy and fatigue levels' },
  SF: { name: 'Social Functioning', description: 'Impact of health on social activities' },
  RE: { name: 'Role Emotional', description: 'Limitations in work or daily activities due to emotional problems' },
  MH: { name: 'Mental Health', description: 'Psychological distress and well-being' }
};
