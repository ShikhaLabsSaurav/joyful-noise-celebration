
import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  TooltipProps 
} from 'recharts';
import { getTimeRangeData, NoiseData } from '@/utils/noiseData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChartData {
  time: string;
  level: number;
  isWithinLimit: boolean;
}

const formatData = (data: NoiseData[]): ChartData[] => {
  return data.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    level: item.level,
    isWithinLimit: item.isWithinLimit,
  }));
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glassmorphism p-2 text-xs border rounded shadow-sm">
        <p className="font-medium">{`${data.time}`}</p>
        <p className="text-primary">{`Noise Level: ${data.level} dB`}</p>
        <p className={data.isWithinLimit ? 'text-green-600' : 'text-red-600'}>
          {data.isWithinLimit ? 'Within Limit' : 'Exceeding Limit'}
        </p>
      </div>
    );
  }

  return null;
};

const ChartSection: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('6h');
  const [chartData, setChartData] = useState<ChartData[]>(
    formatData(getTimeRangeData(6)).reverse()
  );
  
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    const hours = parseInt(value.replace('h', ''));
    setChartData(formatData(getTimeRangeData(hours)).reverse());
  };
  
  return (
    <div className="noise-card">
      <div className="flex items-center justify-between mb-4">
        <span className="section-title">Noise Level Trends</span>
        
        <Tabs 
          defaultValue="6h" 
          value={timeRange} 
          onValueChange={handleTimeRangeChange}
          className="w-auto"
        >
          <TabsList className="grid grid-cols-3 h-8">
            <TabsTrigger value="6h" className="text-xs">6h</TabsTrigger>
            <TabsTrigger value="12h" className="text-xs">12h</TabsTrigger>
            <TabsTrigger value="24h" className="text-xs">24h</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
              domain={[40, 100]}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="level" 
              stroke="#3B82F6" 
              strokeWidth={2}
              fill="url(#colorLevel)" 
              activeDot={{ r: 6, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
            />
            {/* Line for acceptable noise limit (75 dB) */}
            <CartesianGrid 
              y={75} 
              stroke="#f97316" 
              strokeWidth={1} 
              strokeDasharray="5 5" 
              horizontal={false} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 flex items-center justify-center">
        <div className="flex items-center text-xs">
          <div className="h-2 w-2 rounded-full bg-orange-500 mr-1"></div>
          <span className="text-muted-foreground mr-4">Limit (75 dB)</span>
          
          <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
          <span className="text-muted-foreground">Noise Level</span>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
