import React from 'react';
import classNames from 'classnames';
import { ArrowRight } from 'lucide-react';
import MetyButton from './MetyButton';

/**
 * METY CTA Section Component
 * Replicates the CTA structure from the SOURCE repository with Tailwind and METY brand tokens
 * 
 * @param {Object} props
 * @param {string} props.title - CTA title text
 * @param {string} props.description - CTA description text
 * @param {string} props.buttonText - CTA button text
 * @param {string} props.buttonPath - CTA button navigation path
 * @param {string} props.background - Background color variant
 * @param {boolean} props.centered - Whether to center the content
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Additional content below the CTA
 */
const MetyCTASection = ({
  title = "Complete Your Health Profile",
  description = "Take the next step towards better health and longevity with our comprehensive assessment tools.",
  buttonText = "Get Started",
  buttonPath = "/assessments",
  background = "accent",
  centered = true,
  className = "",
  children
}) => {
  const backgroundClasses = {
    white: "bg-white text-brand-secondary",
    light: "bg-gray-50 text-brand-secondary",
    dark: "bg-brand-secondary text-white",
    accent: "bg-brand-accent text-brand-secondary",
    primary: "bg-brand-primary text-white"
  };

  const sectionClasses = classNames(
    "w-full py-16 lg:py-24",
    backgroundClasses[background] || backgroundClasses.accent,
    className
  );

  const contentClasses = classNames(
    "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
    centered && "text-center"
  );

  return (
    <section className={sectionClasses}>
      <div className={contentClasses}>
        {/* CTA Content */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-brandHeading font-bold mb-6">
            {title}
          </h2>
          <p className="text-lg lg:text-xl font-brandBody leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-8">
          <MetyButton
            variant={background === "accent" ? "secondary" : "primary"}
            size="xl"
            className="group"
            as="a"
            href={buttonPath}
          >
            {buttonText}
            <ArrowRight 
              size={20} 
              className="ml-2 transition-transform duration-200 group-hover:translate-x-1" 
            />
          </MetyButton>
        </div>

        {/* Additional Content */}
        {children && (
          <div className="mt-12 pt-8 border-t border-current/20">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

/**
 * METY Feature Grid Component
 * Replicates the feature grid structure from the SOURCE repository
 */
export const MetyFeatureGrid = ({ 
  features = [], 
  columns = 3, 
  className = "" 
}) => {
  const gridClasses = classNames(
    "grid gap-8",
    {
      "grid-cols-1": columns === 1,
      "grid-cols-1 md:grid-cols-2": columns === 2,
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": columns === 3,
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-4": columns === 4
    },
    className
  );

  return (
    <div className={gridClasses}>
      {features.map((feature, index) => (
        <div key={index} className="text-center">
          {feature.icon && (
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              {feature.icon}
            </div>
          )}
          <h4 className="text-xl font-brandHeading font-semibold mb-3">
            {feature.title}
          </h4>
          <p className="text-base font-brandBody leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MetyCTASection;
