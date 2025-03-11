
import React, { useState } from 'react';
import { Database as DatabaseIcon, Filter, RefreshCw, Search } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  getRecentNoiseData, 
  NoiseData, 
  isWithinNoiseLimit 
} from '@/utils/noiseData';

const Database: React.FC = () => {
  const [data, setData] = useState<NoiseData[]>(getRecentNoiseData(5));
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setData(getRecentNoiseData(5));
      setIsRefreshing(false);
    }, 600);
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="noise-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <DatabaseIcon className="h-5 w-5 text-primary" />
          <span className="section-title">Noise Database</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search records..."
            className="pl-8"
          />
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="within">Within Limit</SelectItem>
              <SelectItem value="exceeding">Exceeding</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Level (dB)</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {formatDate(item.timestamp)}
                </TableCell>
                <TableCell>{item.level}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <span 
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      item.isWithinLimit
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {item.isWithinLimit ? 'Within Limit' : 'Exceeding'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground text-center">
        Showing 5 of {getRecentNoiseData().length} records
      </div>
    </div>
  );
};

export default Database;
