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
  Sparkles,
  Ear,
  ChevronRight,
  ArrowDown
} from "lucide-react";
import { motion } from "framer-motion";
import PageSection from "../components/PageSection";
import AssessmentCard from "../components/AssessmentCard";
import AssessmentDropdown from "../components/AssessmentDropdown";

const Home = () => {
  const testCards = [
    {
      id: 1,
      title: "Pittsburgh Sleep Quality",
      description: "Analyze your sleep patterns and quality with this gold-standard assessment.",
      duration: "5-10 min",
      status: "available",
      path: "/tests/psqi-intro",
      icon: Clock,
      theme: "primary",
    },
    {
      id: 2,
      title: "Digit Memory Test",
      description: "Challenge your working memory and cognitive retention capacity.",
      duration: "5-7 min",
      status: "available",
      path: "/tests/memory-intro",
      icon: Brain,
      theme: "primary",
    },
    {
      id: 3,
      title: "Reaction Time",
      description: "Measure your neural processing speed and motor response reflexes.",
      duration: "2-3 min",
      status: "available",
      path: "/tests/reactiontime",
      icon: Timer,
      theme: "primary",
    },
    {
      id: 4,
      title: "Perceived Stress Scale",
      description: "Evaluate your psychological stress levels and coping mechanisms.",
      duration: "3-5 min",
      status: "available",
      path: "/tests/pss-intro",
      icon: Scale,
      theme: "primary",
    },
    {
      id: 5,
      title: "Self Reaction Test",
      description: "A self-reported assessment of your cognitive reactivity.",
      duration: "3-5 min",
      status: "available",
      path: "/tests/selfreaction-test",
      icon: Activity,
      theme: "primary",
    },
    {
      id: 6,
      title: "Balance Assessment",
      description: "AI-powered postural stability analysis to detect fall risks.",
      duration: "3-4 min",
      status: "available",
      path: "/tests/balance-intro",
      icon: Scale,
      theme: "primary",
    },
    {
      id: 7,
      title: "Health Inventory (SF-36)",
      description: "Comprehensive 36-item survey for overall health and functioning.",
      duration: "7-12 min",
      status: "available",
      path: "/tests/sf36-intro",
      icon: Heart,
      theme: "primary",
    },
    {
      id: 8,
      title: "Hearing Suite",
      description: "Professional grade audiometry and hearing frequency analysis.",
      duration: "10-15 min",
      status: "available",
      path: "/tests/hearing-intro",
      icon: Ear,
      theme: "primary",
    },
  ];

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-primary-100/40 rounded-full blur-[120px] mix-blend-multiply opacity-70 animate-float" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-accent-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-float" style={{ animationDelay: '-2s' }} />
      </div>

      {/* Hero Section */}
      <PageSection className="relative z-20 pt-24 pb-20 lg:pt-32 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants.container}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={variants} className="flex justify-center mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm text-sm font-semibold text-primary-700">
                <Shield className="w-4 h-4" />
                Valid Clinical Assessments
              </span>
            </motion.div>

            <motion.h1 variants={variants} className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.1] font-montserrat">
              Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Health Insights</span>
              <br /> Made Accessible.
            </motion.h1>

            <motion.p variants={variants} className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Unlock a deeper understanding of your physical and cognitive wellbeing with our professional-grade, AI-enhanced assessment suite.
            </motion.p>

            <motion.div variants={variants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <AssessmentDropdown
                assessments={testCards}
                buttonText="Start Free Assessment"
                buttonClassName="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-1"
              />
              <button className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-semibold transition-all hover:border-gray-300">
                How It Works
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={variants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { icon: Users, value: "10k+", label: "Active Users" },
                { icon: Award, value: "95%", label: "Accuracy Rate" },
                { icon: Activity, value: "8+", label: "Clinical Tests" }
              ].map((stat, i) => (
                <div key={i} className="glass px-6 py-6 rounded-2xl flex flex-col items-center">
                  <div className="p-3 bg-primary-50 text-primary-600 rounded-xl mb-3">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </PageSection>

      {/* Assessment Grid */}
      <PageSection className="relative z-10 py-24 bg-white/50 backdrop-blur-sm border-t border-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-montserrat">
              Select an Assessment
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Choose from our diverse range of tests covering memory, balance, hearing, and stress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {testCards.map((test) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <AssessmentCard {...test} />
              </motion.div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* CTA Footer */}
      <PageSection className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-primary-900" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat">
            Ready to take control?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Join thousands of users who are actively monitoring and improving their health with FrailtyTester.
          </p>
          <button className="px-10 py-5 bg-white text-primary-900 rounded-2xl font-bold text-lg hover:bg-primary-50 transition-colors shadow-2xl shadow-primary-900/50">
            Get Started Now
          </button>
        </div>
      </PageSection>
    </div>
  );
};

export default Home;
