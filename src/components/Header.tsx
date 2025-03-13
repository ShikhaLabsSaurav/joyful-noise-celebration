import React from "react";
import { BarChart2, Volume2, Volume1, Shield, ShieldOff, Zap, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { useModeContext } from "@/contexts/ModeContext";

interface HeaderProps {
  showToggle?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showToggle = false }) => {
  const { isHardMode, toggleHardMode } = useModeContext();

  return (
    <header className="w-full glassmorphism sticky top-0 z-50 py-2 sm:py-3 px-3 sm:px-4 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={cn(
              "h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-primary flex items-center justify-center mr-2 sm:mr-3 transition-all duration-500"
            )}
          >
            <BarChart2
              className={cn(
                "text-white h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-500"
              )}
            />
          </div>
          <h1
            className={cn(
              "text-lg sm:text-xl font-medium transition-all duration-500"
            )}
          >
            NoiseMonitor
          </h1>
        </div>

        {showToggle && (
          <button
            onClick={toggleHardMode}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            aria-label={isHardMode ? "Switch to light mode" : "Switch to hard mode"}
          >
            {isHardMode ? (
              <Volume2 className="h-5 w-5 text-primary" />
            ) : (
              <Volume1 className="h-5 w-5 text-primary" />
            )}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
