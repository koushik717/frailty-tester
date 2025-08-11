import React from "react";

/**
 * Renders the Hero component.
 * @returns {JSX.Element} - The Hero component.
 */
const Hero = () => {
  return (
    <div className="flex justify-center items-center h-20 md:h-16 lg:h-24 bg-gradient-to-b from-white via-[#f6fbff] to-[#edf7ff]">
      <h1 className="text-black font-bold text-3xl md:text-4xl lg:text-6xl text-center">
        Frailty Tester
      </h1>
    </div>
  );
};

export default Hero;