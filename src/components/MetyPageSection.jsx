import React from 'react';
import classNames from 'classnames';

/**
 * METY PageSection Component
 * Replicates the Bootstrap page-section structure with Tailwind and METY brand tokens
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render inside the section
 * @param {string} props.id - Section ID for navigation
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.background - Background color variant
 * @param {boolean} props.centered - Whether to center the content
 * @param {string} props.maxWidth - Maximum width constraint
 * @param {string} props.padding - Custom padding values
 */
const MetyPageSection = ({
  children,
  id,
  className = "",
  background = "white",
  centered = false,
  maxWidth = "max-w-7xl",
  padding = "py-12 lg:py-20"
}) => {
  const backgroundClasses = {
    white: "bg-white",
    light: "bg-gray-50",
    dark: "bg-brand-secondary text-white",
    accent: "bg-brand-accent text-brand-secondary",
    primary: "bg-brand-primary text-white",
    neutral: "bg-brand-neutral text-white"
  };

  const sectionClasses = classNames(
    "page-section w-full",
    backgroundClasses[background] || backgroundClasses.white,
    padding,
    className
  );

  const containerClasses = classNames(
    "container mx-auto px-4 sm:px-6 lg:px-8",
    maxWidth,
    centered && "text-center"
  );

  return (
    <section id={id} className={sectionClasses}>
      <div className={containerClasses}>
        {children}
      </div>
    </section>
  );
};

/**
 * METY Section Heading Component
 * Replicates the Bootstrap section-heading styling
 */
export const MetySectionHeading = ({ 
  children, 
  level = 2, 
  className = "",
  size = "default"
}) => {
  const Tag = `h${level}`;
  
  const sizeClasses = {
    small: "text-2xl lg:text-3xl",
    default: "text-3xl lg:text-4xl",
    large: "text-4xl lg:text-5xl"
  };

  const headingClasses = classNames(
    "section-heading font-brandHeading font-bold mb-4",
    sizeClasses[size] || sizeClasses.default,
    className
  );

  return <Tag className={headingClasses}>{children}</Tag>;
};

/**
 * METY Section Subheading Component
 * Replicates the Bootstrap section-subheading styling
 */
export const MetySectionSubheading = ({ 
  children, 
  level = 3, 
  className = "",
  size = "default"
}) => {
  const Tag = `h${level}`;
  
  const sizeClasses = {
    small: "text-lg",
    default: "text-xl lg:text-2xl",
    large: "text-2xl lg:text-3xl"
  };

  const subheadingClasses = classNames(
    "section-subheading font-brandBody font-normal italic mb-16",
    sizeClasses[size] || sizeClasses.default,
    "text-brand-neutral",
    className
  );

  return <Tag className={subheadingClasses}>{children}</Tag>;
};

export default MetyPageSection;
