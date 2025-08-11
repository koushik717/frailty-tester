import React from 'react';
import classNames from 'classnames';

/**
 * PageSection Component
 * 
 * A reusable component that applies consistent layout wrapping across pages.
 * Provides default spacing, max-width, and responsive padding while allowing
 * custom className overrides.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be wrapped
 * @param {string} [props.className] - Optional additional CSS classes
 * @param {string} [props.maxWidth] - Optional max-width override (default: max-w-7xl)
 * @param {string} [props.padding] - Optional padding override (default: py-12 lg:py-20)
 * @param {string} [props.margin] - Optional margin override (default: mx-auto)
 * @returns {JSX.Element} Wrapped content with consistent layout
 */
const PageSection = ({ 
  children, 
  className = '',
  maxWidth = 'max-w-7xl',
  padding = 'py-12 lg:py-20',
  margin = 'mx-auto'
}) => {
  // Base classes for consistent layout
  const baseClasses = classNames(
    'w-full px-6',
    maxWidth,
    margin,
    padding
  );

  // Merge with custom className
  const sectionClasses = classNames(baseClasses, className);

  return (
    <section className={sectionClasses}>
      {children}
    </section>
  );
};

export default PageSection; 