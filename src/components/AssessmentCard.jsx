import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";

/**
 * AssessmentCard Component
 * 
 * Re-designed high-fidelity glass card component.
 */
const AssessmentCard = ({
  id,
  title,
  description,
  status,
  path,
  duration,
  theme = "primary",
  icon: IconComponent
}) => {
  const isAvailable = status === "available";

  return (
    <div
      className={`group relative glass-card p-6 rounded-2xl w-full max-w-sm flex flex-col justify-between h-full min-h-[360px] overflow-hidden`}
    >
      {/* Decorative gradient blob behind icon */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-100/50 rounded-full blur-2xl group-hover:bg-primary-200/50 transition-colors duration-500"></div>

      <div className="relative z-10 w-full">
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 rounded-2xl bg-white/50 border border-white/60 shadow-sm group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="w-7 h-7 text-primary-600" />
          </div>
          {isAvailable && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-xs font-semibold text-emerald-700">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Ready</span>
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 font-montserrat leading-tight group-hover:text-primary-700 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed font-sans mb-4 line-clamp-3">
          {description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1.5 bg-gray-50/50 px-3 py-1.5 rounded-lg border border-gray-100">
            <Clock className="w-4 h-4 text-primary-500" />
            <span className="font-medium">{duration}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        {isAvailable ? (
          <Link
            to={path}
            className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl font-semibold text-white bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-0.5 transition-all duration-300 group-hover:w-full"
          >
            Start Assessment
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <button
            className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl font-semibold text-gray-400 bg-gray-100 cursor-not-allowed border border-gray-200"
            disabled
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
};

export default AssessmentCard;