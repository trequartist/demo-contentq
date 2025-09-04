"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';
import Card from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    direction: 'up' | 'down' | 'stable';
    value: number;
    label?: string;
  };
  variant?: 'default' | 'highlight';
  size?: 'sm' | 'md' | 'lg';
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = 'default',
  size = 'md'
}: StatCardProps) {
  const getTrendColor = (direction: string) => {
    switch(direction) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (direction: string) => {
    switch(direction) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  const sizeClasses = {
    sm: { value: 'text-xl', title: 'text-xs', padding: 'p-3' },
    md: { value: 'text-2xl', title: 'text-sm', padding: 'p-4' },
    lg: { value: 'text-3xl', title: 'text-base', padding: 'p-6' }
  };

  if (variant === 'highlight') {
    return (
      <Card variant="default" padding="none" className="bg-black text-white">
        <div className={sizeClasses[size].padding}>
          <div className="flex items-center justify-between mb-3">
            {Icon && (
              <div className="p-2 bg-white/10 rounded-lg">
                <Icon className="w-5 h-5 text-white" />
              </div>
            )}
            {trend && (
              <div className="text-sm font-medium text-green-400">
                {trend.label || 'TRENDING'}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <p className={`font-medium text-gray-300 ${sizeClasses[size].title}`}>{title}</p>
            <div className={`font-bold text-white ${sizeClasses[size].value}`}>
              {value}
            </div>
            {description && (
              <p className="text-xs text-gray-400">{description}</p>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="default" padding="none" hover>
      <div className={sizeClasses[size].padding}>
        <div className="flex items-center justify-between mb-3">
          {Icon && (
            <div className="p-2 bg-gray-50 rounded-lg">
              <Icon className="w-5 h-5 text-gray-700" />
            </div>
          )}
          {trend && (
            <div className={`flex items-center text-sm font-medium ${getTrendColor(trend.direction)}`}>
              <span className="mr-1">{getTrendIcon(trend.direction)}</span>
              {trend.value > 0 ? '+' : ''}{trend.value}%
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className={`font-medium text-gray-600 ${sizeClasses[size].title}`}>{title}</p>
          <div className={`font-bold text-gray-900 ${sizeClasses[size].value}`}>
            {value}
          </div>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
