
import React from 'react';
import { cn } from '@/lib/utils';

interface NoiseGaugeProps {
  value: number;
  minValue: number;
  maxValue: number;
  thresholds: number[];
}

const NoiseGauge: React.FC<NoiseGaugeProps> = ({
  value,
  minValue,
  maxValue,
  thresholds
}) => {
  // Calculate rotation angle based on value
  const range = maxValue - minValue;
  const normalizedValue = Math.min(maxValue, Math.max(minValue, value));
  const valuePercentage = ((normalizedValue - minValue) / range);
  
  // Convert to degree (from -120 to 120 degrees, total 240 degree arc)
  const rotation = -120 + (valuePercentage * 240);
  
  // Determine color based on value
  const getGaugeColor = () => {
    if (value < thresholds[0]) return 'text-green-500';
    if (value < thresholds[1]) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Calculate ticks for the gauge
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const tickValue = minValue + (i / 10) * range;
    const tickRotation = -120 + (i / 10) * 240;
    const isMajor = i % 5 === 0;
    return { value: tickValue, rotation: tickRotation, isMajor };
  });

  return (
    <div className="relative w-64 h-44 mx-auto">
      {/* Gauge background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full relative">
          {/* Ticks */}
          {ticks.map((tick, i) => (
            <div
              key={i}
              className={cn(
                "absolute bottom-0 left-1/2 origin-bottom transform -translate-x-1/2",
                tick.isMajor ? "h-3 w-1" : "h-2 w-0.5"
              )}
              style={{
                transform: `rotate(${tick.rotation}deg)`,
                background: tick.isMajor 
                  ? (tick.value < thresholds[0] ? '#10B981' : 
                    tick.value < thresholds[1] ? '#F59E0B' : '#EF4444')
                  : '#94A3B8'
              }}
            />
          ))}
          
          {/* Colored arc segments */}
          <svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 200 120"
            style={{ overflow: 'visible' }}
          >
            {/* Green segment */}
            <path
              d="M 40,100 A 60,60 0 0,1 100,40"
              fill="none"
              stroke="#10B981"
              strokeWidth="6"
              strokeLinecap="round"
            />
            
            {/* Yellow segment */}
            <path
              d="M 100,40 A 60,60 0 0,1 160,100"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="6"
              strokeLinecap="round"
            />
            
            {/* Red segment */}
            <path
              d="M 160,100 A 60,60 0 0,1 180,120"
              fill="none"
              stroke="#EF4444"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Value labels */}
          <div className="absolute bottom-2 left-3 text-xs font-medium">{minValue}</div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs font-medium">
            {Math.round((minValue + maxValue) / 2)}
          </div>
          <div className="absolute bottom-2 right-3 text-xs font-medium">{maxValue}</div>
          
          {/* Threshold labels */}
          <div className="absolute bottom-6 left-[30%] -translate-x-1/2 text-xs text-green-600 font-medium">
            {thresholds[0]}
          </div>
          <div className="absolute bottom-6 right-[30%] translate-x-1/2 text-xs text-yellow-600 font-medium">
            {thresholds[1]}
          </div>
        </div>
      </div>
      
      {/* Needle */}
      <div 
        className="absolute left-1/2 bottom-0 origin-bottom transform -translate-x-1/2 transition-transform duration-300"
        style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
      >
        <div className={cn("h-32 w-1.5 rounded-t-full", getGaugeColor())} />
        <div className="h-5 w-5 rounded-full bg-gray-800 -mt-1 relative left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
};

export default NoiseGauge;
