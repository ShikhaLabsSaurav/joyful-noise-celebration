
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Add a class for page transitions
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div key={location.pathname} className="page-transition-enter">
          {children}
        </div>
      </main>
      <footer className="py-4 px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} NoiseMonitor • All rights reserved</p>
      </footer>
    </div>
  );
};

export default MainLayout;
