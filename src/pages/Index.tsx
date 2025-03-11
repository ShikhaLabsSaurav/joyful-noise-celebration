import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import NoiseLevel from '@/components/NoiseLevel';
import AudioPermission from '@/components/AudioPermission';

const Index = () => {
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);
  
  const handlePermissionGranted = () => {
    setMicPermissionGranted(true);
  };
  
  if (!micPermissionGranted) {
    return (
      <MainLayout>
        <AudioPermission onPermissionGranted={handlePermissionGranted} />
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="overflow-hidden">
        <NoiseLevel />
      </div>
    </MainLayout>
  );
};

export default Index;
