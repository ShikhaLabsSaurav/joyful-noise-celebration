// Utility functions for audio processing and noise level calculation

// Function to get microphone permission and set up the audio analyzer
export const setupAudioAnalyzer = async (): Promise<{ 
  analyzer: AnalyserNode; 
  audioContext: AudioContext;
  stream: MediaStream;
} | null> => {
  try {
    // Request microphone permission
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });
    
    // Create audio context and analyzer
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyzer = audioContext.createAnalyser();
    
    // Configure analyzer
    analyzer.fftSize = 256;
    analyzer.smoothingTimeConstant = 0.8;
    source.connect(analyzer);
    
    return { analyzer, audioContext, stream };
  } catch (error) {
    console.error("Error accessing microphone:", error);
    return null;
  }
};

// Convert raw audio data to decibel value
export const getDecibelLevel = (analyzer: AnalyserNode): number => {
  const dataArray = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(dataArray);
  
  // Calculate average frequency amplitude
  const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
  
  // Convert to decibel scale (rough approximation)
  // Mapping 0-255 to 30-150 dB range for better visualization
  const minDb = 0;
  const maxDb = 140
  const dbLevel = minDb + (average / 255) * (maxDb - minDb);
  
  return Math.round(dbLevel * 10) / 10; // Round to one decimal place
};

// Define noise level thresholds (updated for 30-150 dB scale)
export const NOISE_THRESHOLD = {
  LOW: 40,     // Quiet office, normal conversation
  MEDIUM: 70,  // Busy traffic, noisy restaurant
  HIGH: 90     // Concert, loud crowd - but still below dangerous levels
};

// Check if current noise level is within acceptable limits
export const isWithinNoiseLimit = (level: number): boolean => {
  return level <= NOISE_THRESHOLD.MEDIUM;
};

// Get noise level category for visualization
export const getNoiseLevelCategory = (level: number): 'low' | 'medium' | 'high' => {
  if (level < NOISE_THRESHOLD.LOW) return 'low';
  if (level < NOISE_THRESHOLD.MEDIUM) return 'medium';
  return 'high';
};