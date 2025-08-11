import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";

/**
 * AssessmentCard Component
 * 
 * A reusable card component for displaying assessment information with theming and status indicators.
 * 
 * @param {Object} props - Component props
 * @param {number} props.id - Unique identifier for the assessment
 * @param {string} props.title - Assessment title
 * @param {string} props.description - Assessment description
 * @param {string} props.status - Assessment status ("available" or "coming-soon")
 * @param {string} props.path - Route path for the assessment
 * @param {string} props.duration - Estimated duration of the assessment
 * @param {string} props.theme - Theme color ("green", "dark-green", "yellow", or default)
 * @param {React.Component} props.icon - Lucide React icon component
 * @returns {JSX.Element} Assessment card with theming and interactive elements
 */
const AssessmentCard = ({ 
  id,
  title, 
  description, 
  status, 
  path, 
  duration, 
  theme, 
  icon: IconComponent 
}) => {
  const getThemeColors = (theme, status) => {
    if (status === "coming-soon") {
      return {
        bg: "bg-amber-50",
        border: "border-amber-200",
        icon: "text-amber-600",
        button: "bg-amber-100 text-amber-700 hover:bg-amber-200",
      };
    }

    switch (theme) {
      case "green":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          icon: "text-green-600",
          button: "bg-green-600 text-white hover:bg-green-700",
        };
      case "dark-green":
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          icon: "text-emerald-700",
          button: "bg-emerald-700 text-white hover:bg-emerald-800",
        };
      case "yellow":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          icon: "text-yellow-600",
          button: "bg-yellow-600 text-white hover:bg-yellow-700",
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          icon: "text-gray-600",
          button: "bg-gray-600 text-white hover:bg-gray-700",
        };
    }
  };

  const colors = getThemeColors(theme, status);

  return (
    <div
      className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 ${colors.border} ${colors.bg} overflow-hidden rounded-xl bg-white flex flex-col items-center justify-between text-center min-h-[320px] w-full max-w-sm flex-shrink-0 sm:flex-[0_0_calc(50%-0.75rem)] lg:flex-[0_0_calc(33.333%-1rem)] xl:flex-[0_0_calc(25%-1.125rem)]`}
    >
      <div className="p-6 w-full flex flex-col items-center justify-between h-full">
        <div className="w-full">
          <div className="flex items-center justify-center mb-4">
            <div className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
              <IconComponent className={`w-6 h-6 ${colors.icon}`} />
            </div>
            {status === "available" && <CheckCircle className="w-5 h-5 text-green-500 ml-2" />}
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors font-montserrat">
            {title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 leading-relaxed font-sans">
            {description}
          </p>

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {duration}
            </div>
            <div className={`text-xs px-2 py-1 rounded ${
              status === "available" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
            }`}>
              {status === "available" ? "Available" : "Coming Soon"}
            </div>
          </div>
        </div>

        <div className="w-full mt-auto">
          {status === "available" ? (
            <Link
              to={path}
              className={`w-full rounded-lg font-semibold transition-all duration-300 ${colors.button} inline-flex items-center justify-center py-3 px-4`}
            >
              Start Test
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          ) : (
            <button
              className={`w-full rounded-lg font-semibold transition-all duration-300 ${colors.button} py-3 px-4`}
              disabled
            >
              Notify Me
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentCard; 