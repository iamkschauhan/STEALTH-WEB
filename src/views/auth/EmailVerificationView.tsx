import React, { useState } from 'react';
import { Button } from '../../components/Button';

interface EmailVerificationViewProps {
  onBack: () => void;
  onVerify: () => void;
}

export const EmailVerificationView: React.FC<EmailVerificationViewProps> = ({
  onBack,
  onVerify,
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleCodeChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      setTimeout(() => {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }, 10);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
    
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const digits = text.replace(/\D/g, '').slice(0, 6).split('');
        const newCode = ['', '', '', '', '', ''];
        digits.forEach((digit, i) => {
          if (i < 6) newCode[i] = digit;
        });
        setCode(newCode);
        setError('');
      });
    }
  };

  const handleVerify = async () => {
    const codeString = code.join('');
    
    if (codeString.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // For Firebase, we check if email is verified by reloading user
      // The code verification happens via email link click
      // This view is for showing status and allowing resend
      const { reloadUser, isEmailVerified } = await import('../../services/authService');
      await reloadUser();
      
      if (isEmailVerified()) {
        await onVerify();
      } else {
        setError('Email not yet verified. Please check your email and click the verification link.');
      }
    } catch (error: any) {
      setError(error.message || 'Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    try {
      const { sendVerificationEmail } = await import('../../services/authService');
      await sendVerificationEmail();
    } catch (error: any) {
      console.error('Error resending verification email:', error);
      // Don't show error to user, just log it
    }
  };

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
            Email Verification
          </h1>
          <p className="text-subtitle text-text-secondary">
            Enter the verification code sent to your email
          </p>
        </div>

        {/* Code Input */}
        <div className="mb-8">
          <div className="flex gap-3 justify-center">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => {
                  e.preventDefault();
                  const pastedData = e.clipboardData.getData('text');
                  const digits = pastedData.replace(/\D/g, '').slice(0, 6).split('');
                  const newCode = ['', '', '', '', '', ''];
                  digits.forEach((digit, i) => {
                    if (i < 6) newCode[i] = digit;
                  });
                  setCode(newCode);
                  setError('');
                }}
                className="w-12 h-14 bg-surface-dark text-text-primary rounded-card text-center text-xl font-semibold focus:ring-2 focus:ring-accent-blue/50 outline-none transition-all"
              />
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-xs mt-3 text-center">{error}</p>
          )}
        </div>

        {/* Resend code */}
        <div className="text-center mb-8">
          <span className="text-text-helper text-sm mr-1">Didn't receive code?</span>
          <button
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className={`font-semibold text-sm ${
              resendCooldown > 0 ? 'text-text-faded cursor-not-allowed' : 'text-orange'
            }`}
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend'}
          </button>
        </div>

        {/* Verify button */}
        <Button 
          variant="primary" 
          className="w-full" 
          onClick={handleVerify}
          disabled={isVerifying || code.join('').length !== 6}
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </Button>
      </div>
    </div>
  );
};
