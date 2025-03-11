
import React, { useEffect, useState } from 'react';
import { Volume2, Volume, VolumeX } from 'lucide-react';
import { getCurrentNoiseLevel, isWithinNoiseLimit } from '@/utils/noiseData';
import { Progress } from '@/components/ui/progress';
import Celebration from './Celebration';

const NoiseLevel: React.FC = () => {
  const [noiseLevel, setNoiseLevel] = useState<number>(getCurrentNoiseLevel());
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  const isWithinLimit = isWithinNoiseLimit(noiseLevel);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newLevel = getCurrentNoiseLevel();
      setNoiseLevel(newLevel);
      
      // If the new level is within limits and the previous wasn't, trigger celebration
      if (isWithinNoiseLimit(newLevel) && !isWithinNoiseLimit(noiseLevel)) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [noiseLevel]);
  
  useEffect(() => {
    // Pulse animation when noise level changes
    setIsAnimating(true);
    const timeout = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timeout);
  }, [noiseLevel]);
  
  // Get color based on noise level
  const getNoiseLevelColor = () => {
    if (noiseLevel < 65) return 'text-green-500';
    if (noiseLevel < 75) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Get progress color and value
  const getProgressProps = () => {
    const value = Math.min(100, (noiseLevel / 100) * 100);
    
    if (noiseLevel < 65) return { color: 'bg-green-500', value };
    if (noiseLevel < 75) return { color: 'bg-yellow-500', value };
    return { color: 'bg-red-500', value };
  };
  
  const progressProps = getProgressProps();
  
  // Get appropriate volume icon
  const getVolumeIcon = () => {
    if (noiseLevel < 65) return <VolumeX className="h-6 w-6 text-green-500" />;
    if (noiseLevel < 75) return <Volume className="h-6 w-6 text-yellow-500" />;
    return <Volume2 className="h-6 w-6 text-red-500" />;
  };
  
  return (
    <div className="relative">
      <div className="noise-card flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="section-title">Current Noise Level</span>
          {getVolumeIcon()}
        </div>
        
        <div className="flex items-end gap-2 mb-4">
          <div 
            className={`text-4xl font-bold ${getNoiseLevelColor()} transition-all ${
              isAnimating ? 'scale-110' : 'scale-100'
            }`}
          >
            {noiseLevel}
          </div>
          <div className="text-lg text-muted-foreground mb-1">dB</div>
        </div>
        
        <div className="space-y-2">
          <Progress 
            value={progressProps.value} 
            className="h-2"
            indicatorClassName={progressProps.color}
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 dB</span>
            <span>50 dB</span>
            <span>100 dB</span>
          </div>
        </div>
        
        <div className={`mt-4 py-2 px-3 rounded-md text-sm font-medium ${
          isWithinLimit 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {isWithinLimit 
            ? 'Noise level is within acceptable limits' 
            : 'Noise level exceeds acceptable limits'}
        </div>
      </div>
      
      {showCelebration && <Celebration />}
    </div>
  );
};

export default NoiseLevel;
