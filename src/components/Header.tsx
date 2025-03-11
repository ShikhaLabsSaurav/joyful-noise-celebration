import React from 'react';
import { BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCelebration } from '@/contexts/celebration-context';

const Header: React.FC = () => {
  const { isCelebrating } = useCelebration();

  return (
    <header className="w-full glassmorphism sticky top-0 z-50 py-2 sm:py-3 px-3 sm:px-4 md:px-6">
      <div className="flex items-center">
        <div className={cn(
          "h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-primary flex items-center justify-center mr-2 sm:mr-3 transition-all duration-500",
          isCelebrating && "animate-celebrate shadow-[0_0_15px_5px_rgba(79,70,229,0.3)]"
        )}>
          <BarChart2 className={cn(
            "text-white h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-500",
            isCelebrating && "animate-float"
          )} />
        </div>
        <h1 className={cn(
          "text-lg sm:text-xl font-medium transition-all duration-500",
          isCelebrating && "text-primary animate-pulse-slow scale-105"
        )}>NoiseMonitor</h1>
      </div>
    </header>
  );
};

export default Header;
