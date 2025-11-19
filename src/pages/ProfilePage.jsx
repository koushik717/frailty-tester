import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  BarChart2,
  CalendarDays,
  AlertCircle,
  X,
  User as UserIcon,
} from "lucide-react";

const ProfilePage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState(null);

  // fetch test results
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("/api/frailty-tests/results");

        let data = res.data;
        if (data && !Array.isArray(data) && Array.isArray(data.results)) {
          data = data.results;
        }
        if (data && !Array.isArray(data) && Array.isArray(data.data)) {
          data = data.data;
        }
        if (!Array.isArray(data)) {
          console.warn("API did not return array. Got:", data);
          data = [];
        }

        setResults(data);
      } catch (err) {
        console.error("Error fetching results:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Not available";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ===== derived header stats =====
  const totalTests = results.length;
  const lastTestDate =
    totalTests > 0
      ? formatDate(
          results
            .map((r) => r.timestamp || r.date)
            .filter(Boolean)
            .sort((a, b) => new Date(b) - new Date(a))[0]
        )
      : "No tests yet";

  const headerCategory =
    results.find(
      (r) => r.assessment && r.assessment.category && r.assessment.category !== ""
    )?.assessment?.category || "—";

  // ✅ Group results by testName
  const groupedResults = results.reduce((acc, test) => {
    const name = test.testName || "Untitled Test";
    if (!acc[name]) acc[name] = [];
    acc[name].push(test);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* top summary header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 sm:px-8 pt-6 pb-20 rounded-b-3xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* left: avatar + name */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <UserIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm opacity-80">Welcome back</p>
              <h1 className="text-2xl font-semibold leading-tight">
                Welcome, User
              </h1>
            </div>
          </div>

          {/* right: quick stats */}
          <div className="flex gap-3 flex-wrap">
            <div className="bg-white/10 rounded-2xl px-4 py-2">
              <p className="text-xs opacity-80">Total Tests</p>
              <p className="text-lg font-semibold">{totalTests}</p>
            </div>
            <div className="bg-white/10 rounded-2xl px-4 py-2">
              <p className="text-xs opacity-80">Last Test</p>
              <p className="text-lg font-semibold">{lastTestDate}</p>
            </div>
            <div className="bg-white/10 rounded-2xl px-4 py-2">
              <p className="text-xs opacity-80">Recent Category</p>
              <p className="text-lg font-semibold">{headerCategory}</p>
            </div>
          </div>
        </div>
      </div>

      {/* main content (cards) */}
      <div className="-mt-12 px-4 sm:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Test Results
        </h2>

        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <Loader2 className="animate-spin w-8 h-8 text-green-600" />
          </div>
        ) : Object.keys(groupedResults).length === 0 ? (
          <div className="flex flex-col justify-center items-center mt-20 text-gray-500">
            <AlertCircle className="w-10 h-10 mb-3 text-gray-400" />
            <p className="text-lg">No results yet</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(groupedResults).map(([name, tests], index) => {
              const lastTest = tests[tests.length - 1];
              return (
                <div
                  key={index}
                  className="shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white rounded-2xl flex flex-col"
                >
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {name}
                      </h3>
                      <BarChart2 className="text-green-500 w-5 h-5" />
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      {formatDate(lastTest.timestamp || lastTest.date)}
                    </div>

                    <p className="text-md font-medium text-gray-700 mb-4">
                      Overall Score:{" "}
                      <span className="text-green-600 font-bold">
                        {lastTest.overallScore ||
                          lastTest.totalScore ||
                          "N/A"}
                      </span>
                    </p>

                    <p className="text-sm text-gray-600 mb-2">
                      Category:{" "}
                      <span className="text-green-600 font-semibold">
                        {lastTest.assessment?.category || "N/A"}
                      </span>
                    </p>

                    <button
                      onClick={() =>
                        setSelectedResult({ name, tests })
                      }
                      className="mt-auto w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sliding Drawer */}
      <AnimatePresence>
        {selectedResult && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedResult(null)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col rounded-l-3xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <div className="flex items-center justify-between border-b p-5">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedResult.name}
                </h2>
                <button
                  onClick={() => setSelectedResult(null)}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedResult.tests.map((t, i) => (
                  <div
                    key={i}
                    className="border border-gray-100 rounded-lg p-4"
                  >
                    <p className="text-sm text-gray-500 mb-1">
                      {formatDate(t.timestamp || t.date)}
                    </p>
                    <p className="text-gray-800 font-medium">
                      Score:{" "}
                      <span className="text-green-600 font-semibold">
                        {t.overallScore || t.totalScore || "N/A"}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Category:{" "}
                      <span className="text-green-600 font-semibold">
                        {t.assessment?.category || "N/A"}
                      </span>
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t p-5">
                <button
                  onClick={() => setSelectedResult(null)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-xl transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
