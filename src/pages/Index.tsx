
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import NoiseLevel from '@/components/NoiseLevel';
import AudioPermission from '@/components/AudioPermission';
import ChartSection from '@/components/ChartSection';
import { 
  Building2, 
  Activity,
  Volume2
} from 'lucide-react';

const Index = () => {
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);
  
  const handlePermissionGranted = () => {
    setMicPermissionGranted(true);
  };
  
  if (!micPermissionGranted) {
    return (
      <MainLayout>
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Real-time Noise Monitor</h1>
          <p className="text-muted-foreground mt-1">Monitor and analyze noise levels in your environment</p>
        </div>
        
        <AudioPermission onPermissionGranted={handlePermissionGranted} />
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Real-time Noise Monitor</h1>
        <p className="text-muted-foreground mt-1">Monitor and analyze noise levels in your environment</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <NoiseLevel />
        <ChartSection />
      </div>
    </MainLayout>
  );
};

export default Index;
