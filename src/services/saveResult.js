// src/services/saveResult.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

/**
 * Save a test's summary into the global results store (results.json)
 * so that the Profile page can show it.
 */
export const saveResultToProfile = async ({
  testName,
  overallScore,
  category,
  startedAt,
  endedAt,
  extraData = {},
}) => {
  try {
    const payload = {
      testName: testName || "Untitled Test",
      overallScore: overallScore ?? null,
      assessment: {
        category: category ?? "N/A",
        startedAt: startedAt || null,
        endedAt: endedAt || null,
      },
      extraData,
    };

    await fetch(`${API_BASE_URL}/api/frailty-tests/results`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("✅ Saved profile result:", payload.testName);
  } catch (err) {
    console.error("❌ Failed to save profile result:", err);
  }
};
