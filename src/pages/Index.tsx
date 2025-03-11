
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import NoiseLevel from '@/components/NoiseLevel';
import AudioPermission from '@/components/AudioPermission';
import { Volume2 } from 'lucide-react';

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
      
      <div className="flex justify-center">
        <div className="w-full max-w-xl">
          <NoiseLevel />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
