// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
import BalanceIntro from "./pages/screens/BalanceIntro";
import BalanceTest from "./pages/tests/BalanceTest";
import ChairStandIntro from "./pages/screens/ChairStandIntro";
import ChairStandTest from "./pages/tests/ChairStandTest";
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
import ComingSoonPage from "./pages/screens/ComingSoonPage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthSuccess from "./pages/AuthSuccess";
import HearingTestIntro from "./pages/screens/HearingTestIntro";
import HearingTest from "./pages/tests/HearingTest";

import Footer from "./layout/Footer";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tests/balance-intro" element={<BalanceIntro />} />
          <Route path="/tests/balance-test" element={<BalanceTest />} />
          <Route path="/tests/chair-stand-intro" element={<ChairStandIntro />} />
          <Route path="/tests/chair-stand-test" element={<ChairStandTest />} />
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
          <Route path="/tests/selfreaction-intro" element={<SelfReactionIntro />} />
          <Route path="/tests/selfreaction-test" element={<SelfReactionTest />} />
          <Route path="/tests/reactiontime" element={<ReactionTimeTestPage />} />
          <Route path="/tests/hearing-intro" element={<HearingTestIntro />} />
          <Route path="/tests/hearing-test" element={<HearingTest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth-success" element={<AuthSuccess />} />
          <Route path="*" element={<ComingSoonPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;

