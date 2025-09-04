"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  previousValue?: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  icon: LucideIcon;
  description: string;
  animatedValue?: number;
  suffix?: string;
  variant?: 'default' | 'highlight';
}

export default function MetricCard({
  title,
  value,
  previousValue,
  trend,
  change,
  icon: Icon,
  description,
  animatedValue,
  suffix = "",
  variant = 'default'
}: MetricCardProps) {
  const getTrendColor = () => {
    switch(trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    switch(trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  if (variant === 'highlight') {
    return (
      <div className="bg-black text-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-white/10 rounded-lg">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="text-sm font-medium text-green-400">
            OPPORTUNITY
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">{title}</h3>
          <div className="text-3xl font-bold">
            {animatedValue?.toFixed(1) || value}{suffix}
          </div>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">
          <Icon className="w-5 h-5 text-gray-700" />
        </div>
        <div className={`flex items-center text-sm font-medium ${getTrendColor()}`}>
          <span className="mr-1">{getTrendIcon()}</span>
          {change > 0 ? '+' : ''}{change}%
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="text-3xl font-bold text-gray-900">
          {animatedValue?.toFixed(1) || value}{suffix}
        </div>
        <p className="text-xs text-gray-500">{description}</p>
        
        {previousValue && (
          <div className="text-xs text-gray-400">
            Previous: {previousValue}{suffix}
          </div>
        )}
      </div>
    </div>
  );
}