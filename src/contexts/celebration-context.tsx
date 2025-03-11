import React, { createContext, useContext, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationContextType {
  startCelebration: (isLimitReached?: boolean) => void;
  isCelebrating: boolean;
  showBrightGlow: boolean;
  stopCelebration: () => void;
}

const CelebrationContext = createContext<CelebrationContextType | undefined>(undefined);

export const CelebrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showBrightGlow, setShowBrightGlow] = useState(false);
  const [celebrationInterval, setCelebrationInterval] = useState<number | null>(null);

  const stopCelebration = useCallback(() => {
    if (celebrationInterval) {
      clearInterval(celebrationInterval);
      setCelebrationInterval(null);
    }
    setIsCelebrating(false);
    setShowBrightGlow(false);
  }, [celebrationInterval]);

  const startCelebration = useCallback((isLimitReached: boolean = false) => {
    setIsCelebrating(true);
    setShowBrightGlow(isLimitReached);
    
    // Updated confetti settings for better visibility
    const defaults = { 
      startVelocity: 45,
      spread: 360,
      ticks: 60,
      zIndex: 100,
      colors: ['#FFD700', '#FF69B4', '#00FF00', '#00BFFF', '#FF4500', '#9370DB'],
      scalar: 2
    };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    // Clear any existing interval
    if (celebrationInterval) {
      clearInterval(celebrationInterval);
    }

    // Start infinite celebration
    const interval = window.setInterval(() => {
      // Confetti from both sides with more spread
      confetti({
        ...defaults,
        particleCount: 75,
        origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount: 75,
        origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    setCelebrationInterval(interval);
  }, []);

  return (
    <CelebrationContext.Provider value={{ startCelebration, stopCelebration, isCelebrating, showBrightGlow }}>
      <div className={`relative ${isCelebrating ? 'hide-speedometer' : ''}`}>
        {children}
      </div>
      
      {/* Background overlay */}
      {(isCelebrating || showBrightGlow) && (
        <div className="fixed inset-0 bg-black z-30" />
      )}
      
      {/* Flashing background */}
      {showBrightGlow && (
        <div className="fixed inset-0 pointer-events-none animate-celebration-flash z-40" />
      )}
      
      {/* Celebration elements */}
      {(isCelebrating || showBrightGlow) && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 flex items-center justify-center gap-8">
            {/* Floating emojis with increased size and opacity */}
            <div className="animate-float-slow opacity-100 text-8xl shadow-lg">🎉</div>
            <div className="animate-float-slower opacity-100 text-8xl shadow-lg">🎈</div>
            <div className="animate-float-slowest opacity-100 text-8xl shadow-lg">✨</div>
          </div>
        </div>
      )}
    </CelebrationContext.Provider>
  );
};

export const useCelebration = () => {
  const context = useContext(CelebrationContext);
  if (context === undefined) {
    throw new Error('useCelebration must be used within a CelebrationProvider');
  }
  return context;
}; 