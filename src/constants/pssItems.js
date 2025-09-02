/**
 * Perceived Stress Scale (PSS-10) Items
 * 
 * A validated 10-item questionnaire measuring perceived stress over the last month.
 * Items are scored on a 0-4 Likert scale where higher values indicate less stress.
 * 
 * Reverse-scored items: 4, 5, 7, 8 (1-indexed) - these items are phrased positively
 * and need to be reverse-scored during calculation.
 * 
 * Total score range: 0-40
 * Categories: Low (0-13), Moderate (14-26), High (27-40)
 * 
 * Source: Migrated from MyEdMasters-MML repository with exact wording and scoring
 */
export const PSS_ITEMS = [
  {
    id: 1,
    text: "In the last month, how often have you been upset because of something that happened unexpectedly?",
    reverseScored: false
  },
  {
    id: 2,
    text: "In the last month, how often have you felt that you were unable to control the important things in your life?",
    reverseScored: false
  },
  {
    id: 3,
    text: "In the last month, how often have you felt nervous and \"stressed\"?",
    reverseScored: false
  },
  {
    id: 4,
    text: "In the last month, how often have you not felt confident about your ability to handle your personal problems?",
    reverseScored: false
  },
  {
    id: 5,
    text: "In the last month, how often have you felt that things were not going your way?",
    reverseScored: false
  },
  {
    id: 6,
    text: "In the last month, how often have you found that you could not cope with all the things that you had to do?",
    reverseScored: false
  },
  {
    id: 7,
    text: "In the last month, how often have you not been able to control irritations in your life?",
    reverseScored: false
  },
  {
    id: 8,
    text: "In the last month, how often have you felt that you were not on top of things?",
    reverseScored: false
  },
  {
    id: 9,
    text: "In the last month, how often have you been angered because of things that were outside of your control?",
    reverseScored: false
  },
  {
    id: 10,
    text: "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?",
    reverseScored: false
  }
];

/**
 * PSS Response Options
 * 
 * Response options for PSS-10 items on a 0-4 Likert scale.
 * Values are inverted from traditional scoring (Never=4, Very Often=0)
 * to match the source implementation exactly.
 */
export const PSS_RESPONSE_OPTIONS = [
  { value: 4, label: "Never" },
  { value: 3, label: "Almost Never" },
  { value: 2, label: "Sometimes" },
  { value: 1, label: "Fairly Often" },
  { value: 0, label: "Very Often" }
];
