import React from "react";
import { FaRunning, FaBalanceScale, FaWalking, FaChair, FaBrain, FaDumbbell, FaAssistiveListeningSystems } from "react-icons/fa";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PageSection from "../../components/PageSection";

// Semantic class constants - MyYouthspan branding
const pageContainerClasses = "min-h-screen bg-gray-50 flex flex-col items-center";
const heroContainerClasses = "w-full max-w-3xl mx-auto text-center mb-16";
const heroTitleClasses = "font-montserrat text-4xl lg:text-5xl font-bold tracking-tight text-neutral-dark mb-6";
const heroDescriptionClasses = "font-sans text-xl lg:text-2xl text-neutral-medium leading-relaxed";
const cardsContainerClasses = "w-full max-w-7xl mx-auto flex flex-wrap justify-center gap-8 mb-16";
const cardContainerClasses = classNames(
  "group bg-white rounded-xl shadow-sm border border-neutral-light p-8",
  "transition-all duration-300 hover:shadow-lg hover:border-neutral-medium hover:-translate-y-1",
  "min-h-[320px] flex flex-col items-center justify-between text-center w-full max-w-sm flex-shrink-0",
  "sm:flex-[0_0_calc(50%-1rem)] lg:flex-[0_0_calc(33.333%-1.333rem)] xl:flex-[0_0_calc(25%-1.5rem)]"
);
const cardHeaderClasses = "flex items-center justify-center gap-4 mb-6";
const iconContainerClasses = "rounded-lg p-4 transition-colors duration-200 group-hover:bg-opacity-20";
const cardTitleClasses = "text-xl font-semibold text-neutral-dark leading-tight text-center";
const cardDescriptionClasses = "text-neutral-medium text-base leading-relaxed flex-1 mb-8 text-center";
const primaryButtonClasses = classNames(
  "mt-auto inline-block px-6 py-3 font-medium rounded-lg bg-primary hover:bg-[#34C759] text-white transition-all duration-200",
  "hover:shadow-md hover:scale-[1.02] active:scale-[0.98] w-full"
);
const disabledButtonClasses = "mt-auto inline-block px-6 py-3 font-medium bg-gray-100 text-gray-500 cursor-not-allowed select-none text-base w-full";
const callToActionContainerClasses = "w-full max-w-xl mx-auto mt-10 mb-20";
const callToActionCardClasses = "bg-white rounded-xl shadow-sm border border-neutral-light p-10";
const callToActionTitleClasses = "text-3xl font-semibold text-neutral-dark mb-6";
const callToActionDescriptionClasses = "text-lg text-neutral-medium mb-8 leading-relaxed";
const badgeContainerClasses = "flex justify-center gap-4 flex-wrap";
const primaryBadgeClasses = "inline-flex items-center px-8 py-4 rounded-lg font-medium bg-primary text-white text-base min-w-[160px] justify-center";
const secondaryBadgeClasses = "inline-flex items-center px-8 py-4 rounded-lg font-medium bg-gray-100 text-neutral-dark text-base min-w-[160px] justify-center";
const badgeIconClasses = "mr-3";

const TEST_CARDS = [
  {
    name: "Reaction Time Test",
    description: "Measure your response speed to visual stimuli with precision.",
    path: "/reaction-time-test",
    color: "#0BA650", // MyYouthspan Primary Green
    icon: <FaRunning size={36} />,
    implemented: true
  },
  {
    name: "Balance Test",
    description: "Assess your balance and stability using advanced pose detection technology.",
    path: "/balance-intro",
    color: "#055A30", // MyYouthspan Secondary Green
    icon: <FaBalanceScale size={36} />,
    implemented: true
  },
  {
    name: "Gait Speed Test",
    description: "Evaluate your walking speed and overall mobility patterns.",
    path: "/gait-speed-intro",
    color: "#FBB31C", // MyYouthspan Accent Yellow
    icon: <FaWalking size={36} />,
    implemented: false
  },
  {
    name: "Chair Stand Test",
    description: "Complete sit-to-stand repetitions to evaluate functional strength.",
    path: "/chair-stand-intro",
    color: "#055A30", // MyYouthspan Secondary Green
    icon: <FaChair size={36} />,
    implemented: true
  },
  {
    name: "Memory Recall Test",
    description: "Evaluate cognitive function and memory retention abilities.",
    path: "/memory-recall-intro",
    color: "#FBB31C", // MyYouthspan Accent Yellow
    icon: <FaBrain size={36} />,
    implemented: false
  },
  {
    name: "Walking Speed & Grip Strength",
    description: "Comprehensive assessment of mobility and upper body strength.",
    path: "/walking-grip-intro",
    color: "#0BA650", // MyYouthspan Primary Green
    icon: <FaDumbbell size={36} />,
    implemented: false
  },
  {
    name: "Hearing Test",
    description: "Assess auditory function and hearing sensitivity levels.",
    path: "/hearing-intro",
    color: "#055A30", // MyYouthspan Secondary Green
    icon: <FaAssistiveListeningSystems size={36} />,
    implemented: false
  }
];

const WelcomeScreen = () => {
  return (
    <div className={pageContainerClasses}>
      {/* Hero Section */}
      <PageSection className="text-center">
        <div className={heroContainerClasses}>
          <h1 className={heroTitleClasses}>
            Comprehensive Frailty Tester
          </h1>
          <p className={heroDescriptionClasses}>
            Scientifically validated tests to evaluate your physical and cognitive function, 
            providing insights for personalized health optimization.
          </p>
        </div>
      </PageSection>

      {/* Test Cards Container */}
      <PageSection className="text-center">
        <div className={cardsContainerClasses}>
          {TEST_CARDS.map((test, idx) => (
            <div
              key={test.name}
              className={cardContainerClasses}
            >
              <div className="w-full flex flex-col items-center justify-between h-full">
                <div className="w-full">
                  {/* Icon and Title */}
                  <div className={cardHeaderClasses}>
                    <div 
                      className={iconContainerClasses}
                      style={{ 
                        background: test.implemented ? `${test.color}15` : '#f1f5f9',
                        color: test.implemented ? test.color : '#6B7280'
                      }}
                    >
                      {test.icon}
                    </div>
                    <h2 className={cardTitleClasses}>{test.name}</h2>
                  </div>
                  
                  {/* Description */}
                  <p className={cardDescriptionClasses}>{test.description}</p>
                </div>
                
                {/* Action Button */}
                <div className="w-full mt-auto">
                  {test.implemented ? (
                    <Link
                      to={test.path}
                      className={primaryButtonClasses}
                    >
                      Begin Assessment
                    </Link>
                  ) : (
                    <span className={disabledButtonClasses}>
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Call to Action */}
      <PageSection className="text-center">
        <div className={callToActionContainerClasses}>
          <div className={callToActionCardClasses}>
            <h3 className={callToActionTitleClasses}>
              Complete Your Health Profile
            </h3>
            <p className={callToActionDescriptionClasses}>
              Take all available assessments to receive a comprehensive evaluation of your functional status 
              and personalized recommendations for maintaining optimal health and independence.
            </p>
            <div className={badgeContainerClasses}>
              <span className={primaryBadgeClasses}>
                <span className={badgeIconClasses}>✓</span>
                Scientifically Validated
              </span>
              <span className={secondaryBadgeClasses}>
                <span className={badgeIconClasses}>⚡</span>
                Quick & Easy
              </span>
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  );
};

export default WelcomeScreen;