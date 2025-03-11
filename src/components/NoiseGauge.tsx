
import React from 'react';
import GaugeChart from 'react-gauge-chart';

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
  // Calculate the percentage for gauge chart (0-1 range)
  const normalizedValue = Math.min(maxValue, Math.max(minValue, value));
  const percent = (normalizedValue - minValue) / (maxValue - minValue);
  
  // Determine color based on value
  const getValueColor = () => {
    if (value < thresholds[0]) return '#4ade80'; // green
    if (value < thresholds[1]) return '#facc15'; // yellow
    return '#ef4444'; // red
  };

  // Define arc colors
  const colors = ['#4ade80', '#facc15', '#ef4444'];
  
  // Calculate arc percentages based on thresholds
  const lowThresholdPercent = (thresholds[0] - minValue) / (maxValue - minValue);
  const mediumThresholdPercent = (thresholds[1] - minValue) / (maxValue - minValue);
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-64 h-44">
        <GaugeChart
          id="noise-gauge-chart"
          nrOfLevels={3}
          colors={colors}
          arcWidth={0.3}
          percent={percent}
          arcPadding={0}
          cornerRadius={3}
          textColor="#000000"
          needleColor="#1f2937"
          needleBaseColor="#1f2937"
          animate={true}
          formatTextValue={() => ''}
          arcsLength={[lowThresholdPercent, mediumThresholdPercent - lowThresholdPercent, 1 - mediumThresholdPercent]}
        />
      </div>
      
      <div className="flex items-center gap-2 -mt-8">
        <span className="text-6xl font-bold" style={{ color: getValueColor() }}>
          {value.toFixed(1)}
        </span>
        <span className="text-lg text-gray-500">dB</span>
      </div>
      
      <div className="flex justify-between w-full text-sm mt-2">
        <span className="text-gray-600">{minValue}</span>
        <span className="text-green-500">{thresholds[0]}</span>
        <span className="text-yellow-500">{thresholds[1]}</span>
        <span className="text-gray-600">{maxValue}</span>
      </div>
    </div>
  );
};

export default NoiseGauge;
