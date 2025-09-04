"use client";

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface CriticalGap {
  title: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  action: string;
  searches: number;
}

interface CriticalGapsAlertProps {
  gaps: CriticalGap[];
}

export default function CriticalGapsAlert({ gaps }: CriticalGapsAlertProps) {
  const getImpactColor = (impact: string) => {
    switch(impact) {
      case 'HIGH': return 'bg-red-500/20 text-red-400';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg p-6">
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-yellow-500/20 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Critical Content Gaps Identified</h3>
          <p className="text-gray-300 mb-4">
            Our diagnostic reveals {gaps.length} high-impact opportunities that could unlock significant revenue growth.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gaps.map((gap, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getImpactColor(gap.impact)}`}>
                    {gap.impact} IMPACT
                  </span>
                  <span className="text-xs text-gray-400">{gap.searches.toLocaleString()} searches/mo</span>
                </div>
                <h4 className="font-medium mb-1">{gap.title}</h4>
                <p className="text-xs text-gray-400 mb-2">{gap.description}</p>
                <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  {gap.action} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
