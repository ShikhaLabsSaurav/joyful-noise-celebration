
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import NoiseLevel from '@/components/NoiseLevel';
import Database from '@/components/Database';
import NoiseCard from '@/components/NoiseCard';
import ChartSection from '@/components/ChartSection';
import { 
  getLocationsWithAverage, 
  getCurrentNoiseLevel,
  getRecentNoiseData,
  historicalNoiseData
} from '@/utils/noiseData';
import { 
  Building2, 
  Clock, 
  AlertTriangle, 
  CheckCircle2
} from 'lucide-react';

const Index = () => {
  const [stats, setStats] = useState({
    averageToday: 0,
    locationsInCompliance: 0,
    timeSinceLastViolation: '2h 15m',
  });
  
  useEffect(() => {
    // Calculate stats
    const recent = getRecentNoiseData(24);
    const avgToday = recent.reduce((sum, item) => sum + item.level, 0) / recent.length;
    
    const locations = getLocationsWithAverage();
    const compliantLocations = locations.filter(loc => loc.average <= 75).length;
    
    setStats({
      averageToday: parseFloat(avgToday.toFixed(1)),
      locationsInCompliance: compliantLocations,
      timeSinceLastViolation: '2h 15m', // Static for demo
    });
  }, []);
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Noise Monitor Dashboard</h1>
        <p className="text-muted-foreground mt-1">Monitor and analyze noise levels across all locations</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <NoiseCard
          title="Average Today"
          value={stats.averageToday}
          unit="dB"
          icon={Building2}
          trend={stats.averageToday > 75 ? 'up' : 'down'}
          trendValue={`${Math.abs(75 - stats.averageToday).toFixed(1)} dB ${stats.averageToday > 75 ? 'above' : 'below'} limit`}
          variant={stats.averageToday > 75 ? 'danger' : 'success'}
        />
        
        <NoiseCard
          title="Locations In Compliance"
          value={`${stats.locationsInCompliance}/5`}
          icon={CheckCircle2}
          subtitle="Locations with acceptable noise levels"
          variant="success"
        />
        
        <NoiseCard
          title="Since Last Violation"
          value={stats.timeSinceLastViolation}
          icon={Clock}
          subtitle="Time since noise exceeded limits"
          variant="warning"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <NoiseLevel />
        <ChartSection />
      </div>
      
      <div className="mb-6">
        <Database />
      </div>
    </MainLayout>
  );
};

export default Index;
