import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { toast } from 'sonner';

interface AudioPermissionProps {
  onPermissionGranted: () => void;
}

const AudioPermission: React.FC<AudioPermissionProps> = ({ onPermissionGranted }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  
  const requestMicrophoneAccess = async () => {
    setIsRequesting(true);
    
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      onPermissionGranted();
      toast.success('Microphone access granted!');
    } catch (error) {
      console.error('Error requesting microphone access:', error);
      toast.error('Failed to access microphone. Please check your browser permissions.');
    } finally {
      setIsRequesting(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 sm:p-6 text-center">
      <div className="rounded-full bg-primary/10 p-4 sm:p-6 mb-4 sm:mb-6">
        {isRequesting ? (
          <Mic className="h-12 w-12 sm:h-16 sm:w-16 text-primary animate-pulse" />
        ) : (
          <MicOff className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground" />
        )}
      </div>
      
      <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Microphone Access Required</h2>
      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-xs sm:max-w-md mx-auto">
        This app needs microphone access to measure noise levels in real-time.
        Your audio is processed locally and is not sent to any server.
      </p>
      
      <Button 
        size="lg" 
        onClick={requestMicrophoneAccess}
        disabled={isRequesting}
        className="w-full sm:w-auto"
      >
        <Mic className="mr-2 h-4 w-4" />
        {isRequesting ? 'Requesting Access...' : 'Allow Microphone Access'}
      </Button>
    </div>
  );
};

export default AudioPermission;
