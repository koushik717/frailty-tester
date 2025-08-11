import React from "react";
import classNames from "classnames";

// Semantic class constants - MyYouthspan branding
const containerClasses = "flex flex-col justify-center items-center min-h-[60vh] py-8 px-4 bg-gray-50";
const cardClasses = "bg-white rounded-xl shadow-sm border border-neutral-light max-w-2xl w-full p-8 transition-all duration-300 hover:shadow-md";
const headerClasses = "text-center mb-8";
const titleClasses = "font-montserrat text-2xl md:text-3xl font-semibold text-neutral-dark mb-4";
const accentLineClasses = "w-16 h-1 bg-primary rounded-full mx-auto";
const instructionsSectionClasses = "space-y-6 mb-8";
const instructionCardClasses = "flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-neutral-light";
const iconContainerClasses = "flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary";
const instructionContentClasses = "flex-1";
const instructionTitleClasses = "font-montserrat text-lg font-semibold text-neutral-dark mb-2";
const instructionTextClasses = "font-sans text-sm text-neutral-medium leading-relaxed";
const footerClasses = "flex justify-center";
const primaryButtonClasses = classNames(
  "inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium text-white font-sans",
  "transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
  "bg-primary hover:bg-[#34C759]",
  "min-w-[200px] text-lg",
  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
);

const TestIntroCard = ({ title, instructions = [], buttonText, onClick }) => {
  return (
    <div 
      className={containerClasses}
      role="main"
      aria-labelledby="assessment-title"
    >
      <div 
        className={cardClasses}
        role="region"
        aria-labelledby="assessment-title"
      >
        {/* Header */}
        <header className={headerClasses}>
          <h1 
            id="assessment-title"
            className={titleClasses}
          >
            {title}
          </h1>
          <div 
            className={accentLineClasses}
            aria-hidden="true"
            role="presentation"
          ></div>
        </header>

        {/* Instructions */}
        <section 
          className={instructionsSectionClasses}
          aria-labelledby="instructions-heading"
        >
          <h2 
            id="instructions-heading" 
            className="sr-only"
          >
            Assessment Instructions
          </h2>
          {instructions.map((inst, idx) => (
            <article 
              key={idx} 
              className={instructionCardClasses}
              role="article"
              aria-labelledby={`instruction-${idx}-title`}
            >
              <div 
                className={iconContainerClasses}
                aria-hidden="true"
                role="presentation"
              >
                {React.cloneElement(inst.icon, { 
                  size: 24,
                  'aria-hidden': true 
                })}
              </div>
              <div className={instructionContentClasses}>
                <h3 
                  id={`instruction-${idx}-title`}
                  className={instructionTitleClasses}
                >
                  {inst.title}
                </h3>
                <p className={instructionTextClasses}>
                  {inst.text}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* Action Button */}
        {buttonText && (
          <footer className={footerClasses}>
            <button
              className={primaryButtonClasses}
              onClick={onClick}
              type="button"
              aria-label={`${buttonText} - Start the assessment`}
              aria-describedby="assessment-title"
            >
              {buttonText}
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default TestIntroCard;