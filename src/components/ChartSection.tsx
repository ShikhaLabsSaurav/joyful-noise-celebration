import React, { useState, useEffect, useRef } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Activity } from 'lucide-react';
import { 
  getDecibelLevel,
  NOISE_THRESHOLD,
  setupAudioAnalyzer
} from '@/utils/audioUtils';

interface NoiseDataPoint {
  time: string;
  level: number;
}

const ChartSection: React.FC = () => {
  const [chartData, setChartData] = useState<NoiseDataPoint[]>([]);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);
  
  // Initialize audio analyzer
  useEffect(() => {
    let isActive = true;
    
    // Set up audio analyzer for the chart
    const initializeAudio = async () => {
      // Only set up if we haven't already
      if (!analyzerRef.current) {
        const result = await setupAudioAnalyzer();
        if (result && isActive) {
          const { analyzer, audioContext, stream } = result;
          analyzerRef.current = analyzer;
          audioContextRef.current = audioContext;
          streamRef.current = stream;
        }
      }
    };
    
    initializeAudio();
    
    // Clean up on unmount
    return () => {
      isActive = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Update chart data periodically
  useEffect(() => {
    if (!analyzerRef.current) return;
    
    const updateInterval = 1000; // Update every second
    let lastUpdateTime = Date.now();
    
    const updateChartData = () => {
      const currentTime = Date.now();
      
      // Only update at specified interval
      if (currentTime - lastUpdateTime >= updateInterval) {
        lastUpdateTime = currentTime;
        
        if (analyzerRef.current) {
          const level = getDecibelLevel(analyzerRef.current);
          const timeStr = new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
          });
          
          setChartData(prevData => {
            // Keep last 60 seconds of data
            const newData = [...prevData, { time: timeStr, level }];
            if (newData.length > 60) {
              return newData.slice(newData.length - 60);
            }
            return newData;
          });
        }
      }
      
      animationRef.current = requestAnimationFrame(updateChartData);
    };
    
    updateChartData();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glassmorphism p-2 text-xs border rounded shadow-sm">
          <p className="font-medium">{`${data.time}`}</p>
          <p className="text-primary">{`Noise Level: ${data.level} dB`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="noise-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <span className="section-title">Noise Level Trends</span>
        </div>
      </div>
      
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              tick={{fontSize: 10}} 
              tickMargin={5}
              axisLine={false}
            />
            <YAxis 
              tick={{fontSize: 10}} 
              tickMargin={5}
              domain={[30, 100]}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="level" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
            />
            {/* Reference line for medium threshold */}
            <ReferenceLine 
              y={NOISE_THRESHOLD.MEDIUM} 
              stroke="#f97316" 
              strokeDasharray="3 3"
              label={{ 
                value: 'Limit', 
                position: 'right', 
                fill: '#f97316',
                fontSize: 10 
              }}
            />
            {/* Reference line for high threshold */}
            <ReferenceLine 
              y={NOISE_THRESHOLD.HIGH} 
              stroke="#ef4444" 
              strokeDasharray="3 3"
              label={{ 
                value: 'High', 
                position: 'right', 
                fill: '#ef4444',
                fontSize: 10 
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 flex items-center justify-center">
        <div className="flex items-center text-xs gap-4">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
            <span className="text-muted-foreground">Noise Level</span>
          </div>
          
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-orange-500 mr-1"></div>
            <span className="text-muted-foreground">Limit ({NOISE_THRESHOLD.MEDIUM} dB)</span>
          </div>
          
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-red-500 mr-1"></div>
            <span className="text-muted-foreground">High ({NOISE_THRESHOLD.HIGH} dB)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
