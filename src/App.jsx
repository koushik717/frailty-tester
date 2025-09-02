// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BalanceIntro from "./pages/screens/BalanceIntro";
import BalanceTest from "./pages/tests/BalanceTest";
import ChairStandIntro from "./pages/screens/ChairStandIntro";
import ChairStandTest from "./pages/tests/ChairStandTest";
import ComingSoonPage from "./pages/screens/ComingSoonPage";
import Header from "./layout/Header";
import MemoryIntro from "./pages/tests/memory/MemoryIntro";
import MemoryTest from "./pages/tests/memory/MemoryTest";
import MemoryResults from "./pages/tests/memory/MemoryResults";
import PSQIIntro from "./pages/tests/psqi/PSQIIntro";
import PSQITest from "./pages/tests/psqi/PSQITest";
import PSQIResults from "./pages/tests/psqi/PSQIResults";
import PSSIntro from "./pages/screens/PSSIntro";
import PSSTest from "./pages/tests/PSSTest";
import SF36Intro from "./pages/screens/SF36Intro";
import SF36Test from "./pages/tests/SF36Test";
import SelfReactionIntro from "./pages/screens/SelfReactionIntro";
import SelfReactionTest from "./pages/tests/SelfReactionTest";
import ReactionTimeTestPage from "./pages/ReactionTimeTestPage";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tests/reaction-time-intro" element={<ReactionTimeTestPage />} />
        <Route path="/tests/reaction-time-test" element={<ReactionTimeTestPage />} />
        <Route path="/tests/memory-intro" element={<MemoryIntro />} />
        <Route path="/tests/memory-test" element={<MemoryTest />} />
        <Route path="/tests/memory-results" element={<MemoryResults />} />
        <Route path="/tests/psqi-intro" element={<PSQIIntro />} />
        <Route path="/tests/psqi-test" element={<PSQITest />} />
        <Route path="/tests/psqi-results" element={<PSQIResults />} />
        <Route path="/tests/pss-intro" element={<PSSIntro />} />
        <Route path="/tests/pss-test" element={<PSSTest />} />
        <Route path="/tests/sf36-intro" element={<SF36Intro />} />
        <Route path="/tests/sf36-test" element={<SF36Test />} />
        <Route path="/tests/self-reaction-intro" element={<SelfReactionIntro />} />
        <Route path="/tests/self-reaction-test" element={<SelfReactionTest />} />
        <Route path="/tests/balance-intro" element={<BalanceIntro />} />
        <Route path="/tests/balance-test" element={<BalanceTest />} />
        <Route path="/chair-stand-intro" element={<ChairStandIntro />} />
        <Route path="/chair-stand-test" element={<ChairStandTest />} />
        <Route path="/gait-speed-intro" element={<ComingSoonPage testName="Gait Speed Test" />} />
        <Route path="/walking-grip-intro" element={<ComingSoonPage testName="Walking Speed & Grip Strength Test" />} />
        <Route path="/hearing-intro" element={<ComingSoonPage testName="Hearing Test" />} />
        <Route path="/about" element={
          <div className="p-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-8">
              <h1 className="font-montserrat text-3xl font-bold text-neutral-dark mb-4">About FrailtyTester</h1>
              <p className="font-sans text-neutral-medium leading-relaxed">
                FrailtyTester is dedicated to advancing health assessment through innovative, 
                scientifically-validated digital solutions that empower individuals to understand 
                and optimize their functional health.
              </p>
            </div>
          </div>
        } />
        <Route path="/settings" element={
          <div className="p-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-8">
              <h1 className="font-montserrat text-3xl font-bold text-neutral-dark mb-4">Settings</h1>
              <p className="font-sans text-neutral-medium leading-relaxed">
                Configure your assessment preferences and application settings.
              </p>
            </div>
          </div>
        } />
        <Route path="/profile" element={
          <div className="p-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-8">
              <h1 className="font-montserrat text-3xl font-bold text-neutral-dark mb-4">Profile</h1>
              <p className="font-sans text-neutral-medium leading-relaxed">
                View and manage your personal health profile and assessment history.
              </p>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
};

export default App;
