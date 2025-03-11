
// Sample noise level data model
export interface NoiseData {
  id: string;
  timestamp: Date;
  level: number; // dB value
  location: string;
  isWithinLimit: boolean;
}

// Function to generate a random noise level between min and max
const generateNoiseLevel = (min: number, max: number): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
};

// Function to determine if a noise level is within the acceptable limit
export const isWithinNoiseLimit = (level: number): boolean => {
  return level <= 75; // 75 dB is our threshold
};

// Generate a set of historical noise data
export const generateHistoricalData = (days: number = 7): NoiseData[] => {
  const data: NoiseData[] = [];
  const locations = ['Floor 1', 'Floor 2', 'Floor 3', 'Conference Room', 'Cafeteria'];
  
  const now = new Date();
  
  for (let i = 0; i < days * 24; i++) {
    const timestamp = new Date(now);
    timestamp.setHours(now.getHours() - i);
    
    const level = generateNoiseLevel(50, 85);
    const location = locations[Math.floor(Math.random() * locations.length)];
    
    data.push({
      id: `noise-${i}`,
      timestamp,
      level,
      location,
      isWithinLimit: isWithinNoiseLimit(level)
    });
  }
  
  return data;
};

// Get current noise level (simulated)
export const getCurrentNoiseLevel = (): number => {
  return generateNoiseLevel(60, 90);
};

// Historical data for the application
export const historicalNoiseData = generateHistoricalData();

// Get recent noise data for dashboard
export const getRecentNoiseData = (count: number = 10): NoiseData[] => {
  return historicalNoiseData.slice(0, count);
};

// Get noise data for a specific location
export const getLocationNoiseData = (location: string): NoiseData[] => {
  return historicalNoiseData.filter(data => data.location === location);
};

// Calculate noise average for a location
export const getLocationAverage = (location: string): number => {
  const locationData = getLocationNoiseData(location);
  if (locationData.length === 0) return 0;
  
  const sum = locationData.reduce((total, data) => total + data.level, 0);
  return parseFloat((sum / locationData.length).toFixed(1));
};

// Get locations with their average noise levels
export const getLocationsWithAverage = (): {location: string, average: number}[] => {
  const locations = ['Floor 1', 'Floor 2', 'Floor 3', 'Conference Room', 'Cafeteria'];
  return locations.map(location => ({
    location,
    average: getLocationAverage(location)
  }));
};

// Get a specific time range of data
export const getTimeRangeData = (hours: number): NoiseData[] => {
  const now = new Date();
  const cutoff = new Date(now.getTime() - hours * 60 * 60 * 1000);
  
  return historicalNoiseData.filter(data => data.timestamp >= cutoff);
};
