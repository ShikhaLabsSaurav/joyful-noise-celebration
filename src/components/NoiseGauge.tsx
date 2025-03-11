import React, { useMemo } from "react";
import { GaugeComponent } from "react-gauge-component";
import { useCelebration } from "@/contexts/celebration-context";
import Diya from "./Diya";

interface NoiseGaugeProps {
  value: number;
  minValue: number;
  maxValue: number;
  thresholds: [number, number]; // Tuple for exact two thresholds
  className?: string; // Optional className for custom styling
}

const NoiseGauge: React.FC<NoiseGaugeProps> = ({
  value,
  minValue,
  maxValue,
  thresholds,
  className = "",
}) => {
  // Context
  const { isCelebrating } = useCelebration();

  // Validate props
  const validateThresholds = () => {
    if (thresholds[0] >= thresholds[1]) {
      console.error("Thresholds[0] must be less than Thresholds[1]");
      return false;
    }
    if (thresholds[0] < minValue || thresholds[1] > maxValue) {
      console.error("Thresholds must be within minValue and maxValue range");
      return false;
    }
    return true;
  };

  // Normalize value and calculate percentage (memoized to prevent recalculations)
  const { normalizedValue, percentValue } = useMemo(() => {
    const normalized = Math.min(maxValue, Math.max(minValue, value));
    const percent = ((normalized - minValue) / (maxValue - minValue)) * 100;
    return { normalizedValue: normalized, percentValue: percent };
  }, [value, minValue, maxValue]);

  // Compute subArcs configuration (memoized to optimize rendering)
  const subArcs = useMemo(() => [
    {
      limit: ((thresholds[0] - minValue) / (maxValue - minValue)) * 100,
      color: "#4ade80", // Green for safe levels
      showTick: false,
    },
    {
      limit: ((thresholds[1] - minValue) / (maxValue - minValue)) * 100,
      color: "#facc15", // Yellow for caution
      showTick: false,
    },
    {
      color: "#ef4444", // Red for danger
    },
  ], [minValue, maxValue, thresholds]);

  // Determine color based on value
  const getValueColor = () => {
    if (normalizedValue < thresholds[0]) return "#4ade80";
    if (normalizedValue < thresholds[1]) return "#facc15";
    return "#ef4444";
  };

  // Render only if validation passes
  if (!validateThresholds()) return null;

  return (
    <div
      className={`relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center ${className}`}
    >
      {/* Centered Diya with conditional rendering */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 sm:scale-125 md:scale-150">
        {Diya && <Diya noiseLevel={normalizedValue} isCelebrating={isCelebrating} />}
      </div>

      {/* Gauge and Value Display */}
      <div className="fixed bottom-10 sm:bottom-6 md:bottom-10 right-4 sm:right-6 md:right-10 flex flex-col items-center w-[calc(100%-2rem)] sm:w-[500px] md:w-[600px] gap-2 sm:gap-3 md:gap-4">
        <div className="gauge-container w-full relative">
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.18,
              padding: 0.02,
              cornerRadius: 1,
              subArcs: subArcs.map(arc => ({
                ...arc,
                padding: 0.01,
                width: 0.18,
              })),
            }}
            pointer={{
              type: "needle",
              color: "#1f2937",
              length: 0.65,
              width: 12,
              elastic: true,
            }}
            labels={{
              valueLabel: { hide: true },
              tickLabels: {
                type: "outer",
                ticks: [],
              },
            }}
            value={percentValue}
            minValue={0}
            maxValue={100}
          />
          
          {/* Centered value display */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[40%] flex flex-col items-center">
            <div className="flex items-baseline gap-2">
              <span
                className="text-3xl sm:text-4xl md:text-5xl font-bold transition-colors duration-300"
                style={{ color: getValueColor() }}
              >
                {normalizedValue.toFixed(1)}
              </span>
              <span className="text-base sm:text-lg md:text-xl text-gray-500">dB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoiseGauge;