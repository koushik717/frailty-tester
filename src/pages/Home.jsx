import {
  Activity,
  Brain,
  Clock,
  Heart,
  Scale,
  Timer,
  Shield,
  Award,
  Users,
  BarChart3,
  Ear,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import PageSection from "../components/PageSection";
import AssessmentCard from "../components/AssessmentCard";
import AssessmentDropdown from "../components/AssessmentDropdown";

const Home = () => {
  const testCards = [
    {
      id: 1,
      title: "Pittsburgh Sleep Quality Index",
      description: "Comprehensive assessment of sleep quality and patterns",
      duration: "5–10 min",
      status: "available",
      path: "/tests/psqi-intro",
      icon: Clock,
      theme: "dark-green",
    },
    {
      id: 2,
      title: "Digit Memory Test",
      description: "Assess your cognitive function and memory",
      duration: "5–7 min",
      status: "available",
      path: "/tests/memory-intro",
      icon: Brain,
      theme: "dark-green",
    },
    {
      id: 3,
      title: "Reaction Time Test",
      description: "Measure your cognitive processing speed and reflexes",
      duration: "2–3 min",
      status: "available",
      path: "/tests/reactiontime",
      icon: Timer,
      theme: "dark-green",
    },
    {
      id: 4,
      title: "Perceived Stress Scale",
      description: "Evaluate your perceived stress over the last month",
      duration: "3–5 min",
      status: "available",
      path: "/tests/pss-intro",
      icon: Scale,
      theme: "dark-green",
    },
    {
      id: 5,
      title: "Self Reaction Test",
      description: "Self-reported assessment of cognitive reactivity",
      duration: "3–5 min",
      status: "available",
      path: "/tests/selfreaction-test",
      icon: Activity,
      theme: "dark-green",
    },
    {
      id: 6,
      title: "Balance Test",
      description:
        "Assess your postural stability and fall risk using AI pose detection",
      duration: "3–4 min",
      status: "available",
      path: "/tests/balance-intro",
      icon: Scale,
      theme: "dark-green",
    },
    {
      id: 7,
      title: "General Health Inventory (SF-36)",
      description: "36-item survey measuring overall health and functioning",
      duration: "7–12 min",
      status: "available",
      path: "/tests/sf36-intro",
      icon: Heart,
      theme: "dark-green",
    },
    {
      id: 8,
      title: "Hearing Test Suite",
      description: "Comprehensive hearing assessment with calibrated tests",
      duration: "10–15 min",
      status: "available",
      path: "/tests/hearing-intro",
      icon: Ear,
      theme: "dark-green",
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/50 overflow-hidden">
      {/* Hero Section */}
      <PageSection className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 via-emerald-500/5 to-green-400/5 pointer-events-none"></div>

        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-green-300/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl -z-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-8">
              <div className="bg-white/80 backdrop-blur-sm border border-green-200 px-4 py-2 text-sm font-medium rounded-full flex items-center shadow-sm text-green-800">
                <Shield className="w-4 h-4 mr-2 text-green-600" />
                Scientifically Validated Assessments
              </div>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight font-montserrat tracking-tight">
              Comprehensive
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                Frailty Tester
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto font-sans">
              Unlock personalized insights into your physical and cognitive health with our suite of professional-grade assessments.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <AssessmentDropdown
                  assessments={testCards}
                  buttonText="Start Assessment"
                  buttonClassName="relative bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                />
              </div>
              <button className="px-8 py-4 text-lg font-semibold text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all duration-300 flex items-center gap-2 group">
                Learn More
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { icon: Users, value: "93%", label: "Made Positive Changes" },
                { icon: Award, value: "87%", label: "Health Improvements" },
                { icon: Sparkles, value: "95%", label: "More Motivated" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-green-100 rounded-xl text-green-600">
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </PageSection>

      {/* Test Cards Section */}
      <PageSection className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50/50 to-white"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-montserrat">
                Choose Your Assessment
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
                Select from our comprehensive suite of validated tests to build your complete health profile.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="w-full max-w-7xl mx-auto flex flex-wrap justify-center gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {(() => {
              const sortedTestCards = [...testCards].sort((a, b) => {
                if (a.status === "available" && b.status !== "available") return -1;
                if (a.status !== "available" && b.status === "available") return 1;
                return 0;
              });

              return sortedTestCards.map((test) => (
                <motion.div key={test.id} variants={fadeInUp}>
                  <AssessmentCard
                    id={test.id}
                    title={test.title}
                    description={test.description}
                    status={test.status}
                    path={test.path}
                    duration={test.duration}
                    theme={test.theme}
                    icon={test.icon}
                  />
                </motion.div>
              ));
            })()}
          </motion.div>
        </div>
      </PageSection>

      {/* Call-to-Action Section */}
      <PageSection className="py-24 bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-montserrat">
              Complete Your Health Profile Today
            </h2>

            <p className="text-xl text-green-100 mb-10 leading-relaxed font-sans max-w-2xl mx-auto opacity-90">
              Take all available assessments to get a comprehensive view of your physical and cognitive health. Our
              scientifically validated tests provide actionable insights for your wellness journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <AssessmentDropdown
                assessments={testCards}
                buttonText="Start Full Assessment"
                buttonClassName="bg-white text-green-900 hover:bg-green-50 px-8 py-4 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1"
              />
              <button className="px-8 py-4 text-lg font-semibold text-white border border-white/30 hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm">
                View Sample Report
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/10 pt-10">
              {[
                { icon: Shield, text: "Scientifically Validated" },
                { icon: Clock, text: "Quick & Easy" },
                { icon: Award, text: "Personalized Results" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 text-green-100">
                  <div className="p-3 bg-white/10 rounded-full">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </PageSection>
    </div>
  );
};

export default Home;
