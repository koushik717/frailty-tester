import React from 'react';
import classNames from 'classnames';

/**
 * METY Button Component
 * Replicates the Bootstrap button structure with Tailwind and METY brand tokens
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant (primary, secondary, outline, etc.)
 * @param {string} props.size - Button size (sm, md, lg, xl)
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {string} props.className - Additional CSS classes
 * @param {React.ButtonHTMLAttributes} props.buttonProps - Standard button props
 */
const MetyButton = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...buttonProps
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-brand-primary hover:bg-brand-primary/90 text-white focus:ring-brand-primary",
    secondary: "bg-brand-secondary hover:bg-brand-secondary/90 text-white focus:ring-brand-secondary",
    accent: "bg-brand-accent hover:bg-brand-accent/90 text-brand-secondary focus:ring-brand-accent",
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus:ring-brand-primary",
    outlineSecondary: "border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white focus:ring-brand-secondary",
    light: "bg-white text-brand-secondary border border-brand-neutral/20 hover:bg-brand-neutral/5 focus:ring-brand-secondary",
    link: "text-brand-primary hover:text-brand-primary/80 underline-offset-4 hover:underline focus:ring-brand-primary"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-md",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-lg",
    xl: "px-10 py-5 text-xl rounded-lg font-bold"
  };

  const buttonClasses = classNames(
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
    className
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

/**
 * METY Button XL Component
 * Replicates the Bootstrap btn-xl styling specifically
 */
export const MetyButtonXL = ({ 
  children, 
  variant = "primary", 
  className = "",
  ...buttonProps 
}) => {
  return (
    <MetyButton
      variant={variant}
      size="xl"
      className={classNames("uppercase tracking-wider", className)}
      {...buttonProps}
    >
      {children}
    </MetyButton>
  );
};

/**
 * METY Social Button Component
 * Replicates the Bootstrap btn-social styling
 */
export const MetySocialButton = ({ 
  children, 
  variant = "primary", 
  className = "",
  ...buttonProps 
}) => {
  const socialClasses = classNames(
    "w-10 h-10 rounded-full p-0 flex items-center justify-center",
    className
  );

  return (
    <MetyButton
      variant={variant}
      size="sm"
      className={socialClasses}
      {...buttonProps}
    >
      {children}
    </MetyButton>
  );
};

export default MetyButton;
