"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { X, Target, TrendingUp, Lightbulb, Zap, CheckCircle } from 'lucide-react';

interface AngleSelectorProps {
  topic: {
    title: string;
    description: string;
  };
  angles: Array<{
    id: string;
    name: string;
    title: string;
    impactLevel: 'high' | 'medium' | 'low' | 'negative';
    expectedPoints: string;
    primaryLLM: string[];
    rationale: string;
    structuralAdvantage: string;
    audienceMatch: string;
    opportunity: string;
    clusterEffect: string;
  }>;
  onSelect: (angle: any) => void;
  onClose: () => void;
}

export default function AngleSelector({ topic, angles, onSelect, onClose }: AngleSelectorProps) {
  const [hoveredAngle, setHoveredAngle] = useState<string | null>(null);

  const getImpactDisplay = (impactLevel: string) => {
    switch (impactLevel) {
      case 'high':
        return { emoji: '🟢', color: 'bg-green-100 text-green-800 border-green-200', text: 'High AI Impact' };
      case 'medium':
        return { emoji: '🟡', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', text: 'Medium AI Impact' };
      case 'low':
        return { emoji: '🔴', color: 'bg-red-100 text-red-800 border-red-200', text: 'Low AI Impact' };
      case 'negative':
        return { emoji: '⛔', color: 'bg-red-100 text-red-800 border-red-200', text: 'Negative Impact' };
      default:
        return { emoji: '🟡', color: 'bg-gray-100 text-gray-800 border-gray-200', text: 'Medium AI Impact' };
    }
  };

  const getAngleIcon = (index: number) => {
    switch (index) {
      case 0: return <Target className="w-5 h-5 text-blue-500" />;
      case 1: return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case 2: return <Zap className="w-5 h-5 text-purple-500" />;
      default: return <Target className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">SELECT YOUR CONTENT ANGLE</h2>
            <p className="text-gray-600 mt-1">Topic: "{topic.title}"</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 120px)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {angles.map((angle, index) => {
              const impact = getImpactDisplay(angle.impactLevel);
              const isHovered = hoveredAngle === angle.id;
              
              return (
                <div key={angle.id} className="relative">
                  <Card 
                    className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                      isHovered ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onMouseEnter={() => setHoveredAngle(angle.id)}
                    onMouseLeave={() => setHoveredAngle(null)}
                    onClick={() => onSelect(angle)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getAngleIcon(index)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-600">ANGLE {index + 1}:</span>
                          <span className="text-sm font-medium text-gray-900">{angle.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm">{impact.emoji}</span>
                          <span className={`text-xs px-2 py-1 rounded-full border ${impact.color}`}>
                            {impact.text}
                          </span>
                          <span className="text-xs text-gray-500">ℹ️</span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">"{angle.title}"</h3>
                        
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>Expected impact: {angle.expectedPoints} points</div>
                          <div>Best LLM fit: {angle.primaryLLM.join(', ')}</div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Hover Tooltip */}
                  {isHovered && (
                    <div className="absolute top-0 left-0 right-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900 mb-2">
                          {impact.emoji} {impact.text.toUpperCase()}
                        </div>
                        <p className="text-gray-700 mb-3">This angle is optimized for AI citation:</p>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">
                              <span className="font-medium">{angle.structuralAdvantage}</span>
                              <br />
                              <span className="text-gray-500">(LLMs prefer hierarchical content)</span>
                            </span>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">
                              <span className="font-medium">{angle.audienceMatch}</span>
                              <br />
                              <span className="text-gray-500">on {angle.primaryLLM.join(' and ')}</span>
                            </span>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">
                              <span className="font-medium">{angle.opportunity}</span>
                              <br />
                              <span className="text-gray-500">with minimal competitor coverage</span>
                            </span>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">
                              <span className="font-medium">{angle.clusterEffect}</span>
                              <br />
                              <span className="text-gray-500">(compound effect)</span>
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="text-xs text-gray-600">
                            <span className="font-medium">Best LLM fit:</span> {angle.primaryLLM.join(', ')}
                          </div>
                          <div className="text-xs text-gray-600">
                            <span className="font-medium">Expected impact:</span> {angle.expectedPoints} points
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
