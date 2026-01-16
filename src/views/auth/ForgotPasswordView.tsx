import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

interface ForgotPasswordViewProps {
  onBack: () => void;
}

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { resetPassword } = await import('../../services/authService');
      await resetPassword(email.trim());
      setIsSubmitted(true);
    } catch (error: any) {
      setError(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center py-10">
        <div className="w-full max-w-content md:max-w-lg lg:max-w-xl mx-auto px-screen-padding md:px-8">
          <button
            onClick={onBack}
            className="text-accent-blue mb-6 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-title font-bold text-text-primary mb-2">
              Check Your Email
            </h1>
            <p className="text-subtitle text-text-secondary mb-8">
              We've sent a password reset link to {email}
            </p>
            <Button variant="primary" className="w-full" onClick={onBack}>
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center py-10">
      <div className="w-full max-w-content md:max-w-lg lg:max-w-xl mx-auto px-screen-padding md:px-8">
        {/* Back button */}
        <button
          onClick={onBack}
          className="text-accent-blue mb-6 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Title and Subtitle */}
        <div className="mb-8">
          <h1 className="text-title font-bold text-text-primary mb-2">
            Forgot Password
          </h1>
          <p className="text-subtitle text-text-secondary">
            Enter your email to reset your password
          </p>
        </div>

        {/* Input Field */}
        <div className="mb-8">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            placeholder="Enter your email address"
          />
          {error && (
            <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>
          )}
        </div>

        {/* Submit button */}
        <Button 
          variant="primary" 
          className="w-full" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </div>
    </div>
  );
};
