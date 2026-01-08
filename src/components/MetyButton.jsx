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
    primary: "bg-primary hover:bg-primary-dark text-white focus:ring-primary",
    secondary: "bg-neutral-800 hover:bg-neutral-900 text-white focus:ring-neutral-800",
    accent: "bg-accent hover:bg-accent-dark text-white focus:ring-accent",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
    outlineSecondary: "border-2 border-neutral-600 text-neutral-600 hover:bg-neutral-600 hover:text-white focus:ring-neutral-600",
    light: "bg-white text-neutral-800 border border-neutral-200 hover:bg-neutral-50 focus:ring-neutral-300",
    link: "text-primary hover:text-primary-dark underline-offset-4 hover:underline focus:ring-primary"
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
