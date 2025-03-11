import React, { useEffect, useState, useRef } from 'react';
import { Volume2, Volume, VolumeX, Gauge } from 'lucide-react';
import Celebration from './Celebration';
import { 
  setupAudioAnalyzer, 
  getDecibelLevel, 
  isWithinNoiseLimit,
  getNoiseLevelCategory,
  NOISE_THRESHOLD
} from '@/utils/audioUtils';
import NoiseGauge from './NoiseGauge';

const NoiseLevel: React.FC = () => {
  const [noiseLevel, setNoiseLevel] = useState<number>(45);
  const [maxLevel, setMaxLevel] = useState<number>(45);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
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
  
  const startMeasuring = () => {
    const measure = () => {
      if (analyzerRef.current) {
        const level = getDecibelLevel(analyzerRef.current);
        
        setNoiseLevel(prevLevel => {
          if (level > maxLevel) {
            setMaxLevel(level);
          }
          
          const prevIsWithinLimit = isWithinNoiseLimit(prevLevel);
          const currentIsWithinLimit = isWithinNoiseLimit(level);
          
          if (currentIsWithinLimit && !prevIsWithinLimit) {
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 3000);
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
  
  const category = getNoiseLevelCategory(noiseLevel);
  
  const getNoiseLevelColor = () => {
    if (category === 'low') return 'text-green-500';
    if (category === 'medium') return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getVolumeIcon = () => {
    if (category === 'low') return <VolumeX className="h-6 w-6 text-green-500" />;
    if (category === 'medium') return <Volume className="h-6 w-6 text-yellow-500" />;
    return <Volume2 className="h-6 w-6 text-red-500" />;
  };
  
  return (
    <div className="relative">
      <div className="noise-card flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="section-title">Real-time Noise Level</span>
          {getVolumeIcon()}
        </div>
        
        <div className="flex flex-col items-center mb-4">
          <NoiseGauge 
            value={noiseLevel} 
            minValue={30} 
            maxValue={100} 
            thresholds={[NOISE_THRESHOLD.LOW, NOISE_THRESHOLD.MEDIUM, NOISE_THRESHOLD.HIGH]}
          />
          
          <div className="flex items-end gap-2 mt-2">
            <div 
              className={`text-4xl font-bold ${getNoiseLevelColor()} transition-all ${
                isAnimating ? 'scale-110' : 'scale-100'
              }`}
            >
              {noiseLevel}
            </div>
            <div className="text-lg text-muted-foreground mb-1">dB</div>
          </div>
        </div>
        
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1">
            <div className="text-xs text-muted-foreground mb-1">Today's Max</div>
            <div className={`text-xl font-medium ${
              isWithinNoiseLimit(maxLevel) ? 'text-green-500' : 'text-red-500'
            }`}>
              {maxLevel} dB
            </div>
          </div>
          
          <div className={`px-3 py-2 rounded-md text-sm font-medium ${
            isWithinNoiseLimit(noiseLevel) 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isWithinNoiseLimit(noiseLevel) 
              ? 'Within acceptable level' 
              : 'Exceeding limit! Reduce noise'}
          </div>
        </div>
      </div>
      
      {showCelebration && <Celebration />}
    </div>
  );
};

export default NoiseLevel;
