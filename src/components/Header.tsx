
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, BarChart2, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Header: React.FC = () => {
  const location = useLocation();
  const { toast } = useToast();

  const showNotification = () => {
    toast({
      title: 'Noise Monitor',
      description: 'All noise levels are being monitored in real-time.',
    });
  };

  return (
    <header className="w-full glassmorphism sticky top-0 z-50 py-3 px-4 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center mr-3">
            <BarChart2 className="text-white h-5 w-5" />
          </div>
          <h1 className="text-xl font-medium">NoiseMonitor</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link 
            to="/" 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === '/' 
                ? 'bg-primary/10 text-primary' 
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/history" 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === '/history' 
                ? 'bg-primary/10 text-primary' 
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            History
          </Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={showNotification}
            className="relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full" />
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
