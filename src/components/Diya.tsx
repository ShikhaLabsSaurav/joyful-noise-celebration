import React, { useEffect, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { getNoiseLevelCategory, NOISE_THRESHOLD } from '@/utils/audioUtils';
import diyaImage from '@/assets/images/oil-lamp-light.png';

interface DiyaProps {
  noiseLevel: number;
}

const Diya: React.FC<DiyaProps> = ({ noiseLevel }) => {
  const category = getNoiseLevelCategory(noiseLevel);
  const [isFlameVisible, setIsFlameVisible] = useState(false);
  
  // Calculate flame size based on noise level and existing NOISE_THRESHOLD
  const flameSize = useMemo(() => {
    // No flame below LOW threshold
    if (noiseLevel < NOISE_THRESHOLD.LOW) return 0;
    
    // Cap at HIGH threshold (130dB)
    if (noiseLevel >= NOISE_THRESHOLD.HIGH) return 100;
    
    // Gradual size increase between LOW and HIGH thresholds
    // Map noise from 80-130dB to flame size 10-100
    const ratio = (noiseLevel - NOISE_THRESHOLD.LOW) / (NOISE_THRESHOLD.HIGH - NOISE_THRESHOLD.LOW);
    
    // Using a slightly non-linear growth function for more realistic appearance
    // Power function makes initial growth slower, then accelerates
    const growthFactor = Math.pow(ratio, 1.2);
    return Math.min(100, Math.max(10, growthFactor * 90 + 10));
  }, [noiseLevel]);

  // Determine flame flicker intensity based on noise category
  const flickerIntensity = useMemo(() => {
    if (category === 'low') return 0.3;
    if (category === 'medium') return 0.6;
    return 1.0; // high category
  }, [category]);

  useEffect(() => {
    // Flame appears only when noise is at or above LOW threshold
    setIsFlameVisible(noiseLevel >= NOISE_THRESHOLD.LOW);
  }, [noiseLevel]);

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
            height: `${Math.max(60, flameSize * 2)}px`,
            width: `${Math.max(36, flameSize * 1)}px`,
            transitionProperty: "opacity, transform, height, width"
          }}
        >
          <RealisticFlame flickerIntensity={flickerIntensity} category={category} />
        </div>
      </div>
    </div>
  );
};

// Realistic Flame Component
const RealisticFlame: React.FC<{
  flickerIntensity: number; 
  category: 'low' | 'medium' | 'high'
}> = ({ flickerIntensity, category }) => {
  // Apply different animation intensity based on category
  const flickerAnimation = category === 'high' 
    ? "animate-flame-wild" 
    : category === 'medium' 
      ? "animate-flame-medium" 
      : "animate-flame-gentle";
  
  // Color gradients based on noise level category
  const flameGradient = category === 'high'
    ? "from-orange-600 via-amber-400 to-yellow-200"
    : category === 'medium'
      ? "from-orange-500 via-amber-300 to-yellow-100" 
      : "from-orange-400 via-amber-200 to-yellow-50";
  
  return (
    <div className="relative w-full h-full">
      {/* Main Flame */}
      <div className={cn(
        "absolute inset-0",
        `bg-gradient-to-t ${flameGradient}`,
        flickerAnimation,
        "rounded-full rounded-b-none",
        "origin-bottom",
        // Inner glow
        "after:absolute after:inset-[15%]",
        "after:bg-gradient-to-t",
        "after:from-white after:via-yellow-200 after:to-transparent",
        "after:rounded-[inherit]",
        "after:opacity-80"
      )} />

      {/* Blue Base */}
      <div className={cn(
        "absolute bottom-0",
        "w-full h-[15%]",
        "bg-gradient-to-t from-blue-600 via-blue-400 to-transparent",
        "rounded-full",
        "opacity-50"
      )} />

      {/* Subtle Glow - intensity varies by category */}
      <div className={cn(
        "absolute -inset-[20%]",
        "bg-gradient-radial from-orange-500/60 to-transparent",
        "rounded-full blur-md",
        category === 'high' ? "opacity-80" : 
        category === 'medium' ? "opacity-60" : 
        "opacity-40"
      )} />
    </div>
  );
};

export default Diya;