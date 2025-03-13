import React, { useEffect, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { getNoiseLevelCategory, getNoiseThresholds } from '@/utils/audioUtils';
import diyaImage from '@/assets/images/oil-lamp-light.png';
import { useModeContext } from '@/contexts/ModeContext';

interface DiyaProps {
  noiseLevel: number;
}

const Diya: React.FC<DiyaProps> = ({ noiseLevel }) => {
  const { isHardMode } = useModeContext();
  const [isFlameVisible, setIsFlameVisible] = useState(false);
  const [hasHitHighThreshold, setHasHitHighThreshold] = useState(false);
  
  // Get thresholds based on current mode
  const thresholds = useMemo(() => getNoiseThresholds(isHardMode), [isHardMode]);
  
  // Effect to check if HIGH threshold is hit for the first time
  useEffect(() => {
    if (noiseLevel >= thresholds.HIGH && !hasHitHighThreshold) {
      setHasHitHighThreshold(true);
      setIsFlameVisible(true);
    }
  }, [noiseLevel, hasHitHighThreshold, thresholds.HIGH]);

  // Calculate flame size based on noise level and threshold status
  const flameSize = useMemo(() => {
    // Once high threshold is hit, always return maximum size
    if (hasHitHighThreshold) {
      return 100;
    }
    
    // No flame below LOW threshold
    if (noiseLevel < thresholds.LOW) return 0;
    
    // Gradual size increase between LOW and HIGH thresholds
    const ratio = (noiseLevel - thresholds.LOW) / (thresholds.HIGH - thresholds.LOW);
    
    // Using a slightly non-linear growth function for more realistic appearance
    const growthFactor = Math.pow(ratio, 1.2);
    return Math.min(100, Math.max(10, growthFactor * 90 + 10));
  }, [noiseLevel, hasHitHighThreshold, thresholds.LOW, thresholds.HIGH]);

  // Determine flame flicker intensity based on threshold status
  const flickerIntensity = useMemo(() => {
    // Once high threshold is hit, always return maximum intensity
    if (hasHitHighThreshold) return 1.0;
    
    const category = getNoiseLevelCategory(noiseLevel, isHardMode);
    if (category === 'low') return 0.3;
    if (category === 'medium') return 0.6;
    return 1.0;
  }, [noiseLevel, hasHitHighThreshold, isHardMode]);

  // Only monitor flame visibility if threshold hasn't been hit
  useEffect(() => {
    if (!hasHitHighThreshold) {
      setIsFlameVisible(noiseLevel >= thresholds.LOW);
    }
  }, [noiseLevel, hasHitHighThreshold, thresholds.LOW]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pt-16">
      {/* Ambient Glow - Only visible when flame is visible */}
      <div className={cn(
        "absolute -inset-16 sm:-inset-24 md:-inset-32",
        "rounded-full blur-3xl",
        "bg-gradient-radial from-orange-500/40 via-amber-500/20 to-transparent",
        "transition-opacity duration-700",
        isFlameVisible ? "opacity-80" : "opacity-0"
      )} />

      {/* Diya Container */}
      <div className="relative">
        {/* Static Diya Image */}
        <img 
          src={diyaImage} 
          alt="Diya"
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
        />
        
        {/* Single Realistic Flame with gradual appearance */}
        <div 
          className={cn(
            "absolute left-1/2 -translate-x-1/2 bottom-[80%]",
            "transition-all duration-700 ease-in-out",
            isFlameVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
          )}
          style={{
            height: `${Math.max(90, flameSize * 3)}px`,
            width: `${Math.max(54, flameSize * 1.5)}px`,
            transitionProperty: "opacity, transform, height, width"
          }}
        >
          <RealisticFlame flickerIntensity={flickerIntensity} />
        </div>
      </div>
    </div>
  );
};

// Realistic Flame Component
const RealisticFlame: React.FC<{
  flickerIntensity: number; 
}> = ({ flickerIntensity }) => {
  const flickerAnimation = "animate-flame-gentle";
  
  const flameGradient = "from-yellow-300 via-orange-400 to-red-500";
  
  return (
    <div className="relative w-full h-full">
      <div className={cn(
        "absolute inset-0",
        `bg-gradient-to-t ${flameGradient}`,
        flickerAnimation,
        "rounded-full",
        "origin-bottom",
        "after:absolute after:inset-[5%]",
        "after:bg-gradient-to-t",
        "after:from-white after:via-yellow-400 after:to-transparent",
        "after:rounded-[inherit]",
        "after:opacity-95",
        "shadow-2xl",
        "filter blur-md"
      )} />
      <div className={cn(
        "absolute bottom-0",
        "w-full h-[20%]",
        "rounded-full",
        "opacity-70"
      )} />
      <div className={cn(
        "absolute -inset-[30%]",
        "bg-gradient-radial from-orange-600/80 to-transparent",
        "rounded-full blur-xl",
        "opacity-55"
      )} />
    </div>
  );
};

export default Diya;