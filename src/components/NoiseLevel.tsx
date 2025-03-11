import React, { useEffect, useState, useRef } from 'react';
import { 
  setupAudioAnalyzer, 
  getDecibelLevel, 
  isWithinNoiseLimit,
  getNoiseLevelCategory,
  NOISE_THRESHOLD
} from '@/utils/audioUtils';
import NoiseGauge from './NoiseGauge';
import { useCelebration } from '@/contexts/celebration-context';

const NoiseLevel: React.FC = () => {
  const [noiseLevel, setNoiseLevel] = useState<number>(45);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { startCelebration } = useCelebration();
  
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
  
  const startMeasuring = () => {
    const measure = () => {
      if (analyzerRef.current) {
        const level = getDecibelLevel(analyzerRef.current);
        
        setNoiseLevel(prevLevel => {
          const prevIsWithinLimit = isWithinNoiseLimit(prevLevel);
          const currentIsWithinLimit = isWithinNoiseLimit(level);
          
          // Trigger celebration when limit is reached
          if (!currentIsWithinLimit && prevIsWithinLimit) {
            startCelebration(true);
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

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <NoiseGauge 
        value={noiseLevel} 
        minValue={30} 
        maxValue={200} 
        thresholds={[NOISE_THRESHOLD.LOW, NOISE_THRESHOLD.MEDIUM]}
        className="w-full max-w-screen-lg mx-auto" 
      />
    </div>
  );
};

export default NoiseLevel;
