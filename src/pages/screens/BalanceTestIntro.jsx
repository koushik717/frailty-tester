import React from "react";
import { useDispatch } from "react-redux";
import { nextStep } from "../../store/slices/stageSlice";
import TestIntroCard from "../../components/TestIntroCard";
import { FaCamera, FaClock, FaRegUser } from "react-icons/fa";

const instructions = [
  {
    icon: <FaCamera size={28} className="text-primary" aria-hidden="true" />, 
    title: "Camera Access Required",
    text: "Please grant camera access when prompted to enable pose detection for accurate balance assessment."
  },
  {
    icon: <FaClock size={28} className="text-primary" aria-hidden="true" />, 
    title: "Assessment Duration",
    text: "This balance evaluation will take approximately 3 minutes to complete."
  },
  {
    icon: <FaRegUser size={28} className="text-primary" aria-hidden="true" />, 
    title: "Optimal Positioning",
    text: "Ensure you're in a well-lit, spacious area with your full body visible in the camera frame."
  }
];

const BalanceTestIntro = () => {
  const dispatch = useDispatch();
  const handleBeginAssessment = () => {
    dispatch(nextStep()); // Proceed to the actual balance test screen
  };

  return (
    <TestIntroCard
      title="Balance Assessment Introduction"
      instructions={instructions}
      buttonText="Begin Assessment"
      onClick={handleBeginAssessment}
    />
  );
};

export default BalanceTestIntro;