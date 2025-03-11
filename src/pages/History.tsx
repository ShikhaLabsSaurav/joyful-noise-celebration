
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Download, Filter } from 'lucide-react';
import { historicalNoiseData, NoiseData } from '@/utils/noiseData';
import { format } from 'date-fns';

const History = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Generate data for location comparison
  const locationData = [
    { name: 'Floor 1', avg: 72, withinLimit: true },
    { name: 'Floor 2', avg: 68, withinLimit: true },
    { name: 'Floor 3', avg: 76, withinLimit: false },
    { name: 'Conference Room', avg: 65, withinLimit: true },
    { name: 'Cafeteria', avg: 80, withinLimit: false },
  ];
  
  // Generate hourly data
  const hourlyData = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const hourLabel = `${hour}:00`;
    return {
      hour: hourLabel,
      level: Math.floor(Math.random() * (85 - 55) + 55),
    };
  });
  
  // Generate weekly data
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyData = days.map(day => ({
    day,
    average: Math.floor(Math.random() * (80 - 60) + 60),
    max: Math.floor(Math.random() * (90 - 75) + 75),
  }));
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Noise History</h1>
        <p className="text-muted-foreground mt-1">Historical noise level data analysis</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <Tabs defaultValue="today" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1 lg:col-span-2 glassmorphism">
          <CardHeader>
            <CardTitle>Hourly Noise Levels</CardTitle>
            <CardDescription>
              Noise level measurements throughout the day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={hourlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="hour" 
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      // Only show every 3 hours
                      const hour = parseInt(value.split(':')[0]);
                      return hour % 3 === 0 ? value : '';
                    }}
                  />
                  <YAxis 
                    domain={[40, 90]} 
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Bar 
                    dataKey="level" 
                    fill="#4F46E5" 
                    barSize={12} 
                    radius={[4, 4, 0, 0]} 
                  />
                  {/* Limit line */}
                  <CartesianGrid 
                    y={75} 
                    stroke="#f97316" 
                    strokeWidth={1} 
                    strokeDasharray="5 5" 
                    horizontal={false} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex items-center justify-center">
              <div className="flex items-center text-xs">
                <div className="h-2 w-2 rounded-full bg-orange-500 mr-1"></div>
                <span className="text-muted-foreground mr-4">Limit (75 dB)</span>
                
                <div className="h-2 w-2 rounded-full bg-indigo-500 mr-1"></div>
                <span className="text-muted-foreground">Noise Level</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Location Comparison</CardTitle>
            <CardDescription>
              Average noise levels by location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locationData.map((location) => (
                <div key={location.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-sm">{location.name}</span>
                      <span 
                        className={`ml-2 text-xs px-1.5 py-0.5 rounded-full font-medium ${
                          location.withinLimit 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {location.withinLimit ? 'OK' : 'High'}
                      </span>
                    </div>
                    <span className="font-bold">{location.avg} dB</span>
                  </div>
                  
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        location.withinLimit ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(location.avg / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="glassmorphism mb-6">
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
          <CardDescription>
            Average and maximum noise levels for the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" axisLine={false} />
                <YAxis domain={[40, 100]} axisLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="average" name="Average (dB)" fill="#3B82F6" barSize={20} />
                <Bar dataKey="max" name="Maximum (dB)" fill="#EC4899" barSize={20} />
                {/* Limit line */}
                <CartesianGrid 
                  y={75} 
                  stroke="#f97316" 
                  strokeWidth={1} 
                  strokeDasharray="5 5" 
                  horizontal={false} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default History;
