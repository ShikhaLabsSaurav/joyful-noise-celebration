
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  "noise-card flex",
  {
    variants: {
      variant: {
        default: "border-border",
        success: "border-green-200",
        warning: "border-yellow-200",
        danger: "border-red-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface NoiseCardProps extends VariantProps<typeof cardVariants> {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const NoiseCard = ({
  title,
  value,
  unit,
  icon: Icon,
  subtitle,
  trend,
  trendValue,
  variant,
  className,
}: NoiseCardProps) => {
  return (
    <div className={cn(cardVariants({ variant }), className)}>
      <div className="flex flex-col justify-between w-full">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <Icon className="h-5 w-5 text-primary/70" />
        </div>
        
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        
        {subtitle && (
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        )}
        
        {trend && (
          <div 
            className={`mt-2 flex items-center text-xs font-medium ${
              trend === 'up' 
                ? 'text-red-600' 
                : trend === 'down' 
                  ? 'text-green-600' 
                  : 'text-gray-600'
            }`}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
            <span className="ml-1">{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoiseCard;
