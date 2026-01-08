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

import Pricing from "./pages/Pricing";
import Billing from "./pages/Billing";
import PersonalDetails from "./pages/PersonalDetails";
import EmergencyContact from "./pages/EmergencyContact";
import Terms from "./pages/Terms";
import Dashboard from "./pages/Dashboard";
import Subscription from "./pages/Subscription";
import About from "./pages/About";
import RequirePersonalDetails from "./components/RequirePersonalDetails";
import RequireSubscription from "./components/RequireSubscription";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />
      <div className="flex-grow">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Protected Test Routes: Subscription -> Personal Details -> Test */}
            <Route path="/tests/balance-intro" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <BalanceIntro />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />

            <Route path="/tests/balance-test" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <BalanceTest />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />

            <Route path="/tests/chair-stand-intro" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <ChairStandIntro />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />

            <Route path="/tests/chair-stand-test" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <ChairStandTest />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />
            <Route path="/tests/memory-intro" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <MemoryIntro />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />
            <Route path="/tests/memory-test" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <MemoryTest />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />
            <Route path="/tests/memory-results" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <MemoryResults />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />
            <Route path="/tests/psqi-intro" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <PSQIIntro />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />
            <Route path="/tests/psqi-test" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <PSQITest />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />
            <Route path="/tests/psqi-results" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <PSQIResults />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />
            <Route path="/tests/pss-intro" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <PSSIntro />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />
            <Route path="/tests/pss-test" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <PSSTest />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />
            <Route path="/tests/sf36-intro" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <SF36Intro />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />
            <Route path="/tests/sf36-test" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <SF36Test />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />
            <Route path="/tests/selfreaction-intro" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <SelfReactionIntro />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />
            <Route path="/tests/selfreaction-test" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <SelfReactionTest />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />
            <Route path="/tests/reactiontime" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <ReactionTimeTestPage />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />
            <Route path="/tests/hearing-intro" element={
              <RequireSubscription>
                <RequirePersonalDetails>
                  <HearingTestIntro />
                </RequirePersonalDetails>
              </RequireSubscription>
            } />
            <Route path="/tests/hearing-test" element={<RequirePersonalDetails><HearingTest /></RequirePersonalDetails>} />

            {/* Auth & Onboarding Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth-success" element={<AuthSuccess />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/personal-details" element={<PersonalDetails />} />
            <Route path="/emergency-contact" element={<EmergencyContact />} />
            <Route path="/terms" element={<Terms />} />

            {/* Dashboard & Profile */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<About />} />

            <Route path="*" element={<ComingSoonPage />} />
          </Routes>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
};

export default App;

