
import React, { useEffect, useState } from 'react';
import { Trophy, Star, Award, Music } from 'lucide-react';

interface CelebrationParticle {
  id: number;
  x: number;
  y: number;
  icon: 'trophy' | 'star' | 'award' | 'music';
  color: string;
  size: number;
  delay: number;
  duration: number;
}

const Celebration: React.FC = () => {
  const [particles, setParticles] = useState<CelebrationParticle[]>([]);
  
  useEffect(() => {
    const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EC4899'];
    const icons = ['trophy', 'star', 'award', 'music'];
    const newParticles: CelebrationParticle[] = [];
    
    // Create celebration particles
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        icon: icons[Math.floor(Math.random() * icons.length)] as any,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * (30 - 15) + 15,
        delay: Math.random() * 0.5,
        duration: Math.random() * (3 - 1.5) + 1.5
      });
    }
    
    setParticles(newParticles);
  }, []);
  
  const renderIcon = (icon: string, color: string, size: number) => {
    const props = { 
      className: `text-${color}`,
      size 
    };
    
    switch (icon) {
      case 'trophy':
        return <Trophy {...props} />;
      case 'star':
        return <Star {...props} />;
      case 'award':
        return <Award {...props} />;
      case 'music':
        return <Music {...props} />;
      default:
        return <Star {...props} />;
    }
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center animate-celebrate">
        <div className="text-xl md:text-3xl font-bold text-green-600 mb-2">
          Great Job!
        </div>
        <div className="text-green-600 text-sm md:text-base">
          Noise level is now within acceptable limits
        </div>
      </div>
      
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float"
          style={{
            top: `${p.y}%`,
            left: `${p.x}%`,
            color: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: 0.8,
          }}
        >
          {renderIcon(p.icon, p.color, p.size)}
        </div>
      ))}
    </div>
  );
};

export default Celebration;
