import React, { useEffect, useState, useRef } from 'react';
import { 
  setupAudioAnalyzer, 
  getDecibelLevel, 
  isWithinNoiseLimit,
  getNoiseLevelCategory,
  NOISE_THRESHOLD,
  getNoiseThresholds
} from '@/utils/audioUtils';
import NoiseGauge from './NoiseGauge';
import { useModeContext } from '@/contexts/ModeContext';

const NoiseLevel: React.FC = () => {
  const { isHardMode } = useModeContext();
  const [noiseLevel, setNoiseLevel] = useState<number>(45);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  useEffect(() => {
    let isActive = true;
    
    const initializeAudio = async () => {
      const result = await setupAudioAnalyzer();
      if (result && isActive) {
        const { analyzer, audioContext, stream } = result;
        analyzerRef.current = analyzer;
        audioContextRef.current = audioContext;
        streamRef.current = stream;
        
        startMeasuring();
      }
    };
    
    initializeAudio();
    
    return () => {
      isActive = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  // Update measuring animation when hard mode changes
  useEffect(() => {
    if (analyzerRef.current && animationRef.current) {
      // Cancel the current frame and restart measuring with new thresholds
      cancelAnimationFrame(animationRef.current);
      startMeasuring();
    }
  }, [isHardMode]);
  
  const startMeasuring = () => {
    const measure = () => {
      if (analyzerRef.current) {
        const level = getDecibelLevel(analyzerRef.current);
        
        setNoiseLevel(prevLevel => {
          const prevIsWithinLimit = isWithinNoiseLimit(prevLevel, isHardMode);
          const currentIsWithinLimit = isWithinNoiseLimit(level, isHardMode);
          
          // Trigger celebration when limit is reached
          if (!currentIsWithinLimit && prevIsWithinLimit) {
           // startCelebration(true);
          }
          
          if (Math.abs(level - prevLevel) > 3) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 300);
          }
          
          return level;
        });
      }
      
      animationRef.current = requestAnimationFrame(measure);
    };
    
    measure();
  };

  // Get threshold values based on current mode
  const thresholds = getNoiseThresholds(isHardMode);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <NoiseGauge 
        value={noiseLevel} 
        minValue={0} 
        maxValue={isHardMode ? 180 : 140} 
        thresholds={[thresholds.LOW, thresholds.MEDIUM]}
        className="w-full max-w-screen-lg mx-auto" 
      />
    </div>
  );
};

export default NoiseLevel;
