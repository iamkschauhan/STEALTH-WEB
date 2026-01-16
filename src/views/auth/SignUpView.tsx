import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

interface SignUpViewProps {
  showLogin: () => void;
  showEmailVerification: () => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  birthDate?: string;
  phoneNumber?: string;
  password?: string;
  general?: string;
}

export const SignUpView: React.FC<SignUpViewProps> = ({
  showLogin,
  showEmailVerification,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateDate = (date: string): boolean => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(date)) return false;
    const [day, month, year] = date.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.getDate() === day && dateObj.getMonth() === month - 1 && dateObj.getFullYear() === year;
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleSubmit = async () => {
    const newErrors: FormErrors = {};

    // Validate Full Name
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Validate Email
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate Birth Date
    if (!birthDate.trim()) {
      newErrors.birthDate = 'Birth date is required';
    } else if (!validateDate(birthDate)) {
      newErrors.birthDate = 'Please enter date in DD/MM/YYYY format';
    }

    // Validate Phone Number
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhone(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Validate Password
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // Import signUp service
        const { signUp } = await import('../../services/authService');
        
        // Create user account with Firebase
        const userCredential = await signUp({
          email: email.trim(),
          password,
          displayName: fullName.trim(),
        });

        // Store additional signup data for profile setup
        if (userCredential.user) {
          localStorage.setItem('signupData', JSON.stringify({
            fullName,
            email,
            birthDate,
            phoneNumber,
            uid: userCredential.user.uid,
          }));
        }

        showEmailVerification();
      } catch (error: any) {
        // Handle Firebase errors
        if (error.message.includes('email')) {
          setErrors({ email: error.message });
        } else if (error.message.includes('password')) {
          setErrors({ password: error.message });
        } else {
          setErrors({ general: error.message || 'An error occurred during sign up' });
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleAppleSignUp = () => {
    console.log('Apple Sign Up clicked');
    // Implement Apple Sign In
  };

  const handleGoogleSignUp = () => {
    console.log('Google Sign Up clicked');
    // Implement Google Sign In
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center py-10">
      <div className="w-full max-w-content md:max-w-lg lg:max-w-xl mx-auto px-screen-padding md:px-8">
        {/* Title and Subtitle */}
        <div className="mb-8">
          <h1 className="text-title font-bold text-text-primary mb-2">
            Sign up
          </h1>
          <p className="text-subtitle text-text-secondary">
            Create an account to continue!
          </p>
        </div>

        {/* Error message */}
        {errors.general && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-card">
            <p className="text-red-400 text-sm">{errors.general}</p>
          </div>
        )}

        {/* Input Fields */}
        <div className="space-y-5 mb-8">
          <div>
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors({ ...errors, fullName: undefined });
              }}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName}</p>
            )}
          </div>
          <div>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Input
              label="Birth of date"
              value={birthDate}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2);
                if (value.length >= 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);
                setBirthDate(value);
                if (errors.birthDate) setErrors({ ...errors, birthDate: undefined });
              }}
              placeholder="DD/MM/YYYY"
              maxLength={10}
            />
            {errors.birthDate && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.birthDate}</p>
            )}
          </div>
          <div>
            <Input
              label="Phone Number"
              type="tel"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: undefined });
              }}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.phoneNumber}</p>
            )}
          </div>
          <div>
            <Input
              label="Set Password"
              type="password"
              showPasswordToggle
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              placeholder="Enter password (min 8 characters)"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
            )}
          </div>
        </div>

        {/* Sign up button and social buttons */}
        <div className="flex gap-4 mb-6">
          <Button variant="icon" onClick={handleAppleSignUp} disabled={isSubmitting}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.5-2.08-.96-3.24-1.44-2.24-1.16-3.37-2.21-3.37-4.11 0-1.68 1.03-2.77 2.64-3.25.5-.15 1.02-.23 1.56-.23h.05c.18 0 .35 0 .52.02.1-.18.22-.35.35-.5.4-.48.9-.85 1.48-1.1.9-.4 1.88-.5 2.85-.3.77.15 1.49.5 2.1.98.1.08.19.17.27.26.05-.02.1-.04.15-.06.65-.22 1.33-.33 2.02-.33.23 0 .46.02.68.05.03-.08.05-.16.08-.24.19-.5.46-.96.8-1.37.7-.85 1.66-1.47 2.75-1.78 1.11-.32 2.28-.3 3.38.05.95.3 1.8.87 2.45 1.6.1.12.19.25.27.38.02.03.04.06.06.09.05.1.09.2.13.3.05.12.09.25.13.38.03.1.06.2.08.3.03.12.05.24.06.36.01.12.02.24.02.36 0 .22-.02.44-.05.66-.03.2-.07.4-.12.6-.05.2-.1.4-.16.59-.06.2-.13.4-.21.59-.08.19-.17.37-.27.55-.1.18-.21.35-.33.52-.12.17-.25.33-.39.49-.14.16-.29.31-.45.46-.16.15-.33.29-.51.42-.18.13-.37.25-.56.37-.19.12-.39.23-.59.33-.2.1-.41.19-.62.27-.21.08-.43.15-.65.21-.22.06-.44.11-.66.15-.22.04-.45.07-.67.09-.22.02-.45.03-.67.03-.22 0-.44-.01-.66-.03-.22-.02-.45-.05-.67-.09-.22-.04-.44-.09-.66-.15-.22-.06-.44-.13-.65-.21-.21-.08-.42-.17-.62-.27-.2-.1-.4-.21-.59-.33-.19-.12-.38-.24-.56-.37-.18-.13-.35-.27-.51-.42-.16-.15-.31-.3-.45-.46-.14-.16-.27-.32-.39-.49-.12-.17-.23-.34-.33-.52-.1-.18-.19-.36-.27-.55-.08-.19-.15-.39-.21-.59-.06-.19-.11-.39-.16-.59-.05-.2-.09-.4-.12-.6-.03-.22-.05-.44-.05-.66 0-.12.01-.24.02-.36.01-.12.03-.24.06-.36.02-.1.05-.2.08-.3.04-.13.08-.26.13-.38.04-.1.08-.2.13-.3.02-.03.04-.06.06-.09.08-.13.17-.26.27-.38.65-.73 1.5-1.3 2.45-1.6 1.1-.35 2.27-.37 3.38-.05 1.09.31 2.05.93 2.75 1.78.34.41.61.87.8 1.37.03.08.05.16.08.24.22-.03.45-.05.68-.05.69 0 1.37.11 2.02.33.05.02.1.04.15.06.08-.09.17-.18.27-.26.61-.48 1.33-.83 2.1-.98.97-.2 1.95-.1 2.85.3.58.25 1.08.62 1.48 1.1.13.15.25.32.35.5.17-.02.34-.02.52-.02h.05c.54 0 1.06.08 1.56.23 1.61.48 2.64 1.57 2.64 3.25 0 1.9-1.13 2.95-3.37 4.11-1.16.48-2.15.94-3.24 1.44-1.03.47-2.1.54-3.08-.41z"/>
            </svg>
          </Button>
          <Button 
            variant="primary" 
            className="flex-1" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </Button>
          <Button variant="icon" onClick={handleGoogleSignUp} disabled={isSubmitting}>
            <span className="text-xl font-bold">G</span>
          </Button>
        </div>

        {/* Login link */}
        <div className="flex items-center justify-center gap-1">
          <span className="text-link-helper text-text-helper">
            Already have an account?
          </span>
          <button
            onClick={showLogin}
            className="text-link-action font-semibold text-orange"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
