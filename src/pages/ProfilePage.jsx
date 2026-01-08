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
  ChevronRight,
  Clock,
  Activity,
  Brain,
  Scale,
  Heart,
  Ear,
  TrendingUp,
  History
} from "lucide-react";


import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPersonalDetails } from "../store/slices/userSlice";

const ProfilePage = () => {
  const { user, personalDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState(null);

  // fetch test results and personal details
  useEffect(() => {
    dispatch(fetchPersonalDetails());
    const fetchResults = async () => {
      try {
        const res = await axios.get(`/api/frailty-tests/results`, { withCredentials: true });

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

  const availableTests = [
    { title: "Sleep Quality", icon: Clock, path: "/tests/psqi-intro", color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Memory Test", icon: Brain, path: "/tests/memory-intro", color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Reaction Time", icon: Activity, path: "/tests/reactiontime", color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Stress Scale", icon: Scale, path: "/tests/pss-intro", color: "text-red-600", bg: "bg-red-50" },
    { title: "Self Reaction", icon: TrendingUp, path: "/tests/selfreaction-test", color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Balance Test", icon: Scale, path: "/tests/balance-intro", color: "text-teal-600", bg: "bg-teal-50" },
    { title: "SF-36 Health", icon: Heart, path: "/tests/sf36-intro", color: "text-rose-600", bg: "bg-rose-50" },
    { title: "Hearing Test", icon: Ear, path: "/tests/hearing-intro", color: "text-green-600", bg: "bg-green-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 font-sans">
      {/* Top Header Section */}
      <div className="relative bg-gradient-to-br from-green-700 via-emerald-600 to-teal-700 text-white pb-32 pt-40 px-6 rounded-b-[3rem] shadow-xl overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-teal-300 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            {/* User Welcome */}
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-green-100 font-medium mb-1">Welcome back,</p>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{user?.name || "User Profile"}</h1>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <div className="min-w-[140px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/15 transition-colors cursor-default">
                <div className="flex items-center gap-2 text-green-100 mb-2">
                  <Activity className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Total Tests</span>
                </div>
                <p className="text-2xl font-bold">{totalTests}</p>
              </div>

              <div className="min-w-[140px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/15 transition-colors cursor-default">
                <div className="flex items-center gap-2 text-green-100 mb-2">
                  <CalendarDays className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Last Activity</span>
                </div>
                <p className="text-lg font-semibold truncate">{lastTestDate}</p>
              </div>

              <div className="min-w-[140px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/15 transition-colors cursor-default">
                <div className="flex items-center gap-2 text-green-100 mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Status</span>
                </div>
                <p className="text-lg font-semibold truncate">{headerCategory}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-10 space-y-12">

        {/* Health Trends Chart Section */}


        {/* User Stats / Details Section */}
        {personalDetails && (
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
              <span className="w-1 h-6 bg-green-500 rounded-full block"></span>
              Your Details
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Age</p>
                <p className="font-semibold text-gray-900 text-lg">{personalDetails.age || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Gender</p>
                <p className="font-semibold text-gray-900 text-lg capitalize">{personalDetails.gender || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Height</p>
                <p className="font-semibold text-gray-900 text-lg">{personalDetails.height} {personalDetails.unitHeight}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Weight</p>
                <p className="font-semibold text-gray-900 text-lg">{personalDetails.weight} {personalDetails.unitWeight}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
              <Link to="/personal-details" className="text-sm font-semibold text-green-600 hover:text-green-700">
                Edit Details &rarr;
              </Link>
            </div>
          </section>
        )}

        {/* Available Tests Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full block"></span>
              Available Assessments
            </h2>
            <span className="text-sm text-gray-500 font-medium">{availableTests.length} tests available</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableTests.map((test, idx) => (
              <a
                key={idx}
                href={test.path}
                className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:border-green-200 transition-all duration-300 flex flex-col items-center text-center gap-3 relative overflow-hidden"
              >
                <div className={`w-12 h-12 rounded-full ${test.bg} flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-300`}>
                  <test.icon className={`w-6 h-6 ${test.color}`} />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{test.title}</h3>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Recent Results Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <span className="w-1 h-6 bg-green-500 rounded-full block"></span>
            Recent Results
          </h2>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin w-8 h-8 text-green-600" />
            </div>
          ) : Object.keys(groupedResults).length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <History className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No results yet</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                You haven't completed any assessments yet. Start your first test to see your health insights here.
              </p>
              <Link to="/tests" className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors">
                Start Assessment
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(groupedResults).map(([name, tests], index) => {
                const lastTest = tests[tests.length - 1];
                return (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-gray-800 text-lg line-clamp-1" title={name}>{name}</h3>
                      <div className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded-lg uppercase tracking-wide">
                        Latest
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-2">
                          <CalendarDays className="w-4 h-4" /> Date
                        </span>
                        <span className="font-medium text-gray-900">{formatDate(lastTest.timestamp || lastTest.date)}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-2">
                          <BarChart2 className="w-4 h-4" /> Score
                        </span>
                        <span className="font-bold text-gray-900 bg-gray-50 px-2 py-0.5 rounded-md">
                          {lastTest.overallScore || lastTest.totalScore || "N/A"}
                        </span>
                      </div>

                      <div className="pt-3 border-t border-gray-50">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Category</p>
                        <p className="font-medium text-green-700 text-sm">
                          {lastTest.assessment?.category || "Completed"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedResult({ name, tests })}
                      className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all flex items-center justify-center gap-2 group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600"
                    >
                      View History
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Details Drawer */}
      <AnimatePresence>
        {selectedResult && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedResult(null)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedResult.name}</h2>
                  <p className="text-sm text-gray-500">History Timeline</p>
                </div>
                <button
                  onClick={() => setSelectedResult(null)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
                  {selectedResult.tests.map((t, i) => (
                    <div key={i} className="relative pl-8">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white bg-green-500 shadow-sm"></div>

                      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium text-gray-400">
                            {formatDate(t.timestamp || t.date)}
                          </span>
                          {i === selectedResult.tests.length - 1 && (
                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Latest</span>
                          )}
                        </div>

                        <div className="mb-3">
                          <span className="text-3xl font-bold text-gray-900">
                            {t.overallScore || t.totalScore || "N/A"}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">Score</span>
                        </div>

                        {t.assessment?.category && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Result Category</p>
                            <p className="font-medium text-gray-800">{t.assessment.category}</p>
                          </div>
                        )}

                        {t.assessment?.notes && (
                          <div className="mt-3 text-sm text-gray-600 italic border-l-2 border-gray-200 pl-3">
                            "{t.assessment.notes}"
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={() => setSelectedResult(null)}
                  className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
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
