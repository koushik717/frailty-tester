import React, { useState } from 'react';
import MetyButton from './MetyButton';

/**
 * METY Newsletter Form Component
 * Replicates the newsletter form structure from the SOURCE repository with Tailwind and METY brand tokens
 * 
 * @param {Object} props
 * @param {string} props.title - Form title
 * @param {string} props.description - Form description
 * @param {string} props.placeholder - Email input placeholder
 * @param {string} props.buttonText - Submit button text
 * @param {string} props.successMessage - Success message text
 * @param {string} props.errorMessage - Error message text
 * @param {Function} props.onSubmit - Form submission handler
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.background - Background color variant
 */
const MetyNewsletterForm = ({
  title = "Stay In The Loop",
  description = "If you would like to receive updates on the My Youthspan software and be notified when it is ready for people to use it, please enter your email below to subscribe to the newsletter.",
  placeholder = "Your Email *",
  buttonText = "Subscribe",
  successMessage = "Form submission successful!",
  errorMessage = "Error sending message!",
  onSubmit,
  className = "",
  background = "light"
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const backgroundClasses = {
    white: "bg-white text-brand-secondary",
    light: "bg-gray-50 text-brand-secondary",
    dark: "bg-brand-secondary text-white",
    accent: "bg-brand-accent text-brand-secondary"
  };

  const formClasses = `w-full max-w-2xl mx-auto ${className}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (onSubmit) {
        await onSubmit(email);
        setSubmitStatus('success');
        setEmail('');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${backgroundClasses[background] || backgroundClasses.light} rounded-xl p-8 lg:p-12`}>
      <div className={formClasses}>
        {/* Form Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-brandHeading font-bold mb-4">
            {title}
          </h2>
          <p className="text-base lg:text-lg font-brandBody leading-relaxed">
            {description}
          </p>
        </div>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                required
                className="w-full px-4 py-3 text-base font-brandBody border border-brand-neutral/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                disabled={isSubmitting}
              />
            </div>
            <div className="sm:w-auto">
              <MetyButton
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting || !email.trim()}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? 'Subscribing...' : buttonText}
              </MetyButton>
            </div>
          </div>
        </form>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-brandBody text-center">
              {successMessage}
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-brandBody text-center">
              {errorMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * METY Email Verification Form Component
 * Replicates the email verification form from the SOURCE repository
 */
export const MetyEmailVerificationForm = ({
  onVerify,
  className = "",
  ...props
}) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim() || verificationCode.some(code => !code)) return;

    setIsVerifying(true);
    
    try {
      if (onVerify) {
        await onVerify(email, verificationCode.join(''));
      }
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-brandBody font-medium mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 text-base font-brandBody border border-brand-neutral/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        {/* Verification Code Inputs */}
        <div>
          <label className="block text-sm font-brandBody font-medium mb-2">
            Verification Code
          </label>
          <div className="flex gap-2 justify-center">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                data-index={index}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                maxLength={1}
                required
                className="w-12 h-12 text-center text-lg font-brandBody border border-brand-neutral/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                placeholder="0"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <MetyButton
          type="submit"
          variant="primary"
          size="lg"
          disabled={isVerifying || !email.trim() || verificationCode.some(code => !code)}
          className="w-full"
        >
          {isVerifying ? 'Verifying...' : 'Verify Email'}
        </MetyButton>
      </form>
    </div>
  );
};

export default MetyNewsletterForm;
