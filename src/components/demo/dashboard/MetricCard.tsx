"use client";

import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Platform {
  name: string;
  percentage: string;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  previousValue?: number;
  trend?: string;
  subtitle?: string;
  sparkline?: number[];
  icon?: React.ReactNode;
  color?: 'blue' | 'purple' | 'yellow' | 'emerald' | 'red';
  animate?: boolean;
  platforms?: Platform[];
  status?: string;
  highlight?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  previousValue,
  trend,
  subtitle,
  sparkline,
  icon,
  color = 'blue',
  animate = false,
  platforms,
  status,
  highlight = false,
}) => {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (animate && typeof value === 'number') {
      setIsAnimating(true);
      const duration = 1500;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          setIsAnimating(false);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current * 10) / 10);
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [animate, value]);

  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  };

  const iconColorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    red: 'text-red-600 dark:text-red-400',
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    const isPositive = trend.startsWith('+');
    const isNeutral = trend === '0%';
    
    if (isNeutral) return <Minus className="w-4 h-4 text-gray-500" />;
    return isPositive ? (
      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
    );
  };

  const renderSparkline = () => {
    if (!sparkline) return null;
    
    const max = Math.max(...sparkline);
    const min = Math.min(...sparkline);
    const range = max - min;
    const width = 100;
    const height = 30;
    
    const points = sparkline.map((value, index) => {
      const x = (index / (sparkline.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={width} height={height} className="mt-2">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={points}
          className={iconColorClasses[color]}
        />
      </svg>
    );
  };

  return (
    <div className={`
      relative p-6 rounded-xl border transition-all duration-200 hover:shadow-lg
      ${colorClasses[color]}
      ${highlight ? 'ring-2 ring-yellow-400 dark:ring-yellow-600' : ''}
      ${isAnimating ? 'scale-[1.02]' : ''}
    `}>
      {highlight && (
        <div className="absolute -top-2 -right-2 animate-pulse">
          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          {icon && (
            <div className={`mr-2 ${iconColorClasses[color]}`}>
              {icon}
            </div>
          )}
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </h3>
        </div>
        {trend && (
          <div className="flex items-center">
            {getTrendIcon()}
            <span className={`ml-1 text-sm font-medium ${
              trend.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {trend}
            </span>
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <p className={`text-2xl font-bold text-gray-900 dark:text-white ${
          isAnimating ? 'animate-pulse' : ''
        }`}>
          {animate && typeof value === 'number' ? displayValue : value}
        </p>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
        {status && (
          <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1 font-medium">
            {status}
          </p>
        )}
      </div>
      
      {sparkline && renderSparkline()}
      
      {platforms && (
        <div className="mt-3 space-y-1">
          {platforms.map((platform) => (
            <div key={platform.name} className="flex items-center justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">{platform.name}</span>
              <span className="font-medium text-gray-900 dark:text-white">{platform.percentage}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
