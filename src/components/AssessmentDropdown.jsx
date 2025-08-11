import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

/**
 * AssessmentDropdown Component
 * 
 * A dropdown menu that displays available assessments with their names and durations.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.assessments - Array of assessment objects
 * @param {string} props.buttonText - Text to display on the trigger button
 * @param {string} props.buttonClassName - CSS classes for the trigger button
 * @param {string} props.dropdownClassName - CSS classes for the dropdown container
 * @returns {JSX.Element} Dropdown component with assessment options
 */
const AssessmentDropdown = ({ 
  assessments, 
  buttonText = "Start Assessment",
  buttonClassName = "",
  dropdownClassName = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Filter only available assessments
  const availableAssessments = assessments.filter(assessment => assessment.status === "available");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when an option is selected
  const handleOptionClick = () => {
    setIsOpen(false);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (availableAssessments.length === 0) {
    return (
      <button
        className={`bg-neutral-300 text-neutral-500 px-8 py-4 text-lg font-semibold rounded-xl cursor-not-allowed ${buttonClassName}`}
        disabled
      >
        No Assessments Available
      </button>
    );
  }

  return (
    <div className={`relative inline-block ${dropdownClassName}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        className={`bg-primary hover:bg-[#34C759] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center ${buttonClassName}`}
      >
        {buttonText}
        <ChevronDown 
          className={`ml-2 w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white rounded-lg shadow-xl border border-neutral-200 z-50 transition-all duration-200 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
          {/* Dropdown Header */}
          <div className="px-4 pt-4 pb-1">
            <h3 className="text-sm font-semibold text-neutral-500 font-montserrat">
              Choose an Assessment
            </h3>
          </div>
          
          {/* Assessment Items */}
          <div className="max-h-64 overflow-y-auto py-2 space-y-2">
            {availableAssessments.map((assessment) => (
              <Link
                key={assessment.id}
                to={assessment.path}
                onClick={handleOptionClick}
                className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-neutral-100 transition-colors duration-150 mx-2"
              >
                <assessment.icon className="w-[18px] h-[18px] text-green-600 mt-0.5" />
                <span className="text-sm font-medium text-neutral-900 font-montserrat">
                  {assessment.title}
                </span>
              </Link>
            ))}
          </div>
          
          {/* Dropdown Footer */}
          <div className="px-4 py-2 border-t border-neutral-100 bg-neutral-50 rounded-b-lg">
            <p className="text-xs text-neutral-500 font-sans">
              {availableAssessments.length} assessment{availableAssessments.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentDropdown; 