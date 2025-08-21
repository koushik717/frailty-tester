import React from "react";
import { Link } from "react-router-dom";
import { 
  Activity, 
  Brain, 
  Clock, 
  Ear, 
  Heart, 
  Scale, 
  Timer, 
  TrendingUp, 
  ArrowRight, 
  Shield, 
  Award, 
  Users, 
  BarChart3 
} from "lucide-react";
import PageSection from "../components/PageSection";
import AssessmentCard from "../components/AssessmentCard";
import AssessmentDropdown from "../components/AssessmentDropdown";

const Home = () => {
  const SHOW_PSQI = true;
  const testCards = [
    {
      id: 1,
      title: "Pittsburgh Sleep Quality Index",
      description: "Comprehensive assessment of sleep quality and patterns",
      duration: "5–10 min",
      status: "available",
      path: "/tests/psqi-intro",
      icon: Clock,
      theme: "dark-green"
    },
    {
      id: 2,
      title: "Digit Memory Test",
      description: "Assess your cognitive function and memory",
      duration: "5–7 min",
      status: "available",
      path: "/tests/memory-intro",
      icon: Brain,
      theme: "dark-green"
    },
    {
      id: 3,
      title: "Reaction Time Test",
      description: "Measure your cognitive processing speed and reflexes",
      duration: "2–3 min",
      status: "available",
      path: "/reaction-time-test",
      icon: Timer,
      theme: "dark-green"
    },
    {
      id: 4,
      title: "Perceived Stress Scale",
      description: "Evaluate your perceived stress over the last month",
      duration: "3–5 min",
      status: "coming-soon",
      path: "",
      icon: Scale,
      theme: "yellow"
    },
    {
      id: 5,
      title: "Self Reaction Test",
      description: "Self-reported assessment of cognitive reactivity",
      duration: "3–5 min",
      status: "available",
      path: "/tests/self-reaction-intro",
      icon: Activity,
      theme: "dark-green"
    },
    {
      id: 6,
      title: "General Health Inventory (SF-36)",
      description: "36-item survey measuring overall health and functioning",
      duration: "7–12 min",
      status: "coming-soon",
      path: "",
      icon: Heart,
      theme: "yellow"
    }
  ];

  // Previously defined cards (commented out to preserve code)
  /*
  {
    id: 1,
    title: "Reaction Time Test",
    description: "Measure your cognitive processing speed and reflexes",
    icon: Timer,
    status: "available",
    theme: "dark-green",
    duration: "2-3 min",
    path: "/reaction-time-test"
  },
  {
    id: 2,
    title: "Balance Test",
    description: "Assess your postural stability and fall risk",
    icon: Scale,
    status: "available",
    theme: "dark-green",
    duration: "3-4 min",
    path: "/balance-intro"
  },
  {
    id: 3,
    title: "Gait Speed Test",
    description: "Evaluate your walking speed and mobility",
    icon: TrendingUp,
    status: "coming-soon",
    theme: "yellow",
    duration: "2-3 min",
    path: "/gait-speed-intro"
  },
  {
    id: 4,
    title: "Chair Stand Test",
    description: "Test your lower body strength and endurance",
    icon: Activity,
    status: "available",
    theme: "dark-green",
    duration: "1-2 min",
    path: "/chair-stand-intro"
  },
  {
    id: 5,
    title: "Memory Recall Test",
    description: "Assess your cognitive function and memory",
    icon: Brain,
    status: "available",
    theme: "dark-green",
    duration: "5-7 min",
    path: "/tests/memory-intro"
  },
  {
    id: 6,
    title: "Pittsburgh Sleep Quality Index",
    description: "Comprehensive assessment of sleep quality and patterns",
    icon: Clock,
    status: "available",
    theme: "dark-green",
    duration: "5-10 min",
    path: "/tests/psqi-intro"
  },
  {
    id: 7,
    title: "Walking Speed & Grip Strength",
    description: "Comprehensive assessment of mobility and upper body strength",
    icon: Heart,
    status: "coming-soon",
    theme: "green",
    duration: "2-3 min",
    path: "/walking-grip-intro"
  },
  {
    id: 8,
    title: "Hearing Test",
    description: "Evaluate your auditory processing capabilities",
    icon: Ear,
    status: "coming-soon",
    theme: "dark-green",
    duration: "3-5 min",
    path: "/hearing-intro"
  }
  */



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/50">
      {/* Hero Section */}
      <PageSection className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-emerald-500/5 to-green-400/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="bg-green-100 text-green-800 border-green-200 px-4 py-2 text-sm font-medium rounded-full flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Scientifically Validated Assessments
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight font-montserrat">
              Comprehensive
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Frailty Tester
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto font-sans">
              Scientifically validated tests to evaluate your physical and cognitive function, providing personalized
              insights for optimal health and longevity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <AssessmentDropdown 
                assessments={testCards}
                buttonText="Start Assessment"
              />
              <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-xl bg-transparent transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">93%</div>
                <div className="text-gray-600">Made Positive Changes</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">87%</div>
                <div className="text-gray-600">Health Improvements</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">87%</div>
                <div className="text-gray-600">More Motivated</div>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Test Cards Section */}
      <PageSection className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-montserrat">
              Choose Your Assessment
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-sans">
              Select from our comprehensive suite of validated tests to build your complete health profile
            </p>
          </div>

          <div className="w-full max-w-7xl mx-auto flex flex-wrap justify-center gap-6">
            {(() => {
              const sortedTestCards = [...testCards].sort((a, b) => {
                if (a.status === "available" && b.status !== "available") return -1;
                if (a.status !== "available" && b.status === "available") return 1;
                return 0;
              });

              return sortedTestCards.map((test) => (
                <AssessmentCard
                  key={test.id}
                  id={test.id}
                  title={test.title}
                  description={test.description}
                  status={test.status}
                  path={test.path}
                  duration={test.duration}
                  theme={test.theme}
                  icon={test.icon}
                />
              ));
            })()}
          </div>
        </div>
      </PageSection>

      {/* Call-to-Action Section */}
      <PageSection className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-montserrat">
            Complete Your Health Profile Today
          </h2>

          <p className="text-xl text-green-100 mb-8 leading-relaxed font-sans">
            Take all available assessments to get a comprehensive view of your physical and cognitive health. Our
            scientifically validated tests provide actionable insights for your wellness journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <AssessmentDropdown 
              assessments={testCards}
              buttonText="Start Full Assessment"
              buttonClassName="bg-white text-green-600 hover:bg-gray-50"
            />
            <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl bg-transparent transition-all duration-300">
              View Sample Report
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-green-100">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span className="font-medium">Scientifically Validated</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-medium">Quick & Easy</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              <span className="font-medium">Personalized Results</span>
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  );
};

export default Home; 