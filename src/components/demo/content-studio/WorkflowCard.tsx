"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Clock, LucideIcon } from 'lucide-react';

interface WorkflowCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  estimatedTime: string;
  href: string;
  isRecommended?: boolean;
}

export default function WorkflowCard({
  icon: Icon,
  title,
  description,
  features,
  estimatedTime,
  href,
  isRecommended = false
}: WorkflowCardProps) {
  return (
    <Link href={href}>
      <div className={`bg-white border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer group ${
        isRecommended ? 'border-black shadow-md' : 'border-gray-200'
      }`}>
        {isRecommended && (
          <div className="flex items-center justify-between mb-4">
            <span className="px-2 py-1 bg-black text-white text-xs font-medium rounded">
              RECOMMENDED
            </span>
            <span className="text-xs text-gray-500">High impact</span>
          </div>
        )}
        
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg transition-colors ${
            isRecommended ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 group-hover:bg-gray-200'
          }`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 mb-4">{description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                <span>{estimatedTime}</span>
              </div>
              
              <div className="space-y-1">
                {features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center text-xs text-gray-600">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
    </Link>
  );
}
