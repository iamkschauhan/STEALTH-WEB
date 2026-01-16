import React, { useEffect } from 'react';
import { useAppState } from '../../context/AppState';
import { AuthView } from '../../context/AppState';

interface SplashViewProps {
  onComplete: () => void;
}

export const SplashView: React.FC<SplashViewProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-title font-bold text-white mb-4">
          STEALTH
        </h1>
        <div className="w-16 h-1 bg-gradient-primary mx-auto rounded-full" />
      </div>
    </div>
  );
};
