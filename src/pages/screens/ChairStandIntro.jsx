import React from "react";
import TestIntroCard from "../../components/TestIntroCard";
import { FaChair, FaClock, FaDumbbell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const instructions = [
  {
    icon: <FaChair size={28} className="text-primary" aria-hidden="true" />, 
    title: "Assessment Overview",
    text: "This evaluation measures lower body strength and functional mobility by counting sit-to-stand repetitions in 30 seconds."
  },
  {
    icon: <FaClock size={28} className="text-primary" aria-hidden="true" />, 
    title: "Duration",
    text: "The assessment will last exactly 30 seconds with clear audio cues to guide your pace."
  },
  {
    icon: <FaDumbbell size={28} className="text-primary" aria-hidden="true" />, 
    title: "Safety Guidelines",
    text: "Use a stable chair without arms, positioned against a wall for safety. Perform at your own comfortable pace."
  }
];

const ChairStandIntro = () => {
  const navigate = useNavigate();
  
  const handleBeginAssessment = () => {
    navigate("/chair-stand-test");
  };

  return (
    <TestIntroCard
      title="Chair Stand Assessment Introduction"
      instructions={instructions}
      buttonText="Begin Assessment"
      onClick={handleBeginAssessment}
    />
  );
};

export default ChairStandIntro;