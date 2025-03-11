import React from 'react';
import { cn } from '@/lib/utils';
import { getNoiseLevelCategory } from '@/utils/audioUtils';

interface DiyaProps {
  noiseLevel: number;
  isCelebrating: boolean;
}

const Diya: React.FC<DiyaProps> = ({ noiseLevel, isCelebrating }) => {
  const category = getNoiseLevelCategory(noiseLevel);
  
  const getFlameColor = () => {
    switch (category) {
      case 'low':
        return 'bg-gradient-to-t from-orange-600 via-orange-500/90 to-yellow-300/80';
      case 'medium':
        return 'bg-gradient-to-t from-orange-700 via-orange-500 to-yellow-400/90';
      case 'high':
        return 'bg-gradient-to-t from-orange-800 via-orange-600 to-yellow-500';
      default:
        return 'bg-gradient-to-t from-orange-600 via-orange-500/90 to-yellow-300/80';
    }
  };

  const getFlameSize = () => {
    switch (category) {
      case 'low':
        return 'h-24 w-6';
      case 'medium':
        return 'h-28 w-8';
      case 'high':
        return 'h-32 w-10';
      default:
        return 'h-24 w-6';
    }
  };

  const getGlowOpacity = () => {
    switch (category) {
      case 'low':
        return 'opacity-40';
      case 'medium':
        return 'opacity-50';
      case 'high':
        return 'opacity-60';
      default:
        return 'opacity-40';
    }
  };

  return (
    <div className={cn(
      "relative transition-all duration-300 scale-150",
      isCelebrating && "scale-[2.5] animate-float-slow"
    )}>
      {/* Enhanced Realistic Flame Effect */}
      <div className="relative">
        {/* Outer Glow */}
        <div className={cn(
          "absolute left-1/2 -translate-x-1/2 -top-16",
          "rounded-full blur-[20px]",
          "bg-gradient-radial from-orange-400/60 via-orange-500/40 to-transparent",
          "w-28 h-28",
          "animate-glow-pulse"
        )} />

        {/* Main Flame */}
        <div className={cn(
          "absolute left-1/2 -translate-x-1/2 -top-16",
          "rounded-[70%_30%_90%_30%]",
          "animate-flame-dance",
          getFlameColor(),
          getFlameSize(),
          "after:content-[''] after:absolute after:inset-0",
          "after:bg-gradient-to-b after:from-transparent after:via-orange-500/40 after:to-orange-600/60",
          "after:rounded-[inherit] after:animate-flame-flicker",
          "before:content-[''] before:absolute before:inset-0",
          "before:bg-gradient-radial before:from-yellow-200/40 before:via-transparent before:to-transparent",
          "before:rounded-[inherit] before:mix-blend-screen before:animate-flame-flicker",
          "shadow-[0_0_20px_5px_rgba(255,165,0,0.3)]"
        )}>
          {/* Inner Flame Layers */}
          <div className={cn(
            "absolute inset-[2px]",
            "rounded-[inherit]",
            "bg-gradient-to-t from-yellow-300/90 via-orange-400/80 to-transparent",
            "opacity-90",
            "animate-flame-flicker",
            "delay-[100ms]"
          )}>
            {/* Additional Inner Glow */}
            <div className={cn(
              "absolute inset-0",
              "rounded-[inherit]",
              "bg-gradient-radial from-white/40 via-transparent to-transparent",
              "mix-blend-screen",
              "animate-flame-flicker",
              "delay-[200ms]"
            )} />
          </div>
        </div>
        
        {/* Inner Flame Core */}
        <div className={cn(
          "absolute left-1/2 -translate-x-1/2 -top-14",
          "rounded-[70%_30%_90%_30%] rotate-[5deg]",
          "bg-gradient-to-t from-white via-yellow-200/90 to-transparent",
          "mix-blend-screen",
          "animate-flame-flicker",
          "delay-[150ms]",
          category === 'low' ? 'h-16 w-3' : 
          category === 'medium' ? 'h-20 w-4' : 
          'h-24 w-5'
        )} />

        {/* Base Glow */}
        <div className={cn(
          "absolute left-1/2 -translate-x-1/2 -top-12",
          "rounded-full blur-[16px]",
          "bg-gradient-radial from-orange-500/80 via-orange-400/50 to-transparent",
          "w-24 h-16",
          "animate-glow-pulse",
          "delay-[50ms]"
        )} />

        {/* Enhanced Sparks Effect */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-20 w-32 h-48">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              style={{
                '--spark-drift': `${(Math.random() * 80 - 40)}px`,
                'animationDelay': `${Math.random() * 2}s`,
                'left': `${Math.random() * 100}%`,
                'opacity': Math.random() * 0.6 + 0.4
              } as React.CSSProperties}
              className={cn(
                "absolute",
                "w-[2px] h-[2px]",
                "rounded-full",
                "bg-gradient-to-t from-orange-200 to-yellow-100",
                "animate-spark-float",
                "shadow-[0_0_2px_1px_rgba(255,165,0,0.3)]"
              )}
            />
          ))}
        </div>

        {/* Heat Distortion Effect */}
        <div className={cn(
          "absolute left-1/2 -translate-x-1/2 -top-20",
          "w-24 h-44",
          "bg-gradient-to-t from-transparent via-white/5 to-transparent",
          "rounded-full blur-[1px]",
          "mix-blend-overlay",
          "animate-flame-dance",
          "delay-[75ms]"
        )} />

        {/* Additional Ambient Glow */}
        <div className={cn(
          "absolute left-1/2 -translate-x-1/2 -top-14",
          "w-32 h-32",
          "rounded-full",
          "bg-gradient-radial from-orange-300/20 via-yellow-200/10 to-transparent",
          "blur-[24px]",
          "mix-blend-screen",
          "animate-glow-pulse",
          "delay-[250ms]"
        )} />
      </div>

      {/* Traditional Round Terracotta Diya */}
      <div className="relative">
        {/* Main Bowl Shape */}
        <div className="relative">
          {/* Outer Bowl - Deep Terracotta */}
          <div className={cn(
            "h-32 w-44",
            "bg-gradient-to-b from-[#8B4513] to-[#654321]",
            "rounded-[100%] overflow-hidden",
            "transform -rotate-1",
            "border-t border-[#A0522D]/30",
            "shadow-[inset_0_8px_16px_rgba(0,0,0,0.4)]",
            "relative"
          )}>
            {/* Clay Texture Overlay */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxmaWx0ZXIgaWQ9Im4iPjxmZVR1cmJ1bGVuY2UgYmFzZUZyZXF1ZW5jeT0iLjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')]" />
            </div>
            
            {/* Inner Bowl Shape */}
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-36 h-24
                          bg-gradient-to-b from-[#654321] to-[#3D2B1F] 
                          rounded-[100%] transform
                          shadow-[inset_0_6px_12px_rgba(0,0,0,0.5)]">
              {/* Oil Surface */}
              <div className={cn(
                "absolute top-[25%] left-1/2 -translate-x-1/2",
                "h-8 w-28",
                "bg-gradient-to-b from-[#2B1810]/90 to-transparent",
                "rounded-[100%]",
                "animate-oil-shimmer",
                "shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
              )} />
              
              {/* Oil Shine Effect */}
              <div className="absolute top-[20%] left-1/2 -translate-x-1/2 
                            w-24 h-2 bg-white/10 rounded-full 
                            transform rotate-[-2deg]
                            animate-oil-shimmer" />
            </div>
          </div>

          {/* Bottom Rim */}
          <div className={cn(
            "absolute -bottom-2 left-1/2 -translate-x-1/2",
            "h-4 w-32",
            "bg-gradient-to-b from-[#654321] to-[#3D2B1F]",
            "rounded-full",
            "transform",
            "shadow-lg shadow-[#2B1810]/40"
          )}>
            {/* Rim Texture */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_80%)]" />
            </div>
          </div>
        </div>

        {/* Enhanced Edge Details */}
        <div className="absolute -inset-[2px] opacity-30 mix-blend-overlay">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
        </div>
      </div>

      {/* Enhanced Glow Effects */}
      <div className={cn(
        "absolute -inset-20 rounded-full blur-[40px] transition-all duration-300",
        "bg-gradient-radial from-orange-500/30 via-amber-400/20 to-transparent",
        getGlowOpacity(),
        isCelebrating && "animate-modern-glow scale-150"
      )} />

      {/* Enhanced Ambient Light */}
      <div className={cn(
        "absolute -inset-16 rounded-full blur-[30px] transition-all duration-300",
        "bg-gradient-to-t from-orange-300/20 via-yellow-200/10 to-transparent",
        getGlowOpacity(),
        isCelebrating && "animate-modern-ambient"
      )} />
    </div>
  );
};

export default Diya; 