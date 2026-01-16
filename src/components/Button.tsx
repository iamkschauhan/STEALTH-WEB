import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'icon';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-button transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'gradient-primary text-text-primary rounded-pill h-[50px] px-6 font-semibold',
    secondary: 'bg-surface-dark text-text-primary rounded-pill h-[50px] px-6 font-semibold',
    outline: 'border border-white/30 text-text-primary rounded-pill h-[50px] px-6 font-semibold bg-transparent',
    icon: 'bg-surface-dark text-text-primary rounded-pill w-[50px] h-[50px] flex items-center justify-center',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
